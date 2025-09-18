async function fetch_data_donasi(slug) {
    slug = slug || window.location.href.split("/").at(-1)
    const data = await axios.get('/api/donasi/' + slug)
    return data.data
}   