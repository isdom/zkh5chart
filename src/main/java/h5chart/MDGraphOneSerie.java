/*******************************************************************************
 * File: MDGraphOneSerie.java 
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

public abstract class MDGraphOneSerie extends MultiDimensionGraph{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected List<Range> values;
	
	public MDGraphOneSerie() {
		values=new ArrayList<Range>();
	}
	
	public void addValue(Double value, String label){
		values.add(new Range(value,label));
	}
	
	public void removeValue(int index){
		values.remove(index);
	}
	
	public void clearValues(){
		values.clear();
	}
	
	public class Range{
		Double value;
		String label;
		
		public Range(Double value,String label) {
			this.value=value;
			this.label=label;
		}
	}
	
	public String getSerieString(){
		String serie="{values:[";
		for(int n=0;n<values.size();n++){
			Range r=(Range)values.get(n);
			serie+=r.value+",";
		}
		serie=serie.substring(0, serie.length()-1)+"]}";
		return serie;
	}

	public String getLabelString(){
		String labels="{values:[";
		for(int n=0;n<values.size();n++){
			Range r=(Range)values.get(n);
			labels+="'"+r.label+"',";
		}
		labels=labels.substring(0, labels.length()-1)+"]}";
		return labels;
	}
	
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "serie", getSerieString());
		render(renderer, "labels", getLabelString());
	}
	
}
