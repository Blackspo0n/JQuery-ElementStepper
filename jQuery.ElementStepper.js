(function (jQuery) {
    var sliding = false;
    function eventbinder(options) {
        var self = this;
        jQuery(options.next).bind("click", function (e) {
            if(!sliding) {
                var prevnextreturn = options.onPrevNextEvent.call(self, true);

                if(prevnextreturn == false) {
                    return false;
                }
                sliding = true;

                var $curSlider = jQuery(self).find(".showedstep");

                setTimeout(function () {
                    sliding = false;
                }, options.duration);

                $curSlider.hide({
                    duration : options.duration,
                    easing : options.easing || 'swing'
                }).removeClass("showedstep");

                var $nextslider;
                var $childs = jQuery(jQuery(self).children(options.childElement));

                if($curSlider.index() == $childs.length-1) $nextslider = $childs.first();
                else $nextslider = $curSlider.next();

                $nextslider.show({
                    duration : options.duration,
                    easing : options.easing || 'swing'
                }).addClass("showedstep");

                options.after.call($curSlider, jQuery(self).find(".showedstep"), options, true);
            }
        });

        jQuery(options.prev).bind("click", function () {
            if(!sliding) {
                var prevnextreturn = options.onPrevNextEvent.call(self, false);
                if(prevnextreturn == false) {
                    return false;
                }
                var $curSlider = jQuery(self).find(".showedstep");

                setTimeout(function () {
                    sliding = false;
                }, options.duration);

                $curSlider.hide({
                    duration: options.duration,
                    easing: options.easing || 'swing'
                }).removeClass("showedstep");

                var $nextslider;
                if($curSlider.index() == 0) {
                    $nextslider = jQuery(jQuery(self).children(options.childElement)).last();
                }
                else {
                    $nextslider = $curSlider.prev();
                }

                $nextslider.show({
                    duration: options.duration,
                    easing: options.easing || 'swing'
                }).addClass("showedstep");


                options.after.call($curSlider, jQuery(self).find(".showedstep"), options, false);
            }
        });
    }

    function stepper(options) {
        jQuery(this).addClass("mentionStepper").css({
            position : 'relative'
        });
        var $childs = jQuery(jQuery(this).children(options.childElement));
        $childs.addClass("steps").css({
            position : 'absolute'
        });

        if(typeof($childs.hide()[0]) !== "undefined") {
            jQuery($childs.hide()[0]).show().addClass("showedstep");
        }
    }

    jQuery.fn.elementStepper = function (opt, parameter) {
        if (typeof(opt) === "string") return Query.fn.elementStepper.methods[opt](this, parameter);

        return this.each(function () {
            var options;
            options = jQuery.extend(true, {}, jQuery.fn.elementStepper.options, jQuery.fn.elementStepper.methods, opt);

            jQuery.data(this, 'options', {
                options: options
            });

            stepper.call(this, options);
            eventbinder.call(this, options);
        });

    };

    jQuery.fn.elementStepper.methods = {
        onPrevNextEvent : function (next) {

        },
        after : function () {

        }
    };

    jQuery.fn.elementStepper.options = {
        childElement : 'div',
        prev: null,
        next : null,
        easing: 'swing',
        duration : 500
    };
})(jQuery);