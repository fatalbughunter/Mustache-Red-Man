<template>
    <header class="header" :class="{ 'header-below-banner': isHomePage }">
        <div class="header-container">
            <!-- Navigation Menu -->
            <nav class="header-nav">
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
                        <router-link to="/battles" class="nav-dropdown-item" @click.native="closeDropdown">
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
                        <router-link to="/roll" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.8 3.6C28.8 3.33333 28.5333 3.2 28.2667 3.06666C23.2 1.73333 17.7333 3.46666 14.4 7.46666L12.6667 9.46666L9.06667 8.53333C7.60001 8 6.13334 8.66666 5.46667 10L2.66667 14.9333C2.66667 14.9333 2.66667 15.0667 2.53334 15.0667C2.40001 15.4667 2.66667 15.7333 3.06667 15.8667L7.60001 16.8C7.20001 18 6.80001 19.2 6.66667 20.4C6.66667 20.6667 6.66667 20.8 6.80001 20.9333L10.8 24.8C10.9333 24.9333 11.0667 24.9333 11.3333 24.9333C12.5333 24.8 13.8667 24.5333 15.0667 24.1333L16 28.5333C16 28.8 16.4 29.0667 16.6667 29.0667C16.8 29.0667 16.9333 29.0667 16.9333 28.9333L21.8667 26.1333C23.0667 25.4667 23.6 24 23.3333 22.6667L22.4 18.8L24.2667 17.0667C28.4 14 30.1333 8.66666 28.8 3.6ZM4.26667 14.8L6.53334 10.6667C6.93334 9.86666 7.73334 9.6 8.53334 9.86666L11.6 10.6667L10.2667 12.2667C9.46667 13.3333 8.66667 14.4 8.13334 15.6L4.26667 14.8ZM21.3333 25.3333L17.2 27.7333L16.4 23.8667C17.6 23.3333 18.6667 22.5333 19.7333 21.7333L21.4667 20.1333L22.2667 23.2C22.2667 24 22 24.9333 21.3333 25.3333ZM23.4667 16.4L18.8 20.6667C16.8 22.4 14.2667 23.4667 11.6 23.7333L8.13334 20.2667C8.53334 17.6 9.60001 15.0667 11.3333 13.0667L13.4667 10.6667L13.6 10.5333L15.4667 8.4C18.4 4.93333 23.2 3.33333 27.6 4.26666C28.5333 8.8 27.0667 13.4667 23.4667 16.4ZM21.8667 7.46666C20.4 7.46666 19.3333 8.66666 19.3333 10C19.3333 11.3333 20.5333 12.5333 21.8667 12.5333C23.3333 12.5333 24.4 11.3333 24.4 10C24.4 8.66666 23.3333 7.46666 21.8667 7.46666ZM21.8667 11.3333C21.2 11.3333 20.6667 10.8 20.6667 10.1333C20.6667 9.46666 21.2 8.93333 21.8667 8.93333C22.5333 8.93333 23.0667 9.46666 23.0667 10.1333C23.0667 10.8 22.5333 11.3333 21.8667 11.3333Z" fill="currentColor"/>
                            </svg>
                            <span>Limbo</span>
                        </router-link>
                        <router-link to="/duels" class="nav-dropdown-item" @click.native="closeDropdown">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_41_2155)">
                                    <path d="M17.6 0C18.873 0 20.0939 0.505713 20.9941 1.40589C21.8943 2.30606 22.4 3.52696 22.4 4.8V9.6H27.2C28.473 9.6 29.6939 10.1057 30.5941 11.0059C31.4943 11.9061 32 13.127 32 14.4V27.2C32 28.473 31.4943 29.6939 30.5941 30.5941C29.6939 31.4943 28.473 32 27.2 32H14.4C13.127 32 11.9061 31.4943 11.0059 30.5941C10.1057 29.6939 9.6 28.473 9.6 27.2V22.4H4.8C3.52696 22.4 2.30606 21.8943 1.40589 20.9941C0.505713 20.0939 0 18.873 0 17.6L0 4.8C0 3.52696 0.505713 2.30606 1.40589 1.40589C2.30606 0.505713 3.52696 0 4.8 0L17.6 0ZM16 24C15.5757 24 15.1687 24.1686 14.8686 24.4686C14.5686 24.7687 14.4 25.1757 14.4 25.6C14.4 26.0243 14.5686 26.4313 14.8686 26.7314C15.1687 27.0314 15.5757 27.2 16 27.2C16.4243 27.2 16.8313 27.0314 17.1314 26.7314C17.4314 26.4313 17.6 26.0243 17.6 25.6C17.6 25.1757 17.4314 24.7687 17.1314 24.4686C16.8313 24.1686 16.4243 24 16 24ZM25.6 24C25.1757 24 24.7687 24.1686 24.4686 24.4686C24.1686 24.7687 24 25.1757 24 25.6C24 26.0243 24.1686 26.4313 24.4686 26.7314C24.7687 27.0314 25.1757 27.2 25.6 27.2C26.0243 27.2 26.4313 27.0314 26.7314 26.7314C27.0314 26.4313 27.2 26.0243 27.2 25.6C27.2 25.1757 27.0314 24.7687 26.7314 24.4686C26.4313 24.1686 26.0243 24 25.6 24ZM20.8 19.2C20.3757 19.2 19.9687 19.3686 19.6686 19.6686C19.3686 19.9687 19.2 20.3757 19.2 20.8C19.2 21.2243 19.3686 21.6313 19.6686 21.9314C19.9687 22.2314 20.3757 22.4 20.8 22.4C21.2243 22.4 21.6313 22.2314 21.9314 21.9314C22.2314 21.6313 22.4 21.2243 22.4 20.8C22.4 20.3757 22.2314 19.9687 21.9314 19.6686C21.6313 19.3686 21.2243 19.2 20.8 19.2ZM16 14.4C15.5757 14.4 15.1687 14.5686 14.8686 14.8686C14.5686 15.1687 14.4 15.5757 14.4 16C14.4 16.4243 14.5686 16.8313 14.8686 17.1314C15.1687 17.4314 15.5757 17.6 16 17.6C16.4243 17.6 16.8313 17.4314 17.1314 17.1314C17.4314 16.8313 17.6 16.4243 17.6 16C17.6 15.5757 17.4314 15.1687 17.1314 14.8686C16.8313 14.5686 16.4243 14.4 16 14.4ZM25.6 14.4C25.1757 14.4 24.7687 14.5686 24.4686 14.8686C24.1686 15.1687 24 15.5757 24 16C24 16.4243 24.1686 16.8313 24.4686 17.1314C24.7687 17.4314 25.1757 17.6 25.6 17.6C26.0243 17.6 26.4313 17.4314 26.7314 17.1314C27.0314 16.8313 27.2 16.4243 27.2 16C27.2 15.5757 27.0314 15.1687 26.7314 14.8686C26.4313 14.5686 26.0243 14.4 25.6 14.4ZM7.2208 14.3888C6.79645 14.3888 6.38949 14.5574 6.08943 14.8574C5.78937 15.1575 5.6208 15.5645 5.6208 15.9888C5.6208 16.4131 5.78937 16.8201 6.08943 17.1202C6.38949 17.4202 6.79645 17.5888 7.2208 17.5888C7.64515 17.5888 8.05211 17.4202 8.35217 17.1202C8.65223 16.8201 8.8208 16.4131 8.8208 15.9888C8.8208 15.5645 8.65223 15.1575 8.35217 14.8574C8.05211 14.5574 7.64515 14.3888 7.2208 14.3888ZM7.2208 9.5888C6.79645 9.5888 6.38949 9.75737 6.08943 10.0574C5.78937 10.3575 5.6208 10.7645 5.6208 11.1888C5.6208 11.6131 5.78937 12.0201 6.08943 12.3202C6.38949 12.6202 6.79645 12.7888 7.2208 12.7888C7.64515 12.7888 8.05211 12.6202 8.35217 12.3202C8.65223 12.0201 8.8208 11.6131 8.8208 11.1888C8.8208 10.7645 8.65223 10.3575 8.35217 10.0574C8.05211 9.75737 7.64515 9.5888 7.2208 9.5888ZM7.2208 4.7888C6.79645 4.7888 6.38949 4.95737 6.08943 5.25743C5.78937 5.55749 5.6208 5.96445 5.6208 6.3888C5.6208 6.81315 5.78937 7.22011 6.08943 7.52017C6.38949 7.82023 6.79645 7.9888 7.2208 7.9888C7.64515 7.9888 8.05211 7.82023 8.35217 7.52017C8.65223 7.22011 8.8208 6.81315 8.8208 6.3888C8.8208 5.96445 8.65223 5.55749 8.35217 5.25743C8.05211 4.95737 7.64515 4.7888 7.2208 4.7888ZM15.2208 4.7888C14.7965 4.7888 14.3895 4.95737 14.0894 5.25743C13.7894 5.55749 13.6208 5.96445 13.6208 6.3888C13.6208 6.81315 13.7894 7.22011 14.0894 7.52017C14.3895 7.82023 14.7965 7.9888 15.2208 7.9888C15.6451 7.9888 16.0521 7.82023 16.3522 7.52017C16.6522 7.22011 16.8208 6.81315 16.8208 6.3888C16.8208 5.96445 16.6522 5.55749 16.3522 5.25743C16.0521 4.95737 15.6451 4.7888 15.2208 4.7888Z" fill="currentColor"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_41_2155">
                                        <rect width="32" height="32" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Dice</span>
                        </router-link>
                    </div>
                </div>
                
                <router-link to="/live-casino" class="nav-link">LIVE CASINO</router-link>
                <router-link to="/leaderboard" class="nav-link">LEADERBOARD</router-link>
                <router-link to="/slots" class="nav-link">SLOTS</router-link>
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
                    <div class="user-info">
                        <div class="user-balance">
                            <span class="balance-label">Balance:</span>
                            <span class="balance-amount">{{ formatBalance(authUser.user.balance) }}</span>
                        </div>
                        <div class="user-profile">
                            <span class="username">{{ authUser.user.username }}</span>
                        </div>
                        <button class="btn-signout" @click="handleSignOut">Sign Out</button>
                    </div>
                </template>
                
                <button class="btn-chat" @click="toggleChat">
                    <svg class="chat-icon-desktop" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <img src="@/assets/img/icons/mobileChat.png" alt="Chat" class="chat-icon-mobile" />
                </button>
            </div>
        </div>
        
        <!-- Signup Modal (only show on non-homepage) -->
        <SignupModal 
            v-if="!isHomePage"
            :show="showSignupModal" 
            @close="showSignupModal = false" 
            @switch-to-signin="switchToSignIn" 
        />
        
        <!-- Sign In Modal (only show on non-homepage) -->
        <SignInModal 
            v-if="!isHomePage"
            :show="showSignInModal" 
            @close="showSignInModal = false" 
            @switch-to-signup="switchToSignUp" 
        />
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SignupModal from '@/components/SignupModal.vue';
import SignInModal from '@/components/SignInModal.vue';

