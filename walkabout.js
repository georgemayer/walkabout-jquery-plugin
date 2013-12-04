(function($) {

    $.fn.walkabout = function(options) {    
    
        
        // set the defaults
        var defaults = {
            autostart: false, // autostart will start the tutorial on page load
            begin: "" // begin accepts a string of the CLASS of an element that will trigger the tutorial on click 
        }; 
        
        // allow the user to add her own options
        var options = $.extend({}, defaults, options);         
        
        /*
        the tutorial object displays a tutorial that allows users to walk through the site. It looks for all 
        "data-tut-step"s on the page and creates a tutorial out of them. 
        */
        var tutorial = {
            
            // the current property tells the tutorial what step it's on. It starts at one
            current: 1,
            
            // totalSteps calculates the number of tutorial steps on the page
            totalSteps: function() {
                var total = $("[data-tut-step]").length;
                return total;
            },
            init: function() {
                // runs the tutorial, tutorial begins un-initialized
                // begins to data-tut-step one
                // create a list of all of the elements
                newDiv = $("<div>").addClass("hint");
                currentStep = this.current;
                step = $("[data-tut-step="+currentStep+"]");
                this.showStep(step);
            },
            showStep: function(step) {
                // shows an actual tutorial step  
                // create the hint
                content = step.attr("data-tut-content");
                para = $("<p>");
                para.text(content);
                newDiv.append(para);
                closeHint = $("<div>");
                closeHint.text("x");
                closeHint.click(function(){
                    tutorial.closeStep();
                });
                closeHint.addClass('close');
                newDiv.append(closeHint);
                
                // create the next button
                // check if the current step is the last step
                if(this.current !== this.totalSteps()) {  
                    nextButton = $("<button>");
                    nextButton.html("Next");
                    nextButton.addClass("next");
                    nextButton.click(function(e){
                        e.preventDefault();
                        tutorial.next();  
                    });
                    newDiv.append(nextButton);
                }
                // create the previous button
                // check if the current step is the first step
                if(this.current !== 1) {
                    prevButton = $("<button>");
                    prevButton.html("Prev");
                    prevButton.addClass("prev");
                    prevButton.click(function(e){
                        e.preventDefault();
                        tutorial.previous();  
                    });
                    newDiv.append(prevButton);
                }   
                
                // position the hint
                pos = step.offset(); 
                wHeight = $(document).height();
                wWidth = $(window).width();
                hintHeight = newDiv.height();
                hintWidth = newDiv.width();
                fromBottom = wHeight - pos.top;
                fromRight = wWidth - pos.left;
                console.log(fromRight);
                //newDiv.css("left",pos.left);
        
                if(fromRight < hintWidth) {
                    newDiv.addClass("from-right");
                    if(newDiv.hasClass("from-left")) newDiv.removeClass("from-left");
                    newDiv.css("left",pos.left - newDiv.width());
                } else {
                    newDiv.css("left",pos.left);
                    newDiv.addClass("from-left");
                    if(newDiv.hasClass("from-right")) newDiv.removeClass("from-right");
                    newDiv.css("left",pos.left);
                }     
                
                // if the step is at the bottom of the screen, put the hint above it
                if(fromBottom < hintHeight) {
                    bottomOffset = fromBottom + step.height();
                    newDiv.addClass("from-bottom");
                    if(newDiv.hasClass("from-top")) newDiv.removeClass("from-top");
                    newDiv.css("bottom",bottomOffset+"px");   
                } else {
                    if(newDiv.hasClass("from-bottom")) newDiv.removeClass("from-bottom");
                    newDiv.addClass("from-top");
                    newDiv.css("bottom","auto");  
                }
                // if the step is on an input, put it after the element, rather than as a child of it. 
                if(step.is('input')) {       
                    step.after(newDiv);
                } else {
                    step.append(newDiv);
                } 
          
            },
            // hide the hint
            closeStep: function() {
                $(".hint").hide();  
            }, 
            
            // go to the next hint
            next: function() {
                $(".hint").html(""); 
                nextStep = ++this.current;
                console.log(nextStep);
                step = $("[data-tut-step="+nextStep+"]");
                scrollTo(step);
                if(step.length > 0) {
                    this.showStep(step); 
                } else {
                    this.closeStep();
                }       
            },
            // go to the previous hint
            previous: function() {
                $(".hint").html(""); 
                prevStep = --this.current;
                console.log(prevStep);
                step = $("[data-tut-step="+prevStep+"]");
                scrollTo(step);
                if(step.length > 0) {
                    this.showStep(step); 
                } else {
                    this.closeStep();
                }
            }
        };
        
        function scrollTo(el) {
            // takes an element and visually scrolls the window to that element
            destination = el.offset().top;
            $('html, body').animate({
                scrollTop: destination
            }, 1000);        
        };
        

        if(options.autostart === true) {
                tutorial.init();
        } 
        
        if(options.begin === "") {
        
        } else {
            $(options.begin).click(function(e){
                e.preventDefault();
                tutorial.init();
            });
        }
    }    
})(jQuery);