<template>
    <div class="cashier-tip">
        <div class="tip-input">
            <input v-model="tipAmount" v-on:input="validateInput" type="text" placeholder="TIP AMOUNT" />
            <img src="@/assets/img/icons/coin.svg" alt="coin" />
            <button v-on:click="tipButton" class="button-tip" :disabled="socketSendLoading === 'UserTip' || !canTip">
                <div class="button-inner">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading v-if="socketSendLoading === 'UserTip'" key="loading" />
                        <div v-else class="inner-content" key="content">TIP</div>
                    </transition>
                </div>
            </button>
        </div>
        <div class="tip-info">
            Please note that this action is irreversible and you are the only one responsible. We cannot and will not refund any tips, therefore double check your tip amount and verify who you are tipping to.
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import ButtonLoading from '@/components/ButtonLoading';

    export default {
        name: 'CashierTip',
        components: {
            ButtonLoading
        },
        data() {
            return {
                tipAmount: null
            }
        },
        methods: {
            ...mapActions([
                'notificationShow',
                'userSendUserTipSocket'
            ]),
            validateInput() {
                this.tipAmount = this.tipAmount.replace(/[^\d.]/g, '');
            },
            tipButton() {
                const amount = Math.floor(this.tipAmount * 1000);

                if(amount === undefined || isNaN(amount) === true || amount < 10) {
                    this.notificationShow({ type: 'error', message: 'Your entered tip amount is invalid.' });
                    return;
                }

                if(!this.modalsData || !this.modalsData.userId) {
                    this.notificationShow({ type: 'error', message: 'No user selected for tipping.' });
                    return;
                }

                const data = { receiverId: this.modalsData.userId, amount: amount };
                this.userSendUserTipSocket(data);
                this.tipAmount = null;
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading',
                'modalsData'
            ]),
            canTip() {
                return this.tipAmount && parseFloat(this.tipAmount) >= 0.01;
            }
        }
    }
</script>

<style scoped>
    .cashier-tip {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .tip-input {
        width: 100%;
        height: 60px;
        position: relative;
        border-radius: 8px;
        background: var(--bg-blue-chat);
        border: 1px solid rgba(212, 165, 116, 0.3);
        padding: 0 100px 0 50px;
        display: flex;
        align-items: center;
    }

    .tip-input input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
        outline: none;
    }

    .tip-input input::placeholder {
        color: var(--text-muted);
    }

    .tip-input img {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
    }

    .tip-input button.button-tip {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
    }

    .tip-input button.button-tip:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .tip-input button.button-tip .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--gradient-button-bg);
        border-radius: 8px;
    }

    .tip-input button.button-tip .inner-content {
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
    }

    .tip-info {
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

