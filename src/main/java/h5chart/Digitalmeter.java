/*******************************************************************************
 * File: Digitalmeter.java 
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

public class Digitalmeter extends OneDimensionGraph {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	private int _digits;
	private int _decimals;
	private int _animateCounter;
	
	private String _background="";
	private String _signed="";

	public Digitalmeter() {
		super();
	}
	
	public int getDigits() {
		return _digits;
	}

	public void setDigits(int digits) {
		if(_digits!=digits){
			_digits = digits;
			smartUpdate("digits", _digits);
		}
	}

	public int getDecimals() {
		return _decimals;
	}

	public void setDecimals(int decimals) {
		if(_decimals!=decimals){
			_decimals = decimals;
			smartUpdate("decimals", _decimals);
		}
		
	}

	public int getAnimateCounter() {
		return _animateCounter;
	}

	public void setAnimateCounter(int animateCounter) {
		if(_animateCounter!=animateCounter){
			_animateCounter = animateCounter;
			smartUpdate("animateCounter", _animateCounter);
		}
	}

	public boolean isSigned() {
		return new Boolean(_signed);
	}

	public void setSigned(boolean signed) {
		String an=Boolean.toString(signed);
		if(!_signed.equals(an)){
			_signed = an;
			smartUpdate("signed", _signed);
		}
	}
	
	public boolean isBackground() {
		return new Boolean(_background);
	}

	public void setBackground(boolean background) {
		String an=Boolean.toString(background);
		if(!_background.equals(an)){
			_background = an;
			smartUpdate("background", _background);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "digits", _digits);
		render(renderer, "decimals", _decimals);
		render(renderer, "signed", _animate);
		render(renderer, "background", _background);
		render(renderer, "animateCounter", _animateCounter);
	}

}