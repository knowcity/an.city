!function gamerun() {
// determine device
if (!/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase())) {
	c = document.getElementById('content');
	c.innerHTML = '';
	return void c.setAttribute("style", "height: 100vh; width: 100vw; background: #eee url(./assets/images/loading/desktop.png) no-repeat center 100px; background-size: 639px 396px;");
}

// === init base for stage
var app = new PIXI.Application({});
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x3498db;
document.getElementById('content').appendChild(app.view);
document.getElementById('intro-container').style.display = 'none';
var base = new PIXI.Container();
app.stage.addChild(base);

// === loading TextureCache while loading
// function i() { C.add(imgInfo + "start/hand.png").add(imgInfo + "start/text.png").add(imgInfo + "transition/tree_1.png").add(imgInfo + "transition/transition23.png").add(imgInfo + "transition/transition34.png").add(imgInfo + "transition/transition45.png").add(imgInfo + "transition/transition45_2.png").add(imgInfo + "transition/tunnel.png").add(imgInfo + "transition/m0.png").add(imgInfo + "logo.png").add(imgInfo + "text/close.png").add(imgInfo + "text/t1_1.png").add(imgInfo + "text/t1_2.png").add(imgInfo + "text/t1_3.png").add(imgInfo + "text/t2_1.png").add(imgInfo + "text/t2_2.png").add(imgInfo + "text/t2_3.png").add(imgInfo + "text/t3.png").add(imgInfo + "text/t4_1.png").add(imgInfo + "text/t4_2.png").add(imgInfo + "text/t4_3.png").add(imgInfo + "text/t5_1.png").add(imgInfo + "text/t5_2.png").add(imgInfo + "text/t6_1.png").add(imgInfo + "text/t6_2.png").add(imgInfo + "text/t7_1.png").add(imgInfo + "text/t7_2.png").add(imgInfo + "text/t8_1.png").add(imgInfo + "text/tt8_2.png").add(imgInfo + "text/pp1.png").add(imgInfo + "text/pp3_1.png").add(imgInfo + "text/pp3_2.png").add(imgInfo + "text/pp4_1.png").add(imgInfo + "text/pp4_2.png").add(imgInfo + "text/pp5.png").add(imgInfo + "text/pp6.png").add(imgInfo + "text/pp7_1.png").add(imgInfo + "text/pp7_2.png").add(imgInfo + "1/bg.jpg").add(imgInfo + "1/door.png").add(imgInfo + "1/1.png").add(imgInfo + "1/2-1.png").add(imgInfo + "1/2-2.png").add(imgInfo + "1/3.png").add(imgInfo + "1/4.png").add(imgInfo + "1/5.png").add(imgInfo + "1/6.png").add(imgInfo + "2/bg.png").add(imgInfo + "2/star.png").add(imgInfo + "2/car1.png").add(imgInfo + "2/car2.png").add(imgInfo + "2/cow1.png").add(imgInfo + "2/cow2.png").add(imgInfo + "2/m0.png").add(imgInfo + "2/m1.png").add(imgInfo + "2/m2.png").add(imgInfo + "2/cover.png").add(imgInfo + "3/bg.jpg").add(imgInfo + "3/cloud.png").add(imgInfo + "3/m3.png").add(imgInfo + "3/m2.png").add(imgInfo + "3/m1.png").add(imgInfo + "3/ground.png").add(imgInfo + "3/tunnel.png").add(imgInfo + "3/tunnel2.png").add(imgInfo + "3/cows.png").add(imgInfo + "4/bg.jpg").add(imgInfo + "4/animal1.png").add(imgInfo + "4/animal2.png").add(imgInfo + "4/animal3.png").add(imgInfo + "4/animal4.png").add(imgInfo + "4/animal5.png").add(imgInfo + "4/cloud4.png").add(imgInfo + "4/cover.png").add(imgInfo + "4/guidao.png").add(imgInfo + "4/mm.png").add(imgInfo + "4/sun.png").add(imgInfo + "4/train.png").add(imgInfo + "5/bg.png").add(imgInfo + "5/cloud.png").add(imgInfo + "5/ground.png").add(imgInfo + "5/m2.png").add(imgInfo + "5/m3.png").add(imgInfo + "5/mm.png").add(imgInfo + "5/sitcow.png").add(imgInfo + "5/animal1.png").add(imgInfo + "5/cow2.png").add(imgInfo + "6/bg.png").add(imgInfo + "6/cloud.png").add(imgInfo + "6/mm.png").add(imgInfo + "6/lake.png").add(imgInfo + "6/cloud2.png").add(imgInfo + "6/mm2.png").add(imgInfo + "6/animal1.png").add(imgInfo + "6/animal2.png").add(imgInfo + "6/animal3.png").add(imgInfo + "6/glass.png").add(imgInfo + "6/house.png").add(imgInfo + "7/bg.png").add(imgInfo + "7/cloud.png").add(imgInfo + "7/m1.png").add(imgInfo + "7/m2.png").add(imgInfo + "7/m3.png").add(imgInfo + "7/m4.png").add(imgInfo + "7/ground.png").add(imgInfo + "8/bg78.png").add(imgInfo + "8/bg.png").add(imgInfo + "8/star.png").add(imgInfo + "8/mm.png").add(imgInfo + "8/ground.png").add(imgInfo + "8/building.png").add(imgInfo + "8/people.png").add(imgInfo + "8/train.png").add(imgInfo + "end/end.png").add(imgInfo + "end/share.png").add(imgInfo + "end/reset.png").add(imgInfo + "common-share-tip.png").on("progress", I).load(e) }
function progress(n, a) {
	var t = parseInt(n.progress);
    document.getElementById('percent').innerHTML(t + "%")
}
// TODO

// === scroller
function scrollCbk(left, top, zoom) {}
var sObj = new Scroller(scrollCbk, { zooming: !1, animating: !0, bouncing: !1, animationDuration: 1e3 });
sObj.options.scrollingY = !0; // clear

// === auto orientation
function fitScreen() {
	var w = window.innerWidth, h = window.innerHeight;
	var s = w < h ? (w / 750) : (h / 750);
	app.renderer.resize(w, h);
	if (w < h) {
		base.rotation = Math.PI / 2;
		base.scale.set(s, s)
		base.x = w;
	} else {
		base.rotation = 0;
		base.scale.set(s, s)
		base.x = 0;
	}
}
function lockLandscape() {setTimeout(fitScreen,200);}
window.addEventListener('resize', lockLandscape, true);


// lalalalallalala
fitScreen();







// adding content
var bgTex = PIXI.Texture.fromImage('./assets/images/1/bg.jpg');
var bg = new PIXI.Sprite(bgTex);
bg.position.set(0,0);
base.addChild(bg)



// need to write a helper function to show the XY coord of doTouchStart

// // Start animating
// animate();

// function animate() {
//     requestAnimationFrame(animate);

//     // Render our container
//     renderer.render(stage);
// }

}();