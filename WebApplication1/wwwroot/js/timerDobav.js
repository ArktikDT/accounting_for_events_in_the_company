document.addEventListener('DOMContentLoaded', () => {
    let targetDate;

    const loadTargetDate = () => {
        const saved = JSON.parse(localStorage.getItem('chatEvents') || '[]');
        if (saved.length > 0) {
            targetDate = new Date(saved[0].eventDate);
        } else {
            targetDate = new Date('2027-12-31T23:59:59');
        }
    };

    const countdown = () => {
        const now = new Date();

        if (!targetDate || isNaN(targetDate.getTime()) || targetDate < now) {
            updateUI(0, 0, 0, 0, 0, 0);
            return;
        }

        let years = targetDate.getFullYear() - now.getFullYear();
        let months = targetDate.getMonth() - now.getMonth();
        let days = targetDate.getDate() - now.getDate();
        let hours = targetDate.getHours() - now.getHours();
        let minutes = targetDate.getMinutes() - now.getMinutes();
        let seconds = targetDate.getSeconds() - now.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        updateUI(years, months, days, hours, minutes, seconds);
    };

    const updateUI = (y, mo, d, h, mi, s) => {
        document.getElementById('years').innerText = y;
        document.getElementById('months').innerText = mo;
        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h;
        document.getElementById('minutes').innerText = mi;
        document.getElementById('seconds').innerText = s;
    };

    loadTargetDate();
    countdown();
    setInterval(countdown, 1000);

    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    document.getElementById('set-date').onclick = () => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    };

    document.getElementById('close-modal').onclick = () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    };

    document.getElementById('save-date').onclick = () => {
        const datetime = document.getElementById('datetime').value;
        const eventType = document.getElementById('event-type').value;
        const description = document.getElementById('description').value;

        if (!datetime) {
            alert("Введите дату и время");
            return;
        }

        const parsedDate = new Date(datetime);
        if (isNaN(parsedDate.getTime())) {
            alert("Некорректная дата");
            return;
        }

        const newEvent = {
            eventType,
            eventDate: parsedDate.toISOString(),
            description,
            users: []
        };

        saveEventToChat(newEvent);
        targetDate = parsedDate;
        countdown();

        modal.style.display = 'none';
        overlay.style.display = 'none';
    };
});