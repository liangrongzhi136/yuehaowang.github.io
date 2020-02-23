function CSound(isLoop,name){
	var s = this;
	base(s,LSound,[]);
	
	s._isLoop = isLoop;
	s.type = "LSound";
	s._type="audio";
	s.data = new Audio();
	s.data.loop = false;
	s.data.autoplay = false;

	s.musicName = name;
	s._isLoadComplete = false;
	
	if(isLoop == true){
		s.addEventListener(LEvent.SOUND_COMPLETE,function(){
			s.play(0);
		})
	}
}
CSound.prototype.onload = function(){
	var s=this;
	if(s.data.readyState || (LGlobal.ios && LGlobal.canTouch)){
		s.length=s.data.duration;
		if(CLoadManager.isLoad(s.musicName,"music") == false)CLoadManager.musicLoadCompleteList.push(s.musicName);
		s._isLoadComplete = true;
		s.stop();
		if(s.oncomplete){
			s.event.currentTarget = s;
			s.oncomplete(s.event);
		}
		return;
	}
	setTimeout(function(){s.onload();}, 100);
};
CSound.prototype._onended = function(){
	var s=this;
	if(s.data.ended){
		if(s.onsoundcomplete)s.onsoundcomplete();
		if(s._isLoop == false){
			if(++s.loopIndex < s.loopLength){
				s.data.currentTime=0;
				s.data.play();
			}else{
				s.close();
				return;
			}
		}
	}
	setTimeout(function(){s._onended();}, 100);
};
