<template>
    <div v-if="show" class="modal-overlay" @click="close">
        <div class="modal-container" @click.stop>
            <div class="modal-content">
                <!-- Left Panel - Branding -->
                <div class="modal-left">
                    <div class="brand-section">
                        <div class="brand-background">
                            <img src="@/assets/img/signup_bk.png" alt="Background" />
                        </div>
                    </div>
                    <div class="legal-text">

                    </div>
                </div>

                <!-- Right Panel - Sign In Form -->
                <div class="modal-right">
                    <button class="close-button" @click="close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="form-container">
                        <h2 class="form-title">Sign in</h2>

                        <form @submit.prevent="handleSignIn" class="signin-form">
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input 
                                    id="email" 
                                    v-model="form.email" 
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                />
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input 
                                    id="password" 
                                    v-model="form.password" 
                                    type="password" 
                                    placeholder="Password" 
                                    required 
                                />
                            </div>

                            <button type="submit" class="signin-button" :disabled="authSendLoginLoading">
                                {{ authSendLoginLoading ? 'Signing in...' : 'Sign in' }}
                            </button>
                        </form>

                        <div class="signup-link">
                            <p>Don't have an account? <span class="highlight-orange" @click="switchToSignUp">Sign up</span></p>
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
                this.notificationShow({ type: 'error', message: 'Your entered email is invalid.' });
                return;
            }

            if (!this.form.password || !this.form.password.trim()) {
                this.notificationShow({ type: 'error', message: 'Your entered password is invalid.' });
                return;
            }

            // Set captcha data and show captcha modal
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
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.8);
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 9999999 !important;
    backdrop-filter: blur(5px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 !important;
}

@media only screen and (max-width: 1024px) {
    .modal-overlay {
        bottom: 80px !important;
        padding: 10px;
    }
}

.modal-container {
    background: var(--bg-secondary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    max-height: calc(100vh - 40px);
    min-height: 600px;
    display: flex;
    box-shadow: var(--shadow-lg);
    margin: auto !important;
    position: relative;
    z-index: 9999999;
    flex-shrink: 0;
    align-self: center !important;
    transform: translateY(0);
}

@media only screen and (max-width: 1024px) {
    .modal-container {
        max-width: 90% !important;
        max-height: calc(100vh - 100px) !important;
        min-height: auto !important;
        width: 100% !important;
    }
}

.modal-content {
    display: flex;
    width: 100%;
    min-height: 500px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    overflow-x: hidden;
}

@media only screen and (max-width: 1024px) {
    .modal-content {
        max-height: calc(100vh - 100px) !important;
        min-height: auto !important;
    }
}

/* Left Panel - Branding */
.modal-left {
    flex: 1;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(33, 30, 43, 0.9) 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacing-2xl);
}

.brand-section {
    z-index: 2;
    text-align: center;
}

.brand-title {
    font-size: 48px;
    font-weight: 900;
    color: white;
    margin: 0 0 var(--spacing-lg) 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.brand-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.3;
}

.brand-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.legal-text {
    position: relative;
    z-index: 2;
    color: white;
    font-size: 14px;
    line-height: 1.6;
}

.highlight-orange {
    color: var(----accent-yellow);
}

/* Right Panel - Form */
.modal-right {
    flex: 1;
    background: var(--bg-primary);
    padding: var(--spacing-2xl);
    position: relative;
}

.close-button {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: background-color 0.3s ease;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.1);
}

.form-container {
    max-width: 400px;
    margin: 0 auto;
    padding-bottom: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
}

.form-title {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin: 0 0 var(--spacing-xl) 0;
    text-align: center;
}

.signin-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.form-group label {
    color: white;
    font-weight: 600;
    font-size: 14px;
}

.form-group input {
    padding: var(--spacing-lg);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-md);
    background: var(--bg-tertiary);
    color: white;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(----accent-yellow);
}

.form-group input::placeholder {
    color: var(--text-muted);
}

.signin-button {
    padding: var(--spacing-lg);
    background: var(--gradient-red);
    border: none;
    border-radius: var(--radius-md);
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease;
    width: 100%;
}

.signin-button:hover:not(:disabled) {
    transform: translateY(-2px);
}

.signin-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.signup-link {
    text-align: center;
    margin-top: var(--spacing-lg);
}

.signup-link p {
    color: white;
    font-size: 14px;
}

.signup-link .highlight-orange {
    cursor: pointer;
    text-decoration: underline;
}

.signup-link .highlight-orange:hover {
    color: var(--accent-yellow);
}

/* Responsive Design */
@media only screen and (max-width: 1024px) {
    .modal-container {
        max-width: 90% !important;
        max-height: calc(100vh - 100px) !important;
        min-height: auto !important;
        width: 100% !important;
    }
    
    .modal-content {
        max-height: calc(100vh - 100px) !important;
        min-height: auto !important;
    }
}

@media only screen and (max-width: 768px) {
    .modal-container {
        max-width: 95% !important;
        max-height: calc(100vh - 100px) !important;
        margin: auto !important;
        align-self: center !important;
    }
    
    .modal-content {
        flex-direction: column;
        min-height: auto;
        max-height: calc(100vh - 100px) !important;
    }
    
    .modal-left {
        padding: var(--spacing-lg);
        min-height: 200px;
    }
    
    .brand-title {
        font-size: 36px;
    }
    
    .modal-right {
        padding: var(--spacing-lg);
    }
    
    .form-title {
        font-size: 24px;
    }
    
    .form-container {
        min-height: auto;
    }
}

@media only screen and (max-width: 480px) {
    .modal-overlay {
        padding: 5px !important;
        bottom: 80px !important;
    }
    
    .modal-container {
        max-width: 98% !important;
        max-height: calc(100vh - 90px) !important;
    }
    
    .modal-content {
        max-height: calc(100vh - 90px) !important;
    }
    
    .modal-left {
        display: none;
    }
    
    .modal-right {
        flex: none;
        padding: var(--spacing-md);
    }
    
    .form-title {
        font-size: 20px;
    }
    
    .form-container {
        padding-bottom: var(--spacing-md);
    }
}
</style>



