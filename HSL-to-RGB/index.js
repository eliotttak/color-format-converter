const hRange = $("#h-range")
const sRange = $("#s-range")
const lRange = $("#l-range")
const hNumber = $("#h-number")
const sNumber = $("#s-number")
const lNumber = $("#l-number")
const colorDiv = $("#color")
const rSpan = $("#rgb-r")
const gSpan = $("#rgb-g")
const bSpan = $("#rgb-b")
const copyRgbButton = $("#copy-rgb")
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



let lastRgbResults = {}
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
    let h = hRange.val()
    let s = sRange.val()
    let l = lRange.val()

    hRange.css("background-image", `linear-gradient(90deg, hsl(0deg ${s}% ${l}%) 0%, hsl(60deg ${s}% ${l}%) 16.71%, hsl(120deg ${s}% ${l}%) 33.43%, hsl(180deg ${s}% ${l}%) 50.14%, hsl(240deg ${s}% ${l}%) 66.85%, hsl(300deg ${s}% ${l}%) 83.57%, hsl(359deg ${s}% ${l}%) 100%)`)
    sRange.css("background-image", `linear-gradient(90deg, hsl(${h}deg 0% ${l}%) 0%, hsl(${h}deg 100% ${l}%) 100%)`)
    lRange.css("background-image", `linear-gradient(90deg, hsl(${h}deg ${s}% 0%) 0%, hsl(${h}deg ${s}% 50%) 50%, hsl(${h}deg ${s}% 100%) 100%)`)
    
    colorDiv.css("background-color", `hsl(${h}deg ${s}% ${l}%)`)
    rgbResult = hslToRgb(h, s, l)
    if (isRoundedCheckbox.is(":checked")) {
        rgbResult.r = roundNumber(rgbResult.r, 1)
        rgbResult.g = roundNumber(rgbResult.g, 1)
        rgbResult.b = roundNumber(rgbResult.b, 1)
    }
    console.log(rgbResult)
    rSpan.html(rgbResult.r)
    gSpan.html(rgbResult.g)
    bSpan.html(rgbResult.b)
    lastRgbResults = rgbResult
}

changeBgC()


hRange.on("input", evt => {
    console.log("changed")
    hNumber.val(hRange.val())
    changeBgC()
})

sRange.on("input", evt => {
    console.log("changed")
    sNumber.val(sRange.val())
    changeBgC()
})

lRange.on("input", evt => {
    console.log("changed")
    lNumber.val(lRange.val())
    changeBgC()
})

hNumber.on("input", evt => {
    console.log("changed")
    hRange.val(hNumber.val())
    changeBgC()
})

sNumber.on("input", evt => {
    console.log("changed")
    sRange.val(sNumber.val())
    changeBgC()
})

lNumber.on("input", evt => {
    console.log("changed")
    lRange.val(lNumber.val())
    changeBgC()
})

copyRgbButton.on("click", evt => {
    /* Copy the text */
    toCopyHidden.html(`rgb(${lastRgbResults.r}, ${lastRgbResults.g}, ${lastRgbResults.b})`)
    toCopyHidden.select()
    toCopyHidden.get(0).setSelectionRange(0, 99999);
    navigator.clipboard.writeText(toCopyHidden.val());

    /* Show "Copié !" with a green background */
    copyRgbButton.html("Copié !")
    copyRgbButton.css("background-color", "#00B13B")
    setTimeout(() => {
        copyRgbButton.html("Copier le code HSL")
        copyRgbButton.css("background-color", "#CCCCCC")
    }, 2000)
})

copyRgbButton.on("mouseover", evt => {
    const bgColor = copyRgbButton.css("background-color")
    copyRgbButton.css("background-color", (
        bgColor == "rgb(204, 204, 204)" ?
        "#BBBBBB" :
        (
            bgColor == "rgb(0, 177, 59)" ?
            "#00A02A" :
            copyRgbButton.css("background-color")
        )
        
    ))
})

copyRgbButton.on("mouseout", evt => {
    const bgColor = copyRgbButton.css("background-color")
    copyRgbButton.css("backgroundColor", (
        bgColor == "rgb(187, 187, 187)" ?
        "#CCCCCC" :
        (
            bgColor == "rgb(0, 160, 42)" ?
            "#00B13B" :
            copyRgbButton.css("background-color")
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

