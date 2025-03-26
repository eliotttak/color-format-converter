const cRange = $("#c-range")
const mRange = $("#m-range")
const yRange = $("#y-range")
const kRange = $("#k-range")
const cNumber = $("#c-number")
const mNumber = $("#m-number")
const yNumber = $("#y-number")
const kNumber = $("#k-number")
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
const contentDlExe = $("#content-dl-exe")
const showPdfLabel = $("#scc-label-pdf")
const showJSLabel = $("#scc-label-js")
const showTSLabel = $("#scc-label-ts")
const showPyLabel = $("#scc-label-py")
const showLaTexLabel = $("#scc-label-latex")
const showCLabel = $("#scc-label-c")
const showExeLabel = $("#scc-label-exe")



let lastRgbResult = {}
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
    let c = cRange.val()
    let m = mRange.val()
    let y = yRange.val()
    let k = kRange.val()

    rgbResult = cmykToRgb(c, m, y, k)

    cRange.css("background-image", `linear-gradient(90deg, rgb(${cmykToRgb(0, m, y, k).r}, ${cmykToRgb(0, m, y, k).g}, ${cmykToRgb(0, m, y, k).b}) 0%, rgb(${cmykToRgb(255, m, y, k).r}, ${cmykToRgb(255, m, y, k).g}, ${cmykToRgb(255, m, y, k).b}) 100%)`)
    mRange.css("background-image", `linear-gradient(90deg, rgb(${cmykToRgb(c, 0, y, k).r}, ${cmykToRgb(c, 0, y, k).g}, ${cmykToRgb(c, 0, y, k).b}) 0%, rgb(${cmykToRgb(c, 255, y, k).r}, ${cmykToRgb(c, 255, y, k).g}, ${cmykToRgb(c, 255, y, k).b}) 100%)`)
    yRange.css("background-image", `linear-gradient(90deg, rgb(${cmykToRgb(c, m, 0, k).r}, ${cmykToRgb(c, m, 0, k).g}, ${cmykToRgb(c, m, 0, k).b}) 0%, rgb(${cmykToRgb(c, m, 255, k).r}, ${cmykToRgb(c, m, 255, k).g}, ${cmykToRgb(c, m, 255, k).b}) 100%)`)
    kRange.css("background-image", `linear-gradient(90deg, rgb(${cmykToRgb(c, m, y, 0).r}, ${cmykToRgb(c, m, y, 0).g}, ${cmykToRgb(c, m, y, 0).b}) 0%, rgb(${cmykToRgb(c, m, y, 255).r}, ${cmykToRgb(c, m, y, 255).g}, ${cmykToRgb(c, m, y, 255).b}) 100%)`)
    
    colorDiv.css("background-color", `rgb(${rgbResult.r}, ${rgbResult.g}, ${rgbResult.b})`)
    if (isRoundedCheckbox.is(":checked")) {
        rgbResult.r = roundNumber(rgbResult.r, 1)
        rgbResult.g = roundNumber(rgbResult.g, 1)
        rgbResult.b = roundNumber(rgbResult.b, 1)
    }
    rSpan.html(rgbResult.r)
    gSpan.html(rgbResult.g)
    bSpan.html(rgbResult.b)
    lastRgbResult = rgbResult
}

changeBgC()


cRange.on("input", evt => {
    console.log("changed")
    cNumber.val(cRange.val())
    changeBgC()
})

mRange.on("input", evt => {
    console.log("changed")
    mNumber.val(mRange.val())
    changeBgC()
})

yRange.on("input", evt => {
    console.log("changed")
    yNumber.val(yRange.val())
    changeBgC()
})

kRange.on("input", evt => {
    console.log("changed")
    kNumber.val(kRange.val())
    changeBgC()
})

cNumber.on("input", evt => {
    console.log("changed")
    cRange.val(cNumber.val())
    changeBgC()
})

mNumber.on("input", evt => {
    console.log("changed")
    mRange.val(mNumber.val())
    changeBgC()
})

yNumber.on("input", evt => {
    console.log("changed")
    yRange.val(yNumber.val())
    changeBgC()
})

kNumber.on("input", evt => {
    console.log("changed")
    kRange.val(kNumber.val())
    changeBgC()
})

copyRgbButton.on("click", evt => {
    /* Copy the text */
    toCopyHidden.html(`rgb(${lastRgbResult.r}, ${lastRgbResult.g}, ${lastRgbResult.b})`)
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
    highLightedJS.html(await ajax("/CMYK-to-RGB/main.js"))
    highLightedJS.attr("data-highlighted", "")
    highLightedTEX.html(await ajax("/CMYK-to-RGB/main.tex"))
    highLightedTEX.attr("data-highlighted", "")
    highLightedPY.html(await ajax("/CMYK-to-RGB/main.py"))
    highLightedPY.attr("data-highlighted", "")
    highLightedTS.html(await ajax("/CMYK-to-RGB/main.ts"))
    highLightedTS.attr("data-highlighted", "")
    const CData = await ajax("/CMYK-to-RGB/C/main.c")
    highLightedC.html(CData.replaceAll("<", "&lt;").replaceAll(">", "&gt"))
    //highLightedC.html(highLightedC.html().replaceAll("<", "&lt;").replaceAll(">", "&gt;"))
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
    contentDlExe.css("display", "none")
})

showJSLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "block")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
})

showPyLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "block")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
})

showLaTexLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "block")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
})

showTSLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "block")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
})

showCLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "block")
    contentDlExe.css("display", "none")
})

showExeLabel.on("click", evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "block")
})