async function fetch_get_data() {
    let slug = window.location.href.split("/").at(-1)
    console.log("RIJAL")
    let url = " /api/kajian/index/" + slug
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