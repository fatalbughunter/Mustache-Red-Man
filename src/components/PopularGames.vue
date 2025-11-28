<template>
    <div class="popular-games">
        <div class="section-header">
            <div class="copper-bolt bolt-left-top"></div>
            <div class="copper-bolt bolt-right-top"></div>
            <h2 class="section-title">Popular Games</h2>
            <div class="copper-bolt bolt-left-bottom"></div>
        </div>
        <div class="games-carousel-wrapper">
            <div class="games-carousel" :class="{ 'paused': isPaused }" @mouseenter="pauseCarousel" @mouseleave="resumeCarousel">
                <div class="games-carousel-track" :style="{ transform: `translateX(${carouselOffset}px)` }">
                    <!-- Duplicate games for seamless loop -->
                    <div class="game-card" v-for="(game, index) in duplicatedGames" :key="`${game.id}-${index}`" @click="navigateToGame(game.route)">
                        <div class="game-screen" :class="game.bgClass">
                            <div class="game-info">
                                <h3 class="game-title">{{ game.name }}</h3>
                                <p class="game-subtitle">{{ game.subtitle }}</p>
                            </div>
                            <button class="play-button">PLAY NOW <span class="chevron">></span></button>
                        </div>
                    </div>
                </div>
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
                    subtitle: 'RBXGOLD Original',
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
                    id: 3,
                    name: 'BlackJack',
                    subtitle: 'NOVA-CASINO Popular',
                    route: '/blackjack',
                    bgClass: 'card5-bg'
                },
                {
                    id: 4,
                    name: 'Tower',
                    subtitle: 'RBXGOLD Original',
                    route: '/towers',
                    bgClass: 'card4-bg'
                }
            ],
            carouselOffset: 0,
            isPaused: false,
            cardWidth: 256, // max-width (240px) + gap (16px)
            animationFrameId: null
        }
    },
    computed: {
        duplicatedGames() {
            // Duplicate games array 3 times for seamless infinite scroll
            return [...this.games, ...this.games, ...this.games];
        },
        singleSetWidth() {
            // Width of one complete set of games
            return this.cardWidth * this.games.length;
        }
    },
    methods: {
        navigateToGame(route) {
            this.$router.push(route);
        },
        pauseCarousel() {
            this.isPaused = true;
        },
        resumeCarousel() {
            this.isPaused = false;
        },
        updateCarousel() {
            if (!this.isPaused) {
                // Move slowly: 0.2 pixels per frame (slow, smooth movement)
                this.carouselOffset -= 0.2;
                
                // Reset position seamlessly when we've scrolled one complete set
                // This creates an infinite loop effect
                if (Math.abs(this.carouselOffset) >= this.singleSetWidth) {
                    this.carouselOffset = 0;
                }
            }
            
            // Continue animation
            this.animationFrameId = requestAnimationFrame(() => this.updateCarousel());
        }
    },
    mounted() {
        // Calculate card width based on actual card size + gap
        this.$nextTick(() => {
            // Start auto-rotation animation
            this.animationFrameId = requestAnimationFrame(() => this.updateCarousel());
        });
    },
    beforeDestroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
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
    justify-content: center;
    margin: 0 0 var(--spacing-xl) 0;
    padding: var(--spacing-lg) 0;
}

.section-title {
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    margin: 0;
    color: var(--text-gold);
    text-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(212, 165, 116, 0.5),
        0 0 40px rgba(184, 115, 51, 0.3);
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
}

.copper-bolt {
    position: absolute;
    width: 40px;
    height: 40px;
    background: var(--gradient-copper);
    border-radius: 50%;
    box-shadow: 
        0 0 15px rgba(184, 115, 51, 0.6),
        inset 0 2px 5px rgba(255, 255, 255, 0.2),
        inset 0 -2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
}

.copper-bolt::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-radius: 50%;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
}

.copper-bolt::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 24px;
    height: 4px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
}

.bolt-left-top {
    left: 0px;
    transform: translateY(-50%);
}

.bolt-right-top {
    right: 0px;
    transform: translateY(-50%);
}

.bolt-left-bottom {
    left: -60px;
    transform: translateY(-50%);
    display: none;
}

.bolt-right-bottom {
    right: -60px;
    transform: translateY(-50%);
}

