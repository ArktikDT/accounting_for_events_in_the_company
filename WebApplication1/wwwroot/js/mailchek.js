const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', () => {
  const email = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailInput.style.borderColor = '#ccc';
    emailInput.setCustomValidity("");
  } else if (!pattern.test(email)) {
    emailInput.style.borderColor = 'red';
    emailInput.setCustomValidity("Введите корректный email.");
    emailInput.reportValidity();
  } else {
    emailInput.style.borderColor = '#ccc';
    emailInput.setCustomValidity("");
  }
});