(function() {

  "use strict";
	var loginbtn = document.querySelector(".lk_in_out");
	let tabloBtn = document.querySelector("#tabloBtn");
	
    loginbtn.addEventListener( "click", function(e) {
		e.preventDefault();
	  	var toggles = document.querySelectorAll(".cmn-toggle-switch");
		for (var i = toggles.length - 1; i >= 0; i--) {
			var toggle = toggles[i];
			if (toggle.classList.contains("active_point_menu") === true) {toggle.classList.remove("active_point_menu") };

		};
	  
		var loginbtn = document.querySelector(".lk_in_out");
		if (loginbtn.classList.contains("active_logout_btn") === true) 
			{
				loginbtn.classList.remove("active_logout_btn"); 
				tabloBtn.click(); 
			 } 
		else {loginbtn.classList.add("active_logout_btn")}	
    })
	

  

})();




	