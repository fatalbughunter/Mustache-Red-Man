<template>
    <div class="modal-privacy">
        <div class="privacy-header">
            <span class="gradient-green">PRIVACY POLICY</span>
            <p>Mustache Casino is committed to protecting the privacy of its users. This privacy policy applies to the
            Mustache Casino website and services, and explains how we collect, use, and disclose information
            about you.</p>
            <p>By using our website and services, you acknowledge and consent to the practices described in
            this privacy policy.</p>
        </div>
        <div class="privacy-list">

            <div class="list-element">
                <div class="element-title">1. Information We Collect</div>
                <div class="element-text">
                    <p><strong>1.1 Account & Basic Info</strong></p>
                    <p>When you create an account or interact with our site, we may collect information such as your username, email address, IP address, and any details you choose to enter.</p>
                    <p><strong>1.2 Website Usage</strong></p>
                    <p>We collect general information about how you use our site (pages visited, time spent, device type, browser type, etc.) to help improve our services.</p>
                    <p><strong>1.3 Cookies</strong></p>
                    <p>We use cookies to make our website work smoothly and improve your experience. You can disable cookies in your browser, but some features may not work properly.</p>
                    <p><strong>1.4 Location Info</strong></p>
                    <p>We may detect your approximate location using your IP address to help protect your account and comply with regulations.</p>
                </div>
            </div>

            <div class="list-element">
                <div class="element-title">2. How We Use Your Information</div>
                <div class="element-text">
                    <p><strong>2.1 To Provide Our Services</strong></p>
                    <p>We use collected information to run Mustache Casino and offer features such as:</p>
                    <ul>
                        <li>Verifying your account</li>
                        <li>Processing transactions</li>
                        <li>Sending important notifications</li>
                        <li>Providing customer support</li>
                        <li>Improving site performance and functionality</li>
                    </ul>
                    <p><strong>2.2 Communication & Updates</strong></p>
                    <p>We may send you updates, promotions, or offers related to Mustache Casino. You can unsubscribe anytime.</p>
                    <p><strong>2.3 Development & Safety</strong></p>
                    <p>We may use your information to test new features, prevent fraud, and comply with legal requirements.</p>
                </div>
            </div>

            <div class="list-element">
                <div class="element-title">3. Sharing Your Information</div>
                <div class="element-text">
                    <p><strong>3.1 Service Providers</strong></p>
                    <p>We may share information with trusted third-party partners who help run our website (hosting, payment processing, support tools). They can only use the data for the tasks we assign.</p>
                    <p><strong>3.2 Legal Requirements</strong></p>
                    <p>We may share information if required by law, such as responding to a court order.</p>
                    <p><strong>3.3 Business Changes</strong></p>
                    <p>If Mustache Casino is ever sold or merged, your information may be transferred as part of the business.</p>
                </div>
            </div>

            <div class="list-element">
                <div class="element-title">4. Keeping Your Information Safe</div>
                <div class="element-text">
                    <p>We use reasonable security measures to protect your data, but no system is 100% secure.</p>
                    <p>You are responsible for keeping your account details and password safe.</p>
                </div>
            </div>

            <div class="list-element">
                <div class="element-title">5. Children's Privacy</div>
                <div class="element-text">
                    <p>Mustache Casino is not for users under 18. We do not knowingly collect information from anyone under that age. If we discover such information, we delete it.</p>
                </div>
            </div>

            <div class="list-element">
                <div class="element-title">6. Changes to This Policy</div>
                <div class="element-text">
                    <p>We may update this Privacy Policy from time to time. The newest version will always be posted on our website. Continued use of Mustache Casino means you accept any updated terms.</p>
                </div>
            </div>

            <div class="list-element">
                <div class="element-title">Contact Us</div>
                <div class="element-text">
                    <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
                    <p>support@mustachecasino.com</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalPrivacy'
    }
</script>

<style scoped>
    .modal-privacy {
        width: 1000px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 30px 0 30px;
        border-radius: 15px;
        background: var(--bg-primary-blue);
    }

    .modal-privacy .privacy-header {
        width: 100%;
        padding-bottom: 30px;
        border-bottom: 1px solid #335361;
    }

    .modal-privacy .privacy-header span  {
        font-size: 32px;
        font-weight: 900;
    }

    .modal-privacy .privacy-header p  {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .modal-privacy .privacy-list {
        width: 100%;
        height: 600px;
        padding: 30px 20px 30px 0;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .modal-privacy .privacy-list::-webkit-scrollbar {
        width: 5px;
        height: 0;
    }

    .modal-privacy .privacy-list::-webkit-scrollbar-track {
        margin: 30px 0;
        background-color: #062234;
    }

    .modal-privacy .privacy-list::-webkit-scrollbar-thumb {
        background-color: #1e5164;
    }

    .modal-privacy .list-element {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 25px;
    }

    .modal-privacy .list-element:first-child {
        margin-top: 0;
    }

    .modal-privacy .element-title {
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
    }

    .modal-privacy .element-text {
        width: 100%;
        margin-top: 15px;
        padding-left: 30px;
    }

    .modal-privacy .element-text p {
        margin-top: 15px;
        font-size: 14px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .modal-privacy .element-text p:first-child {
        margin-top: 0;
    }

    .modal-privacy .element-text ul {
        margin-top: 15px;
        padding-left: 50px;
    }

    @media only screen and (max-width: 1190px) {

        .modal-privacy {
            width: calc(100vw - 20px);
        }

    }

    @media only screen and (max-width: 700px) {

        .modal-privacy {
            padding: 80px 15px 0 15px;
        }

    }
</style>
