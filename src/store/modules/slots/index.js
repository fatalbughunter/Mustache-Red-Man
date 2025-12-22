import axios from 'axios';

const state = {
    providers: [],
    games: [],
    currentProvider: null,
    currentGame: null,
    gameSession: null,
    loading: false,
    error: null,
    cryptoPrices: {
        ethereum: null,
        bitcoin: null,
        solana: null
    },
    gameHistory: [],
    // Seamless integration state
    userBalance: {
        realBalance: 0
    },
    transactionHistory: [],
    favorites: [],
    lastTransaction: null
};

const getters = {
    providers: state => state.providers,
    games: state => state.games,
    currentProvider: state => state.currentProvider,
    currentGame: state => state.currentGame,
    gameSession: state => state.gameSession,
    loading: state => state.loading,
    error: state => state.error,
    cryptoPrices: state => state.cryptoPrices,
    gameHistory: state => state.gameHistory,
    // Seamless integration getters
    userBalance: state => state.userBalance,
    currentUserBalance: state => state.userBalance.realBalance || 0,
    transactionHistory: state => state.transactionHistory,
    favorites: state => state.favorites,
    lastTransaction: state => state.lastTransaction
};

const mutations = {
    slots_set_providers(state, providers) {
        state.providers = providers;
    },
    slots_set_games(state, games) {
        state.games = games;
    },
    slots_set_current_provider(state, provider) {
        state.currentProvider = provider;
    },
    slots_set_current_game(state, game) {
        state.currentGame = game;
    },
    slots_set_game_session(state, session) {
        state.gameSession = session;
    },
    slots_set_loading(state, loading) {
        state.loading = loading;
    },
    slots_set_error(state, error) {
        state.error = error;
    },
    slots_set_crypto_prices(state, prices) {
        state.cryptoPrices = { ...state.cryptoPrices, ...prices };
    },
    slots_set_eth_price(state, price) {
        state.cryptoPrices.ethereum = price;
    },
    slots_set_btc_price(state, price) {
        state.cryptoPrices.bitcoin = price;
    },
    slots_set_sol_price(state, price) {
        state.cryptoPrices.solana = price;
    },
    slots_add_game_history(state, game) {
        state.gameHistory.unshift(game);
    },
    slots_clear_error(state) {
        state.error = null;
    },
    // Seamless integration mutations
    slots_set_user_balance(state, balance) {
        state.userBalance = balance;
    },
    slots_update_balance(state, amount) {
        state.userBalance.realBalance = amount;
    },
    slots_set_transaction_history(state, transactions) {
        state.transactionHistory = transactions;
    },
    slots_add_transaction(state, transaction) {
        state.transactionHistory.unshift(transaction);
        state.lastTransaction = transaction;
    },
    slots_set_favorites(state, favorites) {
        state.favorites = Array.isArray(favorites) ? favorites : [];
    },
    slots_add_favorite(state, gameCode) {
        if (!state.favorites.includes(gameCode)) {
            state.favorites.push(gameCode);
        }
    },
    slots_remove_favorite(state, gameCode) {
        const index = state.favorites.indexOf(gameCode);
        if (index > -1) {
            state.favorites.splice(index, 1);
        }
    }
};

