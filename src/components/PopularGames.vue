<template>
    <div class="popular-games">
        <div class="section-header">
            <h2 class="section-title">Popular Games</h2>
            <router-link to="/our-casino" class="see-all-link">
                <span>See All</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </router-link>
        </div>
        <div class="games-grid">
            <div class="game-card" v-for="game in games" :key="game.id" @click="navigateToGame(game.route)">
                <div class="game-content" :class="game.bgClass">
                    <div class="game-logo">
                        <img src="@/assets/img/tacheLogo.png" alt="Mustache Bet" />
                    </div>
                    <h3 class="game-title">{{ game.name }}</h3>
                </div>
                <button class="play-button">Play Now</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopularGames',
    data() {
        return {
            games: [
                {
                    id: 1,
                    name: 'Mines',
                    subtitle: 'MUSTACHE Original',
                    route: '/mines',
                    bgClass: 'card2-bg'
                },
                {
                    id: 2,
                    name: 'Crash',
                    subtitle: 'NOVA-CASINO Popular',
                    route: '/crash',
                    bgClass: 'casino-bg'
                },
                {
                    id: 4,
                    name: 'Tower',
                    subtitle: 'MUSTACHE Original',
                    route: '/towers',
                    bgClass: 'card4-bg'
                }
            ]
        }
    },
    methods: {
        navigateToGame(route) {
            this.$router.push(route);
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


/* Games Grid */
.games-grid {
    display: flex;
    gap: 24px;
    max-width: 1400px;
    margin: 0 auto;
    flex-wrap: wrap;
}

.game-card {
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 200px;
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
    border-radius: 12px;
    margin: 6px 6px 8px 6px;
}

/* Green gradient background - default */
.game-content.casino-bg {
    background: linear-gradient(135deg, #1e8449 0%, #27ae60 50%, #2ecc71 100%);
}

.game-content.card2-bg {
    background: linear-gradient(135deg, #7d3c98 0%, #9b59b6 50%, #af7ac5 100%);
}

.game-content.card3-bg {
    background: linear-gradient(135deg, #1a5276 0%, #2980b9 50%, #3498db 100%);
}

.game-content.card4-bg {
    background: linear-gradient(135deg, #b7950b 0%, #f1c40f 50%, #f4d03f 100%);
}

.game-content.card5-bg {
    background: linear-gradient(135deg, #922b21 0%, #c0392b 50%, #e74c3c 100%);
}

.game-logo {
    width: 60px;
    height: 60px;
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
    padding: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.game-title {
    font-size: 22px;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    letter-spacing: 1px;
    flex: 1;
    text-align: right;
}

.play-button {
    background: linear-gradient(180deg, #f5d742 0%, #d4a017 100%);
    border: none;
    border-radius: 8px;
    color: #1a1a2e;
    cursor: pointer;
    font-size: 16px;
    font-weight: 800;
    padding: 14px 20px;
    transition: all 0.3s ease;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    width: calc(100% - 12px);
    margin: 0 6px 6px 6px;
    text-align: center;
}

.play-button:hover {
    background: linear-gradient(180deg, #ffe066 0%, #e6b800 100%);
    transform: none;
}

@media (max-width: 1200px) {
    .games-grid {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .games-grid {
        gap: 16px;
        justify-content: center;
    }
    
    .game-card {
        width: 180px;
    }
    
    .section-title {
        font-size: 22px;
    }
    
    .game-title {
        font-size: 18px;
    }
    
    .game-logo {
        width: 50px;
        height: 50px;
    }
    
    .game-content {
        padding: 16px 12px;
    }
    
    .play-button {
        font-size: 14px;
        padding: 12px 16px;
    }
}

@media only screen and (max-width: 480px) {
    .game-card {
        width: 160px;
    }
    
    .game-title {
        font-size: 16px;
    }
    
    .game-logo {
        width: 45px;
        height: 45px;
    }
    
    .game-content {
        padding: 14px 10px;
    }
    
    .play-button {
        font-size: 13px;
        padding: 10px 14px;
    }
}
</style>
