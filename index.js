let snakeX;
let snakeY;
let vx = 0;
let vy = 0;
let snakeDiv;
let foodDiv;
let box = document.getElementsByClassName("container");
let snakeBody = []; //this stores the coordinates of the snakehead+body
let snakeBodyDiv = []; //this array holds the div elements of every single bodypart of the snake
let intervalId;
let gameHead = document.querySelector("h1");
let score = 0;
let newSnakeBod;
let gameOverFlag = false;

foodDiv = document.createElement("div");
foodDiv.classList.add("food");
box[0].appendChild(foodDiv);


foodSpawn();
init();

function foodSpawn() {

    if (gameOverFlag) {
        foodDiv = document.createElement("div");
        foodDiv.classList.add("food");
        box[0].appendChild(foodDiv);
        gameOverFlag = false;
    }

    foodX = Math.floor(Math.random() * 40) + 1;
    foodY = Math.floor(Math.random() * 40) + 1;
    foodDiv.style.gridArea = `${foodX}/${foodY}`;
}

function init() {

    // console.log("Beginning of Init() " + vx + " " + vy + " " + score);
    snakeDiv = document.createElement("div");
    snakeDiv.classList.add("snake");
    box[0].appendChild(snakeDiv);

    snakeBodyDiv.push(snakeDiv);


    snakeX = Math.floor(Math.random() * 40) + 1;
    snakeY = Math.floor(Math.random() * 40) + 1;

    snakeBody[0] = [snakeX, snakeY, vx, vy];

    snakeDiv.style.gridArea = `${snakeX}/${snakeY}`;
    snakeDiv.style.borderTopLeftRadius = "50%";
    snakeDiv.style.borderTopRightRadius = "50%";
    snakeDiv.style.borderBottomRightRadius = "0%";
    snakeDiv.style.borderBottomLeftRadius = "0%";

    // snakeBody[0] = [snakeX, snakeY];

    console.log(snakeBodyDiv);
}

function moveSnake(velX, velY) {
    snakeX = snakeX + velX;
    snakeY = snakeY + velY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY, velX, velY];

    for (let i = 0; i < snakeBody.length; i++) {
        snakeBodyDiv[i].style.gridArea = `${snakeBody[i][0]}/${snakeBody[i][1]}`;
    }
    // snakeDiv.style.gridArea = `${snakeX}/${snakeY}`;

    for (let i = 0; i < snakeBody.length; i++) {

        if (i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameOver();
            break;
        }

        ///Bunch of IF-ELSEs for rounded edges when snake turns...
        if (i !== 0 && i !== snakeBody.length - 1) {

            if (snakeBody[i][2] == -1) {
                if (snakeBody[i - 1][3] == -1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "50%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
                    continue;
                } else if (snakeBody[i - 1][3] == 1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "50%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
                    continue;
                }

            } else if (snakeBody[i][2] == 1) {
                if (snakeBody[i - 1][3] == -1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "50%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
                    continue;
                } else if (snakeBody[i - 1][3] == 1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "50%";
                    continue;
                }
            } else if (snakeBody[i][3] == -1) {
                if (snakeBody[i - 1][2] == -1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "50%";
                    continue;
                } else if (snakeBody[i - 1][2] == 1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "50%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
                    continue;
                }

            } else if (snakeBody[i][3] == 1) {
                if (snakeBody[i - 1][2] == -1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "50%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
                    continue;
                } else if (snakeBody[i - 1][2] == 1) {
                    snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
                    snakeBodyDiv[i].style.borderTopRightRadius = "50%";
                    snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
                    snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
                    continue;
                }

            }

            snakeBodyDiv[i].style.borderTopLeftRadius = "0%";
            snakeBodyDiv[i].style.borderTopRightRadius = "0%";
            snakeBodyDiv[i].style.borderBottomRightRadius = "0%";
            snakeBodyDiv[i].style.borderBottomLeftRadius = "0%";
        }


    }


    //Once again a bunch of IF-ELSEs for Rounded edges of Snake's tail
    if (snakeBody.length !== 1) {
        let snaketail = snakeBody[snakeBody.length - 1];

        if (snaketail[2] === -1) {
            if (snakeBody[snakeBody.length - 2][3] !== 1 && snakeBody[snakeBody.length - 2][3] !== -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "50%";
            }

            if (snakeBody[snakeBody.length - 2][3] === 1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "50%";
            }

            if (snakeBody[snakeBody.length - 2][3] === -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "0%";
            }


        } else if (snaketail[2] === 1) {

            if (snakeBody[snakeBody.length - 2][3] !== 1 && snakeBody[snakeBody.length - 2][3] !== -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "0%";
            }

            if (snakeBody[snakeBody.length - 2][3] === 1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "50%";
            }

            if (snakeBody[snakeBody.length - 2][3] === -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "0%";
            }

        } else if (snaketail[3] === -1) {
            if (snakeBody[snakeBody.length - 2][2] !== 1 && snakeBody[snakeBody.length - 2][2] !== -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "0%";
            }

            if (snakeBody[snakeBody.length - 2][2] === 1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "0%";
            }

            if (snakeBody[snakeBody.length - 2][2] === -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "50%";
            }
        } else if (snaketail[3] === 1) {
            if (snakeBody[snakeBody.length - 2][2] !== 1 && snakeBody[snakeBody.length - 2][2] !== -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "50%";
            }

            if (snakeBody[snakeBody.length - 2][2] === 1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "0%";
            }

            if (snakeBody[snakeBody.length - 2][2] === -1) {
                snakeBodyDiv[snakeBody.length - 1].style.borderTopLeftRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderTopRightRadius = "0%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomRightRadius = "50%";
                snakeBodyDiv[snakeBody.length - 1].style.borderBottomLeftRadius = "50%";
            }

        }
    }



    if (snakeX < 1 || snakeY < 1 || snakeX > 40 || snakeY > 40) {
        gameOver();
    }

    if (snakeX === foodX & snakeY === foodY) {
        foodConsumed(foodX, foodY, velX, velY);
    }
}


