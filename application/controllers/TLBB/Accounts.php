<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Accounts extends CI_Controller {
	private $view;
	public function __construct()
	{
		parent::__construct();
		$this->view = $this->iview->init();
		$this->isec->require_login();
	}

	public function index()
	{
		$this->view->add_js("backasset/plugins/select2/js/select2.full.js");
		$this->view->add_css('backasset/plugins/select2/css/select2.css');
		$this->view->add_js("backasset/js/modules/characters.js");
		$this->view->set_module('chars_list');
		$this->view->set_var('login_user',$this->isec->User);
		$this->view->load_view();
	}
	private function show_list() {
		
	}

	private function ajax_function() {
		
	}
	public function ajax_list() {
		$draw = $this->input->post('draw', TRUE);
		if(!$draw) $draw = 0;
		$start = $this->input->post('start', TRUE);
		$length = $this->input->post('length', TRUE);
		if(!$length) $length = 10;
		$search = $this->input->post('search', TRUE);
		$colm = array('aid','accname','charname','level');
		$order = $this->input->post('order', TRUE);
		$this->load->library('itable');
		$order = $this->itable->get_order($order,$colm);
		$search = $this->itable->get_search($colm);
		$this->load->model('Mgchars');
		$list =  $this->Mgchars->mget($colm,false,$length,$start,$search,$order);
		$count = $this->Mgchars->count($colm,false,$search);
		$result = array(
			'recordsTotal' => $count,
			'recordsFiltered' => $count,
			'data' => $list,
			'draw' => $draw++,
			);
		$this->isec->response_json($result);
	}
	public function get_char($id) {
		if(!$id || !is_numeric($id)) {
			$this->isec->response_json(['code' => 200, 'msg' => 'Không tìm thấy nhận vật này !']);
			return;
		}
		$this->load->model('Mgchar');
		$char =$this->Mgchar->get_id($id);
		if(!$char) {
			$this->isec->response_json(['code' => 200, 'msg' => 'Không tìm thấy nhận vật này !']);
			return;
		}
		$this->load->model('Mgacc');
		$accobj = $this->Mgacc->get_name($char->get_meta('accname'));
		$accresult = array(
			'accid' => $accobj->get_meta('id'),
			'accname' => $accobj->get_meta('name'),
			'iemail' => $accobj->get_meta('email'),
			'ipin' => $accobj->get_meta('pin'),
			'iphone' => $accobj->get_meta('sodienthoai'),
			'chbm' => $accobj->get_meta('question'),
			'answer' => $accobj->get_meta('answer'),
			'score' => $accobj->get_meta('score'),
		);
		$this->isec->response_json(['code' => 100, 'msg' => "done mfk !",'data' => $char->get_data(),'account' => $accresult]);
		return;
	}
	public function get_acc() {
		$acc = $this->input->get('acc', TRUE);
		if(!$acc) {
			$this->isec->response_json([]);
			return;
		}
		$this->load->model('Mgaccs');
		$accs = $this->Mgaccs->search_list($acc);
		$this->isec->response_json($accs);
	}
	public function change_acc() {
		$char = $this->input->post('charname', TRUE);
		$newacc = $this->input->post('inpnewacc', TRUE);
		$charid = $this->input->post('inpcharid',TRUE);
		if(!$char || !$newacc || !$charid || !is_numeric($charid)) {
			$this->isec->response_json(['code' => 200, 'msg' => 'Vui lòng nhập đủ thông tin!']);
			return;
		}
		$this->load->model('Mgchar');
		$objchar = $this->Mgchar->get_id($charid);
		if(!$objchar) {
			$this->isec->response_json(['code' => 200, 'msg' => 'Nhân vật này không tồn tại!']);
			return;
		}
		$this->insert_log($objchar->get_meta('charname') . "( " . $objchar->get_meta('accname') . " )" . " Change to Account : ". $newacc);
		$objchar->set_meta('accname',$newacc);
		$objchar->save();
		$this->isec->response_json(['code' => 100, 'msg' => 'Lưu thông tin thành công!']);
	}
	private function insert_log($data) {
		$ins = sprintf("[%s] - ('%s') : %s \r\n",date('h:i:s a'),$this->isec->User->get_meta('name') ,$data);
		$file = date('d_m_Y').".txt";
		$this->file_force_contents('logs/'.$file, $ins,FILE_APPEND);
	}
	function file_force_contents($filename, $data, $flags = 0){
	    if(!is_dir(dirname($filename)))
	        mkdir(dirname($filename).'/', 0777, TRUE);
	    return file_put_contents($filename, $data,$flags);
	}

}

/* End of file Accounts.php */
/* Location: ./application/controllers/Accounts.php */
