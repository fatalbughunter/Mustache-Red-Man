<template>
    <div class="duels">

        <DuelsControls />
        <DuelsStats />
        <DuelsGames />
        <Bets />

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Bets from '@/components/bets/Bets';
    import DuelsControls from '@/components/duels/DuelsControls';
    import DuelsStats from '@/components/duels/DuelsStats';
    import DuelsGames from '@/components/duels/DuelsGames';

    export default {
        name: 'Duels',
        metaInfo: {
            title: 'Dice Duels - RBLXRoll.com'
        },
        components: {
            Bets,
            DuelsControls,
            DuelsStats,
            DuelsGames
        },
        methods: {
            ...mapActions([
                'socketConnectDuels', 
                'socketDisconnectDuels',
                'duelsGetGameDataSocket',
                'modalsSetShow'
            ])
        },
        computed: {
            ...mapGetters([
                'socketDuels'
            ])
        },
        watch: {
            'socketDuels.connected': {
                handler() {
                    if(this.socketDuels.connected && this.$route.query.game !== undefined) {
                        const data = { gameId: this.$route.query.game };
                        this.duelsGetGameDataSocket(data);

                        this.modalsSetShow('DuelsGame');
                    }
                }
            }
        },
        created() {
            this.socketConnectDuels();
        },
        beforeRouteUpdate(to, from) {
            if(this.socketDuels.connected && this.$route.query.game !== undefined) {
                const data = { gameId: this.$route.query.game };
                this.duelsGetGameDataSocket(data);

                this.modalsSetShow('DuelsGame');
            }
        },
        beforeRouteLeave(to, from, next) {
            this.socketDisconnectDuels();
            next();
        }
    }
</script>

<style scoped>
    .duels {
        width: 100%;
        position: relative;
        /*
        background: var(--bg-primary) url('~@/assets/img/main_bg.svg') no-repeat center center;
        */
        background-size: cover;
        background-attachment: fixed;
        min-height: calc(100vh - 80px);
     /*   display: flex; */
        flex-direction: column;
        align-items: center;
        padding: 45px 20px;
        padding-left: 30px;
        box-sizing: border-box;
        justify-items: center;
    }

    @media only screen and (max-width: 1150px) {

        .duels {
            padding: 25px 15px 45px 15px;
            padding-left: 30px;
        }

    }

    @media only screen and (max-width: 950px) {

        .duels {
            padding: 25px 10px 443px 10px;
            padding-left: 30px;
        }

    }

    @media only screen and (max-width: 768px) {

        .duels {
            padding: 20px 10px 20px 10px;
            padding-left: 15px;
        }

    }
</style>
