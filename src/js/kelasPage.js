async function fetch_get_data() {
    let slug = window.location.href.split("/").at(-1)
    let url = "http://localhost:8081/api/kelas/index/" + slug
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

async function fetch_pertemuan(id_kelas) {
    let url = "/api/kelas/index/" + id_kelas
    try {
        const response = await axios.get(url)
        if (response) {
            return [true, response]
        } else { return [false] }
    } catch (error) {
        return error 
    }
}

async function fetch_pertemuan(id_kelas) {
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

async function fetch_pertemuan_index() {
    let id_pertemuan_kelas = window.location.href.split("/").at(-1)
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