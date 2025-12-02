<template>
    <div>
        <button class="mobile-fab" v-on:click="toggleMobile">
            <img src="@/assets/img/icons/mobileMenu.png" alt="Menu" class="menu-icon-mobile" />
        </button>
        <router-link to="/" class="mobile-home-btn" @click.native="closeMobile">
            <img src="@/assets/img/icons/mobileHome.png" alt="Home" />
        </router-link>
        <aside id="sidebar-left" v-bind:class="{ 'collapsed': collapsed, 'mobile-open': mobileOpen }">
            <div class="sidebar-header">
                <div class="sidebar-header-logo">
                    <img src="@/assets/img/headerLogo.png" alt="Mustache Casino" class="sidebar-header-logo-img">
                </div>
                <button class="menu-toggle" v-on:click="toggleHeader">
                    <svg width="18" height="12" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="2" y="0"/><rect width="18" height="2" y="5"/><rect width="18" height="2" y="10"/></svg>
                </button>
                <span>MENU</span>
            </div>

            <nav class="sidebar-group">
                <router-link to="/" class="sidebar-link" v-on:click.native="closeMobile">
                    <IconHome />
                    <span>HOME</span>
                </router-link>
                <div class="sidebar-menu-item">
                    <button class="sidebar-link sidebar-link-parent" :class="{ 'expanded': casinoMenuOpen }" @click="toggleCasinoMenu">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 0L11.5 6.5L18 9L11.5 11.5L9 18L6.5 11.5L0 9L6.5 6.5L9 0Z" fill="currentColor"/>
                        </svg>
                        <span>CASINO</span>
                        <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    </button>
                    <div class="sidebar-submenu" v-show="casinoMenuOpen">
                        <router-link to="/mines" class="sidebar-link sidebar-submenu-link" v-on:click.native="closeMobile">
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0067 26.4866C21.7983 26.4866 26.4933 21.7916 26.4933 16C26.4933 10.2083 21.7983 5.51331 16.0067 5.51331C10.215 5.51331 5.51999 10.2083 5.51999 16C5.51999 21.7916 10.215 26.4866 16.0067 26.4866Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 1.66669V5.51335M30.34 15.9867H26.5M16.02 30.3334V26.4867M1.67334 16.0134H5.52001M23.4267 8.58669L24.7867 7.22669M23.4267 23.4134L24.7867 24.7734M8.59334 23.4134L7.23334 24.7734M8.59334 8.58669L7.23334 7.22669" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.16 15.1C9.86935 15.1013 9.58487 15.0162 9.34266 14.8556C9.10045 14.6949 8.91143 14.4659 8.7996 14.1977C8.68776 13.9294 8.65816 13.634 8.71453 13.3488C8.77091 13.0637 8.91074 12.8018 9.11625 12.5962C9.32177 12.3907 9.58372 12.2509 9.86884 12.1945C10.154 12.1382 10.4494 12.1678 10.7177 12.2796C10.986 12.3914 11.2149 12.5804 11.3756 12.8227C11.5362 13.0649 11.6213 13.3493 11.62 13.64C11.62 14.0272 11.4662 14.3986 11.1924 14.6724C10.9186 14.9462 10.5472 15.1 10.16 15.1ZM14 12.5933C13.6044 12.5933 13.2178 12.476 12.8889 12.2563C12.56 12.0365 12.3036 11.7241 12.1522 11.3587C12.0009 10.9932 11.9613 10.5911 12.0384 10.2031C12.1156 9.81518 12.3061 9.45881 12.5858 9.17911C12.8655 8.8994 13.2219 8.70892 13.6098 8.63175C13.9978 8.55458 14.3999 8.59419 14.7654 8.74556C15.1308 8.89694 15.4432 9.15328 15.6629 9.48218C15.8827 9.81108 16 10.1978 16 10.5933C16 11.1238 15.7893 11.6325 15.4142 12.0075C15.0391 12.3826 14.5304 12.5933 14 12.5933Z" fill="currentColor" stroke="currentColor" stroke-miterlimit="10"/>
</svg>
                    <span>Mines</span>
                </router-link>
                        <router-link to="/crash" class="sidebar-link sidebar-submenu-link" v-on:click.native="closeMobile">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.15019 10.1486C3.90571 9.90426 3.81363 10.0271 3.75926 10.0815C2.35141 11.4893 1.10155 14.8862 1.7623 14.5545C4.16769 13.3467 4.56847 13.7063 5.97627 12.2985C6.0307 12.2441 6.15585 12.1544 5.90425 11.9028L4.15019 10.1486Z" fill="currentColor"/>
                        <path d="M11.7397 10.1298C11.6759 9.92678 11.8096 9.82894 11.8658 9.76821C14.9731 6.41355 16.9479 1.94409 15.4844 0.480563C14.0287 -0.975075 9.69708 1.05741 6.34334 4.14226C6.27699 4.20336 6.14621 4.31909 5.91226 4.27024L4.86736 4.02143C4.57725 3.95244 4.16733 4.06841 3.95646 4.27928L0.122402 8.11329C-0.0884723 8.32421 -0.0199598 8.53465 0.274668 8.5809L3.04772 9.01669C3.34235 9.06304 3.75592 8.92837 3.96675 8.71745C3.96675 8.71745 4.10983 8.57398 4.25359 8.71769C5.0467 9.5107 6.52051 10.9845 7.27612 11.7402C7.42632 11.8903 7.28246 12.0332 7.28246 12.0332C7.07154 12.2441 6.93692 12.6576 6.98327 12.9522L7.41901 15.7252C7.46531 16.02 7.67575 16.0885 7.88662 15.8776L11.7207 12.0435C11.9316 11.8326 12.0476 11.4228 11.9785 11.1326L11.7397 10.1298ZM10.8813 5.17648C10.2319 4.52708 10.2319 3.47429 10.8813 2.82499C11.5307 2.17559 12.5835 2.17559 13.2329 2.82499C13.8822 3.47425 13.8822 4.52708 13.2329 5.17643C12.5835 5.82584 11.5306 5.82584 10.8813 5.17648Z" fill="currentColor"/>
                    </svg>
                    <span>Crash</span>
                </router-link>
                        <router-link to="/blackjack" class="sidebar-link sidebar-submenu-link" v-on:click.native="closeMobile">
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.38476 5.1504C9.27073 5.15566 9.15813 5.17806 9.05076 5.21684L2.56839 7.59565C2.2882 7.69846 2.03758 7.93046 1.91214 8.20128C1.7867 8.4719 1.77226 8.81365 1.87501 9.09378L6.04501 20.461C6.1477 20.7411 6.37964 20.9937 6.65039 21.1191C6.92114 21.2446 7.26289 21.2591 7.54289 21.1563L14.0254 18.7773C14.3056 18.6746 14.5562 18.4427 14.6816 18.1719L14.6835 18.168C14.8074 17.8978 14.821 17.5582 14.7188 17.2793L10.5488 5.91209C10.4466 5.63334 10.2164 5.38184 9.94726 5.25584L9.94339 5.25396C9.80801 5.19115 9.65445 5.15671 9.50001 5.15034C9.46139 5.14878 9.42314 5.14853 9.38476 5.1504ZM11.8263 6.0019L15.8165 16.8769C16.0294 17.459 16.0027 18.1017 15.7422 18.6641C15.4819 19.226 15.0091 19.6615 14.4278 19.875L12.7128 20.504L16.4628 20.6777C16.761 20.6917 17.0822 20.574 17.3028 20.3731C17.5233 20.172 17.6697 19.8625 17.6836 19.5643L18.2461 7.47059C18.26 7.17259 18.1443 6.84946 17.9434 6.62884C17.7424 6.40821 17.4329 6.26196 17.1348 6.24803L11.8262 6.00178L11.8263 6.0019ZM19.3888 8.08003L18.8496 19.6192C18.8208 20.2382 18.5476 20.8205 18.0899 21.2383C17.6317 21.6549 17.0268 21.8727 16.4082 21.8438L14.7795 21.7675L19.1153 23.211C19.3985 23.3052 19.7411 23.2802 20.0078 23.1466C20.2747 23.0128 20.4977 22.7539 20.5919 22.4707L24.4141 10.9826C24.5083 10.6993 24.4833 10.3568 24.3497 10.09C24.216 9.82309 23.957 9.59809 23.6738 9.50403L19.3888 8.08015L19.3888 8.08003ZM6.57226 9.22659C8.10089 10.7851 10.8235 10.3353 11.6191 12.0722C12.3613 13.6927 10.7123 14.9476 9.24601 14.4727L10.3085 16.3965L9.13476 16.8282L8.4512 14.8477C7.80183 16.2617 5.76039 16.3318 5.06639 14.8145C4.22076 12.966 6.5677 11.427 6.57226 9.22659ZM25.4121 11.6778L21.7013 22.8398C21.5057 23.4276 21.0849 23.9137 20.5313 24.1914L20.5254 24.1933C19.9727 24.4681 19.3338 24.513 18.7481 24.3183L17.4746 23.8945L20.1816 26.2089C20.4085 26.4028 20.7356 26.5077 21.0331 26.4843C21.3306 26.461 21.6343 26.3068 21.8281 26.08L29.6953 16.8731C29.8892 16.6462 29.9941 16.3209 29.9707 16.0234C29.9475 15.7259 29.7913 15.4204 29.5645 15.2265L25.4122 11.6778L25.4121 11.6778Z" fill="currentColor"/>
                            </svg>
                            <span>Blackjack</span>
                        </router-link>
                        <router-link to="/towers" class="sidebar-link sidebar-submenu-link" v-on:click.native="closeMobile">
                            <svg width="18" height="18" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7526 0H8.72751C8.59087 0 8.4801 0.110779 8.4801 0.247413V1.48448H6.82861V0.247413C6.82861 0.110779 6.71783 0 6.5812 0H4.41757C4.28093 0 4.17015 0.110779 4.17015 0.247413V1.48448H2.51991V0.247413C2.51991 0.110779 2.40913 0 2.27249 0H0.247413C0.110779 0 0 0.110779 0 0.247413V2.9034C0.00136077 3.57305 0.543908 4.1156 1.21356 4.11696H1.21851H9.78644C10.4561 4.1156 10.9986 3.57305 11 2.9034V0.247413C11 0.110779 10.8892 0 10.7526 0Z" fill="currentColor"/>
                        <path d="M9.58606 4.48689H1.42141L1.07132 12.4301V12.5068C1.06894 12.8843 1.19648 13.2513 1.43255 13.5459C1.64925 13.8246 1.97469 13.9975 2.32694 14.021H8.68176C9.03401 13.9975 9.35946 13.8246 9.57616 13.5459C9.81222 13.2513 9.93976 12.8843 9.93738 12.5068C9.93738 12.4919 9.93738 12.466 9.93738 12.4301L9.58606 4.48689ZM7.38036 13.5385H3.62463V10.0549C3.62463 9.01678 4.4662 8.1752 5.50435 8.1752C6.5425 8.1752 7.38408 9.01678 7.38408 10.0549L7.38036 13.5385Z" fill="currentColor"/>
                            </svg>
                            <span>Towers</span>
                        </router-link>
                    </div>
                </div>
                <router-link to="/slots" class="sidebar-link" v-on:click.native="closeMobile">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                        <circle cx="5" cy="5" r="1.5" fill="currentColor"/>
                        <circle cx="9" cy="5" r="1.5" fill="currentColor"/>
                        <circle cx="13" cy="5" r="1.5" fill="currentColor"/>
                        <circle cx="5" cy="9" r="1.5" fill="currentColor"/>
                        <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
                        <circle cx="13" cy="9" r="1.5" fill="currentColor"/>
                        <circle cx="5" cy="13" r="1.5" fill="currentColor"/>
                        <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
                        <circle cx="13" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                    <span>SLOTS</span>
                </router-link>
                <router-link to="/leaderboard" class="sidebar-link" v-on:click.native="closeMobile">
                    <IconLeaderboard />
                    <span>LEADERBOARD</span>
                </router-link>
                <router-link to="/live-casino" class="sidebar-link" v-on:click.native="closeMobile">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1C4.58 1 1 4.58 1 9C1 13.42 4.58 17 9 17C13.42 17 17 13.42 17 9C17 4.58 13.42 1 9 1ZM9 15.5C5.41 15.5 2.5 12.59 2.5 9C2.5 5.41 5.41 2.5 9 2.5C12.59 2.5 15.5 5.41 15.5 9C15.5 12.59 12.59 15.5 9 15.5Z" fill="currentColor"/>
                        <circle cx="9" cy="9" r="3" fill="currentColor"/>
                    </svg>
                    <span>LIVE CASINO</span>
                </router-link>
                <router-link to="/jackpots" class="sidebar-link" v-on:click.native="closeMobile">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 0L11.5 6.5L18 9L11.5 11.5L9 18L6.5 11.5L0 9L6.5 6.5L9 0Z" fill="currentColor"/>
                        <circle cx="9" cy="9" r="3" fill="var(--bg-menu-sidebar)"/>
                    </svg>
                    <span>JACKPOTS</span>
                </router-link>
            </nav>

            <div class="sidebar-logo">
                <img src="@/assets/img/lastLogo.png" alt="Logo" />
            </div>
            <div class="sidebar-footer">
                <!-- <button class="sidebar-link" v-on:click="openSupport">
                    <IconInfo />
                    <span>Support</span>
                </button> -->
            </div>
        </aside>
        <div v-if="mobileOpen" class="mobile-backdrop" v-on:click="closeMobile"></div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import IconHome from '@/components/icons/IconHome';
    import IconLeaderboard from '@/components/icons/IconLeaderboard';
    import IconInfo from '@/components/icons/IconInfo';

    export default {
        name: 'SidebarLeft',
        components: { IconHome, IconLeaderboard, IconInfo },
        data() { return { collapsed: false, mobileOpen: false, casinoMenuOpen: false }; },
        methods: {
            ...mapActions(['modalsSetShow']),
            toggleCollapsed() { this.collapsed = !this.collapsed; this.$emit('collapsed-change', this.collapsed); },
            toggleMobile() { this.mobileOpen = !this.mobileOpen; },
            closeMobile() { this.mobileOpen = false; },
            toggleHeader() {
                if(window.innerWidth <= 1024) { this.toggleMobile(); }
                else { this.toggleCollapsed(); }
            },
            toggleCasinoMenu() {
                this.casinoMenuOpen = !this.casinoMenuOpen;
            },
            openSupport() { this.modalsSetShow('Support'); this.closeMobile(); }
        },
        watch: {
            '$route'(to) {
                // Auto-expand casino menu if on a casino submenu route
                const casinoRoutes = ['/mines', '/crash', '/blackjack', '/towers'];
                if (casinoRoutes.includes(to.path) || to.path.startsWith('/blackjack')) {
                    this.casinoMenuOpen = true;
                }
            }
        },
        mounted() { 
            this.$emit('collapsed-change', this.collapsed);
            // Auto-expand casino menu if on a casino submenu route
            const casinoRoutes = ['/mines', '/crash', '/blackjack', '/towers'];
            if (casinoRoutes.includes(this.$route.path) || this.$route.path.startsWith('/blackjack')) {
                this.casinoMenuOpen = true;
            }
            // Listen for events from Header to toggle sidebar
            this.$root.$on('toggle-sidebar-mobile', () => {
                this.toggleMobile();
            });
            this.$root.$on('close-sidebar-mobile', () => {
                this.closeMobile();
            });
        },
        beforeDestroy() {
            // Clean up event listeners
            this.$root.$off('toggle-sidebar-mobile');
            this.$root.$off('close-sidebar-mobile');
        }
    }
