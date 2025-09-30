import
    prologue,
    withTemplate,
    streams

proc index*(ctx: Context) {.async.} =
    resp generalTemplate("src/pages/index.upi", "Platform Belajar Ngaji Terpercaya")

proc profile*(ctx: Context) {.async.} =
    resp readAll newFileStream("src/pages/profile/profile.upi")        

proc daftar_mentor*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("daftar_mentor.html", "src")

proc about*(ctx: Context) {.async.} =
    resp generalTemplate("src/pages/about.upi", "Tentang Kami")