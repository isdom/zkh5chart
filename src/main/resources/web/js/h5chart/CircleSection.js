/*******************************************************************************
 * File: CircleSection.js 
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

zk.$package('CircleSection');

h5chart.CircleSection = zk.$extends(zk.Widget, {
	_shadow: 'false',
	_radius: 0,
	_radius1: 0,
	_startAngle: 0,
	_endAngle: 10,
	
	_fillStyle: 'none',
	_endColor: 'white',
	_color: 'black',
	
	_borderStyle: 'none',
	_borderWidth: 1,
	_borderColor: 'black',
	
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	getRadius : function() {
		return this._radius;
	},

	setRadius : function(value){
		this._radius = value;
	},

	getRadius1 : function() {
		return this._radius1;
	},

	setRadius1 : function(value){
		this._radius1 = value;
	},
	
	getStartAngle : function() {
		return this._startAngle;
	},

	setStartAngle : function(value){
		this._startAngle = value;
	},

	getEndAngle : function() {
		return this._endAngle;
	},

	setEndAngle : function(value){
		this._endAngle = value;
	},
	
	getFillStyle : function() {
		return this._fillStyle;
	},

	setFillStyle : function(value){
		this._fillStyle = value;
	},
	
	getEndColor : function() {
		return this._endColor;
	},

	setEndColor : function(color){
		this._endColor = color;
	},
	
	getBorderWidth : function() {
		return this._borderWidth;
	},

	setBorderWidth : function(value){
		this._borderWidth = value;
	},
	
	getBorderColor : function() {
		return this._borderColor;
	},

	setBorderColor : function(value){
		this._borderColor = value;
	},
	
	getBorderStyle : function() {
		return this._borderStyle;
	},

	setBorderStyle : function(value){
		this._borderStyle = value;
	},
	
	getColor : function() {
		return this._color;
	},

	setColor : function(value){
		this._color = value;
	},

	isShadow : function() {
		return this._shadow;
	},
	
	setShadow : function(value) {
		this._shadow = value;
	},
	
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var left=parseInt(this.getLeft());
		var top=parseInt(this.getTop())
		var w=this.getRadius()*2;
		var h=this.getRadius()*2;
		var sh = false;
		if(this.isShadow()=='true')
			sh=true;
		
		var t=new CircleSection();
		t.left=left+1+this.getBorderWidth()+(this.getRadius());
		t.top=top+1+this.getBorderWidth()+(this.getRadius());
		
		t.radius=this.getRadius();
		t.radius1=this.getRadius1();
		t.startAngle=this.getStartAngle();
		t.endAngle=this.getEndAngle();
		
		t.color=this.getColor();
		t.endColor=this.getEndColor();
		t.fillStyle=this.getFillStyle();
		
		t.borderStyle=this.getBorderStyle();
		t.borderWidth=this.getBorderWidth();
		t.borderColor=this.getBorderColor();
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		t.uid = this._backId;
		
		if(sh)
			t.shadow=new Shadow({offsetX:2,offsetY:2,blur:5});
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left-1-this.getBorderWidth()), Math.max(0,top-1-this.getBorderWidth()), w+7+this.getBorderWidth(), h+7+this.getBorderWidth());
		this._backImgTop=Math.max(0,top-1-this.getBorderWidth());
		this._backImgLeft=Math.max(0,left-1-this.getBorderWidth());
		this._backImgWidth=w+7+this.getBorderWidth();
		this._backImgHeight=h+7+this.getBorderWidth();
				
		t.draw(parentId);	
		
		document.getElementById(parentId).updateImage();
		
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
