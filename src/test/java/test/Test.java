/*******************************************************************************
 * File: Test.java 
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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import h5chart.Axis;
import h5chart.Circle;
import h5chart.CircleSection;
import h5chart.Digitalmeter;
import h5chart.Funnel;
import h5chart.H5Chart;
import h5chart.H5ChartChildren;
import h5chart.Ledmeter;
import h5chart.Line;
import h5chart.Map;
import h5chart.Meter;
import h5chart.Multigraph;
import h5chart.Pie;
import h5chart.Piramid;
import h5chart.Radialmeter;
import h5chart.Rectangle;
import h5chart.References;
import h5chart.Ring;
import h5chart.Serie;
import h5chart.Signal;
import h5chart.Stack;
import h5chart.Text;
import h5chart.Thermometer;
import h5chart.Vumeter;
import h5chart.h5Image;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Desktop;
import org.zkoss.zk.ui.GenericRichlet;
import org.zkoss.zk.ui.Page;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.EventListener;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.ui.util.DesktopCleanup;
import org.zkoss.zul.Combobox;
import org.zkoss.zul.Comboitem;
import org.zkoss.zul.Textbox;
import org.zkoss.zul.Vbox;
import org.zkoss.zul.Window;

public class Test extends GenericRichlet {

	private H5ChartChildren t;
	private Textbox txt;
	private Component current;
	private H5Chart chart;

	@Override
	public void service(Page arg0) throws Exception {

		Page page = arg0;

		page.setTitle("Test");
		Window window = new Window("Test", "", false);
		window.setWidth("600px");
		window.setHeight("600px");
		window.setPage(page);

		chart = new H5Chart();
		chart.setWidth("300");
		chart.setHeight("300");
		chart.setRegionManager(true);

		Vbox b = new Vbox();
		window.appendChild(b);

		Combobox cb = getCombo();
		b.appendChild(cb);
		b.appendChild(chart);

		window.appendChild(b);
		window.getDesktop().addListener(new DesktopCleanup() {

			@Override
			public void cleanup(Desktop arg0) throws Exception {

				Collection col = arg0.getComponents();
				List l = new ArrayList(col);
				for (Iterator<Component> it = l.iterator(); it.hasNext();) {
					Component com = it.next();
					com.detach();
				}
				l = null;
				current = null;

			}
		});

	}

	public Combobox getCombo() {
		Combobox cb = new Combobox();
		cb.setWidth("150px");
		String s[] = new String[] { "Axis", "CircleSection", "Circle",
				"DigitalMeter", "Funnel", "h5Image", "Ledmeter", "Line", "Map",
				"Meter","Multigraph","Pie", "Piramid", "Rectangle","References", "Radialmeter","Ring", "Signal",
				"Stack", "Text", "Thermometer", "Vumeter" };
		for (int n = 0; n < s.length; n++)
			cb.appendItem(s[n]);

		cb.addEventListener(Events.ON_SELECT, new EventListener() {

			@Override
			public void onEvent(Event arg0) throws Exception {
				if (current != null) {
					chart.removeChild(current);
					current.detach();
					current = null;
				}
				Comboitem ci = ((Combobox) arg0.getTarget()).getSelectedItem();
				H5ChartChildrenTest t = H5ChartChildrenTest
						.getObjectInstance("test." + ci.getLabel() + "Test");
				current = t.getObject();
				chart.appendChild(current);
			}
		});

		return cb;
	}

	public void testMultigraph() {

		Multigraph t = new Multigraph();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(false);
		t.setOrientation(Piramid.ORIENTATION_DOWN);
		t.setMarks(true);
		t.setShowTooltip(true);
		t.setShowValues(true);
		t.setGrid(true);

		t.addLabel("Jan 2011");
		t.addLabel("Feb 2011");
		t.addLabel("Mar 2011");
		t.addLabel("Apr 2011");

		t.addSerie(Multigraph.TYPE_BAR, "Serie 1", Multigraph.FILL_VLINEAR, 1,
				true);
		Serie s = t.getSerie(0);
		s.add(10);
		s.add(20);
		s.add(30);
		s.add(15);

		t.addSerie(Multigraph.TYPE_BAR, "Serie 2", Multigraph.FILL_VLINEAR, 1,
				true);
		s = t.getSerie(1);
		s.add(8);
		s.add(25);
		s.add(14);
		s.add(18);

		t.addSerie(Multigraph.TYPE_LINE, "Serie 3", Multigraph.FILL_VLINEAR, 5,
				true);
		s = t.getSerie(2);
		s.add(14);
		s.add(8);
		s.add(25);
		s.add(33);

		this.t = t;

	}

	public void testAxis() {

		Axis t = new Axis();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("50");
		t.setAnimate(true);

		t.setShadow(true);
		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");
		t.setOrientation(Signal.HORIZONTAL);
		t.setLineWidth(2);
		t.setLabelsWidth(30);
		t.setLabelsAngle(90);
		t.setLabelsOnTick(false);

		t.addValue("Test other 10");
		t.addValue("20");
		t.addValue("30");

		this.t = t;

	}

	public void testMap() {

		Map t = new Map();
		t.setLeft("0");
		t.setTop("0");
		t.setAnimate(true);

		t.setBorderColor("grey");
		t.setBorderWidth(4);
		t.setAlpha(0.5);
		// t.setBorderStyle(Map.BORDER_STYLE_SOLID);
		// t.setFillStyle(Map.FILL_STYLE_SOLID);
		t.setColor("red");

		t.setLabel("Triangle test");
		t.setValue("");

		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");

		t.addPoint(100, 100);
		t.addPoint(100, 200);
		t.addPoint(200, 150);
		t.addPoint(100, 100);

		this.t = t;

	}

	public void testReferences() {
		References t = new References();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("150");
		t.setShadow(true);
		t.setLabelFont("bold 12px Arial");
		t.setLabelColor("grey");
		t.setBackground(true);
		t.setBackgroundColor("white");
		t.setBorderColor("grey");
		t.setShadow(true);
		t.addRange("#008000", "value 1");
		t.addRange("#808000", "value 2");
		t.addRange("#800000", "value 3");
		t.setOrder("rows");
		this.t = t;
	}

	public void testText() {
		Text t = new Text();
		t.setLeft("0");
		t.setTop("0");
		t.setColor("green");
		t.setShadow(true);
		t.setFont("bold 20px Arial");
		t.setText("Testing text");
		this.t = t;
	}

	public void testLine() {
		Line t = new Line();

		t.setLeft("10");
		t.setTop("10");
		t.setX1("150");
		t.setY1("80");

		t.setColor("green");
		t.setBorderStyle(Rectangle.BORDER_SOLID);
		t.setBorderWidth(3);
		t.setShadow(true);

		this.t = t;
	}

	public void testRectangle() {
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

		this.t = t;
	}

	public void testCircleSection() {
		CircleSection t = new CircleSection();

		t.setLeft("0");
		t.setTop("0");
		t.setWidth("80");
		t.setHeight("80");

		t.setColor("green");
		t.setFillStyle(CircleSection.FILL_CILINDER);
		t.setEndColor("white");
		t.setBorderStyle(CircleSection.BORDER_SOLID);
		t.setBorderWidth(1);
		t.setShadow(true);
		t.setRadius(80);
		t.setRadius1(30);
		t.setStartAngle(0);
		t.setEndAngle(360);

		this.t = t;
	}

	public void testCircle() {
		CircleSection t = new CircleSection();

		t.setLeft("0");
		t.setTop("0");
		t.setWidth("80");
		t.setHeight("80");

		t.setColor("green");
		t.setFillStyle(CircleSection.FILL_CILINDER);
		t.setEndColor("white");
		t.setBorderStyle(Circle.BORDER_SOLID);
		t.setBorderWidth(1);
		t.setShadow(true);
		t.setRadius(80);

		this.t = t;
	}

	public void testVumeter() {

		Vumeter t = new Vumeter();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setCurrent("10,15,50");
		t.setXpoints(3);
		t.setYpoints(10);
		t.setAnimate(true);
		t.setBackground(true);
		t.setOrientation(Vumeter.VERTICAL);

		t.addRange(10d, "#008000");
		t.addRange(20d, "#808000");
		t.addRange(100d, "#800000");

		this.t = t;

	}

	public void testDigital() {
		Digitalmeter t = new Digitalmeter();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("120");
		t.setHeight("50");
		t.setCurrent(45);
		t.setAnimate(true);
		t.setDigits(3);
		t.setDecimals(1);
		t.setAnimateCounter(10);
		t.setBackground(true);
		t.setSigned(true);

		t.addRange(10d, "#FA0000", "true");
		t.addRange(20d, "#FAFA00", "true");
		t.addRange(50d, "#00FA00", "false");
		this.t = t;
	}

	public void testSignal() {

		Signal t = new Signal();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setCurrent(45);
		t.setAnimate(true);
		t.setAnimateCounter(5);
		t.setOrientation(Signal.HORIZONTAL);

		t.addRange(10d, "#008000", "true");
		t.addRange(20d, "#808000", "true");
		t.addRange(100d, "#800000", "true");

		this.t = t;

	}

	public void testLed() {

		Ledmeter t = new Ledmeter();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("120");
		t.setHeight("50");
		t.setCurrent(45);
		t.setAnimate(true);
		t.setAnimateCounter(1);

		t.addRange(10d, "#00FA00", Ledmeter.ANIMATE_NONE, "OK");
		t.addRange(20d, "#8A8A00", Ledmeter.ANIMATE_BLINK, "WARNING");
		t.addRange(50d, "#FA0000", Ledmeter.ANIMATE_RL, "ERROR");

		this.t = t;

	}

	public void testThermometer() {

		Thermometer t = new Thermometer();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("50");
		t.setHeight("150");
		t.setCurrent(45);
		t.setAnimate(true);
		t.setMax(50);
		t.setMin(10);
		t.setIntervals(5);

		this.t = t;

	}

	public void testMeter() {

		Meter t = new Meter();
		t.setLeft("0");
		t.setTop("0");
		t.setBarSize(30);
		t.setWidth("50");
		t.setHeight("150");
		t.setCurrent(45);
		t.setAnimate(true);

		t.addRange(10d, "#00FA00");
		t.addRange(20d, "#8A8A00");
		t.addRange(100d, "#FA0000");

		this.t = t;

	}

	public void testRadialmeter() {

		Radialmeter t = new Radialmeter();
		t.setLeft("0");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setCurrent(45);
		t.setAnimate(true);
		t.setCapacity(false);
		t.setRulePosition(Radialmeter.RULE_POSITION_OUT);

		t.addRange(10d, "#008000");
		t.addRange(20d, "#808000");
		t.addRange(100d, "#800000");

		this.t = t;

	}

	public void testPie() {

		Pie t = new Pie();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(true);
		t.setPizza(false);
		t.setAnimateType(Pie.ANIMATION_RADIAL);
		t.setShowValues(true);
		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");

		this.t = t;

	}

	public void testPiramid() {

		Piramid t = new Piramid();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(false);
		t.setDistribution(Piramid.DISTRIBUTION_HEIGHT);
		t.setOrientation(Piramid.ORIENTATION_DOWN);
		t.setLabelsMode(Piramid.LABELS_NONE);

		t.setShowValues(true);
		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");

		this.t = t;

	}

	public void testFunnel() {

		Funnel t = new Funnel();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(false);
		t.setDistribution(Piramid.DISTRIBUTION_HEIGHT);
		t.setOrientation(Piramid.ORIENTATION_DOWN);
		t.setLabelsMode(Piramid.LABELS_NONE);

		t.setShowValues(true);
		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");

		this.t = t;

	}

	public void testStack() {

		Stack t = new Stack();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(false);
		t.setDistribution(Piramid.DISTRIBUTION_HEIGHT);
		t.setOrientation(Piramid.ORIENTATION_DOWN);
		t.setLabelsMode(Piramid.LABELS_NONE);

		t.setShowValues(true);
		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");

		this.t = t;

	}

	public void testRing() {

		Ring t = new Ring();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("200");
		t.setHeight("200");
		t.setAnimate(true);
		t.setPizza(false);
		t.setAnimateType(Ring.ANIMATION_RADIAL);

		t.addValue(10d, "Value 1");
		t.addValue(20d, "Value 2");
		t.addValue(50d, "Valule 3");

		this.t = t;

	}

	public void testImage() {

		h5Image t = new h5Image();
		t.setLeft("100");
		t.setTop("0");
		t.setWidth("150");
		t.setHeight("50");
		t.setSourceType(h5Image.SOURCE_SRC);
		t.setSrc("../img/pie_ring.jpg");

		this.t = t;

	}

}
