var CGlobal = function(){this.type = "CGlobal";};

CGlobal.stageLayer;
CGlobal.backLayer;
CGlobal.mapLayer;
CGlobal.ourCharaLayer;
CGlobal.enemyCharaLayer;
CGlobal.charaInfoLayer;
CGlobal.ctrlLayer;
CGlobal.hintLayer;
CGlobal.enemyHintLayer;
CGlobal.resultLayer;
CGlobal.singledLayer;

CGlobal.jsFilePath = "./src/";
CGlobal.musicPath = "./music/";

CGlobal.datalist = {};

//是否开启音乐
CGlobal.isMusicPlay = true;
//游戏速度[快速：fast，普通速度：normal]
CGlobal.gameSpeed = "normal";

//开始界面对象
CGlobal.openingPageObj = null;

//菜单栏里被点击的人物对象
CGlobal.selectedCharaObj;
//菜单栏里被点击的人物数据
CGlobal.selectedCharaData = null;

//指示敌人出口的箭头列表
CGlobal.arrowHintList = new Array();

CGlobal.mapObj;
CGlobal.moneyTextObj;
CGlobal.waveTextObj;
CGlobal.lifeTextObj;

CGlobal.stage;
CGlobal.level;
CGlobal.money;
CGlobal.wave;
CGlobal.maxWave;
CGlobal.life;
CGlobal.maxLife;
CGlobal.country;

//判断是否可移动地图变量
CGlobal.isMoveMap = false;
//保存地图移动时初始数据
CGlobal.moveStartPoint;

//士兵样式
CGlobal.soldierStyle = {
	our:null,
	enemy:null
};

//保存我方人物列表
CGlobal.ourCharaList = {
	candidate:new Array(),
	debut:new Array()
};
//保存登场敌军列表
CGlobal.debutEnemy = new Array();
//保存将要登场的敌军
CGlobal.candidateEnemy = new Array();

CGlobal.menuWidth = 150;
CGlobal.charaMenuHeight = LStage.height-140;
CGlobal.mapLength = 48;

//是否暂停游戏
CGlobal.isPause = false;

//判断是否可以添加敌人[true为可以，false为不可以]
CGlobal.isAddEnemy = true;
//是否开始下一波[true:为不可以，false为可以]
CGlobal.isNextWave = false;
//是否显示敌军出场提示[true:为显示了，false为没显示]
CGlobal.isShowEnemyHint = false;
//是否已显示胜利提示框[true:为显示了，false为没显示]
CGlobal.isShowWinPage = false;

CGlobal.initGame = function(){	
	//加载游戏基本数据
	CLoadManager.loadGameBasicData();
	//调整游戏
	CGlobal.adjustGame();
};

CGlobal.adjustGame = function(){
	//设置全屏
	//CGlobal.setFullScreen();
};

CGlobal.setFullScreen = function(){
	var w=window.innerWidth, h=window.innerHeight;
	LGlobal.canvasObj.style.width = w+"px";
	LGlobal.canvasObj.style.height = h+"px";
};

CGlobal.setBasicData = function(){
	CLock.lockSelectLevelPage = false;
	CLock.lockStage = false;
	CLock.lockCharaOperating = false;
	CGlobal.isAddEnemy = true;
	CGlobal.isShowEnemyHint = false;
	CGlobal.ourCharaList = {
		candidate:new Array(),
		debut:new Array()
	};
	CGlobal.isNextWave = false;
	CGlobal.debutEnemy = new Array();
	CGlobal.candidateEnemy = new Array();
	CGlobal.isShowWinPage = false;
};

CGlobal.gameInit = function(){
	//初始化舞台层
	CGlobal.stageLayer = new LSprite();
	CGlobal.stageLayer.name = "stageLayer";
	addChild(CGlobal.stageLayer);
	//初始化最底层
	CGlobal.backLayer = new LSprite();
	CGlobal.backLayer.name = "backLayer";
	CGlobal.stageLayer.addChild(CGlobal.backLayer);
	//加入开始界面
	CGlobal.addBeginingPage();
};

