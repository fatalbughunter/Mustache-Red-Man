<template>
    <div class="lucky-mustache-section">
        <div class="image-container"></div>
        <div class="lucky-mustache-content">
            <div class="lucky-mustache-text">
                You will find what you seek in the turn of a card,<br>but not what you keep.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LuckyMustache'
}
</script>

<style scoped>
.lucky-mustache-section {
    width: 100%;
   /* margin: 12px 100px 12px 100px; */
    border-radius: 25px;
    position: relative;
    overflow: hidden;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    background-image: url('../assets/img/banner/luckyMustache.png');
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
    z-index: 1;
}

.lucky-mustache-content {
    padding: var(--spacing-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
}

.lucky-mustache-text {
    background: var(--gradient-main-txt);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-family: 'Anton SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 40px;
    line-height: 50px;
    letter-spacing: 0%;
    text-align: center;
}

@media only screen and (max-width: 1200px) {
    .lucky-mustache-section {
        margin: 12px var(--spacing-lg) 12px var(--spacing-lg);
    }
}

@media only screen and (max-width: 768px) {
    .lucky-mustache-section {
        margin: 12px var(--spacing-md) 12px var(--spacing-md);
        min-height: 150px;
    }

    .lucky-mustache-text {
        font-size: 28px;
        line-height: 36px;
    }
}

@media only screen and (max-width: 450px) {
    .lucky-mustache-section {
        margin: 0;
        border-radius: 0;
        min-height: 120px;
    }

    .lucky-mustache-text {
        font-size: 20px;
        line-height: 28px;
    }
}
</style>

