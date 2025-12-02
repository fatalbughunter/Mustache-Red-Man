<template>
    <div class="home">
        <Header />
        <HeroBanner />
        <div class="second-bar-section">
            <img src="@/assets/img/banner/secondBar.png" alt="Second Bar" class="second-bar-image" />
            <button class="play-now-button" @click="handlePlayNowClick">
                PLAY NOW
            </button>
        </div>
        
        <!-- Signup Modal -->
        <SignupModal 
            :show="showSignupModal" 
            @close="showSignupModal = false"
            @switch-to-signin="handleSignInRequest"
        />
        
        <!-- Sign In Modal -->
        <SignInModal 
            :show="showSignInModal" 
            @close="showSignInModal = false"
            @switch-to-signup="handleSignUpRequest"
        />
        <PopularGames />
        <AllGames />
        <CasinoPanels v-if="false" />
        <div class="live-feed-section">
            <LiveFeed />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import HeroBanner from '@/components/HeroBanner';
    import Header from '@/components/Header';
    import SignupModal from '@/components/SignupModal.vue';
    import SignInModal from '@/components/SignInModal.vue';
    import PopularGames from '@/components/PopularGames';
    import AllGames from '@/components/AllGames';
    import CasinoPanels from '@/components/CasinoPanels';
    import LiveFeed from '@/components/LiveFeed';

    export default {
        name: 'Home',
        metaInfo: {
            title: 'Mustache Casino: The Ultimate Gaming Experience'
        },
        components: {
            HeroBanner,
            Header,
            SignupModal,
            SignInModal,
            PopularGames,
            AllGames,
            CasinoPanels,
            LiveFeed
        },
        data() {
            return {
                showSignupModal: false,
                showSignInModal: false
            }
        },
        computed: {
            ...mapGetters(['authUser'])
        },
        methods: {
            handlePlayNowClick() {
                // If user is not logged in, show sign in modal
                if (this.authUser.user === null) {
                    this.showSignInModal = true;
                } else {
                    // If user is logged in, navigate to Our Casino page
                    this.$router.push('/our-casino');
                }
            },
            handleSignInRequest() {
                this.showSignupModal = false;
                this.showSignInModal = true;
            },
            handleSignUpRequest() {
                this.showSignInModal = false;
                this.showSignupModal = true;
            }
        },
        mounted() {
            // Listen for sign in modal requests from Header
            this.$root.$on('open-signin-modal', this.handleSignInRequest);
            this.$root.$on('open-signup-modal', this.handleSignUpRequest);
        },
        beforeDestroy() {
            this.$root.$off('open-signin-modal', this.handleSignInRequest);
            this.$root.$off('open-signup-modal', this.handleSignUpRequest);
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        min-height: 100vh;
        background: var(--bg-primary-blue) !important;
        background-size: cover;
        background-attachment: fixed;
    }

    .second-bar-section {
        position: relative;
        /*width: 100%; */
        display: flex;
        flex-direction: column;
        margin: 0 100px 0 100px;
        padding: 0;
        border-radius: var(--radius-lg);
        overflow: visible;
    }

    .second-bar-image {
        width: 100%;
        height: auto;
        max-height: 300px;
        display: block;
        object-fit: cover;
        border-radius: var(--radius-lg);
    }

    .play-now-button {
        position: absolute;
        top:68%;
        left: 79%;
        transform: translate(-50%, -50%);
        padding: var(--spacing-sm) var(--spacing-lg);
        background: var(--accent-yellow-main);
        color: #000000;
        border: none;
        border-radius: var(--radius-md);
        font-weight: 800;
        font-size: 21px;
        text-transform: uppercase;
        letter-spacing: 2px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 
            0 8px 25px rgba(222, 199, 156, 0.6),
            0 0 30px rgba(222, 199, 156, 0.4),
            inset 0 2px 10px rgba(255, 255, 255, 0.3);
        overflow: hidden;
        z-index: 10;
    }

    .play-now-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.5s ease;
    }

    .play-now-button:hover {
        transform: translate(-50%, -50%) scale(1.05) translateY(-2px);
        box-shadow: 
            0 12px 35px rgba(222, 199, 156, 0.8),
            0 0 50px rgba(222, 199, 156, 0.6),
            inset 0 2px 10px rgba(255, 255, 255, 0.4);
    }

    .play-now-button:hover::before {
        left: 100%;
    }

    .play-now-button:active {
        transform: translate(-50%, -50%) scale(1.02) translateY(0);
    }

    @media only screen and (max-width: 1024px) {
        .play-now-button {
            padding: var(--spacing-md) var(--spacing-xl);
            font-size: 20px;
        }
    }

    @media only screen and (max-width: 768px) {
        .play-now-button {
            padding: var(--spacing-sm) var(--spacing-lg);
            font-size: 18px;
            letter-spacing: 1px;
        }
    }

    .live-feed-section {
        display: flex;
        gap: var(--spacing-xl);
        padding: var(--spacing-2xl) 0 var(--spacing-2xl) 0;
        margin: 0 150px 0 150px;
        align-items: center;
    }

    @media only screen and (max-width: 1200px) {
        .live-feed-section {
            flex-direction: column;
            margin: 0 var(--spacing-lg);
        }
    }

    @media only screen and (max-width: 768px) {
        .live-feed-section {
            margin: 0;
            padding: var(--spacing-xl) var(--spacing-md);
            gap: var(--spacing-lg);
        }
    }

    @media only screen and (max-width: 1024px) {
        .second-bar-section {
            width: 100%;
            margin: 0;
        }
    }

    @media only screen and (max-width: 768px) {
        .second-bar-section {
            width: 100%;
            margin: 0;
        }
    }
</style>
