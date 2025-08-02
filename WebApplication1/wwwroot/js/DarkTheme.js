const openSettingsBtn = document.getElementById('openSettingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsModal');
const settingsModal = document.getElementById('settingsModal');

openSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

closeSettingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// темная тема

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Проверяем localStorage при загрузке
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.checked = true;
}

// При изменении переключателя
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});