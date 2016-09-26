/*******************************************************************************
 * File: H5Chart.java 
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

import org.zkoss.zk.ui.HtmlBasedComponent;

public class H5Chart extends HtmlBasedComponent {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String _regionManager="false";
	
	public boolean isRegionManager() {
		return new Boolean(_regionManager);
	}

	public void setRegionManager(boolean regionManager) {
		String an=Boolean.toString(regionManager);
		if(!_regionManager.equals(an)){
			_regionManager = an;
			smartUpdate("regionManager", _regionManager);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "regionManager", true);
	}
	
}
