/*******************************************************************************
 * File: h5-chart-funnel.js 
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
 * @returns {Funnel}
 */
function Funnel() {
	
	this.init();

	this.getDimension = function() {
		var left = this.left;
		var top = this.top;
		var width = this.width - 5;
		var height = this.height - 5;
		return {
			left : left + 5,
			top : top + 5,
			height : height,
			width : width
		};
	};

	this.distri = function() {
		var dim = this.getDimension();
		var values = this.getSerie(0);
		var total = values.max();

		var result = new ArrayList();
		result.init();
		var w = dim.width;
		
		var toth = 0;
		var h = dim.height/values.length();
		for ( var n = values.length() - 1; n >= 0; n--) {
			var base=values.get(n).value*dim.width/total;
			if(n==0)
				base1=0;
			else 
				base1=values.get(n-1).value*dim.width/total;
						
			var offset=(base-base1)/2;
			
			result.set(n, {
				height : h,
				base : base,
				base1 : base1,
				offsetX : offset,
				offsetY : toth
			});
			toth += h;
			w = base1;
		}

		return result;
	};
	
	this.calcHeight = function() {
		var result= this.distri();
		return result;
	};
	
	this.clone = function(){
		var canvas=document.getElementById(this.canvasId);
		var uid=canvas.getUid();
		
		var np=new Funnel();
		cloneProperties(this,np,['left','top','width','height','orientation','distribution','showTooltip','palette','style']);
		
		setSeriesFromSelection(this,np,arguments[0]);
		
		np.setValueStyle(this.labels.valueStyle);
		return np;
	};
	
}

Funnel.prototype = new Piramid();