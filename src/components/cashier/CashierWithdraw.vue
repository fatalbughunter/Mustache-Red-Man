<template>
    <div class="cashier-withdraw">
        <!-- Currency Selection Buttons (Tabs) -->
        <div class="withdraw-currency-selection">
            <div class="currency-title">Withdraw Currency</div>
            <div class="currency-buttons">
                <button 
                    v-for="currency in availableCurrencies" 
                    :key="currency.code"
                    @click="selectCurrency(currency.code)"
                    class="currency-button"
                    :class="{ 'currency-active': selectedCurrency === currency.code }"
                >
                    <img v-if="currency.icon" :src="getCurrencyIcon(currency.icon)" :alt="currency.name" @error="handleImageError" />
                    <span>{{ currency.name }}</span>
                </button>
            </div>
        </div>

        <!-- Withdraw Address -->
        <div class="withdraw-address">
            <div class="address-title">Withdraw Address</div>
            <div class="address-input">
                <input v-model="withdrawAddress" type="text" placeholder="Enter your withdrawal address" />
            </div>
        </div>

        <!-- Withdraw Amount -->
        <div class="withdraw-amount">
            <div class="amount-title">Withdraw Amount</div>
            <div class="amount-input">
                <div class="amount-content">
                    <img v-bind:src="getCurrencyIcon(selectedCurrency)" />
                    <input v-model="withdrawAmount" type="text" placeholder="0.00" />
                </div>
            </div>
        </div>

        <!-- Amount Conversion -->
        <div class="withdraw-rate">
            <div class="rate-content">
                <div class="content-element">
                    <div class="element-label">Amount in {{ selectedCurrency.toUpperCase() }}</div>
                    <div class="element-content">
                        <img v-bind:src="getCurrencyIcon(selectedCurrency)" />
                        <input v-model="withdrawAmount" v-on:input="modalCryptoInput" type="text" />
                    </div>
                </div>
                <span class="equals-sign">=</span>
                <div class="content-element">
                    <div class="element-label">Amount in USD</div>
                    <div class="element-content">
                        <span class="currency-symbol">$</span>
                        <input v-model="withdrawFiatAmount" v-on:input="modalFiatInput" type="text" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm Button -->
        <div class="withdraw-confirm">
            <button @click="handleConfirm" class="confirm-button" :disabled="!canConfirm">
                Confirm
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'CashierWithdraw',
        data() {
            return {
                selectedCurrency: 'eth',
                withdrawAddress: '',
                withdrawAmount: '',
                withdrawFiatAmount: '',
                availableCurrencies: [
                    { code: 'eth', name: 'ETH', icon: 'eth' },
                    { code: 'bnb', name: 'BNB', icon: 'bnb' }
                ]
            }
        },
        methods: {
            ...mapActions([
                'modalsSetShow', 
                'modalsSetData',
                'notificationShow',
                'cashierGetCryptoDataSocket'
            ]),
            selectCurrency(currencyCode) {
                this.selectedCurrency = currencyCode;
                // Refresh crypto data for new currency
                if(this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                    const data = {};
                    this.cashierGetCryptoDataSocket(data);
                }
            },
            getCurrencyIcon(iconName) {
                try {
                    // Map currency codes to crypto payment images
                    const cryptoImageMap = {
                        'eth': 'ether',
                        'bnb': 'bnb',
                        'trx': 'trx',
                        'sol': 'solana'
                    };
                    
                    if (cryptoImageMap[iconName]) {
                        return require('@/assets/img/payments/crypto/' + cryptoImageMap[iconName] + '.png');
                    }
                    
                    // Fallback to cashier directory
                    return require('@/assets/img/cashier/' + iconName + '.png');
                } catch (e) {
                    return null;
                }
            },
            handleImageError(event) {
                event.target.style.display = 'none';
            },
            modalFiatInput() {
                if(this.cashierCryptoData && this.cashierCryptoData.prices && this.cashierCryptoData.prices[this.selectedCurrency]) {
                    const price = this.cashierCryptoData.prices[this.selectedCurrency].price / 1000;
                    this.withdrawAmount = parseFloat(this.withdrawFiatAmount / price).toFixed(8);
                }
            },
            modalCryptoInput() {
                if(this.cashierCryptoData && this.cashierCryptoData.prices && this.cashierCryptoData.prices[this.selectedCurrency]) {
                    const price = this.cashierCryptoData.prices[this.selectedCurrency].price / 1000;
                    this.withdrawFiatAmount = parseFloat(this.withdrawAmount * price).toFixed(2);
                }
            },
            handleConfirm() {
                if(!this.withdrawAddress || this.withdrawAddress.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Please enter a withdrawal address.' });
                    return;
                }
                if(!this.withdrawAmount || parseFloat(this.withdrawAmount) <= 0) {
                    this.notificationShow({ type: 'error', message: 'Please enter a valid withdrawal amount.' });
                    return;
                }
                // Handle withdrawal confirmation
                this.notificationShow({ type: 'success', message: 'Withdrawal request submitted.' });
            }
        },
        computed: {
            ...mapGetters([
                'generalSettings',
                'cashierCryptoData'
            ]),
            canConfirm() {
                return this.withdrawAddress && this.withdrawAddress.trim() !== '' && 
                       this.withdrawAmount && parseFloat(this.withdrawAmount) > 0;
            }
        },
        created() {
            // Initialize with default currency and fetch crypto data
            if(this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                const data = {};
                this.cashierGetCryptoDataSocket(data);
            }
        }
    }
