<template>
    <div class="hero-banner">
        <!-- Desert Landscape Background -->
        <div class="hero-desert-bg-container">
            <transition name="slide-right-to-left">
                <div 
                    :key="currentImageIndex"
                    class="hero-desert-bg bg-active"
                    :style="{ backgroundImage: `url(${carouselImages[currentImageIndex]})` }"
                >
                    <div class="desert-sun"></div>
                    <img 
                        :src="require('@/assets/img/christmas/whiteSnow.png')" 
                        alt="White Snow" 
                        class="hero-white-snow"
                    />
                    <!-- Christmas Tree and Text Images (fixed to each banner image) -->
                    <div class="hero-christmas-images">
                        <img 
                            :src="require('@/assets/img/christmas/christmasTree.png')" 
                            alt="Christmas Tree" 
                            class="hero-christmas-tree"
                        />
                        <img 
                            :src="require('@/assets/img/christmas/christmasText.png')" 
                            alt="Christmas Text" 
                            class="hero-christmas-text"
                        />
                    </div>
                    <!-- Text Overlay with Button (fixed to each banner image) -->
                    <div class="hero-banner-text-wrapper">
                        <div class="hero-banner-text">
                            <h1 class="hero-title" v-if="currentImageIndex === 0">Sign Up & Start Winning</h1>
                            <h1 class="hero-title" v-if="currentImageIndex === 1">Weekly Dream Bonus</h1>
                            <p class="hero-subtitle" v-if="currentImageIndex === 0">Create your account today and receive instant rewards to begin your winning journey</p>
                            <p class="hero-subtitle-2" v-if="currentImageIndex === 1">Claim your exclusive weekly reward and boost your chances instantly</p>
                            <button class="hero-play-button" @click="handlePlayNowClick">
                                PLAY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
        <!-- Content Overlay -->
        <div class="hero-overlay">
            <div class="hero-content">
                <div class="hero-left">
                    <div class="hero-glow-circle"></div>
                </div>
            </div>
        </div>
        
        <!-- Sign In Modal -->
        <SignInModal 
            :show="showSignInModal" 
            @close="showSignInModal = false" 
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SignInModal from '@/components/SignInModal.vue';

export default {
    name: 'HeroBanner',
    components: {
        SignInModal
    },
    data() {
        return {
            showSignInModal: false,
            currentImageIndex: 0,
            carouselImages: [
                require('@/assets/img/banner/theTitle.png'),
                require('@/assets/img/banner/theTitle_001.png')
            ],
            carouselInterval: null
        }
    },
    computed: {
        ...mapGetters(['authUser'])
    },
    mounted() {
        this.startCarousel();
    },
    beforeDestroy() {
        this.stopCarousel();
    },
    methods: {
        startCarousel() {
            this.carouselInterval = setInterval(() => {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
            }, 8000);
        },
        stopCarousel() {
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
                this.carouselInterval = null;
            }
        },
        handlePlayNowClick() {
            // If user is not logged in, show sign in modal
            if (this.authUser.user === null) {
                this.showSignInModal = true;
            } else {
                // If user is logged in, navigate to Our Casino page
                this.$router.push('/our-casino');
            }
        }
    }
}
</script>

<style scoped>
.hero-banner {
    position: relative;
    margin: 0 100px 12px 100px;
    padding: var(--spacing-lg);
    overflow: visible;
    min-height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
}

/* Desert Background Container */
.hero-desert-bg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: visible;
    border-radius: 25px;
}

/* Ensure smooth continuous carousel transitions */
.hero-desert-bg-container > * {
    will-change: transform;
}

/* Desert Background */
.hero-desert-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 2px solid var(--accent-blue-dark);
    border-radius: 25px;
}

@media only screen and (max-width: 768px) {
    .hero-desert-bg {
        background-size: cover;
        background-position: center center;
    }
}

/* Slide animation from right to left */
.slide-right-to-left-enter-active,
.slide-right-to-left-leave-active {
    transition: transform 1.5s ease-in-out;
}

.slide-right-to-left-enter {
    transform: translateX(100%);
}

.slide-right-to-left-enter-to {
    transform: translateX(0);
}

.slide-right-to-left-leave {
    transform: translateX(0);
}

.slide-right-to-left-leave-to {
    transform: translateX(-100%);
}

