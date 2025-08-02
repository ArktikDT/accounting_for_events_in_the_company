const modal = document.getElementById('registerModal');
const openBtn = document.getElementById('openRegisterBtn');
const closeBtn = document.getElementById('closeModal');

openBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';

const experienceInput = document.getElementById('experience');
document.getElementById('increase').onclick = () => {
  experienceInput.value = parseInt(experienceInput.value) + 1;
};
document.getElementById('decrease').onclick = () => {
  if (parseInt(experienceInput.value) > 0) {
    experienceInput.value = parseInt(experienceInput.value) - 1;
  }
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};