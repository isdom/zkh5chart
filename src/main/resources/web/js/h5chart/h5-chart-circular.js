/*******************************************************************************
 * File: h5-chart-circular.js 
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
 * 
 * @returns {Pie}
 */
function Pie() {

	this.canvasId;

	this.pizza = false;

	this.pizzaStyle = "one"; // 'all'

	this.animateType = "radial";

	this.type = "pie";

	this.showValues = "true";

	this.init();

	this.getDimension = function() {
		var crad = 0;
		if (this.pizza)
			crad = 5;

		var offset = 0;
		var radius = (this.width - 10 - crad) / 2;
		var radius1 = 0;
		if (this.type == 'ring')
			radius1 = radius * 1 / 2;

		var left = this.left + radius;
		var top = this.top + radius;
		return {
			left : left,
			top : top,
			radius : radius,
			radius1 : radius1,
			offset : offset
		};
	};

	this.getLabelDimension = function(canvasId, arrLabel, only) {
		var values = this.getSerie(0);
		for ( var n = 0; n < arrLabel.length; n++) {

			var num = arrLabel[n].num;

			var x = arrLabel[n].x;
			var y = arrLabel[n].y;

			var ctx = getContext(canvasId);
			var val = values.get(num).value;
			var labl = this.labels.get(num).value;
			if (this.align)
				ctx.textAlign = this.align;

			ctx.fillStyle = this.color;

			ctx.font = this.labels.valueStyle.font;

			var fs = this.labels.valueStyle.fontSize();
			var tw = Math.max(ctx.measureText(val).width,
					ctx.measureText(labl).width);
			var th = 2 * fs;

			if ((only != null && only == n) || only == null) {

				return {
					width : tw + 12,
					height : th + 6
				};

			}
		}

	};

	this.drawLabels = function(canvasId, arrLabel, only) {

		var values = this.getSerie(0);
		for ( var n = 0; n < arrLabel.length; n++) {

			var num = arrLabel[n].num;

			var x = arrLabel[n].x;
			// var y=arrLabel[n].y;

			var ctx = getContext(canvasId);
			var val = values.get(num).value;
			var labl = this.labels.get(num).value;
			if (this.align)
				ctx.textAlign = this.align;

			ctx.fillStyle = this.color;

			ctx.font = this.labels.valueStyle.font;

			var fs = this.labels.valueStyle.fontSize();
			var tw = Math.max(ctx.measureText(val).width,
					ctx.measureText(labl).width);
			var th = 2 * fs;
			var y = 3 + fs;

			if ((only != null && only == n) || only == null) {

				// fillRoundRect(ctx,(x-tw/2)-6,(y-th/2)-3,tw+12,th+6,5,"#FFFAC9");
				// drawRoundRect(ctx,(x-tw/2)-6,(y-th/2)-3,tw+12,th+6,5,1,"grey");
				fillRoundRect(ctx, 1, 1, tw + 12, th + 6, 5, "#FFFAC9",
						new Shadow( {
							offsetX : 2,
							offsetY : 2,
							blur : 7
						}));
				drawRoundRect(ctx, 1, 1, tw + 12, th + 6, 5, 1, "grey");

				drawText(canvasId, 5, y, labl, 0, this.tooltipStyle.color,
						this.tooltipStyle.font, "left");

				drawText(canvasId, 5, y + fs, this.tooltipStyle.mask(val),
						0, this.tooltipStyle.color,
						this.tooltipStyle.font, "left");

			}
		}
	};

	this.drawBackGround = function(canvasId, dimension) {

		if (this.type == 'pie') {
			if (!this.pizza || (this.pizza && this.pizzaStyle == 'one')) {
				var cir = new Circle();
				cir.left = dimension.left;
				cir.top = dimension.top;
				cir.radius = dimension.radius;
				cir.fillStyle = 'flat';
				cir.borderStyle = 'none';
				cir.shadow = new Shadow( {
					offsetX : 0,
					offsetY : 0,
					blur : (isFirefox() ? 7 : 12)
				});
				cir.draw(canvasId);
			}
		} else {
			var cir = new Donut();
			cir.left = dimension.left;
			cir.top = dimension.top;
			cir.radius = dimension.radius;
			cir.radius1 = dimension.radius1;
			cir.shadow = new Shadow( {
				offsetX : 0,
				offsetY : 0,
				blur : (isFirefox() ? 7 : 12)
			});
			cir.color = 'white';
			cir.endColor = 'grey';
			cir.fillStyle = 'cilinder';
			cir.borderStyle = 'none';
			cir.borderColor = 'grey';
			cir.draw(canvasId);
		}
	};

	this.drawValue = function(canvasId, dimension, n, offset, only) {
		var values = this.getSerie(0);
		var val = values.get(n);
//		if(!val.color)
//			val.color=this.palette[n];
		var color = this.palette[n]; //val.color;
		var cx = 0, cy = 0, count = 0;
		var sum = values.sum();
		var a = val.value * 360 / sum;

		if (this.pizza) {
			var crad = 5;
			if (this.pizzaStyle == "one")
				crad = 15;

			var rad = toRadian(offset + a / 2);
			cx = crad * Math.cos(rad);
			cy = crad * Math.sin(rad);

			if (this.pizzaStyle == "one" && n > 0) {
				cx = 0;
				cy = 0;
			}
		}

		if (this.pizzaStyle == "one" && this.style == 'pie') {
			var cir1 = new CircleSection();
			cir1.left = dimension.left;
			cir1.top = dimension.top;
			cir1.radius = dimension.radius;
			cir1.radius1 = dimension.radius1;
			cir1.color = 'white';
			cir1.endColor = 'white';
			cir1.fillStyle = "linear";
			cir1.borderStyle = "none";
			cir1.startAngle = offset;
			cir1.endAngle = offset + a;

			if ((only != null && only == n) || only == null)
				cir1.draw(canvasId);
		}

		var cir = new CircleSection();
		cir.left = dimension.left + cx;
		cir.top = dimension.top + cy;
		cir.radius = dimension.radius;
		cir.radius1 = dimension.radius1;
		cir.startAngle = offset;
		cir.endAngle = offset + a;

		if (this.style == 'flat') {
			cir.color = color;
			cir.fillStyle = 'solid';
		} else {
			if (this.type == 'pie') {
				cir.color = 'white';
				cir.fillStyle = 'linear';
			} else {
				cir.color = entoneColor(color, 2);
				cir.fillStyle = 'cilinder';
			}
		}

		cir.endColor = color;
		cir.borderStyle = 'solid';
		cir.borderColor = 'grey';
		cir.borderWidth = 1;
		if (this.pizza) {
			if (this.pizzaStyle == "one") {
				if (n == 0)
					cir.shadow = new Shadow( {
						offsetX : 0,
						offsetY : 0,
						blur : 20
					});
				count++;
			} else
				cir.shadow = new Shadow( {
					offsetX : 2,
					offsetY : 2,
					blur : 7
				});
		}

		var alpha = 1;

		if ((only != null && only == n) || only == null) {
			if (only != null && only == n) {
				cir.borderWidth = 1;
				cir.shadow = new Shadow( {
					blur : 15
				});
				cir.borderColor = '#DADADA';
				alpha = 1;
			}
			cir.draw(canvasId, alpha);
		}

		val.color = color;
		var angle = cir.startAngle + (cir.endAngle - cir.startAngle) / 2;
		var ang = toRadian(angle);
		var x, y;
		if (this.type == 'pie') {
			x = dimension.left + dimension.radius * 2 / 3 * Math.cos(ang);
			y = dimension.top + dimension.radius * 2 / 3 * Math.sin(ang);
		} else {
			x = dimension.left
					+ (dimension.radius1 + (dimension.radius - dimension.radius1) / 2)
					* Math.cos(ang);
			y = dimension.top
					+ (dimension.radius1 + (dimension.radius - dimension.radius1) / 2)
					* Math.sin(ang);
		}
		return {
			x : x,
			y : y,
			angle : angle,
			value : a
		};

	};

	this.drawSeries = function(canvasId, dimension) {

		var arrLabel = new Array();
		var offset = dimension.offset;

		for ( var n = 0; n < this.labelsLength(); n++) {
			var result = this.drawValue(canvasId, dimension, n, offset);

			if (result.angle > 10)
				arrLabel[n] = {
					num : n,
					x : result.x,
					y : result.y
				};

			offset += result.value;
		}
		return arrLabel;

	};

	this.highlight = function(canvasId, serieNum , seriePos) {
		var dimension = this.getDimension();
		var arrLabel = new Array();
		var offset = dimension.offset;
		
		for ( var n = 0; n < this.labelsLength(); n++) {
			var result = this.drawValue(canvasId, dimension, n, offset, seriePos);

			//if (result.angle > 10)
				arrLabel[n] = {
					num : n,
					x : result.x,
					y : result.y
				};

			offset += result.value;
		}

		if (this.showTooltip) {
			var dl = this.getLabelDimension(canvasId, arrLabel, seriePos);
			this.tooltip = doTooltip(this.uid, dl, this.mouseX, this.mouseY);
			this.drawLabels(this.tooltip.bodyId, arrLabel, seriePos);
		}
		return arrLabel;

	};

	this.getSection = function(canvasId, dimension, n, offset) {
		var values = this.getSerie(0);
		var val = values.get(n);
		var cx = 0, cy = 0, count = 0;
		var sum = values.sum();
		var a = Math.floor(val.value * 360 / sum);

		if (this.pizza) {
			var crad = 5;
			if (this.pizzaStyle == "one")
				crad = 15;

			var rad = toRadian(offset + a / 2);
			cx = crad * Math.cos(rad);
			cy = crad * Math.sin(rad);

			if (this.pizzaStyle == "one" && n > 0) {
				cx = 0;
				cy = 0;
			}
		}

		var cir = new CircleSection();
		cir.left = dimension.left + cx;
		cir.top = dimension.top + cy;
		cir.radius = dimension.radius;
		cir.radius1 = dimension.radius1;
		cir.startAngle = offset;
		cir.endAngle = offset + a;
		cir.getSection(canvasId);

		var angle = cir.startAngle + (cir.endAngle - cir.startAngle) / 2;
		var ang = toRadian(angle);
		var x, y;
		if (this.type == 'pie') {
			x = dimension.left + dimension.radius * 2 / 3 * Math.cos(ang);
			y = dimension.top + dimension.radius * 2 / 3 * Math.sin(ang);
		} else {
			x = dimension.left
					+ (dimension.radius1 + (dimension.radius - dimension.radius1) / 2)
					* Math.cos(ang);
			y = dimension.top
					+ (dimension.radius1 + (dimension.radius - dimension.radius1) / 2)
					* Math.sin(ang);
		}
		return {
			x : x,
			y : y,
			angle : angle,
			value : a
		};

	};

	this.isPointInPath = function(canvasId, x, y) {

		var dimension = this.getDimension();
		var arrLabel = new Array();
		var offset = dimension.offset;

		var ret = null;
		for ( var n = 0; n < this.labelsLength(); n++) {
			var ctx = getContext(canvasId);
			ctx.save();
			var result = this.getSection(canvasId, dimension, n, offset);
			var b = ctx.isPointInPath(x, y);
			
			if (b) 
				ret = {serie:0,position:n,serieNum:0,seriePos:n};
			

			offset += result.value;
		}
		return ret;

	};
	
	this.isSerieIn = function(points){
		var dim=this.getDimension();
		var limits=getLimits(points);
		
		var minPos;
		var maxPos;
		
		var dimension = this.getDimension();
		var arrLabel = new Array();
		var offset = dimension.offset;

		var ret = null;
		var array=new Array();
		var label=new Array();
		var count=0;
		for ( var n = 0; n < this.labelsLength(); n++) {
			var ctx = getContext(this.canvasId);
			ctx.save();
			ctx.beginPath();
			var result = this.getSection(this.canvasId, dimension, n, offset);
			ctx.closePath();
			var b = ctx.isPointInPath(limits.minX, limits.minY) ||
					ctx.isPointInPath(limits.minX, limits.maxY) ||
					ctx.isPointInPath(limits.maxX, limits.minY) ||
					ctx.isPointInPath(limits.maxX, limits.maxY);
			if(!b || b==false){
				for(var ac=limits.minX;ac<=limits.maxX;ac++){
					for(var bc=limits.minY;bc<=limits.maxY;bc++){
						b=ctx.isPointInPath(ac, bc);
						if(b && b==true) break;
					}
					if(b==true) break;
				}
			}
			
			ctx.restore();
			if (b && b==true){ 
				ret = {serie:0,position:n,serieNum:0,seriePos:n};
				array[count]=ret;
				label[count] = n;
				count++;
			}

			offset += result.value;
		}
		if(array.length>0)
			return {labels: label, series:array};
		
	};
	
	
	this.draw = function(canvasId) {
		this.canvasId = canvasId;

		if (!this.palette)
			this.palette = this.randomPalette(this.getSerie(0).length());

		var dimension = this.getDimension();
		var arrLabels;

		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();

		if (this.animate) {
			var obj = this;
			if (this.animateType == 'radial') {
				var inc = dimension.radius / 20;
				var dim = this.getDimension();

				dim.radius = (dimension.radius1 == 0 ? inc : dimension.radius1);

				var id = setInterval(function() {
					
					if (!obj.regionManager)
						obj.regionManager = document.getElementById(canvasId)
								.getRegionManager();
					
					if (obj.regionManager)
						obj.regionManager.set(obj);
					
					var canvas=document.getElementById(canvasId);
					canvas.startAnimationInProgress(obj);
					
					arrLabels = obj.drawSeries(canvasId, dim);

					if (dimension.radius <= dim.radius) {
						clearInterval(id);

						obj.drawBackGround(canvasId, dim);
						arrLabels = obj.drawSeries(canvasId, dim);

						//this.hideTooltip();
						canvas.updateImage();
						canvas.stopAnimationInProgress(obj);
						
						if (obj.posfunction) {
							obj.posfunction();
						}
					} 

					dim.radius += inc;

				}, 15);
			} else {
				var dim = this.getDimension();
				var offset = dimension.offset;
				var counter = 0, max = this.labelsLength() - 1;

				arrLabels = new Array();
				var id = setInterval(function() {

					if (!obj.regionManager)
						obj.regionManager = document.getElementById(canvasId)
								.getRegionManager();
					
					if (obj.regionManager)
						obj.regionManager.set(obj);
					
					var canvas=document.getElementById(canvasId);
					canvas.startAnimationInProgress(obj);
					
					var result = obj.drawValue(canvasId, dimension, counter,
							offset);

					offset += result.value;

					if (counter >= max) {
						clearInterval(id);
						obj.drawBackGround(canvasId, dim);
						arrLabels = obj.drawSeries(canvasId, dim);
//						if (obj.showValues == true) {
//							obj.drawLabels(canvasId, arrLabels);
//						}

						canvas.updateImage();
						canvas.stopAnimationInProgress(obj);
						
						if (obj.posfunction) {
							obj.posfunction();
						}
					}
					counter++;

				}, 50);
			}
		} else {
			this.drawBackGround(canvasId, dimension);
			arrLabels = this.drawSeries(canvasId, dimension);
			if (this.showValues == true)
				this.drawLabels(canvasId, arrLabels);

//			if (!this.regionManager)
//				this.regionManager = document.getElementById(canvasId)
//						.getRegionManager();
			
			if (this.regionManager)
				this.regionManager.set(this);

			//this.hideTooltip();
			document.getElementById(canvasId).updateImage();
			
			if (this.posfunction) {
				this.posfunction();
			}

		}

	};

	this.clone = function(){
		var canvas=document.getElementById(this.canvasId);
		var uid=canvas.getUid();
		
		var np=new Pie();
		cloneProperties(this,np,['left','top','width','height',
		                         'pizza','pizzaStyle','animate','animateType',
		                         'style','palette','showTooltip','type']);
		
		setSeriesFromSelection(this,np,arguments[0]);
		
		np.setValueStyle(this.labels.valueStyle);
		return np;
	};

}

Pie.prototype = new MultiDimensionGraph();

function Ring() {
	this.type = 'ring';
	this.init();
}

Ring.prototype = new Pie();