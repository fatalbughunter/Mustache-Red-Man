<template>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer ring -->
        <circle cx="12" cy="12" r="10" stroke="url(#coin-gradient-ring)" stroke-width="1.5"/>
        
        <!-- Inner circle with gradient -->
        <circle cx="12" cy="12" r="9" fill="url(#coin-gradient-main)"/>
        
        <!-- Highlight shine -->
        <ellipse cx="9" cy="8" rx="3" ry="2" fill="url(#coin-gradient-shine)" opacity="0.4"/>
        
        <!-- Dollar sign -->
        <path d="M12 6v12M9 8.5c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5h-3c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5h3c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5" stroke="url(#coin-gradient-symbol)" stroke-width="1.8" stroke-linecap="round"/>
        
        <!-- Edge details -->
        <circle cx="12" cy="12" r="8.5" stroke="url(#coin-gradient-edge)" stroke-width="0.5" opacity="0.6"/>
        
        <defs>
            <linearGradient id="coin-gradient-ring" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fbbf24"/>
                <stop offset="50%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
            
            <radialGradient id="coin-gradient-main" cx="12" cy="12" r="9" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fde047"/>
                <stop offset="40%" stop-color="#fbbf24"/>
                <stop offset="80%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#d97706"/>
            </radialGradient>
            
            <radialGradient id="coin-gradient-shine" cx="9" cy="8" r="3" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fff7ed"/>
                <stop offset="100%" stop-color="#fde047"/>
            </radialGradient>
            
            <linearGradient id="coin-gradient-symbol" x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#78350f"/>
                <stop offset="50%" stop-color="#92400e"/>
                <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            
            <linearGradient id="coin-gradient-edge" x1="12" y1="3.5" x2="12" y2="20.5" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fde047"/>
                <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
        </defs>
    </svg>
</template>

<style scoped>
    svg {
        display: block;
    }
</style>

