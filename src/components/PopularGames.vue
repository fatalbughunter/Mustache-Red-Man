<template>
    <div class="popular-games">
        <div class="section-header">
            <h2 class="section-title">Popular Slots</h2>
            <router-link to="/our-casino" class="see-all-link">
                <span>See All Slots</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </router-link>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
            <div class="loading-spinner">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                    </path>
                </svg>
                <p>Loading popular slots...</p>
            </div>
        </div>

        <!-- Games Grid -->
        <div v-else-if="displayGames.length > 0" class="games-grid">
            <div class="game-card" v-for="(game, index) in displayGames" :key="game.code" @click="launchGame(game)">
                <div class="game-content" :class="getGameBgClass(index)">
                    <div class="game-logo">
                        <img src="@/assets/img/tacheLogo.png" alt="Mustache Bet" />
                    </div>
                    <div class="game-info">
                        <span class="game-subtitle">{{ getProviderName(game.provider_code) }}</span>
                        <h3 class="game-title">{{ game.name.toUpperCase() }}</h3>
                    </div>
                </div>
                <button class="play-button">PLAY NOW ></button>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
            <p>No slots available at the moment</p>
        </div>

        <!-- Game Modal -->
        <div v-if="gameSession && gameSession.launch_url" class="game-modal-overlay" @click="closeGame">
            <div class="game-modal" @click.stop>
                <div class="game-modal-header">
                    <h3>{{ currentGameName }}</h3>
                    <button class="close-btn" @click="closeGame">×</button>
                </div>
                <div class="game-modal-content">
                    <iframe 
                        :src="gameSession.launch_url" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'PopularGames',
    data() {
        return {
            loading: false,
            allGames: [],
            gameSession: null,
            currentGameName: '',
            specificGames: [
                { searchTerm: 'chicken road two', name: 'Chicken Road Two', provider: 'INOUT' },
                { searchTerm: 'keno', name: 'Keno', provider: 'SPRIBE' },
                { searchTerm: 'plinko', name: 'Plinko', provider: 'SPRIBE' },
                { searchTerm: 'dice', name: 'Dice', provider: 'SPRIBE' },
                { searchTerm: 'christmas', name: 'Christmas Slots', provider: 'PRAGMATIC' }
            ],
            popularProviders: ['SPRIBE', 'PRAGMATIC', 'INOUT']
        }
    },
    computed: {
        ...mapGetters(['authenticated']),
        displayGames() {
            // Show all fetched specific games (up to 6)
            return this.allGames.slice(0, 6);
        }
    },
    async mounted() {
        await this.fetchPopularGames();
    },
    methods: {
        ...mapActions(['notificationShow']),
        ...mapActions('slots', ['launchGameSeamless']),
        
        async fetchPopularGames() {
            this.loading = true;
            try {
                // Fetch games from providers and filter for specific games
                const providers = this.popularProviders;
                const gamesPromises = providers.map(provider => 
                    axios.get(`/slots/games/${provider}`)
                        .then(res => {
                            if (res.data.success && res.data.data) {
                                return { provider, games: res.data.data };
                            }
                            return { provider, games: [] };
                        })
                        .catch(err => {
                            console.warn(`Failed to fetch games for ${provider}:`, err.message);
                            return { provider, games: [] };
                        })
                );
                
                const providerGames = await Promise.all(gamesPromises);
                
                // Find specific games by searching game names
                this.allGames = [];
                
                for (const specificGame of this.specificGames) {
                    // Find the provider's games
                    const providerData = providerGames.find(p => p.provider === specificGame.provider);
                    
                    if (providerData && providerData.games.length > 0) {
                        // Search for the game by name (case insensitive)
                        const foundGame = providerData.games.find(game => 
                            game.name && game.name.toLowerCase().includes(specificGame.searchTerm.toLowerCase())
                        );
                        
                        if (foundGame) {
                            this.allGames.push(foundGame);
                        }
                    }
                }
                
                // If we didn't find enough specific games, add some fallback games
                if (this.allGames.length < 6) {
                    providerGames.forEach(providerData => {
                        if (providerData.games.length > 0 && this.allGames.length < 6) {
                            const remainingGames = providerData.games.filter(g => 
                                !this.allGames.find(ag => ag.code === g.code)
                            );
                            const needed = 6 - this.allGames.length;
                            const shuffled = [...remainingGames].sort(() => 0.5 - Math.random());
                            this.allGames.push(...shuffled.slice(0, needed));
                        }
                    });
                }
                
            } catch (error) {
                console.error('Error fetching popular games:', error);
            } finally {
                this.loading = false;
            }
        },

        async launchGame(game) {
            if (!this.authenticated) {
                this.notificationShow({ type: 'error', message: 'Please sign in to play slots.' });
                this.$root.$emit('open-signin-modal-app');
                return;
            }

            try {
                this.currentGameName = game.name;
                
                // Launch the game using the Vuex store action
                const session = await this.launchGameSeamless({
                    providerCode: game.provider_code,
                    gameCode: game.code
                });

                if (session) {
                    this.gameSession = session;
                    document.body.classList.add('slot-game-playing');
                } else {
                    this.notificationShow({ 
                        type: 'error', 
                        message: 'Failed to launch game. Please try again.' 
                    });
                }
            } catch (error) {
                console.error('Error launching game:', error);
                this.notificationShow({ 
                    type: 'error', 
                    message: error.message || 'Failed to launch game. Please try again.' 
                });
            }
        },

        closeGame() {
            this.gameSession = null;
            this.currentGameName = '';
            document.body.classList.remove('slot-game-playing');
        },

        getProviderName(providerCode) {
            const providers = {
                'PRAGMATIC': 'Pragmatic Play',
                'PGSOFT': 'PG Soft',
                'HABANERO': 'Habanero',
                'SPRIBE': 'Spribe',
                'INOUT': 'InOut',
                'EVOPLAY': 'Evoplay'
            };
            return providers[providerCode] || providerCode;
        },

        getGameBgClass(index) {
            const bgClasses = ['casino-bg', 'card2-bg', 'card4-bg', 'card5-bg', 'card3-bg', 'card6-bg'];
            return bgClasses[index % bgClasses.length];
        },

        setDefaultImage(event) {
            event.target.style.display = 'none';
            const defaultImage = event.target.parentElement.querySelector('.default-image');
            if (defaultImage) {
                defaultImage.style.display = 'flex';
            }
        }
    }
}
</script>

