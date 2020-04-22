var table;
$(document).ready(function(){
	table = $("#chars_list").DataTable( {
        "processing": true,
        "serverSide": true,
        "searchDelay": 350,
        "bStateSave": false,
        "ajax": {
            "url": BASE_URL + "/TLBB/Accounts/ajax_list",
            "type": "POST"
        },
        "order": [[ 0, "desc" ]],
        "columnDefs":[
            {
                "targets" : 1,
                'orderable': true,
                 'render': function(data,type,row) {
                    return "<b>" + data + "</b>";
                 }
            },
            {
                "targets" : 2,
                'orderable': true,
                 'render': function(data,type,row) {
                    return "<b>" + data + "</b>";
                 }
            },
			{
                "targets" : 3,
                'orderable': true,
                 'render': function(data,type,row) {
                    return "<b>" + data + "</b>";
                 }
            },
            {
                "targets" : 4,
                'orderable': false,
                'render': function(data,type,row) {
                    return "<a style='cursor:pointer;color:blue;font-weight:bold;' class='inopopup' data-id='" + data +"'> Thông Tin </a>";
                }
            }
        ],
        "columns": [
            { "name" : "aid","data": "aid" },
            { "data": "accname" },
            { "data": "charname" },
            { "data": "level" },
            { "data": "aid" },
        ],
    });
    $('#chars_list tfoot th').each( function () {
        var title = $(this).text();
        if($(this).attr('disable') !== undefined) return; 
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );
    table.columns().every( function () {
        var that = this;
        
        $('input',this.footer()).on('keyup change', function () {
            if ( that.search() !== this.value ) {
                that.search( this.value ).draw();
            }
        });
    });
    $(document).on('click',".inopopup",function(e){
        var id = $(this).attr('data-id');
        if(!id) return;
        load_character(id);

    });
    $(document).on('click',"#btninomodal_sbm",function(e){
        var frmdiv_id = $("#uinfotabs").find('a[aria-expanded="true"]').first().attr('href');
        var frm_list = $(frmdiv_id).find('form');
        console.log(frm_list);
        if(frm_list.length < 1) {
            $("#inomodal").modal('hide');
            swal("Thành Công !","Lưu thông tin thành công !","success");
            return;
        }
        frm_list.first().submit();
    });
    $(document).on('submit',"form",function(e){
        e.preventDefault();
        swal_loading("Đang lưu dữ liệu !");
        var route = $(this).attr('action');
        if(!route) {
            route = "#";
        }
        var data = $(this).serialize();
        var ajax = $.post(route,data);
        ajax.done(function(res) {
            if(res.code == 100) {
                NProgress.done();
                swal("Thành Công !","Lưu thông tin thành công !","success");
                table.draw();
                $("#inomodal").modal('hide');
                return;
            }
            if(res.code == 200) {
                NProgress.done();
                swal("Lỗi !",res.msg,'error');
                return;
            }
            swal("Lỗi Kết Nối","Không thể kết nối đến máy chủ !",'error');
            window.location.reload();
            NProgress.done();
        }).fail(function(){
            NProgress.done();
            swal("Lỗi Kết Nối","Không thể kết nối đến máy chủ !",'error');
            //window.location.reload();
        }); 
    });
    
    $("#inpnewacc").select2({
         ajax: {
            placeholder: "Chọn tài khoản mới",
            url: get_url('TLBB/Accounts/get_acc/'),
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                acc: params.term, // search term
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
          minimumInputLength: 1,
          templateResult: (choose) => {
                                        if (choose.loading) return choose.name;
                                        return choose.name;
                                },
          templateSelection: (choose) => { return choose.name; },
          width: '100%',

    }).trigger('change');
    //mixing function
    function swal_loading(text) {
        swal.queue
        ([{
          title: text,
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
          onOpen: function()
          {
            swal.showLoading();
          }
        }]);
    }
    function swal_end() {
        swal.close();
    }
    function load_character(id) {
        swal_loading('Đang tải dữ liệu !');
        ajax = $.get(BASE_URL + "TLBB/accounts/get_char/" + id);
        ajax.done(function(data) {
            if(data.code == 200) {
                swal("Có lỗi xảy ra !",data.msg,'warning');
                return;
            }
            if(data.code == 100) {
                $("#inomodal").modal();
                $('a[href="#tab_charinfo"]').tab('show');
                console.log(data.data);
                setfrm_data('#inomodal',data.data,'m');
                setfrm_data('#inomodal',data.account,'ino_');
                $('#inpnewacc').val('').trigger('change');

                swal_end();
                return;
            }
            swal("Có lỗi xảy ra !","Dữ liệu máy chủ trả về không chính xác !",'warning');
            return;
        });
    }
    function setfrm_data(frm,data,prefix) {
        $.each(data,(k,v) => {
            temp = $(frm).find('.' + prefix + k);
            if(temp.length > 0) {
                temp.each((k1,v1) => {
                    $(v1).val(v);
                });
            }
        })
    }
});