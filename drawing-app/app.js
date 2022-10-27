const modeBtn = document.getElementById("mode-btn");
const eraseBtn = document.getElementById("erase-btn");
const destroyBtn = document.getElementById("destroy-btn");
const saveBtn = document.getElementById("save-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line-width");
const lineColor = document.getElementById("line-color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // webGL == 3d for graphic

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";

// 초기 캔버스 흰 바탕 설정
ctx.save();
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.restore();

let isPainting = false;
let isFilling = false;

// canvas (0, 0) == right top

// // ctx.fillRect(50, 50, 100, 200); // Shortcut function - Canvas.fillRect(x, y, width, height)

// // create the lines
// ctx.rect(50, 50, 100, 100); // Shortcut function - Canvas.rect(x, y, width, height);
// ctx.rect(150, 150, 100, 100);

// ctx.fill(); // 순서대로 실행된 후, 다음 문에는 영향을 주지 않는다.

// ctx.beginPath(); // Separate path
// ctx.rect(250, 250, 100, 100);
// ctx.rect(350, 350, 100, 100);
// ctx.stroke();
// ctx.fillStyle = "red";
// ctx.fill();


// ctx.moveTo(50, 50); // Move painting brush - Canvas.moveTo(x, y);

// ctx.lineTo(150, 50); // 도착 좌표
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);

// ctx.stroke();
// ctx.fill();

// ctx.beginPath();


// // Drawing A House
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);

// ctx.beginPath(); // context 순서 염두
// ctx.lineWidth = 2;
// ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20)

// ctx.beginPath();
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.lineTo(200, 200);
// ctx.fillStyle = "red"
// ctx.fill();


// // Drawing A Person
// ctx.fillRect(200 - 10, 200, 15, 100);
// ctx.fillRect(350 - 10, 200, 15, 100);
// ctx.fillRect(255 - 10, 200, 60, 200)

// ctx.arc(280 - 10, 120, 50, 0, 2 * Math.PI) // Canvas.arc(x, y, radius, startAngle, endAngle) !! startAngle start from left center
// // 0.5*PI == 90deg
// ctx.fill();

// ctx.beginPath();
// ctx.arc(250, 120, 6, 1 * Math.PI, 0 * Math.PI);
// ctx.strokeStyle = "white";
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(290, 120, 6, 1 * Math.PI, 0 * Math.PI);
// ctx.strokeStyle = "white";
// ctx.stroke();


// // Mousemove Random Drawing
// ctx.lineWidth = 2;

// const colors = ['#40407a', '#706fd3', '#f7f1e3', '#34ace0', '#33d9b2', '#40407a', '#706fd3', '#f7f1e3', '#34ace0', '#33d9b2']

// function onClick(event) {
//     const {offsetX: x, offsetY: y} = event;
//     const color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.beginPath();
//     ctx.moveTo(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800));

//     ctx.strokeStyle = color;
    
//     ctx.lineTo(x, y);
//     ctx.stroke();
// }

// canvas.addEventListener('mousemove', onClick);



const onMouseMove = (e) => {
    if (isPainting) {
        ctx.lineWidth = lineWidth.value;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX, e.offsetY)
};

const onCanvasClick = (e) => {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

const startPainting = (e) => {
    isPainting = true;
};

const cancelPainting = (e) => {
    isPainting = false;
    ctx.beginPath();
};

const changeLineWidth = (e) => {
    ctx.lineWidth = e.target.value;
}

const changeLineColor = (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

const onColorClick = (e) => {
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    lineColor.value = colorValue;
}

const onModeClick = (e) => {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "💧 Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "🖊 Draw";
    }
}

const onDestroyClick = (e) => {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

const onEraseClick = (e) => {
    isFilling = false;
    modeBtn.innerText = "Fill";
    ctx.strokeStyle = "#FFF";
}

const onSaveClick = (e) => {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrowing.png";
    a.click();
}

const onChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // Canvas.drawImage(imageURL, x, y, width, height)
        fileInput.value = null;
    }
}

const onDoubleClick = (e) => {
    if (text !== '') {
        ctx.save(); // ctx 의 현재 상태 저장
        const text = textInput.value;
        ctx.lineWidth = 1;
        ctx.font = "48px serif"
        ctx.fillText(text, e.offsetX, e.offsetY);
        ctx.restore(); // ctx의 이전 상태 복원
    }
}

const onMouseDragStart = (e) => {};
const onMouseDragEnd = (e) => {};

// canvas.onmousemove = function () {} // 같은 이벤트 안에 여러가지 이벤트를 넣을 수 없음
canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', startPainting); // click == down and up
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);
// document.addEventListener('mouseup', onMouseUp) // also works (if mouse out)
lineWidth.addEventListener('change', changeLineWidth);
lineColor.addEventListener('change', changeLineColor);

colorOptions.forEach((i)=>{
    i.addEventListener('click', onColorClick)
});

modeBtn.addEventListener('click', onModeClick);
eraseBtn.addEventListener('click', onEraseClick);
destroyBtn.addEventListener('click', onDestroyClick);
saveBtn.addEventListener('click', onSaveClick);
fileInput.addEventListener('change', onChange);