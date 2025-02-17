import axios from 'axios';

export const searchForStopPoint = async (accessToken, searchText) => {
    try {
        const response = await axios({
            method: 'get',
            url: `https://ext-api.vasttrafik.se/pr/v4/locations/by-text?q=${searchText}&limit=10`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};