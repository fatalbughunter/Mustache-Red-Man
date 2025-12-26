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
                avatarImage: null
            }
        },
        methods: {
            avatarImageError() {
                this.avatarImage = require('@/assets/img/anon.png');
            },
            getAvatarUrl(image) {
                if (image === undefined || image === null) {
                    return require('@/assets/img/anon.png');
                }

                // If image is already a full URL (starts with http:// or https://), use it as-is
                if (image.startsWith('http://') || image.startsWith('https://')) {
                    return image;
                }

                // If image is a local path starting with /uploads/avatars/, prepend backend URL
                if (image.startsWith('/uploads/avatars/')) {
                    const backendUrl = process.env.VUE_APP_BACKEND_URL || 'https://api.tachebet.com';
                    return `${backendUrl}${image}`;
                }

                // For other paths or require statements, use as-is
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
