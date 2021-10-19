title = "GOLF";

description = `
  HOLD AND DRAG 
    THE BALL
`;

characters = [
//vertical wall (a)
`
ll
ll
ll
ll
ll
ll
`,
//horizontal wall (b)
`
llllll
llllll
`,
//top left/bottom right diagonal wall (c)
`
     l
    l
   l
  l
 l
l
`,
//course floor (d)
`
llllll
llllll
llllll
llllll
llllll
llllll
`,
//top left angled course floor (e)
`
     l
    ll
   lll
  llll
 lllll
llllll
`,
//ball (f)
`
ll
ll
`,
//top right/bottom left angled wall (g)
`
l
 l
  l
   l
    l
     l
`,
//bottom right angled floor (h)
`
llllll
lllll
llll
lll
ll
l
`,
//top right angled floor (i)
`
l
ll
lll
llll
lllll
llllll
`, 
//bottom left angled floor (j)
`
llllll
 lllll
  llll
   lll
    ll
     l
`,
// hole (k)
`
ll
ll
`
];

options = {
  theme: 'dark',
  seed: 324763267,
  isPlayingBgm: true,
};

let ball = { //ball info: speed and position
  xpos: 36,
  ypos: 88,
  horizontalSpeed: 0,
  verticalSpeed: 0,
};

let shots = 0; //number of shots taken
let level =1; //current level
let canDrag = false; //if mouse is near the ball, play can start the hitting process
let mouseDistance = 0; //keeps track of how player player dragged, so the dots can show accurately
let run = 0; //horizontal power the player put into the ball
let rise = 0; //vertical power the player put into the ball
let hitCounter = 0; //counts how many times the ball collides with a wall in one hit, so we can see if it is stuck
let decrement = 1.025;
let upDown = false;
let leftRight = true;

let level1flag = 1;
let level2flag = 1;
let level3flag = 1;

