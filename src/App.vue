<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <AppLoader v-if="generalSettings === null || (authToken !== null && authUser.user === null)" key="loading" />
            <div v-else-if="generalSettings.general.maintenance.enabled === false || (authUser.user !== null && authUser.user.rank === 'admin')" class="app-page" key="page">
                <Header />
                <Chat />
                <SidebarLeft v-on:collapsed-change="onSidebarCollapsed" />
                <main v-bind:style="mainInlineStyle" v-bind:class="{ 'main-background': appHasBackground === true }" ref="mainContainer">
                    <transition name="slide-fade" mode="out-in">
                        <router-view />
                    </transition>
                    <Footer />
                </main>

                <Modals />
                
                <!-- Sign In Modal (for game pages) -->
                <SignInModal 
                    :show="showSignInModal" 
                    @close="showSignInModal = false"
                    @switch-to-signup="handleSignUpRequest"
                />
                
                <!-- Notifications - Placed last to ensure highest priority and visibility above modals -->
                <Notifications />
            </div>
            <AppMaintenance v-else key="maintenance" />
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppLoader from '@/components/AppLoader';
    import AppMaintenance from '@/components/AppMaintenance';
    import Header from '@/components/Header';
    import SidebarLeft from '@/components/navbar/SidebarLeft';
    import Chat from '@/components/chat/Chat';
    import Footer from '@/components/footer/Footer';
    import Modals from '@/components/modals/Modals';
    import Notifications from '@/components/notifications/Notifications';
    import SignInModal from '@/components/SignInModal.vue';

    export default {
        components: {
            AppLoader,
            AppMaintenance,
            Header,
            SidebarLeft,
            Chat,
            Footer,
            Modals,
            Notifications,
            SignInModal
        },
        data() {
            return {
                sidebarCollapsed: false,
                windowWidth: window.innerWidth,
                showSignInModal: false
            };
        },
        methods: {
            ...mapActions(['socketConnectGeneral', 'generalSocketConnectionError']),
            onSidebarCollapsed(state) {
                this.sidebarCollapsed = state;
            },
            onResize() {
                this.windowWidth = window.innerWidth;
            },
            handleSignInRequest() {
                this.showSignInModal = true;
            },
            handleSignUpRequest() {
                this.showSignInModal = false;
                // Could open signup modal here if needed
            }
        },
        computed: {
            ...mapGetters(['socketGeneral', 'generalSettings', 'authToken', 'authUser', 'generalSidebarMobile', 'generalDesktopChatOpen']),
            appGetRouteName() {
                return this.$route.name;
            },
            appHasBackground() {
                let background = true;

                if(['ProfileTransactions', 'ProfileGames', 'ProfileSettings', 'UnboxOverview', 'UnboxBox', 'BattlesOverview', 'BattlesCreate', 'BattlesGame', 'CashierLimiteds'].includes(this.appGetRouteName) === true) {
                    background = false;
                }   


                return background;
            },
            mainInlineStyle() {
                const isHomePage = this.appGetRouteName === 'Home' || this.$route.path === '/';
                const isMobileOrTablet = this.windowWidth <= 1024;
                
                // On mobile/tablet, header is at bottom, so adjust accordingly
                if(isMobileOrTablet) {
                    const topPosition = '0';
                    const bottomPosition = '80px'; // Space for bottom header
                    const heightValue = 'calc(100% - 80px)';
                    
                    if(this.windowWidth <= 1500) {
                        return {
                            left: '0',
                            width: '100%',
                            top: topPosition,
                            bottom: bottomPosition,
                            height: heightValue
                        };
                    }
                }
                
                // Desktop and non-mobile - header always at top
                const topPosition = '80px';
                const heightValue = 'calc(100% - 80px)';
                
                if(this.windowWidth <= 1500) {
                    return {
                        left: '0',
                        width: '100%',
                        top: topPosition,
                        height: heightValue
                    };
                }
                // Desktop: sidebar visible, adjust for sidebar and chat
                const isDesktopChatOpen = this.generalDesktopChatOpen;
                const chatWidth = isDesktopChatOpen ? 325 : 0;
                const sidebarWidth = this.sidebarCollapsed ? 64 : 240;
                return {
                    left: `${sidebarWidth}px`,
                    width: `calc(100% - ${sidebarWidth + chatWidth}px)`,
                    top: topPosition,
                    height: heightValue
                };
            }
        },
        watch: {
            '$route': {
                handler(to, from) {
                    if(this.$refs.mainContainer !== undefined) {
                        this.$nextTick(() => {
                            const mainContainer = this.$refs.mainContainer;
                            mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
                        });
                    }
                }
            },
        },
        created() {
            // Set default settings immediately to prevent infinite loading if socket fails
            if(this.generalSettings === null) {
                this.generalSocketConnectionError();
            }
            // Attempt socket connection
            this.socketConnectGeneral();
            window.addEventListener('resize', this.onResize);
            
            // Listen for sign in modal requests from Header (for game pages)
            this.$root.$on('open-signin-modal-app', this.handleSignInRequest);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
            this.$root.$off('open-signin-modal-app', this.handleSignInRequest);
        }
    }
</script>

<style>
    body .app-loader.fade-leave-active {
        transition: opacity 0.5s ease;
    }

    body .app-loader.fade-leave-active {
        opacity: 0;
    }

    body .app-page {
        width: 100%;
        height: 100%;
    }

    body .app-page.fade-enter-active,
    body .app-maintenance.fade-enter-active {
        transition: opacity 0.5s ease;
    }

    body .app-page.fade-enter-from,
    body .app-maintenance.fade-enter-from {
        opacity: 0;
    }

    body .app-page main {
        height: calc(100% - 80px);
        position: fixed;
        right: 325px;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
         background: var(--bg-primary-blue);
        transition: right 0.3s ease, width 0.3s ease, left 0.3s ease;
    }

    /*
    body .app-page main.main-background {
        background-image: url('~@/assets/img/background.png');
        background-repeat: no-repeat;
        background-position: center 35px;
    }
    */

    body .app-page main::-webkit-scrollbar-track {
        background-color: transparent;
    }

    body .app-page main::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    body .app-page main::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    body .app-page main .slide-fade-enter-active {
       transition: all .3s ease-out;
   }

    body .app-page main .slide-fade-enter {
       opacity: 0;
   }

   @media only screen and (max-width: 1500px) {

       body .app-page main {
           width: 100%;
           right: 0;
           left: 0 !important;
           top: 80px;
           height: calc(100% - 80px);
       }

   }

   @media only screen and (max-width: 1175px) {

       body .app-page main {
           height: calc(100% - 80px);
           top: 80px;
       }

   }

   /* Adjust main content for bottom header on tablets and mobile */
   @media only screen and (max-width: 1024px) {
       body .app-page main {
           top: 0 !important;
           bottom: 80px !important;
           height: calc(100% - 80px) !important;
           padding-bottom: 20px;
       }
   }

   @media only screen and (max-width: 768px) {
       body .app-page main {
           padding: 0;
           top: 0 !important;
           bottom: 80px !important;
           height: calc(100% - 80px) !important;
           padding-bottom: 20px;
       }
   }
</style>
