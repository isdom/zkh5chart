/*******************************************************************************
 * File: Pie.java 
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

public class Pie extends MDGraphOneSerie {
	
	public static final String ANIMATION_RADIAL="radial";
	public static final String ANIMATION_LINEAR="linear";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
				
	private String _pizza= "false";
	
	public boolean isPizza() {
		return new Boolean(_pizza);
	}

	public void setPizza(boolean pizza) {
		String an=Boolean.toString(pizza);
		if(!_pizza.equals(an)){
			_pizza = an;
			smartUpdate("pizza", _pizza);
		}
	}
	
	private String _animateType= ANIMATION_RADIAL;

	public String getAnimateType() {
		return _animateType;
	}

	public void setAnimateType(String animateType) {
		if(!_animateType.equalsIgnoreCase(animateType)){
			_animateType = animateType;
			smartUpdate("animateType", _animateType);
		}
	}
					
	public Pie() {
		super();
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "animateType", _animateType);
		render(renderer, "pizza", _pizza);
		

	}
	
}


