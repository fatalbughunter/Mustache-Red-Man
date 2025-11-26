<template>
    <div>
        <button class="mobile-fab" v-on:click="toggleMobile">
            <svg width="18" height="12" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="2" y="0"/><rect width="18" height="2" y="5"/><rect width="18" height="2" y="10"/></svg>
            <span>MENU</span>
        </button>
        <router-link to="/" class="mobile-home-btn" @click.native="closeMobile">
            <img src="@/assets/img/icons/mobileHome.png" alt="Home" />
        </router-link>
        <aside id="sidebar-left" v-bind:class="{ 'collapsed': collapsed, 'mobile-open': mobileOpen }">
            <div class="sidebar-header">
                <button class="menu-toggle" v-on:click="toggleHeader">
                    <svg width="18" height="12" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="2" y="0"/><rect width="18" height="2" y="5"/><rect width="18" height="2" y="10"/></svg>
                </button>
                <span>MENU</span>
            </div>

            <nav class="sidebar-group">
                <router-link to="/" class="sidebar-link" v-on:click.native="closeMobile">
                    <IconHome />
                    <span>Home</span>
                </router-link>
            </nav>

            <nav class="sidebar-group">
                <div class="sidebar-title">CASINO</div>
                <router-link to="/battles" class="sidebar-link sidebar-link-casino" v-on:click.native="closeMobile">
                  <!--<IconBattles /> -->
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
                <router-link to="/mines" class="sidebar-link sidebar-link-casino" v-on:click.native="closeMobile">
                    <!--<IconMines />    -->
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0067 26.4866C21.7983 26.4866 26.4933 21.7916 26.4933 16C26.4933 10.2083 21.7983 5.51331 16.0067 5.51331C10.215 5.51331 5.51999 10.2083 5.51999 16C5.51999 21.7916 10.215 26.4866 16.0067 26.4866Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 1.66669V5.51335M30.34 15.9867H26.5M16.02 30.3334V26.4867M1.67334 16.0134H5.52001M23.4267 8.58669L24.7867 7.22669M23.4267 23.4134L24.7867 24.7734M8.59334 23.4134L7.23334 24.7734M8.59334 8.58669L7.23334 7.22669" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.16 15.1C9.86935 15.1013 9.58487 15.0162 9.34266 14.8556C9.10045 14.6949 8.91143 14.4659 8.7996 14.1977C8.68776 13.9294 8.65816 13.634 8.71453 13.3488C8.77091 13.0637 8.91074 12.8018 9.11625 12.5962C9.32177 12.3907 9.58372 12.2509 9.86884 12.1945C10.154 12.1382 10.4494 12.1678 10.7177 12.2796C10.986 12.3914 11.2149 12.5804 11.3756 12.8227C11.5362 13.0649 11.6213 13.3493 11.62 13.64C11.62 14.0272 11.4662 14.3986 11.1924 14.6724C10.9186 14.9462 10.5472 15.1 10.16 15.1ZM14 12.5933C13.6044 12.5933 13.2178 12.476 12.8889 12.2563C12.56 12.0365 12.3036 11.7241 12.1522 11.3587C12.0009 10.9932 11.9613 10.5911 12.0384 10.2031C12.1156 9.81518 12.3061 9.45881 12.5858 9.17911C12.8655 8.8994 13.2219 8.70892 13.6098 8.63175C13.9978 8.55458 14.3999 8.59419 14.7654 8.74556C15.1308 8.89694 15.4432 9.15328 15.6629 9.48218C15.8827 9.81108 16 10.1978 16 10.5933C16 11.1238 15.7893 11.6325 15.4142 12.0075C15.0391 12.3826 14.5304 12.5933 14 12.5933Z" fill="currentColor" stroke="currentColor" stroke-miterlimit="10"/>
</svg>

                    <span>Mines</span>
                </router-link>
                <router-link to="/blackjack" class="sidebar-link sidebar-link-casino" v-on:click.native="closeMobile">
                <!--    <IconBlackjack /> -->
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.38476 5.1504C9.27073 5.15566 9.15813 5.17806 9.05076 5.21684L2.56839 7.59565C2.2882 7.69846 2.03758 7.93046 1.91214 8.20128C1.7867 8.4719 1.77226 8.81365 1.87501 9.09378L6.04501 20.461C6.1477 20.7411 6.37964 20.9937 6.65039 21.1191C6.92114 21.2446 7.26289 21.2591 7.54289 21.1563L14.0254 18.7773C14.3056 18.6746 14.5562 18.4427 14.6816 18.1719L14.6835 18.168C14.8074 17.8978 14.821 17.5582 14.7188 17.2793L10.5488 5.91209C10.4466 5.63334 10.2164 5.38184 9.94726 5.25584L9.94339 5.25396C9.80801 5.19115 9.65445 5.15671 9.50001 5.15034C9.46139 5.14878 9.42314 5.14853 9.38476 5.1504ZM11.8263 6.0019L15.8165 16.8769C16.0294 17.459 16.0027 18.1017 15.7422 18.6641C15.4819 19.226 15.0091 19.6615 14.4278 19.875L12.7128 20.504L16.4628 20.6777C16.761 20.6917 17.0822 20.574 17.3028 20.3731C17.5233 20.172 17.6697 19.8625 17.6836 19.5643L18.2461 7.47059C18.26 7.17259 18.1443 6.84946 17.9434 6.62884C17.7424 6.40821 17.4329 6.26196 17.1348 6.24803L11.8262 6.00178L11.8263 6.0019ZM19.3888 8.08003L18.8496 19.6192C18.8208 20.2382 18.5476 20.8205 18.0899 21.2383C17.6317 21.6549 17.0268 21.8727 16.4082 21.8438L14.7795 21.7675L19.1153 23.211C19.3985 23.3052 19.7411 23.2802 20.0078 23.1466C20.2747 23.0128 20.4977 22.7539 20.5919 22.4707L24.4141 10.9826C24.5083 10.6993 24.4833 10.3568 24.3497 10.09C24.216 9.82309 23.957 9.59809 23.6738 9.50403L19.3888 8.08015L19.3888 8.08003ZM6.57226 9.22659C8.10089 10.7851 10.8235 10.3353 11.6191 12.0722C12.3613 13.6927 10.7123 14.9476 9.24601 14.4727L10.3085 16.3965L9.13476 16.8282L8.4512 14.8477C7.80183 16.2617 5.76039 16.3318 5.06639 14.8145C4.22076 12.966 6.5677 11.427 6.57226 9.22659ZM25.4121 11.6778L21.7013 22.8398C21.5057 23.4276 21.0849 23.9137 20.5313 24.1914L20.5254 24.1933C19.9727 24.4681 19.3338 24.513 18.7481 24.3183L17.4746 23.8945L20.1816 26.2089C20.4085 26.4028 20.7356 26.5077 21.0331 26.4843C21.3306 26.461 21.6343 26.3068 21.8281 26.08L29.6953 16.8731C29.8892 16.6462 29.9941 16.3209 29.9707 16.0234C29.9475 15.7259 29.7913 15.4204 29.5645 15.2265L25.4122 11.6778L25.4121 11.6778Z" fill="currentColor"/>
</svg>

                    <span>Black Jack</span>
                </router-link>
                <router-link to="/roll" class="sidebar-link sidebar-link-casino" v-on:click.native="closeMobile">
                 <!--   <IconRoll />    -->
                 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.8 3.6C28.8 3.33333 28.5333 3.2 28.2667 3.06666C23.2 1.73333 17.7333 3.46666 14.4 7.46666L12.6667 9.46666L9.06667 8.53333C7.60001 8 6.13334 8.66666 5.46667 10L2.66667 14.9333C2.66667 14.9333 2.66667 15.0667 2.53334 15.0667C2.40001 15.4667 2.66667 15.7333 3.06667 15.8667L7.60001 16.8C7.20001 18 6.80001 19.2 6.66667 20.4C6.66667 20.6667 6.66667 20.8 6.80001 20.9333L10.8 24.8C10.9333 24.9333 11.0667 24.9333 11.3333 24.9333C12.5333 24.8 13.8667 24.5333 15.0667 24.1333L16 28.5333C16 28.8 16.4 29.0667 16.6667 29.0667C16.8 29.0667 16.9333 29.0667 16.9333 28.9333L21.8667 26.1333C23.0667 25.4667 23.6 24 23.3333 22.6667L22.4 18.8L24.2667 17.0667C28.4 14 30.1333 8.66666 28.8 3.6ZM4.26667 14.8L6.53334 10.6667C6.93334 9.86666 7.73334 9.6 8.53334 9.86666L11.6 10.6667L10.2667 12.2667C9.46667 13.3333 8.66667 14.4 8.13334 15.6L4.26667 14.8ZM21.3333 25.3333L17.2 27.7333L16.4 23.8667C17.6 23.3333 18.6667 22.5333 19.7333 21.7333L21.4667 20.1333L22.2667 23.2C22.2667 24 22 24.9333 21.3333 25.3333ZM23.4667 16.4L18.8 20.6667C16.8 22.4 14.2667 23.4667 11.6 23.7333L8.13334 20.2667C8.53334 17.6 9.60001 15.0667 11.3333 13.0667L13.4667 10.6667L13.6 10.5333L15.4667 8.4C18.4 4.93333 23.2 3.33333 27.6 4.26666C28.5333 8.8 27.0667 13.4667 23.4667 16.4ZM21.8667 7.46666C20.4 7.46666 19.3333 8.66666 19.3333 10C19.3333 11.3333 20.5333 12.5333 21.8667 12.5333C23.3333 12.5333 24.4 11.3333 24.4 10C24.4 8.66666 23.3333 7.46666 21.8667 7.46666ZM21.8667 11.3333C21.2 11.3333 20.6667 10.8 20.6667 10.1333C20.6667 9.46666 21.2 8.93333 21.8667 8.93333C22.5333 8.93333 23.0667 9.46666 23.0667 10.1333C23.0667 10.8 22.5333 11.3333 21.8667 11.3333Z" fill="currentColor"/>
