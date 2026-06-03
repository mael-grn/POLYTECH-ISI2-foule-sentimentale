import ApiUtils from "../utils/ApiUtils.js";

export default class UserService {
    static async getMyAccount() {
        return ApiUtils.get('/me')
    }
    static async login(email, password) {
        return ApiUtils.post('/login', {email: email, mot_de_passe: password})
    }
    static async register(nom, email, password) {
        return ApiUtils.post('/register', {nom: nom, email: email, mot_de_passe: password})
    }
    static async logout() {
        ApiUtils.post('/logout')
        localStorage.removeItem('token')
    }
}