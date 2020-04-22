<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title><?php echo $_view['title']; ?></title>
    <!-- Favicon-->
    <link rel="icon" href="../../favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="<?php echo base_url(); ?>backasset/plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="<?php echo base_url(); ?>backasset/plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="<?php echo base_url(); ?>backasset/plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Preloader Css -->
    <link href="<?php echo base_url(); ?>backasset/plugins/material-design-preloader/md-preloader.css" rel="stylesheet" />

    <!-- JQuery DataTable Css -->
    <link href="<?php echo base_url(); ?>backasset/plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet"> 
    <!-- NProgress Css -->
    <link href="<?php echo base_url(); ?>backasset/plugins/nprogress/nprogress.css" rel="stylesheet">

    <!-- Sweet Alert -->
    <link href="<?php echo base_url(); ?>backasset/plugins/sweetalert/sweetalert2.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="<?php echo base_url(); ?>backasset/css/style.css" rel="stylesheet">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="<?php echo base_url(); ?>backasset/css/themes/all-themes.css" rel="stylesheet" />
    <?php foreach($_view['css'] as $css) : ?>
        <link href="<?php echo base_url().$css; ?>" rel="stylesheet" />
    <?php 
        endforeach;
    ?>
        <script>
            var BASE_URL = "<?php echo base_url(); ?>";
        </script>
</head>
