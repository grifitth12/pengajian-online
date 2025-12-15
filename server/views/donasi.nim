import
    prologue,
    withTemplate

proc donasiIndex*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/donasi/index.upi"

proc donasiPage*(ctx: Context) {.async.} =
    resp noTemplate "src/pages/donasi/page.upi"