const rRange = document.getElementById("r-range")
const gRange = document.getElementById("g-range")
const bRange = document.getElementById("b-range")
const rNumber = document.getElementById("r-number")
const gNumber = document.getElementById("g-number")
const bNumber = document.getElementById("b-number")
const colorDiv = document.getElementById("color")
const hSpan = document.getElementById("hsl-h")
const sSpan = document.getElementById("hsl-s")
const lSpan = document.getElementById("hsl-l")
const copyHslButton = document.getElementById("copy-hsl")
const toCopyHidden = document.getElementById("to-copy-text")
const isRoundedCheckbox = document.getElementById("checkboxIsRounded")
const displayedPDF = document.getElementById("content-pdf-iframe")  
const highLightedJS = document.getElementById("highlighted-js")
const highLightedTEX = document.getElementById("highlighted-tex")
const highLightedPY = document.getElementById("highlighted-py")
const highLightedTS = document.getElementById("highlighted-ts")
const showPdfLabel = document.getElementById("scc-label-pdf")
const showJSLabel = document.getElementById("scc-label-js")
const showTSLabel = document.getElementById("scc-label-ts")
const showPyLabel = document.getElementById("scc-label-py")
const showLaTexLabel = document.getElementById("scc-label-latex")


let lastHslResults = {}
let head = document.getElementsByClassName("head")[0]

displayedPDF.style.display = "block"
highLightedJS.style.display = "none"
highLightedPY.style.display = "none"
highLightedTEX.style.display = "none"
highLightedTS.style.display = "none"

async function pause(duration) {
  try {
    await new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  } catch (error) {
    console.error('Erreur lors de la pause :', error);
  }
}



async function ajax(url) {
    let toReturnValue
    let isReceived = false
    let toReturn = ""
    const req = new XMLHttpRequest();
    req.addEventListener("load", () => {
        isReceived = true
        toReturnValue =  req.responseText
    });
    req.open("GET", url);
    req.send();
    while (true) {
        if (isReceived) {
            console.log("received")
            return toReturnValue
        }
        await pause(500)
    }
}



function roundNumber(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
}

function changeBgC() {
    let r = rRange.value
    let g = gRange.value
    let b = bRange.value

    rRange.style.backgroundImage = `linear-gradient(90deg, rgb(0, ${g}, ${b}) 0%, rgb(255, ${g}, ${b}) 100%)`
    gRange.style.backgroundImage = `linear-gradient(90deg, rgb(${r}, 0, ${b}) 0%, rgb(${r}, 255, ${b}) 100%)`
    bRange.style.backgroundImage = `linear-gradient(90deg, rgb(${r}, ${g}, 0) 0%, rgb(${r}, ${g}, 255) 100%)`
    
    colorDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    hslResult = rgbToHsl(r, g, b)
    if (isRoundedCheckbox.checked) {
        hslResult.h = roundNumber(hslResult.h, 1)
        hslResult.s = roundNumber(hslResult.s, 1)
        hslResult.l = roundNumber(hslResult.l, 1)
    }
    hSpan.innerHTML = hslResult.h
    sSpan.innerHTML = hslResult.s
    lSpan.innerHTML = hslResult.l
    lastHslResults = hslResult
}

changeBgC()

rRange.addEventListener("input", evt => {
    console.log("changed")
    rNumber.value = rRange.value
    changeBgC()
})

gRange.addEventListener("input", evt => {
    console.log("changed")
    gNumber.value = gRange.value
    changeBgC()
})

bRange.addEventListener("input", evt => {
    console.log("changed")
    bNumber.value = bRange.value
    changeBgC()
})

rNumber.addEventListener("input", evt => {
    console.log("changed")
    rRange.value = rNumber.value
    changeBgC()
})

gNumber.addEventListener("input", evt => {
    console.log("changed")
    gRange.value = gNumber.value
    changeBgC()
})

bNumber.addEventListener("input", evt => {
    console.log("changed")
    bRange.value = bNumber.value
    changeBgC()
})

copyHslButton.addEventListener("click", evt => {
    /* Copy the text */
    toCopyHidden.innerHTML = `hsl(${lastHslResults.h}deg ${lastHslResults.s}% ${lastHslResults.l}%)`
    toCopyHidden.select()
    toCopyHidden.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(toCopyHidden.value);

    /* Show "Copié !" with a green background */
    copyHslButton.innerHTML = "Copié !"
    copyHslButton.style.backgroundColor = "#00B13B"
    setTimeout(() => {
        copyHslButton.innerHTML = "Copier le code HSL"
        copyHslButton.style.backgroundColor = "#CCCCCC"
    }, 2000)
})

copyHslButton.addEventListener("mouseover", evt => {
    const bgColor = getComputedStyle(copyHslButton).getPropertyValue("background-color")
    copyHslButton.style.backgroundColor = (
        bgColor == "rgb(204, 204, 204)" ?
        "#BBBBBB" :
        (
            bgColor == "rgb(0, 177, 59)" ?
            "#00A02A" :
            copyHslButton.backgroundColor
        )
        
    )
})

copyHslButton.addEventListener("mouseout", evt => {
    const bgColor = getComputedStyle(copyHslButton).getPropertyValue("background-color")
    copyHslButton.style.backgroundColor = (
        bgColor == "rgb(187, 187, 187)" ?
        "#CCCCCC" :
        (
            bgColor == "rgb(0, 160, 42)" ?
            "#00B13B" :
            copyHslButton.backgroundColor
        )
        
    )
})

isRoundedCheckbox.addEventListener("click", () => {
    changeBgC()
})


async function loadDocuments(evt) {
    document.removeEventListener("mouseover", loadDocuments)
    highLightedJS.innerHTML = await ajax("main.js")
    highLightedJS.setAttribute("data-highlighted", "")
    highLightedTEX.innerHTML = await ajax("main.tex")
    highLightedTEX.setAttribute("data-highlighted", "")
    highLightedPY.innerHTML = await ajax("main.py")
    highLightedPY.setAttribute("data-highlighted", "")
    highLightedTS.innerHTML = await ajax("main.ts")
    highLightedTS.setAttribute("data-highlighted", "")
    
    
    console.log("loaded")
    hljs.highlightAll()
}

document.addEventListener("mouseover", loadDocuments)

showPdfLabel.addEventListener("click", evt => {
    console.log("pdf")
    displayedPDF.style.display = "block"
    highLightedJS.style.display = "none"
    highLightedPY.style.display = "none"
    highLightedTEX.style.display = "none"
    highLightedTS.style.display = "none"
})

showJSLabel.addEventListener("click", evt => {
    displayedPDF.style.display = "none"
    highLightedJS.style.display = "block"
    highLightedPY.style.display = "none"
    highLightedTEX.style.display = "none"
    highLightedTS.style.display = "none"
})

showPyLabel.addEventListener("click", evt => {
    displayedPDF.style.display = "none"
    highLightedJS.style.display = "none"
    highLightedPY.style.display = "block"
    highLightedTEX.style.display = "none"
    highLightedTS.style.display = "none"
})

showLaTexLabel.addEventListener("click", evt => {
    displayedPDF.style.display = "none"
    highLightedJS.style.display = "none"
    highLightedPY.style.display = "none"
    highLightedTEX.style.display = "block"
    highLightedTS.style.display = "none"
})

showTSLabel.addEventListener("click", evt => {
    displayedPDF.style.display = "none"
    highLightedJS.style.display = "none"
    highLightedPY.style.display = "none"
    highLightedTEX.style.display = "none"
    highLightedTS.style.display = "block    "
})

