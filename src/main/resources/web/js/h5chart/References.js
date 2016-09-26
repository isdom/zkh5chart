/*******************************************************************************
 * File: References.js 
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

zk.$package('References');

h5chart.References = zk.$extends(zk.Widget, {
		
	_order:'rows',
	_shadow: 'true',
	_background: 'true',
	_backgroundColor: '#FFFAC9',
	_borderColor: 'grey',
	
	_serie: null,
	
	_tooltipFont: '11px Arial',
	_tooltipColor: 'grey',
	_tooltipMask: "function (val){ return val}",
	_currentFont: '11px Arial',
	_currentColor: 'grey',
	_currentMask: "function (val){ return val}",	
	_labelFont: '11px Arial',
	_labelColor: 'grey',
	_labelMask: "function (val){ return val}",
	
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	isShadow : function() {
		return this._shadow;
	},
	
	setShadow : function(value) {
		this._shadow = value;
	},
	
	isBackground : function() {
		return this._background;
	},
	
	setBackground : function(value) {
		this._background = value;
	},
	
	getOrder : function() {
		return this._order;
	},

	setOrder : function(value){
		this._order = value;
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
		
	getSerie: function(){
		return this._serie;
	},
	
	setSerie: function(value){
		eval("this._serie="+value+";");
	},
	
	getBackgroundColor: function(){
		return this._backgroundColor;
	},
	
	setBackgroundColor: function(value){
		this._backgroundColor=value;
	},
	
	getBorderColor: function(){
		return this._borderColor;
	},
	
	setBorderColor: function(value){
		this._borderColor=value;
	},
	
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var l=new References();
		var left=parseInt(this.getLeft())+5;
		var top=parseInt(this.getTop())+5
		var w=parseInt(this.getWidth())-15;
		//var h=parseInt(this.getHeight())-15;
		
		var bg = false;
		if(this.isBackground()=='true')
			bg=true;
		
		var shV = false;
		if(this.isShadow()=='true')
			shV=true;
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		l.set( { 
			left : 			left ,
			top  :			top ,
			width: 			w ,
			order: 			this.getOrder(),
			background: 	bg,
			backgroundColor:this.getBackgroundColor(),
			borderColor: 	this.getBorderColor(),
			shadow: 		shV,
			uid: 			this._backId
		});
		
		var r=this.getSerie();
		if(r.length>0){
			for(var n=0;n<r.length;n++){
				l.serie.add(r[n]);
			}
		} else {
			l.serie.add({label:'',color:'grey'});
		}
				
		eval("var labelmask="+this._labelMask);
		l.setLabelStyle({
			mask : 			labelmask ,
			font : 			this.getLabelFont(),
			color: 			this.getLabelColor()
		});

		
		var dim=l.getDimension(parentId);
		var h=dim.height;
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left-5), Math.max(0,top-5), w+15, h+15);
		this._backImgTop=Math.max(0,top-5);
		this._backImgLeft=Math.max(0,left-5);
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
