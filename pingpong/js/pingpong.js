var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83,
	ENTER: 13
};

var pausa = false;

var pingpong = {
	puntos1: 0,
	puntos2: 0
};
pingpong.pressedKeys = [];
pingpong.ball = {
	speed: 5,
	x: 150,
	y: 100,
	directionX: 1,
	directionY: 1,
}
pingpong.ball.positionX = function(){
	return this.x + this.speed * this.directionX;
}

pingpong.ball.positionY = function(){
	return this.y + this.speed * this.directionY;
}

$(function(){
	pingpong.timer = setInterval(gameloop, 30);
	$(document).keydown(function(e){
		if(e.which == KEY.ENTER)
		{
			pausa = !pausa;
			if(pausa)
				clearInterval(pingpong.timer);
			else
				pingpong.timer = setInterval(gameloop, 30);
			return;
		}
		pingpong.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which] = false;
	});
});

function gameloop(){
	moveBall();
	movePaddles();
	endGame();
}

function moveBall(){
	var altoZonaJuego = $("#zonaJuego").height() - $("#pelota").height();
	var anchoZonaJuego = $("#zonaJuego").width() - $("#pelota").width();
	var pelota = pingpong.ball;
	if(pelota.positionY() > altoZonaJuego)
		pelota.directionY = -1;
	if(pelota.positionY() < 0)
		pelota.directionY = 1;
	
	var paletaAX = parseInt($("#paletaA").css("left")) + $("#paletaA").width();
	var paletaAYBottom = parseInt($("#paletaA").css("top")) + $("#paletaA").height();
	var paletaAYTop = parseInt($("#paletaA").css("top"));
	if(pelota.positionX() < paletaAX)
	{
		if(pelota.positionY() <=  paletaAYBottom && pelota.positionY() >=  paletaAYTop)
			pelota.directionX = 1;
	}

	var paletaBX = parseInt($("#paletaB").css("left")) + $("#paletaB").width();
	var paletaBYBottom = parseInt($("#paletaB").css("top")) + $("#paletaB").height();
	var paletaBYTop = parseInt($("#paletaB").css("top"));
	if(pelota.positionX() + $("#pelota").width() >= paletaBX)
	{
		if(pelota.positionY() <=  paletaBYBottom && pelota.positionY() >=  paletaBYTop)
			pelota.directionX = -1;
	}
	pelota.x  += pelota.speed * pelota.directionX;
	pelota.y  += pelota.speed * pelota.directionY;
	
	if(pelota.positionX() > anchoZonaJuego)
	{
		pelota.x = 250;
		pelota.y = 100;
		pelota.directionX = -1;
		pingpong.puntos1++;
		$("#puntos1").html(pingpong.puntos1);
	}
	if(pelota.positionX() < 0)
	{
		pelota.x = 150;
		pelota.y = 100;
		pelota.directionX = 1;
		pingpong.puntos2++;
		$("#puntos2").html(pingpong.puntos2);
	}

	$("#pelota").css({
		"left": pelota.x,
		"top": pelota.y
	});	
}

function movePaddles(){
	if(pingpong.pressedKeys[KEY.UP])
		paletaArriba($("#paletaB"));
	if(pingpong.pressedKeys[KEY.DOWN])
		paletaAbajo($("#paletaB"));
	if(pingpong.pressedKeys[KEY.W])
		paletaArriba($("#paletaA"));
	if(pingpong.pressedKeys[KEY.S])
		paletaAbajo($("#paletaA"));
}

function paletaArriba(paleta){
	var top = parseInt(paleta.css("top"));
	if(top > 0)
		paleta.css("top", top-5);
}

function paletaAbajo(paleta){
	var top = parseInt(paleta.css("top"));
	var height = paleta.height();
	if(top + height > $("#zonaJuego").height()) return;
	paleta.css("top", top+5);
}

function endGame(){
	var ganador = "";
	if(pingpong.puntos2 == 10)
		ganador = "Jugador 2";
	if(pingpong.puntos1 == 10)
		ganador = "Jugador 1";
	if(ganador != "")
	{
		clearInterval(pingpong.timer);
		$("#juego").html("El " + ganador + " es el Ganador!!!");
	}	
}