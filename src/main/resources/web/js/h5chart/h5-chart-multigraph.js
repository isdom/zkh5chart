/*******************************************************************************
 * File: h5-chart-multigraph.js 
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


function getTopValue(val){
	if(val==0) return val;
	var n=0;
	var aux=Math.abs(val);
	var coe=1;
	if(val<0) 
		coe=-1;
		
	if(val<=1 && val>=-1){	
		while(aux<1){
			n++;
			aux=Math.abs(val)*(Math.pow(10,n));
		}
		var t=Math.ceil(aux)/Math.pow(10,n);
		if(aux-parseInt(aux)<=.5 && aux-parseInt(aux)>0)
			t=(Math.floor(aux)+.5)/Math.pow(10,n);	
		
	} else {
		while(aux>10){
			n++;
			aux=Math.abs(val)/(Math.pow(10,n));
		}
		if(n==0)
			if(aux>5) aux=10;
			else aux=5;
		var t=Math.ceil(aux)*Math.pow(10,n);
			
	}
	return(t*coe);
}

function getBottomValue(val){
	if(val==0) return val;
	var n=0;
	var aux=Math.abs(val);
	var coe=1;
	if(val<0) 
		coe=-1;
		
	if(val<=1 && val>=-1){	
		while(aux<1){
			n++;
			aux=Math.abs(val)*(Math.pow(10,n));
		}
		var t=Math.floor(aux)/Math.pow(10,n);
		
	} else {
		while(aux>10){
			n++;
			aux=Math.abs(val)/(Math.pow(10,n));
		}
		if(n==0)
			if(aux>5) aux=5;
			else aux=0;
		
		var t=Math.floor(aux)*Math.pow(10,n);
	
	}
	return(t*coe);
}

function getScale(min,max,zero){
	var slots=5;
	var tmax=getTopValue(max);
	if(max<0) tmax=getBottomValue(max);
	
	var tmin=getBottomValue(min);
	if(min<0) tmin=getTopValue(min);
	
	var slot=0;
	
	if(tmin >=0 && tmax>=0){
		if(zero==true)
			tmin=0;
		slot=getSlotValue(tmax-tmin);
	} else if (tmin<0 && tmax <0){
		if(zero==true)
			tmax=0;
		slot=getSlotValue(tmax-tmin);
	} else {
		var m=1;
		if(Math.abs(tmax)>Math.abs(tmin)){
			slot=getSlotValue(tmax);
			while(Math.abs(tmin)>m*slot)
				m++;
			tmin=-1*m*slot;
		} else {
			slot=getSlotValue(tmin);
			while(Math.abs(tmax)>m*slot)
				m++;
			tmax=m*slot;
		}
	}
	
	return { max:tmax,min:tmin,slot:slot,slots:Math.floor((tmax-tmin)/slot)};
	
}

function getSlotValue(value){
	var a=Math.abs(value);
	var result=0;
	var m=0;
	
	if(a<=1){
		result=a/10;
	} else {
		if(a<=10 & a>1)
			result=1;
		else {
			result=a/10;
		}
	}
	return result;
}


/**
 * 
 * @returns {Multigraph}
 */
