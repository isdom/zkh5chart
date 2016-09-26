/*******************************************************************************
 * File: MapTest.java 
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

public class MapTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		Map t=new Map();
		t.setLeft("0");
		t.setTop("0");
		t.setAnimate(true);
		
		t.setBorderColor("grey");
		t.setBorderWidth(4);
		t.setAlpha(0.5);
		t.setBorderStyle(H5ChartChildren.BORDER_SOLID);
		t.setFillStyle(H5ChartChildren.FILL_VLINEAR);
		t.setColor("red");
		t.setEndColor("yellow");
		
		t.setLabel("Triangle test");
		t.setValue("10");
						
		t.setTooltipFont("bold 10px Arial");
		t.setTooltipColor("red");
		t.setTooltipMask("function(val){ return 'Ttip: '+val }");
				
		t.addPoint(100,100);
		t.addPoint(100,200);
		t.addPoint(200,150);
		t.addPoint(100,100);
		
		return t;
	}

}
