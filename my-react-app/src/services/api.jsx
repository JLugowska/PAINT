const BASE_URL = 'http://152.70.175.119:8080/api';

function formatDateTimeLocalToString(datetimeLocalValue) {
    const date = new Date(datetimeLocalValue);
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}%20`+
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export const api = {
    // Data endpoints
    async getFeeds() {
        const response = await fetch(`${BASE_URL}/feeds/`);
        return await response.json();
    },

    async getFeedsInRange(startDate, endDate) {
        const start = formatDateTimeLocalToString(startDate);
        const end = formatDateTimeLocalToString(endDate);
        const response = await fetch(
            `${BASE_URL}/feeds/range?start=${start}&end=${end}`
        );
        return await response.json();
    },

    async updateFeed(feedData) {
        const response = await fetch(`${BASE_URL}/feeds/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedData)
        });
        return await response.json();
    },

    async pushEdits() {
        const response = await fetch(`${BASE_URL}/feeds/push-edits`);
        return await response.json();
    },

    // User endpoints
    async createUser(userData) {
        const response = await fetch(`${BASE_URL}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    },

    async login(credentials) {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    },

    async updateUser(userData) {
        const response = await fetch(`${BASE_URL}/users/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    },

    async deleteUser(userId) {
        const response = await fetch(`${BASE_URL}/users/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId })
        });
        return await response.json();
    },

    getChartUrl(options) {
        const params = new URLSearchParams();
        if (options.field) params.append('field', options.field);
        if (options.title) params.append('title', options.title);
        if (options.width) params.append('width', options.width);
        if (options.height) params.append('height', options.height);
        if (options.color) params.append('color', options.color.replace('#', ''));
        if (options.start) params.append('start', formatDateTimeLocalToString(options.start) );
        if (options.end) params.append('end', formatDateTimeLocalToString(options.end));
        return `${BASE_URL}/chart?${params.toString()}`;
    }
};