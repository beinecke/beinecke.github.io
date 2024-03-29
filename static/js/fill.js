function getQueryStringRegExp(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href))
		return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
}

function rgbToHex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hexToRgb(hex) {
	var bigint = parseInt(hex, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;

	return r + "," + g + "," + b;
}

function colorToInt(fillcolor) {
	return ((fillcolor[0] & 0xFF) << 24) | ((fillcolor[1] & 0xFF) << 16)
		| ((fillcolor[2] & 0xFF) << 8) | ((fillcolor[3] & 0xFF) << 0);
}

function intToColor(num) {
	var r = ((num & 0xFF000000) >>> 24), g = (num & 0xFF0000) >>> 16, b = (num & 0xFF00) >>> 8, a = num & 0xFF;
	return [ r, g, b, a ];
}

/**
 * 定义队列数据结构
 */
function Queue() {
	this.dataStore = [];
}

Queue.prototype = {

	// 向队尾添加一个元素
	enqueue : function(element) {
		this.dataStore.push(element);
	},
	// 删除队首的元素
	dequeue : function() {
		return this.dataStore.shift();
	},
	// 读取队首的元素
	front : function() {
		return this.dataStore[0];
	},
	// 读取队尾的元素
	back : function() {
		return this.dataStore[this.dataStore.length - 1];
	},
	// 显示队列内的所有元素
	toString : function() {
		var retStr = "";
		for (var i = 0; i < this.dataStore.length; ++i) {
			retStr += this.dataStore[i] + "\n";
		}
		return retStr;
	},
	// 判断队列是否为空
	empty : function() {
		if (this.dataStore.length == 0) {
			return true;
		} else {
			return false;
		}
	}
};
//$(function() {
//	var chooseColor,
//	myCanvas = document.getElementById("canvas"),
//	ctx = myCanvas.getContext("2d"),
//	image = new Image();
//	image.onload = function() {
//		ctx.drawImage(image, 0, 0)
//	};
//	image.src = "./static/image/drawing/i1/ITEM.jpg";
//	$("#wire").on("click", function(e) {
//		if (!chooseColor) {
//			alert("请选择要填充的颜色");
//			return false
//		}
//		e = e.originalEvent || e;
//		var wireOffset = $(this).offset();
//		var left = Math.floor(e.pageX - wireOffset.left);
//		var top = Math.floor(e.pageY - wireOffset.top);
//		var imgData = ctx.getImageData(left, top, 1, 1);
//		var colorArr = imgData.data;
//		if (colorArr[0] === 0 && colorArr[1] === 0 && colorArr[2] === 0 && colorArr[3] === 0) {
//			alert("此处不能上色");
//			return false
//		}
//		//判断是否点在线条上
//		if(colorArr[0] < 50 && colorArr[1] < 50 && colorArr[2] < 50 && colorArr[3] === 255){
//			alert("线条处不能上色");
//			return false
//		}
//		var fillColor = hexToRgb(chooseColor).split(",");
//		fillColor.push(255);
//		floodFillLinear(myCanvas, left, top, fillColor, 80);
//	});
//	$("#colors").on("click", "li:not(.checked)", function() {
//		$(this).addClass("checked").siblings(".checked").removeClass("checked");
//		chooseColor = $(this).html()
//	});
//});