/*******************************************************************************
 * File: Map.java 
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

public class Map extends Shape {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	private double _alpha= 1;

	public double getAlpha() {
		return _alpha;
	}

	public void setAlpha(double alpha) {
		if (_alpha!=alpha) {
			_alpha = alpha;
			smartUpdate("alpha", _alpha);
		}
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

	private String _labelFont= "11px Arial";

	public String getLabelFont() {
		return _labelFont;
	}

	public void setLabelFont(String labelFont) {
		if(!_labelFont.equalsIgnoreCase(labelFont)){
			_labelFont = labelFont;
			smartUpdate("labelFont", _labelFont);
		}
	}
	
	private String _labelColor= "grey";
	
	public String getLabelColor() {
		return _labelColor;
	}

	public void setLabelColor(String labelColor) {
		if(!_labelColor.equalsIgnoreCase(labelColor)){
			_labelColor = labelColor;
			smartUpdate("labelColor", _labelColor);
		}
	}
		
	private String _label="";
	
	public String getLabel() {
		return _label;
	}

	public void setLabel(String label) {
		if(!_label.equals(label)){
			_label=label;
			smartUpdate("label", _label);
		}
	}

	private String _value="";
	
	public String getValue() {
		return _label;
	}

	public void setValue(String value) {
		if(!_value.equals(value)){
			_value=value;
			smartUpdate("value", _value);
		}
	}
	private List points;
					
	public Map() {
		points=new ArrayList();
	}
	
	public void addPoint(double x,double y){
		points.add(new Point(x,y));
	}
	
	public void removePoint(int index){
		points.remove(index);
	}
	
	public void clearPoints(){
		points.clear();
	}
		
	@Override
	public void update() {
		smartUpdate("plot", true,false);
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "animate", _animate);
		render(renderer, "labelColor", _labelColor);
		render(renderer, "labelFont", _labelFont);
		render(renderer, "value", _value);
		render(renderer, "label", _label);
		render(renderer, "alpha", _alpha);
				
		String s="";
		for(int n=0;n<this.points.size();n++){
			Point point=(Point)points.get(n);
			s+="new Point("+point.x+","+point.y+"),";
		}
		s=s.substring(0, s.length()-1);
		s+="";
		
		render(renderer, "points", "["+s+"]");
		
	}
	
	class Point {
		public double x;
		public double y;
		
		public Point(double x,double y) {
			this.x=x;
			this.y=y;
		}
		
	}
	
}