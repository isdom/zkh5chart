/*******************************************************************************
 * File: Axis.js 
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

zk.$package('Axis');

h5chart.Axis = zk.$extends(zk.Widget, {
	
	_lineWidth: 2,
	_labelsWidth: 0,
	_labelsAngle: 0,
	_labelsOnTick: 'false',
	_shadow: 'true',
	_tickPosition: 'under',
	_orientation: 'horizontal',
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
	
	getLineWidth : function() {
		return this._lineWidth;
	},
	
	setLineWidth : function(value) {
		this._lineWidth = value;
	},
	
	getLabelsWidth : function() {
		return this._labelsWidth;
	},
	
	setLabelsWidth : function(value) {
		this._labelsWidth = value;
	},
	
	getLabelsAngle : function() {
		return this._labelsAngle;
	},
	
	setLabelsAngle : function(value) {
		this._labelsAngle = value;
	},
	
	getLineWidth : function() {
		return this._lineWidth;
	},
	
	setLineWidth : function(value) {
		this._lineWidth = value;
	},
	
	isLabelsOnTick : function() {
		return this._labelsOnTick;
	},
	
	setLabelsOnTick : function(value) {
		this._labelsOnTick = value;
	},
	
	isShadow : function() {
		return this._shadow;
	},
	
	setShadow : function(value) {
		this._shadow = value;
	},
		
	getTickPosition : function() {
		return this._tickPosition;
	},
	
	setTickPosition : function(value) {
		this._tickPosition = value;
	},
	
	getOrientation : function() {
		return this._orientation;
	},
	
	setOrientation : function(value) {
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
		
	getSerie: function(){
		return this._serie;
	},
	
	setSerie: function(value){
		eval("this._serie="+value+";");
	},
	
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var left=parseInt(this.getLeft());
		var top=parseInt(this.getTop());
		var w=parseInt(this.getWidth());
		var h=parseInt(this.getHeight());
		
		var ani = false;
		if(this.isAnimate()=='true')
			ani=true;
		
		var shadow = false;
		if(this.isShadow()=='true')
			shadow=true;
		
		var lot = false;
		if(this.isLabelsOnTick()=='true')
			lot=true;
			
		var l=new Axis();
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
				
		l.set( {
			left : 			left,
			top  : 			top,
			width: 			w,
			height: 		h,
			orientation:	this.getOrientation(),
			lineWidth:		this.getLineWidth(),
			tickPosition:	this.getTickPosition(),
			labelsOnTick:	lot,
			labelsWidth:	this.getLabelsWidth(),
			labelsAngle:	this.getLabelsAngle(),
			uid:			this._backId,
			shadow:			shadow
		});
		
		var r=this.getSerie();
		if(r.length>0){
			for(var n=0;n<r.length;n++){
				l.serie.add({value: r[n]});
			}
		} else {
			l.serie.add({value:' '});
		}
		
		l.setLabelStyle({
			font : 			this.getLabelFont(),
			color: 			this.getLabelColor()
		});
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, left, top, w+6, h+6);
		this._backImgTop=top;
		this._backImgLeft=left;
		this._backImgWidth=w+6;
		this._backImgHeight=h+6;
		
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
