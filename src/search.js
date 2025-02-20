import axios from 'axios';

export const searchForStopPoint = async (accessToken, searchText) => {
    try {
        const response = await axios({
            method: 'get',
            url: `https://ext-api.vasttrafik.se/pr/v4/locations/by-text?q=${searchText}&types=stoparea&limit=5&`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.results.map(stop => ({
            name: stop.name,
            gid: stop.gid
        }));
    } catch (error) {
        throw error;
    }
};