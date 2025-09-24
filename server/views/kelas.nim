import prologue
import nimja
import os
import puppy
import json
import strformat
import strutils
import withTemplate

proc kelasIndex*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/kelas/index.upi"

proc kelasPage*(ctx: Context) {.async.} =
    proc myRenderProc(
        data: JsonNode): string =
        compileTemplateFile("../../src/pages/kelas/page.upi", baseDir = getScriptDir())    
    
    var
        slug = ctx.getPathParams("slug")
        env = loadPrologueEnv(".env")
        host = env.get("BACKEND_URL")
        ball = puppy.get(
            fmt"{host}/api/kelas/{slug}")
        sukamto = parseJson ball.body

    if sukamto["data"].len > 0 : resp myRenderProc(sukamto["data"])        
    else : resp "<h1>404 Not Found</h1>"


proc kelasDaftar*(ctx: Context) {.async.} =
    resp "Ini Rijal"

proc kelasPertemuanPage*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/kelas/pertemuan_page.upi"