/**
 * $Id: editor_plugin_src.js 201 2007-02-12 15:56:56Z spocke $
 * @author Andrey Garbuz
 * @copyright Copyright  2004-2008, Moxiecode Systems AB, All rights reserved.
 */

(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('csvupload');

	tinymce.create('tinymce.plugins.CsvUploadPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			param = document.getElementById("param").value;
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceCsvUpload', function() {
				ed.windowManager.open({					
					file : url + '/dialog.htm?'+param,
					width : 420,
					height : 120,
					inline : 1
				}, {
					plugin_url : url // Plugin absolute URL
				});
			});

			// Register example button
			ed.addButton('csvupload', {
				title : 'csvupload.desc',
				cmd : 'mceCsvUpload',
				image : url + '/img/csvupload.gif'
			});

			// Add a node change handler, selects the button in the UI when a image is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				
			});
		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Upload CSV File And Transform To Table Plugin',
				author : 'Andrey Garbuz',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/CsvUpload',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('csvupload', tinymce.plugins.CsvUploadPlugin);
})();