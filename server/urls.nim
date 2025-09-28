import prologue
import 
  views/dash,
  views/kelas,
  views/admin,
  views/manage,
  views/kajian,
  views/donasi

let
  indexPatterns* = @[
    pattern("/", dash.index, @[HttpGet], name = "index"),
    pattern("/profile", profile, @[HttpGet], name = "profile"),
    pattern("/p/{id_pertemuan_kelas}", kelasPertemuanPage, @[HttpGet]),
    pattern("/k/{slug}", kelasPage, @[HttpGet]),
    pattern("/about", about, @[HttpGet]),
    pattern("/daftar-mentor", dash.daftar_mentor, @[HttpGet]), # Sementara ajah.
    pattern("/search", dash.search, @[HttpGet])
  ]
  kelasPatterns* = @[
    pattern("/", kelasIndex, @[HttpGet]),
    pattern("/{slug}", kelasPage, @[HttpGet]),
  ]
  kajianPatterns* = @[
    pattern("/", kajianIndex, @[HttpGet]),
    pattern("/{slug}", kajianPage, @[HttpGet]),
  ]
  donasiPatterns* = @[
    pattern("/", donasiIndex, @[HttpGet]),
    pattern("/{slug}", donasiPage, @[HttpGet])
  ]
  adminPatterns* = @[
    pattern("/", adminIndex, @[HttpGet]),
    pattern("/manage/{source}", render_manage_index, @[HttpGet]),
    pattern("/manage/{model}/{id}", triyono, @[HttpGet])
  ]
  createPatterns* = @[
    pattern("/donasi", createDonasi, @[HttpGet]),
    pattern("/kajian", createKajian, @[HttpGet]),
  ]