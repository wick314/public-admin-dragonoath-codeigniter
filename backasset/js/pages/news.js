var productTable;
$(function () {
    //Exportable table
    productTable = $('.tableProducts').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ],
        responsive: true,
    });
    $(".currency").inputmask({'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'suffix': ' vnđ ', 'placeholder': '0'});
    tinymce.init({
        selector: "textarea.product_des_editor",
        theme: "modern",
        height: 300,
        relative_urls: false,
        remove_script_host : false,
        document_base_url: BASE_URL,
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager'
        ],
        toolbar1: 'insertfile undo redo | styleselect | fontsizeselect bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
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
    $(document).on('submit', "#edit_product", function (e) {
        e.preventDefault();
        $form = $(this);
        form_submit($form,"add_bbanner_success");
       
    });
    $(document).on('click','.delete_product',function(){
        id = $(this).attr('product_id');
        selector = productTable.row($(this).parents('tr'));
        confirmDelete(id,selector);
    });
    $(document).on('click', '.add_bbanner_success', function () {
        window.location = BASE_URL + "Backend/News"
    });
    $(".owl-carousel").owlCarousel({
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                loop:false
            },
            600:{
                items:3,
                loop:false
            },
            1000:{
                dotsEach:1,
                items:6,
                loop:false
            }
        }
    });
    $(document).on('mousewheel', '.owl-carousel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            $(this).trigger('next.owl');
        } else {
            $(this).trigger('prev.owl');
        }
        e.preventDefault();
    });
    $(".owl-carousel").on("click",".preview_img .img_del",function(){
        var carousel = $(this).attr('carousel');
        var wrapper = $(this).parents(".owl-item");
        $(carousel).trigger('remove.owl.carousel', wrapper.index()).trigger('refresh.owl.carousel');
        wrapper.remove();
        load_img(carousel);

    });
});
function load_img(selector) {
    try {
        $(selector).data('lightGallery').destroy(true);
    }
    catch(ex) {
        //console.log(ex);
    }
     $(selector).lightGallery({
        selector: '.item'
     });
    //item  = $(selector).find(".owl-item").length;
    $(selector).trigger('to.owl.carousel',1);
     
}