</svg>

                    <span>Limbo</span>
                </router-link>
                <router-link to="/duels" class="sidebar-link sidebar-link-casino" v-on:click.native="closeMobile">
                 <!--   <IconDuels />   -->
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
            </nav>

            <nav class="sidebar-group">
                <div class="sidebar-title">JOIN COMMUNITY</div>
                <a href="#" class="sidebar-link" target="_blank" rel="noopener" v-on:click="closeMobile">
                    <IconDiscord />
                    <span>Discord</span>
                </a>
                <router-link to="/leaderboard" class="sidebar-link" v-on:click.native="closeMobile">
                    <IconLeaderboard />
                    <span>Leaderboard</span>
                </router-link>
            </nav>

            <nav class="sidebar-group">
                <div class="sidebar-title">EARN</div>
                <router-link to="/rewards" class="sidebar-link" v-on:click.native="closeMobile">
                    <IconRakeback />
                    <span>Reward</span>
                </router-link>
                <router-link to="/affiliates" class="sidebar-link" v-on:click.native="closeMobile">
                    <IconAffiliates />
                    <span>Refer a Friend</span>
                </router-link>
            </nav>

            <div class="sidebar-footer">
                <button class="sidebar-link" v-on:click="openSupport">
                    <IconInfo />
                    <span>Support</span>
                </button>
            </div>
        </aside>
        <div v-if="mobileOpen" class="mobile-backdrop" v-on:click="closeMobile"></div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import IconHome from '@/components/icons/IconHome';
    import IconMines from '@/components/icons/IconMines';
    import IconBlackjack from '@/components/icons/IconBlackjack';
    import IconRoll from '@/components/icons/IconRoll';
    import IconDuels from '@/components/icons/IconDuels';
    import IconDiscord from '@/components/icons/IconDiscord';
    import IconLeaderboard from '@/components/icons/IconLeaderboard';
    import IconRakeback from '@/components/icons/IconRakeback';
    import IconAffiliates from '@/components/icons/IconAffiliates';
    import IconBattles from '@/components/icons/IconBattles';
    import IconInfo from '@/components/icons/IconInfo';

    export default {
        name: 'SidebarLeft',
        components: { IconHome, IconMines, IconBlackjack, IconRoll, IconDuels, IconDiscord, IconLeaderboard, IconRakeback, IconAffiliates, IconBattles, IconInfo },
        data() { return { collapsed: false, mobileOpen: false }; },
        methods: {
            ...mapActions(['modalsSetShow']),
            toggleCollapsed() { this.collapsed = !this.collapsed; this.$emit('collapsed-change', this.collapsed); },
            toggleMobile() { this.mobileOpen = !this.mobileOpen; },
            closeMobile() { this.mobileOpen = false; },
            toggleHeader() {
                if(window.innerWidth <= 1500) { this.toggleMobile(); }
                else { this.toggleCollapsed(); }
            },
            openSupport() { this.modalsSetShow('Support'); this.closeMobile(); }
        },
        mounted() { this.$emit('collapsed-change', this.collapsed); }
    }
