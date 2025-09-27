import
    streams,
    strutils,
    json

proc loadAdminTemplate*(
    html_file: string,
    data: auto = ""
) : string =
    let
        templ = readAll newFileStream("src/templates/adminPanel.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        dataa = %*{"result" : data}
        page = templ % ["adminContent", htmll] % ["dataUpi", $dataa]

    return page

proc generalTemplate*(
    html_file: string,
    title: string = "Platform belajar ngaji online"
) : string = 
    let
        templ = readAll newFileStream("src/templates/general.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        header = readAll newFileStream("src/assets/assets-pages/navbar-ngaji.upi")
        footer = readAll newFileStream("src/assets/assets-pages/footer-ngaji.upi")

        page = templ % [
            "generalContent", htmll,
            "title", title,
            "header", header,
            "footer", footer,
        ]

    return page

proc errorTemplate*(
    message: string = "404 Not Found",
    statusText: string = "Not Found"
) : string = 
    let
        templ = readAll newFileStream("src/pages/error.upi", fmRead)
        page = templ % ["message", message] % ["statusText", statusText]

    return page        
