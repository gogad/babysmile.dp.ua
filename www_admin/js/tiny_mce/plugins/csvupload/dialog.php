<?php
header("Content-type: text/html; charset=utf-8");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>CSV</title>
	<script type="text/javascript" src="/admin/js/jquery.js"></script>
	<script type="text/javascript" src="/admin/js/tiny_mce/tiny_mce_popup.js"></script>	
	<script type="text/javascript" src="/admin/js/jquery.form.js"></script>
	
	<style type="text/css">		
		* {font-size: 11px;}
	</style>
<script type="text/javascript">
$(function() {
  $('form').submit(function() {
    $(this).ajaxSubmit({
      url: '/admin/js/tiny_mce/plugins/csvupload/ajax_upl.php',
      dataType: 'html',
      success: function(data) {

	  tinyMCEPopup.editor.execCommand('mceInsertContent', false, data);
	  tinyMCEPopup.editor.addVisual()
	  tinyMCEPopup.close();

      }
    });
    return false;
  });
});
</script>
</head>
<body>
<div id="debug">Выберите файл для загрузки</div>
<form action="#" method="POST" enctype="multipart/form-data">
	<input type="hidden" name="MAX_FILE_SIZE" value="300000" />
	<input id="upl_file" type="file" size="45" name="upl_file" />
	<div class="mceActionPanel">
		<div style="float: right">
			<input type="button" value="Закрыть" onclick="tinyMCEPopup.close();" />
		        <input type="submit" value="Выполнить" />
		</div>
	</div>
</form>

</body>
</html>
