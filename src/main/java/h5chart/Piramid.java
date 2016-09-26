/*******************************************************************************
 * File: Piramid.java 
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

public class Piramid extends MDGraphOneSerie {
	
	public static final String DISTRIBUTION_HEIGHT="height";
	public static final String DISTRIBUTION_AREA="area";
	
	public static final String ORIENTATION_UP="up";
	public static final String ORIENTATION_DOWN="down";
	
	public static final String LABELS_NONE="none";
	public static final String LABELS_BOTH="both";
	public static final String LABELS_ONLY="labels";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
		
	private String _distribution= DISTRIBUTION_HEIGHT;
	
	public String getDistribution() {
		return _distribution;
	}

	public void setDistribution(String distribution) {
		if(!_distribution.equals(distribution)){
			_distribution=distribution;
			smartUpdate("distribution", _distribution);
		}
	}
	
	private String _orientation= ORIENTATION_UP;
	
	public String getOrientation() {
		return _orientation;
	}

	public void setOrientation(String orientation) {
		if(!_orientation.equals(orientation)){
			_orientation=orientation;
			smartUpdate("orientation", _orientation);
		}
	}
	
	private String _labelsMode= LABELS_NONE;
	
	public String getLabelsMode() {
		return _labelsMode;
	}

	public void setLabelsMode(String labelsMode) {
		if(!_labelsMode.equals(labelsMode)){
			_labelsMode=labelsMode;
			smartUpdate("labelsMode", _labelsMode);
		}
	}
						
	public Piramid() {
		super();
	}
			
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "orientation", _orientation);
		render(renderer, "labelsMode", _labelsMode);
		render(renderer, "distribution", _distribution);
		
	}
	
}