CGlobal.addBeginingPage = function(){
	//实例化开始界面
	CGlobal.openingPageObj = new COpeningPage();
	CGlobal.stageLayer.addChild(CGlobal.openingPageObj);
	//加入渐变层
	var back = new LSprite();
	back.graphics.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
	CGlobal.stageLayer.addChild(back);
	LTweenLite.to(back,1,{
		delay: 0.5,
		alpha: 0,
		onComplete:function(s){
			s.parent.removeChild(s);
		}
	});
	//关闭所有音乐
	CMusicManager.closeAllMusic();
	//播放音乐
	CMusicManager.soundObjList["opening_page"].play();	
};

CGlobal.clearBackLayer = function(){
	CGlobal.backLayer.die();
	CGlobal.backLayer.removeAllChild();
	CGlobal.backLayer.graphics.clear();
};

CGlobal.clearAll = function(){
	CGlobal.backLayer.x = 0;
	CGlobal.backLayer.y = 0;
	CGlobal.clearBackLayer();
	CGlobal.stageLayer.removeAllChild();
	CGlobal.stageLayer.die();
	//初始化最底层
	CGlobal.backLayer = new LSprite();
	CGlobal.backLayer.name = "backLayer";
	CGlobal.stageLayer.addChild(CGlobal.backLayer);
};

/**
 *选关界面
*/
CGlobal.gotoSelectLevelPage = function(){
	//清除界面
	CGlobal.clearAll();
	//加载并显示选关界面
	CLoadManager.loadSelectLevelPage();
};
CGlobal.addSelectLevelPage = function(){
	var selectLevelPage = new CSelectLevelPage();
	CGlobal.stageLayer.addChild(selectLevelPage);

	//关闭所有音乐
	CMusicManager.closeAllMusic();
	//播放音乐
	CMusicManager.soundObjList["select_level_page"].play();	
};

CGlobal.startGame = function(script){
	CGlobal.level = script;
	
	//清除界面
	CGlobal.clearAll();
	
	//加载战场数据
	CLoadManager.loadStageData();
};

CGlobal.initStagePrototype = function(){
	CGlobal.money = CGlobal.stage.stagePrototype.money;
	CGlobal.maxLife = CGlobal.stage.stagePrototype.life;
	CGlobal.life = CGlobal.maxLife;
	CGlobal.wave = 0;
	
	//设置最大波数
	var amount = 0;
	for(var key in CGlobal.stage["enemyList"]){
		amount ++;
	}
	CGlobal.maxWave = amount;
	CGlobal.country = CGlobal.stage.country;
	//初始化出场人物
	CGlobal.initCandidateChara();
	//初始化士兵样式
	CGlobal.initsoldierStyle();
};

CGlobal.initCandidateChara = function(){
	for(var key in CGlobal.stage.candidateChara){
		CGlobal.ourCharaList.candidate.push(CGlobal.stage.candidateChara[key]);
	}
	CGlobal.ourCharaList.candidate.push("daobing");
	CGlobal.ourCharaList.candidate.push("gongjianbing");
	CGlobal.ourCharaList.candidate.push("qingqibing");
	CGlobal.ourCharaList.candidate.push("shubing");
};

CGlobal.initsoldierStyle = function(){
	CGlobal.soldierStyle["our"] = soldierStyleData[CGlobal.country["our"]];
	CGlobal.soldierStyle["enemy"] = soldierStyleData[CGlobal.country["enemy"]];
};

