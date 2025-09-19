import prologue

proc index*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("index.html", "src")

proc profile*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("profile.html", "src")

proc daftar_mentor*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("daftar_mentor.html", "src")