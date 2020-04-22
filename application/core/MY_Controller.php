<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_Controller extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->helper('my');
        $this->load->model('frontend/menu_model');
        $data['menu']=$this->menu_model->gets(array('where'=>array('status'=>0,'sort >'=>0),'orderby'=>array('sort'=>'asc')));
        $cp_result=$this->menu_model->category_products();
        foreach ($cp_result as  $value) {
				$data['category_product_alias'][$value->proc_alias]=$value;
				$data['category_product_id'][$value->proc_id]=$value;
		}
		$ca_result=$this->menu_model->category_arc();
        foreach ($ca_result as  $value) {
				$data['category_arc_alias'][$value->arc_alias]=$value;
				$data['category_arc_id'][$value->arc_id]=$value;
                $data['cate_arc_group'][$value->arc_groupid][]=$value->arc_id;
                $data['cate_arc_group_object'][$value->arc_groupid][]=$value;
		}
        foreach ($data['menu'] as $key => &$value) {
        	if($value->custom_alias){
        		$value->link = $value->custom_alias;
        	}
        	else{
        		switch ($value->post_type) {
        			case '0':
        				$value->link ='';
        				break;
        			case '1':
        				$value->link =	isset($data['category_product_id'][$value->post_id])? $data['category_product_id'][$value->post_id]->proc_alias:'';
        				break;
        			case '2':
        				$value->link = isset($data['category_arc_id'][$value->post_id])? 
                        ($data['category_arc_id'][$value->post_id]->arc_groupid==1? 'lam-dep/'.$data['category_arc_id'][$value->post_id]->arc_alias:'tin-tuc/'.$data['category_arc_id'][$value->post_id]->arc_alias):'';
        				break;
        			case '3':
        				$value->link = '';
        				break;
        		}
        	}
        }
        $this->_data=$data;
        $this->load->vars($data);
   	}
	
}
