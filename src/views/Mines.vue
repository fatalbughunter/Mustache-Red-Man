<template>
    <div class="mines">
        <div class="mines-banner-section">
            <img src="@/assets/img/christmas/mineBanners.png" alt="Mines Banner" class="mines-banner" />
        </div>
        <div class="mines-container">
            <MinesControls />
            <MinesGame />
        </div>

        <div class="mines-payment-content">
            <Payment />
        </div>

        <Bets />

        <div class="mines-lucky-mustache-section">
            <LuckyMustache />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import MinesControls from '@/components/mines/MinesControls';
    import MinesGame from '@/components/mines/MinesGame';
    import Payment from '@/components/Payment';
    import LuckyMustache from '@/components/LuckyMustache';

    export default {
        name: 'Mines',
        metaInfo: {
            title: 'Mines'
        },
        components: {
            Bets,
            MinesControls,
            MinesGame,
            Payment,
            LuckyMustache
        },
        methods: {
            ...mapActions([
                'socketConnectMines', 
                'socketDisconnectMines'
            ])
        },
        created() {
            this.socketConnectMines();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectMines();
            next();
        }
    }
</script>

<style scoped>
    .mines {
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

    .mines-banner-section {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .mines-banner {
        width: 100%;
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
        position: relative;
        z-index: 1;
    }

    .mines .mines-container {
        display: flex;
        margin: 0 150px 0 150px;
        position: relative;
        z-index: 1;
    }

    .mines-payment-content {
        width: 100%;
        margin: 20px 150px;
        position: relative;
        z-index: 1;
    }

    .mines-payment-content :deep(.payment-section) {
        margin: 0;
        width: 100%;
    }

    .mines-lucky-mustache-section {
        width: 100%;
        margin: 20px 150px 0 150px;
        position: relative;
        z-index: 1;
    }

    .mines-lucky-mustache-section :deep(.lucky-mustache-section) {
        margin: 0;
        width: 100%;
    }

    @media only screen and (max-width: 1150px) {
        .mines {
            padding: 25px 10px 45px 10px;
        }

        .mines-banner-section {
            margin-bottom: 15px;
        }

        .mines .mines-container {
            width: 100%;
            margin: 0;
        }

        .mines-payment-content {
            margin: 15px 0;
        }

        .mines-lucky-mustache-section {
            margin: 20px 0 -47px 0;
        }
    }

    @media only screen and (max-width: 850px) {
        .mines-payment-content {
            margin: 15px 0;
        }

        .mines-lucky-mustache-section {
            margin: 15px 0;
        }
    }

    @media only screen and (max-width: 480px) {
        .mines-payment-content {
            margin: 10px 0;
        }

        .mines-lucky-mustache-section {
            margin: 10px 0;
        }
    }

    @media only screen and (max-width: 950px) {
        .mines {
            padding: 25px 10px 443px 10px;
        }
    }

    @media only screen and (max-width: 850px) {
        .mines-banner-section {
            margin-bottom: 10px;
        }

        .mines .mines-container {
            flex-direction: column-reverse;
        }
    }

    @media only screen and (max-width: 480px) {
        .mines-banner-section {
            margin-bottom: 8px;
        }
    }
</style>