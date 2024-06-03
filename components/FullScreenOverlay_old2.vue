<template>
  <div
    v-if="isClient"
    ref="overlay"
    class="overlay fixed top-0 left-0 w-full h-full p-[8%] bg-black/80 z-[1000] overflow-scroll"
    v-show="visible"
  >
    <svg ref="svg" :width="svgWidth" :height="svgHeight" class="absolute top-0 left-0">
      <path ref="spiralPath" fill="none" stroke="white" />
    </svg>
    <button
      @click="closeOverlay"
      class="close-btn fixed top-[5%] right-[5%] bg-transparent text-4xl text-slate-200 hover:text-slate-400"
    >
      <UIcon name="i-heroicons-x-circle" class="flex" />
    </button>
    <Focus1Txt />
    <slot></slot>
  </div>
</template>

<script setup>
//defineEmits is a compiler macro and no longer needs to be imported.
// import { ref, watch, onMounted, defineEmits } from "vue";

import { ref, watch, nextTick, onMounted } from "vue";
import gsap from "gsap";
import { _flex } from "#tailwind-config/theme";

const props = defineProps({
  visible: Boolean,
  buttonRect: Object,
});

const emits = defineEmits(["update:visible"]);

const overlay = ref(null);
const svg = ref(null);
const spiralPath = ref(null);

const svgWidth = ref(0);
const svgHeight = ref(0);
const isClient = ref(false);

const numPoints = 100;
let maxRadius = 0;

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      openOverlay();
    }
  }
);

const openOverlay = async () => {
  if (!isClient.value) return;
  const { width, height, left, top } = props.buttonRect;
  // const radius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2; // raggio calcolato dal centro dello schermo con il teorema di pitagora

  //calcolo del raggio per l'overlay decentrato sul punto da cui facciamo click
  // calcolo il centro del pulsate / Link (i parametri left, top, ... lip rendo dalla costante definita precedentemente che riceve i valori dalla pagina in cui è implementata, in questo esempio è focusTransition)
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  // Calcolo le distanze del centro del pulsante dai quattro angoli dello schermo non divido per due pechè mi serve la distanza intera al vertice e non il raggio
  const distanceTL = Math.sqrt((centerX - 0) ** 2 + (centerY - 0) ** 2);
  const distanceTR = Math.sqrt((centerX - window.innerWidth) ** 2 + (centerY - 0) ** 2);
  const distanceBL = Math.sqrt((centerX - 0) ** 2 + (centerY - window.innerHeight) ** 2);
  const distanceBR = Math.sqrt(
    (centerX - window.innerWidth) ** 2 + (centerY - window.innerHeight) ** 2
  );
  //dichiaro la costante che racchiude i valori calcolati e ne restituisce il più grande che è quello che userò come raggio per il mio clipPath
  const radius = Math.max(distanceTL, distanceTR, distanceBL, distanceBR);

  // Generate spiral path
  const spiralPath = generateSpiralPath(centerX, centerY);

  await nextTick();
  if (spiralPath.value) {
    spiralPath.value.setAttribute("d", pathString);
    spiralPath.value.style.strokeWidth = 0; // Initially hide the path

    gsap.to(spiralPath.value, {
      strokeWidth: 5, // Adjust as needed
      duration: 2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(overlay.value, {
          clipPath: `circle(${maxRadius}px at ${window.innerWidth / 2}px ${
            window.innerHeight / 2
          }px)`,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  }
};

const closeOverlay = () => {
  if (!isClient.value) return;
  const { width, height, left, top } = props.buttonRect;
  // const centerX = left + width / 2;
  // const centerY = top + height / 2;

  // const radius = Math.max(window.innerWidth, window.innerHeight) * 1.5;

  gsap.to(overlay.value, {
    // clipPath: `circle(${width / 2}px at ${centerX}px ${centerY}px)`,
    clipPath: `circle(${width / 10}px at ${left + width / 2}px ${top + height / 2}px)`,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      emits("update:visible", false);
    },
  });
};

// Function to generate spiral path
function generateSpiralPath(cx, cy) {
  let pathString = `M${cx},${cy}`;
  for (let i = 0; i < numPoints; i++) {
    const angle = 0.1 * i;
    const x = cx + ((1 + angle) * Math.cos(angle) * maxRadius) / numPoints;
    const y = cy + ((1 + angle) * Math.sin(angle) * maxRadius) / numPoints;
    pathString += ` L${x},${y}`;
  }
  return pathString;
}

onMounted(() => {
  isClient.value = true;
  // Ensure SVG dimensions are set correctly
  svgWidth.value = window.innerWidth;
  svgHeight.value = window.innerHeight;
  maxRadius = Math.max(svgWidth.value, svgHeight.value) * 1.5;
});
</script>

<style></style>
