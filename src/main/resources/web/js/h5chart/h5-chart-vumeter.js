/*******************************************************************************
 * File: h5-chart-vumeter.js 
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

function VumeterMatrix() {
	this.left = 10;
	this.top = 10;
	this.width = 200;
	this.height = 100;
	this.xpoints = 5;
	this.ypoints = 6;
	this.color = '#00F400';
	this.lineWidth = 1;
	this.lineColor = 'grey';

	this.getDimension = function() {
		var y=2;
		var x=2;
		if(this.xpoints>this.ypoints) y=0;
		else x=0;
		return {
			left : this.left + 2,
			top : this.top + 2,
			width : this.width - (4+x) - .5*(this.xpoints+1),
			height : this.height - (4+y) - .5*(this.ypoints+1)
		};
	};

	this.drawBackGround = function(canvasId) {
		var dimension = this.getDimension();
		var y = dimension.height / this.ypoints;
		var x = dimension.width / this.xpoints;
		var ctx = getContext(canvasId);
		for ( var n = 0; n < this.xpoints; n++) {
			for ( var m = 0; m < this.ypoints; m++) {
				var left = Math.floor(dimension.left + n * (x + 1)) + .5;
				var top = Math.floor(dimension.top + m * (y + 1)) + .5;
				var wid = Math.floor(x - 1);
				var hei = Math.floor(y - 1);
				
				fillRect(ctx, left, top, wid, hei, "white");
				drawRect(ctx, left, top, wid, hei, 1, "#DADADA");
			}
		}

	};

	this.fillPoint = function(canvasId, row, column, color) {
		var ctx = getContext(canvasId);
		var dimension = this.getDimension();
		var y = dimension.height / this.ypoints;
		var x = dimension.width / this.xpoints;
		var left = Math.floor(dimension.left + column * (x + 1)) + .5;
		var top = Math.floor(dimension.top + row * (y + 1)) + .5;
		var wid = Math.floor(x - 1);
		var hei = Math.floor(y - 1);
		fillRect(ctx, left, top, wid, hei, color);
		drawRect(ctx, left, top, wid, hei, 1, "#DADADA");
	};

	this.clearPoint = function(canvasId, row, column) {
		this.fillPoint(canvasId, row, column, "white");
	};

	this.fillRow = function(canvasId, row, buf, color) {
		for ( var n = 0; n < buf.length; n++) {
			if (buf[n] == 1)
				this.fillPoint(canvasId, row, n, color);
			else
				this.clearPoint(canvasId, row, n);
		}
	};

	this.fillColumn = function(canvasId, column, buf, color) {
		for ( var n = 0; n < buf.length; n++) {
			if (buf[n] == 1)
				this.fillPoint(canvasId, n, column, color);
			else
				this.clearPoint(canvasId, n, column);
		}
	};

}

function Vumeter() {
	this.min;
	this.xpoints = 1;
	this.ypoints = 3;
	this.fillStyleFrom = "bottom";
	this.background=false;
	
	this.init = function() {
		this.serie = new Serie();
		this.serie.init();
	};

	this.vm = new VumeterMatrix();

	this.init();

	this.getDimension=function(){
		return {left:this.left,top:this.top,width:this.width,height:this.height};
	}
	
	this.drawBackGround=function(canvasId){
		var dim=this.getDimension();
		
		fillRect(getContext(canvasId), dim.left, dim.top, dim.width, dim.height, 
		'white',new Shadow({offsetX:3,offsetY:3,blur:5}));
	};
	
	this.draw = function(canvasId) {
		this.canvasId=canvasId;
		if(this.regionManager)
			this.regionManager.set(this);
		
		document.getElementById(canvasId).startAnimationInProgress(this);
		
		if(this.background)
			this.drawBackGround(canvasId);
		this.vm = new VumeterMatrix();
		this.vm.left=this.left;
		this.vm.top=this.top;
		this.vm.height = this.height;
		this.vm.width = this.width;
		this.vm.xpoints = this.xpoints;
		this.vm.ypoints = this.ypoints;
		this.vm.drawBackGround(canvasId);
		if(this.orientation=='vertical')
			this.fillFromBottom(canvasId);
		else
			this.fillFromLeft(canvasId);
		
		this.hideTooltip();
		document.getElementById(canvasId).updateImage();
		document.getElementById(canvasId).stopAnimationInProgress(this);
		
	};

	this.scale = function(value, points, start) {
		var max = this.serie.get(this.serie.length() - 1).value;
		var val = value;
		if (value > max)
			val = max;
		var v = Math.abs(start - (val * points / (max - this.min) - 1));
		
		if (parseInt(v)!=0 && parseFloat(v)-Math.floor(v) > .5)
			v = Math.floor(v) + 1;
		else
			v = Math.floor(v);
		if (v > points - 1)
			v = points - 1;
		if(v<0) v=0;
		return v;
	};

	this.scaleX = function(value, points) {
		var max = this.serie.get(this.serie.length() - 1).value;
		var val = value;
		if (value > max)
			val = max;
		var v = Math.abs(val * points / (max - this.min));
		
		if (parseFloat(v)-Math.floor(v) > .5)
			v = Math.floor(v) + 1;
		else
			v = Math.floor(v);
		
		if (v > points-1)
			v = points - 1;
		if(v<0) v=0;
		return v;
	};

	this.getColorX = function(n, points) {

		for ( var m = 0; m < this.serie.length(); m++) {
			var s = this.serie.get(m);
			if (this.scaleX(s.value, points) > n)
				return s.color;
		}

	};
	
	this.getColor = function(n, points, start) {

		for ( var m = 0; m < this.serie.length(); m++) {
			var s = this.serie.get(m);
			if (this.scale(s.value, points, start) <= n)
				return s.color;
		}

	};

	this.getBuffer = function(limit, points, start) {
		var result = new Array();
		for ( var n = 0; n < this.current.length; n++) {
			var cur = this.current[n];
			if (this.scale(cur, points, start) <= limit)
				result[n] = 1;
			else
				result[n] = 0;
		}
		return result;
	};

	this.getBufferX = function(limit, points) {
		var result = new Array();
		for ( var n = 0; n < this.current.length; n++) {
			var cur = this.current[n];
			
			if (this.scaleX(cur, points) >= limit)
				result[n] = 1;
			else
				result[n] = 0;
		}
		alert(result);
		return result;
	};
	
	this.fillFromBottom = function(canvasId) {
		for ( var n = this.ypoints - 1; n >= 0; n--) {
			var buf = this.getBuffer(n, this.ypoints, this.ypoints - 1);
			var color = this.getColor(n, this.ypoints, this.ypoints - 1);
			this.vm.fillRow(canvasId, n, buf, color);
		}
	};
	
	this.fillFromLeft = function(canvasId) {
		for ( var n = 0; n < this.xpoints ; n++) {
			var buf = this.getBufferX(n, this.xpoints);
			var color = this.getColorX(n, this.xpoints);
			this.vm.fillColumn(canvasId, n, buf, color);
		}
	};

};

Vumeter.prototype = new OneDimensionGraph();
