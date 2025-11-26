<template>
    <div class="live-feed">
        <h2 class="section-title">Live Feed</h2>
        
        <div class="feed-tabs">
            <button 
                class="tab-button" 
                :class="{ active: activeTab === 'all' }"
                @click="activeTab = 'all'"
            >
                All Bets
            </button>
            <button 
                class="tab-button" 
                :class="{ active: activeTab === 'high' }"
                @click="activeTab = 'high'"
            >
                High Wins
            </button>
        </div>
        
        <div class="feed-table">
            <div class="table-header">
                <div class="header-cell">Game</div>
                <div class="header-cell">Username</div>
                <div class="header-cell">Time</div>
                <div class="header-cell">Multiplier</div>
                <div class="header-cell">Bet Amount</div>
                <div class="header-cell">Payout</div>
            </div>
            
            <div class="table-body">
                <div 
                    class="table-row" 
                    v-for="bet in filteredBets" 
                    :key="bet.id"
                >
                    <div class="table-cell">
                        <div class="game-icon">
                            <svg v-if="bet.game === 'Cases Battle'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="4" width="12" height="8" rx="2" fill="currentColor"/>
                                <rect x="4" y="6" width="8" height="4" rx="1" fill="var(--bg-primary)"/>
                            </svg>
                            <svg v-else-if="bet.game === 'Mines'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="6" fill="currentColor"/>
                                <circle cx="8" cy="8" r="3" fill="var(--bg-primary)"/>
                                <path d="M6 6l4 4M10 6l-4 4" stroke="var(--bg-primary)" stroke-width="1"/>
                            </svg>
                        </div>
                    </div>
                    <div class="table-cell">
                        <div class="user-info">
                            <div class="user-avatar"></div>
                            <span class="username">{{ bet.username }}</span>
                        </div>
                    </div>
                    <div class="table-cell">{{ bet.time }}</div>
                    <div class="table-cell multiplier">{{ bet.multiplier }}x</div>
                    <div class="table-cell bet-amount">
                        <span class="coin-icon">₿</span>
                        {{ bet.betAmount }}
                    </div>
                    <div class="table-cell payout positive">
                        <span class="coin-icon">₿</span>
                        +{{ bet.payout }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LiveFeed',
    data() {
        return {
            activeTab: 'all',
            bets: [
                {
                    id: 1,
                    game: 'Cases Battle',
                    username: 'Danny Jon',
                    time: '01:03',
                    multiplier: '10.00',
                    betAmount: '50',
                    payout: '235',
                    isHighWin: true
                },
                {
                    id: 2,
                    game: 'Mines',
                    username: 'Danny Jon',
                    time: '01:03',
                    multiplier: '10.00',
                    betAmount: '50',
                    payout: '235',
                    isHighWin: true
                },
                {
                    id: 3,
                    game: 'Cases Battle',
                    username: 'Danny Jon',
                    time: '01:03',
                    multiplier: '10.00',
                    betAmount: '50',
                    payout: '235',
                    isHighWin: true
                },
                {
                    id: 4,
                    game: 'Mines',
                    username: 'Danny Jon',
                    time: '01:03',
                    multiplier: '10.00',
                    betAmount: '50',
                    payout: '235',
                    isHighWin: true
                },
                {
                    id: 5,
                    game: 'Cases Battle',
                    username: 'Danny Jon',
                    time: '01:03',
                    multiplier: '10.00',
                    betAmount: '50',
                    payout: '235',
                    isHighWin: true
                }
            ]
        }
    },
    computed: {
        filteredBets() {
            if (this.activeTab === 'high') {
                return this.bets.filter(bet => bet.isHighWin);
            }
            return this.bets;
        }
    }
}
</script>

<style scoped>
.live-feed {
    flex: 2;
    padding: 0;
}

.section-title {
    font-size: 32px;
    font-weight: 900;
    text-align: center;
    margin: 0 0 var(--spacing-xl) 0;
}

.feed-tabs {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
}

.tab-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab-button.active {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.tab-button:hover:not(.active) {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.feed-table {
    max-width: 1400px;
    margin: 0 auto;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

.table-header {
    display: grid;
    grid-template-columns: 80px 1fr 80px 100px 120px 120px;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--bg-tertiary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-cell {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.table-body {
    max-height: 400px;
    overflow-y: auto;
}

.table-row {
    display: grid;
    grid-template-columns: 80px 1fr 80px 100px 120px 120px;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.3s ease;
}

.table-row:hover {
    background: rgba(255, 255, 255, 0.02);
}

.table-row:last-child {
    border-bottom: none;
}

.table-cell {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--text-primary);
}

.game-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(----accent-yellow);
}

.user-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.user-avatar {
    width: 24px;
    height: 24px;
    background: var(--gradient-yellow);
    border-radius: 50%;
    flex-shrink: 0;
    background-color: var(--accent-yellow);
}

.username {
    font-weight: 500;
}

.multiplier {
    font-weight: 600;
}

.bet-amount,
.payout {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-weight: 600;
}

.coin-icon {
    color: var(----accent-yellow);
    font-weight: bold;
}

.payout.positive {
   /* color: var(--accent-green);  */
}

/* Responsive Design */
@media only screen and (max-width: 1024px) {
    .table-header,
    .table-row {
        grid-template-columns: 60px 1fr 60px 80px 100px 100px;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
    }
    
    .section-title {
        font-size: 28px;
    }
}

@media only screen and (max-width: 768px) {
    .live-feed {
        flex: 1;
        width: 100%;
        padding: var(--spacing-xl) var(--spacing-md);
        margin: 0;
    }
    
    .feed-table {
        overflow-x: auto;
    }
    
    .table-header,
    .table-row {
        grid-template-columns: 50px 120px 50px 70px 80px 80px;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-md);
        min-width: 600px;
    }
    
    .section-title {
        font-size: 24px;
    }
    
    .tab-button {
        padding: var(--spacing-xs) var(--spacing-md);
        font-size: 14px;
    }
    
    .table-cell {
        font-size: 12px;
    }
}
</style>
