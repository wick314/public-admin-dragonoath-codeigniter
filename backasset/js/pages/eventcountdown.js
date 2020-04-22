$(function () {
    moment.locale('vi');
    if($('#product_zone').find('tr').length > 1) {
         $('.table_no_product').hide();
    }
    $('.datetimetyper').inputmask('d/m/y h:s', { placeholder: '__/__/____ __:__', alias: "datetime", hourFormat: '24' });
    //Exportable table
    EventTable = $('.EventProducts').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    });
    $(".currency").inputmask({'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'suffix': ' vnđ ', 'placeholder': '0'});
    tinymce.init({
        selector: "textarea.product_des_editor",
        theme: "modern",
        height: 300,
        relative_urls: false,
        remove_script_host : false,
        document_base_url: BASE_URL,
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons',
        image_advtab: true,
        external_filemanager_path: BASE_URL + "/inofmng/",
        filemanager_title:"Quản Lý File" ,
        external_plugins: { "filemanager" : BASE_URL + "/inofmng/plugin.min.js"}
    });
    tinymce.suffix = ".min";
    tinyMCE.baseURL = BASE_URL+'backasset/plugins/tinymce';
});
function form_submit($form,$class) {
    $post = $form.serialize();
    $submit = $form.find("button[type='submit']");
     var ajax = $.post('#', $post);
        ajax.done(function (data) {
            if (data.code == '200') {
                showNotification("alert-warning", data.message, "bottom", "center", null, null);
                return;
            }
            if (data.code == '100') {
                showNotification("alert-success", data.message, "bottom", "center", null, null);
                $submit.html('<i class="material-icons">keyboard_backspace</i>  Quay Lại');
                $submit.attr('type', 'button');
                $submit.removeClass('btn-primary');
                $submit.addClass('btn-success');
                $submit.addClass($class);
            }
        });
}
$(document).ready(function () {
    $(document).on('submit', "#event_frm", function (e) {
        e.preventDefault();
        $form = $(this);
        form_submit($form,"go_back");
       
    });
    $(document).on('click','.delete_product',function(){
        id = $(this).attr('product_id');
        selector = $(this).parents('tr');
        console.log(selector);
        confirmDelete(id,selector);
    });
    $(document).on('click','.delete_event',function() {
        id = $(this).attr('event_id');
        selector = EventTable.row($(this).parents('tr'));
        EventDelete(id,selector);
    })
    $(document).on('click','.p_add',function(){
        var pselector = $("#product_choice");
        var pselector = pselector.find("option:selected").first();
        id = pselector.attr('value');
        name = pselector.attr('pname');
        add_product(id,name,1,0);
        console.log();
    });
    $(document).on('click', '.go_back', function () {
        window.location = BASE_URL + "Backend/Eventdown"
    });
});
function add_product(id,name,a1,a2) {
    if($("input[name='products["+id+"][have_am]']").length > 0) {
        swal("Lỗi", "Sản phẩm này đã tồn tại trong danh sách !", "error");
        return;
    }
    var template = '<tr> <td>'+ name
            +'<\/td><td> <input name=\"products['+ id
            +'][have_am]\"  type=\"number\" value=\"'+ a1
            +'\" > <\/td><td> <input name=\"products['+ id
            +'][sell_am]\"  type=\"number\" value=\"'+ a2
            +'\"> <\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_product\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
    $('#product_zone').prepend(template);
    $('.table_no_product').hide();
}
function confirmDelete(id,selector) {
    swal({
        title: "Xác nhận Xóa ?",
        text: "Bạn có chắc chắn muốn xóa không? Sản phẩm này không thể khôi phục lại ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Tiếp Tục",
        cancelButtonText: "Không Xóa Nữa",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
                    selector.remove();
                    swal("Xóa Thành Công!", "Sản phẩm của bạn đã được xóa !.", "success");
                    if($('#product_zone').find('tr').length < 2) {
                            $('.table_no_product').show();
                       }
                    return;
        }
    });
}
function EventDelete(id,selector) {
    swal({
        title: "Xác nhận Xóa ?",
        text: "Bạn có chắc chắn muốn xóa không? Phiên này không thể khôi phục lại ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Tiếp Tục",
        cancelButtonText: "Không Xóa Nữa",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            $.post('#',{'id':id}).done(function(data){
                if(data.code == 100) {
                    selector.remove().draw(false);
                    swal("Xóa Thành Công!", "Phiên đếm ngược của bạn đã được xóa !.", "success");
                    return;
                }
                swal("Lỗi", data.message, "error");
            });
        }
    });
}
function showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: 1000,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
            template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
}