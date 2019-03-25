$(document).ready(function(){

    var dinoImages = ["./assets/Velociraptor.jpg","./assets/Tyrannosaurus-rex.jpg","./assets/Spinosaurus.jpg","./assets/Indoraptor.jpg"];
    var dinoNames = ["Velociraptor","Tyrannosaurus-rex","Spinosaurus","Indoraptor"];
    var healthPoints = [89,100,95,85];
    var attackPower = [25,40,30,35];
    var CounterAttack = [15,30,20,25];
    var isGameStart = 0;
    var attack = 0;
    var healthAttackerInit = 0;
    var healthAttacker = 0;
    var defend = 0;
    var healthDefenderInit = 0;
    var healthDefender = 0;

    for (var i = 0; i < dinoImages.length; i++) {
        var dino = $("<div>");
        dino.addClass("dino");
        dino.attr("name",dinoNames[i]);
        dino.attr("status",0);
        dino.attr("health",healthPoints[i]);
        dino.attr("attack",attackPower[i]);
        dino.attr("counter",CounterAttack[i]);
        dino.text("Name: "+dinoNames[i]+" Health: "+healthPoints[i]+" Attack: "+attackPower[i]+" Counter: "+CounterAttack[i]);
        dino.append("<img src="+dinoImages[i]+"></img>")
        $(".optionsCharacter").append(dino);
    };

    $(".dino").on("click",function(){
        
        if (isGameStart===1){
            $(".defenderCharacter").append(this);
            $(this).attr("status",-1);
        }
        
        if (isGameStart===0){
            $(".yourCharacter").append(this);
            $(this).attr("status",1);
            

            $(".dino").each(function(){
                if ($(this).attr("status")==0){
                    $(".enemiesAvailableToAttack").append(this);
                }  
            });

            isGameStart = 1;

        }
    });

    $(".attack").on("click",function(){
        $(".dino").each(function(){
            if ($(this).attr("status")==1){
                attack = $(this).attr("attack");
                console.log("this is the attack "+attack);
            }
            if ($(this).attr("status")==-1){
                defend = $(this).attr("counter");
                console.log("this is the counter "+defend);
            }  
        });
        $(".dino").each(function(){
            if ($(this).attr("status")==1){
                healthAttackerInit = $(this).attr("health");
                healthAttacker = $(this).attr("health");
                healthAttacker = healthAttacker - defend;
                $(this).attr("health",healthAttacker);
                //$(this).text("Name: "+$(this).attr("name")+" Health: "+$(this).attr("health")+" Attack: "+$(this).attr("attack")+" Counter: "+$(this).attr("counter"));
                console.log("this is the healthAttacker "+healthAttacker);
            }
            if ($(this).attr("status")==-1){
                healthDefenderInit = $(this).attr("health");
                healthDefender = $(this).attr("health");
                healthDefender = healthAttacker - attack;
                $(this).attr("health",healthDefender);
                //$(this).text("Name: "+$(this).attr("name")+" Health: "+$(this).attr("health")+" Attack: "+$(this).attr("attack")+" Counter: "+$(this).attr("counter"));
                console.log("this is the healthDefender "+healthDefender);
            }
        });
        if (healthDefender<0){
            console.log("You win")
            $(".dino").each(function(){
                if ($(this).attr("status")==1){
                    $(this).attr("health",healthAttackerInit + healthDefenderInit/3);
                }
                if ($(this).attr("status")==-1){
                    $(this).empty();
                }
            });
        }  
        
    });



});