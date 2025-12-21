<template>
    <div class="modal-fair">
        <div class="fair-header">
            <div class="header-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="2"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h1 class="header-title">PROVABLY FAIR</h1>
            <p class="header-subtitle">Transparent & Verifiable Gaming</p>
        </div>
        
        <div class="fair-info">
            <p>The game results have been generated before you even place your bet, and most importantly, we can prove it. Before each game, we actually give you the game result in a hashed format.</p>
            <p>Before you start the game, we give you the hash of the server seed and the public seed which the round result is based on. After the game is finished, we publish the server seed, which you can then compare to the hash to make sure that they match. With this system we can prove that the results were fair and pre-generated.</p>
        </div>
        
        <div class="fair-nav">
            <button v-on:click="modalSetGame('Crash')" v-bind:class="{ 'button-active': modalGame === 'Crash' }">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>CRASH</span>
            </button>
            <button v-on:click="modalSetGame('Mines')" v-bind:class="{ 'button-active': modalGame === 'Mines' }">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>MINES</span>
            </button>
            <button v-on:click="modalSetGame('Towers')" v-bind:class="{ 'button-active': modalGame === 'Towers' }">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 21v-6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>TOWERS</span>
            </button>
        </div>
        
        <div class="fair-content">
            <component v-bind:is="'Fair' + modalGame" />
        </div>
    </div>
</template>

<script>
    import FairCrash from '@/components/fair/FairCrash';
    import FairMines from '@/components/fair/FairMines';
    import FairTowers from '@/components/fair/FairTowers';

    export default {
        name: 'ModalFair',
        components: {
            FairCrash,
            FairMines,
            FairTowers
        },  
        data() {
            return {
                modalGame: 'Crash'
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
        padding: 40px;
        border-radius: 20px;
        background: linear-gradient(145deg, rgba(26, 41, 66, 0.98) 0%, rgba(15, 25, 35, 0.99) 100%);
        border: 1px solid rgba(184, 115, 51, 0.2);
        box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    .modal-fair .fair-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 24px;
    }

    .modal-fair .header-icon {
        width: 72px;
        height: 72px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border: 2px solid rgba(184, 115, 51, 0.3);
        color: #b87333;
        margin-bottom: 20px;
    }

    .modal-fair .header-title {
        font-size: 28px;
        font-weight: 800;
        background: linear-gradient(135deg, #b87333 0%, #d4a574 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 2px;
        margin: 0;
    }

    .modal-fair .header-subtitle {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.5);
    }

    .modal-fair .fair-info {
        width: 100%;
        padding: 24px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        margin-bottom: 28px;
    }

    .modal-fair .fair-info p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.75);
        line-height: 1.7;
        margin: 0;
    }

    .modal-fair .fair-info p + p {
        margin-top: 12px;
    }

    .modal-fair .fair-nav {
        display: flex;
        gap: 8px;
        padding: 6px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .modal-fair .fair-nav button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        height: 48px;
        padding: 0 28px;
        border-radius: 10px;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        color: rgba(255, 255, 255, 0.5);
    }

    .modal-fair .fair-nav button:hover {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.8);
    }

    .modal-fair .fair-nav button.button-active {
        background: linear-gradient(135deg, #b87333 0%, #8b5a2b 100%);
        color: #ffffff;
        box-shadow: 0 4px 15px rgba(184, 115, 51, 0.3);
    }

    .modal-fair .fair-nav button span {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .modal-fair .fair-nav button svg {
        flex-shrink: 0;
    }

    .modal-fair .fair-content {
        width: 100%;
        margin-top: 28px;
    }

    @media only screen and (max-width: 955px) {
        .modal-fair {
            width: calc(100vw - 20px);
            padding: 85px 20px 40px 20px;
        }
    }

    @media only screen and (max-width: 600px) {
        .modal-fair .fair-nav {
            width: 100%;
            flex-direction: column;
            gap: 4px;
        }

        .modal-fair .fair-nav button {
            width: 100%;
            padding: 0 20px;
        }

        .modal-fair .header-title {
            font-size: 24px;
        }

        .modal-fair .fair-info {
            padding: 16px;
        }

        .modal-fair .fair-info p {
            font-size: 13px;
        }
    }
</style>