CGlobal.initLayer = function(){
	//初始化地图层
	CGlobal.mapLayer = new LSprite();
	CGlobal.mapLayer.name = "mapLayer";
	CGlobal.backLayer.addChild(CGlobal.mapLayer);
	//初始化我方人物层
	CGlobal.enemyCharaLayer = new LSprite();
	CGlobal.enemyCharaLayer.name = "enemyCharaLayer";
	CGlobal.backLayer.addChild(CGlobal.enemyCharaLayer);
	//初始化敌方人物层
	CGlobal.ourCharaLayer = new LSprite();
	CGlobal.ourCharaLayer.name = "ourCharaLayer";
	CGlobal.backLayer.addChild(CGlobal.ourCharaLayer);
	//初始化控制层
	CGlobal.ctrlLayer = new LSprite();
	CGlobal.ctrlLayer.name = "ctrlLayer";
	CGlobal.stageLayer.addChild(CGlobal.ctrlLayer);
	//加入暂停按钮
	var pauseObj = new CControlGameButton("pause_icon","play_icon",function(mode){
		if(mode == 0){
			CGlobal.isPause = false;
			CLock.lockStageExceptControlOurChara = false;
		}else if(mode == 1){
			CGlobal.isPause = true;
			CLock.lockStageExceptControlOurChara = true;
		}
	});
	pauseObj.x = 20;
	pauseObj.y = 3;
	CGlobal.stageLayer.addChild(pauseObj);
	//初始化菜单中被选中的人物对象
	CGlobal.selectedCharaObj = new LSprite();
	CGlobal.selectedCharaObj.name = "selectedCharaObj";
	CGlobal.selectedCharaObj.alpha = 0.7;
	CGlobal.stageLayer.addChild(CGlobal.selectedCharaObj);
	//初始化提示层
	CGlobal.hintLayer = new LSprite();
	CGlobal.hintLayer.name = "hintLayer";
	CGlobal.stageLayer.addChild(CGlobal.hintLayer);
	
	CGlobal.enemyHintLayer = new LSprite();
	CGlobal.enemyHintLayer.name = "enemyHintLayer";
	CGlobal.stageLayer.addChild(CGlobal.enemyHintLayer);
	//初始化人物信息层
	CGlobal.charaInfoLayer = new LSprite();
	CGlobal.charaInfoLayer.name = "charaInfoLayer";
	CGlobal.stageLayer.addChild(CGlobal.charaInfoLayer);
	//初始化结果层
	CGlobal.resultLayer = new LSprite();
	CGlobal.resultLayer.name = "resultLayer";
	CGlobal.stageLayer.addChild(CGlobal.resultLayer);
	//初始化单挑层
	CGlobal.singledLayer = new LSprite();
	CGlobal.singledLayer.name = "singledLayer";
	CGlobal.stageLayer.addChild(CGlobal.singledLayer);
	//加入FPS
	var fps = new FPS();
	fps.name = "fps";
	CGlobal.stageLayer.addChild(fps);
};

CGlobal.addEvent = function(){
	//加入鼠标点击事件
	CGlobal.backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,CGlobal.onDown);
	//加入鼠标弹起事件
	CGlobal.backLayer.addEventListener(LMouseEvent.MOUSE_UP,CGlobal.onUp);
	//加入鼠标移动事件
	CGlobal.backLayer.addEventListener(LMouseEvent.MOUSE_MOVE,CGlobal.onMove);
	//加入鼠标移出事件
	CGlobal.backLayer.addEventListener(LMouseEvent.MOUSE_OUT,CGlobal.onUp);
	
	//加入控制层鼠标点击事件
	CGlobal.ctrlLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
		if(CLock.lockStage)return;
		CGlobal.isMoveMap = false;
		CGlobal.selectedCharaData = null;
		CGlobal.isAddChara = false;
		CGlobal.selectedCharaObj.removeAllChild();
		CGlobal.selectedCharaObj.die();
	});
	//加入控制层鼠标弹起事件
	CGlobal.ctrlLayer.addEventListener(LMouseEvent.MOUSE_UP,function(){
		CGlobal.isMoveMap = false;
		if(CGlobal.isPause == false)CLock.lockStageExceptControlOurChara = false;
		//清除被选中人物
		CGlobal.selectedCharaObj.removeAllChild();
		CGlobal.selectedCharaData = null;
	});
	//加入控制层鼠标移动事件
	CGlobal.ctrlLayer.addEventListener(LMouseEvent.MOUSE_MOVE,function(event){
		if(CGlobal.isLockStage)return;
		CGlobal.isMoveMap = false;
		if(CGlobal.selectedCharaData != null){	
			//移动被选中人物
			CGlobal.selectedCharaObj.x = event.offsetX-CGlobal.selectedCharaObj.getWidth()/2;
			CGlobal.selectedCharaObj.y = event.offsetY-CGlobal.selectedCharaObj.getHeight()/2;
		}
	});
	
	//加入时间轴事件
	CGlobal.backLayer.addEventListener(LEvent.ENTER_FRAME,CGlobal.onframe);
};

