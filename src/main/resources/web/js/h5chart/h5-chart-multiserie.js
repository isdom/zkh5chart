/*******************************************************************************
 * File: h5-chart-multiserie.js 
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

function Axis() {
	this.autoScale;
	this.min;
	this.max;
	this.init();
}

Axis.prototype = new GenericSerie();

function MultiSerieGraph() {

	this.gridStyle = {
		color : 'grey',
		style : 'dotted',
		vertical : true,
		horizontal : true
	}

	this.yAxis;
	this.xAxis;
	this.series;

	this.init = function() {
		this.yAxis = new Array();
		this.xAxis = new Axis();
		this.series = new ArrayList();
		this.series.init();
		this.xAxis.init();
	};
	
	this.init();
	
	this.addYAxis = function() {
		var n = this.yAxis.length;
		this.yAxis[n] = new Axis();
		addProperties(this.yAxis, arguments[0]);
	};

	this.getYAxesLength = function() {
		return this.yAxis.length;
	};

	this.getYAxis = function(index) {
		return this.yAxis[index];
	};

	this.setXAxis = function() {
		addProperties(this.xAxis, arguments[0]);
	};

	this.setSerie = function() {
		var s = new Serie();
		s.init();
		this.series.add(s);
		addProperties(s, arguments[0]);
	};

	this.getSerie = function(index) {
		return this.series.get(index);
	};

	this.seriesLength = function() {
		return this.series.length();
	};

	this.setXAxisStyle = function() {
		this.xAxis.valueStyle = new Style();
		this.xAxis.valueStyle.set(arguments[0]);
	};

	this.setYAxisStyle = function(index, style) {
		yAx = this.getYAxis(index);
		yAx.valueStyle = new Style();
		yAx.valueStyle.set(arguments[0]);
	};

}

MultiSerieGraph.prototype = new h5Chart();

function MultiSerieOrthogonalGraph() {

	this.orientation = 'yx';

	this.getDimension = function() {
		var ix=this.xAxis.length();
		//Calcular cuales son los intervalos en funcion del automatico;
		var iy=10;
		
		return {left:this.left,top:this.top,width:this.width,height:this.height,intervalX: ix,intervalY:iy};
	};

	this.drawLabels = function(canvasId, arrLabel) {

	};

	this.drawRules = function(canvasId, dimension) {
		
//		var xRule = new Rule();
//		var yRule = new Rule();
//		var yRule1 = new Rule();
//				
//		
//		var y0=this.getYAxis(0);
//		var y1=this.getYAxis(1);
//		
//		if(this.orientation=='yx'){
//			
//			yRule = new Rule(dimension.left, dimension.top + dimension.height
//					, dimension.width, dimension.intervalY, 'horizontal', true,
//							Style, this.min, this.max, 'hanging');
//			} else {
//				rule = new Rule(dimension.left + dimension.width + 6,
//						dimension.top, dimension.height, this.intervals,
//						'vertical', true, this.labelStyle, this.min, this.max,
//						'hanging');
//			}
//
//			rule.tickOrientation = "under";
//			rule.tickMode = "med";
//			rule.color = "grey";
//			rule.borderColor = "grey";
//			rule.draw(canvasId);	
//			
//		} else {
//			
//		}
	};

	this.drawBackGround = function(canvasId, dimension) {

		if(!this.gridStyle.vertical && !this.gridStyle.vertical)
			return;
		
		var r,offsetLeft,offsetRight,offsetTop,offsetBottom;
		
		var grd='both';
		if(this.gridStyle.vertical && !this.gridStyle.vertical) grd='v-grid';
		if(!this.gridStyle.vertical && this.gridStyle.vertical) grd='h-grid';
				
		if (this.orientation = 'yx') {
			offsetLeft = 0; // letras del ejeY
			offsetRight = 0; // letras segundo ejeY
			offsetBottom=0; // letras ejeX
			offsetTop=0;
		} else {
			offsetLeft = 0; // letras del ejeY
			offsetRight = 0; // letras segundo ejeY
			offsetBottom=0; // letras ejeX
			offsetTop=0;
		}

		r = new Grid(dimension.left + offsetLeft, dimension.top,
				dimension.width - offsetLeft - offsetRight,
				dimension.height - offsetBottom - offsetTop, dimension.intervalX, dimension.intervalY, 'rect', grd );

		r.borderStyle = this.gridStyle.style;
		r.borderColor = this.gridStyle.color;
		r.draw(canvasId);

	};

	this.drawValue = function(canvasId, dimension, n, offset) {

	};

	this.drawSeries = function(canvasId, dimension) {

	};

	this.draw = function(canvasId) {

//		if (!this.palette)
//			this.palette = this.randomPalette(this.getSerie(0).length());
		var dimension=this.getDimension();
		this.drawBackGround(canvasId, dimension);
		
	};

}

MultiSerieOrthogonalGraph.prototype = new MultiSerieGraph();

function MultiSerieRadialGraph() {

	this.getDimension = function() {

	};

	this.drawLabels = function(canvasId, arrLabel) {

	};

	this.drawRules = function(canvasId, dimension) {
//		var rule = new Rule();
//		if (this.orientation == 'horizontal') {
//			rule = new Rule(dimension.left, dimension.top + dimension.height
//					+ 6, dimension.width, this.intervals, 'horizontal', true,
//					this.labelStyle, this.min, this.max, 'hanging');
//		} else {
//			rule = new Rule(dimension.left + dimension.width + 6,
//					dimension.top, dimension.height, this.intervals,
//					'vertical', true, this.labelStyle, this.min, this.max,
//					'hanging');
//		}
//
//		rule.tickOrientation = "under";
//		rule.tickMode = "med";
//		rule.color = "grey";
//		rule.borderColor = "grey";
//		rule.draw(canvasId);
	};

	this.drawBackGround = function(canvasId, dimension) {

	};

	this.drawValue = function(canvasId, dimension, n, offset) {

	};

	this.drawSeries = function(canvasId, dimension) {

	};

	this.draw = function(canvasId) {

		if (!this.palette)
			this.palette = this.randomPalette(this.getSerie(0).length());
	};

}

MultiSerieRadialGraph.prototype = new MultiSerieGraph();
