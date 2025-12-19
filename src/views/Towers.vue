<template>
    <div class="towers">
        <div class="towers-banner-section">
            <img src="@/assets/img/christmas/towerBanners.png" alt="Towers Banner" class="towers-banner" />
        </div>
        <div class="towers-container">
            <TowersControls />
            <div class="container-game-wrapper">
                <img src="@/assets/img/christmas/whiteSnowRight.png" alt="Snow" class="towers-game-snow" />
                <div class="game-header">
                    <div class="game-difficulty">{{ towersRisk.toUpperCase() }}</div>
                    <img src="@/assets/img/towers/dragon.png" alt="Dragon" class="game-dragon" />
                </div>
                <div class="container-game" v-bind:class="['game-' + towersRisk]">
                    <div class="game-grid">
                        <TowersRow v-for="row in 8" v-bind:key="row" v-bind:row="row - 1" />
                    </div>
                </div>
            </div>
        </div>

        <div class="towers-payment-content">
            <Payment />
        </div>
        
        <Bets />

        <div class="towers-lucky-mustache-section">
            <LuckyMustache />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import TowersRow from '@/components/towers/TowersRow';
    import TowersControls from '@/components/towers/TowersControls';
    import Payment from '@/components/Payment';
    import LuckyMustache from '@/components/LuckyMustache';

    export default {
        name: 'Towers',
        metaInfo: {
            title: 'Towers - RBLXRoll.com'
        },
        components: {
            Bets,
            TowersRow,
            TowersControls,
            Payment,
            LuckyMustache
        },
        methods: {
            ...mapActions([
                'socketConnectTowers', 
                'socketDisconnectTowers'
            ])
        },
        computed: {
            ...mapGetters([
                'towersRisk'
            ]),
        },
        created() {
            this.socketConnectTowers();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectTowers();
            next();
        }
    }
</script>

