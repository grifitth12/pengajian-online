import
    streams,
    strutils,
    json

proc loadFromTemplate*(
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