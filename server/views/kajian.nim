import
    prologue,
    os,
    nimja,
    puppy,
    strformat,
    withTemplate

proc kajianIndex*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/kajian/index.upi"

proc kajianPage*(ctx: Context) {.async.} =
    proc myRenderProc(
        judul: string,
        deskripsi: string,
        thumbnail_url: string,
        deskripsi_lengkap: string): string =
        compileTemplateFile("../../src/pages/kajian/page.upi", baseDir = getScriptDir())    
    
    var
        slug = ctx.getPathParams("slug")
        env = loadPrologueEnv(".env")
        host = env.get("BACKEND_URL")
        ball = puppy.get(
            fmt"{host}/api/kajian/meta/{slug}")
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