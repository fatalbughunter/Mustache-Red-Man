<template>
    <header class="header" :class="{ 'header-below-banner': isHomePage }">
        <div class="header-container">
            <!-- Logo Image -->
            <router-link to="/" class="header-logo-title">
                <img src="@/assets/img/headerLogo.png" alt="Mustache Casino" class="header-logo-img">
            </router-link>
            <!-- Navigation Menu -->
            <nav class="header-nav" style="display: none;">
                <router-link to="/" class="nav-link">HOME</router-link>
                
                <!-- Casino Dropdown -->
                <div class="nav-dropdown" 
                     @mouseenter="handleMouseEnter" 
                     @mouseleave="handleMouseLeave">
                    <div class="nav-link nav-dropdown-trigger" 
                         ref="dropdownTrigger"
                         :class="{ 'nav-dropdown-active': showCasinoDropdown }"
                         @click="handleCasinoClick"
                         @mouseenter="handleTriggerEnter"
                         @mouseleave="handleTriggerLeave">
                        <span>CASINO</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" 
                             class="dropdown-arrow" :id="showCasinoDropdown ? 'dropdown-arrow-open' : ''">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div v-if="showCasinoDropdown" 
                         ref="dropdownMenu"
                         class="nav-dropdown-menu"
                         :class="{ 'nav-dropdown-menu-home': isHomePage }"
                         @mouseenter="handleMenuEnter"
                         @mouseleave="handleMenuLeave"
                         :style="isHomePage ? {} : { 
                             display: 'block', 
                             visibility: 'visible', 
                             opacity: 1,
                             top: dropdownPosition.top,
                             left: dropdownPosition.left,
                             position: 'fixed',
                             transform: 'none'
                         }">
                        <!-- Temporarily hidden Case Battle -->
                        <router-link v-if="false" to="/battles" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.5862 11.6353L24.5862 23H9.08621V11.6353H14.1638V12.9882H19.5086V11.6353H24.5862Z" fill="currentColor"/>
                                <path d="M19.5086 9.47059H24.5862V0H9.08621V9.47059H14.1638V8.11765H19.5086V9.47059Z" fill="currentColor"/>
                                <path d="M26.4569 23L26.4569 11.6353H31V21.9176C31 22.5154 30.5214 23 29.931 23H26.4569Z" fill="currentColor"/>
                                <path d="M26.4569 0V9.47059H31V2.70588C31 1.21146 29.8035 0 28.3276 0H26.4569Z" fill="currentColor"/>
                                <path d="M7.21552 23L7.21552 11.6353H0V21.9176C0 22.5154 0.478593 23 1.06897 23H7.21552Z" fill="currentColor"/>
                                <path d="M7.21552 9.47059V0H2.67241C1.19648 0 0 1.21146 0 2.70588V9.47059H7.21552Z" fill="currentColor"/>
                                <path d="M15.2328 8.92941H18.4397V12.1765H15.2328V8.92941Z" fill="currentColor"/>
                                <path d="M17.9052 10.0118H21.1121V11.0941H17.9052V10.0118Z" fill="currentColor"/>
                                <path d="M12.8276 10.0118H16.0345V11.0941H12.8276V10.0118Z" fill="currentColor"/>
                            </svg>
                            <span>Case Battle</span>
                        </router-link>
                        <router-link to="/mines" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0067 26.4866C21.7983 26.4866 26.4933 21.7916 26.4933 16C26.4933 10.2083 21.7983 5.51331 16.0067 5.51331C10.215 5.51331 5.51999 10.2083 5.51999 16C5.51999 21.7916 10.215 26.4866 16.0067 26.4866Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 1.66669V5.51335M30.34 15.9867H26.5M16.02 30.3334V26.4867M1.67334 16.0134H5.52001M23.4267 8.58669L24.7867 7.22669M23.4267 23.4134L24.7867 24.7734M8.59334 23.4134L7.23334 24.7734M8.59334 8.58669L7.23334 7.22669" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.16 15.1C9.86935 15.1013 9.58487 15.0162 9.34266 14.8556C9.10045 14.6949 8.91143 14.4659 8.7996 14.1977C8.68776 13.9294 8.65816 13.634 8.71453 13.3488C8.77091 13.0637 8.91074 12.8018 9.11625 12.5962C9.32177 12.3907 9.58372 12.2509 9.86884 12.1945C10.154 12.1382 10.4494 12.1678 10.7177 12.2796C10.986 12.3914 11.2149 12.5804 11.3756 12.8227C11.5362 13.0649 11.6213 13.3493 11.62 13.64C11.62 14.0272 11.4662 14.3986 11.1924 14.6724C10.9186 14.9462 10.5472 15.1 10.16 15.1ZM14 12.5933C13.6044 12.5933 13.2178 12.476 12.8889 12.2563C12.56 12.0365 12.3036 11.7241 12.1522 11.3587C12.0009 10.9932 11.9613 10.5911 12.0384 10.2031C12.1156 9.81518 12.3061 9.45881 12.5858 9.17911C12.8655 8.8994 13.2219 8.70892 13.6098 8.63175C13.9978 8.55458 14.3999 8.59419 14.7654 8.74556C15.1308 8.89694 15.4432 9.15328 15.6629 9.48218C15.8827 9.81108 16 10.1978 16 10.5933C16 11.1238 15.7893 11.6325 15.4142 12.0075C15.0391 12.3826 14.5304 12.5933 14 12.5933Z" fill="currentColor" stroke="currentColor" stroke-miterlimit="10"/>
                            </svg>
                            <span>Mines</span>
                        </router-link>
                        <router-link to="/blackjack" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.38476 5.1504C9.27073 5.15566 9.15813 5.17806 9.05076 5.21684L2.56839 7.59565C2.2882 7.69846 2.03758 7.93046 1.91214 8.20128C1.7867 8.4719 1.77226 8.81365 1.87501 9.09378L6.04501 20.461C6.1477 20.7411 6.37964 20.9937 6.65039 21.1191C6.92114 21.2446 7.26289 21.2591 7.54289 21.1563L14.0254 18.7773C14.3056 18.6746 14.5562 18.4427 14.6816 18.1719L14.6835 18.168C14.8074 17.8978 14.821 17.5582 14.7188 17.2793L10.5488 5.91209C10.4466 5.63334 10.2164 5.38184 9.94726 5.25584L9.94339 5.25396C9.80801 5.19115 9.65445 5.15671 9.50001 5.15034C9.46139 5.14878 9.42314 5.14853 9.38476 5.1504ZM11.8263 6.0019L15.8165 16.8769C16.0294 17.459 16.0027 18.1017 15.7422 18.6641C15.4819 19.226 15.0091 19.6615 14.4278 19.875L12.7128 20.504L16.4628 20.6777C16.761 20.6917 17.0822 20.574 17.3028 20.3731C17.5233 20.172 17.6697 19.8625 17.6836 19.5643L18.2461 7.47059C18.26 7.17259 18.1443 6.84946 17.9434 6.62884C17.7424 6.40821 17.4329 6.26196 17.1348 6.24803L11.8262 6.00178L11.8263 6.0019ZM19.3888 8.08003L18.8496 19.6192C18.8208 20.2382 18.5476 20.8205 18.0899 21.2383C17.6317 21.6549 17.0268 21.8727 16.4082 21.8438L14.7795 21.7675L19.1153 23.211C19.3985 23.3052 19.7411 23.2802 20.0078 23.1466C20.2747 23.0128 20.4977 22.7539 20.5919 22.4707L24.4141 10.9826C24.5083 10.6993 24.4833 10.3568 24.3497 10.09C24.216 9.82309 23.957 9.59809 23.6738 9.50403L19.3888 8.08015L19.3888 8.08003ZM6.57226 9.22659C8.10089 10.7851 10.8235 10.3353 11.6191 12.0722C12.3613 13.6927 10.7123 14.9476 9.24601 14.4727L10.3085 16.3965L9.13476 16.8282L8.4512 14.8477C7.80183 16.2617 5.76039 16.3318 5.06639 14.8145C4.22076 12.966 6.5677 11.427 6.57226 9.22659ZM25.4121 11.6778L21.7013 22.8398C21.5057 23.4276 21.0849 23.9137 20.5313 24.1914L20.5254 24.1933C19.9727 24.4681 19.3338 24.513 18.7481 24.3183L17.4746 23.8945L20.1816 26.2089C20.4085 26.4028 20.7356 26.5077 21.0331 26.4843C21.3306 26.461 21.6343 26.3068 21.8281 26.08L29.6953 16.8731C29.8892 16.6462 29.9941 16.3209 29.9707 16.0234C29.9475 15.7259 29.7913 15.4204 29.5645 15.2265L25.4122 11.6778L25.4121 11.6778Z" fill="currentColor"/>
                            </svg>
                            <span>Black Jack</span>
                        </router-link>
                        <router-link to="/crash" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.15019 10.1486C3.90571 9.90426 3.81363 10.0271 3.75926 10.0815C2.35141 11.4893 1.10155 14.8862 1.7623 14.5545C4.16769 13.3467 4.56847 13.7063 5.97627 12.2985C6.0307 12.2441 6.15585 12.1544 5.90425 11.9028L4.15019 10.1486Z" fill="currentColor"/>
                                <path d="M11.7397 10.1298C11.6759 9.92678 11.8096 9.82894 11.8658 9.76821C14.9731 6.41355 16.9479 1.94409 15.4844 0.480563C14.0287 -0.975075 9.69708 1.05741 6.34334 4.14226C6.27699 4.20336 6.14621 4.31909 5.91226 4.27024L4.86736 4.02143C4.57725 3.95244 4.16733 4.06841 3.95646 4.27928L0.122402 8.11329C-0.0884723 8.32421 -0.0199598 8.53465 0.274668 8.5809L3.04772 9.01669C3.34235 9.06304 3.75592 8.92837 3.96675 8.71745C3.96675 8.71745 4.10983 8.57398 4.25359 8.71769C5.0467 9.5107 6.52051 10.9845 7.27612 11.7402C7.42632 11.8903 7.28246 12.0332 7.28246 12.0332C7.07154 12.2441 6.93692 12.6576 6.98327 12.9522L7.41901 15.7252C7.46531 16.02 7.67575 16.0885 7.88662 15.8776L11.7207 12.0435C11.9316 11.8326 12.0476 11.4228 11.9785 11.1326L11.7397 10.1298ZM10.8813 5.17648C10.2319 4.52708 10.2319 3.47429 10.8813 2.82499C11.5307 2.17559 12.5835 2.17559 13.2329 2.82499C13.8822 3.47425 13.8822 4.52708 13.2329 5.17643C12.5835 5.82584 11.5306 5.82584 10.8813 5.17648Z" fill="currentColor"/>
                            </svg>
                            <span>Crash</span>
                        </router-link>
                        <router-link to="/towers" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="32" height="32" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7526 0H8.72751C8.59087 0 8.4801 0.110779 8.4801 0.247413V1.48448H6.82861V0.247413C6.82861 0.110779 6.71783 0 6.5812 0H4.41757C4.28093 0 4.17015 0.110779 4.17015 0.247413V1.48448H2.51991V0.247413C2.51991 0.110779 2.40913 0 2.27249 0H0.247413C0.110779 0 0 0.110779 0 0.247413V2.9034C0.00136077 3.57305 0.543908 4.1156 1.21356 4.11696H1.21851H9.78644C10.4561 4.1156 10.9986 3.57305 11 2.9034V0.247413C11 0.110779 10.8892 0 10.7526 0Z" fill="currentColor"/>
                                <path d="M9.58606 4.48689H1.42141L1.07132 12.4301V12.5068C1.06894 12.8843 1.19648 13.2513 1.43255 13.5459C1.64925 13.8246 1.97469 13.9975 2.32694 14.021H8.68176C9.03401 13.9975 9.35946 13.8246 9.57616 13.5459C9.81222 13.2513 9.93976 12.8843 9.93738 12.5068C9.93738 12.4919 9.93738 12.466 9.93738 12.4301L9.58606 4.48689ZM7.38036 13.5385H3.62463V10.0549C3.62463 9.01678 4.4662 8.1752 5.50435 8.1752C6.5425 8.1752 7.38408 9.01678 7.38408 10.0549L7.38036 13.5385Z" fill="currentColor"/>
                            </svg>
                            <span>Tower</span>
                        </router-link>
                    </div>
                </div>
                
                <router-link to="/slots" class="nav-link">SLOTS</router-link>
                <router-link to="/leaderboard" class="nav-link">LEADERBOARD</router-link>
                <router-link to="/live-casino" class="nav-link">LIVE CASINO</router-link>
                <router-link to="/jackpots" class="nav-link">JACKPOTS</router-link>
            </nav>

            <!-- User Actions Section -->
            <div class="header-right">
                <!-- Show Sign In/Register when not logged in -->
                <template v-if="authUser.user === null">
                    <button class="btn-signin" @click="handleSignInClick">Sign In</button>
                </template>
                
                <!-- Show user info when logged in -->
                <template v-else>
                    <!-- Use NavbarUserDropdown component like on game pages -->
                    <NavbarUserDropdown />
                </template>
                
                <button class="btn-chat" :class="{ 'chat-open': generalDesktopChatOpen }" @click="toggleChat">
                    <svg class="chat-icon-desktop" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-if="generalDesktopChatOpen" class="chat-slash-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <img src="@/assets/img/icons/mobileChat.png" alt="Chat" class="chat-icon-mobile" />
                </button>
            </div>
        </div>
        
        <!-- Mobile Button Row - All buttons in one row -->
        <div class="mobile-button-row">
            <button class="mobile-btn mobile-btn-menu" @click="toggleSidebarMobile">
                <img src="@/assets/img/icons/mobileMenu.png" alt="Menu" class="mobile-btn-icon" />
            </button>
            <router-link to="/" class="mobile-btn mobile-btn-home" @click.native="closeSidebarMobile">
                <img src="@/assets/img/icons/mobileHome.png" alt="Home" class="mobile-btn-icon" />
            </router-link>
            <!-- Show Sign In button when not logged in -->
            <button v-if="authUser.user === null" class="mobile-btn mobile-btn-signin" @click="handleSignInClick">
                <img src="@/assets/img/icons/mobileProfile.png" alt="Sign In" class="mobile-btn-icon" />
            </button>
            <!-- Show user dropdown when logged in -->
            <div class="mobile-btn-wrapper mobile-btn-profile-wrapper" v-if="authUser.user !== null">
                <NavbarUserDropdown />
            </div>
            <button class="mobile-btn mobile-btn-chat" @click="toggleChat">
                <img src="@/assets/img/icons/mobileChat.png" alt="Chat" class="mobile-btn-icon" />
            </button>
        </div>
        
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavbarUserDropdown from '@/components/navbar/NavbarUserDropdown';

