function Time () {
	var s = this;

	s.m = 0;
	s.s = 0;
	s.ms = 0;
}

Time.prototype.tick = function () {
	var s = this;

	s.ms += LGlobal.speed;

	if (s.ms >= 1000) {
		s.ms = 0;
		s.s++;
	}

	if (s.s >= 60) {
		s.s = 0;
		s.m++;
	}
};

Time.prototype.toString = function () {
	var s = this, l, mt = st = mst = "";

	l = s.ms.toString().length;
	if (l < 3) {
		for (var i = 0, l = 3 - l; i < l; i++) {
			mst += "0";
		}
	}
	mst += s.ms;

	l = s.s.toString().length;
	if (l < 2) {
		st += "0";
	}
	st += s.s;

	l = s.m.toString().length;
	if (l < 2) {
		mt += "0";
	}
	mt += s.m;

	return lang.TIME + mt + ":" + st + ":" + mst;
};

Time.msToMin = function (ms) {
	var s = Math.floor(ms / 1000), ms = ms - s * 1000, m = Math.floor(s / 60), s = s - m * 60;

	return m + " : " + s + " : " + ms;
};

Time.toMs = function (time) {
	return time.ms + time.m * 60000 + time.s * 1000;
};
