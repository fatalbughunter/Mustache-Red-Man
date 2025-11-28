<template>
    <div class="notifications">
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
            ...mapGetters(['notifications'])
        }
    }
</script>

<style scoped>
    .notifications {
        position: fixed;
        right: 35px;
        top: 100px; /* Position below 80px header + 20px spacing */
        z-index: 103;
    }
    
    /* On desktop, ensure notifications are below the header */
    @media only screen and (min-width: 1501px) {
        .notifications {
            top: 100px; /* Header height (80px) + spacing (20px) */
        }
    }
    
    /* On mobile/tablet, header is at bottom, so notifications can be near top */
    @media only screen and (max-width: 1500px) {
        .notifications {
            top: 20px; /* Small spacing from top since header is at bottom */
            bottom: auto;
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
