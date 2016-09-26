/*******************************************************************************
 * File: Map.js 
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

zk.$package('Map');

h5chart.Map = zk.$extends(zk.Widget, {
	_showTooltip: 'true',
	_shadow: 'true',
	_tooltipFont: '11px Arial',
	_tooltipColor: 'grey',
	_tooltipMask: "function (val){ return val}",
	_borderWidth: 2,
	_borderColor: "",
	_borderStyle: "solid",
	_fillStyle: "solid",
	_alpha: 1,
	_label: "",
	_value: "",
	_color: "white",
	_endColor: null,
	_points: null,
	
	_animate: 'false',
	
	_ranges: new Array(),
	
	_labelFont: '11px Arial',
	_labelColor: 'grey',
	
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	isShowTooltip : function() {
		return this._showTooltip;
	},

	setShowTooltip : function(value){
		this._showTooltip = value;
	},
	
	getColor : function() {
		return this._color;
	},
	
	setColor : function(value) {
		this._color = value;
	},
	
	getEndColor : function() {
		return this._endColor;
	},
	
	setEndColor : function(value) {
		this._endColor = value;
	},
	
	getValue : function() {
		return this._value;
	},
	
	setValue : function(value) {
		this._value = value;
	},
	
	getLabel : function() {
		return this._label;
	},
	
	setLabel : function(value) {
		this._label = value;
	},
	
	getAlpha : function() {
		return this._alpha;
	},
	
	setAlpha : function(value) {
		this._alpha = value;
	},
	
	getFillStyle : function() {
		return this._fillStyle;
	},
	
	setFillStyle : function(value) {
		this._fillStyle = value;
	},
	
	getBorderStyle : function() {
		return this._borderStyle;
	},
	
	setBorderStyle : function(value) {
		this._borderStyle = value;
	},
	
	getBorderColor : function() {
		return this._borderColor;
	},
	
	setBorderColor : function(value) {
		this._borderColor = value;
	},

	getBorderWidth : function() {
		return this._borderWidth;
	},
	
	setBorderWidth : function(value) {
		this._borderWidth = value;
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
	
	getTooltipFont : function() {
		return this._tooltipFont;
	},
	
	setTooltipFont : function(value){
		this._tooltipFont = value;
	},
	
	getTooltipColor : function() {
		return this._tooltipColor;
	},
	
	setTooltipColor : function(value){
		this._tooltipColor = value;
	},
	
	getTooltipMask : function() {
		return this._tooltipMask;
	},
	
	setTooltipMask : function(value){
		this._tooltipMask = value;
	},
		
	isAnimate : function() {
		return this._animate;
	},
	
	setAnimate : function(value) {
		this._animate = value;
	},
		
	getPoints: function(){
		return this._points;
	},
	
	setPoints: function(value){
		eval("this._points="+value+";");
	},
	
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var left=parseInt(this.getLeft());
		var top=parseInt(this.getTop());

		
		var ani = false;
		if(this.isAnimate()=='true')
			ani=true;
			
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		var l=new Map();
		
		var sht = false;
		if(this.isShowTooltip()=='true')
			sht=true;
		
		l.set( {
			left : 			left,
			top  : 			top,
			borderStyle:	this.getBorderStyle(),
			borderColor:	this.getBorderColor(),
			borderWidth:	this.getBorderWidth(),
			fillStyle:		this.getFillStyle(),
			alpha:			this.getAlpha(),
			regionManager:  this.parent._rm,
			color:			this.getColor(),
			endColor:		this.getEndColor(),
			uid:			this._backId,
			showTooltip:	sht
		});
		
		l.setLabel(this.getLabel());
		l.setValue(this.getValue());
		
		var r=this.getPoints();
		if(r.length>0){
			for(var n=0;n<r.length;n++){
				l.addPointObject(r[n]);
			}
		} 
		
		eval("var tooltipmask="+this._tooltipMask);
		l.setTooltipStyle({
			mask : 			tooltipmask ,
			font : 			this.getTooltipFont(),
			color: 			this.getTooltipColor()
		});
		
		l.setValueStyle({
			font : 			this.getTooltipFont(),
			color: 			this.getTooltipColor(),
			mask: 			tooltipmask
		});
		
		
		var lim=getLimits(this.getPoints());
		var w=lim.maxX-lim.minX;
		var h=lim.maxY-lim.minY;
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, left, top, lim.maxX+6, lim.maxY+6);
		this._backImgTop=top;
		this._backImgLeft=left;
		this._backImgWidth=lim.maxX+6;
		this._backImgHeight=lim.maxY+6;
		
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
