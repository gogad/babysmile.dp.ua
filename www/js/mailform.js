$(document).ready(function() {
	$("#mailform").click(function(){        $('#formEnter1').dialog('open');		return false;	});
});
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
				}
			}
		]
	});
});