/* White Snow Image */
.hero-white-snow {
    position: absolute;
    top: -15px;
    left: 8px;
    z-index: 3;
    pointer-events: none;
    user-select: none;
    max-width: 300px;
    max-height: 300px;
    width: auto;
    height: auto;
    object-fit: contain;
}

@media only screen and (max-width: 768px) {
    .hero-white-snow {
        max-width: 200px;
        max-height: 200px;
        top: -10px;
        left: 8px;
    }
}

@media only screen and (max-width: 480px) {
    .hero-white-snow {
        max-width: 150px;
        max-height: 150px;
        top: -8px;
        left: 12px;
    }
}

/* Christmas Images Container */
.hero-christmas-images {
    position: absolute;
    left: var(--spacing-2xl);
    top: calc(50% - 210px);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 5;
    pointer-events: none;
    user-select: none;
}

.hero-christmas-tree,
.hero-christmas-text {
    width: auto;
    height: auto;
    max-width: 120px;
    max-height: 80px;
    object-fit: contain;
}


@media only screen and (max-width: 1024px) {
    .hero-christmas-images {
        top: calc(50% - 160px);
        left: var(--spacing-xl);
        gap: 10px;
    }
    
    .hero-christmas-tree,
    .hero-christmas-text {
        max-width: 100px;
        max-height: 65px;
    }
}

@media only screen and (max-width: 768px) {
    .hero-christmas-images {
        top: calc(50% - 150px);
        left: var(--spacing-lg);
        gap: 8px;
    }
    
    .hero-christmas-tree,
    .hero-christmas-text {
        max-width: 100px;
        max-height: 70px;
    }
}

@media only screen and (max-width: 480px) {
    .hero-christmas-images {
        top: calc(50% - 120px);
        left: var(--spacing-md);
        gap: 6px;
    }
    
    .hero-christmas-tree,
    .hero-christmas-text {
        max-width: 80px;
        max-height: 60px;
    }
}

/* Hero Banner Text Overlay Wrapper */
.hero-banner-text-wrapper {
    position: absolute;
    left: var(--spacing-2xl);
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: auto;
    max-width: 60%;
    pointer-events: auto;
}

/* Hero Banner Text Overlay (with button) */
.hero-banner-text-wrapper .hero-banner-text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    pointer-events: auto;
}

@media only screen and (max-width: 1024px) {
    .hero-banner-text-wrapper .hero-banner-text {
        gap: var(--spacing-sm);
    }
}

@media only screen and (max-width: 768px) {
    .hero-banner-text-wrapper .hero-banner-text {
        gap: 4px;
    }
}

@media only screen and (max-width: 480px) {
    .hero-banner-text-wrapper .hero-banner-text {
        gap: 2px;
    }
}

