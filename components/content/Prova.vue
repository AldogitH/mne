<template>
  <div id="provaComponente" class="element">
    <slot name="titolo" />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
onMounted(() => {
  nextTick(async () => {
    //richiamo i testi dei moduli con nuxt content
    const { data: doc } = await useAsyncData(() =>
      queryCollection("content").path("/testiprova").first()
    );
  }); //NOTE - end nextTick
});
</script>

<style lang="scss" scoped></style>
