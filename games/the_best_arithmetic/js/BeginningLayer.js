function BeginningLayer () {
	var s = this;
	LExtends(s, LSprite, []);

	var title = new LTextField();
	title.text = lang.GAME_TITLE;
	title.size = 45;
	title.textAlign = "center";
	title.x = LGlobal.width / 2;
	title.y = 180;
	title.lineColor = "black";
	title.lineWidth = 5;
	title.stroke = true;
	title.color = "white";
	s.addChild(title);
	
	s.menuLayer = null;
	s.levelLayer = null;
	s.helpLayer = null;

	s.addMenuLayer();
	s.addLevelLayer();
	s.addHelpLayer();
}

BeginningLayer.prototype.addMenuLayer = function () {
	var s = this;
	
	s.menuLayer = new LSprite();
	s.addChild(s.menuLayer);
	
	var hint = new LTextField();
	hint.text = lang.MENU_HINT;
	hint.color = "#FD9720";
	hint.lineColor = "#000000";
	hint.lineWidth = 5;
	hint.stroke = true;
	hint.size = 25;
	hint.weight = "bold";
	hint.textAlign = "center";
	hint.x = LGlobal.width / 2;
	hint.y = 270;
	s.menuLayer.addChild(hint);
	
	var startBtn = new BitmapSprite("start_icon");
	startBtn.scaleX = startBtn.scaleY = 1.2;
	startBtn.x = (LGlobal.width - startBtn.getWidth()) / 2;
	startBtn.y = 360;
	s.menuLayer.addChild(startBtn);
	
	startBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.gotoLevelLayer();
	});
	
	var helpBtn = new BitmapSprite("help_icon");
	helpBtn.scaleX = helpBtn.scaleY = 1.2;
	helpBtn.x = (LGlobal.width - helpBtn.getWidth()) / 2;
	helpBtn.y = startBtn.y + 230;
	s.menuLayer.addChild(helpBtn);
	
	helpBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		LTweenLite.to(s.menuLayer, 0.5, {
			x : LGlobal.width,
			ease : LEasing.Expo.easeOut,
			onStart : function () {
				s.menuLayer.mouseChildren = false;
			},
			onComplete : function () {
				s.menuLayer.visible = false;
			}
		});
				  
		LTweenLite.to(s.helpLayer, 0.5, {
			x : 0,
			ease : LEasing.Expo.easeOut,
			onStart : function () {
				s.helpLayer.mouseChildren = false;
				s.helpLayer.visible = true;
			},
			onComplete : function () {
				s.helpLayer.mouseChildren = true;
			}
		});
	});
	
	var copyRightTxt = new LTextField();
	copyRightTxt.text = "© 2016 Yuehao";
	copyRightTxt.color = "white";
	copyRightTxt.size = 20;
	copyRightTxt.x = (LGlobal.width - copyRightTxt.getWidth()) / 2;
	copyRightTxt.y = helpBtn.y + 220;
	s.menuLayer.addChild(copyRightTxt);
};

BeginningLayer.prototype.addLevelLayer = function () {
	var s = this;
	
	s.levelLayer = new LSprite();
	s.levelLayer.x = LGlobal.width;
	s.levelLayer.visible = false;
	s.addChild(s.levelLayer);
	
	var hint = new LTextField();
	hint.text = lang.SELECT_LEVEL_HINT;
	hint.color = "#87E22E";
	hint.lineColor = "#000000";
	hint.lineWidth = 5;
	hint.stroke = true;
	hint.size = 25;
	hint.weight = "bold";
	hint.textAlign = "center";
	hint.x = LGlobal.width / 2;
	hint.y = 270;
	s.levelLayer.addChild(hint);

	var colorList = ["#FD9720", "#54D9EF", "#F92672"];
	
	var multipage = new MultipageView(LGlobal.width, 415);
	multipage.y = 350;
	s.levelLayer.addChild(multipage);

	for (var i = 0, toY, colorIndex; i < 9; i++, colorIndex++) {
		if (i % 3 == 0) {
			toY = 0;
			colorIndex = 0;
			
			multipage.newPage();
		}
		
		var num = new ArtNumber(i + 1, colorList[colorIndex]);
		num.index = i;
		num.scaleX = num.scaleY = 1.8;
		num.x = (LGlobal.width - num.getWidth()) / 2;
		num.y = toY;
		multipage.addIntoCurrentPage(num);

		toY += 130;
	}
	
	multipage.showPage(0);

	multipage.addEventListener(MultipageView.EVENT_MOUSE_UP_ON_PAGE, function (e) {
		s.onClickLevelPage(e.target);
	});
	
	var backBtn = new BitmapSprite("back_icon");
	backBtn.scaleX = backBtn.scaleY = 0.5;
	backBtn.x = (LGlobal.width - backBtn.getWidth()) / 2;
	backBtn.y = 800;
	s.levelLayer.addChild(backBtn);
	
	backBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		LTweenLite.to(s.menuLayer, 0.5, {
			x : 0,
			ease : LEasing.Expo.easeOut,
			onStart : function () {
				s.menuLayer.visible = true;
				s.menuLayer.mouseChildren = false;
			},
			onComplete : function () {
				s.menuLayer.mouseChildren = true;
			}
		});
				 
		LTweenLite.to(s.levelLayer, 0.5, {
			x : LGlobal.width,
			ease : LEasing.Expo.easeOut,
			onStart : function () {
				s.levelLayer.mouseChildren = false;
			},
			onComplete : function () {
				s.levelLayer.visible = false;
			}
		});
	});
};

