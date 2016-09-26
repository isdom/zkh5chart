/*******************************************************************************
 * File: References.java 
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

import java.util.ArrayList;
import java.util.List;

public class References extends H5ChartChildren {

	public static final String ORDER_ROWS = "rows";
	public static final String ORDER_NATURAL = "natural";

	private List ranges;

	public void addRange(String color, String label) {
		ranges.add(new Range(color, label));
	}

	public void removeRange(int index) {
		ranges.remove(index);
	}

	public void clearRanges() {
		ranges.clear();
	}

	public References() {
		this.ranges = new ArrayList();
	}

	private String _order = "rows"; // column , natural

	public String getOrder() {
		return _order;
	}

	public void setOrder(String order) {
		if (!_order.equalsIgnoreCase(order)) {
			_order = order;
			smartUpdate("order", _order);
		}
	}

	private String _background = "true";

	public boolean isBackground() {
		return new Boolean(_background);
	}

	public void setBackground(boolean background) {
		String an = Boolean.toString(background);
		if (!_background.equals(an)) {
			_background = an;
			smartUpdate("background", _background);
		}
	}

	private String _backgroundColor = "#FFFAC9";

	public String getBackgroundColor() {
		return _backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		if (!_backgroundColor.equalsIgnoreCase(backgroundColor)) {
			_backgroundColor = backgroundColor;
			smartUpdate("backgroundColor", _backgroundColor);
		}
	}

	private String _borderColor = "grey";

	public String getBorderColor() {
		return _borderColor;
	}

	public void setBorderColor(String borderColor) {
		if (!_borderColor.equalsIgnoreCase(borderColor)) {
			_borderColor = borderColor;
			smartUpdate("borderColor", _borderColor);
		}
	}

	private String _shadow = "true";

	public boolean isShadow() {
		return new Boolean(_shadow);
	}

	public void setShadow(boolean shadow) {
		String an = Boolean.toString(shadow);
		if (!_shadow.equals(an)) {
			_shadow = an;
			smartUpdate("shadow", _shadow);
		}
	}

	private String _labelFont = "11px Arial";

	public String getLabelFont() {
		return _labelFont;
	}

	public void setLabelFont(String labelFont) {
		if (!_labelFont.equalsIgnoreCase(labelFont)) {
			_labelFont = labelFont;
			smartUpdate("labelFont", _labelFont);
		}
	}

	private String _labelColor = "grey";

	public String getLabelColor() {
		return _labelColor;
	}

	public void setLabelColor(String labelColor) {
		if (!_labelColor.equalsIgnoreCase(labelColor)) {
			_labelColor = labelColor;
			smartUpdate("labelColor", _labelColor);
		}
	}

	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);

		render(renderer, "order", _order);
		render(renderer, "background", _background);
		render(renderer, "backgroundColor", _backgroundColor);
		render(renderer, "borderColor", _borderColor);
		render(renderer, "shadow", _shadow);
		
		render(renderer, "labelColor", this._labelColor);
		render(renderer, "labelFont", _labelFont);
	
		String s = "";
		for (int n = 0; n < ranges.size(); n++) {
			Range r = (Range) ranges.get(n);
			s += r.toString() + ",";
		}
		s = s.substring(0, s.length() - 1);
		s += "";

		render(renderer, "serie", "[" + s + "]");

	}

	@Override
	public void update() {
		smartUpdate("plot", true,false);
	}

	private class Range {
		String color;
		String label;

		public Range(String color, String label) {
			this.label = label;
			this.color = color;
		}

		public String toString() {
			return "{ label:'" + label + "',color: '" + color + "'}";
		}
	}

}
