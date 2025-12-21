<template>
    <div v-if="show" class="modal-overlay" @click="close">
        <div class="modal-container" @click.stop>
            <div class="modal-content">
                <!-- Left Panel - Branding -->
                <div class="modal-left">
                    <div class="brand-overlay"></div>
                    <div class="brand-background">
                        <img src="@/assets/img/signup_bk.png" alt="Background" />
                    </div>
                    <div class="brand-content">
                        <div class="brand-logo">
                            <img src="@/assets/img/tacheLogo.png" alt="Mustache Casino" />
                        </div>
                        <h3 class="brand-tagline">Join the Club!</h3>
                        <p class="brand-subtitle">Create your account and start winning today</p>
                    </div>
                </div>

                <!-- Right Panel - Signup Form -->
                <div class="modal-right">
                    <button class="close-button" @click="close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="form-container">
                        <div class="form-header">
                            <h2 class="form-title">Create Account</h2>
                            <p class="form-subtitle">Fill in your details to get started</p>
                        </div>

                        <form @submit.prevent="handleSignup" class="signup-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="username">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                        Username
                                    </label>
                                    <div class="input-wrapper">
                                        <input 
                                            id="username" 
                                            v-model="form.username" 
                                            type="text" 
                                            placeholder="Choose a username" 
                                            required 
                                            autocomplete="username"
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="email">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Email
                                    </label>
                                    <div class="input-wrapper">
                                        <input 
                                            id="email" 
                                            v-model="form.email" 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            required 
                                            autocomplete="email"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="password">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                        Password
                                    </label>
                                    <div class="input-wrapper">
                                        <input 
                                            id="password" 
                                            v-model="form.password" 
                                            :type="showPassword ? 'text' : 'password'" 
                                            placeholder="Create password" 
                                            required 
                                            autocomplete="new-password"
                                        />
                                        <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                                            <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                                            </svg>
                                            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="passwordConfirm">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Confirm
                                    </label>
                                    <div class="input-wrapper">
                                        <input 
                                            id="passwordConfirm" 
                                            v-model="form.passwordConfirm" 
                                            :type="showPassword ? 'text' : 'password'" 
                                            placeholder="Confirm password" 
                                            required 
                                            autocomplete="new-password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="referral-section">
                                <button type="button" class="referral-toggle" @click="showReferral = !showReferral">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M12 3v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Referral Code (Optional)
                                    <span class="arrow" :class="{ 'arrow-open': showReferral }">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </button>
                                <transition name="slide">
                                    <div v-if="showReferral" class="referral-input">
                                        <input 
                                            v-model="form.referralCode" 
                                            type="text" 
                                            placeholder="Enter referral code" 
                                        />
                                    </div>
                                </transition>
                            </div>

                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input 
                                        v-model="form.agreeToTerms" 
                                        type="checkbox" 
                                        required 
                                    />
                                    <span class="custom-checkbox">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    <span class="checkbox-text">
                                        I agree with <button type="button" class="terms-link">Terms of Service</button> and confirm that I am at least 18 years old
                                    </span>
                                </label>
                            </div>

                            <button type="submit" class="signup-button" :disabled="!form.agreeToTerms || authSendLoginLoading">
                                <span v-if="!authSendLoginLoading">Create Account</span>
                                <span v-else class="loading-spinner">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" class="spinner"/>
                                    </svg>
                                    Creating...
                                </span>
                            </button>
                        </form>

                        <div class="divider">
                            <span>or</span>
                        </div>

                        <div class="signin-link">
                            <p>Already have an account? <button class="link-button" @click="switchToSignIn">Sign In</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SignupModal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showReferral: false,
            showPassword: false,
            form: {
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
                referralCode: '',
                agreeToTerms: false
            }
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'modalsSetData',
            'notificationShow',
            'authSendCredentialsRegister'
        ]),
        close() {
            this.$emit('close');
        },
        handleEscKey(event) {
            if ((event.key === 'Escape' || event.keyCode === 27) && this.show) {
                this.close();
            }
        },
        handleSignup() {
            if (!this.form.username || !this.form.username.trim()) {
                this.notificationShow({ type: 'error', message: 'Please enter a username.' });
                return;
            }

            if (!this.form.email || !this.form.email.trim()) {
                this.notificationShow({ type: 'error', message: 'Please enter a valid email address.' });
                return;
            }

            if (!this.form.password || this.form.password.length < 6) {
                this.notificationShow({ type: 'error', message: 'Password must be at least 6 characters.' });
                return;
            }

            if (this.form.password !== this.form.passwordConfirm) {
                this.notificationShow({ type: 'error', message: 'Passwords do not match.' });
                return;
            }

            if (!this.form.agreeToTerms) {
                this.notificationShow({ type: 'error', message: 'You must agree to the Terms of Service.' });
                return;
            }

            const registerData = {
                email: this.form.email.trim(),
                password: this.form.password
            };

            if (this.form.username && this.form.username.trim()) {
                registerData.username = this.form.username.trim();
            }

            if (this.form.referralCode && this.form.referralCode.trim()) {
                registerData.referralCode = this.form.referralCode.trim();
            }

            this.modalsSetData({ 
                typeCaptcha: 'credentialsRegister', 
                data: registerData
            });
            
            this.close();
            setTimeout(() => { 
                this.modalsSetShow('Captcha'); 
            }, 200);
        },
        switchToSignIn() {
            this.$emit('switch-to-signin');
        }
    },
    computed: {
        ...mapGetters([
            'authSendLoginLoading'
        ])
    },
    watch: {
        show(newVal) {
            if (newVal) {
                document.addEventListener('keydown', this.handleEscKey);
            } else {
                document.removeEventListener('keydown', this.handleEscKey);
            }
        }
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleEscKey);
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999;
    backdrop-filter: blur(8px);
    padding: 20px;
    box-sizing: border-box;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0; 
        transform: translateY(20px) scale(0.98);
    }
    to { 
        opacity: 1; 
        transform: translateY(0) scale(1);
    }
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.spinner {
    animation: spin 1s linear infinite;
    transform-origin: center;
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
}

