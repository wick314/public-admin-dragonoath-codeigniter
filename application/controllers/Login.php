<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if(isset($_SESSION['uid']) && isset($_SESSION['uhash'])) {
			header("Location: ".base_url('TLBB/Accounts/'));
			return;
		}
		if($this->input->is_ajax_request()) {
			$this->auth_login();
			return;
		}
		$this->load->view('back/ladding/login');
	}
	private function auth_login() {
		$user = $this->input->post('username', TRUE);
		$pass = $this->input->post('password', TRUE);
		if(!$user || !$pass) {
			$this->isec->response_json(array('code' => 200,'message' => "Sai thông tin đăng nhập !"));
			return;
		}
		$this->load->model('Mgacc');
		$udata = $this->Mgacc->get_name($user);
		// Sai tên tài khoản 
		if(!$udata) {
			$this->isec->response_json(array('code' => 200,'message' => "Sai thông tin đăng nhập !"));
			return;
		}
		// Sai password
		if(md5($pass) != $udata->get_meta('password')) {
			$this->isec->response_json(array('code' => 200,'message' => "Sai thông tin đăng nhập !"));
			return;
		}
		if($udata->get_meta('is_admin') != 1) {
			$this->isec->response_json(array('code' => 200,'message' => "Bạn không đủ quyền truy cập !"));
			return;
		}
		// tạo thông tin đăng nhập 
		$session = array(
			'uid' => $udata->get_meta('id'),
			'uhash' => $udata->get_meta('password'),
		);
		$_SESSION = $session;
		$this->isec->response_json(array('code' => 100,'message' => "Đăng nhập thành công !"));
		return;
	}

}

/* End of file Login.php */
/* Location: ./application/controllers/Login.php */