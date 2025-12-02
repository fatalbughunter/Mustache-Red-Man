<template>
    <div class="cashier-crypto-deposit">
        <!-- Currency Selection Buttons -->
        <div class="deposit-currency-selection">
            <div class="currency-title">Deposit Currency</div>
            <div class="currency-buttons">
                <button 
                    v-for="currency in availableCurrencies" 
                    :key="currency.code"
                    @click="selectCurrency(currency.code)"
                    class="currency-button"
                    :class="{ 'currency-active': modalsData.currency === currency.code }"
                >
                    <img v-if="currency.icon" :src="getCurrencyIcon(currency.icon)" :alt="currency.name" @error="handleImageError" />
                    <span>{{ currency.name }}</span>
                </button>
            </div>
        </div>

        <!-- Deposit Address -->
        <div class="deposit-address">
            <div class="address-title">Deposit Address</div>
            <div class="address-input">
                <transition name="fade" mode="out-in">
                    <div v-if="cashierCryptoData.loading === true" class="input-loading" key="loading"></div>
                    <div v-else class="input-content" key="data">
                        <input v-model="cashierCryptoData.addresses[modalsData.currency]" type="text" readonly />
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
                    <QRCode v-bind:value="cashierCryptoData.addresses[modalsData.currency]" v-bind:options="{ width: 200, height: 200, margin: 1 }" />
                </div>
            </transition>
        </div>

        <!-- Notice Section -->
        <div class="deposit-notice">
            <div class="notice-title">NOTICE</div>
            <div class="notice-content">
                Send only {{ cashierGetCurrencyName }} to this deposit address. Crypto will be deposited automatically after network confirmations. Smart contract addresses are not supported (Contact us).
            </div>
        </div>

        <!-- Amount Conversion -->
        <div class="deposit-rate">
            <div class="rate-content">
                <div class="content-element">
                    <div class="element-label">Amount in USD</div>
                    <transition name="fade" mode="out-in">
                        <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading"></div>
                        <div v-else class="element-content" key="data">
                            <span class="currency-symbol">$</span>
                            <input v-model="cashierFiatAmount" v-on:input="modalFiatInput" type="text" />
                        </div>
                    </transition>
                </div>
                <span class="equals-sign">=</span>
                <div class="content-element element-crypto">
                    <div class="element-label">Amount in {{ modalsData.currency.toUpperCase() }}</div>
                    <transition name="fade" mode="out-in">
                        <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading"></div>
                        <div v-else class="element-content" key="data">
                            <img v-bind:src="getCurrencyIcon(modalsData.currency)" />
                            <input v-model="cashierCryptoAmount" v-on:input="modalCryptoInput" type="text" />
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import QRCode from '@/components/QRCode';

    export default {
        name: 'CashierCryptoDeposit',
        components: {
            QRCode
        },
        data() {
            return {
                cashierCryptoAmount: 0,
                cashierCoinAmount: 0,
                cashierFiatAmount: 0,
                availableCurrencies: [
                    { code: 'eth', name: 'ETH', icon: 'eth' },
                    { code: 'bnb', name: 'BNB', icon: 'bnb' },
                    { code: 'trx', name: 'TRX', icon: 'trx' },
                    { code: 'sol', name: 'SOL', icon: 'sol' }
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
            modalCoinInput() {
                this.cashierFiatAmount = parseFloat((this.cashierCoinAmount / 1000) * 3).toFixed(2);
                this.cashierCryptoAmount = parseFloat(1 / (this.cashierCryptoData.prices[this.modalsData.currency].price / 1000) * this.cashierFiatAmount).toFixed(8);
            },
            modalFiatInput() {
                this.cashierCoinAmount = parseFloat((this.cashierFiatAmount / 3) * 1000).toFixed(2);;
                this.cashierCryptoAmount = parseFloat(1 / (this.cashierCryptoData.prices[this.modalsData.currency].price / 1000) * this.cashierFiatAmount).toFixed(8)
            },
            modalCryptoInput() {
                this.cashierFiatAmount = parseFloat(this.cashierCryptoAmount * (this.cashierCryptoData.prices[this.modalsData.currency].price / 1000)).toFixed(2);
                this.cashierCoinAmount = parseFloat((this.cashierFiatAmount / 3) * 1000).toFixed(2);
            },
            modalCopyButton() {
                const el = document.createElement('textarea');
                el.value = this.cashierCryptoData.addresses[this.modalsData.currency];
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
            },
            selectCurrency(currencyCode) {
                this.modalsSetData({ typeCashier: 'deposit', currency: currencyCode });
                // Refresh crypto data for new currency
                if(this.cashierCryptoData.loading === false) {
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
            }
        },
        computed: {
            ...mapGetters([
                'modalsShow', 
                'modalsData', 
                'cashierCryptoData'
            ]),
            cashierGetName() {
                let name = this.modalsData.currency.toUpperCase();

                if(this.modalsData.currency === 'eth') {
                    name = 'Ethereum';
                } else if(this.modalsData.currency === 'bnb') {
                    name = 'Binance Coin';
                } else if(this.modalsData.currency === 'trx') {
                    name = 'Tron';
                } else if(this.modalsData.currency === 'sol') {
                    name = 'Solana';
                }

                return name;
            },
            cashierGetCurrencyName() {
                return this.modalsData.currency.toUpperCase();
            },
            cashierGetConfirmations() {
                let confirmations = 12;

                if(this.modalsData.currency === 'eth') {
                    confirmations = 12;
                } else if(this.modalsData.currency === 'bnb') {
                    confirmations = 12;
                } else if(this.modalsData.currency === 'trx') {
                    confirmations = 20;
                } else if(this.modalsData.currency === 'sol') {
                    confirmations = 32;
                }

                return confirmations;
            }
        },
        watch: {
            'cashierCryptoData.prices': {
                handler() {
                    this.cashierCoinAmount = parseFloat((100 / 3) * 1000).toFixed(2);
                    this.cashierFiatAmount = parseFloat(100).toFixed(2);
                    this.cashierCryptoAmount = parseFloat(1 / (this.cashierCryptoData.prices[this.modalsData.currency].price / 1000) * 100).toFixed(8);
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .cashier-crypto-deposit {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    /* Currency Selection */
    .deposit-currency-selection {
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

    /* Deposit Address */
    .deposit-address {
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

    .input-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 50px 0 20px;
    }

    .input-content input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 14px;
        font-weight: 600;
        outline: none;
    }

    .copy-button {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        transition: color 0.3s ease;
    }

    .copy-button:hover {
        color: var(--accent-copper-light);
    }

    .copy-button svg {
        width: 16px;
        height: 16px;
    }

    /* QR Code */
    .deposit-qrcode {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .qrcode-loading {
        width: 200px;
        height: 200px;
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
        width: 200px;
        height: 200px;
        padding: 10px;
        background: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
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

    /* Amount Conversion */
    .deposit-rate {
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