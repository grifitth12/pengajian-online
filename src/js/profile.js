  // Navigation Functions
        function showSection(sectionName) {
            // Hide all sections
            document.querySelectorAll('.profile-section, .mentor-section').forEach(section => {
                section.classList.remove('active');
                if (section.id === 'profile-section') {
                    section.style.display = sectionName === 'profile' ? 'flex' : 'none';
                }
                if (section.id === 'mentor-section') {
                    section.classList.toggle('active', sectionName === 'mentor');
                }
            });

            // Update active nav item
            document.querySelectorAll('.nav-item').forEach((item, index) => {
                item.classList.remove('active');
                if ((sectionName === 'profile' && index === 0) || (sectionName === 'mentor' && index === 1)) {
                    item.classList.add('active');
                }
            });
        }
axios.defaults.withCredentials = true;
function selectPhoto() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.querySelector(".profile-image").src = ev.target.result;
        };
        reader.readAsDataURL(file);

        // Upload to backend
        const formData = new FormData();
        formData.append("file", file);

        try {
            let res = await axios.post(
            "http://localhost:8081/api/file/upload",
            formData,
            { withCredentials: true }
        );

            // Update image with returned URL
            document.querySelector(".profile-image").src = res.data.url;
            console.log("Upload success:", res.url);

        } catch (err) {
            console.error("Upload failed:", err.response?.data || err.message);
            alert("Failed to upload profile picture");
        }
    };

    input.click();
}




        function registerMentor() {
            alert('Mengarahkan ke halaman pendaftaran mentor...');
            // Add your mentor registration logic here
        }

        function goBack() {
            // Add navigation logic here
            console.log('Going back...');
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showSection('profile');
            const container = document.getElementById('profileContainer');
            const overlay = document.getElementById('overlay');
            
            // Start the initial animation
            overlay.classList.add('show-initially');
            
            // After animation completes, enable hover functionality
            setTimeout(() => {
                overlay.classList.remove('show-initially');
                container.classList.add('hover-enabled');
            }, 2000); // 4 seconds to match the animation duration
        });