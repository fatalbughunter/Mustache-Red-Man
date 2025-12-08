<template>
    <div class="avatar-image">
        <img v-bind:src="avatarImage" @error="avatarImageError()" alt="avatar" />
    </div>
</template>

<script>
    export default {
        name: 'AvatarImage',
        props: ['image'],
        data() {
            return {
                avatarImage: null,
                baseUrl: process.env.VUE_APP_BACKEND_URL || 'https://api.novacasino.bet'
            }
        },
        methods: {
            avatarImageError() {
                this.avatarImage = require('@/assets/img/anon.png');
            },
            getAvatarUrl(image) {
                if (!image || image === null || image === undefined) {
                    return require('@/assets/img/anon.png');
                }
                
                // If it's already a full URL, use it as-is
                if (image.startsWith('http://') || image.startsWith('https://')) {
                    return image;
                }
                
                // If it starts with /uploads/avatars/, prepend base URL
                if (image.startsWith('/uploads/avatars/')) {
                    return this.baseUrl + image;
                }
                
                // If it's just a filename, construct the full path
                if (image && !image.includes('/')) {
                    return `${this.baseUrl}/uploads/avatars/${image}`;
                }
                
                // For relative paths, prepend base URL
                if (image.startsWith('/')) {
                    return this.baseUrl + image;
                }
                
                // Default: assume it's a full URL or return as-is
                return image;
            }
        },
        created() {
            this.avatarImage = this.getAvatarUrl(this.image);
        },
        watch: {
            image(newImage) {
                this.avatarImage = this.getAvatarUrl(newImage);
            }
        }
    }
</script>

<style scoped>
    .avatar-image {
        overflow: hidden;
    }

    .avatar-image img {
        width: 100%;
        height: 100%;
    }
</style>
