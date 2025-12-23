<template>
    <div class="slots-container">
        <!-- User Balance Display (Seamless Integration) -->
        <CasinoBalance v-if="authenticated" />

        <!-- Loading State -->
        <div v-if="loading && providers.length === 0" class="loading-state providers-loading">
            <div class="loading-content">
                <div class="slot-spinner">
                    <div class="spinner-reel">
                        <span>🎰</span>
                    </div>
                    <div class="spinner-reel delay-1">
                        <span>💎</span>
                    </div>
                    <div class="spinner-reel delay-2">
                        <span>🍀</span>
                    </div>
                </div>
                <div class="loading-text">
                    <span class="loading-title">Loading Providers</span>
                    <div class="loading-dots">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
                <p class="loading-hint">Connecting to game providers...</p>
            </div>
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
                            v-for="provider in filteredProviders"
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
                        <span class="game-count">{{ filteredGames.length }} of {{ games.length }} Games</span>
                    </div>
                    <ButtonGradient @click="clearProvider" text="Clear Selection" small />
                </div>

                <!-- Search Input -->
                <div class="search-section">
                    <div class="search-input-wrapper">
                        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input 
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Search games..." 
                            class="search-input"
                        />
                        <button v-if="searchQuery" @click="searchQuery = ''" class="search-clear">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div v-if="gameLoading" class="loading-state games-loading">
                    <div class="loading-content">
                        <div class="slot-spinner">
                            <div class="spinner-reel">
                                <span>🎰</span>
                            </div>
                            <div class="spinner-reel delay-1">
                                <span>💎</span>
                            </div>
                            <div class="spinner-reel delay-2">
                                <span>🍀</span>
                            </div>
                        </div>
                        <div class="loading-text">
                            <span class="loading-title">Loading Games</span>
                            <div class="loading-dots">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                        </div>
                        <p class="loading-hint">Please wait while we fetch the best games for you</p>
                    </div>
                </div>
                <div v-else-if="filteredGames.length === 0" class="no-games">
                    <p v-if="searchQuery">No games found matching "{{ searchQuery }}"</p>
                    <p v-else>No games available for this provider</p>
                </div>
                <div v-else class="games-grid">
                    <SlotsGameCard
                        v-for="game in filteredGames"
                        :key="game.code"
                        :game="game"
                        :provider-code="currentProvider"
                        @launch="launchGame"
                    />
                </div>
            </div>

        </div>

        <!-- Payment Section -->
        <div class="slots-payment-section">
            <Payment />
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

        <!-- Scroll to Top Button - Hidden when game is playing -->
        <button 
            v-show="showScrollTop && !gameSession" 
            @click="scrollToTop" 
            class="scroll-to-top"
            title="Back to Top"
        >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import ButtonGradient from '@/components/ButtonGradient.vue';
import CasinoBalance from './CasinoBalance.vue';
import SlotsGameCard from './SlotsGameCard.vue';
import SlotsGameFrame from './SlotsGameFrame.vue';
import Payment from '@/components/Payment.vue';

