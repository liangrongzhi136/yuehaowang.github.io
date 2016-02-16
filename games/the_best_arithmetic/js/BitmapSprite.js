function BitmapSprite (n) {
	var s = this;
	LExtends(s, LSprite, []);

	var bmp = new LBitmap(new LBitmapData(dataList[n]));
	s.addChild(bmp);
}