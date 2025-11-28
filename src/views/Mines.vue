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
        background: #2A1810;
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
            radial-gradient(1.5px 1.5px at 15px 25px, rgba(212, 165, 116, 0.6), transparent),
            radial-gradient(1px 1px at 35px 65px, rgba(212, 165, 116, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 55px 15px, rgba(212, 165, 116, 0.7), transparent),
            radial-gradient(1px 1px at 75px 85px, rgba(212, 165, 116, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 95px 45px, rgba(212, 165, 116, 0.6), transparent),
            radial-gradient(1px 1px at 115px 30px, rgba(212, 165, 116, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 135px 70px, rgba(212, 165, 116, 0.6), transparent),
            radial-gradient(1px 1px at 155px 20px, rgba(212, 165, 116, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 175px 60px, rgba(212, 165, 116, 0.7), transparent),
            radial-gradient(1px 1px at 195px 40px, rgba(212, 165, 116, 0.5), transparent);
        background-repeat: repeat;
        background-size: 220px 110px;
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
            radial-gradient(1px 1px at 25px 50px, rgba(212, 165, 116, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 45px 10px, rgba(212, 165, 116, 0.6), transparent),
            radial-gradient(1px 1px at 65px 75px, rgba(212, 165, 116, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 85px 35px, rgba(212, 165, 116, 0.7), transparent),
            radial-gradient(1px 1px at 105px 90px, rgba(212, 165, 116, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 125px 55px, rgba(212, 165, 116, 0.6), transparent),
            radial-gradient(1px 1px at 145px 5px, rgba(212, 165, 116, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 165px 80px, rgba(212, 165, 116, 0.6), transparent),
            radial-gradient(1px 1px at 185px 25px, rgba(212, 165, 116, 0.4), transparent),
            radial-gradient(1.5px 1.5px at 205px 65px, rgba(212, 165, 116, 0.7), transparent);
        background-repeat: repeat;
        background-size: 230px 95px;
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