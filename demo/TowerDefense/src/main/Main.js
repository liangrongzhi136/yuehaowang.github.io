var ONLOAD = "load";
LEvent.addEventListener(window,ONLOAD,function(){
	if(LStage.canTouch == true){
		document.body.style.margin = "0px 0px 0px 0px";
		document.body.style.padding = "0px 0px 0px 0px";
	}
	//设置全屏
	LSystem.screen(LStage.FULL_SCREEN);
	//初始化游戏
	init(50,"mylegend",816,480,main,LEvent.INIT);
	//设置游戏背景色
	LStage.backgroundColor = "white";
});

function main(){
	LStage.setDebug(true);
	
	var urlList = [
		{path:"./src/utils/CLoadManager.js",type:"js"},
		{path:"./src/utils/CJsManager.js",type:"js"},
		{path:"./src/window/CSimpleLoadingBar.js",type:"js"}
	];
	
	LLoadManage.load(urlList,null,function(){
		CGlobal.initGame();
	});
}