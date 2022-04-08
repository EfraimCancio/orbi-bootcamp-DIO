function start () {
    $("#start").hide();

    $("#backgroundGame").append("<div id='player' class='anima1'></div>");
    $("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
    $("#backgroundGame").append("<div id='enemy2'></div>");
    $("#backgroundGame").append("<div id='friend' class='anima3'></div>");
    $("#backgroundGame").append("<div id='scoreboard'></div>");
    $("#backgroundGame").append("<div id='energy'></div>");

    let endGame = false;

    let game = {}

    let points = 0;
    let friendsSave = 0;
    let friendsLost = 0;

    let currentEnergy = 3;

    let canShoot = true;

    let velocity = 5;
    
    let positionY = parseInt(Math.random() * 334);

    let key = {
        W: 87,
        S: 83,
        D: 68
    }

    let shotSound = document.getElementById("shotSound");
    let explosionSound = document.getElementById("explosionSound");
    let gameMusic = document.getElementById("gameMusic");
    let gameoverSound = document.getElementById("gameoverSound");
    let lostSound = document.getElementById("lostSound");
    let rescueSound = document.getElementById("rescueSound");

    gameMusic.addEventListener("ended", function(){ gameMusic.currentTime = 0; gameMusic.play(); }, false);
    gameMusic.play();

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
        scoreboard();
        energy();
    }

    function scoreboard() {
	
        $("#scoreboard").html("<h2> Points: " + points + " Salves: " + friendsSave + " Losts: " + friendsLost + "</h2>");
        
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
            
        shotSound.play();
            
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
		
            currentEnergy--;

            explosionSound.play();

            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X, enemy1Y);
        
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top",positionY);
        }

        if (collision2.length > 0) {

            currentEnergy--;

            explosionSound.play();

            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X, enemy2Y);
                    
            $("#enemy2").remove();
                
            replaceEnemy2();      
        } 
        
        if (collision3.length > 0) {
		
            points = points + 100;

            velocity = velocity + 0.3;

            explosionSound.play();

            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
                
            explosion1(enemy1X, enemy1Y);
            $("#shot").css("left",950);
                
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top", positionY); 
            
        }

        if (collision4.length > 0) {
		
            points = points + 50;

            explosionSound.play();

            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            $("#enemy2").remove();
        
            explosion2(enemy2X,enemy2Y);
            $("#disparo").css("left",950);
            
            replaceEnemy2();
        }

        if (collision5.length > 0) {
		
            friendsSave++;

            rescueSound.play();

            replaceFriend();
            $("#friend").remove();
        }

        if (collision6.length > 0) {

            friendsLost++;

            lostSound.play();
	    
            friendX = parseInt($("#friend").css("left"));
            friendY = parseInt($("#friend").css("top"));
            explosion3(friendX,friendY);
            $("#friend").remove();
                    
            replaceFriend();         
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

    function explosion3(friendX, friendY) {
        $("#backgroundGame").append("<div id='explosion3' class='anima4'></div");
        $("#explosion3").css("top", friendY);
        $("#explosion3").css("left", friendX);
        
        var timeExplosion3 = window.setInterval(resetExplosion3, 1000);
           
        function resetExplosion3() {
            $("#explosion3").remove();
            window.clearInterval(timeExplosion3);
            timeExplosion3 = null;     
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
            
            }
        }   
    }

    function energy() {
	
		if (currentEnergy == 3) {
			
			$("#energy").css("background-image", "url(imgs/energia3.png)");
		}
	
		if (currentEnergy == 2) {
			
			$("#energy").css("background-image", "url(imgs/energia2.png)");
		}
	
		if (currentEnergy == 1) {
			
			$("#energy").css("background-image", "url(imgs/energia1.png)");
		}
	
		if (currentEnergy == 0) {
			
			$("#energy").css("background-image", "url(imgs/energia0.png)");
			
			gameOver();
		}
	} 

    function gameOver() {
        endGame = true;
        gameMusic.pause();
        gameoverSound.play();
        
        window.clearInterval(game.timer);
        game.timer = null;
        
        $("#player").remove();
        $("#enemy1").remove();
        $("#enemy2").remove();
        $("#friend").remove();
        
        $("#backgroundGame").append("<div id='end'></div>");
        
        $("#end").html("<h1> Game Over </h1><p>Your scores were: " + points + "</p>" + "<div id='restart' onClick=restartGame()><h3>Play again?</h3></div>");
    }
}

function restartGame() {
	gameoverSound.pause();
	$("#end").remove();
	start();
}