function update() {
  if (!ticks) {
  }
  score = shots;
  if (level == 1) { //initiates the layout for level 1
    createTopLeftTurn(30, 60); //uses creation functions to build the maps
    createVertical(30, 78);    //note: each chunk is 18x18, so if you want to connect two horizontal pieces, 
                               //      the x position would be shifted 18 in either direction
    for (let i = 0; i < 13; i += 6) { //adds extra white line to the bottom of the vertical path
      char("b", 30 + i, 78 + 15);
    }
    createHorizontal(48, 60);
    createVertical(66, 42);
    char("b", 66, 48);
    char("b", 78, 48);
    createBottomRightTurn(66, 60);
    createTopRightTurn(66, 24);
    createHorizontal(48, 24);
    createHorizontal(30, 24);
    char("a", 48, 24);
    char("a", 48, 30);
    char("a", 36, 36);
    char("a", 36, 30);
    createTopLeftTurn(12, 24);
    createVertical(12, 42);
    for (let i = 0; i < 13; i += 6) {
      char("b", 12 + i, 42 + 15);
    }
    color("white");
    char("k", 17, 52); //adds the hole at the end of the course
    color("black")
    char("f", ball.xpos, ball.ypos); //creates the ball
    if(level1flag) {
      score = 0;
      shots = 0;
      ball.xpos = 36;
      ball.ypos = 88;
      level1flag = 0;
    }
  } else if (level == 2) { //just need to insert the functions below in here to create the map for level 2
    createVertical(72,72);
    createVertical(72,54);
    createVertical(72,36);
    createTopRightTurn(72,18);
    createHorizontal(54,18);
    createHorizontal(36,18);
    createTopLeftTurn(18,18);
    createVertical(18,36);
    createVertical(18,54);
    createBottomLeftTurn(18,72);
    createHorizontal(36,72);
    createBottomRightTurn(54,72);
    createNarrowVeritcal(54,54);
    createTopRightTurn(52,36);   
    createNarrowHorizontal(34,36);
    for (let i = 0; i < 13; i += 6) { //adds extra white line to the bottom of the vertical path
      char("b", 72 + i, 72 + 15);
    }
    for (let i = 0; i < 13; i += 6) { //adds extra white line to the bottom of the vertical path
      char("a", 34, 36 + i);
    }
    color("white");
    char("k", 44, 43); //adds the hole at the end of the course
    color("black");
    if(level2flag) {
      ball.xpos = 78;
      ball.ypos = 78;      
      level2flag = 0;
    }
  } else if (level == 3) { 
    /*
    copy the if statement behaviour from above. the way the
    first level was made, the balls position was preset and is constantly updated throughout the 
    level generation, so you can't set the ball position without setting a flag that turns off after setting
    the blls position.
    TL;DR 
    make variable called level3flag and initialize to 1
    copy if statement above
    replace level2flag with level3flag
    change the "78"'s to whatever position you want the ball to start in
    */
    createVertical(5, 77);
    createTopLeftTurn(5, 59);
    createHorizontal(23, 59);
    createTopRightTurn(41, 59);
    createBottomLeftTurn(41, 77);
    createHorizontal(59, 77);
    createBottomRightTurn(77, 77);
    createVertical(77, 59);
    createVertical(77, 41);
    createVertical(77, 23);
    createTopRightTurn(77, 5);
    createHorizontal(59, 5);
    createTopLeftTurn(41, 5);
    createBottomRightTurn(41, 23);
    createBottomLeftTurn(23, 23);
    createTopRightTurn(23, 5);
    createHorizontal(5, 5);
    for (let i = 0; i < 13; i += 6) { //adds extra white line to the bottom of the vertical path
      char("b", 5 + i, 93);
    }
    for (let i = 0; i < 13; i += 6) { //adds extra white line to the bottom of the vertical path
      char("a", 1, 5 + i);
    }
    color("white");
    char("k", 10, 10); //adds the hole at the end of the course
    color("black");
    if(level3flag) {
      ball.xpos = 12;
      ball.ypos = 80;
      level3flag = 0;
    }
  }
  updateSpeed(); //updates horizontal and vertical speed of the ball
  if (char("f", ball.xpos, ball.ypos).isColliding.char.a) { //if colliding with vertical wall, reverse horizontal speed
    checkIfStuck();
    play("powerUp");
    ball.horizontalSpeed = -1 * ball.horizontalSpeed;
  }
  if (char("f", ball.xpos, ball.ypos).isColliding.char.b) { //if colliding with horizontal wall, reverse vertical speed
    checkIfStuck();
    play("powerUp");
    ball.verticalSpeed = -1 * ball.verticalSpeed;
  }
  if (char("f", ball.xpos, ball.ypos).isColliding.char.c) { //if colliding with top left or bottom right diagonal wall,
    checkIfStuck();                                         //switch speeds, and make them reverse their signs to
    play("powerUp");                                        //bounce properly
    let temp = ball.verticalSpeed;
    ball.verticalSpeed = -ball.horizontalSpeed;
    ball.horizontalSpeed = -temp;
  }
  if (char("f", ball.xpos, ball.ypos).isColliding.char.g) { //if colliding with the bottom left or top right diagonal wall,
    checkIfStuck();                                         //switch speeds
    play("powerUp");
    let temp = ball.verticalSpeed;
    ball.verticalSpeed = ball.horizontalSpeed;
    ball.horizontalSpeed = temp;
  }
  if (char("f", ball.xpos, ball.ypos).isColliding.char.k) { //if colliding with the hole, start the next level
    play("coin");
    if (level == 3) {
      end();
      level = 1;
      level1flag = 1;
      level2flag = 1;
      level3flag = 1;
      ball.horizontalSpeed = 0;
      ball.verticalSpeed = 0;
    } else {
      level++;
      ball.horizontalSpeed = 0;
      ball.verticalSpeed = 0;
    }
  }
  if (!char("f", ball.xpos, ball.ypos).isColliding.char.a) { //check which direction ball was going before
    if (ball.horizontalSpeed < 0) {                          //it collided with a vertical wall
      leftRight = true;                                      //store value to determine which direction to go
    } else {                                                 //incase ball gets stuck in the wall
      leftRight = false;
    }
  }
  if (!char("f", ball.xpos, ball.ypos).isColliding.char.b) { //same as above but for horizontal walls
    if (ball.verticalSpeed < 0) {
      upDown = true;
    } else {
      upDown = false;
    }
  }
  if (input.isJustPressed && mouseNearBall() && 
     (ball.horizontalSpeed == 0 && ball.verticalSpeed == 0)) { //checks if player clicked on the ball
    canDrag = true;
  }
  if (input.isPressed && canDrag) { //if player maintains the click near the ball, calculate the distance between mouse and ball
    mouseDistance = sqrt((pow(ball.xpos - input.pos.x, 2)) + (pow(ball.ypos - input.pos.y, 2)));
    if (mouseDistance > 5) {
      mouseDistance = 5;
    }
    run = (ball.xpos - input.pos.x) / 1; //make the values integers (i think)
    rise = (ball.ypos - input.pos.y) / 1;
    if (rise > 5) {                       //set a limit to how far the player can drag
      rise = 5;
    } else if (rise < -5) {
      rise = -5;
    }
    if (run > 5) {
      run = 5;
    } else if (run < -5) {
      run = -5;
    }
    for (let i = 0; i <= mouseDistance; i++) { //draw yellow rectangles in the direction and power that the player
      color("yellow")                          //chose with their drag
      rect(ball.xpos - 1 + (run * i), ball.ypos - 1 + (rise * i), 1, 1);
    }
    color("black");
  }
  if (input.isJustReleased && canDrag) { //if they release their drag, set the ball in motion
      canDrag = false;
      hitCounter = 0; //reset hit counter to see if ball gets stuck on this shot
      shots++;
      ball.horizontalSpeed = run/4.5;
      ball.verticalSpeed = rise/4.5;
      decrement = 1.025;
  }  
}

