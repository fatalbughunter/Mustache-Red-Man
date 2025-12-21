<template>
    <div class="rewards-drops">
        <div class="drops-grid">
            <div class="drop-card">
                <div class="card-content">
                    <h3 class="card-title">Instant Drops</h3>
                    <div class="card-image">
                        <img src="@/assets/img/rewards/instant-drops.png" alt="Instant Drops" />
                    </div>
                </div>
                <button class="card-button" disabled>
                    <span>Coming Soon</span>
                </button>
            </div>

            <div class="drop-card">
                <div class="card-content">
                    <h3 class="card-title">Daily Drops</h3>
                    <div class="card-image">
                        <img src="@/assets/img/rewards/daily-drops.png" alt="Daily Drops" />
                    </div>
                </div>
                <button class="card-button" disabled>
                    <span>Coming Soon</span>
                </button>
            </div>

            <div class="drop-card">
                <div class="card-content">
                    <h3 class="card-title">Weekly Drops</h3>
                    <div class="card-image">
                        <img src="@/assets/img/rewards/weekly-drops.png" alt="Weekly Drops" />
                    </div>
                </div>
                <button class="card-button" disabled>
                    <span>Coming Soon</span>
                </button>
            </div>

            <div class="drop-card">
                <div class="card-content">
                    <h3 class="card-title">Monthly Drops</h3>
                    <div class="card-image">
                        <img src="@/assets/img/rewards/monthly-drops.png" alt="Monthly Drops" />
                    </div>
                </div>
                <button class="card-button" disabled>
                    <span>Coming Soon</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RewardsDrops'
    }
</script>

<style scoped>
    .rewards-drops {
        width: 100%;
        max-width: 1250px;
        margin-top: 30px;
    }

    .drops-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .drop-card {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        background: linear-gradient(180deg, #0a1929 0%, #0d2137 100%);
        border: 2px solid rgba(252, 163, 17, 0.4);
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .drop-card:hover {
        transform: translateY(-4px);
        border-color: rgba(252, 163, 17, 0.7);
    }

    .card-content {
        padding: 20px 20px 0 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card-title {
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #ffd700;
        margin: 0 0 15px 0;
        text-align: center;
        font-family: 'Rubik', sans-serif;
    }

    .card-image {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
    }

    .card-image img {
        width: 100%;
        max-width: 180px;
        height: auto;
        object-fit: contain;
    }

    .card-button {
        width: 100%;
        height: 50px;
        border: none;
        background: linear-gradient(180deg, #ffd700 0%, #fca311 50%, #e69500 100%);
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #000000;
        cursor: not-allowed;
        opacity: 0.7;
        transition: all 0.3s ease;
        font-family: 'Rubik', sans-serif;
    }

    .card-button:not(:disabled) {
        cursor: pointer;
        opacity: 1;
    }

    .card-button:not(:disabled):hover {
        background: linear-gradient(180deg, #ffe44d 0%, #ffb833 50%, #ffa500 100%);
    }

    @media only screen and (max-width: 1150px) {
        .drops-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media only screen and (max-width: 600px) {
        .drops-grid {
            grid-template-columns: 1fr;
        }

        .card-title {
            font-size: 18px;
        }

        .card-image img {
            max-width: 150px;
        }
    }
</style>

