<template>
    <div class="transaction-history">
        <div class="history-header">
            <h3 class="history-title">Transaction History</h3>
            <div class="filter-controls">
                <select v-model="filterType" class="filter-select">
                    <option value="">All Transactions</option>
                    <option value="debit">Bets</option>
                    <option value="credit">Wins</option>
                    <option value="debit_credit">Transfers</option>
                </select>
                <button @click="loadMore" class="load-more-btn" :disabled="loadingMore">
                    {{ loadingMore ? 'Loading...' : 'Load More' }}
                </button>
            </div>
        </div>

        <div v-if="!transactions || transactions.length === 0" class="no-transactions">
            <p>No transactions yet</p>
        </div>

        <div v-else class="transactions-list">
            <!-- Desktop Table View -->
            <div class="desktop-view">
                <table class="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Game</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Before</th>
                            <th>After</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="txn in filteredTransactions" 
                            :key="txn._id"
                            class="transaction-row"
                            :class="txn.txnType"
                        >
                            <td class="date-cell">
                                {{ formatDate(txn.createdAt) }}
                            </td>
                            <td class="game-cell">
                                {{ txn.gameCode || 'N/A' }}
                            </td>
                            <td class="type-cell">
                                <span class="type-badge" :class="txn.txnType">
                                    {{ formatType(txn.txnType) }}
                                </span>
                            </td>
                            <td class="amount-cell" :class="txn.txnType">
                                {{ formatAmount(getTransactionAmount(txn)) }}
                            </td>
                            <td class="balance-cell">
                                {{ formatBalance(txn.userBeforeBalance) }}
                            </td>
                            <td class="balance-cell">
                                {{ formatBalance(txn.userAfterBalance) }}
                            </td>
                            <td class="status-cell">
                                <span class="status-badge" :class="txn.status">
                                    {{ txn.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Card View -->
            <div class="mobile-view">
                <div 
                    v-for="txn in filteredTransactions" 
                    :key="txn._id"
                    class="transaction-card"
                    :class="txn.txnType"
                >
                    <div class="card-header">
                        <div class="card-title">{{ txn.gameCode || 'N/A' }}</div>
                        <div class="card-amount" :class="txn.txnType">
                            {{ formatAmount(getTransactionAmount(txn)) }}
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card-row">
                            <span class="card-label">Time:</span>
                            <span class="card-value">{{ formatDate(txn.createdAt) }}</span>
                        </div>
                        <div class="card-row">
                            <span class="card-label">Type:</span>
                            <span class="card-value">
                                <span class="type-badge" :class="txn.txnType">
                                    {{ formatType(txn.txnType) }}
                                </span>
                            </span>
                        </div>
                        <div class="card-row">
                            <span class="card-label">Before:</span>
                            <span class="card-value">{{ formatBalance(txn.userBeforeBalance) }}</span>
                        </div>
                        <div class="card-row">
                            <span class="card-label">After:</span>
                            <span class="card-value">{{ formatBalance(txn.userAfterBalance) }}</span>
                        </div>
                        <div class="card-row">
                            <span class="card-label">Status:</span>
                            <span class="status-badge" :class="txn.status">
                                {{ txn.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination Info -->
        <div v-if="transactions && transactions.length > 0" class="pagination-info">
            <p>Showing {{ transactions.length }} transactions</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SlotsTransactionHistory',
    data() {
        return {
            filterType: '',
            loadingMore: false,
            offset: 0,
            limit: 20
        };
    },
    computed: {
        ...mapGetters('slots', ['transactionHistory']),
        transactions() {
            return this.transactionHistory || [];
        },
        filteredTransactions() {
            if (!this.filterType) {
                return this.transactions;
            }
            return this.transactions.filter(txn => txn.txnType === this.filterType);
        }
    },
    methods: {
        ...mapActions('slots', ['fetchTransactionHistory']),
        
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(date);
        },

        formatAmount(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
            }).format(amount);
        },

        formatBalance(balance) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
            }).format(balance);
        },

        formatType(type) {
            const typeMap = {
                'debit': 'Bet',
                'credit': 'Win',
                'debit_credit': 'Transfer'
            };
            return typeMap[type] || type;
        },

        getTransactionAmount(txn) {
            switch (txn.txnType) {
                case 'debit':
                    return -Math.abs(txn.betAmount || 0);
                case 'credit':
                    return Math.abs(txn.winAmount || 0);
                case 'debit_credit':
                    return (txn.winAmount || 0) - (txn.betAmount || 0);
                default:
                    return 0;
            }
        },

        async loadMore() {
            this.loadingMore = true;
            this.offset += this.limit;
            try {
                await this.fetchTransactionHistory({
                    offset: this.offset,
                    limit: this.limit
                });
            } finally {
                this.loadingMore = false;
            }
        }
    },

    async mounted() {
        await this.fetchTransactionHistory({
            offset: 0,
            limit: this.limit
        });
    }
};
</script>

