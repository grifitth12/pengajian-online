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
    let url = "/api/donasi/" + "donasi-di-padang"
    const response = await axios.get(url)
    return response.data
}

async function daftar_kelas(id_kelas) {
    let url = "/api/kelas/daftar/" + id_kelas
    const response = await axios.post(url, { withCredentials: true })
    alert(response.message)
}