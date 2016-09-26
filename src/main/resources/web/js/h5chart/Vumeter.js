/*******************************************************************************
 * File: Vumeter.js Copyright (C) 2009-2011 Author: L.D.Nigro Contributor(s):
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

zk.$package('Vumeter');

h5chart.Vumeter = zk.$extends(zk.Widget, {
	_min : 0,
	_background : 'false',
	_orientation : 'vertical',
	_xpoints : 1,
	_ypoints : 10,
	_animate : 'false',
	_current : 0,
	_ranges : new Array(),

	_showTooltip : 'true',
	_shadow : 'true',
	_tooltipFont : '11px Arial',
	_tooltipColor : 'grey',
	_tooltipMask : "function (val){ return val}",
	_currentFont : '11px Arial',
	_currentColor : 'grey',
	_currentMask : "function (val){ return val}",
	_labelFont : '11px Arial',
	_labelColor : 'grey',
	_labelMask : "function (val){ return val}",

	_backImg : null,
	_backImgLeft : 0,
	_backImgTop : 0,
	_backImgWidth : 0,
	_backImgHeight : 0,
	_backId : null,

	isShowTooltip : function() {
		return this._showTooltip;
	},

	setShowTooltip : function(value) {
		this._showTooltip = value;
	},

	isShadow : function() {
		return this._shadow;
	},

	setShadow : function(value) {
		this._shadow = value;
	},

	getTooltipFont : function() {
		return this._tooltipFont;
	},

	setTooltipFont : function(value) {
		this._tooltipFont = value;
	},

	getTooltipColor : function() {
		return this._tooltipColor;
	},

	setTooltipColor : function(value) {
		this._tooltipColor = value;
	},

	getTooltipMask : function() {
		return this._tooltipMask;
	},

	setTooltipMask : function(value) {
		this._tooltipMask = value;
	},

	getCurrentFont : function() {
		return this._currentFont;
	},

	setCurrentFont : function(value) {
		this._currentFont = value;
	},

	getCurrentColor : function() {
		return this._currentColor;
	},

	setCurrentColor : function(value) {
		this._currentColor = value;
	},

	getCurrentMask : function() {
		return this._currentMask;
	},

	setCurrentMask : function(value) {
		this._currentMask = value;
	},

	getLabelFont : function() {
		return this._labelFont;
	},

	setLabelFont : function(value) {
		this._labelFont = value;
	},

	getLabelColor : function() {
		return this._labelColor;
	},

	setLabelColor : function(value) {
		this._labelColor = value;
	},

	getLabelMask : function() {
		return this._labelMask;
	},

	setLabelMask : function(value) {
		this._labelMask = value;
	},

	isBackground : function() {
		return this._ringStyle;
	},

	setBackground : function(value) {
		this._background = value;
	},

	getXpoints : function() {
		return this._xpoints;
	},

	setXpoints : function(value) {
		this._xpoints = value;
	},

	getYpoints : function() {
		return this._ypoints;
	},

	setYpoints : function(value) {
		this._ypoints = value;
	},

	isBackground : function() {
		return this._background;
	},

	setBackground : function(value) {
		this._background = value;
	},

	getOrientation : function() {
		return this._orientation;
	},

	setOrientation : function(value) {
		this._orientation = value;
	},

	getMin : function() {
		return this._min;
	},

	setMin : function(value) {
		this._min = value;
	},

	getCurrent : function() {
		return this._current;
	},

	setCurrent : function(value) {
		eval("this._current =[" + value + "];");
	},

	isAnimate : function() {
		return this._animate;
	},

	setAnimate : function(value) {
		this._animate = value;
	},

	getRanges : function() {
		return this._ranges;
	},

	setRanges : function(value) {
		eval("this._ranges=" + value + ";");
	},

	setPlot : function(value) {
		var o = this.domAttrs_();
		var s = this.uuid;
		var parentId = this.parent.uuid;

		var id = this.uuid;
		var l = new Vumeter();
		var left = parseInt(this.getLeft()) + 2;
		var top = parseInt(this.getTop()) + 2
		var w = parseInt(this.getWidth()) - 7;
		var h = parseInt(this.getHeight()) - 7;

		var ani = false;
		if (this.isAnimate() == 'true')
			ani = true;

		var sh = false;
		if(this.isShadow()=='true')
			sh=true;
		
		var sht = false;
		if(this.isShowTooltip()=='true')
			sht=true;
		
		var back = false;
		if (this.isBackground() == 'true')
			back = true;

		if (!this._backId)
			this._backId = document.getElementById(parentId).getUid();

		l.set( {
			left : left,
			top : top,
			width : w,
			height : h,
			min : this.getMin(),
			background : back,
			orientation : this.getOrientation(),
			regionManager:  this.parent._rm,
			xpoints : this.getXpoints(),
			ypoints : this.getYpoints(),
			current : this.getCurrent(),
			animate : ani,
			uid : this._backId,
			shadow:			sh,
			showTooltip:	sht
		});

		var r = this.getRanges();
		if (r.length > 0) {
			for ( var n = 0; n < r.length; n++) {
				l.serie.add(r[n]);
			}
		} else {
			l.serie.add( {
				value : 0,
				color : 'grey'
			});
		}

		eval("var tooltipmask="+this._tooltipMask);
		l.setTooltipStyle({
			mask : 			tooltipmask ,
			font : 			this.getTooltipFont(),
			color: 			this.getTooltipColor()
		});


		eval("var labelmask="+this._labelMask);
		l.setLabelStyle({
			mask : 			labelmask ,
			font : 			this.getLabelFont(),
			color: 			this.getLabelColor()
		});

			
		eval("var currentmask="+this._currentMask);
		l.setCurrentStyle({
			mask : 			currentmask,
			font : 			this.getCurrentFont(),
			color: 			this.getCurrentColor()
		});

		
		if (this._backImg) {
			this._backImg.putImageData(parentId, this._backImgLeft,
					this._backImgTop);
		}

		this._backImg = new h5Image();
		this._backImg.getImageData(parentId, Math.max(0,left - 2), Math.max(0,top - 2), w + 10, h + 10);
		this._backImgTop = Math.max(0,top - 2);
		this._backImgLeft = Math.max(0,left - 2);
		this._backImgWidth = w + 10;
		this._backImgHeight = h + 10;

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
	
	bind_ : function(desktop, skipper, after) {
		this.$supers('bind_', arguments);
		this.setPlot(true);
	}
});