function foodConsumed(fx, fy, velX, velY) {
    gameHead.innerHTML = `SNAKE - ${++score}`;


    newSnakeBod = document.createElement("div");
    newSnakeBod.classList.add("snake");
    snakeBodyDiv.push(newSnakeBod);
    newSnakeBod.style.gridArea = `${fx}/${fy}`;
    box[0].appendChild(newSnakeBod);
    snakeBody.push([fx, fy, velX, velY]);
    foodSpawn();
}


function gameOver() {
    clearInterval(intervalId);

    alert("Game Over");
    gameOverFlag = true;
    gameHead.innerHTML = 'SNAKE';
    score = 0;
    vx = 0;
    vy = 0;
    snakeBody = [];
    snakeBodyDiv = [];

    //REMOVING ALL DIVS INSIDE THE CONTAINER, WHICH INCLUDES both .snake and .food DIVS//
    let child = box[0].lastElementChild;

    while (child) {
        box[0].removeChild(child);
        child = box[0].lastElementChild;
    }
    foodSpawn();
    init();
}




document.addEventListener("keypress", (e) => {
    clearInterval(intervalId);

    let key = e.key;
    console.log(key);
    if ((key === 'W' || key === 'w') && vx !== 1) {
        vx = -1;
        vy = 0;
        snakeDiv.style.borderTopLeftRadius = "50%";
        snakeDiv.style.borderTopRightRadius = "50%";
        snakeDiv.style.borderBottomRightRadius = "0%";
        snakeDiv.style.borderBottomLeftRadius = "0%";
    } else if ((key === 'S' || key === 's') && vx !== -1) {
        vx = 1;
        vy = 0;
        snakeDiv.style.borderTopLeftRadius = "0%";
        snakeDiv.style.borderTopRightRadius = "0%";
        snakeDiv.style.borderBottomRightRadius = "50%";
        snakeDiv.style.borderBottomLeftRadius = "50%";
    } else if ((key === 'A' || key === 'a') && vy !== 1) {
        vx = 0;
        vy = -1;
        snakeDiv.style.borderTopLeftRadius = "50%";
        snakeDiv.style.borderTopRightRadius = "0%";
        snakeDiv.style.borderBottomRightRadius = "0%";
        snakeDiv.style.borderBottomLeftRadius = "50%";
    } else if ((key === 'D' || key === 'd') && vy !== -1) {
        vx = 0;
        vy = 1;
        snakeDiv.style.borderTopLeftRadius = "0%";
        snakeDiv.style.borderTopRightRadius = "50%";
        snakeDiv.style.borderBottomRightRadius = "50%";
        snakeDiv.style.borderBottomLeftRadius = "0%";
    }


    moveSnake(vx, vy);
    intervalId = setInterval(() => {
        moveSnake(vx, vy);
    }, 100);
});