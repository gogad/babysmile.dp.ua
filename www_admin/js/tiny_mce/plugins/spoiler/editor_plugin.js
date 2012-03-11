(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('spoiler');

	tinymce.create('tinymce.plugins.SpoilerPlugin', {
		/**
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			ed.addCommand('mceSpoiler', function() {
				ed.windowManager.open({
					file : url + '/dialog.htm',
					width : 320,
					height : 120,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addButton('spoiler', {
				title : 'spoiler.desc',
				cmd : 'mceSpoiler',
				image : url + '/img/spoiler.gif'
			});

			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('spoiler', ed.selection.getContent());
			});
		},

		/**
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Spoiler plugin',
				author : 'andrey.garbuz@gmail.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('spoiler', tinymce.plugins.SpoilerPlugin);
})();