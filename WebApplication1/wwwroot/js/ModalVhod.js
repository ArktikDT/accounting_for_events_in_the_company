function openModal() {
    document.getElementById('modalOverlay').style.display = 'flex';
}
function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modalOverlay');
    if (event.target === modal) {
        closeModal();
    }
}

function submitForm() {
    const input1 = document.getElementById('input1').value.trim();
    const input2 = document.getElementById('input2').value.trim();

    if (!input1 || !input2) {
        alert('Пожалуйста, заполните оба поля!');
        return;
    }
    alert('Успешный вход!');
    closeModal();
}