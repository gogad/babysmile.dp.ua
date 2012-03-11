tinyMCEPopup.requireLangPack();

var SpoilerDialog = {
	
	init : function() {
		
		this.selection = tinymce.activeEditor.selection;
		this.spoilerIsset = $(this.selection.getNode()).parents('div.spoiler').length > 0;
		
		if (this.spoilerIsset) {
			$('form').find('input[name="header"]').hide();
			$('form').find('label[for="header"]').hide();
			$('#insert').hide();
			$('#remove').show();
		} else {
			$('form').find('input[name="header"]').show();
			$('form').find('label[for="header"]').show();
			$('#insert').show();
			$('#remove').hide();
		}
	},

	insert : function() {
		var spoilerHeader = $('form').find('input[name="header"]').val();
		if (spoilerHeader && this.selection.getContent() && !this.spoilerIsset) {
			var spoilerContent = '<div class="spoiler"><h4 class="spoilerHeader"><span>'
					+ spoilerHeader
					+ '</span></h4>'
					+ '<div class="spoilerContent">' + this.selection.getContent() + '</div>'
					+ '</div>';
			this.selection.setContent(spoilerContent);
			tinyMCEPopup.close();
		}
	},
	
	remove : function() {
		var spoiler = $(this.selection.getNode()).parents('div.spoiler');
		spoiler.find('h4.spoilerHeader>span').contents().unwrap();
		spoiler.find('h4.spoilerHeader').contents().unwrap();
		spoiler.find('div.spoilerContent').contents().unwrap();
		spoiler.contents().unwrap();
	}
};

tinyMCEPopup.onInit.add(SpoilerDialog.init, SpoilerDialog);
