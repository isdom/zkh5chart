/*******************************************************************************
 * File: RectangleTest.java 
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
import h5chart.Rectangle;

public class RectangleTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		Rectangle t = new Rectangle();

		t.setLeft("10");
		t.setTop("10");
		t.setWidth("150");
		t.setHeight("80");

		t.setColor("green");
		t.setFillStyle(Rectangle.FILL_VLINEAR);
		t.setEndColor("white");
		t.setBorderColor("red");
		t.setBorderStyle(Rectangle.BORDER_SOLID);
		t.setBorderWidth(1);
		t.setShadow(true);
		t.setRadius(10);

		return t;

	}

}
