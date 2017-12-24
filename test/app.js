!function gameRun() {
// =========== vanilla JS helper
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function fadeOut(el){
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = 'none';
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

// =========== loading resources - TODO design data structures
function gameLoad() {
	// you can add an array of assets like ['./1.png', './2.png']

	// calc LENGTH here!!!
	loader.add(imgInfo+'1/bg.jpg');

	//TEMP using for loop to each scene!!
	for (var i = 0; i < sceneData.length; i++) {
		for (var j = 0; j < sceneData[i].tex.length; j++) {
			loader.add(sceneData[i].tex[j].name, sceneData[i].tex[j].url);
		}
	}

	loader.add(imgInfo+'ruler.png');
	loader.add(imgInfo + 'start/hand.png').add(imgInfo + 'start/text.png');
	// loader.add('http://google.com/pause.png'); // for pausing
	loader.on('progress', onProgress).load(initPIXI);
}

function onProgress(loader, res) {
	var t = parseInt(loader.progress);
    document.getElementById('loading_percent').innerHTML= t + '%';
}

// =========== init base for stage
function initPIXI(){
	app.renderer.resize(sWidth, sHeight);
	app.renderer.backgroundColor = 0x000000;
	document.getElementById('content').appendChild(app.view);
	document.getElementById('loading_percent').innerHTML= '100%';
	setTimeout(function(){fadeOut(document.getElementById('intro-container'))}, 1000);


	base.addChild(roll);
	// interactive root
	base.interactive = !0;
	base.buttonMode = !0;
	base.on('touchstart', onTouchstart).on('touchmove', onTouchmove).on('touchend', onTouchend);
	base.on('mousedown', onMousedown).on('mousemove', onMousemove).on('mouseup', onMouseup).on('mouseout', onMouseout);

	// ***** TEMP adding content
	var bg = new PIXI.Sprite(loader.resources[imgInfo + '1/bg.jpg'].texture);
	bg.position.set(0,0);
	roll.addChild(bg);

	var tempSprite;
	//TEMP using for loop to each scene!!
	for (var i = 0; i < sceneData.length; i++) {
		scnContainers.push(new PIXI.Container());
		for (var j = 0; j < sceneData[i].tex.length; j++) {
			tempSprite = new PIXI.Sprite(loader.resources[sceneData[i].tex[j].name].texture);
			tempSprite.position.set(sceneData[i].tex[j].position.x,sceneData[i].tex[j].position.y);
			scnContainers[i].addChild(tempSprite);
		}
		scnContainers[i].position.set(storyLength0-332, 0);
		roll.addChild(scnContainers[i]);
	}

	// ruler helper
	var rulerTile = new PIXI.extras.TilingSprite(loader.resources[imgInfo + 'ruler.png'].texture, 30000, 750);
	rulerTile.alpha = 0.3;
	roll.addChild(rulerTile);

	gameShare();
	gameStart();
	roll.addChild(scnStart);// added lastly to stay on top

	fitScreen();
	app.stage.addChild(base);
	tweenimate();
}

// =========== special treatment for scenes
// tip at start
function gameStart() {
	scnStart = new PIXI.Container();
	var scnStart_hand = new PIXI.Sprite(loader.resources[imgInfo + 'start/hand.png'].texture);
    scnStart_hand.position.set(700 - 30 + 100, 483);
    scnStart_hand_tween = new TWEEN.Tween(scnStart_hand.position)
    	.to({ x: 700 - 30 - 100 }, 1e3).delay(300).repeat(1 / 0).easing(TWEEN.Easing.Quadratic.Out).start();

    var scnStart_text = new PIXI.Sprite(loader.resources[imgInfo + 'start/text.png'].texture);
    scnStart_text.position.set(700 - 133/2, 610);
    // cover
    var scnStart_cover = new PIXI.Graphics();
    scnStart_cover.beginFill(0, 0.4);
    scnStart_cover.drawRect(0, 0, 2e3, 750);
    scnStart_cover.endFill();
    scnStart.addChild(scnStart_hand, scnStart_text, scnStart_cover);
}
// share in the end
function gameShare() {
    var share = scnContainers[scnContainers.length-1].children[1], reload = scnContainers[scnContainers.length-1].children[2];
    share.interactive = !0;
    share.buttonMode = !0;
    reload.interactive = !0;
    reload.buttonMode = !0;
    function onShare(){
    	var el = document.getElementById('common-share');
	    fadeIn(el);
	    setTimeout(function() { fadeOut(el) }, 2e3);
    }
    function onReload(){ location.reload() }
    share.on('tap', onShare).on('click', onShare);
	reload.on('tap', onReload).on('click', onReload);
}

// =========== tween - DONE
function tweenimate(time) {
	requestAnimationFrame(tweenimate);
	TWEEN.update(time);
}

// =========== auto orientation - DONE
function fitScreen() {
	// var w = window.innerWidth, h = window.innerHeight;
	sWidth = mobile?window.innerWidth:document.getElementById('content').clientWidth;
 	sHeight = mobile?window.innerHeight:document.getElementById('content').clientHeight;
	app.renderer.resize(sWidth, sHeight);

	var v = scrollObj.getValues();
	var left = v.left, top = v.top;
	var s = sWidth < sHeight ? (sWidth / 750) : (sHeight / 750);
	if (s==0) {return;}

	if (sWidth < sHeight) {// portrait
		setTimeout(function(){
			base.rotation = Math.PI / 2;
			base.scale.set(s, s)
			base.x = sWidth;
			storyLength = storyLength0 + sHeight - sHeight/s;
			scrollObj.setDimensions(sWidth, sHeight, sWidth, storyLength);
			scrollObj.scrollTo(0, left, !1);
		}, 0);

	} else {// landscape
		setTimeout(function(){
			base.rotation = 0;
			base.scale.set(s, s)
			base.x = 0;
			storyLength = storyLength0 + sWidth - sWidth/s;
			scrollObj.setDimensions(sWidth, sHeight, storyLength, sHeight);
			scrollObj.scrollTo(top, 0, !1);
		}, 0);
	}
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
	if (l == 0) {scnStart.alpha = 1}

	if (l > 0 && l <= 1750) {
		scnStart.alpha = 0;
	}

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
    // console.log(a.offsetX+', '+a.offsetY)
}
function onMousemove(e) {
	if (touchOn) {
		var a = e.data.originalEvent;
	    scrollObj.doTouchMove([a], a.timeStamp);
    }
}
function onMouseout(e) {
	if (touchOn) {
		var a = e.data.originalEvent;
	    scrollObj.doTouchEnd(a.timeStamp);
	    touchOn = !1;
    }
}
function onMouseup(e) {
	var a = e.data.originalEvent;
    scrollObj.doTouchEnd(a.timeStamp);
    touchOn = !1;
}

// =========== MAIN ============
// determine device and respond differently
var mobile =!0;
if (!/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase())) {
	// if not mobile devices
	var mobile = !1;
	document.getElementById('loading_tips').innerHTML = '努力读取中，请稍后...';
	document.getElementById('content')
		.setAttribute('style', 'position: absolute; height: 400px; width: 760px; top: 50%; left: 50%; margin-top: -200px; margin-left: -380px;');
	// document.getElementById('content').setAttribute('style', 'height: 100vh; width: 100vw; background: #eee url(./assets/images/loading/desktop.png) no-repeat center 100px; background-size: 639px 396px;');
}
// load music before PIXI
// TODO by default muted

// declare globals
var touchOn = !1; // used by scroller touch event
var app = new PIXI.Application({});
var base = new PIXI.Container(); //container for rotation
var roll = new PIXI.Container(); //container for scroll
var scnContainers = [];
var loader = PIXI.loader;

var sWidth = mobile?window.innerWidth:document.getElementById('content').clientWidth;
var sHeight = mobile?window.innerHeight:document.getElementById('content').clientHeight;
var storyLength, storyLength0 = 3000;

// scene containers
var scnStart;

// scroller
var scrollObj = new Scroller(scrollCbk, { zooming: !1, animating: !0, bouncing: !1, animationDuration: 1000 });
// start
gameLoad();

// ========== WRAP UP ==========
window.addEventListener('resize', fitScreen, true);

// ANALYSIS

}();