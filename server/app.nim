import 
  prologue,
  prologue/middlewares/staticfile

import 
  urls,
  middleware

let
  env = loadPrologueEnv(".env")
  settings = newSettings(appName = env.getOrDefault("appName", "Belajar Ngaji Online"),
      debug = env.getOrDefault("debug", true),
      port = Port(env.getOrDefault("port", 8080)),
      secretKey = env.getOrDefault("secretKey", "r1j4l")
  )

var app = newApp(settings = settings)

app.use(staticFileMiddleware("/src"))
app.use(forAdmin())

app.addRoute(urls.indexPatterns, "/")
app.addRoute(urls.kelasPatterns, "/kelas")
app.addRoute(urls.adminPatterns, "/admin")
app.addRoute(urls.mentorPatterns, "/mentor")
app.addRoute(urls.kajianPatterns, "/kajian")
app.addRoute(urls.donasiPatterns, "/donasi")
app.addRoute(urls.createPatterns, "/create")
app.run()