<template>
    <div class="game-frame-container">
        <div v-if="!session" class="no-session">
            <p>No active game session</p>
        </div>
        <div v-else-if="session.game_url" class="iframe-wrapper">
            <iframe
                :src="session.game_url"
                :key="session.game_url"
                class="game-iframe"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        <div v-else class="loading-session">
            <div class="spinner"></div>
            <p>Loading game session...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlotsGameFrame',
    props: {
        session: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.game-frame-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.no-session {
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
}

.loading-session {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(212, 165, 116, 0.3);
    border-top: 4px solid var(--color-copper);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-session p {
    color: var(--color-copper);
    font-size: 16px;
    font-weight: 600;
}

.iframe-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.game-iframe {
    width: 100%;
    height: 100%;
    border: none;
}
</style>
