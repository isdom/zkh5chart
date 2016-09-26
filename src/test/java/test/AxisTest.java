/*******************************************************************************
 * File: AxisTest.java 
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

package test;

import h5chart.Axis;
import h5chart.H5ChartChildren;

public class AxisTest extends H5ChartChildrenTest{

	public H5ChartChildren getObject(){
		Axis t=new Axis();
		t.setLeft("50");
		t.setTop("50");
		t.setWidth("200");
		t.setHeight("50");
		t.setAnimate(true);
		t.setShadow(true);
		t.setLabelFont("bold 10px Arial");
		t.setLabelColor("grey");
		t.setOrientation(Axis.ORIENTATION_HORIZONTAL);
		t.setLineWidth(2);
		t.setLabelsWidth(30);
		t.setLabelsAngle(90);
		t.setLabelsOnTick(false);
		t.setTickPosition(Axis.TICK_POSITION_UNDER);
		
		t.addValue("Test other 10");
		t.addValue("20");
		t.addValue("30");
		
		return t;
	}

	
	
	
	
}
