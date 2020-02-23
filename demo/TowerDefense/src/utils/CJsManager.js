var CJsManager = function(){this.type = "CJsManager";};
CJsManager.openingPageJs = [
	{name:"COpeningPage",path:CGlobal.jsFilePath+"window/COpeningPage.js"},
	{name:"COpeningButton",path:CGlobal.jsFilePath+"window/COpeningButton.js"}
];
CJsManager.selectLevelPageJs = [
	{name:"CSelectLevelPage",path:CGlobal.jsFilePath+"window/CSelectLevelPage.js"},
	{name:"CLevelCity",path:CGlobal.jsFilePath+"window/CLevelCity.js"},
	{name:"CEnterLevelPage",path:CGlobal.jsFilePath+"window/CEnterLevelPage.js"},
	{name:"CLevelCloud",path:CGlobal.jsFilePath+"window/CLevelCloud.js"},
	{name:"CButtonSample",path:CGlobal.jsFilePath+"window/CButtonSample.js"}
];
CJsManager.aboutPageJs = [
	{name:"CAboutPage",path:CGlobal.jsFilePath+"about/CAboutPage.js"},
	{name:"CAboutDesigner",path:CGlobal.jsFilePath+"about/CAboutDesigner.js"},
	{name:"CAboutDirector",path:CGlobal.jsFilePath+"about/CAboutDirector.js"},
	{name:"CAboutProgrammer",path:CGlobal.jsFilePath+"about/CAboutProgrammer.js"},
	{name:"CAboutArt",path:CGlobal.jsFilePath+"about/CAboutArt.js"},
	{name:"CAboutTester",path:CGlobal.jsFilePath+"about/CAboutTester.js"},
	{name:"CAboutSound",path:CGlobal.jsFilePath+"about/CAboutSound.js"},
	{name:"CAboutArtArrange",path:CGlobal.jsFilePath+"about/CAboutArtArrange.js"},
	{name:"CAboutEngine",path:CGlobal.jsFilePath+"about/CAboutEngine.js"},
	{name:"CLink",path:CGlobal.jsFilePath+"utils/CLink.js"}
];
CJsManager.settingPageJs = [
	{name:"CSettingPage",path:CGlobal.jsFilePath+"window/CSettingPage.js"},
	{name:"CRadioStyle",path:CGlobal.jsFilePath+"utils/CRadioStyle.js"},
	{name:"CRadioSelectStyle",path:CGlobal.jsFilePath+"utils/CRadioSelectStyle.js"}
];
CJsManager.battlefieldJs = [
	{name:"CCharacter",path:CGlobal.jsFilePath+"character/CCharacter.js"},
	{name:"CEnemy",path:CGlobal.jsFilePath+"character/CEnemy.js"},
	{name:"CAttackChara",path:CGlobal.jsFilePath+"character/CAttackChara.js"},
	
	{name:"CTileMap",path:CGlobal.jsFilePath+"map/CTileMap.js"},
	
	{name:"CCharaSelectingMenu",path:CGlobal.jsFilePath+"menu/CCharaSelectingMenu.js"},
	{name:"CCharaOperatingMenu",path:CGlobal.jsFilePath+"menu/CCharaOperatingMenu.js"},
	
	{name:"CHintObject",path:CGlobal.jsFilePath+"window/CHintObject.js"},
	{name:"CEnemyHint",path:CGlobal.jsFilePath+"window/CEnemyHint.js"},
	{name:"CEnemyHintArrow",path:CGlobal.jsFilePath+"window/CEnemyHintArrow.js"},
	{name:"CCharaInfoObject",path:CGlobal.jsFilePath+"window/CCharaInfoObject.js"},
	{name:"CWinPage",path:CGlobal.jsFilePath+"window/CWinPage.js"},
	{name:"CLosePage",path:CGlobal.jsFilePath+"window/CLosePage.js"},
	{name:"CButtonSample",path:CGlobal.jsFilePath+"window/CButtonSample.js"},
	{name:"CControlGameButton",path:CGlobal.jsFilePath+"window/CControlGameButton.js"},
	{name:"CFaceObject",path:CGlobal.jsFilePath+"window/CFaceObject.js"},
	
	{name:"CEffect",path:CGlobal.jsFilePath+"utils/CEffect.js"},
	{name:"CSkillIcon",path:CGlobal.jsFilePath+"utils/CSkillIcon.js"},
	{name:"CLaunchSkill",path:CGlobal.jsFilePath+"utils/CLaunchSkill.js"},
	{name:"CSkill",path:CGlobal.jsFilePath+"utils/CSkill.js"},
	{name:"CShape",path:CGlobal.jsFilePath+"utils/CShape.js"},
	
	{name:"CSingled",path:CGlobal.jsFilePath+"singled/CSingled.js"},
	{name:"CSingledChara",path:CGlobal.jsFilePath+"singled/CSingledChara.js"},
	{name:"CSingledTalk",path:CGlobal.jsFilePath+"singled/CSingledTalk.js"},
	{name:"CSingledPowerBar",path:CGlobal.jsFilePath+"singled/CSingledPowerBar.js"},
	{name:"CSingledHpBar",path:CGlobal.jsFilePath+"singled/CSingledHpBar.js"}
];
CJsManager.generalExhibitionJs = [
	{name:"CExhibition",path:CGlobal.jsFilePath+"window/CExhibition.js"},
	{name:"CExhibitionItem",path:CGlobal.jsFilePath+"window/CExhibitionItem.js"},
	{name:"CFaceObject",path:CGlobal.jsFilePath+"window/CFaceObject.js"},
	{name:"CCharacter",path:CGlobal.jsFilePath+"character/CCharacter.js"},
	{name:"CSkillIcon",path:CGlobal.jsFilePath+"utils/CSkillIcon.js"}
];

CJsManager.addFlieToList = function(data){
	for(var key in data){
		if(CLoadManager.isLoad(data[key].name,"js") == true)continue;
		CLoadManager.loadData.push({path:data[key].path,type:"js"});
		CLoadManager.jsFileLoadCompleteList.push(data[key].name);
	}
};