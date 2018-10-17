function load_weather(){
		request = $.ajax({
			 url: 'https://dz.aerograd.ru:4004/ajax.php?mode=get_weather_info',
			 dataType: 'json',
			 crossDomain: true,
			beforesend: function(){
				$('#condition').html("loading...");
				$('#temp').html("loading...");
				$('#wind_speed').html("loading...");
				$('#pressure_mm').html("loading...");
				$('#humidity').html("loading...");
				$('#img_weather').html("loading...");
			},
			complete: function() {
			
			},
			success: function(data) {
				var event = JSON.parse(data);
				// console.log(event.now);

				//var data = "{\"now\":1535704883,\"now_dt\":\"2018-08-31T08:41:23.529Z\",\"info\":{\"lat\":55.089511,\"lon\":38.917316,\"url\":\"https:\/\/yandex.ru\/pogoda\/?lat=55.089511&lon=38.917316\"},\"fact\":{\"temp\":21,\"feels_like\":21,\"icon\":\"ovc\",\"condition\":\"overcast\",\"wind_speed\":2.6,\"wind_gust\":7.8,\"wind_dir\":\"e\",\"pressure_mm\":753,\"pressure_pa\":1004,\"humidity\":66,\"daytime\":\"d\",\"polar\":false,\"season\":\"summer\",\"obs_time\":1535702400},\"forecast\":{\"date\":\"2018-08-31\",\"date_ts\":1535662800,\"week\":35,\"sunrise\":\"05:28\",\"sunset\":\"19:20\",\"moon_code\":2,\"moon_text\":\"decreasing-moon\",\"parts\":[{\"part_name\":\"day\",\"temp_min\":21,\"temp_max\":24,\"temp_avg\":23,\"feels_like\":22,\"icon\":\"bkn_d\",\"condition\":\"cloudy\",\"daytime\":\"d\",\"polar\":false,\"wind_speed\":3.2,\"wind_gust\":8.9,\"wind_dir\":\"e\",\"pressure_mm\":753,\"pressure_pa\":1004,\"humidity\":59,\"prec_mm\":0,\"prec_period\":360,\"prec_prob\":0},{\"part_name\":\"evening\",\"temp_min\":16,\"temp_max\":24,\"temp_avg\":20,\"feels_like\":21,\"icon\":\"skc_n\",\"condition\":\"clear\",\"daytime\":\"n\",\"polar\":false,\"wind_speed\":1.5,\"wind_gust\":4.1,\"wind_dir\":\"ne\",\"pressure_mm\":754,\"pressure_pa\":1006,\"humidity\":74,\"prec_mm\":0,\"prec_period\":360,\"prec_prob\":0}]}}"
				var event = JSON.parse(data);
				
				// console.log(event.fact.temp);
				var temp = event.fact.temp;
				var wind_speed = event.fact.wind_speed;
				var pressure_mm = event.fact.pressure_mm;
				var humidity = event.fact.humidity;
				var condition = event.fact.condition;
				var icon = event.fact.icon;
				
				switch (condition) {
					case "clear":
						condition = "Ясно";
						break;
					case "partly-cloudy":
						condition = "Малооблачно";
						break;
					case "cloudy ":
						condition = "Облачно с прояснениями";
						break;
					case "partly-cloudy-and-light-rain":
						condition = "Небольшой дождь";
						break;
					case "overcast":
						condition = "Пасмурно";
						break;
					case "partly-cloudy-and-rain":
						condition = "Дождь";
						break;
					case "overcast-and-rain":
						condition = "Сильный дождь";
						break;
					case "overcast-thunderstorms-with-rain":
						condition = "Сильный дождь, гроза";
						break;
					case "cloudy-and-light-rain":
						condition = "Небольшой дождь";
						break;
					case "overcast-and-light-rain":
						condition = "небольшой дождь";
						break;
				  default:
					condition = "loading...";
				}
				
				var img_weather = "<img class=\"align-middle height_9vw\" src=\"https://yastatic.net/weather/i/icons/blueye/color/svg/"+icon+".svg\">";
				$('#condition').html(condition);
				$('#temp').html(temp+" °C");
				$('#wind_speed').html(wind_speed+" м/с");
				$('#pressure_mm').html(pressure_mm+" мм");
				$('#humidity').html(humidity+" %");
				$('#img_weather').html(img_weather);
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				if(textStatus==="timeout") {
					console.log(textStatus);
				}					
				 load_weather();
			} 
			
        })
		
}