BeginningLayer.prototype.gotoLevelLayer = function () {
	var s = this;
	
	LTweenLite.to(s.menuLayer, 0.5, {
		x : -LGlobal.width,
		ease : LEasing.Expo.easeOut,
		onStart : function () {
			s.menuLayer.mouseChildren = false;
		},
		onComplete : function () {
			s.menuLayer.visible = false;
		}
	});
	
	LTweenLite.to(s.levelLayer, 0.5, {
		x : 0,
		ease : LEasing.Expo.easeOut,
		onStart : function () {
			s.levelLayer.mouseChildren = false;
			s.levelLayer.visible = true;
		},
		onComplete : function () {
		      s.levelLayer.mouseChildren = true;
		}
	});
};

BeginningLayer.prototype.onClickLevelPage = function (tar) {
	var s = this;
	
	if (!(tar instanceof ArtNumber)) {
		return;
	}
	
	s.mouseChildren = false;

	s.destroy(function () {
		startLevel(tar.index);
	});
};

BeginningLayer.prototype.addHelpLayer = function () {
	var s = this;
	
	s.helpLayer = new LSprite();
	s.helpLayer.x = -LGlobal.width;
	s.helpLayer.visible = false;
	s.addChild(s.helpLayer);
	
	var hint = new LTextField();
	hint.text = lang.HELP_HINT;
	hint.lineColor = "#000000";
	hint.lineWidth = 5;
	hint.stroke = true;
	hint.color = "#F92672";
	hint.size = 25;
	hint.weight = "bold";
	hint.textAlign = "center";
	hint.x = LGlobal.width / 2;
	hint.y = 270;
	s.helpLayer.addChild(hint);
	
	var multipage = new MultipageView(LGlobal.width, 425);
	multipage.y = 330;
	s.helpLayer.addChild(multipage);
	
	for (var i = 0, l = helpData.length; i < l; i++) {
		var d = helpData[i];
				
		multipage.newPage();
		
		var layer = new LSprite();
		
		for (var j = 0, dl = d.length; j < dl; j++) {
			var item = d[j], o;
			
			if (item.type == "text") {
				if (!item.size) {
					item.size = 20;
				}
				
				if (!item.weight) {
					item.weight = "normal";
				}
				
				if (!item.color) {
					item.color = "white";
				}
				
				if (typeof item.wordWrap == "undefined") {
					item.wordWrap = true;
				}
				
				if (!item.marginY) {
					item.marginY = 50;
				}
				
				var content = item.content;
				
				o = new LTextField();
				o.size = item.size;
				o.weight = item.weight;
				o.color = item.color;
				o.marginY = item.marginY;
				if (item.wordWrap) {
					o.w = 350;
					
					wordWrap(content, o);
				} else {
					o.text = content;
					
					o.w = o.getWidth();
				}
			} else if (item.type == "img") {
				o = new LBitmap(new LBitmapData(dataList[item.content]));
				o.scaleX = o.scaleY = 0.5;
				o.w = o.getWidth();
				o.marginY = 50;
			} else {
				continue;
			}
			
			layer.addChild(o);
		}
		
		for (var k = 0, toY = 0; k < layer.numChildren; k++) {
			var c = layer.getChildAt(k);
			
			c.x = (LGlobal.width - c.w) / 2;
			c.y = toY;
			
			toY += c.getHeight() + c.marginY;
		}
		
		multipage.addIntoCurrentPage(layer);
	}
	
	multipage.showPage(0);
	
	var backBtn = new BitmapSprite("back_icon");
	backBtn.scaleX = backBtn.scaleY = 0.5;
	backBtn.x = (LGlobal.width - backBtn.getWidth()) / 2;
	backBtn.y = 800;
	s.helpLayer.addChild(backBtn);
	
	backBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		LTweenLite.to(s.menuLayer, 0.5, {
			x : 0,
			ease : LEasing.Expo.easeOut,
			onStart : function () {
				s.menuLayer.visible = true;
				s.menuLayer.mouseChildren = false;
			},
			onComplete : function () {
				s.menuLayer.mouseChildren = true;
			}
		});
				 
		LTweenLite.to(s.helpLayer, 0.5, {
			x : -LGlobal.width,
			ease : LEasing.Expo.easeOut,
			onStart : function () {
				s.helpLayer.mouseChildren = false;
			},
			onComplete : function () {
				s.helpLayer.visible = false;
			}
		});
	});
};

BeginningLayer.prototype.destroy = function (callback) {
	var s = this;

	LTweenLite.to(s, 0.5, {
		y : -s.getHeight(),
		ease : LEasing.Quint.easeIn,
		onComplete : function () {
			s.remove();

			callback();
		}
	});
};
