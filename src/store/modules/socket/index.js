import socketIo from 'socket.io-client';

// Get socket URL with fallback
const getSocketUrl = () => {
    const url = process.env.VUE_APP_SOCKET_URL || 'https://api.novacasino.bet';
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
        console.log('Socket URL:', url);
    }
    return url;
};

// Track error logging to prevent spam
let lastErrorLogTime = {};
const ERROR_LOG_THROTTLE = 10000; // Log errors at most once every 10 seconds per socket

const shouldLogError = (socketName) => {
    const now = Date.now();
    if (!lastErrorLogTime[socketName] || (now - lastErrorLogTime[socketName]) > ERROR_LOG_THROTTLE) {
        lastErrorLogTime[socketName] = now;
        return true;
    }
    return false;
};

// Socket configuration with fallback transport
const socketConfig = {
    auth: {},
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionDelayMax: 30000,
    reconnectionAttempts: 5,
    timeout: 20000,
    transports: ['websocket', 'polling'] // Add polling as fallback
};

const state = {
    socketSendLoading: null,
    socketGeneral: socketIo(getSocketUrl()+'/general', socketConfig),
    socketCrash: socketIo(getSocketUrl()+'/crash', socketConfig),
    socketRoll: socketIo(getSocketUrl()+'/roll', socketConfig),
    socketBlackjack: socketIo(getSocketUrl()+'/blackjack', socketConfig),
    socketDuels: socketIo(getSocketUrl()+'/duels', socketConfig),
    socketMines: socketIo(getSocketUrl()+'/mines', socketConfig),
    socketTowers: socketIo(getSocketUrl()+'/towers', socketConfig),
    socketUnbox: socketIo(getSocketUrl()+'/unbox', socketConfig),
    socketBattles: socketIo(getSocketUrl()+'/battles', socketConfig),
    socketUpgrader: socketIo(getSocketUrl()+'/upgrader', socketConfig),
    socketCashier: socketIo(getSocketUrl()+'/cashier', socketConfig),
    socketAdmin: socketIo(getSocketUrl()+'/admin', socketConfig)
}

const getters = {
    socketSendLoading: state => state.socketSendLoading,
    socketGeneral: state => state.socketGeneral,
    socketCrash: state => state.socketCrash,
    socketRoll: state => state.socketRoll,
    socketBlackjack: state => state.socketBlackjack,
    socketDuels: state => state.socketDuels,
    socketMines: state => state.socketMines,
    socketTowers: state => state.socketTowers,
    socketUnbox: state => state.socketUnbox,
    socketBattles: state => state.socketBattles,
    socketUpgrader: state => state.socketUpgrader,
    socketCashier: state => state.socketCashier,
    socketAdmin: state => state.socketAdmin
}

const mutations = {
    socket_set_send_loading(state, value) {
       state.socketSendLoading = value;
   }
}

