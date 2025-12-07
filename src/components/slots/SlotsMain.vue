<template>
    <div class="slots-container">
        <!-- User Balance Display (Seamless Integration) -->
        <CasinoBalance v-if="authenticated" />

        <!-- Loading State -->
        <div v-if="loading && providers.length === 0" class="loading-state">
            <LoadingAnimation />
            <p>Loading slot providers...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error && providers.length === 0" class="error-state">
            <p class="error-message">{{ error }}</p>
            <ButtonGradient @click="loadProviders" text="Retry" />
        </div>

        <!-- Providers Dropdown -->
        <div v-else class="slots-content">
            <!-- Provider Selection -->
            <div class="providers-section">
                <div class="provider-selector">
                    <label for="provider-dropdown" class="dropdown-label">Select Game Provider:</label>
                    <select 
                        id="provider-dropdown"
                        v-model="selectedProvider" 
                        class="provider-dropdown"
                        @change="selectProvider(selectedProvider)"
                    >
                        <option value="">-- Choose a Provider --</option>
                        <option 
                            v-for="provider in providers"
                            :key="provider.code"
                            :value="provider.code"
                        >
                            {{ provider.name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Games Grid -->
            <div v-if="currentProvider" class="games-section">
                <div class="section-header">
                    <div class="provider-info">
                        <h2 class="section-title">{{ getCurrentProviderName() }}</h2>
                        <span class="game-count">{{ games.length }} Games Available</span>
                    </div>
                    <ButtonGradient @click="clearProvider" text="Clear Selection" small />
                </div>

                <div v-if="gameLoading" class="loading-state">
                    <LoadingAnimation />
                    <p>Loading games...</p>
                </div>
                <div v-else-if="games.length === 0" class="no-games">
                    <p>No games available for this provider</p>
                </div>
                <div v-else class="games-grid">
                    <SlotsGameCard
                        v-for="game in games"
                        :key="game.code"
                        :game="game"
                        :provider-code="currentProvider"
                        @launch="launchGame"
                    />
                </div>
            </div>

            <!-- Crypto Prices -->
            <div class="prices-section">
                <h3 class="section-title">Crypto Prices</h3>
                <div class="prices-grid">
                    <div class="price-card">
                        <span class="price-label">Bitcoin</span>
                        <span class="price-value">{{ formatPrice(cryptoPrices.bitcoin) }}</span>
                    </div>
                    <div class="price-card">
                        <span class="price-label">Ethereum</span>
                        <span class="price-value">{{ formatPrice(cryptoPrices.ethereum) }}</span>
                    </div>
                    <div class="price-card">
                        <span class="price-label">Solana</span>
                        <span class="price-value">{{ formatPrice(cryptoPrices.solana) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Game Modal -->
        <div v-if="gameSession" class="game-modal-overlay" @click="closeGame">
            <div class="game-modal" @click.stop>
                <div class="game-modal-header">
                    <h3>{{ currentGame }}</h3>
                    <button class="close-btn" @click="closeGame">×</button>
                </div>
                <div class="game-modal-content">
                    <SlotsGameFrame :session="gameSession" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import ButtonGradient from '@/components/ButtonGradient.vue';
import CasinoBalance from './CasinoBalance.vue';
import SlotsGameCard from './SlotsGameCard.vue';
import SlotsGameFrame from './SlotsGameFrame.vue';

export default {
    name: 'SlotsMain',
    components: {
        LoadingAnimation,
        ButtonGradient,
        CasinoBalance,
        SlotsGameCard,
        SlotsGameFrame
    },
    data() {
        return {
            gameLoading: false,
            socketUnsubscribe: null,
            selectedProvider: ''
        };
    },
    computed: {
        ...mapGetters('slots', ['providers', 'games', 'currentProvider', 'currentGame', 'gameSession', 'loading', 'error', 'cryptoPrices']),
        ...mapGetters('auth', ['authenticated']),
        ...mapGetters(['socketGeneral'])
    },
    methods: {
        ...mapActions('slots', ['fetchProviders', 'fetchGamesByProvider', 'fetchCryptoPrices', 'resetGameSession', 'clearError', 'fetchUserBalance', 'handleBalanceUpdate']),
        
        async loadProviders() {
            await this.fetchProviders();
        },

        async selectProvider(providerCode) {
            this.gameLoading = true;
            this.selectedProvider = providerCode;
            this.$store.commit('slots_set_current_provider', providerCode);
            await this.fetchGamesByProvider(providerCode);
            this.gameLoading = false;
        },

        getProviderGameCount(providerCode) {
            return this.games.filter(game => game.provider_code === providerCode).length;
        },

        getCurrentProviderName() {
            const provider = this.providers.find(p => p.code === this.currentProvider);
            return provider ? provider.name : 'Games';
        },

        clearProvider() {
            this.selectedProvider = '';
            this.$store.commit('slots_set_current_provider', null);
        },

        formatPrice(price) {
            if (!price) return 'N/A';
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(price);
        },

        setDefaultProviderLogo(event) {
            event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
        },

        closeGame() {
            this.resetGameSession();
        },

        launchGame(gameData) {
            // Handle game launch event from SlotsGameCard
            // The game session is already set by the launchGameSeamless action in the store
            console.log('Game launched:', gameData);
        },

        // Setup real-time balance updates via Socket.io
        setupSocketListeners() {
            const socket = this.socketGeneral;
            if (!socket || !socket.connected) return;

            // Listen for casino balance updates from backend callbacks
            socket.on('casino:balance-update', (update) => {
                this.handleBalanceUpdate(update);
            });

            // Store unsubscribe function for cleanup
            this.socketUnsubscribe = () => {
                if (socket) {
                    socket.off('casino:balance-update');
                }
            };
        }
    },

    async mounted() {
        await this.loadProviders();
        await this.fetchCryptoPrices();

        // Load user balance if authenticated
        if (this.authenticated) {
            await this.fetchUserBalance();
            this.setupSocketListeners();
        }
    },

    beforeUnmount() {
        if (this.socketUnsubscribe) {
            this.socketUnsubscribe();
        }
    },

    watch: {
        authenticated(newVal) {
            if (newVal) {
                this.fetchUserBalance();
                this.setupSocketListeners();
            }
        }
    }
};
</script>

<style scoped>
.slots-container {
    width: 100%;
    min-height: calc(100vh - 80px);
    padding: var(--spacing-lg);
    background: var(--bg-blue-dark);
}

.loading-state,
.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: var(--spacing-lg);
}

.error-message {
    color: #ff6b6b;
    font-size: 16px;
    text-align: center;
}

.slots-content {
    max-width: 1400px;
    margin: 0 auto;
}

.providers-section,
.games-section,
.prices-section {
    margin-bottom: var(--spacing-2xl);
}

.provider-selector {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
    flex-wrap: wrap;
}

.dropdown-label {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

.provider-dropdown {
    padding: var(--spacing-md) var(--spacing-lg);
    border: 2px solid var(--color-copper);
    border-radius: var(--radius-lg);
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 250px;
}

.provider-dropdown:hover {
    border-color: rgba(212, 165, 116, 0.8);
    background: rgba(0, 0, 0, 0.4);
}

.provider-dropdown:focus {
    outline: none;
    border-color: var(--color-copper);
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 15px rgba(212, 165, 116, 0.3);
}

.provider-dropdown option {
    background: #1a1a2e;
    color: #fff;
}

.provider-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
}

.game-count {
    font-size: 14px;
    color: rgba(212, 165, 116, 0.8);
    background: rgba(212, 165, 116, 0.1);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-lg);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.section-title {
    font-size: 28px;
    font-weight: 700;
    background: var(--gradient-copper);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--spacing-lg);
}

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-lg);
}

.no-providers,
.no-games {
    text-align: center;
    padding: var(--spacing-2xl);
    color: rgba(255, 255, 255, 0.6);
}

.prices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
}

.price-card {
    background: rgba(212, 165, 116, 0.1);
    border: 1px solid rgba(212, 165, 116, 0.3);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.price-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
}

.price-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-copper);
}

.game-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-lg);
}

.game-modal {
    background: var(--bg-primary-blue);
    border: 2px solid var(--color-copper);
    border-radius: var(--radius-xl);
    width: 100%;
    height: 100%;
    max-width: 1200px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.game-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
}

.game-modal-header h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-copper);
}

.close-btn {
    background: none;
    border: none;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: color 0.3s ease;
}

.close-btn:hover {
    color: #fff;
}

.game-modal-content {
    flex: 1;
    overflow: auto;
}

@media (max-width: 768px) {
    .providers-grid,
    .games-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .section-title {
        font-size: 22px;
    }
}
</style>
