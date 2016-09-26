/*******************************************************************************
 * File: Multigraph.js 
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

zk.$package('Multigraph');

h5chart.Multigraph = zk.$extends(zk.Widget, {
	
	_animate: 'false',
	_marks: 'false',
	_orientation: 'horizontal',
	_showValues: 'true',
	_showTooltip: 'true',
	_palette: null,
	_series: null,
	_labels: null,
	_grid: 'true',
	
	_labelFont: '11px Arial',
	_labelColor: 'grey',
	
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	setPalette : function(value) {
		this._palette = value;
	},
	
	getPalette : function(){
		return this._palette;
	},
	
	isShowValues : function() {
		return this._showValues;
	},
	
	setShowValues : function(value) {
		this._showValules = value;
	},
	
	isGrid : function() {
		return this._grid;
	},
	
	setGrid : function(value) {
		this._grid = value;
	},
	
	isMarks : function() {
		return this._marks;
	},
	
	setMarks : function(value) {
		this._marks = value;
	},
	
	isShowTooltip : function() {
		return this._showTooltip;
	},
	
	setShowTooltip : function(value) {
		this._showTooltip = value;
	},
	
	getOrientation : function() {
		return this._orientation;
	},

	setOrientation : function(value){
		this._orientation = value;
	},
	
	getLabelFont : function() {
		return this._labelFont;
	},

	setLabelFont : function(value){
		this._labelFont = value;
	},

	getLabelColor : function() {
		return this._labelColor;
	},

	setLabelColor : function(value){
		this._labelColor = value;
	},
		
	isAnimate : function() {
		return this._animate;
	},
	
	setAnimate : function(value) {
		this._animate = value;
	},
		
	getSeries: function(){
		return this._series;
	},
	
	setSeries: function(value){
		eval("this._series="+value+";");
	},
	
	getLabels: function(){
		return this._labels;
	},
	
	setLabels: function(value){
		eval("this._labels="+value+";");
	},
	
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var l=new Multigraph();
		var left=parseInt(this.getLeft())+10;
		var top=parseInt(this.getTop())+10;
		var w=parseInt(this.getWidth())-12;
		var h=parseInt(this.getHeight())-15;
		
		var ani = false;
		if(this.isAnimate()=='true')
			ani=true;
		
		var marks = false;
		if(this.isMarks()=='true')
			marks=true;
		
		var shV = false;
		if(this.isShowValues()=='true')
			shV=true;
		
		var shT = false;
		if(this.isShowTooltip()=='true')
			shT=true;
		
		var grd = false;
		if(this.isGrid()=='true')
			grd=true;
		
		var pal;
		if(!this.getPalette() || this.getPalette()==null)
			pal=getPalette();
		else
			eval('pal='+this.getPalette());
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		l.set( {
			left : 			left ,
			top  :			top ,
			width: 			w ,
			height: 		h ,
			style:			'3D',
			showValues:		shV,
			showTooltip:	shT,
			orientation: 	this.getOrientation(),
			palette:		getPalette(),
			regionManager:  this.parent._rm,
			palette:		pal,
			animate:		ani,
			marks:			marks,
			uid:			this._backId,
			grid:			grd
		});
		
		l.setLabels(this.getLabels());
		
		for(var ser=0;ser<this._series.length;ser++){
			l.setSerie(this._series[ser]);
			var sd=this._series[ser];
			l.setSerieTooltipStyle(ser, {font: sd.tooltipFont,color:sd.tooltipColor,mask:sd.tooltipMask});
		}
		
		l.setValueStyle({
			font : 			this.getLabelFont(),
			color: 			this.getLabelColor()
		});
		
		eval("var labelmask="+this._labelMask);
		l.setValueStyle( {
			font : this.getLabelFont(),
			color : this.getLabelColor()
		});
		
//		eval("var tooltipmask="+this._tooltipMask);
//		l.setTooltipStyle({
//			mask : 			tooltipmask ,
//			font : 			this.getTooltipFont(),
//			color: 			this.getTooltipColor()
//		});
		
//		l.setSerieValueStyle(0,{
//			mask : 			labelmask ,
//			font : 			this.getLabelFont(),
//			color: 			this.getLabelColor()
//		});
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left-10), Math.max(0,top-10), w+12, h+15);
		this._backImgTop=Math.max(0,top-10);
		this._backImgLeft=Math.max(0,left-10);
		this._backImgWidth=w+12;
		this._backImgHeight=h+15;
		
		l.draw(parentId);

	},
	
	detach: function() {
		var parentId=this.parent.uuid;
		this.$supers('detach', arguments);
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		document.getElementById(parentId).updateImage();
		var rm=document.getElementById(parentId).getRegionManager()
		if(rm){
			rm.removeById(this._backId);
		}
		this._backImg= null;
		
	} ,
	
	bind_: function (desktop, skipper, after) {
		this.$supers('bind_', arguments);				
		this.setPlot(true);
	}	
});
