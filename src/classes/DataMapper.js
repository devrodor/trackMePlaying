export class DataMapper {
    /**
     * 
     * @param {Array} data 
     * @returns {Array}
     */
    static mapGame(data) {
      return {

        id: data.id,
        artworks: data.artworks, 
        cover: data.cover,
        name: data.name,
        screenshots: data.screenshots,
        similar_games: data.similar_games,
        summary: data.summary
      };
    }
  }
