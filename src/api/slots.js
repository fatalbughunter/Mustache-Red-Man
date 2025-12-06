import axios from 'axios';

/**
 * Slots API Service
 * Handles all API calls related to slots games
 */

export const slotsApi = {
    /**
     * Get all available game providers
     */
    async getProviders() {
        try {
            const response = await axios.get('/slots/providers');
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Failed to fetch providers');
        } catch (error) {
            console.error('Error fetching providers:', error);
            throw error;
        }
    },

    /**
     * Get games for a specific provider
     * @param {string} providerCode - The provider code
     */
    async getGamesByProvider(providerCode) {
        try {
            const response = await axios.get(`/slots/games/${providerCode}`);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Failed to fetch games');
        } catch (error) {
            console.error(`Error fetching games for provider ${providerCode}:`, error);
            throw error;
        }
    },

    /**
     * Launch a game session
     * @param {string} userId - User ID
     * @param {string} providerCode - Provider code
     * @param {string} gameCode - Game code
     */
    async launchGame(userId, providerCode, gameCode) {
        try {
            const response = await axios.post('/slots/launch', {
                userId,
                gameType: 'slots',
                providerCode,
                gameCode
            });
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Failed to launch game');
        } catch (error) {
            console.error(`Error launching game ${gameCode}:`, error);
            throw error;
        }
    },

    /**
     * Get user info from slots API
     * @param {string} userId - User ID
     */
    async getUserInfo(userId) {
        try {
            const response = await axios.get(`/slots/user/${userId}`);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Failed to fetch user info');
        } catch (error) {
            console.error(`Error fetching user info for ${userId}:`, error);
            throw error;
        }
    },

    /**
     * Get cryptocurrency prices
     * @param {string[]} tokens - Array of token names (ethereum, bitcoin, solana)
     */
    async getCryptoPrices(tokens = ['ethereum', 'bitcoin', 'solana']) {
        try {
            const tokenString = tokens.join(',');
            const response = await axios.get('/slots/prices', {
                params: { tokens: tokenString }
            });
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Failed to fetch prices');
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
            throw error;
        }
    },

    /**
     * Get ETH price
     */
    async getEthPrice() {
        try {
            const response = await axios.get('/slots/price/eth');
            if (response.data.success) {
                return response.data.data.usd;
            }
            throw new Error(response.data.message || 'Failed to fetch ETH price');
        } catch (error) {
            console.error('Error fetching ETH price:', error);
            throw error;
        }
    },

    /**
     * Get BTC price
     */
    async getBtcPrice() {
        try {
            const response = await axios.get('/slots/price/btc');
            if (response.data.success) {
                return response.data.data.usd;
            }
            throw new Error(response.data.message || 'Failed to fetch BTC price');
        } catch (error) {
            console.error('Error fetching BTC price:', error);
            throw error;
        }
    },

    /**
     * Get SOL price
     */
    async getSolPrice() {
        try {
            const response = await axios.get('/slots/price/sol');
            if (response.data.success) {
                return response.data.data.usd;
            }
            throw new Error(response.data.message || 'Failed to fetch SOL price');
        } catch (error) {
            console.error('Error fetching SOL price:', error);
            throw error;
        }
    }
};

export default slotsApi;
