/*******************************************************************************
 * File: RingTest.java 
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
import h5chart.Pie;
import h5chart.Ring;

public class RingTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		Ring t=new Ring();
		t.setLeft("5");
		t.setTop("5");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(true);
		t.setPizza(false);
		t.setAnimateType(Ring.ANIMATION_LINEAR);
		t.setShowValues(true);
		t.setShowTooltip(true);
		
		t.setLabelFont("bold 10px Arial");
		t.setLabelColor("grey");
		t.setLabelMask("function(val){ return 'Label: '+val }");
		
		t.setTooltipFont("bold 10px Arial");
		t.setTooltipColor("black");
		t.setTooltipMask("function(val){ return 'Ttip: '+val }");
		
		
		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");
		
		return t;
	}

}
