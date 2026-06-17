"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});


/* Corrected scroll-spy.
   The bundled stickyNavbar caches the header height at load and uses
   overlapping position bands, so once the D3 visualizations change the
   section heights it highlights the wrong (usually previous) nav item.
   This runs after stickyNavbar via requestAnimationFrame and sets the
   active link from live section positions, so it always wins. */
$(window).load(function () {
	var navSel = '#nav-main li a[href^="#"], #nav-mobile li a[href^="#"]';
	var sections = [];
	$('#nav-main li a[href^="#"]').each(function () {
		var id = $(this).attr('href').slice(1);
		if (id && document.getElementById(id)) sections.push(id);
	});

	function setActive() {
		var line = window.pageYOffset + window.innerHeight * 0.28;
		var current = sections[0];
		for (var i = 0; i < sections.length; i++) {
			var el = document.getElementById(sections[i]);
			if (el && el.getBoundingClientRect().top + window.pageYOffset <= line) {
				current = sections[i];
			}
		}
		$(navSel).removeClass('active');
		$('#nav-main li a[href="#' + current + '"], #nav-mobile li a[href="#' + current + '"]').addClass('active');
	}

	var ticking = false;
	$(window).on('scroll resize', function () {
		if (!ticking) {
			window.requestAnimationFrame(function () { setActive(); ticking = false; });
			ticking = true;
		}
	});
	setActive();
});
