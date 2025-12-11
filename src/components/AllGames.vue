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
                <div class="game-screen" :class="game.bgClass">
                    <div class="game-info">
                        <h3 class="game-title">{{ game.name }}</h3>
                        <p class="game-subtitle">{{ game.subtitle }}</p>
                    </div>
                    <button v-if="showPlayButton" class="play-button">
                        {{ isGameDisabled(game.name) ? 'COMING SOON' : 'PLAY NOW' }}
                        <span class="chevron" v-if="!isGameDisabled(game.name)">></span>
                    </button>
                </div>
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
                    subtitle: 'NOVA-CASINO Popular',
                    route: '/crash',
                    bgClass: 'casino-bg'
                },
                {
                    id: 2,
                    name: 'Mines',
                    subtitle: 'MUSTACHE Original',
                    route: '/mines',
                    bgClass: 'card2-bg'
                },
                {
                    id: 4,
                    name: 'Towers',
                    subtitle: 'MUSTACHE Original',
                    route: '/towers',
                    bgClass: 'card4-bg'
                },
                {
                    id: 3,
                    name: 'Blackjack',
                    subtitle: 'NOVA-CASINO Popular',
                    route: '/blackjack',
                    bgClass: 'card5-bg'
                },
                {
                    id: 5,
                    name: 'Upgrader',
                    subtitle: 'NOVA-CASINO Popular',
                    route: '/upgrader',
                    bgClass: 'card3-bg'
                },
                {
                    id: 6,
                    name: 'Duels',
                    subtitle: 'MUSTACHE Original',
                    route: '/duels',
                    bgClass: 'card6-bg'
                },
                {
                    id: 7,
                    name: 'Battles',
                    subtitle: 'NOVA-CASINO Popular',
                    route: '/battles',
                    bgClass: 'card7-bg'
                },
                {
                    id: 8,
                    name: 'Unbox',
                    subtitle: 'MUSTACHE Original',
                    route: '/unbox',
                    bgClass: 'card8-bg'
                },
                {
                    id: 9,
                    name: 'Roll',
                    subtitle: 'NOVA-CASINO Popular',
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

.games-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--spacing-md);
    max-width: 1400px;
    margin: 0 auto;
    justify-items: center;
}

/* Large cards layout - 4 cards in a row, centered */
.games-grid.large-cards-layout {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1600px;
    gap: var(--spacing-xl);
    justify-content: center;
    align-items: center;
}

.games-grid.large-cards-layout .game-card {
    max-width: 250px;
    width: 100%;
}

.game-card {
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    aspect-ratio: 1/1;
    width: 100%;
    max-width: 180px;
    display: flex;
    flex-direction: column;
    background: transparent;
    box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    border: 1px solid var(--accent-yellow);
}

/* Corner bolts removed */

.game-card:hover:not(.game-disabled) {
    transform: translateY(-4px);
    box-shadow: 
        0 8px 30px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

/* Disabled game styles */
.game-card.game-disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.game-card.game-disabled:hover {
    transform: none;
    box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

.game-screen {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    background: #ffffff;
    border-radius: 4px;
    min-height: 0;
    padding: 16px 12px 0 12px;
    overflow: hidden;
}

.game-screen.casino-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/crash.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card2-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/mines.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card3-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/upgrader.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card4-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/towers.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card5-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/black_jack.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card6-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/duels.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card7-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/battles.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card8-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/unbox.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.game-screen.card9-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/roll.jpeg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
}

.title-curve {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 32px;
    border-radius: 16px 16px 0 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title-curve::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 121px;
    height: 18px;
    border-radius: 0 0 16px 16px;
    z-index: 1;
}

.game-card:nth-child(1) .title-curve::after {
    background: #CC88E5;
}

.game-card:nth-child(2) .title-curve::after {
    background: #13C6FF;
}

.game-card:nth-child(3) .title-curve::after {
    background: #5BFFBB;
}

.game-card:nth-child(4) .title-curve::after {
    background: #7A8BFD;
}

.game-card:nth-child(5) .title-curve::after {
    background: #CC88E5;
}

.game-card:nth-child(6) .title-curve::after {
    background: #13C6FF;
}

.game-card:nth-child(7) .title-curve::after {
    background: #5BFFBB;
}

.game-card:nth-child(8) .title-curve::after {
    background: #7A8BFD;
}

.game-card:nth-child(9) .title-curve::after {
    background: #CC88E5;
}

.card-title {
    font-size: 12px;
    font-weight: 700;
    color: white;
    z-index: 3;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
}

.game-info {
    text-align: center;
   /* z-index: 2; */
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding-bottom: 12px;
}

.game-title {
    font-size: 18px;
    font-weight: 900;
    margin: 0 0 6px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
}

.game-subtitle {
    font-size: 11px;
    margin: 0 0 12px 0;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.play-button {
    background: var(--gradient-button-bg);
    border: none;
    border-radius: 0 0 4px 4px;
    color: #000000;
    cursor: pointer;
    font-size: 18px;
    font-weight: 800;
    padding: 8px 20px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(222, 199, 156, 0.5);
    width: calc(100% + 24px);
    margin-left: -12px;
    margin-right: -12px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: auto;
    margin-bottom: 0;
    position: relative;
   /* z-index: 3; */
}

.play-button .chevron {
    font-size: 14px;
    font-weight: 900;
}

.game-card:nth-child(1) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(2) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(3) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(4) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(5) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(6) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(7) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(8) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(9) .play-button {
    background: var(--gradient-button-bg);
}

.game-card:nth-child(n+10) .play-button {
    background: var(--gradient-button-bg);
}

.play-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(222, 199, 156, 0.7);
    background: var(--gradient-button-bg);
    opacity: 0.9;
}

/* Large cards layout responsive */
@media (max-width: 1400px) {
    .games-grid.large-cards-layout {
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-lg);
        max-width: 1400px;
    }
    
    .games-grid.large-cards-layout .game-card {
        max-width: 220px;
    }
}

@media (max-width: 1200px) {
    .games-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
    }
    
    .games-grid.large-cards-layout {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-lg);
    }
    
    .games-grid.large-cards-layout .game-card {
        max-width: 200px;
    }
}

@media (max-width: 768px) {
    .games-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
    
    .games-grid.large-cards-layout {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
    }
    
    .game-card {
        max-width: 100%;
    }
    
    .games-grid.large-cards-layout .game-card {
        max-width: 100%;
    }
    
    .section-title {
        font-size: 22px;
    }
    
    .game-title {
        font-size: 16px;
    }
    
    .play-button {
        font-size: 18px;
        padding: 6px 12px;
    }
}
@media only screen and (max-width: 480px) {
    .play-button {
        font-size: 15px;
        padding: 6px 12px;
    }
    .game-title {
        font-size: 14px;
    }
    .game-subtitle {
        font-size: 8px;
        margin: 0;
    }
    .game-info {
        padding-bottom: 0;
    }
}
</style>
