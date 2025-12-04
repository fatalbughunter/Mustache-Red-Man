<template>
    <div class="profile-transactions">
        <div class="transactions-head">
            <div class="head-date">DATE</div>
            <div class="head-method">METHOD</div>
            <div class="head-type">TYPE</div>
            <div class="head-amount">AMOUNT</div>
        </div>
        <div class="transactions-content">
            <transition name="fade" mode="out-in">
                <div v-if="userTransactionsData.transactions === null || userTransactionsData.loading === true" class="content-loading" key="loading">
                    <LoadingAnimation />
                </div>
                <div v-else-if="userTransactionsData.transactions.length > 0" class="content-list" key="data">

                    <ProfileTransactionsElement v-for="transaction in userTransactionsData.transactions" v-bind:key="transaction._id" v-bind:transaction="transaction" />

                </div>
                <div v-else class="content-empty" key="empty">No transactions found.</div>
            </transition>
        </div>
        <div class="transactions-pagination">
            <button v-on:click="profileSetPage(userTransactionsData.page - 1)" class="button-prev" v-bind:disabled="userTransactionsData.page <= 1">
                <div class="button-inner">
                    <IconLeftGradient />
                </div>
            </button>
            <div class="pagination-info">
                PAGE <span class="gradient-green">{{userTransactionsData.page}}</span> / {{Math.ceil(userTransactionsData.count / 8) <= 0 ? '1' : Math.ceil(userTransactionsData.count / 8)}}
            </div>
            <button v-on:click="profileSetPage(userTransactionsData.page + 1)" class="button-next" v-bind:disabled="userTransactionsData.page >= Math.ceil(userTransactionsData.count / 8)">
                <div class="button-inner">
                    <IconRightGradient />
                </div>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LoadingAnimation from '@/components/LoadingAnimation';
    import IconLeftGradient from '@/components/icons/IconLeftGradient';
    import IconRightGradient from '@/components/icons/IconRightGradient';
    import ProfileTransactionsElement from '@/components/profile/ProfileTransactionsElement';

    export default {
        name: 'ProfileTransactions',
        components: {
            LoadingAnimation,
            IconLeftGradient,
            IconRightGradient,
            ProfileTransactionsElement
        },
        methods: {
            ...mapActions([
                'userSetTransactionsDataPage', 
                'userGetTransactionsSocket'
            ]),
            profileSetPage(page) {
                if(this.userTransactionsData.page === page) { return; }
                if(page < 1 || page > Math.ceil(this.userTransactionsData.count / 8)) { return; }

                this.userSetTransactionsDataPage(page);

                const data = { page: this.userTransactionsData.page };
                this.userGetTransactionsSocket(data);
            }
        },
        computed: {
            ...mapGetters([
                'userTransactionsData'
            ])
        },
        created() {
            if(this.userTransactionsData.loading === false) {
                const data = { page: this.userTransactionsData.page };
                this.userGetTransactionsSocket(data);
            }
        }
    }
</script>

<style scoped>
    .profile-transactions {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-transactions .transactions-head {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    .profile-transactions .head-date {
        width: 30%;
        font-size: 13px;
        font-weight: 700;
        color: var(--accent-copper-light);
    }

    .profile-transactions .head-method {
        width: 30%;
        font-size: 13px;
        font-weight: 700;
        color: var(--accent-copper-light);
    }

    .profile-transactions .head-type {
        width: 20%;
        font-size: 13px;
        font-weight: 700;
        color: var(--accent-copper-light);
    }

    .profile-transactions .head-amount {
        width: 20%;
        text-align: right;
        font-size: 13px;
        font-weight: 700;
        color: var(--accent-copper-light);
    }

    .profile-transactions .transactions-content {
        width: 100%;
        margin-top: 15px;
        padding-bottom: 25px;
        border-bottom: 1px solid rgba(222, 184, 135, 0.2);
    }

    .profile-transactions .content-loading {
        width: 100%;
        height: 330px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-transactions .content-loading.fade-leave-active {
        transition: opacity 0.5s;
    }

    .profile-transactions .content-loading.fade-leave-to {
        opacity: 0;
    }

    .profile-transactions .content-list {
        width: 100%;
    }

    .profile-transactions .content-list::-webkit-scrollbar {
        width: 5px;
        height: 0;
    }

    .profile-transactions .content-list::-webkit-scrollbar-track {
        background-color: var(--bg-blue-dark);
    }

    .profile-transactions .content-list::-webkit-scrollbar-thumb {
        background-color: var(--bg-blue-dark);
    }

    .profile-transactions .content-empty {
        width: 100%;
        height: 192px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        color: var(--accent-copper-light);
    }

    .profile-transactions .content-list.fade-enter-active,
    .profile-transactions .content-empty.fade-enter-active {
        transition: opacity 0.5s;
    }

    .profile-transactions .content-list.fade-enter-from,
    .profile-transactions .content-empty.fade-enter-from {
        opacity: 0;
    }

    .profile-transactions .transactions-pagination {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
    }

    .profile-transactions .transactions-pagination button {
        width: 52px;
        height: 37px;
        position: relative;
        padding: 1px;
        z-index: 1;
    }

    .profile-transactions .transactions-pagination button:disabled {
        cursor: not-allowed;
    }

    .profile-transactions .transactions-pagination button:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--gradient-copper);
        border-radius: var(--radius-md);
        z-index: -1;
    }

    .profile-transactions .transactions-pagination button:disabled:before {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(139, 111, 71, 0.2) 100%);
    }

    .profile-transactions .transactions-pagination button:after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        background: var(--bg-blue-dark);
        border-radius: var(--radius-md);
        z-index: -1;
    }

    .profile-transactions .transactions-pagination button .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bg-blue-dark);
        border-radius: var(--radius-md);
        border: 1px solid rgba(222, 184, 135, 0.2);
    }

    .profile-transactions .transactions-pagination button:disabled .button-inner {
        background: var(--bg-blue-dark);
        border-color: rgba(139, 111, 71, 0.2);
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.35);
    }

    .profile-transactions .transactions-pagination button.button-prev .button-inner svg {
        fill: url(#icon-left-gradient-1);
    }

    .profile-transactions .transactions-pagination button.button-next .button-inner svg {
        fill: url(#icon-right-gradient-1);
    }

    .profile-transactions .transactions-pagination button:disabled .button-inner svg {
        fill: var(--text-muted);
    }

    .profile-transactions .transactions-pagination button:not(:disabled) .button-inner svg {
        fill: var(--accent-copper-light);
    }

    .profile-transactions .pagination-info {
        font-size: 12px;
        font-weight: 800;
        color: var(--accent-copper-light);
    }

    @media only screen and (max-width: 725px) {

        .profile-transactions .games-head {
            padding-bottom: 0;
        }

        .profile-transactions .head-date,
        .profile-transactions .head-method,
        .profile-transactions .head-type,
        .profile-transactions .head-amount {
            display: none;
        }

        .profile-transactions .transactions-content {            
            margin-top: 0;
        }

    } 
</style>