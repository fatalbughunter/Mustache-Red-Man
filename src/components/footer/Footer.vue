<template>
    <div class="footer-wrapper">
        <footer id="footer">
            <div class="footer-top">
                <div class="top-info">
                    <img src="@/assets/img/tacheLogo.png" width="30" height="100" />
                    <div class="info-text">
                        Mustache-Casino.com is the #1 Gaming Platform and offers the best experience & rewards to our users.
                        <span class="gradient-yellow">Innovative Gaming Experience</span>
                    </div>
                </div>
                <div class="top-links">
                    <div class="section-titles-row">
                        <div class="section-title">OUR GAMES</div>
                        <div class="section-title">ABOUT US</div>
                        <div class="section-title">ADDITIONAL</div>
                    </div>
                    <div class="links-content">
                        <div class="links-section">
                            <router-link to="/mines">
                                <IconMines />
                                <span class="gradient-yellow">Mines</span>
                            </router-link>
                            <router-link to="/blackjack">
                                <IconBlackjack />
                                <span class="gradient-yellow">Black Jack</span>
                            </router-link>
                            <router-link to="/crash">
                                <IconCrash />
                                <span class="gradient-yellow">Crash</span>
                            </router-link>
                            <router-link to="/towers">
                                <IconTowers />
                                <span class="gradient-yellow">Tower</span>
                            </router-link>
                        </div>
                        <div class="links-section">
                            <button v-on:click="modalsSetShow('Terms')">TOS</button>
                            <button v-on:click="modalsSetShow('Faq')">FAQ</button>
                            <button v-on:click="modalsSetShow('Privacy')">Privacy</button>
                        </div>
                        <div class="links-section">
                            <router-link to="/affiliates">Affiliates</router-link>
                            <router-link to="/leaderboard">Leaderboard</router-link>
                            <!-- <a href="https://discord.gg/rblxroll" target="_blank">Support</a> -->
                            <button v-on:click="modalsSetShow('Fair')">Provably Fair</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="footer-legal">
            <p class="legal-text">
                Tachebet is owned and operated by Entertainment N.V., Curaçao company registration number 160909, with its registered address at 42 Kaya Pied'i Bos, Tera Kora, Curaçao and is licensed by the Curaçao Gaming Control Board to offer games of chance under license number OGL/2024/833/1005. Contact us at <a href="mailto:support@tachebet.com">support@tachebet.com</a>.
            </p>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import IconMines from '@/components/icons/IconMines';
    import IconBlackjack from '@/components/icons/IconBlackjack';
    import IconCrash from '@/components/icons/IconCrash';
    import IconTowers from '@/components/icons/IconTowers';

    export default {
        name: 'Footer',
        components: {
            IconMines,
            IconBlackjack,
            IconCrash,
            IconTowers
        },
        methods: {
            ...mapActions([
                'modalsSetShow'
            ])
        }
    }
</script>