export default {
    name: 'Header',
    components: {
        NavbarUserDropdown
    },
    data() {
        return {
            showCasinoDropdown: false,
            closeDropdownTimeout: null,
            dropdownPosition: {
                top: '0px',
                left: '0px'
            }
        }
    },
    methods: {
        ...mapActions(['generalSetSidebarMobile', 'generalSetDesktopChatOpen', 'authLogoutUser', 'modalsSetShow', 'modalsSetData']),
        handleSignInClick() {
            // On homepage, emit event to Home component; otherwise emit to App level
            if (this.isHomePage) {
                this.$root.$emit('open-signin-modal');
            } else {
                this.$root.$emit('open-signin-modal-app');
            }
        },
        handleCasinoClick(event) {
            // Toggle dropdown on click
            event.stopPropagation(); // Prevent event bubbling
            
            // Clear any pending close timeout
            if (this.closeDropdownTimeout) {
                clearTimeout(this.closeDropdownTimeout);
                this.closeDropdownTimeout = null;
            }
            
            if (this.showCasinoDropdown) {
                // If already open, close it
                this.showCasinoDropdown = false;
            } else {
                // If closed, open it
                this.calculateDropdownPosition();
                this.showCasinoDropdown = true;
            }
        },
        handleTriggerEnter() {
            // Mouse entered the trigger - keep dropdown open
            if (this.closeDropdownTimeout) {
                clearTimeout(this.closeDropdownTimeout);
                this.closeDropdownTimeout = null;
            }
            console.log('Mouse entered Casino trigger');
            
            // Calculate position BEFORE showing dropdown to prevent movement
            this.calculateDropdownPosition();
            
            // Show the dropdown with position already set
            this.showCasinoDropdown = true;
            console.log('showCasinoDropdown set to:', this.showCasinoDropdown);
        },
        handleTriggerLeave(event) {
            // Mouse left the trigger - check if moving to menu before closing
            console.log('Mouse left Casino trigger');
            const relatedTarget = event.relatedTarget;
            
            // Check if mouse is moving to dropdown menu
            const dropdownMenu = this.$refs.dropdownMenu;
            if (relatedTarget && dropdownMenu) {
                if (dropdownMenu.contains(relatedTarget) || 
                    relatedTarget.closest('.nav-dropdown-menu') ||
                    relatedTarget === dropdownMenu) {
                    console.log('Mouse moving to dropdown menu from trigger, keeping open');
                    return; // Don't close, mouse is moving to menu
                }
            }
            
            // If not moving to menu, check again after a short delay
            // This allows time for mouse to re-enter if still over trigger area
            this.$nextTick(() => {
                const trigger = document.querySelector('.nav-dropdown-trigger');
                if (trigger && trigger.matches(':hover')) {
                    console.log('Mouse still over trigger after delay, keeping open');
                    return; // Mouse is still over trigger
                }
                
                // Only close if mouse is definitely not over trigger or menu
                this.closeDropdownWithDelay();
            });
        },
        handleMouseEnter() {
            // Clear any pending close timeout when entering container
            if (this.closeDropdownTimeout) {
                clearTimeout(this.closeDropdownTimeout);
                this.closeDropdownTimeout = null;
            }
            console.log('Mouse entered Casino dropdown container');
        },
        calculateDropdownPosition() {
            // On homepage, don't calculate position - use CSS absolute positioning
            if (this.isHomePage) {
                return;
            }
            
            // Use requestAnimationFrame to ensure layout is complete
            requestAnimationFrame(() => {
                this.$nextTick(() => {
                    // Use ref if available, otherwise fall back to querySelector
                    const trigger = this.$refs.dropdownTrigger || document.querySelector('.nav-dropdown-trigger');
                    if (trigger) {
                        // Force a reflow to ensure accurate positioning
                        trigger.offsetHeight;
                        
                        const triggerRect = trigger.getBoundingClientRect();
                        const menuWidth = 200; // Fixed width from CSS
                        
                        // getBoundingClientRect returns viewport coordinates, which work for position: fixed
                        const top = (triggerRect.bottom - 2) + 'px';
                        const left = (triggerRect.left + (triggerRect.width / 2) - (menuWidth / 2)) + 'px';
                        
                        this.dropdownPosition = {
                            top: top,
                            left: left
                        };
                        
                        console.log('Dropdown position calculated:', this.dropdownPosition, 'Trigger rect:', triggerRect, 'IsHomePage:', this.isHomePage);
                    }
                });
            });
        },
        handleMenuEnter() {
            // Mouse entered the dropdown menu itself - keep it open
            if (this.closeDropdownTimeout) {
                clearTimeout(this.closeDropdownTimeout);
                this.closeDropdownTimeout = null;
            }
            console.log('Mouse entered dropdown menu');
            this.showCasinoDropdown = true;
        },
        handleMenuLeave(event) {
            // Mouse left the dropdown menu - check if moving to trigger
            console.log('Mouse left dropdown menu');
            const relatedTarget = event.relatedTarget;
            
            // Check if mouse is moving back to trigger
            const trigger = document.querySelector('.nav-dropdown-trigger');
            if (relatedTarget && trigger) {
                if (trigger.contains(relatedTarget) || 
                    relatedTarget === trigger ||
                    relatedTarget.closest('.nav-dropdown-trigger')) {
                    console.log('Mouse moving to trigger from menu, keeping open');
                    return; // Don't close, mouse is moving to trigger
                }
            }
            
            // Only close if mouse is not moving to trigger
            this.closeDropdownWithDelay();
        },
        handleMouseLeave(event) {
            console.log('Mouse left Casino dropdown container');
            // This only fires when mouse leaves the entire container
            // Check if mouse moved to menu first
            const relatedTarget = event.relatedTarget;
            const dropdownMenu = this.$refs.dropdownMenu;
            
            // If mouse moved to dropdown menu, keep it open
            if (relatedTarget && dropdownMenu) {
                if (dropdownMenu.contains(relatedTarget) || 
                    relatedTarget.closest('.nav-dropdown-menu') ||
                    relatedTarget === dropdownMenu) {
                    console.log('Mouse moving to dropdown menu, keeping open');
                    return;
                }
            }
            
            // Double-check if mouse is still over trigger (shouldn't happen, but safety check)
            this.$nextTick(() => {
                const trigger = document.querySelector('.nav-dropdown-trigger');
                if (trigger && trigger.matches(':hover')) {
                    console.log('Mouse still over trigger, keeping open');
                    return;
                }
                
                // Only close if mouse is definitely gone
                this.closeDropdownWithDelay();
            });
        },
        closeDropdownWithDelay() {
            // Clear any existing timeout
            if (this.closeDropdownTimeout) {
                clearTimeout(this.closeDropdownTimeout);
            }
            // Set a delay before closing - but check if mouse is still over trigger/menu first
            this.closeDropdownTimeout = setTimeout(() => {
                // Double-check if mouse is still over trigger or menu before closing
                const trigger = document.querySelector('.nav-dropdown-trigger');
                const dropdownMenu = this.$refs.dropdownMenu;
                
                // If mouse is still over trigger, don't close
                if (trigger && trigger.matches(':hover')) {
                    console.log('Mouse still over trigger, NOT closing');
                    this.closeDropdownTimeout = null;
                    return;
                }
                
                // If mouse is still over menu, don't close
                if (dropdownMenu && dropdownMenu.matches(':hover')) {
                    console.log('Mouse still over menu, NOT closing');
                    this.closeDropdownTimeout = null;
                    return;
                }
                
                // Only close if mouse is definitely not over either
                console.log('Closing dropdown after delay');
                this.showCasinoDropdown = false;
                this.closeDropdownTimeout = null;
            }, 300); // Increased delay to 300ms
        },
        closeDropdown() {
            // Clear timeout if closing immediately
            if (this.closeDropdownTimeout) {
                clearTimeout(this.closeDropdownTimeout);
                this.closeDropdownTimeout = null;
            }
            this.showCasinoDropdown = false;
        },
        toggleChat() {
            // Check if we're on mobile (use mobile chat functionality)
            if (window.innerWidth <= 1024) {
                this.generalSetSidebarMobile(this.generalSidebarMobile === 'Chat' ? null : 'Chat');
            } else {
                // Desktop: toggle desktop chat using Vuex
                this.generalSetDesktopChatOpen(!this.generalDesktopChatOpen);
            }
        },
        formatBalance(balance) {
            if (!balance) return '0.00';
            return parseFloat(balance / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        handleSignOut() {
            this.authLogoutUser();
        },
        toggleSidebarMobile() {
            // Emit event to toggle sidebar menu
            this.$root.$emit('toggle-sidebar-mobile');
        },
        closeSidebarMobile() {
            // Emit event to close sidebar menu
            this.$root.$emit('close-sidebar-mobile');
        }
    },
    computed: {
        ...mapGetters(['generalSidebarMobile', 'generalDesktopChatOpen', 'authUser']),
        isHomePage() {
            return this.$route.name === 'Home' || this.$route.path === '/';
        }
    },
    created() {
        // Close dropdown when clicking outside
        const self = this;
        document.addEventListener('click', function(event) {
            // Check if click is outside the dropdown container
            const dropdown = document.querySelector('.nav-dropdown');
            if (dropdown && !dropdown.contains(event.target) && self.showCasinoDropdown === true) {
                self.showCasinoDropdown = false;
                if (self.closeDropdownTimeout) {
                    clearTimeout(self.closeDropdownTimeout);
                    self.closeDropdownTimeout = null;
                }
            }
            
        });
    },
    mounted() {
        console.log('Header mounted, showCasinoDropdown:', this.showCasinoDropdown);
    },
    watch: {
        showCasinoDropdown(newVal) {
            console.log('showCasinoDropdown changed to:', newVal);
            this.$nextTick(() => {
                const menu = document.querySelector('.nav-dropdown-menu');
                if (menu) {
                    const styles = window.getComputedStyle(menu);
                    const rect = menu.getBoundingClientRect();
                    console.log('Dropdown menu element found:', menu);
                    console.log('Menu position:', styles.position);
                    console.log('Menu top:', styles.top);
                    console.log('Menu left:', styles.left);
                    console.log('Menu transform:', styles.transform);
                    console.log('Menu getBoundingClientRect():', rect);
                    console.log('Menu is visible on screen?', rect.width > 0 && rect.height > 0 && rect.top >= 0);
                    console.log('Menu display:', styles.display);
                    console.log('Menu visibility:', styles.visibility);
                    console.log('Menu opacity:', styles.opacity);
                    console.log('Menu z-index:', styles.zIndex);
                    console.log('Menu parent overflow:', window.getComputedStyle(menu.parentElement).overflow);
                    
                    // Check all parent elements for overflow hidden
                    let parent = menu.parentElement;
                    let level = 0;
                    while (parent && level < 5) {
                        const parentStyles = window.getComputedStyle(parent);
                        if (parentStyles.overflow !== 'visible' || parentStyles.overflowX !== 'visible' || parentStyles.overflowY !== 'visible') {
                            console.warn(`Parent element ${level} has overflow:`, parent, parentStyles.overflow);
                        }
                        parent = parent.parentElement;
                        level++;
                    }
                } else {
                    console.log('Dropdown menu element NOT found!');
                }
            });
        }
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: var(--bg-menu-sidebar);
    backdrop-filter: blur(10px) saturate(120%);
    z-index: 99998;
    display: flex;
    align-items: center;
   /* box-shadow: 
        0 2px 10px rgba(0, 0, 0, 0.5),
        0 4px 20px rgba(184, 115, 51, 0.4),
        inset 0 1px 0 rgba(222, 184, 135, 0.2);
    border-bottom: 2px solid rgba(222, 184, 135, 0.4); */
    overflow: visible;
}


/* Ensure header container and content are above sand effects */
.header-container,
.header-nav,
.header-right {
    position: relative;
    z-index: 2;
    overflow: visible;
}

.header.header-below-banner {
    overflow: visible !important;
    position: fixed !important;
    top: 0 !important;
}

.header-below-banner {
    position: fixed !important;
    top: 0 !important;
    overflow: visible !important;
    min-height: 80px;
    height: 80px;
    z-index: 99998;
}

/* Ensure header container allows dropdown to extend on homepage */
.header-below-banner .header-container {
    overflow: visible;
    z-index: 99998;
}

/* Ensure header-right allows dropdown to extend on homepage */
.header-below-banner .header-right {
    overflow: visible !important;
    position: relative !important;
}

.header-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    /*padding: 0 var(--spacing-lg); */
    padding: 0 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-lg);
    position: relative;
    z-index: 99998;
    overflow: visible;
}

.header-logo-title {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.header-logo-title:hover {
    opacity: 0.8;
}

.header-logo-img {
    height: auto;
    max-height: 50px;
    width: auto;
    object-fit: contain;
}

.header-nav {
    display: none;
    align-items: center;
    gap: var(--spacing-md);
    flex: 1;
    justify-content: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
    z-index: 2;
    overflow: visible;
}

.header-nav::-webkit-scrollbar {
    display: none;
}

/* Show navigation on desktop - above 1024px breakpoint */
@media only screen and (min-width: 1025px) {
    .header-nav {
        display: flex;
    }
    
    /* Desktop: Hide user-info, show desktop profile dropdown */
    .desktop-user-info {
        display: none !important;
    }
    
    .desktop-profile-dropdown {
        display: block !important;
    }
    
    .mobile-profile-dropdown {
        display: none !important;
    }
    
    /* Desktop profile dropdown opens downward */
    .desktop-profile-dropdown-menu {
        top: calc(100% + 10px) !important;
        bottom: auto !important;
        right: 0 !important;
    }
}

/* Desktop with reduced font sizes for screens between 1025px and 1500px */
@media only screen and (min-width: 1025px) and (max-width: 1500px) {
    .nav-link {
        font-size: 15px !important;
    }
    
    .nav-dropdown-trigger span {
        font-size: 15px !important;
    }
    
    .nav-dropdown-item {
        font-size: 13px !important;
    }
    
    .btn-signin {
        font-size: 13px !important;
        padding: var(--spacing-xs) var(--spacing-md) !important;
    }
    
    .username {
        font-size: 12px !important;
    }
    
    .balance-label {
        font-size: 10px !important;
    }
    
    .balance-amount {
        font-size: 14px !important;
    }
    
    .menu-item-label {
        font-size: 10px !important;
    }
    
    .menu-item-value {
        font-size: 12px !important;
    }
    
    .profile-menu-item-signout .menu-item-label {
        font-size: 12px !important;
    }
}

.nav-link {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 600;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.nav-link:hover {
    color: var(--accent-copper-light);
    background: rgba(212, 165, 116, 0.2);
    text-shadow: 0 0 8px rgba(212, 165, 116, 0.6);
}
/*
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
    color: var(--accent-red);
    background: rgba(212, 175, 55, 0.15);
}
*/
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  /* color: var(--accent-copper-light); */
    text-shadow: 0 0 8px rgba(212, 165, 116, 0.6);
}

.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
   /* background: var(--gradient-copper); 
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(184, 115, 51, 0.7);  */
}

/* Dropdown Styles */
.nav-dropdown {
    overflow: visible !important;
    position: relative;
    display: inline-block;
    z-index: 99999;
    height: auto;
}

.nav-dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
}

