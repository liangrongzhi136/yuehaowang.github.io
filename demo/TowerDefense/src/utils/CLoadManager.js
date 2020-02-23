var CLoadManager = function(){this.type = "CLoadManager";};

CLoadManager.loadData = [
	{path:CGlobal.jsFilePath+"utils/CLock.js",type:"js"},
	{path:CGlobal.jsFilePath+"utils/CTimer.js",type:"js"},
	{path:CGlobal.jsFilePath+"utils/CMusicManager.js",type:"js"},
	{path:CGlobal.jsFilePath+"utils/CSound.js",type:"js"},
	
	{path:CGlobal.jsFilePath+"window/CLoadingBar.js",type:"js"},
	{path:CGlobal.jsFilePath+"window/CPageBorder.js",type:"js"},
	{path:CGlobal.jsFilePath+"window/CCloseButton.js",type:"js"},

	{path:"./script/script.js",type:"js"},
	{path:"./initialization/levelData.js",type:"js"},
	{path:"./initialization/charaData.js",type:"js"},
	{path:"./initialization/armsData.js",type:"js"},
	{path:"./initialization/animationData.js",type:"js"},
	{path:"./initialization/skillData.js",type:"js"},
	{path:"./initialization/soldierStyleData.js",type:"js"},

	{name:"border_left",path:"./images/system/border_left.png"},
	{name:"border_top",path:"./images/system/border_top.png"},
	{name:"border_decoration",path:"./images/system/border_decoration.png"},
	{name:"ink_button",path:"./images/system/ink_button.png"},
	
	{name:"opening_back",path:"./images/background/opening_back.png"},
	
	{name:"loading_back01",path:"./images/background/loading_back01.png"},
	{name:"loading_back02",path:"./images/background/loading_back02.png"},
	{name:"loading_back03",path:"./images/background/loading_back03.png"},
	{name:"loading_back04",path:"./images/background/loading_back04.png"},
	{name:"loading_back05",path:"./images/background/loading_back05.png"}
];
CLoadManager.readyLoadList = new Array();
CLoadManager.scriptLoadCompleteList = new Array();
CLoadManager.musicLoadCompleteList = new Array();
CLoadManager.jsFileLoadCompleteList = new Array();

/**
 *加载开始界面的数据
*/
CLoadManager.loadGameBasicData = function(){	
	var loadingObj = new CSimpleLoadingBar();
	addChild(loadingObj);
	
	CJsManager.addFlieToList(CJsManager.openingPageJs);
	
	LLoadManage.load(
		CLoadManager.loadData,
		function(p){
			loadingObj.setProgress(p);
		},
		function(result){
			var back = new LGraphics();
			back.drawRect(0,"",[0,0,LStage.width,LStage.height],true,"black");
			addChild(back);
			removeChild(loadingObj);
			var completeFunc = function(){
				removeChild(back);
				//初始化游戏
				CGlobal.gameInit();
			};
			CGlobal.datalist = result;
			//加载音乐
			CMusicManager.loadBackgroundMusic();
			//添加音乐加载完成事件
			CMusicManager.soundObjList["opening_page"].addEventListener(LEvent.COMPLETE,completeFunc);
		}
	);
};

