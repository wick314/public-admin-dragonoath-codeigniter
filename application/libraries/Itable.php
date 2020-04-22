<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Itable
{
	protected $ci;

	public function __construct()
	{
        $this->ci =& get_instance();
	}
	public function get_order($orders,$col) {
		if(!is_array($orders)) return false;
		if(count($orders) < 1) return false;
		$order_result = array();
		foreach ($orders as $k => $v) {
			$sort = "ASC";
			if(!isset($v['column'])) return false;
			if(!isset($v['dir'])) return false;
			if(!isset($col[$v['column']])) return false;
			if($v['dir'] != "asc" ) $sort = "DESC";
			$key = $col[$v['column']];
			$order_result[$key] = $sort;
		}		
		return $order_result;
	}
	public function get_search($cols) {
		$colums = $this->ci->input->post('columns', TRUE);
		if(!is_array($colums)) return false;
		if(count($colums) < 1) return false;
		$search_result = array('cols' => false,'table' => false);
		foreach ($colums as $k => $v) {
			if(!in_array($v['data'], $cols)) return false;
			if(!$v['search']['value']) continue;
			$search_result['cols'][$v['data']] = $v['search']['value'];
		}
		$table = $this->ci->input->post('search', TRUE);
		if(!$table) return $search_result;
		if(!isset($table['value'])) return $search_result;
		$search_result['table'] = $table['value'];
		return $search_result;

	}

	

}

/* End of file itable.php */
/* Location: ./application/libraries/itable.php */
