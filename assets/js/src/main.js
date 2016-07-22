var randomColor = require('../../../bower_components/randomcolor/randomColor');

(function() {

	var app = app || {

		colors: function() {

			var body = document.body;
			var links = document.links;
			var speed = 7500;

			var luminosity_list = ['light', 'dark'];
			var hue_list = ['red', 'orange', 'green', 'blue', 'purple', 'pink', 'yellow'];

			// var luminosity = luminosity_list[Math.floor(Math.random()*luminosity_list.length)];
			var luminosity = 'light';

			function setColours(update_luminosity) {

				var hue = hue_list[Math.floor(Math.random()*hue_list.length)];

				if(update_luminosity) {
					luminosity = luminosity_list[Math.floor(Math.random()*luminosity_list.length)];
					body.className = '';
					body.classList.add(luminosity);
				}

				var random_color = randomColor({
					luminosity: luminosity,
					hue: hue,
					count: 20
				});

				for(var i = 0; i < links.length; i++) {
					links[i].style.color = random_color[i];
				}

			}
			
			setColours(false);
			
			setInterval(function() {
				setColours(false);
			}, speed);

		},

		init: function() {
			this.colors();
		}

	};

	app.init();

})();