<template>
    <div class="leaderboard-banner">
        <!-- Animated background effects -->
        <div class="banner-bg-effects">
            <div class="glow-orb glow-1"></div>
            <div class="glow-orb glow-2"></div>
        </div>
        
        <!-- Main content -->
        <div class="banner-content">
            <!-- Title section -->
            <div class="banner-header">
                <span class="trophy-icon">🏆</span>
                <h1 class="banner-title">LEADERBOARD</h1>
                <div class="title-underline"></div>
            </div>
            
            <!-- Podium section -->
            <div class="podium-section">
                <!-- 2nd Place -->
                <div class="podium-place place-second">
                    <div class="place-crown">🥈</div>
                    <div class="place-avatar">
                        <img src="@/assets/img/anon.png" alt="2nd" />
                    </div>
                    <div class="place-rank">2</div>
                    <div class="place-pedestal">
                        <span class="reward-amount">$300</span>
                    </div>
                </div>
                
                <!-- 1st Place -->
                <div class="podium-place place-first">
                    <div class="place-crown">👑</div>
                    <div class="place-avatar">
                        <img src="@/assets/img/anon.png" alt="1st" />
                    </div>
                    <div class="place-rank">1</div>
                    <div class="place-pedestal">
                        <span class="reward-amount">$500</span>
                    </div>
                </div>
                
                <!-- 3rd Place -->
                <div class="podium-place place-third">
                    <div class="place-crown">🥉</div>
                    <div class="place-avatar">
                        <img src="@/assets/img/anon.png" alt="3rd" />
                    </div>
                    <div class="place-rank">3</div>
                    <div class="place-pedestal">
                        <span class="reward-amount">$100</span>
                    </div>
                </div>
            </div>
            
            <!-- Info section -->
            <div class="banner-info">
                <p class="info-text">
                    <span class="highlight">COMPETE</span> WITH PLAYERS AND 
                    <span class="highlight">EARN FREE MONEY!</span>
                </p>
                <p class="info-subtext">Rewards are given out and reset weekly</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LeaderboardBanner'
}
</script>

<style scoped>
.leaderboard-banner {
    width: 100%;
    max-width: 900px;
    position: relative;
    padding: 24px 30px 20px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    border-radius: 20px;
    border: 2px solid rgba(212, 175, 55, 0.3);
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

/* Background effects */
.banner-bg-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.35;
}

.glow-1 {
    width: 250px;
    height: 150px;
    background: radial-gradient(circle, #d4af37 0%, transparent 70%);
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
}

.glow-2 {
    width: 200px;
    height: 100px;
    background: radial-gradient(circle, #ff6b00 0%, transparent 70%);
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
}

/* Content */
.banner-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

/* Header */
.banner-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.trophy-icon {
    font-size: 32px;
    filter: drop-shadow(0 2px 10px rgba(212, 175, 55, 0.5));
}

.banner-title {
    font-size: 32px;
    font-weight: 900;
    letter-spacing: 5px;
    margin: 0;
    background: linear-gradient(180deg, #ffd700 0%, #d4af37 50%, #b8860b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.title-underline {
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    border-radius: 1px;
}

/* Podium Section */
.podium-section {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 16px;
}

.podium-place {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.place-crown {
    font-size: 20px;
    margin-bottom: 4px;
}

.place-first .place-crown {
    font-size: 28px;
}

.place-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #4a4a6a;
    background: #2a2a4a;
}

.place-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.place-first .place-avatar {
    width: 65px;
    height: 65px;
    border: 3px solid #d4af37;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
}

.place-rank {
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    margin: 6px 0 4px;
}

.place-first .place-rank {
    font-size: 22px;
    background: linear-gradient(180deg, #ffd700, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Pedestal */
.place-pedestal {
    width: 60px;
    border-radius: 6px 6px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.place-first .place-pedestal {
    width: 75px;
    height: 50px;
    background: linear-gradient(180deg, #d4af37 0%, #b8860b 100%);
}

.place-second .place-pedestal {
    width: 60px;
    height: 35px;
    background: linear-gradient(180deg, #c0c0c0 0%, #808080 100%);
}

.place-third .place-pedestal {
    width: 60px;
    height: 24px;
    background: linear-gradient(180deg, #cd7f32 0%, #8b4513 100%);
}

.reward-amount {
    font-size: 14px;
    font-weight: 800;
    color: #1a1a2e;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
}

.place-first .reward-amount {
    font-size: 16px;
}

.place-third .reward-amount {
    font-size: 11px;
}

/* Info Section */
.banner-info {
    text-align: center;
}

.info-text {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 4px;
    letter-spacing: 0.5px;
}

.info-text .highlight {
    background: linear-gradient(180deg, #ffd700, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
}

.info-subtext {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.45);
    margin: 0;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}

/* Responsive */
@media only screen and (max-width: 768px) {
    .leaderboard-banner {
        padding: 20px 16px 16px;
        border-radius: 16px;
    }
    
    .banner-title {
        font-size: 24px;
        letter-spacing: 3px;
    }
    
    .trophy-icon {
        font-size: 26px;
    }
    
    .podium-section {
        gap: 12px;
    }
    
    .place-avatar {
        width: 42px;
        height: 42px;
    }
    
    .place-first .place-avatar {
        width: 55px;
        height: 55px;
    }
    
    .place-crown {
        font-size: 16px;
    }
    
    .place-first .place-crown {
        font-size: 22px;
    }
    
    .place-pedestal { width: 50px; }
    .place-first .place-pedestal { width: 65px; height: 40px; }
    .place-second .place-pedestal { height: 28px; }
    .place-third .place-pedestal { height: 20px; }
    
    .reward-amount { font-size: 12px; }
    .place-first .reward-amount { font-size: 14px; }
    .place-third .reward-amount { font-size: 10px; }
    
    .info-text {
        font-size: 14px;
    }
    
    .info-subtext {
        font-size: 10px;
    }
}

@media only screen and (max-width: 480px) {
    .leaderboard-banner {
        padding: 16px 12px 14px;
    }
    
    .banner-content {
        gap: 12px;
    }
    
    .banner-title {
        font-size: 20px;
        letter-spacing: 2px;
    }
    
    .trophy-icon {
        font-size: 22px;
    }
    
    .title-underline {
        width: 100px;
    }
    
    .podium-section {
        gap: 10px;
    }
    
    .place-avatar {
        width: 36px;
        height: 36px;
    }
    
    .place-first .place-avatar {
        width: 48px;
        height: 48px;
    }
    
    .place-crown {
        font-size: 14px;
    }
    
    .place-first .place-crown {
        font-size: 20px;
    }
    
    .place-rank {
        font-size: 14px;
        margin: 4px 0 2px;
    }
    
    .place-first .place-rank {
        font-size: 18px;
    }
    
    .place-pedestal { width: 42px; }
    .place-first .place-pedestal { width: 55px; height: 32px; }
    .place-second .place-pedestal { height: 22px; }
    .place-third .place-pedestal { height: 16px; }
    
    .reward-amount { font-size: 10px; }
    .place-first .reward-amount { font-size: 12px; }
    .place-third .reward-amount { font-size: 8px; }
    
    .info-text {
        font-size: 12px;
    }
    
    .info-subtext {
        font-size: 9px;
        letter-spacing: 1px;
    }
}
</style>
