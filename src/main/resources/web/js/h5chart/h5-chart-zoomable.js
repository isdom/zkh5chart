/*******************************************************************************
 * File: h5-chart-zoomable.js 
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
 * 
 * @returns {Zoomable}
 */
function Zoomable() {

	this.canvasId;

	this.object = null;
	this.left = null;
	this.top = null;
	this.width = null;
	this.height = null;

	this.backImg = null;
	this.originalObject = null;

	this.resetRegion = null;
	
	this.init = function(){
		this.originalObject=null;
		this.backImg=null;
	};
	
	this.init();
	
	this.getReset = function(parent, canvasId) {

		var l = new Map();

		var a = parent.left + parent.width - 12;

		l.set( {
			left : a,
			top : parent.top,
			uid : getCanvasObjectUid("c"),
			selection : 'none',
			fillStyle : 'solid',
			borderWidth: 0.5,
			borderStyle: 'solid',
			color : '#00DA00'
		});

		l.setLabel("Reset");
		l.setValue("zoom");

		l.addPoint(0, 5);
		l.addPoint(5, 0);
		l.addPoint(5, 3);
		l.addPoint(10, 3);
		l.addPoint(10, 7);
		l.addPoint(5, 7);
		l.addPoint(5, 10);
		l.addPoint(0, 5);

		l.setValueStyle( {
			font : '11px Arial',
			color : 'black'
		});
		// l.draw(canvasId);

		return l;
	};

	this.getImage = function() {
		var img = new h5Image();
		img.getImageData(this.canvasId, this.left - 10, this.top - 10,
				this.width + 17, this.height + 17);
		this.backImg = img;
	};

	this.reset = function() {
		var parent = this.parent;
		parent.backImg.putImageData(parent.canvasId, parent.left - 10,
				parent.top - 10);

		if (parent.object.regionManager)
			parent.object.regionManager.remove(parent.object);

		if (parent.resetRegion.regionManager) {
			parent.resetRegion.regionManager.remove(parent.resetRegion);
			parent.resetRegion = null;
		}

		parent.object = parent.originalObject;
		parent.draw(parent.canvasId, false);
	};

	this.zoom = function() {
		var parent = this.parent;
		parent.backImg.putImageData(parent.canvasId, parent.left - 10,
				parent.top - 10);

		if (parent.originalObject == null) {
			parent.originalObject = this;
			if (parent.originalObject.regionManager)
				parent.originalObject.regionManager
						.remove(parent.originalObject);
		}

		if (parent.object.regionManager) {
			parent.object.regionManager.remove(parent.object);

		}

		if (this.resetRegion) {
			if (this.resetRegion.regionManager) {
				this.resetRegion.regionManager.remove(this.resetRegion);
			}
			this.resetRegion = null;
		}

		parent.object = parent.object.clone(arguments[0]);
		parent.draw(parent.canvasId, true);

	};

	this.draw = function(canvasId, resetRegion) {
		this.canvasId = canvasId;
		if (!this.backImg)
			this.getImage();
		else
			this.backImg.putImageData(this.canvasId, this.left - 10,
					this.top - 10);

		this.object.parent = this;
		this.object._onselection = this.zoom;

		this.object.animate=false;
		this.object.draw(this.canvasId);

		if (resetRegion == true) {
			if (this.resetRegion)
				if (this.resetRegion.regionManager) {
					this.resetRegion.regionManager.remove(this.resetRegion);
				}
			this.resetRegion = null;
			this.resetRegion = this.getReset(this, this.canvasId);
			this.resetRegion.parent = this;
			this.resetRegion.draw(this.canvasId, false);
			this.resetRegion._onclick = this.reset;
		} else {
			if (this.resetRegion)
				if (this.resetRegion.regionManager)
					this.resetRegion.regionManager.remove(this.resetRegion);
		}

	};

}
