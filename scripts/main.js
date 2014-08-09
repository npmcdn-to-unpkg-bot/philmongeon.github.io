var Philz = window.Philz || {};

Philz = {
    
  els: {
      window:   $(window),
      body:     $('body'),
      child:    $('.description'),
      fade_in:  $('.fade-in'),
      trans_in: $('.translate-in')
  },

  animate: function() {
    this.els.fade_in.addClass('faded');
    this.els.trans_in.addClass('translated');
  },

  centerChild: function() {
    this.els.child.each(function() {
      var container = $(this),
          section = container.parent(),
          margin_top = ( (section.height() - container.height()) / 2 ) - 10;
      container.css('margin-top', margin_top);
    });
  },

  init: function() {
    this.els.window.on({
      load: function() {
        Philz.els.body.addClass('loaded');
        Philz.animate();
        Philz.els.window.trigger('resize');
      },
      resize: function() {
       Philz.centerChild();
      }
    });
  }

};

Philz.init();