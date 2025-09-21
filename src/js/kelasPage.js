async function fetch_get_data() {
    let slug = window.location.href.split("/").at(-1)
    let url = "/api/kelas/index/" + slug
    try {
        const response = await axios.get(url);
        document.querySelector("#loading").classList.add("hidden")

        return response.data
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            document.querySelector("body").innerHTML = "<h1>404</h1>"
        }
    }    
}

async function is_user_registred(id_kelas) {
    try {
        await axios.get("/api/kelas/" + id_kelas + "/is_user_registred")
        return true
    } catch(err) {
        return false
    }
}

async function fetch_pertemuan(id_kelas) {
    let url = "/api/kelas/index/" + id_kelas
    try {
        const response = await axios.get(url)
        if (response) {
            return [true, response]
        } else { return [false] }
    } catch (error) {S
        return error 
    }
}

async function fetch_pertemuan(id_kelas) {
    id_kelas = id_kelas || window.location.href.split("/").at(-1)
    let url = "/api/kelas/" + id_kelas + "/pertemuan"
    const response = await axios.get(url)
    return response.data
}

async function fetch_donasi() {
    let url = "/api/donasi/single"
    const response = await axios.get(url)
    return response.data
}

async function fetch_donasi_inspect(id_program_donasi) {
    let url = "/api/donasi/" + id_program_donasi + "/inspect"
    const response = await axios.get(url)
    return response.data
}

async function daftar_kelas(id_kelas) {
    let url = "/api/kelas/daftar/" + id_kelas
    await axios.post(url, { withCredentials: true })
    location.reload()
}

async function fetch_pertemuan_index(id_pertemuan_kelas) {
    id_pertemuan_kelas = id_pertemuan_kelas || window.location.href.split("/").at(-1)
    let login_url = axios.get("/api/login/google")

    try {
        let url = "/api/kelas/pertemuan/" + id_pertemuan_kelas
        let response = (await axios.get(url, { withCredentials: true }))
        document.getElementById(response.data.data.tipe_pertemuan).classList.remove("hidden")
        
        return response.data
    } catch (error) {
        if (error.response.status == 403) {
            let pegeh = await axios.get('/src/pages/popup/daftarRequired.dap')
            document.querySelector("body").innerHTML = pegeh.data.replace("ID_KELAS_JAPFU", error.response.data.id_kelas)
        } else {
            window.localStorage.setItem("continue_to", "/p/" + id_pertemuan_kelas)
            window.location.href = (await login_url).data.redirect_url
        }
    } finally {
        document.getElementById("loading").classList.add("hidden")        
    }

}

async function update(params, id_kelas) {
    try {
        await axios.put("/api/kelas/" + id_kelas + "/update", params)
        supami("wow", "Kelas berhasil diupdate.", "")
    } catch (error) { supami("error", "Gagal Menambahkan Pertemuan", "Anda bukan pemiliki dari kelas ini dan tidak memiliki izin untuk melakuka update.") }
}

async function tambah_kelas() {
    let popup = document.getElementById("popup-child")
    document.getElementById("popup").classList.remove("hidden")
    
    popup.setAttribute("dapdap", "rijal")
    popup.setAttribute("x-init", "fetch('/src/pages/popup/tambahPertemuan.dap').then(r=>r.text()).then(t=>html=t)")
}

async function create_pertemuan_kelas(pertemuanForm) {
    try {
        await axios.post("/api/kelas/pertemuan/insert/" + id_kelas, pertemuanForm)
        supami("rijal", "data berhasil ditambahkan", "")
    } catch (error) {
        if (error.response.status == 403) {
            supami("error", "Gagal Menambahkan Pertemuan", "Anda bukan pemiliki dari kelas ini dan tidak memiliki izin untuk menambahkan pertemuan baru.")
        }
    }
}

async function fetch_pertemuan_for_update(id_pertemuan_kelas) {
    window.data_pertemuan_for_update = axios.get("/api/kelas/pertemuan/" + id_pertemuan_kelas + "/m")
    document.getElementById("popup").setAttribute("x-show", "true")
    edit_pertemuan_kelas_popup(id_pertemuan_kelas)
}

async function edit_pertemuan_kelas_popup(id_pertemuan_kelas) {
    let popup = document.getElementById("popup-child")
    document.getElementById("popup").classList.remove("hidden")
    
    popup.setAttribute("upi-id-pertemuan-kelas", id_pertemuan_kelas)
    popup.setAttribute("x-init", "fetch('/src/pages/popup/editPertemuan.dap').then(r=>r.text()).then(t=>html=t)")
}

async function edit_pertemuan_kelas(id_pertemuan_kelas, pertemuanForm) {
    try {
        await axios.put("/api/kelas/pertemuan/update/" + id_pertemuan_kelas, pertemuanForm)
        supami("rijal", "data berhasil ditambahkan", "")
    } catch (error) {
        if (error.response.status == 403) {
            supami("error", "Gagal Menambahkan Pertemuan", "Anda bukan pemiliki dari kelas ini dan tidak memiliki izin untuk menambahkan pertemuan baru.")
        }
    }
}

async function delete_pertemuan_kelas(id_kelas, id_pertemuan_kelas) {
    if (confirm("Yakin ingin menghapus pertemuan?")) {
        try {
            const response = await axios.delete("/api/kelas/pertemuan/" + id_kelas + "/" + id_pertemuan_kelas + "/delete")
            supami("rijal", "Pertemuan berhasil dihapus~", "")
        } catch (error) {
            if (error.response.status == 403) {
                supami("error", "Gagal Menghapus Pertemuan", "Anda bukan pemiliki dari kelas ini dan tidak memiliki izin untuk menghapus pertemuan.")
            }
        }
    }
}