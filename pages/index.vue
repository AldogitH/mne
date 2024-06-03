<template>
  <div class="max-w-[1700px] m-auto px-16">
    <div class="box w-8 h-8 rounded bg-lime-600"></div>
    <div class="box2 w-8 h-8 rounded bg-orange-600"></div>
    <div class="box3 w-8 h-8 rounded bg-violet-600"></div>
    <div class="cp"></div>
    <!-- <ContentDoc class="sm:text-orange-500 md:text-slate-600 lg:text-lime-500" /> -->
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1 class="text-seagull-400 dark:text-orange-400">{{ doc.title }}</h1>
        <p class="dark:text-orange-600">{{ doc.description }}</p>
        <ContentRenderer :value="doc" />
      </article>
      <svg width="100%" height="100%" viewBox="-20 0 557 190" id="svg">
        <path
          id="path"
          d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice" viewBox="0 0 2728 2400">
        <path stroke="blue" stroke-width="4" id="curve" d="m 363.32001,203.97319 c 3.64959,3.6496 -3.11901,6.72017 -6.06587,6.06587 -7.98584,-1.77311 -9.26961,-12.00196 -6.06587,-18.19761 5.73073,-11.08257 20.6122,-12.38089 30.32935,-6.06587 14.26032,9.26756 15.58439,29.33925 6.06586,42.4611 -12.6867,17.48936 -38.10776,18.82717 -54.59283,6.06585 -20.74479,-16.05881 -22.09029,-46.89603 -6.06585,-66.72457 19.40773,-24.01503 55.69543,-25.36517 78.85631,-6.06585 27.2943,22.74358 28.64744,64.50177 6.06585,90.98806 -26.07135,30.57946 -73.31275,31.93464 -103.1198,6.06584 -33.86866,-29.39378 -35.22529,-82.12698 -6.06584,-115.25154 32.7125,-37.16075 90.94358,-38.51845 127.38328,-6.06584 40.45497,36.02855 41.81347,99.76197 6.06583,139.51502 -39.3426,43.75082 -108.58173,45.10994 -151.64676,6.06583 -47.04792,-42.65512 -48.40753,-117.40258 -6.06582,-163.7785 45.96644,-50.346019 126.2243,-51.706017 175.91024,-6.06582 53.64492,49.27682 55.00524,135.04673 6.06582,188.04198 -52.58642,56.94449 -143.86976,58.30507 -200.17373,6.06582 C 199.9556,251.19757 198.5948,154.3997 254.13437,94.787494 313.33819,31.24235 415.65155,29.881364 478.57158,88.721685 532.16254,138.83784 545.45065,220.64134 512.35921,285.79363" />
      </svg>
    </ContentDoc>
  </div>
</template>

<script setup>
//Utilizzo di Gsap
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
const tl = gsap.timeline({ defaults: { duration: 1, ease: "back" } });

const tl2 = gsap.timeline({});

onMounted(() => {
  tl.to(".box2", { rotation: -270 })
  .to(".box3", { rotation: 360 })
  .to(".box", {
    duration: 3,
    rotation: 360,
    scale: 2,
    repeat: -1,
    yoyo: true,
    // motionPath: {
    //   path: "#path",
    //   align: "#path",
    //   //autoRotate: true,
    //   alignOrigin: [0.5, 0.5],
    // },
  });

  tl2.to(".cp",{scale:5, duration:25, clipPath: "circle(100%)", motionPath:{path:"#curve", align: "#curve", start:0, end:1, alignOrigin: [0.5, 0.5] } })
  .to(".cp",{duration:3, clipPath: "circle(20%)", motionPath:{path:"#curve", align: "#curve", start:0.3, end:0.7, alignOrigin: [0.5, 0.5] } });

  // gsap.to(".cp", {
  //   duration: 30,
  //   scale: 3,
  //   clipPath: "circle(100%)",
  //   motionPath: {
  //     path: "#path",
  //     align: "#path",
  //     //autoRotate: true,
  //     alignOrigin: [0.5, 0.5],
  //   },
  // });
});
//fine - Utilizzo di Gsap
</script>

<style scoped>
.cp {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #2696e9;
}
.cp {
  --clip: 0%;
  clip-path: circle(0%);
}
</style>
