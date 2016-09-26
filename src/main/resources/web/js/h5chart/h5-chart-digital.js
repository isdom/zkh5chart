/*******************************************************************************
 * File: h5-chart-digital.js 
 * Copyright (C) 2009-2011 
 * Author: L.D.Nigro 
 * Contributor(s):
 * 
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 * 
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/

function decode(value) {

	if (value == -1)
		return 0;

	var a = new Array();
	a[0] = 63;
	a[1] = 24;
	a[2] = 109;
	a[3] = 124;
	a[4] = 90;
	a[5] = 118;
	a[6] = 115;
	a[7] = 28;
	a[8] = 127;
	a[9] = 94;

	return a[parseInt(value)];

}

function decodePin(pin) {
	var a = [ 0, 1, 2, 4, 8, 16, 32, 64, 128 ];
	return a[pin];
}

function isPin(pin, value) {

	var code = decode(value);
	if ((code & decodePin(pin)) > 0)
		return true;
	return false;
}

function hexaPathV(ctx, left, top, width, height) {
	var sw = width / 2;
	var h = sw / Math.sin(toRadian(80));

	ctx.moveTo(left + sw, top);
	ctx.lineTo(left + width, top + h);
	ctx.lineTo(left + width, top + height - h);
	ctx.lineTo(left + sw, top + height);
	ctx.lineTo(left, top + height - h);
	ctx.lineTo(left, top + h);
	ctx.lineTo(left + sw, top);

}

function hexaPathH(ctx, left, top, width, height) {
	var sw = height / 2;
	var h = Math.abs(sw / Math.sin(toRadian(80)));

	ctx.moveTo(left, top + sw);
	ctx.lineTo(left + h, top);
	ctx.lineTo(left + width - h, top);
	ctx.lineTo(left + width, top + sw);
	ctx.lineTo(left + width - h, top + height);
	ctx.lineTo(left + h, top + height);
	ctx.lineTo(left, top + sw);

}

function drawHexaPath(ctx, left, top, width, height, lineWidth, color, type) {
	ctx.save();
	ctx.beginPath();
	if (type == 0)
		hexaPathV(ctx, left, top, width, height);
	else
		hexaPathH(ctx, left, top, width, height);

	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.stroke();
	ctx.restore();
}

function fillHexaPath(ctx, left, top, width, height, color, type) {

	ctx.save();
	ctx.beginPath();
	if (type == 0)
		hexaPathV(ctx, left, top, width, height);
	else
		hexaPathH(ctx, left, top, width, height);

	ctx.fillStyle = color;
	ctx.fill();
	ctx.restore();
}

function Digit() {

	this.left = 10;
	this.top = 10;
	this.width = 40;
	this.height = 70;
	this.color = '#00F400';
	this.lineWidth = 1;
	this.lineColor = 'grey';
	this.dot = false;
	this.negative = false;
	this.value = -1;
	this.background = true;

	this.drawBackGround = function(canvasId) {
		var ctx = getContext(canvasId);
		for ( var n = 0; n <= this.height; n += 2) {
			drawDottedLine(ctx, this.left, this.top + n,
					this.left + this.width, this.top + n, 0.5, 'grey');
		}
		drawRect(ctx, this.left, this.top, this.width, this.height, .5,
				'#D0D0D0');
	};

	this.getDimension = function() {
		return {
			left : this.left + 5,
			top : this.top + 5,
			width : this.width - 10,
			height : this.height - 10
		};
	};

	this.draw = function(canvasId) {

		var dim = this.getDimension();
		var ctx = getContext(canvasId);

		ctx.beginPath();
		var w = dim.width / 6;
		var l = Math.abs(w / 2 * Math.sin(toRadian(80)));
		var h = dim.height / 2 - w / 2;

		if (this.background)
			this.drawBackGround(canvasId);

		if (isPin(2, this.value)) {
			fillHexaPath(ctx, dim.left, dim.top + l, w, h, this.color, 0);

		}
		drawHexaPath(ctx, dim.left, dim.top + l, w, h, 0.5, '#E0E0E0', 0);

		if (isPin(1, this.value)) {
			fillHexaPath(ctx, dim.left, dim.top + l + h, w, h, this.color, 0);

		}
		drawHexaPath(ctx, dim.left, dim.top + l + h, w, h, 0.5, '#E0E0E0', 0);

		if (isPin(4, this.value)) {
			fillHexaPath(ctx, dim.left + dim.width - w, dim.top + l, w, h,
					this.color, 0);

		}
		drawHexaPath(ctx, dim.left + dim.width - w, dim.top + l, w, h, 0.5,
				'#E0E0E0', 0);

		if (isPin(5, this.value)) {
			fillHexaPath(ctx, dim.left + dim.width - w, dim.top + l + h, w, h,
					this.color, 0);
		}
		drawHexaPath(ctx, dim.left + dim.width - w, dim.top + l + h, w, h, 0.5,
				'#E0E0E0', 0);

		if (isPin(3, this.value)) {
			fillHexaPath(ctx, dim.left + l, dim.top, dim.width - 2 * l, w,
					this.color, 1);
		}
		drawHexaPath(ctx, dim.left + l, dim.top, dim.width - 2 * l, w, 0.5,
				'#E0E0E0', 1);

		if ((isPin(7, this.value) || this.negative)) {
			fillHexaPath(ctx, dim.left + l, dim.top + h, dim.width - 2 * l, w,
					this.color, 1);
		}
		drawHexaPath(ctx, dim.left + l, dim.top + h, dim.width - 2 * l, w, 0.5,
				'#E0E0E0', 1);

		if (isPin(6, this.value)) {
			fillHexaPath(ctx, dim.left + l, dim.top + 2 * h, dim.width - 2 * l,
					w, this.color, 1);
		}
		drawHexaPath(ctx, dim.left + l, dim.top + 2 * h, dim.width - 2 * l, w,
				0.5, '#E0E0E0', 1);

		if (this.dot && this.value != -1) {

			fillCircle(ctx, dim.left + 1 + dim.width + l / 2, dim.top + 1
					+ dim.height - l / 2, l, this.color);
		}
		drawCircle(ctx, dim.left + dim.width + 1 + l / 2, dim.top + 1
				+ dim.height - l / 2, l, .5, '#E0E0E0');

	};

}

function DigitalMeter() {
	this.signed = true;
	this.digits = 3;
	this.decimals = 1;
	this.background = true;

	this.init();
		
	this.draw = function(canvasId) {
		this.canvasId=canvasId;
		var dim = this.getDimension();
		var col;
		var blink = false;

		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();
		
		for ( var n = 0; n < this.serie.length(); n++) {
			var r = this.serie.get(n);
			col = r.color;
			if (this.current <= r.value) {
				col = r.color;
				if (r.blink)
					blink = r.blink;
				break;
			}
		}

		var digitsArray = new Array();
		var w = dim.width / (this.digits);
		if (this.signed) {
			w = dim.width / (1 + this.digits);
		}

		var v = 0;
		if (this.signed)
			v = 1;
		for ( var n = 0; n < this.digits + v; n++) {
			var d = new Digit();
			d.color = col;
			d.left = dim.left + n * w;
			d.top = dim.top;
			d.width = w;
			d.height = dim.height;
			d.background = this.background;
			digitsArray[n] = d;
		}

		var curval = round(this.current, this.decimals);

		if (this.decimals > 0) {
			if (curval >= 0)
				curval = curval + 1 / Math.pow(10, this.decimals + 3);
			else if (curval < 0)
				curval = curval - 1 / Math.pow(10, this.decimals + 3);

			curval = curval.toString().substring(0,
					curval.toString().length - 3);

		}
		
		var canvas=document.getElementById(canvasId);
		canvas.startAnimationInProgress(this);
//		
		this.drawBackGround(canvasId, dim);
		
		val = curval.toString();
		this.drawValue(canvasId, curval, val, digitsArray);
		
		if (this.animate && blink == true) {
			var bg = true;
			var counter = 0;
			
			var max = this.animateCounter;
			if (!max)
				max = 50;
			var obj = this;

			var id = setInterval(function() {
				
				if (counter == max && max > 0) {

					obj.drawValue(canvasId, curval, val, digitsArray);
					clearInterval(id);
					
					if(obj.regionManager)
						obj.regionManager.set(obj);
					
					obj.hideTooltip();
//					var canvas=document.getElementById(canvasId);
//					canvas.startAnimationInProgress(obj);
					document.getElementById(canvasId).updateImage();
					canvas.stopAnimationInProgress(obj);
					
				} else {

					if (bg) {
						bg = false;
						obj.drawValue(canvasId, curval, val, digitsArray);
					} else {
						bg = true;
						obj.drawValue(canvasId, "", "", digitsArray);
					}

				}
				counter++;
			}, 350);
		} else {
			this.drawValue(canvasId, curval, val, digitsArray);
			
			if(this.regionManager)
				this.regionManager.set(this);
			
			this.hideTooltip();
			
//			var canvas=document.getElementById(canvasId);
//			canvas.startAnimationInProgress(this);
			document.getElementById(canvasId).updateImage();
			canvas.stopAnimationInProgress(this);
		}

	};

	this.drawBackGround = function(canvasId, dimension) {
		var r1 = new Rectangle();
		var radius = .5;
		r1.left = dimension.left - radius;
		r1.top = dimension.top - radius;
		r1.width = dimension.width + 2 * radius;
		r1.height = dimension.height + 2 * radius;
		r1.color = '#E0E0E0';
		r1.fillStyle = 'solid';
		r1.borderStyle = 'solid';
		r1.borderWidth = 0.5;
		r1.borderColor = '#707070';
		r1.radius = radius;
		r1.shadow = new Shadow({
			offsetX : 2,
			offsetY : 2,
			blur : 5
		});
		r1.draw(canvasId);
	};

	this.drawValue = function(canvasId, curval, val, digitsArray) {

		var m = val.length - 1;
		var j = 0;
		var v1 = 0;
		if (this.signed)
			v1 = 1;
		var ctx = getContext(canvasId);
		var dim = this.getDimension();
		ctx.clearRect(dim.left, dim.top, dim.width, dim.height);

		if (val != "") {
			for ( var n = this.digits + v1 - 1; n >= 0; n--) {
				var v = -1;

				if (m >= 0) {
					v = val.charAt(m);
					if (this.decimals == j && this.decimals > 0) {
						digitsArray[n].dot = true;
						m--;
						v = val.charAt(m);

					} else if (v == '-') {
						digitsArray[n].negative = true;
						v = -1;
					}

				}

				digitsArray[n].value = v;
				digitsArray[n].draw(canvasId);
				m--;
				j++;

			}
		} else {
			for ( var n = this.digits + v1 - 1; n >= 0; n--) {
				digitsArray[n].negative = false;
				digitsArray[n].dot = false;
				digitsArray[n].value = "";
				digitsArray[n].draw(canvasId);
			}
		}

	};
}

DigitalMeter.prototype = new OneDimensionGraph();
