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
            <div class="list-head">
                <div class="head-game">GAME</div>
                <div class="head-user">USER</div>
                <div class="head-time">TIME</div>
                <div class="head-wager">WAGER</div>
                <div class="head-multiplier">MULTIPLIER</div>
                <div class="head-payout">PAYOUT</div>
            </div>
            <div class="list-content">
                <transition name="fade" mode="out-in">
                    <div v-if="generalBets.bets === null || generalBets.loading === true" class="content-loading" key="loading">
                        <LoadingAnimation />
                    </div>
                    <div v-else-if="filteredBets.length > 0" class="content-list" key="data">
                        <BetsElement v-for="bet in filteredBets" v-bind:key="bet._id + activeTab" v-bind:bet="bet" />
                    </div>
                    <div v-else class="content-empty" key="empty">No bets found.</div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
import BetsElement from '@/components/bets/BetsElement';

export default {
    name: 'LiveFeed',
    components: {
        LoadingAnimation,
        BetsElement
    },
    data() {
        return {
            activeTab: 'all',
            timeUpdateInterval: null
        }
    },
    computed: {
        ...mapGetters(['generalBets', 'generalTimeDiff', 'socketGeneral']),
        bets() {
            // Ensure we're accessing the array properly for reactivity
            if (this.generalBets.bets === null || !this.generalBets.bets.all || !Array.isArray(this.generalBets.bets.all)) {
                return [];
            }
            // Filter to only include bets from the 4 main games: Mines, Crash, Towers, Blackjack
            const allowedGames = ['mines', 'crash', 'towers', 'blackjack'];
            const allBets = this.generalBets.bets.all;
            const filteredBets = allBets.filter(bet => {
                if (!bet || !bet.method) return false;
                return allowedGames.includes(bet.method.toLowerCase());
            });
            // Sort by updatedAt descending (newest first) and limit to 12
            return filteredBets
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 12);
        },
        filteredBets() {
            let bets = this.bets;
            
            if (this.activeTab === 'high') {
                // High Wins: payout >= 10 && multiplier >= 5.00x
                bets = bets.filter(bet => {
                    if (!bet || bet.payout === undefined) return false;
                    const payout = bet.payout || 0;
                    
                    // Calculate bet amount
                    let amount = bet.amount || 0;
                    if (bet.method === 'blackjack' && typeof bet.amount === 'object') {
                        amount = Math.floor((bet.amount.main || 0) + (bet.amount.sideLeft || 0) + (bet.amount.sideRight || 0));
                        if (bet.actions && bet.actions.includes('split')) {
                            amount = Math.floor(amount + (bet.amount.main || 0));
                        }
                    }
                    
                    // Calculate multiplier
                    let actualMultiplier = (bet.multiplier || 0) / 100;
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
        ...mapActions(['generalGetBetsDataSocket'])
    },
    watch: {
        // Watch the bets array length to detect when new bets are added via unshift
        'generalBets.bets.all.length': {
            handler(newLength, oldLength) {
                // When array length changes, Vue should automatically update
                // But we'll force an update to ensure UI reflects the change
                if (newLength !== oldLength && newLength > 0) {
                    this.$forceUpdate();
                }
            },
            immediate: false
        },
        // Also watch the first bet's updatedAt to catch updates to existing bets
        'generalBets.bets.all.0': {
            handler() {
                // When the first bet changes (new bet added), update the UI
                this.$forceUpdate();
            },
            deep: true,
            immediate: false
        },
        'socketGeneral.connected': {
            handler(connected) {
                // When socket connects, fetch bets data if not already loaded
                if (connected) {
                    if (this.generalBets.bets === null && this.generalBets.loading === false) {
                        const data = {};
                        this.generalGetBetsDataSocket(data);
                    }
                }
            },
            immediate: true
        }
    },
    created() {
        // Fetch bets data on creation, same as Bets component
        // But also check if socket is already connected
        if (this.socketGeneral && this.socketGeneral.connected) {
            if(this.generalBets.bets === null && this.generalBets.loading === false) {
                const data = {};
                this.generalGetBetsDataSocket(data);
            }
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
    color: var(--accent-yellow-main);
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
    background: var(--accent-yellow-main);
    color: #1a1a1a;
}

.tab-button:hover:not(.active) {
    color: var(--accent-yellow);
}

.feed-table {
    max-width: 1050px;
    margin: 0 auto;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

.list-head {
    width: 100%;
    height: 52px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 35px;
    background: var(--bg-tertiary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.head-game {
    width: 20%;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.head-user {
    width: 20%;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.head-time {
    width: 20%;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.head-wager {
    width: 15%;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.head-multiplier {
    width: 10%;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.head-payout {
    width: 15%;
    text-align: right;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.list-content {
    width: 100%;
    height: 440px;
    overflow: hidden;
    position: relative;
}

.feed-table::after {
    content: '';
    width: 100%;
    height: 28px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(26, 26, 26, 0.75) 0%, rgba(26, 26, 26, 0) 100%);
    z-index: 1;
    pointer-events: none;
}

.content-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.content-loading.fade-leave-to {
    opacity: 0;
}

.content-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.content-empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: #5e768e;
}

.content-list.fade-enter-active,
.content-empty.fade-enter-active {
    transition: opacity 0.5s;
}

.content-list.fade-enter-from,
.content-empty.fade-enter-from {
    opacity: 0;
}

/* Responsive Design */
@media only screen and (max-width: 1100px) {
    .feed-table {
        width: 100%;
    }
}

@media only screen and (max-width: 950px) {
    .feed-table {
        position: relative;
    }

    .list-head {
        display: none;
    }

    .list-content {
        height: 388px;
    }
}

@media only screen and (max-width: 768px) {
    .live-feed {
        flex: 1;
        width: 100%;
        padding: var(--spacing-xl) var(--spacing-md);
        margin: 0;
    }
    
    .section-title {
        font-size: 24px;
    }
    
    .tab-button {
        padding: var(--spacing-xs) var(--spacing-md);
        font-size: 14px;
    }
}
</style>