<style scoped>
    .towers {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      /*  padding: 45px 10px;*/
        background: url('../assets/img/mainSnowBk.png') no-repeat center center;
        background-size: cover;
        background-attachment: fixed;
        min-height: 100vh;
    }

    .towers-banner-section {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .towers-banner {
        width: 100%;
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
        position: relative;
        z-index: 1;
    }

    .towers .towers-container {
        display: flex;
/*margin: 0 150px 0 150px;
        width: 100%;  */
        position: relative;
        z-index: 1;
        gap: 20px;
    }

    .towers-payment-content {
        width: calc(100% - 120px);
        margin: 20px 60px;
        position: relative;
        z-index: 1;
    }

    .towers-payment-content :deep(.payment-section) {
        margin: 0;
        width: 100%;
    }

    .towers-lucky-mustache-section {
        width: calc(100% - 120px);
        margin: 20px 60px 0 60px;
        position: relative;
        z-index: 1;
    }

    .towers-lucky-mustache-section :deep(.lucky-mustache-section) {
        margin: 0;
        width: 100%;
    }

    .towers .towers-controls {
        width: 30%;
        min-width: 275px;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 15px;
        background: var(--accent-blue-dark);
        border-radius: 15px;
       /* border: 1px solid var(--accent-yellow);*/
        margin-top: 0;
        box-sizing: border-box;
        overflow: visible;
        margin-left: 60px;
    }

    .towers .towers-controls .controls-mode {
        padding-top: 0;
        border-top: none;
    }

    .towers .towers-controls .controls-amount {
        margin-top: 15px;
    }

    .towers .towers-controls button.button-bet,
    .towers .towers-controls button.button-cashout {
        width: 100%;
    }

    .towers .container-game-wrapper {
        flex: 1;
        position: relative;
        margin-right: 60px;
        background: url('../assets/img/towers/towersSunBk.png') no-repeat center center;
        background-size: cover;
        border-radius: 20px;
        overflow: visible;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .towers .container-game-wrapper .towers-game-snow {
        position: absolute;
        top: 0;
        right: 0;
        width: auto;
        height: auto;
        max-width: 300px;
        max-height: 200px;
        object-fit: contain;
        z-index: 2;
        pointer-events: none;
        margin: -14px 10px 0 0;
    }

    .towers .container-game-wrapper .game-header {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0;
        padding-bottom: 20px;
        z-index: 2;
    }

    .towers .container-game-wrapper .game-difficulty {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
        text-transform: uppercase;
        margin-bottom: 10px;
        z-index: 3;
        position: relative;
    }

    .towers .container-game-wrapper .game-dragon {
        width: 100%;
        max-width: 350px;
        height: auto;
        object-fit: contain;
        z-index: 2;
        position: relative;
        pointer-events: none;
        margin-top: -30px;
    }

    .towers .container-game {
        width: 90%;
        max-width: 600px;
        height: auto;
        min-height: fit-content;
        display: flex;
        flex-direction: column;
        padding: 0;
        border-radius: 20px;
        background: var(--accent-blue-dark);
       /* border: 1px solid rgba(255, 255, 255, 0.1);*/
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 3;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: -255px;
    }

    .towers .container-game .game-grid {
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
        padding: 20px;
        padding-top: 20px;
    }


    @media only screen and (max-width: 1150px) {
        .towers-banner-section {
            margin-bottom: 15px;
        }


        .towers {
            padding: 25px 10px 45px 10px;
        }

        .towers .towers-container {
            width: 100%;
            margin: 0;
            padding: 0 10px;
        }

        .towers .towers-controls {
            width: 30%;
            min-width: 250px;
        }

        .towers-payment-content {
            margin: 15px 0;
        }

        .towers-lucky-mustache-section {
            margin: 15px 60px -47px 60px;
        }
    }

    @media only screen and (max-width: 850px) {
        .towers-payment-content {
            width: 100%;
            margin: 15px 0;
        }

        .towers-lucky-mustache-section {
            width: 100%;
            margin: 15px 0;
        }
    }

    @media only screen and (max-width: 545px) {
        .towers-payment-content {
            margin: 10px 0;
        }

        .towers-lucky-mustache-section {
            margin: 10px 0;
        }
    }

    @media only screen and (max-width: 950px) {
        .towers-banner-section {
            margin-bottom: 10px;
        }

        .towers {
            padding: 25px 10px 443px 10px;
        }
    }

    @media only screen and (max-width: 850px) {
        .towers .towers-container {
            flex-direction: column-reverse;
            gap: 15px;
        }

        .towers .towers-controls {
            margin-left: 0;
            width: 100%;
            max-width: 100%;
            min-width: 0;
        }

        .towers .towers-controls button.button-bet,
        .towers .towers-controls button.button-cashout {
            width: 100%;
        }

        .towers .container-game-wrapper {
            width: 100%;
            margin-right: 0;
        }

        .towers .container-game-wrapper .game-dragon {
            max-width: 250px;
        }

        .towers .container-game-wrapper .towers-game-snow {
            max-width: 250px;
            max-height: 150px;
            margin: -12px 10px 0 0;
        }

        .towers .container-game {
            width: 95%;
            max-width: 100%;
            margin-top: -216px;
        }
    }

    @media only screen and (max-width: 545px) {
        .towers-banner-section {
            margin-bottom: 8px;
        }

        .towers .towers-container {
            padding: 0 5px;
            gap: 10px;
        }

        .towers .towers-controls {
            padding: 15px 10px;
            margin-left: 0;
        }

        .towers .container-game-wrapper {
            margin-right: 0;
        }

        .towers .container-game-wrapper {
            padding: 15px;
        }

        .towers .container-game-wrapper {
            padding: 10px;
        }

        .towers .container-game-wrapper .game-dragon {
            max-width: 280px;
        }

        .towers .container-game-wrapper .towers-game-snow {
            max-width: 200px;
            max-height: 120px;
            margin: -10px 12px 0 0;
        }

        .towers .container-game {
            width: 100%;
            max-width: 100%;
            margin-top: -255px;
        }

        .towers .container-game .game-grid {
            padding: 15px;
            padding-top: 15px;
        }
    }

    @media only screen and (max-width: 425px) {
        .towers .container-game-wrapper .towers-game-snow {
            max-width: 150px;
            max-height: 100px;
            margin: -8px 14px 0 0;
        }
    }

    @media only screen and (max-width: 350px) {
        .towers .container-game-wrapper .towers-game-snow {
            max-width: 120px;
            max-height: 80px;
            margin: -6px 15px 0 0;
        }
    }
</style>