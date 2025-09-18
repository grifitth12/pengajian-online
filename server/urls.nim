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
    pattern("/k/{slug}", kelasPage, @[HttpGet])
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
    pattern("/manage/kajian", adminManageKajian, @[HttpGet]),
    pattern("/manage/kelas", adminManageKelas, @[HttpGet]),
    pattern("/manage/mentor", adminManageMentor, @[HttpGet]),
    pattern("/manage/sedekah", adminManageSedekah, @[HttpGet]),
    pattern("/", adminIndex, @[HttpGet])
  ]
  managePatterns* = @[
    pattern("/kelas/{id_kelas}", manageKelas, @[HttpGet]),
    pattern("/sedekah/{slug}", manageSedekah, @[HttpGet]),
    pattern("/mentor/{slug}", manageMentor, @[HttpGet]),
    pattern("/kajian/{slug}", manageKajian, @[HttpGet])
  ]
  createPatterns* = @[
    pattern("/donasi", createDonasi, @[HttpGet]),
    pattern("/kajian", createKajian, @[HttpGet]),
  ]