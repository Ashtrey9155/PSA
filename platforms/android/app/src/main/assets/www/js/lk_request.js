function load_lk(){

var d=new Date();
var day=d.getDate();
var month=d.getMonth() + 1;
var year=d.getFullYear();
let today = day + "." + month + "." + year;

		request = $.ajax({	
			url: 'https://dz.aerograd.ru:4004/ajax.php?mode=get_bal_info',
			dataType: 'json',
			crossDomain: true,
			beforeSend: function() {
				let lk_mainbtn = document.querySelector("#lk_mainbtn");
				let lk_historybtn = document.querySelector("#lk_historybtn");
				if (lk_historybtn.classList.contains("active_btn") === true) 
					{
						lk_historybtn.classList.remove("active_btn");
						lk_mainbtn.classList.add("active_btn")						
						// tabloBtn.click(); 
					 } 
				$('#lk_card').html("loading...");
				$('#lk_name').html("loading...");
				$('#lk_main').html("loading...");
				// else {lk_mainbtn.classList.add("active_btn")}
				// document.getElementById("loadcircle_tablo").style.display = 'flex';
			},
			complete: function() {
			
			},
			success: function(data) {
				$('#lk_card').html(data.card);
				$('#lk_name').html(data.name);
				let ftRecord="";
				ftRecord = "<table class=\"table table-striped font_style_my\"><tr><td><div class=\"col-xs-6 col-sm-6 col-md-6 text-center align_left \"><p>Баланс</p><small>на "+ today +"</small></div>" + "<div class=\"col-xs-6 col-sm-6 col-md-6 text-center align_right line-height_8vh \">" + data.balans*(-1) + " р.</div></td></tr>";
				ftRecord += "<tr><td><div class=\"col-xs-6 col-sm-6 col-md-6 text-center align_left \"><p>Доход</p><small>на "+ today +"</small></div>" + "<div class=\"col-xs-6 col-sm-6 col-md-6 text-center align_right line-height_8vh \">" + data.todaybal*(-1) + " р.</div></td></tr></table>";
				$('#lk_main').html(ftRecord);

				
				},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				  if(textStatus==="timeout") {
                      console.log(textStatus);
                  }					
					
				 } 
			
        })
		
		
		
		
		
		
		
}
	