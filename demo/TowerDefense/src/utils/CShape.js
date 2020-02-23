function CShape(){
	var self = this;
	self.x = 0;
	self.y = 0;
	self.width = 0;
	self.height = 0;
}
CShape.prototype = {
	setArc:function(x,y,r){
		var self = this;
		self.x = x;
		self.y = y;
		self.width = r*2;
		self.height = self.width;
	},
	setRectangle:function(x,y,w,h){
		var self = this;
		self.x = x;
		self.y = y;
		self.width = w;
		self.height = h;
	},
	getWidth:function(){
		return this.width;
	},
	getHeight:function(){
		return this.height;
	}
};