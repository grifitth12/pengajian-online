import 
    prologue,
    strutils,
    streams,
    withTemplate

proc adminManageKajian*(ctx: Context) {.async.} =
    resp strip loadFromTemplate "src/pages/admin/manageKajian.upi"

proc adminManageKelas*(ctx: Context) {.async.} =
    resp strip loadFromTemplate "src/pages/admin/manageKelas.upi"

proc adminManageMentor*(ctx: Context) {.async.} =
    resp strip loadFromTemplate "src/pages/admin/manageMentor.upi"

proc adminManageSedekah*(ctx: Context) {.async.} =
    resp strip loadFromTemplate "src/pages/admin/manageSedekah.upi"

proc adminIndex*(ctx: Context) {.async.} =
    resp strip loadFromTemplate "src/pages/admin/dashboard.upi"