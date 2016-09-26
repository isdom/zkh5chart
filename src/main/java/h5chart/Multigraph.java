/*******************************************************************************
 * File: Multigraph.java 
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

package h5chart;

import java.util.ArrayList;
import java.util.List;

public class Multigraph extends H5ChartChildren {
	
	public static final String ORIENTATION_HORIZONTAL="horizontal";
	public static final String ORIENTATION_VERTICAL="vertical";
	
	public static final String FILL_VLINEAR="v-linear";
	public static final String FILL_HLINEAR="h-linear";
	public static final String FILL_VCILINDER="v-cilinder";
	public static final String FILL_HCILINDER="h-cilinder";
	public static final String FILL_FLAT="flat";
	
	public static final String TYPE_BAR = "bar";
	public static final String TYPE_LINE = "line";
	public static final String TYPE_AREA = "area";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	private String _palette=null;
	
	public String getPalette() {
		return _palette;
	}

	public void setPalette(String palette) {
		if(!_palette.equalsIgnoreCase(palette)){
			_palette = palette;
			smartUpdate("palette", _palette);
		}
	}
	
	private String _showValues="";
	
	public boolean isShowValues() {
		return new Boolean(_showValues);
	}

	public void setShowValues(boolean showValues) {
		String an=Boolean.toString(showValues);
		if(!_showValues.equals(an)){
			_showValues = an;
			smartUpdate("showValues", _showValues);
		}
	}
	
	private String _showTooltip="true";
	
	public boolean isShowTooltip() {
		return new Boolean(_showTooltip);
	}

	public void setShowTooltip(boolean showTooltip) {
		String an=Boolean.toString(showTooltip);
		if(!_showTooltip.equals(an)){
			_showTooltip = an;
			smartUpdate("showTooltip", _showTooltip);
		}
	}
	
	private String _animate="";
	
	public boolean isAnimate() {
		return new Boolean(_animate);
	}

	public void setAnimate(boolean animate) {
		String an=Boolean.toString(animate);
		if(!_animate.equals(an)){
			_animate = an;
			smartUpdate("animate", _animate);
		}
	}
		
	private String _marks= "false";
	
	public boolean isMarks() {
		return new Boolean(_marks);
	}

	public void setMarks(boolean marks) {
		String an=Boolean.toString(marks);
		if(!_marks.equals(an)){
			_marks = an;
			smartUpdate("marks", _marks);
		}
	}
	
	private String _grid= "true";
	
	public boolean isGrid() {
		return new Boolean(_grid);
	}

	public void setGrid(boolean grid) {
		String an=Boolean.toString(grid);
		if(!_grid.equals(an)){
			_grid = an;
			smartUpdate("grid", _grid);
		}
	}
	
	private String _orientation= ORIENTATION_HORIZONTAL;

	public String getOrientation() {
		return _orientation;
	}

	public void setOrientation(String orientation) {
		if(!_orientation.equalsIgnoreCase(orientation)){
			_orientation = orientation;
			smartUpdate("orientation", _orientation);
		}
	}
		
	private String _labelFont= "11px Arial";

	public String getLabelFont() {
		return _labelFont;
	}

	public void setLabelFont(String labelFont) {
		if(!_labelFont.equalsIgnoreCase(labelFont)){
			_labelFont = labelFont;
			smartUpdate("labelFont", _labelFont);
		}
	}
	
	private String _labelColor= "grey";
	
	public String getLabelColor() {
		return _labelColor;
	}

	public void setLabelColor(String labelColor) {
		if(!_labelColor.equalsIgnoreCase(labelColor)){
			_labelColor = labelColor;
			smartUpdate("labelColor", _labelColor);
		}
	}
		
	private List<Serie> series;
	private List labels;
					
	public Multigraph() {
		series=new ArrayList();
		labels=new ArrayList();
	}
	
	public Serie addSerie(String type,String title,String fillStyle,double borderWidth,boolean shadow){
		Serie serie=new Serie(type,title,fillStyle,borderWidth,shadow);
		series.add(serie);
		return serie;
	}
	
	public Serie getSerie(int index){
		return this.series.get(index);
	}
	
	public void removeSerie(int index){
		series.remove(index);
	}
	
	public void clearSeries(){
		series.clear();
	}
	
	public void addLabel(String label){
		labels.add(label);
	}
	
	public void removeLabel(int index){
		labels.remove(index);
	}
	
	public void clearLabels(){
		labels.clear();
	}
	
	@Override
	public void update() {
		smartUpdate("plot", true,false);
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "animate", _animate);
		render(renderer, "labelColor", _labelColor);
		render(renderer, "labelFont", _labelFont);
		render(renderer, "showValues", _showValues);
		render(renderer, "showTooltip", _showTooltip);
		render(renderer, "marks", _marks);
		render(renderer, "orientation", _orientation);
		render(renderer, "grid", _grid);
		
		String pal=this._palette;
		if(pal!=null){
			String a[]=pal.split(",");
			pal="[";
			for(int n=0;n<a.length;n++){
				pal+="'"+a[n]+"',";
			}
			pal=pal.substring(0, pal.length()-1);
			pal+="]";
		}
		
		render(renderer, "palette", pal);
		
		String lbls="{values:[";
		for(int n=0;n<labels.size();n++){
			String r=(String)labels.get(n);
			lbls+="'"+r+"',";
		}
		lbls=lbls.substring(0, lbls.length()-1);
		render(renderer, "labels", lbls+"]}");
		
		String srs="[";
		for(int n=0;n<series.size();n++){
			Serie serie=(Serie)series.get(n);
			String sr="{fillStyle:'" + serie.fillStyle + "',";
			sr+="borderWidth: " + serie.borderWidth + ",";
			sr+="title: new Title({text:'" + serie.title + "'}),";
			sr+="type: '" + serie.type + "',";
			sr+="shadow: " + (serie.shadow?"true":"false") + ",";
			sr+="tooltipFont: '" + serie.tooltipFont + "',";
			sr+="tooltipColor: '" + serie.tooltipColor + "',";
			sr+="tooltipMask: " + serie.tooltipMask + ",";
			
			String va="[";
			for(int m=0;m<serie.values.size();m++){
				va+=((Double)serie.values.get(m)).toString() + ",";
			}
			va=va.substring(0, va.length()-1) + "]";
			
			sr+="values: " + va + "},";
			srs+=sr;
		}
		srs=srs.substring(0, srs.length()-1);
		render(renderer, "series", srs+"]");
		

	}

	
		
}


