LStage._linkList = new Array();
LStage._isAddLinkEvent = false;
LStage._addLinkEvent = function(event){
	for(var i in LStage._linkList){
		o = LStage._linkList[i];
		if(event.offsetX < parseInt(o.getRootCoordinate().x) + parseInt(o.getWidth()) && event.offsetY < parseInt(o.getRootCoordinate().y) + parseInt(o.getHeight()) + parseInt(Math.floor(o.text.size * 0.4)) && event.offsetX > parseInt(o.getRootCoordinate().x) && event.offsetY > parseInt(o.getRootCoordinate().y)){
			document.body.style.cursor = "pointer";
			return;
		}else{
			document.body.style.cursor = "default";
		}
	}
}
function CLink(url,text,type,color,font,size){
	var self = this;
	base(self,LSprite,[]);
	
	self.type = "LLink";
	self.url = url;
	self.openType = type || "blank";
	
	self.x = 0;
	self.y = 0;
	
	self.text = new LTextField();
	self.text.color = color || "blue";
	self.text.font = font || "urf-8";
	self.text.size = size || 12;
	self.text.x = 0;
	self.text.y = 0;
	self.text.text = text || url;
	self.addChild(self.text);
	
	self.underLine = new LSprite();
	self.underLine.graphics.drawRect(0,self.text.color,[0,0,self.text.getWidth(),Math.floor(self.text.size * 0.1)],true,self.text.color);
	self.underLine.x = 0;
	self.underLine.y = parseInt(self.text.getHeight()) + Math.floor(self.text.size * 0.3);
	self.addChild(self.underLine);
	
	self.back = new LSprite();
	self.back.graphics.drawRect(0,"transparent",[0,0,self.text.getWidth(),self.text.getHeight()],true,"transparent");
	self.addChild(self.back);
	
	LStage._linkList.push(self);
	
	self.addEventListener(LMouseEvent.MOUSE_DOWN,self._jump);
	
	if(LStage._isAddLinkEvent == false){
		LEvent.addEventListener(LGlobal.object,LMouseEvent.MOUSE_MOVE,LStage._addLinkEvent);
		LStage._isAddLinkEvent = true;
	}
}
CLink.prototype._jump = function(event,self){
	var openType = "_" + self.openType;
	window.open(self.url, openType);
}