<template>
    <div class="profile">
        <div class="profile-container">
            <ProfileHeader />
            <ProfileStats />
            <div class="container-nav">
                <ProfileFilterNav />
            </div>
            <div class="container-content">
                <transition name="slide-fade" mode="out-in">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileHeader from '@/components/profile/ProfileHeader';
    import ProfileStats from '@/components/profile/ProfileStats';
    import ProfileFilterNav from '@/components/profile/ProfileFilterNav';

    export default {
        name: 'Profile',
        components: {
            ProfileHeader,
            ProfileStats,
            ProfileFilterNav
        },
        metaInfo: {
            title: 'Profile - RBLXRoll.com'
        }
    }
</script>

<style scoped>
    .profile {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 55px 0px 45px 0px;
    }

    .profile .profile-container {
        width: 1160px;
        padding: 50px 40px 25px 40px;
        border-radius: var(--radius-lg);
        /* Desert sand background matching header theme */
        background: 
            /* Sand grain texture overlay */
            radial-gradient(circle at 20% 30%, rgba(222, 184, 135, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(184, 115, 51, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(205, 127, 50, 0.1) 0%, transparent 50%),
            /* Fine sand texture pattern */
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(222, 184, 135, 0.03) 2px,
                rgba(222, 184, 135, 0.03) 3px
            ),
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(184, 115, 51, 0.03) 2px,
                rgba(184, 115, 51, 0.03) 3px
            ),
            /* Main desert sand gradient */
            linear-gradient(
                180deg,
                rgba(222, 184, 135, 0.25) 0%,
                rgba(205, 127, 50, 0.30) 25%,
                rgba(184, 115, 51, 0.35) 50%,
                rgba(139, 111, 71, 0.30) 75%,
                rgba(101, 67, 33, 0.25) 100%
            ),
            /* Base dark background */
            rgba(26, 20, 15, 0.98);
        backdrop-filter: blur(10px) saturate(120%);
        border: 2px solid rgba(222, 184, 135, 0.6);
        box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.9),
            0 5px 20px rgba(184, 115, 51, 0.4),
            inset 0 1px 0 rgba(222, 184, 135, 0.2);
    }

    .profile .container-nav {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: flex-end;
        margin-top: 50px;
    }

    .profile .container-nav::before {
        content: '';
        height: 1px;
        position: absolute;
        top: 50%;
        left: 0;
        right: 200px;
        transform: translate(0, -50%);
        background: rgba(222, 184, 135, 0.2);

    }

    .profile .container-content {
        width: 100%;
        margin-top: 25px;
    }

    @media only screen and (max-width: 1180px) {

        .profile {
            padding: 55px 10px 45px 10px;
        }

        .profile .profile-container {
            width: 100%;
            padding: 50px 15px 25px 15px;
        }

    } 

    @media only screen and (max-width: 600px) {

        .profile .container-nav::before {
            display: none;

        }

    }
</style>