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
        metadata: Metadatas
    
    let
        ac = ctx.getCookie("access_token")
        base_m = ctx.getPathParams("model", "triyono")
        model = base_m.replace("sedekah", "donasi")
        identifier = "id_" & model.replace("donasi", "program_donasi")
        val = ctx.getPathParams("id")
        host = loadPrologueEnv(".env").get("BACKEND_URL")
    
    if model == "triyono" :
        resp "404", Http404
    
    else :
        let jajat = puppy.get(
                fmt"{host}/api/{model}/select?w={identifier}&eq=" & val,
                @[("Cookie", "access_token=" & ac)]
            )
        
        if jajat.code == 200 :
            metadata.add (name: "model-id", content: ctx.getPathParams("id"))
            metadata.add (name: "model-name", content: model)

            let
                jsonn = parseJson(jajat.body)
                page = loadAdminTemplate(fmt "src/pages/manage/{base_m}.upi", jsonn , metadata=metadata)

            resp strip page

        else :
            echo $jajat.body
            echo val

            resp $jajat.code   

proc sukamto*(ctx: Context) {.async.} =
    const available = ["kelas"]

    var
        metadata: Metadatas
    
    let
        ac = ctx.getCookie("access_token")
        base_m = ctx.getPathParams("model", "triyono")
        model = base_m.replace("sedekah", "donasi")
        identifier = "id_" & model.replace("donasi", "program_donasi")
        val = ctx.getPathParams("id")
        host = loadPrologueEnv(".env").get("BACKEND_URL")
    
    if model == "triyono" or not available.contains(base_m):
        resp "404", Http404
    
    else :
        let jajat = puppy.get(
                fmt"{host}/api/{model}/select?w={identifier}&eq=" & val,
                @[("Cookie", "access_token=" & ac)]
            )
        
        if jajat.code == 200 :
            metadata.add (name: "model-id", content: ctx.getPathParams("id"))
            metadata.add (name: "model-name", content: model)

            let
                jsonn = parseJson(jajat.body)
                page = loadMentorTemplate(fmt "src/pages/manage/{base_m}.upi", jsonn , metadata=metadata)

            resp strip page

        else :
            echo $jajat.body
            echo val

            resp $jajat.code   

proc createDonasi*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/create/donasi.upi"

proc createKajian*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/create/kajian.upi"

proc createkelas*(ctx: Context) {.async.} = 
    resp loadAdminTemplate "src/pages/create/kelas.upi"