export default {
    name: 'Header',
    components: {
        SignupModal,
        SignInModal
    },
    data() {
        return {
            showSignupModal: false,
            showSignInModal: false,
            showCasinoDropdown: false,
            closeDropdownTimeout: null,
            dropdownPosition: {
                top: '0px',
                left: '0px'
            }
        }
    },
    methods: {
        ...mapActions(['generalSetSidebarMobile', 'generalSetDesktopChatOpen', 'authLogoutUser']),
        handleSignInClick() {
            // On homepage, emit event to Home component; otherwise use local state
            if (this.isHomePage) {
                this.$root.$emit('open-signin-modal');
            } else {
                this.showSignInModal = true;
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
        switchToSignIn() {
            this.showSignupModal = false;
            // On homepage, emit event to Home component; otherwise use local state
            if (this.isHomePage) {
                this.$root.$emit('open-signin-modal');
            } else {
                this.showSignInModal = true;
            }
        },
        switchToSignUp() {
            this.showSignInModal = false;
            // On homepage, emit event to Home component; otherwise use local state
            if (this.isHomePage) {
                this.$root.$emit('open-signup-modal');
            } else {
                this.showSignupModal = true;
            }
        },
        toggleChat() {
            // Check if we're on mobile/tablet (use mobile chat functionality)
            if (window.innerWidth <= 1500) {
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
    background: 
        /* Base gradient */
        linear-gradient(180deg, rgba(184, 115, 51, 0.95) 0%, rgba(139, 111, 71, 0.95) 50%, rgba(101, 67, 33, 0.95) 100%),
        /* Elegant diamond grid pattern - Casino style */
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 28px,
            rgba(212, 165, 116, 0.08) 28px,
            rgba(212, 165, 116, 0.08) 29px,
            transparent 29px,
            transparent 56px
        ),
        repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 28px,
            rgba(184, 115, 51, 0.06) 28px,
            rgba(184, 115, 51, 0.06) 29px,
            transparent 29px,
            transparent 56px
        ),
        /* Subtle vertical accent lines */
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            rgba(212, 165, 116, 0.12) 100px,
            rgba(212, 165, 116, 0.12) 101px
        ),
        /* Fine horizontal mesh */
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 16px,
            rgba(212, 165, 116, 0.04) 16px,
            rgba(212, 165, 116, 0.04) 17px
        );
    backdrop-filter: blur(10px);
    z-index: 99998;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(184, 115, 51, 0.4);
    overflow: visible;
    border-bottom: 2px solid rgba(212, 165, 116, 0.4);
    position: relative;
}

/* Floating Sparkles - Golden sparkles floating across the header */
.header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        /* Sparkles */
        radial-gradient(2px 2px at 15% 30%, rgba(212, 165, 116, 0.08), transparent),
        radial-gradient(2px 2px at 35% 60%, rgba(212, 165, 116, 0.06), transparent),
        radial-gradient(1.5px 1.5px at 55% 25%, rgba(212, 165, 116, 0.07), transparent),
        radial-gradient(2px 2px at 70% 45%, rgba(212, 165, 116, 0.05), transparent),
        radial-gradient(1.5px 1.5px at 85% 65%, rgba(212, 165, 116, 0.08), transparent),
        radial-gradient(2px 2px at 20% 70%, rgba(212, 165, 116, 0.06), transparent),
        radial-gradient(1.5px 1.5px at 45% 80%, rgba(212, 165, 116, 0.07), transparent),
        radial-gradient(2px 2px at 60% 15%, rgba(212, 165, 116, 0.05), transparent),
        radial-gradient(1.5px 1.5px at 80% 35%, rgba(212, 165, 116, 0.08), transparent),
        radial-gradient(2px 2px at 30% 50%, rgba(212, 165, 116, 0.06), transparent);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 0;
    animation: sparkleFloat 20s ease-in-out infinite;
}

