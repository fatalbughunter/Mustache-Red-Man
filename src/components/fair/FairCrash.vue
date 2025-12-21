<template>
    <div class="fair-crash">
        <div class="crash-header">
            <div class="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="header-title">CRASH</span>
        </div>
        <div class="crash-text">
            <p>Our system generates the result for each game by using the SHA-256 hash of 2 separate inputs:</p>
            <div class="text-item">
                <span class="item-label">Game ID:</span>
                <span class="item-desc">The games unique identifier which is generated when the game is created.</span>
            </div>
            <div class="text-item">
                <span class="item-label">Server Seed:</span>
                <span class="item-desc">Is a list of hashed which is generated from one genesis seed.</span>
            </div>
            <div class="text-note">
                First ever used seed was: <code>b34441cb7cb5f133848cf90a341a9dbff67366de5443c1473958e177cee87f21</code>
            </div>
        </div>
        <div class="crash-code">
            <div class="code-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Verification Code</span>
            </div>
            <pre><code>const crypto = require('crypto');

const gameId = '6443aa99f4290f71b555f4bd';
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';

const divisible = (hash, mod) => {
    let val = 0;

    let o = hash.length % 4;
    for (let i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
        val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
    }

    return val === 0;
}

const fairGetCrashOutcome = () => {
    const combined = `${gameId}-${serverSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    const mod = parseInt(100 / (0.05 * 100));
    if(divisible(hash, mod) === true) {
        return 100;
    }

    const h = parseInt(hash.slice(0, 52 / 4), 16);
    const e = Math.pow(2, 52);
    const roll = Math.floor((100 * e - h) / (e - h));

    console.log(`Outcome: ${roll}`);
}

fairGetCrashOutcome();</code></pre>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FairCrash'
    }
</script>

<style scoped>
    .fair-crash {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .fair-crash .crash-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
    }

    .fair-crash .header-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-radius: 10px;
        color: #b87333;
    }

    .fair-crash .header-title {
        font-size: 20px;
        font-weight: 800;
        background: linear-gradient(135deg, #b87333 0%, #d4a574 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
    }

    .fair-crash .crash-text {
        padding: 20px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .fair-crash .crash-text p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 16px 0;
        line-height: 1.6;
    }

    .fair-crash .text-item {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 10px;
    }

    .fair-crash .item-label {
        font-size: 13px;
        font-weight: 700;
        color: #b87333;
    }

    .fair-crash .item-desc {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
    }

    .fair-crash .text-note {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.5);
    }

    .fair-crash .text-note code {
        display: block;
        margin-top: 8px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        word-break: break-all;
    }

    .fair-crash .crash-code {
        margin-top: 20px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.06);
        overflow: hidden;
    }

    .fair-crash .code-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 600;
    }

    .fair-crash .crash-code pre {
        margin: 0;
        padding: 16px;
        max-height: 250px;
        overflow: auto;
    }

    .fair-crash .crash-code pre::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .fair-crash .crash-code pre::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(184, 115, 51, 0.3);
    }

    .fair-crash .crash-code pre::-webkit-scrollbar-track {
        background: transparent;
    }

    .fair-crash .crash-code pre code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
        white-space: pre;
    }

    @media only screen and (max-width: 600px) {
        .fair-crash .crash-text {
            padding: 16px;
        }

        .fair-crash .text-item {
            flex-direction: column;
            gap: 4px;
        }
    }
</style>
