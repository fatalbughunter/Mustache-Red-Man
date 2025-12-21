<template>
    <div class="fair-towers">
        <div class="towers-header">
            <div class="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 21v-6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
            <span class="header-title">TOWERS</span>
        </div>
        <div class="towers-text">
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
        <div class="towers-code">
            <div class="code-header">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Verification Code</span>
            </div>
            <pre><code>const crypto = require('crypto');
const ChanceJs = require('chance');

const towersRisk = 'easy';
const serverSeed = '4c60603de55e3b85fe67450aa124ec34509cb73b0f1fde15';
const nonce = 1;
const clientSeed = 'customClientSeed';

const fairGenerateTowersDeck = () => {
    let deck = [];

    for(let rowIndex = 0; rowIndex &lt; 8; rowIndex++) {
        const tilesPerRow = towersRisk === 'medium' ? 2 : 3;
        const losePerRow = towersRisk === 'hard' ? 2 : 1;

        deck[rowIndex] = [];
        for(let tileIndex = 0; tileIndex &lt; tilesPerRow; tileIndex++) {
            if(tileIndex &lt; losePerRow) {
                deck[rowIndex].push('lose');
            } else {
                deck[rowIndex].push('coin');
            }
        }
    }

    return deck;
}

const fairGetTowersOutcome = () => {
    let deck = fairGenerateTowersDeck();
    const combined = `${serverSeed}-${nonce}-${clientSeed}`;

    for(let rowIndex = 0; rowIndex &lt; 8; rowIndex++) {
        const hash = crypto.createHash('sha256').update(`${combined}-${rowIndex}`).digest('hex');

        const chance = new ChanceJs(hash);
        deck[rowIndex] = chance.shuffle(deck[rowIndex]);
    }

    console.log(deck);
}

fairGetTowersOutcome();</code></pre>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FairTowers'
    }
</script>

<style scoped>
    .fair-towers {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .fair-towers .towers-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
    }

    .fair-towers .header-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(184, 115, 51, 0.2) 0%, rgba(139, 90, 43, 0.1) 100%);
        border-radius: 10px;
        color: #b87333;
    }

    .fair-towers .header-title {
        font-size: 20px;
        font-weight: 800;
        background: linear-gradient(135deg, #b87333 0%, #d4a574 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
    }

    .fair-towers .towers-text {
        padding: 20px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .fair-towers .towers-text p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 16px 0;
        line-height: 1.6;
    }

    .fair-towers .text-item {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 10px;
    }

    .fair-towers .text-item:last-child {
        margin-bottom: 0;
    }

    .fair-towers .item-label {
        font-size: 13px;
        font-weight: 700;
        color: #b87333;
    }

    .fair-towers .item-desc {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
    }

    .fair-towers .towers-code {
        margin-top: 20px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.06);
        overflow: hidden;
    }

    .fair-towers .code-header {
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

    .fair-towers .towers-code pre {
        margin: 0;
        padding: 16px;
        max-height: 280px;
        overflow: auto;
    }

    .fair-towers .towers-code pre::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .fair-towers .towers-code pre::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(184, 115, 51, 0.3);
    }

    .fair-towers .towers-code pre::-webkit-scrollbar-track {
        background: transparent;
    }

    .fair-towers .towers-code pre code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
        white-space: pre;
    }

    @media only screen and (max-width: 600px) {
        .fair-towers .towers-text {
            padding: 16px;
        }

        .fair-towers .text-item {
            flex-direction: column;
            gap: 4px;
        }
    }
</style>
