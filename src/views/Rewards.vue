<template>
    <div class="rewards">

        <div class="rewards-hero">
            <img src="@/assets/img/reward-top.png" width="100%" height="auto" alt="Rewards" class="hero-image" />

            <div class="hero-text">
                <h1 class="hero-title">REWARDS</h1>
                <p class="hero-subtitle">Get Rewards Back For Playing</p>
            </div>
        </div>
        <RewardsDrops />

        <div class="rewards-codes-section">
            <RewardsPromoCode />
            <RewardsAffiliateCode />
        </div>

        <div class="rewards-payment-section">
            <Payment />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import RewardsCode from '@/components/rewards/RewardsCode';
    import RewardsRakeback from '@/components/rewards/RewardsRakeback';
    import RewardsAffiliateCode from '@/components/rewards/RewardsAffiliateCode';
    import RewardsPromoCode from '@/components/rewards/RewardsPromoCode';
    import RewardsDrops from '@/components/rewards/RewardsDrops';
    import RewardsBoxElement from '@/components/rewards/RewardsBoxElement';
    import Payment from '@/components/Payment';

    export default {
        name: 'Rewards',
        metaInfo: {
            title: 'Rewards'
        },
        components: {
            RewardsCode,
            RewardsRakeback,
            RewardsAffiliateCode,
            RewardsPromoCode,
            RewardsDrops,
            RewardsBoxElement,
            Payment
        },
        methods: {
            ...mapActions([
                'rakebackGetDataSocket'
            ])
        },
        computed: {
            ...mapGetters([
                'rakebackData'
            ])
        },
        created() {
            if(this.rakebackData.loading === false) {
                const data = {};
                this.rakebackGetDataSocket(data);
            }
        }
    }
</script>

<style scoped>
    .rewards {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 10px 45px 10px;
    }

    .rewards .rewards-hero {
        width: 100%;
        max-width: 1250px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
    }

    .rewards .rewards-hero .hero-image {
        width: 100%;
        max-width: 900px;
        height: auto;
        object-fit: contain;
    }

    .rewards .rewards-hero .hero-text {
        text-align: center;
        margin-top: -20px;
    }

    .rewards .rewards-hero .hero-title {
        font-size: 48px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 4px;
        background: linear-gradient(180deg, #ffd700 0%, #ffa500 50%, #cc8400 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0;
        font-family: Rubik, sans-serif;
    }

    .rewards .rewards-hero .hero-subtitle {
        font-size: 24px;
        font-weight: 600;
        font-style: italic;
        color: #5ba3d4;
        margin: 10px 0 0 0;
        font-family: Rubik, sans-serif;
    }

    .rewards .rewards-banner {
        width: 1250px;
        display: flex;
        font-family: Rubik;
    }

    .rewards .rewards-codes-section {
        width: 1250px;
        display: flex;
        gap: 20px;
        margin-top: 20px;
        font-family: Rubik;
    }

    .rewards .rewards-payment-section {
        width: 100%;
        margin-top: 40px;
    }

    .rewards .rewards-boxes {
        width: 1250px;
        position: relative;
        margin-top: 66px;
    }

    .rewards .rewards-boxes:before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(90deg, rgba(2, 25, 44, 0) 0%, #f8a216 50%, rgba(2, 25, 44, 0) 100%);
    }

    .rewards .boxes-title {
        width: 220px;
        height: 40px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -20px;
        left: 50%;
        transform: translate(-50%, 0);
        font-family: Rubik;
        font-size: 20px;
        font-weight: 900;
        color: #ffffff;
        background: #fca311;
        border-radius: 15px;
    }

    .rewards .boxes-content {
        width: 100%;
        margin-top: 63px;
    }

    .rewards .content-loading,
    .rewards .content-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .rewards .content-loading.fade-leave-active {
        transition: opacity 0.5s;
    }

    .rewards .content-loading.fade-leave-to {
        opacity: 0;
    }

    .rewards .loading-placeholder {
        width: calc(14.28% - 7.7px);
        height: 220px;
        position: relative;
        margin-bottom: 10px;
        margin-right: 9px;
        background: linear-gradient(223deg, rgba(5, 29, 48, 0.35) 0%, rgba(31, 99, 153, 0.09) 50%, rgba(5, 29, 48, 0.35) 100%);
        border: 1px solid #0a273f;
        overflow: hidden;
    }

    .rewards .loading-placeholder:after {
        width: 100%;
        height: 100%;
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        animation-name: loading_animation;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        background: linear-gradient(to right, #ffffff00 0%, rgba(255, 255, 255, 0.1) 50%, #ffffff00 100%);
    }

    .rewards .loading-placeholder:nth-child(7n) {
        margin-right: 0;
    }

    .rewards .content-empty {
        width: 100%;
        height: 220px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        color: #5e768e;
    }

    .rewards .content-list.fade-enter-active,
    .rewards .content-empty.fade-enter-active {
        transition: opacity 0.5s;
    }

    .rewards .content-list.fade-enter-from,
    .rewards .content-empty.fade-enter-from {
        opacity: 0;
    }

    @keyframes loading_animation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
    }

    @media only screen and (max-width: 1270px) {

        .rewards .rewards-banner {
            width: 100%;
        }

        .rewards .rewards-codes-section {
            width: 100%;
        }

        .rewards .rewards-boxes {
            width: 100%;
        }

        .rewards .rewards-hero .hero-title {
            font-size: 36px;
        }

        .rewards .rewards-hero .hero-subtitle {
            font-size: 18px;
        }

    }

    @media only screen and (max-width: 1150px) {

        .rewards .rewards-banner {
            flex-direction: column;
        }

        .rewards .rewards-codes-section {
            flex-direction: column;
        }

    }

    @media only screen and (max-width: 768px) {

        .rewards .rewards-hero .hero-title {
            font-size: 28px;
            letter-spacing: 2px;
        }

        .rewards .rewards-hero .hero-subtitle {
            font-size: 16px;
        }

        .rewards .rewards-hero .hero-text {
            margin-top: -10px;
        }

    }
</style>