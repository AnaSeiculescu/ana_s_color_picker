
let theBigRect = document.getElementById("big-rect");
// let styleTheBigBox = getComputedStyle(theBigRect);
// console.log(styleTheBigBox);

for (let i = 0; i < 360; i += 10) {

    function createColorBox(i) {

        let colorBox = document.createElement("li");
        colorBox.id = i;
        colorBox.style.backgroundColor = "hsl(" + i + ", 100%, 50%)";
        colorBox.style.height = Number(theBigRect.scrollHeight) / 36 - 3 + "px";
        return colorBox;
    }

    document.getElementById("set-color-rect").appendChild(createColorBox(i));
    // console.log(createColorBox(i));

}

let hueNumber = document.getElementById("hue-number");
// console.log(hueNumber);
let selectedHue = document.getElementById("selected-hue");
let textToDisappear = document.getElementById("text-to-disappear");
console.log(textToDisappear);

for (let j = 0; j < 360; j += 10) {

    let colorBtn = document.getElementById(j);

    colorBtn.addEventListener("click", function() {
        hueNumber.innerText = j;
        textToDisappear.style.display = 'none';
        // textToDisappear.innerText = '';
        selectedHue.style.backgroundColor = colorBtn.style.backgroundColor;
        colorBtn.style.border = "2px solid black";
    })

}