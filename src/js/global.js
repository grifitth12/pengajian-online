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

function hitung_persen(a, b) {
    return a / b * 100
}

function cetak_rupiah(amount, { symbol = true, decimals = 0 } = {}) {
  const n = Number(amount);
  if (!isFinite(n)) return symbol ? 'Rp 0' : '0';

  // format tanpa simbol mata uang, pakai pemisah ribuan id-ID
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(Math.abs(n));

  const sign = n < 0 ? '-' : '';
  return `${sign}${symbol ? 'Rp ' : ''}${formatted}`;
}