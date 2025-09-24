import 
    prologue,
    strutils,
    streams,
    puppy,
    json,
    withTemplate,
    strformat

proc triyono*(ctx: Context) {.async.} =
    var
        ac = ctx.getCookie("access_token")
        base_m = ctx.getPathParams("model", "triyono")
        model = base_m.replace("sedekah", "donasi")
        identifier = "id_" & model.replace("donasi", "program_donasi")
        val = ctx.getPathParams("id")
    
    if model == "triyono" :
        resp "404", Http404
    
    else :
        let jajat = puppy.get(
                fmt"http://localhost:8081/api/{model}/select?w={identifier}&eq=" & val,
                @[("Cookie", "access_token=" & ac)]
            )
        
        if jajat.code == 200 :
            let
                jsonn = parseJson(jajat.body)
                page = loadAdminTemplate( fmt"src/pages/manage/{base_m}.upi", jsonn )

            resp strip page

        else :
            echo $jajat.body
            echo val

            resp $jajat.code   

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
            page = loadAdminTemplate( "src/pages/manage/kelas.upi", jsonn )

        resp strip page

    else :
        echo $dapda.body
        echo ctx.getPathParams("id_kelas")

        resp $dapda.code

proc manageSedekah*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/manage/sedekah.upi"

proc manageMentor*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/manage/mentor.upi"

proc manageKajian*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/manage/kajian.upi"

proc createDonasi*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/create/donasi.upi"

proc createKajian*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/create/kajian.upi"
