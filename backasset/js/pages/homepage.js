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
function responsive_filemanager_callback(id) {
    $trans = $("#" + id);
    $val = $trans.val();
    $callback = $trans.attr('callback');
    console.log($callback);
    eval($callback + "('" + $val + "')");
    $("#imgModal").modal('hide');
}
function open_img_select(ele, callback) {
    $ele = $(ele);
    $trans = $("#responsive_apply");
    $trans.attr("callback", callback);
    $("#iframe_img").attr("src", get_url("inofmng/dialog.php?type=2&field_id=responsive_apply&fldr="));
    $("#imgModal").modal();
}
function add_banner_img(v,sort = 0,link = "#") {
      thumb = v.replace("ino_upload/source","ino_upload/thumbs");
     var template = '<tr><input type="hidden" name="banners[]" value="'+v+'"><td><input type="number" value="'+sort+'" name="sorts[]"/></td><td><img src="'+ thumb + '"> </td>'
            +'<td><input type="text" value="'+link+'" name="links[]"/></td></td>'
            +'<\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_banner\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
        $('#banner_zone_table').prepend(template);
        $('.no_banner_table').hide();
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
    
$(document).ready(function () {
    $(document).on('submit', "#home_product", function (e) {
        e.preventDefault();
        $form = $(this);
        form_submit($form,"add_bbanner_success");
       
    });
    $(document).on("submit","#banner_zone",function(e){
        e.preventDefault();
        $form = $(this);
        form_submit($form,"add_bbanner_success");
    });
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
   $("#testimonial_choice").select2({
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
  function formatRepo (repo) {
        if (repo.loading) return repo.name;

        return repo.name;
      }
   function formatRepoSelection (repo) {
        return repo.name;
      }

  function add_product(id,sort) {
      if($("input[name='products["+id+"][id]").length > 0) {
          swal("Lỗi", "Sản phẩm này đã tồn tại trong danh sách !", "error");
          return;
      }
      $.get(get_url("Backend/product/get_id/" + id)).done(function(data){
          if(data.code != 100) {
              swal("Lỗi", data.message, "error");
              return;
          }
          var template = '<tr><input type="hidden" name="products['+data.data.pid+'][id]" value="'+data.data.pid+'"/><td><input type="number" value="'+sort+'" name="products['+data.data.pid+'][sort]"/></td> <td>'+ data.data.pname
              +'<\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_rel_product\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
          $('#product_zone').prepend(template);
          $('.table_no_product').hide();
      });
      
  }
  function add_project(id,sort) {
      if($("input[name='projects["+id+"][id]").length > 0) {
          swal("Lỗi", "Sản phẩm này đã tồn tại trong danh sách !", "error");
          return;
      }
      $.get(get_url("Backend/news/get_id/" + id)).done(function(data){
          if(data.code != 100) {
              swal("Lỗi", data.message, "error");
              return;
          }
          var template = '<tr><input type="hidden" name="projects['+data.data.nid+'][id]" value="'+data.data.nid+'"/><td><input type="number" value="'+sort+'" name="projects['+data.data.nid+'][sort]"/></td> <td>'+ data.data.nname
              +'<\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_rel_project\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
          $('#project_zone').prepend(template);
          $('.table_no_project').hide();
      });
      
  }
  function add_tes(id,sort) {
      if($("input[name='tes["+id+"][id]").length > 0) {
          swal("Lỗi", "Sản phẩm này đã tồn tại trong danh sách !", "error");
          return;
      }
      $.get(get_url("Backend/news/get_id/" + id)).done(function(data){
          if(data.code != 100) {
              swal("Lỗi", data.message, "error");
              return;
          }
          var template = '<tr><input type="hidden" name="tes['+data.data.nid+'][id]" value="'+data.data.nid+'"/><td><input type="number" value="'+sort+'" name="tes['+data.data.nid+'][sort]"/></td> <td>'+ data.data.nname
              +'<\/td><td><a class=\"btn btn-danger btn-xs waves-effect delete_testimonial\"><i class=\"material-icons\">delete_forever<\/i> Xóa<\/a><\/td><\/tr>';
          $('#testimonial_zone').prepend(template);
          $('.table_no_testimonial').hide();
      });
      
  }
  $(document).on('click','.p_add',function(){
      add_product($("#product_choice").val(),1);
  });
  $(document).on('click','.j_add',function(){
      add_project($("#news_choice").val(),1);
  });
   $(document).on('click','.t_add',function(){
      add_tes($("#testimonial_choice").val(),1);
  });
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
  $(document).on("click",".delete_banner",function(){
       selector = $(this).parents('tr');
       selector.remove();
       if($("#banner_zone_table").find('tr').length > 1) {
          $('.no_banner_table').hide();
       }
       else {
          $('.no_banner_table').show();
       }
  });
  $(document).on("click",".delete_rel_project",function(){
       selector = $(this).parents('tr');
       selector.remove();
       if($("#project_zone").find('tr').length > 1) {
          $('.table_no_project').hide();
       }
       else {
          $('.table_no_project').show();
       }
  });
  $(document).on("click",".delete_testimonial",function(){
       selector = $(this).parents('tr');
       selector.remove();
       if($("#testimonial_zone").find('tr').length > 1) {
          $('.table_no_testimotial').hide();
       }
       else {
          $('.table_no_project').show();
       }
  });

  setTimeout(function(){
      try {
          if(typeof plist === "number") {
               add_product(plist);
               return;
          }
           plist.forEach(function(v,k){
              add_product(v,k);
          });
      }
      catch(e) {
          console.log(e.message);
      }
  }); 
  setTimeout(function(){
      try {
          if(typeof project_list === "number") {
               add_project(project_list);
               return;
          }
           project_list.forEach(function(v,k){
              add_project(v,k);
          });
      }
      catch(e) {
          console.log(e.message);
      }
  }); 
  setTimeout(function(){
      try {
          if(typeof testimonial_list === "number") {
               add_tes(testimonial_list);
               return;
          }
           testimonial_list.forEach(function(v,k){
              add_tes(v,k);
          });
      }
      catch(e) {
          console.log(e.message);
      }
  });
   setTimeout(function(){
      try {
          if(typeof pinned_list  === "number") {
               add_project(pinned_list );
               return;
          }
           pinned_list .forEach(function(v,k){
              add_project(v,k);
          });
      }
      catch(e) {
          console.log(e.message);
      }
  });
  setTimeout(function(){
      try {
           banner_list .forEach(function(v,k){
              console.log(v);
              add_banner_img(v.url,k,v.link);
          });
      }
      catch(e) {
          console.log(e.message);
      }
  });


});