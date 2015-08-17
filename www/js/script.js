//var base_url = "http://localhost/getit_final/";
var base_url = "http://casaestilo.in/sumotech/getit/";
$(document).ready(function(){
	
	//var base_url = "http://192.168.1.106/getit_final/";
	
	
	var pre_url = "";
	
	
	
	//get cart and wish list count
	function get_header(){
		$("#loader").show();
		
		url = base_url+"home/get_header/";
		$.getJSON(url, function(data) {
			//console.log(data);
			$("#total_products_cart").html(data.total_products_cart);
			$("#total_products_wish").html(data.total_products_wish);
			if(data.logged_in){
				$("#nav_login_btn").hide();
				$("#nav_register_btn").hide();
				$("#nav_logout_btn").show();
			}
			if(data.logged_out){
				$("#nav_login_btn").show();
				$("#nav_register_btn").show();
				$("#nav_logout_btn").hide();
			}
			$("#loader").fadeOut();
		});
	}
	
	get_header();
	
	//$(".welcome_screen").on("click",function(){
	//	
    //    $(this).animate({opacity: "toggle"},1000);
    //    //$(this).animate({left: "-100%"},700);
    //    //$(this).fadeOut('1000');
	//});
	
	setTimeout(function(){ 
		 $('.welcome_screen').animate({opacity: "toggle"},1000);
	}, 3000);
	// all products slider
	var all_products_slider = $('#all_products_slider').bxSlider({
		mode: 'vertical',
		slideMargin: 10,
		minSlides: 4,
		maxSlides: 1,
		//slideWidth: 80,
		moveSlides: 1,
		infiniteLoop: false,
		hideControlOnEnd: true,
		pager:false
	});
	
	//gallery slider
	
	var gallery_slider = $('#product_gallery_all_images').bxSlider({
		slideMargin: 5,
		minSlides: 3,
		maxSlides: 3,
		slideWidth: 100,
		moveSlides: 1,
		infiniteLoop: false,
		page: false,
		//hideControlOnEnd: true
	});

//-------------------header start---------------------
	$(".nav_button").on("click",function(e){
	
		$('.navigation').toggleClass('navigation_active');
		$('.menu_icon').toggleClass('menu_active');
		//$('.menu_icon').css('-webkit-transform','rotate(90deg)');
		e.preventDefault();
		e.stopPropagation();
	});
	$(document).on('click',function(){
		//$(".navigation").hide();
		$('.navigation').removeClass('navigation_active');
		$('.menu_icon').removeClass('menu_active');
	});
	$("#logo").on("click",function(){
		$(".all_pages").hide();
		$("#loader").fadeIn(function(){
				$("#enter_code").fadeIn(function(){
					$("#loader").fadeOut();
				});
				$('#getit_code1').focus();
		});
		
	
	});
	
	//get wish list
	$(".get_wish_list").on("click",function(){
		$("#loader").fadeIn();
		url = base_url+"home/get_wish_products";
		$.getJSON(url, function(data) {
			//console.log(data);
			$("#all_product_list").html("");
			if(data){
				$.each(data, function(index, value){
					
					$.each(value, function(index1, value1){
						console.log(value1);
						var html = '<div class="list_product container-fluid"><div class="col-md-9 col-sm-9 col-xs-9"><h4 class="list_prod_name">'+value1.item_name+'</h4><span class="list_qty" >QTY</span><input type="text" class="product_qty_input" value="'+value1.item_quantity+'" readonly /><span class="price_label">$ '+value1.item_total_price+'/-</span><span class="remove_label remove_wish_product" alt="'+value1.item_id+'">REMOVE</span><span class="add_to_cart_label2 " alt="'+value1.item_id+'">ADD TO CART</span></div><div class="col-md-3 col-sm-3 col-xs-3 no_padding"><img src="'+base_url+'uploads/products/small/'+value1.item_image+'" alt="" /></div></div>';
						$("#all_product_list").append(html);
					});
				});
				
				//$('#all_product_list').bxSlider({
				//	mode: 'vertical',
				//	slideMargin: 5,
				//	minSlides: 3,
				//	maxSlides: 3,
				//	moveSlides: 1,
				//	infiniteLoop: false,
				//	hideControlOnEnd: true
				//});
				
				//Remove Wish product
				$('.remove_wish_product').on('click',function(){
					
						var form_data = {
							qty : 0,
							items : $(this).attr('alt')
						 }
						$.ajax({
							url: base_url+"home/update_wish_products",
							type: 'POST',
							data: form_data,
							success: function(html)
							{
								//console.log(html);
								
								html  = JSON.parse(html);
								if(html.success){
									$("#total_products_wish").html(html.total_products_wish);
									$(".get_wish_list").click();
								
								}
								if(html.error){
									swal("Invalid Qty");
								}
							}
						});
						
					
					
				});
				
				$(".add_to_cart_label2").on("click",function(){
					url = base_url+"home/add_to_cart/"+$(this).attr("alt");
					$.getJSON(url, function(data) {
						console.log(data);
						$(".add_to_cart_wish_overlay").hide();
						if(data.error){
							swal("Somthing Went Wrong");
						}
						if(data.success){
						
							swal("Added Successfully");
						}
						
						$("#total_products_cart").html(data.total_products_cart);
						
					});
					
					//remove from wish list
					var form_data1 = {
						qty : 0,
						items : $(this).attr('alt')
					 }
					$.ajax({
						url: base_url+"home/update_wish_products",
						type: 'POST',
						data: form_data1,
						success: function(html)
						{
							//console.log(html);
							
							html  = JSON.parse(html);
							if(html.success){
								$("#total_products_wish").html(html.total_products_wish);
								$(".get_wish_list").click();
							
							}
							if(html.error){
								swal("Error");
							}
						}
					});
					
				});
			
			
			}
		});
		
		$(".all_pages").hide();
		$("#wish_list").fadeIn(function(){
			$("#loader").fadeOut();
		});
	
	});
	
	
	//get cart list
	$(".get_cart_list").on("click",function(){
		$("#loader").fadeIn();
		$(".check_out_btn").hide();
		url = base_url+"home/get_cart_products";
		$.getJSON(url, function(data) {
			//console.log(data);
			$("#all_cart_product_list").html("");
			if(data){
				//
				$.each(data, function(index, value){
					
					$.each(value, function(index1, value1){
						//console.log(value1);
						$(".check_out_btn").show();
						var html = '<div class="list_product container-fluid"><div class="col-md-9 col-sm-9 col-xs-9"><h4 class="list_prod_name">'+value1.item_name+'</h4><span class="list_qty" >QTY</span><input type="text" class="product_qty_input update_cart_product_qty" value="'+value1.item_quantity+'" alt="'+value1.item_id+'" /><span class="price_label">$ '+value1.item_total_price+'/-</span><span class="remove_label remove_cart_product" alt="'+value1.item_id+'">REMOVE</span></div><div class="col-md-3 col-sm-3 col-xs-3 no_padding"><img src="'+base_url+'uploads/products/small/'+value1.item_image+'" alt="" /></div></div>';
						$("#all_cart_product_list").append(html);
					});
				});
				
				//$('#all_product_list').bxSlider({
				//	mode: 'vertical',
				//	slideMargin: 5,
				//	minSlides: 3,
				//	maxSlides: 3,
				//	moveSlides: 1,
				//	infiniteLoop: false,
				//	hideControlOnEnd: true
				//});
				
				
				
				//update qty on change
				$('.update_cart_product_qty').on('change',function(){
					var prod_qty = $(this).val();
					
					var reg_pattern =  /^\d+$/;
					if(reg_pattern.test(prod_qty)){
						//alert("ok");
						//alert(prod_qty);
						var form_data = {
							qty : prod_qty,
							items : $(this).attr('alt')
						 }
						$.ajax({
							url: base_url+"home/update_cart_products",
							type: 'POST',
							data: form_data,
							success: function(html1)
							{
								console.log(html1);
								html1  = JSON.parse(html1);
								if(html1.success){
									$("#total_products_cart").html(html1.total_products_cart);
									$(".get_cart_list").click();
								
								}
								if(html1.qty_error){
									swal("Available Qty "+html1.qty_error);
									$(this).val(html1.qty_error);
								}
								
								if(html1.error){
									swal("Invalid Qty");
								}
							}
						});
						
					}else{
						//alert("opp");
						swal("Invalid Qty");
					}
				});
				
				
				//Remove Cart product
				$('.remove_cart_product').on('click',function(){
					var prod_qty = $(this).val();
					
						//alert("ok");
						var form_data = {
							qty : 0,
							items : $(this).attr('alt')
						 }
						$.ajax({
							url: base_url+"home/update_cart_products",
							type: 'POST',
							data: form_data,
							success: function(html)
							{
								//console.log(html);
								
								html  = JSON.parse(html);
								if(html.success){
									$("#total_products_cart").html(html.total_products_cart);
									$(".get_cart_list").click();
								
								}
								if(html.error){
									swal("Invalid Qty");
								}
							}
						});
						
					
					
				});
			}
			
		});
		
		$(".all_pages").hide();
		$("#cart_list").fadeIn(function(){
			$("#loader").fadeOut();
		});
	
	});
	
	$("#nav_login_btn").on("click",function(){
		$(".all_pages").hide();
		$("#login_page").show();
	});
	$("#nav_register_btn").on("click",function(){
		$(".all_pages").hide();
		$("#register_page").show();
	});
	
	$("#nav_logout_btn").on("click",function(){
		$("#loader").fadeIn();
		url = base_url+"home/logout";
		$.getJSON(url, function(data) {
			
			$("#loader").fadeOut();
			if(data.success){
				
				get_header();
				//swal("Logged Out Successfully");
				$(".all_pages").hide();
				$("#login_register_page").show();
				$("#all_product_list").html(""); 
			
				
			}
			if(data.error){
				swal("Something Went Wrong");
			}
		});
	
	
	
	});

//-------------------header end---------------------

//-------------------enter_code start-------------------
	
	$('#getit_code1').on('keypress',function(){
		$('#getit_code2').focus();
	});
	$('#getit_code2').on('keypress',function(){
		$('#getit_code3').focus();
	});
	$('#getit_code3').on('keypress',function(){
		$('#getit_code4').focus();
	});
	$('#getit_code4').on('keypress',function(){
		$('#getit_code5').focus();
	});
	$('#getit_code5').on('keypress',function(){
		$('#getit_code6').focus();
	});
	
	
	$(".overlay_open_close").on("click",function(){
		$(".add_to_cart_wish_overlay").toggle();
	});

//-------------------enter_code end-------------------

//-------------------products page start-------------------
	$("#selected_product").on("click",function(){
		
		$("#loader").fadeIn;
		var product_id =  $(this).attr("alt");
		
		url = base_url+"home/get_product_images/"+$(this).attr("alt");
		$.getJSON(url, function(data) {
			console.log(data);
			$("#product_gallery_all_images").html("");
			$("#product_gallery_main_image").attr("src",base_url+"uploads/products/"+data.main_image);
			
			$("#product_gallery_all_images").append("<img src='"+base_url+"uploads/products/small/"+data.main_image+"' alt='' class='change_main_image' />");
			
			for(var i=0;i<data.all_images.length;i++){
				$("#product_gallery_all_images").append("<img src='"+base_url+"uploads/products/small/"+data.all_images[i]['url']+"' class='change_main_image' alt='' />");
			
			}
			//$.each(data.all_images,function(index, value){
			//	$("#product_gallery_all_images").append("<img src='"+base_url+"uploads/products/small/"+value.url+"' alt='' />");
			//	//console.log(value.url);
			//});
			
			
			
			$('.change_main_image').on('click',function(){
				var src = $(this).attr('src');
				console.log(src);
				src = src.replace("/small","");
				$('#product_gallery_main_image').attr('src',src);
			});
		});
		
		$('.all_pages').hide();
		$("#product_gallery").show(function(){
			$("#loader").fadeOut();
			gallery_slider.reloadSlider();
		
		});
																								
	});
	
	
	$("#add_to_cart").on("click",function(){
		
		$("#loader").fadeIn();
		url = base_url+"home/add_to_cart/"+$(this).attr("alt");
		$.getJSON(url, function(data) {
			//console.log(data);
			$("#loader").hide();
			$(".add_to_cart_wish_overlay").hide();
			if(data.error){
				swal("Somthing Went Wrong");
			}
			if(data.success){
			
				swal("Added Successfully");
			}
			if(data.not_available){
			
				swal("Not Available");
			}
			$("#total_products_cart").html(data.total_products_cart);
			
		});
		
	});
	
	$(".add_to_wish_function").on("click",function(){
		
		$("#loader").fadeIn();
		url = base_url+"home/add_to_wish/"+$(this).attr("alt");
		$.getJSON(url, function(data) {
			//console.log(data);
			$(".add_to_cart_wish_overlay").hide();
			$("#loader").hide();
			if(data.error){
				swal("Somthing Went Wrong");
			}
			if(data.success){
			
				swal("Added Successfully");
			}
			if(data.already_there){
			
				swal("Already Added");
			}
			
			$("#total_products_wish").html(data.total_products_wish);
			
		});
		
	});
	
	
//-------------------products page end-------------------

//GALERY CLOSE

	$(".gallery_close").on("click",function(){
		$("#product_gallery").hide();
		$("#page_products").show();
		
	});
//-------------------wish list page start-------------------
	$(".clear_wish_list_btn").on("click",function(){
		$("#loader").show();
		url = base_url+"home/claer_wish_list";
		$.getJSON(url, function(data) {
			$("#loader").hide();
			
			if(data.success){
			
				$("#total_products_wish").html("0");
				$(".get_wish_list").click();
				
			}
			
			
			
		});
	});
	
	$(".save_wish_list_btn").on("click",function(){
		url = base_url+"home/save_wish_list";
		$.getJSON(url, function(data) {
			console.log(data);
			if(data.error){
				swal($(data.error).text());
				
				//$(".all_pages").hide();
				//$("#login_page").show();
			}
			if(data.success){
			
				swal("Saved Successfully");
			}
			
			//$("#total_products_cart").html(data.total_products_cart);
			//$("#total_products_wish").html(data.total_products_wish);
			
		});
	
	
	
	});
//-------------------wish list  page end-------------------
//------------------cart list start-------------
	$(".check_out_btn").on("click",function(){
	
		//$(".all_pages").hide();
		//$("#user_page").show();
		$("#loader").show();
		
		url = base_url+"home/checkout/";
		$.getJSON(url, function(data) {
			$("#loader").hide();
			//console.log(data);
			if(data.not_logged_in){
				//swal("Please Login.");
				pre_url = $(".check_out_btn");
				$(".all_pages").hide();
				$("#login_register_page").fadeIn();
			}
			
			if(data.total_amount){
					$("#total_amount").html(data.total_amount);
					$(".all_pages").hide();
					$("#user_page").show();
				}
			if(data.address){
				
				//console.log(data.address.name);
				if(data.address.name !== ''){
					$("#user_address").html("");
					var address = data.address;
					var address_text = address.name+'<br />'+ address.address1+','+address.city+','+address.state+','+address.post_code+'<br />'+address.contact_no;
					$("#user_address").html(address_text);
				}
				
				
			}
			
			
				
			
		});
	});
	
//------------------cart list end-------------


//-------------------Login page start-------------------
	$("#submit_forget_pass").on("click",function(){
	
		var form_data1 = {
						email : $("#fog_email").val()
					 }
		$.ajax({
			url: base_url+"home/forget_password",
			type: 'POST',
			data: form_data1,
			success: function(html1)
			{
				console.log(html1);
				html1  = JSON.parse(html1);
				
				if(html1.validation_error){
				
					swal($(html1.validation_error).text());
				}
				if(html1.success == "yes" ){
					swal("Email Sent With Password Reset Link");
					
				}
				if(html1.error){
					swal($(html1.error).text());
				}
				
			}
		});
	});
	
	
	$("#login_form_submit").on("click",function(){
		$("#loader").show();
	
		var form_data = {
						user_name : $("#user_name").val(),
						password : $("#password").val()
					 }
		$.ajax({
			url: base_url+"home/login",
			type: 'POST',
			data: form_data,
			success: function(html)
			{	
				$("#loader").hide();
				//console.log(html);
				html  = JSON.parse(html);
				
				if(html.validation_error){
				
					swal($(html.validation_error).text());
				}
				if(html.success == "yes" ){
					get_header();
					if(pre_url !== ""){
						pre_url.click();
					}else{
						$(".all_pages").hide();
						$("#enter_code").fadeIn();
						//swal("Logged In Successfully");
					}
				}
				if(html.error){
					swal($(html.error).text());
				}
				
				
				
				//console.log(html.validation_error);
				//console.log(html.success);
				//console.log(html.error);
			}
		});
	});
//-------------------login list  page end-------------------
//-------------------Register  page starts-------------------


	$("#submit_forget_pass_reg").on("click",function(){
		$("#loader").fadeIn();
		var form_data1 = {
						email : $("#fog_email_login").val()
					 }
		$.ajax({
			url: base_url+"home/forget_password",
			type: 'POST',
			data: form_data1,
			success: function(html1)
			{
				$("#loader").fadeOut();
				//console.log(html1);
				html1  = JSON.parse(html1);
				
				if(html1.validation_error){
				
					swal($(html1.validation_error).text());
				}
				if(html1.success == "yes" ){
					swal("Email Sent With Password Reset Link");
					
				}
				if(html1.error){
					swal($(html1.error).text());
				}
				
			}
		});
	});


	$("#register_form_submit").on("click",function(){
		
		$("#loader").fadeIn();
		var form_data = {
						user_name : $("#reg_user_name").val(),
						password : $("#reg_password").val(),
						con_password : $("#reg_con_password").val(),
					 }
		$.ajax({
			url: base_url+"home/register",
			type: 'POST',
			data: form_data,
			success: function(html)
			{
				//console.log(html);
				$("#loader").fadeOut();
				html  = JSON.parse(html);
				
				if(html.validation_error){
				
					swal($(html.validation_error).text());
				}
				if(html.success == "yes" ){
					swal("Registered Successfully <br /> check email to activate account");
					$(".all_pages").hide();
					$("#enter_code").fadeIn();
						
				}
				if(html.error == "yes"){
					swal("Something Went Wrong");
				}
				
				
				
				//console.log(html.validation_error);
				//console.log(html.success);
				//console.log(html.error);
			}
		});
	});
//-------------------Register  page end-------------------
	
//--------------------user_page start--------------------
	$(".address_dropdown").on("click",function(){
		$(".address_form").toggle();
	});
	//$("save_address").on("click",function(){
	//
	//	$("#loader").show();
	//	
	//	$.ajax({
	//		url: base_url+"home/save_address",
	//		type: 'POST',
	//		data: $("form.address_form_tag").serialize(),
	//		success: function(html)
	//		{	
	//			html  = JSON.parse(html); 
	//			console.log(html.address.length);
	//			$("#loader").fadeOut();
	//			if(html.not_logged_in){
	//				swal("Please Login");
	//			}
	//			$(".address_form").hide();
	//			
	//			if(html.address.name !== ''){
	//				$("#user_address").html("");
	//				var address = html.address;
	//				var address_text = address.name+'<br />'+ address.address1+','+address.city+','+address.state+','+address.post_code+'<br />'+address.contact_no;
	//				$("#user_address").html(address_text);
	//			}
	//			
	//			
	//		}
	//	});
	//	
	//});
	
	$('.address_form_tag').ajaxForm(function(html) {  
		html  = JSON.parse(html); 
		console.log(html.address.length);
		$("#loader").fadeOut();
		if(html.not_logged_in){
			swal("Please Login");
		}
		$(".address_form").hide();
		
		if(html.address.name !== ''){
			$("#user_address").html("");
			var address = html.address;
			var address_text = address.name+'<br />'+ address.address1+','+address.city+','+address.state+','+address.post_code+'<br />'+address.contact_no;
			$("#user_address").html(address_text);
		}
				
	}); 
//--------------------user_page ends--------------------

//------------------login-regiser starts----------------------------------

$("#login-register_login_btn").on("click",function(){
	$(".all_pages").hide();
	$("#login_page").show();
});
$("#login-register_register_btn").on("click",function(){
	$(".all_pages").hide();
	$("#register_page").show();
});

$(".login-register_skip").on("click",function(){
	$(".all_pages").fadeOut();
	$("#enter_code").fadeIn();
});

//------------------login-regiser ends----------------------------------

});
function searchpage(){
	alert("wqsd");
}
$("#submit_code").on("click",function(){
		
		$("#loader").fadeIn();
		var form_data = {
						getit_code : $("#getit_code1").val()+$("#getit_code2").val()+$("#getit_code3").val()+$("#getit_code4").val()+$("#getit_code5").val()+$("#getit_code6").val()
					 }
		$.ajax({
			url: base_url+"home/home_products",
			type: 'POST',
			data: form_data,
			success: function(html)
			{
				console.log(html);
				html  = JSON.parse(html);
				
				if(html.validation_error){
					
					//swal($(html.validation_error).text());
					if($("#enter_code").find('.alert-danger')){
						$(".alert-danger").remove();
					}
					$("#enter_code").append("<div class='alert-danger'>"+html.validation_error+"</div>");
					$("#loader").fadeOut();
				}
				if(html.error){
					//swal($(html.error).text());
					if($("#enter_code").find('.alert-danger')){
						$(".alert-danger").remove();
					}
					$("#enter_code").append("<div class='alert-danger'>"+html.error+"</div>");
					$("#loader").fadeOut();
				}
				
				if(html.products){
					document.addEventListener("backbutton", searchpage, false);
					for(var i=0;i<html.products.length;i++){
						//console.log(html.products[i]);
						if(i == 0){
							$("#selected_product").attr("src",base_url+"uploads/products/"+html.products[i]["image"]);
							$("#selected_product").attr("alt",html.products[i]["product_id"]);
							
							$("#desc").html(html.products[i]["description"]);
							$("#product_name").html(html.products[i]["product_name"]);
							
							$("#price").html(html.products[i]["price"]);
							$(".add_to_cart_wish_btn").attr("alt",html.products[i]["product_id"]);
							$("#all_products_slider").append("<img src='"+base_url+"uploads/products/small/"+html.products[i]["image"]+"' alt='"+html.products[i]["product_id"]+"' class='get_product active_border' />");
						}else{
							$("#all_products_slider").append("<img src='"+base_url+"uploads/products/small/"+html.products[i]["image"]+"' alt='"+html.products[i]["product_id"]+"' class='get_product' />");
						
						}
						
						
					
					}
					
					

					$(".get_product").on("click",function(){
						$("#loader").fadeIn();
						$(".get_product").removeClass("active_border");
						$(this).addClass("active_border");
						url = base_url+"home/get_product/"+$(this).attr("alt");
						$.getJSON(url, function(data) {
							//console.log(data.product_id);
							$("#selected_product").attr("src",base_url+"uploads/products/"+data.image);
							$("#selected_product").attr("alt",data.product_id);
							
							$("#desc").html(data.description);
							$("#product_name").html(data.product_name);
							$("#price").html(data.price);
							$(".add_to_cart_wish_btn").attr("alt",data.product_id);
							$("#loader").fadeOut();
						});
					
					
					
					});
					$(".all_pages").hide();
					
					$("#page_products").show(function(){
						all_products_slider.reloadSlider();
						
					});
					$("#loader").fadeOut();
					
				}
				
				
			}
		});
	});