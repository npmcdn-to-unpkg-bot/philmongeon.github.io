(function() {
  
  var animate = document.getElementsByClassName('animate');
  var body = document.getElementsByTagName('body')[0];

  function init() {
   
    body.classList.add('loaded');

    for( var i = 0; i < animate.length; i++ ) {
       animate[i].classList.add('faded','translated');
    }

  }

  window.addEventListener('load', init);

})();