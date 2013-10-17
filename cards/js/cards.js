$(function(){
		// $("#card1").addClass("moveAndScale");
		// $("#card2").addClass("rotateRight");
		$("#cards").children().each(function(){
			$(this).click(function(){
				$(this).toggleClass("card-flipped");
			});
		});
});