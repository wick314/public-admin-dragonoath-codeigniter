<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mgaccs extends CI_Model {
	//define accountdb
	private $adb;

	public function __construct()
	{
		parent::__construct();
		$this->adb = $this->load->database('accounts',TRUE);		
	}
	public function get_list() {
		
	}
	public function search_list($acc) {
		$query = $this->adb->select('name as id,name')
							->like('name',$acc,'AFTER')
							->limit(10)
							->get('account');
		return $query->result();
	} 


}

/* End of file Mgaccs.php */
/* Location: ./application/models/Mgaccs.php */