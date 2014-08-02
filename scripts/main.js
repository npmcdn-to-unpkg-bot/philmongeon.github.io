var Philz = window.Philz || {};

Philz.els = {
  window:   $(window),
  body:     $('body'),
  child:    $('.description'),
  fade_in:  $('.fade-in'),
  trans_in: $('.translate-in')
};

Philz.animate = function() {
    Philz.els.fade_in.addClass('faded');
    Philz.els.trans_in.addClass('translated');
};

Philz.centerChild = function() {
  Philz.els.child.each(function() {
    var container, margin_top, section;
    container = $(this);
    section = container.parent();
    margin_top = ( (section.height() - container.height()) / 2 ) - 10;
    container.css('margin-top', margin_top);
  });
};

Philz.els.window.on({
  load: function() {
    Philz.els.body.addClass('loaded');
    Philz.els.window.trigger('resize');
    Philz.animate();
  }
});

Philz.els.window.on({
  resize: function() {
    Philz.centerChild();
  }
});