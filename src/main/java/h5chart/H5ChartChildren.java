/*******************************************************************************
 * File: H5ChartChildren.java 
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

import org.zkoss.zk.ui.HtmlBasedComponent;

public abstract class H5ChartChildren extends HtmlBasedComponent {
	
	public static String BORDER_NONE="none";
	public static String BORDER_SOLID = "solid";
	public static String BORDER_DOTTED = "dotted";
	
	public static String FILL_NONE="none";
	public static String FILL_SOLID="solid";
	public static String FILL_LINEAR="linear";
	public static String FILL_LIGHT="light";
	public static String FILL_CILINDER="cilinder";
	public static String FILL_HLINEAR="h-linear";
	public static String FILL_VLINEAR="v-linear";
	public static String FILL_HCILINDER="h-cilinder";
	public static String FILL_VCILINDER="v-cilinder";
	
	public static final String DEFAULT_MASK="function (val){ return val}";

	/**
	 * 
	 */
	private static final long serialVersionUID = 7543153742300394068L;

	private int getInt(String s){
		 String aux=s.toLowerCase().replaceAll("px", "");
		 return Integer.parseInt(aux.trim());
	}
		
	@Override
	public String getWidth() {
		return super.getWidth()+"px";
	}
	
	@Override
	public void setWidth(String width) {
		String w=""+getInt(width);
		super.setWidth(w);
	}
	
	@Override
	public String getHeight() {
		return super.getHeight()+"px";
	}
	
	@Override
	public void setHeight(String height) {
		String h=""+getInt(height);
		super.setHeight(h);
	}
	
	@Override
	public String getTop() {
		return super.getTop()+"px";
	}
	
	@Override
	public void setTop(String top) {
		String t=""+getInt(top);
		super.setTop(t);
	}
	
	@Override
	public String getLeft() {
		return super.getLeft()+"px";
	}
	
	@Override
	public void setLeft(String left) {
		String l=""+getInt(left);
		super.setLeft(l);
	}
	
	public void update() {
		smartUpdate("plot", true,false);
	}
	
	protected String _showTooltip="true";
	
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
	
	protected String _tooltipFont= "11px Arial";

	public String getTooltipFont() {
		return _tooltipFont;
	}

	public void setTooltipFont(String font) {
		if(!_tooltipFont.equalsIgnoreCase(font)){
			_tooltipFont = font;
			smartUpdate("tooltipFont", _tooltipFont);
		}
	}
	
	protected String _tooltipColor= "grey";
	
	public String getTooltipColor() {
		return _tooltipColor;
	}

	public void setTooltipColor(String color) {
		if(!_tooltipColor.equalsIgnoreCase(color)){
			_tooltipColor = color;
			smartUpdate("tooltipColor", _tooltipColor);
		}
	}
	
	protected String _tooltipMask= DEFAULT_MASK;

	public String getTooltipMask() {
		return _tooltipMask;
	}

	public void setTooltipMask(String mask) {
		if(!_tooltipMask.equalsIgnoreCase(mask)){
			_tooltipMask = mask;
			smartUpdate("tooltipMask", _tooltipMask);
		}
	}
	
	protected String _animate="";
	
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
	
	protected String _palette=null;
	
	public String getPalette() {
		return _palette;
	}

	public void setPalette(String palette) {
		if(!_palette.equalsIgnoreCase(palette)){
			_palette = palette;
			smartUpdate("palette", _palette);
		}
	}
		
	protected String getPaletteString(){
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
		return pal;
	}
	
	protected String _shadow="true";
	
	public boolean isShadow() {
		return new Boolean(_shadow);
	}

	public void setShadow(boolean shadow) {
		String an=Boolean.toString(shadow);
		if(!_shadow.equals(an)){
			_shadow = an;
			smartUpdate("shadow", _shadow);
		}
	}
	
	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
	throws java.io.IOException {
		super.renderProperties(renderer);
		
		render(renderer, "animate", _animate);
		render(renderer, "shadow", _shadow);
		render(renderer, "palette", _palette);
		render(renderer, "showTooltip", _showTooltip);
		render(renderer, "tooltipFont", _tooltipFont);
		render(renderer, "tooltipColor", _tooltipColor);
		render(renderer, "tooltipMask", _tooltipMask);
		
	}
}
