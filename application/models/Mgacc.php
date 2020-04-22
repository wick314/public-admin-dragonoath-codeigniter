<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mgacc extends CI_Model {

	private $objdata;
	private $dbj;
	public function __construct()
	{
		parent::__construct();
		$this->dbj = $this->load->database("accounts",TRUE);
		//Do your magic here
	}
	public function get_name($name) {
		$query = $this->dbj->where('name',$name)
							->get('account');
		if($query->num_rows() == 0) return false;
		$this->objdata = $query->row(); 
		return clone $this;
	}

	public function get_id($id) {
		$query = $this->dbj->where('id',$id)
							->get('account');
		if($query->num_rows() == 0) return false;
		$this->objdata = $query->row();
		return clone $this;
	}

	public function get_meta($tag) {
        if(isset($this->objdata->$tag)) {
            return $this->objdata->$tag;
        }
        return FALSE;
    }
    // Hàm set dữ liệu //
    public function set_meta($tag,$value) {
        if(isset($this->objdata->$tag) || $this->objdata->$tag === NULL || $this->objdata->$tag == '0') {
            $this->objdata->$tag = $value;
            return TRUE;
        }
        return FALSE;
    }

    // Lưu dữ liệu đối tượng User.
    public function save() {
        $this->db->where('id',  $this->objdata->id)
                ->update('account',(array)  $this->objdata);
        return TRUE;
    }
    // Lấy tất cả meta đối tượng
    public function get_data() {
        return $this->objdata;
    }
    // Xóa User
    public function delete() {
        $this->db->where('id',  $this->objdata->id)
                ->delete('account');
    }
    // Thêm User
    public function account_add($data) {
        $this->db->insert('account',$data);
        return true;
    }
	

}

/* End of file Mgacc.php */
/* Location: ./application/models/Mgacc.php */
?>