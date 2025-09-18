import prologue

proc index*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("index.html", "src")

proc profile*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("profile.html", "src/pages")