/*******************************************************************************
 * File: h5-chart-piramid.js 
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
function Piramid() {

	this.canvasId;

	this.type = "triangle"; // piramid

	this.distribution = "area"; // height

	this.orientation = "up"; // down

	this.init();
	
	this.labelsMode = "none"; //"labels", "none";

	this.getDimension = function() {
		var left = this.left;
		var top = this.top;
		var width = this.width - 5;
		var height = this.height - 5;
		var angle1 = Math.atan(height / (width / 2));
		var angle2 = Math.PI - Math.atan(height / (width / 2));
		var angle3 = Math.atan(height / (width / 4));
		var left1 = width * 3 / 4;
		return {
			left : left + 5,
			top : top + 5,
			angle1 : angle1,
			angle2 : angle2,
			angle3 : angle3,
			width : width,
			height : height,
			left1 : left1
		};
	};

	this.distributionArea = function() {
		var dim = this.getDimension();
		var values = this.getSerie(0);
		var total = values.sum();

		var result = new ArrayList();
		result.init();
		var w = dim.width;
		var toth = 0;
		for ( var n = values.length() - 1; n >= 0; n--) {
			var area = values.get(n).value / total
					* (dim.width * dim.height / 2);
			var aux = 0;
			var h = 0;
			while (aux < area && h + toth <= dim.height) {
				aux = (w - (h / Math.tan(dim.angle1))) * h;
				h++;
			}
			h--;
			var offset = (h / Math.tan(dim.angle1));
			var base1 = w - 2 * offset;
			result.set(n, {
				height : h,
				base : w,
				base1 : base1,
				offsetX : offset,
				offsetY : toth
			});
			toth += h;
			w = base1;
		}

		return result;

	};

	this.distributionHeight = function() {
		var dim = this.getDimension();
		var values = this.getSerie(0);
		var total = values.sum();

		var result = new ArrayList();
		result.init();
		var w = dim.width;
		var toth = 0;
		for ( var n = values.length() - 1; n >= 0; n--) {
			var h = values.get(n).value / total * dim.height;
			var offset = (h / Math.tan(dim.angle1));
			var base1 = w - 2 * offset;
			if (base1 < 0)
				base1 = 0;
			result.set(n, {
				height : h,
				base : w,
				base1 : base1,
				offsetX : offset,
				offsetY : toth
			});
			toth += h;
			w = base1;
		}

		return result;
	};

	this.calcHeight = function() {

		if (this.distribution == 'area') {
			return this.distributionArea();
		} else {
			return this.distributionHeight();
		}

	};

	this.drawLabels = function(canvasId, offset,follow) {
		var dim=this.getDimension();
		
		var list = this.calcHeight();
		var values = this.getSerie(0);
		var ctx = getContext(canvasId);
		
		for ( var n = 0; n < this.labels.length(); n++) {
			var pir = list.get(n);
			var val = this.labels.valueStyle.mask(values.get(n).value);
			var labl = this.labels.get(n).value;

			ctx.font = this.labels.valueStyle.font;

			var fs = this.labels.valueStyle.fontSize();

			var tw = ctx.measureText(labl).width + ctx.measureText(" ").width
					+ ctx.measureText(val).width;
			var x,y,h;
			var th = 1.5 * fs;
			if(follow && follow==true)
				x = offset + pir.base1/2 + 15;
			else
				x = offset + 15;
			if (this.orientation == 'up') {
				y = dim.top + dim.height - pir.offsetY - pir.height/2;
			} else {
				y = dim.top + pir.offsetY + pir.height/2;
			}

			drawText(canvasId, x, y, labl + " : " + val, 0,
					this.labels.valueStyle.color, this.labels.valueStyle.font,
					"left");
		}
	};
	
	this.drawBackGround = function(canvasId, dimension) {

	};

	this.getPoints = function(dim, pir) {
		var left, top;
		if (this.orientation == 'up') {
			left = dim.left + (dim.width - pir.base) / 2;
			top = dim.top + dim.height - (pir.height + pir.offsetY);
			height = pir.height;
		} else {
			left = dim.left + (dim.width - pir.base) / 2;
			top = dim.top + pir.offsetY;
			height = pir.height;
		}

		var points = new Array();

		if (this.orientation == 'up') {
			points[0] = new Point(left, top + pir.height);
			points[1] = new Point(left + pir.offsetX, top);
			points[2] = new Point(left + pir.offsetX + pir.base1, top);
			points[3] = new Point(left + 2 * pir.offsetX + pir.base1, top
					+ pir.height);
			points[4] = new Point(left, top + pir.height);
		} else {
			points[0] = new Point(left, top);
			points[1] = new Point(left + pir.offsetX, top + pir.height);
			points[2] = new Point(left + pir.offsetX + pir.base1, top
					+ pir.height);
			points[3] = new Point(left + 2 * pir.offsetX + pir.base1, top);
			points[4] = new Point(left, top);
		}
		
		return points;
	};

	this.isSerieIn = function(points){
		var dim=this.getDimension();
		var limits=getLimits(points);
		
		var minPos;
		var maxPos;
		
		var dimension = this.getDimension();
		var arrLabel = new Array();
		
		var ret = null;
		var array=new Array();
		var label=new Array();
		var count=0;
		for ( var n = 0; n < this.labelsLength(); n++) {
			var ctx = getContext(this.canvasId);
			ctx.save();
			ctx.beginPath();
			var result = this.getSection(this.canvasId, dimension,0, n);
			
			var b = ctx.isPointInPath(limits.minX, limits.minY) ||
					ctx.isPointInPath(limits.minX, limits.maxY) ||
					ctx.isPointInPath(limits.maxX, limits.minY) ||
					ctx.isPointInPath(limits.maxX, limits.maxY);
			if(b==false){
				for(var ac=limits.minX;ac<=limits.maxX;ac++){
					for(var bc=limits.minY;bc<=limits.maxY;bc++){
						b=ctx.isPointInPath(ac, bc);
						if(b==true) break;
					}
					if(b==true) break;
				}
			}
			ctx.closePath();
			ctx.restore();
			
			if (b==true){ 
				ret = {serie:0,position:n,serieNum:0,seriePos:n};
				array[count]=ret;
				label[count] = n;
				count++;
			}
			
		}
		if(array.length>0)
			return {labels: label, series:array};
		
	};
	
	this.drawValue = function(canvasId, dim, n, only) {

		var list = this.calcHeight();
		var pir = list.get(n);
		var color = this.palette[n];
		var area = new Area();

		var points = new Array();
		if (this.orientation == 'up') {
			area.left = dim.left + (dim.width - pir.base) / 2;
			area.top = dim.top + dim.height - (pir.height + pir.offsetY);
			area.height = pir.height;
		} else {
			area.left = dim.left + (dim.width - pir.base) / 2;
			area.top = dim.top + pir.offsetY;
			area.height = pir.height;
		}

		area.points = this.getPoints(dim, pir);

		if (this.style == 'flat') {
			area.color = color;
			area.fillStyle = 'solid';
		} else {
			area.color = 'white';
			area.fillStyle = 'v-linear';
		}

		area.endColor = color;
		area.borderStyle = 'solid';
		area.borderColor = 'grey';
		area.borderWidth = 1;
		area.shadow = new Shadow( {
			offsetX : 2,
			offsetY : 2,
			blur : 7
		});

		var alpha = 1;

		if ((only != null && only == n) || only == null) {
			if (only != null && only == n) {
				area.borderWidth = 1;
				area.shadow = new Shadow( {
					blur : 15
				});
				area.borderColor = '#DADADA';
				alpha = 1;
			}
			area.draw(canvasId, alpha);
		}
	};

	this.drawSeries = function(canvasId, dimension) {
		for ( var n = 0; n < this.labelsLength(); n++) {
			this.drawValue(canvasId, dimension, n);
		}
	};
	
	this.highlight = function(canvasId, serieNum , seriePos) {
		var dimension = this.getDimension();
		this.drawValue(canvasId, dimension, seriePos, seriePos);
		if (this.showTooltip) {
			var dl = this.getLabelDimension(canvasId, dimension,serieNum, seriePos);
			this.tooltip = doTooltip(this.uid, dl, this.mouseX, this.mouseY);
			this.drawLabel(this.tooltip.bodyId, dimension, serieNum, seriePos);
		}
	};

	this.getSection = function(canvasId, dim, serieNum, seriePos ) {

		var list = this.calcHeight();
		var pir = list.get(seriePos);
		var left, top, height;

		var ctx = getContext(canvasId);
		polyPath(ctx, this.getPoints(dim, pir, left, top));

	};

	this.draw = function(canvasId) {
		this.canvasId = canvasId;

		if (!this.palette)
			this.palette = this.randomPalette(this.getSerie(0).length());

		var dimension = this.getDimension();

		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();

		if (this.animate) {
			
			var obj=this;
			var dimension=obj.getDimension();
			this.counter=this.labels.length()-1;
			
			var id=setInterval( function(){
				
				var canvas=document.getElementById(canvasId);
				canvas.startAnimationInProgress(obj);
				
				if(obj.labelsMode=="both" || obj.labelsMode=="none")
					obj.drawValue(canvasId, dimension, obj.counter);
				
				if(obj.labelsMode=="both" || obj.labelsMode=="labels")
					obj.drawLabels(canvasId, dimension.left + dimension.width,false);
				
				document.getElementById(canvasId).updateImage();
				
				obj.counter--;
								
				if(obj.counter<0){
					clearInterval(id);
									
					if(obj.regionManager)
						obj.regionManager.set(obj);

					obj.hideTooltip();
					document.getElementById(canvasId).updateImage();
					canvas.stopAnimationInProgress(obj);
					if(obj.posfunction){
						obj.posfunction();
					}
				}
			},80);
			
		} else {
			// this.drawBackGround(canvasId,dimension);

			if (this.regionManager){
				this.regionManager.set(this);
			}
			
			var canvas=document.getElementById(canvasId);
			canvas.startAnimationInProgress(this);
			
			if(this.labelsMode=="both" || this.labelsMode=="none")
				this.drawSeries(canvasId, dimension);

			// if(this.showValues==true)
			// this.drawLabels(canvasId,arrLabels);

			if(this.labelsMode=="both" || this.labelsMode=="labels")
				this.drawLabels(canvasId, dimension.left + dimension.width,false);
			

			this.hideTooltip();
			document.getElementById(canvasId).updateImage();
			canvas.stopAnimationInProgress(this);
			
			if (this.posfunction) {
				this.posfunction();
			}
			
		}
		
	};

	this.clone = function(){
		var canvas=document.getElementById(this.canvasId);
		var uid=canvas.getUid();
		
		var np=new Piramid();
		cloneProperties(this,np,['left','top','width','height','orientation','distribution','palette','style','showTooltip']);
		
		setSeriesFromSelection(this,np,arguments[0]);
		
		np.setValueStyle(this.labels.valueStyle);
		return np;
	};

}

Piramid.prototype = new MultiDimensionGraph();