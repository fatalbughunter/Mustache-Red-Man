<template>
    <div class="cashier-deposit">
        <!-- Currency Selection Buttons (Tabs) -->
        <div class="deposit-currency-selection">
            <div class="currency-title">Deposit Currency</div>
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
        <div v-if="selectedCurrency === 'usdt'" class="deposit-network-selection">
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

        <!-- Deposit Address -->
        <div class="deposit-address">
            <div class="address-title">
                <img :src="getCurrencyIcon(selectedCurrency)" alt="currency" class="title-icon" />
                <span>Deposit Address</span>
            </div>
            <div class="address-input">
                <transition name="fade" mode="out-in">
                    <div v-if="cashierCryptoData.loading === true" class="input-loading" key="loading"></div>
                    <div v-else class="input-content" key="data">
                        <input v-model="depositAddress" type="text" readonly />
                        <button v-on:click="modalCopyButton()" class="copy-button">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                <path d="M3 11V4C3 2.89543 3.89543 2 5 2H11" stroke="currentColor" stroke-width="1.5" fill="none"/>
                            </svg>
                        </button>
                    </div>
                </transition>
            </div>
        </div>

        <!-- QR Code -->
        <div class="deposit-qrcode">
            <transition name="fade" mode="out-in">
                <div v-if="cashierCryptoData.loading === true" class="qrcode-loading" key="loading"></div>
                <div v-else class="qrcode-content" key="data">
                    <QRCode v-bind:value="depositAddress" v-bind:options="{ width: 180, height: 180, margin: 1 }" />
                </div>
            </transition>
        </div>

        <!-- Amount Conversion -->
        <div class="deposit-rate">
            <div class="rate-content">
                <div class="content-element">
                    <div class="element-label">Amount in USD</div>
                    <div class="element-content">
                        <span class="currency-symbol">$</span>
                        <input :value="cashierFiatAmount" @input="handleFiatInput" @keypress="restrictToNumbers" type="text" />
                    </div>
                </div>
                <span class="equals-sign">=</span>
                <div class="content-element element-crypto">
                    <div class="element-label">Amount in {{ selectedCurrency.toUpperCase() }}</div>
                    <div class="element-content">
                        <img v-bind:src="getCurrencyIcon(selectedCurrency)" />
                        <input :value="cashierCryptoAmount" @input="handleCryptoInput" @keypress="restrictToNumbers" type="text" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Notice Section -->
        <div class="deposit-notice">
            <div class="notice-title">NOTICE</div>
            <div class="notice-content">
                Send only {{ selectedCurrency.toUpperCase() }} to this deposit address. Crypto will be deposited automatically after network confirmations. Smart contract addresses are not supported (Contact us).
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import QRCode from '@/components/QRCode';

    export default {
        name: 'CashierDeposit',
        components: {
            QRCode
        },
        data() {
            return {
                selectedCurrency: 'usdt',
                selectedNetwork: 'erc20',
                cashierCryptoAmount: '',
                cashierCoinAmount: '',
                cashierFiatAmount: '',
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
                'notificationShow',
                'modalsSetShow', 
                'modalsSetData',
                'cashierGetCryptoDataSocket'
            ]),
            fetchCryptoData() {
                // Check if socket is available and connected
                if (!this.socketCashier) {
                    console.log('Deposit - Socket not available yet, will retry');
                    // Retry after a short delay
                    setTimeout(() => this.fetchCryptoData(), 500);
                    return;
                }
                
                if (!this.socketCashier.connected) {
                    console.log('Deposit - Socket not connected yet, will retry. Connected:', this.socketCashier.connected);
                    // Retry after a short delay
                    setTimeout(() => this.fetchCryptoData(), 500);
                    return;
                }
                
                // Fetch prices if not loaded or if loading is false
                if (!this.cashierCryptoData || !this.cashierCryptoData.prices || Object.keys(this.cashierCryptoData.prices || {}).length === 0) {
                    if (this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                        console.log('Deposit - Fetching crypto data... Socket connected:', this.socketCashier.connected);
                        const data = {};
                        this.cashierGetCryptoDataSocket(data);
                    } else if (this.cashierCryptoData && this.cashierCryptoData.loading === true) {
                        console.log('Deposit - Crypto data is already loading...');
                    } else {
                        console.log('Deposit - Cannot fetch: cashierCryptoData:', this.cashierCryptoData);
                    }
                } else {
                    console.log('Deposit - Prices already loaded:', Object.keys(this.cashierCryptoData.prices || {}));
                }
            },
            selectCurrency(currencyCode) {
                this.selectedCurrency = currencyCode;
                // Refresh crypto data for new currency
                if(this.cashierCryptoData && this.cashierCryptoData.loading === false) {
                    const data = {};
                    this.cashierGetCryptoDataSocket(data);
                }
                // If user has entered amounts, recalculate with new currency
                if (this.cashierCryptoAmount && this.cashierCryptoAmount !== '') {
                    this.$nextTick(() => {
                        const event = { target: { value: this.cashierCryptoAmount } };
                        this.handleCryptoInput(event);
                    });
                } else if (this.cashierFiatAmount && this.cashierFiatAmount !== '') {
                    this.$nextTick(() => {
                        const event = { target: { value: this.cashierFiatAmount } };
                        this.handleFiatInput(event);
                    });
                }
            },
            selectNetwork(networkCode) {
                this.selectedNetwork = networkCode;
                // Refresh crypto data when network changes
                if(this.cashierCryptoData.loading === false) {
                    const data = {};
                    this.cashierGetCryptoDataSocket(data);
                }
            },
            modalCopyButton() {
                const el = document.createElement('textarea');
                el.value = this.depositAddress;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
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
                this.cashierFiatAmount = value;
                
                if (!value || value === '' || value === '.') {
                    this.cashierCryptoAmount = '';
                    this.cashierCoinAmount = '';
                    return;
                }
                
                const fiatAmount = parseFloat(value);
                if (isNaN(fiatAmount) || fiatAmount < 0) {
                    this.cashierCryptoAmount = '';
                    this.cashierCoinAmount = '';
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
                    this.cashierCryptoAmount = '';
                    this.cashierCoinAmount = '';
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
                    // Log available keys for debugging
                    console.log('Deposit Fiat - Available price keys:', Object.keys(this.cashierCryptoData.prices));
                    console.log('Deposit Fiat - Looking for currency:', this.selectedCurrency);
                    this.cashierCryptoAmount = '';
                    this.cashierCoinAmount = '';
                    return;
                }

                if (priceData && priceData.price && !isNaN(priceData.price) && priceData.price > 0 && fiatAmount > 0) {
                    const price = priceData.price / 1000;
                    if (price > 0) {
                        const cryptoAmount = parseFloat(fiatAmount / price);
                        this.cashierCryptoAmount = cryptoAmount.toFixed(8);
                        this.cashierCoinAmount = parseFloat((fiatAmount / 3) * 1000).toFixed(2);
                    } else {
                        this.cashierCryptoAmount = '';
                        this.cashierCoinAmount = '';
                    }
                } else {
                    this.cashierCryptoAmount = '';
                    this.cashierCoinAmount = '';
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
                this.cashierCryptoAmount = value;
                
                if (!value || value === '' || value === '.') {
                    this.cashierFiatAmount = '';
                    this.cashierCoinAmount = '';
                    return;
                }
                
                const cryptoAmount = parseFloat(value);
                if (isNaN(cryptoAmount) || cryptoAmount < 0) {
                    this.cashierFiatAmount = '';
                    this.cashierCoinAmount = '';
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
                    this.cashierFiatAmount = '';
                    this.cashierCoinAmount = '';
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
                    // Log available keys for debugging
                    console.log('Deposit Crypto - Available price keys:', Object.keys(this.cashierCryptoData.prices));
                    console.log('Deposit Crypto - Looking for currency:', this.selectedCurrency);
                    this.cashierFiatAmount = '';
                    this.cashierCoinAmount = '';
                    return;
                }

                if (priceData && priceData.price !== undefined && priceData.price !== null && !isNaN(priceData.price) && priceData.price > 0 && cryptoAmount > 0) {
                    const price = priceData.price / 1000;
                    if (price > 0) {
                        const fiatAmount = parseFloat(cryptoAmount * price);
                        this.cashierFiatAmount = fiatAmount.toFixed(2);
                        this.cashierCoinAmount = parseFloat((fiatAmount / 3) * 1000).toFixed(2);
                    } else {
                        this.cashierFiatAmount = '';
                        this.cashierCoinAmount = '';
                    }
                } else {
                    this.cashierFiatAmount = '';
                    this.cashierCoinAmount = '';
                }
            },
            modalFiatInput() {
                // Keep for backward compatibility if needed
                this.handleFiatInput({ target: { value: this.cashierFiatAmount } });
            },
            modalCryptoInput() {
                // Keep for backward compatibility if needed
                this.handleCryptoInput({ target: { value: this.cashierCryptoAmount } });
            },
            // Helper to restrict input to numbers only
            restrictToNumbers(event) {
                const char = String.fromCharCode(event.which);
                if (!/[0-9.]/.test(char)) {
                    event.preventDefault();
                }
            }
        },
        computed: {
            ...mapGetters([
                'generalSettings',
                'socketSendLoading',
                'cashierCryptoData',
                'socketCashier'
            ]),
            depositAddress() {
                if (!this.cashierCryptoData.addresses) {
                    return '';
                }

                // For USDT with different networks, use the corresponding base currency address
                if (this.selectedCurrency === 'usdt') {
                    if (this.selectedNetwork === 'erc20') {
                        // USDT/ERC20 uses ETH address (Ethereum network)
                        return this.cashierCryptoData.addresses['eth'] || '';
                    } else if (this.selectedNetwork === 'trc20') {
                        // USDT/TRC20 uses TRON address (TRON network)
                        return this.cashierCryptoData.addresses['tron'] || this.cashierCryptoData.addresses['trx'] || '';
                    } else if (this.selectedNetwork === 'bep20') {
                        // USDT/BEP20 uses BNB address (Binance Smart Chain network)
                        return this.cashierCryptoData.addresses['bnb'] || '';
                    }
                }
                
                // USDC uses BNB address (Binance Smart Chain network)
                if (this.selectedCurrency === 'usdc') {
                    return this.cashierCryptoData.addresses['bnb'] || '';
                }
                
                // For other cases, use the currency's own address
                return this.cashierCryptoData.addresses[this.selectedCurrency] || '';
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
                        console.log('Deposit - Prices loaded! Available keys:', Object.keys(newPrices));
                        // If prices just loaded and user has entered amounts, recalculate
                        if (this.cashierFiatAmount && this.cashierFiatAmount !== '') {
                            this.$nextTick(() => {
                                const event = { target: { value: this.cashierFiatAmount } };
                                this.handleFiatInput(event);
                            });
                        } else if (this.cashierCryptoAmount && this.cashierCryptoAmount !== '') {
                            this.$nextTick(() => {
                                const event = { target: { value: this.cashierCryptoAmount } };
                                this.handleCryptoInput(event);
                            });
                        }
                    }
                },
                deep: true,
                immediate: true
            },
            selectedCurrency() {
                // Clear amounts when currency changes so user can input fresh
                this.cashierFiatAmount = '';
                this.cashierCryptoAmount = '';
                this.cashierCoinAmount = '';
            }
        }
    }
