<template>
    <div class="profile-personal-info">
        <div class="info-section">
            <div class="info-row">
                <div class="info-field">
                    <div class="field-label">Username</div>
                    <div class="field-input-wrapper">
                        <input 
                            type="text" 
                            v-model="formData.username" 
                            class="field-input"
                            :readonly="!editing.username"
                            @focus="editing.username = true"
                        />
                        <button 
                            class="field-action" 
                            @click="toggleEdit('username')"
                            :title="editing.username ? 'Save' : 'Edit'"
                        >
                            <svg v-if="!editing.username" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="info-field">
                    <div class="field-label">Email</div>
                    <div class="field-input-wrapper">
                        <input 
                            type="email" 
                            v-model="formData.email" 
                            class="field-input"
                            :readonly="!editing.email"
                            @focus="editing.email = true"
                        />
                        <button 
                            class="field-action" 
                            @click="toggleEdit('email')"
                            :title="editing.email ? 'Save' : 'Edit'"
                        >
                            <svg v-if="!editing.email" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="info-row">
                <div class="info-field">
                    <div class="field-label">Password</div>
                    <div class="field-input-wrapper">
                        <input 
                            type="password" 
                            :value="passwordDisplay" 
                            class="field-input"
                            readonly
                        />
                        <button 
                            class="field-action" 
                            @click="handlePasswordChange"
                            title="Change Password"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="info-field">
                    <div class="field-label">Confirm</div>
                    <div class="field-input-wrapper">
                        <input 
                            type="password" 
                            :value="confirmDisplay" 
                            class="field-input"
                            readonly
                        />
                        <button 
                            class="field-action" 
                            @click="handlePasswordChange"
                            title="Change Password"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="info-actions">
            <button class="button-cancel" @click="handleCancel">Cancel</button>
            <div v-if="saveStatus.show" class="save-status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Saved</span>
            </div>
            <button class="button-save" @click="handleSave" :disabled="saveLoading">Save</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'ProfilePersonalInfo',
        data() {
            return {
                formData: {
                    username: '',
                    email: ''
                },
                originalData: {
                    username: '',
                    email: ''
                },
                editing: {
                    username: false,
                    email: false
                },
                saveStatus: {
                    show: false,
                    timeout: null
                },
                saveLoading: false,
                passwordDisplay: '*******',
                confirmDisplay: '*******'
            }
        },
        computed: {
            ...mapGetters([
                'authUser'
            ])
        },
        watch: {
            'authUser.user': {
                immediate: true,
                handler(user) {
                    if (user) {
                        this.initializeFormData();
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'notificationShow'
            ]),
            initializeFormData() {
                if (this.authUser.user) {
                    this.formData.username = this.authUser.user.username || '';
                    this.formData.email = (this.authUser.user.local && this.authUser.user.local.email) || '';
                    
                    this.originalData = {
                        username: this.formData.username,
                        email: this.formData.email
                    };
                }
            },
            toggleEdit(field) {
                if (this.editing[field]) {
                    // Save the field
                    this.editing[field] = false;
                } else {
                    // Enable editing
                    this.editing[field] = true;
                }
            },
            handlePasswordChange() {
                // Open password change modal or navigate to password change page
                this.notificationShow({ 
                    type: 'info', 
                    message: 'Password change functionality will be implemented.' 
                });
            },
            handleCancel() {
                // Reset form data to original values
                this.formData = {
                    username: this.originalData.username,
                    email: this.originalData.email
                };
                this.editing = {
                    username: false,
                    email: false
                };
                this.saveStatus.show = false;
            },
            async handleSave() {
                if (this.saveLoading) return;

                // Validate form data
                if (!this.formData.username || !this.formData.username.trim()) {
                    this.notificationShow({ 
                        type: 'error', 
                        message: 'Username cannot be empty.' 
                    });
                    return;
                }

                if (!this.formData.email || !this.formData.email.trim()) {
                    this.notificationShow({ 
                        type: 'error', 
                        message: 'Email cannot be empty.' 
                    });
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.formData.email)) {
                    this.notificationShow({ 
                        type: 'error', 
                        message: 'Please enter a valid email address.' 
                    });
                    return;
                }

                this.saveLoading = true;

                try {
                    // TODO: Implement API call to save user data
                    // await this.$store.dispatch('authUpdateUserProfile', {
                    //     username: this.formData.username,
                    //     email: this.formData.email
                    // });

                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Update original data
                    this.originalData = {
                        username: this.formData.username,
                        email: this.formData.email
                    };

                    // Disable editing
                    this.editing = {
                        username: false,
                        email: false
                    };

                    // Show save status
                    this.showSaveStatus();

                    this.notificationShow({ 
                        type: 'success', 
                        message: 'Profile updated successfully.' 
                    });
                } catch (error) {
                    this.notificationShow({ 
                        type: 'error', 
                        message: 'Failed to update profile. Please try again.' 
                    });
                } finally {
                    this.saveLoading = false;
                }
            },
            showSaveStatus() {
                this.saveStatus.show = true;
                
                // Clear existing timeout
                if (this.saveStatus.timeout) {
                    clearTimeout(this.saveStatus.timeout);
                }

                // Hide after 3 seconds
                this.saveStatus.timeout = setTimeout(() => {
                    this.saveStatus.show = false;
                }, 3000);
            }
        },
        beforeDestroy() {
            if (this.saveStatus.timeout) {
                clearTimeout(this.saveStatus.timeout);
            }
        }
    }
