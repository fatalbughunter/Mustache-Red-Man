<template>
    <div class="crash">
        <div class="crash-banner-section">
            <img src="@/assets/img/christmas/crashBanners.png" alt="Crash Banner" class="crash-banner" />
        </div>
        <div class="crash-container">
            <transition name="fade" mode="out-in">
                <div v-if="socketCrash.connected === false" class="container-loading" key="loading">
                    <div class="loading-element"></div>
                    <div class="loading-element"></div>
                </div>
                <div v-else class="container-data" key="data">
                    <CrashControls />
                    <div class="data-left">
                        <CrashGame />
                        <CrashHistory />
                    </div>
                </div>
            </transition>
        </div>

        <div class="crash-payment-content">
            <Payment />
        </div>

        <Bets />

        <div class="crash-lucky-mustache-section">
            <LuckyMustache />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import CrashGame from '@/components/crash/CrashGame';
    import CrashHistory from '@/components/crash/CrashHistory';
    import CrashControls from '@/components/crash/CrashControls';
    import Payment from '@/components/Payment';
    import LuckyMustache from '@/components/LuckyMustache';

    export default {
        name: 'Crash',
        metaInfo: {
            title: 'Crash - RBLXRoll.com'
        },
        components: {
            Bets,
            CrashGame,
            CrashHistory,
            CrashControls,
            Payment,
            LuckyMustache
        },
        methods: {
            ...mapActions(['socketConnectCrash', 'socketDisconnectCrash'])
        },
        computed: {
            ...mapGetters(['socketCrash']),
        },
        created() {
            this.socketConnectCrash();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectCrash();
            next();
        }
    }
</script>

<style scoped>
    .crash {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
/*padding: 45px 10px;*/
        background: url('../assets/img/mainSnowBk.png') no-repeat center center;
        background-size: cover;
        background-attachment: fixed;
        min-height: 100vh;
    }

    .crash-banner-section {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .crash-banner {
        width: 100%;
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
        position: relative;
        z-index: 1;
    }

    .crash .crash-container {
        width: 1120px;
        max-width: 100%;
        border-radius: 20px;
       /* background: var(--bg-primary-dark);*/
       /* box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8), inset 0px 1px 0px rgba(255, 255, 255, 0.1);*/
       /* border: 1px solid var(--accent-yellow);*/
        position: relative;
        z-index: 1;
        margin: 0 auto;
    }

    .crash-payment-content {
        width: 1120px;
        max-width: 100%;
        margin: 20px auto;
        position: relative;
        z-index: 1;
    }

    .crash-payment-content :deep(.payment-section) {
        margin: 0;
        width: 100%;
    }

    .crash-lucky-mustache-section {
        width: 1120px;
        max-width: 100%;
        margin: 20px 150px 0 150px;
        position: relative;
        z-index: 1;
    }

    .crash-lucky-mustache-section :deep(.lucky-mustache-section) {
        margin: 0;
        width: 100%;
    }

    .crash .container-loading {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        flex-direction: row-reverse;
    }

    .crash .loading-element {
        height: 510px;
        position: relative;
        border-radius: 20px;
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }

    .crash .loading-element:nth-child(1) {
        width: 275px;
    }

    .crash .loading-element:nth-child(2) {
        width: calc(100% - 290px);
    }

    .crash .loading-element::after {
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

    .crash .container-loading.fade-leave-active {
        transition: opacity 0.5s;
    }

    .crash .container-loading.fade-leave-to {
        opacity: 0;
    }

    .crash .container-data {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        gap: 20px;
    }

    .crash .container-data.fade-enter-active {
        transition: opacity 0.5s;
    }

    .crash .container-data.fade-enter-from {
        opacity: 0;
    }

    .crash .data-left {
        flex: 1;
        width: calc(100% - 290px);
        position: relative;
        background: url('../assets/img/crash/crashSpace.jpg') no-repeat center center;
        background-size: cover;
        background-position: center;
        border-radius: 20px;
        padding: 20px;
        box-sizing: border-box;
        min-height: 510px;
    }

    @keyframes loading_animation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
    }

    @media only screen and (max-width: 1140px) {
        .crash-banner-section {
            margin-bottom: 15px;
        }

        .crash .crash-container {
            width: 100%;
            margin: 0 10px;
        }

        .crash-payment-content {
            width: 100%;
            margin: 15px 10px;
        }

        .crash-lucky-mustache-section {
            width: 100%;
            margin: 15px 10px 0 10px;
        }
    }

    @media only screen and (max-width: 950px) {
        .crash-payment-content {
            margin: 15px 10px;
        }

        .crash-lucky-mustache-section {
            margin: 15px 10px;
        }
    }

    @media only screen and (max-width: 480px) {
        .crash-payment-content {
            margin: 10px 0;
        }

        .crash-lucky-mustache-section {
            margin: 10px 0;
        }
    }

    @media only screen and (max-width: 950px) {
        .crash-banner-section {
            margin-bottom: 10px;
        }

        .crash {
            padding: 25px 10px 443px 10px;
        }

        .crash .container-loading,
        .crash .container-data {
            flex-direction: column-reverse;
            padding: 10px;
            gap: 15px;
        }

        .crash .loading-element {
            width: 100%!important;
        }

        .crash .loading-element:nth-child(1) {
            height: 200px;
            margin-top: 0;
        }

        .crash .loading-element:nth-child(2) {
            height: 510px;
            margin-top: 0;
        }

        .crash .data-left {
            width: 100%;
            padding: 15px;
        }

    }

    @media only screen and (max-width: 480px) {
        .crash-banner-section {
            margin-bottom: 8px;
        }

    }
</style>
