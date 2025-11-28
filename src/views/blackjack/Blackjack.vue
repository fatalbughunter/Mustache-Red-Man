<template>
    <div class="blackjack">
        <transition name="slide-fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Blackjack',
        metaInfo: {
            title: 'Blackjack - RBLXRoll.com'
        },
        methods: {
            ...mapActions([
                'socketConnectBlackjack', 
                'socketDisconnectBlackjack'
            ])
        },
        created() {
            this.socketConnectBlackjack();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectBlackjack();
            next();
        }
    }
</script>

<style scoped>
    .blackjack {
        width: 100%;
        position: relative;
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        min-height: 100vh;
    }

    .blackjack::before {
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

    .blackjack::after {
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

    .blackjack .slide-fade-enter-active {
        transition: all .3s ease-out;
    }

    .blackjack .slide-fade-enter {
        opacity: 0;
    }
</style>
