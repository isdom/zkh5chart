/*******************************************************************************
 * File: Vumeter.java 
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

public class Vumeter extends H5ChartGraph {
	
	public static final String VERTICAL="vertical";
	public static final String HORIZONTAL="horizontal";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	private String _background= "true";
	
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
	
	
	private double _min= 0 ;

	public double getMin() {
		return _min;
	}

	public void setMin(double min) {
		if(_min!=min){
			_min = min;
			smartUpdate("min", _min);
		}
		
	}

	private int _xpoints=1;
	
	public int getXpoints() {
		return _xpoints;
	}

	public void setXpoints(int points) {
		if(_xpoints!=points){
			_xpoints = points;
			smartUpdate("xpoints", _xpoints);
		}
	}

	private int _ypoints=10;
	
	public int getYpoints() {
		return _ypoints;
	}

	public void setYpoints(int points) {
		if(_ypoints!=points){
			_ypoints = points;
			smartUpdate("ypoints", _ypoints);
		}
	}
			
	private String _orientation=VERTICAL;
	
	public String getOrientation() {
		return _orientation;
	}

	public void setOrientation(String orientation) {
		if(!_orientation.equalsIgnoreCase(orientation)){
			_orientation = orientation;
			smartUpdate("orientation", _orientation);
		}
	}
	
	protected String _currentFont= "bold 12px Arial ";
	
	public String getCurrentFont() {
		return _currentFont;
	}

	public void setCurrentFont(String currentFont) {
		if(!_currentFont.equalsIgnoreCase(currentFont)){
			_currentFont = currentFont;
			smartUpdate("currentFont", _currentFont);
		}
	}

	protected String _currentColor= "grey";

	public String getCurrentColor() {
		return _currentColor;
	}

	public void setCurrentColor(String currentColor) {
		if(!_currentColor.equalsIgnoreCase(currentColor)){
			_currentColor = currentColor;
			smartUpdate("currentColor", _currentColor);
		}
	}
	
	protected String _currentMask= DEFAULT_MASK;

	public String getCurrentMask() {
		return _currentMask;
	}

	public void setCurrentMask(String currentMask) {
		if(!_currentMask.equalsIgnoreCase(currentMask)){
			_currentMask = currentMask;
			smartUpdate("currentMask", _currentMask);
		}
	}
	
	private List ranges;
					
	public Vumeter() {
		ranges=new ArrayList();
	}
	
	public void addRange(Double value, String color){
		ranges.add(new Range(value,color));
	}
	
	public void removeRange(int index){
		ranges.remove(index);
	}
	
	public void clearRanges(){
		ranges.clear();
	}
	
	private String _animate="";
	
	public boolean isAnimate() {
		return new Boolean(_animate);
	}

	public void setAnimate(boolean animate) {
		String an=Boolean.toString(animate);
		if(!_animate.equals(an)){
			_animate = an;
			smartUpdate("animate", _animate);
		}
	}

	private Object _current="";
	
	
	public Object getCurrent() {
		return _current;
	}

	public void setCurrent(String current) {
		if(!_current.equals(current)){
			_current = current;
			smartUpdate("current", current,false);
		}
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "min", _min);
		render(renderer, "background", _background);
		render(renderer, "xpoints", _xpoints);
		render(renderer, "ypoints", _ypoints);
		render(renderer, "orientation", _orientation);
		render(renderer, "animate", _animate);
		render(renderer, "current", _current);
		render(renderer, "currentMask", _currentMask);
		render(renderer, "currentFont", _currentFont);
		render(renderer, "currentColor", _currentColor);
		
		String s="";
		for(int n=0;n<ranges.size();n++){
			Range r=(Range)ranges.get(n);
			s+=r.toString()+",";
		}
		s=s.substring(0, s.length()-1);
		s+="";
		
		render(renderer, "ranges", "["+s+"]");

	}

	private class Range{
		Double value;
		String color;
		
		public Range(Double value,String color) {
			this.value=value;
			this.color=color;
		}
		
		public String toString(){
			return "{ value:" + value + ",color: '"  + color + "'}";
		}
	}
}


