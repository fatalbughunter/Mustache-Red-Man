<template>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Slot Machine Body -->
        <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="url(#slot-gradient-frame)" stroke-width="1.8" fill="url(#slot-gradient-body)"/>
        
        <!-- Screen/Display Area -->
        <rect x="5.5" y="5" width="13" height="10" rx="1" fill="url(#slot-gradient-screen)" stroke="url(#slot-gradient-frame)" stroke-width="0.8"/>
        
        <!-- Reel dividers -->
        <line x1="9.8" y1="5.5" x2="9.8" y2="14.5" stroke="#1a1a2e" stroke-width="1" opacity="0.6"/>
        <line x1="14.2" y1="5.5" x2="14.2" y2="14.5" stroke="#1a1a2e" stroke-width="1" opacity="0.6"/>
        
        <!-- Lucky symbols - 7 7 7 -->
        <text x="7.7" y="11.5" font-size="5.5" font-weight="900" fill="url(#slot-gradient-symbol)" text-anchor="middle" font-family="Roboto, sans-serif">7</text>
        <text x="12" y="11.5" font-size="5.5" font-weight="900" fill="url(#slot-gradient-symbol)" text-anchor="middle" font-family="Roboto, sans-serif">7</text>
        <text x="16.3" y="11.5" font-size="5.5" font-weight="900" fill="url(#slot-gradient-symbol)" text-anchor="middle" font-family="Roboto, sans-serif">7</text>
        
        <!-- Win line indicator -->
        <line x1="5.8" y1="10" x2="18.2" y2="10" stroke="url(#slot-gradient-winline)" stroke-width="1.2" opacity="0.8"/>
        
        <!-- Bottom control panel -->
        <rect x="5.5" y="16" width="13" height="3.5" rx="0.8" fill="url(#slot-gradient-panel)"/>
        
        <!-- Control buttons -->
        <circle cx="8" cy="17.8" r="1" fill="url(#slot-gradient-button)"/>
        <circle cx="12" cy="17.8" r="1" fill="url(#slot-gradient-button-red)"/>
        <circle cx="16" cy="17.8" r="1" fill="url(#slot-gradient-button)"/>
        
        <!-- Lever arm -->
        <path d="M20.5 7 L20.5 11" stroke="url(#slot-gradient-lever)" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="20.5" cy="6.2" r="1.2" fill="url(#slot-gradient-lever-ball)"/>
        
        <defs>
            <!-- Frame gradient -->
            <linearGradient id="slot-gradient-frame" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fbbf24"/>
                <stop offset="50%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
            
            <!-- Body gradient -->
            <linearGradient id="slot-gradient-body" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#1e293b"/>
                <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
            
            <!-- Screen gradient -->
            <linearGradient id="slot-gradient-screen" x1="12" y1="5" x2="12" y2="15" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#0f172a"/>
                <stop offset="100%" stop-color="#020617"/>
            </linearGradient>
            
            <!-- Symbol gradient (7s) -->
            <linearGradient id="slot-gradient-symbol" x1="7.7" y1="8" x2="7.7" y2="13" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fde047"/>
                <stop offset="30%" stop-color="#fbbf24"/>
                <stop offset="70%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#eab308"/>
            </linearGradient>
            
            <!-- Win line gradient -->
            <linearGradient id="slot-gradient-winline" x1="5.8" y1="10" x2="18.2" y2="10" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3"/>
                <stop offset="20%" stop-color="#fbbf24" stop-opacity="0.8"/>
                <stop offset="50%" stop-color="#fde047" stop-opacity="1"/>
                <stop offset="80%" stop-color="#fbbf24" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#ef4444" stop-opacity="0.3"/>
            </linearGradient>
            
            <!-- Control panel gradient -->
            <linearGradient id="slot-gradient-panel" x1="12" y1="16" x2="12" y2="19.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#374151"/>
                <stop offset="100%" stop-color="#1f2937"/>
            </linearGradient>
            
            <!-- Button gradient -->
            <linearGradient id="slot-gradient-button" x1="8" y1="16.8" x2="8" y2="18.8" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fbbf24"/>
                <stop offset="100%" stop-color="#f59e0b"/>
            </linearGradient>
            
            <!-- Red button gradient (spin) -->
            <linearGradient id="slot-gradient-button-red" x1="12" y1="16.8" x2="12" y2="18.8" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#ef4444"/>
                <stop offset="100%" stop-color="#dc2626"/>
            </linearGradient>
            
            <!-- Lever gradient -->
            <linearGradient id="slot-gradient-lever" x1="20.5" y1="7" x2="20.5" y2="11" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#94a3b8"/>
                <stop offset="100%" stop-color="#64748b"/>
            </linearGradient>
            
            <!-- Lever ball gradient -->
            <radialGradient id="slot-gradient-lever-ball" cx="20.5" cy="6.2" r="1.2" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#ef4444"/>
                <stop offset="100%" stop-color="#dc2626"/>
            </radialGradient>
        </defs>
    </svg>
</template>

<style scoped>
    svg {
        display: block;
    }
</style>
