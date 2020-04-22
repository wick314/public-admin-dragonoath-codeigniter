<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Đăng Nhập | InoMiu System</title>
    <!-- Favicon-->
<link rel="icon" href="../../favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="<?php echo base_url("backasset") ?>/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="<?php echo base_url("backasset") ?>/plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="<?php echo base_url("backasset") ?>/plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Sweet Alert Css -->
    <link href="<?php echo base_url("backasset") ?>/plugins/sweetalert/sweetalert2.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="<?php echo base_url("backasset") ?>/css/style.css" rel="stylesheet">
</head>

<body class="login-page">
    <div class="login-box">
        <div class="logo">
            <a href="javascript:void(0);">InoMiu<b>System</b></a>
            <small>Hệ thống quản lý TLBB - by InoMiu</small>
        </div>
        <div class="card">
            <div class="body">
                <form id="sign_in" method="POST" autocomplete="false">
                    <div class="msg">Đăng nhập đễ tiếp tục</div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="username" placeholder="Tài khoản" required autofocus>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input type="password" class="form-control" name="password" placeholder="Mật khẩu" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 p-t-5">
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-block bg-pink waves-effect" type="submit">ĐĂNG NHẬP</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Jquery Core Js -->
    <script src="<?php echo base_url("backasset") ?>/plugins/jquery/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="<?php echo base_url("backasset") ?>/plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="<?php echo base_url("backasset") ?>/plugins/node-waves/waves.js"></script>

     <!-- SweetAlert Plugin Js -->
    <script src="<?php echo base_url("backasset") ?>/plugins/sweetalert/sweetalert2.all.min.js"></script>

    <!-- Validation Plugin Js -->
    <script src="<?php echo base_url("backasset") ?>/plugins/jquery-validation/jquery.validate.js"></script>
    <script src="<?php echo base_url("backasset") ?>/plugins/jquery-validation/localization/messages_vi.js"></script>
    <!-- Custom Js -->
    <script src="<?php echo base_url("backasset") ?>/js/admin.js"></script>
    <script src="<?php echo base_url("backasset") ?>/js/pages/examples/sign-in.js"></script>
</body>

</html>