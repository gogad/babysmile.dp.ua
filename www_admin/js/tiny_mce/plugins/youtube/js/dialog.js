tinyMCEPopup.requireLangPack();

var YoutubeDialog = {
	init : function() {
		$(function() {
			
		});
	},

	insert : function() {
		var videoCode = '<p class="video">' + $('form').find('textarea').val() + '</p>'
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, videoCode);
		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(YoutubeDialog.init, YoutubeDialog);
