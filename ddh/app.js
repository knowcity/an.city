!function app() {
// determine device
    if (!/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase())) {
    	c = document.getElementById('content');
    	c.innerHTML = '';
    	return void c.setAttribute("style", "height: 100vh; width: 100vw; background: #eee url(./assets/loading/desktop.png) no-repeat center 100px; background-size: 639px 396px;");
    }


// for lock orientation
	// window.addEventListener("resize", lockOrientation);


// renderer.backgroundColor = 0x3498db;


// document.getElementById('content').appendChild(renderer.view);
// document.getElementById('intro-container').style.display = 'none';


// // Create the main stage for your display objects
// var stage = new PIXI.Container();

// // Start animating
// animate();

// function animate() {
//     requestAnimationFrame(animate);

//     // Render our container
//     renderer.render(stage);
// }

}();