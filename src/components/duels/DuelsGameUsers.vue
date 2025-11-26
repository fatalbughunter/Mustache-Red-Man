<template>
    <div class="duels-game-users">
        <div class="users-header">
            <div class="header-user">USER</div>
            <div class="header-roll">ROLL</div>
        </div>
        <div class="users-content">
            <div class="content-list">

                <DuelsUserElement v-for="index in duelsGame.playerCount" v-bind:key="index" v-bind:duelsGame="duelsGame" v-bind:index="index" v-bind:bet="duelsGame.bets[index - 1]" v-bind:id="'element-' + index" />

            </div>
        </div>
    </div>
</template>

<script>
    import DuelsUserElement from '@/components/duels/DuelsUserElement';

    export default {
        name: 'DuelsGameUsers',
        components: {
            DuelsUserElement
        },
        props: [
            'duelsGame'
        ],
        watch: {
            'duelsGame': {
                deep: true,
                handler() {
                    if(this.duelsGame.state === 'rolling') {
                        const index = this.duelsGame.bets.filter((element) => element.roll !== undefined).length;
                        document.getElementById('element-' + index).scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .duels-game-users {
        width: 300px;
        position: absolute;
        top: 13px;
        bottom: 13px;
        right: 13px;
        padding: 20px 11px 0px 11px;
        border-radius: var(--radius-lg);
        background: var(--bg-tertiary);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .duels-game-users .users-header {
        display: flex;
        align-items: center;
    }

    .duels-game-users .header-user {
        width: calc(100% - 70px);
        font-size: 12px;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .duels-game-users .header-roll {
        width: 70px;
        font-size: 12px;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .duels-game-users .users-content {
        height: calc(100% - 33px);
        position: relative;
        margin-top: 15px;
    }

    .duels-game-users .users-content::after {
        content: '';
        width: 100%;
        height: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.8) 100%);
    }

    .duels-game-users .content-list {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 5px;
    }

    @media only screen and (max-width: 1050px) {

        .duels-game-users {
            width: auto;
            height: 300px;
            top: initial;
            left: 13px;
        }

    }
</style>
