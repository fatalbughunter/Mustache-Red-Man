<template>
    <div class="profile-header" v-bind:class="[
            'header-' + profileGetLevelColor,
            'header-' + authUser.user.rank
        ]">
        <div class="header-user">
            <div class="user-avatar">
                <AvatarImage v-bind:image="authUser.user.avatar" />
                <div class="avatar-glow"></div>
            </div>
            <div class="user-info">
                <div class="info-username">
                    <span v-html="authUser.user.username"></span>
                </div>
                <div class="info-level">
                    <span class="level-badge">Level {{profileGetLevel}}</span>
                </div>
            </div>
        </div>
        <div class="header-level">
            <div class="level-box level-current">
                <span class="box-value">{{profileGetLevel >= 99 ? 99 : profileGetLevel}}</span>
            </div>
            <div class="level-progress">
                <div class="progress-track">
                    <div class="progress-bar" v-bind:style=" { 'width': (100 / profileGetLevelBet) * profileGetLevelProgress + '%' }"></div>
                </div>
                <div class="progress-text">
                    <span class="text-current">{{parseFloat(profileGetLevelProgress).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</span>
                    <span class="text-separator">/</span>
                    <span class="text-target">{{parseFloat(profileGetLevelBet).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</span>
                </div>
            </div>
            <div class="level-box level-next">
                <span class="box-value">{{profileGetLevel >= 99 ? 100 : profileGetLevel + 1}}</span>
            </div>
        </div>
        <div class="header-id">
            <div class="id-content">
                <div class="id-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <div class="id-info">
                    <span class="id-label">ACCOUNT ID</span>
                    <button v-on:click="profileCopyButton(authUser.user._id)" class="id-value">
                        {{ authUser.user._id.substring(0, 6) }}...{{ authUser.user._id.substring(authUser.user._id.length - 3) }}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AvatarImage from '@/components/AvatarImage';

    export default {
        name: 'ProfileHeader',
        components: {
            AvatarImage
        },
        methods: {
            ...mapActions([
                'notificationShow'
            ]),
            profileCopyButton(value) {
                const el = document.createElement('textarea');
                el.value = value;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
            }
        },
        computed: {
            ...mapGetters([
                'authUser'
            ]),
            profileGetLevel() {
                let level = Math.floor(Math.pow(this.authUser.user.xp / 1000 / 100, 1 / 3));
                return level >= 100 ? 100 : level; 
            },
            profileGetLevelColor() {
                let color = '';

                if(this.profileGetLevel >= 2 && this.profileGetLevel < 26) { color = 'blue'; }
                else if(this.profileGetLevel >= 26 && this.profileGetLevel < 51) { color = 'green'; }
                else if(this.profileGetLevel >= 51 && this.profileGetLevel < 76) { color = 'orange'; }
                else if(this.profileGetLevel >= 76 && this.profileGetLevel < 100) { color = 'red'; }
                else if(this.profileGetLevel >= 100) { color = 'purple'; }

                return color;
            },
            profileGetLevelBet() {
                return this.profileGetLevel >= 100 ? 2970100 : (Math.pow(this.profileGetLevel + 1, 3) - Math.pow(this.profileGetLevel, 3)) * 100;
            },
            profileGetLevelProgress() {
                return Math.floor((this.profileGetLevel >= 100 ? 2970100 * 1000 : this.authUser.user.xp - (Math.pow(this.profileGetLevel, 3) * 100 * 1000)) / 10) / 100;
            }
        }
    }
</script>

<style scoped>
    .profile-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        background: linear-gradient(135deg, rgba(26, 41, 66, 0.6) 0%, rgba(15, 25, 35, 0.8) 100%);
        border-radius: 16px;
        border: 1px solid rgba(184, 115, 51, 0.15);
    }

    .profile-header .header-user {
        display: flex;
        align-items: center;
        gap: 16px;
        min-width: 200px;
    }

    .profile-header .user-avatar {
        width: 64px;
        height: 64px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: linear-gradient(135deg, #b87333 0%, #8b5a2b 100%);
        padding: 3px;
    }

    .profile-header .user-avatar .avatar-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .profile-header .avatar-glow {
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(184, 115, 51, 0.3) 0%, transparent 70%);
        z-index: -1;
    }

    .profile-header.header-blue .user-avatar {
        background: linear-gradient(135deg, #559ee4 0%, #3b82f6 100%);
    }

    .profile-header.header-green .user-avatar {
        background: linear-gradient(135deg, #b8e92d 0%, #84cc16 100%);
    }

    .profile-header.header-orange .user-avatar {
        background: linear-gradient(135deg, #fca311 0%, #f59e0b 100%);
    }

    .profile-header.header-red .user-avatar {
        background: linear-gradient(135deg, #ff4e4e 0%, #ef4444 100%);
    }

    .profile-header.header-purple .user-avatar {
        background: linear-gradient(135deg, #6953f1 0%, #8b5cf6 100%);
    }

    .profile-header .user-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .profile-header .info-username {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
    }

    .profile-header .info-username span {
        max-width: 150px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .profile-header .level-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        background: rgba(184, 115, 51, 0.2);
        color: #b87333;
        border: 1px solid rgba(184, 115, 51, 0.3);
    }

    .profile-header.header-blue .level-badge {
        background: rgba(85, 158, 228, 0.2);
        color: #559ee4;
        border-color: rgba(85, 158, 228, 0.3);
    }

    .profile-header.header-green .level-badge {
        background: rgba(184, 233, 45, 0.2);
        color: #b8e92d;
        border-color: rgba(184, 233, 45, 0.3);
    }

    .profile-header.header-orange .level-badge {
        background: rgba(252, 163, 17, 0.2);
        color: #fca311;
        border-color: rgba(252, 163, 17, 0.3);
    }

    .profile-header.header-red .level-badge {
        background: rgba(255, 78, 78, 0.2);
        color: #ff4e4e;
        border-color: rgba(255, 78, 78, 0.3);
    }

    .profile-header.header-purple .level-badge {
        background: rgba(105, 83, 241, 0.2);
        color: #6953f1;
        border-color: rgba(105, 83, 241, 0.3);
    }

    .profile-header .header-level {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 500px;
        margin: 0 40px;
    }

    .profile-header .level-box {
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border: 2px solid rgba(184, 115, 51, 0.4);
        border-radius: 12px;
        flex-shrink: 0;
    }

    .profile-header .level-box .box-value {
        font-size: 16px;
        font-weight: 700;
        color: #b87333;
    }

    .profile-header.header-blue .level-box {
        background: linear-gradient(135deg, rgba(85, 158, 228, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
        border-color: rgba(85, 158, 228, 0.4);
    }

    .profile-header.header-blue .level-box .box-value {
        color: #559ee4;
    }

    .profile-header.header-green .level-box {
        background: linear-gradient(135deg, rgba(184, 233, 45, 0.2) 0%, rgba(132, 204, 22, 0.1) 100%);
        border-color: rgba(184, 233, 45, 0.4);
    }

    .profile-header.header-green .level-box .box-value {
        color: #b8e92d;
    }

    .profile-header.header-orange .level-box {
        background: linear-gradient(135deg, rgba(252, 163, 17, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);
        border-color: rgba(252, 163, 17, 0.4);
    }

    .profile-header.header-orange .level-box .box-value {
        color: #fca311;
    }

    .profile-header.header-red .level-box {
        background: linear-gradient(135deg, rgba(255, 78, 78, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);
        border-color: rgba(255, 78, 78, 0.4);
    }

    .profile-header.header-red .level-box .box-value {
        color: #ff4e4e;
    }

    .profile-header.header-purple .level-box {
        background: linear-gradient(135deg, rgba(105, 83, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%);
        border-color: rgba(105, 83, 241, 0.4);
    }

    .profile-header.header-purple .level-box .box-value {
        color: #6953f1;
    }

    .profile-header .level-progress {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .profile-header .progress-track {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }

    .profile-header .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #b87333 0%, #d4a574 100%);
        border-radius: 4px;
        transition: width 0.5s ease;
    }

    .profile-header.header-blue .progress-bar {
        background: linear-gradient(90deg, #559ee4 0%, #a4d0ff 100%);
    }

    .profile-header.header-green .progress-bar {
        background: linear-gradient(90deg, #b8e92d 0%, #e5ffa4 100%);
    }

    .profile-header.header-orange .progress-bar {
        background: linear-gradient(90deg, #fca311 0%, #ffe5a4 100%);
    }

    .profile-header.header-red .progress-bar {
        background: linear-gradient(90deg, #ff4e4e 0%, #ffa4a4 100%);
    }

    .profile-header.header-purple .progress-bar {
        background: linear-gradient(90deg, #6953f1 0%, #b5a4ff 100%);
    }

    .profile-header .progress-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-size: 13px;
    }

    .profile-header .text-current {
        font-weight: 700;
        color: #b87333;
    }

    .profile-header .text-separator {
        font-weight: 500;
        color: rgba(255, 255, 255, 0.3);
    }

    .profile-header .text-target {
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
    }

    .profile-header.header-blue .text-current { color: #559ee4; }
    .profile-header.header-green .text-current { color: #b8e92d; }
    .profile-header.header-orange .text-current { color: #fca311; }
    .profile-header.header-red .text-current { color: #ff4e4e; }
    .profile-header.header-purple .text-current { color: #6953f1; }

    .profile-header .header-id {
        min-width: 180px;
        display: flex;
        justify-content: flex-end;
    }

    .profile-header .id-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .profile-header .id-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-radius: 10px;
        color: #b87333;
    }

    .profile-header .id-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .profile-header .id-label {
        font-size: 10px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .profile-header .id-value {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 600;
        color: #b87333;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: color 0.2s ease;
    }

    .profile-header .id-value:hover {
        color: #d4a574;
    }

    .profile-header .id-value svg {
        opacity: 0.6;
        transition: opacity 0.2s ease;
    }

    .profile-header .id-value:hover svg {
        opacity: 1;
    }

    @media only screen and (max-width: 1000px) {
        .profile-header {
            flex-wrap: wrap;
            gap: 24px;
        }

        .profile-header .header-user {
            order: 1;
        }

        .profile-header .header-id {
            order: 2;
        }

        .profile-header .header-level {
            order: 3;
            width: 100%;
            max-width: 100%;
            margin: 0;
        }
    }

    @media only screen and (max-width: 600px) {
        .profile-header {
            padding: 20px;
        }

        .profile-header .header-user {
            flex: 1;
        }

        .profile-header .user-avatar {
            width: 48px;
            height: 48px;
        }

        .profile-header .info-username {
            font-size: 16px;
        }

        .profile-header .header-id {
            min-width: auto;
        }

        .profile-header .id-content {
            padding: 10px 12px;
        }

        .profile-header .id-icon {
            display: none;
        }

        .profile-header .header-level {
            gap: 8px;
        }

        .profile-header .level-box {
            width: 36px;
            height: 36px;
        }

        .profile-header .level-box .box-value {
            font-size: 14px;
        }
    }
</style>
