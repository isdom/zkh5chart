/*******************************************************************************
 * File: Meter.java 
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

package h5chart;

public class Meter extends OneDimensionGraph {
	
	public static final String VERTICAL="vertical";
	public static final String HORIZONTAL="horizontal";
	
	public static final String FILL_CILINDER="cilinder";
	public static final String FILL_LINEAR="linear";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
		
	private String _orientation= VERTICAL;
	
	public String getOrientation() {
		return _orientation;
	}

	public void setOrientation(String orientation) {
		if(!_orientation.equalsIgnoreCase(orientation)){
			_orientation = orientation;
			smartUpdate("orientation", _orientation);
		}
	}
	
	private String _color= "#B0B040";
	
	public String getIndicatorColor() {
		return _color;
	}

	public void setIndicatorColor(String color) {
		if(!_color.equalsIgnoreCase(color)){
			_color = color;
			smartUpdate("indicatorColor", _color);
		}
	}
	
	private String _fillStyle=FILL_CILINDER;
	
	public String getFillStyle() {
		return _fillStyle;
	}

	public void setFillStyle(String fillStyle) {
		if(!_fillStyle.equalsIgnoreCase(fillStyle)){
			_fillStyle = fillStyle;
			smartUpdate("fillStyle", _fillStyle);
		}
	}
	
	private String _capacity= "true";
	
	public boolean isCapacity() {
		return new Boolean(_capacity);
	}

	public void setCapacity(boolean capacity) {
		String an=Boolean.toString(capacity);
		if(!_capacity.equals(an)){
			_capacity = an;
			smartUpdate("capacity", _capacity);
		}
	}
	
	private int _barSize= 15;

	public int getBarSize() {
		return _barSize;
	}

	public void setBarSize(int size) {
		if(_barSize!=size){
			_barSize = size;
			smartUpdate("barSize", _barSize);
		}
	}
				
	public Meter() {
		super();
	}
	
	public void addRange(Double value, String color){
		ranges.add(new Range(value,color,""));
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "indicatorColor", _color);
				
		render(renderer, "barSize", _barSize);
		render(renderer, "capacity", _capacity);
		render(renderer, "fillStyle", _fillStyle);
		render(renderer, "orientation", _orientation);
		
	}
		
}


