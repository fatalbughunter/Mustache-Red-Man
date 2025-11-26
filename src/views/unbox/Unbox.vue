<template>
    <div class="unbox">
        <div class="unbox-header">
            <UnboxHeaderOverview v-if="unboxGetRouteName === 'UnboxOverview'" />
            <UnboxHeaderBox v-else-if="unboxGetRouteName === 'UnboxBox'" />
        </div>
        <div class="unbox-content">
            <transition name="slide-fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import UnboxHeaderOverview from '@/components/unbox/UnboxHeaderOverview';
    import UnboxHeaderBox from '@/components/unbox/UnboxHeaderBox';

    export default {
        name: 'Unbox',
        metaInfo: {
            title: 'Unbox - RBLXRoll.com'
        },
        components: {
            UnboxHeaderOverview,
            UnboxHeaderBox
        },
        methods: {
            ...mapActions([
                'socketConnectUnbox', 
                'socketDisconnectUnbox'
            ])
        },
        computed: {
            unboxGetRouteName() {
                return this.$route.name;
            }
        },
        created() {
            this.socketConnectUnbox();
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectUnbox();
            next();
        }
    }
</script>

<style scoped>
    .unbox {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px 10px;
        background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
        min-height: 100vh;
        position: relative;
    }

    .unbox::before {
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

    .unbox::after {
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

    .unbox .unbox-header {
        width: 1250px;
        border-bottom: 1px solid rgba(28, 71, 182, 0.15);
        position: relative;
        z-index: 1;
    }

    .unbox .unbox-content {
        width: 1250px;
        margin-top: 25px;
        position: relative;
        z-index: 1;
    }

    @media only screen and (max-width: 1270px) {

        .unbox .unbox-header {
            width: 100%;
        }

        .unbox .unbox-content {
            width: 100%;
        }

    }
</style>