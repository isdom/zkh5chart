/*******************************************************************************
 * File: LineTest.java 
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
import h5chart.Line;
import h5chart.Rectangle;

public class LineTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
			Line t=new Line();
			
			t.setLeft("10");
			t.setTop("10");
			t.setX1("150");
			t.setY1("80");
			
			t.setColor("green");
			t.setBorderStyle(Rectangle.BORDER_SOLID);
			t.setBorderWidth(3);
			t.setShadow(true);
			
			return t;

	}

}
