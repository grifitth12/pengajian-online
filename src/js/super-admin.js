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
 
 function adminSystem() {
            return {
                // State Management
                loading: false,
                showModal: false,
                modalType: '',
                modalTitle: '',
                alertMessage: '',
                alertType: 'success',
                
                // Data
                stats: {
                    kelas: 37,
                    kajian: 17,
                    donasi: 900000,
                    pengguna: 1945
                },
                
                recentActivities: [
                    { name: 'Kelas online baru ditambahkan', date: '2025-08-23', status: 'active', statusText: 'Aktif' },
                    { name: 'Program sedekah dimulai', date: '2025-08-22', status: 'ongoing', statusText: 'Berjalan' },
                    { name: 'Donasi dari pengguna', date: '2025-08-21', status: 'active', statusText: 'Selesai' }
                ],

                kelasOnline: [],
                kajianList: [],
                sedekahList: [],
                mentorList: [],
                customerList: [],
                
                // Form Data
                formData: {},
                editingId: null,

                // Initialize
                init() {
                    this.loadAllData();
                    this.setupAxiosDefaults();
                },

                setupAxiosDefaults() {
                    // Set up axios defaults for API calls
                    axios.defaults.headers.common['Content-Type'] = 'application/json';
                    
                    // Add token if you have authentication
                    const token = localStorage.getItem('admin_token');
                    if (token) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    }
                },

                // Load all data on initialization
                async loadAllData() {
                    this.loading = true;
                    try {
                        await Promise.all([
                            this.loadKelasOnline(),
                            this.loadKajian(),
                            this.loadSedekah(),
                            this.loadMentor(),
                            this.loadCustomer(),
                            this.loadStats()
                        ]);
                    } catch (error) {
                        this.showAlert('Gagal memuat data', 'error');
                    } finally {
                        this.loading = false;
                    }
                },

                // API Calls - Replace with your actual API endpoints
                async loadStats() {
                    try {
                        // Simulate API call - replace with actual endpoint
                        // const response = await axios.get('/api/stats');
                        // this.stats = response.data;
                        
                        // Mock data for demo
                        setTimeout(() => {
                            this.stats = {
                                kelas: 37,
                                kajian: 17,
                                donasi: 900000,
                                pengguna: 1945
                            };
                        }, 500);
                    } catch (error) {
                        console.error('Error loading stats:', error);
                    }
                },

                async loadKelasOnline() {
                    this.loading = true;
                    try {
                        // Simulate API call - replace with actual endpoint
                        // const response = await axios.get('/api/kelas-online');
                        // this.kelasOnline = response.data;
                        
                        // Mock data for demo
                        setTimeout(() => {
                            this.kelasOnline = [
                                {
                                    id: 1,
                                    nama_kelas: 'Tahsin Al-Quran',
                                    mentor: 'Ust. Henry',
                                    jadwal: '19 Sep 2025',
                                    partisipasi: '25/30',
                                    status: 'Aktif'
                                },
                                {
                                    id: 2,
                                    nama_kelas: 'Fiqih Dasar',
                                    mentor: 'Ust. Rijal',
                                    jadwal: '07 Jul 2025',
                                    partisipasi: '15/20',
                                    status: 'Aktif'
                                }
                            ];
                            this.loading = false;
                        }, 1000);
                    } catch (error) {
                        this.showAlert('Gagal memuat data kelas online', 'error');
                        this.loading = false;
                    }
                },

                async loadKajian() {
                    this.loading = true;
                    try {
                        // Simulate API call
                        setTimeout(() => {
                            this.kajianList = [
                                {
                                    id: 1,
                                    judul_kajian: 'Kajian Ahad Pagi',
                                    pengisi_acara: 'Ust. Somad',
                                    tanggal_waktu: 'Senin, 08:30',
                                    lokasi: 'Masjid Al-Ikhlas'
                                },
                                {
                                    id: 2,
                                    judul_kajian: 'Tafsir Juz Amma',
                                    pengisi_acara: 'Ust. Karim',
                                    tanggal_waktu: 'Ahad, 09:00',
                                    lokasi: 'Zoom'
                                }
                            ];
                            this.loading = false;
                        }, 1000);
                    } catch (error) {
                        this.showAlert('Gagal memuat data kajian', 'error');
                        this.loading = false;
                    }
                },

                async loadSedekah() {
                    this.loading = true;
                    try {
                        // Simulate API call
                        setTimeout(() => {
                            this.sedekahList = [
                                {
                                    id: 1,
                                    program: 'Banjir Kalimulya',
                                    target: 20000000,
                                    terkumpul: 4000000,
                                    donatur: 121,
                                    status: 'Berjalan'
                                },
                                {
                                    id: 2,
                                    program: 'Bangun Masjid',
                                    target: 90000000,
                                    terkumpul: 70000000,
                                    donatur: 345,
                                    status: 'Berjalan'
                                }
                            ];
                            this.loading = false;
                        }, 1000);
                    } catch (error) {
                        this.showAlert('Gagal memuat data sedekah', 'error');
                        this.loading = false;
                    }
                },

                async loadMentor() {
                    this.loading = true;
                    try {
                        // Simulate API call
                        setTimeout(() => {
                            this.mentorList = [
                                {
                                    id: 1,
                                    nama: 'Ust. Ahmad',
                                    spesialis: 'Tajwid & Tahsin',
                                    email: 'ahmad2@gmail.com',
                                    nomor_telepon: '081234567890',
                                    status: 'Aktif'
                                },
                                {
                                    id: 2,
                                    nama: 'Ust. Zaky',
                                    spesialis: 'Hadist & Fiqih',
                                    email: 'zaky@gmail.com',
                                    nomor_telepon: '081234567890',
                                    status: 'Aktif'
                                }
                            ];
                            this.loading = false;
                        }, 1000);
                    } catch (error) {
                        this.showAlert('Gagal memuat data mentor', 'error');
                        this.loading = false;
                    }
                },

                async loadCustomer() {
                    this.loading = true;
                    try {
                        // Simulate API call
                        setTimeout(() => {
                            this.customerList = [
                                {
                                    id: 1,
                                    nama: 'Ali Mahrof',
                                    email: 'ali3mah@gmail.com',
                                    nomor_telepon: '081234567890',
                                    status: 'Aktif'
                                },
                                {
                                    id: 2,
                                    nama: 'Fatimah Zia',
                                    email: 'fatimahz@gmail.com',
                                    nomor_telepon: '081234567890',
                                    status: 'Aktif'
                                }
                            ];
                            this.loading = false;
                        }, 1000);
                    } catch (error) {
                        this.showAlert('Gagal memuat data customer', 'error');
                        this.loading = false;
                    }
                },

                // CRUD Operations
                async createItem(type, data) {
                    try {
                        this.loading = true;
                        
                        // Simulate API call - replace with actual endpoint
                        // const response = await axios.post(`/api/${type}`, data);
                        
                        // Mock successful creation
                        setTimeout(() => {
                            const newItem = {
                                id: Date.now(), // Generate temporary ID
                                ...data,
                                status: 'Aktif'
                            };

                            // Add to appropriate list
                            switch(type) {
                                case 'kelas':
                                    this.kelasOnline.push(newItem);
                                    break;
                                case 'kajian':
                                    this.kajianList.push(newItem);
                                    break;
                                case 'sedekah':
                                    newItem.status = 'Berjalan';
                                    newItem.donatur = 0;
                                    newItem.terkumpul = newItem.terkumpul || 0;
                                    this.sedekahList.push(newItem);
                                    break;
                                case 'mentor':
                                    this.mentorList.push(newItem);
                                    break;
                                case 'customer':
                                    this.customerList.push(newItem);
                                    break;
                            }

                            this.showAlert(`${type} berhasil ditambahkan!`, 'success');
                            this.closeModal();
                            this.loading = false;
                        }, 1000);

                    } catch (error) {
                        this.showAlert(`Gagal menambahkan ${type}`, 'error');
                        this.loading = false;
                    }
                },

                async updateItem(type, id, data) {
                    try {
                        this.loading = true;
                        
                        // Simulate API call
                        // const response = await axios.put(`/api/${type}/${id}`, data);
                        
                        setTimeout(() => {
                            // Update in appropriate list
                            let list;
                            switch(type) {
                                case 'kelas':
                                    list = this.kelasOnline;
                                    break;
                                case 'kajian':
                                    list = this.kajianList;
                                    break;
                                case 'sedekah':
                                    list = this.sedekahList;
                                    break;
                                case 'mentor':
                                    list = this.mentorList;
                                    break;
                                case 'customer':
                                    list = this.customerList;
                                    break;
                            }

                            const index = list.findIndex(item => item.id === id);
                            if (index !== -1) {
                                list[index] = { ...list[index], ...data };
                            }

                            this.showAlert(`${type} berhasil diupdate!`, 'success');
                            this.closeModal();
                            this.loading = false;
                        }, 1000);

                    } catch (error) {
                        this.showAlert(`Gagal mengupdate ${type}`, 'error');
                        this.loading = false;
                    }
                },

                async deleteItem(type, id) {
                    if (!confirm(`Apakah Anda yakin ingin menghapus ${type} ini?`)) {
                        return;
                    }

                    try {
                        this.loading = true;
                        
                        // Simulate API call
                        // await axios.delete(`/api/${type}/${id}`);
                        
                        setTimeout(() => {
                            // Remove from appropriate list
                            switch(type) {
                                case 'kelas':
                                    this.kelasOnline = this.kelasOnline.filter(item => item.id !== id);
                                    break;
                                case 'kajian':
                                    this.kajianList = this.kajianList.filter(item => item.id !== id);
                                    break;
                                case 'sedekah':
                                    this.sedekahList = this.sedekahList.filter(item => item.id !== id);
                                    break;
                                case 'mentor':
                                    this.mentorList = this.mentorList.filter(item => item.id !== id);
                                    break;
                                case 'customer':
                                    this.customerList = this.customerList.filter(item => item.id !== id);
                                    break;
                            }

                            this.showAlert(`${type} berhasil dihapus!`, 'success');
                            this.loading = false;
                        }, 1000);

                    } catch (error) {
                        this.showAlert(`Gagal menghapus ${type}`, 'error');
                        this.loading = false;
                    }
                },

                // Modal Management
                openModal(type) {
                    this.modalType = type;
                    this.showModal = true;
                    this.formData = {};
                    this.editingId = null;

                    // Set modal title
                    const typeMap = {
                        'add-kelas': 'Tambah Kelas Online',
                        'add-kajian': 'Tambah Kajian',
                        'add-sedekah': 'Tambah Program Sedekah',
                        'add-mentor': 'Tambah Mentor',
                        'add-customer': 'Tambah Customer',
                        'edit-kelas': 'Edit Kelas Online',
                        'edit-kajian': 'Edit Kajian',
                        'edit-sedekah': 'Edit Program Sedekah',
                        'edit-mentor': 'Edit Mentor',
                        'edit-customer': 'Edit Customer'
                    };
                    this.modalTitle = typeMap[type] || 'Form';
                },

                editItem(type, item) {
                    this.modalType = `edit-${type}`;
                    this.showModal = true;
                    this.formData = { ...item };
                    this.editingId = item.id;
                    
                    const typeMap = {
                        'kelas': 'Edit Kelas Online',
                        'kajian': 'Edit Kajian',
                        'sedekah': 'Edit Program Sedekah',
                        'mentor': 'Edit Mentor',
                        'customer': 'Edit Customer'
                    };
                    this.modalTitle = typeMap[type] || 'Edit';
                },

                closeModal() {
                    this.showModal = false;
                    this.modalType = '';
                    this.formData = {};
                    this.editingId = null;
                },

                async submitForm() {
                    const type = this.modalType.replace('add-', '').replace('edit-', '');
                    
                    if (this.editingId) {
                        // Update existing item
                        await this.updateItem(type, this.editingId, this.formData);
                    } else {
                        // Create new item
                        await this.createItem(type, this.formData);
                    }
                },

                // Utility Functions
                getPageTitle() {
                    return document.querySelector("#upi-1").getAttribute("upi-title")
                },

                showAlert(message, type = 'success') {
                    this.alertMessage = message;
                    this.alertType = type;
                    setTimeout(() => {
                        this.alertMessage = '';
                    }, 3000);
                },

                logout() {
                    if (confirm('Apakah Anda yakin ingin logout?')) {
                        // Clear auth token
                        localStorage.removeItem('admin_token');
                        // Redirect to login page
                        window.location.href = '/login';
                    }
                }
            }
        }