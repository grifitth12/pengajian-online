function cetak_tenggal(tanggal) {
    const d = new Date(tanggal);

    const fmt = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour12: false
    });

    return fmt.format(d); 
}
 
function cetak_jam(tanggal) {
    const d = new Date(tanggal);

    const fmt = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return fmt.format(d);
}