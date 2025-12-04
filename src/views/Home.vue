<template>
    <div class="home">
        <HeroBanner />
        
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

</style>
