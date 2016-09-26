/*******************************************************************************
 * File: Text.java 
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

public class Text extends H5ChartChildren {

	public static String ALIGN_LEFT="left";
	public static String ALIGN_RIGHT="right";
	public static String ALIGN_CENTER="center";
	
	private String _align="left";
	
	public String getAlign() {
		return _align;
	}

	public void setAlign(String align) {
		if (!_align.equalsIgnoreCase(align)) {
			_align = align.toLowerCase();
			smartUpdate("align", _align);
		}
	}
	
	private double _angle = 0;

	public double getAngle() {
		return _angle;
	}

	public void setAngle(double angle) {
		if (_angle!=angle) {
			_angle = angle;
			smartUpdate("angle", _angle);
		}
	}

	private String _color = "black";

	public String getColor() {
		return _color;
	}

	public void setColor(String color) {
		if (!_color.equalsIgnoreCase(color)) {
			_color = color;
			smartUpdate("color", _color);
		}
	}

	private String _font = "11px Arial";

	public String getFont() {
		return _font;
	}

	public void setFont(String font) {
		if (!_font.equalsIgnoreCase(font)) {
			_font = font;
			smartUpdate("font", _font);
		}
	}

	private String _text = "";

	public String getText() {
		return _text;
	}

	public void setText(String value) {
		if (!_text.equals(value)) {
			_text = value;
			smartUpdate("text", _text);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);

		render(renderer, "text", _text);
		render(renderer, "font", _font);
		render(renderer, "color", _color);
		render(renderer, "angle", _angle);
		render(renderer, "align", _align);
	}
	
}
