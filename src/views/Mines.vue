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
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        min-height: 100vh;
        justify-items: center;
    }

    .mines::before {
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

    .mines::after {
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