/**
 *加载选关界面的数据
*/
CLoadManager.loadSelectLevelPage = function(){
	CLoadManager.loadData = new Array();
	
	var loadList = [
		{name:"chinese_map",path:"./images/map/chinese_map.png"},
		{name:"city",path:"./images/others/city.png"},
		{name:"domestic_clouds",path:"./images/others/domestic_clouds.png"},
		{name:"widgets",path:"./images/system/widgets.png"},
		{name:"bingying",path:"./images/others/bingying.png"}
	];
	
	for(var index in loadList){
		if(!CLoadManager.isLoad(loadList[index].name)){
			CLoadManager.loadData.push(loadList[index]);
			CLoadManager.readyLoadList.push(loadList[index].name);
		}
	}
	
	CJsManager.addFlieToList(CJsManager.selectLevelPageJs);
	
	if(CLoadManager.loadData.length == 0){
		if(CLoadManager.isLoad("select_level_page","music") == false){
			CMusicManager.soundObjList["select_level_page"].addEventListener(LEvent.COMPLETE,function(){
				CGlobal.addSelectLevelPage();
			});
		}else{
			CGlobal.addSelectLevelPage();
		}
		return;
	}
	
	var loadingLayer = new CLoadingBar();
	addChild(loadingLayer);
	
	LLoadManage.load(
		CLoadManager.loadData,
		function(p){
			loadingLayer.setProgress(p);
		},
		function(result){
			for(var key in result){
				CGlobal.datalist[key] = result[key];
			}
			var completeFunc = function(){
				removeChild(loadingLayer);
				CGlobal.addSelectLevelPage();
			};
			if(CLoadManager.isLoad("select_level_page","music") == false){
				CMusicManager.soundObjList["select_level_page"].addEventListener(LEvent.COMPLETE,function(){
					completeFunc();
				});
			}else{
				completeFunc();
			}
		}
	);
};

/**
 *加载脚本数据
*/
CLoadManager.loadStageData = function(){
	CLoadManager.loadData = new Array();
	CLoadManager.loadData.push({path:"./script/"+CGlobal.level+".js",type:"js"});
	CLoadManager.scriptLoadCompleteList.push(CGlobal.level);
	
	if(CLoadManager.isLoad(CGlobal.level,"script")){
		LLoadManage.load(
			CLoadManager.loadData,
			null,
			function(){
				//保存关卡数据
				CGlobal.stage = script["stage"+CGlobal.level];
				//初始化战场属性
				CGlobal.initStagePrototype();
				//加载图片
				CLoadManager.loadBattlefieldImg();
			}
		);
	}else{
		//保存关卡数据
		CGlobal.stage = script["stage"+CGlobal.level];
		//初始化战场属性
		CGlobal.initStagePrototype();
		//加载图片
		CLoadManager.loadBattlefieldImg();
	}
};

