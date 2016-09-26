/*******************************************************************************
 * File: Line.js 
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

zk.$package('Line');

h5chart.Line = zk.$extends(zk.Widget, {
	_shadow: 'false',
	_color: 'black',
	
	_x1: '0',
	_y1: '0',
	_borderStyle: 'solid',
	_borderWidth: 1,
	
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	getX1 : function() {
		return this._x1;
	},

	setX1 : function(value){
		this._x1 = value;
	},
	
	getY1 : function() {
		return this._y1;
	},

	setY1 : function(value){
		this._y1 = value;
	},
	
	getBorderWidth : function() {
		return this._borderWidth;
	},

	setBorderWidth : function(value){
		this._borderWidth = value;
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
		var l=new Meter();
		var left=parseInt(this.getLeft());
		var top=parseInt(this.getTop())
		var x1=parseInt(this.getX1());
		var y1=parseInt(this.getY1());
		
		var sh = false;
		if(this.isShadow()=='true')
			sh=true;
		
		var t=new Rectangle();
		var l=left+this.getBorderWidth();
		var t=top+this.getBorderWidth();
		var w=Math.abs(left-x1-5);
		var h=Math.abs(top-y1-5);
		
		var shadow;
		if(sh)
			shadow=new Shadow({offsetX:2,offsetY:2,blur:5});
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left-this.getBorderWidth()), Math.max(0,top-this.getBorderWidth()), w+this.getBorderWidth()+5, h+this.getBorderWidth()+5);
		this._backImgTop=Math.max(0,top-this.getBorderWidth());
		this._backImgLeft=Math.max(0,left-this.getBorderWidth());
		this._backImgWidth=w+this.getBorderWidth()+5;
		this._backImgHeight=h+this.getBorderWidth()+5;
			
		var ctx=getContext(parentId);
		var points=[{x:left,y:top},{x:x1,y:y1}];
		drawPoly(ctx,points,this.getBorderWidth(),this.getColor(),shadow,this.getBorderStyle());
		
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
