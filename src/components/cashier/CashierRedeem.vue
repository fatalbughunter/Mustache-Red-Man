<template>
    <div class="cashier-redeem">
        <div class="redeem-input">
            <input v-model="giftCode" type="text" placeholder="ENTER YOUR GIFTCARD CODE" />
            <button v-on:click="redeemButton" :disabled="socketSendLoading === 'GiftRedeem'">
                <div class="button-inner">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading v-if="socketSendLoading === 'GiftRedeem'" key="loading" />
                        <div v-else class="inner-content" key="content">REDEEM</div>
                    </transition>
                </div>
            </button>
        </div>
        <div class="redeem-info">
            Enter your gift card code to redeem it and add balance to your account.
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
                giftCode: null
            }
        },
        methods: {
            ...mapActions([
                'notificationShow',
                'cashierSendGiftRedeemSocket'
            ]),
            redeemButton() {
                if(this.giftCode === null || this.giftCode.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Your entered gift code is invalid.' });
                    return;
                }

                const data = { code: this.giftCode.replaceAll('-', '') };
                this.cashierSendGiftRedeemSocket(data);
                this.giftCode = null;
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading'
            ])
        }
    }
</script>

<style scoped>
    .cashier-redeem {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .redeem-input {
        width: 100%;
        height: 60px;
        position: relative;
        border-radius: 8px;
        background: var(--bg-blue-chat);
        border: 1px solid rgba(212, 165, 116, 0.3);
        padding: 0 150px 0 20px;
        display: flex;
        align-items: center;
    }

    .redeem-input input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
        outline: none;
    }

    .redeem-input input::placeholder {
        color: var(--text-muted);
    }

    .redeem-input button {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 130px;
        height: 40px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
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
        border-radius: 8px;
    }

    .redeem-input button .inner-content {
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
    }

    .redeem-info {
        padding: 15px 20px;
        border-radius: 8px;
        background: rgba(255, 193, 7, 0.15);
        border: 1px solid rgba(255, 193, 7, 0.3);
        font-size: 12px;
        color: #ffc107;
        line-height: 1.5;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>

