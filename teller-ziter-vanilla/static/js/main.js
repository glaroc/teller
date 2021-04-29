//-require map_ziter.js

(function() {
  function getScripts(scripts, callback) {
      var progress = 0;
      scripts.forEach(function(script) { 
          $.getScript(script, function () {
              if (++progress == scripts.length) callback();
          });
      });
  }
  getScripts(["/js/photo-scroll.js", "/js/map-ziter1.js"], function () {
    var timer
    var h = $(window).height();
    var p=[0, h, 3*h, 5*h]
    $(window).scroll(function() {
     // if ( timer ) clearTimeout(timer);
     // timer = setTimeout(function(){
        var s = $(this).scrollTop();
        var step = Math.floor((s+h)/h)
        //var p = ((s+h)-((step-1)*h))/h
        if(s>=p[0] & s<p[1]){
          if($(".map-container").hasClass('stickit')) {
            $(".map-container").removeClass('stickit').addClass('unstickit')
            $('.map-container').css({position:"relative",opacity:1})
          }
        }else if(s>=p[1] & s<p[2]){
          wp=(s-p[1])/(p[2]-p[1])
          if(!$(".map-container").hasClass('stickit')) {
            $('.map-container').addClass('stickit').removeClass('unstickit')
            $('.map-container').css({top:0, position:"fixed",opacity:1})
            $(".photos-scroll-container").removeClass('stickit').addClass('unstickit')
            $('#map1').animate({opacity:1})
            $('.photos-scroll-container').css({opacity:0})
          }
          MapZ.actOnScroll(wp)
        }else if(s>=p[2] & s<p[3]){
          wp=(s-p[2])/(p[3]-p[2])
          PhotoS.actOnScroll(wp)
          if(wp<0.15){
            $(".photos-scroll-container").removeClass('unstickit').removeClass('stickit')
            $(".map-container").css({top:-1*(h*(wp/0.15)), position:"fixed",opacity:1})
            $(".photos-scroll-container").css({top:h-(h*(wp/0.15)), position:"fixed",opacity:1})
          }else{
            if($(".map-container").hasClass('stickit')) {
              $('.photos-scroll-container').css({top:0, position:"fixed",opacity:1})
              $(".map-container").removeClass('stickit').addClass('unstickit')
              $(".photos-scroll-container").removeClass('unstickit').addClass('stickit')
              $('#map1').css({opacity:0})
            }
          }
        }
     // }, 200);

    });
      PhotoS.init();
      MapZ.init();
  });

})();