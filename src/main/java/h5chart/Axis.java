/*******************************************************************************
 * File: Axis.java 
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

public class Axis extends MDGraphOneSerie {
	
	public static final String ORIENTATION_HORIZONTAL="horizontal";
	public static final String ORIENTATION_VERTICAL="vertical";
	
	public static final String TICK_POSITION_UNDER="under";
	public static final String TICK_POSITION_OVER="over";
		
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	private double _lineWidth= 2;

	public double getLineWidth() {
		return _lineWidth;
	}

	public void setLineWidth(double lineWidth) {
		if (_lineWidth!=lineWidth) {
			_lineWidth = lineWidth;
			smartUpdate("lineWidth", _lineWidth);
		}
	}

	private double _labelsWidth= 0;

	public double getLabelsWidth() {
		return _labelsWidth;
	}

	public void setLabelsWidth(double labelsWidth) {
		if (_labelsWidth!=labelsWidth) {
			_labelsWidth = labelsWidth;
			smartUpdate("labelsWidth", _labelsWidth);
		}
	}

	private double _labelsAngle= 0;

	public double getLabelsAngle() {
		return _labelsAngle;
	}

	public void setLabelsAngle(double labelsAngle) {
		if (_labelsAngle!=labelsAngle) {
			_labelsAngle = labelsAngle;
			smartUpdate("labelsAngle", _labelsAngle);
		}
	}
	
	private String _labelsOnTick="false";
	
	public boolean isLabelsOnTick() {
		return new Boolean(_labelsOnTick);
	}

	public void setLabelsOnTick(boolean labelsOnTick) {
		String an=Boolean.toString(labelsOnTick);
		if(!_labelsOnTick.equals(an)){
			_labelsOnTick = an;
			smartUpdate("labelsOnTick", _labelsOnTick);
		}
	}
			
	private String _tickPosition= TICK_POSITION_UNDER;
	
	public String getTickPosition() {
		return _tickPosition;
	}

	public void setTickPosition(String tickposition) {
		if(!_tickPosition.equals(tickposition)){
			_tickPosition=tickposition;
			smartUpdate("tickPosition", _tickPosition);
		}
	}
	
	private String _orientation= ORIENTATION_HORIZONTAL;
	
	public String getOrientation() {
		return _orientation;
	}

	public void setOrientation(String orientation) {
		if(!_orientation.equals(orientation)){
			_orientation=orientation;
			smartUpdate("orientation", _orientation);
		}
	}
			
	public Axis() {
		super();
	}
	
	public void addValue(String label){
		super.addValue(0d, label);
	}
		
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
				
		render(renderer, "orientation", _orientation);
		render(renderer, "labelsOnTick", _labelsOnTick);
		render(renderer, "labelsWidth", _labelsWidth);
		render(renderer, "labelsAngle", _labelsAngle);
		render(renderer, "lineWidth", _lineWidth);
		render(renderer, "tickPosition", _tickPosition);
				
	}
	
	@Override
	public String getSerieString(){
		String s="";
		for(int n=0;n<values.size();n++){
			Range r=(Range)values.get(n);
			s+="'"+r.label+"',";
		}
		s="["+s.substring(0, s.length()-1)+"]";
		return s;
	}
	
	
}


