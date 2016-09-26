/*******************************************************************************
 * File: Funnel.js 
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

zk.$package('Funnel');

h5chart.Funnel = zk.$extends(zk.Widget, {
	
	_showTooltip: 'true',
	_shadow: 'true',
	_tooltipFont: '11px Arial',
	_tooltipColor: 'grey',
	_tooltipMask: "function (val){ return val}",
	_currentFont: '11px Arial',
	_currentColor: 'grey',
	_currentMask: "function (val){ return val}",	
	_labelFont: '11px Arial',
	_labelColor: 'grey',
	_labelMask: "function (val){ return val}",
		
	_orientation: 'up',
	_distribution: 'height',
	_labelsMode: 'none',
	_animate: 'false',
	_showValues: 'true',
	_palette: null,
	_serie: null,
	_labels: null,
			
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	setOrientation : function(value) {
		this._orientation = value;
	},

	getOrientation : function(){
		return this._orientation;
	},
	
	setDistribution : function(value) {
		this._distribution = value;
	},

	getDistribution : function(){
		return this._distribution;
	},

	setLabelsMode : function(value) {
		this._labelsMode = value;
	},

	getLabelsMode : function(){
		return this._labelsMode;
	},
	
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
		
	isAnimate : function() {
		return this._animate;
	},
	
	setAnimate : function(value) {
		this._animate = value;
	},
		
	getSerie: function(){
		return this._serie;
	},
	
	setSerie: function(value){
		eval("this._serie="+value+";");
	},
	
	getLabels: function(){
		return this._labels;
	},
	
	setLabels: function(value){
		eval("this._labels="+value+";");
	},
	
	isShowTooltip : function() {
		return this._showTooltip;
	},

	setShowTooltip : function(value){
		this._showTooltip = value;
	},

	isShadow : function() {
		return this._shadow;
	},

	setShadow : function(value){
		this._shadow = value;
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

	getCurrentFont : function() {
		return this._currentFont;
	},
	
	setCurrentFont : function(value){
		this._currentFont = value;
	},
	
	getCurrentColor : function() {
		return this._currentColor;
	},
	
	setCurrentColor : function(value){
		this._currentColor = value;
	},
	
	getCurrentMask : function() {
		return this._currentMask;
	},
	
	setCurrentMask : function(value){
		this._currentMask = value;
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
	
	getLabelMask : function() {
		return this._labelMask;
	},
	
	setLabelMask : function(value){
		this._labelMask = value;
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
	
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var l=new Funnel();
		var left=parseInt(this.getLeft())+5;
		var top=parseInt(this.getTop())+5;
		var w=parseInt(this.getWidth())-12;
		var h=parseInt(this.getHeight())-12;
		
		var ani = false;
		if(this.isAnimate()=='true')
			ani=true;
		
		var shV = false;
		if(this.isShowValues()=='true')
			shV=true;
		
		var pal;
		if(!this.getPalette() || this.getPalette()==null)
			pal=getPalette();
		else
			eval('pal='+this.getPalette());
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		var sh = false;
		if(this.isShadow()=='true')
			sh=true;
		
		var sht = false;
		if(this.isShowTooltip()=='true')
			sht=true;
		
		l.set( { 
			left : 			left ,
			top  :			top ,
			width: 			w ,
			height: 		h ,
			style:			'3D',
			orientation:	this.getOrientation(),
			labelsMode:		this.getLabelsMode(),
			showValues:		shV,
			regionManager:  this.parent._rm,
			palette:		pal,
			animate:		ani,
			uid:			this._backId,
			shadow:			sh,
			showTooltip:	sht
		});
		
		l.setLabels(this.getLabels());
		l.setSerie(this.getSerie());
		
		l.setValueStyle({
			font : 			this.getLabelFont(),
			color: 			this.getLabelColor()
		});
		
		eval("var tooltipmask="+this._tooltipMask);
		l.setTooltipStyle({
			mask : 			tooltipmask ,
			font : 			this.getTooltipFont(),
			color: 			this.getTooltipColor()
		});

		eval("var labelmask="+this._labelMask);
		l.setSerieValueStyle(0,{
			mask : 			labelmask ,
			font : 			this.getLabelFont(),
			color: 			this.getLabelColor()
		});
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left-5), Math.max(0,top-5), w+12, h+12);
		this._backImgTop=Math.max(0,top-5);
		this._backImgLeft=Math.max(0,left-5);
		this._backImgWidth=w+12;
		this._backImgHeight=h+12;
		
		l.draw(parentId);

	},
	
	bind_: function (desktop, skipper, after) {
		this.$supers('bind_', arguments);				
		this.setPlot(true);
	}	
});
