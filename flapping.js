document.onkeydown = handleKey;

var windowheight;
var ninja;
var score = 0;

var windowwidth;

var numberOfPipes = 2;

var pipes = [];

var pipenothit = true;

function handleKey(e) {
	var event;
	if(window.event) {
	 event = window.event;
	} else {
		event = e;
	}

	var keyCode = event.keyCode;

    if(keyCode == 32) { //space
    	ninjaJump();
    }
}

function ninjaJump() {
	console.log("Jumping");
	var topposition = parseInt(ninja.css('bottom'));
	if(topposition > 20)
		ninja.css ('bottom', (topposition+100)+'px');
}

function checkHit(ninjaposition, ninjatopposition) {
	$('[data-id="redpipe"]').each(function(index) {
		var pipeLeft = parseInt($(this).css('left'));
		var pipeHeight = $(this).height();
		if(isHit(ninjaposition, ninjatopposition,pipeLeft,pipeHeight)) {
			console.log('hit2');
			ninja.hide();
			$("#maintitle").empty();
			$("#maintitle").text('One rule, be cool and keep coding');
			pipenothit = false;
		}
	});
}

function isHit(ninjaposition, ninjatopposition, pipeLeft, pipeHeight) {
	var ninjabottomposition = ninjatopposition;
	var piperight = pipeLeft + 50;
	pipeHeight += 50;
	if(ninjabottomposition < pipeHeight &&
	 ninjaposition > pipeLeft  && ninjaposition < piperight) {
		console.log("found")
		return true;
	}
	return false;
}

function start(){
	windowheight=$(document).height();
	windowwidth=$(document).width();
	ninja=$("#ninja");
  setStartPosition();
	loadPipes();
	ninjaMove();
}

function loadPipes() {
	for(var currentPipe = 0; currentPipe < numberOfPipes; currentPipe++) {
		var screenDimension = getScreenDimension();
		var randomPosition = Math.floor((Math.random() * screenDimension) + 1);
		var actualPosition = randomPosition + (currentPipe * screenDimension);
		addPipe(actualPosition, getRandomHeight(), currentPipe);
	}
	pipeMove();
}



function setStartPosition() {
	ninja.css('left','0px');
	ninja.css('bottom','500px');
	ninja.css('position','absolute');
}

function addPipe(left,height,pipeNo) {
	console.log(height)
	var pipeName = "redpipe"+pipeNo;
	var pipe = $("<img id="+pipeName+" data-id='redpipe' src= 'redpipe1.png' class='redpipe'/>");
	pipe.css ("left", left +"px");
	pipe.css ("height",height+"px");
	pipe.css ("bottom","60px");
	pipe.css ("position","absolute");
	$("#floor").append(pipe);
	pipes.push(pipeName);
}

function getScreenDimension() {
	var screenWidth = $( window ).width();
	return screenWidth / numberOfPipes;
}

function getRandomHeight() {
	var screenheight = window.innerHeight;
	var newheight = Math.floor((Math.random() *  ((screenheight*.6) - (screenheight*.3) + 1)) + (screenheight*.3))
	return newheight;
}

function ninjaMove() {
	var position = parseInt(ninja.css('left'));
	var topposition = parseInt(ninja.css('bottom'));
	checkHit(position,topposition);
	if(pipenothit) {
		if(topposition > 0 && position < windowwidth) {
			ninja.css ('left', (position+10)+'px');
			ninja.css ('bottom', (topposition-5)+'px');
			setTimeout(ninjaMove,20);
		} else {
		    score = score + 10;
			setStartPosition();
		}
	} else {
		score = score - 5;
	}
}


function pipeMove() {
	for(var pipeNo = 0; pipeNo < pipes.length; pipeNo++) {
		var currentPipe = $("#"+pipes[pipeNo]);
		var position = parseInt(currentPipe.css('left'));
		currentPipe.css ('left', (position-2 )+'px');
	}
	setTimeout(pipeMove,10);

}
