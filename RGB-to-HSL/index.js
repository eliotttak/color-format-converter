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



function changeBgC() {
    let r = rRange.value
    let g = gRange.value
    let b = bRange.value

    rRange.style.backgroundImage = `linear-gradient(90deg, rgb(0, ${g}, ${b}) 0%, rgb(255, ${g}, ${b}) 100%)`
    gRange.style.backgroundImage = `linear-gradient(90deg, rgb(${r}, 0, ${b}) 0%, rgb(${r}, 255, ${b}) 100%)`
    bRange.style.backgroundImage = `linear-gradient(90deg, rgb(${r}, ${g}, 0) 0%, rgb(${r}, ${g}, 255) 100%)`
    
    colorDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    hslResult = rgbToHsl(r, g, b)
    hSpan.innerHTML = hslResult.h
    sSpan.innerHTML = hslResult.s
    lSpan.innerHTML = hslResult.l
    
}

changeBgC()

rRange.addEventListener("input", evt => {
    console.log("changed")
    rNumber.value=rRange.value
    changeBgC()
})

gRange.addEventListener("input", evt => {
    console.log("changed")
    gNumber.value=gRange.value
    changeBgC()
})

bRange.addEventListener("input", evt => {
    console.log("changed")
    bNumber.value=bRange.value
    changeBgC()
})

rNumber.addEventListener("input", evt => {
    console.log("changed")
    rRange.value=rNumber.value
    changeBgC()
})

gNumber.addEventListener("input", evt => {
    console.log("changed")
    gRange.value=gNumber.value
    changeBgC()
})

bNumber.addEventListener("input", evt => {
    console.log("changed")
    bRange.value=bNumber.value
    changeBgC()
})

copyHslButton.addEventListener("click", evt => {

})