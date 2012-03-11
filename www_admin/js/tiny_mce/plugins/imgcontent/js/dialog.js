tinyMCEPopup.requireLangPack();

var ImgContentDialog = {
	init : function() {
		$(document).ready (function () {			
			
			$('span.remoteImage').click(function() {
				$('div.remoteImage').toggle();
				if ($('div.remoteImage').is(':visible')) {
					$('#useBigImg').removeAttr('checked');
					$('#useBigImg').attr('disabled', 'disabled');
					$('#bigimg-options').hide();
				} else {
					$('#useBigImg').removeAttr('disabled');
				}
			});
			
			// показ/скрытие опций уменьшения изображений
			$("#useBigImg").click ( 
				function () {
					if ($(this).attr("checked")) {
						$("#bigimg-options").slideDown("slow");
					} else {
						$("#bigimg-options").hide();
					}
				}
			);
			
			// переключение между опциями уменьшения изображений
			$("div#bigimg-options input").focus ( 
				function () {
					$("div#bigimg-options").find("input").each (
						function () {
							$(this).addClass("not-active");
							$(this).attr("readonly","true");
						}
					)
					$(this).removeClass("not-active");
					$(this).removeAttr("readonly");
				}
			);
			
			$("div#bigimg-options input").keypress ( 
				function () {
					/*evt = (event) ? event : window.event
					var charCode = (evt.which) ? evt.which : evt.keyCode
					if (charCode > 31 && (charCode < 48 || charCode > 57)) {
						status = "This field accepts numbers only."
						return false
					}
					status = ""
					return true*/
				}
			);
			
			// обработка события click изображения (вставка в контент, удаление)
			$("img").livequery("click", function () {
				var id = $(this).attr("id");
				// выбран режим удаления
				if (isDeleteMode) {					
					var imgSrc = $(this).attr("src");
					// поиск удаляемого изображения в контенте
					var isInSource = false;
					$(tinyMCE.activeEditor.dom.getRoot())
						.find("img")
						.each(
							function () {
								if (imgSrc==$(this).attr("src")) {
									// удаляемое изображения найдено в контенте
									isInSource = true;
									return;
								}
							}
						);
					if (isInSource) {
						if (confirm("Это изображение используется. Продолжить удаление?")) {
							deleteImg(id,imgSrc);
						}
					} else {
						deleteImg(id,imgSrc);
					}
					return;
				} // end if isDeleteMode
				
				// выбран режим вставки в контент
				// снимаем CSS стиль выделения со всех изображений
				$("img.selected-img").addClass("content-img");
				$("img.selected-img").removeClass("selected-img");				
				// преобразование src
				if (tinymce.isIE) {
					var p = new Poly9.URLParser($(this).attr("src"));
					var imgSrc = p.getPathname();
				} else {
					var imgSrc = $(this).attr("src");
				}
				// ставим CSS стиль выделения выбранному изображению
				$(this).addClass("selected-img");
				$("#debug").text(imgSrc);
				// вставка в контент
				if ($(this).hasClass("big-img")) {
					var bigImgSrc = $(this).attr("name");
					tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<a target="_blank" title="увеличить" rel="lytebox" href="'+bigImgSrc+'"><img src="'+imgSrc+'" /></a>');
				} else {
					tinyMCEPopup.editor.execCommand('mceReplaceContent', false, '<img src="'+imgSrc+'" />');
				}
			});
			
			// обработка загрузки файла
			$("#upl_file").livequery("change", function () {
				$("#doUpload").show();
			});
			$("#doUpload").livequery("click", function () {
				$("#loading").ajaxStart (function () {
					$("#upl_file").attr("value","");
					$(this).show();
				}).ajaxComplete (function () {
					$(this).hide();
				});
				
				var resizeParams = ''; // строка GET параметров уменьшения изображений
				$("div#bigimg-options").find("input").each (
					function () {
						if (!$(this).hasClass("not-active")) {
							resizeParams = '&resize=1&'+$(this).attr("id")+'='+$(this).attr("value");
						}
					}
				);
								
				if (!$("#useBigImg").attr("checked")) resizeParams = '';
				var watermark=0;
				if ($("#useWatermark").attr("checked")) watermark = 1;
				
				$.ajaxFileUpload ({
					url:'/ajax/tinymce_img_upl?content_id='+$("#content_id").attr("value")+resizeParams+'&useWatermark='+watermark,
					secureuri:false,
					fileElementId:'upl_file',
					dataType: 'json',
					success: function (data, status) {
						if (data.msg=='no error') {
							var bigImgClass = '';
							var name_attr = '';
							if (data.big_img == 1) {
								bigImgClass = ' big-img';
								name_attr = ' name="'+data.big_img_path+'"';
							}
							$("#img-wrapper").append('<div id="img'+data.id+'"><img class="content-img'+bigImgClass+'"'+name_attr+' width="'+data.width+'" height="'+data.height+'" src="'+data.img_name+'" id="'+data.id+'" /></div>');
							$("#doUpload").hide();
						} else {
							alert(data.msg);
						}
					},
					error: function (data, status, e) {
						alert(e);
					}
				});
			});
			
			$('#doRemoteUpload').click(function() {
				var form = $(this).parents('form');
				if ($('input[name="url"]').val() && $('input[name="file_name"]').val()) {
					var formData = form.serialize();
					$('#doRemoteUpload').val('Загрузка...');
					form.find('input').attr('disabled', 'disabled');
					$.post(
						'/ajax/tinymce_img_remote_upl?content_id='+$("#content_id").attr("value"),
						formData,
						function(data) {
							if (data.isSuccess) {
								$("#img-wrapper").append(
									'<div id="img'+data.id+'"><img class="content-img" width="'+data.width+'" height="'+data.height+'" src="'+data.img_name+'" id="'+data.id+'" /></div>'
								);
								$('div.remoteImage').hide();
								form.find('input:text').val('');
							} else {
								alert(data.message);
							}
							$('#doRemoteUpload').val('Загрузить');
							form.find('input').removeAttr('disabled');
						},
						'json'
					);
				}
			});
			
		}); // end domready
		
	},

	insert : function() {
		// Insert image into the document
		//tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<img src="'+$("#img_src").attr("value")+'" />');
	}
};

tinyMCEPopup.onInit.add(ImgContentDialog.init, ImgContentDialog);
