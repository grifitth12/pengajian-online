import
    streams,
    strutils,
    json,
    tables

type
    Metadata* = tuple[name: string, content: string]
    Metadatas* = seq[Metadata]

proc compile(metadatas: Metadatas) : string =
    const mdc = "<meta name=\"upi-$#\" content=\"$#\">"
    var s: seq[string]

    if metadatas.len > 0:
        for md in metadatas:
            s.add mdc % [md.name, md.content]

    return s.join("\n")            

proc noTemplate*(html_file: string) : string =
    return readAll newFileStream(html_file, fmRead)

proc loadAdminTemplate*(
    html_file: string,
    data: auto = "";
    metadata: Metadatas = @[]
) : string =
    let
        templ = readAll newFileStream("src/templates/adminPanel.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        dataa = %*{"result" : data}
        page = templ % [
            "adminContent", htmll,
            "dataUpi", $dataa,
            "metaData", metadata.compile()
        ]

    return page

proc loadMentorTemplate*(
    html_file: string,
    data: auto = "";
    metadata: Metadatas = @[]
) : string =
    let
        templ = readAll newFileStream("src/templates/mentorPanel.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        dataa = %*{"result" : data}
        page = templ % [
            "mentorContent", htmll,
            "dataUpi", $dataa,
            "metaData", metadata.compile()
        ]

    return page

proc generalTemplate*(
    html_file: string,
    title: string = "Platform belajar ngaji online",
    data: Metadatas = @[]
) : string = 
    let
        templ = readAll newFileStream("src/templates/general.upi", fmRead)
        htmll = readAll newFileStream(html_file, fmRead)
        header = readAll newFileStream("src/assets/assets-pages/navbar-ngaji.upi")
        footer = readAll newFileStream("src/assets/assets-pages/footer-ngaji.upi")

        page = templ % [
            "generalContent", htmll,
            "metadata", data.compile(),
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