function Multigraph() {

	this.canvasId;

	this.orientation = "vertical"; // down

	this.grid=true;
	
	this.init();
	
	this.marks=true;
	
	this.valuesOnTick = false;
	
	this.barsOverflow = false;
	
	this.labelsMode = "none"; //"labels", "none";

	this.getDimension = function() {
		var left = this.left;
		var top = this.top;
		var width = this.width - 5;
		var height = this.height - 5;
		var of=0;
		if(this.valuesOnTick) of=1;
		var slotsize= width / (this.labelsLength()-of);
		if(this.orientation=='horizontal'){
			slotsize= width / this.labelsLength();
		}
		
		var barcount=0;
		var linecount=0;
		var areacount=0;
		var barSeries=new Array();
		var lineSeries=new Array();
		var areaSeries=new Array();
		
		for(var n=0;n<this.seriesLength();n++){
			if(this.getSerie(n).type=='bar'){
				barSeries[barcount]=n;
				barcount++;
			}
			if(this.getSerie(n).type=='line'){
				lineSeries[linecount]=n;
				linecount++;
			}
			if(this.getSerie(n).type=='area'){
				areaSeries[areacount]=n;
				areacount++;
			}
		}
		
		var scale=this.scale();
		
		return {
			left : left + 5,
			top : top + 5,
			width : width,
			height : height,
			slotsize : slotsize,
			bar: barSeries,
			line: lineSeries,
			area: areaSeries,
			scale: scale
		};
		
		
	};

	this.scale=function(){
		var max=0;
		var min=0;
		for(var n=0;n<this.seriesLength();n++){
			max=Math.max(max,this.getSerie(n).max());
			min=Math.min(min,this.getSerie(n).min());
		}

		return getScale(min,max,true);
		
	};

	this.drawLabels = function(canvasId, offset,follow) {
		
	};
	
	this.getBarPoints = function(dim,serieNum,seriePos){
		
		var scale=dim.scale;
		var barSeparator=6;
		
		var barSize=dim.slotsize/dim.bar.length-barSeparator;
		
		var serie=this.getSerie(serieNum);
		var value=serie.get(seriePos).value;
		
		var zeroTop=scale.max*dim.height/(scale.max-scale.min);
		
		var valueHeight=value*dim.height/(scale.max-scale.min);
		var valueTop=(scale.max-value)*dim.height/(scale.max-scale.min);
		var valueBottom=valueTop+valueHeight;
		
		var barOf=0;
		for(var q=0;q<dim.bar.length;q++){
			if(serieNum==dim.bar[q]){
				barOf=q;
				break;
			}
		}
		
		var of=1;
		if(this.valuesOnTick) { 
			of=-0.5; barOf=1;
			barSize=(dim.slotsize-barSeparator)*1/(serieNum+1);
		}
		
		var offset=seriePos*dim.slotsize+of*(barSize+(barSeparator))*barOf+barSeparator/2;
		
		var points = new Array();	
		
		if(!this.barsOverflow && this.valuesOnTick && seriePos==0){
			points[0]=new Point(dim.left,dim.top+valueBottom);
			points[1]=new Point(dim.left,dim.top+valueTop);
		} else {
			points[0]=new Point(dim.left+offset,dim.top+valueBottom);
			points[1]=new Point(dim.left+offset,dim.top+valueTop);
		}
		
		if(!this.barsOverflow && this.valuesOnTick && seriePos==serie.length()-1){
			points[2]=new Point(dim.left+offset+barSize/2,dim.top+valueTop);
			points[3]=new Point(dim.left+offset+barSize/2,dim.top+valueBottom);
		} else {
			points[2]=new Point(dim.left+offset+barSize,dim.top+valueTop);
			points[3]=new Point(dim.left+offset+barSize,dim.top+valueBottom);
		}
		
		return points;
		
	};
	
	this.getLinePoints = function(dim,serieNum){
		var points = new Array();
		var scale=dim.scale;
		var size=dim.slotsize/2;
		var serie=this.getSerie(serieNum);
		
		if(this.valuesOnTick)
			size=0;
		
		for(var m=0;m<serie.length();m++){
			var value=serie.get(m).value;
			var zeroTop=scale.max*dim.height/(scale.max-scale.min);
			var valueHeight=value*dim.height/(scale.max-scale.min);
			var valueTop=(scale.max-value)*dim.height/(scale.max-scale.min);
			var valueBottom=valueTop+valueHeight;
			var offset=m*dim.slotsize+size;
			points[m]=new Point(dim.left+offset,dim.top+valueTop);
		}
		
		return points;
	};
	
	this.getAreaPoints = function(dim,serieNum){
		var points = new Array();
		var scale=dim.scale;
		var size=dim.slotsize/2;
		var serie=this.getSerie(serieNum);
		
		var zeroTop=scale.max*dim.height/(scale.max-scale.min);
		
		points[0]=new Point(dim.left+dim.slotsize/2,dim.top+zeroTop);
		
		for(var m=0;m<serie.length();m++){
			var value=serie.get(m).value;
			var valueHeight=value*dim.height/(scale.max-scale.min);
			var valueTop=(scale.max-value)*dim.height/(scale.max-scale.min);
			var valueBottom=valueTop+valueHeight;
			var offset=m*dim.slotsize+size;
			points[m+1]=new Point(dim.left+offset,dim.top+valueTop);
		}
		
		points[m+1]=new Point(dim.left+offset,dim.top+zeroTop);
		points[m+2]=new Point(dim.left+dim.slotsize/2,dim.top+zeroTop);
		
		return points;
	};
	
	this.getPointPath = function(canvasId,dim, serieNum,seriePos,radius) {
		var points = this.getLinePoints(dim, serieNum);
		var offset=0;
		var offset1=0;
		
		for(var n=0+offset;n<points.length-offset1;n++){
			if(seriePos+offset==n)
				circlePath(getContext(canvasId),points[n].x,points[n].y,radius);
		}
	};

	this.drawBarValue = function(canvasId, dim, serieNum,seriePos, highlight) {

		var color = this.palette[serieNum];
		var area = new Area();
		
		var points = this.getBarPoints(dim, serieNum,seriePos);
		area.points = points;
		area.left=points[0].x;
		area.top=points[1].y;
		area.height=points[0].y-points[1].y;
		area.width=points[2].x-points[1].x;
		
		area.endColor = color;
		
		var serie=this.getSerie(serieNum);
		
		if (this.style == 'flat') {
			area.color = color;
			area.fillStyle = 'solid';
		} else {
			area.color = color;
			area.endColor = 'white';
			area.fillStyle = serie.fillStyle;
		}

		
		area.borderStyle = 'solid';
		area.borderColor = 'grey';
		area.borderWidth = .5;
		
		
		if(serie.shadow==true)
			area.shadow = new Shadow( {
				offsetX : 2,
				offsetY : -.5,
				blur : 3
			});

		if (highlight) {
			area.borderWidth = 1;
			area.shadow = new Shadow( {
				blur : 15
			});
			area.borderColor = '#DADADA';
		}
		area.draw(canvasId, 1);
		
	};

	this.drawPoint = function(canvasId,color,radius,x,y,highlight){
		var cir=new Circle();
		cir.left=x;
		cir.top=y;
		cir.radius=radius;
		cir.color=color;
		cir.fillStyle='solid';
		cir.borderStyle='solid';
		cir.borderColor='#FBFBFB';
		cir.borderWidth=2; 
		if(highlight)
			cir.shadow=new Shadow(10,10,10);
		cir.draw(canvasId);
	};
	
	this.drawLine = function(canvasId, dim, serieNum){
		var color = this.palette[serieNum];
		var area = new Area();
		
		var points = this.getLinePoints(dim, serieNum);
		var serie=this.getSerie(serieNum);
		
		var shadow=null;
		if(serie.shadow==true)
			shadow = new Shadow( {
				offsetX : 2,
				offsetY : 2,
				blur : 7
			});
				
		drawPoly(getContext(canvasId),points,serie.borderWidth,color,shadow,'round');
		
		if(this.marks)
			for(var n=0;n<points.length;n++){
				this.drawPoint(canvasId,color,serie.borderWidth,points[n].x,points[n].y,false);	
			}
	
	};
	
	this.drawArea = function(canvasId, dim, serieNum){
		var color = this.palette[serieNum];
		var area = new Area();
		
		var points = this.getAreaPoints(dim, serieNum);
		area.points = points;
		area.left=points[0].x;
		area.top=points[1].y;
		area.height=dim.height;
		area.width=dim.width;
		
		area.endColor = color;
		
		if (this.style == 'flat') {
			area.color = color;
			area.fillStyle = 'solid';
		} else {
			area.color = color;
			area.endColor = 'white';
			area.fillStyle = 'v-linear';
		}

		
		area.borderStyle = 'solid';
		area.borderColor = color; //'grey';
		area.borderWidth = 2;
		
		var serie=this.getSerie(serieNum);
		
		if(serie.shadow==true)
			area.shadow = new Shadow( {
				offsetX : 2,
				offsetY : 2,
				blur : 7
			});
		
		area.draw(canvasId, 1);
		
		if(this.marks)
			for(var n=1;n<points.length-2;n++){
				this.drawPoint(canvasId,color,serie.borderWidth,points[n].x,points[n].y,false);	
			}
		
	};
	
	this.highlightPoint = function(canvasId, dim, serieNum, seriePos){
		
		
		var serie=this.getSerie(serieNum);
		
		var points= this.getLinePoints(dim, serieNum);
		var shadow = new Shadow( {
			offsetX : 2,
			offsetY : 2,
			blur : 7
		});
		var offset=0;
		var offset1=0;
				
		var color = this.palette[serieNum];
		var serie=this.getSerie(serieNum);
		for(var n=0+offset;n<points.length;n++){
			if(seriePos==n-offset){
				this.drawPoint(canvasId,color,serie.borderWidth*1.1,points[n+offset].x,points[n+offset].y,true);
			}
		}
		
	};
	
	this.drawSeries = function(canvasId, dimension) {
		
//		var ctx=getContext(canvasId);
//		ctx.save();
//		
//		if(this.orientation=='horizontal'){
//			ctx.translate(this.left+1+this.height, this.top);
//			ctx.rotate(toRadian(90));	
//		}
		
		var barSeries=dimension.bar;
		var areaSeries=dimension.area;
		var lineSeries=dimension.line;
		
		var serie,seriePos, serieNum;
		
		for ( var n=0; n < areaSeries.length;n++){
			serieNum=areaSeries[n];
			this.drawArea(canvasId,dimension,serieNum);
		}
		
		
		
		for ( var n=0; n < barSeries.length;n++){
			serieNum=barSeries[n];
			serie=this.series.get(serieNum);
			for(seriePos=0;seriePos<serie.length();seriePos++)
				this.drawBarValue(canvasId,dimension,serieNum,seriePos);
		}
		
		this.drawBackGround(canvasId, dimension);
		
		for ( var n=0; n < lineSeries.length;n++){
			serieNum=lineSeries[n];
			this.drawLine(canvasId,dimension,serieNum);
		}
		
		
//		ctx.restore();
		
	};

	this.highlight = function(canvasId, serieNum , seriePos) {
		
		var dimension = this.getDimension();
		
		var serie=this.series.get(serieNum);
		if(serie.type=='bar')
			this.drawBarValue(canvasId, dimension, serieNum, seriePos,true);
		
		if(serie.type=='line' || serie.type=='area'){
			this.highlightPoint(canvasId, dimension, serieNum, seriePos);
		}
		
		if (this.showTooltip) {
			var dl = this.getLabelDimension(canvasId, dimension,serieNum, seriePos);
			this.tooltip = doTooltip(this.uid, dl, this.mouseX, this.mouseY);
			this.drawLabel(this.tooltip.bodyId, dimension, serieNum, seriePos);
		}
		
	
	};
	
	this.isSerieIn = function(points){
		var dim=this.getDimension();
		var limits=getLimits(points);
		
		var minPos=-1;
		var maxPos=-1;
		
		var of=0;
		if(this.valuesOnTick){
			of=dim.slotsize/2;
		}
		
		for(var n=0;n<this.labels.length();n++){
			if(limits.minX>=dim.left+n*dim.slotsize-of && limits.minX<dim.left+(n+1)*dim.slotsize-of)
				minPos=n;
			
			if(limits.maxX>=dim.left+n*dim.slotsize-of && limits.maxX<dim.left+(n+1)*dim.slotsize-of)
				maxPos=n;	
		}
		
		if(minPos<0 || maxPos<0)
			return null;
		
		var label=new Array();
		var lc=0;
		for(var l=minPos;l<maxPos+1;l++){
			label[lc]=l;
			lc++;
		}
		
		var array=new Array();
		var count=0;
		for(var m=0;m<this.series.length();m++){
			var serie=this.series.get(m);
			for(var vc=minPos;vc<maxPos+1;vc++){
				var v=dim.top+(dim.scale.max-serie.get(vc).value)*dim.height/(dim.scale.max-dim.scale.min);
				if(v>=limits.minY && v<=limits.maxY){
					array[count]={serie:m,position: vc,value:serie.get(vc).value};
					count++;
					//console.log("serie:" + m + ", position:" + vc);
				}
			}
		}
		//console.log({labels: label, series:array});
		
		return {labels: label, series:array};
		
	};
	
	this.getSection = function(canvasId, dim, serieNum , seriePos) {

		var serie=this.getSerie(serieNum);
		var ctx=getContext(canvasId);
		ctx.save();
		
		if(serie.type=='bar') {
			polyPath(ctx, this.getBarPoints(dim, serieNum,seriePos));
		} else if(serie.type=='line' || serie.type=='area') {
			this.getPointPath(canvasId,dim,serieNum,seriePos,4);
		} 
			
	};

	this.draw = function(canvasId) {
		this.canvasId = canvasId;
		
		if (!this.palette)
			this.palette = this.randomPalette(this.getSerie(0).length());

		var dimension = this.getDimension();

		if (!this.regionManager)
			this.regionManager = document.getElementById(canvasId)
					.getRegionManager();
		
		if(this.regionManager)
			this.regionManager.set(this);
		
		if (this.animate) {

			var obj=this;
			this.acounter=0;
			this.apos=0;
			this.anty='area';
			
			var id=setInterval( function(){
				var barSeries=dimension.bar;
				var areaSeries=dimension.area;
				var lineSeries=dimension.line;
				
				var serie,seriePos, serieNum;
				
				var canvas=document.getElementById(canvasId);
				canvas.startAnimationInProgress(obj);
				
				if(obj.acounter<areaSeries.length && obj.anty=='area') {
					serieNum=areaSeries[obj.acounter];
					obj.drawArea(canvasId,dimension,serieNum);
					document.getElementById(canvasId).updateImage();
					obj.acounter++;
				} else {
					if(obj.anty=='area'){
						obj.anty='bar';
						obj.acounter=0;
					}
					if(obj.acounter<barSeries.length && obj.anty=='bar'){
						serieNum=barSeries[obj.acounter];
						serie=obj.series.get(serieNum);
						if(obj.apos<serie.length()){
							obj.drawBarValue(canvasId,dimension,serieNum,obj.apos);
							document.getElementById(canvasId).updateImage();
							obj.apos++;
						} else {
							obj.apos=0;
							obj.acounter++;
						}
					} else {
						if(obj.anty=='bar'){
							obj.anty='line';
							obj.acounter=0;
							obj.drawBackGround(canvasId, dimension);
						}
						if(obj.acounter<lineSeries.length && obj.anty=='line'){
							serieNum=lineSeries[obj.acounter];
							obj.drawLine(canvasId,dimension,serieNum);
							document.getElementById(canvasId).updateImage();
							obj.acounter++;
						} else {
							clearInterval(id);
							
							if(obj.regionManager)
								obj.regionManager.set(obj);

							//obj.hideTooltip();
							document.getElementById(canvasId).updateImage();
							canvas.stopAnimationInProgress(obj);
							
							if(obj.posfunction){
								obj.posfunction();
							}
						}
					}
				}
				
			},70);
			
		} else {
			

			var canvas=document.getElementById(canvasId);
			canvas.startAnimationInProgress(this);
			
			if(this.labelsMode=="both" || this.labelsMode=="none")
				this.drawSeries(canvasId, dimension);

			// if(this.showValues==true)
			// this.drawLabels(canvasId,arrLabels);

			if(this.labelsMode=="both" || this.labelsMode=="labels")
				this.drawLabels(canvasId, dimension.left + dimension.width,false);
			
			if (this.regionManager){
				this.regionManager.set(this);
			}
			
			document.getElementById(canvasId).updateImage();
			canvas.stopAnimationInProgress(this);
			
			
			if (this.posfunction) {
				this.posfunction();
			}
			
		}

	};

	this.drawBackGround = function(canvasId, dimension) {

//		if(!this.gridStyle.vertical && !this.gridStyle.vertical)
//			return;
		
		if(!this.grid)
			return;
		
		var r,offsetLeft,offsetRight,offsetTop,offsetBottom;
		
		var grd='both';
		//if(this.gridStyle.vertical && !this.gridStyle.vertical) grd='v-grid';
		//if(!this.gridStyle.vertical && this.gridStyle.vertical) grd='h-grid';
				
		if (this.orientation = 'yx') {
			offsetLeft = 0; // letras del ejeY
			offsetRight = 0; // letras segundo ejeY
			offsetBottom=0; // letras ejeX
			offsetTop=0;
		} else {
			offsetLeft = 0; // letras del ejeY
			offsetRight = 0; // letras segundo ejeY
			offsetBottom=0; // letras ejeX
			offsetTop=0;
		}

		var of=0;
		if(this.valuesOnTick) of=-1;
		
		r = new Grid(dimension.left + offsetLeft, dimension.top,
				dimension.width - offsetLeft - offsetRight,
				dimension.height - offsetBottom - offsetTop, this.labels.length()+of, 1, 'rect', grd );

		r.borderStyle = 'solid'; //this.gridStyle.style;
		r.borderColor = 'grey'; //this.gridStyle.color;
		r.draw(canvasId);

	};
	
	this.clone = function(){
		var canvas=document.getElementById(this.canvasId);
		var uid=canvas.getUid();
		
		var np=new Multigraph();
		cloneProperties(this,np,['left','top','width','height',
		                         'animate','style','orientation',
		                         'palette','marks','valuesOnTick',
		                         'barsOverflow','grid','selection','showTooltip']);
		
		setSeriesFromSelectionMulti(this,np,arguments[0]);
		
		np.setValueStyle(this.labels.valueStyle);
		return np;
	};

	
}

Multigraph.prototype = new MultiDimensionGraph();