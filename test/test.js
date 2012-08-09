$(document).ready(function() {
	eval('var dejectionScenery = scenery_'+$('#scenery').val());

	var dejectionInterval = 80;

	var dejectionConfig = {
		width: 600,
		height: 400,
		stepInterval: dejectionInterval,
		renderInterval: dejectionInterval,
		env: env_browser,
		renderer: renderer_browserCanvas,
		renderer_browserCanvas_config: {
			debug: true,
			container: '#canvasArea',
		},
		scenery: dejectionScenery,
		agonists: {
			rock: agonist_rock,
			asteroid: agonist_asteroid,
			human: agonist_human,
			giant: agonist_giant,
		},
		randomAgonists: {
			// human: 10,
			// giant: .5,
			// rock: 3,
			// asteroid: .1,
		},
		physics: physics_earth,
		preStep: function() {
			stepStart = +new Date();
		},
		postStep: function() {
			stepEnd = +new Date();
			stepCount++;
			$('#agonistCount').text(d.agonistCount);
			$('#totalAgonistCount').text(d.agonistIndex);
			$('#stepCounter').text(stepCount);
			$('#stepTime').text(stepEnd-stepStart);
		},
		preRender: function() {
			renderStart = +new Date();
		},
		postRender: function() {
			renderEnd = +new Date();
			renderCount++;
			$('#renderCounter').text(renderCount);
			$('#renderTime').text(renderEnd-renderStart);
			$('#changeCacheSize').text(d.renderer.changeCache.length);
		}
	};

	var stepStart;
	var stepEnd;
	var renderStart;
	var renderEnd;
	var stepCount = 0;
	var renderCount = 0;

	var d;
	d = dejection(dejectionConfig);
	d.run();

	$(d.renderer.canvas).click(function(e){
		var name = $('input[name=agonistName]:checked').val();
		d.addAgonist(name, {
			x: e.offsetX,
			y: e.offsetY
		});
		return false;
	});

	$('#start').click(function(){
		d.start();
	});

	$('#stop').click(function(){
		d.stop();
	});

	$('#restart').click(function(){
		eval('d.config.scenery = scenery_'+$('#scenery').val());
		d.scenery = d.config.scenery(d);
		d.restart();
	});

	$('#redraw').click(function(){
		d.renderer.addToChangeCache(0, 0, d.config.width, d.config.height);
	});

	$('.addMultipleAgonists').click(function(){
		var name = $('input[name=agonistName]:checked').val();
		var count = parseInt($(this).attr('data-count'));
		for(var x=0; x<count; x++) {
			d.addAgonist(name);
		}
	});

	$('#killAll').click(function(){
		for(var a in d.agonists) {
			d.agonists[a].kill();
		}
	});

	$('#randomAgonists').change(function(){
		if($(this).is(':checked')) {
			d.config.randomAgonists =  {
				human: 10,
				// giant: .5,
				rock: .3
				// asteroid: .1,
			};
			d.log(d.config);
		} else {
			d.config.randomAgonists = {};
			d.log(d.config);
		}
	});
});