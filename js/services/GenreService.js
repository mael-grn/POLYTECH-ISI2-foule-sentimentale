import ApiUtils from "../utils/ApiUtils.js";

export default class GenreService {
    static async getAllGenre() {
        return ApiUtils.get('/genres')
    }
    static async getGenreById(id) {
        return ApiUtils.get('/genres/'+id)
    }
}