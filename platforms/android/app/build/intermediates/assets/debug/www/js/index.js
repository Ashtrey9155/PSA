/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var Application = function() {
	this.contentPanel = null;
    this.tabloBtn = null;
    this.mapBtn = null;
    this.weatherBtn = null;
    this.onFragmentLoad = null;

};

Application.prototype.initialize = function() {


		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		document.addEventListener("backbutton", function () {
				
				// this.contentPanel.html("exit_frame.html");
			 if (  $('div.exit_frame').css( "z-index" ) == '0' ){
				  $('div.exit_frame').css("z-index","1000");
			  } else {
				  $('div.exit_frame').css("z-index","0" );
			  }
			 
			 // if (  $('div.translateX').css( "transform" ) == 'none' ){
				 // $('div.translateX').css("transform","translateX(-80vw)");
			 // } else {
				 // $('div.translateX').css("transform","" );
			 // }
			 
			 
		}, false);
		
		

		
		
		
		window.addEventListener("orientationchange", function(){
			// alert(screen.orientation.type); // e.g. portrait
			screen.orientation.lock('portrait');
		});

		this.contentPanel = $("#load_content"); //переменные
		this.tabloBtn = $("#tabloBtn"); //переменные
		this.mapBtn = $("#mapBtn"); //переменные
		this.weatherBtn = $("#weatherBtn"); //переменные
		this.smsBtn = $("#smsBtn"); 
		this.menuBtn = $("#menuBtn"); 
		this.sosBtn = $("#sosBtn"); 
		this.lkBtn = $("#lkBtn");
		this.exitFrame = $("#exit_frame");
		
		
		this.lkBtn.on("click", function(that) {
		    return function(){
				let loginbtn = document.querySelector(".lk_in_out");
				if (loginbtn.classList.contains("active_logout_btn") ) 
				{
					that.onFragmentLoad = function() {
							load_lk();
							this.lkhistoryBtn = $("#lk_historybtn");
							this.lkMain = $("#lk_main");
							this.lkhistoryBtn.on("click", function(that) {
								return function(){
									var lkMainbtn = document.querySelector("#lk_mainbtn");
									var lkhistoryBtn = document.querySelector("#lk_historybtn");
									if (lkMainbtn.classList.contains("active_btn") === true) 
										{
											lkMainbtn.classList.remove("active_btn"); 
											lkhistoryBtn.classList.add("active_btn")
											// tabloBtn.click(); 
										 } 
									// else {loginbtn.classList.add("active_btn")}
		
									console.log('кнопка история нажата');
									ftRecord = "\
									<div class=\"col-xs-12 col-sm-12 col-md-12\">\
										<div class=\"row nav_lk\">\
												<div id=\"lk_mainbtn\" class=\"col-xs-4 col-sm-4 col-md-4 lk_word_style_big active_btn\">\
													<span>Платеж</span>\
												</div>\
												<div id=\"lk_historybtn\" class=\"col-xs-4 col-sm-4 col-md-4 lk_word_style_big\">\
													<span>Доход</span>\
												</div>\
												<div id=\"lk_historybtn\" class=\"col-xs-4 col-sm-4 col-md-4 lk_word_style_big\">\
													<span>Аренда</span>\
												</div>\
										</div>\
									</div>\
									";
									that.lkMain.html(ftRecord);
								}
							}(this));
					};
					that.loadFragment("fragment_lk.html");
				}
            }
        }(this));
		
		this.tabloBtn.on("click", function(that) {
		    return function(){
		    	that.onFragmentLoad = function() {
		    		load_ftable();
				};
		        that.loadFragment("fragment_tablo.html");
            }
        }(this));

		this.mapBtn.on("click", function(that) {
		    return function() {
				that.onFragmentLoad = function() {
		    		
					if (TabloTimer != null) {
						clearTimeout(TabloTimer);
						TabloTimer = null;
					}
					init();
				};
				
		        that.loadFragment("fragment_map.html");
            }
			
        }(this));

		this.weatherBtn.on("click", function(that) {
		    return function() {
				that.onFragmentLoad = function() {
		    		load_weather();
				};
		        that.loadFragment("fragment_weather.html");
            }
        }(this));
		
		this.smsBtn.on("click", function(that) {
		    return function(){
		        that.loadFragment("fragment_sms.html");
            }
        }(this));
		
		this.menuBtn.on("click", function(that) {
		    return function(){
		        that.loadFragment("fragment_menu.html");
            }
        }(this));
		
		this.sosBtn.on("click", function(that) {
		    return function(){
		        that.loadFragment("fragment_sos.html");
            }
        }(this));


        this.tabloBtn.trigger("click");
};




Application.prototype.loadFragment = function(url) {
    $.get( url, function(that){
        return function( data ) {
            that.displayFragment(data);
        }
    }(this));
};

Application.prototype.displayFragment = function(html) {
	this.contentPanel.html(html);

	if (this.onFragmentLoad != null) {
		this.onFragmentLoad();
	}
};



















// deviceready Event Handler
//
// Bind any cordova events here. Common events are:
// 'pause', 'resume', etc.
Application.prototype.onDeviceReady =  function() {
        this.receivedEvent('deviceready');
		
};


// Update DOM on a Received Event
Application.prototype.receivedEvent = function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
};


var app = new Application();
app.initialize();



