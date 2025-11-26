<template>
    <div class="modal-blackjack-rules">
        <div class="rules-title">
            <span class="gradient-yellow">BLACKJACK GAME RULES</span>
        </div>
        <div class="rules-list">
            <div class="list-section">
                <div class="section-name">21 + 3 PAYOUTS</div>

                <div class="section-element">
                    <span class="gradient-yellow">5X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">FLUSH</span>
                        THREE CARDS IN THE SAME SUIT
                    </div>
                </div>
                <div class="section-element">
                    <span class="gradient-yellow">10X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">STRAIGHT</span>
                        THREE CARDS OF CONSECUTIVE VALUES, SUCH AS 2/3/4. ACES CAN BE HIGH OR LOW.
                    </div>
                </div>
                <div class="section-element">
                    <span class="gradient-yellow">30X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">THREE OF A KIND</span>
                        THREE CARDS OF THE SAME VALUE / FACE CARD
                    </div>
                </div>
                <div class="section-element">
                    <span class="gradient-yellow">40X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">SUITED OF A KIND</span>
                        THREE CARDS OF CONSECUTIVE VALUES THAT ARE ALL IN THE SAME SUIT
                    </div>
                </div>
                <div class="section-element">
                    <span class="gradient-yellow">100X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">SUITED THREE OF A KIND</span>
                        THREE CARDS OF THE SAME VALUE / FACE CARD AND THE SAME SUIT
                    </div>
                </div>

            </div>
            <div class="list-section">
                <div class="section-name">BLACKJACK</div>

                <div class="section-element">
                    <span class="gradient-yellow">1.5X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">BLACKJACK</span>
                        GET 21
                    </div>
                </div>

            </div>
            <div class="list-section">
                <div class="section-name">PERFECT PAIRS: SIDE BET</div>

                <div class="section-element">
                    <span class="gradient-yellow">25X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">PERFECT PAIR </span>
                    </div>
                </div>
                <div class="section-element">
                    <span class="gradient-yellow">10X</span>
                    <div class="element-info">
                        <span class="gradient-yellow">COLOURED PAIR</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalBlackjackRules'
    }
</script>

<style scoped>
    .modal-blackjack-rules {
        width: 970px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 35px 36px 0 0;
        border-radius: 15px;
        background: radial-gradient(100% 100% at 50% -31.45%, rgba(7, 7, 7, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(255deg, #2a2a2a 0%, #1a1a1a 100%);
    }

    .modal-blackjack-rules::after {
        content: '';
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0 0 15px 15px;
        background: linear-gradient(0deg, #2a2a2a 0%, rgba(42, 42, 42, 0) 100%);
    }

    .modal-blackjack-rules .rules-title {
        text-align: center;
        text-transform: uppercase;
        font-size: 32px;
        font-weight: 900;
    }

    .modal-blackjack-rules .rules-list {
        width: 100%;
        height: 570px;
        margin-top: 45px;
        padding: 0 37px 60px 78px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-blackjack-rules .rules-list::-webkit-scrollbar {
        width: 5px;
        height: 0;
    }

    .modal-blackjack-rules .rules-list::-webkit-scrollbar-track {
        margin-bottom: 60px;
        background-color: #1a1a1a;
    }

    .modal-blackjack-rules .rules-list::-webkit-scrollbar-thumb {
        background-color: var(--accent-yellow);
    }

    .modal-blackjack-rules .list-section {
        position: relative;
        padding-top: 35px;
        padding-bottom: 35px;
        border-bottom: 1px solid var(--accent-yellow);
    }

    .modal-blackjack-rules .list-section:first-of-type {
        padding-top: 0;
    }

    .modal-blackjack-rules .list-section:last-of-type {
        padding-bottom: 0;
        border-bottom: none;
    }

    .modal-blackjack-rules .section-name {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
    }

    .modal-blackjack-rules .section-element {
        display: flex;
        align-items: center;
        margin-top: 14px;
    }

    .modal-blackjack-rules .section-element:first-child {
        margin-top: 0;
    }

    .modal-blackjack-rules .section-element span {
        font-family: 'Rubik';
        font-size: 64px;
        font-weight: 900;
    }

    .modal-blackjack-rules .element-info {
        width: 400px;
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        font-size: 16px;
        font-weight: 700;
        color: #6a88a1;
    }

    .modal-blackjack-rules .element-info span {
        font-size: 20px;
        font-weight: 800;
    }

    @media only screen and (max-width: 990px) {

        .modal-blackjack-rules {
            width: calc(100vw - 20px);
            padding: 85px 20px 0 0;
        }

        .modal-blackjack-rules .rules-list {
            padding: 0 37px 60px 62px;
        }

        .modal-blackjack-rules .section-name {
            position: static;
            transform: translate(0, 0);
        }

    }

    @media only screen and (max-width: 650px) {

        .modal-blackjack-rules .rules-list {
            padding: 0 20px 60px 45px;
        }

        .modal-blackjack-rules .section-element {
            flex-direction: column;
            align-items: flex-start;
        }

        .modal-blackjack-rules .element-info {
            width: 100%;
            margin-top: 5px;
            padding-left: 0;
        }

    }

    @media only screen and (max-width: 550px) {

        .modal-blackjack-rules .rules-list {
            padding: 0 10px 60px 20px;
        }

    }
</style>
