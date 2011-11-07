<?php
/**
 * vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 foldmethod=marker:
 */
// +----------------------------------------------------------------------+
// | PHP version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 1997-2004 The PHP Group                                |
// +----------------------------------------------------------------------+
// | This source file is subject to version 3.0 of the PHP license,       |
// | that is bundled with this package in the file LICENSE, and is        |
// | available through the world-wide-web at the following url:           |
// | http://www.php.net/license/3_0.txt.                                  |
// | If you did not receive a copy of the PHP license and are unable to   |
// | obtain it through the world-wide-web, please send a note to          |
// | license@php.net so we can mail you a copy immediately.               |
// +----------------------------------------------------------------------+
// | Authors: Dmitry Koterov <pear at koterov dot ru>                     |
// +----------------------------------------------------------------------+

require_once "HTML/SemiParser.php";


/**
 * @author Dmitry Koterov 
 * @version $Revision: 1.2 $
 * @package HTML 
 */
class HTML_ImgSizer extends HTML_SemiParser 
{
    /**
     * Helper function. Work the same as GetImageSize(), but allow
     * to use URIs instead of filenames.
     *
     * @param  string $srcUri  Absolute or relative URI to image.
     * @result Image properties (see built-in GetImageSize()).
     */
    function getimagesize_byUri($src)
    {
        $fname = false; 
        // When mod_rewrite is active, we shoild NOT lookupe RELATIVE
        // urls (apache bug?). Then always lookup absolute urls.
        if ($src && $src[0] != '/') {
            $dir = dirname($_SERVER['SCRIPT_NAME']);
            if (!$dir || $dir == "/" || $dir == "\\") $dir = "";
            $src = "$dir/$src";
        } 
        // Use apache stuff (if available).
        if (function_exists("apache_lookup_uri") && 0) {
            $info = apache_lookup_uri($src);
            $src = @$info->path_info? $info->path_info : (@$info->uri? $info->uri : $src);
            $fname = $info->filename;
        } else {
            // Primitive URL resolving.
            if ($src[0] == '/') $fname = $_SERVER["DOCUMENT_ROOT"] . $src;
            else $fname = dirname($_SERVER["SCRIPT_FILENAME"]) . "/" . $src;
        } 
        if ($fname === false) return;

        static $cache = array();
        $cacheId = $fname;
        if (isset($cache[$cacheId])) return $cache[$cacheId];

        $isz = @getimagesize($fname);
        if (!@$isz) return;
        $isz['uri'] = $src;
        $isz['fname'] = $fname;
        $isz['width'] = $isz[0];
        $isz['height'] = $isz[1];
        return $cache[$cacheId] = $isz;
    } 

    /**
     * <IMG> tag handler.
     * See HTML_SemiParser.
     */
    function tag_img($attr)
    { 
        // No need to set width-height.
        if (isSet($attr['width']) || isSet($attr['height']) || !isSet($attr['src'])) return; 
        // Determime picture parameters.
        $isz = $this->getimagesize_byUri($attr['src']);
        if (!@$isz) return;
        $attr['width'] = $isz[0];
        $attr['height'] = $isz[1];
        return $attr;
    } 
} 

?>