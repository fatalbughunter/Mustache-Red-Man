<template>
    <div class="navbar-user-dropdown" v-bind:class="[
        { 'dropdown-open': navbarDropdown === true }, 
        'dropdown-' + navbarGetLevelColor,
        'dropdown-' + authUser.user.rank
    ]">
        <button v-on:click="navbarSetDropdown(!navbarDropdown)" class="button-toggle">
            <div class="button-avatar">
                <AvatarImage v-bind:image="authUser.user.avatar" />
            </div>
            <div class="button-info">
                <div class="info-username">
                    <span v-html="authUser.user.username"></span>
                    <IconDropdown />
                </div>
                <div class="info-level">
                    Level {{navbarGetLevel}}
                </div>
            </div>
            <div class="button-arrow-mobile">
                <IconDropdown />
            </div>
        </button>
        <div class="dropdown-menu" v-bind:class="{ 'menu-admin': authUser.user.rank === 'admin' }">
            <div class="menu-inner">
                <router-link v-on:click.native="navbarSetDropdown(false)" to="/profile">
                    <IconUser />
                    PROFILE
                </router-link>
                <button v-on:click="navbarBalanceButton()">
                    <IconCashier />
                    BALANCE
                </button>
                <!-- <button v-on:click="navbarVaultButton()">
                    <IconVault />
                    VAULT
                </button> -->
                <!--
                <router-link v-on:click.native="navbarSetDropdown(false)" to="/rewards">
                    <IconRakeback />
                    REWARDS
                </router-link>
                -->
                <!-- <router-link v-on:click.native="navbarSetDropdown(false)" to="/affiliates">
                    <IconAffiliates />
                    AFFILIATES
                </router-link> -->
                <router-link v-on:click.native="navbarSetDropdown(false)" to="/leaderboard">
                    <IconLeaderboard />
                    LEADERBOARD
                </router-link>
                <router-link v-if="authUser.user.rank === 'admin'" v-on:click.native="navbarSetDropdown(false)" to="/admin">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                    </svg>
                    ADMIN
                </router-link>
                <button v-on:click="navbarLogoutButton()">
                    <IconSignOut />
                    SIGN OUT
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AvatarImage from '@/components/AvatarImage';
    import IconDropdown from '@/components/icons/IconDropdown';
    import IconSword from '@/components/icons/IconSword';
    import IconUser from '@/components/icons/IconUser';
    import IconCashier from '@/components/icons/IconCashier';
    import IconVault from '@/components/icons/IconVault';
    import IconRakeback from '@/components/icons/IconRakeback';
    import IconAffiliates from '@/components/icons/IconAffiliates';
    import IconLeaderboard from '@/components/icons/IconLeaderboard';
    import IconSignOut from '@/components/icons/IconSignOut';

    export default {
        name: 'NavbarUserDropdown',
        components: {
            AvatarImage,
            IconDropdown,
            IconSword,
            IconUser,
            IconCashier,
            IconVault,
            IconRakeback,
            IconAffiliates,
            IconLeaderboard,
            IconSignOut
        },
        data() {
            return {
                navbarDropdown: false
            }
        },
        methods: {
            ...mapActions([
                'modalsSetShow',
                'modalsSetData',
                'authLogoutUser'
            ]),
            navbarSetDropdown(value) {
                this.navbarDropdown = value;
            },
            navbarBalanceButton() {
                this.modalsSetData({ typeCashier: 'deposit' });
                this.modalsSetShow('Cashier');
                this.navbarSetDropdown(false);
            },
            navbarVaultButton() {
                this.modalsSetShow('Vault');
                this.navbarSetDropdown(false);
            },
            navbarLogoutButton() {
                this.navbarSetDropdown(false);
                this.authLogoutUser();
            }
        },
        computed: {
            ...mapGetters([
                'authUser'
            ]),
            navbarGetLevel() {
                let level = Math.floor(Math.pow(this.authUser.user.xp / 10, 1 / 3));
                return level >= 100 ? 100 : level; 
            },
            navbarGetLevelColor() {
                let color = '';

                if(this.navbarGetLevel >= 2 && this.navbarGetLevel < 26) { color = 'blue'; }
                else if(this.navbarGetLevel >= 26 && this.navbarGetLevel < 51) { color = 'green'; }
                else if(this.navbarGetLevel >= 51 && this.navbarGetLevel < 76) { color = 'orange'; }
                else if(this.navbarGetLevel >= 76 && this.navbarGetLevel < 100) { color = 'red'; }
                else if(this.navbarGetLevel >= 100) { color = 'purple'; }

                return color;
            }
        },
        created() {
            let self = this;
            document.addEventListener('click', function(event) {
                if(!self.$el.contains(event.target) && self.navbarDropdown == true) {
                    self.navbarSetDropdown(false);
                }
            });
        }
    }
