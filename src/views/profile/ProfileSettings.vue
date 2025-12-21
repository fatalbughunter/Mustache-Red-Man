<template>
    <div class="profile-settings">
        <div class="settings-section">
            <div class="section-head">
                <div class="head-name">SETTING</div>
                <div class="head-action">ACTION</div>
            </div>
            <div class="section-content">
                <ProfileSettingsElement name="CHANGE AVATAR">
                    <input ref="avatarInput" type="file" accept="image/*" style="display: none" @change="handleAvatarChange" />
                    <button v-on:click="triggerAvatarUpload" class="button-link button-avatar" v-bind:disabled="authSendLoginLoading === true">
                        <div class="button-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                            </svg>
                            CHANGE AVATAR
                        </div>
                    </button>
                </ProfileSettingsElement>
                <ProfileSettingsElement name="ANONYMOUS MODE">
                    <button v-on:click="userToggleAnonymous" class="button-toggle" v-bind:class="{ 
                        'button-active': authUser.user.anonymous === true 
                    }" v-bind:disabled="socketSendLoading !== null">
                        <span class="toggle-slider"></span>
                    </button>
                </ProfileSettingsElement>
                <ProfileSettingsElement name="SOUND VOLUME">
                    <div class="volume-control">
                        <svg class="volume-icon" :class="{ 'muted': userVolume < 0.01 }" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path v-if="userVolume >= 0.5" d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path v-else-if="userVolume >= 0.01" d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path v-else d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input v-model="userVolume" v-on:input="soundSetVolume(userVolume)" type="range" min="0" max="1" step="0.01" class="volume-slider">
                        <span class="volume-value">{{ Math.round(userVolume * 100) }}%</span>
                    </div>
                </ProfileSettingsElement>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ProfileSettingsElement from '@/components/profile/ProfileSettingsElement';

    export default {
        name: 'ProfileSettings',
        components: {
            ProfileSettingsElement
        },
        data() {
            return {
                userVolume: 1,
                userShowEmail: false,
                userShowRoblox: false
            }
        },
        methods: {
            ...mapActions([
                'notificationShow', 
                'soundSetVolume',
                'modalsSetShow',
                'userSendUserAnonymousSocket',  
                'userSendUserDiscordSocket',
                'authSendCredentialsRequest',
                'authUploadAvatar'
            ]),
            userToggleAnonymous() {
                const data = { anonymous: !this.authUser.user.anonymous };
                this.userSendUserAnonymousSocket(data);
            },
            userToggleShowEmail() {
                this.userShowEmail = !this.userShowEmail;
            },
            userToggleShowRoblox() {
                this.userShowRoblox = !this.userShowRoblox;
            },
            userVerifyButton() {
                const data = { type: 'verify', email: this.authUser.user.local.email };
                this.authSendCredentialsRequest(data);
            },
            triggerAvatarUpload() {
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
                'soundVolume',
                'authSendLoginLoading',
                'socketSendLoading',
                'authUser' 
            ]),
        },
        created() {
            this.userVolume = this.soundVolume;
        }
    }
</script>

<style scoped>
    .profile-settings {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-settings .settings-section {
        width: 100%;
        margin-top: 25px;
    }

    .profile-settings .settings-section:first-child {
        margin-top: 0;
    }

    .profile-settings .section-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px 16px 24px;
        border-bottom: 1px solid rgba(184, 115, 51, 0.2);
        margin-bottom: 16px;
    }

    .profile-settings .head-name,
    .profile-settings .head-action {
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .profile-settings .section-content {
        width: 100%;
    }

    /* Toggle Switch */
    .profile-settings .profile-settings-element button.button-toggle {
        width: 52px;
        height: 28px;
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .profile-settings .profile-settings-element button.button-toggle:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .profile-settings .profile-settings-element button.button-toggle .toggle-slider {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 2px;
        left: 2px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .profile-settings .profile-settings-element button.button-toggle.button-active {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 100%);
        border-color: rgba(16, 185, 129, 0.5);
    }

    .profile-settings .profile-settings-element button.button-toggle.button-active .toggle-slider {
        transform: translateX(24px);
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .profile-settings .profile-settings-element button.button-toggle:hover:not(:disabled) {
        border-color: rgba(255, 255, 255, 0.3);
    }

    .profile-settings .profile-settings-element button.button-toggle.button-active:hover:not(:disabled) {
        border-color: rgba(16, 185, 129, 0.7);
    }

    /* Volume Control */
    .volume-control {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .volume-icon {
        color: #b87333;
        flex-shrink: 0;
    }

    .volume-icon.muted {
        color: rgba(255, 255, 255, 0.3);
    }

    .volume-value {
        min-width: 45px;
        font-size: 13px;
        font-weight: 600;
        color: #b87333;
        text-align: right;
    }

    .volume-slider {
        width: 150px;
        height: 6px;
        -webkit-appearance: none;
        appearance: none;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        outline: none;
        cursor: pointer;
    }

    .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        background: linear-gradient(135deg, #b87333 0%, #8b5a2b 100%);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .volume-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 10px rgba(184, 115, 51, 0.4);
    }

    .volume-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        background: linear-gradient(135deg, #b87333 0%, #8b5a2b 100%);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .volume-slider::-moz-range-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        height: 6px;
    }

    /* Button Link */
    .profile-settings .profile-settings-element button.button-link,
    .profile-settings .profile-settings-element button.button-verify {
        height: 36px;
    }

    .profile-settings .profile-settings-element button.button-link {
        width: auto;
    }

    .profile-settings .profile-settings-element button.button-verify {
        margin-right: 8px;
    }

    .profile-settings .profile-settings-element button.button-link .button-inner,
    .profile-settings .profile-settings-element button.button-verify .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        font-size: 12px;
        font-weight: 600;
        color: #ffffff;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-radius: 8px;
        border: 1px solid rgba(184, 115, 51, 0.3);
        transition: all 0.3s ease;
        gap: 8px;
    }
    
    .profile-settings .profile-settings-element button.button-link:hover .button-inner,
    .profile-settings .profile-settings-element button.button-verify:hover .button-inner {
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.3) 0%, rgba(139, 90, 43, 0.2) 100%);
        border-color: rgba(184, 115, 51, 0.5);
        transform: translateY(-1px);
    }

    .profile-settings .profile-settings-element button.button-link.button-avatar:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .profile-settings .profile-settings-element button.button-link .button-inner svg {
        width: 14px;
        height: 14px;
        fill: #b87333;
    }

    .profile-settings .profile-settings-element .element-info {
        min-width: 150px;
        height: 36px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 36px 0 14px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .profile-settings .profile-settings-element .element-info span {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .profile-settings .profile-settings-element .element-info button {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%);
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s ease;
    }

    .profile-settings .profile-settings-element .element-info button:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .profile-settings .profile-settings-element .element-info button svg {
        fill: rgba(255, 255, 255, 0.5);
        transition: fill 0.3s ease;
    }

    .profile-settings .profile-settings-element .element-info button:hover svg {
        fill: #b87333;
    }

    @media only screen and (max-width: 550px) {
        .volume-control {
            gap: 8px;
        }

        .volume-slider {
            width: 100px;
        }

        .volume-value {
            min-width: 40px;
            font-size: 12px;
        }

        .profile-settings .profile-settings-element button.button-link .button-inner {
            padding: 0 14px;
            font-size: 11px;
        }
    }

    @media only screen and (max-width: 450px) {
        .volume-slider {
            width: 80px;
        }

        .volume-icon {
            display: none;
        }
    }
</style>
