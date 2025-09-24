import prologue, strutils
import jwt

proc peripy(token: string) : bool =
    let env = loadPrologueEnv(".env")
    try:
        let token = token.toJWT()
        result = token.verify(env.get("AUIC_KEY"), HS256)

    except InvalidToken :
        result = false

proc forAdmin*(prefix: string = "/admin"): HandlerAsync = 
    result = proc(ctx: Context) {.async.} =
        if ctx.request.url.path.startsWith(prefix) :
            var auic_t = ctx.getCookie("auic", "sukamto")
            if (
                auic_t != "sukamto" and
                auic_t.peripy != false and
                $auic_t.toJWT().claims["role"].node.str == "admin"
            ) :
                await ctx.switch()
                return;
            if (auic_t == "sukamto") :
                resp "Akses /api/profile dulu ygy", Http401
                return;
            resp "403", Http403
            return; 

        await ctx.switch()