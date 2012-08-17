$(document).ready(function() {
	var dejectionConfig = {
		width: $(document).width(),
		height: $(document).height(),
		stepInterval: 80,
		renderInterval: 80,
		env: env_browser,
		renderer: renderer_browserCanvas,
		renderer_browserCanvas_config: {
			debug: true,
			container: '#canvasArea',
		},
		scenery: scenery_despair,
		agonists: {
			rock: agonist_rock,
			asteroid: agonist_asteroid,
			human: agonist_human,
			giant: agonist_giant,
		},
		randomAgonists: {
			human: 10,
			// giant: .5,
			rock: 3,
			// asteroid: .1,
		},
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
			$('#changeCacheSize').text(d.renderer.changeCacheSize);
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
		})
	});

	$('#start').click(function(){
		d.start();
	});

	$('#stop').click(function(){
		d.stop();
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
});