import
    streams,
    strutils,
    json

proc loadAdminTemplate*(
    html_file: string,
    data: auto = ""
) : string =
    let
        templ = readAll newFileStream("src/pages/templates/adminPanel.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        dataa = %*{"result" : data}
        page = templ % ["adminContent", htmll] % ["dataUpi", $dataa]

    return page

proc generalTemplate*(
    html_file: string
) : string = 
    let
        templ = readAll newFileStream("src/pages/templates/general.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        page = templ % ["generalContent", htmll]

    return page

proc errorTemplate*(
    message: string = "404 Not Found",
    statusText: string = "Not Found"
) : string = 
    let
        templ = readAll newFileStream("src/pages/error.upi", fmRead)
        page = templ % ["message", message] % ["statusText", statusText]

    return page        
