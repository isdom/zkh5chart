/*******************************************************************************
 * File: H5Chart.js 
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

zk.$package('H5Chart');

h5chart.H5Chart = zk.$extends(zk.Widget, {
	
	_rm: null,
	
	_regionManager: 'false',
	
	isRegionManager : function() {
		return this._regionManager;
	},
	
	setRegionManager : function(value) {
		this._regionManager = value;
		this._rm=new RegionManager();
		this._rm.init();
	},
	
	bind_: function (desktop, skipper, after) {
		this.$supers('bind_', arguments);
		
		var s=this.uuid;

		var canvas=document.getElementById(s);
		canvas.regions=this._rm.regions;
		canvas.regionManager=this._rm;
		canvas.onclick=onClick;
		canvas.onmousemove=onMouseMove;
		canvas.onmousedown=onMouseDown;
		canvas.onmouseup=onMouseUp;
	},
	
	detach: function() {
		if(this._rm){
			rm.clear();
		}
		this._rm= null;
		this.clear();
	} 

});
