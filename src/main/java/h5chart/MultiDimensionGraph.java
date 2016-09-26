/*******************************************************************************
 * File: MultiDimensionGraph.java 
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

public abstract class MultiDimensionGraph extends H5ChartGraph {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected String _showValues="";
	
	public boolean isShowValues() {
		return new Boolean(_showValues);
	}

	public void setShowValues(boolean showValues) {
		String an=Boolean.toString(showValues);
		if(!_showValues.equals(an)){
			_showValues = an;
			smartUpdate("showValues", _showValues);
		}
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "showValues", _showValues);
			
	}
	
}
