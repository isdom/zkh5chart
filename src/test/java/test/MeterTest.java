/*******************************************************************************
 * File: MeterTest.java 
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

import h5chart.H5ChartChildren;
import h5chart.Map;
import h5chart.Meter;

public class MeterTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		Meter t=new Meter();
		t.setLeft("0");
		t.setTop("0");
		t.setBarSize(30);
		t.setWidth("50");
		t.setHeight("150");
		t.setCurrent(45);
		t.setAnimate(true);
		t.setCapacity(true);
		
		t.setMax(100);
		t.setMin(0);
		t.setIntervals(10);
		
		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");
		t.setLabelMask("function(val){ return '$'+val }");
		
		t.setTooltipFont("bold 12px Arial");
		t.setTooltipColor("black");
		t.setTooltipMask("function(val){ return '$'+val }");
		
		t.setCurrentFont("bold 12px Arial");
		t.setCurrentColor("red");
		t.setCurrentMask("function(val){ return '$'+val }");
		
		t.addRange(10d, "#00FA00");
		t.addRange(20d, "#8A8A00");
		t.addRange(100d, "#FA0000");
		
		return t;
	}

}
