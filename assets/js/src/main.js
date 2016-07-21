var randomColor = require('../../../bower_components/randomcolor/randomColor');

(function() {

	var app = app || {

		colors: function() {

			var links = document.links;
			var hue_list = ['red', 'orange', 'green', 'blue', 'purple', 'pink'];
			var hue = hue_list[Math.floor(Math.random()*hue_list.length)];
			var random_color = randomColor({
				luminosity: 'dark',
				hue: hue,
				count: 20
			});

			for(var i = 0; i < links.length; i++) {
				links[i].style.color = random_color[i+1];
			}

		},

		init: function() {
			this.colors();
		}

	};

	app.init();

})();