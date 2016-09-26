/*******************************************************************************
 * File: Radialmeter.js Copyright (C) 2009-2011 Author: L.D.Nigro
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

zk.$package('Radialmeter');

h5chart.Radialmeter = zk.$extends(zk.Widget, {
	_startAngle : 135,
	_endAngle : 405,
	_min : 0,
	_max : 100,
	_intervals : 10,
	_rulePosition : 'in',
	_ruleInterval : 1,
	_ringStyle : 'false',
	_color : '#B0B040',
	_fillStyle : 'cilinder',
	_capacity : 'true',
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

	isRingStyle : function() {
		return this._ringStyle;
	},

	setRingStyle : function(value) {
		this._ringStyle = value;
	},

	getRulePosition : function() {
		return this._rulePosition;
	},

	setRulePosition : function(value) {
		this._rulePosition = value;
	},

	getRuleInterval : function() {
		return this._ruleInterval;
	},

	setRuleInterval : function(value) {
		this._ruleInterval = value;
	},

	getStartAngle : function() {
		return this._startAngle;
	},

	setStartAngle : function(value) {
		this._startAngle = value;
	},

	getEndAngle : function() {
		return this._endAngle;
	},

	setEndAngle : function(value) {
		this._endAngle = value;
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

	isCapacity : function() {
		return this._capacity;
	},

	setCapacity : function(value) {
		this._capacity = value;
	},

	getFillStyle : function() {
		return this._fillStyle;
	},

	setFillStyle : function(value) {
		this._fillStyle = value;
	},

	getIndicatorColor : function() {
		return this._color;
	},

	setIndicatorColor : function(value) {
		this._indicatorColor = value;
	},

	getMin : function() {
		return this._min;
	},

	setMin : function(value) {
		this._min = value;
	},

	getMax : function() {
		return this._max;
	},

	setMax : function(value) {
		this._max = value;
	},

	getIntervals : function() {
		return this._intervals;
	},

	setIntervals : function(value) {
		this._intervals = value;
	},

	getCurrent : function() {
		return this._current;
	},

	setCurrent : function(value) {
		this._current = value;
	},

	isAnimate : function() {
		return this._animate;
	},

	setAnimate : function(value) {
		this._animate = value;
	},

	isRingStyle : function() {
		return this._ringStyle;
	},

	setRingStyle : function(value) {
		this._ringStyle = value;
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
		var l = new RadialMeter();
		var left = parseInt(this.getLeft()) + 5;
		var top = parseInt(this.getTop()) + 5
		var w = parseInt(this.getWidth()) - 12;
		var h = parseInt(this.getHeight()) - 15;

		var ani = false;
		if (this.isAnimate() == 'true')
			ani = true;

		var cap = false;
		if (this.isCapacity() == 'true')
			cap = true;

		var ring = false;
		if (this.isRingStyle() == 'true')
			ring = true;

		var sh = false;
		if(this.isShadow()=='true')
			sh=true;
		
		var sht = false;
		if(this.isShowTooltip()=='true')
			sht=true;
		
		if (!this._backId)
			this._backId = document.getElementById(parentId).getUid();

		l.set( {
			left : left,
			top : top,
			width : w,
			height : h,
			startAngle : this.getStartAngle(),
			endAngle : this.getEndAngle(),
			min : this.getMin(),
			max : this.getMax(),
			intervals : this.getIntervals(),
			rulePosition : this.getRulePosition(),
			ruleInterval : this.getRuleInterval(),
			fillStyle : this.getFillStyle(),
			indicatorColor : this.getIndicatorColor(),
			capacity : cap,
			ringStyle : ring,
			regionManager:  this.parent._rm,
			style : '3D',
			current : this.getCurrent(),
			animate : ani,
			uid : this._backId,
			shadow:		sh,
			showTooltip:sht
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
		this._backImg.getImageData(parentId, Math.max(0,left - 2), Math.max(0,top - 2), w + 7, h + 7);
		this._backImgTop = Math.max(0,top - 2);
		this._backImgLeft = Math.max(0,left - 2);
		this._backImgWidth = w + 7;
		this._backImgHeight = h + 7;

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