export default {
    name: 'SlotsMain',
    components: {
        LoadingAnimation,
        ButtonGradient,
        CasinoBalance,
        SlotsGameCard,
        SlotsGameFrame,
        Payment
    },
    data() {
        return {
            gameLoading: false,
            socketUnsubscribe: null,
            selectedProvider: '',
            allowedProviders: ['INOUT', 'SPRIBE', 'HABANERO', 'PGSOFT', 'PRAGMATIC', 'NAGA'],
            searchQuery: '',
            showScrollTop: false,
            mainElement: null
        };
    },
    computed: {
        ...mapGetters('slots', ['providers', 'games', 'currentProvider', 'currentGame', 'gameSession', 'loading', 'error', 'cryptoPrices']),
        ...mapGetters(['authenticated', 'socketGeneral']),
        filteredProviders() {
            return this.providers.filter(provider => 
                this.allowedProviders.some(allowed => 
                    provider.code.toUpperCase().includes(allowed) || 
                    provider.name.toUpperCase().includes(allowed)
                )
            );
        },
        filteredGames() {
            if (!this.searchQuery.trim()) {
                return this.games;
            }
            const query = this.searchQuery.toLowerCase().trim();
            return this.games.filter(game => 
                game.name.toLowerCase().includes(query) || 
                (game.code && game.code.toLowerCase().includes(query))
            );
        }
    },

    async mounted() {
        await this.loadProviders();
        await this.fetchCryptoPrices();

        // Auto-select Pragmatic as default provider
        await this.selectDefaultProvider();

        // Load user balance if authenticated
        if (this.authenticated) {
            await this.fetchUserBalance();
            this.setupSocketListeners();
        }

        // Add scroll event listener for scroll to top button
        // Listen on both window and main element
        window.addEventListener('scroll', this.handleScroll);
        this.mainElement = document.querySelector('main');
        if (this.mainElement) {
            this.mainElement.addEventListener('scroll', this.handleScroll);
        }
        // Check initial scroll position
        this.handleScroll();
    },

    beforeUnmount() {
        if (this.socketUnsubscribe) {
            this.socketUnsubscribe();
        }
        window.removeEventListener('scroll', this.handleScroll);
        if (this.mainElement) {
            this.mainElement.removeEventListener('scroll', this.handleScroll);
        }
        // Clean up body class
        document.body.classList.remove('slot-game-playing');
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.mainElement) {
            this.mainElement.removeEventListener('scroll', this.handleScroll);
        }
        // Clean up body class
        document.body.classList.remove('slot-game-playing');
    },

    methods: {
        ...mapActions('slots', ['fetchProviders', 'fetchGamesByProvider', 'fetchCryptoPrices', 'resetGameSession', 'clearError', 'fetchUserBalance', 'handleBalanceUpdate']),
        
        async loadProviders() {
            await this.fetchProviders();
        },

        async selectDefaultProvider() {
            // Find Pragmatic provider from filtered providers
            const pragmaticProvider = this.filteredProviders.find(provider => 
                provider.code.toUpperCase().includes('PRAGMATIC') || 
                provider.name.toUpperCase().includes('PRAGMATIC')
            );
            
            if (pragmaticProvider) {
                await this.selectProvider(pragmaticProvider.code);
            } else if (this.filteredProviders.length > 0) {
                // Fallback to first available provider if Pragmatic not found
                await this.selectProvider(this.filteredProviders[0].code);
            }
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
            this.searchQuery = '';
            this.$store.commit('slots_set_current_provider', null);
        },

        handleScroll() {
            // Check both window and main element scroll
            const mainElement = document.querySelector('main');
            const mainScrollTop = mainElement ? mainElement.scrollTop : 0;
            const windowScrollTop = window.scrollY || window.pageYOffset || 0;
            
            // Show button only when scrolled down at least 300px for better UX
            // This ensures the button doesn't appear unnecessarily
            this.showScrollTop = mainScrollTop > 300 || windowScrollTop > 300;
        },

        scrollToTop() {
            // Scroll the main element (which contains the page content)
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            // Also try window scroll as fallback
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
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
            // Close sidebar if it's open (not collapsed)
            // The game session is already set by the SlotsGameCard component
            // We just need to close the sidebar if it's open
            this.closeSidebarIfOpen();
        },

        closeSidebarIfOpen() {
            // Check if sidebar is open (not collapsed)
            const sidebar = document.querySelector('aside#sidebar-left');
            if (sidebar && !sidebar.classList.contains('collapsed')) {
                // Sidebar is open, close it by clicking the toggle button
                // Only close on desktop (width > 1024px)
                if (window.innerWidth > 1024) {
                    const toggleButton = sidebar.querySelector('.menu-toggle');
                    if (toggleButton) {
                        toggleButton.click();
                    }
                }
            }
            // If sidebar is already collapsed (closed), do nothing
        },

        // Setup real-time balance updates via Socket.io
        setupSocketListeners() {
            const socket = this.socketGeneral;
            
            if (!socket) {
                console.error('❌ Socket is not available');
                return;
            }

            // Ensure socket is connected
            if (!socket.connected) {
                console.warn('⚠️ Socket not connected, attempting to connect...');
                
                // Connect the socket if not already connected
                this.$store.dispatch('socketConnectGeneral');
                
                // Wait for connection then setup listener
                socket.once('connect', () => {
                    console.log('✅ Socket connected, setting up balance listener');
                    this.setupBalanceListener(socket);
                });
                
                return;
            }

            console.log('✅ Socket already connected, setting up balance listener');
            this.setupBalanceListener(socket);
        },

        setupBalanceListener(socket) {
            console.log('🔌 Setting up casino balance listener on general socket');
            console.log('🔌 Socket connected:', socket.connected);
            console.log('🔌 Socket ID:', socket.id);

            // Remove any existing listener to prevent duplicates
            socket.off('casino:balance-update');

            // Listen for casino balance updates from backend callbacks
            socket.on('casino:balance-update', (update) => {
                console.log('💰 Received balance update:', update);
                console.log('💰 New balance:', update.newBalance);
                console.log('💰 Transaction type:', update.transactionType);
                this.handleBalanceUpdate(update);
            });

            // Store unsubscribe function for cleanup
            this.socketUnsubscribe = () => {
                console.log('🔌 Unsubscribing from casino balance updates');
                socket.off('casino:balance-update');
            };
        }
    },

    watch: {
        authenticated(newVal) {
            if (newVal) {
                this.fetchUserBalance();
                this.setupSocketListeners();
            }
        },
        gameSession(newVal) {
            // Add/remove class to body when game modal opens/closes
            if (newVal) {
                document.body.classList.add('slot-game-playing');
            } else {
                document.body.classList.remove('slot-game-playing');
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
    background: url('../../assets/img/mainSnowBk.png') no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
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

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 40px;
    background: linear-gradient(145deg, rgba(30, 35, 50, 0.9), rgba(20, 25, 35, 0.95));
    border-radius: 24px;
    border: 2px solid rgba(212, 165, 116, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.slot-spinner {
    display: flex;
    gap: 12px;
    padding: 16px 24px;
    background: linear-gradient(180deg, #1a1f2e, #0d1015);
    border-radius: 16px;
    border: 3px solid rgba(212, 165, 116, 0.4);
    box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.5);
}

.spinner-reel {
    width: 60px;
    height: 70px;
    background: linear-gradient(180deg, #2a2f3e, #1a1f2e);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    animation: slotSpin 1.5s ease-in-out infinite;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(255, 255, 255, 0.1);
}

.spinner-reel.delay-1 {
    animation-delay: 0.2s;
}

.spinner-reel.delay-2 {
    animation-delay: 0.4s;
}

@keyframes slotSpin {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-8px);
    }
    50% {
        transform: translateY(4px);
    }
    75% {
        transform: translateY(-4px);
    }
}

.loading-text {
    display: flex;
    align-items: center;
    gap: 8px;
}

.loading-title {
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(135deg, #fca311, #d4a574, #fca311);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

.loading-dots {
    display: flex;
    gap: 4px;
}

.loading-dots .dot {
    width: 8px;
    height: 8px;
    background: #fca311;
    border-radius: 50%;
    animation: dotPulse 1.4s ease-in-out infinite;
}

.loading-dots .dot:nth-child(2) {
    animation-delay: 0.2s;
}

.loading-dots .dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes dotPulse {
    0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

.loading-hint {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    margin: 0;
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

.slots-payment-section {
    width: 100%;
    margin-top: 40px;
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
    color: var(--text-primary);
}

.provider-dropdown {
    padding: var(--spacing-md) var(--spacing-lg);
    border: 2px solid var(--text-primary);
    border-radius: var(--radius-lg);
    background: var(--bg-blue-dark);
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    min-width: 250px;
}

.provider-dropdown:focus {
    outline: none;
    border-color: var(--text-primary);
    background: var(--bg-blue-dark);
    box-shadow: none;
}

.provider-dropdown option {
    background: var(--bg-blue-dark);
    color: var(--text-primary);
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
    background: var(--accent-blue-dark);
    border: 1px solid var(--accent-yellow);
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
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999 !important;
    padding: 80px var(--spacing-lg) var(--spacing-lg) var(--spacing-lg) !important;
    margin: 0 !important;
    box-sizing: border-box !important;
}


.game-modal {
    background: var(--accent-blue-dark);
    border: 2px solid var(--color-copper);
    border-radius: var(--radius-xl);
    width: 100%;
    height: 100%;
    max-width: 1200px;
    max-height: calc(100vh - 50px) !important;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    z-index: 10000000 !important;
}

.game-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px 12px 24px !important;
    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
    position: relative;
    z-index: 10000001 !important;
    flex-shrink: 0;
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

@media (max-width: 1024px) {
    .game-modal-overlay {
        padding: 60px var(--spacing-md) var(--spacing-md) var(--spacing-md) !important;
    }

    .game-modal {
        max-width: 100%;
        max-height: calc(100vh - 70px) !important;
    }
}

@media (max-width: 768px) {
    .game-modal-overlay {
        padding: 10px var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) !important;
    }

    .game-modal {
        border-radius: var(--radius-lg);
        max-height: calc(100vh - 20px) !important;
    }

    .game-modal-header {
        padding: 10px 16px !important;
    }

    .game-modal-header h3 {
        font-size: 16px;
    }

    .close-btn {
        font-size: 28px;
    }

    .providers-grid,
    .games-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: var(--spacing-md);
    }

    .section-title {
        font-size: 22px;
    }

    .slots-content {
        padding: var(--spacing-sm);
    }

    .provider-selector {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
    }

    .provider-dropdown {
        min-width: 100%;
        width: 100%;
    }

    .search-input-wrapper {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .game-modal-overlay {
        padding: 10px 8px 8px 8px !important;
    }

    .game-modal {
        border-radius: var(--radius-md);
        max-height: calc(100vh - 20px) !important;
    }

    .game-modal-header {
        padding: 8px 12px !important;
    }

    .game-modal-header h3 {
        font-size: 14px;
    }

    .close-btn {
        font-size: 24px;
    }

    .providers-grid,
    .games-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--spacing-sm);
    }

    .section-title {
        font-size: 18px;
    }

    .balance-display {
        padding: var(--spacing-md);
    }
}

/* Search Section */
.search-section {
    margin-bottom: var(--spacing-lg);
}

.search-input-wrapper {
    position: relative;
    max-width: 400px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7c8a;
    pointer-events: none;
}

.search-input {
    width: 100%;
    height: 48px;
    padding: 0 48px 0 48px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.15);
    outline: none;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: var(--color-copper);
    background: rgba(255, 255, 255, 0.08);
}

.search-input::placeholder {
    color: #6b7c8a;
}

.search-clear {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
}

.search-clear:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Scroll to Top Button */
.scroll-to-top {
    position: fixed !important;
    bottom: 30px !important;
    right: 30px !important;
    width: 56px !important;
    height: 56px !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: linear-gradient(180deg, #ffd700 0%, #fca311 50%, #e69500 100%);
    color: #000000;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(252, 163, 17, 0.5);
    transition: all 0.3s ease;
    z-index: 999 !important; /* Lower z-index to stay below modals */
    opacity: 0.9;
}

.scroll-to-top:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 25px rgba(252, 163, 17, 0.6);
    opacity: 1;
}

.scroll-to-top svg {
    width: 28px;
    height: 28px;
}

@media (max-width: 768px) {
    .search-input-wrapper {
        max-width: 100%;
    }

    .scroll-to-top {
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
    }
}

@media (max-width: 450px) {
    .scroll-to-top {
        bottom: 100px;
        right: 15px;
        width: 48px;
        height: 48px;
    }
}
</style>