const actions = {
    /**
     * Fetch all available game providers
     */
    async fetchProviders({ commit, dispatch }) {
        commit('slots_set_loading', true);
        commit('slots_clear_error');
        
        try {
            const response = await axios.get('/slots/providers');
            
            if (response.data.success) {
                commit('slots_set_providers', response.data.data);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch providers');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch providers';
            commit('slots_set_error', message);
            dispatch('notificationShow', message);
            return [];
        } finally {
            commit('slots_set_loading', false);
        }
    },

    /**
     * Fetch games for a specific provider
     */
    async fetchGamesByProvider({ commit, dispatch }, providerCode) {
        if (!providerCode) {
            const error = 'Provider code is required';
            commit('slots_set_error', error);
            dispatch('notificationShow', error);
            return [];
        }

        commit('slots_set_loading', true);
        commit('slots_clear_error');
        
        try {
            const response = await axios.get(`/slots/games/${providerCode}`);
            
            if (response.data.success) {
                commit('slots_set_games', response.data.data);
                commit('slots_set_current_provider', providerCode);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch games');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch games';
            commit('slots_set_error', message);
            dispatch('notificationShow', message);
            return [];
        } finally {
            commit('slots_set_loading', false);
        }
    },

    /**
     * Launch a game session
     */
    async launchGame({ commit, dispatch, rootGetters }, { providerCode, gameCode }) {
        if (!providerCode || !gameCode) {
            const error = 'Provider code and game code are required';
            commit('slots_set_error', error);
            dispatch('notificationShow', { type: 'error', message: error }, { root: true });
            return null;
        }

        const userId = rootGetters['userId'];
        if (!userId) {
            const error = 'User must be authenticated to launch a game';
            commit('slots_set_error', error);
            dispatch('notificationShow', { type: 'error', message: error }, { root: true });
            return null;
        }

        commit('slots_set_loading', true);
        commit('slots_clear_error');
        
        try {
            const response = await axios.post('/slots/launch', {
                userId,
                gameType: 'slots',
                providerCode,
                gameCode
            });
            
            if (response.data.success) {
                commit('slots_set_game_session', response.data.data);
                commit('slots_set_current_game', gameCode);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to launch game');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to launch game';
            commit('slots_set_error', message);
            dispatch('notificationShow', { type: 'error', message }, { root: true });
            return null;
        } finally {
            commit('slots_set_loading', false);
        }
    },

    /**
     * Fetch cryptocurrency prices
     */
    async fetchCryptoPrices({ commit, dispatch }, tokens = ['ethereum', 'bitcoin', 'solana']) {
        commit('slots_set_loading', true);
        commit('slots_clear_error');
        
        try {
            const tokenString = tokens.join(',');
            const response = await axios.get('/slots/prices', {
                params: { tokens: tokenString }
            });
            
            if (response.data.success) {
                const prices = {
                    ethereum: response.data.data.ethereum || null,
                    bitcoin: response.data.data.bitcoin || null,
                    solana: response.data.data.solana || null
                };
                commit('slots_set_crypto_prices', prices);
                return prices;
            } else {
                throw new Error(response.data.message || 'Failed to fetch prices');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch crypto prices';
            console.warn('Crypto price fetch warning:', message);
            // Don't dispatch notification for price fetches as they're secondary
            return null;
        } finally {
            commit('slots_set_loading', false);
        }
    },

    /**
     * Fetch ETH price
     */
    async fetchEthPrice({ commit, dispatch }) {
        try {
            const response = await axios.get('/slots/price/eth');
            
            if (response.data.success) {
                commit('slots_set_eth_price', response.data.data.usd);
                return response.data.data.usd;
            }
        } catch (error) {
            console.warn('ETH price fetch failed:', error.message);
            return null;
        }
    },

    /**
     * Fetch BTC price
     */
    async fetchBtcPrice({ commit, dispatch }) {
        try {
            const response = await axios.get('/slots/price/btc');
            
            if (response.data.success) {
                commit('slots_set_btc_price', response.data.data.usd);
                return response.data.data.usd;
            }
        } catch (error) {
            console.warn('BTC price fetch failed:', error.message);
            return null;
        }
    },

    /**
     * Fetch SOL price
     */
    async fetchSolPrice({ commit, dispatch }) {
        try {
            const response = await axios.get('/slots/price/sol');
            
            if (response.data.success) {
                commit('slots_set_sol_price', response.data.data.usd);
                return response.data.data.usd;
            }
        } catch (error) {
            console.warn('SOL price fetch failed:', error.message);
            return null;
        }
    },

    /**
     * Add game to history
     */
    addToGameHistory({ commit }, game) {
        commit('slots_add_game_history', game);
    },

    /**
     * Clear error message
     */
    clearError({ commit }) {
        commit('slots_clear_error');
    },

    /**
     * Reset game session
     */
    resetGameSession({ commit }) {
        commit('slots_set_game_session', null);
        commit('slots_set_current_game', null);
    },

    /**
     * Fetch user balance (Seamless integration)
     */
    async fetchUserBalance({ commit, dispatch }) {
        try {
            const response = await axios.post('/casino/user-balance');
            
            if (response.data.success) {
                commit('slots_set_user_balance', response.data.data);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch balance');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch user balance';
            console.error('Error fetching balance:', message);
            dispatch('notificationShow', message);
            return null;
        }
    },

    /**
     * Launch game (Seamless integration)
     */
    async launchGameSeamless({ commit, dispatch, rootGetters }, { providerCode, gameCode }) {
        if (!providerCode || !gameCode) {
            const error = 'Provider code and game code are required';
            commit('slots_set_error', error);
            dispatch('notificationShow', { type: 'error', message: error });
            return null;
        }

        const userId = rootGetters['userId'];
        if (!userId) {
            const error = 'User must be authenticated to launch a game';
            commit('slots_set_error', error);
            dispatch('notificationShow', { type: 'error', message: error }, { root: true });
            return null;
        }

        commit('slots_set_loading', true);
        commit('slots_clear_error');

        try {
            const response = await axios.post('/casino/game-launch', {
                provider_code: providerCode,
                game_code: gameCode
            });

            if (response.data.success) {
                commit('slots_set_game_session', response.data.data);
                commit('slots_set_current_game', gameCode);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to launch game');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to launch game';
            commit('slots_set_error', message);
            dispatch('notificationShow', { type: 'error', message }, { root: true });
            return null;
        } finally {
            commit('slots_set_loading', false);
        }
    },

    /**
     * Fetch transaction history (Seamless integration)
     */
    async fetchTransactionHistory({ commit, dispatch }, { limit = 50, offset = 0 }) {
        try {
            const response = await axios.post('/casino/transaction-history', { limit, offset });

            if (response.data.success) {
                commit('slots_set_transaction_history', response.data.data.transactions);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch transaction history');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch transaction history';
            console.error('Error fetching transactions:', message);
            dispatch('notificationShow', message);
            return null;
        }
    },

    /**
     * Handle real-time balance update (from Socket.io)
     * Seamless mode - update main balance in auth store
     */
    handleBalanceUpdate({ commit, dispatch, rootState }, update) {
        const { newBalance } = update;
        
        // Update main auth balance (already in dollars)
        commit('authUpdateUserBalance', newBalance, { root: true });
        
        // Add transaction to history
        commit('slots_add_transaction', update);
    },

    /**
     * Add favorite game
     */
    async addFavorite({ commit, dispatch }, gameCode) {
        try {
            const favorites = state.favorites.includes(gameCode) 
                ? state.favorites 
                : [...state.favorites, gameCode];
            
            const response = await axios.post('/casino/setfavorites', {
                favorites: favorites.join(',')
            });

            if (response.data.success) {
                commit('slots_add_favorite', gameCode);
                return true;
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
            dispatch('notificationShow', 'Failed to add favorite');
            return false;
        }
    },

    /**
     * Remove favorite game
     */
    async removeFavorite({ commit, dispatch }, gameCode) {
        try {
            const favorites = state.favorites.filter(code => code !== gameCode);
            
            const response = await axios.post('/casino/setfavorites', {
                favorites: favorites.join(',')
            });

            if (response.data.success) {
                commit('slots_remove_favorite', gameCode);
                return true;
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
            dispatch('notificationShow', 'Failed to remove favorite');
            return false;
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
