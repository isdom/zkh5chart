/*******************************************************************************
 * File: CircleSection.java 
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

public class CircleSection extends Shape {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2716792849027130398L;
	
	
	private double _radius= 20;
	
	public double getRadius() {
		return _radius;
	}

	public void setRadius(double radius) {
		if (_radius!=radius) {
			_radius = radius;
			smartUpdate("radius", _radius);
		}
	}
	
	private double _radius1=10;
	
	public void setRadius1(double radius) {
		if (_radius1!=radius) {
			_radius1 = radius;
			smartUpdate("radius1", _radius1);
		}
	}
	
	private double _startAngle= 0;
	
	public double getStartAngle() {
		return _startAngle;
	}

	public void setStartAngle(double angle) {
		if (_startAngle!=angle) {
			_startAngle = angle;
			smartUpdate("startAngle", _startAngle);
		}
	}
	
	private double _endAngle=10;
	
	public void setEndAngle(double angle) {
		if (_endAngle!=angle) {
			_endAngle = angle;
			smartUpdate("endAngle", _endAngle);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "radius", _radius);
		render(renderer, "radius1", _radius1);
		render(renderer, "endAngle", _endAngle);
		render(renderer, "startAngle", _startAngle);
		
		
	}

}
