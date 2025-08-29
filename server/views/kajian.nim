import prologue

proc kajianIndex*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("index.html", "src/pages/kajian")