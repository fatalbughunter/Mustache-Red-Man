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
                <div v-if="generalBets.bets === null || generalBets.loading" class="table-empty">
                    Loading...
                </div>
                <div v-else-if="filteredBets.length === 0" class="table-empty">
                    No bets available
                </div>
                <div 
                    v-else
                    class="table-row" 
                    v-for="bet in filteredBets" 
                    :key="bet._id || bet.id"
                >
                    <div class="table-cell">
                        <div class="game-icon">
                            <!-- Mines Icon -->
                            <svg v-if="getGameName(bet) === 'Mines'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="6" fill="currentColor"/>
                                <circle cx="8" cy="8" r="3" fill="var(--bg-primary)"/>
                                <path d="M6 6l4 4M10 6l-4 4" stroke="var(--bg-primary)" stroke-width="1"/>
                            </svg>
                            <!-- Crash Icon -->
                            <svg v-else-if="getGameName(bet) === 'Crash'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.15019 10.1486C3.90571 9.90426 3.81363 10.0271 3.75926 10.0815C2.35141 11.4893 1.10155 14.8862 1.76230 14.5545C4.16769 13.3467 4.56847 13.7063 5.97627 12.2985C6.03070 12.2441 6.15585 12.1544 5.90425 11.9028L4.15019 10.1486Z" />
                                <path d="M11.7397 10.1298C11.6759 9.92678 11.8096 9.82894 11.8658 9.76821C14.9731 6.41355 16.9479 1.94409 15.4844 0.480563C14.0287 -0.975075 9.69708 1.05741 6.34334 4.14226C6.27699 4.20336 6.14621 4.31909 5.91226 4.27024L4.86736 4.02143C4.57725 3.95244 4.16733 4.06841 3.95646 4.27928L0.122402 8.11329C-0.0884723 8.32421 -0.0199598 8.53465 0.274668 8.5809L3.04772 9.01669C3.34235 9.06304 3.75592 8.92837 3.96675 8.71745C3.96675 8.71745 4.10983 8.57398 4.25359 8.71769C5.04670 9.51070 6.52051 10.9845 7.27612 11.7402C7.42632 11.8903 7.28246 12.0332 7.28246 12.0332C7.07154 12.2441 6.93692 12.6576 6.98327 12.9522L7.41901 15.7252C7.46531 16.020 7.67575 16.0885 7.88662 15.8776L11.7207 12.0435C11.9316 11.8326 12.0476 11.4228 11.9785 11.1326L11.7397 10.1298ZM10.8813 5.17648C10.2319 4.52708 10.2319 3.47429 10.8813 2.82499C11.5307 2.17559 12.5835 2.17559 13.2329 2.82499C13.8822 3.47425 13.8822 4.52708 13.2329 5.17643C12.5835 5.82584 11.5306 5.82584 10.8813 5.17648Z" />
                            </svg>
                            <!-- Blackjack Icon -->
                            <svg v-else-if="getGameName(bet) === 'Blackjack'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/>
                                <rect x="4" y="4" width="8" height="8" rx="1" fill="var(--bg-primary)"/>
                                <path d="M6 8h4M8 6v4" stroke="var(--bg-primary)" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <!-- Towers Icon -->
                            <svg v-else-if="getGameName(bet) === 'Towers'" width="16" height="16" viewBox="0 0 11 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7526 0H8.72751C8.59087 0 8.4801 0.110779 8.4801 0.247413V1.48448H6.82861V0.247413C6.82861 0.110779 6.71783 0 6.58120 0H4.41757C4.28093 0 4.17015 0.110779 4.17015 0.247413V1.48448H2.51991V0.247413C2.51991 0.110779 2.40913 0 2.27249 0H0.247413C0.110779 0 0 0.110779 0 0.247413V2.9034C0.00136077 3.57305 0.543908 4.11560 1.21356 4.11696H1.21851H9.78644C10.4561 4.11560 10.9986 3.57305 11 2.9034V0.247413C11 0.110779 10.8892 0 10.7526 0Z" />
                                <path d="M9.58606 4.48689H1.42141L1.07132 12.4301V12.5068C1.06894 12.8843 1.19648 13.2513 1.43255 13.5459C1.64925 13.8246 1.97469 13.9975 2.32694 14.021H8.68176C9.03401 13.9975 9.35946 13.8246 9.57616 13.5459C9.81222 13.2513 9.93976 12.8843 9.93738 12.5068C9.93738 12.4919 9.93738 12.466 9.93738 12.4301L9.58606 4.48689ZM7.38036 13.5385H3.62463V10.0549C3.62463 9.01678 4.46620 8.17520 5.50435 8.17520C6.54250 8.17520 7.38408 9.01678 7.38408 10.0549L7.38036 13.5385Z" />
                            </svg>
                            <!-- Roll Icon -->
                            <svg v-else-if="getGameName(bet) === 'Roll'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7" fill="currentColor"/>
                                <circle cx="8" cy="8" r="4" fill="var(--bg-primary)"/>
                                <path d="M8 4L8 12M4 8L12 8" stroke="var(--bg-primary)" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <!-- Duels Icon -->
                            <svg v-else-if="getGameName(bet) === 'Duels'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/>
                                <path d="M6 6L10 10M10 6L6 10" stroke="var(--bg-primary)" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <!-- Battles Icon -->
                            <svg v-else-if="getGameName(bet) === 'Battles'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z" fill="currentColor"/>
                                <path d="M8 4L9 6.5L11.5 7L9 7.5L8 10L7 7.5L4.5 7L7 6.5L8 4Z" fill="var(--bg-primary)"/>
                            </svg>
                            <!-- Unbox Icon -->
                            <svg v-else-if="getGameName(bet) === 'Unbox'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="4" width="12" height="8" rx="1" fill="currentColor"/>
                                <rect x="4" y="6" width="8" height="4" rx="0.5" fill="var(--bg-primary)"/>
                                <path d="M2 4L8 2L14 4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/>
                            </svg>
                            <!-- Default Icon -->
                            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                    <div class="table-cell">
                        <div class="user-info" :class="[
                            !bet.user || bet.user === null ? 
                                'user-hidden' :
                                ['user-' + getUserRank(bet.user), 'user-' + getUserLevelColor(bet.user)]
                        ]">
                            <div class="user-avatar">
                                <AvatarImage :image="!bet.user || bet.user === null ? null : bet.user.avatar" />
                            </div>
                            <div v-if="bet.user && bet.user !== null" v-html="bet.user.username" class="user-username"></div>
                            <div v-else class="user-username">Anonymous</div>
                        </div>
                    </div>
                    <div class="table-cell">{{ formatTime(bet) }}</div>
                    <div class="table-cell multiplier">{{ formatMultiplier(bet) }}x</div>
                    <div class="table-cell bet-amount">
                        <span class="coin-icon">₿</span>
                        {{ formatAmount(getBetAmount(bet)) }}
                    </div>
                    <div class="table-cell payout" :class="{ 'positive': bet.payout > 0 }">
                        <span class="coin-icon">₿</span>
                        {{ bet.payout > 0 ? '+' : '' }}{{ formatAmount(bet.payout) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AvatarImage from '@/components/AvatarImage';

export default {
    name: 'LiveFeed',
    components: {
        AvatarImage
    },
    data() {
        return {
            activeTab: 'all',
            timeUpdateInterval: null
        }
    },
    computed: {
        ...mapGetters(['generalBets', 'generalTimeDiff']),
        bets() {
            if (this.generalBets.bets === null || !this.generalBets.bets.all) {
                return [];
            }
            // Get all bets, limited to 12 for display
            return (this.generalBets.bets.all || []).slice(0, 12);
        },
        filteredBets() {
            let bets = this.bets;
            
            if (this.activeTab === 'high') {
                // High Wins: payout >= 10 && multiplier >= 500 (5.00x)
                bets = bets.filter(bet => {
                    if (!bet || bet.payout === undefined) return false;
                    const payout = bet.payout || 0;
                    const amount = this.getBetAmount(bet);
                    const multiplier = bet.multiplier || 0;
                    
                    // For crash/roll, calculate multiplier from payout
                    let actualMultiplier = multiplier / 100;
                    if (['crash', 'roll'].includes(bet.method) && amount > 0) {
                        actualMultiplier = payout / amount;
                    }
                    
                    return payout >= 10 && actualMultiplier >= 5.0;
                });
            }
            
            return bets;
        }
    },
    methods: {
        ...mapActions(['generalGetBetsDataSocket']),
        getGameName(bet) {
            if (!bet) return '';
            
            // First check if bet has a method property (most common)
            if (bet.method) {
                const methodMap = {
                    'mines': 'Mines',
                    'crash': 'Crash',
                    'blackjack': 'Blackjack',
                    'towers': 'Towers',
                    'roll': 'Roll',
                    'duels': 'Duels',
                    'battles': 'Battles',
                    'unbox': 'Unbox'
                };
                return methodMap[bet.method.toLowerCase()] || bet.method.charAt(0).toUpperCase() + bet.method.slice(1);
            }
            
            // Check if bet has a game property
            if (bet.game) {
                if (typeof bet.game === 'string') {
                    return bet.game;
                }
                if (bet.game.name) {
                    return bet.game.name;
                }
            }
            
            return '';
        },
        getUserRank(user) {
            if (!user) return 'user';
            let rank = user.rakeback || 'user';
            if (user.rank && user.rank !== 'user') {
                rank = user.rank;
            }
            return rank;
        },
        getUserLevelColor(user) {
            if (!user || !user.level) return '';
            let color = '';
            if (user.level >= 2 && user.level < 26) {
                color = 'blue';
            } else if (user.level >= 26 && user.level < 51) {
                color = 'green';
            } else if (user.level >= 51 && user.level < 76) {
                color = 'orange';
            } else if (user.level >= 76 && user.level < 100) {
                color = 'red';
            } else if (user.level >= 100) {
                color = 'purple';
            }
            return color;
        },
        formatAmount(value) {
            if (!value) return '0.00';
            const formatted = parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return formatted;
        },
        formatMultiplier(bet) {
            if (!bet || bet.multiplier === undefined) return '0.00';
            
            // For crash and roll, calculate multiplier from payout/amount
            if (['crash', 'roll'].includes(bet.method)) {
                const amount = this.getBetAmount(bet);
                if (amount > 0 && bet.payout) {
                    return parseFloat(bet.payout / amount).toFixed(2);
                }
            }
            
            return parseFloat(bet.multiplier / 100).toFixed(2);
        },
        getBetAmount(bet) {
            if (!bet || !bet.amount) return 0;
            
            // For blackjack, sum all bet amounts
            if (bet.method === 'blackjack' && typeof bet.amount === 'object') {
                let amount = Math.floor((bet.amount.main || 0) + (bet.amount.sideLeft || 0) + (bet.amount.sideRight || 0));
                if (bet.actions && bet.actions.includes('split')) {
                    amount = Math.floor(amount + (bet.amount.main || 0));
                }
                return amount;
            }
            
            return bet.amount;
        },
        formatTime(bet) {
            if (!bet || !bet.updatedAt) return '--:--';
            
            const now = new Date().getTime() + (this.generalTimeDiff || 0);
            const betTime = new Date(bet.updatedAt).getTime();
            const diff = Math.floor((now - betTime) / 1000); // seconds ago
            
            if (diff < 60) {
                return 'Just now';
            } else if (diff < 3600) {
                const minutes = Math.floor(diff / 60);
                return `${minutes}m ago`;
            } else if (diff < 86400) {
                const hours = Math.floor(diff / 3600);
                return `${hours}h ago`;
            } else {
                const days = Math.floor(diff / 86400);
                return `${days}d ago`;
            }
        }
    },
    watch: {
        generalBets: {
            handler() {
                // React to changes in generalBets
                this.$forceUpdate();
            },
            deep: true
        }
    },
    created() {
        // Fetch bets data on creation, same as Bets component
        if(this.generalBets.bets === null && this.generalBets.loading === false) {
            const data = {};
            this.generalGetBetsDataSocket(data);
        }
    },
    mounted() {
        // Update time display every 10 seconds
        this.timeUpdateInterval = setInterval(() => {
            // Force reactivity update for time display
            this.$forceUpdate();
        }, 10000);
    },
    beforeDestroy() {
        if (this.timeUpdateInterval) {
            clearInterval(this.timeUpdateInterval);
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
    display: inline-flex;
    gap: 0;
    margin-bottom: var(--spacing-xl);
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding: 4px;
    background: var(--bg-tertiary);
    border-radius: 50px;
    position: relative;
}

.tab-button {
    padding: 10px 24px;
    background: transparent;
    color: var(--text-secondary);
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    white-space: nowrap;
}

.tab-button.active {
    background: var(--accent-yellow);
    color: #1a1a1a;
}

.tab-button:hover:not(.active) {
    color: var(--accent-yellow);
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
    max-height: 800px;
    overflow-y: auto;
    position: relative;
}

.table-body::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, 
        rgba(26, 26, 26, 0) 0%, 
        rgba(26, 26, 26, 0.2) 20%, 
        rgba(13, 13, 13, 0.5) 50%, 
        rgba(13, 13, 13, 0.8) 80%, 
        rgba(13, 13, 13, 1) 100%
    );
    pointer-events: none;
    z-index: 1;
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
    color: var(--accent-yellow);
}

.user-info {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
}

.user-info.user-hidden {
    font-style: italic;
}

.user-avatar {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-right: 10px;
    border-radius: 50%;
    background: var(--gradient-yellow);
    overflow: hidden;
    flex-shrink: 0;
}

.user-info.user-blue .user-avatar {
    border: 1px solid #559ee4;
}

.user-info.user-green .user-avatar {
    border: 1px solid #b8e92d;
}

.user-info.user-orange .user-avatar {
    border: 1px solid #fca311;
}

.user-info.user-red .user-avatar {
    border: 1px solid #ff4e4e;
}

.user-info.user-purple .user-avatar {
    border: 1px solid #6953f1;
}

.user-info.user-partner .user-avatar {
    border: 1px solid #eca822;
}

.user-info.user-mod .user-avatar {
    border: 1px solid #ffb703;
}

.user-info.user-admin .user-avatar {
    border: 1px solid #00ffc2;
}

.user-avatar .avatar-image {
    width: 20px;
    height: 20px;
}

.user-info.user-hidden .user-avatar .avatar-image {
    width: 24px;
    height: 24px;
}

.table-empty {
    padding: var(--spacing-xl);
    text-align: center;
    color: var(--text-muted);
    font-size: 14px;
}

.user-username {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    color: var(--accent-yellow);
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