CGlobal.addGamePage = function(){
	//加入控制区
	CGlobal.ctrlLayer.x = LStage.width-CGlobal.menuWidth;
	CGlobal.ctrlLayer.graphics.drawRect(1,"black",[0,0,CGlobal.menuWidth,LStage.height],true,"#333333")
	//显示菜单栏
	var maskLayer = new LSprite();
	maskLayer.graphics.drawRect(0,"",[0,20,CGlobal.menuWidth,CGlobal.charaMenuHeight-20],true,"#333333");
	var menuObj = new CCharaSelectingMenu(CGlobal.ctrlLayer);
	menuObj.mask = maskLayer;
	//加入切换人物菜单的按钮
	var changeButton = new LSprite();
	var changeBitmapData = new LBitmapData(CGlobal.datalist["switch_icon"]);
	var changeBitmap = new LBitmap(changeBitmapData);
	changeButton.addChild(changeBitmap);
	CGlobal.ctrlLayer.addChild(changeButton);
	
	changeButton.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(CLock.lockStage)return;
		CGlobal.changeCharaMenu(menuObj);
	});
	//加入游戏地图
	CGlobal.mapObj = new CTileMap(CGlobal.stage.map.imageMap,CGlobal.stage.map.dataMap);
	CGlobal.mapLayer.addChild(CGlobal.mapObj);
	//加入文字
	CGlobal.moneyTextObj = new LTextField();
	CGlobal.moneyTextObj.color = "white";
	CGlobal.moneyTextObj.x = 20;
	CGlobal.moneyTextObj.y = 410;
	CGlobal.ctrlLayer.addChild(CGlobal.moneyTextObj);
	
	CGlobal.lifeTextObj = new LTextField();
	CGlobal.lifeTextObj.color = "white";
	CGlobal.lifeTextObj.x = 20;
	CGlobal.lifeTextObj.y = 440;
	CGlobal.ctrlLayer.addChild(CGlobal.lifeTextObj);
	
	CGlobal.waveTextObj = new LTextField();
	CGlobal.waveTextObj.color = "white";
	CGlobal.waveTextObj.x = 20;
	CGlobal.waveTextObj.y = 380;
	CGlobal.ctrlLayer.addChild(CGlobal.waveTextObj);
};

CGlobal.addBattlefieldMusic = function(){
	CMusicManager.closeAllMusic();
	CMusicManager.soundObjList["battlefield"].play();
};

CGlobal.changeCharaMenu = function(o){
	var menuHeight = -1*CGlobal.charaMenuHeight+20;
	if(o.y == 0){
		o.y = menuHeight;
	}else if(o.y == menuHeight){
		o.y = 0;
	}
};

CGlobal.onDown = function(event){
	if(CLock.lockStage)return;
	
	//将是否移动地图设为true，表示可以移动
	CGlobal.isMoveMap = true;
	//保存点击时的位置
	CGlobal.moveStartPoint = {x:event.offsetX,y:event.offsetY,bx:CGlobal.backLayer.x,by:CGlobal.backLayer.y};

	//显示攻击范围
	if(CGlobal.ourCharaLayer.childList.length == 0)return;
	for(var key in CGlobal.ourCharaLayer.childList){
		var o = CGlobal.ourCharaLayer.childList[key];
		if(
			event.selfX >= o.x
			&& event.selfX <= o.x+o.bitmap.getWidth()
			&& event.selfY >= o.y
			&& event.selfY <= o.y+o.bitmap.getHeight()
		){
			o.onclick(event,o);
			break;
		}
	}
};

