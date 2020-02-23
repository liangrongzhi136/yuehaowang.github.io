function initPage(){
	var d = document;
	for(var key in armsData){
		var optionObj = document.createElement("option");
		optionObj.value = key;
		optionObj.innerHTML = armsData[key].name;
		d.getElementById("arms").appendChild(optionObj);
	}
	for(var key in skillData){
		var optionObj = document.createElement("option");
		optionObj.value = key;
		optionObj.innerHTML = skillData[key].name;
		d.getElementById("skill").appendChild(optionObj);
	}
}
function createChara(){
	var d = document;
	var unfilledList = new Array();
	
	var chara_en_name = d.getElementById("chara_en_name").value;
	if(chara_en_name == "")unfilledList.push(chara_en_name);
	
	var chara_ch_name = d.getElementById("chara_ch_name").value;
	if(chara_ch_name == "")unfilledList.push(chara_ch_name);
	chara_ch_name = toString(chara_ch_name);
		
	var introduction = d.getElementById("introduction").value;
	if(introduction == "")unfilledList.push(introduction);
	introduction = toString(introduction);
	
	var isNormalObj = d.getElementById("isNormal");
	var isNormalIndex = isNormalObj.selectedIndex;
	var isNormal = isNormalObj.options[isNormalIndex].value;
	
	var amount = d.getElementById("amount").value;
	if(isNaN(amount)){
		amount = toString(amount);
	}
	if(amount == "")unfilledList.push(amount);
	
	var attack = d.getElementById("attack").value;
	if(attack == "")unfilledList.push(attack);
	var cost = d.getElementById("cost").value;
	if(cost == "")unfilledList.push(cost);
	var maxLevel = d.getElementById("maxLevel").value;
	if(maxLevel == "")unfilledList.push(maxLevel);
	
	var range_typeObj = d.getElementById("range_type");
	var range_typeIndex = range_typeObj.selectedIndex;
	var range_type = range_typeObj.options[range_typeIndex].value;
	range_type = toString(range_type);
	
	var range_range = d.getElementById("range_range").value;
	if(range_range == "")unfilledList.push(range_range);
	
	var skillObj = d.getElementById("skill");
	var skillIndex = skillObj.selectedIndex;
	var skill = skillObj.options[skillIndex].value;
	if(skill != "null"){
		skill = toString(skill);
	}
	
	var attributeObj = d.getElementById("attribute");
	var attributeIndex = attributeObj.selectedIndex;
	var attribute = attributeObj.options[attributeIndex].value;
	attribute = toString(attribute);
	
	var armsObj = d.getElementById("arms");
	var armsIndex = armsObj.selectedIndex;
	var arms = armsObj.options[armsIndex].value;
	arms = toString(arms);
	
	var levelUpStyle = d.getElementById("levelUpStyle").value;
	if(levelUpStyle == "")unfilledList.push(levelUpStyle);
	if(levelUpStyle != "null"){
		levelUpStyle = toString(levelUpStyle);
	}
	
	var hp = d.getElementById("hp").value;
	if(hp == "")unfilledList.push(hp);
	var hurt = d.getElementById("hurt").value;
	if(hurt == "")unfilledList.push(hurt);
	
	var speedObj = d.getElementById("speed");
	var speedIndex = speedObj.selectedIndex;
	var speed = speedObj.options[speedIndex].value;
	
	var value = d.getElementById("value").value;
	if(value == "")unfilledList.push(value);
	
	if(unfilledList.length != 0){
		hint("项目未添完");
		return;
	}
	
	var code = chara_en_name + ":" + "{"
		+"<br />"+"&#9;"+"name:"+chara_ch_name+","
		+"<br />"+"&#9;"+"introduction:"+introduction+","
		+"<br />"+"&#9;"+"isNormal:"+isNormal+","
		+"<br />"
		+"<br />"+"&#9;"+"amount:"+amount+","
		+"<br />"+"&#9;"+"attack:"+attack+","
		+"<br />"+"&#9;"+"cost:"+cost+","
		+"<br />"+"&#9;"+"maxLevel:"+maxLevel+","
		+"<br />"+"&#9;"+"range:"+"{"+"type:"+range_type+","+"range:"+range_range+"}"+","
		+"<br />"+"&#9;"+"skill:"+skill+","
		+"<br />"+"&#9;"+"attribute:"+attribute+","
		+"<br />"+"&#9;"+"arms:"+arms+","
		+"<br />"+"&#9;"+"levelUpStyle:"+levelUpStyle+","
		+"<br />"
		+"<br />"+"&#9;"+"hp:"+hp+","
		+"<br />"+"&#9;"+"hurt:"+hurt+","
		+"<br />"+"&#9;"+"speed:"+speed+","
		+"<br />"+"&#9;"+"value:"+value
	+"<br />"+"}";
	
	d.getElementById("code_area").innerHTML = code;
}
function hint(c){
	var d = document.getElementById("hint_box");
	var dc = document.getElementById("hint_box_content");
	d.style.display = "block";
	dc.innerHTML = c;
}
function closeHintBox(){
	var d = document.getElementById("hint_box");
	d.style.display = "none";
}
function toString(v){
	return '"'+v+'"';
}