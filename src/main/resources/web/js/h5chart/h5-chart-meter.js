/*******************************************************************************
 * File: h5-chart-meter.js 
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


/**
 * Meter, Capacity
 * 
 * @param capacity,
 *            true, show capacity bar, hide
 * @param orientation,
 *            horizontal / vertical
 * @param fillStyle,
 *            cilinder (gradient), linear (gradient), solid
 * @returns {Meter}
 */
function Meter() {

	this.orientation = 'horizontal';

	this.fillStyle = 'cilinder';

	this.init();

	this.drawBackGround = function(canvasId, dimension) {
		var r1 = new Rectangle();
		var radius = .5;
		r1.left = dimension.left - radius;
		r1.top = dimension.top - radius;
		r1.width = dimension.width + 2 * radius;
		r1.height = dimension.height + 2 * radius;
		r1.color = '#E0E0E0';
		r1.fillStyle = 'solid';
		r1.borderStyle = 'solid';
		r1.borderWidth = 0.5;
		r1.borderColor = '#707070';
		r1.radius = radius;
		r1.shadow = new Shadow({
			offsetX : 2,
			offsetY : 2,
			blur : 5
		});
		r1.draw(canvasId);
	};

	this.drawSeries = function(canvasId, dimension) {
		var sum = this.max - this.min;
		var st = dimension.offset;
		if (this.serie && this.serie.length() > 0) {
			var last = 0;
			var values = this.serie;
			for ( var n = 0; n < values.length(); n++) {
				var val = values.get(n);
				var color = val.color;
				var a;
				var r = new Rectangle();

				if (this.orientation == 'horizontal') {
					r.left = st;
					r.top = dimension.top;
					a = (val.value - this.min) * dimension.width / sum;
					r.width = a - last;
					r.height = dimension.height;
					st = dimension.offset + a;
					last = a;
				} else {
					r.left = dimension.left;
					r.width = dimension.width;
					a = (val.value - this.min) * dimension.height / sum;
					r.top = st - a;
					r.height = a - last;
					last = a;
				}

				a = Math.floor(a);

				r.borderStyle = 'none';
				r.borderColor = 'grey';

				if (this.style == 'flat' || this.capacity == true) {
					r.color = color;
					r.fillStyle = 'solid';
				} else {
					r.color = entoneColor(color, 2);
					if (this.orientation == 'horizontal')
						r.fillStyle = 'h-' + this.fillStyle;
					else
						r.fillStyle = 'v-' + this.fillStyle;
				}

				r.endColor = color;
				r.draw(canvasId);

			}
		}
	};

	this.getCurrent = function() {
		var cur = this.current;
		if (!cur)
			cur = this.min;
		if (cur > this.max)
			cur = this.max;
		if (cur < this.min)
			cur = this.min;
		return cur;
	};

	this.getCapacityBarFactorWidth = function() {
		var factor = 1;
		if (this.serie && this.serie.length() > 0) {
			factor = .6;
		}
		return factor;
	};

	this.getDimension = function() {
		var l, t, w, h, offset;
		var radius = 5;

		if (this.orientation == 'horizontal') {
			l = this.left + radius;
			t = this.top + (this.height - this.height / 3) / 2 + radius;
			w = this.width - 2 * radius;
			if (this.barSize)
				h = this.barSize;
			else {
				h = this.height / 3 - 2 * radius;
				if (h > 50)
					h = 50;
			}
			offset = l;
		} else {
			l = this.left + (this.width - this.width / 3) / 2 + radius;
			t = this.top + radius;
			if (this.barSize)
				w = this.barSize;
			else {
				w = this.width / 3 - 2 * radius;
				if (w > 50)
					w = 50;
			}
			h = this.height - 2 * radius;
			offset = t + h;
		}
		return {
			left : l,
			top : t,
			width : w,
			height : h,
			offset : offset
		};
	};

	this.drawIndicator = function(canvasId, dimension) {
		var factor = this.getCapacityBarFactorWidth();
		var cur = this.getCurrent();
		var val = cur * dimension.height / this.max;
		var a;

		var r = new Rectangle();

		r.borderStyle = 'none';
		r.endColor = this.indicatorColor;

		if (this.style == 'flat') {
			r.color = this.indicatorColor;
			r.fillStyle = 'solid';
		}

		if (this.orientation == 'horizontal') {
			a = (cur - this.min) * dimension.width / (this.max - this.min);
			a = Math.floor(a);
			r.fillStyle = 'h-' + this.fillStyle;
			r.color = entoneColor(this.indicatorColor, 2);
			r.left = dimension.left;
			r.top = dimension.top
					+ (dimension.height - dimension.height * factor) / 2;
			r.height = dimension.height * factor;
			r.width = dimension.offset + a;
		} else {
			a = (cur - this.min) * dimension.height / (this.max - this.min);
			a = Math.floor(a);
			r.fillStyle = 'v-' + this.fillStyle;
			r.endColor = entoneColor(this.indicatorColor, 2);
			r.color = this.indicatorColor;
			r.top = dimension.offset;
			r.height = dimension.offset - a;
			r.width = dimension.width * factor;
			r.left = dimension.left + (dimension.width - r.width) / 2;
		}

		if (this.capacity) {
			var obj=this;
			if (this.animate) {
				if (this.orientation == 'vertical') {
					var inc = val / 50;
					var start = dimension.top + dimension.height;
					var end = dimension.top + dimension.height - a;
					r.top = start;
					r.height = 0;
					var id = setInterval(function() {
						if (r.top <= end){
							clearInterval(id);
						
							if(obj.regionManager)
								obj.regionManager.set(obj);
						
							obj.hideTooltip();
							document.getElementById(canvasId).updateImage();
							document.getElementById(canvasId).stopAnimationInProgress(obj);
						
						} else {

							r.height += inc;
							r.top -= inc;
							r.draw(canvasId);
						}
					}, 5);
				} else {
					var inc = val / 3;
					var end = a + 1;

					r.width = 0;
					var id = setInterval(function() {
						if (r.width > end){
							clearInterval(id);
							
							if(obj.regionManager)
								obj.regionManager.set(obj);
							
							obj.hideTooltip();
							document.getElementById(canvasId).updateImage();
							document.getElementById(canvasId).stopAnimationInProgress(obj);
						
						} else {
							r.draw(canvasId);
							r.width += inc;
						}
					}, 50);
				}

			} else {
				r.draw(canvasId);
				document.getElementById(canvasId).updateImage();
				document.getElementById(canvasId).stopAnimationInProgress(this);
			}
		
		}
	};

	this.drawRules = function(canvasId, dimension) {
		var rule = new Rule();
		if (this.orientation == 'horizontal') {
			rule = new Rule(dimension.left, dimension.top + dimension.height
					+ 6, dimension.width, this.intervals, 'horizontal', true,
					this.labelStyle, this.min, this.max, 'hanging');
		} else {
			rule = new Rule(dimension.left + dimension.width + 6,
					dimension.top, dimension.height, this.intervals,
					'vertical', true, this.labelStyle, this.min, this.max,
					'hanging');
		}

		rule.tickOrientation = "under";
		rule.tickMode = "med";
		rule.color = "grey";
		rule.borderColor = "grey";
		rule.draw(canvasId);
	};

	this.draw = function(canvasId) {

		var canvas=document.getElementById(canvasId);
		canvas.startAnimationInProgress(this);
				
		this.canvasId=canvasId;
		
		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();

		if(this.regionManager)
			this.regionManager.set(this);
		
		var dimension = this.getDimension();

		this.drawBackGround(canvasId, dimension);

		this.drawSeries(canvasId, dimension);

		this.drawIndicator(canvasId, dimension);

		this.drawRules(canvasId, dimension);

		
		
		this.hideTooltip();
//		document.getElementById(canvasId).updateImage();
//		canvas.stopAnimationInProgress(this);
		
	};

}

Meter.prototype = new OneDimensionGraph();
