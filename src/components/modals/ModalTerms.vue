<template>
    <div class="modal-terms">
        <div class="terms-header">
            <span class="gradient-green">TERMS OF SERVICE</span>
            <p>Welcome to Mustache Casino! By using our website and services, you agree to be bound by the following terms and conditions (the "Terms of Service"). Please read them carefully.</p>
        </div>
        <div class="terms-list">
            <div class="list-element">
                <div class="element-text">
                    <p>Mustache Casino is an online gaming platform where players can enjoy slots, live casino games, and promotions.</p>
                    <p>We focus on fast performance, secure payments, and a smooth user experience across all devices.</p>
                    <p><strong>What we provide:</strong></p>
                    <ul>
                        <li>Easy signup and account management</li>
                        <li>Fast-loading pages and optimized game performance</li>
                        <li>Secure deposits & withdrawals</li>
                        <li>Smart bonuses and loyalty rewards</li>
                        <li>24/7 customer support</li>
                    </ul>
                    <p><strong>Our goal:</strong></p>
                    <p>Make online gaming simple, fun, and trustworthy with a bold Mustache style.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalTerms'
    }
</script>

<style scoped>
    .modal-terms {
        width: 1000px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 30px 0 30px;
        border-radius: 15px;
        background: var(--bg-primary-blue);
    }

    .modal-terms .terms-header {
        width: 100%;
        padding-bottom: 30px;
        border-bottom: 1px solid var(--accent-yellow);
    }

    .modal-terms .terms-header span  {
        font-size: 32px;
        font-weight: 900;
    }

    .modal-terms .terms-header p  {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .modal-terms .terms-list {
        width: 100%;
        height: 600px;
        padding: 30px 20px 30px 0;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-terms .terms-list::-webkit-scrollbar {
        width: 5px;
        height: 0;
    }

    .modal-terms .terms-list::-webkit-scrollbar-track {
        margin: 30px 0;
        background-color: #062234;
    }

    .modal-terms .terms-list::-webkit-scrollbar-thumb {
        background-color: #1e5164;
    }

    .modal-terms .list-element {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 25px;
    }

    .modal-terms .list-element:first-child {
        margin-top: 0;
    }

    .modal-terms .element-title {
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
    }

    .modal-terms .element-text {
        width: 100%;
        margin-top: 15px;
        padding-left: 30px;
    }

    .modal-terms .element-text p {
        margin-top: 15px;
        font-size: 14px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .modal-terms .element-text p:first-child {
        margin-top: 0;
    }

    .modal-terms .element-text ul {
        margin-top: 15px;
        padding-left: 50px;
    }

    @media only screen and (max-width: 1190px) {

        .modal-terms {
            width: calc(100vw - 20px);
        }

    }

    @media only screen and (max-width: 700px) {

        .modal-terms {
            padding: 80px 15px 0 15px;
        }

    }
</style>