/* Keep Casino highlighted (copper) when dropdown is open */
.nav-dropdown-trigger.nav-dropdown-active,
.nav-dropdown-trigger.nav-dropdown-active:hover {
    color: var(--accent-copper-light) !important;
  /*  background: rgba(212, 165, 116, 0.2) !important; */
}

.nav-dropdown-trigger.nav-dropdown-active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
  /*  background: var(--gradient-copper); */
    border-radius: 2px;
  /*  box-shadow: 0 0 8px rgba(184, 115, 51, 0.7); */
}

.dropdown-arrow {
    transition: transform 0.3s ease;
    transform-origin: center;
}

#dropdown-arrow-open {
    transform: rotate(180deg);
}

.nav-dropdown-menu {
    position: fixed !important;
    margin: 0 !important;
    min-width: 200px !important;
    width: 200px !important;
    /* Desert sand background matching header */
    background: 
        /* Sand grain texture overlay */
        radial-gradient(circle at 20% 30%, rgba(222, 184, 135, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(184, 115, 51, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(205, 127, 50, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 60% 20%, rgba(222, 184, 135, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 10% 60%, rgba(184, 115, 51, 0.11) 0%, transparent 50%),
        radial-gradient(circle at 90% 40%, rgba(205, 127, 50, 0.09) 0%, transparent 50%),
        /* Fine sand texture pattern */
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(222, 184, 135, 0.03) 2px,
            rgba(222, 184, 135, 0.03) 3px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(184, 115, 51, 0.03) 2px,
            rgba(184, 115, 51, 0.03) 3px
        ),
        /* Subtle diagonal sand drift pattern */
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(222, 184, 135, 0.04) 8px,
            rgba(222, 184, 135, 0.04) 9px,
            transparent 9px,
            transparent 16px
        ),
        /* Main desert sand gradient */
        linear-gradient(
            180deg,
            rgba(222, 184, 135, 0.25) 0%,
            rgba(205, 127, 50, 0.30) 25%,
            rgba(184, 115, 51, 0.35) 50%,
            rgba(139, 111, 71, 0.30) 75%,
            rgba(101, 67, 33, 0.25) 100%
        ),
        /* Base dark background with transparency */
        rgba(26, 20, 15, 0.98) !important;
    backdrop-filter: blur(10px) saturate(120%) !important;
    /* Prevent any movement/jump */
    will-change: auto;
    transform: none !important;
    border: 2px solid rgba(222, 184, 135, 0.6) !important;
    border-radius: 8px !important;
    box-shadow: 
        0 10px 40px rgba(0, 0, 0, 0.9),
        0 5px 20px rgba(184, 115, 51, 0.4),
        inset 0 1px 0 rgba(222, 184, 135, 0.2) !important;
    padding: 10px 0 !important;
    z-index: 999999 !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: all !important;
    overflow: visible !important;
    max-height: none !important;
    position: relative;
}

/* Homepage dropdown - uses absolute positioning relative to dropdown container */
.nav-dropdown-menu-home {
    position: absolute !important;
    top: 100% !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    margin-top: 4px !important;
    z-index: 9999999 !important;
    overflow: visible !important;
    min-height: auto !important;
    max-height: none !important;
    /* Desert sand background matching header */
    background: 
        /* Sand grain texture overlay */
        radial-gradient(circle at 20% 30%, rgba(222, 184, 135, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(184, 115, 51, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(205, 127, 50, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 60% 20%, rgba(222, 184, 135, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 10% 60%, rgba(184, 115, 51, 0.11) 0%, transparent 50%),
        radial-gradient(circle at 90% 40%, rgba(205, 127, 50, 0.09) 0%, transparent 50%),
        /* Fine sand texture pattern */
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(222, 184, 135, 0.03) 2px,
            rgba(222, 184, 135, 0.03) 3px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(184, 115, 51, 0.03) 2px,
            rgba(184, 115, 51, 0.03) 3px
        ),
        /* Subtle diagonal sand drift pattern */
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(222, 184, 135, 0.04) 8px,
            rgba(222, 184, 135, 0.04) 9px,
            transparent 9px,
            transparent 16px
        ),
        /* Main desert sand gradient */
        linear-gradient(
            180deg,
            rgba(222, 184, 135, 0.25) 0%,
            rgba(205, 127, 50, 0.30) 25%,
            rgba(184, 115, 51, 0.35) 50%,
            rgba(139, 111, 71, 0.30) 75%,
            rgba(101, 67, 33, 0.25) 100%
        ),
        /* Base dark background with transparency */
        rgba(26, 20, 15, 0.98) !important;
    backdrop-filter: blur(10px) saturate(120%) !important;
}

.nav-dropdown-item {
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    padding: 14px 24px !important;
    color: var(--accent-copper-light);
    background: transparent !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    text-decoration: none !important;
    transition: all 0.2s ease;
    position: relative !important;
    z-index: 1000000 !important;
    white-space: nowrap !important;
    cursor: pointer !important;
    line-height: 1.6 !important;
    text-align: left !important;
    box-sizing: border-box !important;
    gap: 12px !important;
}

.nav-dropdown-item svg {
    width: 20px !important;
    height: 20px !important;
    flex-shrink: 0 !important;
    fill: currentColor !important;
    color: var(--accent-copper-light) !important;
}

.nav-dropdown-item:hover svg {
    fill: var(--accent-copper) !important;
    color: var(--accent-copper) !important;
}

.nav-dropdown-item.router-link-active svg,
.nav-dropdown-item.router-link-exact-active svg {
    fill: var(--accent-copper) !important;
    color: var(--accent-copper) !important;
}

.nav-dropdown-item:first-child {
    margin-top: 0;
}

.nav-dropdown-item:last-child {
    margin-bottom: 0;
}

.nav-dropdown-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--gradient-copper);
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.nav-dropdown-item:hover {
    color: var(--accent-copper);
    background: var(--bg-tertiary);
    padding-left: 27px;
}

.nav-dropdown-item:hover::before {
    transform: scaleY(1);
}

.nav-dropdown-item.router-link-active,
.nav-dropdown-item.router-link-exact-active {
    color: var(--accent-copper);
    background: var(--bg-primary);
    padding-left: 27px;
}

.nav-dropdown-item.router-link-active::before,
.nav-dropdown-item.router-link-exact-active::before {
    transform: scaleY(1);
}

/* Smooth dropdown transition */
.nav-dropdown-menu {
    animation: dropdownFadeIn 0.2s ease-out;
}

/* Override animation transform for homepage to prevent positioning issues */
.nav-dropdown-menu-home {
    animation: dropdownFadeInHome 0.2s ease-out;
}

@keyframes dropdownFadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

@keyframes dropdownFadeInHome {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.btn-signin {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--accent-yellow-main);
    color: #000000;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-signin:hover {
    background: var(--accent-yellow-main);
    opacity: 0.9;
    border-color: rgba(255, 255, 255, 0.4);
    color: #000000;
    box-shadow: 0 4px 15px rgba(222, 199, 156, 0.4);
}

.btn-chat {
    width: 55px;
    height: 55px;
    background: var(--bg-primary-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-copper-light);
    transition: all 0.3s ease;
    border: 1px solid var(--accent-yellow);
    padding: 0;
    position: relative;
}

.chat-icon-desktop {
    display: block;
}

.chat-icon-mobile {
    display: none;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.chat-slash-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--accent-copper-light);
    pointer-events: none;
    z-index: 1;
    display: none;
}

/* Show slash icon on desktop only when chat is open */
@media only screen and (min-width: 1025px) {
    .btn-chat.chat-open .chat-slash-icon {
        display: block;
    }
}

.btn-chat.chat-open .chat-slash-icon {
    color: var(--accent-yellow-main);
}

.btn-chat:hover {
    background: var(--bg-blue-dark);
    color: var(--accent-yellow-main);
    border-color: var(--accent-yellow);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--accent-yellow-main);
}

.btn-chat.chat-open:hover .chat-slash-icon {
    color: var(--accent-yellow-main);
}

.user-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.user-balance {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: var(--spacing-xs) var(--spacing-md);
    background: var(--bg-tertiary);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(212, 165, 116, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
}

.user-balance:hover {
    background: rgba(212, 165, 116, 0.15);
    border-color: var(--accent-copper);
}

.balance-label {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 500;
}

.balance-amount {
    font-size: 16px;
    font-weight: 700;
    color: var(--accent-copper-light);
    text-shadow: 0 0 8px rgba(212, 165, 116, 0.5);
}

.user-profile {
    display: flex;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-md);
    background: var(--bg-tertiary);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(212, 165, 116, 0.3);
}

.username {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-copper-light);
}

