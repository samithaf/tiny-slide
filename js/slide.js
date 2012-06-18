/*
 * 	slideShow - jQuery plugin
 *	written by Samitha Fernando	
 *	Copyright (c) 2012 Samitha Fernando
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
(function($) {
    $.fn.extend({
        slideshow: function(options) {
            var defaults = {
                interval : 6000,
                manualSlide : true,
                direction:'forward'
            };
            options = $.extend(defaults, options);
            var config = {
                processing:false,
                direction:options.direction
            };
            return this.each(function() {
                var $element = $(this);

                function _do_slide(obj, options) {
                    config.processing = true;
                    obj.children('img').css('visibility', 'visible');
                    var $active = obj.children('img.active');
                    if ($active.length == 0) $active = obj.children('img:last');
                    var $next = (options.direction == 'forward') ? $active.next('img').length ? $active.next('img') :
                        obj.children('img:first') : $active.prev('img').length ? $active.prev('img') : obj.children('img:last');
                    $active.addClass('last-active');
                    $next.css({opacity: 0.0})
                        .addClass('active')
                        .animate({opacity: 1.0}, 2000, function() {
                            $active.removeClass('active last-active');
                            config.processing = false;
                        });
                }

                if (options.manualSlide) {
                    $element.children('div.scrolling_hot_spot_left').attr('direction','backward');
                    $element.children('div.scrolling_hot_spot_right').attr('direction','forward');
                    $element.mouseenter(
                        function() {
                            $('div.scrolling_hot_spot_left').fadeIn();
                            $('div.scrolling_hot_spot_right').fadeIn();
                        }).mouseleave(function() {
                            $('div.scrolling_hot_spot_left').fadeOut();
                            $('div.scrolling_hot_spot_right').fadeOut();
                        });
                    $('div.slide_handler').click(function(e) {
                        if (!config.processing) {
                            config.direction = $(this).attr('direction');
                            _do_slide($element, options);
                        }
                        e.preventDefault();
                    });
                }
                setInterval(function() {
                    if (!config.processing) {_do_slide($element, options);}
                }, options.interval);
            });
        }
    });
})(jQuery);