CGlobal.onUp = function(event){
	if(CLock.lockStage)return;
	//添加我方人物
	if(CGlobal.selectedCharaData != null){
		CGlobal.addOur(event);
	}else{
		//将是否移动地图设为false，表示不可以移动
		CGlobal.isMoveMap = false;
	}
};

CGlobal.onMove = function(event){
	if(CGlobal.selectedCharaData != null){
		CGlobal.moveSelectingChara(event);
	}else{
		CGlobal.moveMap(event);
	}
};

CGlobal.moveSelectingChara = function(event){
	var ix = Math.round(Math.abs(CGlobal.backLayer.x)/CGlobal.mapLength)*CGlobal.mapLength - Math.abs(CGlobal.backLayer.x);
	var iy = Math.round(Math.abs(CGlobal.backLayer.y)/CGlobal.mapLength)*CGlobal.mapLength - Math.abs(CGlobal.backLayer.y);
	
	var x = Math.floor(event.offsetX/CGlobal.mapLength)*CGlobal.mapLength+ix;
	var y = Math.floor(event.offsetY/CGlobal.mapLength)*CGlobal.mapLength+iy;

	CGlobal.selectedCharaObj.x = x;
	CGlobal.selectedCharaObj.y = y;
};

CGlobal.moveMap = function(event){
	if(CLock.lockStage)return;
	if(CGlobal.isMoveMap == false)return;
	//移动地图
	CGlobal.backLayer.x = event.offsetX-CGlobal.moveStartPoint.x+CGlobal.moveStartPoint.bx;
	CGlobal.backLayer.y = event.offsetY-CGlobal.moveStartPoint.y+CGlobal.moveStartPoint.by;
	//限制地图范围
	if(CGlobal.backLayer.x > 0){
		CGlobal.backLayer.x = 0;
	}else if(CGlobal.backLayer.x < LStage.width-150-CGlobal.mapObj.getWidth()){
		CGlobal.backLayer.x = LStage.width-150-CGlobal.mapObj.getWidth();
	}
	if(CGlobal.backLayer.y > 0){
		CGlobal.backLayer.y = 0;
	}else if(CGlobal.backLayer.y < LStage.height-CGlobal.mapObj.getHeight()){
		CGlobal.backLayer.y = LStage.height-CGlobal.mapObj.getHeight();
	}
	//旋转指示出口的箭头
	if(CGlobal.arrowHintList.length == 0)return;
	for(var key in CGlobal.arrowHintList){
		CGlobal.arrowHintList[key].resetOutset();
		CGlobal.arrowHintList[key].rotateSelf();
	}
};

CGlobal.onframe = function(){
	/**显示数据*/
	CGlobal.showInfoText();
	/**游戏主循环*/
	if(CLock.lockStage || CLock.lockStageExceptControlOurChara)return;
	for(var key in CGlobal.enemyCharaLayer.childList){
		CGlobal.enemyCharaLayer.childList[key].onframe();
	}
	for(var key in CGlobal.ourCharaLayer.childList){
		CGlobal.ourCharaLayer.childList[key].onframe();
	}
	
	//添加敌军
	if(CGlobal.isAddEnemy == true){
		if(CGlobal.isNextWave == false){
			CGlobal.isNextWave = true;
			CGlobal.nextWave();
		}
		if(CGlobal.isShowEnemyHint == true){
			if(CGlobal.enemyCharaLayer.childList.length == 0){
				//加入一个敌军
				CGlobal.addEnemy();
			}else{
				var ec = CGlobal.enemyCharaLayer.childList;
				var moveXDistance = Math.abs((ec[ec.length-1].x - ec[ec.length-1]._startX)/(CGlobal.mapLength+10));
				var moveYDistance = Math.abs((ec[ec.length-1].y - ec[ec.length-1]._startY)/(CGlobal.mapLength+10));
				if(moveXDistance >= 1 || moveYDistance >= 1){
					//加入一个敌军
					CGlobal.addEnemy();
				}
			}
		}
	}
};

