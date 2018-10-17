
function checkTime(i)
	{
		if (i<10) 
		{
			i="0" + i;
		}
		return i;
	}
	var t = new Date();
    var notifications_mass = [];
	var notifications_mass_not_yet_flight = [];
	var notifications_mass_loop = [];
	var minuts;
	
function load_ftable(){
		request = $.ajax({	
			url: 'http://www.aerograd.ru/ajax.php?mode=app',
			dataType: 'json',
			timeout: 10000, 
			beforeSend: function() {
			},
			complete: function() {
				//alert("compleate");
			},
			success: function(data) {
				if (data.loads == '') { 
					$('#Flights').hide();
					$('#FT-NoFlights').show();
					$('#FT-NoFlights').html("<img src=\"images/hires-logo.png\" align=\"center\"><br><br>");
					$('#FT-NoFlights').append("Нет информации о взлетах!"); 
					try{
							notification_send_once("999", "999" );
							}
							catch(err){}
					}
					else {
						$('#FT-NoFlights').hide();
						$('#Flights').show();
						var i = 0;
						var ftRecord;
						for (var loads_n in data.loads) {
							try{
							notification_send_once(data.loads[i].number, data.loads[i].timeLeft );
							}
							catch(err){}
							//$('.ftRecord').append("<th>" + data.loads[i].number + "</th><th>" + data.loads[i].plane + "</th><th>" + data.loads[i].timeLeft +"</th>"); 
							ftRecord += "<tr class=\"ftRecord\">\"<th>" + data.loads[i].number + "</th><th>" + data.loads[i].plane + "</th><th>" + data.loads[i].timeLeft + "</th>\"</tr>";
                            i++;
						}
						$('#Flights table').html(ftRecord);
					}      
				 },
				 error: function(XMLHttpRequest, textStatus, errorThrown) { 
				  if(textStatus==="timeout") {
                      request.abort(); // is this necessary?
					  
                  }					
					
				 } 
			
        });
	setTimeout(function () { request.abort(); load_ftable(); }, 30000);	
	}
	
	
	
	function timeupdate(){
		var t = new Date();
		var time = checkTime(t.getHours())+":"+checkTime(t.getMinutes());
		$('#FTClock').html(time);
	
		setTimeout(function () {  timeupdate(); }, 1000);
	}
	
	
	function notification_send_once(loads_n,time_l){
		if(loads_n > 1 & loads_n < 999){floads = loads_n; loads_n = 2;}else{floads = loads_n;}
		switch (loads_n) {
			case 1:
				text_n = 'Формируется первый взлет';
				break;
			case "404":
				text_n = 'Нет связи с сервером'+time_l;
				break;		
			case 2:
				text_n = 'Формируется взлет №'+floads;
				break;
			default:
				text_n = 'Нет информации о взлетах';
		}
		
		if(notifications_mass_loop.indexOf(floads) === -1){
			notifications_mass_loop.push(floads);
		}
		
		if(notifications_mass.indexOf(floads) === -1){
			if(cordova.plugins.backgroundMode.isActive()){
				cordova.plugins.notification.local.schedule({
				id: floads,
				title: "Табло взлетов:",
				text: text_n,
				foreground: true
				});
			}
		notifications_mass.push(floads);
		notifications_mass_not_yet_flight.push(floads);
		}
		else{
			if(floads === "999"){notifications_mass = []; notifications_mass.push(floads);}

			
			if(time_l<20){
				cordova.plugins.notification.local.cancel(floads,function(){});
				notifications_mass_not_yet_flight.remove(floads);
				}
			

		}	
	}
	