.btn-signout {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--bg-tertiary);
    color: var(--accent-copper-light);
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    border: 1px solid rgba(212, 165, 116, 0.3);
    cursor: pointer;
}

.btn-signout:hover {
    background: rgba(212, 165, 116, 0.15);
    border-color: var(--accent-copper);
    color: var(--accent-copper);
    box-shadow: 0 4px 12px rgba(184, 115, 51, 0.3);
}


/* NavbarUserDropdown is now used - styles are in NavbarUserDropdown.vue */

/* Mobile Button Row - All buttons in single row */
.mobile-button-row {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 80px;
    border-top: 1px solid rgba(212, 165, 116, 0.3);
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;
    z-index: 100002;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
    gap: 10px;
}

.mobile-btn {
    width: 60px;
    height: 60px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex: 1;
    max-width: 60px;
}

.mobile-btn-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 12px;
    display: block;
}

.mobile-btn:hover {
    transform: scale(1.05);
}

.mobile-btn:active {
    transform: scale(0.95);
}

.mobile-btn-home {
    text-decoration: none;
}

.mobile-btn-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 60px;
    min-width: 60px;
}

.mobile-profile-dropdown-menu {
    position: absolute;
    bottom: calc(100% + 10px);
    right: 0;
    min-width: 200px;
}

