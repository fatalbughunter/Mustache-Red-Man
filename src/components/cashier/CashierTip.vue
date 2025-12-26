<template>
    <div class="cashier-tip">
        <!-- User Selection -->
        <div class="tip-user-selection">
            <div class="user-title">User Name</div>
            <div class="user-input">
                <input 
                    v-model="tipUsername" 
                    type="text" 
                    placeholder="Enter username" 
                />
            </div>
        </div>

        <!-- Amount Input -->
        <div class="tip-amount-section">
            <div class="amount-title">Amount</div>
            <div class="amount-input">
                <input v-model="tipAmount" v-on:input="validateInput" type="text" placeholder="$1" />
                <img src="@/assets/img/icons/coin.svg" alt="coin" />
            </div>
        </div>

        <!-- Don't show in chat toggle -->
        <div class="tip-privacy">
            <label class="privacy-toggle">
                <input type="checkbox" v-model="hideInChat" />
                <span class="toggle-slider"></span>
                <span class="toggle-label">Don't show this tip in the Chat</span>
            </label>
        </div>

        <!-- Send Button -->
        <div class="tip-button-section">
            <button v-on:click="tipButton" class="button-send-tip" :disabled="socketSendLoading === 'UserTip' || !canTip">
                <div class="button-inner">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading v-if="socketSendLoading === 'UserTip'" key="loading" />
                        <div v-else class="inner-content" key="content">Send Tip</div>
                    </transition>
                </div>
            </button>
        </div>

        <!-- Warning Info -->
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
                tipUsername: '',
                tipAmount: null,
                hideInChat: false
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
                const amount = parseFloat(this.tipAmount);

                if(amount === undefined || isNaN(amount) === true || amount < 1) {
                    this.notificationShow({ type: 'error', message: 'Your entered tip amount is invalid. Minimum tip is $1 USD.' });
                    return;
                }

                if(!this.tipUsername || this.tipUsername.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Please enter a username.' });
                    return;
                }

                // Send tip with username - backend will handle user lookup and validation
                const data = { 
                    receiverId: this.tipUsername.trim(), 
                    amount: amount,
                    hideInChat: this.hideInChat
                };
                
                // Send tip - modal will close and show notification on success/error
                this.userSendUserTipSocket(data);
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading',
                'modalsData'
            ]),
            canTip() {
                return this.tipAmount && parseFloat(this.tipAmount) >= 1 && this.tipUsername && this.tipUsername.trim() !== '';
            }
        }
    }
</script>

<style scoped>
    .cashier-tip {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    /* User Selection */
    .tip-user-selection {
        width: 100%;
    }

    .user-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 10px;
        letter-spacing: 0.3px;
    }

    .user-input {
        width: 100%;
        height: 56px;
        border-radius: 8px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(212, 165, 116, 0.2);
        position: relative;
        transition: all 0.3s ease;
    }

    .user-input:hover {
        border-color: rgba(212, 165, 116, 0.4);
        background: rgba(15, 23, 42, 0.8);
    }

    .user-input input {
        width: 100%;
        height: 100%;
        padding: 0 18px;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 13px;
        font-weight: 600;
        outline: none;
    }

    .user-input input::placeholder {
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 500;
    }

    /* Amount Section */
    .tip-amount-section {
        width: 100%;
    }

    .amount-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 10px;
        letter-spacing: 0.3px;
    }

    .amount-input {
        width: 100%;
        height: 56px;
        position: relative;
        border-radius: 8px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(212, 165, 116, 0.2);
        padding: 0 18px 0 50px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
    }

    .amount-input:hover {
        border-color: rgba(212, 165, 116, 0.4);
        background: rgba(15, 23, 42, 0.8);
    }

    .amount-input input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 13px;
        font-weight: 600;
        outline: none;
    }

    .amount-input input::placeholder {
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 500;
    }

    .amount-input img {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
    }

    /* Privacy Toggle */
    .tip-privacy {
        width: 100%;
        padding: 8px 0;
    }

    .privacy-toggle {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
    }

    .privacy-toggle input[type="checkbox"] {
        display: none;
    }

    .toggle-slider {
        position: relative;
        width: 44px;
        height: 24px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 24px;
        transition: all 0.3s ease;
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .toggle-slider::before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: white;
        top: 3px;
        left: 3px;
        transition: transform 0.3s ease;
    }

    .privacy-toggle input[type="checkbox"]:checked + .toggle-slider {
        background: var(--gradient-button-bg);
    }

    .privacy-toggle input[type="checkbox"]:checked + .toggle-slider::before {
        transform: translateX(18px);
    }

    .toggle-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-primary);
        letter-spacing: 0.2px;
    }

    /* Send Button */
    .tip-button-section {
        width: 100%;
        margin-top: 12px;
    }

    .button-send-tip {
        width: 100%;
        height: 48px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s ease;
    }

    .button-send-tip:hover:not(:disabled) {
        transform: scale(1.01);
    }

    .button-send-tip:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .button-send-tip .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--gradient-button-bg);
        border-radius: 8px;
    }

    .button-send-tip .inner-content {
        font-size: 14px;
        font-weight: 700;
        color: #131629;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    /* Info Section */
    .tip-info {
        padding: 14px 16px;
        border-radius: 8px;
        background: rgba(255, 193, 7, 0.1);
        border: 1px solid rgba(255, 193, 7, 0.25);
        font-size: 11px;
        font-weight: 500;
        color: #ffc107;
        line-height: 1.6;
        margin-top: 8px;
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
        .cashier-tip {
            gap: 16px;
        }

        .user-title,
        .amount-title {
            font-size: 14px;
        }

        .user-input,
        .amount-input {
            height: 52px;
        }

        .button-send-tip {
            height: 46px;
        }

        .tip-info {
            padding: 12px 15px;
            font-size: 11px;
        }
    }

    @media only screen and (max-width: 480px) {
        .cashier-tip {
            gap: 14px;
        }

        .user-title,
        .amount-title {
            font-size: 13px;
            margin-bottom: 8px;
        }

        .user-input,
        .amount-input {
            height: 50px;
        }

        .user-input input,
        .amount-input input {
            font-size: 12px;
            padding: 0 15px;
        }

        .amount-input {
            padding-left: 45px;
        }

        .button-send-tip {
            height: 44px;
        }

        .button-send-tip .inner-content {
            font-size: 13px;
        }

        .toggle-label {
            font-size: 11px;
        }

        .tip-info {
            padding: 12px 14px;
            font-size: 10px;
        }
    }
</style>