function confirmDelete(id,selector) {
    swal({
        title: "Xác nhận Xóa ?",
        text: "Bạn có chắc chắn muốn xóa không? Sản phẩm này không thể khôi phục lại/",
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
                    swal("Xóa Thành Công!", "Sản phẩm của bạn đã được xóa !.", "success");
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
/* IMG SELECT */
function open_img_select(ele, callback) {
    $ele = $(ele);
    $trans = $("#responsive_apply");
    $trans.attr("callback", callback);
    $("#iframe_img").attr("src", get_url("inofmng/dialog.php?type=2&field_id=responsive_apply&fldr="));
    $("#imgModal").modal();
}

function responsive_filemanager_callback(id) {
    $trans = $("#" + id);
    $val = $trans.val();
    $callback = $trans.attr('callback');
    console.log($callback);
    eval($callback + "('" + $val + "')");
    $("#imgModal").modal('hide');
}
function add_main_img(v) {
    if($("[name='nimg[]'][value='"+v+"']").length > 0) {
        swal("Lỗi Trùng Ảnh !","Hình ảnh của bạn đã nằm trong danh sách chọn !","error");
        return;
    }
    thumb = v.replace("ino_upload/source","ino_upload/thumbs");
     $('.main_img')
     .trigger('add.owl.carousel', ['<div  class="preview_img" ><span class="img_del" carousel=".main_img">Xóa</span><input name="nimg[]" value="' + v + '" type="hidden" /><a class="item" href="'+ v +'"><img class="img_preview"  src="' + thumb + '"/></a></div>'])
     .trigger('refresh.owl.carousel');
     load_img($('.main_img'));
}
$("#ncat").select2({
     ajax: {
        placeholder: "Chọn danh mục",
        url: get_url('Backend/newscategory/category'),
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            cat: params.term, // search term
          };
        },
        processResults: function (data, params) {
          return {
            results: data,
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) { return markup; },
      minimumInputLength: 3,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection 
}).trigger('change');
function formatRepo (repo) {
      if (repo.loading) return repo.name;

      return repo.name;
    }
 function formatRepoSelection (repo) {
      return repo.name;
    }
$("#ntype").select2();

    setTimeout(function(){
        try {
            main_img.forEach(function(v,k){
                add_main_img(v);
            });
        }
        catch(e) {

        }
    },0);
    
if(ncat) {
    setTimeout(function(){
        $('#ncat').select2("trigger","select",{data:ncat});
    },0);
}

$("#product_choice").select2({
     ajax: {
        placeholder: "Chọn sản phẩm",
        url: get_url('Backend/product/search_name'),
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            name: params.term, // search term
          };
        },
        processResults: function (data, params) {
          return {
            results: data,
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) { return markup; },
      minimumInputLength: 3,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection 
}).trigger('change');

function add_product(id) {
    if($("input[name='products["+id+"]").length > 0) {
        swal("Lỗi", "Sản phẩm này đã tồn tại trong danh sách !", "error");
        return;
    }
    $.get(get_url("Backend/product/get_id/" + id)).done(function(data){
        if(data.code != 100) {
            swal("Lỗi", data.message, "error");
            return;
        }
        var template = '<tr><input type="hidden" name="products['+data.data.pid+']"/> <td>'+ data.data.pname
            +'<\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_rel_product\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
        $('#product_zone').prepend(template);
        $('.table_no_product').hide();
    });
    
}
$(document).on('click','.p_add',function(){
    add_product($("#product_choice").val());
});;
$(document).on("click",".delete_rel_product",function(){
     selector = $(this).parents('tr');
     selector.remove();
     if($("#product_zone").find('tr').length > 1) {
        $('.table_no_product').hide();
     }
     else {
        $('.table_no_product').show();
     }
});

$("#news_choice").select2({
     ajax: {
        placeholder: "Chọn sản phẩm",
        url: get_url('Backend/news/search_name'),
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            name: params.term, // search term
          };
        },
        processResults: function (data, params) {
          return {
            results: data,
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) { return markup; },
      minimumInputLength: 3,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection 
}).trigger('change');

function add_news(id) {
    if($("input[name='news["+id+"]").length > 0) {
        swal("Lỗi", "Bài viết này đã tồn tại trong danh sách !", "error");
        return;
    }
    $.get(get_url("Backend/news/get_id/" + id)).done(function(data){
        if(data.code != 100) {
            swal("Lỗi", data.message, "error");
            return;
        }
        var template = '<tr><input type="hidden" name="news['+data.data.nid+']"/> <td>'+ data.data.nname
            +'<\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_rel_news\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
        $('#news_zone').prepend(template);
        $('.table_no_news').hide();
    });    
}

$(document).on('click','.news_add',function(){
    add_news($("#news_choice").val());
});;
$(document).on("click",".delete_rel_news",function(){
     selector = $(this).parents('tr');
     selector.remove();
     if($("#news_zone").find('tr').length > 1) {
        $('.table_no_news').hide();
     }
     else {
        $('.table_no_news').show();
     }
});

setTimeout(function(){
    try {
        if(typeof relative_news === "number") {
             add_news(relative_news);
             return;
        }
         relative_news.forEach(function(v,k){
            add_news(v);
        });
    }
    catch(e) {
        console.log(e.message);
    }
});
setTimeout(function(){
    try {
        if(typeof relative_products === "number") {
             add_product(relative_products);
             return;
        }
         relative_products.forEach(function(v,k){
            console.log(v);
            add_product (v);
        });
    }
    catch(e) {
        console.log(e.message);
    }
});