/**
 *加载战场的数据
*/
CLoadManager.loadBattlefieldImg = function(){
	var enemy_lastLoadObj = null,
	candidate_lastLoadObj = null;
	
	CLoadManager.loadData = new Array();
	
	var otherImgList = [
		{name:"map",path:"./images/map/map.jpg"},
		{name:"skills",path:"./images/system/skills.png"},
		{name:"golden_arrow",path:"./images/system/golden_arrow.png"},
		{name:"levelup_icon",path:"./images/others/levelup_icon.png"},
		{name:"delete_icon",path:"./images/others/delete_icon.png"},
		{name:"info_icon",path:"./images/others/info_icon.png"},
		{name:"star_icon",path:"./images/others/star_icon.png"},
		{name:"launch_skill",path:"./images/others/launch_skill.png"},
		{name:"fire_globe",path:"./images/effect/fire_globe.png"},
		{name:"red_swirl",path:"./images/effect/red_swirl.png"},
		{name:"blue_swirl",path:"./images/effect/blue_swirl.png"},
		{name:"yellow_swirl",path:"./images/effect/yellow_swirl.png"},
		{name:"switch_icon",path:"./images/others/switch_icon.png"},
		{name:"win_word",path:"./images/word/win_word.png"},
		{name:"lose_word",path:"./images/word/lose_word.png"},
		{name:"play_icon",path:"./images/system/play_icon.png"},
		{name:"pause_icon",path:"./images/system/pause_icon.png"}
	];
	
	for(var index in otherImgList){
		if(!CLoadManager.isLoad(otherImgList[index].name)){
			CLoadManager.loadData.push(otherImgList[index]);
			CLoadManager.readyLoadList.push(otherImgList[index].name);
		}
	}
	
	var o_soldierStyle = CGlobal.soldierStyle["our"];
	var e_soldierStyle = CGlobal.soldierStyle["enemy"];
	
	//将我军出场人物图片放入加载列表
	for(var key in CGlobal.ourCharaList.candidate){
		if(charaData[CGlobal.ourCharaList.candidate[key]].attribute == "soldier"){
			var imgName = CGlobal.ourCharaList.candidate[key]+o_soldierStyle;
		}else if(charaData[CGlobal.ourCharaList.candidate[key]].attribute == "general" && charaData[CGlobal.ourCharaList.candidate[key]].isNormal == false){
			var imgName = CGlobal.ourCharaList.candidate[key];
		}else{
			var imgName = "normal"+charaData[CGlobal.ourCharaList.candidate[key]].normalStyle;
		}
		
		if(CLoadManager.isLoad(imgName))continue;
		
		CLoadManager.loadData.push({name:imgName+"_attack",path:"./images/character/attack/"+imgName+".png"});
		CLoadManager.loadData.push({name:imgName+"_move",path:"./images/character/move/"+imgName+".png"});
		CLoadManager.readyLoadList.push(imgName);
		//加载人物升级后的图片
		CLoadManager.loadCharaLevelUpImg(CGlobal.ourCharaList.candidate[key],o_soldierStyle);
		
		var faceName;
		if(charaData[CGlobal.ourCharaList.candidate[key]].isNormal == true){
			faceName = "normal"+charaData[CGlobal.ourCharaList.candidate[key]].normalStyle;
		}else if(charaData[CGlobal.ourCharaList.candidate[key]].attribute == "soldier"){
			faceName = "bing";
		}else{
			faceName = imgName;
		}
		if(!CLoadManager.isLoad(faceName+"_face")){
			CLoadManager.loadData.push({name:faceName+"_face",path:"./images/character/face/"+faceName+".png"});
			CLoadManager.readyLoadList.push(faceName+"_face");
		}
	}
	//将敌军人物图片放入加载列表
	for(var i in CGlobal.stage.enemyList){
		for(var j in CGlobal.stage.enemyList[i]){
			if(charaData[CGlobal.stage.enemyList[i][j].name].attribute == "soldier"){
				var imgName = CGlobal.stage.enemyList[i][j].name+e_soldierStyle;
			}else if(charaData[CGlobal.stage.enemyList[i][j].name].attribute == "general" && charaData[CGlobal.stage.enemyList[i][j].name].isNormal == false){
				var imgName = CGlobal.stage.enemyList[i][j].name;
			}else{
				var imgName = "normal"+charaData[CGlobal.stage.enemyList[i][j].name].normalStyle;
			}
			
			if(CLoadManager.isLoad(imgName))continue;

			CLoadManager.loadData.push({name:imgName+"_attack",path:"./images/character/attack/"+imgName+".png"});
			CLoadManager.loadData.push({name:imgName+"_move",path:"./images/character/move/"+imgName+".png"});
			var faceImgName = imgName;
			if(charaData[CGlobal.stage.enemyList[i][j].name].attribute == "soldier"){
				faceImgName = "bing";
			}else if(charaData[CGlobal.stage.enemyList[i][j].name].isNormal == true){
				faceImgName = "normal"+charaData[CGlobal.stage.enemyList[i][j].name].normalStyle;
			}
			CLoadManager.loadData.push({name:faceImgName+"_face",path:"./images/character/face/"+faceImgName+".png"});
			CLoadManager.readyLoadList.push(imgName);
			//加载人物升级后的图片
			CLoadManager.loadCharaLevelUpImg(CGlobal.stage.enemyList[i][j].name,CGlobal.soldierStyle["enemy"]);
		}
	}
	
	CJsManager.addFlieToList(CJsManager.battlefieldJs);
	
	var initBattlefield = function(){
		//初始化层
		CGlobal.initLayer();
		//加入战场音乐
		CGlobal.addBattlefieldMusic();
		//加入游戏界面
		CGlobal.addGamePage();
		//加入事件
		CGlobal.addEvent();
	};
	
	if(CLoadManager.loadData.length == 0){
		if(CLoadManager.isLoad("battlefield","music") == false){
			CMusicManager.soundObjList["battlefield"].addEventListener(LEvent.COMPLETE,function(){
				initBattlefield();
			});
		}else{
			initBattlefield();
		}
		return;
	}
	
	var loadingLayer = new CLoadingBar();
	addChild(loadingLayer);
		
	LLoadManage.load(
		CLoadManager.loadData,
		function(p){
			loadingLayer.setProgress(p);
		},
		function(result){
			for(var key in result){
				CGlobal.datalist[key] = result[key];
			}
			var completeFunc = function(){
				//移除进度条
				removeChild(loadingLayer);
				//初始化战场
				initBattlefield();
			};
			if(CLoadManager.isLoad("battlefield","music") == false){
				CMusicManager.soundObjList["battlefield"].addEventListener(LEvent.COMPLETE,function(){
					completeFunc();
				});
			}else{
				completeFunc();
			}
		}
	);
};

