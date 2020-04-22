$(function() {
    $('.category_sort').nestable({
        maxDepth: 3
    }).nestable('collapseAll');

    $('.category_sort').on('change', function() {
        var $this = $(this);
        var post_data = {
    		sorter : $this.nestable('serialize'),
    	};
        ajax = $.post(get_url('Backend/category/save_cat'),post_data);

    });
    $(document).on("click", ".cat_del", function() {
        var id = $(this).attr('cat_id');
        swal({
			  title: "Xóa Danh Mục !",
			  text: "Bạn có chắc cho hành động này! Tất cả sản phẩm trong danh mục sẽ tạm thời khóa !",
			  type: "info",
			  confirmButtonText: "Có, Xóa",
			  cancelButtonText: "Thôi, Không Xóa",
			  showCancelButton: true,
			  closeOnConfirm: false,
			  showLoaderOnConfirm: true,
			},
			function(){
				var ajax = $.post(get_url('Backend/category/delete/' + id));
				ajax.done(function(){
					swal("Thành Công !","Danh mục đã xóa thành công !","success");
					reload_nestable();
				});
				ajax.fail(function(){
					swal("Thất Bại !","Không thể kết nối đến máy chủ !","error");
				})
			});
    });
     $(document).on("click", ".cat_edit", function() {
        id = $(this).attr('cat_id');
        open_category(id);
    });
    $(document).on("submit", "#frm_category", function(e) {
        e.preventDefault();
        NProgress.start();
        var data = $(this).serialize();
        var ajax = $.post(get_url('Backend/category/update'), data);
        ajax.done(function(data) {
            NProgress.done();
            reload_nestable();
            if (data.code == 200) {
                swal({
                        title: "Thành Công !",
                        text: data.message,
                        confirmButtonText: "Đóng",
                        type: "success"
                    },
                    function(isConfirm) {
                        $("#category").modal('hide');
                    }
                );
                return;
            }
            if (data.code == 501) {
                swal("Lỗi !", data.message, "error");
                return;
            }
            if (data.code == 901) {
                window.location.reload();
                return;
            }

        });
        ajax.fail(function() {
            swal({
                    title: "Lỗi !",
                    text: "Không thể kết nối tới máy chủ !",
                    confirmButtonText: "Tải Lại Trang",
                    type: "error"
                },
                function(isConfirm) {
                    window.location.reload();
                });
            return;
        });
    });
    $(document).on("click","#cat_save",function(){
    	var post_data = {
    		sorter : $('.category_sort').nestable('serialize'),
    	};
    	swal({
			  title: "Lưu Danh Mục !",
			  text: "Bạn có muốn lưu danh mục theo lưới đã đặt ? ",
			  type: "info",
			  confirmButtonText: "Có,Lưu",
			  cancelButtonText: "Thôi, Không Lưu",
			  showCancelButton: true,
			  closeOnConfirm: false,
			  showLoaderOnConfirm: true,
			},
			function(){
				var ajax = $.post(get_url('Backend/category/save_cat'),post_data);
				ajax.done(function(){
					swal("Thành Công !","Sắp xếp danh mục đã được lưu !","success");
				});
				ajax.fail(function(){
					swal("Thất Bại !","Không thể kết nối đến máy chủ !","error");
				})
			});

    });
    $("#pccolor").colorpicker();
});

function open_category(id) {
    NProgress.start();
    var ajax = $.post(get_url('Backend/category/info/' + id));
    ajax.done(function(data) {
        $("#pcid").val(data.pcid);
        $("#pcname").val(data.pcname);
        $("#pcalias").val(data.pcalias);
        $("#pcdesc").val(data.pcdesc);
        $("#pccolor").val(data.pccolor);
        if(data.pcsofooter == "1") {
            $("#show_on_footer").prop('checked',true);
        }
        else {
             $("#show_on_footer").prop('checked',false);
        }
        if(data.pcsotop == "1") {
            $("#show_on_header").prop('checked',true);
        }
        else {
             $("#show_on_header").prop('checked',false);
        } 
        if(data.pcsotop == "1") {
            $("#show_on_header").prop('checked',true);
        }
        else {
             $("#show_on_header").prop('checked',false);
        }
         if(data.pcsohome == "1") {
            $("#show_on_hone").prop('checked',true);
        }
        else {
             $("#show_on_hone").prop('checked',false);
        }
        change_icon(data.pcicon);
        change_banner(data.pcbanner);
        change_ads(data.pcads);
        NProgress.done();
        $("#category").modal();
    })
    ajax.fail(function() {
        swal("Lỗi Mất Kết Nối !", "Vui lòng tải lại trang và thử lại !", "error");
        NProgress.done();
    })
}

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

function change_icon(v) {
    thumb = v.replace("ino_upload/source","ino_upload/thumbs");
    $("#icon_img").attr("src", thumb);
    $("#icon_input").val(v);
}

function change_banner(v) {
    thumb = v.replace("ino_upload/source","ino_upload/thumbs");
    $("#banner_img").attr("src", thumb);
    $("#banner_input").val(v);
}
function change_ads(v) {
    thumb = v.replace("ino_upload/source","ino_upload/thumbs");
    $("#ads_img").attr("src", thumb);
    $("#ads_input").val(v);
}
function reload_nestable() {
	$.post(get_url('Backend/category/draw_nestable')).done(function(data){
		$('.category_sort').html(data);
        $('.category_sort').nestable('destroy').nestable({
            maxDepth: 3
        });
	});

}