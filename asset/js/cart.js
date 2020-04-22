$(document).ready(function(){
	$(document).on('click','.inc_cart',function(){
		var select = $(this).parent(".wrap_count_info").find(".num_cart").first();
		var number = parseInt(select.val())
		var pid = $(this).parent(".wrap_count_info").data('pid');
		select.val(++number);
		update_cart(pid,number);
		calc_total();
	});
	$(document).on('click','.dec_cart',function(){
		var select = $(this).parent(".wrap_count_info").find(".num_cart").first();
		var pid = $(this).parent(".wrap_count_info").data('pid');
		var number = parseInt(select.val())
		if(number < 2) {
			number = 2;
		} 
		select.val(--number);
		update_cart(pid,number);
		calc_total();
	});
	$(document).on('keyup','.num_cart',function(e){
		if(isNaN($(this).val())) {
			var selector = $(this);
			var val = selector.val().replace(/\D/g,'');
			selector.val(val);
		}
		if($(this).val() == "") {
			$(this).val(0);
		}
		$(this).val(parseInt($(this).val()));
		var pid = $(this).parent(".wrap_count_info").data('pid');
		update_cart(pid,$(this).val());
		calc_total();
	});

	$(document).on('submit','#order_frm',function(e){
		e.preventDefault();
	});
	calc_total();
});
function update_cart(pid,amount) {
	var ajax = $.get(ROOT + "Spa/cart/add/"+pid+"/"+amount);
	ajax.fail(function(){
		alert("Không thể cập nhật giỏ hàng");
	})
}
function calc_total() {
	var total   = 0;
	$('.wrap_count_info').each(function(v,k){
		var cost = $(this).data('cost');
		var am = $(this).find('.num_cart').first().val();
		am = parseInt(am);
		total += cost*am;
	});
	$("#cart_total").html(total.format());
}
function cart_delete(select) {
	var s = $(select);
	var pid = s.data('pid');
	var count = parseInt($("#cart_count").text());
	$("#cart_count").text(--count); -
	-  
	s.parents(".wrap_cart_info").first().remove();
	var ajax = $.get(ROOT + "Spa/cart/del/"+pid);
	ajax.fail(function(){
		alert("Không thể cập nhật giỏ hàng");
	})
}
