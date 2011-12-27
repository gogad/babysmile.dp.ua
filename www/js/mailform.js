$(document).ready(function() {
	$("#mailform").click(function(){        $('#formEnter1').dialog('open');		return false;	});
    $("#formEnter1 textarea").click(function(){    	$(this).text("");    });});
$(function() {

	$('#formEnter1').dialog({
		modal: true,
		autoOpen: false,
		resizable: false,
		width: 350,
		show: 'explode',
		hide: 'explode',
		title: 'Написать нам',
		buttons: [
			{
				text: 'Отправить письмо',
				click: function() {
					$.post('?pname=ajaxSendMail', $(this).serialize(),
					 function(data) {
						if (data.noerror) {
						  $('#formEnter1 label').remove();

						  $('#formEnter1 button.switchable.enter').attr("disabled","disabled");
						  $('#formEnter1 p').replaceWith("<p>"+ data.error +"</p>");
						  $('.ui-dialog-buttonset .switchable.enter').remove();
						  $('.ui-dialog-buttonset .but1 span').text("Закрыть");
						}
						else {
                        $('#formEnter1 p').replaceWith("<p>"+data.error+"</p>");                        }
					}, 'json'
					);
				},
				'class': 'switchable enter'
			},

			{
				text: 'Отмена',
				click: function() {
					$(this).dialog("close");
				},
			  'class': 'but1'
			}

		]
	});
});