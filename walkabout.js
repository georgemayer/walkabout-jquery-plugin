/*
the tutorial object displays a tutorial that allows users to walk through the site. It looks for all "data-tut-step"s on the page and creates a tutorial out of them. 
*/

(function($) {

    $.fn.walkabout = function(options) {    
    
        var defaults = {
            autostart: false,
            begin: ""
        }; 
        var options = $.extend({}, defaults, options);         
        
        var tutorial = {
            
            current: 1,
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
                
                // create the next button
                
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
                // fromRight = 
                // move the hint over to the appropriate position on the screen
                newDiv.css("left",pos.left);
        

                
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
                if(step.is('input')) {
                    
                    step.after(newDiv);
                } else {
                    step.append(newDiv);
                } 
          
            },
            closeStep: function() {
                $(".hint").hide();  
            }, 
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
            }, 2000);        
        };
        
        function calcPosition(el) {
            // this function returns the distance from the side of the viewport to the middle of the element
            pos = el.offset();
        
            return pos;
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