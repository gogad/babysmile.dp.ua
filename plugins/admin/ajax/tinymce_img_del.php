<?php
try {
	$objectDb = Admin_Core::getObjectDatabase();
	$objectImgcontent = new Admin_Plugins_Imgcontent();
//    ini_set("display_errors","Off");
    $id = @$_REQUEST['id'];
    $img_path = $objectDb->getItem('img_path','content_images',$id);
    $content_id = $objectDb->getItem('item_id','content_images',$id);
    // удаляем основное изображение
    unlink(FRONT_SITE_PATH.$img_path);
    // удаляем большое изображение
    $big_img_path = FRONT_SITE_PATH.Admin_Plugins_Imgcontent::$PATH_TO_IMAGES.Admin_Plugins_Imgcontent::$PATH_TO_BIG_IMAGES.$content_id.'/'.basename($img_path);
    @unlink($big_img_path);
    // удаляем запись в таблице
    $objectDb->deleteRecord('content_images',$id);
    $error_msg = 'no error';                
    echo json_encode(array('msg'=>$error_msg, 'id'=>$id));
} catch (Exception $e) {
    echo json_encode(array('msg'=>"System error: {$e->getMessage()} in {$e->getFile()} at line {$e->getLine()}'"));
}