</script>

<style scoped>
    .navbar-user-dropdown {
        position: relative;
        z-index: 1000000;
        overflow: visible;
    }

    .navbar-user-dropdown button.button-toggle {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        padding: 8px 16px 8px 8px;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .navbar-user-dropdown button.button-toggle:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .navbar-user-dropdown .button-avatar {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        border-radius: 50%;
        border: 3px solid #b87333;
        overflow: hidden;
        background: linear-gradient(135deg, #2a1f1a 0%, #1a1520 100%);
        box-shadow: 
            0 0 0 2px rgba(184, 115, 51, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.3);
        flex-shrink: 0;
    }

    .navbar-user-dropdown.dropdown-blue .button-avatar {
        border-color: #559ee4;
        box-shadow: 0 0 0 2px rgba(85, 158, 228, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .navbar-user-dropdown.dropdown-green .button-avatar {
        border-color: #b8e92d;
        box-shadow: 0 0 0 2px rgba(184, 233, 45, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .navbar-user-dropdown.dropdown-orange .button-avatar {
        border-color: #fca311;
        box-shadow: 0 0 0 2px rgba(252, 163, 17, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .navbar-user-dropdown.dropdown-red .button-avatar {
        border-color: #ff4e4e;
        box-shadow: 0 0 0 2px rgba(255, 78, 78, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .navbar-user-dropdown.dropdown-purple .button-avatar {
        border-color: #6953f1;
        box-shadow: 0 0 0 2px rgba(105, 83, 241, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    } 

    .navbar-user-dropdown.dropdown-partner .button-avatar {
        border-color: #eca822;
        box-shadow: 0 0 0 2px rgba(236, 168, 34, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .navbar-user-dropdown.dropdown-mod .button-avatar {
        border-color: #ffb703;
        box-shadow: 0 0 0 2px rgba(255, 183, 3, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .navbar-user-dropdown.dropdown-admin .button-avatar {
        border-color: var(--accent-yellow);
        box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .navbar-user-dropdown .button-avatar .avatar-image {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    .navbar-user-dropdown .button-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
    }

    .navbar-user-dropdown .button-arrow-mobile {
        display: none;
    }

    .navbar-user-dropdown .info-username {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 600;
        color: #ffffff;
        line-height: 1.2;
    }

    .navbar-user-dropdown .info-username span {
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .navbar-user-dropdown .info-username svg {
        width: 10px;
        height: 10px;
        margin-left: 8px;
        fill: #ffffff;
        opacity: 0.7;
        transition: all 0.3s ease;
    }

    .navbar-user-dropdown:hover .info-username svg {
        opacity: 1;
    }

    .navbar-user-dropdown.dropdown-open .info-username svg {
        transform: rotate(180deg);
        opacity: 1;
    }

    .navbar-user-dropdown .info-level {
        font-size: 12px;
        font-weight: 600;
        color: #fca311;
        line-height: 1.2;
    }

    .navbar-user-dropdown.dropdown-blue .info-level {
        color: #559ee4;
    }

    .navbar-user-dropdown.dropdown-green .info-level {
        color: #b8e92d;
    }

    .navbar-user-dropdown.dropdown-orange .info-level {
        color: #fca311;
    }

    .navbar-user-dropdown.dropdown-red .info-level {
        color: #ff4e4e;
    }

    .navbar-user-dropdown.dropdown-purple .info-level {
        color: #6953f1;
    }

    .navbar-user-dropdown.dropdown-partner .info-level {
        color: #eca822;
    }

    .navbar-user-dropdown.dropdown-mod .info-level {
        color: #ffb703;
    }

    .navbar-user-dropdown.dropdown-admin .info-level {
        color: var(--accent-yellow);
    }

    .navbar-user-dropdown .rank-box {
        width: 22px;
        height: 16px;
        position: relative;
        margin-left: 6px;
        padding: 1px;
    }

    .navbar-user-dropdown .rank-box svg {
        width: 8px;
    }

    .navbar-user-dropdown .rank-box::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(6, 36, 61, 0) 0%, #ffb703 100%);
        clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 25%, 100% 75%, calc(100% - 3px) 100%, 3px 100%, 0 75%, 0 25%);
        z-index: -1;
    }

    .navbar-user-dropdown .rank-box .box-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #112531;
        clip-path: polygon(3px 0, calc(100% - 3px) 0, 100% 25%, 100% 75%, calc(100% - 3px) 100%, 3px 100%, 0 75%, 0 25%);
    }

    .navbar-user-dropdown .dropdown-menu {
        height: 0;
        position: absolute;
        top: 60px;
        right: 0;
        width: 220px;
        padding: 0 10px;
        transition: height 0.2s ease;
        overflow: hidden;
        z-index: 1000000;
    }

    .navbar-user-dropdown.dropdown-open .dropdown-menu {
        height: 270px;
        padding: 0 10px 10px 10px;
    }

    .navbar-user-dropdown.dropdown-open .dropdown-menu.menu-admin {
        height: 310px;
    }

    .navbar-user-dropdown .menu-inner {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 7px;
        border-radius: 12px;
        background: var(--bg-blue-dark);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        overflow: hidden;
    }

    .navbar-user-dropdown .menu-inner::before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: -7px;
        right: 20px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 7px solid var(--bg-blue-dark);
    }

    .navbar-user-dropdown .menu-inner button,
    .navbar-user-dropdown .menu-inner a {
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        font-size: 13px;
        font-weight: 600;
        color: #ffffff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.2s ease;
        background: transparent;
    }

    .navbar-user-dropdown .menu-inner button:last-child,
    .navbar-user-dropdown .menu-inner a:last-child {
        border-bottom: none;
    }

    .navbar-user-dropdown .menu-inner button:hover,
    .navbar-user-dropdown .menu-inner a:hover {
        background: rgba(255, 255, 255, 0.05);
        color: var(--accent-yellow);
    }

    .navbar-user-dropdown .menu-inner button svg,
    .navbar-user-dropdown .menu-inner a svg {
        width: 16px;
        height: 16px;
        margin-right: 12px;
        fill: currentColor;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }

    .navbar-user-dropdown .menu-inner button:hover svg,
    .navbar-user-dropdown .menu-inner a:hover svg {
        opacity: 1;
    }

    /* Mobile styles - hide username/level, show only avatar and arrow */
    @media only screen and (max-width: 1024px) {
        .navbar-user-dropdown {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .navbar-user-dropdown .button-toggle {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
        }

        .navbar-user-dropdown .button-info {
            display: none;
        }

        .navbar-user-dropdown .button-avatar {
            width: 40px;
            height: 40px;
            margin-right: 0;
            border-width: 2px;
        }

        .navbar-user-dropdown .button-avatar .avatar-image {
            width: 34px;
            height: 34px;
        }

        .navbar-user-dropdown .button-arrow-mobile {
            display: flex;
            align-items: center;
            margin-left: 8px;
        }

        .navbar-user-dropdown .button-arrow-mobile svg {
            width: 10px;
            fill: #ffffff;
            transition: all 0.3s ease;
        }

        .navbar-user-dropdown.dropdown-open .button-arrow-mobile svg {
            transform: rotate(180deg);
        }

        /* Position dropdown menu above on mobile */
        .navbar-user-dropdown .dropdown-menu {
            top: auto;
            bottom: calc(100% + 15px);
            left: 50%;
            right: auto;
            transform: translateX(-50%);
            width: 200px;
        }

        .navbar-user-dropdown .menu-inner::before {
            top: auto;
            bottom: -7px;
            right: 50%;
            transform: translateX(50%);
            border-bottom: none;
            border-top: 7px solid var(--bg-blue-dark);
        }
    }
</style>
