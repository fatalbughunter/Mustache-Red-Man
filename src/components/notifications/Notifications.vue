<template>
    <div class="notifications" v-bind:class="{ 'chat-open': generalDesktopChatOpen }">
        <transition-group name="slide">

            <NotificationsElement v-for="notification in notifications" v-bind:key="notification.id" v-bind:notification="notification" />

        </transition-group>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import NotificationsElement from '@/components/notifications/NotificationsElement';

    export default {
        name: 'Notification',
        components: {
            NotificationsElement
        },
        computed: {
            ...mapGetters(['notifications', 'generalDesktopChatOpen'])
        }
    }
</script>

<style scoped>
    .notifications {
        position: fixed !important;
        right: 35px;
        top: 100px; /* Position below 80px header + 20px spacing */
        z-index: 10000000 !important; /* HIGHEST PRIORITY - above modals (9999999), chat, and all other elements */
        transition: right 0.3s ease;
        pointer-events: none; /* Allow clicks to pass through to elements below */
        max-width: calc(100vw - 70px); /* Prevent overflow beyond viewport */
        overflow: visible; /* Ensure notifications are never clipped */
    }
    
    /* Notification elements should capture pointer events */
    .notifications > * {
        pointer-events: auto;
    }
    
    /* Adjust position when chat is open on desktop to prevent being cut off */
    .notifications.chat-open {
        right: 360px; /* 35px original + 325px chat width */
        max-width: calc(100vw - 395px); /* Adjust max-width when chat is open */
    }
    
    /* On desktop, ensure notifications are below the header */
    @media only screen and (min-width: 1501px) {
        .notifications {
            top: 100px; /* Header height (80px) + spacing (20px) */
            right: 35px;
        }
        
        .notifications.chat-open {
            right: 360px; /* Adjust for chat width on desktop */
            max-width: calc(100vw - 395px);
        }
    }
    
    /* On mobile/tablet, header is at bottom, so notifications can be near top */
    @media only screen and (max-width: 1500px) {
        .notifications {
            top: 20px; /* Small spacing from top since header is at bottom */
            bottom: auto;
            right: 35px;
            max-width: calc(100vw - 70px);
        }
    }
    
    /* On mobile/tablet, chat slides in from side, notifications don't need adjustment */
    @media only screen and (max-width: 1024px) {
        .notifications {
            right: 35px !important;
            z-index: 10000000 !important; /* Still highest priority above everything */
            max-width: calc(100vw - 70px);
        }
        
        .notifications.chat-open {
            right: 35px !important; /* Chat on mobile doesn't affect notification position */
            max-width: calc(100vw - 70px);
        }
    }

    .notifications .slide-enter-active,
    .notifications .slide-leave-active {
        transition: all 0.4s;
    }

    .notifications .slide-enter,
    .notifications .slide-leave-to {
        opacity: 0;
        transform: translate(50px, 0);
    }
</style>