<style scoped>
.transaction-history {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(212, 165, 116, 0.2);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    color: #fff;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.history-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-copper);
    margin: 0;
}

.filter-controls {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
}

.filter-select {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(212, 165, 116, 0.3);
    border-radius: var(--radius-md);
    color: #fff;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-select:hover,
.filter-select:focus {
    border-color: rgba(212, 165, 116, 0.6);
    outline: none;
}

.filter-select option {
    background: #1a1a1a;
    color: #fff;
}

.load-more-btn {
    background: linear-gradient(135deg, #d4a574 0%, #b8905c 100%);
    border: none;
    border-radius: var(--radius-md);
    color: #000;
    padding: var(--spacing-sm) var(--spacing-md);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
}

.load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.no-transactions {
    text-align: center;
    padding: var(--spacing-2xl);
    color: rgba(255, 255, 255, 0.6);
}

/* Desktop Table */
.desktop-view {
    overflow-x: auto;
    margin-bottom: var(--spacing-lg);
}

.transactions-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.transactions-table thead {
    border-bottom: 2px solid rgba(212, 165, 116, 0.3);
}

.transactions-table th {
    text-align: left;
    padding: var(--spacing-md);
    color: var(--color-copper);
    font-weight: 600;
}

.transactions-table td {
    padding: var(--spacing-md);
    border-bottom: 1px solid rgba(212, 165, 116, 0.1);
}

.transaction-row {
    transition: background 0.3s ease;
}

.transaction-row:hover {
    background: rgba(212, 165, 116, 0.05);
}

.date-cell {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
}

.game-cell {
    font-weight: 500;
}

.type-badge {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 12px;
    font-weight: 600;
}

.type-badge.debit {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
}

.type-badge.credit {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
}

.type-badge.debit_credit {
    background: rgba(212, 165, 116, 0.2);
    color: var(--color-copper);
}

.amount-cell {
    font-weight: 600;
    text-align: right;
}

.amount-cell.debit {
    color: #ff6b6b;
}

.amount-cell.credit {
    color: #4caf50;
}

.amount-cell.debit_credit {
    color: var(--color-copper);
}

.balance-cell {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    text-align: right;
}

.status-cell {
    text-align: center;
}

.status-badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}

.status-badge.success {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
}

.status-badge.pending {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
}

.status-badge.failed {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
}

/* Mobile Card View */
.mobile-view {
    display: none;
}

.transaction-card {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(212, 165, 116, 0.2);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    overflow: hidden;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid rgba(212, 165, 116, 0.1);
}

.card-title {
    font-weight: 600;
    color: var(--color-copper);
}

.card-amount {
    font-weight: 700;
    font-size: 16px;
}

.card-amount.debit {
    color: #ff6b6b;
}

.card-amount.credit {
    color: #4caf50;
}

.card-amount.debit_credit {
    color: var(--color-copper);
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
}

.card-label {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
}

.card-value {
    color: rgba(255, 255, 255, 0.9);
    text-align: right;
}

.pagination-info {
    text-align: center;
    padding: var(--spacing-lg);
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .desktop-view {
        display: none;
    }

    .mobile-view {
        display: block;
    }

    .history-header {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-controls {
        width: 100%;
        justify-content: stretch;
    }

    .filter-select {
        flex: 1;
    }
}
</style>
