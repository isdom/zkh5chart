/*******************************************************************************
 * File: h5-chart-led.js 
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

function LedMatrix() {
	this.left = 10;
	this.top = 10;
	this.width = 350;
	this.height = 50;
	this.xpoints;
	this.ypoints = 6;
	this.color = '#00F400';
	this.lineWidth = 1;
	this.lineColor = 'grey';
	this.dot = false;

	this.lx;
	this.ly;
	this.rad;
	this.s;

	this.getLen = function(ch){
		var l=4;
		if(ch=="." || ch=="," ) l=1;
		if(ch=="I" || ch=="1" || ch==" ") l=3;
		if(ch=="M" || ch=="W" || ch=="Q" || ch=="V" || ch=="X" || ch=="Y" || ch=="+"  ) l=5;
		return l;
	};
	
	this.getVerticalBuffer = function(msg) {
		var buffer= new Array();
		
		var msg=msg.toUpperCase();
		
		for ( var curchar = 0; curchar < msg.length; curchar++) {
			var ch=msg.charAt(curchar);
			var code = this.decode(ch);
			var ip=this.getLen(ch);
			for ( var pos = ip; pos >=0; pos--) {
				var result = new Array();
				for ( var n = 0; n < 6; n++) {
					result[n] = 0;
					if (code[n] & this.decodePosition(pos))
						result[n] = 1;
				}
				buffer[buffer.length] = result;
			}
			
		}
		buffer[buffer.length]=[0,0,0,0,0,0];
		buffer[buffer.length]=[0,0,0,0,0,0];
		return buffer;
	};

	this.drawVerticalBuffer = function(canvasId,matrixPosition,start,length,buffer,color) {
		var matrixEnd=this.xpoints;
		var column=matrixPosition;
		for(var n=0;n < length && column <= matrixEnd ;n++){
			var cod=buffer[start+n];
			
			for(var m=0;m<cod.length;m++){
				if(cod[m]!=0){
					this.fillPoint(canvasId, m, column, color);
				} else {
					this.clearPoint(canvasId, m, column);
				}
			}
			column++;
		}
		
	};

	this.decode = function(char) {
		var abcd = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789.,-+ ";
		var a = new Array();
		a[0] = [ 6, 9, 9, 15, 9, 9 ];
		a[1] = [ 14, 9, 14, 9, 9, 14 ];
		a[2] = [ 6, 9, 8, 8, 9, 6 ];
		a[3] = [ 14, 9, 9, 9, 9, 14 ];
		a[4] = [ 15, 8, 12, 8, 8, 15 ];
		a[5] = [ 15, 8, 12, 8, 8, 8 ];
		a[6] = [ 6, 9, 8, 11, 9, 6 ];
		a[7] = [ 9, 9, 15, 9, 9, 9 ];
		a[8] = [ 7, 2, 2, 2, 2, 7 ];
		a[9] = [ 7, 2, 2, 2, 10, 6 ];
		a[10] = [ 9, 10, 12, 12, 10, 9 ];
		a[11] = [ 8, 8, 8, 8, 8, 15 ];
		a[12] = [ 17, 27, 21, 17, 17, 17 ];
		a[13] = [ 9, 13, 11, 9, 9, 9 ];
		a[14] = [ 6, 0, 9, 13, 11, 9 ];
		a[15] = [ 6, 9, 9, 9, 9, 6 ];
		a[16] = [ 14, 9, 9, 14, 8, 8, 8 ];
		a[17] = [ 14, 17, 17, 21, 14, 2 ];
		a[18] = [ 14, 9, 14, 12, 10, 9 ];
		a[19] = [ 6, 9, 4, 2, 9, 6 ];
		a[20] = [ 15, 4, 4, 4, 4, 4 ];
		a[21] = [ 9, 9, 9, 9, 9, 6 ];
		a[22] = [ 17, 17, 17, 17, 10, 4 ];
		a[23] = [ 17, 17, 17, 21, 27, 17 ];
		a[24] = [ 17, 10, 4, 4, 10, 17 ];
		a[25] = [ 17, 17, 10, 4, 4, 4 ];
		a[26] = [ 15, 2, 4, 8, 8, 15 ];

		a[27] = [ 6, 9, 11, 13, 9, 6 ];
		a[28] = [ 1, 3, 5, 1,1, 1 ];
		a[29] = [ 6, 9, 2, 4, 8, 15 ];
		a[30] = [ 15, 1, 6, 1, 9, 6 ];
		a[31] = [ 3, 5, 9, 15, 1, 1 ];
		a[32] = [ 15, 8, 14, 1, 9, 6 ];
		a[33] = [ 6, 8, 15, 9, 9, 6 ];
		a[34] = [ 15, 2, 4, 4, 4, 4 ];
		a[35] = [ 6, 9, 6, 9, 9, 6 ];
		a[36] = [ 6, 9, 7, 1, 1, 6 ];

		a[37] = [ 0, 0, 0, 0, 0, 1 ];
		a[38] = [ 0, 0, 0, 0, 1, 1 ];
		a[39] = [ 0, 0, 15, 0, 0, 0 ];
		a[40] = [ 4, 4, 31, 4, 4, 0 ];

		a[41] = [ 0, 0, 0, 0, 0, 0 ];
		var n = abcd.indexOf(char, 0);
		return a[n];
	};

	this.decodePosition = function(position) {
		var a = [ 1, 2, 4, 8, 16, 32 ];
		return a[position];
	};

	this.getDimension = function() {
		return {
			left : this.left + 5,
			top : this.top + 5,
			width : this.width - 10,
			height : this.height - 10
		};
	};

	this.drawBackGround = function(canvasId) {
		var dimension=this.getDimension();
		var y = dimension.height / this.ypoints;

		this.s = y - 	.5;
		this.rad = this.s / 2;

		var xp = Math.floor(dimension.width / (this.s + .5));
		var yp = Math.floor(dimension.height / (this.s + .5));

		this.lx = (dimension.width / xp - this.s) / 2;
		this.ly = (dimension.height / yp - this.s) / 2;

		var ctx = getContext(canvasId);
		for ( var n = 0; n < xp; n++) {
			for ( var m = 0; m < yp; m++) {
				drawCircle(ctx, dimension.left + this.lx + this.rad + n
						* (2 * this.lx + this.s), dimension.top + this.ly
						+ this.rad + m * (2 * this.ly + this.s), this.rad, .5,
						"#DADADA");
			}
		}

		this.xpoints = xp;

	};

	this.drawMessage=function (canvasId,msg,color){
		
		var ini=this.xpoints-1;
		var buf=this.getVerticalBuffer(msg);
		var obj=this;
		var x=Math.min(buf.length,ini);
		this.drawVerticalBuffer(canvasId, 0, 0, x, buf, color);
	};
	
	this.animateBlink=function(canvasId,msg,count,color,parent){
		var m=0,n=0;
		var st=this.xpoints-1;
		var ini=this.xpoints-1;
		var buf=this.getVerticalBuffer(msg);
		var obj=this;
		var max=0;
		var bl=true;
		var x=Math.min(buf.length,ini);
		
		var f1=setInterval(function(){
			if(bl){
				obj.drawVerticalBuffer(canvasId, 0, 0, x, buf, color);
				bl=false;
				max++;
			} else {
				obj.drawVerticalBuffer(canvasId, 0, 0, x, buf, "white");
				bl=true;
			}
			if(max>=count) {
				clearInterval(f1);
				
				obj.drawMessage(canvasId, msg, color);
				
				if(parent.regionManager)
					parent.regionManager.set(parent);
				
				parent.hideTooltip();
				document.getElementById(canvasId).updateImage();
				document.getElementById(canvasId).stopAnimationInProgress(parent);
			}
		}
		,500);
	};
	
	this.animateRL=function(canvasId,msg,count,color,parent){
		var m=0,n=0;
		var st=this.xpoints-1;
		var ini=this.xpoints-1;
		var buf=this.getVerticalBuffer(msg);
		var obj=this;
		var max=0;
		var f=setInterval(function(){
			var x=Math.min(buf.length-n,ini-st);
			
			obj.drawVerticalBuffer(canvasId, st, 0+n, x, buf, color);
			m++;
			st--;
			if(st<0) {
				st=0;
				n++;
			}
			if(n==buf.length){
				st=obj.xpoints-1;
				n=0;
				max++;
			}
			if(max>=count) {
				
				clearInterval(f);
				obj.drawMessage(canvasId, msg, color);
				
				if(parent.regionManager)
					parent.regionManager.set(parent);
				
				parent.hideTooltip();
				document.getElementById(canvasId).updateImage();
				document.getElementById(canvasId).stopAnimationInProgress(parent);
				
			}
		}
		,100);

	};
	
	this.clearPoint = function(canvasId, row, column) {
		var ctx = getContext(canvasId);
		var dimension = this.getDimension();
		fillCircle(ctx, dimension.left + this.lx + this.rad + column
				* (2 * this.lx + this.s), dimension.top + this.ly + this.rad
				+ row * (2 * this.ly + this.s), this.rad, "white");
		drawCircle(ctx, dimension.left + this.lx + this.rad + column
				* (2 * this.lx + this.s), dimension.top + this.ly + this.rad
				+ row * (2 * this.ly + this.s), this.rad, .5, "#DADADA");
	};

	this.fillPoint = function(canvasId, row, column, color) {
		var ctx = getContext(canvasId);
		var dimension = this.getDimension();
		fillCircle(ctx, dimension.left + this.lx + this.rad + column
				* (2 * this.lx + this.s), dimension.top + this.ly + this.rad
				+ row * (2 * this.ly + this.s), this.rad, color);
	};

	this.drawRow = function(canvasId, row, color) {
		var dimension = this.getDimension();
	};

	this.clearColumn = function(canvasId, column) {

		for ( var n = 0; n < this.ypoints; n++) {
			this.clearPoint(canvasId, n, column);
		}
	};

	this.drawColumn = function(canvasId, column, color, char, pos) {
		var a = this.decode(char);

		for ( var n = 0; n < a.length; n++) {
			if (a[n] & this.decodePosition(pos)) {
				this.fillPoint(canvasId, n, column, color);
			} else {
				this.clearPoint(canvasId, n, column);
			}
		}
	};
	
}

function LedMatrixMeter(){
	
	this.animateCounter = 0;
	
	this.init= function(){
		this.serie = new Serie();
		this.serie.init();
	};
	
	this.init();
	
	this.draw=function(canvasId){
		this.canvasId = canvasId;
		var col;
		var blink = false;
		var animateType='none';
		var msg=" ";
		
		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();
				
		for (var n = 0; n < this.serie.length(); n++) {
			var r = this.serie.get(n);
			col = r.color;
			msg= r.message;
			if (r.animateType)
				animateType=r.animateType;
			if (this.current <= r.value) {
				break;
			}
		}
		
		var ld=new LedMatrix();
		ld.left=this.left;
		ld.top=this.top;
		ld.width=this.width;
		ld.height=this.height;
		ld.color=col;
		
		ld.drawBackGround(canvasId);
		
		var canvas=document.getElementById(canvasId);
		canvas.startAnimationInProgress(this);
		
		if(this.animate && animateType!='none'){
			if(animateType=='RL'){
				ld.animateRL(canvasId, msg, this.animateCounter, col,this);
			} else if(animateType='blink') {
				ld.animateBlink(canvasId, msg, this.animateCounter, col,this);
			} 
		} else {
			ld.drawMessage(canvasId, msg, col);
			
			if(this.regionManager)
				this.regionManager.set(this);
			
//			this.hideTooltip();
//			var canvas=document.getElementById(canvasId);
			document.getElementById(canvasId).startAnimationInProgress(this);
			document.getElementById(canvasId).updateImage();
			document.getElementById(canvasId).stopAnimationInProgress(this);
		}
		
	};
	
	
} 

LedMatrixMeter.prototype=new OneDimensionGraph();
