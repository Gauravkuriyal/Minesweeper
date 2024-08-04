let container = document.querySelector(".container");
let covers = document.querySelectorAll(".cover");
let score = document.querySelector(".timer");
let time = 0, timeInterval;
let bombposition = [];
let start = false;
let neighbourOffset = [1, -1, 10, -10, 11, -11, 9, -9];

// MIN + Math.floor(Math.random() * MAX);

/*BOMB POSITION ALLOTEMENT */
for (let i = 0; i < 25; i++) {
    let flag = 0;
    let row = 1 + Math.floor(Math.random() * 10);
    let column = 1 + Math.floor(Math.random() * 10);

    for (let x = 0; x < bombposition.length; x++) {
        if (bombposition[x][0] == row && bombposition[x][1] == column) {
            i--;
            flag = 1;
            break;
        }
    }

    if (flag == 0) {
        bombposition.push([row, column]);
    }
}

console.log(bombposition)


/* EXPOSE THE COVER*/
function expose(cover, coverIndex) {
    if (cover.style.background != "yellow" && cover.style.background != "red") {

        cover.style.background = "yellow";
        let blast = false;
        let column = coverIndex % 10 + 1;
        let row = Math.floor(coverIndex / 10) + 1;

        let explosiveCount = 0;

        for (let i = 0; i < bombposition.length; i++) {
            let element = bombposition[i];
            if (element[0] == row && element[1] == column) {
                blast = true;
                cover.style.background = "red";
                showexplosives()
                console.log("over")
                clearInterval(timeInterval)
                document.querySelector(".over").style = "display : flex;animation-name:dig";
                document.querySelector(".score").innerHTML = "SCORE : " + time;
                return;
            }
            else if ((element[0] <= row + 1) && (element[0] >= row - 1) && (element[1] <= column + 1) && (element[1] >= column - 1)) {
                explosiveCount++;
            }
        }

        if (explosiveCount == 0 && blast == false) {
            exposeNeighbour(coverIndex, row, column);

        }

        if (!blast) {
            cover.classList = "cover shield";
            if (explosiveCount != 0) {
                covers[coverIndex].innerHTML = explosiveCount;
            }
        }
    }
}

/* EXPOSE THE NEIGHBOUR COVERS IF 0*/
function exposeNeighbour(coverIndex, row, column) {
    if (row == 1 && column == 1) {
        expose(covers[coverIndex + 1], coverIndex + 1);
        expose(covers[coverIndex + 10], coverIndex + 10);
        expose(covers[coverIndex + 10 + 1], coverIndex + 10 + 1);
    }
    else if (row == 1 && column == 10) {
        expose(covers[coverIndex - 1], coverIndex - 1);
        expose(covers[coverIndex + 10], coverIndex + 10);
        expose(covers[coverIndex + 10 - 1], coverIndex + 10 - 1);
    }
    else if (row == 10 && column == 1) {
        expose(covers[coverIndex + 1], coverIndex + 1);
        expose(covers[coverIndex - 10], coverIndex - 10);
        expose(covers[coverIndex - 10 + 1], coverIndex - 10 + 1);
    }
    else if (row == 10 && column == 10) {
        expose(covers[coverIndex - 1], coverIndex - 1);
        expose(covers[coverIndex - 10], coverIndex - 10);
        expose(covers[coverIndex - 10 - 1], coverIndex - 10 - 1);
    }
    else if (row == 1) {
        expose(covers[coverIndex - 1], coverIndex - 1);
        expose(covers[coverIndex + 1], coverIndex + 1);
        expose(covers[coverIndex + 10], coverIndex + 10);
        expose(covers[coverIndex + 10 + 1], coverIndex + 10 + 1);
        expose(covers[coverIndex + 10 - 1], coverIndex + 10 - 1);
    }
    else if (row == 10) {
        expose(covers[coverIndex - 1], coverIndex - 1);
        expose(covers[coverIndex + 1], coverIndex + 1);
        expose(covers[coverIndex - 10], coverIndex - 10);
        expose(covers[coverIndex - 10 + 1], coverIndex - 10 + 1);
        expose(covers[coverIndex - 10 - 1], coverIndex - 10 - 1);
    }
    else if (column == 1) {
        expose(covers[coverIndex + 1], coverIndex + 1);
        expose(covers[coverIndex - 10], coverIndex - 10);
        expose(covers[coverIndex + 10], coverIndex + 10);
        expose(covers[coverIndex - 10 + 1], coverIndex - 10 + 1);
        expose(covers[coverIndex + 10 + 1], coverIndex + 10 + 1);
    }
    else if (column == 10) {
        expose(covers[coverIndex - 1], coverIndex - 1);
        expose(covers[coverIndex - 10], coverIndex - 10);
        expose(covers[coverIndex + 10], coverIndex + 10);
        expose(covers[coverIndex - 10 - 1], coverIndex - 10 - 1);
        expose(covers[coverIndex + 10 - 1], coverIndex + 10 - 1);
    }
    else {
        expose(covers[coverIndex - 1], coverIndex - 1);
        expose(covers[coverIndex + 1], coverIndex + 1);
        expose(covers[coverIndex - 10], coverIndex - 10);
        expose(covers[coverIndex + 10], coverIndex + 10);
        expose(covers[coverIndex - 10 + 1], coverIndex - 10 + 1);
        expose(covers[coverIndex - 10 - 1], coverIndex - 10 - 1);
        expose(covers[coverIndex + 10 + 1], coverIndex + 10 + 1);
        expose(covers[coverIndex + 10 - 1], coverIndex + 10 - 1);
    }
}


