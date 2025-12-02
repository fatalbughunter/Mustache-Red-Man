<template>
    <div class="modal-captcha">
        <div class="captcha-title">
            <span class="gradient-green">COMPLETE CAPTCHA</span>
        </div>
        <div class="captcha-content">
            <!-- Captcha bypassed for development -->
            <div class="captcha-bypass">
                <p>Captcha verification bypassed</p>
                <button @click="modalOnVerify('dev-bypass-token')" class="bypass-button">
                    Continue
                </button>
            </div>
           
            <VueHcaptcha 
                ref="modalCaptcha" 
                v-bind:sitekey="modalCaptchaKey" 
                @verify="modalOnVerify" 
                @expired="modalOnExpire"
                @challengeExpired="modalOnExpire"
            />
            
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

    export default {
        name: 'ModalTip',
        components: {
            VueHcaptcha
        },
        data() {
            return {
                modalCaptchaKey: process.env.VUE_APP_HCAPTCHA_KEY
            }
        },
        methods: {
            ...mapActions([
                'modalsSetShow', 
                'authSendCredentialsLogin',
                'authSendCredentialsRegister',
                'authSendCredentialsRequest',
                'authSendCredentialsReset',
                'affiliatesSendClaimCodeSocket', 
                'generalSendPromoClaimSocket', 
                'cashierSendGiftRedeemSocket', 
                'generalSendRainJoinSocket'
            ]),
            modalOnVerify(token, eKey) {
                const data = { ...this.modalsData.data, captcha: token };

                if(this.modalsData.typeCaptcha === 'credentialsLogin') {
                    this.authSendCredentialsLogin(data);
                } else if(this.modalsData.typeCaptcha === 'credentialsRegister') {
                    this.authSendCredentialsRegister(data);
                } else if(this.modalsData.typeCaptcha === 'credentialsRequest') {
                    this.authSendCredentialsRequest(data);
                } else if(this.modalsData.typeCaptcha === 'credentialsReset') {
                    this.authSendCredentialsReset(data);
                } else if(this.modalsData.typeCaptcha === 'affiliatesClaim') {
                    this.affiliatesSendClaimCodeSocket(data);
                } else if(this.modalsData.typeCaptcha === 'promoClaim') {
                    this.generalSendPromoClaimSocket(data);
                } else if(this.modalsData.typeCaptcha === 'giftRedeem') {
                    this.cashierSendGiftRedeemSocket(data);
                } else if(this.modalsData.typeCaptcha === 'rainJoin') {
                    this.generalSendRainJoinSocket(data);
                }

                this.modalsSetShow(null);
            },
            modalOnExpire() {
                this.modalsSetShow(null);
            }
        },
        computed: {
            ...mapGetters([ 
                'modalsData'
            ])
        },
        mounted() {
            // Auto-bypass captcha after a short delay for better UX
            //setTimeout(() => {
            //    this.modalOnVerify('dev-bypass-token');
            //}, 1000);
        }
    }
</script>

<style scoped>
    .modal-captcha {
        width: 773px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 35px 0 48px 0;
        border-radius: 15px;
        background: var(--bg-primary);
    }

    .modal-captcha .captcha-title {
        text-align: center;
        font-size: 32px;
        font-weight: 900;
    }

    .modal-captcha .captcha-content {
        width: 100%;
        max-width: 500px;
        margin-top: 35px;
        padding: 0 20px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .modal-captcha .captcha-content >>> iframe {
        border-radius: 4px;
    }

    .captcha-bypass {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .captcha-bypass p {
        margin: 0;
        font-size: 14px;
    }

    .bypass-button {
        background: var(--accent-red);
        border: none;
        border-radius: 4px;
        padding: 10px 24px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .bypass-button:hover {
        background: var(--accent-deep-red);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(220, 20, 60, 0.4);
    }

    @media only screen and (max-width: 793px) {

        .modal-captcha {
            width: calc(100vw - 20px);
            padding: 85px 20px 48px 20px;
        }

    }
</style>
