import
    prologue,
    os,
    nimja,
    puppy,
    strformat

proc kajianIndex*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("index.html", "src/pages/kajian")

proc kelasPage*(ctx: Context) {.async.} =
    proc myRenderProc(
        title: string,
        description: string): string =
        compileTemplateFile("../../src/pages/kajian/page.html", baseDir = getScriptDir())    
    
    var
        slug = ctx.getPathParams("slug")
        ball = puppy.get(
            fmt"http://localhost/api/kajian/meta/{slug}")
        sukamto = parseJson ball.body

    if sukamto["data"].len > 0:
        resp myRenderProc(
            getStr sukamto["data"]["judul"],
            getStr sukamto["data"]["deskripsi"])        
    else :
        resp "<h1>404 Not Found</h1>"