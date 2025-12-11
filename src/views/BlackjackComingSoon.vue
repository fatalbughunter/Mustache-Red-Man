<template>
    <div class="coming-soon-page">
        <div class="coming-soon-container">
            <div class="coming-soon-content">
                <div class="icon-wrapper">
                    <svg width="120" height="120" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.94516 13.5723H8.3042L8.60583 12.7756L8.94516 13.5723ZM2.59212 1.26538C2.96915 2.15583 3.34619 3.04628 3.73265 3.93673C3.83633 4.20855 3.44045 4.37727 3.32734 4.10545L2.97858 3.29936H1.86632C1.78149 3.53368 1.67781 3.843 1.57412 4.07733C1.42331 4.41476 1.06512 4.18981 1.14996 3.9461C1.49871 3.04628 1.83805 2.15583 2.17738 1.256C2.25278 1.06854 2.52614 1.06854 2.59212 1.26538ZM10.1517 0H0.838903C0.377035 0 0 0.374927 0 0.843585V15.1564C0 15.6157 0.377035 16 0.838903 16H10.1517C10.623 16 11 15.6157 11 15.1564V0.843585C11 0.374927 10.623 0 10.1517 0ZM6.32476 4.89279C6.51328 4.89279 6.61697 5.10838 6.49443 5.24897C6.32476 5.49268 6.21165 6.17692 6.17395 6.43937C6.85261 6.43937 7.38046 6.6362 7.74807 7.24546C8.5587 8.61394 6.79606 10.1886 5.80634 10.9291C5.42931 11.2197 5.43873 11.126 5.10883 10.8448C4.36418 10.2168 2.94087 8.91388 3.02571 7.9297C3.11054 7.01113 3.92117 6.36438 4.82605 6.43937L4.81662 6.41125C4.8072 6.33626 4.64696 5.5208 4.54327 5.29584C4.49614 5.18336 4.32648 4.94903 4.62811 4.89279C4.92031 4.84593 5.95716 4.89279 6.32476 4.89279ZM7.44644 14.5847C7.76692 13.7598 8.07798 12.935 8.38903 12.1101C8.46444 11.9227 8.73779 11.9227 8.80377 12.1195C9.15253 12.9443 9.50129 13.7598 9.85004 14.5753C9.96315 14.8377 9.55784 15.0064 9.44473 14.744L9.13368 14.0129H8.13453C8.0497 14.2378 7.95544 14.5284 7.86118 14.744C7.7575 15.0064 7.34276 14.8565 7.44644 14.5847ZM2.79006 2.85882H2.03599L2.39417 1.9215L2.79006 2.85882Z" 
                              stroke="url(#copperGradient)" 
                              stroke-width="0.5" 
                              fill="url(#copperGradient)"
                              opacity="0.9"/>
                        <defs>
                            <linearGradient id="copperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#D4A574;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#B87333;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#8B6F47;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 class="coming-soon-title">BLACKJACK</h1>
                <div class="coming-soon-divider"></div>
                <p class="coming-soon-text">Coming Soon</p>
                <div class="coming-soon-shimmer"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlackjackComingSoon',
    metaInfo: {
        title: 'Blackjack - Coming Soon'
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
    background: var(--bg-blue-dark);
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

