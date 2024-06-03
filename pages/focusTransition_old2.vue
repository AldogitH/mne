<template>
  <div class="max-w-[1700px] m-auto px-16">
    <h1>Much More Than Screening</h1>

    <h3>PLAY</h3>
    <p>Touch Day and Bin, and your is to watch.</p>

    <h3>MEET</h3>
    <p>
      Review, comment, approve, import into your
      <a
        ref="button"
        @click="showOverlay($event)"
        class="open-btn underline cursor-pointer text-seagull-400"
        >NLEs</a
      >, stay up to date.
    </p>

    <h3>PROTECT</h3>
    <p>
      Each Room is a secure vault with its own
      <a
        ref="button"
        @click="showOverlay($event)"
        class="open-btn border-b-[1px] border-dashed cursor-pointer hover:text-seagull-400"
        >watermark.</a
      >
    </p>
    <FullScreenOverlay
      :visible.sync="isOverlayVisible"
      :buttonRect="buttonRect"
      @update:visible="isOverlayVisible = $event"
    >
    </FullScreenOverlay>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import FullScreenOverlay from "~/components/FullScreenOverlay.vue";

const isOverlayVisible = ref(false);
const buttonRect = ref({});

const showOverlay = async (event) => {
  const button = event.target;
  //const button = document.querySelector(".open-btn");
  buttonRect.value = button.getBoundingClientRect();
  await nextTick();
  isOverlayVisible.value = true;
};
</script>

<style scoped></style>
