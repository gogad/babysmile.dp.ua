<?php
try {
	$objectDb = Admin_Core::getObjectDatabase();
	$objectImgcontent = new Admin_Plugins_Imgcontent();
    
    $content_id = @$_REQUEST['content_id'];
    
        $url = $_POST['url'];
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        $image = curl_exec($ch);
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        
        if ($responseCode != 200)
        	throw new Exception('Невозможно загрузить файл по указанному URL');
        	
        switch ($contentType) {
        	case 'image/jpg':
        	case 'image/jpeg':
        	case 'image/pjpeg':
        		$contentType = 'jpg'; break;
        	case 'image/gif':
        		$contentType = 'gif'; break;
        	case 'image/png':
        		$contentType = 'png'; break;
        	default:
        		throw new Exception('Тип изображения ' . $contentType . ' не поддерживается');
        }
        
        $upload_dir = FRONT_SITE_PATH.Admin_Plugins_Imgcontent::$PATH_TO_IMAGES.'/'.$content_id.'/';
        $name = $_POST['file_name'] . '.' . $contentType;
        
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir);
        }
        $upload_dir .= $name;
        if (file_exists($upload_dir))
        	throw new Exception('Файл с таким именем уже существует. Выберите другое имя');
        
        file_put_contents($upload_dir, $image);
       	list($width,$height) = getimagesize($upload_dir);
                    
        // thumbnail size
        if ($width>120) {
        	$delta = $width/120;
        	$width = 120;
            $height = ceil($height/$delta);        
        }
        if ($height>120) {
        	$delta = $height/120;
            $height = 120;
            $width = ceil($width/$delta);        
        }
                    
        $img_path = Admin_Plugins_Imgcontent::$PATH_TO_IMAGES.'/'.$content_id.'/'.$name;
        $objectDb->insertRecord(
        	'content_images',
            array('item_id'=>$content_id,'img_path'=>$img_path)
        );
        $id = $objectDb->getLastId('content_images');
    
    echo json_encode(array('isSuccess' => true, 'img_name'=>$img_path, 'id'=>$id, 'width'=>$width, 'height'=>$height));
    
} catch (Exception $e) {
    echo json_encode(array('isSuccess' => false, 'message' => $e->getMessage()));
}
