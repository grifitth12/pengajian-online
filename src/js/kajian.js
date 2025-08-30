async function discover_kajian() {
    let data = (await axios.get("/api/kajian/discover")).data
    document.querySelector(".upi-loading").classList.add("hidden")
    return data
}