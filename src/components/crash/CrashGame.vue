<template>
    <div class="crash-game">
        <div class="game-graph" ref="crashGraph">
            <canvas id="canvas-graph"></canvas>
        </div>
        <div class="game-info">
            <div class="info-network">
                <div class="network-point"></div>
                <span>NETWORK STATUS</span>
            </div>
            <div class="info-profit">
                <transition name="fade">
                    <div v-if="crashProfitInfo === true" class="profit-amount">
                        <img src="@/assets/img/icons/coin.svg" alt="icon" />
                        250,000
                    </div>
                </transition>
                <button v-on:click="crashSetProfitInfo(!crashProfitInfo)">
                    <IconInfo />
                    MAX PROFIT
                </button>
            </div>
        </div>
        <div v-if="crashGame !== null" class="game-inner">
            <div v-if="crashGame.state === 'completed'" class="inner-completed">
                <div class="completed-multiplier">
                    {{ parseFloat(crashGame.outcome / 100).toFixed(2) }}
                </div>
                <div class="completed-over">ROUND OVER</div>
            </div>
            <div v-else-if="crashGame.state === 'rolling'" class="inner-rolling">
                <div class="rolling-multiplier">
                    <span class="gradient-green">{{ parseFloat(Math.floor(crashMultiplier / 1000) / 100).toFixed(2)}}</span>
                </div>
                <div class="rolling-payout">CURRENT PAYOUT</div>
                <transition name="fade">
                    <div v-if="
                        authUser.user !== null &&
                        crashBets.some((element) => element.user._id === authUser.user._id && element.multiplier === undefined) === true
                    " class="rolling-amount">
                        <img src="@/assets/img/icons/coin.svg" alt="icon" />
                        <div class="amount-value">
                            <span>+{{ crashFormatValue(crashGetPayoutAmount).split(".")[0] }}</span>.{{
                                crashFormatValue(crashGetPayoutAmount).split(".")[1]
                            }}
                        </div>
                    </div>
                </transition>
            </div>
            <div v-else class="inner-waiting">
                <div class="waiting-status">PREPARING ROUND</div>
                <div class="waiting-timer">{{ crashText }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CrashGraph from '@/components/crash/CrashGraph';
import IconInfo from '@/components/icons/IconInfo';

export default {
    name: 'CrashGame',
    components: {
        IconInfo
    },
    data() {
        return {
            crashTimerRepeater: null,
            crashRunRepeater: null,
            crashGraphInstance: null,
            crashWidth: 0,
            crashProfitInfo: false,
            crashText: 'STARTING IN 20.00s',
            crashMultiplier: 1.0001
        }
    },
    methods: {
        crashFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString();
        },
        crashSetProfitInfo(value) {
            this.crashProfitInfo = value;
        },
        crashStartTimer() {
            const timeEnding = new Date(this.crashGame.createdAt).getTime() + (1000 * 6);
            const timeLeft = (timeEnding - (new Date().getTime() + this.generalTimeDiff)) / 1000;

            this.crashText = 'STARTING IN ' + (timeLeft).toFixed(2) + 's';

            if(timeLeft <= 0) {
                this.crashText = 'PENDING...';
            } else {
                this.crashTimerRepeater = requestAnimationFrame(this.crashStartTimer);
            }
        },
        crashStartMutiplier() {
            const elapsed = (new Date().getTime() + this.generalTimeDiff) - new Date(this.crashGame.updatedAt).getTime();
            const multiplier = Math.floor(100000 * Math.pow(Math.E, 0.00006 * elapsed));

            this.crashMultiplier = multiplier === 100000 ? 100001 : multiplier;

            CrashGraph.Engine.multi = this.crashMultiplier / 100000;

            this.crashRunRepeater = requestAnimationFrame(this.crashStartMutiplier);
        }
    },
    computed: {
        ...mapGetters([
            'authUser', 
            'generalTimeDiff', 
            'crashGame', 
            'crashBets'
        ]),
        crashGetPayoutAmount() {
            return Math.floor(this.crashBets[this.crashBets.findIndex((element) => element.user._id === this.authUser.user._id)].amount * (this.crashMultiplier / 100000));
        }
    },
    watch: {
        crashGame: {
            handler(data, oldData) {
                if (data.state === 'created') {
                    CrashGraph.Engine.multi = 1.0001;
                    CrashGraph.Engine.gameState = 'STARTING';
                    
                    this.crashStartTimer();
                } else if (data.state === 'rolling') {
                    CrashGraph.Engine.multi = 1.0001;
                    CrashGraph.Engine.gameState = 'IN_PROGRESS';

                    this.crashMultiplier = 1.0001;
                    this.crashStartMutiplier();
                } else if (data.state === 'completed') {
                    CrashGraph.Engine.multi = 1.0001;
                    CrashGraph.Engine.gameState = 'ENDED';

                    cancelAnimationFrame(this.crashRunRepeater);
                }
            },
            deep: true
        }
    },
    mounted() {
        let canvas = document.querySelector("#canvas-graph");

        this.crashWidth = this.$refs.crashGraph.clientWidth - 10;

        this.crashGraphInstance = new CrashGraph.Graph();
        this.crashGraphInstance.startRendering(canvas, {
            width: this.crashWidth,
            height: 435
        });

        CrashGraph.Engine.multi = 1;

        if (this.crashGame.state === 'created') {
            CrashGraph.Engine.gameState = 'STARTING';
            this.crashStartTimer();
        } else if(this.crashGame.state === 'rolling') {
            CrashGraph.Engine.gameState = 'IN_PROGRESS';
            this.crashStartMutiplier();
        } else {
            this.crashText = 'PENDING...';
        }
    },
    destroyed() {
        cancelAnimationFrame(this.crashTimerRepeater);
        cancelAnimationFrame(this.crashRunRepeater);
        this.crashGraphInstance.stopRendering();
    }
}
</script>

