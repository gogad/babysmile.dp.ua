<?php

function smarty_modifier_convert_currency($value)
{
	$default_currency = db::getDB()->selectRow('SELECT rate,name FROM currency WHERE `default` = 1');
    if (!isset($_SESSION['currency'])) {
    	$currency = $default_currency;
    } else {
    	$currency = db::getDB()->selectRow('SELECT rate,name FROM currency WHERE id = ?d',$_SESSION['currency']);
    }
    
    if (!$currency) $currency = $default_currency;
    
    return round($value/$currency['rate'],2).'&nbsp;'.$currency['name'];
}


?>
