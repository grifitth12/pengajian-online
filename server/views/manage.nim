import 
    prologue,
    strutils,
    streams

proc loadFromTemplate(
    html: string
) : string =
    let
        templ = readAll newFileStream("src/pages/admin/template.upi", fmRead)
        page = templ.replace("\n", "") % ["adminContent", html]

    return page

proc manageKelas*(ctx: Context) {.async.} = 
    resp strip loadFromTemplate readAll newFileStream("src/pages/manage/kelas.upi", fmRead)