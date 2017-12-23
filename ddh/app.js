!function gamerun() {
// =========== vanilla JS helper
function fadeOut(el){
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// =========== loading TextureCache while loading
// function i() { C.add(imgInfo + "start/hand.png").add(imgInfo + "start/text.png").add(imgInfo + "transition/tree_1.png").add(imgInfo + "transition/transition23.png").add(imgInfo + "transition/transition34.png").add(imgInfo + "transition/transition45.png").add(imgInfo + "transition/transition45_2.png").add(imgInfo + "transition/tunnel.png").add(imgInfo + "transition/m0.png").add(imgInfo + "logo.png").add(imgInfo + "text/close.png").add(imgInfo + "text/t1_1.png").add(imgInfo + "text/t1_2.png").add(imgInfo + "text/t1_3.png").add(imgInfo + "text/t2_1.png").add(imgInfo + "text/t2_2.png").add(imgInfo + "text/t2_3.png").add(imgInfo + "text/t3.png").add(imgInfo + "text/t4_1.png").add(imgInfo + "text/t4_2.png").add(imgInfo + "text/t4_3.png").add(imgInfo + "text/t5_1.png").add(imgInfo + "text/t5_2.png").add(imgInfo + "text/t6_1.png").add(imgInfo + "text/t6_2.png").add(imgInfo + "text/t7_1.png").add(imgInfo + "text/t7_2.png").add(imgInfo + "text/t8_1.png").add(imgInfo + "text/tt8_2.png").add(imgInfo + "text/pp1.png").add(imgInfo + "text/pp3_1.png").add(imgInfo + "text/pp3_2.png").add(imgInfo + "text/pp4_1.png").add(imgInfo + "text/pp4_2.png").add(imgInfo + "text/pp5.png").add(imgInfo + "text/pp6.png").add(imgInfo + "text/pp7_1.png").add(imgInfo + "text/pp7_2.png").add(imgInfo + "1/bg.jpg").add(imgInfo + "1/door.png").add(imgInfo + "1/1.png").add(imgInfo + "1/2-1.png").add(imgInfo + "1/2-2.png").add(imgInfo + "1/3.png").add(imgInfo + "1/4.png").add(imgInfo + "1/5.png").add(imgInfo + "1/6.png").add(imgInfo + "2/bg.png").add(imgInfo + "2/star.png").add(imgInfo + "2/car1.png").add(imgInfo + "2/car2.png").add(imgInfo + "2/cow1.png").add(imgInfo + "2/cow2.png").add(imgInfo + "2/m0.png").add(imgInfo + "2/m1.png").add(imgInfo + "2/m2.png").add(imgInfo + "2/cover.png").add(imgInfo + "3/bg.jpg").add(imgInfo + "3/cloud.png").add(imgInfo + "3/m3.png").add(imgInfo + "3/m2.png").add(imgInfo + "3/m1.png").add(imgInfo + "3/ground.png").add(imgInfo + "3/tunnel.png").add(imgInfo + "3/tunnel2.png").add(imgInfo + "3/cows.png").add(imgInfo + "4/bg.jpg").add(imgInfo + "4/animal1.png").add(imgInfo + "4/animal2.png").add(imgInfo + "4/animal3.png").add(imgInfo + "4/animal4.png").add(imgInfo + "4/animal5.png").add(imgInfo + "4/cloud4.png").add(imgInfo + "4/cover.png").add(imgInfo + "4/guidao.png").add(imgInfo + "4/mm.png").add(imgInfo + "4/sun.png").add(imgInfo + "4/train.png").add(imgInfo + "5/bg.png").add(imgInfo + "5/cloud.png").add(imgInfo + "5/ground.png").add(imgInfo + "5/m2.png").add(imgInfo + "5/m3.png").add(imgInfo + "5/mm.png").add(imgInfo + "5/sitcow.png").add(imgInfo + "5/animal1.png").add(imgInfo + "5/cow2.png").add(imgInfo + "6/bg.png").add(imgInfo + "6/cloud.png").add(imgInfo + "6/mm.png").add(imgInfo + "6/lake.png").add(imgInfo + "6/cloud2.png").add(imgInfo + "6/mm2.png").add(imgInfo + "6/animal1.png").add(imgInfo + "6/animal2.png").add(imgInfo + "6/animal3.png").add(imgInfo + "6/glass.png").add(imgInfo + "6/house.png").add(imgInfo + "7/bg.png").add(imgInfo + "7/cloud.png").add(imgInfo + "7/m1.png").add(imgInfo + "7/m2.png").add(imgInfo + "7/m3.png").add(imgInfo + "7/m4.png").add(imgInfo + "7/ground.png").add(imgInfo + "8/bg78.png").add(imgInfo + "8/bg.png").add(imgInfo + "8/star.png").add(imgInfo + "8/mm.png").add(imgInfo + "8/ground.png").add(imgInfo + "8/building.png").add(imgInfo + "8/people.png").add(imgInfo + "8/train.png").add(imgInfo + "end/end.png").add(imgInfo + "end/share.png").add(imgInfo + "end/reset.png").add(imgInfo + "common-share-tip.png").on("progress", I).load(e) }
function progress(n, a) {
	var t = parseInt(n.progress);
    document.getElementById('loading_percent').innerHTML(t + "%")
}

// =========== init base for stage
function initPIXI(){
	app.renderer.resize(sWidth, sHeight);
	app.renderer.backgroundColor = 0x000000;
	document.getElementById('content').appendChild(app.view);
	setTimeout(function(){fadeOut(document.getElementById('intro-container'))}, 300);

	app.stage.addChild(base);
	base.addChild(roll);
	// interactive root
	base.interactive = !0;
	base.buttonMode = !0;
	base.on("touchstart", onTouchstart).on("touchmove", onTouchmove).on("touchend", onTouchend);
	base.on("mousedown", onMousedown).on("mousemove", onMousemove).on("mouseup", onMouseup);

	// ***** TEMP adding content
	var bgTex = PIXI.Texture.fromImage('./assets/images/1/bg.jpg');
	var bg = new PIXI.Sprite(bgTex);
	bg.position.set(0,0);
	roll.addChild(bg);

	fitScreen();
}


// =========== scroller
function scrollCbk(left, top, zoom) {
	var l,h; // l is more important
	if (sWidth < sHeight) {// portrait
		l = top;
		h = left;
	} else {// landscape
		l = left;
		h = top;
	}

	// animation HERE!

	roll.position.x = -l;
	roll.position.y = -h;
}
// touch events
function onTouchstart(e) {
	var a = e.data.originalEvent;
    touchOn = !0;
    if (a.touches) {
    	scrollObj.doTouchStart(a.touches, a.timeStamp);
    } else {
    	scrollObj.doTouchStart([a], a.timeStamp);
    }
// add a helper to show the XY coord
}
function onTouchmove(e) {
	if (touchOn) {
		var a = e.data.originalEvent;
	    if (a.touches) {
	    	scrollObj.doTouchMove(a.touches, a.timeStamp);
	    } else {
	    	scrollObj.doTouchMove([a], a.timeStamp);
	    }
    }
}
function onTouchend(e) {
	var a = e.data.originalEvent;
    scrollObj.doTouchEnd(a.timeStamp);
    touchOn = !1;
}
// mouse events
function onMousedown(e) {
	var a = e.data.originalEvent;
    touchOn = !0;
    scrollObj.doTouchStart([a], a.timeStamp);
// add a helper to show the XY coord
}
function onMousemove(e) {
	if (touchOn) {
		var a = e.data.originalEvent;
	    scrollObj.doTouchMove([a], a.timeStamp);
    }
}
function onMouseup(e) {
	var a = e.data.originalEvent;
    scrollObj.doTouchEnd(a.timeStamp);
    touchOn = !1;
}


// =========== auto orientation - DONE
function fitScreen() {
	// var w = window.innerWidth, h = window.innerHeight;
	sWidth = mobile?window.innerWidth:document.getElementById('content').clientWidth;
 	sHeight = mobile?window.innerHeight:document.getElementById('content').clientHeight;
	var v = scrollObj.getValues();
	var left = v.left, top = v.top;
	var s = sWidth < sHeight ? (sWidth / 750) : (sHeight / 750);
	app.renderer.resize(sWidth, sHeight);
	if (sWidth < sHeight) {// portrait
		setTimeout(function(){
			base.rotation = Math.PI / 2;
			base.scale.set(s, s)
			base.x = sWidth;
			scrollObj.setDimensions(sWidth, sHeight, sWidth, storyLength);
			scrollObj.scrollTo(0, left, !1);
		}, 0);

	} else {// landscape
		setTimeout(function(){
			base.rotation = 0;
			base.scale.set(s, s)
			base.x = 0;
			scrollObj.setDimensions(sWidth, sHeight, storyLength, sHeight);
			scrollObj.scrollTo(top, 0, !1);
		}, 0);
	}
}

// =========== MAIN ============
// determine device and respond differently
var mobile =!0;
if (!/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase())) {
	// if not mobile devices
	var mobile = !1;
	document.getElementById('loading_tips').innerHTML = '努力读取中，请稍后...';
	document.getElementById('content')
		.setAttribute("style", "position: absolute; height: 400px; width: 760px; top: 50%; left: 50%; margin-top: -200px; margin-left: -380px; background-color: #000;");
	// document.getElementById('content').setAttribute("style", "height: 100vh; width: 100vw; background: #eee url(./assets/images/loading/desktop.png) no-repeat center 100px; background-size: 639px 396px;");
}
// load music before PIXI
// TODO by default muted

// declare globals
var touchOn = !1; // used by scroller touch event
var app = new PIXI.Application({});
var base = new PIXI.Container(); //container for rotation
var roll = new PIXI.Container(); //container for scroll
var sWidth = mobile?window.innerWidth:document.getElementById('content').clientWidth;
var sHeight = mobile?window.innerHeight:document.getElementById('content').clientHeight;

var storyLength = 3000;
// scroller
var scrollObj = new Scroller(scrollCbk, { zooming: !1, animating: !0, bouncing: !1, animationDuration: 1000 });

// TODO
initPIXI();

// ========== WRAP UP ==========
window.addEventListener('resize', fitScreen, true);

// ANALYSIS

}();