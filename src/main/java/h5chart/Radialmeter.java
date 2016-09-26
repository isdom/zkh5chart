/*******************************************************************************
 * File: Radialmeter.java 
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

public class Radialmeter extends OneDimensionGraph {
	
	public static final String FILL_CILINDER="cilinder";
	public static final String FILL_LINEAR="linear";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	public static final String RULE_POSITION_IN="in";
	public static final String RULE_POSITION_OUT="out";
	
	private double _startAngle= 135;
	
	public double getStartAngle() {
		return _startAngle;
	}

	public void setStartAngle(double startAngle) {
		if(_startAngle!=startAngle){
			_startAngle = startAngle;
			smartUpdate("startAngle", _startAngle);
		}
	}
	
	private double _endAngle= 405;
	
	public double getEndAngle() {
		return _endAngle;
	}

	public void setEndAngle(double endAngle) {
		if(_endAngle!=endAngle){
			_endAngle = endAngle;
			smartUpdate("endAngle", _endAngle);
		}
	}
		
	private String _rulePosition= RULE_POSITION_IN;
	
	public String getRulePosition() {
		return _rulePosition;
	}

	public void setRulePosition(String rulePosition) {
		if(!_rulePosition.equalsIgnoreCase(rulePosition)){
			_rulePosition = rulePosition;
			smartUpdate("orientation", _rulePosition);
		}
	}
	
	private int _ruleInterval= 1;
	
	public int getRuleInterval() {
		return _ruleInterval;
	}

	public void setRuleInterval(int intervals) {
		if(_ruleInterval!=intervals){
			_ruleInterval = intervals;
			smartUpdate("ruleInteral", _ruleInterval);
		}
	}
	
	private String _color= "#B0B040";
	
	public String getIndicatorColor() {
		return _color;
	}

	public void setIndicatorColor(String color) {
		if(!_color.equalsIgnoreCase(color)){
			_color = color;
			smartUpdate("indicatorColor", _color);
		}
	}
	
	private String _fillStyle=FILL_CILINDER;
	
	public String getFillStyle() {
		return _fillStyle;
	}

	public void setFillStyle(String fillStyle) {
		if(!_fillStyle.equalsIgnoreCase(fillStyle)){
			_fillStyle = fillStyle;
			smartUpdate("fillStyle", _fillStyle);
		}
	}
	
	private String _capacity= "true";
	
	public boolean isCapacity() {
		return new Boolean(_capacity);
	}

	public void setCapacity(boolean capacity) {
		String an=Boolean.toString(capacity);
		if(!_capacity.equals(an)){
			_capacity = an;
			smartUpdate("capacity", _capacity);
		}
	}
	
	private String _ringStyle= "false";
	
	public boolean isRingStyle() {
		return new Boolean(_ringStyle);
	}

	public void setRingStyle(boolean ringStyle) {
		String an=Boolean.toString(ringStyle);
		if(!_ringStyle.equals(an)){
			_ringStyle = an;
			smartUpdate("ringStyle", _ringStyle);
		}
	}
		
	public Radialmeter() {
		super();
	}
	
	public void addRange(Double value, String color){
		ranges.add(new Range(value,color,""));
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "startAngle", _startAngle);
		render(renderer, "endAngle", _endAngle);
		render(renderer, "rulePosition", _rulePosition);
		render(renderer, "ruleInterval", _ruleInterval);
		render(renderer, "ringStyle", _ringStyle);
		render(renderer, "indicatorColor", _color);
		render(renderer, "fillStyle", _fillStyle);
		render(renderer, "capacity", _capacity);
	
	}
	
}