<style scoped>
.popular-games {
    padding: var(--spacing-xl) 0 var(--spacing-xl) 0;
    margin: 0 100px 0 100px;
}

@media only screen and (max-width: 768px) {
    .popular-games {
        padding: var(--spacing-md);
        margin: 0;
    }
}

.section-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 var(--spacing-xl) 0;
    padding: var(--spacing-lg) 0;
}

.section-title {
    font-size: 32px;
    font-weight: 900;
    text-align: left;
    margin: 0;
    background: var(--gradient-main-txt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
}

.see-all-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--gradient-main-txt);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.see-all-link:hover {
    color: var(--accent-yellow-main);
    transform: translateX(2px);
}

.see-all-link svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    transition: transform 0.3s ease;
}

.see-all-link:hover svg {
    transform: translateX(2px);
}


/* Loading State */
.loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.loading-spinner svg {
    color: var(--accent-yellow);
}

.loading-spinner p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
}

/* Games Grid */
.games-grid {
    display: flex;
    gap: 28px;
    max-width: 1400px;
    margin: 0 auto;
    flex-wrap: wrap;
}

.game-card {
    border-radius: 18px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 220px;
    display: flex;
    flex-direction: column;
    background: #1a1a2e;
    border: 3px solid #2d2d44;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.game-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    border-color: #3d3d54;
}

.game-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 16px;
    gap: 12px;
    flex: 1;
    border-radius: 14px;
    margin: 8px 8px 10px 8px;
    min-height: 120px;
}

/* Background styles for each game */
.game-content.casino-bg {
    background: linear-gradient(135deg, #1e8449 0%, #27ae60 50%, #2ecc71 100%);
}

.game-content.card2-bg {
    background: linear-gradient(135deg, #7d3c98 0%, #9b59b6 50%, #af7ac5 100%);
}

.game-content.card3-bg {
    background: linear-gradient(135deg, #922b21 0%, #c0392b 50%, #e74c3c 100%);
}

.game-content.card4-bg {
    background: linear-gradient(135deg, #1a5276 0%, #2980b9 50%, #3498db 100%);
}

.game-content.card5-bg {
    background: linear-gradient(135deg, #b7950b 0%, #f1c40f 50%, #f4d03f 100%);
}

.game-content.card6-bg {
    background: linear-gradient(135deg, #d35400 0%, #e67e22 50%, #f39c12 100%);
}

.game-logo {
    width: 70px;
    height: 70px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.game-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
    background: #fff;
    padding: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.game-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    text-align: right;
    min-width: 0;
    overflow: hidden;
}

.game-subtitle {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 4px 0;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.game-title {
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    letter-spacing: 1.2px;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.play-button {
    background: linear-gradient(180deg, #f5d742 0%, #d4a017 100%);
    border: none;
    border-radius: 10px;
    color: #1a1a2e;
    cursor: pointer;
    font-size: 15px;
    font-weight: 800;
    padding: 14px 18px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    width: calc(100% - 16px);
    margin: 0 8px 8px 8px;
    text-align: center;
}

.play-button:hover {
    background: linear-gradient(180deg, #ffe066 0%, #e6b800 100%);
}

/* Game Modal */
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
    max-height: calc(100vh - 100px) !important;
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
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: color 0.3s ease;
    line-height: 1;
    padding: 0;
}

.close-btn:hover {
    color: #fff;
}

.game-modal-content {
    flex: 1;
    overflow: auto;
    background: #000;
    position: relative;
}

.game-modal-content iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}

/* Better z-index management */
body.slot-game-playing {
    overflow: hidden !important;
}

@media (max-width: 1200px) {
    .games-grid {
        justify-content: center;
        gap: 20px;
    }
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
    .games-grid {
        gap: 16px;
        justify-content: center;
    }
    
    .game-card {
        width: 160px;
    }
    
    .section-title {
        font-size: 22px;
    }
    
    .game-title {
        font-size: 15px;
    }
    
    .game-logo {
        width: 50px;
        height: 50px;
    }
    
    .game-content {
        padding: 16px 12px;
        min-height: 90px;
    }
    
    .play-button {
        font-size: 12px;
        padding: 10px 12px;
    }

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
}

@media only screen and (max-width: 480px) {
    .game-card {
        width: 140px;
    }
    
    .game-title {
        font-size: 13px;
    }
    
    .game-subtitle {
        font-size: 8px;
    }
    
    .game-logo {
        width: 45px;
        height: 45px;
    }
    
    .game-content {
        padding: 12px 8px;
        gap: 6px;
        min-height: 85px;
    }
    
    .play-button {
        font-size: 11px;
        padding: 8px 10px;
    }

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
}
</style>
