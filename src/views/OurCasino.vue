<template>
    <div class="our-casino">
        <AllGames 
            title="MUSTACHE CASINO" 
            :showTopBolts="false" 
            :showBottomBolts="false" 
            :showPlayButton="false"
            :filteredGameNames="['Mines', 'Crash', 'BlackJack', 'Tower']"
            :largeCards="true"
        />
    </div>
</template>

<script>
import AllGames from '@/components/AllGames';

export default {
    name: 'OurCasino',
    metaInfo: {
        title: 'Our Casino - Mustache Casino'
    },
    components: {
        AllGames
    }
}
</script>

<style scoped>
.our-casino {
    width: 100%;
    min-height: 100vh;
    background-image: url('~@/assets/img/banner/allGames.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding: var(--spacing-2xl) 0;
}

@media only screen and (max-width: 1024px) {
    .our-casino {
        padding-bottom: 80px;
    }
}
</style>

