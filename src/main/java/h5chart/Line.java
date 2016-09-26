/*******************************************************************************
 * File: Line.java 
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

public class Line extends Shape {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2716792849027130398L;
	
	
	private String _x1="0";
	
	public String getX1() {
		return _x1;
	}

	public void setX1(String x1) {
		if (!_x1.equalsIgnoreCase(x1)) {
			_x1 = x1;
			smartUpdate("x1", _x1);
		}
	}
	
	private String _y1="0";
		
	public String getY1() {
		return _y1;
	}

	public void setY1(String y1) {
		if (!_y1.equalsIgnoreCase(y1)) {
			_y1 = y1;
			smartUpdate("y1", _y1);
		}
	}
	

	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "x1", _x1);
		render(renderer, "y1", _y1);
	}
	
}
