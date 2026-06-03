export default class ApiUtils {
    static endpoint = 'http://localhost:8000/api';

    static async fetcher(path, method, body) {
        try {
            const token = localStorage.getItem('token');

            const res = await fetch(this.endpoint + path, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body ? JSON.stringify(body) : null
            });

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Erreur inconnue", {
                    cause: { status: res.status, message: data.message || "Erreur inconnue" }
                });
            }
            
            if (data && data.access_token) {
                localStorage.setItem('token', data.access_token.split('|')[1])
            }

            return data;
        } catch (e) {
            console.error(e)
            const status = e.cause?.status || "Inconnu";
            const msg = e.cause?.message || e.message;
            throw new Error(`Error ${status} : ${msg}`);
        }
    }
    static async get(path) {
        return await this.fetcher(path, 'GET', null)
    }
    static async post(path, body) {
        return await this.fetcher(path, 'POST', body)
    }
    static async put(path, body) {
        return await this.fetcher(path, 'PUT', body)
    }
    static async delete(path) {
        return await this.fetcher(path, 'DELETE', body)
    }
}