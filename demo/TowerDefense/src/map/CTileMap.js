function CTileMap(mapdata,mapterrain){
	var self = this;
	base(self,LSprite,[]);
	
	//设置地图块大小
	self.mapLength = CGlobal.mapLength;
	//保存地图显示数据
	self.mapData = mapdata;
	//保存地图地形数据
	self.mapTerrain = mapterrain;
	
	var i,j,index,indexX,indexY;
	
    var bitmapdata,bitmap;
	
    var mapX = self.x / self.mapLength;
    var mapY = self.y / self.mapLength;
    self.removeAllChild();
	
	//计算每行地图块数目
	var pBitmapdata = new LBitmapData(CGlobal.datalist["map"]);
	var maxBlocks = pBitmapdata.image.width / self.mapLength;
	
	//显示地图
	for(i=0;i<mapdata.length;i++){
		for(j=0;j<mapdata[0].length;j++){
            index = mapdata[i-mapY][j-mapX];
            indexY = Math.floor(index / maxBlocks);
            indexX = index - indexY*maxBlocks;
            bitmapdata = new LBitmapData(CGlobal.datalist["map"],indexX*self.mapLength,indexY*self.mapLength,self.mapLength,self.mapLength);
            bitmap = new LBitmap(bitmapdata);
            bitmap.x = j*self.mapLength - self.x;
            bitmap.y = i*self.mapLength - self.y;
            self.addChild(bitmap);
        }
    }
}
CTileMap.prototype.getWidth = function(){
	//返回地图的宽度
	return this.mapLength*this.mapData[0].length;
};
CTileMap.prototype.getHeight = function(){
	//返回地图的高度
	return this.mapLength*this.mapData.length;
};