    function stickyMojo(stickyID, footerID, contentID) {

        var settings = {
            'footerID': footerID,
            'contentID': contentID,
            'orientation': 'right'
        };

        var sticky = {
            'el': $(stickyID),
            'stickyLeft': $(stickyID).offset().left,
            'stickyTop2': $(stickyID).offset().top,
            'stickyHeight': $(stickyID).outerHeight(true),
            'contentHeight': $(settings.contentID).outerHeight(true),
            'win': $(window),
            'marg': parseInt($(stickyID).css('margin-top'), 10)
        };

        var errors = checkSettings();
        cacheElements();


        buildSticky();


        function buildSticky() {
            if (!errors.length) {
                sticky.el.css('left', 0);
                sticky.win.bind({
                    'load': stick,
                    'scroll': stick,
                    'resize': function() {
                        sticky.stickyLeft = sticky.el.parent().offset().left;
                        sticky.el.css('margin-left', sticky.stickyLeft);
                        stick();
                    }
                });
            } else {
                if (console && console.warn) {
                    console.warn(errors);
                } else {
                    alert(errors);
                }
            }
        }

        // Caches the footer and content elements into jquery objects

        function cacheElements() {
            settings.footerID = $(settings.footerID);
            settings.contentID = $(settings.contentID);
        }

        //  Calcualtes the limits top and bottom limits for the sidebar

        function calculateLimits() {
            return {
                limit: settings.footerID.offset().top - sticky.stickyHeight,
                windowTop: sticky.win.scrollTop(),
                stickyTop: sticky.stickyTop2 - sticky.marg
            }
        }

        // Sets sidebar to fixed position

        function setFixedSidebar() {
            sticky.el.css({
                position: 'fixed',
                top: 0
            });
        }

        // Determines the sidebar orientation and sets margins accordingly

        function checkOrientation() {
            if (settings.orientation === "left") {
                settings.contentID.css('margin-left', sticky.el.outerWidth(true));
            } else {
                sticky.el.css('margin-left', sticky.stickyLeft);
            }
        }

        // sets sidebar to a static positioned element

        function setStaticSidebar() {
            sticky.el.css({
                'position': 'static',
                'margin-left': '0px'
            });
            settings.contentID.css('margin-left', '0px');
        }

        // initiated to stop the sidebar from intersecting the footer

        function setLimitedSidebar(diff) {
            sticky.el.css({
                top: diff-85,
            });
        }

        //determines whether sidebar should stick and applies appropriate settings to make it stick

        function stick() {
            var tops = calculateLimits();
            var hitBreakPoint = tops.stickyTop < tops.windowTop;

            if (hitBreakPoint) {
                setFixedSidebar();
                checkOrientation();
            } else {
                setStaticSidebar();
            }
            if (tops.limit < tops.windowTop) {
                var diff = tops.limit - tops.windowTop;
                setLimitedSidebar(diff);
            }
        }

        // verifies that all settings are correct

        function checkSettings() {
            var errors = [];
            for (var key in settings) {
                if (!settings[key]) {
                    errors.push(settings[key]);
                }
            }
            ieVersion() && errors.push("NO IE 7");
            return errors;
        }

        function ieVersion() {
            if (document.querySelector) {
                return false;
            } else {
                return true;
            }
        }
    }
// back button in sticky box
window.onload = function() { 
	$(".close-bk-button").click(function(){
		$(this).parent().hide();
	});
}