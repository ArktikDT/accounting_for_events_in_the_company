const submitBtn = document.getElementById('submitBtn');
const successModal = document.getElementById('successModal');
const closeSuccessBtn = document.getElementById('closeSuccess');

submitBtn.onclick = () => {
    // Сначала проверим, что email валиден
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && pattern.test(email)) {
        // Закрываем окно регистрации
        document.getElementById('registerModal').style.display = 'none';
        // Показываем окно успеха
        successModal.style.display = 'flex';
    } else {
        emailInput.style.borderColor = 'red';
        emailInput.setCustomValidity("Введите корректный email.");
        emailInput.reportValidity();
    }
};

closeSuccessBtn.onclick = () => {
    successModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
};