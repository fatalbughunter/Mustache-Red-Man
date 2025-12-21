<template>
    <div class="fair-mines">
        <div class="mines-header">
            <div class="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <span class="header-title">MINES</span>
        </div>
        <div class="mines-text">
            <p>Our system generates the result for each game by using the SHA-256 hash of 3 separate inputs:</p>
            <div class="text-item">
                <span class="item-label">Server Seed:</span>
                <span class="item-desc">Is a cryptographically secure pseudo-randomly generated string.</span>
            </div>
            <div class="text-item">
                <span class="item-label">Nonce:</span>
                <span class="item-desc">Is a number that is incremented with every user bet.</span>
            </div>
            <div class="text-item">
                <span class="item-label">Client Seed:</span>
                <span class="item-desc">Is a string which is determined by the user and can be changed at any time.</span>
            </div>
        </div>
        <div class="mines-code">
            <div class="code-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Verification Code</span>
            </div>
            <pre><code>const crypto = require('crypto');
const ChanceJs = require('chance');

const minesCount = 1;
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

const fairGenerateMinesDeck= () => {
    let deck = [];

    for(let i = 0; i &lt; 25; i++) {
        if(i &lt; minesCount) {
            deck.push('mine');
        } else {
            deck.push('coin');
        }
    }

    return deck;
}

const fairGetMinesOutcome = () => {
    let deck = fairGenerateMinesDeck();

    const combined = `${serverSeed}-${nonce}-${clientSeed}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    const chance = new ChanceJs(hash);
    deck = chance.shuffle(deck);

    console.log(deck);
}

fairGetMinesOutcome();</code></pre>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FairMines'
    }
</script>

<style scoped>
    .fair-mines {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .fair-mines .mines-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
    }

    .fair-mines .header-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-radius: 10px;
        color: #b87333;
    }

    .fair-mines .header-title {
        font-size: 20px;
        font-weight: 800;
        background: linear-gradient(135deg, #b87333 0%, #d4a574 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
    }

    .fair-mines .mines-text {
        padding: 20px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .fair-mines .mines-text p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 16px 0;
        line-height: 1.6;
    }

    .fair-mines .text-item {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 10px;
    }

    .fair-mines .text-item:last-child {
        margin-bottom: 0;
    }

    .fair-mines .item-label {
        font-size: 13px;
        font-weight: 700;
        color: #b87333;
    }

    .fair-mines .item-desc {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
    }

    .fair-mines .mines-code {
        margin-top: 20px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.06);
        overflow: hidden;
    }

    .fair-mines .code-header {
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

    .fair-mines .mines-code pre {
        margin: 0;
        padding: 16px;
        max-height: 250px;
        overflow: auto;
    }

    .fair-mines .mines-code pre::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .fair-mines .mines-code pre::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(184, 115, 51, 0.3);
    }

    .fair-mines .mines-code pre::-webkit-scrollbar-track {
        background: transparent;
    }

    .fair-mines .mines-code pre code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
        white-space: pre;
    }

    @media only screen and (max-width: 600px) {
        .fair-mines .mines-text {
            padding: 16px;
        }

        .fair-mines .text-item {
            flex-direction: column;
            gap: 4px;
        }
    }
</style>
