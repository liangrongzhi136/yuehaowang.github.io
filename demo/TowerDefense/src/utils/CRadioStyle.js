function CRadioStyle(){
	var self = this;
	base(self,LSprite,[]);

	var back = new LBitmap(new LBitmapData(CGlobal.datalist["menu_back"],0,0,50,50));
	self.addChild(back);
	var border = new CPageBorder(50,50,false);
	self.addChild(border);
}
