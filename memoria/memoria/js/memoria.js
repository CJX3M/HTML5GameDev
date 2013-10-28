var juegoMemoria = {};
var cartas = ["KA", "QA", "JA", "KB", "QB", "JB", "KC", "QC", "JC", "KD", "QD", "JD"];
juegoMemoria.Baraja = [];

$(function(){
	for(var i = 0; i < 6; i++){
		var azar = Math.floor(Math.random()*6)
		var carta = cartas[azar];
		if($.inArray(carta, juegoMemoria.Baraja) < 0)
		{
			juegoMemoria.Baraja.push(carta);
			juegoMemoria.Baraja.push(carta);
		}
		else
			i--;
	}
	juegoMemoria.Baraja.sort(shuffle);
	for(var i = 0; i < 11; i++)
		$(".carta:first-child").clone().appendTo("#cartas");
		
	$("#cartas").children().each(function(indice){
		var left = ($(this).width() + 20) * (indice % 4);
		var top = ($(this).height() + 20) * Math.floor(indice / 4);
		$(this).css({
			"left": left,
			"top" : top
		});
		var carta = juegoMemoria.Baraja.pop();
		$(this).find(".atras").addClass("carta" + carta);
		$(this).attr("data-carta", carta);
		$(this).click(cartaSeleccionada);
	});
})

function shuffle(){
	return 0.5 - Math.random();
}

function cartaSeleccionada(){
	if($(".carta-volteada").size() > 1)
		return;
	$(this).toggleClass("carta-volteada");
	if($(".carta-volteada").size() == 2)
		setTimeout(revisarCartas, 700);
}

function revisarCartas(){
	if(cartasCoinciden()){
		$(".carta-volteada").removeClass("carta-volteada").addClass("carta-removida");
		$(".carta-removida").bind("webkitTransitionEnd", removerCartas);
	}
	else
		$(".carta-volteada").removeClass("carta-volteada");
}

function cartasCoinciden(){
	var cartas = $(".carta-volteada");
	return $(cartas[0]).data("carta") == $(cartas[1]).data("carta");
}

function removerCartas(){
	$(".carta-removida").remove();
}