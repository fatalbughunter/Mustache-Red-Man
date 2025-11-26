<template>
    <div class="crash">
        <div class="crash-container">
            <transition name="fade" mode="out-in">
                <div v-if="socketCrash.connected === false" class="container-loading" key="loading">
                    <div class="loading-element"></div>
                    <div class="loading-element"></div>
                </div>
                <div v-else class="container-data" key="data">
                    <div class="data-left">
                        <CrashGame />
                        <CrashHistory />
                    </div>

                    <CrashControls />
                </div>
            </transition>
        </div>

        <Bets />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import CrashGame from '@/components/crash/CrashGame';
    import CrashHistory from '@/components/crash/CrashHistory';
    import CrashControls from '@/components/crash/CrashControls';

    export default {
        name: 'Crash',
        metaInfo: {
            title: 'Crash - RBLXRoll.com'
        },
        components: {
            Bets,
            CrashGame,
            CrashHistory,
            CrashControls
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
        padding: 45px 10px;
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        min-height: 100vh;
    }

    .crash::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
        background-repeat: repeat;
        background-size: 200px 100px;
        animation: twinkle 4s ease-in-out infinite alternate;
        z-index: 0;
    }

    .crash::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(1px 1px at 50px 20px, #fff, transparent),
            radial-gradient(1px 1px at 80px 60px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 120px 10px, #eee, transparent),
            radial-gradient(1px 1px at 150px 50px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 180px 90px, #ddd, transparent);
        background-repeat: repeat;
        background-size: 200px 100px;
        animation: twinkle 6s ease-in-out infinite alternate;
        z-index: 0;
    }

    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }

    .crash .crash-container {
        width: 1120px;
        border-radius: 20px;
        background: radial-gradient(163.2% 163.2% at 50% -31.45%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%), linear-gradient(255deg, #0a0a0a 0%, #1a1a1a 100%);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8), inset 0px 1px 0px rgba(255, 255, 255, 0.1);
        border: 1px solid var(--accent-yellow);
        position: relative;
        z-index: 1;
    }

    .crash .container-loading {
        display: flex;
        justify-content: space-between;
        padding: 15px;
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
        width: calc(100% - 290px);
    }

    .crash .loading-element:nth-child(2) {
        width: 275px;
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
    }

    .crash .container-data.fade-enter-active {
        transition: opacity 0.5s;
    }

    .crash .container-data.fade-enter-from {
        opacity: 0;
    }

    .crash .data-left {
        width: calc(100% - 290px);
    }

    @keyframes loading_animation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
    }

    @media only screen and (max-width: 1140px) {
        
        .crash .crash-container {
            width: 100%;
        }

    }

    @media only screen and (max-width: 950px) {

        .crash {
            padding: 25px 10px 443px 10px;
        }

        .crash .container-loading,
        .crash .container-data {
            flex-direction: column;
            padding: 10px;
        }

        .crash .loading-element {
            width: 100%!important;
        }

        .crash .loading-element:nth-child(2) {
            height: 200px;
            margin-top: 15px;
        }

        .crash .data-left {
            width: 100%;
        }

    }
</style>
