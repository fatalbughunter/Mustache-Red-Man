<template>
    <div class="profile-games">
        <div class="games-head">
            <div class="head-date">DATE</div>
            <div class="head-game">GAME</div>
            <div class="head-verify">VERIFY</div>
            <div class="head-amount">AMOUNT</div>
        </div>
        <div class="games-content">
            <transition name="fade" mode="out-in">
                <div v-if="userBetsData.bets === null || userBetsData.loading === true" class="content-loading" key="loading">
                    <LoadingAnimation />
                </div>
                <div v-else-if="userBetsData.bets.length > 0" class="content-list" key="data">

                    <ProfileGamesElement v-for="bet in userBetsData.bets" v-bind:key="bet._id" v-bind:bet="bet" />

                </div>
                <div v-else class="content-empty" key="empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>No bets found</span>
                </div>
            </transition>
        </div>
        <div class="games-pagination">
            <button v-on:click="profileSetPage(userBetsData.page - 1)" class="button-prev" v-bind:disabled="userBetsData.page <= 1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="pagination-info">
                <span class="page-current">{{userBetsData.page}}</span>
                <span class="page-separator">/</span>
                <span class="page-total">{{Math.ceil(userBetsData.count / 8) <= 0 ? '1' : Math.ceil(userBetsData.count / 8)}}</span>
            </div>
            <button v-on:click="profileSetPage(userBetsData.page + 1)" class="button-next" v-bind:disabled="userBetsData.page >= Math.ceil(userBetsData.count / 8)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import LoadingAnimation from '@/components/LoadingAnimation';
    import IconLeftGradient from '@/components/icons/IconLeftGradient';
    import IconRightGradient from '@/components/icons/IconRightGradient';
    import ProfileGamesElement from '@/components/profile/ProfileGamesElement';

    export default {
        name: 'ProfileGames',
        components: {
            LoadingAnimation,
            IconLeftGradient,
            IconRightGradient,
            ProfileGamesElement
        },
        methods: {
            ...mapActions(['userSetBetsDataPage', 'userGetBetsSocket']),
            profileSetPage(page) {
                if(this.userBetsData.page === page) { return; }
                if(page < 1 || page > Math.ceil(this.userBetsData.count / 8)) { return; }

                this.userSetBetsDataPage(page);

                const data = { page: this.userBetsData.page };
                this.userGetBetsSocket(data);
            }
        },
        computed: {
            ...mapGetters(['userBetsData'])
        },
        created() {
            if(this.userBetsData.loading === false) {
             const data = { page: this.userBetsData.page };
                this.userGetBetsSocket(data);
            }
        }
    }
</script>

<style scoped>
    .profile-games {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-games .games-head {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px 16px 24px;
        border-bottom: 1px solid rgba(184, 115, 51, 0.2);
        margin-bottom: 16px;
    }

    .profile-games .head-date {
        width: 35%;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .profile-games .head-game {
        width: 25%;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .profile-games .head-verify {
        width: 20%;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .profile-games .head-amount {
        width: 20%;
        text-align: right;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .profile-games .games-content {
        width: 100%;
        min-height: 200px;
    }

    .profile-games .content-loading {
        width: 100%;
        height: 330px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-games .content-loading.fade-leave-active {
        transition: opacity 0.5s;
    }

    .profile-games .content-loading.fade-leave-to {
        opacity: 0;
    }

    .profile-games .content-list {
        width: 100%;
    }

    .profile-games .content-empty {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        color: rgba(255, 255, 255, 0.3);
    }

    .profile-games .content-empty svg {
        opacity: 0.5;
    }

    .profile-games .content-empty span {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .profile-games .content-list.fade-enter-active,
    .profile-games .content-empty.fade-enter-active {
        transition: opacity 0.5s;
    }

    .profile-games .content-list.fade-enter-from,
    .profile-games .content-empty.fade-enter-from {
        opacity: 0;
    }

    .profile-games .games-pagination {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid rgba(184, 115, 51, 0.15);
    }

    .profile-games .games-pagination button {
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, rgba(26, 41, 66, 0.6) 0%, rgba(15, 25, 35, 0.8) 100%);
        border: 1px solid rgba(184, 115, 51, 0.2);
        border-radius: 10px;
        color: #b87333;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .profile-games .games-pagination button:hover:not(:disabled) {
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-color: rgba(184, 115, 51, 0.4);
        transform: translateY(-2px);
    }

    .profile-games .games-pagination button:disabled {
        cursor: not-allowed;
        opacity: 0.4;
        color: rgba(255, 255, 255, 0.3);
    }

    .profile-games .pagination-info {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
    }

    .profile-games .page-current {
        font-size: 16px;
        font-weight: 700;
        color: #b87333;
    }

    .profile-games .page-separator {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.3);
    }

    .profile-games .page-total {
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.6);
    }

    @media only screen and (max-width: 725px) {

        .profile-games .games-head {
            display: none;
        }

        .profile-games .games-content {            
            margin-top: 0;
        }

        .profile-games .games-pagination {
            gap: 12px;
        }

        .profile-games .games-pagination button {
            width: 40px;
            height: 40px;
        }

        .profile-games .pagination-info {
            padding: 8px 16px;
        }
    } 
</style>
