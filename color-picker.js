
let theBigRect = document.getElementById("big-rect");

function createColorBox(hue) {

    let colorBox = document.createElement("li");
    colorBox.id = hue;
    colorBox.style.backgroundColor = "hsl(" + hue + ", 100%, 50%)";

    colorBox.addEventListener("click", function() {
        for (let k = 0; k < 360; k += 10) {
            let borderVerif = document.getElementById(k);
            if (borderVerif.style.border == "2px solid black") {
                borderVerif.style.border = null;
            }
        }
        hueNumber.innerText = hue;
        hueValue.style.backgroundColor = colorBox.style.backgroundColor;
        colorBox.style.border = "2px solid black";

        if (gridColors.hasChildNodes()) {
            gridColors.innerHTML = "";
        }

        createGridForHue(hue);

    })

    return colorBox;

}

for (let i = 0; i < 360; i += 10) {

    document.getElementById("batch-colors-rect").appendChild(createColorBox(i));
}

let hueNumber = document.getElementById("hue-number");
let selectedColor = document.getElementById("selected-color");
let hueValue = document.getElementById("hue-value");

let gridColors = document.getElementById("big-rect");
let hslColorValue = document.getElementById("hsl-color-value");

function createGridForHue(param) {

    let gridColorItems = [];

    for (let n = 0; n < 100; n += 12.5) {  //lightness

        for (let m = 0; m <= 100; m += 14.2857) {   //saturation
            
            let item = []

            let colorItem = document.createElement("div");
            let saturation = Math.round(m);
            colorItem.style.backgroundColor = `hsl(${param}, ${saturation}%, ${n}%)`;

            item.push(colorItem);
            item.push(`hsl(${param}, ${saturation}%, ${n}%)`);

            gridColors.appendChild(colorItem);
            gridColorItems.push(item);

            // hslColorValue.innerText = `hsl(${param}, ${m}%, ${n}%)`;

        }

    }

    console.log(gridColorItems);

    for (let i = 0; i < gridColorItems.length; i++) {
        gridColorItems[i][0].addEventListener("click", function() {
            for (let j = 0; j < gridColorItems.length; j++) {
                if (gridColorItems[j][0].style.border != "") {
                    gridColorItems[j][0].style.border = "";
                }
            }
            gridColorItems[i][0].style.border = "4px solid white";
            selectedColor.style.backgroundColor = gridColorItems[i][0].style.backgroundColor;
            selectedColor.innerText = gridColorItems[i][1];
        })
    }

}

let defaultHue = document.getElementById(0);

jQuery(document).ready(function() {
    jQuery(defaultHue).ready(function() {
        jQuery(this).click();
        hueNumber.innerText = 0;
        hueValue.style.backgroundColor = defaultHue.style.backgroundColor;
        defaultHue.style.border = "2px solid black";

        createGridForHue(0);
    
        console.log(gridColors);
    });
});

