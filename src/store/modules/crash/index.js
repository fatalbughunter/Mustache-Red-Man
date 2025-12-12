const state = {
    crashGame: null,
    crashMultiplier: 1,
    crashBets: [],
    crashHistory: []
}

const getters = {
    crashGame: state => state.crashGame,
    crashMultiplier: state => state.crashMultiplier,
    crashBets: state => state.crashBets,
    crashHistory: state => state.crashHistory
}

const mutations = {
    crash_set_game(state, game) {
        state.crashGame = game;
    },
    crash_set_multiplier(state, multiplier) {
        state.crashMultiplier = multiplier;
    },
    crash_set_bets(state, bets) {
        state.crashBets = bets;
    },
    crash_add_bets(state, bet) {
        state.crashBets.unshift(bet);
    },
    crash_update_bets(state, bet) {
        const index = state.crashBets.findIndex((element) => element._id === bet._id);
        if(index !== -1) {
            state.crashBets.splice(index, 1, bet);
        }
    },
    crash_set_history(state, history) {
        state.crashHistory = history;
    },
    crash_add_history(state, game) {
        state.crashHistory.unshift(game);
    },
    crash_remove_last_history(state) {
        state.crashHistory.pop();
    }
}

const actions = {
    crashSocketInit({ commit }, data) {
        commit('crash_set_game', data.game);
        commit('crash_set_bets', data.bets);
        commit('crash_set_history', data.history);
    },
    crashSocketGame({ getters, commit }, data) {
        if(!data || !data.game) {
            return;
        }
        commit('crash_set_game', data.game);

        if(data.game.state === 'completed') {
            commit('crash_add_history', data.game);
            if(getters.crashHistory.length > 25) { commit('crash_remove_last_history'); }

            commit('crash_set_multiplier', 1);
        } else if(data.game.state === 'created') {
            // Only clear bets that have been cashed out (have multipliers)
            // Preserve active bets (no multiplier) as they belong to the current/upcoming game
            const activeBets = getters.crashBets.filter((bet) => bet.multiplier === undefined || bet.multiplier === null);
            commit('crash_set_bets', activeBets);
        }
    },
    crashSocketTick({ commit }, data) {
        if(data && data.multiplier !== undefined && data.multiplier !== null) {
            commit('crash_set_multiplier', data.multiplier);
        }
    },
    crashSocketBet({ getters, commit }, data) {
        if(!data || !data.bet || !data.bet._id) {
            return;
        }
        if(getters.crashBets.some((element) => element._id === data.bet._id) === true) {
            commit('crash_update_bets', data.bet);
        } else {
            commit('crash_add_bets', data.bet);
        }
    },
    crashSendBetSocket({ getters, commit, dispatch }, data) {
        if(getters.socketCrash === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'CrashBet');

        getters.socketCrash.emit('sendBet', data, (res) => {
            if(!res) {
                dispatch('notificationShow', { type: 'error', message: 'No response from server.' });
                commit('socket_set_send_loading', null);
                return;
            }

            if(res.success === true) {
                if(res.user) {
                    commit('auth_update_user', res.user);
                }
            } else {
                dispatch('notificationShow', res.error || { type: 'error', message: 'Failed to place bet.' });
            }

            commit('socket_set_send_loading', null);
        });
    },
    crashSendCashoutSocket({ getters, commit, dispatch }, data) {
        if(getters.socketCrash === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'CrashCashout');

        getters.socketCrash.emit('sendCashout', data, (res) => {
            if(!res) {
                dispatch('notificationShow', { type: 'error', message: 'No response from server.' });
                commit('socket_set_send_loading', null);
                return;
            }

            if(res.success === true) {
                if(res.user) {
                    commit('auth_update_user', res.user);
                }
            } else {
                dispatch('notificationShow', res.error || { type: 'error', message: 'Failed to cash out.' });
            }

            commit('socket_set_send_loading', null);
        });
    }
}

const crash = {
    state,
    mutations,
    actions,
    getters
}

export default crash;
