/*******************************************************************************
 * File: Text.js 
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

zk.$package('Text');

h5chart.Text = zk.$extends(zk.Widget, {
	_shadow: 'false',
	_angle: 0 ,
	_text: '',
	_font: '11px Arial',
	_color: 'black',
	_align: 'left',

	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	getAlign : function() {
		return this._align;
	},

	setAlign : function(value){
		this._align = value;
	},
	
	getAngle : function() {
		return this._angle;
	},

	setAngle : function(value){
		this._angle = value;
	},
	
	getText : function() {
		return this._text;
	},

	setText : function(text){
		this._text = text;
	},
	
	getFont : function() {
		return this._font;
	},

	setFont : function(value){
		this._font = value;
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
	
		
	setPlot : function (value) {
						
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var l=new Meter();
		var left=parseInt(this.getLeft())+1;
		var top=parseInt(this.getTop())+1
		
		var sh = false;
		if(this.isShadow()=='true')
			sh=true;
		
		var t=new Text();
		t.setBounds({left:left,top:top});
		t.color=this.getColor();
		t.style='fill';
		t.angle=this.getAngle();
		t.align=this.getAlign();
		t.font=this.getFont();
		t.text=this.getText();
		t.baseline='hanging';
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		t.uid=this._backId;
		
		var h=t.getHeight()*1.5;
		var w=getTextWidth(getContext(parentId),t.font,t.text)+5;
		
		var dw=Math.abs(w*Math.cos(toRadian(this._angle)))+Math.abs(h*Math.cos(toRadian(this._angle+90)));
		var dh=Math.abs(w*Math.sin(toRadian(this._angle)))+Math.abs(h*Math.sin(toRadian(this._angle+90)));
		
			
		if(this._angle>=0 && this._angle<90){
			left-=Math.abs(h*Math.cos(toRadian(this._angle+90)));
			top-=Math.abs(h*Math.sin(toRadian(this._angle+90)))/2;
		} else if(this._angle>=90 && this._angle<180){
			left-=dw;
			top-=Math.abs(h*Math.sin(toRadian(this._angle+90)))/2;
		} else if(this._angle>=180 && this._angle<270){
			left-=dw;
			top-=dh;
		} else if(this._angle>=270 && this._angle<360){
			left-=Math.abs(h*Math.cos(toRadian(this._angle+90)));
			top-=dh;
		}
				
		dh+=5;
		dw+=5;
		
		if(sh)
			t.shadow=new Shadow({offsetX:2,offsetY:2,blur:3});
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left-1), Math.max(0,top-1), Math.abs(dw), Math.abs(dh));
		this._backImgTop=Math.max(0,top-1);
		this._backImgLeft=Math.max(0,left-1);
		this._backImgWidth=dw;
		this._backImgHeight=dh;
		
		t.draw(parentId);
		
					
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
