<template>
    <div class="profile-stats">
        <div class="stats-element">
            <div class="element-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="element-content">
                <div class="element-title">Total Deposited</div>
                <div class="element-value">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <span class="value-main">{{profileFormatValue(authUser.user.stats.deposit).split('.')[0]}}</span><span class="value-decimal">.{{profileFormatValue(authUser.user.stats.deposit).split('.')[1]}}</span>
                </div>
            </div>
        </div>
        <div class="stats-element">
            <div class="element-icon icon-withdraw">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="element-content">
                <div class="element-title">Total Withdrawn</div>
                <div class="element-value">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <span class="value-main">{{profileFormatValue(authUser.user.stats.withdraw).split('.')[0]}}</span><span class="value-decimal">.{{profileFormatValue(authUser.user.stats.withdraw).split('.')[1]}}</span>
                </div>
            </div>
        </div>
        <div class="stats-element">
            <div class="element-icon icon-wagered">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <div class="element-content">
                <div class="element-title">Total Wagered</div>
                <div class="element-value">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <span class="value-main">{{profileFormatValue(authUser.user.stats.bet).split('.')[0]}}</span><span class="value-decimal">.{{profileFormatValue(authUser.user.stats.bet).split('.')[1]}}</span>
                </div>
            </div>
        </div>
        <div class="stats-element element-profit" v-bind:class="{ 'element-negative': (authUser.user.stats.withdraw - authUser.user.stats.deposit) < 0 }">
            <div class="element-icon icon-profit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="element-content">
                <div class="element-title">Total Profit</div>
                <div class="element-value">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <span class="value-main">{{profileFormatValue(authUser.user.stats.withdraw - authUser.user.stats.deposit).split('.')[0]}}</span><span class="value-decimal">.{{profileFormatValue(authUser.user.stats.withdraw - authUser.user.stats.deposit).split('.')[1]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ProfileStats',
        methods: {
            profileFormatValue(value) {
                return parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },
        computed: {
            ...mapGetters([
                'authUser'
            ])
        }
    }
</script>

<style scoped>
    .profile-stats {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-top: 24px;
    }

    .profile-stats .stats-element {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        transition: all 0.3s ease;
    }

    .profile-stats .stats-element:hover {
        border-color: rgba(184, 115, 51, 0.3);
        transform: translateY(-2px);
    }

    .profile-stats .element-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-radius: 12px;
        color: #b87333;
        flex-shrink: 0;
    }

    .profile-stats .element-icon.icon-withdraw {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%);
        color: #10b981;
    }

    .profile-stats .element-icon.icon-wagered {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%);
        color: #3b82f6;
    }

    .profile-stats .element-icon.icon-profit {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%);
        color: #10b981;
    }

    .profile-stats .element-negative .element-icon.icon-profit {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%);
        color: #ef4444;
    }

    .profile-stats .element-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
    }

    .profile-stats .element-title {
        font-size: 12px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .profile-stats .element-profit .element-title {
        color: #10b981;
    }

    .profile-stats .element-negative .element-title {
        color: #ef4444;
    }

    .profile-stats .element-value {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .profile-stats .element-value img {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    .profile-stats .value-main {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
    }

    .profile-stats .value-decimal {
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
    }

    .profile-stats .element-profit .value-main {
        color: #10b981;
    }

    .profile-stats .element-negative .value-main {
        color: #ef4444;
    }

    @media only screen and (max-width: 1100px) {
        .profile-stats {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media only screen and (max-width: 600px) {
        .profile-stats {
            grid-template-columns: 1fr;
            gap: 12px;
        }

        .profile-stats .stats-element {
            padding: 16px;
        }

        .profile-stats .element-icon {
            width: 40px;
            height: 40px;
        }

        .profile-stats .value-main {
            font-size: 16px;
        }

        .profile-stats .value-decimal {
            font-size: 12px;
        }
    }
</style>
