const http = require("http")
const fs = require("fs")

const server = http.createServer((request, result) => { // création du server
    let name = request.url
    console.log(name)
    name = __dirname + (name)
    let segments = name.split(/\//)
    let lastSegment = segments[segments.length - 1]
    if (! /\./.test(lastSegment)) { // si la requete est un dossier
        name = /\/$/.test(name) ? name + "index.html" : name + "/index.html" // ajout d'un "index.html"
    }
    expens =  name.split(/\./)[name.split(/\./).length-1].toLowerCase()
    fs.readFile(name, expens == "js" || expens == "html" || expens == "htm" || expens == "css" || expens == "svg" ? {encoding : "utf-8"} : {}, (err, data) => {
        if (err) {
            let disp = {
                status : "ERROR",
                url : name.replaceAll("C:\\Users\\takvoriane", ""),
                code : 404,
                datetime : new Date().toString(),
                //send : "./404-error.html", 
            }
            result.statusCode = disp.code
            if (request.url.split(".")[request.url.split(".").length - 1] == "html") {
                disp.send = "./404-error.html"
                result.setHeader("Content-Type", "text/html")
                fs.readFile(disp.send, {encoding : "utf-8"}, (mistake, datas) =>{
                    result.end(datas)
                })
            }
            else {
                result.setHeader("Content-Type", "text/javascript")
                disp.send = `console.log("${disp}")`
                result.end(disp.send)
            }
            console.table(disp)
            //fs.readFile(disp.send, {encoding : "utf-8"}, (mistake, datas) =>{
                //result.end(datas)
            //})
        }
        else {
            let type
            switch (name.split(/\./)[name.split(/\./).length-1].toLowerCase()) {
                case "htm":
                case "html":
                    type = "text/html"
                    break
                case "js":
                    type = "application/javascript"
                    break
                case "css":
                    type = "text/css"
                    break
                case "ico":
                    type = "image/x-icon"
                    break
                case "json":
                    type = "application/json"
                    break
                case "jpg":
                case "jpeg":
                    type = "image/jpeg"
                    break
                case "png":
                    type = "image/png"
                    break
                case "svg":
                    type = "image/svg+xml"
                    break
                case "pdf":
                    type = "application/pdf"
                    break
                case "ts":
                    type = "application/typescript"
                    break
                case "tex":
                    type = "application/x-tex"
                    break
                case "py":
                    type = "application/py"
            }
            let disp = {
                status : "OK",
                url : name.replaceAll("C:\\Users\\takvoriane\\", ""),
                datetime : new Date().toString(),
                code : 200,
                type : type
            }
            console.table(disp)
            result.setHeader("Content-Type", type)
            result.statusCode = disp.code
            result.end(data, "utf8")
        }
    })
})

server.listen(8895, "" , ()=>{
    console.log("Bienvenue sur un convertisseur de formats de couleurs en ligne à l'adresse 'http://localhost:8895' ( [ctrl] + clic gauche )")
})
