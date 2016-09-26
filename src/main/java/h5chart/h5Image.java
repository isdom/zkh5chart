/*******************************************************************************
 * File: h5Image.java 
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

public class h5Image extends H5ChartChildren {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2716792849027130398L;
	
	public static final String SOURCE_SRC="url";
	public static final String SOURCE_ID="id";
	
	private String _sourceType=SOURCE_SRC ;

	public String getSourceType() {
		return _sourceType;
	}

	public void setSourceType(String sourceType) {
		if (_sourceType!=sourceType) {
			_sourceType = sourceType;
			smartUpdate("sourceType", _sourceType);
		}
	}
		
	private String _src;
	
	public String getSrc() {
		return _src;
	}

	public void setSrc(String src) {
		if (_src==null || !_src.equals(src)) {
			_src = src;
			smartUpdate("src", _src);
		}
	}

	private String _imageId;
	
	public String getImageId() {
		return _imageId;
	}

	public void setImageId(String imageId) {
		if (_imageId==null ||!_imageId.equals(imageId)) {
			_imageId = imageId;
			smartUpdate("imageId", _imageId);
		}
	}

	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer)
			throws java.io.IOException {
		super.renderProperties(renderer);

		render(renderer, "sourceType", _sourceType);
		render(renderer, "imageId", _imageId);
		render(renderer, "src", _src);
	}

	@Override
	public void update() {
		smartUpdate("plot", true,false);
	}

}
