<template>
  <div id="provaComponente" class="element">
    <slot name="titolo" />
    <!-- <p>{{ doc.titolo }}</p> -->
    <div><p>Ciao questo è il componente Prova 3</p></div>
    <div class="prova">
      <h2 v-if="$slots.titolo">
        <slot name="titolo"></slot>
      </h2>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
//onMounted(() => {
// nextTick(async () => {
//richiamo i testi dei moduli con nuxt content
const { data: doc } = await useAsyncData(() =>
  queryCollection("content").path("/testiprova").first()
);
// }); //NOTE - end nextTick
//});
</script>

<style lang="scss" scoped></style>
