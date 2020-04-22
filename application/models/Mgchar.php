<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mgchar extends CI_Model {

	private $objdata;
	private $dbj;

	public function __construct()
	{
		parent::__construct();
		$this->dbj = $this->load->database("character",TRUE);
	}

	public function get_name($name) {
		$query = $this->dbj->where('charname',$name)
							->get('t_char');
		if($query->num_rows() == 0) return false;
		$this->objdata = $query->row(); 
		return clone $this;
	}

	public function get_id($id) {
		$query = $this->dbj->where('aid',$id)
							->get('t_char');
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
        $this->dbj->where('aid',  $this->objdata->aid)
                ->update('t_char',(array)  $this->objdata);
        return TRUE;
    }
    // Lấy tất cả meta đối tượng
    public function get_data() {
        return $this->objdata;
    }
    // Xóa User
    public function delete() {
        $this->db->where('aid',  $this->objdata->id)
                ->delete('t_char');
    }
    // Thêm User
    public function char_add($data) {
        $this->db->insert('t_char',$data);
        return true;
    }

}

/* End of file  */
/* Location: ./application/models/ */