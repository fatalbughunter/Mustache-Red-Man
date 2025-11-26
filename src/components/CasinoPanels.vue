<template>
    <div class="casino-panels">
        <div class="panels-grid">
            <!-- Welcome Offer Panel -->
            <div class="panel panel-welcome">
                <div class="panel-bolt bolt-top-left"></div>
                <div class="panel-bolt bolt-top-right"></div>
                <div class="panel-bolt bolt-bottom-left"></div>
                <div class="panel-bolt bolt-bottom-right"></div>
                <h3 class="panel-title">WELCOME OFFER</h3>
                <div class="panel-content">
                    <div class="offer-items">
                        <div class="offer-item" v-for="(item, index) in welcomeOffers" :key="index">
                            <div class="offer-label">{{ item.label }}</div>
                            <div class="offer-progress">
                                <div class="progress-bar" :style="{ width: item.progress + '%' }"></div>
                            </div>
                            <div class="offer-status">{{ item.status }}</div>
                        </div>
                    </div>
                </div>
                <button class="panel-button">CLAIM ></button>
            </div>

            <!-- Jackpot Total Panel -->
            <div class="panel panel-jackpot">
                <div class="panel-bolt bolt-top-left"></div>
                <div class="panel-bolt bolt-top-right"></div>
                <div class="panel-bolt bolt-bottom-left"></div>
                <div class="panel-bolt bolt-bottom-right"></div>
                <h3 class="panel-title">JACKPOT TOTAL</h3>
                <div class="panel-content">
                    <div class="jackpot-dial">
                        <div class="dial-center">
                            <span class="jackpot-amount">$5,354</span>
                        </div>
                    </div>
                    <p class="panel-description">
                        Wide variety of games available. The more you play, the more you win!
                    </p>
                </div>
                <button class="panel-button-small"></button>
            </div>

            <!-- Casino Wheel Panel -->
            <div class="panel panel-wheel">
                <div class="panel-bolt bolt-top-left"></div>
                <div class="panel-bolt bolt-top-right"></div>
                <div class="panel-bolt bolt-bottom-left"></div>
                <div class="panel-bolt bolt-bottom-right"></div>
                <h3 class="panel-title">SPIN & WIN</h3>
                <div class="panel-content">
                    <div class="casino-wheel">
                        <div class="wheel-center">CASINO</div>
                    </div>
                    <p class="panel-description">
                        Spin the wheel and win amazing prizes. Every spin counts!
                    </p>
                </div>
                <div class="panel-buttons">
                    <button class="panel-button">PLAY NOW</button>
                    <button class="panel-button-small"></button>
                </div>
            </div>

            <!-- Roulette Panel -->
            <div class="panel panel-roulette">
                <div class="panel-bolt bolt-top-left"></div>
                <div class="panel-bolt bolt-top-right"></div>
                <div class="panel-bolt bolt-bottom-left"></div>
                <div class="panel-bolt bolt-bottom-right"></div>
                <h3 class="panel-title">LIVE ROULETTE</h3>
                <div class="panel-content">
                    <div class="roulette-wheel">
                        <div class="roulette-numbers">
                            <span v-for="n in 12" :key="n" class="roulette-number">{{ n }}</span>
                        </div>
                        <div class="roulette-center">CASINO</div>
                    </div>
                    <p class="panel-description">
                        Experience the thrill of live roulette with real dealers!
                    </p>
                </div>
                <button class="panel-button">JOIN NOW</button>
            </div>
        </div>

        <!-- Playing Cards Section -->
        <div class="cards-section">
            <div class="playing-card card-diamond">A♦</div>
            <div class="playing-card card-diamond">A♦</div>
            <div class="playing-card card-logo">
                <div class="card-logo-content">MUSTACHE<br/>CASINO</div>
            </div>
            <div class="playing-card card-club">A♣</div>
            <div class="playing-card card-spade">A♠</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CasinoPanels',
    data() {
        return {
            welcomeOffers: [
                { label: 'Deposit Bonus', progress: 100, status: 'Done!' },
                { label: 'Free Spins', progress: 75, status: 'In Progress' },
                { label: 'Welcome Gift', progress: 50, status: 'In Progress' },
                { label: 'Loyalty Points', progress: 25, status: 'Started' }
            ]
        }
    }
}
</script>

<style scoped>
.casino-panels {
    padding: var(--spacing-2xl) 0;
    margin: 0 100px;
}

.panels-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
}

