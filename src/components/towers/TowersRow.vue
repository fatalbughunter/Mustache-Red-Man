<template>
    <div class="towers-row" v-bind:class="{
        'row-active': towersGame !== null && towersGame.state !== 'completed' && towersGame.revealed.length === row,
        'row-revealed': towersGame !== null && towersGame.revealed[row] !== undefined
    }">
        <div v-for="tile in towersGetTilesCount" v-bind:key="tile" class="row-tile">
            <transition name="fade" mode="out-in">
                <div v-if="towersGame !== null && towersGame.revealed[row] !== undefined && towersGame.revealed[row].tile === (tile - 1) && towersGame.revealed[row].row[tile - 1] === 'coin'" class="tile-coin">
                    <img src="@/assets/img/towers/gem_coin.png" alt="Gem" class="gem-image" />
                    <div class="coin-inner">
                        <div class="coin-value">
                            <span>{{ towersFormatValue(towersGetRowCashout).split('.')[0] }}</span>.{{ towersFormatValue(towersGetRowCashout).split('.')[1] }}
                        </div>
                    </div>
                </div>
                <div v-else-if="
                        towersGame !== null && 
                        (
                            (towersGame.revealed[row] !== undefined && towersGame.revealed[row].tile === (tile - 1) && towersGame.revealed[row].row[tile - 1] === 'lose') ||
                            (towersGame.state === 'completed' && towersGame.revealed.length <= row && towersGame.deck[row][tile - 1] === 'lose')
                        )" class="tile-lose">
                    <img src="@/assets/img/towers/gem_broken.png" alt="Broken Gem" class="gem-image" />
                    <div class="lose-inner">
                        <IconSkull />
                    </div>
                </div>
                <button 
                    v-else 
                    v-on:click="towersRevealButton(tile - 1)" 
                    class="button-reveal" 
                    v-bind:disabled="socketSendLoading !== null || towersGame === null || towersGame.state === 'completed' || towersGame.revealed.length !== row"
                >
                    <img src="@/assets/img/towers/gem.png" alt="Gem" class="gem-image" />
                    <div class="button-inner">
                    </div>
                </button>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import IconSkull from '@/components/icons/IconSkull';

    export default {
        name: 'TowersRow',
        components: {
            IconSkull
        },
        props: [
            'row'
        ],
        methods: {
            ...mapActions([
                'towersSendRevealSocket'
            ]),
            towersFormatValue(value) {
                return parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            towersRevealButton(tile) {
                const data = { tile: tile };
                this.towersSendRevealSocket(data);
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading',
                'towersRisk',
                'towersGame'
            ]),
            towersGetTilesCount() {
                let count = 3;

                if((this.towersGame !== null && this.towersGame.state !== 'completed' ? this.towersGame.risk : this.towersRisk) === 'medium') {
                    return 2;
                }

                return count;
            },
            towersGetRowCashout() {
                const multiplierPerRow = this.towersRisk === 'easy' ? 1.425 : this.towersRisk === 'medium' ? 1.90 : 2.85;
                const amount = this.towersGame !== null ? this.towersGame.amount : 0;

                return amount * Math.pow(multiplierPerRow, this.row + 1);
            }
        }
    }
</script>

<style scoped>
    .towers-row {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 3px;
        padding: 0;
        gap: 6px;
    }


    .towers-row:last-child {
        margin-top: 0;
    }

    .towers-row.row-active::before,
    .towers-row.row-active::after {
        content: '';
        width: 3px;
        height: 45px;
        position: absolute;
        top: 0;
        border-radius: 3px;
        background: var(--accent-towers-btn-bk);
    }

    .towers-row.row-active::before {
        left: 0;
    }

    .towers-row.row-active::after {
        right: 0;
    }

    .towers-row .row-tile {
        width: calc(50% - 3px);
        height: 45px;
        position: relative;
    }

    .towers-row .row-tile .gem-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    .container-game.game-medium .towers-row .row-tile {
        width: calc(50% - 3px);
    }

    .container-game.game-easy .towers-row .row-tile,
    .container-game.game-hard .towers-row .row-tile {
        width: calc(50% - 3px);
    }

    .towers-row  .tile-coin,
    .towers-row  .tile-lose {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 1px;
     /*   opacity: 0.25; */
        z-index: 1;
    }

    .towers-row .tile-coin .gem-image,
    .towers-row .tile-lose .gem-image {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .towers-row.row-active  .tile-coin,
    .towers-row.row-active  .tile-lose {
        opacity: 1;
    }

    .towers-row  .tile-coin::before,
    .towers-row  .tile-lose::before {
        display: none;
    }

    .towers-row  .tile-coin::after,
    .towers-row  .tile-lose::after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
     /*   background: rgba(255, 255, 255, 0.05);  */
        border-radius: 11px;
        z-index: -1;
    }

    .towers-row .coin-inner,
    .towers-row .lose-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 11px;
        position: relative;
        z-index: 1;
    }

    .towers-row .coin-inner {
        padding: 0;
        background: transparent;
        justify-content: center;
    }

    .towers-row .lose-inner {
        background: transparent;
    }

    .towers-row .lose-inner svg {
        display: none;
    }

    .towers-row button.button-reveal {
        width: 100%;
        height: 100%;
    }

    .towers-row.row-active button.button-reveal {
        transition: transform 0.3s ease;
    }

    .towers-row.row-active button.button-reveal:hover {
        transform: scale(1.05);
    }

    .towers-row button.button-reveal {
        position: relative;
    }

    .towers-row button.button-reveal .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 11px;
        position: relative;
        z-index: 1;
        background: transparent;
    }

    .towers-row.row-active button.button-reveal .button-inner,
    .towers-row.row-revealed button.button-reveal .button-inner {
        background: transparent;
    }

    .towers-row.row-revealed button.button-reveal .button-inner {
        opacity: 0.25;
    }

    .towers-row.row-revealed button.button-reveal .gem-image {
        opacity: 0.25;
    }


    .towers-row .coin-inner .coin-value {
        font-size: 11px;
        font-weight: 600;
        color: #ffffff;
        display: none; /* Temporarily hidden */
        align-items: baseline;
        justify-content: center;
    }

    .towers-row .coin-inner .coin-value span {
        font-size: 15px;
        font-weight: 800;
        color: #ffffff;
    }

    @media only screen and (max-width: 550px) {

        .towers-row {
            padding: 0 10px;
            gap: 5px;
            margin-top: 2px;
        }

        .towers-row .row-tile {
            width: calc(50% - 4px);
            height: 40px;
        }

        .towers-row .coin-inner .coin-value {
            font-size: 10px;
        }

        .towers-row .coin-inner .coin-value span {
            font-size: 13px;
        }

    }

    @media only screen and (max-width: 500px) {


        .towers-row .coin-inner .coin-value {
            font-size: 9px;
        }

        .towers-row .coin-inner .coin-value span {
            font-size: 12px;
        }

    }
</style>
