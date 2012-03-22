<?php

/**
 * @param current_page $page
 */
function ajaxSendMail($page)
{
	$response = array();
	$response['error']="";

	if (isset($_POST['email']) && isset($_POST['mailText'])&& isset($_POST['Ustel'])&& isset($_POST['Usname']) ) {
		$admMail="babysmile@ua.fm";
		$ustel= $_POST['Ustel'];
		// обработка ошибок и фильтрация
		$mail = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
		$text = htmlspecialchars($_POST['mailText']);
		$usname = htmlspecialchars($_POST['Usname']);
		if(!$mail)$response['error'].= "неправильный емаил.";
		if(!preg_match("/^[0-9]{10}$/",$ustel)) $response['error'].= "неправильный телефон.только 10 цифр.";
    	if($text == "")$response['error'].="пустое поле сообщения.";
    	if($usname == "")$response['error'].="пустое поле имени.";
    	//if($ustel == "")$response['error'].="пустое поле телефона.";
		/* Для отправки HTML-почты вы можете установить шапку Content-type. */
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";

		/* дополнительные шапки */
		$headers .= "From: ".$mail."\r\n";
		$Subjmail = "Контактная форма babysmile. ".$usname.". ".$ustel;
		if (( $text != "введите текст письма...") &&($response['error'] ==""))
		{


		$response['noerror'] = mail($admMail, $Subjmail , $text , $headers );
		if(($response['noerror']!= false)  )$response['error'].= "Ваше письмо отправлено,мы вам ответим в ближайшее время.";

		}else $response['error'].= "123";


	}
	else{$response['error'].="не все поля заполнены.";};


	echo json_encode($response);
}
?>