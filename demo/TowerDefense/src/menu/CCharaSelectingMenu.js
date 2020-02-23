function CCharaSelectingMenu(parent){
	var self = this;
	base(self,LSprite,[]);
	
	parent.addChild(self);
	self.showCharaList();
}
CCharaSelectingMenu.prototype.showCharaList = function(){
	var self = this;
	
	for(var key in CGlobal.ourCharaList.candidate){			
		var layer = new LSprite();
		layer.name = CGlobal.ourCharaList.candidate[key];
		self.addChild(layer);
		if(charaData[CGlobal.ourCharaList.candidate[key]].attribute == "soldier"){
			var bitmapData = new LBitmapData(CGlobal.datalist[CGlobal.ourCharaList.candidate[key]+CGlobal.soldierStyle["our"]+"_move"],0,0,48,48);
		}else{
			var bitmapData = new LBitmapData(CGlobal.datalist[CGlobal.ourCharaList.candidate[key]+"_move"],0,0,48,48);
		}
		var bitmap = new LBitmap(bitmapData);
		layer.addChild(bitmap);
		
		var nameText = new LTextField();
		nameText.color = "white";
		nameText.text = charaData[layer.name]["name"];
		nameText.x = (bitmap.getWidth()-nameText.getWidth())*0.5;
		nameText.y = parseInt(bitmap.getHeight())+5;
		layer.addChild(nameText);
		
		layer.x = (CGlobal.ctrlLayer.getWidth()-bitmap.getWidth())*0.5;
		layer.y = 80*key+20;
		layer.addEventListener(LMouseEvent.MOUSE_DOWN,function(event,o){
			if(CLock.lockStage)return;
			CLock.lockStageExceptControlOurChara = true;
			CGlobal.selectedCharaData = o;
			
			if(charaData[CGlobal.selectedCharaData.name].attribute == "soldier"){
				var bitmapData = new LBitmapData(CGlobal.datalist[CGlobal.selectedCharaData.name+CGlobal.soldierStyle["our"]+"_move"],0,0,48,48);
			}else{
				var bitmapData = new LBitmapData(CGlobal.datalist[CGlobal.selectedCharaData.name+"_move"],0,0,48,48);
			}
			var bitmap = new LBitmap(bitmapData);
			CGlobal.selectedCharaObj.x = event.offsetX - bitmap.getWidth()*0.5;
			CGlobal.selectedCharaObj.y = event.offsetY - bitmap.getHeight()*0.5;
			CGlobal.selectedCharaObj.addChild(bitmap);
		});
	}
};