(function() {

  "use strict";

  var toggles = document.querySelectorAll(".cmn-toggle-switch");
  
  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
	  var toggles = document.querySelectorAll(".cmn-toggle-switch");
	  var loginbtn = document.querySelector(".lk_in_out");
	  for (var i = toggles.length - 1; i >= 0; i--) {
			var toggle = toggles[i];
			if (toggle.classList.contains("active_point_menu") === true) {toggle.classList.remove("active_point_menu") };

		};
		 if (loginbtn.classList.contains("active_logout_btn") === true) 
		 {
			 loginbtn.classList.remove("active_logout_btn"); 

		 }
	  
	  
        this.classList.add("active_point_menu");
		
    });
  }

})();