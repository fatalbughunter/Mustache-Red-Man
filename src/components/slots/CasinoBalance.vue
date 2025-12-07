<template>
    <div class="balance-display">
        <div class="balance-container">
            <div class="balance-section">
                <label class="balance-label">Real Balance</label>
                <div class="balance-value">{{ formatBalance(userBalance.realBalance) }}</div>
                <input 
                    type="radio" 
                    name="balance-type" 
                    value="realBalance"
                    :checked="selectedBalanceType === 'realBalance'"
                    @change="selectBalance('realBalance')"
                    class="balance-radio"
                />
            </div>
            <div class="balance-divider"></div>
            <div class="balance-section">
                <label class="balance-label">Test Balance</label>
                <div class="balance-value">{{ formatBalance(userBalance.testBalance) }}</div>
                <input 
                    type="radio" 
                    name="balance-type" 
                    value="testBalance"
                    :checked="selectedBalanceType === 'testBalance'"
                    @change="selectBalance('testBalance')"
                    class="balance-radio"
                />
            </div>
            <div class="balance-divider"></div>
            <div class="balance-section">
                <label class="balance-label">Total</label>
                <div class="balance-value total">{{ formatBalance(userBalance.totalBalance) }}</div>
            </div>
        </div>
        <div v-if="lastTransaction" class="last-transaction">
            <span class="transaction-label">Last:</span>
            <span :class="`transaction-${lastTransaction.transactionType}`">
                {{ lastTransaction.transactionType.toUpperCase() }} 
                {{ formatBalance(lastTransaction.winAmount || lastTransaction.betAmount) }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CasinoBalance',
    computed: {
        ...mapGetters('slots', ['userBalance', 'selectedBalanceType', 'lastTransaction'])
    },
    methods: {
        ...mapActions('slots', ['setSelectedBalanceType']),
        
        formatBalance(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount || 0);
        },
        
        selectBalance(balanceType) {
            this.setSelectedBalanceType(balanceType);
        }
    }
};
</script>

<style scoped>
.balance-display {
    background: linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(184, 115, 51, 0.1) 100%);
    border: 2px solid rgba(212, 165, 116, 0.3);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.balance-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    gap: var(--spacing-md);
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.balance-section {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
}

.balance-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.balance-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-copper);
    font-family: 'Monaco', 'Courier New', monospace;
}

.balance-value.total {
    font-size: 20px;
    color: #2ecc71;
    text-shadow: 0 0 10px rgba(46, 204, 113, 0.5);
}

.balance-radio {
    cursor: pointer;
    width: 18px;
    height: 18px;
    accent-color: var(--color-copper);
}

.balance-divider {
    width: 1px;
    height: 60px;
    background: rgba(212, 165, 116, 0.2);
}

.last-transaction {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(0, 0, 0, 0.3);
    border-radius: var(--radius-md);
    font-size: 14px;
}

.transaction-label {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
}

.transaction-debit {
    color: #ff6b6b;
}

.transaction-credit {
    color: #51cf66;
}

.transaction-debit_credit {
    color: var(--color-copper);
}

@media (max-width: 768px) {
    .balance-container {
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
    }

    .balance-divider {
        display: none;
    }

    .balance-value {
        font-size: 14px;
    }

    .balance-value.total {
        grid-column: 1 / -1;
    }

    .last-transaction {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
}
</style>
