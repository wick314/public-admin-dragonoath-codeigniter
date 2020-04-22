<?php

Class Iview  {
    var $CI;
    private $data;
    private $js = array();
    private $css = array();
    private $var = array();
    public function __construct() {
        $this->CI =& get_instance();
        $this->init();
    }
    public function init() {
        $this->data = [
            'title' => "InoMiu System - TLBB",
            'description' => "Một con Mèo đang đi, Điều đó có nghĩa con mèo đang đi đâu đó !",
            'module' => "default",
            'canonical' => base_url(),
        ];
        return $this;
    }
    public function set_var($key,$value) {
        $this->var[$key] = $value;
    }
    public function set_title($val) {
        $this->data['title'] = $val;
    }
    public function set_canonical($value) {
        $this->data['canonical'] = $value;
    }
    public function set_description($val) {
        $this->data['description'] = $val;
    }
    public function set_module($val) {
        $this->data['module'] = $val;
    }
    public function add_css($name) {
        $this->css[] = $name;
    }
    public function add_js($js) {
        $this->js[] = $js;
    }
    public function load_view() {
        $this->data['js'] = $this->js;
        $this->data['css'] = $this->css;
        $view = [
            '_view' => $this->data,
        ];
        $view = array_merge($view,  $this->var);
        $this->CI->load->view('back/bootstrap',$view);
    }
}