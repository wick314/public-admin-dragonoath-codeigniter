$(document).ready(function() {
    /*---- fixed_menu ------*/
	fixed_menu(".wrap_slickmenu");
	fixed_menu(".wrap_all_menu");
	
	function fixed_menu(a){
		var menu_height_res = $(a).offset().top;
		var size = $(window).width()
		 $(window).bind('scroll', function() {
			 if ($(window).scrollTop() > menu_height_res) {
				 
				 $(a).addClass('fixed_menu'); 
				if(size > 640){
				 	$(".wrap_totop_icon").fadeIn(500);
				}
			 }
			 else {
				 $(a).removeClass('fixed_menu');
				 if(size > 640){
				 	$(".wrap_totop_icon").fadeOut(500);
				 }
			 }
		});
	}
	
	/***** end fixed_menu ******/
	
	/**** dropdown menu_home ***/
	$("li.item_menu").hover(function() {
        $(this).find("ul.sub_menu1").fadeIn(300);},
		function(){
		$(this).find("ul.sub_menu1").fadeOut(0); 
	});
	$("li.item_menu ul.sub_menu1 li.list_submenu1").hover(function(){
		$(this).find("ul.sub_menu2").fadeIn(300);},
		function(){
		$(this).find("ul.sub_menu2").fadeOut(0); 
	});	
	/**** end dropdown menu_home ***/
	
	/***** popup_search *****/
	
	$(document).on("click","span.search_butt",function(){
		if($(".che").css("display") == "none"){
			$(".che").fadeIn(300);
			$(".wrap_all_menu").css("display","none");
		}
		else{
			$(".che").fadeOut(200);
			$(".wrap_all_menu").css("display","block");
		}
	});
	
	$(document).keyup(function(e) {
	  if (e.keyCode === 27){
	  	$(".che").fadeOut(200);
		$(".wrap_all_menu").css("display","block");
	  }
	});
	
	/***** end popup_search ******/

	/**** roll_slide_but ******/
	$(document).on("click",".wrap_rollbut", function(){
		var x = $(".wrap_head_mhg").offset().top;
		var y = $(".wrap_about").offset().top - 50;
		var hei = y - x; 
        jQuery('html, body').animate({scrollTop: hei}, 500);
	});	
	/***** end roll_slide_but *****/
	
	/****** scroll_top ************/
	$(document).on("click","span.totop_icon", function(){
        jQuery('html, body').animate({scrollTop:0}, 500);
	});
	/****** end scroll_top **********/
	
	/****** count_number_effect ******/
	
	$('.counter').each(function() {
	  var $this = $(this),
		  countTo = $this.attr('data-count');
	  
	  $({ countNum: $this.text()}).animate({
		countNum: countTo
	  },
	
	  {
	
		duration: 1500,
		easing:'linear',
		step: function() {
		  $this.text(Math.floor(this.countNum));
		},
		complete: function() {
		  $this.text(this.countNum);
		  //alert('finished');
		}
	
	  });  

	});
	
	/****** end count_number_effect ****/
	
	
	/****** zoom_img *********/
	
	/**$("#zoom").elevateZoom({constrainType:"height", constrainSize:1000, zoomType: "lens", containLensZoom: true, gallery:'gallery_01', cursor: 'pointer', galleryActiveClass: "active"}); **/

	$(document).on("click",".zoom_img img", function(){
		var a = $(this).attr("src")
		$("#zoom").fadeOut(200) 
		setTimeout(function(){
			$("#zoom").attr("src",a);
			//**$("#zoom").data('zoom-image', a).elevateZoom({constrainType:"height", constrainSize:1000, zoomType: "lens", containLensZoom: true, gallery:'gallery_01', cursor: 'pointer', galleryActiveClass: "active"});**/
			$("#zoom").fadeIn(200);
			},100);																																																				
	});
	
	/****** end zoom_img ******/
	
	/****** load_complete_project *****/
	
	$(document).ready(function() {
		$(".wrap_all_proj .wrap_proj .wrap_proj_item:nth-child(n+7)").css("display","none");
		$(document).on("click",".wrap_plan_butt a",function(){
			$(this).parent().parent().find(".wrap_proj_item:nth-child(n+7)").fadeIn();
			$(this).parent().fadeOut();
			return false;
		});
	});
	
	/****** end load_complete_project *****/
	
	
	/***** over_menu ********/
		
	over_menu("li.menu_item:nth-child(2)",".wrap_homenu_mhg");
	over_menu(".wrap_homenu_mhg",".wrap_homenu_mhg");
	out_menu("li.menu_item:nth-child(2)",".wrap_homenu_mhg");
	out_menu(".wrap_homenu_mhg",".wrap_homenu_mhg");
	function over_menu(a,b){
		$(document).on("mouseover",a, function(){
			$(b).css("display","block");
		});
	}
	function out_menu(a,b){
		$(document).on("mouseout",a, function(){
			$(b).css("display","none");
		});
	}
	
	/********** end over_menu ********/
	
	/********** field_menu ************/
	menu_field(".wrap_col a.col_name");
	menu_field(".wrap_col .wrap_col_2 .col1 a.col_name2");
	menu_field(".wrap_col .wrap_col_2 .col2 a.col_name2");
	function menu_field(a,b){
		$(document).on("click",a,function(){
			if($(a).attr("aria-expanded") == "true"){
				$(this).find("span").removeClass("glyphicon-plus");
				$(this).find("span").addClass("glyphicon-minus");			
			}
			else{
				$(this).find("span").removeClass("glyphicon-minus");
				$(this).find("span").addClass("glyphicon-plus");				
			}
		})
	}
	/********** end field_menu **********/
	
});
$(document).ready(function(){
	
	$('.loop').owlCarousel({
		smartSpeed:700,
		center: true,
		items:2,
		loop:true,
		margin:10,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:3
			}
		}
	});
	
	var owl = $('.owl-carousel');
	owl.owlCarousel();
	// Go to the next item
	$('.customNextBtn').click(function() {
		owl.trigger('next.owl.carousel');
	})
	// Go to the previous item
	$('.customPrevBtn').click(function() {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		owl.trigger('prev.owl.carousel', [300]);
	})
	
});
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
function menuroll(a,b){			
			var x = $(".wrap_all_rollmenu").offset().top;
			var y = $(b).offset().top - 90;
			jQuery('html, body').animate({scrollTop: y}, 500);
		
	}