@media only screen and (max-width: 768px) {
    .copper-bolt {
        width: 30px;
        height: 30px;
    }
    
    .copper-bolt::before {
        width: 15px;
        height: 15px;
    }
    
    .copper-bolt::after {
        width: 18px;
        height: 3px;
    }
    
    .bolt-left-top {
        left: -20px;
    }
    
    .bolt-right-top {
        right: -20px;
    }
    
    .bolt-left-bottom {
        left: -45px;
    }
    
    .bolt-right-bottom {
        right: -45px;
    }
}

/* Carousel Wrapper */
.games-carousel-wrapper {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.games-carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.games-carousel.paused {
    /* Animation pauses on hover */
}

.games-carousel-track {
    display: flex;
    gap: var(--spacing-md);
    width: fit-content;
    will-change: transform;
}

.games-carousel-track .game-card {
    flex-shrink: 0;
    width: 100%;
    max-width: 240px;
}

/* Games Grid - now used in carousel */
.games-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-md);
    max-width: 1400px;
    margin: 0 auto;
    justify-items: center;
}

.game-card {
    border-radius: 8px;
    padding: 8px;
    position: relative;
    overflow: visible;
    transition: all 0.3s ease;
    cursor: pointer;
    aspect-ratio: 16/10;
    width: 100%;
    max-width: 240px;
    display: flex;
    flex-direction: column;
    /* Copper plate background */
    background: linear-gradient(135deg, 
        rgba(184, 115, 51, 0.95) 0%, 
        rgba(212, 165, 116, 0.95) 25%,
        rgba(184, 115, 51, 0.95) 50%,
        rgba(139, 111, 71, 0.95) 75%,
        rgba(184, 115, 51, 0.95) 100%);
    box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
        0 0 20px rgba(184, 115, 51, 0.4);
    border: 2px solid rgba(184, 115, 51, 0.6);
}

/* Corner bolts - Top corners */
.game-card::before,
.game-card::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: radial-gradient(circle at 30% 30%, rgba(212, 165, 116, 1), rgba(184, 115, 51, 0.95), rgba(139, 111, 71, 1));
    border-radius: 50%;
    z-index: 10;
    box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.6),
        inset 0 1px 3px rgba(255, 255, 255, 0.4),
        inset 0 -1px 3px rgba(0, 0, 0, 0.6),
        0 0 10px rgba(184, 115, 51, 0.4);
    /* Create cross pattern for bolt */
    background-image: 
        radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 35%, transparent 35%),
        radial-gradient(circle at 30% 30%, rgba(212, 165, 116, 1), rgba(184, 115, 51, 0.95));
}

.game-card::before {
    top: -3px;
    left: -3px;
}

.game-card::after {
    top: -3px;
    right: -3px;
}

.game-card:hover {
    box-shadow: 
        0 8px 30px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
        0 0 30px rgba(212, 165, 116, 0.6);
    transform: translateY(-4px);
    border-color: rgba(212, 165, 116, 0.8);
}

.game-card:hover::before,
.game-card:hover::after {
    box-shadow: 
        0 3px 10px rgba(0, 0, 0, 0.7),
        inset 0 1px 3px rgba(255, 255, 255, 0.5),
        inset 0 -1px 3px rgba(0, 0, 0, 0.6),
        0 0 15px rgba(212, 165, 116, 0.6);
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
    /* Add corner bolts to the inner screen */
}

/* Bottom corner bolts on game-screen */
.game-screen::before,
.game-screen::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: radial-gradient(circle at 30% 30%, rgba(212, 165, 116, 1), rgba(184, 115, 51, 0.95), rgba(139, 111, 71, 1));
    border-radius: 50%;
    z-index: 10;
    box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.6),
        inset 0 1px 3px rgba(255, 255, 255, 0.4),
        inset 0 -1px 3px rgba(0, 0, 0, 0.6),
        0 0 10px rgba(184, 115, 51, 0.4);
    /* Create cross pattern for bolt */
    background-image: 
        radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 35%, transparent 35%),
        radial-gradient(circle at 30% 30%, rgba(212, 165, 116, 1), rgba(184, 115, 51, 0.95));
}

.game-screen::before {
    bottom: -3px;
    left: -3px;
}