const actions = {
    socketSetSendLoading({ commit }, value) {
        commit('socket_set_send_loading', value);
    },
    socketConnectGeneral({ getters, dispatch, rootGetters }) {
        // Set default settings immediately as fallback to prevent infinite loading
        if(rootGetters.generalSettings === null) {
            dispatch('generalSocketConnectionError', null, { root: true });
        }

        // Only connect if not already connected or connecting
        if(getters.socketGeneral.connected === true) {
            getters.socketGeneral.removeAllListeners();
        }
        
        // Set auth token if available
        if(rootGetters.authToken !== null) {
            getters.socketGeneral.auth.token = rootGetters.authToken;
        }

        // Only attempt connection if not already connected
        if(!getters.socketGeneral.connected) {
            getters.socketGeneral.connect();
        }

        dispatch('socketListenGeneral');
        
        // Set a timeout to use default settings if connection fails (reduced timeout)
        setTimeout(() => {
            if(rootGetters.generalSettings === null || (rootGetters.generalSettings.general && rootGetters.generalSettings.general.maintenance === undefined)) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('Socket connection timeout - using default settings');
                }
                dispatch('generalSocketConnectionError', null, { root: true });
            }
        }, 5000); // 5 second timeout (reduced from 10)
    },
    socketDisconnectGeneral({ getters }) {
        getters.socketGeneral.removeAllListeners();
        getters.socketGeneral.disconnect();
    },
    socketListenGeneral({ getters, dispatch }) {
        getters.socketGeneral.on('init', (data) => { dispatch('generalSocketInit', data); dispatch('chatSocketInit', data); });
        getters.socketGeneral.on('settings', (data) => { dispatch('generalSocketSettings', data); });
        getters.socketGeneral.on('user', (data) => { dispatch('generalSocketUser', data); });
        getters.socketGeneral.on('bet', (data) => { dispatch('generalSocketBet', data); });
        getters.socketGeneral.on('rain', (data) => { dispatch('generalSocketRain', data); });
        getters.socketGeneral.on('userTip', (data) => { dispatch('userTipSocket', data); });
        getters.socketGeneral.on('chatOnline', (data) => { dispatch('chatSocketOnline', data); });
        getters.socketGeneral.on('chatMessage', (data) => { dispatch('chatSocketMessage', data); });
        getters.socketGeneral.on('chatRemove', (data) => { dispatch('chatSocketRemove', data); });
        getters.socketGeneral.on('chatClear', (data) => { dispatch('chatSocketClear', data); });
        getters.socketGeneral.on('rainPayout', (data) => { dispatch('rainPayoutSocket', data); });
        getters.socketGeneral.on('connect_error', (error) => {
            // Throttle error logging to prevent console spam
            if (shouldLogError('general')) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('Socket connection error (general):', error.message || error);
                }
            }
            // Don't set default settings on every error, only if settings are still null after timeout
        });
        getters.socketGeneral.on('connect', () => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Socket connected successfully to:', getSocketUrl() + '/general');
            }
            // Reset error log time on successful connection
            lastErrorLogTime['general'] = 0;
        });
        getters.socketGeneral.on('disconnect', (reason) => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Socket disconnected (general):', reason);
            }
        });
        getters.socketGeneral.on('connect_timeout', () => {
            if (shouldLogError('general') && process.env.NODE_ENV === 'development') {
                console.warn('Socket connection timeout (general)');
            }
        });
        getters.socketGeneral.on('reconnect_attempt', (attemptNumber) => {
            if (shouldLogError('general') && process.env.NODE_ENV === 'development') {
                console.log(`Socket reconnection attempt ${attemptNumber} (general)`);
            }
        });
        getters.socketGeneral.on('reconnect_failed', () => {
            if (process.env.NODE_ENV === 'development') {
                console.warn('Socket reconnection failed (general). Please check your connection.');
            }
        });
    },
    socketConnectCrash({ getters, dispatch }) {
        if(getters.socketCrash.connected === true) { getters.socketCrash.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketCrash.auth.token = getters.authToken; }

        getters.socketCrash.disconnect().connect();

        dispatch('socketListenCrash');
    },
    socketDisconnectCrash({ getters }) {
        getters.socketCrash.removeAllListeners();
        getters.socketCrash.disconnect();
    },
    socketListenCrash({ getters, dispatch }) {
        getters.socketCrash.on('init', (data) => { dispatch('crashSocketInit', data); });
        getters.socketCrash.on('game', (data) => { dispatch('crashSocketGame', data); });
        getters.socketCrash.on('tick', (data) => { dispatch('crashSocketTick', data); });
        getters.socketCrash.on('bet', (data) => { dispatch('crashSocketBet', data); });
    },
    socketConnectRoll({ getters, dispatch }) {
        if(getters.socketRoll.connected === true) { getters.socketRoll.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketRoll.auth.token = getters.authToken; }

        getters.socketRoll.disconnect().connect();

        dispatch('socketListenRoll');
    },
    socketDisconnectRoll({ getters }) {
        getters.socketRoll.removeAllListeners();
        getters.socketRoll.disconnect();
    },
    socketListenRoll({ getters, dispatch }) {
        getters.socketRoll.on('init', (data) => { dispatch('rollSocketInit', data); });
        getters.socketRoll.on('game', (data) => { dispatch('rollSocketGame', data); });
        getters.socketRoll.on('bet', (data) => { dispatch('rollSocketBet', data); });
    },
    socketConnectBlackjack({ getters, dispatch }) {
        // Only connect if not already connected
        if(getters.socketBlackjack.connected === true) {
            getters.socketBlackjack.removeAllListeners();
        }
        
        // Set auth token if available
        if(getters.authToken !== null) {
            getters.socketBlackjack.auth.token = getters.authToken;
        }

        // Only attempt connection if not already connected
        if(!getters.socketBlackjack.connected) {
            getters.socketBlackjack.connect();
        }

        dispatch('socketListenBlackjack');
    },
    socketDisconnectBlackjack({ getters }) {
        getters.socketBlackjack.removeAllListeners();
        getters.socketBlackjack.disconnect();
    },
    socketListenBlackjack({ getters, dispatch }) {
        getters.socketBlackjack.on('init', (data) => { dispatch('blackjackSocketInit', data); });
        getters.socketBlackjack.on('table', (data) => { dispatch('blackjackSocketTable', data); });
        getters.socketBlackjack.on('connect_error', (error) => {
            // Throttle error logging to prevent console spam
            if (shouldLogError('blackjack')) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('Socket connection error (blackjack):', error.message || error);
                }
            }
        });
        getters.socketBlackjack.on('connect', () => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Socket connected successfully (blackjack)');
            }
            // Reset error log time on successful connection
            lastErrorLogTime['blackjack'] = 0;
        });
        getters.socketBlackjack.on('disconnect', (reason) => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Socket disconnected (blackjack):', reason);
            }
        });
    },
    socketConnectDuels({ getters, dispatch }) {
        if(getters.socketDuels.connected === true) { getters.socketDuels.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketDuels.auth.token = getters.authToken; }

        getters.socketDuels.disconnect().connect();

        dispatch('socketListenDuels');
    },
    socketDisconnectDuels({ getters }) {
        getters.socketDuels.removeAllListeners();
        getters.socketDuels.disconnect();
    },
    socketListenDuels({ getters, dispatch }) {
        getters.socketDuels.on('init', (data) => { dispatch('duelsSocketInit', data); });
        getters.socketDuels.on('game', (data) => { dispatch('duelsSocketGame', data); });
    },
    socketConnectMines({ getters, dispatch }) {
        if(getters.socketMines.connected === true) { getters.socketMines.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketMines.auth.token = getters.authToken; }

        getters.socketMines.disconnect().connect();

        dispatch('socketListenMines');
    },
    socketDisconnectMines({ getters }) {
        getters.socketMines.removeAllListeners();
        getters.socketMines.disconnect();
    },
    socketListenMines({ getters, dispatch }) {
        getters.socketMines.on('init', (data) => { dispatch('minesSocketInit', data); });
    },
    socketConnectTowers({ getters, dispatch }) {
        if(getters.socketTowers.connected === true) { getters.socketTowers.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketTowers.auth.token = getters.authToken; }

        getters.socketTowers.disconnect().connect();

        dispatch('socketListenTowers');
    },
    socketDisconnectTowers({ getters }) {
        getters.socketTowers.removeAllListeners();
        getters.socketTowers.disconnect();
    },
    socketListenTowers({ getters, dispatch }) {
        getters.socketTowers.on('init', (data) => { dispatch('towersSocketInit', data); });
    },
    socketConnectUnbox({ getters, dispatch }) {
        if(getters.socketUnbox.connected === true) { getters.socketUnbox.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketUnbox.auth.token = getters.authToken; }

        getters.socketUnbox.disconnect().connect();

        dispatch('socketListenUnbox');
    },
    socketDisconnectUnbox({ getters }) {
        getters.socketUnbox.removeAllListeners();
        getters.socketUnbox.disconnect();
    },
    socketListenUnbox({ getters, dispatch }) {
        getters.socketUnbox.on('init', (data) => { dispatch('unboxSocketInit', data); });
    },
    socketConnectBattles({ getters, dispatch }) {
        if(getters.socketBattles.connected === true) { getters.socketBattles.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketBattles.auth.token = getters.authToken; }

        getters.socketBattles.disconnect().connect();

        dispatch('socketListenBattles');
    },
    socketDisconnectBattles({ getters }) {
        getters.socketBattles.removeAllListeners();
        getters.socketBattles.disconnect();
    },
    socketListenBattles({ getters, dispatch }) {
        getters.socketBattles.on('init', (data) => { dispatch('battlesSocketInit', data); });
        getters.socketBattles.on('game', (data) => { dispatch('battlesSocketGame', data); });
    },
    socketConnectUpgrader({ getters, dispatch }) {
        if(getters.socketUpgrader.connected === true) { getters.socketUpgrader.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketUpgrader.auth.token = getters.authToken; }

        getters.socketUpgrader.disconnect().connect();

        dispatch('socketListenUpgrader');
    },
    socketDisconnectUpgrader({ getters }) {
        getters.socketUpgrader.removeAllListeners();
        getters.socketUpgrader.disconnect();
    },
    socketListenUpgrader({ getters, dispatch }) {
        
    },
    socketConnectCashier({ getters, dispatch }) {
        if(getters.socketCashier.connected === true) { getters.socketCashier.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketCashier.auth.token = getters.authToken; }

        getters.socketCashier.disconnect().connect();

        dispatch('socketListenCashier');
    },
    socketDisconnectCashier({ getters }) {
        getters.socketCashier.removeAllListeners();
        getters.socketCashier.disconnect();
    },
    socketListenCashier({ getters, dispatch }) {
        getters.socketCashier.on('robuxOffer', (data) => { dispatch('cashierSocketRobuxOffer', data); });
        getters.socketCashier.on('limitedTransaction', (data) => { dispatch('cashierSocketLimitedTransaction', data); });
        getters.socketCashier.on('cryptoTransaction', (data) => { dispatch('cashierSocketCryptoTransaction', data); });
    },
    socketConnectAdmin({ getters, dispatch }) {
        if(getters.socketAdmin.connected === true) { getters.socketAdmin.removeAllListeners(); }
        if(getters.authToken !== null) { getters.socketAdmin.auth.token = getters.authToken; }

        getters.socketAdmin.disconnect().connect();

        dispatch('socketListenAdmin');
    },
    socketDisconnectAdmin({ getters }) {
        getters.socketAdmin.removeAllListeners();
        getters.socketAdmin.disconnect();
    },
    socketListenAdmin({ getters, dispatch }) {

    }
}

const socket = {
    state,
    mutations,
    actions,
    getters
}

export default socket;
