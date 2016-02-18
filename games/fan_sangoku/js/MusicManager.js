var MusicManager = function(){this.type = "MusicManager";}
MusicManager.soundVolume = 1;
MusicManager.loadIndex = 0;
MusicManager.index = 0;
MusicManager.result = {};
MusicManager.list = new Array();
MusicManager.onupdate = null;
MusicManager.oncomplete = null;
MusicManager.load = function(l,u,c){
	MusicManager.loadIndex = 0;
	MusicManager.index = 0;
	MusicManager.list = l;
	MusicManager.onupdate = u;
	MusicManager.oncomplete = c;
	MusicManager.loadStart();
};
MusicManager.loadStart = function(){
	if(MusicManager.loadIndex >= MusicManager.list.length)return;
	var path = MusicManager.list[MusicManager.loadIndex].path;
	var name = MusicManager.list[MusicManager.loadIndex].name;

	var soundObj = new LSound();
	soundObj.musicName = name;
	soundObj.setVolume(MusicManager.soundVolume);
	soundObj.addEventListener(LEvent.COMPLETE,MusicManager.loadComplete);

	var loadFunc = function(){
		soundObj.load(path);
		MusicManager.loadIndex++;
	};
	if(LStage.ios == true && LStage.canTouch){
		var tips = "您使用的设备是iOS系列产品，加载音乐需要通过您的允许，请点击下方按钮加载"+name+".mp3";
		var dlgObj = new Dialog(tips);
		dlgObj.onBtnClick = loadFunc;
		addChild(dlgObj);
	}else{
		loadFunc();
	}
};
MusicManager.loadComplete = function(e){
	var o = e.currentTarget;

	o.removeEventListener(LEvent.COMPLETE,MusicManager.loadComplete);

	MusicManager.result[o.musicName] = o;
	MusicManager.index++;
	MusicManager.loadStart();
	if(MusicManager.onupdate){
		MusicManager.onupdate(Math.floor(MusicManager.index*100/MusicManager.list.length));
	}
	if(MusicManager.index >= MusicManager.list.length){
		MusicManager.loader = null;
		var r = MusicManager.result;
		MusicManager.oncomplete(r);
	}
};
MusicManager.closeAllMusic = function(){
	for(var key in datalist){
		if(datalist[key].type == "LSound"){
			datalist[key].close();
		}
	}
};
MusicManager.setMusicMute = function(){
	MusicManager.soundVolume = 0;
	for(var key in datalist){
		if(datalist[key].type == "LSound"){
			datalist[key].setVolume(MusicManager.soundVolume);
		}
	}
};
MusicManager.setMusicValid = function(){
	MusicManager.soundVolume = 1;
	for(var key in datalist){
		if(datalist[key].type == "LSound"){
			datalist[key].setVolume(MusicManager.soundVolume);
		}
	}
};