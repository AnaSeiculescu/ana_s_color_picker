
let theBigRect = document.getElementById("big-rect");
// let styleTheBigBox = getComputedStyle(theBigRect);
// console.log(styleTheBigBox);

for (let i = 0; i < 360; i += 10) {

    function createColorBox(i) {

        let colorBox = document.createElement("li");
        colorBox.style.backgroundColor = "hsl(" + i + ", 100%, 50%)";
        colorBox.style.height = Number(theBigRect.scrollHeight) / 36 - 3 + "px";
        return colorBox;
    }

    document.getElementById("set-color-rect").appendChild(createColorBox(i));

}