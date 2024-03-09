export class DataMapper {
    /**
     * Maps all fields returned from API
     * @param {Array} data 
     * @returns {Array}
     */
    static mapGame(data) {
      return {

        id: data.id,
        checksum: data.checksum,
        artworks: data.artworks,
        cover: data.cover,
        name: data.name,
        screenshots: data.screenshots,
        similar_games: data.similar_games,
        summary: data.summary,
        storyline: data.storyline,
        involved_companies: data.involved_companies
      };
    }
  }
