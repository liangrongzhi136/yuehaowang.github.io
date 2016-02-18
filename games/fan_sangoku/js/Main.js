init(50,"mylegend",800,450,main);
var jsImgDataList = [
	{path:"./js/Card.js",type:"js"},
	{path:"./js/Scale3D.js",type:"js"},
	{path:"./js/Scene.js",type:"js"},
	{path:"./js/Point.js",type:"js"},
	{path:"./js/Dialog.js",type:"js"},
	{path:"./js/OpeningPage.js",type:"js"},
	{path:"./js/ResultBox.js",type:"js"},
	{path:"./js/SettingPage.js",type:"js"},
	{path:"./js/SelectLevelPage.js",type:"js"},
	{path:"./js/GameStage.js",type:"js"},
	{path:"./js/levelData.js",type:"js"},
	{path:"./js/MusicManager.js",type:"js"},
	
	{name:"logo",path:"./images/ui/logo.png"},
	{name:"lock",path:"./images/ui/lock.png"},
	{name:"star",path:"./images/ui/star.png"},
	{name:"num_0",path:"./images/ui/num_0.png"},
	{name:"num_1",path:"./images/ui/num_1.png"},
	{name:"num_2",path:"./images/ui/num_2.png"},
	{name:"num_3",path:"./images/ui/num_3.png"},
	{name:"num_4",path:"./images/ui/num_4.png"},
	{name:"num_5",path:"./images/ui/num_5.png"},
	{name:"num_6",path:"./images/ui/num_6.png"},
	{name:"num_7",path:"./images/ui/num_7.png"},
	{name:"num_8",path:"./images/ui/num_8.png"},
	{name:"num_9",path:"./images/ui/num_9.png"},
	{name:"win_word",path:"./images/ui/win_word.png"},
	{name:"lose_word",path:"./images/ui/lose_word.png"},
	{name:"card_back",path:"./images/ui/card_back.png"},
	{name:"star_blank",path:"./images/ui/star_blank.png"},
	{name:"timebar_bg",path:"./images/ui/timebar_bg.png"},
	{name:"number_chs",path:"./images/ui/number_chs.png"},
	{name:"word_widget",path:"./images/ui/word_widget.png"},
	{name:"result_widget",path:"./images/ui/result_widget.png"},
	{name:"common_widget",path:"./images/ui/common_widget.png"},
	{name:"options_widget",path:"./images/ui/options_widget.png"},
	{name:"system_word_widget",path:"./images/ui/system_word_widget.png"},

	{name:"zhurong",path:"./images/face/zhurong.png"},
	{name:"zhugeliang",path:"./images/face/zhugeliang.png"},
	{name:"zhaoyun",path:"./images/face/zhaoyun.png"},
	{name:"zhoucang",path:"./images/face/zhoucang.png"},
	{name:"zhangfei",path:"./images/face/zhangfei.png"},
	{name:"weiyan",path:"./images/face/weiyan.png"},
	{name:"pangtong",path:"./images/face/pangtong.png"},
	{name:"menghuo",path:"./images/face/menghuo.png"},
	{name:"machao",path:"./images/face/machao.png"},
	{name:"liubei",path:"./images/face/liubei.png"},
	{name:"jiangwei",path:"./images/face/jiangwei.png"},
	{name:"huangzhong",path:"./images/face/huangzhong.png"},
	{name:"huangyueying",path:"./images/face/huangyueying.png"},
	{name:"guanyu",path:"./images/face/guanyu.png"},
	{name:"guanping",path:"./images/face/guanping.png"},
	{name:"fazheng",path:"./images/face/fazheng.png"},
	
	{name:"setting_back",path:"./images/background/setting_back.png"},
	{name:"gameinfo_back",path:"./images/background/gameinfo_back.png"},
	{name:"opening_back",path:"./images/background/opening_back.png"},
	{name:"gamebody_back",path:"./images/background/gamebody_back.png"},
	{name:"dlg_back",path:"./images/background/dlg_back.png"},
	{name:"selectlevel_back",path:"./images/background/selectlevel_back.png"}
];
var musicDataList = [
	{name:"opening_bgm",path:"./music/opening_bgm.mp3"},
	{name:"selectlevel_bgm",path:"./music/selectlevel_bgm.mp3"},
	{name:"gamestage_bgm",path:"./music/gamestage_bgm.mp3"}
];
var datalist = {};
var backLayer;
function main(){
	document.body.style.margin = "0px 0px";
	document.body.style.background = "black";
	LGlobal.backgroundColor = "black";
	if(LGlobal.canTouch == true){
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
		LSystem.screen(LStage.FULL_SCREEN);
	}else{
		var ww = window.innerWidth,wh = window.innerHeight;
		var w = LStage.width,h = LStage.height;
		var t = (wh - h)*0.5;
		var l = (ww - w)*0.5;
		LGlobal.canvasObj.style.marginTop = t + "px";
		LGlobal.canvasObj.style.marginLeft = l + "px";
	}
	
	loadJsAndImg();
}
function loadJsAndImg(){
	var loading = new LoadingSample3();
	addChild(loading);
	LLoadManage.load(
		jsImgDataList,
		function(p){
			loading.setProgress(p);
		},
		function(r){
			for(var key in r){
				datalist[key] = r[key];
			}

			removeChild(loading);
			loadMusic();
		}
	);
}
function loadMusic(){
	var loading = new LoadingSample3();
	addChild(loading);
	
	MusicManager.load(
		musicDataList,
		function(p){
			loading.setProgress(p);
		},
		function(r){
			for(var key in r){
				datalist[key] = r[key];
			}

			removeChild(loading);
			gameInit();
		}
	);
}
function gameInit(){
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	
	addLayer();
	addOpeningPage();
	getUnlockLevel();
}
function addLayer(){
	backLayer = new LSprite();
	addChild(backLayer);
}
function addOpeningPage(){
	MusicManager.closeAllMusic();
	if(datalist["opening_bgm"])datalist["opening_bgm"].play(0,10000000000);

	var openingPageObj = new OpeningPage();
	backLayer.addChild(openingPageObj);
}
function gotoSelectLevelPage(){
	MusicManager.closeAllMusic();
	if(datalist["selectlevel_bgm"])datalist["selectlevel_bgm"].play(0,10000000000);

	var selectLevelPageObj = new SelectLevelPage();
	backLayer.addChild(selectLevelPageObj);
}
function startGame(levelIndex){
	MusicManager.closeAllMusic();
	if(datalist["gamestage_bgm"])datalist["gamestage_bgm"].play(0,10000000000);

	var gameBody = new GameStage(levelIndex);
	backLayer.addChild(gameBody);
}
function gotoSettingPage(){
	var settintPageObj = new SettingPage();
	backLayer.addChild(settintPageObj);
}
function getUnlockLevel(){
	if(!localStorage["fanSangoku_unlockLevel"])return;
	var v = localStorage["fanSangoku_unlockLevel"];
	var va = v.split(";");
	for(var i=0; i<va.length; i++){
		unlockLevel[i] = va[i];
	}
}
function saveUnlockLevel(){
	var v = "";
	for(var i=0; i<unlockLevel.length; i++){
		v += unlockLevel[i]+";";
	}
	localStorage.setItem("fanSangoku_unlockLevel", v);
}