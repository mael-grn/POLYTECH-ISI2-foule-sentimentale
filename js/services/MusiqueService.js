import ApiUtils from "../utils/ApiUtils.js";

export default class MusiqueService {
    static async getFreeMusics() {
        return ApiUtils.get('/musiques/free')
    }
    static async getAllMusics() {
        return ApiUtils.get('/musiques')
    }
    static async getMusicById(id) {
        return ApiUtils.get('/musiques/'+id)
    }
    static async buyMusic(id) {
        return ApiUtils.post('/musiques/'+id+'/buy')
    }
}