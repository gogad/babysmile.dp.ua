<?php

class Admin_Model_Common_Clothers extends Admin_Model_Common {
    
	/**
	 * @see Admin_Model_Abstract::update()
	 *
	 */
	public function update () {
		
        parent::update();
        
        $this->_autoUrl($this->getId());
    	$this->_autoName($this->getId());
    	
    	if (empty($this->db_fields['goods']['price'])) {
    		$this->_autoPrice($this->getId());
    	}
		
	}
		
 	
    public function insert() {
    	
    	parent::insert();
    	
    	$this->_autoUrl($this->getLastId());
    	$this->_autoName($this->getLastId());
    	
    	if (empty($this->db_fields['goods']['price'])) {
    		$this->_autoPrice($this->getLastId());
    	}    	
    	
    }
    
	/**
     * Updates url field on autogenerated value.
     * Impements to exist record in default table.
     * @param integer $id
     */
    protected function _autoUrl($id) {
    	
    	$size = str_replace(' ','-',_Strings::translite($this->getItem('size','clothers',$id)));
    	$color = str_replace(' ','-',_Strings::translite($this->getItem('color_name','clothers',$id)));
    	
    	// parent url + size and color name in translit + id
		$url = $this->getItem('url','items',$this->getItem('pid','items',$id)).'/'.$size.'-'.$color.'-'.$id;
		$this->updateField($this->getDefaultTable(),'url',$url,array('id'=>$id));
    	
    }
    
    protected function _autoName($id) {
    	
    	$size = $this->getItem('size','clothers',$id);
    	$color = $this->getItem('color_name','clothers',$id);
    	
    	// parent
    	$pid = $this->getItem('pid','items',$id);
    	$parent_name = $this->getItem('name','items',$pid);
    	$parent_title = $this->getItem('title','items',$pid);
    	
		$this->updateField($this->getDefaultTable(),'name',$parent_name.' '.$size.' '.$color,array('id'=>$id));
		$this->updateField($this->getDefaultTable(),'title',$parent_title.' '.$size.' '.$color,array('id'=>$id));
    	
    }
    
	protected function _autoPrice($id) {

		$pid = $this->getItem('pid','items',$id);
    	$price = $this->getItem('price','goods',$pid);
    	$priceOld = $this->getItem('price_old','goods',$pid);
    	
		$this->updateField('goods','price',$price,array('id'=>$id));
		$this->updateField('goods','price_old',$priceOld,array('id'=>$id));
    	
    }
 	
}
