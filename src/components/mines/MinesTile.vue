<template>
    <div class="mines-tile">
        <transition name="fade" mode="out-in">
            <div v-if="minesGame !== null && minesGetRevealedTile === 'coin'" class="tile-coin">
                <img src="@/assets/img/mines/minecardSuccess.png" alt="Success" class="tile-success-image" />
            </div>
            <div v-else-if="minesGame !== null && minesGetRevealedTile === 'mine'" class="tile-mine">
                <img src="@/assets/img/mines/mineBomb.png" alt="Bomb" class="tile-bomb-image" />
            </div>
            <button v-else v-on:click="minesRevealTile()" class="button-reveal" v-bind:disabled="socketSendLoading !== null || minesGame === null || minesGame.state === 'completed'">
            </button>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'MinesTile',
        props: ['tile'],
        methods: {
            ...mapActions([
                'notificationShow', 
                'minesSendRevealSocket'
            ]),
            minesFormatValue(value) {
                return parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            minesRevealTile() {
                if(this.authUser.user === null) {
                    this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                    return;
                }

                if(this.minesGame === null) {
                    this.notificationShow({type: 'error', message: 'You have no running mines game at the moment.' });
                    return;
                }

                const data = { tile: this.tile };
                this.minesSendRevealSocket(data);
            },
            minesFactorialNumber(number) {
                let value = number;
                for (let i = number; i > 1; i--) {
                    value = value * (i - 1);
                }
                return value;
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading',
                'authUser', 
                'minesGame'
            ]),
            minesGetRevealedTile() {
                let revealed = null;

                if(this.minesGame.state === 'completed' && this.minesGame.deck[this.tile] === 'mine') {
                    revealed = this.minesGame.deck[this.tile];
                } else {
                    const index = this.minesGame.revealed.findIndex((element) => element.tile === this.tile);
                    if(index !== -1) { revealed = this.minesGame.revealed[index].value }
                }

                return revealed;
            },
            minesGetTilePayout() {
                const index = this.minesGame.revealed.findIndex((element) => element.tile === this.tile);

                const first = 25 === (index + 1) ? 1 : this.minesFactorialNumber(25) / (this.minesFactorialNumber(index + 1) * this.minesFactorialNumber(25 - (index + 1)));
                const second = (25 - this.minesGame.minesCount) === (index + 1) ? 1 : this.minesFactorialNumber(25 - this.minesGame.minesCount) / (this.minesFactorialNumber(index + 1) * this.minesFactorialNumber((25 - this.minesGame.minesCount) - (index + 1)));

                let multiplier = 0.95 * (first / second);
                multiplier = multiplier < 1 ? 1 : multiplier;

                return this.minesGame.amount * multiplier;
            }
        }
    }
</script>

<style scoped>
    .mines-tile {
        width: 100%;
        height: 100%;
        border-radius: 7px;
        background-image: url('../../assets/img/mines/minecardBack.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0px 2px 5px rgba(7, 26, 41, 0.25);
    }
    
    .mines-tile button.button-reveal {
        background-image: url('../../assets/img/mines/minecardBack.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: none;
        cursor: pointer;
    }

    .mines-tile .tile-coin.fade-enter-active,
    .mines-tile .tile-mine.fade-enter-active {
        transition: transform 0.3s;
    }

    .mines-tile .tile-coin.fade-enter,
    .mines-tile .tile-mine.fade-enter {
        transform: scale(0);
    }

    .mines-tile button.button-reveal.fade-leave-active {
        transition: transform 0.1s;
    }

    .mines-tile button.button-reveal.fade-leave-to {
        transform: scale(0);
    }

    .mines-tile .tile-coin,
    .mines-tile .tile-mine {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
        padding: 0;
    }

    .mines-tile .tile-success-image,
    .mines-tile .tile-bomb-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 7px;
    }

    .mines-tile button.button-reveal {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 7px;
    }


    @media only screen and (max-width: 575px) {

        .mines-tile {
            border-radius: 6px;
        }

        .mines-tile .tile-coin,
        .mines-tile .tile-mine {
            padding: 0;
            border-radius: 6px;
        }

        .mines-tile .tile-success-image,
        .mines-tile .tile-bomb-image {
            border-radius: 6px;
        }

        .mines-tile button.button-reveal {
            border-radius: 6px;
        }

    }

    @media only screen and (max-width: 425px) {

        .mines-tile {
            border-radius: 5px;
        }

        .mines-tile .tile-coin,
        .mines-tile .tile-mine,
        .mines-tile .tile-success-image,
        .mines-tile .tile-bomb-image,
        .mines-tile button.button-reveal {
            border-radius: 5px;
        }

    }

    @media only screen and (max-width: 350px) {

        .mines-tile {
            border-radius: 4px;
        }

        .mines-tile .tile-coin,
        .mines-tile .tile-mine,
        .mines-tile .tile-success-image,
        .mines-tile .tile-bomb-image,
        .mines-tile button.button-reveal {
            border-radius: 4px;
        }

    }
</style>