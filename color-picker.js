
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

let storageArr = [];

addToFavBtn.addEventListener("click", function() {

    favorites.style.opacity = "1";
    favorites.style.transition = "opacity 2s";

    let colorBoxSaved = document.createElement("div");
    colorBoxSaved.id = hslColorValue_text.innerText;
    colorBoxSaved.classList.add("favoriteColor");

    console.log("id-ul este:");
    console.log(colorBoxSaved.id);

    colorBoxSaved.style.height = "25px";
    let favoriteColors = document.getElementsByClassName("favoriteColor");
    if (listFavColors.hasChildNodes() == 0) {
        listFavColors.appendChild(colorBoxSaved);
    } else {
        listFavColors.insertBefore(colorBoxSaved, favoriteColors[0]);
    }

    let savedColor = document.createElement("div");
    savedColor.style.height = "25px";
    savedColor.style.backgroundColor = selectedColor.style.backgroundColor;

    let savedColor_hsl = document.createElement("p");
    savedColor_hsl.innerText = hslColorValue_text.innerText;

    storageArr.push(savedColor_hsl.innerText);
    localStorage.setItem("storageArr", JSON.stringify(storageArr));
    console.log("storageArr = " + storageArr);
    console.log(typeof(storageArr));

    savedColor_hsl.classList.add("text-indicates-hsl");
    savedColor.appendChild(savedColor_hsl);

    let savedColor_copyBtn = document.createElement("div");
    let savedColor_copyBtn_copyText = document.createElement("p");
    savedColor_copyBtn_copyText.classList.add("indicates-color-copy-btn");
    savedColor_copyBtn_copyText.innerText = "copy hsl";
    savedColor_copyBtn.appendChild(savedColor_copyBtn_copyText);

    savedColor_copyBtn.classList.add("fa-solid");
    savedColor_copyBtn.classList.add("fa-clone");
    savedColor_copyBtn.classList.add("fa-lg");

    const deleteBtn = addDeleteBox();
    const id = hslColorValue_text.innerText;

    colorBoxSaved.appendChild(savedColor_copyBtn);
    colorBoxSaved.appendChild(savedColor);
    colorBoxSaved.appendChild(deleteBtn);

    savedColor_copyBtn.addEventListener("click", function() {
        savedColor_hsl.innerText.select;
        navigator.clipboard.writeText(savedColor_hsl.innerText);
    })

    deleteColorItem(deleteBtn, id);

})

addToFavBtn.addEventListener("mousedown", function(ev) {
    addToFavBtn.style.border = "4px solid lightslategray";
})

addToFavBtn.addEventListener("mouseup", function(ev) {
    addToFavBtn.style.border = "2px solid lightslategray";
})

function addDeleteBox() {
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("fa-solid");
    deleteBtn.classList.add("fa-circle-xmark");
    deleteBtn.classList.add("fa-lg");
    deleteBtn.style.color = "#000000";
    return deleteBtn;
}

function deleteColorItem(deleteBtn, id) {
    deleteBtn.addEventListener("click", function() {

        console.log("s-a bifat delete");
        console.log('id: ', id)

        let colorItemToDelete = document.getElementById(id);

        for (let i = 0; i < storageArr.length; i++) {
            if (storageArr[i].trim() === colorItemToDelete.id) {
                storageArr.splice(i, 1);
                break;
            }
        }
        colorItemToDelete.remove();
        localStorage.setItem("storageArr", JSON.stringify(storageArr));

        console.log("storageArr este: ");
        console.log(storageArr);
    })
}

let defaultHue = document.getElementById(0);

let storageExtraction

jQuery(document).ready(function() {
    jQuery(defaultHue).ready(function() {
        jQuery(this).click();
        hueNumber.innerText = 0;
        hueValue.style.backgroundColor = defaultHue.style.backgroundColor;
        defaultHue.style.border = "2px solid black";
        createGridForHue(0);
    });

    if (typeof(Storage) !== "undefined") {
    
        storageExtraction = JSON.parse(localStorage.getItem("storageArr"));
    
        console.log(typeof storageExtraction);
    
        console.log(storageExtraction);
    
    } else {
        console.log("Storage is undefined");
    }

    for (let hue = 0; hue < storageExtraction.length; hue++) {
        
        recreateFavoriteColorsList(storageExtraction[hue]);

        storageArr.push(storageExtraction[hue]);

    }

});

function recreateFavoriteColorsList(param) {
    favorites.style.opacity = "1";
    favorites.style.transition = "opacity 2s";

    let colorBoxSaved = document.createElement("div");

    colorBoxSaved.id = param;
    colorBoxSaved.classList.add("favoriteColor");
  
    colorBoxSaved.style.height = "25px";
    // listFavColors.appendChild(colorBoxSaved);
    
    let favoriteColors = document.getElementsByClassName("favoriteColor");
    if (listFavColors.hasChildNodes() == 0) {
        listFavColors.appendChild(colorBoxSaved);
    } else {
        listFavColors.insertBefore(colorBoxSaved, favoriteColors[0]);
    }

    let savedColor = document.createElement("div");
    savedColor.style.height = "25px";
    savedColor.style.backgroundColor = param;

    let savedColor_hsl = document.createElement("p");
    savedColor_hsl.innerText = param;

    savedColor_hsl.classList.add("text-indicates-hsl");
    savedColor.appendChild(savedColor_hsl);

    let savedColor_copyBtn = document.createElement("div");
    let savedColor_copyBtn_copyText = document.createElement("p");
    savedColor_copyBtn_copyText.classList.add("indicates-color-copy-btn");
    savedColor_copyBtn_copyText.innerText = "copy hsl";
    savedColor_copyBtn.appendChild(savedColor_copyBtn_copyText);

    savedColor_copyBtn.classList.add("fa-solid");
    savedColor_copyBtn.classList.add("fa-clone");
    savedColor_copyBtn.classList.add("fa-lg");


    const deleteBtn = addDeleteBox();

    colorBoxSaved.appendChild(savedColor_copyBtn);
    colorBoxSaved.appendChild(savedColor);
    colorBoxSaved.appendChild(deleteBtn);

    savedColor_copyBtn.addEventListener("click", function() {
        savedColor_hsl.innerText.select;
        navigator.clipboard.writeText(savedColor_hsl.innerText);
    })


    deleteColorItem(deleteBtn, param);
}

