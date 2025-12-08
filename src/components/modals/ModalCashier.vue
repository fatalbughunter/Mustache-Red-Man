<template>
    <div class="modal-cashier">
        <div class="cashier-title-header">
            <div class="title-text">Wallet</div>
        </div>
        <div class="cashier-header">
            <button v-on:click="modalSetTab('deposit')" class="button-nav" v-bind:class="{ 'button-active': modalTab === 'deposit' }">
                <div class="button-inner">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.641623 6.6792C0.996005 6.6792 1.28331 6.9665 1.28331 7.32089L1.28331 12.4544C1.28331 12.5725 1.37905 12.6683 1.49721 12.6683L11.7642 12.6683C11.8823 12.6683 11.9781 12.5725 11.9781 12.4544L11.9781 7.32089C11.9781 6.9665 12.2654 6.6792 12.6198 6.6792C12.9742 6.6792 13.2615 6.9665 13.2615 7.32089L13.2615 12.4544C13.2615 13.2813 12.5911 13.9517 11.7642 13.9517L1.49721 13.9517C0.670284 13.9517 -6.51384e-05 13.2813 -6.51023e-05 12.4544L-6.48779e-05 7.32089C-6.48624e-05 6.9665 0.28724 6.6792 0.641623 6.6792Z" />
                        <path d="M5.6763 0.0483396C5.20376 0.0483396 4.82071 0.431393 4.82071 0.903923L4.82071 5.05863C4.51664 5.07825 4.21273 5.1028 3.90926 5.1323L3.64813 5.15768C3.22351 5.19894 2.96932 5.64984 3.15361 6.03451C3.90318 7.59843 4.92877 9.01425 6.18126 10.2138L6.20804 10.2394C6.44666 10.468 6.82286 10.468 7.06148 10.2394L7.08826 10.2138C8.34075 9.01425 9.36637 7.59843 10.1159 6.03451C10.3002 5.64984 10.046 5.19894 9.62139 5.15768L9.36027 5.1323C9.05676 5.1028 8.7529 5.07825 8.44881 5.05863L8.4488 0.903923C8.4488 0.431402 8.06577 0.0483398 7.59323 0.0483397L5.6763 0.0483396Z" />
                    </svg>
                    <span>Deposit</span>
                </div>
            </button>
            <button v-on:click="modalSetTab('withdraw')" class="button-nav" v-bind:class="{ 'button-active': modalTab === 'withdraw' }">
                <div class="button-inner">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6201 6.41089C12.2657 6.41089 11.9784 6.69819 11.9784 7.05258L11.9784 12.1861C11.9784 12.3042 11.8827 12.4 11.7645 12.4L1.49751 12.4C1.37938 12.4 1.28362 12.3042 1.28362 12.1861L1.28362 7.05258C1.28362 6.69819 0.996323 6.41089 0.641932 6.41089C0.28754 6.41089 0.000244128 6.69819 0.000244113 7.05258L0.000243888 12.1861C0.000243852 13.013 0.670593 13.6833 1.49751 13.6833L11.7645 13.6833C12.5914 13.6833 13.2618 13.013 13.2618 12.1861L13.2618 7.05258C13.2618 6.69819 12.9745 6.41089 12.6201 6.41089Z" />
                        <path d="M7.58542 10.3625C8.05796 10.3625 8.44101 9.9795 8.44101 9.50697L8.44101 5.35226C8.74508 5.33264 9.04898 5.30809 9.35246 5.27859L9.61358 5.25321C10.0382 5.21195 10.2924 4.76104 10.1081 4.37637C9.35853 2.81245 8.33295 1.39663 7.08046 0.197107L7.05368 0.17144C6.81506 -0.0570862 6.43886 -0.0570861 6.20023 0.17144L6.17345 0.197107C4.92097 1.39663 3.89534 2.81245 3.14584 4.37637C2.96148 4.76104 3.21575 5.21195 3.64033 5.25321L3.90145 5.27859C4.20495 5.30809 4.50881 5.33264 4.81291 5.35226L4.81291 9.50697C4.81291 9.97949 5.19595 10.3625 5.66849 10.3625L7.58542 10.3625Z" />
                    </svg>
                    <span>Withdraw</span>
                </div>
            </button>
            <button v-on:click="modalSetTab('redeem')" class="button-nav" v-bind:class="{ 'button-active': modalTab === 'redeem' }">
                <div class="button-inner">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 0H1.75C0.783502 0 0 0.783502 0 1.75V12.25C0 13.2165 0.783502 14 1.75 14H12.25C13.2165 14 14 13.2165 14 12.25V1.75C14 0.783502 13.2165 0 12.25 0ZM11.375 7.875H8.75C8.33579 7.875 8 7.53921 8 7.125C8 6.71079 8.33579 6.375 8.75 6.375H11.375C11.7892 6.375 12.125 6.71079 12.125 7.125C12.125 7.53921 11.7892 7.875 11.375 7.875Z" />
                        <path d="M1.75 1.75H10.5V3.5H1.75V1.75ZM1.75 10.5H10.5V12.25H1.75V10.5Z" />
                    </svg>
                    <span>Redeem</span>
                </div>
            </button>
            <button v-on:click="modalSetTab('tip')" class="button-nav" v-bind:class="{ 'button-active': modalTab === 'tip' }">
                <div class="button-inner">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 0H1.75C0.783502 0 0 0.783502 0 1.75V12.25C0 13.2165 0.783502 14 1.75 14H12.25C13.2165 14 14 13.2165 14 12.25V1.75C14 0.783502 13.2165 0 12.25 0ZM11.375 7.875H8.75C8.33579 7.875 8 7.53921 8 7.125C8 6.71079 8.33579 6.375 8.75 6.375H11.375C11.7892 6.375 12.125 6.71079 12.125 7.125C12.125 7.53921 11.7892 7.875 11.375 7.875Z" />
                        <path d="M1.75 1.75H10.5V3.5H1.75V1.75ZM1.75 10.5H10.5V12.25H1.75V10.5Z" />
                    </svg>
                    <span>Tip</span>
                </div>
            </button>
        </div>

        <div class="cashier-content">
            <CashierDeposit v-if="modalTab === 'deposit'" />
            <CashierWithdraw v-else-if="modalTab === 'withdraw'" />
            <CashierRedeem v-else-if="modalTab === 'redeem'" />
            <CashierTip v-else-if="modalTab === 'tip'" />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import CashierDeposit from '@/components/cashier/CashierDeposit';
    import CashierWithdraw from '@/components/cashier/CashierWithdraw';
    import CashierRedeem from '@/components/cashier/CashierRedeem';
    import CashierTip from '@/components/cashier/CashierTip';

    export default {
        name: 'ModalCashier',
        components: {
            CashierDeposit,
            CashierWithdraw,
            CashierRedeem,
            CashierTip
        },
        data() {
            return {
                modalTab: 'deposit'
            }
        },
        methods: {
            modalSetTab(tab) {
                this.modalTab = tab;
            }
        },
        computed: {
            ...mapGetters([ 
                'modalsData'
            ])
        },
        created() {
            if(this.modalsData !== null && this.modalsData.typeCashier !== undefined) {
                this.modalTab = this.modalsData.typeCashier;
            }
        }
    }
