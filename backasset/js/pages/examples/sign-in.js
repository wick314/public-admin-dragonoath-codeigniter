$(function () {
    $('#sign_in').validate({
        lang: 'vi',
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
        }
    });
    $(document).on("submit","#sign_in",function(e) {
        e.preventDefault();
        var data = $("#sign_in").serialize();
        $.post("#",data).done(function(result){
             if(result.code == 100) {
                    swal({
                      title: 'Đăng nhập thành công !',
                      html: "Chào mừng bạn đã quay trở lại Bấm Ok để được tiếp tục!",
                      type: 'success',
                      confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        window.location.reload();
                    });
                    return;
                }
            else if(result.code == 200) {
                 swal({
                      title: 'Có lỗi xảy ra!',
                      html: result.message,
                      type: 'warning',
                    });
            }
            else {
                swal({
                      title: 'Có lỗi xảy ra!',
                      html: "Có lỗi kết nối, Vui lòng kiểm tra lại hệ thống!",
                      type: 'error',
                      confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        window.location.reload();
                    });
                    return;
            }
             
         });
    });
});