</script>

<style scoped>
    aside#sidebar-left {
        width: 240px;
        height: 100%;
        position: fixed;
        top: 80px;
        left: 0;
        display: flex;
        flex-direction: column;
        background: var(--bg-menu-sidebar);
        backdrop-filter: blur(10px);
        z-index: 90;
        transition: transform 0.3s ease;
        padding-top: var(--spacing-md);
    }

    aside#sidebar-left.collapsed { width: 64px; }

    .sidebar-header { 
        display: flex; 
        align-items: center; 
        height: 40px; 
        padding: 0 var(--spacing-lg); 
        color: var(--text-secondary); 
        font-size: 12px; 
        font-weight: 800; 
        margin-bottom: var(--spacing-sm);
        flex-shrink: 0;
    }
    aside#sidebar-left.collapsed .sidebar-header {
        justify-content: center;
        padding: 0;
    }
    aside#sidebar-left.collapsed .sidebar-header span {
        display: none;
    }
    .sidebar-header .menu-toggle { margin-right: var(--spacing-sm); }
    .sidebar-header .menu-toggle svg { fill: var(--text-muted); }
    
    .sidebar-header-logo {
        display: none;
        align-items: center;
        margin-right: var(--spacing-md);
    }
    
    .sidebar-header-logo-img {
        height: auto;
        max-height: 30px;
        width: auto;
        object-fit: contain;
    }

    nav.sidebar-group { 
        padding: var(--spacing-sm) var(--spacing-md); 
        margin-bottom: var(--spacing-sm);
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 0;
        max-height: 320px;
    }
    .sidebar-title { 
        font-size: 10px; 
        font-weight: 800; 
        margin: 0 0 var(--spacing-xs) 0; 
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .sidebar-link { 
        width: 100%; 
        display: flex; 
        align-items: center; 
        height: 36px; 
        padding: 0 var(--spacing-md); 
        border-radius: var(--radius-sm); 
        color: var(--text-secondary); 
        font-size: 14px; 
        font-weight: 500; 
        position: relative;
        margin-bottom: 2px;
        transition: all 0.3s ease;
    }
    .sidebar-link::before { 
        content: ''; 
        position: absolute; 
        left: 0; 
        top: 8px; 
        bottom: 8px; 
        width: 3px; 
        border-radius: 2px; 
        background: transparent; 
        transition: all 0.3s ease;
    }
    .sidebar-link:hover { 
        background: rgba(212, 175, 55, 0.1); 
        color: var(--accent-gold); 
    }
    .sidebar-link:hover svg { fill: var(--accent-gold); }
    .sidebar-link svg { 
        width: 18px; 
        height: 18px; 
        margin-right: var(--spacing-md); 
        fill: var(--accent-yellow);
        transition: fill 0.3s ease;
    }
    
    .sidebar-link-parent {
        justify-content: space-between;
        background: transparent;
        border: none;
        cursor: pointer;
    }
    
    .sidebar-link-parent .dropdown-arrow {
        width: 12px;
        height: 12px;
        margin-right: 0;
        margin-left: auto;
        transition: transform 0.3s ease;
    }
    
    .sidebar-link-parent.expanded .dropdown-arrow {
        transform: rotate(180deg);
    }
    
    .sidebar-menu-item {
        margin-bottom: 2px;
    }
    
    .sidebar-submenu {
        padding-left: calc(var(--spacing-md) + 18px + var(--spacing-md));
        margin-top: 2px;
        margin-bottom: 2px;
    }
    
    .sidebar-submenu-link {
        height: 32px;
        font-size: 13px;
        padding-left: var(--spacing-sm);
    }
    
    .sidebar-submenu-link svg {
        width: 16px;
        height: 16px;
    }
    
    /* Casino game links - yellow by default, red on hover */
    .sidebar-link-casino svg {
        fill: var(--accent-yellow);
       /* color: var(--accent-yellow); */
    }
    .sidebar-link-casino:hover {
        color: var(--accent-red);
    }
    .sidebar-link-casino:hover svg {
        fill: var(--accent-red);
        color: var(--accent-red);
    }
    .router-link-exact-active.sidebar-link { 
        background: var(--bg-tertiary);
        color: var(--accent-red); 
    }
    .router-link-exact-active.sidebar-link::before { 
        background: var(--gradient-gold); 
    }
    .router-link-exact-active.sidebar-link svg { 
        fill: var(--accent-red); 
    }
    .router-link-exact-active.sidebar-submenu-link {
        background: rgba(212, 175, 55, 0.15);
        color: var(--accent-red);
    }
    .router-link-exact-active.sidebar-submenu-link svg {
        fill: var(--accent-red); 
    }

    aside#sidebar-left.collapsed .sidebar-title, 
    aside#sidebar-left.collapsed .sidebar-link span { display: none; }
    aside#sidebar-left.collapsed .sidebar-link { 
        justify-content: center; 
        padding: 0; 
        margin: 0 auto 4px auto;
        width: 40px;
        height: 36px;
    }
    aside#sidebar-left.collapsed .sidebar-link svg {
        margin-right: 0;
        width: 20px;
        height: 20px;
    }
    aside#sidebar-left.collapsed .sidebar-submenu {
        display: none !important;
    }
    aside#sidebar-left.collapsed .sidebar-link-parent .dropdown-arrow {
        display: none;
    }
    aside#sidebar-left.collapsed .sidebar-group {
        padding: var(--spacing-sm) var(--spacing-xs);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sidebar-logo {
        margin-top: 0;
        padding: 0 16px 16px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
    }
    .sidebar-logo img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
    }
    aside#sidebar-left.collapsed .sidebar-logo {
        padding: var(--spacing-sm) var(--spacing-xs);
    }
    aside#sidebar-left.collapsed .sidebar-logo img {
        max-width: 40px;
    }
    
    /* Desktop - smaller logo size */
    @media only screen and (min-width: 1025px) {
        aside#sidebar-left:not(.collapsed) .sidebar-logo img {
            max-width: 120px;
        }
    }

    .sidebar-footer { 
        padding: var(--spacing-md); 
        border-top: 1px solid rgba(255, 255, 255, 0.08); 
        flex-shrink: 0;
    }
    aside#sidebar-left.collapsed .sidebar-footer {
        padding: var(--spacing-sm) var(--spacing-xs);
        display: flex;
        justify-content: center;
    }

    /* Mobile behavior */
    .mobile-fab { 
        position: fixed; 
        top: 60px; 
        left: var(--spacing-md); 
        z-index: 120; 
        display: none; 
        align-items: center; 
        justify-content: center;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .menu-icon-mobile {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        padding: 12px;
    }
    
    .mobile-fab:hover {
        transform: scale(1.05);
    }
    
    .mobile-fab:active {
        transform: scale(0.95);
    }

    .mobile-backdrop { 
        position: fixed; 
        inset: 0; 
        background: rgba(0,0,0,0.6); 
        z-index: 85; 
    }

    /* Desktop - show sidebar like desktop */
    @media only screen and (min-width: 1025px) {
        aside#sidebar-left {
            transform: translateX(0) !important;
        }
    }

    /* Mobile and tablet (up to 1024px) - hide sidebar by default, show on toggle */
    @media only screen and (max-width: 1024px) {
        aside#sidebar-left { 
            transform: translateX(-100%); 
            width: 260px; 
            top: 80px;
            height: calc(100vh - 80px);
            max-height: calc(100vh - 80px);
        }
        aside#sidebar-left.mobile-open { transform: translateX(0); }
        aside#sidebar-left.collapsed { width: 260px; }
        .mobile-fab { 
            display: inline-flex;
            padding: 0 0 33px 18px;
            z-index: 100000;
         }
        
        /* Show logo in sidebar header on mobile */
        .sidebar-header-logo {
            display: flex !important;
        }
        
        /* Hide sidebar header menu toggle on mobile */
        .sidebar-header .menu-toggle {
            display: none;
        }
        
        .sidebar-header span {
            display: none;
        }
        
        /* Ensure sidebar group is scrollable on mobile */
        nav.sidebar-group {
            max-height: calc(100vh - 80px - 40px - 120px);
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
        }
        
        /* Reduce logo size on mobile */
        .sidebar-logo {
            padding: 0 12px 12px 12px;
        }
        
        .sidebar-logo img {
            max-width: 72px;
        }
        
        /* Reduce footer padding on mobile */
        .sidebar-footer {
            padding: var(--spacing-sm) var(--spacing-md);
        }
    }

    /* Mobile Home Button */
    .mobile-home-btn {
        display: none;
        position: fixed;
        bottom: 0;
        left: calc(var(--spacing-md) + 91px);
        z-index: 100001;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
    }

    .mobile-home-btn img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        padding: 12px;
        transition: transform 0.3s ease;
    }

    .mobile-home-btn:hover img {
        transform: scale(1.05);
    }

    .mobile-home-btn:active img {
        transform: scale(0.95);
    }

    /* Hide individual buttons on mobile and tablet - they're now in the mobile button row */
    @media only screen and (max-width: 1024px) {
        /* Hide individual buttons - they're now in the mobile button row */
        .mobile-fab {
            display: none !important;
        }
        
        .mobile-home-btn {
            display: none !important;
        }
        
        aside#sidebar-left {
            bottom: 80px !important;
            top: auto !important;
        }
    }
</style> 