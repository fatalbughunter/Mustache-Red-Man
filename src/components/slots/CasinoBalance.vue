<template>
    <div class="balance-display">
        <div class="balance-container">
            <div class="balance-section">
                <label class="balance-label">Balance</label>
                <div class="balance-value">{{ formatBalance(displayBalance) }}</div>
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
        ...mapGetters('slots', ['lastTransaction']),
        ...mapGetters(['authUser']),
        displayBalance() {
            // Always use main balance (USDT 1:1)
            return this.authUser.user?.balance || 0;
        }
    },
    methods: {
        formatBalance(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount || 0);
        }
    }
};
</script>

<style scoped>
.balance-display {
    background: var(--accent-blue-dark);
    border: 2px solid var(--accent-yellow);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.balance-container {
    display: flex;
    justify-content: center;
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
    font-size: 24px;
    font-weight: 700;
    color: var(--color-copper);
    font-family: 'Monaco', 'Courier New', monospace;
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
    .balance-display {
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-md);
    }

    .balance-container {
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
    }

    .balance-divider {
        display: none;
    }

    .balance-value {
        font-size: 20px;
    }

    .balance-value.total {
        grid-column: 1 / -1;
    }

    .balance-label {
        font-size: 11px;
    }

    .last-transaction {
        flex-direction: column;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm);
        font-size: 13px;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .balance-display {
        padding: 12px;
        margin-bottom: 12px;
    }

    .balance-value {
        font-size: 18px;
    }

    .balance-label {
        font-size: 10px;
    }

    .last-transaction {
        font-size: 12px;
        padding: 10px;
    }
}
</style>
