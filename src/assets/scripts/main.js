var JM = {
  // All pages
  common: {
    init: function() {

			var _gaq = _gaq || [];

			// iOS Zoom Bug Fix
			(function(w){

				var ua = navigator.userAgent;
				if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
					return;
				}

				var doc = w.document;

				if( !doc.querySelector ){ return; }

				var meta = doc.querySelector( "meta[name=viewport]" ),
				initialContent = meta && meta.getAttribute( "content" ),
				disabledZoom = initialContent + ",maximum-scale=1",
				enabledZoom = initialContent + ",maximum-scale=10",
				enabled = true,
				x, y, z, aig;

				if( !meta ){ return; }

				function restoreZoom(){
					meta.setAttribute( "content", enabledZoom );
					enabled = true;
				}

				function disableZoom(){
					meta.setAttribute( "content", disabledZoom );
					enabled = false;
				}

				function checkTilt( e ){
					aig = e.accelerationIncludingGravity;
					x = Math.abs( aig.x );
					y = Math.abs( aig.y );
					z = Math.abs( aig.z );


					if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
						if( enabled ){
							disableZoom();
						}
					}
					else if( !enabled ){
						restoreZoom();
					}
				}

				w.addEventListener( "orientationchange", restoreZoom, false );
				w.addEventListener( "devicemotion", checkTilt, false );
			})( this );
			// END iOS Zoom Bug Fix
			
    }
  }
};

var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = JM;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');
    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);