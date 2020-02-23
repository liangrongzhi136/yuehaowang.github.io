//********************************************************//
/**
*@name 技能名称
*@col 在技能图片中所在列
*@row 在技能图片中所在行
*@effect
	*@speed 动画频率增加数量（用于改变攻击速度）
	*@attack 攻击加成倍数
*@introduction 技能简介
*/
//********************************************************//

var skillData = {
	shensu:{
		name:"神速",
		col:1,
		row:2,
		effect:{
			speed:1,
			attack:0.8
		},
		introduction:"自身攻击速度大幅提升，但攻击力减少了一部分"
	},
	qiangxi:{
		name:"强袭",
		col:5,
		row:9,
		effect:{
			attack:2,
			speed:-1
		},
		introduction:"自身攻击力大幅上升，但攻击速度减少了一部分"
	},
	xuli:{
		name:"蓄力",
		col:5,
		row:1,
		effect:{
			attack:1.2
		},
		introduction:"自身攻击力小幅上升"
	}
};