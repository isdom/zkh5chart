/*******************************************************************************
 * File: h5-chart-map.js 
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
 * @returns {Map}
 */
function Map() {

	this.points = null;

	this.fillStyle = 'none';
	
	this.borderStyle = 'none';
	
	this.borderColor = 'grey';
	
	this.borderWidth = 2;

	this.alpha=1;
	
	this.canvasId;

	this.value="";
	
	this.initMap = function(){
		this.points=new ArrayList();
		this.points.init();
		this.init();
	};

	this.initMap();

	this.addPointObject = function (point){
		this.points.add(point);
	};
	
	this.addPoint = function(x,y){
		this.points.add(new Point(x,y));
	};
	
	this.removePoint = function(index){
		this.points.remove(index);
	};
	
	this.setLabel=function(label){
		this.setLabels({values : [label]});
	};
	
	this.setValue=function(value){
		this.value=value;
	};
	
	this.getValue=function(){
		return this.value;
	};
	
	this.getDimension = function() {
		var left = this.left;
		var top = this.top;
		
		var pts=new Array();
        for(var n=0;n<this.points.length();n++)
            pts[n]=new Point(this.points.get(n).x,this.points.get(n).y);
        pts[n]=pts[0];
        
		var limits = getLimits(pts);
		var width = limits.maxX - limits.minX;
		var height = limits.maxY - limits.minY;

		return {
			left : left,
			top : top,
			width : width,
			height : height,
			minX: limits.minX,
			minY: limits.minY
		};
	};
	
	this.highlight = function(canvasId, serieNum, seriePos) {
		var dimension = this.getDimension();
		if(this.fillStyle!='none'){
			this.draw(canvasId, true);
			
		}		
		if (this.showTooltip) {
			var dl = this.getLabelDimension(canvasId, dimension, serieNum,
					seriePos);
			this.tooltip = doTooltip(this.uid, dl, this.mouseX, this.mouseY);
			this.drawLabel(this.tooltip.bodyId, dimension, serieNum, seriePos);
		}
	};

	this.getPoints = function(){
		var pts=new Array();
		var dim=this.getDimension();
		for(var n=0;n<this.points.length();n++)
			pts[n]=new Point(this.points.get(n).x+dim.left,this.points.get(n).y+dim.top);
		pts[n]=pts[0];
		return pts;
	};
	
	this.getSection = function(canvasId) {

		var ctx = getContext(canvasId);
		polyPath(ctx, this.getPoints());

	};

	this.draw = function(canvasId, highlight) {
		this.canvasId = canvasId;
		var area = new Area();
		var dim=this.getDimension();
		area.points = this.getPoints();
		area.width=dim.width;
		area.height=dim.height;
		area.top=dim.top+dim.minY;
		area.left=dim.left+dim.minX;
//		console.log(dim.minY);
//		console.log(dim.width +","+dim.height);
		if (this.fillStyle == 'solid') {
			area.color = this.color;
			area.fillStyle = 'solid';
		} else if(this.fillStyle!='none'){
			area.color = this.color;
			if(this.endColor)
				area.endColor = this.endColor;
			else
				area.endColor='white';
			area.fillStyle = this.fillStyle;
		}
		
		if(this.borderStyle!='none'){
			area.borderStyle = 'solid';
			area.borderColor = this.borderColor;
			area.borderWidth = this.borderWidth;
//			area.shadow = new Shadow( {
//				offsetX : 2,
//				offsetY : 2,
//				blur : 7
//			});
		}
		var alpha = 1;

		if(highlight==true){
			area.shadow = new Shadow( {
					blur : 15
				});
				area.borderColor = '#DADADA';
				alpha = this.alpha;
		} else 
			area.shadow= null; 
			
		
		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();

		if(this.regionManager)
			this.regionManager.set(this);
		
		var canvas=document.getElementById(canvasId);
		canvas.startAnimationInProgress(this);
		
		if(this.fillStyle!='none' || this.borderStyle!='none')
			area.draw(canvasId, alpha);

		//console.log(highlight);
		if(!highlight || highlight==false)
			if(this.fillStyle!='none' || this.borderStyle!='none')
				document.getElementById(canvasId).updateImage();

		canvas.stopAnimationInProgress(this);
		
	};

	this.isPointInPath = function(canvasId, x, y) {

		var dimension = this.getDimension();
		var ret = null;

		var ctx = getContext(canvasId);
		ctx.save();
		ctx.beginPath();
		this.getSection(canvasId);
		ctx.closePath();
		
		var b = ctx.isPointInPath(x, y);
		ctx.restore();

		if (b)
			ret = {
				serieNum : 0,
				seriePos : 0
			};
		
		return ret;
	};
	
	this.getLabelDimension = function(canvasId, dim, serieNum, seriePos) {

		var val = this.value;
		val = this.tooltipStyle.mask(val);

		var labl = this.labels.get(seriePos).value;
		var tit = "";
		
		var ctx = getContext(canvasId);

		var obj = this.labels;
		ctx.font = this.tooltipStyle.font;
		var fs = this.tooltipStyle.fontSize();

		var tw = Math.max(ctx.measureText(tit).width, Math.max(ctx
				.measureText(val).width, ctx.measureText(labl).width));

		var m = 2;
		if (tit != "")
			m = 3;
		var th = m * fs;

		return {
			width : tw + 12,
			height : th + 6
		};

	};
	
	this.drawLabel = function(canvasId, dimension, serieNum, seriePos) {

		
		var val = this.value;
		if (this.tooltipStyle)
			val = this.tooltipStyle.mask(this.value);

		var labl = this.labels.get(seriePos).value;
		var tit = "";
		
		var ctx = getContext(canvasId);

		var obj = this.labels;
		ctx.font = this.tooltipStyle.font;
		var fs = this.tooltipStyle.fontSize();

		var tw = Math.max(ctx.measureText(tit).width, Math.max(ctx
				.measureText(val).width, ctx.measureText(labl).width));

		var x, y, h;

		var m = 2;
		if (tit != "")
			m = 3;

		var th = m * fs;
		var y = 3 + fs;

		fillRoundRect(ctx, 1, 1, tw + 12, th + 6, 5, "#FFFAC9", new Shadow({
			offsetX : 2,
			offsetY : 2,
			blur : 7
		}));
		drawRoundRect(ctx, 1, 1, tw + 12, th + 6, 5, 1, "grey");

		var n = 0;

		drawText(canvasId, 5, y + n * fs, labl, 0, this.tooltipStyle.color,
				this.tooltipStyle.font, "left");

		n++;

		if (tit != "") {
			drawText(canvasId, 5, y + n * fs, tit, 0, this.tooltipStyle.color,
					this.tooltipStyle.font, "left");
			n++;
		}

		drawText(canvasId, 5, y + n * fs, val, 0, this.tooltipStyle.color,
				this.tooltipStyle.font, "left");

	};

}

Map.prototype = new MultiDimensionGraph();