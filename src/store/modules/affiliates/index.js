const state = {
    affiliatesData: {
        data: null,
        referred: null,
        loading: false
    }
}

const getters = {
    affiliatesData: state => state.affiliatesData
}

const mutations = {
    affiliates_set_data_data(state, data) {
        state.affiliatesData.data = data;
    },
    affiliates_set_data_referred(state, referred) {
        state.affiliatesData.referred = referred;
    },
    affiliates_set_data_loading(state, status) {
        state.affiliatesData.loading = status;
    }
}

const actions = {
    affiliatesGetDataSocket({ getters, commit, dispatch }, data) {
        if(getters.socketGeneral === null || getters.affiliatesData.loading === true) { return; }
        commit('affiliates_set_data_loading', true);

        getters.socketGeneral.emit('getAffiliateData', data, (res) => {
            if(res.success === true) {
                commit('affiliates_set_data_data', res.data);
                commit('affiliates_set_data_referred', res.referred);
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('affiliates_set_data_loading', false);
        });
    },
    affiliatesSendCodeSocket({ getters, commit, dispatch }, data) {
        if(getters.socketGeneral === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'AffiliatesCode');

        getters.socketGeneral.emit('sendAffiliateCode', data, (res) => {
            if(res.success === true) {
                commit('affiliates_set_data_data', res.data);
                
                dispatch('notificationShow', { type: 'success', message: 'You have successfully updated your affiliate code.' });
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    },
    affiliatesSendClaimCodeSocket({ getters, commit, dispatch, rootGetters }, data) {
        if(getters.socketGeneral === null || getters.socketSendLoading !== null) { return; }
        
        // Check if user is authenticated
        if(rootGetters.authUser === null || rootGetters.authUser.user === null) {
            dispatch('notificationShow', { type: 'error', message: 'Please sign in to perform this action.' });
            return;
        }

        // Ensure we have an auth token
        if(rootGetters.authToken === null) {
            dispatch('notificationShow', { type: 'error', message: 'Please sign in to perform this action.' });
            return;
        }

        // Always ensure socket auth token is set and refreshed before sending
        // This is critical for proper authentication, especially for general users
        getters.socketGeneral.auth.token = rootGetters.authToken;

        // If socket is not connected, ensure it connects with proper auth
        if(!getters.socketGeneral.connected) {
            // Ensure auth is set before connecting
            getters.socketGeneral.auth.token = rootGetters.authToken;
            getters.socketGeneral.connect();
            
            // Wait for connection, then retry
            const connectHandler = () => {
                getters.socketGeneral.off('connect', connectHandler);
                dispatch('affiliatesSendClaimCodeSocket', data);
            };
            getters.socketGeneral.once('connect', connectHandler);
            
            // Timeout if connection takes too long
            setTimeout(() => {
                getters.socketGeneral.off('connect', connectHandler);
                if(!getters.socketGeneral.connected) {
                    dispatch('notificationShow', { type: 'error', message: 'Connection error. Please refresh the page and try again.' });
                }
            }, 3000);
            return;
        }

        commit('socket_set_send_loading', 'AffiliatesClaimCode');

        getters.socketGeneral.emit('sendAffiliateClaimCode', data, (res) => {
            if(res.success === true) {
                commit('auth_update_user', res.user);

                dispatch('notificationShow', { type: 'success', message: 'You have successfully claimed a affiliate code.' });
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    },
    affiliatesSendClaimEarningsSocket({ getters, commit, dispatch }, data) {
        if(getters.socketGeneral === null || getters.socketSendLoading !== null) { return; }
        commit('socket_set_send_loading', 'AffiliatesClaimEarnings');

        getters.socketGeneral.emit('sendAffiliateClaimEarnings', data, (res) => {
            if(res.success === true) {
                commit('auth_update_user', res.user);
                commit('affiliates_set_data_data', res.user.affiliates);

                dispatch('notificationShow', { type: 'success', message: 'You have successfully claimed your affiliate earnings.' });
            } else {
                dispatch('notificationShow', res.error);
            }

            commit('socket_set_send_loading', null);
        });
    }
}

const affiliates = {
    state,
    mutations,
    actions,
    getters
}

export default affiliates;
