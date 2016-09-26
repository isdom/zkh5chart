/*******************************************************************************
 * File: H5ChartGraph.java 
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

public abstract class H5ChartGraph extends H5ChartChildren {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected String _labelFont= "11px Arial";

	public String getLabelFont() {
		return _labelFont;
	}

	public void setLabelFont(String labelFont) {
		if(!_labelFont.equalsIgnoreCase(labelFont)){
			_labelFont = labelFont;
			smartUpdate("labelFont", _labelFont);
		}
	}
	
	protected String _labelColor= "grey";
	
	public String getLabelColor() {
		return _labelColor;
	}

	public void setLabelColor(String labelColor) {
		if(!_labelColor.equalsIgnoreCase(labelColor)){
			_labelColor = labelColor;
			smartUpdate("labelColor", _labelColor);
		}
	}
	
	protected String _labelMask= DEFAULT_MASK;
	
	public String getLabelMask() {
		return _labelMask;
	}

	public void setLabelMask(String labelMask) {
		if(!_labelMask.equalsIgnoreCase(labelMask)){
			_labelMask = labelMask;
			smartUpdate("labelMask", _labelMask);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "labelColor", _labelColor);
		render(renderer, "labelFont", _labelFont);
		render(renderer, "labelMask", _labelMask);
		
	}
}
