
let theBigRect = document.getElementById("big-rect");

for (let i = 0; i < 360; i += 10) {

    function createColorBox(i) {

        let colorBox = document.createElement("li");
        colorBox.id = i;
        colorBox.style.backgroundColor = "hsl(" + i + ", 100%, 50%)";
        return colorBox;
    }

    document.getElementById("batch-colors-rect").appendChild(createColorBox(i));
}

let hueNumber = document.getElementById("hue-number");
let selectedHue = document.getElementById("selected-hue");
let textToDisappear = document.getElementById("text-to-disappear");
console.log(textToDisappear);

for (let j = 0; j < 360; j += 10) {

    let colorBtn = document.getElementById(j);
    colorBtn.addEventListener("click", function() {
        for (let k = 0; k < 360; k += 10) {
            let borderVerif = document.getElementById(k);
            if (borderVerif.style.border == "2px solid black") {
                borderVerif.style.border = null;
            }
        }
        hueNumber.innerText = j;
        textToDisappear.style.display = 'none';
        selectedHue.style.backgroundColor = colorBtn.style.backgroundColor;
        colorBtn.style.border = "2px solid black";
    })

}