//gradually decreases speed and moves the ball accordingly

function updateSpeed() {
  if (abs(ball.horizontalSpeed) < .075 &&  abs(ball.verticalSpeed) < .075) { //if ball is moving too slow, stop it
    ball.horizontalSpeed = 0;
    ball.verticalSpeed = 0;
  } else { //otherwise continue gradually decreasing the speed
    decrement -= .0001;
    ball.horizontalSpeed = ball.horizontalSpeed/decrement;
    ball.verticalSpeed = ball.verticalSpeed/decrement;
  }
  if (ball.horizontalSpeed != 0) { //move ball left and right
    ball.xpos += ball.horizontalSpeed;
  }
  if (ball.verticalSpeed != 0) { //move ball up and down
    ball.ypos += ball.verticalSpeed;
  }
}

//feel free to make more of the below creation functions to have more variety in the maps

function createTopLeftTurn(xpos, ypos) { //creates a top left angled corner for a turn
  color("light_green")
  char("e", xpos, ypos + 12);
  char("e", xpos + 6, ypos + 6);
  char("e", xpos + 12, ypos);
  char("d", xpos + 6, ypos + 12);
  char("d", xpos + 12, ypos + 6);
  char("d", xpos + 12, ypos + 12);
  turnHelper(xpos, ypos);
}

function createBottomRightTurn(xpos, ypos) { //creates a bottom right angled corner for a turn
  color("light_green")
  char("d", xpos, ypos);
  char("d", xpos + 6, ypos);
  char("d", xpos, ypos + 6);
  char("h", xpos + 12, ypos);
  char("h", xpos + 6, ypos + 6);
  char("h", xpos, ypos + 12);
  turnHelper(xpos, ypos);
}

function turnHelper(xpos, ypos) { //the two functions above will draw the same white line, so this function
  color("black")                  //does it for both of them
  char("c", xpos, ypos + 12);
  char("c", xpos + 6, ypos + 6);
  char("c", xpos + 12, ypos);
  char("c", xpos + 12, ypos - 1);
  char("c", xpos - 1, ypos + 12);
  char("c", xpos - 1 + 6, ypos + 6);
  char("c", xpos - 1 + 12, ypos);
}

function createTopRightTurn(xpos, ypos) { //creates a top right angled corner for a turn
  color("light_green")
  char("d", xpos, ypos + 12);
  char("d", xpos, ypos + 6);
  char("d", xpos + 6, ypos + 12);
  char("i", xpos, ypos);
  char("i", xpos + 6, ypos + 6);
  char("i", xpos + 12, ypos + 12);
  secondTurnHelper(xpos, ypos);
}


