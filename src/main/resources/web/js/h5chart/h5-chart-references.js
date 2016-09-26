/*******************************************************************************
 * File: h5-chart-references.js 
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

function References() {
	this.left = 10;
	this.top = 10;
	this.width = 200;
	this.height = 100;
	this.order = 'rows'; // column , natural
		
	this.labelStyle;

	this.serie;

	this.background = true;
	this.backgroundColor = '#FFFAC9';
	this.borderColor = 'grey';
	this.shadow = true;

	this.init = function() {
		this.serie = new ArrayList();
		this.serie.init();
	};

	this.init();

	setProperties(this, arguments[0]);

	/**
	 * set named properties
	 */
	this.set = function() {
		setProperties(this, arguments[0]);
	};

	this.setLabelStyle = function() {
		this.labelStyle = new Style();
		this.labelStyle.set(arguments[0]);
	};

	/** {color: color, label: label} * */
	this.addReference = function() {
		this.serie.add(arguments[0]);
	};

	this.getReference = function(index) {
		return this.serie.get(index);
	};

	this.referencesLength = function() {
		return this.serie.length();
	};

	this.getDimensionRows = function(canvasId) {
		var ctx = getContext(canvasId);
		var font = this.labelStyle.font;
		var sq = getTextHeight(font);
		var h = sq + 4;
		var w = this.width - 8 - h;

		var arr = new ArrayList();
		arr.init();
		var auxh = 0;
		var auxt = this.top + 2;
		for ( var n = 0; n < this.referencesLength(); n++) {
			var ref = this.getReference(n);
			var a = getTextArray(ctx, ref.label, font, this.width - sq - 12);
			auxh += a.length() * h + 4;
			arr.add( {
				array : a,
				top : auxt + 4,
				labelLeft : this.left + 8 + sq + 2,
				color : ref.color,
				sqLeft : this.left + 8,
				sqWidth : sq
			});
			auxt += a.length() * h + 4;
		}

		return {
			left : this.left + 2,
			top : this.top + 2,
			width : this.width,
			height : auxh + 2,
			labelArray : arr
		};

	};

	this.getDimensionNatural = function(canvasId) {
		var ctx = getContext(canvasId);
		var font = this.labelStyle.font;
		var sq = getTextHeight(font);
		var h = sq + 4;

		var arr = new ArrayList();
		arr.init();

		var curtop = this.top + 8;
		var maxWidth = this.width - 12 - 3;
		var innerleft = this.left + 8;
		var curleft = innerleft;
		for ( var n = 0; n < this.referencesLength(); n++) {
			var ref = this.getReference(n);
			if (curleft + sq + 4 > innerleft + maxWidth) {
				curleft = innerleft;
				curtop += 4 + h;
			}

			arr.add( {
				type : 'sq',
				top : curtop,
				color : ref.color,
				left : curleft,
				width : sq
			});

			curleft += sq + 4;
			var aux = ref.label;
			var index = 1;
			while (true) {
				var curtext = aux.substring(0, index);
				var tw = getTextWidth(ctx, font, curtext);
				if (curleft + tw > innerleft + maxWidth || index > aux.length) {
					if (tw > 0) {
						arr.add( {
							type : 'tx',
							top : curtop,
							left : curleft,
							text : curtext
						});
					}
					
					if ((curleft + tw > innerleft + maxWidth))
						curtop += 4 + h;
					if (index > aux.length) {
						curleft += tw + 4;
						break;
					} else {
						aux = aux.substring(index, aux.length);
						curleft = innerleft;
						index = 1;
					}
				} else {
					index++;
				}
			}
		}

		var hei = curtop + 4 + h - this.top;

		return {
			left : this.left + 2,
			top : this.top + 2,
			width : this.width + 3,
			height : hei,
			data : arr
		};

	};

	this.getDimension = function(canvasId) {
		if (this.order == 'rows') {
			return this.getDimensionRows(canvasId);
		} else
			return this.getDimensionNatural(canvasId);
	};

	this.drawBackGround = function(canvasId, dim) {

		var ctx = getContext(canvasId);

		var sh;
		if (this.shadow) {
			sh = new Shadow( {
				offsetX : 2,
				offsetY : 2,
				blur : 5
			});
		}

		if (this.background) {
			fillRoundRect(ctx, dim.left, dim.top, dim.width, dim.height, 5,
					this.backgroundColor, sh);
			drawRoundRect(ctx, dim.left, dim.top, dim.width, dim.height, 5, 1,
					this.borderColor);
		}
	};

	this.drawLabel = function(canvasId, dimension) {

		var ctx = getContext(canvasId);
		for ( var index = 0; index < dimension.labelArray.length(); index++) {
			var arr = dimension.labelArray.get(index);
			fillRect(ctx, arr.sqLeft, arr.top, arr.sqWidth, arr.sqWidth,
					arr.color);

			for ( var n = 0; n < arr.array.length(); n++) {
				drawText(canvasId, arr.labelLeft, arr.top + n
						* (arr.sqWidth + 2), arr.array.get(n), 0,
						this.labelStyle.color, this.labelStyle.font, "left",
						"hanging");
			}
		}
	};

	this.drawNatural = function(canvasId, dimension, index) {
		var ctx = getContext(canvasId);
		for ( var n = 0; n < dimension.data.length(); n++) {
			var data = dimension.data.get(n);
			var type = data.type;
			if (type == 'sq')
				fillRect(ctx, data.left, data.top, data.width, data.width,
						data.color);
			else
				drawText(canvasId, data.left, data.top, data.text, 0,
						this.labelStyle.color, this.labelStyle.font, "left",
						"hanging");
		}
	};

	this.draw = function(canvasId) {
		var dim;
		if (this.order == 'rows')
			dim = this.getDimension(canvasId);
		else
			dim = this.getDimensionNatural(canvasId);

		if (this.background)
			this.drawBackGround(canvasId, dim);

		if (this.order == 'rows')
			this.drawLabel(canvasId, dim);
		else
			this.drawNatural(canvasId, dim);
		
		document.getElementById(canvasId).updateImage();
		
	};
}
