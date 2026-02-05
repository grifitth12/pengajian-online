import
    prologue,
    withTemplate,
    puppy,
    json

proc donasiIndex*(ctx: Context) {.async.} =
    resp generalTemplate "src/pages/donasi/index.upi"

proc donasiPage*(ctx: Context) {.async.} =
    resp noTemplate "src/pages/donasi/page.upi"

proc donaturInspect*(ctx: Context) {.async.} =
    let
        host = loadPrologueEnv(".env").get("BACKEND_URL")
        id_program_donasi = ctx.getPathParams("id_program_donasi")
        header = @[("Cookie", "access_token=" & ctx.getCookie("access_token"))]
        metadata = @[(name: "id_program_donasi", content: id_program_donasi)]
        response = get(host & "/api/donasi/" & id_program_donasi & "/donatur", header)

    if response.code == 200:
        resp loadAdminTemplate(
            "src/pages/manage/pengumpulanDonasi.upi",
            response.body.parseJson(),
            metadata
        )

    else:
        resp $response.code        
