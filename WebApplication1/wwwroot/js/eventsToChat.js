// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// generate events


//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

// Добавление события в список и сохранение в localStorage
// ========== Сохранение события в localStorage и отображение ==========

// ===== Сохранение события с уникальным ID =====
// ===== Сохранение события с уникальным ID =====
function saveEventToChat(eventData) {
    const existing = JSON.parse(localStorage.getItem('chatEvents') || '[]');
    eventData.id = Date.now(); // уникальный ID
    existing.push(eventData);
    localStorage.setItem('chatEvents', JSON.stringify(existing));
    renderEventToChat(eventData);
    updateClosestEvents();
}

// ===== Отображение одного события =====
function renderEventToChat({ id, eventType, eventDate, description }) {
    const container = document.getElementById('chat-events');
    if (!container) return;

    const div = document.createElement('div');
    div.classList.add('chat-event');
    div.dataset.eventId = id;

    div.innerHTML = `
        <strong>${eventType}</strong>

        <small>${new Date(eventDate).toLocaleString()}</small>

        <em>${description || 'Без описания'}</em>

        <button class="delete-event" data-id="${id}">Удалить</button>
    `;

    container.appendChild(div);
}

// ===== Загрузка всех событий =====
function loadAllEventsToChat() {
    const container = document.getElementById('chat-events');
    if (!container) return;

    container.innerHTML = '';
    const events = JSON.parse(localStorage.getItem('chatEvents') || '[]');
    events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    events.forEach(renderEventToChat);
}

// ===== Удаление события по ID =====
function deleteEventFromChat(id) {
    const events = JSON.parse(localStorage.getItem('chatEvents') || '[]');
    const updated = events.filter(event => event.id !== id);
    localStorage.setItem('chatEvents', JSON.stringify(updated));
    loadAllEventsToChat();
    updateClosestEvents();
}

// ===== Обновление ближайших событий =====
function updateClosestEvents() {
    const events = JSON.parse(localStorage.getItem('chatEvents') || '[]');
    const now = new Date();

    let closestMeeting = null;
    let closestDeadline = null;

    events.forEach(event => {
        const date = new Date(event.eventDate);
        if (isNaN(date.getTime()) || date < now) return;

        const type = event.eventType.toLowerCase();

        if (type.includes('план') || type.includes('встреч') || type.includes('собран')) {
            if (!closestMeeting || date < new Date(closestMeeting.eventDate)) {
                closestMeeting = event;
            }
        }

        if (type.includes('дедлайн')) {
            if (!closestDeadline || date < new Date(closestDeadline.eventDate)) {
                closestDeadline = event;
            }
        }
    });

    const format = d => new Date(d).toLocaleString();

    const timeland1 = document.getElementById('timeland1');
    const timeland2 = document.getElementById('timeland2');

    if (timeland1) {
        timeland1.innerHTML = closestMeeting
            ? `
            <div class="event-card meeting">
                <div class="icon">📅</div>
                <div class="info">
                    <strong>Ближайшая планёрка</strong>

                    <span class="description">${closestMeeting.description || '—'}</span>

                    <span class="date">${format(closestMeeting.eventDate)}</span>
                </div>
                 <div class="event-image">
            <img src="images/icon.gif" alt="Песочные часы анимированные">
                 </div>
            </div>`

            : `<em>Нет ближайших планёрок</em>`;
    }

    if (timeland2) {
        timeland2.innerHTML = closestDeadline
            ? `
            <div class="event-card deadline">
                <div class="icon">⏰</div>
                <div class="info">
                    <strong>Ближайший дедлайн</strong>

                    <span class="description">${closestDeadline.description || '—'}</span>

                    <span class="date">${format(closestDeadline.eventDate)}</span>
                </div>
                 <div class="event-image">
            <img src="images/icon.gif" alt="Песочные часы анимированные">
                 </div>
            </div>`
            : `<em>Нет ближайших дедлайнов</em>`;
    }
}

// ===== Инициализация =====
document.addEventListener('DOMContentLoaded', () => {
    loadAllEventsToChat();
    updateClosestEvents();

    document.getElementById('chat-events')?.addEventListener('click', e => {
        if (e.target.classList.contains('delete-event')) {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Удалить это событие?')) {
                deleteEventFromChat(id);
            }
        }
    });
});