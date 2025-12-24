<template>
    <div class="profile-header" v-bind:class="[
            'header-' + profileGetLevelColor,
            'header-' + authUser.user.rank
        ]">
        <input ref="avatarInput" type="file" accept="image/*" style="display: none" @change="handleAvatarChange" />
        <div class="header-top">
            <div class="user-avatar">
                <AvatarImage v-bind:image="authUser.user.avatar" />
                <button class="avatar-camera" @click="handleAvatarEdit">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
            <div class="user-info">
                <div class="info-username">
                    <span v-html="authUser.user.username"></span>
                </div>
                <div class="info-level">
                    LEVEL {{profileGetLevel}}
                </div>
            </div>
        </div>
        <div class="header-progress">
            <div class="progress-info progress-left">
                <div class="progress-amount">
                    {{parseFloat(profileGetLevelProgress).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} / {{parseFloat(profileGetLevelBet).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}
                </div>
                <div class="progress-level">LEVEL {{profileGetLevel >= 99 ? 99 : profileGetLevel}}</div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-track">
                    <div class="progress-bar" v-bind:style=" { 'width': (100 / profileGetLevelBet) * profileGetLevelProgress + '%' }"></div>
                </div>
            </div>
            <div class="progress-info progress-right">
                <div class="progress-date">Since: {{profileGetJoinDate}}</div>
                <div class="progress-level">LEVEL {{profileGetLevel >= 99 ? 100 : profileGetLevel + 1}}</div>
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
                'notificationShow',
                'authUploadAvatar'
            ]),
            handleAvatarEdit() {
                // Trigger the hidden file input to open file picker
                this.$refs.avatarInput.click();
            },
            async handleAvatarChange(event) {
                const file = event.target.files[0];
                if (!file) {
                    return;
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    this.notificationShow({ type: 'error', message: 'Please upload an image file.' });
                    return;
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    this.notificationShow({ type: 'error', message: 'Image size must be less than 5MB.' });
                    return;
                }

                // Create FormData
                const formData = new FormData();
                formData.append('avatar', file);

                // Upload avatar
                await this.authUploadAvatar(formData);

                // Reset input
                event.target.value = '';
            }
        },
        computed: {
            ...mapGetters([
                'authUser'
            ]),
            profileGetLevel() {
                // Use the same formula as navbar for consistency
                let level = Math.floor(Math.pow(this.authUser.user.xp / 10, 1 / 3));
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
                // Calculate XP needed for next level using the same formula as level calculation
                // Level N requires N^3 * 10 XP, so next level requires (N+1)^3 * 10 XP
                const currentLevelXP = Math.pow(this.profileGetLevel, 3) * 10;
                const nextLevelXP = Math.pow(this.profileGetLevel + 1, 3) * 10;
                // Convert to display format: divide by 1000 to show as "X.XX"
                return (nextLevelXP - currentLevelXP) / 1000;
            },
            profileGetLevelProgress() {
                // Calculate progress: (current_xp - level_start_xp) / 1000
                // Level N starts at N^3 * 10 XP
                const currentLevelXP = Math.pow(this.profileGetLevel, 3) * 10;
                const progress = (this.authUser.user.xp - currentLevelXP) / 1000;
                // Ensure non-negative and round to 2 decimals
                return Math.max(0, Math.floor(progress * 100) / 100);
            },
            profileGetJoinDate() {
                if (!this.authUser.user || !this.authUser.user.createdAt) {
                    return 'N/A';
                }
                const date = new Date(this.authUser.user.createdAt);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
            }
        }
    }
</script>

