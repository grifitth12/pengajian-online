import
    prologue,
    os,
    nimja,
    puppy,
    strformat

proc kajianIndex*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("index.html", "src/pages/kajian")

proc kajianPage*(ctx: Context) {.async.} =
    proc myRenderProc(
        judul: string,
        deskripsi: string,
        thumbnail_url: string,
        deskripsi_lengkap: string): string =
        compileTemplateFile("../../src/pages/kajian/page.html", baseDir = getScriptDir())    
    
    var
        slug = ctx.getPathParams("slug")
        ball = puppy.get(
            fmt"http://localhost/api/kajian/meta/{slug}")
        sukamto = parseJson ball.body

    if sukamto["data"].len > 0:
        resp myRenderProc(
            getStr sukamto["data"]["judul"],
            getStr sukamto["data"]["deskripsi"],
            getStr sukamto["data"]["thumbnail_url"],
            getStr sukamto["data"]["deskripsi_lengkap"],
        )        
    else :
        resp "<h1>404 Not Found</h1>"