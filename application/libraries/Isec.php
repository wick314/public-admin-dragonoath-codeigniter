<?php if (!defined('BASEPATH')) exit('No direct script access allowed'); 
/* 
 * By InoueMiu @2016
 */
Class Isec {
    var $CI;
    var $User;
    public function __construct() {
        $this->CI =& get_instance();
    }
    public function response_json($json) {
        if(!is_string($json)) {
            $json = json_encode($json);
        }
        header('Content-Type: application/json');
        echo $json;
        return;
    }
    public function require_login() {
        if(!isset($_SESSION['uid']) || !isset($_SESSION['uhash'])) {
            session_destroy();
            redirect(base_url('Login'),'refresh');
            return FASLE;
        }
        $this->CI->load->model('Mgacc');
        if(!$this->User = $this->CI->Mgacc->get_id($_SESSION['uid'])) {
            session_destroy();
            redirect(base_url('Login'),'refresh');
            return FALSE;
        }
        if($this->User->get_meta('password') != $_SESSION['uhash']) {
            session_destroy();
            redirect(base_url('Login'),'refresh');
            return FALSE;
        }
        return TRUE;
    }
}

?>