function createBottomLeftTurn(xpos, ypos) { //creates a bottom left angled corner for a turn
  color("light_green")
  char("d", xpos + 12, ypos);
  char("d", xpos + 6, ypos);
  char("d", xpos + 12, ypos + 6);
  char("j", xpos, ypos);
  char("j", xpos + 6, ypos + 6);
  char("j", xpos + 12, ypos + 12);
  secondTurnHelper(xpos, ypos);
}

function secondTurnHelper(xpos, ypos) { //does the same thing as the other helper function, but with an opposite diagonal
  color("black")
  char("g", xpos, ypos);
  char("g", xpos + 6, ypos + 6);
  char("g", xpos + 12, ypos + 12);
  char("g", xpos, ypos - 1);
  char("g", xpos + 1, ypos);
  char("g", xpos + 1 + 6, ypos + 6);
  char("g", xpos + 1 + 12, ypos + 12);
}

function createVertical(xpos, ypos) { //creates a vertical pathway
  color ("light_green")
  for (let i = 0; i < 3; i++) { //fills in the green part
    for (let j = 0; j < 3; j++) {
      char("d", xpos + (i * 6), ypos + (j * 6));
    }
  }
  color("black")
  for (let i = 0; i < 13; i += 6) { //creates the walls
    char("a", xpos - 4, ypos + i);
    char("a", xpos + 16, ypos + i);
  }
}

function createNarrowVeritcal(xpos,ypos) {
  color ("light_green")
  for (let i = 0; i < 3; i++) { //fills in the green part
    for (let j = 0; j < 3; j++) {
      char("d", xpos + (i * 6), ypos + (j * 6));
    }
  }
  color("black")
  for (let i = 0; i < 13; i += 6) { //creates the walls
    char("a", xpos - 4, ypos + i);
    char("a", xpos + 14, ypos + i);
  }
}

function createNarrowHorizontal(xpos, ypos) { //creates a horizontal pathway
  color ("light_green")
  for (let i = 0; i < 3; i++) { //fills in the green part
    for (let j = 0; j < 3; j++) {
      char("d", xpos + (i * 6), ypos + (j * 6));
    }
  }
  color("black")
  for (let i = 0; i < 13; i += 5) { //creates the walls
    char("b", xpos + i + 2, ypos - 3);
    char("b", xpos + i + 2, ypos + 16);
  }
}

function createHorizontal(xpos, ypos) { //creates a horizontal pathway
  color ("light_green")
  for (let i = 0; i < 3; i++) { //fills in the green part
    for (let j = 0; j < 3; j++) {
      char("d", xpos + (i * 6), ypos + (j * 6));
    }
  }
  color("black")
  for (let i = 0; i < 13; i += 6) { //creates the walls
    char("b", xpos + i, ypos - 4);
    char("b", xpos + i, ypos + 15);
  }
}

function mouseNearBall() { //checks if mouse is on or near the ball
  if (input.pos.x < ball.xpos + 3 && input.pos.x > ball.xpos - 3) {
    if (input.pos.y < ball.ypos + 3 && input.pos.y > ball.ypos - 3) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function checkIfStuck() { //if ball is stuck in a wall, move it one pixel towards the green area
  hitCounter++;
  if (hitCounter > 30) {
    if (char("f", ball.xpos, ball.ypos).isColliding.char.g) { //check which type of diagonal wall it hit
      if (char("f", ball.xpos, ball.ypos).isColliding.char.i) { //check if its top right or bottom left
        ball.xpos--;
        ball.ypos++;
      } else {
        ball.xpos++;
        ball.ypos--;
      }
    } else if (char("f", ball.xpos, ball.ypos).isColliding.char.c) { //same as above
      if (char("f", ball.xpos, ball.ypos).isColliding.char.e) {
        ball.xpos++;
        ball.ypos++;
      } else {
        ball.xpos--;
        ball.ypos--;
      }
    } else if (char("f", ball.xpos, ball.ypos).isColliding.char.a) { //check if ball hit a vertical wall
      if (leftRight) { //check if it came from the left or right
        ball.xpos++;
      } else {
        ball.xpos--;
      }
    } else { //otherwise the ball hit a horizontal wall
      if (upDown) { //check if it came from the bottom or top
        ball.ypos++;
      } else {
        ball.ypos--;
      }
    }
  }
}