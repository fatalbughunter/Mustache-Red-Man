<template>
    <div class="upgrader">
        <UpgraderGame />
        <UpgraderItems />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LoadingAnimation from '@/components/LoadingAnimation';
    import UpgraderGame from '@/components/upgrader/UpgraderGame';
    import UpgraderItems from '@/components/upgrader/UpgraderItems';

    export default {
        name: 'Upgrader',
        metaInfo: {
            title: 'Upgrader - RBLXRoll.com'
        },
        components: {
            LoadingAnimation,
            UpgraderGame,
            UpgraderItems
        },
        methods: {
            ...mapActions([
                'socketConnectUpgrader', 
                'socketDisconnectUpgrader'
            ])
        },
        computed: {
            ...mapGetters([
                'socketUpgrader'
            ])
        },
        created() {
            this.socketConnectUpgrader();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectUpgrader();
            next();
        }
    }
</script>

<style scoped>
    .upgrader {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px 10px;
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        min-height: 100vh;
        position: relative;
    }

    .upgrader::before {
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

    .upgrader::after {
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