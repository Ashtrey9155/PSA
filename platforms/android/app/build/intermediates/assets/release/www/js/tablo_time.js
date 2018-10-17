
	var t = new Date();
    var notifications_mass = [];
	var notifications_mass_not_yet_flight = [];
	var notifications_mass_loop = [];
	var minuts;
	$('#Flights').hide();
function load_ftable(){
		request = $.ajax({	
			url: 'http://www.aerograd.ru/ajax.php?mode=app',
			dataType: 'json',
			timeout: 3000, 
			beforeSend: function() {
				
				document.getElementById('loadcircle_tablo').style.display = 'flex';
			},
			complete: function() {
			
			},
			success: function(data) {
				if (data.loads == '') { 
					$('#Flights').hide();
					$('#FT-NoFlights').show();
					$('#FT-NoFlights').html("<img src=\"img/hires-logo.png\" align=\"center\"><br><br>");
					$('#FT-NoFlights').append("Нет информации о взлетах!"); 
					document.getElementById('loadcircle_tablo').style.display = 'none';
					document.getElementById('FT-NoFlights').style.display = 'flex';
					try{
							notification_send_once("999", "999" );
							}
							catch(err){}
					}
				else {
						$('#FT-NoFlights').hide();
						$('#Flights').show();
						var i = 0;
						var ftRecord="";
						$('#Flights table').html(ftRecord);
						for (var loads_n in data.loads) {
							try{
							notification_send_once(data.loads[i].number, data.loads[i].timeLeft );
							}
							catch(err){}
							
							ftRecord = "<tr><td>" + "<div class=\"col-xs-2 col-sm-2 col-md-2 text-center\">" + data.loads[i].number + "</div>" + "<div class=\"col-xs-8 col-sm-8 col-md-8 text-center\">" + data.loads[i].plane + "</div>" + "<div class=\"col-xs-2 col-sm-2 col-md-2 text-center\">" + data.loads[i].timeLeft+ "</div>" + "<div class=\"col-xs-2 col-sm-2 col-md-2 text-center font_down_style_my\">" + "Взлет" + "</div>" + "<div class=\"col-xs-8 col-sm-8 col-md-8 text-center font_down_style_my\">" + "Количество свободных мест " + data.loads[i].freePlaces + "</div>" + "<div class=\"col-xs-2 col-sm-2 col-md-2 text-center font_down_style_my\">" + "мин." + "</div>" + "</td></tr>";
                            i++;
							$('#Flights table').append(ftRecord);
						}
						document.getElementById('loadcircle_tablo').style.display = 'none';
						
					}      
				 },
				 error: function(XMLHttpRequest, textStatus, errorThrown) { 
				  if(textStatus==="timeout") {
                      console.log(textStatus);
					  if(timer){
						clearTimeout(timer);
						console.log("ClearTimer" + timer);
						load_ftable();
					  }
                  }					
					
				 } 
			
        });
	timer = setTimeout(function () { load_ftable(); }, 30000);	
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
	