/* Pin header to bottom on mobile - unified mobile menu */
@media only screen and (max-width: 1024px) {
    .header {
        position: fixed !important;
        top: auto !important;
        bottom: 0px !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        z-index: 99999 !important;
        transform: none !important;
        box-shadow: 
            0 -4px 20px rgba(0, 0, 0, 0.5),
            0 2px 10px rgba(0, 0, 0, 0.5),
            0 4px 20px rgba(184, 115, 51, 0.4),
            inset 0 1px 0 rgba(222, 184, 135, 0.2);
        background: var(--bg-menu-sidebar) !important;
        backdrop-filter: blur(10px) saturate(120%) !important;
        border-bottom: 2px solid rgba(222, 184, 135, 0.4) !important;
    }
    
    /* Header container - mobile layout */
    .header-container {
        padding: 0 var(--spacing-md) !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: var(--spacing-sm) !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    /* Hide NavbarUserDropdown in header-right on mobile */
    .header-right .navbar-user-dropdown {
        display: none !important;
    }
    
    /* Header right - mobile styling */
    .header-right {
        gap: var(--spacing-sm) !important;
        flex-shrink: 0 !important;
        display: flex !important;
        align-items: center !important;
    }
    
    /* Hide header logo on tablet and mobile */
    .header-logo-title {
        display: none !important;
    }
    
    /* Sign In button - hide on mobile */
    .btn-signin {
        display: none !important;
    }
    
    /* Hide user-info on mobile */
    .user-info {
        display: none !important;
    }
    
    /* Hide individual buttons when mobile row is shown */
    .btn-chat {
        display: none !important;
    }
    
    /* Show mobile button row */
    .mobile-button-row {
        display: flex !important;
    }
    
    /* Ensure buttons in row are evenly spaced */
    .mobile-button-row {
        justify-content: space-evenly !important;
        gap: 10px !important;
    }
    
    /* Hide SidebarLeft individual buttons - they're handled by the button row now */
    
    /* Override homepage header positioning on mobile - ensure it sticks to bottom */
    .header.header-below-banner,
    .header-below-banner {
        position: fixed !important;
        top: auto !important;
        bottom: 0px !important;
        width: 100% !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 99999 !important;
    }
    
    /* Ensure header stays fixed on all pages, override any parent positioning */
    body .header {
        position: fixed !important;
        width: 100% !important;
        left: 0 !important;
        right: 0 !important;
    }
}

/* Mobile layout unified at 1024px breakpoint above */
/* Additional very small screen adjustments only for extra small phones */
@media only screen and (max-width: 480px) {
    .user-info {
        flex-direction: column;
        gap: var(--spacing-xs);
    }
    
    .user-balance,
    .user-profile {
        width: 100%;
        align-items: center;
    }
    
    .btn-signout {
        width: 100%;
    }
}
</style>
