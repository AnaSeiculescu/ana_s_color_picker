
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
let hueValue = document.getElementById("hue-value");
let gridColors = document.getElementById("big-rect");
let selectedColor = document.getElementById("selected-color");
let btnsForPickedColor = document.getElementById("buttons-for-picked-color");
let hslColorValue = document.getElementById("hsl-color-value");
let hslColorValue_text = document.getElementById("hsl-color-value-text");
let addToFavBtn = document.getElementById("add-to-fav-button");
let copyToClipboardBtn = document.getElementById("copy-to-clipboard");

let favorites = document.getElementById("favorites");

let favoritesHeader = document.getElementById("favorites-header");

let listFavColors = document.getElementById("favorite-colors-list");

let content = document.getElementById("content");

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
            
            btnsForPickedColor.style.display= "grid";
            addToFavBtn.style.border = "2px solid black";
            hslColorValue_text.innerText = gridColorItems[i][1];

            copyToClipboardBtn.classList.add("fa-solid");
            copyToClipboardBtn.classList.add("fa-clone");
            copyToClipboardBtn.classList.add("fa-lg");

            console.log("gridColorItems[i][1] = " + gridColorItems[i][1]);

        })
    }

}

copyToClipboardBtn.addEventListener("click", function() {
    hslColorValue_text.innerText.select;
    navigator.clipboard.writeText(hslColorValue_text.innerText);
})

addToFavBtn.addEventListener("click", function() {

    favorites.style.transition = "width 2s";
    favorites.style.display = "grid";

    let colorBoxSaved = document.createElement("div");
    colorBoxSaved.style.height = "25px";
    listFavColors.appendChild(colorBoxSaved);

    let savedColor = document.createElement("div");
    savedColor.style.height = "25px";


    let savedColor_hsl = document.createElement("p");
    savedColor_hsl.innerText = hslColorValue_text.innerText;
    savedColor_hsl.classList.add("text-indicates-hsl");
    savedColor.appendChild(savedColor_hsl);

    let savedColor_copyBtn = document.createElement("div");
    let savedColor_copyBtn_copyText = document.createElement("p");
    savedColor_copyBtn_copyText.classList.add("indicates-color-copy-btn");
    savedColor_copyBtn_copyText.innerText = "copy hsl";
    savedColor_copyBtn.appendChild(savedColor_copyBtn_copyText);

    savedColor.style.backgroundColor = selectedColor.style.backgroundColor;

    savedColor_copyBtn.classList.add("fa-solid");
    savedColor_copyBtn.classList.add("fa-clone");
    savedColor_copyBtn.classList.add("fa-lg");

    colorBoxSaved.appendChild(savedColor);
    colorBoxSaved.appendChild(savedColor_copyBtn);

    savedColor_copyBtn.addEventListener("click", function() {
        savedColor_hsl.innerText.select;
        navigator.clipboard.writeText(savedColor_hsl.innerText);
    })

    return colorBoxSaved;
})

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

