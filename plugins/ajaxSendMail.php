<?php

/**
 * @param current_page $page
 */
function ajaxSendMail($page)
{
	$response = array();

	if (isset($_POST['email']) && isset($_POST['mailText'])) {
		$admMail="babysmile@ua.fm";
		$mail = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
		$text = htmlspecialchars($_POST['mailText']);
		/* Для отправки HTML-почты вы можете установить шапку Content-type. */
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n";

		/* дополнительные шапки */
		$headers .= "From: ".$mail."\r\n";
		$Subjmail = "Контактная форма babysmile";
		if ( $mail && ( $text != "введите текст письма...")){


		$response['noerror'] = mail($admMail, $Subjmail , $text , $headers );
		if($response['noerror']!= false)$response['error']= "письмо отправлено, закройте окошко.";
		else $response['error']= "письмо не отправлено, попробуйте повторить операцию позже";
		}
        if(!$mail)$response['error']= "неправильный адрес электронной почты";
        if($text == "")$response['error']="пустое поле сообщения";

	}
	echo json_encode($response);
}