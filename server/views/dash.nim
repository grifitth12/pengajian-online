import
    prologue,
    withTemplate

proc index*(ctx: Context) {.async.} =
    resp generalTemplate("src/pages/index.upi", "Platform Belajar Ngaji Terpercaya")

proc profile*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("profile.html", "src/pages/profile")

proc daftar_mentor*(ctx: Context) {.async.} =
    await ctx.staticFileResponse("daftar_mentor.html", "src")

proc about*(ctx: Context) {.async.} =
    resp generalTemplate("src/pages/about.upi", "Tentang Kami")