CGlobal.showInfoText = function(){
	if(CGlobal.life < 0)CGlobal.life = 0;
	CGlobal.moneyTextObj.text = "金币："+CGlobal.money;
	CGlobal.lifeTextObj.text = "生命值："+CGlobal.life;
	CGlobal.waveTextObj.text = "进程："+CGlobal.wave+"/"+CGlobal.maxWave;
};

CGlobal.addOur = function(event){
	if(CGlobal.isPause == false)CLock.lockStageExceptControlOurChara = false;

	var x = Math.floor(event.selfX/CGlobal.mapLength);
	var y = Math.floor(event.selfY/CGlobal.mapLength);
	if(CGlobal.mapObj.mapTerrain[y][x] == 0 && CGlobal.isCostMoney(charaData[CGlobal.selectedCharaData.name].cost) == true && CGlobal.isPresence(CGlobal.selectedCharaData.name)){
		//添加人物
		var chara = new CAttackChara(CGlobal.selectedCharaData.name,x*CGlobal.mapLength,y*CGlobal.mapLength,CGlobal.soldierStyle["our"]);
		CGlobal.ourCharaLayer.addChild(chara);
		//设置当前位置为不可再添加人物
		CGlobal.mapObj.mapTerrain[y][x] = 1;
	}
	//清除被选中人物
	CGlobal.selectedCharaObj.removeAllChild();
	CGlobal.selectedCharaData = null;
};

CGlobal.isPresence = function(name){
	var data = charaData[name];
	//判断出场次数是否是无限次
	if(data.amount == "countless")return true;
	
	var amount = 0;
	//计算当前角色场上个数
	for(var i in CGlobal.ourCharaList.debut){
		if(CGlobal.ourCharaList.debut[i].name == name){
			amount++;
		}
	}
	//判断是否可以继续出场
	if(amount >= data.amount){
		var hintObj = new CHintObject("该角色只能部署"+amount+"次！");
		return false;
	}
	return true;
};

CGlobal.enemyHint = function(){
	var d = CGlobal.stage.enemyList["wave"+CGlobal.wave];
	var hintObj = new CEnemyHint(d);
};

CGlobal.nextWave = function(){
	CGlobal.debutEnemy.splice(0,CGlobal.debutEnemy.length);
	CGlobal.candidateEnemy.splice(0,CGlobal.candidateEnemy.length);
	if(CGlobal.wave < CGlobal.maxWave){
		CGlobal.wave++;
		for(var key in CGlobal.stage.enemyList["wave"+CGlobal.wave]){
			var item = CGlobal.stage.enemyList["wave"+CGlobal.wave][key];
			CGlobal.candidateEnemy.push(item);
		}
		//加入提示
		CGlobal.enemyHint();
	}else if(CGlobal.life > 0){
		CGlobal.isAddEnemy = false;
		CGlobal.isNextWave = true;
		CLock.lockCharaOperating = true;
		//加入胜利界面
		if(CGlobal.isShowWinPage)return;
		//清除被选中人物
		CGlobal.selectedCharaObj.removeAllChild();
		CGlobal.selectedCharaData = null;
		CGlobal.isShowWinPage = true;
		var timer = new CTimer(2000,CGlobal.gameWin);
	}
};

CGlobal.getResult = function(){
	if(CGlobal.maxLife-CGlobal.life == 0){
		return 5;
	}else if(CGlobal.maxLife-CGlobal.life >= 3){
		return 4;
	}else if(CGlobal.maxLife-CGlobal.life >= 5){
		return 3;
	}else if(CGlobal.maxLife-CGlobal.life >= 10){
		return 2;
	}else{
		return 1;
	}
};

