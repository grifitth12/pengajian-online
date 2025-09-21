async function fetch_data_donasi(slug) {
    slug = slug || window.location.href.split("/").at(-1)
    const data = await axios.get('/api/donasi/' + slug)
    return data.data
}
    
    async function kadapi(id_donasi) {
        let url = "/api/donasi/" + id_donasi + "/inspect"
            try {
                const response = await axios.get(url);
                return response.data
            } catch (error) {
        if (error.response) {
            return error.response
        }
    }          
}
async function fetch_donasi() {
    let slug = window.location.href.split("/").at(-1)
    let url = "/api/donasi/" + slug
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            document.querySelector("body").innerHTML = "<h1>404</h1>"
        }
    }    
}
        // FAQ toggle functionality
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                answer.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });

        // Simple donation amount selection
        document.querySelectorAll('.donation-card').forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                document.querySelectorAll('.donation-card').forEach(c => {
                    c.classList.remove('border-emerald-500', 'bg-emerald-50');
                });
                
                // Add active class to clicked card
                card.classList.add('border-emerald-500', 'bg-emerald-50');
            });
        });

        // Simulate donation progress animation
        window.addEventListener('load', () => {
            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = '0%';
            
            setTimeout(() => {
                progressFill.style.width = '64%';
            }, 300);
        });