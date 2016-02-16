function RankingListChildView (data, medal) {
	var s = this;
	LExtends(s, LListChildView, []);

	var txtTemp = new LTextField();
	txtTemp.size = 20;
	txtTemp.y = 10;

	if (medal) {
		var bmpd = new LBitmapData(dataList["medal_" + medal + "_icon"]);
		var medalBmp = new LBitmap(bmpd);
		medalBmp.x = 5;
		medalBmp.y = 8;
		s.addChild(medalBmp);
	}

	var nameTxt = txtTemp.clone();
	nameTxt.text = data["username"];
	nameTxt.x = 35;
	nameTxt.color = "#FFFFFF";
	nameTxt.stroke = true;
	nameTxt.lineColor = "#E6DB74";
	nameTxt.lineWidth = 2;
	s.addChild(nameTxt);

	var gradeTxt = txtTemp.clone();
	gradeTxt.text = Time.msToMin(data["grade"]);
	gradeTxt.x = 200;
	gradeTxt.color = "#FFFFFF";
	gradeTxt.stroke = true;
	gradeTxt.lineColor = "#F92672";
	gradeTxt.lineWidth = 2;
	s.addChild(gradeTxt);

	s.graphics.drawRoundRect(2, "#000000", [0, 0, 370, 40, 15], true, "#333333");
}