</script>

<style scoped>
    .cashier-deposit {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    /* Currency Selection */
    .deposit-currency-selection {
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
    .deposit-network-selection {
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

    /* Deposit Address */
    .deposit-address {
        width: 100%;
    }

    .address-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .address-title .title-icon {
        width: 16px;
        height: 16px;
    }

    .address-input {
        width: 100%;
        height: 50px;
        border-radius: 8px;
        background: var(--bg-blue-chat);
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
    }

    .input-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 45px 0 15px;
    }

    .input-content input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 12px;
        font-weight: 500;
        outline: none;
    }

    .copy-button {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--text-muted);
        transition: color 0.3s ease;
    }

    .copy-button:hover {
        color: var(--text-primary);
    }

    .copy-button svg {
        width: 14px;
        height: 14px;
    }

    /* QR Code */
    .deposit-qrcode {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0;
    }

    .qrcode-loading {
        width: 180px;
        height: 180px;
        position: relative;
        overflow: hidden;
        background: var(--bg-tertiary);
        border-radius: 8px;
    }

    .qrcode-loading::after {
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
        background: linear-gradient(to right, #dddddd 0%, #aaaaaa 50%, #dddddd 100%);
    }

    .qrcode-content {
        width: 180px;
        height: 180px;
        padding: 8px;
        background: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Amount Conversion */
    .deposit-rate {
        width: 100%;
    }

    .rate-content {
        display: flex;
        align-items: flex-end;
        gap: 15px;
        flex-wrap: nowrap;
    }

    .equals-sign {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 8px;
        flex-shrink: 0;
    }

    .content-element {
        flex: 1;
        min-width: 0;
    }

    .element-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 8px;
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
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        background: var(--bg-blue-chat);
        border: 1px solid rgba(255, 255, 255, 0.2);
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

    /* Notice Section */
    .deposit-notice {
        width: 100%;
        padding: 15px 20px;
        border-radius: 8px;
        background: rgba(255, 193, 7, 0.15);
        border: 1px solid rgba(255, 193, 7, 0.3);
    }

    .notice-title {
        font-size: 14px;
        font-weight: 700;
        color: #ffc107;
        margin-bottom: 8px;
    }

    .notice-content {
        font-size: 12px;
        color: #ffc107;
        line-height: 1.5;
    }

    /* Remove amount conversion styles - no longer needed */


    .input-loading {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: var(--bg-tertiary);
    }

    .input-loading::after {
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
        .rate-content {
            gap: 8px;
        }

        .equals-sign {
            font-size: 14px;
        }

        .content-element {
            min-width: 0;
        }

        .element-content {
            padding: 0 10px 0 40px;
        }

        .element-content input {
            font-size: 12px;
        }
    }

</style>
