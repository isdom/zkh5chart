/*******************************************************************************
 * File: h5Image.js 
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

zk.$package('h5Image');

h5chart.h5Image = zk.$extends(zk.Widget, {
	_src: '',
	_sourceType: 'url',
	_imageId:'',
	
	_backImg: null,
	_backImgLeft: 0 ,
	_backImgTop: 0 ,
	_backImgWidth: 0,
	_backImgHeight: 0,
	_backId: null,
	
	getSrc : function() {
		return this._src;
	},

	setSrc : function(value){
		this._src = value;
	},
	
	getImageId : function() {
		return this._imageId;
	},

	setImageId : function(value){
		this._imageId = value;
	},
	
	getSourceType : function() {
		return this._sourceType;
	},

	setSourceType : function(value){
		this._sourceType = value;
	},
		
	setPlot: function(value){
		var o=this.domAttrs_();
		var s=this.uuid;
		var parentId=this.parent.uuid;
		
		var id=this.uuid;
		var left=parseInt(this.getLeft());
		var top=parseInt(this.getTop())
		var w=parseInt(this.getWidth());
		var h=parseInt(this.getHeight());
		
		var t=new h5Image();
		t.left=left;
		t.top=top;
		t.width=w;
		t.height=h;
		t.sourceType=this.getSourceType();
		t.src=this.getSrc();
		t.imageId=this.getImageId();
		
		if(this._backImg){
			this._backImg.putImageData(parentId, this._backImgLeft, this._backImgTop);
		}
		
		if(!this._backId)
			this._backId=document.getElementById(parentId).getUid();
		
		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, left, top, w, h);
		this._backImgTop=top;
		this._backImgLeft=left;
		this._backImgWidth=w;
		this._backImgHeight=h;
				
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
