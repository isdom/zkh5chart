/*******************************************************************************
 * File: h5-chart-stack.js 
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
 * @returns {Stack}
 */
function Stack() {

	this.init();

	this.getDimension = function() {
		var left = this.left;
		var top = this.top;
		var width = this.width - 15;
		var height = this.height - 15;
		var angle1 = Math.PI/2; 
		var angle2 = Math.PI/2; 
		var angle3 = Math.PI/2;
		var left1 = width * 3 / 4;
		return {
			left : left + 15,
			top : top + 15,
			angle1 : angle1,
			angle2 : angle2,
			angle3 : angle3,
			width : width,
			height : height,
			left1 : left1
		};
	};
	
	this.clone = function(){
		var canvas=document.getElementById(this.canvasId);
		var uid=canvas.getUid();
		
		var np=new Stack();
		cloneProperties(this,np,['left','top','width','height','orientation','distribution','showTooltip','palette','style']);
		
		setSeriesFromSelection(this,np,arguments[0]);
		
		np.setValueStyle(this.labels.valueStyle);
		return np;
	};

}

Stack.prototype = new Piramid();