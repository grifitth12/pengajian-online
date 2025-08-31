import 
    prologue,
    strutils,
    streams,
    puppy,
    json,
    withTemplate

proc manageKelas*(ctx: Context) {.async.} =
    var
        ac = ctx.getCookie("access_token")
        dapda = 
            puppy.get("http://localhost:8081/api/kelas/select?w=id_kelas&eq=" &
            $ctx.getPathParams("id_kelas"),
            @[("Cookie", "access_token=" & ac)])
    
    if dapda.code == 200 :
        let
            jsonn = parseJson(dapda.body)
            page = loadFromTemplate( "src/pages/manage/kelas.upi", jsonn )

        resp strip page

    else :
        echo $dapda.body
        echo ctx.getPathParams("id_kelas")

        resp $dapda.code   

proc manageSedekah*(ctx: Context) {.async.} = 
    resp loadFromTemplate "src/pages/manage/sedekah.upi"

proc manageMentor*(ctx: Context) {.async.} = 
    resp loadFromTemplate "src/pages/manage/mentor.upi"

proc manageKajian*(ctx: Context) {.async.} = 
    resp loadFromTemplate "src/pages/manage/kajian.upi"

proc createDonasi*(ctx: Context) {.async.} = 
    resp loadFromTemplate "src/pages/create/donasi.upi"

proc createKajian*(ctx: Context) {.async.} = 
    resp loadFromTemplate "src/pages/create/kajian.upi"
