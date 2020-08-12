$(document).ready(function() {
	console.log(chat_id);
	// плавный скрол до анкора
 	const anchors = document.querySelectorAll('a[href*="#"]')
 	anchors.forEach((anchor) => {
 	  anchor.addEventListener('click', function (e) {
 	    e.preventDefault()
 	    
 	    const blockID = anchor.getAttribute('href').substr(1)
 	    
 	    document.getElementById(blockID).scrollIntoView({
 	      behavior: 'smooth',
 	      block: 'start'
 	    })
 	  })
 	});
 	// закрытие мобильного меню при клике на анкор
    $("#menu_mobile").on("click","a", function (event) {
        event.preventDefault();
         $('.burger-btn').toggleClass('burger-btn-active');
         $('.menu-block').toggleClass('menu_active');
        
    });
	// открываем портфолио1 файл
	$('#open__slider').click(function(){
		$('.opacity__block').css('display', 'flex');
		$('.slider__wrapper').css('display', 'block');
		// создаем слайдер с изображениями первого портфолио
		var countImgPortfolio1 = 14;
			for(i = 0; i <= countImgPortfolio1; i++) {
				if(i === 0){
				var sliderPortfolio = '<div class="slider__portfolio">\
				<div class="slider__portfolio__item">\
				<img src="images/sliders/portfolio1/'+i+'.jpg" alt="">\
			</div>';	
				}else{
			sliderPortfolio = sliderPortfolio +'<div class="slider__portfolio__item">\
				<img src="images/sliders/portfolio1/'+i+'.jpg" alt="">\
			</div>';
		}
			}
		$('.slider__portfolio').append( sliderPortfolio );
		$('.slider__portfolio').slick({
		dots:false,
		centerMode: false,
		responsive:[
			{
				breakpoint: 1200,
				settings: {
					dots:false
				}
		}],
		appendArrows: $('.slider__wrapper')
		});
	});
	// открываем портфолио1 файл
	$('.open__work__documents__slider').click(function(){
		$('.opacity__block').css('display', 'flex');
		$('.slider__wrapper').css('display', 'block');
		// создаем слайдер с изображениями первого портфолио
		var countImgDrawings = 15;
		for(i = 0; i <= countImgDrawings; i++) {
				if(i === 0){
				var sliderPortfolio = '<div class="slider__portfolio">\
			<div class="slider__portfolio__item">\
				<img src="images/sliders/drawings/drawings.jpg" alt="">\
			</div>';
				}else{
			sliderPortfolio = sliderPortfolio +'<div class="slider__portfolio__item">\
				<img src="images/sliders/drawings/drawings'+i+'.jpg" alt="">\
			</div>';
		}
		}
		
		$('.slider__wrapper').append( sliderPortfolio );
		$('.slider__portfolio').slick({
		dots:false,
		centerMode: false,
		responsive:[
			{
				breakpoint: 440,
				settings: {
					dots:false
				}
		}],
		appendArrows: $('.slider__wrapper')
	});
	$('.slick-arrow').addClass('work__documents');
	$('.slider__portfolio').slick('setPosition');
	});
	// закрытие меню слайдера на Х
	$('.close__slider__portfolio').click(function(){
		$('.slider__portfolio').remove();
		$('.slick-arrow').remove();
		$('.opacity__block').css('display', 'none');
		$('.slider__wrapper').css('display', 'none');
	});
// функция назначения класса если нажали на бургер
	$('.burger-btn').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('burger-btn-active');
		// присваиваем класс для выезда мобильного меню
		$('.menu-block').toggleClass('menu_active');
	});
// функция закрытия меню по кнопке закрыть в самой меню
	$('.menu-btn').on('click', function(e) {
		e.preventDefault();
		// меняем классы 
		$('.menu-block').toggleClass('menu_active');
		$('.burger-btn').toggleClass('burger-btn-active');
	});
	// data-id="Оптимальный" id="order_rate"
	$('button.order_rate').click(function(){
		$('.form__wrapper').toggleClass('form__active');
		$('.opacity__block').css('display', 'flex');
		$('.form__order').append('<input type="hidden" class="rate__form" name="rate" value='+$(this).data('id')+'>');
	});
	// кнопка закрытия выплывающей формы
	$('.close__form__order').click(function(){
		$('.form__wrapper').toggleClass('form__active');
		$('.opacity__block').css('display', 'none');
		$('.rate__form').remove();
	});
    
	// форма отправки сообщения в телеграм при submit формы футера
	$('#form__footer').submit(function(ev) {
		ev.preventDefault();
		 form = document.getElementById("form__footer");
		 data = new FormData(form);
	     message = "Имя:+"+$("input[name='name']").val()+"%0AТелефон:+"+
	     $("input[name='phone']").val()+"%0AТариф:+"+
	     $("input[name='rate']").val()+"%0AКомментарий:+"+
	     $("textarea[name='comment']").val();
	    sendTelegram();
	    $("form#form__footer").trigger('reset');
		
});
	// формы отправки сообщения в телеграм из выплывающей формы
	$('#form__order').submit(function(ev) {
		ev.preventDefault();
		 form = document.getElementById("form__order");
		 data = new FormData(form);
	     message = "Имя:+"+$('form#form__order').find("input[name='name']").val()+"%0AТелефон:+"+
	     $('form#form__order').find("input[name='phone']").val()+"%0AТариф:+"+
	     $('form#form__order').find("input[name='rate']").val()+"%0AКомментарий:+"+
	     $('form#form__order').find("textarea[name='comment']").val();
	    sendTelegram();
	     $("form#form__order").trigger('reset');
	     setTimeout(function(){
	     $('.form__wrapper').toggleClass('form__active');
		$('.opacity__block').css('display', 'none');
		$('.rate__form').remove();
 },1000);
		
});
	
});
	// функция отправки телеграмм сообщения
    function sendTelegram() {
    	$.ajax({
		  url: "https://api.telegram.org/bot"+token+"/sendMessage?text="+message+"&chat_id="+chat_id,
		  dataType: 'json',
		  statusCode: {
		401: function (response) {
			ajax(form.method, form.action, data, success, error);
        },
        400: function (response) {
        	ajax(form.method, form.action, data, success, error);
        },
        404: function (response) {
        	ajax(form.method, form.action, data, success, error);
        },
        200: function (response) {
            success();
        }
    }	
		});
    }
    // функция благодарности в случае успешной отправки сообщения
    function success() {
    var status = document.getElementById("status");
    var form_status = document.getElementById("form_status");
      status.innerHTML = "Спасибо за заявку, я свяжусь с вами в ближайшее время!";
      form_status.innerHTML = "Спасибо за заявку, я свяжусь с вами в ближайшее время!";
    
    }
    // функция оповещения если сообщение не доставлено
    function error() {
    	var status = document.getElementById("status");
      status.innerHTML = "Oops! There was a problem.";
    }
   // аякс запрос на сервер почты если в телеграм не прошло сообщение
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
