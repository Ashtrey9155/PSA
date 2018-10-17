
	
	
	 $( document ).on( "click", ".btn-stop-a", function() {	
		navigator.geolocation.clearWatch(window.id);
		var arr = window.mass_id;
		console.log('Stoped Event: ' + arr);
		for (var i = 0, len = arr.length; i < len; i++){
			console.log(arr[i]);
			navigator.geolocation.clearWatch(arr[i]);
			window.mass_id = [];
		};	
	 });
	 
	 
	  $( document ).on( "click", ".btn-start-a", function() {	
		 window.id = navigator.geolocation.watchPosition(success_watchpos, geolocationError_watch, {enableHighAccuracy: true, maximumAge: 30000, timeout: 5000});
		if (window.mass_id) {
			var arr = window.mass_id;
			console.log('Stoped Event: ' + arr);
			for (var i = 0, len = arr.length; i < len; i++){
				console.log(arr[i]);
				navigator.geolocation.clearWatch(arr[i]);
				window.mass_id = [];
			};
		}
		 window.mass_id.push(window.id) ;
		 // console.log('Received Event: ' + window.id+' mass_id:'+window.mass_id+' position: '+position.coords.latitude+' '+position.coords.longitude);
	  });
	 

	 $( document ).on( "click", ".btn-clear-a", function() {	
		map.removeLayer(window.polyline);
	 });
	 
	 
	 function start_watchposition(position) {
		// console.log('start_watchposition: ' + position.coords.latitude+' '+position.coords.longitude);
		window.id = navigator.geolocation.watchPosition(success_watchpos, geolocationError_watch, {enableHighAccuracy: true, maximumAge: 30000, timeout: 5000});
		window.mass_id.push(window.id) ;
		// console.log('Received Event: ' + window.id+' mass_id:'+window.mass_id+' position: '+position.coords.latitude+' '+position.coords.longitude);
	 }	
	 
	 function stop_watchposition() {	
		navigator.geolocation.clearWatch(window.id);
		var arr = window.mass_id;
		console.log('Stoped Event: ' + arr);
		for (var i = 0, len = arr.length; i < len; i++){
			console.log(arr[i]);
			navigator.geolocation.clearWatch(arr[i]);
			window.mass_id = [];
		};	
	 }
		
	window.mass_id = [];
	
  function initializeMapAndLocator(position){
	  // console.log('initializeMapAndLocator: ' + position.coords.latitude+' '+position.coords.longitude);
		  var lat = 55.089814100000005,
			  lng = 38.916318499999996;  

	
		var coords = new L.LatLng(lat, lng);
		var marker = new L.Marker(coords, {
				 draggable: true
             });
	
        window.circles;	
		window.latlngs = [];
		// window.points;
		// window.first_lat = null;
		// window.first_lng = null;
		// window.second_lat = null;
		// window.second_lng = null;
		// window.delta_latlng;
		//window.altitude_zero = 20;
		// window.altitude_actual = 10;
		var myIcon = L.icon({
			iconUrl: '../img/7_contact.png',
			iconSize: [28, 41],

			});
		window.decorator;
		// success_watchpos(position);
		start_watchposition(position)				
	}
		
	function init(){	
		window.map = L.map('map').setView([55.089814100000005, 38.916318499999996], 12);
		window.aerograd_poly = L.polygon([[55.089420,38.909097],[55.089986,38.912573],[55.100445,38.911758],[55.092447,38.935018],[55.088509,38.935533],[55.086687,38.927035]]).addTo(map).bindTooltip('Аэроград Коломна', {permanent: true, direction: 'auto'}); 
		//Добавляем на нашу карту слой OpenStreetMap
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		// var options =  {enableHighAccuracy: true, maximumAge: 30000, timeout: 5000};
		// console.log('map drow: ' + map+' '+aerograd_poly+ ' '+options);			
		if (navigator.geolocation) {navigator.geolocation.getCurrentPosition(initializeMapAndLocator, geolocationError,{enableHighAccuracy: true, maximumAge: 30000, timeout: 5000});}
		else {
			alert("Geolocation API is not supported in your browser. :(");
		}	
			
		
	};
		
	function success_watchpos(position){
			// console.log('success_watchpos: ' + position.coords.latitude+' '+position.coords.longitude);
			// console.log('map drow again: ' + this.map);
			
			   
			if (!position.coords.latitude){ var lat = 55.089814100000005; }  else {var lat = position.coords.latitude}
			if (!position.coords.longitude){var lng = 38.916318499999996; }  else {var lng = position.coords.longitude}
			// var lat = position.coords.latitude, 
				// lng = position.coords.longitude;
			coords = new L.LatLng(lat, lng); // получили пару координат
			//console.log('lat: ' + position);
			  
			var kmph = position.coords.speed*3.6;  //Расчитали скорость
			if (kmph === NaN){kmph = 0;}
			var speed_kmph = Math.round(kmph*10)/10;
			if (!speed_kmph){speed_kmph = 0}
			 if(speed_kmph<15){zoom = 18; window.map.setZoom(zoom);}
			 if(speed_kmph<50 & speed_kmph>15){zoom = 17; window.map.setZoom(zoom);}
			 if(speed_kmph<80 & speed_kmph>50){zoom = 16; window.map.setZoom(zoom);}
			 if(speed_kmph>80){zoom = 15; window.map.setZoom(zoom);}
			
			
			
			var radius = position.coords.accuracy / 2;  //считаем радиус в метрах		
			
			
			if (map.hasLayer(window.circles) && map.hasLayer(window.marker)) { //обновление маркеров на карте
				map.removeLayer(window.circles);
				map.removeLayer(window.marker);
				
				}
			if (map.hasLayer(window.marker)) {
				map.removeLayer(window.marker);
				
				}	
				
			
			
			//создание нового маркера
			marker = new L.Marker(coords);
			if(radius < 10){

				centerLeafletMapOnMarker(map, marker, coords );	
				stop_watchposition();
			}
			marker.bindPopup("You are within " + radius + " meters from this point").openPopup();
			if(radius < 10){
			circles = new L.circle(coords, radius);
			}
			else{
			circles = new L.circle(coords, radius, {color: 'red', opacity:.5});	
			}

			map.addLayer(circles);
			if(radius < 6){
				map.removeLayer(circles);
			}
				map.addLayer(marker);
				// map.getCenter(coords);
				// console.log('getCenter: ' + coords);
				// map.setView(coords);
				centerLeafletMapOnMarker(map, marker, coords );	
	}
	
	function centerLeafletMapOnMarker(map, marker, coords) {
		var latLngs = [ marker.getLatLng() ];
		var markerBounds = L.latLngBounds(latLngs);
		map.fitBounds(markerBounds);
		// map.setView(coords, 18);
		
		// map.panTo(coords);
		console.log('centerLeafletMapOnMarker: ' + coords  + latLngs + marker + markerBounds);
	}
	
	function marker_drow(latlngs){	
		polyline = new L.polyline(latlngs, {color: 'red',	weight: 3,	opacity: 0.5,	smoothFactor: 1});
		return polyline;
	}
	
	function latlng2distance(lat1, long1, lat2, long2) {
		//радиус Земли
		var R = 6372795;
		//перевод коордитат в радианы
		lat1 *= Math.PI / 180;
		lat2 *= Math.PI / 180;
		long1 *= Math.PI / 180;
		long2 *= Math.PI / 180;
		//вычисление косинусов и синусов широт и разницы долгот
		var cl1 = Math.cos(lat1);
		var cl2 = Math.cos(lat2);
		var sl1 = Math.sin(lat1);
		var sl2 = Math.sin(lat2);
		var delta = long2 - long1;
		var cdelta = Math.cos(delta);
		var sdelta = Math.sin(delta);
		//вычисления длины большого круга
		var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
		var x = sl1 * sl2 + cl1 * cl2 * cdelta;
		var ad = Math.atan2(y, x);
		var dist = ad * R; //расстояние между двумя координатами в метрах
		return dist
	}
	
	function show_info_watchpos(position){
		$("#geolocation").html(//'Latitude: '+ position.coords.latitude + '<br>'+'Longitude: '+ position.coords.longitude + '<br>'+
				'Altitude: '+ position.coords.altitude          + '<br>' +
				'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +	
              //'Accuracy: '          + position.coords.accuracy          + '<br>' +
              //'Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
              'Heading: '           + position.coords.heading           + '<br>' 
              //'Speed: '             + position.coords.speed             + '<br>' +
              //'Timestamp: '         + position.timestamp                + '<br>'
			  );
	}
	
	 function geolocationError(error){
		 // alert("GetPos"+error.message); 
		 init();}
	
	function geolocationError_watch(error){
		var popup = L.popup().setContent("I am a standalone popup.");
		marker.bindPopup(popup).openPopup();


		
		// alert("WatchPos"+error.message);
		
		}
	//STOP WATCHING
	//map.fitBounds выровнять 
	//navigator.geolocation.clearWatch(watchID);
	// var options = { frequency: 3000 };
        // watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		
	// function startup() {
		  // var el = document.getElementById("map")[0];
		  // el.addEventListener("touchstart", handleStart, false);
		  // el.addEventListener("touchend", handleEnd, false);
		  // el.addEventListener("touchcancel", handleCancel, false);
		  // el.addEventListener("touchmove", handleMove, false);
		  // console.log("initialized.");
	// }
	
	// function handleStart(evt) {
		// console.log("touchstart.");
	// }
	
	// function handleEnd(evt) {
		// console.log("handleEnd.");
		// // stop_watchposition();
	// }
	
	// function handleCancel(evt) {
		// console.log("handleCancel.");
	// }

	// function handleMove(evt) {
		// console.log("handleMove.");
	// }