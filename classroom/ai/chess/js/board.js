let board = [

["♖","♘","♗","♕","♔","♗","♘","♖"],
["♙","♙","♙","♙","♙","♙","♙","♙"],

["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],

["♟","♟","♟","♟","♟","♟","♟","♟"],
["♜","♞","♝","♛","♚","♝","♞","♜"]

];


let selected=null;

let turn="white";


let movedPieces=[];


let lastMove=null;





function createBoard(){

const chessBoard=document.getElementById("board");

chessBoard.innerHTML="";


for(let y=0;y<8;y++){

for(let x=0;x<8;x++){


let cell=document.createElement("div");

cell.className="cell";


if((x+y)%2===0)
cell.classList.add("light");
else
cell.classList.add("dark");



cell.textContent=board[y][x];

if("♔♕♖♗♘♙".includes(board[y][x])){
    cell.style.color="white";
    cell.style.textShadow="0 0 4px black";
}

if("♚♛♜♝♞♟".includes(board[y][x])){
    cell.style.color="black";
}


cell.dataset.x=x;
cell.dataset.y=y;


cell.onclick=clickCell;


chessBoard.appendChild(cell);


}

}

}






function clickCell(){


let x=Number(this.dataset.x);

let y=Number(this.dataset.y);



if(selected===null){


if(board[y][x] && isMyPiece(board[y][x])){


selected={x,y};
showMoves(x,y);


this.classList.add("selected");


}


}

else{


if(isValidMove(selected.x,selected.y,x,y)){


makeMove(
selected.x,
selected.y,
x,
y
);


changeTurn();


}


selected=null;

createBoard();


}

}







function makeMove(x1,y1,x2,y2){



let piece=board[y1][x1];


let old=board[y2][x2];



board[y2][x2]=piece;

board[y1][x1]="";



// превращение пешки

if(piece==="♙"){

    // ход вперед
    if(dx===0 && dy===-1 && target==="")
        return true;


    // первый ход на 2 клетки
    if(
        dx===0 &&
        dy===-2 &&
        y1===6 &&
        board[5][x1]==="" &&
        board[4][x1]===""
    )
        return true;


    // взятие
    if(
        Math.abs(dx)===1 &&
        dy===-1 &&
        target &&
        isEnemy(target)
    )
        return true;

}


if(piece==="♟"){


    if(dx===0 && dy===1 && target==="")
        return true;



    if(
        dx===0 &&
        dy===2 &&
        y1===1 &&
        board[2][x1]==="" &&
        board[3][x1]===""
    )
        return true;



    if(
        Math.abs(dx)===1 &&
        dy===1 &&
        target &&
        isEnemy(target)
    )
        return true;

}




// запись хода

lastMove={

piece:piece,

fromX:x1,

fromY:y1,

toX:x2,

toY:y2,

captured:old

};



}







function isMyPiece(piece){


if(turn==="white")

return "♔♕♖♗♘♙".includes(piece);


return "♚♛♜♝♞♟".includes(piece);


}






function isEnemy(piece){

return piece && !isMyPiece(piece);

}






function clearPath(x1,y1,x2,y2){


let dx=Math.sign(x2-x1);

let dy=Math.sign(y2-y1);


let x=x1+dx;

let y=y1+dy;


while(x!==x2 || y!==y2){


if(board[y][x]!=="")
return false;


x+=dx;
y+=dy;


}


return true;


}








function isValidMove(x1,y1,x2,y2){


let piece=board[y1][x1];

let target=board[y2][x2];


if(target && !isEnemy(target))
return false;



let dx=x2-x1;

let dy=y2-y1;




// белая пешка

if(piece==="♙"){


if(dx===0 && dy===-1 && target==="")
return true;



if(dx===0 && dy===-2 &&
y1===6 &&
board[5][x1]==="" &&
target==="")
return true;



// обычное взятие

if(Math.abs(dx)===1 &&
dy===-1 &&
target)
return true;



// взятие на проходе

if(
Math.abs(dx)===1 &&
dy===-1 &&
!target &&
lastMove &&
lastMove.piece==="♟" &&
lastMove.fromY===1 &&
lastMove.toY===3 &&
lastMove.toX===x2
)
return true;



}







// черная пешка

if(piece==="♟"){



if(dx===0 && dy===1 && target==="")
return true;



if(dx===0 && dy===2 &&
y1===1 &&
board[2][x1]==="" &&
target==="")
return true;



if(Math.abs(dx)===1 &&
dy===1 &&
target)
return true;




}






// конь

if(piece==="♘" || piece==="♞"){


return (

Math.abs(dx)===2 &&
Math.abs(dy)===1

||

Math.abs(dx)===1 &&
Math.abs(dy)===2

);

}







// король

if(piece==="♔" || piece==="♚"){


return (

Math.abs(dx)<=1 &&
Math.abs(dy)<=1

);

}








// рокировка

if(piece==="♔" || piece==="♚"){


if(
Math.abs(dx)<=1 &&
Math.abs(dy)<=1
){

    let old=board[y2][x2];

    board[y2][x2]=piece;
    board[y1][x1]="";


    let danger=isCheck(
        turn
    );


    board[y1][x1]=piece;
    board[y2][x2]=old;


    return !danger;

}


}





if(piece==="♚" && y1===0 && x1===4){


if(x2===6 &&
!movedPieces.includes("♚") &&
!movedPieces.includes("♜")){


board[0][5]="♜";

board[0][7]="";


return true;


}


}









// ладья

if(piece==="♖" || piece==="♜"){


return (

(dx===0 || dy===0)

&&

clearPath(x1,y1,x2,y2)

);


}







// слон

if(piece==="♗" || piece==="♝"){


return (

Math.abs(dx)===Math.abs(dy)

&&
clearPath(x1,y1,x2,y2)

);


}







// ферзь

if(piece==="♕" || piece==="♛"){


return (

(dx===0 ||
dy===0 ||
Math.abs(dx)===Math.abs(dy))

&&

clearPath(x1,y1,x2,y2)

);


}



return false;


}







function changeTurn(){


let p=board[lastMove.toY][lastMove.toX];


movedPieces.push(p);



turn =
turn==="white"
?
"black"
:
"white";



document.getElementById("turn").textContent =
turn==="white"
?
"Белые"
:
"Чёрные";


}
function findKing(color){


let king =
color==="white"
?
"♔"
:
"♚";


for(let y=0;y<8;y++){

for(let x=0;x<8;x++){


if(board[y][x]===king){

return {
x:x,
y:y
};

}


}

}


}





function isCheck(color){


let king=findKing(color);


if(!king)
return true;



let enemy =
color==="white"
?
"black"
:
"white";



let oldTurn=turn;


turn=enemy;



for(let y=0;y<8;y++){

for(let x=0;x<8;x++){


let piece=board[y][x];


if(piece && isMyPiece(piece)){


if(isValidMove(
x,
y,
king.x,
king.y
)){


turn=oldTurn;

return true;


}


}


}

}


turn=oldTurn;


return false;


}







function hasMoves(color){


let oldTurn=turn;


turn=color;



for(let y1=0;y1<8;y1++){


for(let x1=0;x1<8;x1++){


if(board[y1][x1] &&
isMyPiece(board[y1][x1])){


for(let y2=0;y2<8;y2++){


for(let x2=0;x2<8;x2++){



if(isValidMove(
x1,
y1,
x2,
y2
)){


turn=oldTurn;

return true;


}



}

}


}


}


}


turn=oldTurn;


return false;


}







function checkGame(){


let status=
document.getElementById("status");



if(isCheck(turn)){


if(!hasMoves(turn)){


status.textContent=
"♚ Мат! Победа " +
(turn==="white"
?
"чёрных"
:
"белых");


return;


}


else{


status.textContent="Шах!";


}


}



else{


if(!hasMoves(turn)){


status.textContent=
"Пат! Ничья";


}


else{


status.textContent=
"Игра продолжается";


}


}



}








function newGame(){


board=[

["♜","♞","♝","♛","♚","♝","♞","♜"],
["♟","♟","♟","♟","♟","♟","♟","♟"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["♙","♙","♙","♙","♙","♙","♙","♙"],
["♖","♘","♗","♕","♔","♗","♘","♖"]

];


turn="white";

selected=null;

lastMove=null;

movedPieces=[];


createBoard();


document.getElementById("status")
.textContent=
"Игра продолжается";


}
function showMoves(x,y){

document.querySelectorAll(".cell")
.forEach(c=>c.classList.remove("move"));


document.querySelectorAll(".cell")
.forEach(cell=>{


let tx=Number(cell.dataset.x);
let ty=Number(cell.dataset.y);


if(isValidMove(x,y,tx,ty)){

cell.classList.add("move");

}


});

}