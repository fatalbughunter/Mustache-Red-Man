<template>
    <div class="cashier-redeem">
        <!-- Affiliate Code Section - DISABLED -->
        <div class="redeem-section section-disabled">
            <div class="section-title">Affiliate Code <span class="coming-soon">(Coming Soon)</span></div>
            <div class="section-info">
                Enter a code shared by our partners to claim rewards.    
            </div>
            <div class="redeem-input input-disabled">
                <input v-model="affiliateCode" type="text" placeholder="ENTER AFFILIATE CODE" disabled />
                <button disabled>
                    <div class="button-inner">
                        <div class="inner-content">CLAIM</div>
                    </div>
                </button>
            </div>
        </div>

        <!-- Promo Code Section -->
        <div class="redeem-section">
            <div class="section-title">Promotional Code</div>
            <div class="section-info">
                Find promo codes through social media, emails, and more.'
            </div>
            <div class="redeem-input">
                <input v-model="promoCode" type="text" placeholder="ENTER PROMO CODE" />
                <button v-on:click="redeemPromoButton" :disabled="socketSendLoading === 'GeneralPromoClaim'">
                    <div class="button-inner">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'GeneralPromoClaim'" key="loading" />
                            <div v-else class="inner-content" key="content">CLAIM</div>
                        </transition>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ButtonLoading from '@/components/ButtonLoading';

    export default {
        name: 'CashierRedeem',
        components: {
            ButtonLoading
        },
        data() {
            return {
                affiliateCode: null,
                promoCode: null
            }
        },
        methods: {
            ...mapActions([
                'notificationShow',
                'modalsSetShow',
                'modalsSetData',
                'affiliatesSendClaimCodeSocket',
                'generalSendPromoClaimSocket'
            ]),
            redeemAffiliateButton() {
                if(!this.authenticated) {
                    this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                    return;
                }

                if(this.affiliateCode === null || this.affiliateCode.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Your entered affiliate code is invalid.' });
                    return;
                }

                // Show captcha modal for affiliate code
                this.modalsSetData({ typeCaptcha: 'affiliatesClaim', data: { code: this.affiliateCode.trim() } });
                this.modalsSetShow('Captcha');
                this.affiliateCode = null;
            },
            redeemPromoButton() {
                if(!this.authenticated) {
                    this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                    return;
                }

                if(this.promoCode === null || this.promoCode.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Your entered promo code is invalid.' });
                    return;
                }

                // Show captcha modal for promo code
                this.modalsSetData({ typeCaptcha: 'promoClaim', data: { code: this.promoCode.trim() } });
                this.modalsSetShow('Captcha');
                this.promoCode = null;
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading',
                'authenticated'
            ])
        }
    }
</script>

<style scoped>
    .cashier-redeem {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .redeem-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .redeem-section:first-child {
        margin-top: 0;
    }

    .section-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 6px;
        letter-spacing: 0.3px;
    }

    .section-title .coming-soon {
        font-size: 11px;
        font-weight: 600;
        color: #ffc107;
        margin-left: 8px;
        padding: 2px 8px;
        background: rgba(255, 193, 7, 0.15);
        border-radius: 4px;
    }

    .section-disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
    }

    .section-info {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 4px;
    }

    .section-info .highlight-code {
        font-weight: 700;
        color: var(--text-gold);
    }

    .redeem-input {
        width: 100%;
        height: 56px;
        position: relative;
        border-radius: 8px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(212, 165, 116, 0.2);
        padding: 0 140px 0 18px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
    }

    .redeem-input:hover:not(.input-disabled) {
        border-color: rgba(212, 165, 116, 0.4);
        background: rgba(15, 23, 42, 0.8);
    }

    .redeem-input input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 13px;
        font-weight: 600;
        outline: none;
    }

    .redeem-input input:disabled {
        cursor: not-allowed;
        color: var(--text-muted);
    }

    .redeem-input input::placeholder {
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 500;
    }

    .redeem-input.input-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .redeem-input button {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 120px;
        height: 40px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s ease;
    }

    .redeem-input button:hover:not(:disabled) {
        transform: translateY(-50%) scale(1.02);
    }

    .redeem-input button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .redeem-input button .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--gradient-button-bg);
        border-radius: 6px;
    }

    .redeem-input button .inner-content {
        font-size: 13px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 0.5px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    @media only screen and (max-width: 768px) {
        .cashier-redeem {
            gap: 22px;
        }

        .redeem-input {
            padding: 0 125px 0 15px;
            height: 52px;
        }

        .redeem-input button {
            width: 110px;
            height: 38px;
        }

        .section-title {
            font-size: 14px;
        }

        .section-info {
            font-size: 11px;
        }
    }

    @media only screen and (max-width: 480px) {
        .cashier-redeem {
            gap: 20px;
        }

        .redeem-input {
            padding: 0 110px 0 12px;
            height: 50px;
        }

        .redeem-input input {
            font-size: 12px;
        }

        .redeem-input button {
            width: 95px;
            height: 36px;
        }

        .redeem-input button .inner-content {
            font-size: 12px;
        }

        .section-title {
            font-size: 13px;
        }

        .section-info {
            font-size: 11px;
        }
    }
</style>

