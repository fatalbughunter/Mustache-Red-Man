<template>
    <div class="profile-stats">
        <div class="stats-element">
            <div class="element-title">TOTAL DEPOSITED</div>
            <div class="element-amount">
                <div class="amount-inner">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <div class="inner-value">
                        <span>{{profileFormatValue(authUser.user.stats.deposit).split('.')[0]}}</span>.{{profileFormatValue(authUser.user.stats.deposit).split('.')[1]}}
                    </div>
                </div>
            </div>
        </div>
        <div class="stats-element">
            <div class="element-title">TOTAL WITHDRAWN</div>
            <div class="element-amount">
                <div class="amount-inner">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <div class="inner-value">
                        <span>{{profileFormatValue(authUser.user.stats.withdraw).split('.')[0]}}</span>.{{profileFormatValue(authUser.user.stats.withdraw).split('.')[1]}}
                    </div>
                </div>
            </div>
        </div>
        <div class="stats-element">
            <div class="element-title">TOTAL WAGERED</div>
            <div class="element-amount">
                <div class="amount-inner">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <div class="inner-value">
                        <span>{{profileFormatValue(authUser.user.stats.bet).split('.')[0]}}</span>.{{profileFormatValue(authUser.user.stats.bet).split('.')[1]}}
                    </div>
                </div>
            </div>
        </div>
        <div class="stats-element element-profit" v-bind:class="{ 'element-negative': (authUser.user.stats.withdraw - authUser.user.stats.deposit) < 0 }">
            <div class="element-title">TOTAL PROFIT</div>
            <div class="element-amount">
                <div class="amount-inner">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    <div class="inner-value">
                        <span>{{profileFormatValue(authUser.user.stats.withdraw - authUser.user.stats.deposit).split('.')[0]}}</span>.{{profileFormatValue(authUser.user.stats.withdraw - authUser.user.stats.deposit).split('.')[1]}}
                    </div>
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
                return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 35px;
        padding-top: 30px;
        border-top: 1px solid rgba(222, 184, 135, 0.2);
    }

    .profile-stats .stats-element {
        width: calc(25% - 15px);
    }

    .profile-stats .element-title {
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: var(--accent-copper-light);
    }

    .profile-stats .stats-element.element-profit .element-title {
        background: var(--gradient-copper);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .profile-stats .stats-element.element-negative .element-title {
        background: var(--gradient-red);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .profile-stats .element-amount {
        width: 100%;
        height: 70px;
        position: relative;
        margin-top: 12px;
        padding: 1px;
    }

    .profile-stats .element-amount::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        /*background: var (--accent-yellow-main); */
        border-radius: var(--radius-md);
    }

    .profile-stats .stats-element.element-profit .element-amount::before {
        background: linear-gradient(180deg, rgba(222, 184, 135, 0.3) 25%, rgba(184, 115, 51, 0.5) 100%);
    }

    .profile-stats .stats-element.element-negative .element-amount::before {
       /* background: linear-gradient(180deg, rgba(205, 127, 50, 0.3) 25%, rgba(139, 0, 0, 0.5) 100%);
    */}

    .profile-stats .amount-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-blue-dark);
        border-radius: var(--radius-md);
        border: 1px solid rgba(222, 184, 135, 0.3);
        z-index: 1;
    }

    .profile-stats .stats-element.element-profit .amount-inner {
        background: radial-gradient(80% 80% at 50% 50%, rgba(222, 184, 135, 0.1) 0%, rgba(0, 0, 0, 0) 100%), var(--bg-blue-dark);
    }

    .profile-stats .stats-element.element-negative .amount-inner {
        background: radial-gradient(80% 80% at 50% 50%, rgba(220, 20, 60, 0.1) 0%, rgba(0, 0, 0, 0) 100%), var(--bg-blue-dark);
    }

    .profile-stats .amount-inner img {
        width: 17px;
        height: 17px;
        margin-right: 8px;
    }

    .profile-stats .inner-value {
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-copper-light);
    }

    .profile-stats .inner-value span {
        font-size: 16px;
        font-weight: 700;
        color: var(--text-gold);
    }

    @media only screen and (max-width: 950px) {

        .profile-stats {
            flex-wrap: wrap;
        }

        .profile-stats .stats-element {
            width: calc(33.33% - 10px);
        }

        .profile-stats .stats-element.element-profit {
            width: 100%;
            margin-top: 20px;
        }

    }

    @media only screen and (max-width: 650px) {

        .profile-stats .stats-element {
            width: calc(50% - 7.5px);
        }

        .profile-stats .stats-element:nth-child(3) {
            width: 100%;
            margin-top: 20px;
        }

    }
</style>