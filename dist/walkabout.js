(function($) {

    $.fn.walkabout = function(options) {    
    
        
        // set the defaults
        var defaults = {
            autostart: false, // autostart will start the tutorial on page load
            begin: "", // begin accepts a string of the CLASS of an element that will trigger the tutorial on click 
            stickNav: false//accept a boolean. Is the nav fixed or not?
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
                if($(".hint").length < 1) {
                    newDiv = $("<div>").addClass("hint");
                    currentStep = this.current;
                    step = $("[data-tut-step="+currentStep+"]");
                    this.showStep(step);
                }    
            },
            showStep: function(step) {
                // shows an actual tutorial step  
                // create the hint
                title = step.attr("data-tut-title");
                titleDiv = $("<div>");
                titleDiv.text(title);
                titleDiv.addClass("hint-title");
                newDiv.append(titleDiv);
                content = step.attr("data-tut-content");
                para = $("<p>");
                para.text(content);
                newDiv.append(para);
                closeHint = $("<div>");
                closeHint.html("<i class='icon-remove'></i>");
                closeHint.click(function(){
                    tutorial.closeStep();
                });
                closeHint.addClass('close-hint');
                newDiv.append(closeHint);
                
                // create the next button
                // check if the current step is the last step
                if(this.current !== this.totalSteps()) {  
                    nextButton = $("<button>");
                    nextButton.html("next <i class='icon-chevron-right'></i>");
                    nextButton.addClass("next");
                    nextButton.click(function(e){
                        e.preventDefault();
                        tutorial.next();  
                    });
                    newDiv.append(nextButton);
                } else {
                    closeButton = $("<button>");
                    closeButton.html("You're done!");
                    closeButton.addClass("end-tut");
                    closeButton.click(function(e){
                        e.preventDefault();
                        tutorial.closeStep();
                        tutorial.current = 1;
                        console.log(tutorial.current);
                    });
                    newDiv.append(closeButton);
                    
                }
                // create the previous button
                // check if the current step is the first step
                if(this.current !== 1) {
                    prevButton = $("<button>");
                    prevButton.html("<i class='icon-chevron-left'></i> previous");
                    prevButton.addClass("prev");
                    prevButton.click(function(e){
                        e.preventDefault();
                        tutorial.previous();  
                    });
                    newDiv.append(prevButton);
                }  
                
                var position = positionTheHint(newDiv, step);
                
                newDiv.css({
                    "left": position.left,
                    "top": position.top
                });
                newDiv.removeClass();
                newDiv.addClass("hint");
                newDiv.addClass(position.horizHintClass);
                newDiv.addClass(position.vertHintClass);

                $("body").append(newDiv);
                newDiv.draggable();
          
            },
            // hide the hint
            closeStep: function() {
                $(".hint").remove();  
            }, 
            
            // go to the next hint
            next: function() {
                $(".hint").html(""); 
                nextStep = ++this.current;
                console.log(nextStep);
                step = $("[data-tut-step="+nextStep+"]");
                scrollTo(step);
                this.showStep(step); 
      
            },
            // go to the previous hint
            previous: function() {
                $(".hint").html(""); 
                prevStep = --this.current;
                console.log(prevStep);
                step = $("[data-tut-step="+prevStep+"]");
                scrollTo(step);
                this.showStep(step); 

            }
        };

        function positionTheHint(hint, step) {
            docHeight = $(document).height();
            windowWidth = $(window).width();
            hintHeight = hint.outerHeight();
            hintWidth = hint.width();
            stepPosition = step.offset(); 
            stepOffsetBottom = docHeight - stepPosition.top;         
            stepOffsetRight = windowWidth - stepPosition.left;
            stepHeight = step.height();
            
            position = {};
            if(stepOffsetRight < hintWidth) {
                position.horizHintClass = "from-right";
                position.left = stepPosition.left - hintWidth + (step.outerWidth()/2);
            } else {
                position.horizHintClass = "from-left";
                position.left = stepPosition.left + (step.outerWidth()/2) - 20; 
            }     
            
            if(stepOffsetBottom < hintHeight) {
                position.vertHintClass = "from-bottom";
                position.top = stepPosition.top - stepHeight - hintHeight;
            } else {
                position.vertHintClass = "from-top";
                position.top = stepPosition.top + stepHeight + 20;
            }
            
            return position;
        }
        
        function scrollTo(el) {
            // takes an element and visually scrolls the window to that element

            destination = el.offset().top;
            windowOffset = destination - $(window).scrollTop();
            stepHeight = el.outerHeight();
            
            if(options.stickNav === true) {
                isNavChild = el.parents("nav").length;
                if(isNavChild < 1) {
                    if(stepHeight < 60 && destination > 60) destination -= (60+stepHeight);
                }
            }  
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