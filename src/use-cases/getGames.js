import { ApiClient } from "../classes/ApiClient";

export const getGames = async ( fields, params ) => {

    const apiClient = new ApiClient();
    try {
        const accessToken = await apiClient.generateToken();
        if (!accessToken) {
            throw new Error('Unable to retrieve access token');
        }
        const games = await apiClient.getGames(accessToken, '/games', fields, params);
        console.log(games);
    } catch (error) {
        console.error('Error:', error);
    }
};
 