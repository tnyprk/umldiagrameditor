
function drawGrab(x, y, panel)  {
    const size = 5;
    const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("x", x - size / 2);
    square.setAttribute("y", y - size / 2);
    square.setAttribute("width", size);
    square.setAttribute("height", size);
    square.setAttribute("fill", "black");
    panel.appendChild(square);
}

function selecter(){
    let x = 0;
    let y = 0;
    return {
        getType:()=>{
            return "SELECT"
        },
        getSize:()=>{
            return 25
        },
        translate :(dx,dy)=>{
            x = dx
            y = dy
        },
        clone:()=>{
            let clone = selecter();
            clone.translate(x,y)
            return clone
        },
        draw:(panel)=>{
            drawGrab(x,y,panel)
            drawGrab(x + 25,y,panel)
            drawGrab(x,y + 25,panel)
            drawGrab(x + 25,y + 25,panel)
        }
    }
}