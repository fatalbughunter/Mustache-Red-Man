<template>
    <div class="profile-transactions-element">
        <div class="element-date">
            <div class="date-title">DATE</div>
            <div class="date-content">
                {{ new Date(transaction.createdAt).toLocaleString('en-US', { hour12: true, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit' }) }}
            </div>
        </div>
        <div class="element-method">
            <div class="method-title">METHOD</div>
            <div class="method-content">
                {{profileGetMethod}}
            </div>
        </div>
        <div class="element-type">
            <div class="type-title">TYPE</div>
            <div class="type-content">
                {{profileGetType}}
            </div>
        </div>
        <div class="element-amount">
            <div class="amount-title">AMOUNT</div>
            <div class="amount-content">
                <IconCoin />
                <div class="content-value" v-bind:class="{ 'value-positive': profileGetAmount > 0 }">
                    <span>{{profileFormatValue(profileGetAmount).split('.')[0]}}</span>.{{profileFormatValue(profileGetAmount).split('.')[1]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import IconCoin from '@/components/icons/IconCoin';

    export default {
        name: 'ProfileTransactionsElement',
        components: {
            IconCoin
        },
        props: [
            'transaction'
        ],
        methods: {
            profileFormatValue(value) {
                return parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },
        computed: {
            ...mapGetters([
                'authUser'
            ]),
            profileGetMethod() {
                let method = this.transaction.method.charAt(0).toUpperCase() + this.transaction.method.slice(1);

                if(this.transaction.method === 'tip') { method = this.authUser.user._id === this.transaction.sender.user ? 'Tip Sent' : 'Tip Received'; }
                else if(this.transaction.type === 'affiliateCodeClaim') { method = 'Affiliate Code'; }
                else if(this.transaction.type === 'affiliateEarningClaim') { method = 'Affiliate Earnings'; }
                else if(this.transaction.type === 'promoCodeClaim') { method = 'Promo Code'; }
                else if(this.transaction.type === 'rakebackClaim') { method = 'Rakeback Earnings'; }
                else if(this.transaction.type === 'rainCreate') { method = 'Rain Host'; }
                else if(this.transaction.type === 'rainTip') { method = 'Rain Tip'; }
                else if(this.transaction.type === 'rainPayout') { method = 'Rain Payout'; }
                else if(this.transaction.type === 'adminAdjust') { method = 'Admin Adjustment'; }

                return method;
            },
            profileGetType() {
                let type = null;

                if(this.transaction.method === 'robux' || this.transaction.method === 'limited') { type = this.authUser.user._id === this.transaction.deposit.user ? 'Deposit' : 'Withdraw'; } 
                else if(this.transaction.method === 'balance' || this.transaction.method === 'tip') { type = 'Currency'; } 
                else { type = this.transaction.type.charAt(0).toUpperCase() + this.transaction.type.slice(1) }

                return type;
            },
            profileGetAmount() {
                let amount = this.transaction.amount;

                if(this.transaction.method === 'tip' && this.authUser.user._id === this.transaction.sender.user) { amount = -this.transaction.amount; }

                return amount;
            }
        }
    }
</script>

<style scoped>
    .profile-transactions-element {
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        border-radius: var(--radius-md);
        background: var(--bg-blue-dark);
        border: 1px solid rgba(222, 184, 135, 0.1);
        margin-bottom: 8px;
    }

    .profile-transactions-element:nth-child(odd) {
        background-color: var(--bg-blue-dark);
        border-color: rgba(222, 184, 135, 0.2);
    }

    .profile-transactions-element .element-date {
        width: 30%;
        display: flex;
        flex-direction: column;
    }

    .profile-transactions-element .element-method {
        width: 30%;
        display: flex;
        flex-direction: column;
    }

    .profile-transactions-element .element-type {
        width: 20%;
        display: flex;
        flex-direction: column;
    }

    .profile-transactions-element .element-amount {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .profile-transactions-element .date-title,
    .profile-transactions-element .method-title,
    .profile-transactions-element .type-title,
    .profile-transactions-element .amount-title {
        display: none;
        font-size: 13px;
        font-weight: 600;
        color: var(--accent-copper-light);
    }

    .profile-transactions-element .date-content,
    .profile-transactions-element .method-content,
    .profile-transactions-element .type-content {
        font-size: 14px;
        font-weight: 400;
        color: var(--accent-copper-light);
    }

    .profile-transactions-element .amount-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .profile-transactions-element .amount-content svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
        transition: all 0.3s ease;
    }

    .profile-transactions-element:hover .amount-content svg {
        filter: drop-shadow(0 2px 6px rgba(251, 191, 36, 0.5));
        transform: scale(1.08);
    }

    .profile-transactions-element .content-value {
        display: flex;
        align-items: baseline;
        font-size: 11px;
        font-weight: 600;
        color: rgba(187, 191, 208, 0.7);
        letter-spacing: 0.3px;
    }

    .profile-transactions-element .content-value span {
        font-size: 15px;
        font-weight: 800;
        margin-right: 1px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(180deg, #ffffff 0%, #e5e7eb 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .profile-transactions-element .content-value.value-positive span {
        background: linear-gradient(180deg, #10b981 0%, #059669 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 900;
        text-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }

    @media only screen and (max-width: 725px) {

        .profile-transactions-element {
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 20px;
        }

        .profile-transactions-element .element-date,
        .profile-transactions-element .element-method,
        .profile-transactions-element .element-type,
        .profile-transactions-element .element-amount {
            width: 100%;
        }

        .profile-transactions-element .element-method,
        .profile-transactions-element .element-type,
        .profile-transactions-element .element-amount {
            margin-top: 10px;
        }

        .profile-transactions-element .date-title,
        .profile-transactions-element .method-title,
        .profile-transactions-element .type-title,
        .profile-transactions-element .amount-title {
            display: block;
        }

        .profile-transactions-element .date-content,
        .profile-transactions-element .method-content,
        .profile-transactions-element .type-content,
        .profile-transactions-element .amount-content {
            margin-top: 5px;
        }

        .profile-transactions-element .element-amount {
            align-items: flex-start;
        }

    }
</style>