<style scoped>
    .crash-game {
        width: 100%;
        height: 460px;
        position: relative;
        border-radius: 20px;
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%),
            radial-gradient(100% 100% at 50% 50%,
                rgba(0, 0, 0, 0.8) 0%,
                rgba(0, 0, 0, 0.9) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: inset 0px 0px 35px rgba(0, 0, 0, 0.8), 0px 4px 20px rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }

    .crash-game::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 40px 60px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 70px 20px, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 100px 50px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 130px 10px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 160px 40px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 190px 20px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 220px 60px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 250px 30px, rgba(255,255,255,0.4), transparent),
            radial-gradient(2px 2px at 280px 50px, rgba(255,255,255,0.9), transparent);
        background-repeat: repeat;
        background-size: 300px 200px;
        animation: twinkle 4s ease-in-out infinite alternate;
        z-index: 0;
        opacity: 0.8;
    }

    .crash-game::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60%;
        background-image: 
            radial-gradient(1px 1px at 15px 20px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 35px 40px, rgba(255,255,255,0.7), transparent),
            radial-gradient(2px 2px at 55px 10px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 75px 30px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 95px 50px, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 115px 15px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 135px 35px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 155px 55px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 175px 25px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 195px 45px, rgba(255,255,255,0.9), transparent);
        background-repeat: repeat;
        background-size: 220px 120px;
        animation: twinkle 5s ease-in-out infinite alternate;
        z-index: 0;
        opacity: 0.7;
    }

    @keyframes twinkle {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
    }

    .crash-game .game-graph {
        position: absolute;
        top: 20px;
        bottom: 5px;
        left: 5px;
        right: 5px;
        z-index: 1;
    }

    .graph-crash {
        height: 460px;
    }

    .crash-game .game-info {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 15px;
        left: 0;
        padding: 0 20px;
        z-index: 2;
    }

    .crash-game .info-network {
        display: flex;
        align-items: center;
    }
    
    .crash-game .info-network span {
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
    }

    .crash-game .network-point {
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 50%;
        background: linear-gradient(255deg, #00ffc2 0%, #00aa6d 100%), #d9d9d9;
        box-shadow: 0px 0px 8px #01dea0;
    }

    .crash-game .info-profit {
        display: flex;
        align-items: center;
    }

    .crash-game .info-profit button {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
    }

    .crash-game .info-profit button svg {
        margin-right: 8px;
        fill: #ffffff;
    }

    .crash-game .profit-amount {
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;

    }

    .crash-game .profit-amount.fade-enter-active,
    .crash-game .profit-amount.fade-leave-active {
        transition: opacity 0.5s;
    }

    .crash-game .profit-amount.fade-enter-from,
    .crash-game .profit-amount.fade-leave-to {
        opacity: 0;
    }

    .crash-game .profit-amount img {
        width: 15px;
        height: 15px;
        margin-right: 8px;
    }

    .crash-game .game-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%),
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%);
        overflow: hidden;
        z-index: -1;
    }

    .crash-game .inner-completed,
    .crash-game .inner-rolling,
    .crash-game .inner-waiting {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .crash-game .inner-rolling {
        position: relative;
    }

    .crash-game .completed-multiplier,
    .crash-game .rolling-multiplier {
        line-height: 88px;
        font-size: 84px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.3);
    }

    .crash-game .completed-over,
    .crash-game .rolling-payout {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
    }

    .crash-game .rolling-amount {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: -6px;
        left: 50%;
        transform: translate(-50%, 100%);
    }

    .crash-game .rolling-amount img {
        width: 26px;
        height: 26px;
        margin-right: 10px;
    }

    .crash-game .amount-value {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
    }

    .crash-game .amount-value span {
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
    }

    .crash-game .inner-waiting img {
        margin-top: 25px;
    }

    .crash-game .waiting-status {
        text-align: center;
        font-size: 54px;
        font-weight: 800;
        text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
        background: linear-gradient(255deg, #ffffff 0%, #cccccc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .crash-game .waiting-timer {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
    }

    @media only screen and (max-width: 550px) {

        .crash-game .info-network span {
            display: none;
        }

    }
</style>
