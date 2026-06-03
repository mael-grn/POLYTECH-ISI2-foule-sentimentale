import ApiUtils from "../utils/ApiUtils.js";

export default class ArtisteService {
    static async getAllArtists() {
        return ApiUtils.get('/artistes')
    }
    static async getArtistById(id) {
        return ApiUtils.get('/artistes/' + id)
    }
}