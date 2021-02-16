/* jslint browser: true */
/* global $, gsap */

// hide all screens and section divs
$("main, section").hide(); // set display: none to main/section divs in css to stop flash

// SPLASH SCREEN //////////////////////////////////////////////

// display splash screen
$("#splash").show();

// animate on the splash screen on app load
gsap.from("#splash", {
    delay: 0.25,
    opacity: 0,
    y: -$(this).innerHeight(),
    duration: 0.5,
    ease: "power3.out"
});

gsap.from("#splash img", {
    delay: 1,
    scale: 0,
    duration: 0.5,
    ease: "power3.out"
});

// wait 4 secs then fade out and load landing screen
gsap.to("#splash", {
    delay: 4,
    opacity: 0,
    y: -$(this).innerHeight(),
    duration: 0.5,
    onComplete: loadLanding,
    ease: "power3.out"
});

// LANDING SCREEN ///////////////////////////////////////////

function loadLanding() {

    // hide and reset all screens/sections
    $("main, section").hide().css({opacity: 1});
    
    // display landing screen
    $("#landing").show();

    // animate on the landing screen
    gsap.from("#landing", {
        delay: 0.25,
        opacity: 0,
        duration: 0.5
    });

    gsap.from("#landing header", {
        delay: 0.5,
        y: -$("#landing header").outerHeight(),
        duration: 0.5,
        ease: "power3.out"
    });

    gsap.from("#landing footer", {
        delay: 0.5,
        y: $("#landing footer").outerHeight(),
        duration: 0.5,
        ease: "power3.out"
    });

    gsap.from("#logo1", {
        delay: 1,
        opacity: 0,
        x: -$("#logo1").innerWidth(),
        duration: 0.5,
        ease: "power3.out"
    });

    gsap.from("#logo2", {
        delay: 1.25,
        opacity: 0,
        x: $("#logo2").innerWidth(),
        duration: 0.5,
        ease: "power3.out"
    });

    gsap.from("#logo3", {
        delay: 1.5,
        opacity: 0,
        x: -$("#logo3").innerWidth(),
        duration: 0.5,
        ease: "power3.out"
    });
}

// part of landing screen but not part of loadLoading function /////////////////
// set up logos to link to related restaurant
// pass rest ID and subnav highlight colour to loadRest function
// fade landing out and load selected restaurant
$("#logo1").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest1", "#0f6b37"]
    });

});

$("#logo2").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest2", "#630000"]
    });

});

$("#logo3").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest3", "#7b5b01"]
    });

});

// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest(restID, highlightColour) {
    
    // hide landing screen
    $("#landing").hide();

    // display selected restaurant screen
    $(restID).show();

    // animate on the restaurant
    gsap.from(restID + " header", {
        delay: 0.25,
        x: -$(restID + " header").outerWidth(),
        duration: 0.5,
        ease: "power3.out"
    });

    gsap.from(restID + " footer", {
        delay: 0.25,
        x: $(restID + " footer").outerWidth(),
        duration: 0.5,
        ease: "power3.out"
    });

    // display home section
    $(restID + " .home").show();

    // animate on home section
    gsap.from(restID + " .home", {
        delay: 0.75,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
    });

    // loop through and reveal all elements on home screen with .reveal class applied
    $(restID + " .home .reveal").each(function(i) {

        gsap.from(this, {
            delay: 1.25 + i * 0.15,
            opacity: 0,
            transform: "scale(1.2)",
            y: -10,
            duration: 1,
            ease: "power3.out"
        });

    });
    
    // create var to target icons from selected restaurant
    var iconsTarget = restID + " .nightspecial, " + restID + " .home-btn, " + restID +" .signup";
    
    // remove highlight and active class from all icons
    $(iconsTarget).css({background:"none"}).removeClass("active");
    
    // highlight home icon and add active class on restaurant load
    $(restID + " .home-btn").css({background: highlightColour}).addClass("active");
    
    // set up section nav - highlight and load section
    $(iconsTarget).click(function(){
        
        if(!$(this).hasClass("active")) { 
            
         // remove highlight and active class from all icons
        $(iconsTarget).css({background: "none"}).removeClass("active");

        // highlight home icon and add active class on restaurant load
        $(this).css({background: highlightColour}).addClass("active");
            
            //load selected section
            loadSection(restID + " section", restID + " " + $(this).attr("data-section"));
            
        }
        
    });
}

// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant sections
function loadSection(prevSection, nextSection){
    
    gsap.to(prevSection, {
        opacity: 0,
        duration: .5,
        onComplete: function(){
            $(prevSection).hide().css(
            {opacity: 1});
            $(nextSection).show().scrollTop(0);
        }
        
    });
    
    gsap.from(nextSection,{
        opacity: 0,
        duration: 0.5,
        delay: .5
    });

    $(nextSection + " .reveal").each(function(i) {

        gsap.from(this, {
            delay: 1.25 + i * 0.15,
            opacity: 0,
            transform: "scale(1.2)",
            y: -10,
            duration: 1,
            ease: "power3.out"
        });

    });
}

// set up reservations submit button




// set up hamburger menu to reveal main menu
$(".hamburger").click(function(){
    
    if ($(this).attr("src") == "images/close2hamburger.gif") {
        
            $(this).attr("src", "images/hamburger2close.gif");
        
            $("#menu").show();
            
            gsap.to(".rest", {
                x: 310,
                duration: 0.5,
                ease: "power3.out"
            });
        
        } else {
        
            $(this).attr("src", "images/close2hamburger.gif");
            
            gsap.to(".rest", {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function(){
                $("#menu").hide();
            }
            });
        
        }
    
});

// set up main menu links
// go back to landing screen
$("#backToLanding").click(function(){
    
    $(".hamburger").attr("src", "images/close2hamburger.gif");
            
                gsap.to(".rest", {
                    x: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    onComplete: function(){
                        
                    $("#menu").hide();
                        
                        gsap.to(".rest", {
                            opacity: 0,
                            duration: 0.5,
                            ease: "power3.out",
                            onComplete: loadLanding
                        });
                }
            });
    
});

// reveal FoE about info 
$("#about").click(function(){
    
    alert("Family of Eateries is an application consistent of three restraunts where you can choose any of the restraunt and reserve your seats.");
    
});



// reveal FoE contact info      
$("#contact").click(function(){
    
    alert("You can contacts us on aour facebook page or our mail at FOE@abc.com");
    
});
//reservation msg

document.getElementById('mybtn').onclick= myfunction;
            // myfuntion working
            function myfunction()
            {
                var a=document.getElementById("name").value;
                var b=document.getElementById("phone").value;
                var c=document.getElementById("date").value;
                //Giving the output by giving the result to the p tag named 'result'
            document.getElementById('pe').textContent ="Hello "+a+"Your reservation is confirmed for "+ c +" we will also send you a text confirmation on your phone "+ b;
            };