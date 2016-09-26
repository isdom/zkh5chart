/*******************************************************************************
 * File: h5ImageTest.java 
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
import h5chart.h5Image;

public class h5ImageTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		h5Image t=new h5Image();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("150");
		t.setHeight("50");
		t.setSourceType(h5Image.SOURCE_SRC);
		t.setSrc("../img/pie_ring.jpg");
		
		return t;
	}

}