.slide-enter-to, .slide-leave {
    opacity: 1;
    max-height: 60px;
    margin-top: 12px;
}

.modal-container {
    background: linear-gradient(145deg, #1a2942 0%, #0f1923 100%);
    border-radius: 20px;
    overflow: hidden;
    max-width: 960px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: slideUp 0.4s ease;
}

.modal-content {
    display: flex;
    width: 100%;
    min-height: 540px;
}

/* Left Panel - Branding */
.modal-left {
    flex: 0 0 340px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    overflow: hidden;
}

.brand-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.brand-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.brand-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(184, 115, 51, 0.3) 0%, rgba(15, 25, 35, 0.9) 100%);
    z-index: 1;
}

.brand-content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.brand-logo {
    margin-bottom: 24px;
}

.brand-logo img {
    height: 80px;
    width: auto;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

.brand-tagline {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 12px 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.brand-subtitle {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    max-width: 280px;
}

/* Right Panel - Form */
.modal-right {
    flex: 1;
    background: linear-gradient(180deg, #141e2d 0%, #0d1520 100%);
    padding: 32px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: rotate(90deg);
}

.form-container {
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
}

.form-header {
    text-align: center;
    margin-bottom: 24px;
}

.form-title {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 6px 0;
    background: linear-gradient(135deg, #ffffff 0%, #b8a88a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.form-subtitle {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
}

.signup-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-row {
    display: flex;
    gap: 16px;
}

.form-row .form-group {
    flex: 1;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.form-group label svg {
    opacity: 0.6;
}

.input-wrapper {
    position: relative;
}

.input-wrapper input {
    width: 100%;
    padding: 12px 16px;
    padding-right: 40px;
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-size: 14px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #b87333;
    background: rgba(184, 115, 51, 0.05);
    box-shadow: 0 0 0 3px rgba(184, 115, 51, 0.1);
}

.input-wrapper input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
}

.toggle-password:hover {
    color: rgba(255, 255, 255, 0.8);
}

.referral-section {
    display: flex;
    flex-direction: column;
}

.referral-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #b87333;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 0;
    transition: color 0.2s ease;
}

.referral-toggle:hover {
    color: #d4a574;
}

.arrow {
    display: flex;
    transition: transform 0.3s ease;
}

.arrow-open {
    transform: rotate(180deg);
}

.referral-input {
    overflow: hidden;
}

.referral-input input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-size: 14px;
    box-sizing: border-box;
    transition: all 0.3s ease;
}

.referral-input input:focus {
    outline: none;
    border-color: #b87333;
}

.checkbox-group {
    margin-top: 4px;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    user-select: none;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.custom-checkbox {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
    transition: all 0.2s ease;
    color: transparent;
}

.checkbox-label input[type="checkbox"]:checked + .custom-checkbox {
    background: linear-gradient(135deg, #b87333 0%, #8b5a2b 100%);
    border-color: #b87333;
    color: #ffffff;
}

.checkbox-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
}

.terms-link {
    background: none;
    border: none;
    color: #b87333;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
}

.terms-link:hover {
    color: #d4a574;
}

.signup-button {
    width: 100%;
    padding: 14px 24px;
    background: linear-gradient(135deg, #c9302c 0%, #9e1f1f 100%);
    border: none;
    border-radius: 12px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(201, 48, 44, 0.3);
    margin-top: 8px;
}

.signup-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 48, 44, 0.4);
}

.signup-button:active:not(:disabled) {
    transform: translateY(0);
}

.signup-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.divider {
    display: flex;
    align-items: center;
    margin: 20px 0;
    gap: 16px;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.divider span {
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.signin-link {
    text-align: center;
}

.signin-link p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    margin: 0;
}

.link-button {
    background: none;
    border: none;
    color: #b87333;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s ease;
}

.link-button:hover {
    color: #d4a574;
    text-decoration: underline;
}

/* Responsive Design */
@media only screen and (max-width: 1024px) {
    .modal-overlay {
        padding: 15px;
        padding-bottom: 100px;
    }
    
    .modal-container {
        max-height: calc(100vh - 120px);
    }
    
    .modal-left {
        flex: 0 0 280px;
    }
}

@media only screen and (max-width: 768px) {
    .modal-content {
        flex-direction: column;
        min-height: auto;
    }
    
    .modal-left {
        display: none;
    }
    
    .modal-right {
        padding: 28px 24px;
    }
    
    .form-container {
        max-width: 100%;
    }
    
    .form-title {
        font-size: 22px;
    }
    
    .form-row {
        flex-direction: column;
        gap: 16px;
    }
}

@media only screen and (max-width: 480px) {
    .modal-overlay {
        padding: 10px;
        padding-bottom: 90px;
    }
    
    .modal-right {
        padding: 24px 20px;
    }
    
    .form-header {
        margin-bottom: 20px;
    }
    
    .signup-form {
        gap: 14px;
    }
    
    .input-wrapper input,
    .referral-input input {
        padding: 11px 14px;
        font-size: 14px;
    }
    
    .signup-button {
        padding: 13px 20px;
    }
}
</style>