.panel {
    background: linear-gradient(135deg, 
        rgba(184, 115, 51, 0.95) 0%, 
        rgba(212, 165, 116, 0.95) 25%,
        rgba(184, 115, 51, 0.95) 50%,
        rgba(139, 111, 71, 0.95) 75%,
        rgba(184, 115, 51, 0.95) 100%);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
        0 0 20px rgba(184, 115, 51, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 2px solid rgba(184, 115, 51, 0.6);
    position: relative;
    overflow: visible;
}

/* Corner bolts - All four corners using div elements */
.panel-bolt {
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
    pointer-events: none;
}

.bolt-top-left {
    top: -3px;
    left: -3px;
}

.bolt-top-right {
    top: -3px;
    right: -3px;
}

.bolt-bottom-left {
    bottom: -3px;
    left: -3px;
}

.bolt-bottom-right {
    bottom: -3px;
    right: -3px;
}

.panel:hover .panel-bolt {
    box-shadow: 
        0 3px 10px rgba(0, 0, 0, 0.7),
        inset 0 1px 3px rgba(255, 255, 255, 0.5),
        inset 0 -1px 3px rgba(0, 0, 0, 0.6),
        0 0 15px rgba(212, 165, 116, 0.6);
}

.panel:hover {
    transform: translateY(-5px);
    box-shadow: 
        0 12px 35px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
        0 0 30px rgba(212, 165, 116, 0.6);
    border-color: rgba(212, 165, 116, 0.8);
}


.panel-title {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
}

/* Welcome Offer Panel */
.offer-items {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.offer-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
}

.offer-label {
    flex: 0 0 100px;
    font-weight: 600;
}

.offer-progress {
    flex: 1;
    height: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: var(--gradient-gold);
    border-radius: 4px;
    transition: width 0.3s ease;
}

.offer-status {
    flex: 0 0 80px;
    text-align: right;
    font-weight: 700;
    color: var(--text-gold);
}

/* Jackpot Panel */
.jackpot-dial {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
    border: 8px solid var(--text-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 30px rgba(255, 215, 0, 0.3);
}

.jackpot-dial::before {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
}

.dial-center {
    position: relative;
    z-index: 2;
    text-align: center;
}

.jackpot-amount {
    font-size: 24px;
    font-weight: 900;
    color: var(--text-gold);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.panel-description {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    line-height: 1.4;
    margin: 0;
}

/* Casino Wheel Panel */
.casino-wheel {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
    border: 8px solid var(--text-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 30px rgba(255, 215, 0, 0.3);
}

.wheel-center {
    font-size: 18px;
    font-weight: 800;
    color: var(--text-gold);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    text-transform: uppercase;
    letter-spacing: 2px;
}

/* Roulette Panel */
.roulette-wheel {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
    border: 8px solid var(--text-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 30px rgba(255, 215, 0, 0.3);
}

.roulette-numbers {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.roulette-number {
    position: absolute;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-gold);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.roulette-center {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: 800;
    color: var(--text-gold);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Buttons */
.panel-button {
    background: var(--accent-deep-red);
    color: #FFFFFF;
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.panel-button:hover {
    background: var(--accent-red);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.panel-button-gold {
    background: var(--gradient-gold);
    color: #000000;
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.panel-button-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
}

.panel-button-small {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--accent-deep-red);
    border: 2px solid rgba(255, 215, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
}

.panel-button-small:hover {
    background: var(--accent-red);
    border-color: var(--text-gold);
    transform: scale(1.1);
}

.panel-buttons {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
}

/* Playing Cards */
.cards-section {
    display: none;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
}

.playing-card {
    width: 120px;
    height: 170px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: 900;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 3px solid rgba(255, 215, 0, 0.3);
}

.playing-card:hover {
    transform: translateY(-10px) rotate(5deg);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
    border-color: var(--text-gold);
}

.card-diamond {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    color: #DC143C;
}

.card-club {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    color: #000000;
}

.card-spade {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    color: #000000;
}

.card-logo {
    background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
    color: var(--text-gold);
    font-size: 14px;
    text-align: center;
    padding: var(--spacing-sm);
    border: 3px solid var(--text-gold);
}

.card-logo-content {
    font-weight: 800;
    letter-spacing: 1px;
    line-height: 1.3;
}

@media (max-width: 1200px) {
    .panels-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .casino-panels {
        margin: 0 var(--spacing-lg);
    }
}

@media (max-width: 768px) {
    .panels-grid {
        grid-template-columns: 1fr;
    }
    
    .casino-panels {
        margin: 0 var(--spacing-md);
        padding: var(--spacing-xl) 0;
    }
    
    .cards-section {
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        display: none;
    }
    
    .playing-card {
        width: 80px;
        height: 113px;
        font-size: 32px;
    }
    
    .card-logo {
        font-size: 10px;
    }
}
</style>