</script>

<style scoped>
    .modal-cashier {
        width: 100%;
        max-width: 420px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 18px 20px 25px 20px;
        border-radius: 15px;
        background: var(--bg-blue-dark);
    }

    .modal-cashier .cashier-title-header {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-cashier .cashier-title-header .title-text {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
    }

    .modal-cashier .cashier-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 18px;
        border-bottom: none;
        gap: 8px;
    }

    .modal-cashier button.button-nav {
        height: auto;
        min-height: 65px;
        flex: 1;
        position: relative;
        margin-right: 0;
        padding: 0;
        border: none;
        background: transparent;
        filter: none;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .modal-cashier button.button-nav::before {
        display: none;
    }

    .modal-cashier button.button-nav:last-of-type {
        margin-right: 0;
    }

    .modal-cashier button.button-nav .button-inner {
        width: 100%;
        height: 100%;
        min-height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 12px;
        background: var(--bg-blue-dark);
        border-radius: 10px;
        transition: all 0.3s ease;
        gap: 5px;
    }
    
    .modal-cashier button.button-nav.button-active .button-inner {
        background: var(--gradient-button-bg);
        border-radius: 10px;
    }

    .modal-cashier button.button-nav .button-inner svg {
        margin-right: 0;
        margin-bottom: 0;
        fill: var(--text-muted);
        transition: fill 0.3s ease;
        width: 16px;
        height: 16px;
    }

    .modal-cashier button.button-nav.button-active .button-inner svg {
        fill: #131629;
    }

    .modal-cashier button.button-nav .button-inner span {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-muted);
        transition: color 0.3s ease;
        line-height: 1;
    }

    .modal-cashier button.button-nav.button-active .button-inner span {
        color: #131629 !important;
        -webkit-text-fill-color: #131629 !important;
        background: none !important;
    }

    .modal-cashier .cashier-content {
        width: 100%;
        min-height: 500px;
        display: flex;
        flex-direction: column;
    }

    @media only screen and (max-width: 500px) {
        .modal-cashier {
            max-width: calc(100vw - 20px);
            padding: 15px 16px 20px 16px;
        }

        .modal-cashier .cashier-header {
            gap: 6px;
        }

        .modal-cashier button.button-nav .button-inner {
            padding: 8px 8px;
            min-height: 60px;
        }

        .modal-cashier button.button-nav .button-inner svg {
            width: 14px;
            height: 14px;
        }

        .modal-cashier button.button-nav .button-inner span {
            font-size: 10px;
        }
    }
</style>
