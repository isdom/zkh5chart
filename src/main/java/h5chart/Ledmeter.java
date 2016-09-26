/*******************************************************************************
 * File: Ledmeter.java 
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

public class Ledmeter extends OneDimensionGraph {

	public static final String ANIMATE_RL="RL";
	public static final String ANIMATE_BLINK="blink";
	public static final String ANIMATE_NONE="none";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -442728236070719826L;
	
	private int _animateCounter;
	
	private String _message=" ";
	private String _color="grey";
	private String _animation=ANIMATE_NONE;
		
	public String getMessage(){
		return _message;
	}
	
	public void setMessage(String message) {
		if(!_message.equals(message)){
			_message = message;
			smartUpdate("message", _message);
		}
	}
	
	public String getColor(){
		return _color;
	}
	
	public void setColor(String color) {
		if(!_color.equals(color)){
			_color = color;
			smartUpdate("color", _color);
		}
	}
	
	public String getAnimation(){
		return _animation;
	}
	
	public void setAnimation(String animation) {
		if(!_animation.equals(animation)){
			_animation = animation;
			smartUpdate("animation", _animation);
		}
	}
		
	public Ledmeter() {
		super();
	}
	
	public void addRange(Double value, String color, String animateType,String message){
		ranges.add(new Range(value,color,animateType,message));
	}
		
	public int getAnimateCounter() {
		return _animateCounter;
	}

	public void setAnimateCounter(int animateCounter) {
		if(_animateCounter!=animateCounter){
			_animateCounter = animateCounter;
			smartUpdate("animateCounter", _animateCounter);
		}
	}

	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);
				
		render(renderer, "animateCounter", _animateCounter);
		render(renderer, "animation", _animation);
		render(renderer, "message", _message);
		render(renderer, "color", _color);
		
	}

	private class Range{
		Double value;
		String color;
		String animateType;
		String message;
		
		public Range(Double value,String color,String animateType,String message) {
			this.value=value;
			this.color=color;
			this.animateType=animateType;
			this.message=message;
		}
		
		public String toString(){
			String ani=ANIMATE_NONE;
			if(this.animateType.equalsIgnoreCase(ANIMATE_RL))
				ani=ANIMATE_RL;
			else if(this.animateType.equalsIgnoreCase(ANIMATE_BLINK))
				ani=ANIMATE_BLINK;
			return "{ value:" + value + ",color: '"  + color + "',animateType:'" + ani + "',message: '"+ message +"'}";
		}
	}
}


