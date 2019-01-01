 let c = 0;
 let tickInterval;
 let aiPos = 0;
 let walls = 0;
 let avoided = 0;
 let crash = 0;

function tick() {
     c++;
     $('#stepsDone').val(c);
     moveWall();
     checkCollision();
 }

 function runSim (state) {
     if(state == 1) { // Run simulation
       if(c > 100) {
           runSim('0');
       } else {
           if(tickInterval) {
             clearInterval(tickInterval);
            }
        tickInterval = setInterval("tick();", 20);
       }
     } else {
         // stop simulation
         clearInterval(tickInterval);
         c = 0;
         $('#stepsDone').val(c);
         $('#ai').css('margin-top', '50px');
         $('#wall').css ({
             'left': 'unset',
             'right': '0px'
         });
         aiPos = 0;
         walls = 0;
         avoided = 0;
         crash = 0;
     }
 }

function moveWall () {
    let wall_position = $('#wall').offset();

    debugWall(wall_position);
   

    if(wall_position.left <= 0) {

        var random_wall_y = Math.floor(Math.random() * (200+1)+0);  
        $('#wall').css ('margin-top', random_wall_y+'px');


        $('#wall').css({
            "left": 'unset',
            'right': '0px'
        })
        walls++;
    }else {
        wall_position.left -= 20;
        $('#wall').css('left', wall_position.left+'px');
    }
}

function debugWall(wall) {
    $('#debugTextArea').append("["+c+"] Wall PosX: "+wall.left+"| Wall PosY: "+wall.top+"\n");
    $('#debugTextArea').scrollTop($('#debugTextArea')[0].scrollHeight);
}

function moveCar (direction) {

    if(aiPos < 0) {
        aiPos = 0; 
    }

    if(aiPos >250) {
        aiPos = 250;
    }

    if(direction == 'down') {
        aiPos = aiPos+20;
    } else {
        aiPos = aiPos-20;
    }
    $('#ai').css("margin-top", aiPos+'px');
}

// $(document).keyup(function (event) {
//     console.log(event)
// });



// document.onkeyup = function (event) {
//     if (event.which == 13 || event.keyCode == 13) {
//       alert("Wooohoo");
//     }
//   };

  document.addEventListener('keydown', logKey);


  function logKey(e) {
    
    if(e.key == 'ArrowUp') {
        moveCar('top');
    }else if(e.key == 'ArrowDown') {
        moveCar('down');
    }
  }


  function checkCollision() {
    let wall_x = $('#wall').offset().left; 
    let wall_y = $('#wall').offset().top+100;

    let ai_x = $('#sensor_2').offset().left+500; 
    let ai_y = $('#ai').offset().top;


 

    // if(wall_x < ai_x && ai_y >= wall_y-100 && ai_y < wall_y || wall_x < ai_x && wall_y-100 > ai_y && wall_y-100 < ai_y+50) {
        // if(ai_y > 300 && ai_y > wall_y-100 && wall_y +100 > 350) {
        //     moveCar('top');
        // }else {
        //     moveCar('down');
        // }
        if(wall_x < ai_x-500 && ai_y >= wall_y-100 && ai_y < wall_y || wall_x < ai_x-500 && wall_y-100 > ai_y && wall_y-100 < ai_y+50) {
        $('#ai').css('background', 'red');
        if(wall_x < 100) {
            crash++;
        }
       } else {
        $('#ai').css('background', 'white');
            $('#sensor_2').css('background', 'white');
            if(wall_x < 100) {
                avoided ++;
            }
       }

    
}