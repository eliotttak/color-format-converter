const rRange = $("#r-range")
const gRange = $("#g-range")
const bRange = $("#b-range")
const rNumber = $("#r-number")
const gNumber = $("#g-number")
const bNumber = $("#b-number")
const colorDiv = $("#color")
const hSpan = $("#hsl-h")
const sSpan = $("#hsl-s")
const lSpan = $("#hsl-l")
const copyHslButton = $("#copy-hsl")
const toCopyHidden = $("#to-copy-text")
const isRoundedCheckbox = $("#checkboxIsRounded")
const displayedPDF = $("#content-pdf-iframe") 
const highLightedJS = $("#highlighted-js")
const highLightedTEX = $("#highlighted-tex")
const highLightedPY = $("#highlighted-py")
const highLightedTS = $("#highlighted-ts")
const highLightedC = $("#highlighted-c")
const contentHlJS = $("#content-hl-js")
const contentHlTS = $("#content-hl-ts")
const contentHlTEX = $("#content-hl-tex")
const contentHlPY = $("#content-hl-py")
const contentHlC = $("#content-hl-c")
const showPdfLabel = $("#scc-label-pdf")
const showJSLabel = $("#scc-label-js")
const showTSLabel = $("#scc-label-ts")
const showPyLabel = $("#scc-label-py")
const showLaTexLabel = $("#scc-label-latex")
const showCLabel = $("#scc-label-c")



let lastHslResults = {}
let head = $(".head")[0]

displayedPDF.css("display", "block")
contentHlJS.css("display", "none")
contentHlPY.css("display", "none")
contentHlTEX.css("display", "none")
contentHlTS.css("display", "none")
contentHlC.css("display", "none")


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
    $.get(url, data => {
        isReceived = true
        toReturnValue =  data
    });
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
    let r = rRange.val()
    let g = gRange.val()
    let b = bRange.val()

    rRange.css("background-image", `linear-gradient(90deg, rgb(0, ${g}, ${b}) 0%, rgb(255, ${g}, ${b}) 100%)`)
    gRange.css("background-image", `linear-gradient(90deg, rgb(${r}, 0, ${b}) 0%, rgb(${r}, 255, ${b}) 100%)`)
    bRange.css("background-image", `linear-gradient(90deg, rgb(${r}, ${g}, 0) 0%, rgb(${r}, ${g}, 255) 100%)`)
    
    colorDiv.css("background-color", `rgb(${r}, ${g}, ${b})`)
    hslResult = rgbToHsl(r, g, b)
    if (isRoundedCheckbox.is(":checked")) {
        hslResult.h = roundNumber(hslResult.h, 1)
        hslResult.s = roundNumber(hslResult.s, 1)
        hslResult.l = roundNumber(hslResult.l, 1)
    }
    hSpan.html(hslResult.h)
    sSpan.html(hslResult.s)
    lSpan.html(hslResult.l)
    lastHslResults = hslResult
}

changeBgC()


rRange.on("input", evt => {
    console.log("changed")
    rNumber.val(rRange.val())
    changeBgC()
})

gRange.on("input", evt => {
    console.log("changed")
    gNumber.val(gRange.val())
    changeBgC()
})

bRange.on("input", evt => {
    console.log("changed")
    bNumber.val(bRange.val())
    changeBgC()
})

rNumber.on("input", evt => {
    console.log("changed")
    rRange.val(rNumber.val())
    changeBgC()
})

gNumber.on("input", evt => {
    console.log("changed")
    gRange.val(gNumber.val())
    changeBgC()
})

bNumber.on("input", evt => {
    console.log("changed")
    bRange.val(bNumber.val())
    changeBgC()
})

copyHslButton.on("click", evt => {
    /* Copy the text */
    toCopyHidden.html(`hsl(${lastHslResults.h}deg ${lastHslResults.s}% ${lastHslResults.l}%)`)
    toCopyHidden.select()
    toCopyHidden.get(0).setSelectionRange(0, 99999);
    navigator.clipboard.writeText(toCopyHidden.val());

    /* Show "Copié !" with a green background */
    copyHslButton.html("Copié !")
    copyHslButton.css("background-color", "#00B13B")
    setTimeout(() => {
        copyHslButton.html("Copier le code HSL")
        copyHslButton.css("background-color", "#CCCCCC")
    }, 2000)
})

copyHslButton.on("mouseover", evt => {
    const bgColor = copyHslButton.css("background-color")
    copyHslButton.css("background-color", (
        bgColor == "rgb(204, 204, 204)" ?
        "#BBBBBB" :
        (
            bgColor == "rgb(0, 177, 59)" ?
            "#00A02A" :
            copyHslButton.css("background-color")
        )
        
    ))
})

copyHslButton.on("mouseout", evt => {
    const bgColor = copyHslButton.css("background-color")
    copyHslButton.css("backgroundColor", (
        bgColor == "rgb(187, 187, 187)" ?
        "#CCCCCC" :
        (
            bgColor == "rgb(0, 160, 42)" ?
            "#00B13B" :
            copyHslButton.css("background-color")
        )
        
    ))
})

isRoundedCheckbox.on("click", () => {
    changeBgC()
})


async function loadDocuments(evt) {
    $(document).off("mouseover")
    highLightedJS.html(await ajax("main.js"))
    highLightedJS.attr("data-highlighted", "")
    highLightedTEX.html(await ajax("main.tex"))
    highLightedTEX.attr("data-highlighted", "")
    highLightedPY.html(await ajax("main.py"))
    highLightedPY.attr("data-highlighted", "")
    highLightedTS.html(await ajax("main.ts"))
    highLightedTS.attr("data-highlighted", "")
    highLightedC.html(await ajax("main.c"))
    highLightedC.html(highLightedC.html().replaceAll("<", "&lt;").replaceAll(">", "&gt;"))
    highLightedC.attr("data-highlighted", "")
    console.log("loaded")
    hljs.highlightAll()
    highLightedC.html(highLightedC.html().replaceAll("&lt;/math.h&gt;&lt;/stdio.h&gt;", ""))
}

$(document).on("mouseover", loadDocuments)

showPdfLabel.on("click", evt => {
    console.log("pdf")
    displayedPDF.css("display", "block")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
})

showJSLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "block")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
})

showPyLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "block")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
})

showLaTexLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "block")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
})

showTSLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "block")
    contentHlC.css("display", "none")
})

showCLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "block")
})

