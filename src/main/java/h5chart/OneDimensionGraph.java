/*******************************************************************************
 * File: OneDimensionGraph.java 
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

public abstract class OneDimensionGraph extends H5ChartGraph {

	public OneDimensionGraph() {
		this.ranges=new ArrayList();
	}
	
	protected double _current;
	
	public double getCurrent() {
		return _current;
	}

	public void setCurrent(double current) {
		if(_current!=current){
			_current = current;
			smartUpdate("current", current,false);
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
	
	protected double _max;
		
	public double getMax() {
		return _max;
	}

	public void setMax(double max) {
		if(_max!=max){
			_max = max;
			smartUpdate("max", _max);
		}
	}

	protected double _min;
	
	public double getMin() {
		return _min;
	}

	public void setMin(double min) {
		if(_min!=min){
			_min = min;
			smartUpdate("min", _min);
		}
		
	}

	protected int _intervals=10;
	
	public int getIntervals() {
		return _intervals;
	}

	public void setIntervals(int intervals) {
		if(_intervals!=intervals){
			_intervals = intervals;
			smartUpdate("intervals", _intervals);
		}
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "min", _min);
		render(renderer, "max", _max);
		render(renderer, "intervals", _intervals);
		render(renderer, "current", _current);
		
		String s="";
		for(int n=0;n<ranges.size();n++){
			Object r=(Object)ranges.get(n);
			s+=r.toString()+",";
		}
		s=s.substring(0, Math.max(0,s.length()-1));
		s+="";
		
		render(renderer, "ranges", "["+s+"]");
		
		render(renderer, "currentColor", _currentColor);
		render(renderer, "currentFont", _currentFont);
		render(renderer, "currentMask", _currentMask);
				
	}
	
	protected List ranges;
	
	public void addRange(Double value, String color, String blink){
		ranges.add(new Range(value,color,blink));
	}
	
	public void removeRange(int index){
		ranges.remove(index);
	}
	
	public void clearRanges(){
		ranges.clear();
	}
			
	public class Range{
		Double value;
		String color;
		String blink;
		
		public Range(Double value,String color,String blink) {
			this.value=value;
			this.color=color;
			this.blink=blink;
		}
		
		public String toString(){
			String bl="false";
			if(this.blink.equalsIgnoreCase("true"))
				bl="true";
			return "{ value:" + value + ",color: '"  + color + "',blink:" + bl + "}";
		}
	}
	
}
