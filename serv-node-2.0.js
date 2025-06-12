const http = require("http")
const fs = require("fs")
const nodeMimeTypes = require("node-mime-types")
const fileType = require("file-type")

const getMime = async file => {
    if (typeof file === "string") {
        try {
            return (await fileType.fileTypeFromFile(file)).mime || nodeMimeTypes.getMIMEType(file)
        }
        catch {
            return nodeMimeTypes.getMIMEType(file)
        }
    }
}

function send404(name, request, result) {
    if (request?.headers?.accept?.indexOf("text/html") !== -1) {
        let disp = {
            status : "ERROR",
            url : name.replaceAll("C:\\Users\\takvoriane", "").replaceAll("/home/elapp", ""),
            code : 404,
            datetime : new Date().toString(),
            send : "./error-pages/error.html", 
        }

        /*const reqHost = `http://${request.headers.host}`
        const reqUrl = request.url
        const parsedReqUrl = new URL(reqHost, reqUrl)*/
        
        const resultParams = {
            errorcontent: "Le fichier {{filename}} n'existe pas sur ce serveur.",
            filename: name.replace(__dirname, ""),
            errorname: "404 FILE_NOT_FOUND_ERROR",
            errortip: "Il a peut-être été déplacé ou supprimé",
            title: "Fichier non trouvé | Erreur 404"
        }

        disp.send = "./error-pages/error.html"
        result.setHeader("Content-Type", "text/html")
        result.statusCode = disp.code
        fs.readFile(disp.send, (error, data) => {
            let returnedPage = undefined
            if (!error) {
                returnedPage = (
                    data.toString()
                        .replaceAll("{{errorcontent}}", resultParams?.errorcontent || "")
                        .replaceAll("{{filename}}", `<span id="file_name">${resultParams?.filename || ""}</span>`)
                        .replaceAll("{{errorname}}", resultParams?.errorname || "")
                        .replaceAll("{{errortip}}", resultParams?.errortip || "")
                        .replaceAll("{{title}}", resultParams?.title || "")
                )
                result.end(returnedPage)
            }
            else {
                result.statusCode = 500
                result.end()
            }
        })
    }
}

const server = http.createServer(async (request, result) => { // création du server
    let name = request.url
    console.log(name)
    name = __dirname + (name)
    name = name.split("?").shift()
    name = name.split("#").shift()
    let segments = name.split(/\//)
    let lastSegment = segments[segments.length - 1]
    console.log(lastSegment)
    if (! /\./.test(lastSegment)) { // sans extention donc est peut-être un dossier (mais peut-être aussi un exécutable Linux)
        console.log("There is not point in '" + lastSegment + "'")
        // On teste si '{requete}/index.html' existe
        if (! (fs.existsSync(name) && (! fs.statSync(name).isDirectory()))) {
            name = /\/$/.test(name) ? name + "index.html" : name + "/index.html" // ajout d'un "index.html"
        }
        // Sinon, on la garde telle qu'elle
    }
    console.log(name)
    expens =  name.split(/\./)[name.split(/\./).length-1].toLowerCase()
    fs.readFile(name, expens == "js" || expens == "html" || expens == "htm" || expens == "css" || expens == "svg" ? {encoding : "utf-8"} : {}, async (err, data) => {
        if (err) {
            send404(name, request, result)
        }
        else {
            let type = await getMime(name)
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
