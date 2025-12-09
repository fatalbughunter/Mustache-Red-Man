<template>
    <div class="chat-room-display">
        <div class="room-display">
            <img src="@/assets/img/rooms/en.svg" alt="room-icon" />
            ENGLISH
            <span class="room-online">({{chatOnline.en}})</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ChatRoomDropdown',
        computed: {
            ...mapGetters(['chatOnline'])
        }
    }
</script>

<style scoped>
    .chat-room-display {
        width: 100%;
        margin-top: 18px;
    }

    .chat-room-display .room-display {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-yellow);
        background: transparent;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .chat-room-display .room-display img {
        margin-right: 12px;
    }

    .chat-room-display .room-display .room-online {
        margin-left: 5px;
        font-weight: 600;
        color: var(--accent-yellow);
    }
</style>
