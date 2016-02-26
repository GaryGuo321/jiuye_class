$(function() {
	// 选择职业方向的动画效果
	var $courseListSort = $('.course-list-sort');
	$courseListSort.mouseenter(function() {
		$(this).children('.course-des').stop().velocity({
			opacity: 1,
			top: 0
		}, 200);
	}).mouseleave(function() {
		$(this).children('.course-des').stop().velocity({
			opacity: 0,
			top: 60
		}, 200);
	});
	var $courseBtn = $(".course-btn");
	$courseBtn.click(function() {
		$(this).parent().velocity({
			opacity: 0,
			top: 60
		}, 200);
	});
	//点击后跳转链接
	//计算点击次数

	function HrefJump() {}
	HrefJump.prototype = {
		constructor: HrefJump,
		jumpLink: function(element, href) {
			element.click(function() {
				/*
				点击后向后台发送一个ajax请求拿到目前预约的人数
				然后在前台将目前预约的人数＋1更新人数之后
				再发一个ajax请求给后台，把更新后的数据再存入数据库
				 */
				var value = $(this).attr('value');
				if (value) {
					$.ajax({
						url: './php/read-num.php',
						type: 'GET',
						dataType: 'json',
						data: {
							'name': value
						},
						success: function(date) {
							var number = (++date[0].num);
							$.ajax({
								url: './php/update-num.php',
								type: 'GET',
								dataType: 'json',
								data: {
									'name': value,
									'number': number
								}
							});
						}
					});
				}
				location.href = href;
			})
		}
	}

	var $attendWeb = $('.course-des-web');
	var $attendAndro = $('.course-des-andro');
	var $attendJaweb = $('.course-des-jaweb');
	var $callPhp = $('.course-des-php');
	var $callData = $('.course-des-data');

	var jump = new HrefJump();
	jump.jumpLink($attendWeb, 'http://jiuye.jikexueyuan.com/train/web?huodong=jiuye_web_index');
	jump.jumpLink($attendAndro, 'http://jiuye.jikexueyuan.com/train/android? huodong=jiuye_android_index');
	jump.jumpLink($attendJaweb, 'http://jiuye.jikexueyuan.com/train/javaweb? huodong=jiuye_javaweb_index');
	jump.jumpLink($callPhp, 'http://form.mikecrm.com/f.php?t=tLGlj6');
	jump.jumpLink($callData, 'http://form.mikecrm.com/f.php?t=svPj8h');

	//显示预约人数
	var $callPhpNum = $('.call-me-php');
	var $callDataNum = $('.call-me-data');
	var $numFramePhp = $('.num-frame-php');
	var $numFrameData = $('.num-frame-data');

	function HoverShow() {}
	HoverShow.prototype = {
		constructor: HoverShow,
		showAndHide: function(element1, element2) {
			element1.mouseover(function() {
				element2.stop().fadeIn();
				/*
				当鼠标位于上线通知我的按钮上面时，传递一个值给后台（即php／data）
				向后台数据库发起一个请求拿到目前php课程或者大数据课程预约的人数
				后台往前台传数据时请传一个json格式的数组回来，keys值为：num
				前台拿到后台传过来的人数的值后，组装html显示在web页面上
				 */
				//读取预约人数
				var value = $(this).attr('value');
				var $thisElement = $(this);
				$.ajax({
					url: './php/read-num.php',
					type: 'GET',
					dataType: 'json',
					data: {
						'name': value
					},
					success: function(date) {
						var textContent = '已有' + date[0].num + '人预约';
						$thisElement.siblings('.num-frame').children('.num').text(textContent);
					}
				});
			}).mouseout(function() {
				element2.stop().fadeOut();
			});
		}
	}
	var labelHover = new HoverShow();
	labelHover.showAndHide($callPhpNum, $numFramePhp);
	labelHover.showAndHide($callDataNum, $numFrameData);



	//轮播
	var mySwiper = new Swiper('.teacher-intro .swiper-container', {
		loop: true,
		autoplay: 7000,
		pagination: '.pagination',
		paginationClickable: true,
		autoplayDisableOnInteraction: false,
		speed: 600,
	});
	var SwiperVedio = new Swiper('.study-vedio .swiper-container', {
		speed: 600,
		onInit: function(swiper) {
			swiper.swipeNext()
		}
	});
	$('#btn1').click(function() {
		SwiperVedio.swipePrev();
		return false;
	})
	$('#btn2').click(function() {
		SwiperVedio.swipeNext();
		return false;
	})
	$('#myVideo').click(function(){
		console.log(111);
	})
});


function myFunction() {
	var x = document.getElementById("myVideo").play();
}