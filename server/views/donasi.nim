import
    prologue,
    withTemplate

proc donasiIndex*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/donasi/index.html"

proc donasiPage*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/donasi/page.html"