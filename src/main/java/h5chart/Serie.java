/*******************************************************************************
 * File: Serie.java 
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

public class Serie{
	String title;
	String type;
	String fillStyle;
	
	String tooltipMask="function(val){ return val;}";
	
	public String getTooltipMask() {
		return tooltipMask;
	}

	public void setTooltipMask(String tooltipMask) {
		this.tooltipMask = tooltipMask;
	}

	public String getTooltipColor() {
		return tooltipColor;
	}

	public void setTooltipColor(String tooltipColor) {
		this.tooltipColor = tooltipColor;
	}

	public String getTooltipFont() {
		return tooltipFont;
	}

	public void setTooltipFont(String tooltipFont) {
		this.tooltipFont = tooltipFont;
	}

	String tooltipColor = "grey";
	String tooltipFont = "11px Arial";
	
	double borderWidth=5;
	boolean shadow=true;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFillStyle() {
		return fillStyle;
	}

	public void setFillStyle(String fillStyle) {
		this.fillStyle = fillStyle;
	}

	public double getBorderWidth() {
		return borderWidth;
	}

	public void setBorderWidth(double borderWidth) {
		this.borderWidth = borderWidth;
	}

	public boolean isShadow() {
		return shadow;
	}

	public void setShadow(boolean shadow) {
		this.shadow = shadow;
	}
	
	List values;
	
	public Serie(String type,String title,String fillStyle,double borderWidth,boolean shadow) {
		this.title=title;
		this.type=type;
		this.fillStyle=fillStyle;
		this.borderWidth=borderWidth;
		this.shadow=shadow;
		this.values=new ArrayList();
	}
	
	public void add(double value){
		values.add(value);
	}
	
	public void clear(){
		values.clear();
	}
	
	public void remove(int index){
		values.remove(index);
	}
	
	public int size(){
		return values.size();
	}
	
	public double getValue(int index){
		return (Double)values.get(index);
	}
	
}