<style scoped>
    .profile-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 24px 32px 24px;
    }

    .profile-header .header-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin-bottom: 32px;
    }

    .profile-header .user-avatar {
        width: 120px;
        height: 120px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 4px solid #fca311;
        padding: 4px;
        background: var(--bg-blue-dark);
    }

    .profile-header .user-avatar .avatar-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .profile-header .avatar-camera {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid #ffffff;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #ffffff;
        padding: 0;
        outline: none;
    }

    .profile-header .avatar-camera:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
    }

    .profile-header .avatar-camera svg {
        width: 18px;
        height: 18px;
        stroke: currentColor;
        fill: none;
    }

    .profile-header.header-blue .user-avatar {
       /* border-color: #559ee4; */
    }

    .profile-header.header-green .user-avatar {
        border-color: #b8e92d;
    }

    .profile-header.header-orange .user-avatar {
        border-color: #fca311;
    }

    .profile-header.header-red .user-avatar {
        border-color: #ff4e4e;
    }

    .profile-header.header-purple .user-avatar {
        border-color: #6953f1;
    }

    .profile-header .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .profile-header .info-username {
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        text-align: center;
    }

    .profile-header .info-username span {
        display: block;
    }

    .profile-header .info-level {
        font-size: 16px;
        font-weight: 700;
        color: #fca311;
        text-align: center;
    }

    .profile-header.header-blue .info-level {
       /* color: #559ee4; */
    }

    .profile-header.header-green .info-level {
        color: #b8e92d;
    }

    .profile-header.header-orange .info-level {
        color: #fca311;
    }

    .profile-header.header-red .info-level {
        color: #ff4e4e;
    }

    .profile-header.header-purple .info-level {
        color: #6953f1;
    }

    .profile-header .header-progress {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .profile-header .progress-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 120px;
    }

    .profile-header .progress-left {
        align-items: flex-start;
    }

    .profile-header .progress-right {
        align-items: flex-end;
        text-align: right;
    }

    .profile-header .progress-amount {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
    }

    .profile-header .progress-date {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
    }

    .profile-header .progress-level {
        font-size: 16px;
        font-weight: 700;
        color: #fca311;
    }

    .profile-header.header-blue .progress-level {
       /* color: #559ee4; */
    }

    .profile-header.header-green .progress-level {
        color: #b8e92d;
    }

    .profile-header.header-orange .progress-level {
        color: #fca311;
    }

    .profile-header.header-red .progress-level {
        color: #ff4e4e;
    }

    .profile-header.header-purple .progress-level {
        color: #6953f1;
    }

    .profile-header .progress-bar-container {
        flex: 1;
        display: flex;
        align-items: center;
    }

    .profile-header .progress-track {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        overflow: hidden;
    }

    .profile-header .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #fca311 0%, #ffd700 100%);
        border-radius: 6px;
        transition: width 0.5s ease;
    }

    .profile-header.header-blue .progress-bar {
       /* background: linear-gradient(90deg, #559ee4 0%, #a4d0ff 100%); */
    }

    .profile-header.header-green .progress-bar {
        background: linear-gradient(90deg, #b8e92d 0%, #e5ffa4 100%);
    }

    .profile-header.header-orange .progress-bar {
        background: linear-gradient(90deg, #fca311 0%, #ffd700 100%);
    }

    .profile-header.header-red .progress-bar {
        background: linear-gradient(90deg, #ff4e4e 0%, #ffa4a4 100%);
    }

    .profile-header.header-purple .progress-bar {
        background: linear-gradient(90deg, #6953f1 0%, #b5a4ff 100%);
    }

    @media only screen and (max-width: 768px) {
        .profile-header {
            padding: 32px 20px 24px 20px;
        }

        .profile-header .user-avatar {
            width: 100px;
            height: 100px;
        }

        .profile-header .avatar-camera {
            width: 32px;
            height: 32px;
            bottom: 6px;
            right: 6px;
        }

        .profile-header .avatar-camera svg {
            width: 16px;
            height: 16px;
        }

        .profile-header .info-username {
            font-size: 20px;
        }

        .profile-header .info-level {
            font-size: 14px;
        }

        .profile-header .header-progress {
            flex-direction: column;
            gap: 12px;
        }

        .profile-header .progress-info {
            width: 100%;
            min-width: auto;
        }

        .profile-header .progress-left,
        .profile-header .progress-right {
            align-items: flex-start;
            text-align: left;
        }

        .profile-header .progress-bar-container {
            width: 100%;
        }
    }

    @media only screen and (max-width: 480px) {
        .profile-header {
            padding: 24px 16px 20px 16px;
        }

        .profile-header .user-avatar {
            width: 80px;
            height: 80px;
        }

        .profile-header .avatar-camera {
            width: 28px;
            height: 28px;
            bottom: 4px;
            right: 4px;
        }

        .profile-header .avatar-camera svg {
            width: 14px;
            height: 14px;
        }

        .profile-header .info-username {
            font-size: 18px;
        }

        .profile-header .info-level {
            font-size: 13px;
        }

        .profile-header .progress-amount,
        .profile-header .progress-date {
            font-size: 12px;
        }

        .profile-header .progress-level {
            font-size: 14px;
        }

        .profile-header .progress-track {
            height: 10px;
        }
    }
</style>
