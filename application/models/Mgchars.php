<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mgchars extends CI_Model {

	private $dbj;

	public function __construct()
	{
		parent::__construct();
		$this->dbj = $this->load->database("character",TRUE);
		
	}
	public function mget($select,$where,$limit,$offset,$search=false,$order = false)
	{
		$likeable = false;
		if(is_array($select)) $this->dbj->select(join(",",$select));
		if(is_array($where)) {
			foreach ($where as $key => $value) {
				$this->dbj->where($key,$value);
			}
		}
		if($limit && !$offset) $this->dbj->limit($limit);
        if($limit && $offset)  $this->dbj->limit($limit,$offset);
        if($search && $search['table']) {
        	foreach($select as $k => $v) {
        		if($k == 0) {
        			$this->dbj->like($v,$search['table'],'both');
        			continue;
        		}
        		$this->dbj->or_like($v,$search['table'],'both');
        		
        	}
        	
        }
        if($search && $search['cols']) {
        	foreach ($search['cols'] as $k => $v) {
        		if($k == 0) {

        		}
        		$this->dbj->like($k,$v,'both');
        	}
        }
        if(!$order) {
        	$query = $this->dbj->order_by($order,'DESC')->get('t_char');
        }
        else {
        	foreach ($order as $col => $type) {
        		$this->dbj->order_by($col,$type);
        	}
        	$query = $this->dbj->get('t_char');
        }
        if($query->num_rows() == 0) return false;
        return $query->result();
	}
	public function count($select,$where = false,$search = false) {
		if($search && $search['table']) {
        	foreach($select as $k => $v) {
        		if($k == 0) {
        			$this->dbj->like($v,$search['table'],'both');
        			continue;
        		}
        		$this->dbj->or_like($v,$search['table'],'both');
        		
        	}
        	
        }
        if($search && $search['cols']) {
        	foreach ($search['cols'] as $k => $v) {
        		if($k == 0) {

        		}
        		$this->dbj->like($k,$v,'both');
        	}
        }
		return  $this->dbj->count_all_results('t_char');
	}
	public function count_all() {
		return  $this->dbj->count_all_results('t_char');
	}


}
/* End of file Mgchars.php */
/* Location: ./application/models/Mgchars.php */