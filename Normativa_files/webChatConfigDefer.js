jQuery(document).ready(function($){
    $(".btn-Minim").on("click", function(event){
        event.preventDefault();
        var $chat = $(this).parent().next();
        var estaVisible = $chat.css("display");
        if( estaVisible != "none"){
            $chat.hide();
            $chat.parent().css("height","auto");
            $(this).html("+");
        } else {
            $chat.show();
            $chat.parent().css("height","88vh");
            $(this).html("-");
        }
    });
	
	$(".btn-Act").on("click", function(event){
		refresh();
		return false;
    });
});



