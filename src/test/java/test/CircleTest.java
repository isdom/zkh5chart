/*******************************************************************************
 * File: CircleTest.java 
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

import h5chart.Circle;
import h5chart.CircleSection;
import h5chart.H5ChartChildren;

public class CircleTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
			Circle t=new Circle();
			
			t.setLeft("0");
			t.setTop("0");
			t.setWidth("80");
			t.setHeight("80");
			
			t.setColor("green");
			t.setEndColor("yellow");
			t.setFillStyle(CircleSection.FILL_LIGHT);
			t.setEndColor("white");
			t.setBorderStyle(CircleSection.BORDER_SOLID);
			t.setBorderWidth(1);
			t.setShadow(true);
			t.setRadius(80);
						
			return t;

	}

}
