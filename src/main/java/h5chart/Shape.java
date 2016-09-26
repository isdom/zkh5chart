/*******************************************************************************
 * File: Shape.java 
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

public abstract class Shape extends H5ChartChildren {

	protected String _color = "white";

	public String getColor() {
		return _color;
	}

	public void setColor(String color) {
		if (!_color.equalsIgnoreCase(color)) {
			_color = color;
			smartUpdate("color", _color);
		}
	}

	protected String _borderStyle = BORDER_SOLID;

	public String getBorderStyle() {
		return _borderStyle;
	}

	public void setBorderStyle(String borderStyle) {
		if (!_borderStyle.equalsIgnoreCase(borderStyle)) {
			_borderStyle = borderStyle;
			smartUpdate("borderStyle", _borderStyle);
		}
	}

	protected double _borderWidth = 1;

	public double getBorderWidth() {
		return _borderWidth;
	}

	public void setBorderWidth(double borderWidth) {
		if (_borderWidth != borderWidth) {
			_borderWidth = borderWidth;
			smartUpdate("borderWidth", _borderWidth);
		}
	}

	protected String _fillStyle= FILL_NONE;
	
	public String getFillStyle() {
		return _fillStyle;
	}

	public void setFillStyle(String fillStyle) {
		if (!_fillStyle.equalsIgnoreCase(fillStyle)) {
			_fillStyle = fillStyle;
			smartUpdate("fillStyle", _fillStyle);
		}
	}
	
	protected String _endColor="white";

	public String getEndColor() {
		return _endColor;
	}

	public void setEndColor(String endColor) {
		if (!_endColor.equalsIgnoreCase(endColor)) {
			_endColor = endColor;
			smartUpdate("endColor", _endColor);
		}
	}
	
	protected String _borderColor= "black";

	public String getBorderColor() {
		return _borderColor;
	}

	public void setBorderColor(String borderColor) {
		if (!_borderColor.equalsIgnoreCase(borderColor)) {
			_borderColor = borderColor;
			smartUpdate("borderColor", _borderColor);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);

		render(renderer, "borderWidth", _borderWidth);
		render(renderer, "borderStyle", _borderStyle);
		render(renderer, "borderColor", _borderColor);
		render(renderer, "fillStyle", _fillStyle);
		render(renderer, "color", _color);
		render(renderer, "endColor", _endColor);
		
	}

}
