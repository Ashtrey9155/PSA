var request = require('request');

var options = {
  url: 'https://api.weather.yandex.ru/v1/informers?lat=51.832982&lon=37.106660', //указать свои координаты
  headers: {
    'User-Agent': 'request',
    'X-Yandex-API-Key': 'bxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx' //вставить полученный API-key
  }
};

function translateCondition (condition) {
  var rcond;
    switch(condition) {
  case "clear": rcond="ясно";
      break;
      case "partly-cloudy": rcond="малооблачно";
      break;
      case "cloudy": rcond="облачно с прояснениями";
      break;
      case "overcast": rcond="пасмурно";
      break;
      case "partly-cloudy-and-light-rain": rcond="малооблачно, небольшой дождь";
      break;
      case "partly-cloudy-and-rain": rcond="малооблачно,дождь";
      break;
      case "overcast-and-rain": rcond="облачно, сильный дождь";
      break;
      case "overcast-thunderstorms-with-rain": rcond="облачно, сильный дождь, гроза";
      break;
      case "cloudy-and-light-rain": rcond="облачно, небольшой дождь";
      break;
      case "overcast-and-light-rain": rcond="пасмурно, небольшой дождь";
      break;
      case "cloudy-and-rain": rcond="облачно, дождь";
      break;
      case "overcast-and-wet-snow": rcond="пасмурно, дождь со снегом";
      break;
      case "partly-cloudy-and-light-snow": rcond="малооблачно, небольшой снег";
      break;
      case "partly-cloudy-and-snow": rcond="малооблачно, снег";
      break;
      case "overcast-and-snow": rcond="пасмурно, снегопад";
      break;
      case "cloudy-and-light-snow": rcond="облачно, небольшой снег";
      break;
      case "overcast-and-light-snow": rcond="пасмурно, небольшой снег";
      break;
      case "cloudy-and-snow": rcond="облачно, снег";
    }
return rcond;
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var fact = info.fact;
    setState("weather.0.forecast.current.temperature"/*temperature*/, fact.temp, true);
    setState("weather.0.forecast.current.condition"/*condition*/, translateCondition(fact.condition), true);
    setState("weather.0.forecast.current.feels_like"/*feels_like*/, fact.feels_like, true);
    setState("weather.0.forecast.current.humidity"/*humidity*/, fact.humidity, true);
    setState("weather.0.forecast.current.icon"/*icon*/, "https://yastatic.net/weather/i/icons/blueye/color/svg/"+fact.icon+".svg", true); 
    setState("weather.0.forecast.current.obs_time"/*obs_time*/, fact.obs_time, true);
    setState("weather.0.forecast.current.pressure_mm"/*pressure_mm*/, fact.pressure_mm, true);
    setState("weather.0.forecast.current.wind_gust"/*wind_gust*/, fact.wind_gust, true);
    setState("weather.0.forecast.current.wind_speed"/*wind_speed*/, fact.wind_speed, true);
    setState("weather.0.forecast.current.obs_time_hum"/*obs_time*/, formatDate(fact.obs_time, "JJJJ.MM.TT SS:mm:ss.sss"), true);
    
    var forecast = info.forecast;
    
    setState("weather.0.forecast.date"/*date*/, forecast.date, true);
    setState("weather.0.forecast.date_ts"/*date_ts*/, forecast.date_ts, true);
    setState("weather.0.forecast.moon_code"/*moon_code*/, forecast.moon_code, true);
    setState("weather.0.forecast.sunrise"/*sunrise*/, forecast.sunrise, true);
    setState("weather.0.forecast.sunset"/*sunset*/, forecast.sunset, true);
    setState("weather.0.forecast.week"/*week*/, forecast.week, true);
   
   var fparts = info.forecast.parts;
   
   for(var i = 0; i < fparts.length; i++) {
    var obj = fparts[i];
    setState("weather.0.forecast."+obj.part_name+".part_name", obj.part_name, true);
    setState("weather.0.forecast."+obj.part_name+".temp_min", obj.temp_min, true);
    setState("weather.0.forecast."+obj.part_name+".temp_max", obj.temp_max, true);
    setState("weather.0.forecast."+obj.part_name+".temp_avg", obj.temp_avg, true);
    setState("weather.0.forecast."+obj.part_name+".feels_like", obj.feels_like, true);
    setState("weather.0.forecast."+obj.part_name+".icon", obj.icon, true);
    setState("weather.0.forecast."+obj.part_name+".condition", translateCondition(obj.condition), true);
    setState("weather.0.forecast."+obj.part_name+".wind_speed", obj.wind_speed, true);
    setState("weather.0.forecast."+obj.part_name+".wind_gust", obj.wind_gust, true);
    setState("weather.0.forecast."+obj.part_name+".pressure_mm", obj.pressure_mm, true);
    setState("weather.0.forecast."+obj.part_name+".humidity", obj.humidity, true);
    setState("weather.0.forecast."+obj.part_name+".prec_mm", obj.prec_mm, true);
    setState("weather.0.forecast."+obj.part_name+".prec_period", obj.prec_period, true);
    setState("weather.0.forecast."+obj.part_name+".prec_prob", obj.prec_prob, true);
    }

  }
}

schedule("0 * * * *", function () {
    request(options, callback);
});

