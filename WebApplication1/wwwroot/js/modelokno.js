// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// generate events


//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

// Открываем модальное окно при нажатии на кнопку
btn.onclick = function () {
    modal.style.display = "block";
}

// Закрываем модальное окно при нажатии на "x"
span.onclick = function () {
    modal.style.display = "none";
}

// Закрываем модальное окно при нажатии вне области модального окна
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}