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
                    {{bet.method.charAt(0).toUpperCase() + bet.method.slice(1)}}
                </span>
            </div>
        </div>
        <div class="element-verify">
            <div class="verify-title">VERIFY</div>
            <div class="verify-content">
                <button v-on:click="profileVerifyButton()" class="verify-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    VERIFY
                </button>
            </div>
        </div>
        <div class="element-amount">
            <div class="amount-title">AMOUNT</div>
            <div class="amount-content" v-bind:class="{ 'amount-positive': (bet.payout - profileGetAmount) >= 0, 'amount-negative': (bet.payout - profileGetAmount) < 0 }">
                <div class="coin-icon">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
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

    export default {
        name: 'ProfileGamesElement',
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
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        text-transform: capitalize;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
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
        background: rgba(239, 68, 68, 0.1);
    }

    .profile-games-element .coin-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile-games-element .coin-icon img {
        width: 100%;
        height: 100%;
    }

    .profile-games-element .content-value {
        display: flex;
        align-items: baseline;
    }

    .profile-games-element .value-main {
        font-size: 14px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.9);
    }

    .profile-games-element .value-decimal {
        font-size: 11px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
    }

    .profile-games-element .amount-content.amount-positive .value-main {
        color: #10b981;
    }

    .profile-games-element .amount-content.amount-negative .value-main {
        color: #ef4444;
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
