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
const chooseTabUnderline = $("#choose-tab-underline")




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
    clipboard.writeText(`rgb(${lastRgbResult.r}, ${lastRgbResult.g}, ${lastRgbResult.b})`)

    /* Show "Copié !" with a green background */
    copyRgbButton.html("Copié !")
    copyRgbButton.css("background-color", "#00B13B")
    setTimeout(() => {
        copyRgbButton.html("Copier le code RGB")
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
    debugger
    $(document).off("mouseover")
    highLightedJS.html(await ajax("/CMYK-to-RGB/main.js"))
    highLightedJS.attr("data-highlighted", "")
    highLightedTEX.html(await ajax("/CMYK-to-RGB/main.tex"))
    highLightedTEX.attr("data-highlighted", "")
    highLightedPY.html(await ajax("/CMYK-to-RGB/Python/cmyk_rgb_all.py  "))
    highLightedPY.attr("data-highlighted", "")
    highLightedTS.html(await ajax("/CMYK-to-RGB/main.ts"))
    highLightedTS.attr("data-highlighted", "")
    const CData = await ajax("/CMYK-to-RGB/C/cmyk-rgb-all.c")
    highLightedC.html(CData.replaceAll("<", "&lt;").replaceAll(">", "&gt"))
    //highLightedC.html(highLightedC.html().replaceAll("<", "&lt;").replaceAll(">", "&gt;"))
    highLightedC.attr("data-highlighted", "")
    console.log("loaded")
    hljs.highlightAll()
    highLightedC.html(highLightedC.html().replaceAll("&lt;/math.h&gt;&lt;/stdio.h&gt;", ""))
}

$(document).on("mouseover", loadDocuments)

showPdfLabel.on("click", async evt => {
    console.log("pdf")
    displayedPDF.css("display", "block")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
    
    chooseTabUnderline.css("width", `${showPdfLabel.width()}px`)
    chooseTabUnderline.css("top", `${showPdfLabel.height() + showPdfLabel.offset().top + 2}px`)

    while (true) {
    
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showPdfLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showPdfLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showPdfLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left - 2}px`)
        await pause(.03125)
    }

    //chooseTabUnderline.css("left", `${showPdfLabel.offset().left}px`)
    console.log("end pdf")
})

showJSLabel.on("click", async evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "block")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
    
    chooseTabUnderline.css("width", `${showJSLabel.width()}px`)
    chooseTabUnderline.css("top", `${showJSLabel.height() + showJSLabel.offset().top + 2}px`)

    while (true) {
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showJSLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showJSLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showJSLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left > showJSLabel.offset().left ? chooseTabUnderline.offset().left - 2 : chooseTabUnderline.offset().left + 2}px`)
        await pause(.03125)
    }
})

showPyLabel.on("click", async evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "block")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
   
    chooseTabUnderline.css("width", `${showPyLabel.width()}px`)
    chooseTabUnderline.css("top", `${showPyLabel.height() + showPyLabel.offset().top + 2}px`)

    while (true) {
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showPyLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showPyLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showPyLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left > showPyLabel.offset().left ? chooseTabUnderline.offset().left - 2 : chooseTabUnderline.offset().left + 2}px`)
        await pause(.03125)
    }
})

showLaTexLabel.on("click", async evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "block")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
    
    chooseTabUnderline.css("width", `${showLaTexLabel.width()}px`)
    chooseTabUnderline.css("top", `${showLaTexLabel.height() + showLaTexLabel.offset().top + 2}px`)

    while (true) {
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showLaTexLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showLaTexLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showLaTexLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left > showLaTexLabel.offset().left ? chooseTabUnderline.offset().left - 2 : chooseTabUnderline.offset().left + 2}px`)
        await pause(0.03125)
    }
})

showTSLabel.on("click", async evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "block")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "none")
    
    chooseTabUnderline.css("width", `${showTSLabel.width()}px`)
    chooseTabUnderline.css("top", `${showTSLabel.height() + showTSLabel.offset().top + 2}px`)

    while (true) {
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showTSLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showTSLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showTSLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left > showTSLabel.offset().left ? chooseTabUnderline.offset().left - 2 : chooseTabUnderline.offset().left + 2}px`)
        await pause(0.03125)
    }
})

showCLabel.on("click", async evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "block")
    contentDlExe.css("display", "none")
    
    chooseTabUnderline.css("width", `${showCLabel.width()}px`)
    chooseTabUnderline.css("top", `${showCLabel.height() + showCLabel.offset().top + 2}px`)

    while (true) {
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showCLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showCLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showCLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left > showCLabel.offset().left ? chooseTabUnderline.offset().left - 2 : chooseTabUnderline.offset().left + 2}px`)
        await pause(0.03125)
    }
})

showExeLabel.on("click", async evt => {
    displayedPDF.css("display", "none")
    contentHlJS.css("display", "none")
    contentHlPY.css("display", "none")
    contentHlTEX.css("display", "none")
    contentHlTS.css("display", "none")
    contentHlC.css("display", "none")
    contentDlExe.css("display", "block")
    
    chooseTabUnderline.css("width", `${showExeLabel.width()}px`)
    chooseTabUnderline.css("top", `${showExeLabel.height() + showExeLabel.offset().top + 2}px`)

    while (true) {
        console.log(`chooseTabUnderline.offset().left = ${Math.round(chooseTabUnderline.offset().left)}`)
        console.log(`showPdfLabel.offest().left = ${Math.round(showExeLabel.offset().left)}`)
        if (Math.round(chooseTabUnderline.offset().left) == Math.round(showExeLabel.offset().left) || Math.round(chooseTabUnderline.offset().left) == Math.round(showExeLabel.offset().left) - 1) {
            console.log("coucou")
            break
        }

        chooseTabUnderline.css("left", `${chooseTabUnderline.offset().left > showExeLabel.offset().left ? chooseTabUnderline.offset().left - 2 : chooseTabUnderline.offset().left + 2}px`)
        await pause(0.03125)
    }
})

let stateInterval = setInterval(() => {
    if (document.readyState === "complete") {
        chooseTabUnderline.css("position", "absolute").css("background-color", "blue").css("height", "5px")
        showPdfLabel.click()
        clearInterval(stateInterval)
    }
}, 10)