</script>

<style scoped>
    .cashier-withdraw {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    /* Currency Selection */
    .withdraw-currency-selection {
        width: 100%;
    }

    .currency-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 15px;
    }

    .currency-buttons {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }

    .currency-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 8px;
        background: var(--bg-tertiary);
        border: 1px solid rgba(212, 165, 116, 0.3);
        color: var(--text-secondary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .currency-button img {
        width: 24px;
        height: 24px;
    }

    .currency-button:hover {
        border-color: var(--accent-copper-light);
        background: rgba(212, 165, 116, 0.1);
    }

    .currency-button.currency-active {
        background: var(--accent-red);
        border-color: var(--accent-red);
        color: white;
    }

    .currency-button.currency-active:hover {
        background: var(--accent-deep-red);
        border-color: var(--accent-deep-red);
    }

    /* Withdraw Address */
    .withdraw-address {
        width: 100%;
    }

    .address-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 12px;
    }

    .address-input {
        width: 100%;
        height: 60px;
        border-radius: 8px;
        background: var(--bg-tertiary);
        border: 1px solid rgba(212, 165, 116, 0.3);
        position: relative;
    }

    .address-input input {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
        outline: none;
    }

    .address-input input::placeholder {
        color: var(--text-muted);
    }

    /* Withdraw Amount */
    .withdraw-amount {
        width: 100%;
    }

    .amount-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 12px;
    }

    .amount-input {
        width: 100%;
        height: 60px;
        border-radius: 8px;
        background: var(--bg-tertiary);
        border: 1px solid rgba(212, 165, 116, 0.3);
        position: relative;
    }

    .amount-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px 0 50px;
    }

    .amount-content img {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
    }

    .amount-content input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
        outline: none;
    }

    .amount-content input::placeholder {
        color: var(--text-muted);
    }

    /* Amount Conversion */
    .withdraw-rate {
        width: 100%;
    }

    .rate-content {
        display: flex;
        align-items: flex-end;
        gap: 15px;
        flex-wrap: wrap;
    }

    .equals-sign {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }

    .content-element {
        flex: 1;
        min-width: 200px;
    }

    .element-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 8px;
    }

    .element-content {
        width: 100%;
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        background: var(--bg-tertiary);
        border: 1px solid rgba(212, 165, 116, 0.3);
        border-radius: 8px;
        padding: 0 12px 0 44px;
    }

    .element-content input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
        outline: none;
    }

    .element-content img,
    .element-content .currency-symbol {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
    }

    .element-content .currency-symbol {
        font-size: 16px;
        font-weight: 700;
        color: var(--accent-copper-light);
        width: auto;
        height: auto;
    }

    /* Confirm Button */
    .withdraw-confirm {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    .confirm-button {
        padding: 12px 48px;
        background: var(--accent-red);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
    }

    .confirm-button:hover:not(:disabled) {
        background: var(--accent-deep-red);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(220, 20, 60, 0.4);
    }

    .confirm-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media only screen and (max-width: 750px) {
        .rate-content {
            flex-direction: column;
            align-items: stretch;
        }

        .equals-sign {
            display: none;
        }

        .content-element {
            width: 100%;
        }
    }
</style>
