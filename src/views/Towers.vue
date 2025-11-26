<template>
    <div class="towers">
        <div class="towers-container">
            <div class="container-game" v-bind:class="['game-' + towersRisk]">
                <TowersRow v-for="row in 8" v-bind:key="row" v-bind:row="row - 1" />
            </div>
            <TowersControls />
        </div>
        
        <Bets />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import TowersRow from '@/components/towers/TowersRow';
    import TowersControls from '@/components/towers/TowersControls';

    export default {
        name: 'Towers',
        metaInfo: {
            title: 'Towers - RBLXRoll.com'
        },
        components: {
            Bets,
            TowersRow,
            TowersControls
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
        padding: 45px 10px;
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        min-height: 100vh;
    }

    .towers::before {
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

    .towers::after {
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

    .towers .towers-container {
        width: 525px;
        padding: 20px 0;
        border-radius: 20px;
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 1;
    }

    .towers .container-game {
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
    }

    @media only screen and (max-width: 1150px) {

        .towers {
            padding: 25px 10px 45px 10px;
        }

    }

    @media only screen and (max-width: 950px) {

        .towers {
            padding: 25px 10px 443px 10px;
        }

    }

    @media only screen and (max-width: 545px) {

        .towers .towers-container {
            width: 100%;
        }

    }
</style>