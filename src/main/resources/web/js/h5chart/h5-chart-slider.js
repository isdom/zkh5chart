/*******************************************************************************
 * File: h5-chart-slider.js 
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

function Slider() {

	this.orientation = 'horizontal';
	this.init();

	this.draw = function(canvasId) {

		var n;
		var col;
		var l, t, w, h, bh, bw, offset;

		if (this.orientation == 'horizontal') {
			bh = this.width - 10;
			bw = this.height / 4;
			l = (this.width - bh) / 2;
			t = (this.height - bw) / 2;
			w = bw;
			h = bh;
			offset = l;
		} else {
			bh = this.height - 10;
			bw = this.width / 4;
			l = (this.width - bw) / 2;
			t = (this.height - bh) / 2;
			w = bw;
			h = bh;
			offset = t + h;
		}

		var r = new Rectangle();
		r.left = l;
		r.top = t;

		if (this.orientation == 'horizontal') {
			r.left = l;
			r.top = t;
			r.height = bw;
			r.width = bh;
			r.fillStyle = 'h-cilinder';
		} else {
			r.left = l + w / 2;
			r.top = t;
			r.height = h;
			r.width = w / 4;
			r.fillStyle = 'v-cilinder';
		}

		r.color = 'white';
		r.endColor = 'grey';

		r.borderStyle = 'none';
		r.shadow = new Shadow({
			offsetX : 2,
			offsetY : 2,
			blur : 5
		});

		var ang = 0;

		var sum = this.max - this.min;

		var last = 0;
		var color = this.indicatorColor;
		var a;

		var r = new Rectangle();

		if (!this.current)
			this.current = this.min;

		if (this.orientation == 'horizontal') {
			a = (this.current - this.min) * h / sum;
			a = Math.floor(a);
			r.left = offset + a - 4;
			r.top = t + 11;
			r.width = 8;
			r.height = bw - 22;
		} else {
			a = (this.current - this.min) * h / sum;
			a = Math.floor(a);
			r.left = l;
			r.width = offset + a - 5;
			r.top = offset - a;
			r.height = 10;
		}

		r.borderStyle = 'none';

		r.endColor = color;

		if (this.style == 'flat') {
			r.color = color;
			r.fillStyle = 'solid';
		} else {

			if (this.orientation == 'horizontal') {
				r.fillStyle = 'v-cilinder';
				r.color = entoneColor(color, 2);
			} else {
				r.fillStyle = 'h-cilinder';
				r.endColor = entoneColor(color, 2);
				r.color = color;
			}
		}

		r.draw(canvasId);

		var rule;

		if (this.orientation == 'horizontal') {
			rule = new Rule(l, t, bh, this.intervals, 'horizontal');
		} else {
			rule = new Rule(l, t, bh, this.intervals, 'vertical');
		}

		rule.tickOrientation = "under";
		rule.tickMode = "med";
		rule.color = "grey";
		rule.borderColor = "grey";
		rule.draw(canvasId);

		if (this.orientation == 'horizontal') {
			rule = new Rule(l, t + bw, bh, this.intervals, 'horizontal');
		} else {
			rule = new Rule(l - h + 6, t, h, this.intervals, 'vertical');
		}

		rule.tickMode = "med";
		rule.color = "grey";
		rule.borderColor = "grey";
		rule.tickOrientation = "over";
		rule.draw(canvasId);

	};

}

Slider.prototype = new OneDimensionGraph();