/* EXPOSE THE MULTIPLE COVERS AT THE START */
let startFlag = 0;
function startingExpose(cover, coverIndex) {
    let blast = false;
    let column = coverIndex % 10 + 1;
    let row = Math.floor(coverIndex / 10) + 1;

    let explosiveCount = 0;

    bombposition.forEach(element => {
        if (element[0] == row && element[1] == column) {
            blast = true;
            startFlag--;
        }
        else if ((element[0] <= row + 1) && (element[0] >= row - 1) && (element[1] <= column + 1) && (element[1] >= column - 1)) {
            explosiveCount++;
        }
    });

    if (explosiveCount == 0 && blast == false) {
        exposeNeighbour(coverIndex, row, column);
    }

    if (!blast) {
        cover.style.background = "yellow";
        cover.classList = "cover shield"
        if (explosiveCount != 0) {
            covers[coverIndex].innerHTML = explosiveCount;
        }
    }

    for (; startFlag < 25;) {
        if (!blast) {
            startFlag++;
        }
        let offset = neighbourOffset[Math.floor(Math.random() * 8)];
        coverIndex = Math.abs((coverIndex + offset) % covers.length);
        startingExpose(covers[coverIndex], coverIndex);
    }
}

/*SHOW EXPLOSIVES WHEN GAME IS OVER */
function showexplosives() {
    bombposition.forEach(explosive => {
        let row = explosive[0];
        let column = explosive[1];
        let coverIndex = (row - 1) * 10 + (column - 1)
        covers[coverIndex].style.background = "red";
    })
}

covers.forEach((cover) => {
    cover.style.background = 'greenYellow';
    cover.addEventListener("click", () => {
        if (cover.style.background != "yellow") {
            if (cover.classList != "cover flag") {
                cover.classList = "cover flag";
                cover.style.background = "skyblue";
            }
            else {
                cover.classList = "cover";
                cover.style.background = "greenYellow"
            }
        }

        for (let i = 0; i < covers.length; i++) {
            if (covers[i].style.background == "greenyellow") {
                break;
            }
            else if (i == covers.length - 1) {
                clearInterval(timeInterval)
                document.querySelector(".over").style = "display : flex ; animation-name : dig ; background :  rgba(0, 0, 255, 0.432);";
                document.querySelector(".score").innerHTML = "--WINNER--<br>SCORE : " + time;
            }
        }
    });
});

covers.forEach((cover, coverIndex) => {
    cover.addEventListener("dblclick", exposeCover = () => {
        cover.classList = "cover";
        if (!start) {
            startingExpose(cover, coverIndex);
            start = true;
            timeInterval = setInterval(() => {
                time++;
                score.innerHTML = time;
            }, 1000);
        } else {
            expose(cover, coverIndex);
        }
    });
});