/*******************************************************************************
 * File: PieTest.java 
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

public class PieTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		Pie t=new Pie();
		t.setLeft("5");
		t.setTop("5");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(true);
		t.setPizza(false);
		t.setAnimateType(Pie.ANIMATION_RADIAL);
		t.setShowValues(true);
		t.setShowTooltip(true);
		
		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");
		t.setLabelMask("function(val){ return 'Label: '+val }");
		
		t.setTooltipFont("12px Arial");
		t.setTooltipColor("red");
		t.setTooltipMask("function(val){ return Math.round(val/80*100)+'%'; }");
		
		
		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");
		
		return t;
	}

}
