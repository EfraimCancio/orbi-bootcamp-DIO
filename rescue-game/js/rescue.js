function start () {
    $("#start").hide();

    $("#backgroundGame").append("<div id='player' class='anima1'></div>");
    $("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
    $("#backgroundGame").append("<div id='enemy2'></div>");
    $("#backgroundGame").append("<div id='friend' class='anima3'></div>");

    let endGame = false;

    let game = {}

    let canShoot = true;

    let velocity = 5;
    
    let positionY = parseInt(Math.random() * 334);

    let key = {
        W: 87,
        S: 83,
        D: 68
    }
    game.press = [];

    $(document).keydown(function(e){
        game.press[e.which] = true;
    });
          
    $(document).keyup(function(e){
        game.press[e.which] = false;
    });

    game.timer = setInterval(loop, 30);

    function loop () {
        movBackground();
        movPlayer();
        movEnemy1();
        movEmeny2();
        movFriend();
        collision();
    }

    function movPlayer () {
        if (game.press[key.W]) {
            let top = parseInt($("#player").css("top"));
            $("#player").css("top",top - 10);
            
            if (top <= 0) {
                $("#player").css("top",top + 10);
            }   
        }
        
        if (game.press[key.S]) {
            let top = parseInt($("#player").css("top"));
            $("#player").css("top", top + 10);	
            
            if (top >= 434) {	
                $("#player").css("top",top - 10);      
            }
        }
        
        if (game.press[key.D]) {
            Shot()
        }
    
    }

    function Shot() {
	
        if (canShoot == true) {
            
        canShoot = false;
        
        topo = parseInt($("#player").css("top"))
        positionX = parseInt($("#player").css("left"))
        shotX = positionX + 190;
        topShot = topo + 37;
        $("#backgroundGame").append("<div id='shot'></div>");
        $("#shot").css("top", topShot);
        $("#shot").css("left", shotX);
        
        var timeShot = window.setInterval(execShoot, 30);
        
        }

        function execShoot() {
            positionX = parseInt($("#shot").css("left"));
            $("#shot").css("left", positionX + 15); 
    
            if (positionX > 900) {
                    
            window.clearInterval(timeShot);
            timeShot = null;
            $("#shot").remove();
            canShoot = true;    
            }
        } 
    }  

    function movFriend() {
	
        positionX = parseInt($("#friend").css("left"));
        $("#friend").css("left",positionX + 1);
                    
            if (positionX > 906) {
                
            $("#friend").css("left",0);
                        
            }
    
    }

    function movEnemy1() {

        positionX = parseInt($("#enemy1").css("left"));
        $("#enemy1").css("left", positionX - velocity);
        $("#enemy1").css("top", positionY);
            
            if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top", positionY);   
            }
    } 

    function movEmeny2() {
        
        positionX = parseInt($("#enemy2").css("left"));
	    $("#enemy2").css("left", positionX - 3);
				
		if (positionX <= 0) {
			
		$("#enemy2").css("left",775);
					
		}
    }    

    function movBackground() {
	
        left = parseInt($("#backgroundGame").css("background-position"));
        $("#backgroundGame").css("background-position", left-1);
       
    } 

    function collision() {
        var collision1 = ($("#player").collision($("#enemy1")));
        var collision2 = ($("#player").collision($("#enemy2")));
        var collision3 = ($("#shot").collision($("#enemy1")));
        var collision4 = ($("#shot").collision($("#enemy2")));
        var collision5 = ($("#player").collision($("#friend")));
        var collision6 = ($("#enemy2").collision($("#friend")));

        
        if (collision1.length > 0) {
		
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X, enemy1Y);
        
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top",positionY);
        }

        if (collision2.length > 0) {

            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X, enemy2Y);
                    
            $("#enemy2").remove();
                
            replaceEnemy2();      
        } 
        
        if (colision3.length > 0) {
		
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
                
            explosion1(enemy1X, enemy1Y);
            $("#shot").css("left",950);
                
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top", positionY);     
        }

        if (colision4.length > 0) {
		
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            $("#enemy2").remove();
        
            explosion2(enemy2X,enemy2Y);
            $("#disparo").css("left",950);
            
            replaceEnemy2();
        }

        if (colision5.length > 0) {
		
            replaceFriend();
            $("#friend").remove();
        }
    }

    function explosion1(enemy1X, enemy1Y) {
        $("#backgroundGame").append("<div id='explosion1'></div");
        $("#explosion1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosion1");
        div.css("top", enemy1Y);
        div.css("left", enemy1X);
        div.animate({width:200, opacity:0}, "slow");
        
        var explosionTime = window.setInterval(removeExplosion, 1000);
        
        function removeExplosion() {
                
            div.remove();
            window.clearInterval( explosionTime );
            explosionTime = null;
                
        }         
    }

    function explosion2(enemy2X, enemy2Y) {
	
        $("#backgroundGame").append("<div id='explosion2'></div");
        $("#explosion2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosion2");
        div2.css("top", enemy2Y);
        div2.css("left", enemy2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var explosionTime2 = window.setInterval(removeExplosion2, 1000);
        
        function removeExplosion2() {
            
            div2.remove();
            window.clearInterval( explosionTime2 );
            explosionTime2 = null;  
        }
    }

    function replaceEnemy2() {
	
        var timeColision4 = window.setInterval(replace4, 5000);
            
        function replace4() {
        window.clearInterval(timeColision4);
        timeColision4 = null;
            
            if (endGame == false) {
            
            $("#backgroundGame").append("<div id='enemy2'></div");
            
            }
            
        }	
    }	
    
    function replaceFriend() {
	
        var friendTime = window.setInterval(replace6, 6000);
        
        function replace6() {
        window.clearInterval(friendTime);
        friendTime = null;
        
            if (endGame == false) {
            
            $("#backgroundGame").append("<div id='friend' class='anima3'></div>");
            
            }ss
        }   
    }

}