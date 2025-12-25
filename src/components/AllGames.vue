<template>
    <div class="all-games">
        <div class="section-header">
            <h2 class="section-title">{{ title }}</h2>
            <router-link v-if="showSeeAll" to="/our-casino" class="see-all-link">
                <span>See All</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </router-link>
        </div>
        <div class="games-grid" :class="{ 'large-cards-layout': largeCards }">
            <div class="game-card" 
                 v-for="game in games" 
                 :key="game.id" 
                 :class="{ 'game-disabled': isGameDisabled(game.name) }"
                 @click="handleGameClick(game)">
                <div class="game-content" :class="game.bgClass">
                    <div class="game-logo">
                        <img src="@/assets/img/tacheLogo.png" alt="Mustache Bet" />
                    </div>
                    <div class="game-info">
                        <span class="game-subtitle">{{ game.name }}</span>
                        <h3 class="game-title">{{ game.name.toUpperCase() }}</h3>
                    </div>
                </div>
                <button v-if="showPlayButton" class="play-button">
                    {{ isGameDisabled(game.name) ? 'COMING SOON' : 'PLAY NOW >' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AllGames',
    props: {
        title: {
            type: String,
            default: 'All Games'
        },
        showTopBolts: {
            type: Boolean,
            default: true
        },
        showBottomBolts: {
            type: Boolean,
            default: true
        },
        showPlayButton: {
            type: Boolean,
            default: true
        },
        showSeeAll: {
            type: Boolean,
            default: true
        },
        filteredGameNames: {
            type: Array,
            default: () => []
        },
        largeCards: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            allGames: [
                {
                    id: 1,
                    name: 'Crash',
                    subtitle: '',
                    route: '/crash',
                    bgClass: 'casino-bg'
                },
                {
                    id: 2,
                    name: 'Mines',
                    subtitle: '',
                    route: '/mines',
                    bgClass: 'card2-bg'
                },
                {
                    id: 4,
                    name: 'Towers',
                    subtitle: '',
                    route: '/towers',
                    bgClass: 'card4-bg'
                },
                {
                    id: 3,
                    name: 'Blackjack',
                    subtitle: '',
                    route: '/blackjack',
                    bgClass: 'card5-bg'
                },
                {
                    id: 5,
                    name: 'Upgrader',
                    subtitle: '',
                    route: '/upgrader',
                    bgClass: 'card3-bg'
                },
                {
                    id: 6,
                    name: 'Duels',
                    subtitle: '',
                    route: '/duels',
                    bgClass: 'card6-bg'
                },
                {
                    id: 7,
                    name: 'Battles',
                    subtitle: '',
                    route: '/battles',
                    bgClass: 'card7-bg'
                },
                {
                    id: 8,
                    name: 'Unbox',
                    subtitle: '',
                    route: '/unbox',
                    bgClass: 'card8-bg'
                },
                {
                    id: 9,
                    name: 'Roll',
                    subtitle: '',
                    route: '/roll',
                    bgClass: 'card9-bg'
                }
            ]
        }
    },
    computed: {
        games() {
            // If filteredGameNames is provided, filter games by name (case-insensitive) and preserve order
            if (this.filteredGameNames && this.filteredGameNames.length > 0) {
                const filtered = [];
                this.filteredGameNames.forEach(filterName => {
                    const match = this.allGames.find(game => {
                        const gameNameLower = game.name.toLowerCase();
                        const filterNameLower = filterName.toLowerCase();
                        return gameNameLower === filterNameLower ||
                               gameNameLower === filterNameLower + 's' ||
                               gameNameLower + 's' === filterNameLower;
                    });
                    if (match) {
                        filtered.push(match);
                    }
                });
                return filtered;
            }
            // Otherwise return all games
            return this.allGames;
        }
    },
    methods: {
        isGameDisabled(gameName) {
            const disabledGames = ['Upgrader', 'Duels', 'Battles', 'Unbox', 'Roll', 'Blackjack'];
            return disabledGames.includes(gameName);
        },
        handleGameClick(game) {
            // Don't navigate if game is disabled
            if (!this.isGameDisabled(game.name)) {
                this.navigateToGame(game.route);
            }
        },
        navigateToGame(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.all-games {
    padding: var(--spacing-xl) 0 var(--spacing-xl) 0;
    margin: 0 100px 0 100px;
}

@media only screen and (max-width: 768px) {
    .all-games {
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

/* Copper bolts removed */

/* Games Grid */
.games-grid {
    display: flex;
    gap: 28px;
    max-width: 1400px;
    margin: 0 auto;
    flex-wrap: wrap;
}

/* Large cards layout */
.games-grid.large-cards-layout {
    gap: 32px;
    max-width: 1600px;
    justify-content: center;
}

.games-grid.large-cards-layout .game-card {
    width: 240px;
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

.game-card:hover:not(.game-disabled) {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    border-color: #3d3d54;
}

/* Disabled game styles */
.game-card.game-disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

.game-card.game-disabled:hover {
    transform: none;
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
    background: linear-gradient(135deg, #1e8449 0%, #27ae60 50%, #2ecc71 100%);
}

.game-content.card3-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/upgrader.png');
    background-size: cover;
    background-position: center;
}

.game-content.card4-bg {
    background: linear-gradient(135deg, #1a5276 0%, #2980b9 50%, #3498db 100%);
}

.game-content.card5-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/black_jack.png');
    background-size: cover;
    background-position: center;
}

.game-content.card6-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/duels.jpg');
    background-size: cover;
    background-position: center;
}

.game-content.card7-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/battles.jpg');
    background-size: cover;
    background-position: center;
}

.game-content.card8-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/unbox.jpg');
    background-size: cover;
    background-position: center;
}

.game-content.card9-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/roll.jpeg');
    background-size: cover;
    background-position: center;
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

.game-card.game-disabled .play-button {
    cursor: not-allowed;
}

/* Responsive styles */
@media (max-width: 1400px) {
    .games-grid.large-cards-layout {
        gap: 28px;
    }
    
    .games-grid.large-cards-layout .game-card {
        width: 220px;
    }
}

@media (max-width: 1200px) {
    .games-grid {
        justify-content: center;
        gap: 24px;
    }
    
    .games-grid.large-cards-layout .game-card {
        width: 200px;
    }
}

@media (max-width: 768px) {
    .games-grid {
        gap: 20px;
        justify-content: center;
    }
    
    .game-card {
        width: 180px;
    }
    
    .games-grid.large-cards-layout .game-card {
        width: 180px;
    }
    
    .section-title {
        font-size: 22px;
    }
    
    .game-title {
        font-size: 16px;
    }
    
    .game-logo {
        width: 55px;
        height: 55px;
    }
    
    .game-content {
        padding: 18px 12px;
        min-height: 100px;
    }
    
    .play-button {
        font-size: 13px;
        padding: 12px 14px;
    }
}

@media only screen and (max-width: 480px) {
    .game-card {
        width: 160px;
    }
    
    .game-title {
        font-size: 14px;
    }
    
    .game-subtitle {
        font-size: 9px;
    }
    
    .game-logo {
        width: 50px;
        height: 50px;
    }
    
    .game-content {
        padding: 16px 10px;
        gap: 8px;
        min-height: 90px;
    }
    
    .play-button {
        font-size: 12px;
        padding: 10px 12px;
    }
}
</style>