</script>

<style scoped>
    .profile-personal-info {
        width: 100%;
        margin-top: 32px;
        padding: 32px;
    }

    .info-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .info-row {
        display: flex;
        gap: 24px;
    }

    .info-row .info-field {
        flex: 1;
    }

    .info-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .field-label {
        font-size: 12px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .field-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .field-input {
        width: 100%;
        height: 48px;
        padding: 0 48px 0 16px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        transition: all 0.3s ease;
    }

    .field-input:focus {
        outline: none;
        border-color: rgba(252, 163, 17, 0.5);
        background: rgba(255, 255, 255, 0.08);
    }

    .field-input:read-only {
        cursor: default;
    }

    .field-input:not(:read-only):focus {
        border-color: #fca311;
    }

    .field-action {
        position: absolute;
        right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: transparent;
        border: none;
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .field-action:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fca311;
    }

    .field-action svg {
        width: 16px;
        height: 16px;
        stroke: currentColor;
        fill: none;
    }

    .info-actions {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .button-cancel {
        padding: 12px 24px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .button-cancel:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }

    .save-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #10b981;
    }

    .save-status svg {
        width: 16px;
        height: 16px;
        stroke: #10b981;
        fill: none;
    }

    .button-save {
        margin-left: auto;
        padding: 12px 32px;
        background: linear-gradient(135deg, #fca311 0%, #ffd700 100%);
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(252, 163, 17, 0.3);
    }

    .button-save:hover:not(:disabled) {
        background: linear-gradient(135deg, #ffb84d 0%, #ffed4e 100%);
        box-shadow: 0 6px 16px rgba(252, 163, 17, 0.4);
        transform: translateY(-1px);
    }

    .button-save:active:not(:disabled) {
        transform: translateY(0);
    }

    .button-save:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media only screen and (max-width: 768px) {
        .profile-personal-info {
            padding: 24px 20px;
        }

        .info-row {
            flex-direction: column;
            gap: 24px;
        }

        .info-actions {
            flex-wrap: wrap;
        }

        .button-save {
            margin-left: 0;
            width: 100%;
        }

        .button-cancel {
            width: 100%;
        }
    }

    @media only screen and (max-width: 480px) {
        .profile-personal-info {
            padding: 20px 16px;
        }

        .field-input {
            height: 44px;
            font-size: 13px;
        }

        .field-label {
            font-size: 11px;
        }
    }
</style>

