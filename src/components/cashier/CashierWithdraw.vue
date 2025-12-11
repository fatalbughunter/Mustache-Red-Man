<template>
    <div class="cashier-withdraw">
        <!-- Currency Selection Buttons (Tabs) -->
        <div class="withdraw-currency-selection">
            <div class="currency-title">Withdraw Currency</div>
            <div class="currency-buttons-scroll">
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
        </div>

        <!-- Choose Network -->
        <div v-if="selectedCurrency === 'usdt'" class="withdraw-network-selection">
            <div class="network-title">Choose Network</div>
            <div class="network-buttons">
                <button 
                    v-for="network in availableNetworks" 
                    :key="network.code"
                    @click="selectNetwork(network.code)"
                    class="network-button"
                    :class="{ 'network-active': selectedNetwork === network.code }"
                >
                    {{ network.name }}
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
                    <input v-model="withdrawAmount" @input="handleWithdrawAmountInput" @keypress="restrictToNumbers" type="text" placeholder="0.00" />
                </div>
            </div>
        </div>

        <!-- Amount Conversion -->
        <div class="withdraw-rate">
            <div class="rate-content">
                <div class="content-element element-crypto">
                    <div class="element-label">Amount in {{ selectedCurrency.toUpperCase() }}</div>
                    <transition name="fade" mode="out-in">
                        <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading"></div>
                        <div v-else class="element-content" key="data">
                            <img v-bind:src="getCurrencyIcon(selectedCurrency)" />
                            <input v-model="withdrawAmount" v-on:input="handleCryptoInput" @keypress="restrictToNumbers" type="text" />
                        </div>
                    </transition>
                </div>
                <span class="equals-sign">=</span>
                <div class="content-element">
                    <div class="element-label">Amount in USD</div>
                    <transition name="fade" mode="out-in">
                        <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading"></div>
                        <div v-else class="element-content" key="data">
                            <span class="currency-symbol">$</span>
                            <input v-model="withdrawFiatAmount" v-on:input="handleFiatInput" @keypress="restrictToNumbers" type="text" />
                        </div>
                    </transition>
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
                selectedCurrency: 'usdt',
                selectedNetwork: 'erc20',
                withdrawAddress: '',
                withdrawAmount: '',
                withdrawFiatAmount: '',
                availableCurrencies: [
                    { code: 'usdt', name: 'USDT', icon: 'usdt' },
                    { code: 'usdc', name: 'USDC', icon: 'usdc' },
                    { code: 'eth', name: 'ETH', icon: 'eth' },
                    { code: 'ltc', name: 'LTC', icon: 'ltc' },
                    { code: 'bnb', name: 'BNB', icon: 'bnb' },
                    { code: 'solana', name: 'SOL', icon: 'sol' },
                    { code: 'tron', name: 'TRON', icon: 'trx' }
                ],
                availableNetworks: [
                    { code: 'erc20', name: 'ERC20' },
                    { code: 'trc20', name: 'TRC20' },
                    { code: 'bep20', name: 'BEP20' }
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
                // If user has entered amounts, recalculate with new currency
                if (this.withdrawAmount && this.withdrawAmount !== '') {
                    this.$nextTick(() => {
                        const event = { target: { value: this.withdrawAmount } };
                        this.handleCryptoInput(event);
                    });
                } else if (this.withdrawFiatAmount && this.withdrawFiatAmount !== '') {
                    this.$nextTick(() => {
                        const event = { target: { value: this.withdrawFiatAmount } };
                        this.handleFiatInput(event);
                    });
                }
            },
            selectNetwork(networkCode) {
                this.selectedNetwork = networkCode;
                // Refresh crypto data when network changes
                if(this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                    const data = {};
                    this.cashierGetCryptoDataSocket(data);
                }
            },
            fetchCryptoData() {
                // Check if socket is available and connected
                if (!this.socketCashier) {
                    console.log('Withdraw - Socket not available yet, will retry');
                    // Retry after a short delay
                    setTimeout(() => this.fetchCryptoData(), 500);
                    return;
                }
                
                if (!this.socketCashier.connected) {
                    console.log('Withdraw - Socket not connected yet, will retry. Connected:', this.socketCashier.connected);
                    // Retry after a short delay
                    setTimeout(() => this.fetchCryptoData(), 500);
                    return;
                }
                
                // Fetch prices if not loaded or if loading is false
                if (!this.cashierCryptoData || !this.cashierCryptoData.prices || Object.keys(this.cashierCryptoData.prices || {}).length === 0) {
                    if (this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                        console.log('Withdraw - Fetching crypto data... Socket connected:', this.socketCashier.connected);
                        const data = {};
                        this.cashierGetCryptoDataSocket(data);
                    } else if (this.cashierCryptoData && this.cashierCryptoData.loading === true) {
                        console.log('Withdraw - Crypto data is already loading...');
                    } else {
                        console.log('Withdraw - Cannot fetch: cashierCryptoData:', this.cashierCryptoData);
                    }
                } else {
                    console.log('Withdraw - Prices already loaded:', Object.keys(this.cashierCryptoData.prices || {}));
                }
            },
            getCurrencyIcon(iconName) {
                try {
                    // Map currency codes to crypto payment images
                    const cryptoImageMap = {
                        'eth': 'ether',
                        'bnb': 'bnb',
                        'trx': 'trx',
                        'tron': 'trx',
                        'sol': 'solana',
                        'solana': 'solana',
                        'usdt': 'usdt',
                        'usdc': 'usdc'
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
            handleFiatInput(event) {
                // Get the input value and clean it - allow only numbers and decimal point
                let value = event.target.value.replace(/[^\d.]/g, '');
                // Prevent multiple decimal points
                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }
                this.withdrawFiatAmount = value;
                
                if (!value || value === '' || value === '.') {
                    this.withdrawAmount = '';
                    return;
                }
                
                const fiatAmount = parseFloat(value);
                if (isNaN(fiatAmount) || fiatAmount < 0) {
                    this.withdrawAmount = '';
                    return;
                }
                
                // USDT has 1:1 conversion rate with USD
                if (this.selectedCurrency === 'usdt') {
                    this.withdrawAmount = fiatAmount.toFixed(8);
                    return;
                }
                
                // USDC has 1:1.001001 conversion rate with USD (1 USDC = 1.001001 USD)
                if (this.selectedCurrency === 'usdc') {
                    this.withdrawAmount = parseFloat(fiatAmount / 1.001001).toFixed(8);
                    return;
                }
                
                // Apply conversion using price data
                // Check if prices are loaded and contain the selected currency
                if (!this.cashierCryptoData || !this.cashierCryptoData.prices) {
                    // Prices not loaded - try to fetch them
                    if (this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                        const data = {};
                        this.cashierGetCryptoDataSocket(data);
                    }
                    this.withdrawAmount = '';
                    return;
                }

                // Try different currency key formats
                let priceData = this.cashierCryptoData.prices[this.selectedCurrency];
                if (!priceData) {
                    // Try lowercase
                    priceData = this.cashierCryptoData.prices[this.selectedCurrency.toLowerCase()];
                }
                if (!priceData) {
                    // Try uppercase
                    priceData = this.cashierCryptoData.prices[this.selectedCurrency.toUpperCase()];
                }
                if (!priceData) {
                    this.withdrawAmount = '';
                    return;
                }

                // Use server rate for eth, bnb, solana, tron, ltc
                if (priceData && priceData.rate !== undefined && priceData.rate !== null && !isNaN(priceData.rate) && priceData.rate > 0 && fiatAmount > 0) {
                    // Use rate from server response: USD → Crypto: cryptoAmount = fiatAmount * rate
                    const cryptoAmount = parseFloat(fiatAmount * priceData.rate);
                    this.withdrawAmount = cryptoAmount.toFixed(8);
                } else if (priceData && priceData.price && !isNaN(priceData.price) && priceData.price > 0 && fiatAmount > 0) {
                    // Fallback to price calculation if rate is not available
                    const rate = priceData.price / 1000;
                    if (rate > 0) {
                        const cryptoAmount = parseFloat(fiatAmount * rate);
                        this.withdrawAmount = cryptoAmount.toFixed(8);
                    } else {
                        this.withdrawAmount = '';
                    }
                } else {
                    this.withdrawAmount = '';
                }
            },
            handleCryptoInput(event) {
                // Get the input value and clean it - allow only numbers and decimal point
                let value = event.target.value.replace(/[^\d.]/g, '');
                // Prevent multiple decimal points
                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }
                this.withdrawAmount = value;
                
                if (!value || value === '' || value === '.') {
                    this.withdrawFiatAmount = '';
                    return;
                }
                
                const cryptoAmount = parseFloat(value);
                if (isNaN(cryptoAmount) || cryptoAmount < 0) {
                    this.withdrawFiatAmount = '';
                    return;
                }
                
                // USDT has 1:1 conversion rate with USD
                if (this.selectedCurrency === 'usdt') {
                    this.withdrawFiatAmount = cryptoAmount.toFixed(8);
                    return;
                }
                
                // USDC has 1:1.001001 conversion rate with USD (1 USDC = 1.001001 USD)
                if (this.selectedCurrency === 'usdc') {
                    this.withdrawFiatAmount = parseFloat(cryptoAmount * 1.001001).toFixed(8);
                    return;
                }
                
                // Apply conversion using price data
                // Check if prices are loaded and contain the selected currency
                if (!this.cashierCryptoData || !this.cashierCryptoData.prices) {
                    // Prices not loaded - try to fetch them
                    if (this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                        const data = {};
                        this.cashierGetCryptoDataSocket(data);
                    }
                    this.withdrawFiatAmount = '';
                    return;
                }

                // Try different currency key formats
                let priceData = this.cashierCryptoData.prices[this.selectedCurrency];
                if (!priceData) {
                    // Try lowercase
                    priceData = this.cashierCryptoData.prices[this.selectedCurrency.toLowerCase()];
                }
                if (!priceData) {
                    // Try uppercase
                    priceData = this.cashierCryptoData.prices[this.selectedCurrency.toUpperCase()];
                }
                if (!priceData) {
                    this.withdrawFiatAmount = '';
                    return;
                }

                // Use server rate for eth, bnb, solana, tron, ltc
                if (priceData && priceData.rate !== undefined && priceData.rate !== null && !isNaN(priceData.rate) && priceData.rate > 0 && cryptoAmount > 0) {
                    // Use rate from server response
                    const fiatAmount = parseFloat(cryptoAmount * priceData.rate);
                    this.withdrawFiatAmount = fiatAmount.toFixed(8);
                } else if (priceData && priceData.price !== undefined && priceData.price !== null && !isNaN(priceData.price) && priceData.price > 0 && cryptoAmount > 0) {
                    // Fallback to price calculation if rate is not available
                    const price = priceData.price / 1000;
                    if (price > 0) {
                        const fiatAmount = parseFloat(cryptoAmount * price);
                        this.withdrawFiatAmount = fiatAmount.toFixed(8);
                    } else {
                        this.withdrawFiatAmount = '';
                    }
                } else {
                    this.withdrawFiatAmount = '';
                }
            },
            modalFiatInput() {
                // Keep for backward compatibility if needed
                this.handleFiatInput({ target: { value: this.withdrawFiatAmount } });
            },
            modalCryptoInput() {
                // Keep for backward compatibility if needed
                this.handleCryptoInput({ target: { value: this.withdrawAmount } });
            },
            handleWithdrawAmountInput(event) {
                // Get the input value and clean it - allow only numbers and decimal point
                let value = event.target.value.replace(/[^\d.]/g, '');
                // Prevent multiple decimal points
                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }
                this.withdrawAmount = value;
                
                // Trigger conversion to update USD amount
                // Create a synthetic event to pass to handleCryptoInput
                const syntheticEvent = { target: { value: value } };
                this.handleCryptoInput(syntheticEvent);
            },
            // Helper to restrict input to numbers only
            restrictToNumbers(event) {
                const char = String.fromCharCode(event.which);
                if (!/[0-9.]/.test(char)) {
                    event.preventDefault();
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
                'cashierCryptoData',
                'socketCashier'
            ]),
            canConfirm() {
                return this.withdrawAddress && this.withdrawAddress.trim() !== '' && 
                       this.withdrawAmount && parseFloat(this.withdrawAmount) > 0;
            }
        },
        created() {
            // Fetch crypto data on component creation
            this.fetchCryptoData();
        },
        mounted() {
            // Also fetch when component is mounted (in case socket wasn't ready in created)
            this.$nextTick(() => {
                this.fetchCryptoData();
            });
        },
        watch: {
            'cashierCryptoData.prices': {
                handler(newPrices, oldPrices) {
                    // Log when prices are loaded for debugging
                    if (newPrices && Object.keys(newPrices || {}).length > 0) {
                        console.log('Withdraw - Prices loaded! Available keys:', Object.keys(newPrices));
                        // If prices just loaded and user has entered amounts, recalculate
                        if (this.withdrawAmount && this.withdrawAmount !== '') {
                            this.$nextTick(() => {
                                const event = { target: { value: this.withdrawAmount } };
                                this.handleCryptoInput(event);
                            });
                        } else if (this.withdrawFiatAmount && this.withdrawFiatAmount !== '') {
                            this.$nextTick(() => {
                                const event = { target: { value: this.withdrawFiatAmount } };
                                this.handleFiatInput(event);
                            });
                        }
                    }
                },
                deep: true,
                immediate: true
            },
            selectedCurrency() {
                // Clear amounts when currency changes so user can input fresh
                this.withdrawAmount = '';
                this.withdrawFiatAmount = '';
            }
        }
    }
