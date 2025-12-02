<template>
    <div class="modal-fair">
        <div class="fair-header">
            <div class="header-icon">
                <img src="@/assets/img/fair.png" alt="fair" />
            </div>
            <span class="gradient-green">PROVABLY FAIR</span>
        </div>
        <div class="fair-info">
            The game results have been generated before you even place your bet, and most importantly, we can prove it.
            Before each game, we actually give you the game result in a hashed format.
            Before you start the game, we give you the hash of the server seed and the public seed which the round result is based on. After the game is finished, we publish the server seed, which you can then compare to the hash to make sure that they match. With this system we can prove that the results were fair and pre-generated.
        </div>
        <div class="fair-nav">
            <button v-on:click="modalSetGame('Blackjack')" v-bind:class="{ 'button-active': modalGame === 'Blackjack' }">
                <div class="button-inner">
                    <span>BLACKJACK</span>
                </div>
            </button>
            <button v-on:click="modalSetGame('Crash')" v-bind:class="{ 'button-active': modalGame === 'Crash' }">
                <div class="button-inner">
                    <span>CRASH</span>
                </div>
            </button>
            <button v-on:click="modalSetGame('Mines')" v-bind:class="{ 'button-active': modalGame === 'Mines' }">
                <div class="button-inner">
                    <span>MINES</span>
                </div>
            </button>
            <button v-on:click="modalSetGame('Towers')" v-bind:class="{ 'button-active': modalGame === 'Towers' }">
                <div class="button-inner">
                    <span>TOWERS</span>
                </div>
            </button>
        </div>
        <div class="fair-content">
            <component v-bind:is="'Fair' + modalGame" />
        </div>
    </div>
</template>

<script>
    import FairBlackjack from '@/components/fair/FairBlackjack';
    import FairCrash from '@/components/fair/FairCrash';
    import FairMines from '@/components/fair/FairMines';
    import FairTowers from '@/components/fair/FairTowers';

    export default {
        name: 'ModalFair',
        components: {
            FairBlackjack,
            FairCrash,
            FairMines,
            FairTowers
        },  
        data() {
            return {
                modalGame: 'Blackjack'
            }
        },
        methods: {
            modalSetGame(game) {
                this.modalGame = game;
            }
        }
    }
</script>

<style scoped>
    .modal-fair {
        width: 860px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 35px 30px 30px 30px;
        border-radius: 20px;
        background: var(--bg-primary-blue);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8);
    }

    .modal-fair .fair-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .modal-fair .header-icon {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .modal-fair .header-icon img {
        width: 48px;
        height: 48px;
    }

    .modal-fair .fair-header span {
        margin-top: 20px;
        text-align: center;
        font-size: 32px;
        font-weight: 900;
        color: #ffffff;
    }

    .modal-fair .fair-info {
        width: 100%;
        margin-top: 12px;
        padding-bottom: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-fair .fair-nav {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        padding: 4px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-fair .fair-nav button {
        height: 48px;
        position: relative;
        margin-right: 4px;
        padding: 1px;
        z-index: 1;
    }

    .modal-fair .fair-nav button:last-of-type {
        margin-right: 0;
    }

    .modal-fair .fair-nav button.button-active {
        filter: drop-shadow(0px 4px 25px rgba(1, 230, 169, 0.15));
    }

    .modal-fair .fair-nav button.button-active:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        z-index: -1;
    }

    .modal-fair .fair-nav button.button-active:after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 11px;
        z-index: -1;
    }

    .modal-fair .fair-nav button .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 12px;
    }

    .modal-fair .fair-nav button.button-active .button-inner {
     /*   background: rgba(255, 255, 255, 0.12); */
        background: var(--accent-red);
    }

    .modal-fair .fair-nav button .button-inner span {
        font-size: 14px;
        font-weight: 800;
        color: var(--accent-yellow);
    }

    .modal-fair .fair-nav button.button-active .button-inner span {
        color: #ffffff;
        font-weight: 900;
    }

    .modal-fair .fair-content {
        width: 100%;
        margin-top: 30px;
    }

    @media only screen and (max-width: 955px) {

        .modal-fair {
            width: calc(100vw - 20px);
            padding: 85px 10px 48px 10px;
        }

    }

    @media only screen and (max-width: 825px) {

        .modal-fair .fair-nav button {
            width: calc(25% - 3px);
        }

        .modal-fair .fair-nav button:nth-child(4n) {
            margin-right: 0;
        }

        .modal-fair .fair-nav button .button-inner {
            padding: 0;
        }

    }

    @media only screen and (min-width: 826px) {
        .modal-fair .fair-nav button {
            width: calc(25% - 3px);
        }

        .modal-fair .fair-nav button:nth-child(4n) {
            margin-right: 0;
        }
    }
</style>
