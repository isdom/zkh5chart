/*******************************************************************************
 * File: Signal.java 
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


public class Signal extends OneDimensionGraph {
	
	public static final String VERTICAL="vertical";
	public static final String HORIZONTAL="horizontal";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	public Signal() {
		super();
	}
	
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
	
	private String _single="false";
	
	public boolean isSingle() {
		return new Boolean(_single);
	}

	public void setSingle(boolean single) {
		String an=Boolean.toString(single);
		if(!_single.equals(an)){
			_single = an;
			smartUpdate("single", _single);
		}
	}
	
	private int _animateCounter=3;

	public int getAnimateCounter() {
		return _animateCounter;
	}

	public void setAnimateCounter(int counter) {
		if(_animateCounter!=counter){
			_animateCounter = counter;
			smartUpdate("animateCounter", _animateCounter);
		}
	}
		
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "orientation", _orientation);
		render(renderer, "animateCounter", _animateCounter);
		render(renderer, "single", _single);
		

	}
}