</script>

<style scoped>
    .cashier-withdraw {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    /* Currency Selection */
    .withdraw-currency-selection {
        width: 100%;
    }

    .currency-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        margin-bottom: 10px;
    }

    .currency-buttons-scroll {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 8px;
    }

    .currency-buttons-scroll::-webkit-scrollbar {
        height: 6px;
    }

    .currency-buttons-scroll::-webkit-scrollbar-track {
        background: var(--bg-tertiary);
        border-radius: 3px;
    }

    .currency-buttons-scroll::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
    }

    .currency-buttons-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
    }

    .currency-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: nowrap;
        min-width: max-content;
    }

    .currency-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 8px;
        background: var(--bg-blue-dark);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: var(--text-muted);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .currency-button img {
        width: 18px;
        height: 18px;
    }

    .currency-button:hover {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.05);
    }

    .currency-button.currency-active {
        background: var(--gradient-button-bg);
        border: 1px solid transparent;
        color: #131629;
    }

    .currency-button.currency-active:hover {
        background: var(--gradient-button-bg);
        border: 1px solid transparent;
        opacity: 0.9;
    }

    /* Network Selection */
    .withdraw-network-selection {
        width: 100%;
    }

    .network-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        margin-bottom: 10px;
    }

    .network-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .network-button {
        padding: 8px 18px;
        border-radius: 8px;
        background: var(--bg-blue-dark);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: var(--text-muted);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .network-button:hover {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.05);
    }

    .network-button.network-active {
        background: var(--gradient-button-bg);
        border: 1px solid transparent;
        color: #131629;
    }

    .network-button.network-active:hover {
        background: var(--gradient-button-bg);
        opacity: 0.9;
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
        background: var(--bg-blue-chat);
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
        background: var(--bg-blue-chat);
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
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .equals-sign {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-secondary);
        flex-shrink: 0;
    }

    .content-element {
        flex: 1;
        min-width: 140px;
    }

    .element-label {
        font-size: 11px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 6px;
    }

    .element-loading {
        width: 100%;
        height: 50px;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background: var(--bg-tertiary);
    }

    .element-loading::after {
        width: 100%;
        height: 100%;
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        animation-name: loading_animation;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
    }

    .element-content {
        width: 100%;
        height: 45px;
        position: relative;
        display: flex;
        align-items: center;
        background: var(--bg-blue-chat);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 0 12px 0 40px;
        overflow: hidden;
    }

    .element-content input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 13px;
        font-weight: 600;
        outline: none;
    }

    .element-content img,
    .element-content .currency-symbol {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .element-content .currency-symbol {
        font-size: 14px;
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
        background: var(--gradient-button-bg);
        border: none;
        border-radius: 8px;
        color: #131629;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
    }

    .confirm-button:hover:not(:disabled) {
        background: var(--gradient-button-bg);
        opacity: 0.9;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(236, 173, 70, 0.4);
    }

    .confirm-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @keyframes loading_animation {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    @media only screen and (max-width: 750px) {
        .cashier-withdraw {
            gap: 12px;
        }

        .rate-content {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
        }

        .equals-sign {
            display: none;
        }

        .content-element {
            min-width: 0;
            width: 100%;
        }

        .element-content {
            padding: 0 10px 0 40px;
        }

        .element-content input {
            font-size: 12px;
        }
    }
</style>