.game-screen::after {
    bottom: -3px;
    right: -3px;
}

.game-card:hover .game-screen::before,
.game-card:hover .game-screen::after {
    box-shadow: 
        0 3px 10px rgba(0, 0, 0, 0.7),
        inset 0 1px 3px rgba(255, 255, 255, 0.5),
        inset 0 -1px 3px rgba(0, 0, 0, 0.6),
        0 0 15px rgba(212, 165, 116, 0.6);
}

.game-screen.casino-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/crash.png');
    background-size: cover;
    background-position: top;
    color: white;
}

.game-screen.card2-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/mines.png');
    background-size: cover;
    background-position: bottom;
    color: white;
}

.game-screen.card3-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/cases_battle.png');
    background-size: cover;
    background-position: bottom;
    color: white;
}

.game-screen.card4-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/towers.jpeg');
    background-size: cover;
    background-position: bottom;
    color: white;
}

.game-screen.card5-bg {
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('~@/assets/img/gamePreview/black_jack.png');
    background-size: cover;
    background-position: center;
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

.card-title {
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    position: relative;
    z-index: 3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
}



.game-info {
    text-align: center;
    z-index: 2;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding-bottom: 12px;
}

.game-screen.casino-bg .game-info {
    color: white;
}

.game-screen.card2-bg .game-info {
    color: white;
}

.game-screen.card3-bg .game-info {
    color: white;
}

.game-screen.card4-bg .game-info {
    color: white;
}

.game-screen.card5-bg .game-info {
    color: white;
}

.game-title {
    font-size: 18px;
    font-weight: 900;
    margin: 0 0 6px 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
}

.game-screen.casino-bg .game-title {
    color: white;
}

.game-subtitle {
    font-size: 11px;
    margin: 0 0 12px 0;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.game-screen.casino-bg .game-subtitle {
    color: rgba(255, 255, 255, 0.8);
}

.game-screen.card2-bg .game-title {
    color: white;
}

.game-screen.card2-bg .game-subtitle {
    color: rgba(255, 255, 255, 0.8);
}

.game-screen.card3-bg .game-title {
    color: white;
}

.game-screen.card3-bg .game-subtitle {
    color: rgba(255, 255, 255, 0.8);
}

.game-screen.card4-bg .game-title {
    color: white;
}

.game-screen.card4-bg .game-subtitle {
    color: rgba(255, 255, 255, 0.8);
}

.game-screen.card5-bg .game-title {
    color: white;
}

.game-screen.card5-bg .game-subtitle {
    color: rgba(255, 255, 255, 0.8);
}

.play-button {
    background: var(--gradient-copper);
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
    box-shadow: 0 4px 15px rgba(184, 115, 51, 0.5);
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
    z-index: 3;
}

.play-button .chevron {
    font-size: 14px;
    font-weight: 900;
}

.game-card:nth-child(1) .play-button {
    background: var(--gradient-copper);
}

.game-card:nth-child(2) .play-button {
    background: var(--gradient-copper);
}

.game-card:nth-child(3) .play-button {
    background: var(--gradient-copper);
}

.game-card:nth-child(4) .play-button {
    background: var(--gradient-copper);
}

.game-card:nth-child(5) .play-button {
    background: var(--gradient-copper);
}

.game-card:nth-child(n+6) .play-button {
    background: var(--gradient-copper);
}

.play-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(184, 115, 51, 0.7);
    background: linear-gradient(135deg, #D4A574 0%, #B87333 50%, #D4A574 100%);
}

/* Game-specific styling - First card has casino background */

@media (max-width: 1200px) {
    .games-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
    }
}

@media (max-width: 768px) {
    .games-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
    
    .games-carousel-wrapper {
        margin: 0;
    }
    
    .game-card {
        max-width: 100%;
    }
    
    /* Smaller bolts on mobile */
    .game-card::before,
    .game-card::after,
    .game-screen::before,
    .game-screen::after {
        width: 14px;
        height: 14px;
    }
    
    .game-card::before {
        top: -2px;
        left: -2px;
    }
    
    .game-card::after {
        top: -2px;
        right: -2px;
    }
    
    .game-screen::before {
        bottom: -2px;
        left: -2px;
    }
    
    .game-screen::after {
        bottom: -2px;
        right: -2px;
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