<style>
    .footer-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        background: url('../../assets/img/mainSnowBk.png') no-repeat center center;
        background-size: cover;
        background-attachment: fixed;
    }

    footer#footer {
      /*  width: calc(100% - 2 * var(--spacing-lg));*/
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px var(--spacing-lg) 12px var(--spacing-lg);
        margin: 0 100px 21px 100px;
        margin-bottom: var(--spacing-xl);
        background-image: url('../../assets/img/banner/footer.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid var(--accent-blue-dark);
        border-radius: 25px;
    }

    footer#footer .footer-top {
        width: 1024px;
        position: relative;
        display: flex;
        justify-content: center;
        padding-bottom: 32px;
    }

    footer#footer .footer-top::after {
        display: none;
    }

    footer#footer .top-info {
        width: 245px;
        position: relative;
        padding-right: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    footer#footer .top-info::after {
        display: none;
    }

    footer#footer .top-info img {
        width: 100px;
    }

    footer#footer .info-text {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        font-size: 12px;
        font-weight: 400;
        color: var(--text-gray-hero);
        text-align: center;
        align-items: center;
    }

    footer#footer .info-text span {
        color: #ffffff;
        margin-top: 20px;
        font-size: 12px;
        font-weight: 700;
    }

    footer#footer .top-links {
       width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    footer#footer .section-titles-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        margin-bottom: 20px;
    }

    footer#footer .section-titles-row .section-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--text-gray-hero);
        white-space: nowrap;
        word-break: keep-all;
    }

    footer#footer .links-content {
        display: flex;
        justify-content: center;
        gap: 40px;
    }

    footer#footer .links-section {
        display: flex;
        flex-direction: column;
        min-width: fit-content;
    }

    footer#footer .links-section a,
    footer#footer .links-section button {
        display: flex;
        align-items: center;
        justify-content: left;
        margin-bottom: 12px;
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-blue-light);
        transition: color 0.3s ease;
        white-space: nowrap;
        word-break: keep-all;
        word-break: keep-all;
    }

    footer#footer .links-section a:hover,
    footer#footer .links-section button:hover {
        color: var(--accent-blue-light);
        opacity: 0.8;
    }

    footer#footer .links-section a:last-child,
    footer#footer .links-section button:last-child {
        margin-bottom: 0;
    }

    footer#footer .links-section a svg,
    footer#footer .links-section button svg {
        margin-right: 9px;
    }

    footer#footer .links-section a span,
    footer#footer .links-section button span {
        white-space: nowrap;
        word-break: keep-all;
    }

    .footer-legal {
        width: 100%;
        max-width: 1200px;
        padding: 20px var(--spacing-lg);
        margin: 0 auto 30px auto;
        text-align: center;
    }

    .footer-legal .legal-text {
        font-size: 11px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
        margin: 0;
    }

    .footer-legal .legal-text a {
        color: var(--accent-yellow);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-legal .legal-text a:hover {
        color: var(--accent-yellow);
        opacity: 0.8;
        text-decoration: underline;
    }

    .footer-bottom {
        width: 1250px;
        margin: 0 auto;
        text-align: center;
    }

    .footer-bottom span {
        font-size: 12px;
        font-weight: 600;
        color: var(--gradient-main-txt);
        white-space: normal;
        word-break: normal;
    }

    @media only screen and (max-width: 1600px) {

        footer#footer {
            padding: 50px var(--spacing-md) 12px var(--spacing-md);
            margin: 0 100px 21px 100px;
           /* width: calc(100% - 2 * var(--spacing-md));*/
        }


        .footer-bottom {
            width: 100%;
        }

    }

    @media only screen and (max-width: 950px) {

        footer#footer {
            padding: 30px var(--spacing-md) 12px var(--spacing-md);
/*margin: var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-sm);*/
            margin: 12px;
            /*width: calc(100% - 2 * 100px);*/
        }

        .footer-legal {
            padding: 15px var(--spacing-md);
            margin-bottom: 20px;
        }

        .footer-legal .legal-text {
            font-size: 10px;
        }

        footer#footer .footer-top {
            flex-direction: column-reverse;
            padding-bottom: 15px;
            width: 100%;
        }

        footer#footer .top-info {
            width: 100%;
            display: flex;
            align-items: center;
            padding-top: 25px;
            padding-right: 0;
        }

        footer#footer .info-text {
            width: calc(100% - 82px);
            margin-top: 0;
            padding-left: 25px;
        }

        footer#footer .top-info::after {
            display: none;
        }

        footer#footer .top-links {
            width: 100%;
            padding-bottom: 25px;
            padding-left: 0;
        }

        footer#footer .section-titles-row {
            flex-wrap: wrap;
            gap: 20px;
        }

        footer#footer .links-content {
            flex-wrap: wrap;
            gap: 20px;
        }

    }

    @media only screen and (max-width: 700px) {

        footer#footer .top-links {
            flex-wrap: wrap;
        }

        footer#footer .links-section:nth-child(4) {
            margin-top: 25px;
        }

        footer#footer .section-titles-row {
            gap: 15px;
        }

        footer#footer .section-titles-row .section-title {
            font-size: 13px;
        }

        footer#footer .links-content {
            gap: 15px;
        }

        footer#footer .links-section {
            width: auto;
            min-width: 0;
        }

    }

    @media only screen and (max-width: 450px) {

        footer#footer .links-section {
            width: auto;
            min-width: 0;
        }

        footer#footer .links-section:nth-child(3) {
            margin-top: 0;
        }

    }
</style>