CGlobal.gameWin = function(){
	//获取战斗评分
	var result = CGlobal.getResult();
	//锁定界面
	CLock.lockStage = true;
	//加入胜利界面
	var winObj = new CWinPage(result);
	CGlobal.resultLayer.addChild(winObj);
};

CGlobal.gameOver = function(){
	//清除被选中人物
	CGlobal.selectedCharaObj.removeAllChild();
	CGlobal.selectedCharaData = null;
	//锁定界面
	CLock.lockStage = true;
	CLock.lockCharaOperating = true;
	//加入失败界面
	var loseObj = new CLosePage();
	CGlobal.resultLayer.addChild(loseObj);
};

CGlobal.addEnemy = function(){
	if(CGlobal.debutEnemy.length >= CGlobal.stage.enemyList["wave"+CGlobal.wave].length){
		CGlobal.isAddEnemy = false;
		CGlobal.isShowEnemyHint = false;
	}
	if(CGlobal.isAddEnemy == false)return;
	if(CGlobal.enemyCharaLayer.childList.length < CGlobal.stage.enemyList["wave"+CGlobal.wave].length){
		//加入敌人
		var enemy = new CEnemy(CGlobal.stage.enemyList["wave"+CGlobal.wave][CGlobal.debutEnemy.length],CGlobal.soldierStyle["enemy"]);
		CGlobal.enemyCharaLayer.addChild(enemy);
	}
};

CGlobal.isCostMoney = function(cost){
	if(CGlobal.money-cost >= 0)return true;
	var hintObj = new CHintObject("金币不足！");
	return false;
};

/**
 *单挑相关
*/
CGlobal.gotoSingled = function(data){
	CLock.lockStage = true;
	var singledObj = new CSingled(data);
	CGlobal.singledLayer.addChild(singledObj);
};

CGlobal.singledOver = function(d){
	var winner=d.win, loser=d.lose;
	CGlobal.singledLayer.removeAllChild();
	if(loser.belong == "enemy"){
		for(var key in CGlobal.enemyCharaLayer.childList){
			var o = CGlobal.enemyCharaLayer.childList[key];
			if(o.name == loser.name){
				o.removeSelf();
				break;
			}
		}
	}else{
		for(var key in CGlobal.ourCharaLayer.childList){
			var o = CGlobal.ourCharaLayer.childList[key];
			if(o.name == loser.name){
				o.removeSelf();
				break;
			}
		}
	}
	CLock.lockStage = false;
};

/**
 *关于界面相关
*/
CGlobal.aboutGame = function(){
	//清除界面
	CGlobal.clearAll();
	//加载界面
	CLoadManager.loadAboutPage();
};

CGlobal.showAboutPage = function(){
	var aboutObj = new CAboutPage();
	CGlobal.stageLayer.addChild(aboutObj);
	//关闭所有音乐
	CMusicManager.closeAllMusic();
	//播放音乐
	CMusicManager.soundObjList["about_page"].play();
};

/**
 *设置界面相关
*/
CGlobal.setGame = function(){
	CLock.lockOpeningPage = true;
	//加载界面
	CLoadManager.loadSettingPage();
};

CGlobal.showSettingPage = function(){
	var settingObj = new CSettingPage();
	CGlobal.stageLayer.addChild(settingObj);
};

/**
 *武将一览界面相关
*/
CGlobal.generalExhibition = function(){
	//清除界面
	CGlobal.clearAll();
	//加载武将一览界面
	CLoadManager.loadExhibition();
};

CGlobal.showExhibition = function(){
	var exhibitionPage = new CExhibition();
	CGlobal.stageLayer.addChild(exhibitionPage);
	//关闭所有音乐
	CMusicManager.closeAllMusic();
	//播放音乐
	CMusicManager.soundObjList["exhibition_page"].play();
};

