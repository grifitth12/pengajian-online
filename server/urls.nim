import prologue
import 
  views/dash,
  views/kelas,
  views/admin,
  views/manage,
  views/kajian

let
  indexPatterns* = @[
    pattern("/", dash.index, @[HttpGet], name = "index"),
    pattern("/profile", profile, @[HttpGet], name = "profile")
  ]
  kelasPatterns* = @[
    pattern("/", kelasIndex, @[HttpGet]),
    pattern("/{slug}", kelasPage, @[HttpGet]),
  ]
  kajianPatterns* = @[
    pattern("/", kajianIndex, @[HttpGet]),
    pattern("/{slug}", kajianPage, @[HttpGet])
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