
	// var t = new Date();
    // var notifications_mass = [];
	// var notifications_mass_not_yet_flight = [];
	// var notifications_mass_loop = [];
	// var minuts;
	$('#Flights').hide();
var TabloTimer = null;



function load_ftable(){
		request = $.ajax({	
			url: 'http://www.aerograd.ru/ajax.php?mode=app',
			dataType: 'json',
			crossDomain: true,
			// timeout: 1000, 
			beforeSend: function() {
				
				document.getElementById("loadcircle_tablo").style.display = 'flex';
			},
			complete: function() {
			
			},
			success: function(data) {
				if (data.loads == '') { 
					$('#Flights').hide();
					$('#FT-NoFlights').show();
					// $('#FT-NoFlights').html("<img src=\"img/hires-logo.png\" align=\"center\"><br><br>");
					$('#FT-NoFlights').html("<img src=\"img/hires-logo.png\" align=\"center\">");
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
						document.getElementById("Flights").style.visibility
						var i = 0;
						var ftRecord="";
						$('#Flights table').html(ftRecord);
						for (var loads_n in data.loads) {
							try{
							notification_send_once(data.loads[i].number, data.loads[i].timeLeft );
							}
							catch(err){}
							
							ftRecord = "<tr><td><div class=\"col-xs-2 col-sm-2 col-md-2 text-center padding_0 \">" + data.loads[i].number + "</div><div class=\"col-xs-8 col-sm-8 col-md-8 text-center\">" + data.loads[i].plane + "</div><div class=\"col-xs-2 col-sm-2 col-md-2 text-center padding_0\">" + data.loads[i].timeLeft+ "</div><div class=\"col-xs-2 col-sm-2 col-md-2 text-center font_down_style_my\">Взлет</div><div class=\"col-xs-8 col-sm-8 col-md-8 text-center font_down_style_my\">Количество свободных мест " + data.loads[i].freePlaces + "</div><div class=\"col-xs-2 col-sm-2 col-md-2 text-center font_down_style_my\">мин</div></td></tr>";
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
			
        })

	if (TabloTimer != null) {
			clearTimeout(TabloTimer);
			TabloTimer = null;
	}
	TabloTimer = setTimeout(function () { load_ftable(); }, 30000);
}
	