/* Bokeh circles - Soft blurred golden circles */
.header::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 10% 20%, rgba(212, 165, 116, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 25% 60%, rgba(184, 115, 51, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 40% 35%, rgba(212, 165, 116, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 55% 75%, rgba(184, 115, 51, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 70% 25%, rgba(212, 165, 116, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 85% 55%, rgba(184, 115, 51, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 65% 80%, rgba(212, 165, 116, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 30% 15%, rgba(184, 115, 51, 0.04) 0%, transparent 50%);
    background-size: 200% 200%;
    background-position: 0% 0%;
    filter: blur(25px);
    pointer-events: none;
    z-index: 0;
    animation: bokehFloat 25s ease-in-out infinite;
}

@keyframes sparkleFloat {
    0%, 100% {
        transform: translateY(0) translateX(0);
        opacity: 1;
    }
    25% {
        transform: translateY(-5px) translateX(10px);
        opacity: 1;
    }
    50% {
        transform: translateY(-10px) translateX(-5px);
        opacity: 1;
    }
    75% {
        transform: translateY(-3px) translateX(15px);
        opacity: 1;
    }
}

@keyframes bokehFloat {
    0%, 100% {
        background-position: 0% 0%;
        opacity: 1;
    }
    33% {
        background-position: 50% 30%;
        opacity: 1;
    }
    66% {
        background-position: 100% 60%;
        opacity: 1;
    }
}

.header.header-below-banner {
    overflow: visible;
}

.header-below-banner {
    position: relative;
    top: auto;
    overflow: visible;
    min-height: 80px;
    height: auto;
    z-index: 99998;
}

/* Ensure header container allows dropdown to extend on homepage */
.header-below-banner .header-container {
    overflow: visible;
    z-index: 99998;
}

.header-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    /*padding: 0 var(--spacing-lg); */
    padding: 0 75px;
    display: flex;
    justify-content: right;
    align-items: center;
    gap: var(--spacing-lg);
    position: relative;
    z-index: 99998;
    overflow: visible;
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

/* Show navigation only on desktop */
@media only screen and (min-width: 1200px) {
    .header-nav {
        display: flex;
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
    /*background: #1A1A1A !important;*/
    background: var(--bg-primary);
    /* Prevent any movement/jump */
    will-change: auto;
    transform: none !important;
    border: 2px solid rgba(212, 165, 116, 0.6) !important;
    border-radius: 8px !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9),
                0 5px 20px rgba(184, 115, 51, 0.4) !important;
    padding: 10px 0 !important;
    z-index: 999999 !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: all !important;
    overflow: visible !important;
    max-height: none !important;
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
    background: var(--bg-primary);
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
}

.btn-signin {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--accent-red);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-signin:hover {
    background: var(--accent-deep-red);
    border-color: rgba(255, 255, 255, 0.4);
    color: var(--text-gold);
    box-shadow: 0 4px 15px rgba(220, 20, 60, 0.4);
}

.btn-chat {
    width: 40px;
    height: 40px;
    background: var(--bg-tertiary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-copper-light);
    transition: all 0.3s ease;
    border: 1px solid rgba(212, 165, 116, 0.3);
    padding: 0;
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

.btn-chat:hover {
    background: rgba(212, 165, 116, 0.15);
    color: var(--accent-copper);
    border-color: var(--accent-copper);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(184, 115, 51, 0.4);
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


/* Pin header to bottom on tablets and mobile */
@media only screen and (max-width: 1024px) {
    .header {
        position: fixed !important;
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 99999 !important;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
    }
    
    /* Override homepage header positioning on mobile */
    .header.header-below-banner,
    .header-below-banner {
        position: fixed !important;
        top: auto !important;
        bottom: 0 !important;
    }
}

@media only screen and (max-width: 768px) {
    .header {
        position: fixed !important;
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 99999 !important;
    }
    
    .header-container {
        padding: 0 var(--spacing-md);
    }
    
    .btn-signin {
        padding: var(--spacing-xs) var(--spacing-md);
        font-size: 12px;
    }
    
    .btn-chat {
        width: 36px;
        height: 36px;
        background: transparent;
        border: none;
    }
    
    .btn-chat .chat-icon-desktop {
        display: none;
    }
    
    .btn-chat .chat-icon-mobile {
        display: block;
    }
    
    /* Override homepage header positioning on mobile */
    .header.header-below-banner,
    .header-below-banner {
        position: fixed !important;
        top: auto !important;
        bottom: 0 !important;
    }
}

@media only screen and (max-width: 480px) {
    .header-right {
        gap: var(--spacing-sm);
    }
    
    .btn-signin {
       /* display: none; */
    }
    
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
