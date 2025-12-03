<template>
    <div class="hero-banner">
        <!-- Desert Landscape Background -->
        <div class="hero-desert-bg-container">
            <div 
                v-for="(image, index) in carouselImages" 
                :key="index"
                class="hero-desert-bg"
                :class="{ 'bg-active': index === currentImageIndex }"
                :style="{ backgroundImage: `url(${image})` }"
            >
                <div class="desert-sun"></div>
            </div>
        </div>
        
        <!-- Content Overlay -->
        <div class="hero-overlay">
            <div class="hero-content">
                <div class="hero-left">
                    <div class="hero-glow-circle"></div>
                </div>
                <div class="hero-right">
                    <button class="hero-play-button" @click="handlePlayNowClick">
                        PLAY NOW
                    </button>
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
            }, 5000);
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
    margin: 0px;
    overflow: hidden;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Desert Background Container */
.hero-desert-bg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
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
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
}

@media only screen and (max-width: 768px) {
    .hero-desert-bg {
        background-size: cover;
        background-position: center center;
    }
}

.hero-desert-bg.bg-active {
    opacity: 1;
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
    background: var(--accent-yellow-main);
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
        min-height: 400px;
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
    
    .hero-right {
        align-items: center;
        text-align: center;
        padding: 0;
    }
    
    .hero-glow-circle {
        width: 200px;
        height: 200px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .hero-play-button {
        padding: var(--spacing-md) var(--spacing-xl);
        font-size: 20px;
    }
}

@media only screen and (max-width: 768px) {
    .hero-banner {
        margin: 0;
        min-height: 350px;
        max-height: 500px;
    }
    
    .hero-desert-bg-container {
        min-height: 350px;
    }
    
    .hero-overlay {
        padding: var(--spacing-lg) var(--spacing-md);
        min-height: 350px;
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
    
    .hero-right {
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
    
    .hero-play-button {
        padding: var(--spacing-md) var(--spacing-lg);
        font-size: 16px;
        letter-spacing: 1px;
        width: auto;
        min-width: 140px;
        margin-top: 47px;
    }
    
    .hero-glow-circle {
        width: 120px;
        height: 120px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .desert-sun {
        display: none;
    }
}

@media only screen and (max-width: 480px) {
    .hero-banner {
        min-height: 300px;
        max-height: 400px;
    }
    
    .hero-desert-bg-container {
        min-height: 300px;
    }
    
    .hero-overlay {
        padding: var(--spacing-md);
        min-height: 300px;
    }
    
    .hero-content {
        gap: var(--spacing-sm);
    }
    
    .hero-left {
        min-height: 80px;
    }
    
    .hero-play-button {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: 14px;
        letter-spacing: 0.5px;
        min-width: 120px;
        margin-top: 35px;
    }
    
    .hero-glow-circle {
        width: 100px;
        height: 100px;
    }
}

</style>
