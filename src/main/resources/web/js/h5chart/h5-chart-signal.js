/*******************************************************************************
 * File: h5-chart-signal.js 
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
 * Draw a ring border
 * 
 * @param canvasId
 * @param left,center
 *            x
 * @param top,center
 *            y
 * @param radius
 */
function drawLightBorder(canvasId, left, top, radius) {
	var cir = new Donut();
	cir.left = left;
	cir.top = top;
	cir.radius = radius;
	cir.radius1 = radius - 7;
	cir.color = 'white';
	cir.endColor = 'grey';
	cir.fillStyle = 'cilinder';
	cir.borderStyle = 'solid';
	cir.borderColor = 'grey';
	cir.shadow = new Shadow({
		offsetX : 0,
		offsetY : 0,
		blur : 7
	});
	cir.draw(canvasId);
}

/**
 * Draw inner light
 * 
 * @param canvasId
 * @param left,
 *            center x
 * @param top,
 *            center y
 * @param radius
 * @param col,
 *            color
 */
function drawLight(canvasId, left, top, radius, col) {
	cir = new Circle();
	cir.left = left;
	cir.top = top;
	cir.radius = radius - 7;
	cir.color = 'white';
	cir.endColor = col;
	cir.fillStyle = 'light';
	cir.borderStyle = 'none';
	cir.borderColor = 'grey';
	cir.draw(canvasId);
}

/**
 * Signal
 * 
 * @param orientation,
 *            horizontal / vertical
 * @param single,
 *            true, one light, false all series light
 * @param animateCounter,
 *            0 infinite loop, other blink counter
 * 
 * @returns {Light}
 */
function Signal() {

	this.orientation = 'horizontal';
	this.single = true;
	this.animateCounter = 0;
	this.init();
	
	this.draw = function(canvasId) {
		this.canvasId=canvasId;
		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();
		
		var n;
		var col;
		var blink = false;
		
		var canvas=document.getElementById(canvasId);
		canvas.startAnimationInProgress(this);
		
		
		for (n = 0; n < this.serie.length(); n++) {

			var r = this.serie.get(n);
			col = r.color;
			if (this.current <= r.value) {
				col = r.color;
				if (r.blink && r.blink == true)
					blink = true;
				break;
			}
		}

		var len = 1;
		if (this.single == false)
			len = this.serie.length();

		var m = 0;

		var radius = (this.width - (2 * (len + 1))) / (2 * len);
		var radius1 = (this.height - (2 * (len + 1))) / (2 * len);
		var mcol = "grey";
		var l = 0, t = 0, r = 0;
		var top = this.top + (this.height) / 2; // this.top+radius+2;
		var left = this.left + (this.width) / 2;

		if (this.single == true)
			mcol = col;

		for (m = 0; m < len; m++) {

			if (m == n || this.single) {
				mcol = col;
			} else
				mcol = 'grey';

			if (this.orientation == 'vertical') {
				if (m == n || this.single) {
					l = left;
					t = this.top + (radius1 + 2) + ((radius1 + 1) * 2 * m);
					r = radius1;
				}
				drawLightBorder(canvasId, left, this.top + (radius1 + 2)
						+ ((radius1 + 1) * 2 * m), radius1);
				drawLight(canvasId, left, this.top + (radius1 + 2)
						+ ((radius1 + 1) * 2 * m), radius1, mcol);
			} else {
				if (m == n || this.single) {
					l = this.left + (radius + 2) + ((radius + 1) * 2 * m);
					t = top;
					r = radius;
				}
				drawLightBorder(canvasId, this.left + (radius + 2)
						+ ((radius + 1) * 2 * m), top, radius);
				drawLight(canvasId, this.left + (radius + 2)
						+ ((radius + 1) * 2 * m), top, radius, mcol);
			}
		}

		if (this.animate && blink == true) {
			
			var bg = true;
			var c;
			var lcounter = 0;
			var max = this.animateCounter;
			if (!max)
				max = 50;
			var obj=this;
			var id = setInterval(function() {
				if (lcounter == max && max > 0) {
					drawLight(canvasId, l, t, r, col);
					clearInterval(id);
					
					if(obj.regionManager)
						obj.regionManager.set(obj);
					
					obj.hideTooltip();
//					var canvas=document.getElementById(canvasId);
//					canvas.startAnimationInProgress(obj);
					document.getElementById(canvasId).updateImage();
					canvas.stopAnimationInProgress(obj);
					
					return;
				}

				if (bg) {
					bg = false;
					c = col;
					lcounter++;
				} else {
					bg = true;
					c = 'grey';
				}

				drawLight(canvasId, l, t, r, c);
				
			}, 350);
		} else {
			if(this.regionManager)
				this.regionManager.set(this);
			
			this.hideTooltip();
//			var canvas=document.getElementById(canvasId);
//			canvas.startAnimationInProgress(this);
			document.getElementById(canvasId).updateImage();
			canvas.stopAnimationInProgress(this);
			
		}
	};

}

Signal.prototype = new OneDimensionGraph();
