function CTimer(time,func){
	var self = this;

	var timer = setTimeout(function(){
		clearTimeout(timer);
		func();
	},time);
}