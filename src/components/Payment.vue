<template>
    <div class="payment-section">
        <div class="image-container"></div>
        <div class="payment-content">
            <div class="payment-title">Fast & Secure Crypto Payments</div>
            <div class="payment-subtitle">Fund your account instantly using Ethereum, Binance Coin, Tron, Solana, USDT, or USDC.</div>
            <div class="payment-methods">
                <div class="payment-method" title="ETH" @click="openDepositModal">
                    <div class="payment-card">
                        <img src="@/assets/img/payments/crypto/ether.png" alt="ETH" />
                    </div>
                </div>
                <div class="payment-method" title="BNB" @click="openDepositModal">
                    <div class="payment-card">
                        <img src="@/assets/img/payments/crypto/bnb.png" alt="BNB" />
                    </div>
                </div>
                <div class="payment-method" title="TRX" @click="openDepositModal">
                    <div class="payment-card">
                        <img src="@/assets/img/payments/crypto/trx.png" alt="TRX" />
                    </div>
                </div>
                <div class="payment-method" title="SOL" @click="openDepositModal">
                    <div class="payment-card">
                        <img src="@/assets/img/payments/crypto/solana.png" alt="SOL" />
                    </div>
                </div>
                <div class="payment-method" title="USDT" @click="openDepositModal">
                    <div class="payment-card">
                        <img src="@/assets/img/payments/crypto/usdt.png" alt="USDT" />
                    </div>
                </div>
                <div class="payment-method" title="USDC" @click="openDepositModal">
                    <div class="payment-card">
                        <img src="@/assets/img/payments/crypto/usdc.png" alt="USDC" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Payment',
    methods: {
        ...mapActions([
            'modalsSetShow',
            'modalsSetData'
        ]),
        openDepositModal() {
            this.modalsSetData({ typeCashier: 'deposit' });
            this.modalsSetShow('Cashier');
        }
    }
}
</script>

<style scoped>
.payment-section {
   /*  width: 100%;
   padding: var(--spacing-2xl) 0;   */
    margin: 0 100px 0 100px; 
    min-height: 259px;
    border-radius: 25px;
    position: relative;
    overflow: hidden;
}

.image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/banner/paymentGateway.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
}

.payment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 64px 32px 0 32px;
/*gap: var(--spacing-lg);*/
    position: relative;
    z-index: 2;
}

.payment-title {
    background: var(--gradient-main-txt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-family: 'Anton SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: 0%;
   /* margin-bottom: var(--spacing-md);*/
    text-align: left;
    align-self: flex-start;
}

.payment-subtitle {
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0%;
    text-align: left;
  /*  margin-bottom: var(--spacing-lg);*/
    max-width: 600px;
}

.payment-methods {
    display: flex;
    justify-content: center;
    align-items: center;
  /*  gap: var(--spacing-md); */
    flex-wrap: wrap;
    align-self: center;
    width: 100%;
}

.payment-method {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.payment-method:hover {
    transform: translateY(-5px);
}

.payment-card {
    width: 80px;
    height: 60px;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.payment-method:hover .payment-card {
    transform: scale(1.1);
  /*  background: rgba(255, 255, 255, 0.1);*/
}

.payment-card img {
    max-width: 100%;
    max-height: 40px;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
}

/* Tablet styles (1024px and below) */
@media only screen and (max-width: 1024px) {
    .payment-section {
        margin: 12px var(--spacing-lg) 12px var(--spacing-lg);
        min-height: auto;
    }

    .payment-content {
        padding: var(--spacing-lg);
    }

    .payment-title {
        font-size: 28px;
    }

    .payment-subtitle {
        font-size: 15px;
        line-height: 22px;
        max-width: 100%;
    }
}

/* Tablet and small tablet (768px and below) */
@media only screen and (max-width: 768px) {
    .payment-section {
        margin: 12px var(--spacing-md) 12px var(--spacing-md);
        min-height: auto;
        padding: var(--spacing-lg) 0;
    }

    .image-container {
        background-size: contain;
        background-position: center top;
    }

    .payment-content {
        padding: var(--spacing-md) var(--spacing-lg);
        gap: var(--spacing-md);
    }

    .payment-title {
        font-size: 24px;
        margin-bottom: var(--spacing-xs);
        width: 100%;
    }

    .payment-subtitle {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: var(--spacing-md);
        max-width: 100%;
        width: 100%;
    }

    .payment-methods {
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
    }

    .payment-card {
        width: 70px;
        height: 50px;
        padding: 6px;
    }

    .payment-card img {
        max-height: 35px;
    }
}

/* Mobile styles (450px and below) */
@media only screen and (max-width: 450px) {
    .payment-section {
        margin: 0;
        border-radius: 0;
        min-height: auto;
        padding: var(--spacing-md) 0;
    }

    .image-container {
        background-size: contain;
        background-position: center top;
        height: 100%;
    }

    .payment-content {
        padding: var(--spacing-md);
        gap: var(--spacing-sm);
    }

    .payment-title {
        font-size: 20px;
        margin-bottom: var(--spacing-xs);
        width: 100%;
    }

    .payment-subtitle {
        font-size: 12px;
        line-height: 18px;
        margin-bottom: var(--spacing-sm);
        max-width: 100%;
        width: 100%;
    }

    .payment-methods {
        gap: var(--spacing-xs);
        margin-top: var(--spacing-xs);
        justify-content: space-around;
        width: 100%;
    }

    .payment-card {
        width: 60px;
        height: 45px;
        padding: 5px;
        flex-shrink: 0;
    }

    .payment-card img {
        max-height: 30px;
    }
}
</style>

