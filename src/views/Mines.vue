<template>
    <div class="mines">
        <div class="mines-container">
            <MinesControls />
            <MinesGame />
        </div>

        <Bets />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import MinesControls from '@/components/mines/MinesControls';
    import MinesGame from '@/components/mines/MinesGame';

    export default {
        name: 'Mines',
        metaInfo: {
            title: 'Mines - RBLXRoll.com'
        },
        components: {
            Bets,
            MinesControls,
            MinesGame
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
        padding: 45px 10px;
        background: var(--bg-primary-blue);
        min-height: 100vh;
        justify-items: center;
    }

    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }

    .mines .mines-container {
       /* width: 100%; */
        display: flex;
        margin: 0 150px 0 150px;
        position: relative;
        z-index: 1;
    }

    @media only screen and (max-width: 1150px) {

        .mines {
            padding: 25px 10px 45px 10px;
        }

        .mines .mines-container {
            width: 100%;
            margin:0;
        }

    }

    @media only screen and (max-width: 950px) {

        .mines {
            padding: 25px 10px 443px 10px;
        }

    }

    @media only screen and (max-width: 850px) {

        .mines .mines-container {
            flex-direction: column-reverse;
        }

    }
</style>