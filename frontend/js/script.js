// Scroll.js

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
		if(target != ""){
			$('html, body').stop().animate({
				'scrollTop': $(target).offset().top
			}, 1000, 'swing', function () {
				window.location.hash = target;
			}); 
		}
	});

	// Navigation

	$(".hamburger").click(function(){ 
		$(".nav .menu-container").addClass("open");
	});

	$(".close").click(function(){ 
		$(".nav .menu-container").removeClass("open");
	});	

	// Отправка заявки
		
	$(".ajax-form").submit(function(event){
		event.preventDefault();
	 
		var form = $(this),
			term = form.serialize(),
			url = form.attr("action");
	 
		var posting = $.post( url, term );
	 
		posting.done(function(data) {
			form.html('<div class="lead medium ajax-form-result">'+data+'</div>');
		});
	});

	// swiper
	if($('.slider-1').length){	
		var swiper = new Swiper('.slider-1', {
			slidesPerView: 1,
			spaceBetween: 30,
			direction: 'horizontal',
			loop: false,
			// Navigation arrows
			navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			},
			// And if we need scrollbar
			scrollbar: {
			el: '.swiper-scrollbar',
			},
			breakpoints: {
			  480: {
				slidesPerView: 2,
			  },
			  576: {
				slidesPerView: 2,
			  },
			  768: {
				slidesPerView: 3,
			  },
			  992: {
				slidesPerView: 4,
			  },
			  1920: {
				slidesPerView: 5,
			  },		  
			}		
		});	
	}
	if($('.slider-2').length){	
		var swiper = new Swiper('.slider-2', {
			slidesPerView: 'auto', 
			centeredSlides: true,		
			spaceBetween: 30,
			direction: 'horizontal',
			loop: true,
			// Navigation arrows
			navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			},
			// And if we need scrollbar
			scrollbar: {
			el: '.swiper-scrollbar',
			},
		});	 
	}


	// Раскрытие фильтров на странице продуктов
  	$(".filter-header").click(function(){
		if ($(this).closest(".filter-block").hasClass('open')) {
            $(this).closest(".filter-block").removeClass('open');
		} else {
            $(this).closest(".filter-block").addClass('open');
        };
	});  	

	// noUiSlider
	if($('#slider').length){
		noUiSlider.create(slider, {
			start: [42, 71],
			connect: true,
			step: 1,
			tooltips: true,
			range: {
				'min': 31,
				'max': 98
			},
			format: wNumb({
				decimals: 1,
				thousand: '.',
				//suffix: ' ($)'
			})		
		});	
	}
	// Выбор цвета одежды
	$('input[name=color]').change(function(){
		$('.color-img').removeClass('active');
		$(this).each(function(){
			if($(this).prop('checked')){
				$(this).closest('.color-img').addClass('active');
				var color = $(this).val();
				$('.color-name').text(color); 
			}			
		});
	});
	
	//Увеличение/уменьшение количества товара
	$(function() {
	 
	  (function quantityProducts() {
		var $quantityArrowMinus = $(".quantity-arrow-minus");
		var $quantityArrowPlus = $(".quantity-arrow-plus");
		var $quantityNum = $(".quantity-num");
	 
		$quantityArrowMinus.click(quantityMinus);
		$quantityArrowPlus.click(quantityPlus);
	 
		function quantityMinus() {
		  if ($quantityNum.val() > 1) {
			$quantityNum.val(+$quantityNum.val() - 1);
		  }
		}
	 
		function quantityPlus() {
		  $quantityNum.val(+$quantityNum.val() + 1);
		}
	  })();
	 
	});
	
	//maskedinput
	jQuery(function($){
	   $("#phone-number").mask("(999) 999-9999");
	   $("#zip-code").mask("999-999");
	   $("#card-number").mask("9999 9999 9999 9999");
	   $("#card-period").mask("99/99");
	   $("#card-cvc").mask("999");
	});	
	
	// Show password
	
	$(".js-show-password .show_password").click(function(){
		if($(this).hasClass('opened')){
			$(this).removeClass("opened");
			$(".js-show-password input").text("visibility");
			$(this).prev("input").attr("type","password");
		}else{ 
			$(this).addClass("opened"); 
			$(".js-show-password input").text("visibility_off");
			$(this).prev("input").attr("type","text");
		} 
	});

	
 
	// Гугл карта
	// В HTML нужно воткнуть <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCwL1fgUC6AMz6et2ejriLjU2wVj11YAK8" type="text/javascript"></script>
	// или wp_enqueue_script("googlemap", 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwL1fgUC6AMz6et2ejriLjU2wVj11YAK8', array("jquery"), $ver);

	if($("#map").length>0){

		var map, markers_data, markers, marker;
		markers_data = [];
		markers = [];
		
		$(".marker").each(function(){
			var coords = $(this).attr("data-coords").split(",");
			markers_data[markers_data.length] = {coordX:parseFloat(coords[0]),coordY:parseFloat(coords[1]),img:$(this).attr("data-placemark")}
		});

		// Подключаем карту
		var mapOptions = {
			zoom: 14,
			minZoom:3,
			maxZoom:18,
			mapTypeControl: false,
			streetViewControl: false,
			//fullscreenControl:false,
			//scaleControl:false,
			//zoomControl:false,
			
			center: new google.maps.LatLng(55.753282, 37.621816),
			styles: [	{"featureType":"all",		"stylers":[			{"saturation":0},			{"hue":"#e7ecf0"}		]	},	{"featureType":"road",		"stylers":[			{"saturation":-70}		]	},	{"featureType":"transit",		"stylers":[			{"visibility":"off"}		]	},	{"featureType":"poi",		"stylers":[			{"visibility":"off"}		]	},	{"featureType":"water",		"stylers":[			{"visibility":"simplified"},			{"saturation":-60}		]	}]
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		
		//var bounds = new google.maps.LatLngBounds();
		
		function initMarkers(map, markers_data) {
			for(var i=0; i<markers_data.length; i++) {
				// create markers
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(markers_data[i].coordX,markers_data[i].coordY),
					map: map,
					icon: {
						url: markers_data[i].img, 
						size: new google.maps.Size(22, 33), // размер пикчи
						origin: new google.maps.Point(0,0), 
						anchor: new google.maps.Point(11, 33), // коррекция позиции: половина ширины, высота
						scaledSize: new google.maps.Size(22, 33)
					}
				});

				//bounds.extend(new google.maps.LatLng(markers_data[i].coordX,markers_data[i].coordY));
				
				markers.push(marker);		
			}
			return markers;
		}
		
		// Призываем маркеры на карту
		markers = initMarkers(map, markers_data);

		//map.fitBounds(bounds);
		
		// Приближение карты до маркера
		
		$(".js-zoom-to-marker").click(function(){
			var coords = $(this).attr("data-coords").split(",");
			map.setCenter(new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1])));
			map.setZoom(17);
		});

	}

});
