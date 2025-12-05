<template>
    <div class="admin-login-page">
        <div class="login-container">
            <div class="login-header">
                <h1>Administrator Access</h1>
                <p>Enter your credentials to access the admin panel</p>
            </div>
            
            <form @submit.prevent="handleSignIn" class="login-form">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        id="email" 
                        v-model="form.email" 
                        type="email" 
                        placeholder="Email" 
                        required 
                        autocomplete="email"
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
                        autocomplete="current-password"
                    />
                </div>

                <button type="submit" class="login-button" :disabled="authSendLoginLoading">
                    {{ authSendLoginLoading ? 'Signing in...' : 'Sign In' }}
                </button>
            </form>

            <div v-if="loginError" class="error-message">
                {{ loginError }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'AdminLogin',
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            loginError: null
        }
    },
    methods: {
        ...mapActions([
            'modalsSetData',
            'modalsSetShow',
            'notificationShow',
            'authSendCredentialsLogin'
        ]),
        handleSignIn() {
            this.loginError = null;
            
            if (!this.form.email || !this.form.email.trim()) {
                this.loginError = 'Email is required';
                return;
            }

            if (!this.form.password || !this.form.password.trim()) {
                this.loginError = 'Password is required';
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
            
            this.modalsSetShow('Captcha');
        }
    },
    computed: {
        ...mapGetters([
            'authSendLoginLoading',
            'authUser'
        ])
    },
    watch: {
        authUser: {
            handler(newUser) {
                if (newUser && newUser.user) {
                    if (newUser.user.rank === 'admin') {
                        // Redirect to admin dashboard after successful login
                        this.$router.push('/admin');
                    } else {
                        this.loginError = 'Access denied. Administrator privileges required.';
                    }
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.admin-login-page {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg-blue-dark);
    padding: 20px;
}

.login-container {
    width: 100%;
    max-width: 450px;
    padding: 40px;
    background: var(--bg-blue-dark);
    border: 2px solid var(--accent-yellow);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-header h1 {
    font-size: 28px;
    font-weight: 700;
    background: var(--gradient-button-bg);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
}

.login-header p {
    font-size: 14px;
    color: #bbbfd0;
}

.login-form {
    width: 100%;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #bbbfd0;
    margin-bottom: 8px;
}

.form-group input {
    width: 100%;
    height: 47px;
    padding: 0 15px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background: var(--bg-blue-dark);
    border: 1px dashed rgba(46, 93, 119, 0.5);
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--accent-yellow);
    background: rgba(212, 165, 116, 0.1);
}

.login-button {
    width: 100%;
    height: 47px;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 800;
    color: #000000;
    background: var(--gradient-button-bg);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(222, 199, 156, 0.4);
}

.login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    margin-top: 15px;
    padding: 12px;
    background: rgba(220, 20, 60, 0.2);
    border: 1px solid var(--accent-red);
    border-radius: 5px;
    color: var(--accent-red);
    font-size: 14px;
    text-align: center;
}
</style>

