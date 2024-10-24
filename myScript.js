const width = 128;
const height = 64;
const cells_width = 10;
const cells_height = 10;

let pixel = [];

// Get the canvas element and its context
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');

function createBitsMap() {
	ctx.fillStyle = "#81c784";
	ctx.fillRect(0, 0, width*cells_width, height*cells_height);

	// Iterate over each pixel position and draw a dot
	for(let i = 0; i < width; i++) {
		for(let j = 0; j < height; j++) {
			drawPixelCells(i, j);
		}
	}
}

// Function to draw a dot at a given (x, y) position
function drawPixelCells(x, y) {
	ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
	ctx.strokeRect(x*cells_width, y*cells_height, cells_width, cells_height);
}

function setPixel(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x*cells_width, y*cells_height, cells_width, cells_height);
}

function isPixelSet(x, y) {
	for(let i = 0; i < pixel.length; i++) {
		if((pixel[i].Xoffset == x) && (pixel[i].Yoffset == y)) {
			pixel.splice(i, 1);
			return true;
		}
	}
	return false;
}

canvas.addEventListener("click", (e) => {
	let Xoffset = Math.floor(e.offsetX/cells_width);
	let Yoffset = Math.floor(e.offsetY/cells_height);
	
	if(Xoffset == -1 || Xoffset == 128)
		return 0;

	if(isPixelSet(Xoffset, Yoffset)) {
		setPixel(Xoffset, Yoffset, "#81c784");
		drawPixelCells(Xoffset, Yoffset);
	} else {
		pixel.push({Xoffset, Yoffset});
		setPixel(Xoffset, Yoffset, "#1B5E20");
	}

	resetBitValue();
	readBits();
});


const head = document.getElementById('head');
const board = document.getElementById('showBitValue');

let offsetX;
let offsetY;

head.addEventListener("dragstart", (e) => {
	offsetX = e.clientX;
	offsetY = e.clientY;
});

head.addEventListener("dragend", (e) => {	
	board.style.top = `${e.clientY - offsetY + board.offsetTop}px`;
	board.style.left = `${e.clientX - offsetX + board.offsetLeft}px`;
});


function readBits() {
	for(let i=0; i<pixel.length; i++) {
		if(pixel[i].Yoffset < 8) {
			writeBitsValue(0, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 16) {
			writeBitsValue(1, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 24) {
			writeBitsValue(2, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 32) {
			writeBitsValue(3, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 40) {
			writeBitsValue(4, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 48) {
			writeBitsValue(5, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 56) {
			writeBitsValue(6, pixel[i].Xoffset, pixel[i].Yoffset);
		} else if(pixel[i].Yoffset < 64) {
			writeBitsValue(7, pixel[i].Xoffset, pixel[i].Yoffset);
		}
	}
}

function writeBitsValue(bitSetId, XaxisBit, YaxisBit) {
	let bitSet, childs, numValue, readValue, hexString;

	bitSet = document.getElementById(`bitSet${bitSetId}`);
	childs = bitSet.children[XaxisBit];

	readValue = childs.innerHTML;
	numValue = parseInt(readValue, 16);
	hexString = (128>>(YaxisBit%8))+numValue;
	hexString = hexString.toString(16);

	childs.innerHTML = `0x${hexString}`;
	childs.style.backgroundColor = "#e6ee9c";
}