/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2021-01-23 18:37:52
* @Last Modified by:   Administrator
* @Last Modified time: 2021-01-23 20:20:20
*/

var canvas_width;
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext("2d");
var images = [];
var imgs = [];
var canvas_y = [];
var img_relative_heights = [];

function init_images() {
	images = [ ...document.querySelector('#upload').files ];
	document.querySelector('#quality-select').style.opacity = 1;
	document.querySelector('#quality-select').style.zIndex = 3;
}

function get_image() {
	if( images.length === 0 ) {
		draw_image();
		return
	};
	let image = images[0];
	images = images.slice(1);
	let reader = new FileReader();
	reader.onload = function() {
		let img = new Image();
		img.onload = () => {
			imgs.push(img);
			let img_relative_height = img.height / img.width * canvas_width;
			img_relative_heights.push( img_relative_height );
			canvas_y.push( canvas.height );
			canvas.height += img_relative_height;
			get_image();
		}
		img.src = reader.result;
	}
	reader.readAsDataURL(image);
}

function set_qualtiy(qualtiy) {
	document.querySelector('.page').className = "page " + qualtiy;
	canvas_width = document.querySelector('.page').clientWidth;
	canvas.width = canvas_width;
	canvas.height = 0;
	document.querySelector('#quality-select').style.opacity = 0;
	document.querySelector('#quality-select').style.zIndex = 0;
	get_image();
	
}

function draw_image() {
	for(let i=0; i<imgs.length; i++)  {
		ctx.drawImage(imgs[i], 0, 0, imgs[i].width, imgs[i].height, 0, canvas_y[i], canvas_width, img_relative_heights[i]);
	}
}