CLoadManager.loadCharaLevelUpImg = function(name,style){
	if(charaData[name].levelUpStyle == null)return;
	var imgName = charaData[name].levelUpStyle;

	if(!CLoadManager.isLoad(imgName+style)){
		CLoadManager.loadData.push({name:imgName+style+"_attack",path:"./images/character/attack/"+imgName+style+".png"});
		CLoadManager.loadData.push({name:imgName+style+"_move",path:"./images/character/move/"+imgName+style+".png"});
		CLoadManager.readyLoadList.push(imgName+style);
	}
	CLoadManager.loadCharaLevelUpImg(imgName,style);
};

/**
 *加载关于界面的数据
*/
CLoadManager.loadAboutPage = function(){
	CLoadManager.loadData = new Array();
	var loadData = [
		{name:"about_back",path:"./images/background/about_back.png"},
		{name:"lufylegend.js",path:"./images/system/lufylegend.js.png"},
		{name:"ducle_logo",path:"./images/system/ducle_logo.png"},
		{name:"widgets",path:"./images/system/widgets.png"}
	];
	
	for(var index in loadData){
		if(!CLoadManager.isLoad(loadData[index].name)){
			CLoadManager.loadData.push(loadData[index]);
			CLoadManager.readyLoadList.push(loadData[index].name);
		}
	}
	
	CJsManager.addFlieToList(CJsManager.aboutPageJs);
	
	if(CLoadManager.loadData.length == 0){
		if(CLoadManager.isLoad("about_page","music") == false){
			CMusicManager.soundObjList["about_page"].addEventListener(LEvent.COMPLETE,function(){
				CGlobal.showAboutPage();
			});
		}else{
			CGlobal.showAboutPage();
		}
		return;
	}
	
	var loadingLayer = new CLoadingBar();
	addChild(loadingLayer);
	
	LLoadManage.load(
		CLoadManager.loadData,
		function(p){
			loadingLayer.setProgress(p);
		},
		function(result){
			for(var key in result){
				CGlobal.datalist[key] = result[key];
			}
			var completeFunc = function(){
				//移除进度条
				removeChild(loadingLayer);			
				//加入关于界面
				CGlobal.showAboutPage();
			}
			if(CLoadManager.isLoad("about_page","music") == false){
				CMusicManager.soundObjList["about_page"].addEventListener(LEvent.COMPLETE,function(){
					completeFunc();
				});
			}else{
				completeFunc();
			}
		}
	);
};

