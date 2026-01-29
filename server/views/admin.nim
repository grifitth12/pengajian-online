import 
    prologue,
    strutils,
    streams,
    withTemplate,
    unicode

proc adminIndex*(ctx: Context) {.async.} =
    resp strutils.strip loadAdminTemplate "src/pages/admin/dashboard.upi"

proc mentorIndex*(ctx: Context) {.async.} =
    resp strutils.strip loadMentorTemplate "src/pages/mentor/dashboard.upi"    

proc render_manage_index*(ctx: Context) {.async.} =
    let
        available_managed = @["kajian", "kelas", "mentor", "sedekah"]
        source = ctx.getPathParams("source", "dashboard")
    if source in available_managed :
        var file_loc = "src/pages/admin/manage" & source.title & ".upi"
        resp loadAdminTemplate file_loc
    else :
        resp errorTemplate("404 Not Found", "Page yang kamu cari tidak ditemukan!")

proc render_manage_index_mentor*(ctx: Context) {.async.} =
    let
        available_managed = @["kelas", "profile", "pertemuan"]
        source = ctx.getPathParams("source", "dashboard")
    if source in available_managed :
        var file_loc = "src/pages/admin/manage" & source.title & ".upi"
        resp loadMentorTemplate file_loc
    else :
        resp errorTemplate("404 Not Found", "Page yang kamu cari tidak ditemukan!")    