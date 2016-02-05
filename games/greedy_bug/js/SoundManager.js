var SoundManager = function () {
	throw "SoundManager cannot be instantiated";
};
SoundManager.LOAD_OVER = false;
SoundManager.MUSIC_LAYER = null;
SoundManager.REPEAT_PLAY_LIST = new Array();
SoundManager.LOAD_OVER_LIST = {};
SoundManager.LOAD_LIST = [
	{name : "bg_music", path : "./sounds/zhu_gan_wu.mp3, ./sounds/zhu_gan_wu.m4a"}
];
SoundManager.START_PLAYING_TIME_LIST = {
	"bg_music" : 15
};
SoundManager.isPreloadSound = function () {
	LGlobal.webAudio = true;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		if (LGlobal.ios && !LSound.webAudioEnabled) {
			LGlobal.webAudio = false;
		}
	} else if (LGlobal.mobile) {
		LGlobal.webAudio = false;
	}

	return LGlobal.webAudio;
};
SoundManager.init = function (musicList) {
	SoundManager.initMusic(musicList, (LGlobal.mobile ? false : true));

	SoundManager.MUSIC_LAYER = new LSprite();
	SoundManager.MUSIC_LAYER.addEventListener(LEvent.ENTER_FRAME, SoundManager.loop);
	addChild(SoundManager.MUSIC_LAYER);
};
SoundManager.initMusic = function (musicList, playNow) {
	if (musicList) {
		SoundManager.LOAD_OVER = true;

		for (var k in musicList) {
			var n = k.toUpperCase();
			SoundManager[n] = new LSound();
			SoundManager[n].addEventListener(LEvent.COMPLETE, function () {
				if (playNow) {
					SoundManager.play(SoundManager[n], true);
				}
			});
			if (SoundManager.START_PLAYING_TIME_LIST[k]) {
				SoundManager[n].startPlayingTime = SoundManager.START_PLAYING_TIME_LIST[k];
			}
			SoundManager[n].load(musicList[k]);
		}
	}
};
SoundManager.play = function (m, isRepeat) {
	m.play(m.startPlayingTime);

	if (isRepeat) {
		SoundManager.REPEAT_PLAY_LIST.push(m);
	}
};
SoundManager.close = function (m) {
	m.close();

	for (var i = 0; i < SoundManager.REPEAT_PLAY_LIST.length; i++) {
		var cm = SoundManager.REPEAT_PLAY_LIST[i];

		if (cm.objectIndex == m.objectIndex) {
			SoundManager.REPEAT_PLAY_LIST.splice(i, 1);
		}
	}
};
SoundManager.loop = function () {
	for (var i = 0; i < SoundManager.REPEAT_PLAY_LIST.length; i++) {
		var m = SoundManager.REPEAT_PLAY_LIST[i];

		if (!m.playing) {
			m.play(m.startPlayingTime);
		}
	}
};
SoundManager.loadSound = function () {
	if (SoundManager.LOAD_OVER) {
		return;
	}

	var loadComplete = function (e) {
		var sound = e.currentTarget;

		SoundManager.LOAD_OVER_LIST[sound.name] = e.target;

		if (sound.index >= SoundManager.LOAD_LIST.length - 1) {
			SoundManager.initMusic(SoundManager.LOAD_OVER_LIST, true);
			SoundManager.MUSIC_LAYER.removeAllChild();
		}

		sound.removeEventListener(LEvent.COMPLETE, loadComplete);
	};

	for (var k = 0, l = SoundManager.LOAD_LIST.length; k < l; k++) {
		var sound = new LSound();
		sound.name = SoundManager.LOAD_LIST[k].name;
		sound.index = k;
		sound.addEventListener(LEvent.COMPLETE, loadComplete);
		sound.load(SoundManager.LOAD_LIST[k].path);
	}

	var hintLayer = new LSprite();
	hintLayer.graphics.drawRect(0, "", [0, 0, LGlobal.width, LGlobal.height], true, "black");
	hintLayer.alpha = 0.7;
	SoundManager.MUSIC_LAYER.addChild(hintLayer);

	var hintText = new Txt("Music is being loaded…… Please wait a minute~", 15, "white");
	hintText.x = (LGlobal.width - hintText.getWidth()) * 0.5;
	hintText.y = (LGlobal.height - hintText.getHeight()) * 0.5;
	SoundManager.MUSIC_LAYER.addChild(hintText);

	var p = SoundManager.MUSIC_LAYER.parent;
	if (p) {
		p.setChildIndex(SoundManager.MUSIC_LAYER, p.childList.length - 1);
	}
};