/**
 *加载设置界面的数据
*/
CLoadManager.loadSettingPage = function(){
	CLoadManager.loadData = new Array();
	var loadData = [
		{name:"widgets",path:"./images/system/widgets.png"},
		{name:"menu_back",path:"./images/system/menu_back.png"}
	];
	
	for(var index in loadData){
		if(!CLoadManager.isLoad(loadData[index].name)){
			CLoadManager.loadData.push(loadData[index]);
			CLoadManager.readyLoadList.push(loadData[index].name);
		}
	}
	
	CJsManager.addFlieToList(CJsManager.settingPageJs);
	
	if(CLoadManager.loadData.length == 0){
		//加入设置界面
		CGlobal.showSettingPage();
		return;
	}
	
	var loadingLayer = new CLoadingBar();
	addChild(loadingLayer);
	
	LLoadManage.load(
		CLoadManager.loadData,
		function(p){
			loadingLayer.setProgress(p);
		},
		function(result){
			//移除进度条
			removeChild(loadingLayer);
			
			for(var key in result){
				CGlobal.datalist[key] = result[key];
			}
			//加入设置界面
			CGlobal.showSettingPage();
		}
	);
};

/**
 *加载武将一览的数据
*/
CLoadManager.loadExhibition = function(){
	CLoadManager.loadData = new Array();
	var loadData = [
		{name:"widgets",path:"./images/system/widgets.png"},
		{name:"skills",path:"./images/system/skills.png"},
		{name:"arrow_left",path:"./images/system/arrow_left.png"},
		{name:"arrow_right",path:"./images/system/arrow_right.png"},
		{name:"exhibition_back",path:"./images/background/exhibition_back.png"}
	];
	
	for(var index in loadData){
		if(!CLoadManager.isLoad(loadData[index].name)){
			CLoadManager.loadData.push(loadData[index]);
			CLoadManager.readyLoadList.push(loadData[index].name);
		}
	}
	
	for(var key in charaData){
		if(charaData[key].attribute == "soldier"||charaData[key].isNormal == true)continue;
		
		var imgName = key;
		if(CLoadManager.isLoad(imgName))continue;
		
		CLoadManager.loadData.push({name:imgName+"_attack",path:"./images/character/attack/"+imgName+".png"});
		CLoadManager.loadData.push({name:imgName+"_move",path:"./images/character/move/"+imgName+".png"});
		CLoadManager.readyLoadList.push(imgName);
		
		var faceName = imgName;
		if(!CLoadManager.isLoad(faceName+"_face")){
			CLoadManager.loadData.push({name:faceName+"_face",path:"./images/character/face/"+faceName+".png"});
			CLoadManager.readyLoadList.push(faceName+"_face");
		}
	}
	
	CJsManager.addFlieToList(CJsManager.generalExhibitionJs);
	
	if(CLoadManager.loadData.length == 0){
		if(CLoadManager.isLoad("exhibition_page","music") == false){
			CMusicManager.soundObjList["exhibition_page"].addEventListener(LEvent.COMPLETE,function(){
				CGlobal.showExhibition();
			});
		}else{
			CGlobal.showExhibition();
		}
		return;
	}
	
	var loadingLayer = new CLoadingBar();
	addChild(loadingLayer);
	
	LLoadManage.load(
		CLoadManager.loadData,
		function(p){
			loadingLayer.setProgress(p);
		},
		function(result){
			var completeFunc = function(){
				//移除进度条
				removeChild(loadingLayer);
				//加入武将一览界面
				CGlobal.showExhibition();
			};
			
			for(var key in result){
				CGlobal.datalist[key] = result[key];
			}
			if(CLoadManager.isLoad("exhibition_page","music") == false){
				CMusicManager.soundObjList["exhibition_page"].addEventListener(LEvent.COMPLETE,function(){
					completeFunc();
				});
			}else{
				completeFunc();
			}
		}
	);
};

/**
 *判断数据是否已经加载的函数
*/
CLoadManager.isLoad = function(name,type){
	var list;
	switch(type){
		case "music":
			list = CLoadManager.musicLoadCompleteList;
			break;
		case "script":
			list = CLoadManager.scriptLoadCompleteList;
			break;
		case "js":
			list = CLoadManager.jsFileLoadCompleteList;
			break;
		default:
			list = CLoadManager.readyLoadList;
	}
	for(var key in list){
		if(list[key] == name){
			return true;
		}
	}
	return false;
};