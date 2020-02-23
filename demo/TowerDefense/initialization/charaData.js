//********************************************************//
/**
*@通用属性
	*@name 人物名称
	*@introduction 人物介绍
	*@isNormal 是否使用大众形象
	*@normalStyle 以大众形象出场时的样式 (1或者2)
*@作为我方出场属性
	*@amount 出场数目（作为大众形象可无）
	*@attack 攻击力(最大200)
	*@cost 耗费金币(最大500)（作为大众形象可无）
	*@maxLevel 人物在战场上最高等级（作为大众形象可无）
	*@range 攻击范围（作为大众形象可无）
	*@skill 武将技能（作为大众形象可无）
	*@mpUpgrade 武将杀死敌军后获得mp占奖励的mp百分比（作为大众形象可无）
	*@attribute 区分士兵和武将
	*@arms 兵种
	*@levelUpStyle 升级后的形象
*@作为敌方出场属性
	*@hp 体力(最大3000)
	*@hurt 进入目标地后的破坏力
	*@speed 移动速度
	*@value 阵亡后奖励的金币
	*@mpGiven 阵亡后奖励的mp值
*/
//********************************************************//

var charaData = {

	//////////////////////////////魏势力//////////////////////////////
	
	caocao:{
		name:"曹操",
		introduction:"曹操，字孟德，东汉末年杰出的政治家、军事家、文学家、书法家。三国中曹魏政权的缔造者，以汉天子的名义征讨四方，奠定了曹魏立国的基础。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:100,
		cost:480,
		maxLevel:1,
		range:{type:"circle",range:2.5},
		skill:"shensu",
		mpUpgrade:0.8,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,
		
		hp:2800,
		hurt:5,
		speed:8,
		mpGiven:15,
		value:40
	},
	xiahoudun:{
		name:"夏侯惇",
		introduction:"夏侯惇，字元让，沛国谯人，曹魏开国元勋，汉朝开国功臣之一夏侯婴的后代。因在作战时被射中左眼而拨矢啖睛。官至大将军，封高安乡侯，死后谥为忠侯。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:170,
		cost:440,
		maxLevel:1,
		range:{type:"circle",range:1.7},
		skill:"qiangxi",
		mpUpgrade:0.4,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,
		
		hp:2300,
		hurt:8,
		speed:8,
		mpGiven:10,
		value:60
	},
	xiahouyuan:{
		name:"夏侯渊",
		introduction:"夏侯渊，字妙才，沛国谯人，东汉末年名将，擅长千里奔袭作战，官至征西将军，封博昌亭侯。初期随曹操征伐，官渡之战为曹操督运粮草。后率军驻凉州，逐马超、破韩遂、灭宋建、横扫羌、氐，虎步关右。于定军山被刘备部将黄忠所袭，战死，谥曰愍侯。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:130,
		cost:430,
		maxLevel:1,
		range:{type:"circle",range:3},
		skill:"shensu",
		mpUpgrade:0.5,
		attribute:"general",
		arms:"gongbing",
		levelUpStyle:null,
		
		hp:2400,
		hurt:8,
		speed:10,
		mpGiven:11,
		value:60
	},
	zhangliao:{
		name:"张辽",
		introduction:"张辽，字文远，雁门马邑人。三国时期曹魏著名将领。曾从属丁原、董卓、吕布。下邳之战后，归顺曹操。此后随曹操征讨，战功累累。曾在逍遥津以八百骑击退孙权十万大军。魏中“五子良将”之首。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:160,
		cost:460,
		maxLevel:1,
		range:{type:"circle",range:2},
		skill:"shensu",
		mpUpgrade:0.65,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,
		
		hp:2600,
		hurt:8,
		speed:12,
		mpGiven:12,
		value:60
	},
	xuhuang:{
		name:"徐晃",
		introduction:"徐晃，字公明，河东杨人。三国时期曹魏名将，魏中“五子良将”之一。樊城之战中徐晃作为曹仁的援军击败关羽，因于此役中治军严整而被曹操称赞“有周亚夫之风”。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:150,
		cost:430,
		maxLevel:1,
		range:{type:"circle",range:2.5},
		skill:"shensu",
		mpUpgrade:0.6,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2400,
		hurt:8,
		speed:8,
		mpGiven:11,
		value:60
	},
	
	//////////////////////////////蜀势力//////////////////////////////
	
	liubei:{
		name:"刘备",
		introduction:"刘备，字玄德，东汉末年幽州涿郡涿县人，三国时期蜀汉开国皇帝，谥号昭烈皇帝。汉朝的宗室，汉中山靖王刘胜的后代。他为人谦和、礼贤下士，宽以待人，志向远大，知人善用，素以仁德为世人称赞，是三国时期著名的政治家。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:110,
		cost:440,
		maxLevel:1,
		range:{type:"circle",range:2.5},
		skill:"xuli",
		mpUpgrade:0.6,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2400,
		hurt:5,
		speed:8,
		mpGiven:12,
		value:40
	},
	guanyu:{
		name:"关羽",
		introduction:"关羽，字云长，河东解良人，汉末三国时期名将。刘备起兵时，关羽跟随刘备，忠心不二，深受刘备信任。蜀国“五虎上将”之首。被世人尊称为“武圣”。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:180,
		cost:460,
		maxLevel:1,
		range:{type:"circle",range:2},
		skill:"qiangxi",
		mpUpgrade:0.5,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,
		
		hp:2500,
		hurt:10,
		speed:8,
		mpGiven:10,
		value:70
	},
	machao:{
		name:"马超",
		introduction:"马超，字孟起，扶风茂陵人。东汉末年群雄之一，汉伏波将军马援的后人。刘备称帝后，拜马超为骠骑将军，领凉州牧，封斄乡侯。次年马超病逝，终年47岁。",
		isNormal:false,
		normalStyle:null,
		
		amount:1,
		attack:170,
		cost:450,
		maxLevel:1,
		range:{type:"circle",range:2.2},
		skill:"shensu",
		mpUpgrade:0.4,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2450,
		hurt:10,
		speed:12,
		mpGiven:10,
		value:60
	},
	zhangfei:{
		name:"张飞",
		introduction:"张飞，字益德（演义中字翼德），东汉末年幽州涿郡人氏，三国时期蜀汉名将。刘备长坂坡败退，张飞仅率二十骑断后，据水断桥，曹军没人敢逼近；官至车骑将军、领司隶校尉，封西乡侯。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:190,
		cost:450,
		maxLevel:1,
		range:{type:"circle",range:1.5},
		skill:"qiangxi",
		mpUpgrade:0.5,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2400,
		hurt:12,
		speed:8,
		mpGiven:10,
		value:60
	},
	
	//////////////////////////////吴势力//////////////////////////////
	sunce:{
		name:"孙策",
		introduction:"孙策，字伯符，吴郡富春人。孙坚长子，孙权长兄。东汉末年割据江东一带的军阀，汉末群雄之一，三国时期吴国的奠基者之一。他曾因在战场上夹死一将又喝死一将，被称为“小霸王”。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:170,
		cost:430,
		maxLevel:1,
		range:{type:"circle",range:1.5},
		skill:"qiangxi",
		mpUpgrade:0.4,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2200,
		hurt:10,
		speed:8,
		mpGiven:10,
		value:50
	},
	
	//////////////////////////////其他势力//////////////////////////////
	
	zhangjiao:{
		name:"张角",
		introduction:"张角，钜鹿人。东汉末年农民起义军“黄巾军”的领袖，太平道的创始人。中平元年，张角以“苍天已死，黄天当立，岁在甲子，天下大吉”为口号，自称“天公将军”，率领群众发动起义。不久张角病死，起义军也很快被汉朝所镇压。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:100,
		cost:400,
		maxLevel:1,
		range:{type:"circle",range:3},
		skill:"xuli",
		mpUpgrade:0.5,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:2000,
		hurt:4,
		speed:10,
		mpGiven:13,
		value:40
	},
	yuanshao:{
		name:"袁绍",
		introduction:"袁绍，字本初，汝南汝阳人。出身名门望族，自曾祖父起四代有五人位居三公，自己也居三公之上，其家族也因此有“四世三公”之称。袁绍初为司隶校尉，于初平元年被推举为反董卓联合军的盟主，与董卓交战；但不久联合军即瓦解。在平定冀州叛乱之后，于建安七年病死。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:100,
		cost:270,
		maxLevel:1,
		range:{type:"circle",range:2.5},
		skill:"xuli",
		mpUpgrade:0.4,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2000,
		hurt:8,
		speed:8,
		mpGiven:10,
		value:40
	},
	dongzhuo:{
		name:"董卓",
		introduction:"董卓，字仲颖，陇西临洮人。东汉末年少帝、献帝时权臣，凉州军阀。官至太师，封郿侯。原本屯兵凉州，于灵帝末年的十常侍之乱时受大将军何进之召率军进京，旋即掌控朝中大权。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:90,
		cost:380,
		maxLevel:1,
		range:{type:"circle",range:1.5},
		skill:"xuli",
		mpUpgrade:0.3,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:2300,
		hurt:8,
		speed:6,
		mpGiven:10,
		value:40
	},
	lvbu:{
		name:"吕布",
		introduction:"吕布，字奉先，东汉末年名将，汉末群雄之一，五原郡九原县人。先后为丁原、董卓的部将，也曾为袁绍效力，后占据徐州，自成一方势力。于建安三年在下邳被曹操击败并处死。",
		isNormal:false,
		normalStyle:null,

		amount:1,
		attack:200,
		cost:460,
		maxLevel:1,
		range:{type:"circle",range:2},
		skill:"qiangxi",
		mpUpgrade:0.2,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:2500,
		hurt:15,
		speed:12,
		mpGiven:8,
		value:75
	},
	
	//////////////////////////////士兵//////////////////////////////
	
	/**刀兵一族*/
	daobing:{
		name:"刀兵",
		introduction:"普通的一个步兵。",
		isNormal:false,
		normalStyle:null,
		
		amount:"countless",
		attack:50,
		cost:80,
		maxLevel:3,
		range:{type:"circle",range:3},
		skill:null,
		attribute:"soldier",
		arms:"bubing",
		levelUpStyle:"zhongdaobing",
		
		hp:250,
		hurt:1,
		speed:6,
		mpGiven:3,
		value:5
	},
	zhongdaobing:{
		name:"重刀兵",
		introduction:"普通的一个步兵。",
		isNormal:false,
		normalStyle:null,
		
		amount:"countless",
		attack:50,
		cost:80,
		maxLevel:2,
		range:{type:"circle",range:3},
		skill:null,
		attribute:"soldier",
		arms:"bubing",
		levelUpStyle:"huweibing",
		
		hp:600,
		hurt:1,
		speed:6,
		mpGiven:5,
		value:10
	},
	huweibing:{
		name:"虎卫兵",
		introduction:"普通的一个步兵。",
		isNormal:false,
		normalStyle:null,
		
		amount:"countless",
		attack:50,
		cost:80,
		maxLevel:1,
		range:{type:"circle",range:3},
		skill:null,
		attribute:"soldier",
		arms:"bubing",
		levelUpStyle:null,
		
		hp:1600,
		hurt:1,
		speed:6,
		mpGiven:8,
		value:15
	},
	/**骑兵一族*/
	qingqibing:{
		name:"轻骑兵",
		introduction:"普通的一个骑兵。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:70,
		cost:100,
		maxLevel:3,
		range:{type:"circle",range:3},
		skill:null,
		attribute:"soldier",
		arms:"qibing",
		levelUpStyle:"qiangqibing",
		
		hp:600,
		hurt:1,
		speed:8,
		mpGiven:4,
		value:10
	},
	qiangqibing:{
		name:"枪骑兵",
		introduction:"普通的一个骑兵。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:70,
		cost:100,
		maxLevel:2,
		range:{type:"circle",range:3},
		skill:null,
		attribute:"soldier",
		arms:"qibing",
		levelUpStyle:"tieqibing",

		hp:900,
		hurt:1,
		speed:8,
		mpGiven:6,
		value:12
	},
	tieqibing:{
		name:"铁骑兵",
		introduction:"普通的一个骑兵。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:70,
		cost:100,
		maxLevel:1,
		range:{type:"circle",range:3},
		skill:null,
		attribute:"soldier",
		arms:"qibing",
		levelUpStyle:null,

		hp:1200,
		hurt:1,
		speed:12,
		mpGiven:8,
		value:20
	},
	/**弓兵一族*/
	gongjianbing:{
		name:"弓箭兵",
		introduction:"普通的一个弓兵。",
		isNormal:false,
		normalStyle:null,
		
		amount:"countless",
		attack:40,
		cost:120,
		maxLevel:3,
		range:{type:"circle",range:4},
		skill:null,
		attribute:"soldier",
		arms:"gongbing",
		levelUpStyle:"gongnushou",

		hp:300,
		hurt:1,
		speed:6,
		mpGiven:5,
		value:5
	},
	gongnushou:{
		name:"弓弩兵",
		introduction:"普通的一个弓兵。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:40,
		cost:120,
		maxLevel:2,
		range:{type:"circle",range:4},
		skill:null,
		attribute:"soldier",
		arms:"gongbing",
		levelUpStyle:"paonushou",

		hp:600,
		hurt:1,
		speed:8,
		mpGiven:7,
		value:10
	},
	paonushou:{
		name:"炮弩兵",
		introduction:"普通的一个弓兵。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:40,
		cost:120,
		maxLevel:1,
		range:{type:"circle",range:4},
		skill:null,
		attribute:"soldier",
		arms:"gongbing",
		levelUpStyle:null,

		hp:1100,
		hurt:1,
		speed:10,
		mpGiven:9,
		value:15
	},
	/**术兵一族*/
	shubing:{
		name:"术兵",
		introduction:"普通的一个术士。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:60,
		cost:140,
		maxLevel:3,
		range:{type:"circle",range:3.5},
		skill:null,
		attribute:"soldier",
		arms:"shushi",
		levelUpStyle:"daoren",

		hp:300,
		hurt:1,
		speed:6,
		mpGiven:5,
		value:10
	},
	daoren:{
		name:"道人",
		introduction:"普通的一个术士。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:60,
		cost:140,
		maxLevel:2,
		range:{type:"circle",range:3.5},
		skill:null,
		attribute:"soldier",
		arms:"shushi",
		levelUpStyle:"fashi",

		hp:600,
		hurt:1,
		speed:6,
		mpGiven:8,
		value:15
	},
	fashi:{
		name:"法师",
		introduction:"普通的一个术士。",
		isNormal:false,
		normalStyle:null,

		amount:"countless",
		attack:60,
		cost:140,
		maxLevel:1,
		range:{type:"circle",range:3.5},
		skill:null,
		attribute:"soldier",
		arms:"shushi",
		levelUpStyle:null,

		hp:1000,
		hurt:1,
		speed:8,
		mpGiven:11,
		value:20
	},
	
	//////////////////////////////大众形象//////////////////////////////
	
	/**黄巾军一族*/
	zhangbao:{
		name:"张宝",
		introduction:"“黄巾军”的领袖之一。地公将军。",
		isNormal:true,
		normalStyle:2,

		attack:60,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:1800,
		hurt:3,
		speed:10,
		mpGiven:12,
		value:20
	},
	zhangliang:{
		name:"张梁",
		introduction:"“黄巾军”的领袖之一。人公将军。",
		isNormal:true,
		normalStyle:2,

		attack:60,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:1900,
		hurt:3,
		speed:8,
		mpGiven:12,
		value:20
	},
	chengzhiyuan:{
		name:"程志远",
		introduction:"“黄巾军”将领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1200,
		hurt:2,
		speed:10,
		mpGiven:9,
		value:20
	},
	zhangyan:{
		name:"张燕",
		introduction:"“黄巾军”将领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1300,
		hurt:2,
		speed:8,
		mpGiven:9,
		value:20
	},
	peiyuanshao:{
		name:"裴元绍",
		introduction:"“黄巾军”将领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1500,
		hurt:2,
		speed:8,
		mpGiven:9,
		value:20
	},
	/**吕布军一族*/
	huaxiong:{
		name:"华雄",
		introduction:"董卓手下部将。",
		isNormal:true,
		normalStyle:1,

		attack:100,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:1500,
		hurt:5,
		speed:6,
		mpGiven:9,
		value:25
	},
	houcheng:{
		name:"侯成",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:1200,
		hurt:2,
		speed:6,
		mpGiven:9,
		value:20
	},
	songxian:{
		name:"宋宪",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1200,
		hurt:2,
		speed:6,
		mpGiven:9,
		value:20
	},
	weixu:{
		name:"魏续",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1250,
		hurt:2,
		speed:6,
		mpGiven:9,
		value:20
	},
	chenglian:{
		name:"成廉",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1250,
		hurt:2,
		speed:6,
		mpGiven:9,
		value:20
	},
	caoxing:{
		name:"曹性",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1300,
		hurt:3,
		speed:6,
		mpGiven:9,
		value:20
	},
	haomeng:{
		name:"郝萌",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1350,
		hurt:3,
		speed:6,
		mpGiven:9,
		value:20
	},
	zangba:{
		name:"臧霸",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1350,
		hurt:5,
		speed:10,
		mpGiven:9,
		value:25
	},
	gaoshun:{
		name:"高顺",
		introduction:"吕布手下部领。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1400,
		hurt:5,
		speed:10,
		mpGiven:9,
		value:25
	},
	chengong:{
		name:"陈宫",
		introduction:"吕布手下谋士。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:1400,
		hurt:5,
		speed:6,
		mpGiven:9,
		value:25
	},
	/**袁术军一族*/
	yuanshu:{
		name:"袁术",
		introduction:"袁术，字公路，汉末军伐之一。",
		isNormal:true,
		normalStyle:2,

		attack:90,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:2000,
		hurt:8,
		speed:6,
		mpGiven:12,
		value:40
	},
	jiling:{
		name:"纪灵",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:1,

		attack:100,
		attribute:"general",
		arms:"qibing",
		levelUpStyle:null,

		hp:1900,
		hurt:5,
		speed:6,
		mpGiven:9,
		value:25
	},
	hanjin:{
		name:"韩进",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:2,

		attack:1200,
		attribute:"general",
		arms:"shushi",
		levelUpStyle:null,

		hp:1200,
		hurt:2,
		speed:6,
		mpGiven:12,
		value:20
	},
	yangfeng:{
		name:"杨奉",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:2,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1200,
		hurt:2,
		speed:6,
		mpGiven:12,
		value:20
	},
	qiaomao:{
		name:"桥楙",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1250,
		hurt:2,
		speed:6,
		mpGiven:9,
		value:20
	},
	leibo:{
		name:"雷薄",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1250,
		hurt:2,
		speed:6,
		mpGiven:9,
		value:20
	},
	chenlan:{
		name:"陈兰",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1300,
		hurt:3,
		speed:6,
		mpGiven:9,
		value:20
	},
	zhangxun:{
		name:"张勋",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:1,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1350,
		hurt:3,
		speed:6,
		mpGiven:9,
		value:20
	},
	yangdajiang:{
		name:"杨大将",
		introduction:"袁术手下部将。",
		isNormal:true,
		normalStyle:2,

		attack:60,
		attribute:"general",
		arms:"bubing",
		levelUpStyle:null,

		hp:1350,
		hurt:5,
		speed:10,
		mpGiven:12,
		value:25
	}
};