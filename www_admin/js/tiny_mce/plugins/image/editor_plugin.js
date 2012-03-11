(function() {

	tinymce.create('tinymce.plugins.ImagePlugin', {
		init : function(ed, url) {
			// Register example button
			ed.addButton('mceAdvImage');
		}
	});

	// Register plugin
	tinymce.PluginManager.add('image', tinymce.plugins.ImagePlugin);
})();