</script>

<style scoped>
    aside#sidebar-left {
        width: 240px;
        height: 100%;
        position: fixed;
        top: 80px;
        left: 0;
        display: none;
        flex-direction: column;
        background: rgba(13, 13, 13, 0.95);
        backdrop-filter: blur(10px);
        border-right: 1px solid rgba(212, 175, 55, 0.2);
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

    nav.sidebar-group { 
        padding: var(--spacing-sm) var(--spacing-md); 
        margin-bottom: var(--spacing-sm);
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
    aside#sidebar-left.collapsed .sidebar-group {
        padding: var(--spacing-sm) var(--spacing-xs);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sidebar-footer { 
        margin-top: auto; 
        padding: var(--spacing-md); 
        border-top: 1px solid rgba(255, 255, 255, 0.08); 
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
        gap: var(--spacing-sm); 
        background: transparent;
        /* backdrop-filter: blur(10px); */
        /*border: 1px solid var(--accent-yellow); */
        color: var(--accent-yellow); 
        padding: 0 0 33px 18px;
        /*border-radius: var(--radius-sm); */
        transition: all 0.3s ease;
    }
    .mobile-fab svg { fill: var(--accent-yellow); }
    .mobile-fab:hover { color: var(--accent-yellow); }

    .mobile-backdrop { 
        position: fixed; 
        inset: 0; 
        background: rgba(0,0,0,0.6); 
        z-index: 85; 
    }

    @media only screen and (max-width: 1500px) {
        aside#sidebar-left { 
            display: flex;
            transform: translateX(-100%); 
            width: 280px; 
            top: 80px;
        }
        aside#sidebar-left.mobile-open { transform: translateX(0); }
        aside#sidebar-left.collapsed { width: 280px; }
        .mobile-fab { 
            display: inline-flex;
            padding: 0 0 33px 18px;
            z-index: 100000;
         }
        
        /* Hide sidebar header menu toggle on mobile/tablet */
        .sidebar-header {
            display: none;
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
        height: 80px;
    }

    .mobile-home-btn img {
        width: auto;
        height: 36px;
        display: block;
        transition: transform 0.3s ease;
    }

    .mobile-home-btn:hover img {
        transform: scale(1.1);
    }

    .mobile-home-btn:active img {
        transform: scale(0.95);
    }

    /* Position mobile fav button at bottom left of fixed header on tablets and mobile */
    @media only screen and (max-width: 1024px) {
        .mobile-fab {
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: var(--spacing-md) !important;
            z-index: 100001 !important;
            display: inline-flex !important;
            padding: 0 0 33px 18px !important;
            align-items: center !important;
            gap: var(--spacing-sm) !important;
            background: transparent !important;
            color: var(--accent-yellow) !important;
            transition: all 0.3s ease !important;
        }
        
        .mobile-home-btn {
            display: flex !important;
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: calc(var(--spacing-md) + 91px) !important;
            z-index: 100001 !important;
            height: 80px !important;
        }
        
        aside#sidebar-left {
            bottom: 80px !important;
            top: auto !important;
        }
    }

    @media only screen and (max-width: 768px) {
        aside#sidebar-left { 
            width: 260px; 
            bottom: 80px !important;
            top: auto !important;
        }
        
        .mobile-fab {
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: var(--spacing-sm) !important;
            padding: 0 0 33px 18px !important;
            min-height: auto !important;
            min-width: auto !important;
            z-index: 100001 !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: var(--spacing-xs) !important;
        }
        
        .mobile-home-btn {
            left: calc(var(--spacing-sm) + 91px) !important;
        }
        
        .mobile-home-btn img {
            height: 36px;
        }
    }
    
    @media only screen and (max-width: 480px) {
        .mobile-fab {
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: var(--spacing-xs) !important;
            padding: 0 0 33px 18px !important;
            z-index: 100001 !important;
        }
        
        .mobile-home-btn {
            left: calc(var(--spacing-xs) + 91px) !important;
        }
        
        .mobile-home-btn img {
            height: 36px;
        }
    }
</style> 