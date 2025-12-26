<template>
    <div class="profile-games-element">
        <div class="element-date">
            <div class="date-title">DATE</div>
            <div class="date-content">
                {{ new Date(bet.createdAt).toLocaleString('en-US', { hour12: true, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit' }) }}
            </div>
        </div>
        <div class="element-game">
            <div class="game-title">GAME</div>
            <div class="game-content">
                <span class="game-badge" :class="'badge-' + bet.method">
                    <svg v-if="bet.method === 'slots'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M7 5V19M12 5V19M17 5V19" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M3 10h18M3 15h18" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="5" cy="7.5" r="0.8" fill="currentColor"/>
                        <circle cx="9.5" cy="7.5" r="0.8" fill="currentColor"/>
                        <circle cx="14.5" cy="7.5" r="0.8" fill="currentColor"/>
                        <circle cx="19" cy="7.5" r="0.8" fill="currentColor"/>
                        <path d="M5 12.5L6 13.5L7.5 11.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                        <path d="M9.5 12.5L10.5 13.5L12 11.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                        <path d="M14.5 12.5L15.5 13.5L17 11.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                        <rect x="4.5" y="16" width="2" height="2" rx="0.5" fill="currentColor"/>
                        <rect x="17.5" y="16" width="2" height="2" rx="0.5" fill="currentColor"/>
                    </svg>
                    <svg v-else-if="bet.method === 'crash'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="bet.method === 'mines'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.2"/>
                        <path d="M12 5v14M5 12h14M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <svg v-else-if="bet.method === 'towers'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 21h16M6 21V9l6-4 6 4v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 21v-6h4v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="10" cy="10" r="0.8" fill="currentColor"/>
                        <circle cx="14" cy="10" r="0.8" fill="currentColor"/>
                        <circle cx="10" cy="13" r="0.8" fill="currentColor"/>
                        <circle cx="14" cy="13" r="0.8" fill="currentColor"/>
                    </svg>
                    <svg v-else-if="bet.method === 'blackjack'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="6" width="7" height="10" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.15"/>
                        <rect x="13" y="8" width="7" height="10" rx="1" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.15"/>
                        <path d="M7.5 9.5L8 11.5L7 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                        <path d="M16.5 11.5L17 13.5L16 14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                    <svg v-else-if="bet.method === 'unbox'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{bet.method.charAt(0).toUpperCase() + bet.method.slice(1)}}
                </span>
            </div>
        </div>
        <div class="element-verify">
            <div class="verify-title">VERIFY</div>
            <div class="verify-content">
                <button v-if="bet.method !== 'slots'" v-on:click="profileVerifyButton()" class="verify-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    VERIFY
                </button>
                <span v-else class="slots-info">Third-party provider</span>
            </div>
        </div>
        <div class="element-amount">
            <div class="amount-title">AMOUNT</div>
            <div class="amount-content" v-bind:class="{ 'amount-positive': (bet.payout - profileGetAmount) >= 0, 'amount-negative': (bet.payout - profileGetAmount) < 0 }">
                <div class="coin-icon">
                    <IconCoin />
                </div>
                <div class="content-value">
                    <span class="value-main">{{profileFormatValue(bet.payout - profileGetAmount).split('.')[0]}}</span><span class="value-decimal">.{{profileFormatValue(bet.payout - profileGetAmount).split('.')[1]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import IconCoin from '@/components/icons/IconCoin';

    export default {
        name: 'ProfileGamesElement',
        components: {
            IconCoin
        },
        props: ['bet'],
        methods: {
            ...mapActions([
                'modalsSetData', 
                'modalsSetShow'
            ]),
            profileFormatValue(value) {
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            profileVerifyButton() {
                this.modalsSetData({ game: (['mines', 'towers', 'unbox'].includes(this.bet.method) === true ? this.bet : this.bet.game) });
                this.modalsSetShow('FairGame');
            }
        },
        computed: {
            profileGetAmount() {
                let amount = this.bet.amount;

                if(this.bet.method === 'blackjack') {
                    amount = Math.floor(this.bet.amount.main + this.bet.amount.sideLeft + this.bet.amount.sideRight);
                    if(this.bet.actions.includes('split') === true) { amount = Math.floor(amount + this.bet.amount.main); }
                }

                return amount;
            }
        }
    }
</script>

<style scoped>
    .profile-games-element {
        width: 100%;
        min-height: 56px;
        display: flex;
        align-items: center;
        padding: 12px 24px;
        border-radius: 12px;
        background: linear-gradient(135deg, rgba(26, 41, 66, 0.5) 0%, rgba(15, 25, 35, 0.7) 100%);
        border: 1px solid rgba(184, 115, 51, 0.1);
        margin-bottom: 10px;
        transition: all 0.3s ease;
    }

    .profile-games-element:hover {
        border-color: rgba(184, 115, 51, 0.25);
        background: linear-gradient(135deg, rgba(26, 41, 66, 0.7) 0%, rgba(15, 25, 35, 0.8) 100%);
        transform: translateX(2px);
    }

    .profile-games-element .element-date {
        width: 35%;
        display: flex;
        flex-direction: column;
    }

    .profile-games-element .element-game {
        width: 25%;
        display: flex;
        flex-direction: column;
    }

    .profile-games-element .element-verify {
        width: 20%;
        display: flex;
        flex-direction: column;
    }

    .profile-games-element .element-amount {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .profile-games-element .date-title,
    .profile-games-element .game-title,
    .profile-games-element .verify-title,
    .profile-games-element .amount-title {
        display: none;
        font-size: 11px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.4);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 6px;
    }

    .profile-games-element .date-content {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
    }

    .profile-games-element .game-content {
        display: flex;
        align-items: center;
    }

    .game-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        text-transform: capitalize;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .game-badge svg {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        stroke: currentColor;
    }

    .game-badge.badge-slots {
        background: rgba(245, 158, 11, 0.15);
        border-color: rgba(245, 158, 11, 0.3);
        color: #fbbf24;
    }

    .game-badge.badge-crash {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.3);
        color: #f87171;
    }

    .game-badge.badge-mines {
        background: rgba(16, 185, 129, 0.15);
        border-color: rgba(16, 185, 129, 0.3);
        color: #34d399;
    }

    .game-badge.badge-towers {
        background: rgba(59, 130, 246, 0.15);
        border-color: rgba(59, 130, 246, 0.3);
        color: #60a5fa;
    }

    .game-badge.badge-blackjack {
        background: rgba(168, 85, 247, 0.15);
        border-color: rgba(168, 85, 247, 0.3);
        color: #c084fc;
    }

    .game-badge.badge-battles {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.3);
        color: #f87171;
    }

    .game-badge.badge-duels {
        background: rgba(139, 92, 246, 0.15);
        border-color: rgba(139, 92, 246, 0.3);
        color: #a78bfa;
    }

    .game-badge.badge-unbox {
        background: rgba(236, 72, 153, 0.15);
        border-color: rgba(236, 72, 153, 0.3);
        color: #f472b6;
    }

    .game-badge.badge-roll {
        background: rgba(14, 165, 233, 0.15);
        border-color: rgba(14, 165, 233, 0.3);
        color: #38bdf8;
    }

    .profile-games-element .verify-content .verify-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 16px;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border: 1px solid rgba(184, 115, 51, 0.3);
        border-radius: 8px;
        font-size: 11px;
        font-weight: 700;
        color: #b87333;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .profile-games-element .verify-content .verify-btn svg {
        color: #b87333;
    }
    
    .profile-games-element .verify-content .verify-btn:hover {
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.3) 0%, rgba(139, 90, 43, 0.2) 100%);
        border-color: rgba(184, 115, 51, 0.5);
        transform: translateY(-1px);
    }

    .profile-games-element .verify-content .slots-info {
        display: inline-block;
        padding: 8px 16px;
        font-size: 11px;
        font-weight: 600;
        color: rgba(184, 115, 51, 0.7);
        background: rgba(184, 115, 51, 0.1);
        border: 1px solid rgba(184, 115, 51, 0.2);
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .profile-games-element .amount-content {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
    }

    .profile-games-element .amount-content.amount-positive {
        background: rgba(16, 185, 129, 0.1);
    }

    .profile-games-element .amount-content.amount-negative {
        background: rgba(107, 114, 128, 0.08);
    }

    .profile-games-element .coin-icon {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .profile-games-element .coin-icon svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4));
        transition: all 0.3s ease;
    }

    .profile-games-element:hover .coin-icon svg {
        filter: drop-shadow(0 2px 6px rgba(251, 191, 36, 0.6));
        transform: scale(1.05);
    }

    .profile-games-element .content-value {
        display: flex;
        align-items: baseline;
        gap: 1px;
    }

    .profile-games-element .value-main {
        font-size: 15px;
        font-weight: 800;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(180deg, #ffffff 0%, #e5e7eb 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .profile-games-element .value-decimal {
        font-size: 11px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
        letter-spacing: 0.3px;
    }

    .profile-games-element .amount-content.amount-positive .value-main {
        background: linear-gradient(180deg, #10b981 0%, #059669 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 900;
        text-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }

    .profile-games-element .amount-content.amount-negative .value-main {
        background: linear-gradient(180deg, #9ca3af 0%, #6b7280 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 800;
    }

    @media only screen and (max-width: 725px) {

        .profile-games-element {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 20px;
            gap: 12px;
        }

        .profile-games-element:hover {
            transform: none;
        }

        .profile-games-element .element-date,
        .profile-games-element .element-game,
        .profile-games-element .element-verify,
        .profile-games-element .element-amount {
            width: 100%;
        }

        .profile-games-element .date-title,
        .profile-games-element .game-title,
        .profile-games-element .verify-title,
        .profile-games-element .amount-title {
            display: block;
        }

        .profile-games-element .element-amount {
            align-items: flex-start;
        }

    }
</style>