/**
 *检测圆形和矩形碰撞
*/
CGlobal.isSameQuadrant = function(cood,objA,objB){
	var coodX = cood.x;
	var coodY = cood.y;
	var xoA = objA.x
	,yoA = objA.y
	,xoB = objB.x
	,yoB = objB.y;
	
	if(xoA-coodX>0 && xoB-coodX>0){
		if((yoA-coodY>0 && yoB-coodY>0) || (yoA-coodY<0 && yoB-coodY<0)){
			return true;
		}
		return false;
	}else if(xoA-coodX<0 && xoB-coodX<0){
		if((yoA-coodY>0 && yoB-coodY>0) || (yoA-coodY<0 && yoB-coodY<0)){
			return true;
		}
		return false;
	}else{
		return false;
	}
};

CGlobal.hitTestRectArc = function(rectObj,arcObj,isIncludingTangent){
	var rw = rectObj.getWidth()
	,rh = rectObj.getHeight()
	,ar = arcObj.getWidth()*0.5
	,rx = rectObj.x
	,ry = rectObj.y
	,ax = arcObj.x
	,ay = arcObj.y;
	
	var rcx = rx+rw*0.5,rcy = ry+rh*0.5;
	var rltx = rx
	,rlty = ry
	,rlbx = rx
	,rlby = ry+rh
	,rrtx = rx+rw
	,rrty = ry
	,rrbx = rx+rw
	,rrby = ry+rh;
	
	if(
		CGlobal.isSameQuadrant(
			{x:ax,y:ay},
			{x:rltx,y:rlty},
			{x:rrbx,y:rrby}
		)
	){
		var dX1 = (ax-rltx)>=(rltx-ax) ? (ax-rltx) : (rltx-ax),
			dY1 = (ay-rlty)>=(rlty-ay) ? (ay-rlty) : (rlty-ay);
		var dX2 = (ax-rlbx)>=(rlbx-ax) ? (ax-rlbx) : (rlbx-ax),
			dY2 = (ay-rlby)>=(rlby-ay) ? (ay-rlby) : (rlby-ay);
		var dX3 = (ax-rrtx)>=(rrtx-ax) ? (ax-rrtx) : (rrtx-ax),
			dY3 = (ay-rrty)>=(rrty-ay) ? (ay-rrty) : (rrty-ay);
		var dX4 = (ax-rrbx)>=(rrbx-ax) ? (ax-rrbx) : (rrbx-ax),
			dY4 = (ay-rrby)>=(rrby-ay) ? (ay-rrby) : (rrby-ay);
		
		if(
			(((dX1*dX1) + (dY1*dY1)) <= (ar*ar))
			||(((dX2*dX2) + (dY2*dY2)) <= (ar*ar))
			||(((dX3*dX3) + (dY3*dY3)) <= (ar*ar))
			||(((dX4*dX4) + (dY4*dY4)) <= (ar*ar))
		){
			if(isIncludingTangent == false){
				if(
					(((dX1*dX1) + (dY1*dY1)) == (ar*ar))
					||(((dX2*dX2) + (dY2*dY2)) == (ar*ar))
					||(((dX3*dX3) + (dY3*dY3)) == (ar*ar))
					||(((dX4*dX4) + (dY4*dY4)) == (ar*ar))
				){
					return false;
				}else{
					return true;
				}
			}else{
				return true;
			}
		}
		return false;
	}else{
		var result = false;
		var squareX = ax
		,squareY = ay
		,squareW = ar*2
		,squareH = squareW;
		if(
			(Math.abs(squareX-rcx) <= (squareW+rw)*0.5)
			&&(Math.abs(squareY-rcy) <= (squareH+rh)*0.5)
		){
			if(isIncludingTangent == false){
				if(
					(Math.abs(squareX-rcx) == (squareW+rw)*0.5)
					||(Math.abs(squareY-rcy) == (squareH+rh)*0.5)
				){
					result = false;
				}else{
					result = true;
				}
			}else{
				result = true;
			}
		}
		return result;
	}
};
