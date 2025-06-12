let search = decodeURI(location.search)
search = search.slice(1) // Remove the "?"
let slicedSearch = search.split("&")
let searchElements = []
slicedSearch.forEach((value) => {
    searchElements[value.split("=")[0]] = value.split("=")[1]
})

$("html").html(
    $("html").html()
        .replaceAll("{{errorcontent}}", searchElements?.errorcontent || "")
        .replaceAll("{{filename}}", `<span id="file_name">${searchElements?.filename || ""}</span>`)
        .replaceAll("{{errorname}}", searchElements?.errorname || "")
        .replaceAll("{{errortip}}", searchElements?.errortip || "")
        .replaceAll("{{title}}", searchElements?.title || "")
)

// $("#file_name").html(searchElements?.filename)
// $("#error_name").html(searchElements?.errorname)
// $("#error_tip").html(searchElements?.errortip)
// $("#title").html(searchElements?.title)