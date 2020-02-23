function CRadioSelectStyle(){
	var self = this;
	base(self,LSprite,[]);

	var back = new LBitmap(new LBitmapData(CGlobal.datalist["menu_back"],0,0,50,50));
	self.addChild(back);
	var border = new CPageBorder(50,50,false);
	self.addChild(border);
	var hook = new LSprite();
	hook.graphics.drawArc(0,"",[25,25,7,0,2*Math.PI],true,"red");
	self.addChild(hook);
	var shadow = new LDropShadowFilter(0,0,"red",15);
    hook.filters = [shadow];
}