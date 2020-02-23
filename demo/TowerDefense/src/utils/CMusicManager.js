var CMusicManager = function(){this.type = "CMusicManager";}
CMusicManager.musicList = [
	{name:"about_page",path:CGlobal.musicPath+"dawn_of_the_wish.mp3"},
	{name:"opening_page",path:CGlobal.musicPath+"glage_at_the_world.mp3"},
	{name:"select_level_page",path:CGlobal.musicPath+"tetsujin_drive.mp3"},
	{name:"battlefield",path:CGlobal.musicPath+"welcome_to_china.mp3"},
	{name:"exhibition_page",path:CGlobal.musicPath+"a_ways_away.mp3"}
];
CMusicManager.soundObjList = {};
CMusicManager.soundVolume = 1;
CMusicManager.loadBackgroundMusic = function(){
	for(var key in CMusicManager.musicList){
		var soundObj = new CSound(true,CMusicManager.musicList[key].name);
		soundObj.setVolume(CMusicManager.soundVolume);
		soundObj.load(CMusicManager.musicList[key].path);
		
		CMusicManager.soundObjList[CMusicManager.musicList[key].name] = soundObj;		
	}
};
CMusicManager.closeAllMusic = function(){
	for(var key in CMusicManager.soundObjList){
		if(CMusicManager.soundObjList[key]._isLoadComplete == false)continue;
		CMusicManager.soundObjList[key].close();
	}
};
CMusicManager.setMusicMute = function(){
	for(var key in CMusicManager.soundObjList){
		CMusicManager.soundObjList[key].setVolume(0);
	}
};
CMusicManager.setMusicValid = function(){
	for(var key in CMusicManager.soundObjList){
		CMusicManager.soundObjList[key].setVolume(1);
	}
};