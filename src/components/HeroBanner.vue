<template>
    <div class="hero-banner">
        <!-- Desert Landscape Background -->
        <div class="hero-desert-bg">
            <div class="desert-sun"></div>
        </div>
        
        <!-- Content Overlay -->
        <div class="hero-overlay">
            <div class="hero-content">
                <div class="hero-left">
                    <div class="hero-glow-circle"></div>
                    <h1 class="hero-title">
                        <span class="title-outline">
                            <span class="title-line">MUSTACHE</span>
                            <span class="title-line">CASINO</span>
                        </span>
                        <span class="title-text">
                            <span class="title-line">MUSTACHE</span>
                            <span class="title-line">CASINO</span>
                        </span>
                    </h1>
                </div>
                <div class="hero-right" v-if="authUser.user === null">
                    <button class="hero-play-button" @click="showSignupModal = true">
                        REGISTER NOW
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Signup Modal -->
        <SignupModal 
            :show="showSignupModal" 
            @close="showSignupModal = false" 
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SignupModal from '@/components/SignupModal.vue';

export default {
    name: 'HeroBanner',
    components: {
        SignupModal
    },
    data() {
        return {
            showSignupModal: false
        }
    },
    computed: {
        ...mapGetters(['authUser'])
    }
}
</script>

<style scoped>
.hero-banner {
    position: relative;
    margin: 0px;
    overflow: hidden;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(255, 140, 0, 0.1);
}

/* Desert Background */
.hero-desert-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('~@/assets/img/banner/theTitle.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    overflow: hidden;
}

.desert-sun {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    filter: blur(20px);
}

@keyframes sunGlow {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.1); opacity: 1; }
}

/* Overlay */
.hero-overlay {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-2xl);
}

.hero-content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2xl);
}

.hero-left {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 400px;
    padding-left: var(--spacing-2xl);
}

.hero-glow-circle {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(40px);
    position: absolute;
    left: 0;
}

.hero-title {
    position: relative;
    z-index: 2;
    font-size: 72px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 8px;
    margin: 0;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.2;
}

.hero-title .title-line {
    display: block;
}

.title-outline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    /* Create smooth, gentle border outline */
    color: rgba(0, 0, 0, 0.3);
    -webkit-text-stroke: 4px rgba(184, 115, 51, 0.7);
    text-stroke: 4px rgba(184, 115, 51, 0.7);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 8px;
    filter: blur(2px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title-text {
    position: relative;
    z-index: 2;
    background: linear-gradient(
        135deg,
        #F4D03F 0%,
        #D4A574 25%,
        #F4D03F 50%,
        #D4A574 75%,
        #F4D03F 100%
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: titleShimmer 3s ease-in-out infinite;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Enhanced layered shadows creating depth, clarity, and border effect */
    filter: drop-shadow(0 0 10px rgba(184, 115, 51, 0.9))
            drop-shadow(0 0 20px rgba(184, 115, 51, 0.7))
            drop-shadow(0 0 30px rgba(212, 165, 116, 0.5))
            drop-shadow(0 2px 4px rgba(0, 0, 0, 1))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))
            drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6));
}

@keyframes titleShimmer {
    0%, 100% {
        background-position: 0% 50%;
        filter: drop-shadow(0 4px 12px rgba(184, 115, 51, 0.6));
    }
    50% {
        background-position: 100% 50%;
        filter: drop-shadow(0 4px 20px rgba(244, 208, 63, 0.8));
    }
}

.hero-title::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
}

.hero-title::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(212, 165, 116, 0.8),
        rgba(244, 208, 63, 0.8),
        rgba(212, 165, 116, 0.8),
        transparent
    );
    border-radius: 2px;
    box-shadow: 
        0 0 10px rgba(212, 165, 116, 0.6),
        0 0 20px rgba(184, 115, 51, 0.4);
    animation: underlineGlow 2s ease-in-out infinite;
}

@keyframes underlineGlow {
    0%, 100% {
        opacity: 0.7;
        transform: scaleX(0.95);
    }
    50% {
        opacity: 1;
        transform: scaleX(1);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.2); opacity: 0.8; }
}

.hero-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--spacing-xl);
    text-align: right;
    padding: 318px 77px 0 0;
}

.hero-play-button {
    padding: var(--spacing-lg) var(--spacing-2xl);
    background: var(--gradient-gold);
    color: #ffffff;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 800;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
        0 8px 25px rgba(255, 215, 0, 0.5),
        0 0 30px rgba(255, 215, 0, 0.3),
        inset 0 2px 10px rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
}

.hero-play-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
}

.hero-play-button:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 
        0 12px 35px rgba(255, 215, 0, 0.7),
        0 0 50px rgba(255, 215, 0, 0.5),
        inset 0 2px 10px rgba(255, 255, 255, 0.4);
}

.hero-play-button:hover::before {
    left: 100%;
}

.hero-play-button:active {
    transform: scale(1.02) translateY(0);
}

@media only screen and (max-width: 1024px) {
    .hero-content {
        flex-direction: column;
        gap: var(--spacing-xl);
    }
    
    .hero-left {
        min-height: 200px;
        justify-content: center;
        padding-left: 0;
    }
    
    .hero-title {
        font-size: 48px;
        letter-spacing: 4px;
        text-align: center;
    }
    
    .hero-right {
        align-items: center;
        text-align: center;
    }
    
    .hero-glow-circle {
        width: 200px;
        height: 200px;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media only screen and (max-width: 768px) {
    .hero-overlay {
        padding: var(--spacing-xl) var(--spacing-md);
    }
    
    .hero-banner {
        margin: var(--spacing-md);
        min-height: 500px;
    }
    
    .hero-title {
        font-size: 36px;
        letter-spacing: 3px;
    }
    
    .hero-play-button {
        padding: var(--spacing-md) var(--spacing-xl);
        font-size: 18px;
    }
    
    .hero-glow-circle {
        width: 150px;
        height: 150px;
        left: 50%;
        transform: translateX(-50%);
    }
}

@media only screen and (max-width: 480px) {
    .hero-title {
        font-size: 28px;
        letter-spacing: 2px;
    }
}
</style>
