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
                        <h3 class="brand-tagline">Welcome Back!</h3>
                        <p class="brand-subtitle">Sign in to continue your winning streak</p>
                    </div>
                </div>

                <!-- Right Panel - Sign In Form -->
                <div class="modal-right">
                    <button class="close-button" @click="close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="form-container">
                        <div class="form-header">
                            <h2 class="form-title">Sign In</h2>
                            <p class="form-subtitle">Enter your credentials to access your account</p>
                        </div>

                        <form @submit.prevent="handleSignIn" class="signin-form">
                            <div class="form-group">
                                <label for="email">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Email Address
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

                            <div class="form-group">
                                <label for="password">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                        placeholder="Enter your password" 
                                        required 
                                        autocomplete="current-password"
                                    />
                                    <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                                        <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button type="submit" class="signin-button" :disabled="authSendLoginLoading">
                                <span v-if="!authSendLoginLoading">Sign In</span>
                                <span v-else class="loading-spinner">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" class="spinner"/>
                                    </svg>
                                    Signing in...
                                </span>
                            </button>
                        </form>

                        <div class="divider">
                            <span>or</span>
                        </div>

                        <div class="signup-link">
                            <p>Don't have an account? <button class="link-button" @click="switchToSignUp">Create Account</button></p>
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
    name: 'SignInModal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showPassword: false,
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'modalsSetData',
            'notificationShow',
            'authSendCredentialsLogin'
        ]),
        close() {
            this.$emit('close');
        },
        handleEscKey(event) {
            if ((event.key === 'Escape' || event.keyCode === 27) && this.show) {
                this.close();
            }
        },
        handleSignIn() {
            if (!this.form.email || !this.form.email.trim()) {
                this.notificationShow({ type: 'error', message: 'Please enter a valid email address.' });
                return;
            }

            if (!this.form.password || !this.form.password.trim()) {
                this.notificationShow({ type: 'error', message: 'Please enter your password.' });
                return;
            }

            this.modalsSetData({ 
                typeCaptcha: 'credentialsLogin', 
                data: { 
                    email: this.form.email.trim(), 
                    password: this.form.password 
                } 
            });
            
            this.close();
            setTimeout(() => { 
                this.modalsSetShow('Captcha'); 
            }, 200);
        },
        switchToSignUp() {
            this.$emit('switch-to-signup');
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

.modal-container {
    background: linear-gradient(145deg, #1a2942 0%, #0f1923 100%);
    border-radius: 20px;
    overflow: hidden;
    max-width: 900px;
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
    min-height: 480px;
}

/* Left Panel - Branding */
.modal-left {
    flex: 1;
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
    padding: 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: rotate(90deg);
}

.form-container {
    max-width: 340px;
    margin: 0 auto;
    width: 100%;
}

.form-header {
    text-align: center;
    margin-bottom: 32px;
}

.form-title {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #ffffff 0%, #b8a88a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.form-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
}

.signin-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    font-size: 13px;
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
    padding: 14px 18px;
    padding-right: 48px;
    border: 2px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-size: 15px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #b87333;
    background: rgba(184, 115, 51, 0.05);
    box-shadow: 0 0 0 4px rgba(184, 115, 51, 0.1);
}

.input-wrapper input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.toggle-password {
    position: absolute;
    right: 14px;
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

.signin-button {
    width: 100%;
    padding: 16px 24px;
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

.signin-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 48, 44, 0.4);
}

.signin-button:active:not(:disabled) {
    transform: translateY(0);
}

.signin-button:disabled {
    opacity: 0.7;
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
    margin: 24px 0;
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

.signup-link {
    text-align: center;
}

.signup-link p {
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
        padding: 32px 24px;
    }
    
    .form-container {
        max-width: 100%;
    }
    
    .form-title {
        font-size: 24px;
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
        margin-bottom: 24px;
    }
    
    .signin-form {
        gap: 16px;
    }
    
    .input-wrapper input {
        padding: 12px 16px;
        padding-right: 44px;
        font-size: 14px;
    }
}
</style>
