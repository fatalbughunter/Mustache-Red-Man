<template>
    <div class="coming-soon-page">
        <div class="coming-soon-container">
            <div class="coming-soon-content">
                <div class="icon-wrapper">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="55" stroke="url(#copperGradient)" stroke-width="4" stroke-dasharray="8 8" opacity="0.6"/>
                        <circle cx="60" cy="60" r="40" stroke="url(#copperGradient)" stroke-width="3" opacity="0.4"/>
                        <circle cx="60" cy="60" r="30" stroke="url(#copperGradient)" stroke-width="2" opacity="0.3"/>
                        <circle cx="60" cy="60" r="15" fill="url(#copperGradient)"/>
                        <path d="M60 30 L60 15 M60 105 L60 90 M30 60 L15 60 M105 60 L90 60" stroke="url(#copperGradient)" stroke-width="3" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="copperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#D4A574;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#B87333;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#8B6F47;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 class="coming-soon-title">LIVE CASINO</h1>
                <div class="coming-soon-divider"></div>
                <p class="coming-soon-text">Coming Soon</p>
                <div class="coming-soon-shimmer"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LiveCasino',
    metaInfo: {
        title: 'Live Casino - Coming Soon'
    }
}
</script>

<style scoped>
.coming-soon-page {
    width: 100%;
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2xl) var(--spacing-lg);
    background: var(--bg-primary-blue);
    position: relative;
    overflow: hidden;
}

.coming-soon-container {
    width: 100%;
    max-width: 800px;
    position: relative;
    z-index: 1;
}

.coming-soon-content {
    text-align: center;
    position: relative;
    padding: var(--spacing-2xl);
    background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%);
    border: 2px solid rgba(212, 165, 116, 0.3);
    border-radius: var(--radius-xl);
    box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.8),
        0 0 40px rgba(184, 115, 51, 0.2),
        inset 0 0 40px rgba(212, 165, 116, 0.05);
    backdrop-filter: blur(10px);
}

.icon-wrapper {
    margin-bottom: var(--spacing-xl);
    filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.4));
}

.coming-soon-title {
    font-size: 72px;
    font-weight: 900;
    background: var(--gradient-copper);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    letter-spacing: 8px;
    margin-bottom: var(--spacing-lg);
    text-transform: uppercase;
    text-shadow: 0 0 40px rgba(212, 165, 116, 0.5);
    filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.5));
}

.coming-soon-divider {
    width: 200px;
    height: 3px;
    margin: var(--spacing-xl) auto;
    background: var(--gradient-copper);
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(212, 165, 116, 0.6);
    position: relative;
}

.coming-soon-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: var(--gradient-copper);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(212, 165, 116, 0.8);
}

.coming-soon-text {
    font-size: 32px;
    font-weight: 700;
    color: var(--accent-copper-light);
    letter-spacing: 4px;
    margin-top: var(--spacing-xl);
    text-transform: uppercase;
    opacity: 1;
}

.coming-soon-shimmer {
    display: none;
}

@media only screen and (max-width: 768px) {
    .coming-soon-title {
        font-size: 48px;
        letter-spacing: 4px;
    }
    
    .coming-soon-text {
        font-size: 24px;
        letter-spacing: 2px;
    }
    
    .icon-wrapper svg {
        width: 80px;
        height: 80px;
    }
    
    .coming-soon-content {
        padding: var(--spacing-xl);
    }
}
</style>

