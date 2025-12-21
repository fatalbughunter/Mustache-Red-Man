<template>
    <div class="rewards-affiliate">
        <div class="affiliate-inner">
            <div class="inner-content">
                <div class="inner-title">AFFILIATE CODE</div>
                <div class="inner-info">
                    Enter the affiliate code you want to be Referred by to unlock and claim your exclusive rewards
                </div>
                <div class="inner-input">
                    <input v-model="affiliateCode" type="text" placeholder="Enter Affiliate Code" />
                    <button v-on:click="affiliateClaimButton()" class="button-claim">
                        <span>CLAIM</span>
                    </button>
                </div>
            </div>
            <div class="inner-image">
                <img src="@/assets/img/chest_coins.png" alt="coins" class="pot-back" />
                <img src="@/assets/img/chest_coins.png" alt="coins" class="pot-front" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'RewardsAffiliateCode',
        data() {
            return {
                affiliateCode: null
            }
        },
        methods: {
            ...mapActions([
                'notificationShow', 
                'modalsSetShow', 
                'modalsSetData'
            ]),
            affiliateClaimButton() {
                if(this.affiliateCode === null || this.affiliateCode.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Your entered affiliate code is invalid.' });
                    return;
                }

                this.modalsSetData({ typeCaptcha: 'affiliatesClaim', data: { code: this.affiliateCode } });
                this.modalsSetShow('Captcha');
            }
        }
    }
</script>

<style scoped>
    .rewards-affiliate {
        width: calc(50% - 10px);
        min-height: 180px;
        position: relative;
        border-radius: 16px;
        background: linear-gradient(135deg, #0a1929 0%, #0d2137 50%, #0a1929 100%);
        overflow: hidden;
    }

    .rewards-affiliate .affiliate-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px;
        position: relative;
    }

    .rewards-affiliate .inner-content {
        flex: 1;
        z-index: 2;
        max-width: 60%;
    }

    .rewards-affiliate .inner-title {
        font-size: 28px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 2px;
        background:  #ffd700;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 12px;
    }

    .rewards-affiliate .inner-info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 16px;
        font-weight: 500;
        color: white;
        line-height: 1.5;
        margin-bottom: 20px;
    }

    .rewards-affiliate .inner-info .highlight {
        color: #fca311;
        font-weight: 700;
    }

    .rewards-affiliate .inner-info .coin-icon {
        width: 18px;
        height: 18px;
    }

    .rewards-affiliate .inner-input {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .rewards-affiliate .inner-input input {
        width: 200px;
        height: 44px;
        padding: 0 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        outline: none;
        transition: border-color 0.3s ease;
    }

    .rewards-affiliate .inner-input input:focus {
        border-color: rgba(252, 163, 17, 0.5);
    }

    .rewards-affiliate .inner-input input::placeholder {
        color: #6b7c8a;
    }

    .rewards-affiliate button.button-claim {
        height: 44px;
        padding: 0 28px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 800;
        color: #000000;
        background: linear-gradient(180deg, #ffd700 0%, #fca311 50%, #e69500 100%);
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .rewards-affiliate button.button-claim:hover {
        background: linear-gradient(180deg, #ffe44d 0%, #ffb833 50%, #ffa500 100%);
        transform: translateY(-1px);
    }

    .rewards-affiliate .inner-image {
        position: absolute;
        right: 20px;
        bottom: 0;
        display: flex;
        align-items: flex-end;
        z-index: 1;
    }

    .rewards-affiliate .inner-image .pot-back {
        width: 100px;
        height: auto;
        object-fit: contain;
        margin-right: -30px;
        opacity: 0.85;
    }

    .rewards-affiliate .inner-image .pot-front {
        width: 120px;
        height: auto;
        object-fit: contain;
    }

    @media only screen and (max-width: 1150px) {
        .rewards-affiliate {
            width: 100%;
            margin-bottom: 20px;
        }
    }

    @media only screen and (max-width: 768px) {
        .rewards-affiliate .inner-content {
            max-width: 100%;
        }

        .rewards-affiliate .inner-image {
            display: none;
        }

        .rewards-affiliate .inner-input {
            flex-direction: column;
            align-items: flex-start;
        }

        .rewards-affiliate .inner-input input {
            width: 100%;
        }

        .rewards-affiliate button.button-claim {
            width: 100%;
        }
    }

    @media only screen and (max-width: 600px) {
        .rewards-affiliate .affiliate-inner {
            padding: 20px;
        }

        .rewards-affiliate .inner-title {
            font-size: 22px;
        }
    }
</style>
