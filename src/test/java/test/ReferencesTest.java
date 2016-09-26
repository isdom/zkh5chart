/*******************************************************************************
 * File: ReferencesTest.java 
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
import h5chart.References;

public class ReferencesTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		References t = new References();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("150");
		t.setShadow(true);
		t.setBackground(true);
		t.setBackgroundColor("white");
		t.setBorderColor("grey");
		t.setShadow(true);
		t.setOrder(References.ORDER_NATURAL);
		
		t.addRange("#008000", "value 1");
		t.addRange("#808000", "value 2");
		t.addRange("#800000", "value 3");
						
		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");
				
		return t;
	}

}