.hero-title {
    color: var(--gradient-title-text);
    font-family: 'Anton SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 64px;
    line-height: 100%;
    letter-spacing: 0%;
    margin: 0;
    padding: 0;
    background: var(--gradient-title-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0%;
    margin: 0;
    margin-top: var(--spacing-md);
    padding: 0;
}

.hero-subtitle-2 {
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0%;
    margin: 0;
    margin-top: var(--spacing-md);
    padding: 0;
}

@media only screen and (max-width: 1024px) {
    .hero-subtitle,
    .hero-subtitle-2 {
        margin-top: var(--spacing-sm);
        font-size: 13px;
        line-height: 18px;
    }
}

@media only screen and (max-width: 768px) {
    .hero-subtitle,
    .hero-subtitle-2 {
        margin-top: 0;
        font-size: 11px;
        line-height: 16px;
    }
}

@media only screen and (max-width: 480px) {
    .hero-subtitle,
    .hero-subtitle-2 {
        margin-top: 0;
        font-size: 10px;
        line-height: 14px;
    }
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
    pointer-events: none;
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
        min-height: 300px;
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

@media only screen and (max-width: 1024px) {
    .hero-right {
        padding: 0;
        align-items: center;
        justify-content: center;
    }
}

.hero-play-button {
    padding: var(--spacing-lg) var(--spacing-2xl);
    background: var(--gradient-button-bg);
    color: var(--bg-menu-sidebar);
    border: none;
    border-radius: var(--radius-md);
    font-weight: 800;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
        0 8px 25px rgba(222, 199, 156, 0.5),
        0 0 30px rgba(222, 199, 156, 0.3),
        inset 0 2px 10px rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
    width: fit-content;
    margin-top: var(--spacing-md);
    align-self: flex-start;
    pointer-events: auto;
    z-index: 15;
}

@media only screen and (max-width: 1024px) {
    .hero-play-button {
        margin-top: var(--spacing-sm);
    }
}

@media only screen and (max-width: 768px) {
    .hero-play-button {
        margin-top: 4px;
    }
}

@media only screen and (max-width: 480px) {
    .hero-play-button {
        margin-top: 2px;
    }
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
        0 12px 35px rgba(222, 199, 156, 0.7),
        0 0 50px rgba(222, 199, 156, 0.5),
        inset 0 2px 10px rgba(255, 255, 255, 0.4);
}

.hero-play-button:hover::before {
    left: 100%;
}

.hero-play-button:active {
    transform: scale(1.02) translateY(0);
}

@media only screen and (max-width: 1024px) {
    .hero-banner {
        min-height: 350px;
    }
    
    .hero-content {
        flex-direction: column;
        gap: var(--spacing-lg);
        justify-content: center;
    }
    
    .hero-left {
        min-height: 150px;
        justify-content: center;
        padding-left: 0;
    }
    
    .hero-glow-circle {
        width: 200px;
        height: 200px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .hero-play-button {
        padding: var(--spacing-sm) var(--spacing-lg);
        font-size: 16px;
        margin-top: var(--spacing-sm);
    }
    
    .hero-title {
        font-size: 36px;
    }
    
    .hero-subtitle {
        font-size: 13px;
        line-height: 18px;
        margin-top: var(--spacing-sm);
    }
    
    .hero-subtitle-2 {
        font-size: 13px;
        line-height: 18px;
        margin-top: var(--spacing-sm);
    }
    
    .hero-banner-text-wrapper {
        left: var(--spacing-lg);
        max-width: 70%;
    }
}

@media only screen and (max-width: 768px) {
    .hero-banner {
        margin: 40px var(--spacing-md) var(--spacing-md) var(--spacing-md);
        padding: var(--spacing-md);
        min-height: 280px;
        max-height: 400px;
    }
    
    .hero-desert-bg-container {
        min-height: 280px;
    }
    
    .hero-overlay {
        padding: var(--spacing-lg) var(--spacing-md);
        min-height: 280px;
    }
    
    .hero-content {
        flex-direction: column;
        gap: var(--spacing-md);
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    
    .hero-left {
        min-height: 100px;
        width: 100%;
        justify-content: center;
        padding-left: 0;
    }
    
    .hero-play-button {
        padding: 6px var(--spacing-md);
        font-size: 12px;
        letter-spacing: 0.5px;
        width: auto;
        min-width: 100px;
        margin-top: 4px;
        align-self: flex-start;
    }
    
    .hero-glow-circle {
        width: 120px;
        height: 120px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .hero-title {
        font-size: 28px;
    }
    
    .hero-subtitle {
        font-size: 11px;
        line-height: 16px;
        margin-top: 0;
    }
    
    .hero-subtitle-2 {
        font-size: 11px;
        line-height: 16px;
        margin-top: 0;
    }
    
    .hero-banner-text-wrapper {
        left: var(--spacing-md);
        max-width: 80%;
    }
    
    .hero-banner-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    
    .desert-sun {
        display: none;
    }
}

@media only screen and (max-width: 480px) {
    .hero-banner {
        margin: 30px var(--spacing-sm) var(--spacing-sm) var(--spacing-sm);
        padding: var(--spacing-sm);
        min-height: 250px;
        max-height: 350px;
    }
    
    .hero-desert-bg-container {
        min-height: 250px;
    }
    
    .hero-overlay {
        padding: var(--spacing-md);
        min-height: 250px;
    }
    
    .hero-content {
        gap: var(--spacing-sm);
    }
    
    .hero-left {
        min-height: 80px;
    }
    
    .hero-play-button {
        padding: 4px var(--spacing-sm);
        font-size: 10px;
        letter-spacing: 0.5px;
        min-width: 80px;
        margin-top: 2px;
    }
    
    .hero-glow-circle {
        width: 100px;
        height: 100px;
    }
    
    .hero-title {
        font-size: 22px;
    }
    
    .hero-subtitle {
        font-size: 10px;
        line-height: 14px;
        margin-top: 0;
    }
    
    .hero-subtitle-2 {
        font-size: 10px;
        line-height: 14px;
        margin-top: 0;
    }
    
    .hero-banner-text-wrapper {
        left: var(--spacing-sm);
        max-width: 85%;
    }
    
    .hero-banner-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
}

</style>
