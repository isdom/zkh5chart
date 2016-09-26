/*******************************************************************************
 * File: MultigraphTest.java 
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
import h5chart.Multigraph;
import h5chart.Pie;
import h5chart.Piramid;
import h5chart.Serie;

public class MultigraphTest extends H5ChartChildrenTest {

	@Override
	public H5ChartChildren getObject() {
		Multigraph t=new Multigraph();
		t.setLeft("10");
		t.setTop("10");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(false);
		//t.setOrientation(Piramid.ORIENTATION_DOWN);
		t.setMarks(true);
		t.setShowTooltip(true);
		t.setShowValues(true);
		t.setGrid(true);
		
		t.addLabel("Jan 2011");
		t.addLabel("Feb 2011");
		t.addLabel("Mar 2011");
		t.addLabel("Apr 2011");
		
		t.addSerie(Multigraph.TYPE_BAR, "Serie 1", Multigraph.FILL_VLINEAR, 1, true);
		Serie s=t.getSerie(0);
		s.add(10);
		s.add(20);
		s.add(30);
		s.add(15);
		s.setTooltipColor("blue");
		s.setTooltipFont("11px Arial");
		s.setTooltipMask("function(val){ return (parseInt(val)/100)+'%';  }");
		
		t.addSerie(Multigraph.TYPE_BAR, "Serie 2", Multigraph.FILL_VLINEAR, 1, true);
		s=t.getSerie(1);
		s.add(8);
		s.add(25);
		s.add(14);
		s.add(18);
		
		t.addSerie(Multigraph.TYPE_LINE, "Serie 3", Multigraph.FILL_VLINEAR, 5, true);
		s=t.getSerie(2);
		s.add(14);
		s.add(8);
		s.add(25);
		s.add(33);
				
		t.setShowValues(true);
		t.setShowTooltip(true);
		
		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");
		
		return t;
	}

}
