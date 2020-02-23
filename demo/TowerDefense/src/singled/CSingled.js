function CSingled(data){
	var self = this;
	base(self,LSprite,[]);
	
	self.name = "CSingled";
	
	self.singledChara = data.chara;
	self.talkList = data.talk;
	
	self.roundIndex = 0;
	
	self.isStartFight = false;
	self.isAllOver = false;
	self.isSingledOver = false;
	
	self.winner = null;
	self.loser = null;
	
	//舞台层
	self.stageLayer = new LSprite();
	self.addChild(self.stageLayer);
	//内容层
	self.contentLayer = new LSprite();
	self.addChild(self.contentLayer);
	//背景层
	self.backLayer = new LSprite();
	self.contentLayer.addChild(self.backLayer);
	//人物层
	self.charaLayer = new LSprite();
	self.contentLayer.addChild(self.charaLayer);
	//对话层
	self.talkLayer = new LSprite();
	self.contentLayer.addChild(self.talkLayer);
	//控制层
	self.ctrlLayer = new LSprite();
	self.contentLayer.addChild(self.ctrlLayer);
	//头像层
	self.faceLayer = new LSprite();
	self.addChild(self.faceLayer);
	//体力层
	self.hpLayer = new LSprite();
	self.addChild(self.hpLayer);
	
	//角色对象
	self.ourObj = null;
	self.enemyObj = null;
	
	//文字对象
	self.roundIndexText = null;
	
	//内容层大小
	self._cWidth = 500;
	self._cHeight = 300;
	
	//人物出场位置
	self._location = {
		our:{
			x:50,
			y:200
		},
		enemy:{
			x:400,
			y:200
		}
	};
	
	//初试化单挑
	self.initSingled();
}
CSingled.prototype.initSingled = function(){
	var self = this;
	
	self.addBack();
	self.initContent();
	self.loadSingled();
};
CSingled.prototype.loadSingled = function(){
	var self = this;
	
	CLoadManager.loadData = new Array();
	var loadData = [
		{name:"singled_back",path:"./images/background/singled_back.png"},
		{name:"vs_word",path:"./images/word/vs_word.png"},
		{name:"talk_hint",path:"./images/system/talk_hint.png"}
	];
	
	for(var index in loadData){
		if(!CLoadManager.isLoad(loadData[index].name)){
			CLoadManager.loadData.push(loadData[index]);
			CLoadManager.readyLoadList.push(loadData[index].name);
		}
	}
	
	if(CLoadManager.loadData.length == 0){
		//开始单挑
		self.startSingled();
		return;
	}
	
	LLoadManage.load(
		CLoadManager.loadData,
		null,
		function(result){
			for(var key in result){
				CGlobal.datalist[key] = result[key];
			}
			//开始单挑
			self.startSingled();
		}
	);
};
CSingled.prototype.addBack = function(){
	var self = this;
	
	self.stageLayer.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
	self.stageLayer.alpha = 0.8;
};
CSingled.prototype.initContent = function(){
	var self = this;
	
	//设置内容位置
	self.contentLayer.x = (LStage.width-self._cWidth)*0.5;
	self.contentLayer.y = (LStage.height-self._cHeight)*0.5;
	//设置内容遮罩
	var mask = new LSprite();
	mask.x = self.contentLayer.x;
	mask.y = self.contentLayer.y;
	mask.graphics.drawRect(0,"",[0,0,self._cWidth,self._cHeight],true,"transparent");
	self.contentLayer.mask = mask;
};
CSingled.prototype.startSingled = function(){
	var self = this;
	
	var faceCoodList = [
		self.contentLayer.x - 110,
		parseInt(self.contentLayer.x)+parseInt(self._cWidth)+parseInt(25)
	]

	/**加入背景*/
	var back = new LBitmap(new LBitmapData(CGlobal.datalist["singled_back"]));
	back.x = -80;
	back.y = -20;
	self.backLayer.addChild(back);
	
	/**加入角色*/
	self.ourObj = new CSingledChara(self.singledChara["our"],self._location["our"].x,self._location["our"].y,CGlobal.soldierStyle["our"]);
	self.ourObj.dir = "right";
	self.ourObj.belong = "our";
	self.charaLayer.addChild(self.ourObj);
	
	self.enemyObj = new CSingledChara(self.singledChara["enemy"],self._location["enemy"].x,self._location["enemy"].y,CGlobal.soldierStyle["enemy"]);
	self.enemyObj.dir = "left";
	self.enemyObj.belong = "enemy";
	self.charaLayer.addChild(self.enemyObj);
	
	self.ourObj.setEnemy(self.enemyObj);
	self.enemyObj.setEnemy(self.ourObj);
	
	/**加入头像*/
	//我方头像
	var ourFace = new LSprite();
	ourFace.x = faceCoodList[0];
	ourFace.y = parseInt(self.contentLayer.y)+50;
	self.faceLayer.addChild(ourFace);
	
	var faceName = self.ourObj.name+"_face";
	if(self.ourObj.isNormal == true){
		faceName = "normal"+self.ourObj.normalStyle+"_face";
	}
	var bitmapdata = new LBitmapData(CGlobal.datalist[faceName]);
	var ourFaceBitmap = new LBitmap(bitmapdata);
	ourFaceBitmap.scaleX = 0.3;
	ourFaceBitmap.scaleY = 0.3;
	ourFaceBitmap.x = 8;
	ourFaceBitmap.y = 8;
	ourFace.addChild(ourFaceBitmap);
	
	var faceBorder = new CPageBorder(ourFace.getWidth()+16,ourFace.getHeight()+16,false);
	ourFace.addChild(faceBorder);
	
	var ourNameObj = new LTextField();
	ourNameObj.text = self.ourObj.ChineseName;
	ourNameObj.color = "red";
	ourNameObj.weight = "bold";
	ourNameObj.x = faceCoodList[0]+(ourFace.getWidth()-ourNameObj.getWidth())*0.5;
	ourNameObj.y = parseInt(self.contentLayer.y)+20
	self.faceLayer.addChild(ourNameObj);
	
	//敌方头像
	var enemyFace = new LSprite(bitmapdata);
	enemyFace.x = faceCoodList[1];
	enemyFace.y = parseInt(self.contentLayer.y)+50;
	self.faceLayer.addChild(enemyFace);
	
	faceName = self.enemyObj.name+"_face";
	if(self.enemyObj.isNormal == true){
		faceName = "normal"+self.enemyObj.normalStyle+"_face";
	}
	var bitmapdata = new LBitmapData(CGlobal.datalist[faceName]);
	var enemyFaceBitmap = new LBitmap(bitmapdata);
	enemyFaceBitmap.scaleX = 0.3;
	enemyFaceBitmap.scaleY = 0.3;
	enemyFaceBitmap.x = 8;
	enemyFaceBitmap.y = 8;
	enemyFace.addChild(enemyFaceBitmap);

	var faceBorder = new CPageBorder(enemyFace.getWidth()+16,enemyFace.getHeight()+16,false);
	enemyFace.addChild(faceBorder);

	var enemyNameObj = new LTextField();
	enemyNameObj.text = self.enemyObj.ChineseName;
	enemyNameObj.color = "red";
	enemyNameObj.weight = "bold";
	enemyNameObj.x = faceCoodList[1]+(enemyFace.getWidth()-enemyNameObj.getWidth())*0.5;
	enemyNameObj.y = parseInt(self.contentLayer.y)+20
	self.faceLayer.addChild(enemyNameObj);
	
	/**加入血条*/
	var ourHpBar = new CSingledHpBar();
	ourHpBar.x = ourFace.x+(ourFace.getWidth()-ourHpBar._barWidth)*0.5;
	ourHpBar.y = parseInt(self.contentLayer.y)+60+ourFace.getHeight();
	self.ourObj.setHpBar(ourHpBar);
	self.hpLayer.addChild(ourHpBar);
	
	var enemyHpBar = new CSingledHpBar();
	enemyHpBar.x = enemyFace.x+(enemyFace.getWidth()-enemyHpBar._barWidth)*0.5;
	enemyHpBar.y = parseInt(self.contentLayer.y)+60+enemyFace.getHeight();
	self.enemyObj.setHpBar(enemyHpBar);
	self.hpLayer.addChild(enemyHpBar);
	
	/**加入显示回合数的文字*/
	self.roundIndexText = new LTextField();
	self.roundIndexText.color = "red";
	self.roundIndexText.weight = "bold";
	self.roundIndexText.size = 20;
	self.roundIndexText.y = 20;
	self.backLayer.addChild(self.roundIndexText);
	
	/**添加VS文字*/
	var vsWordObj = new LBitmap(new LBitmapData(CGlobal.datalist["vs_word"]));
	vsWordObj.scaleX = 3;
	vsWordObj.scaleY = 3;
	self.contentLayer.addChild(vsWordObj);
	var tween = new $LTweenLite();
	self.contentLayer.addChild(tween);
	tween.to(vsWordObj,2,{
		scaleX:1,
		scaleY:1,
		onUpdate:function(o){
			o.x = (self._cWidth-o.getWidth())*0.5;
			o.y = (self._cHeight-o.getHeight())*0.5;
		},
		onComplete:function(o){
			self.contentLayer.removeChild(tween);
			var timer = new CTimer(500,function(){
				o.parent.removeChild(o);
				self.addTalk("opening");
			});
		}
	});
	
	/**添加对话提示图片*/
	self.talkHint = new LBitmap(new LBitmapData(CGlobal.datalist["talk_hint"]));
	self.talkHint.visible = false;
	self.contentLayer.addChild(self.talkHint);
	
	/**添加蓄力显示条*/
	self.powerBar = new CSingledPowerBar();
	self.powerBar.x = (self._cWidth-self.powerBar.powerBarWidth)*0.5;
	self.powerBar.y = 25;
	self.ctrlLayer.addChild(self.powerBar);
	
	/**加入事件*/
	self.addEventListener(LEvent.ENTER_FRAME,self.onframe);
	self.contentLayer.addEventListener(LMouseEvent.MOUSE_UP,self.onClick);
};
CSingled.prototype.onClick = function(event,self){
	self.parent.nextTalk();
	self.parent.addPower();
	if(self.parent.isAllOver == true){
		self.parent.die();
		CGlobal.singledOver({win:self.parent.winner,lose:self.parent.loser});
	}
};
CSingled.prototype.onframe = function(self){
	for(var key in self.charaLayer.childList){
		self.charaLayer.childList[key].onframe();
	}
	if(self.isStartFight == true){
		self.powerBar.reduction(enemyObj.attack/100);
	}
	if(self.roundIndexText != null){
		self.roundIndexText.text = self.roundIndex;
		self.roundIndexText.x = (self._cWidth-self.roundIndexText.getWidth())*0.5;
	}
};
CSingled.prototype.addTalk = function(when){
	var self = this;
	
	var nameList=[],contentList=[];
	for(var i in self.talkList[when]){
		if(self.talkList[when][i].belong == "our"){
			nameList.push(self.ourObj.ChineseName);
		}else if(self.talkList[when][i].belong == "enemy"){
			nameList.push(self.enemyObj.ChineseName);
		}
		contentList.push(self.talkList[when][i].content);
	}
	
	self.talkObj = new CSingledTalk(nameList,contentList);
	self.talkLayer.x = (self._cWidth-self.talkObj.getWidth())*0.5;
	self.talkLayer.y = 10;
	self.talkLayer.addChild(self.talkObj);
	self.showTalkHint();
	self.talkObj.nextTalk();
};
CSingled.prototype.nextTalk = function(){
	var self = this;
	if(self.talkObj == null)return;
	self.showTalkHint();
	self.talkObj.nextTalk();
};
CSingled.prototype.showTalkHint = function(){
	var self = this;
	var middleWidth = self._cWidth/2;
	if(self.talkObj.charaName[self.talkObj.talkIndex] == self.enemyObj.ChineseName){
		if(self.enemyObj.x > middleWidth){
			self.talkHint.x = self.enemyObj.x - 15;
			self.talkHint.y = self.enemyObj.y - 15;
			self.talkHint.scaleX = -1;
		}else{
			self.talkHint.x = self.enemyObj.x + self.enemyObj.getWidth() - 10;
			self.talkHint.y = self.enemyObj.y - 15;
			self.talkHint.scaleX = 1;
		}
	}else{
		if(self.ourObj.x > middleWidth){
			self.talkHint.x = self.ourObj.x - 15;
			self.talkHint.y = self.ourObj.y - 15;
			self.talkHint.scaleX = -1;
		}else{
			self.talkHint.x = self.ourObj.x + self.ourObj.getWidth() - 10;
			self.talkHint.y = self.ourObj.y - 15;
			self.talkHint.scaleX = 1;
		}
	}
	
	self.talkHint.visible = true;
};
CSingled.prototype.nextRound = function(){
	var self = this;
	
	self.roundIndex ++;
	
	var middleX = self._cWidth/2;
	
	if(self.ourObj._startX > middleX){
		var ourToX = middleX+5;
		var enemyToX = middleX-self.ourObj.getWidth()-5;
	}else{
		var ourToX = middleX-self.ourObj.getWidth()-5;
		var enemyToX = middleX+5;
	}

	self.ourObj.moveTo(ourToX,function(){
		self.ourObj.mode = "atc";
		if(self.isStartFight == false && self.enemyObj.isMoveComplete == true){
			self.fight();
		}
	});
	self.enemyObj.moveTo(enemyToX,function(){
		self.enemyObj.mode = "atc";
		if(self.isStartFight == false && self.ourObj.isMoveComplete == true){
			self.fight();
		}
	});
};
CSingled.prototype.fight = function(){
	var self = this;
	
	self.isStartFight = true;
	self.powerBar.start();
};
CSingled.prototype.addPower = function(){
	var self = this;
	if(self.isStartFight == false)return;
	self.powerBar.add((self.ourObj.attack/100)*4);
};
CSingled.prototype.fightWin = function(){
	var self = this;
	
	self.isStartFight = false;
	
	self.ourObj.isStop = false;
	
	self.enemyObj.mode = "move";
	self.enemyObj.isFrameRun = true;
	self.enemyObj.isStop = false;
};
CSingled.prototype.fightLose = function(){
	var self = this;
	
	self.isStartFight = false;
	
	self.enemyObj.isStop = false;
	
	self.ourObj.mode = "move";
	self.ourObj.isFrameRun = true;
	self.ourObj.isStop = false;
};
CSingled.prototype.gameOver = function(){
	var self = this;

	self.removeEventListener(LEvent.ENTER_FRAME,self.onframe);
	
	var back = new LSprite();
	back.alpha = 0.8;
	back.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"black");
	self.contentLayer.addChild(back);
	
	var textObj = new LTextField();
	textObj.size = 30;
	textObj.color = "red";
	textObj.weight = "bold";
	if(self.ourObj.hpBar.value == 0){
		textObj.text = "单挑失败！";
	}else{
		textObj.text = "单挑胜利！";
	}
	textObj.x = (self._cWidth-textObj.getWidth())*0.5;
	textObj.y = (self._cHeight-(textObj.getHeight()+30))*0.5;
	self.contentLayer.addChild(textObj);
	
	var timer = new CTimer(1000,function(){
		self.isAllOver = true;
	});
};