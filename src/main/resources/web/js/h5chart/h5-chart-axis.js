/*******************************************************************************
 * File: h5-chart-axis.js 
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

/**
 * Axis 
 * 
 * @returns {Axis}
 */
function Axis() {

	this.orientation = 'horizontal';

	this.lineWidth = 1;

	this.shadow = false;

	this.color = 'grey';

	this.labelsWidth = 0;
		
	this.labelsAngle = 0;
	
	this.labelsOnTick = false;

	this.tickPosition = 'over'; // under

	this.init();

	this.getDimension = function() {
		var left = this.left;
		var top = this.top;
		var width = this.width - 5;
		var height = this.height - 5;
		
		var a=0;
		if(this.labelsOnTick==true)
			a=1;
		
		var slot=width/(this.serie.length()-a);
		if(this.orientation=='vertical')
			slot=height/(this.serie.length()-a);
		
		return {
			left : left + 5,
			top : top + 5,
			width : width,
			height : height,
			slot: slot
		};
	};

	this.draw = function(canvasId) {

		var axis = new Rule();
		var dim = this.getDimension();
		var intervals = this.serie.length();

		var ctx = getContext(canvasId);
		ctx.save();
		ctx.beginPath();

		var offset = 0;
		var of = 1;
		if (this.tickPosition == 'over') {
			offset = 0;
			of = -1;
		} else if (this.tickPosition == 'under') {
			offset = -1;
			of = 1;
		}
		if(this.shadow){
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.shadowBlur = 5;
			ctx.shadowColor = "#6F6F6F";
		}
		
		var lw=this.labelsWidth;
		
		if(lw==0){
			for(var f=0;f<this.serie.length();f++){
				var te=this.serie.get(f).value;
				lw=Math.max(lw,getTextWidth(ctx, this.labelStyle.font, te));
			}
		}
		
		if (this.orientation == 'vertical') {
			drawLine(ctx, dim.left+dim.width, dim.top, dim.left+dim.width, dim.top + dim.height,
					this.lineWidth, this.color);
		} else if (this.orientation == 'horizontal') {
			drawLine(ctx, dim.left, dim.top, dim.left + dim.width, dim.top,
					this.lineWidth, this.color);
		}

		var num = 0, m = 0;
		var xf = 0;
		var yf = 0;

		if (this.orientation == 'horizontal')
			xf = 1;
		if (this.orientation == 'vertical')
			yf = 1;

		var ll = this.left;
		var lt = this.top;
		var count = 0;
		
		var mx=0;
		if(this.labelsAngle>0) mx=(dim.slot/2)*Math.cos(toRadian(360-this.labelsAngle));
		var my=0;
		if(this.labelsAngle>0) my=(dim.slot/2)*Math.sin(toRadian(360-this.labelsAngle));
		var fh=getTextHeight(this.labelStyle.font);
		
		var ot=1;
		var oty=0;
		if(this.labelsOnTick==true){
			ot=0;
			oty=1;
		}
		for (n = 0; n < this.serie.length() + ot; n++) {
			if (this.orientation == 'horizontal'){
				drawTick(ctx, dim.left, dim.top, n * dim.slot, this.orientation, 7,
						offset, this.lineWidth, this.color);	
			} else {
				drawTick(ctx, dim.left+dim.width-7, dim.top, n * dim.slot, this.orientation, 7,
						offset, this.lineWidth, this.color);	
			}
			
			if (n < this.serie.length()) {
				var t = new Text();
				t.text = this.serie.get(n).value;
				t.font = this.labelStyle.font;
				t.color = this.labelStyle.color;
				if(this.labelsAngle>0)
					t.angle = 360-this.labelsAngle;
								
				if(this.orientation=='horizontal'){
					t.maxWidth = lw;
					if(this.labelsAngle==0)
						t.align='center';
					else if(lw==0)
						t.align='left';
					else
						t.align='center';
					
					if(this.labelsAngle==90){ fh=0;my=0; t.align='right'};
					
					t.setBounds( {
						left : dim.left + n * dim.slot + ot * dim.slot/2 - mx,
						top : dim.top + 9 + fh - my
					});
					
				}else{
					t.maxWidth = lw;
					t.align='left';
					t.setBounds( {
						left : dim.left+dim.width-lw-7 - mx,
						top : dim.top + fh + dim.slot*n - my
					});
				}
				
				
				t.draw(canvasId);
			}
		}

		ctx.restore();
		
		document.getElementById(canvasId).updateImage();
		
	};

}

Axis.prototype = new OneDimensionGraph();
