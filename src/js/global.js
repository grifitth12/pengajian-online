function login() {
    axios.get("/api/login?provider=google").then(
        response => {
            window.localStorage.setItem("continue_to", window.location.href)
            window.location.href = response.data.redirect_url
        }
    )
}

function getDataUpi(name) {
    const metaDescription = document.querySelector(`meta[name='upi-${name}']`);
    if (metaDescription) {
        const content = metaDescription.content;
        return content
    }
    else { return "" }
}

function hello(dateString) {
  // Parse ke object Date (bisa tangani format ISO 8601 + timezone)
  const date = new Date(dateString);

  // Ambil bagian tanggal & waktu (lokal)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Kembalikan format sesuai aturan <input type="datetime-local">
  // Bisa buang `:${seconds}` kalau tak mau detik
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

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
    let has = a / b * 100
    if (has >= 100) has = 100
    return has
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

async function close_popup() {
    document.getElementById("popup").classList.add("hidden")
    document.getElementById("popup-child").setAttribute("x-init", "html = ''")    
}

function supami(level, headline, message, file_nov = "") {
    if(!file_nov) {
        file_nov = level == 'error' ? 'notificationError' : 'notificationSuccess'
    }    
    
    close_popup().then(() => {
        document.getElementById("popup").classList.remove("hidden")
        document.getElementById("popup-child").setAttribute("upi-message-headline", headline)
        document.getElementById("popup-child").setAttribute("upi-message", message)
        document.getElementById("popup-child").setAttribute("x-init", `fetch('/src/pages/popup/${file_nov}.dap').then(r=>r.text()).then(t=>{html=t})`)
    })
        
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms))
}