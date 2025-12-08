<template>
    <div class="game-card" @click="handleLaunch">
        <div class="game-image-container">
            <img 
                :src="game.image || `https://via.placeholder.com/300x200?text=${game.name}`"
                :alt="game.name"
                class="game-image"
                @error="setDefaultGameImage"
            />
            <div v-if="launching" class="launching-overlay">
                <div class="spinner"></div>
                <p>Launching...</p>
            </div>
            <div v-else class="game-overlay">
                <div class="play-controls">
                    <ButtonGradient 
                        text="Real Balance" 
                        small
                        :active="selectedBalance === 'realBalance'"
                        @click.stop="selectBalance('realBalance')"
                    />
                    <ButtonGradient 
                        text="Test Balance" 
                        small
                        :active="selectedBalance === 'testBalance'"
                        @click.stop="selectBalance('testBalance')"
                    />
                    <ButtonGradient 
                        text="Play Now" 
                        small
                        @click.stop="handleLaunch"
                    />
                </div>
            </div>
        </div>
        <div class="game-info">
            <h4 class="game-name">{{ game.name }}</h4>
            <p class="game-provider">{{ game.provider_name || providerCode }}</p>
            <div v-if="game.rtp" class="game-rtp">
                <span>RTP: {{ game.rtp }}%</span>
            </div>
            <div class="favorite-icon" @click.stop="toggleFavorite">
                <span class="star" :class="{ active: isFavorite }">★</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonGradient from '@/components/ButtonGradient.vue';

export default {
    name: 'SlotsGameCard',
    components: {
        ButtonGradient
    },
    props: {
        game: {
            type: Object,
            required: true
        },
        providerCode: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            launching: false,
            selectedBalance: 'realBalance'
        };
    },
    computed: {
        ...mapGetters(['authenticated', 'userId']),
        ...mapGetters('slots', ['gameSession', 'favorites']),
        isFavorite() {
            return this.favorites.includes(this.game.code);
        }
    },
    methods: {
        ...mapActions('slots', ['launchGameSeamless', 'addFavorite', 'removeFavorite']),
        ...mapActions(['notificationShow']),

        selectBalance(balanceType) {
            this.selectedBalance = balanceType;
        },

        async handleLaunch() {
            if (!this.authenticated) {
                console.log('User not authenticated');
                this.notificationShow({ type: 'error', message: 'Please login to play' });
                return;
            }

            this.launching = true;

            try {
                const session = await this.launchGameSeamless({
                    providerCode: this.providerCode,
                    gameCode: this.game.code,
                    balanceType: this.selectedBalance
                });

                if (session) {
                    this.$emit('launch', {
                        provider: this.providerCode,
                        game: this.game.code,
                        session,
                        balanceType: this.selectedBalance
                    });
                }
            } catch (error) {
                console.error('Failed to launch game:', error);
            } finally {
                this.launching = false;
            }
        },

        async toggleFavorite() {
            if (this.isFavorite) {
                await this.removeFavorite(this.game.code);
            } else {
                await this.addFavorite(this.game.code);
            }
        },

        setDefaultGameImage(event) {
            event.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23222" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="16" fill="%23d4a574" font-family="Arial"%3E${encodeURIComponent(this.game.name)}%3C/text%3E%3C/svg%3E`;
        }
    }
};
</script>

<style scoped>
.game-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(212, 165, 116, 0.2);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 250px; /* fixed card height */
    width: 100%;
}

.game-card:hover {
    border-color: rgba(212, 165, 116, 0.6);
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(212, 165, 116, 0.2);
}

.game-image-container {
    position: relative;
    width: 100%;
    /* fixed image area: 65% of card */
    height: calc(100% * 0.65);
    flex: 0 0 auto;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.game-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* ensure image fills container */
    object-position: center;
    transition: transform 0.3s ease;
    display: block;
}

.game-card:hover .game-image {
    transform: scale(1.05);
}

.game-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: var(--spacing-md);
    z-index: 5;
}

.game-card:hover .game-overlay {
    opacity: 1;
}

.play-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    width: 100%;
}

.launching-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    z-index: 15;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(212, 165, 116, 0.3);
    border-top: 3px solid var(--color-copper);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.launching-overlay p {
    color: var(--color-copper);
    font-size: 14px;
    font-weight: 600;
}

.game-info {
    padding: var(--spacing-md);
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    height: calc(100% * 0.35); /* remaining card height */
    box-sizing: border-box;
    overflow: hidden;
}

.game-name {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    margin-bottom: var(--spacing-xs);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* ensure long names don't wrap */
}

.game-provider {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: var(--spacing-sm);
}

.game-rtp {
    padding-top: var(--spacing-sm);
    border-top: 1px solid rgba(212, 165, 116, 0.2);
}

.game-rtp span {
    font-size: 12px;
    color: var(--color-copper);
    font-weight: 600;
}

.favorite-icon {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.favorite-icon .star {
    color: rgba(212, 165, 116, 0.3);
    transition: color 0.2s ease;
}

.favorite-icon .star.active {
    color: var(--color-copper);
    text-shadow: 0 0 10px rgba(212, 165, 116, 0.8);
}

.favorite-icon:hover .star {
    transform: scale(1.2);
}
</style>
