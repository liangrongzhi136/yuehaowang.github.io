window.onload = function () {
	var zoom = 6;

	if (window.innerWidth < 480) {
		zoom = 5;
	}

	var map = new BMap.Map("container");
	map.setMapStyle({style : "hardedge"});
	map.centerAndZoom(new BMap.Point(113, 37), zoom);

	addControls(map);
	addMarks(map);
}

function addControls(map) {
	var navigation = new BMap.NavigationControl();
	map.addControl(navigation);

	var title = new Title(MAP_TITLE);
	map.addControl(title);
}

function addMarks (map) {
	var myGeo = new BMap.Geocoder();

	for (var city in U_DATA) {
		var universityList = U_DATA[city];

		var c_nameStr = "";

		/** Get students in the same city */
		for (var university in universityList) {
			var nameList = universityList[university];

			c_nameStr += "<br /><b style='font-size: 22px;'>" + university + "</b><br />";

			for (var i = 0, l = nameList.length; i < l; i++) {
				var n = nameList[i];

				c_nameStr += n + " ";
			}
		}

		/** Get students in the same university */
		for (var university in universityList) {
			var nameList = universityList[university];
			var u_nameStr = "";

			for (var i = 0, l = nameList.length; i < l; i++) {
				var n = nameList[i];

				u_nameStr += n + " ";
			}

			createMarker(myGeo, map, city, university, c_nameStr, u_nameStr);
		}
	}
}

function createMarker (geo, map, city, university, c_names, u_names) {
	geo.getPoint(university, function(point){
		if (point) {
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);

			marker.addEventListener("click", function () {
				var zoom = map.getZoom();

				var opts = {
					width : 200,
					title : zoom < 9 ? city : university,
					enableMessage : false
				};

				var infoWindow = new BMap.InfoWindow(zoom < 9 ? c_names : u_names, opts);
				map.openInfoWindow(infoWindow, point);
			});
		}
	}, city);
}
