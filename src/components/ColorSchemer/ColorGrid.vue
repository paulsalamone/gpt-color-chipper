<template>
  <!-- <div>{{ apiResponse1 }}</div> -->
  <div>
    <!-- {{ apiResponse }}} -->
    <h2>{{ promptText }}</h2>
    <div class="b-colorgrid" v-if="response">
      <div class="b-colorgrid__cell" v-for="(cell, index) in response" :key="index">
        <div class="b-colorgrid__cell_color" :style="{ backgroundColor: cell.hex }"></div>
        <p class="b-colorgrid__cell_name">{{ cell.name }}</p>
        <p class="b-colorgrid__cell_hex">{{ cell.hex }}</p>
      </div>

      <!-- REPLACE WITH V-FOR -->

      <!-- OLD SHIT -->
      <!-- <div class="b-colorgrid__left">
        <div
          class="b-colorgrid__left-main b-colorgrid__cell"
          :style="{ backgroundColor: r.color1.hex }"
        >
          <p>{{ r.color1.name }}</p>
        </div>
      </div> -->
      <!-- <div class="b-colorgrid__right">
        <div class="b-colorgrid__right-secondaries">
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color2.hex }">
            <p>{{ r.color2.name }}</p>
          </div>
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color3.hex }">
            <p>{{ r.color3.name }}</p>
          </div>
        </div>
        <div class="b-colorgrid__right-tertiaries">
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color4.hex }">
            <p>{{ r.color4.name }}</p>
          </div>
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color5.hex }">
            <p>{{ r.color5.name }}</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  promptText: {
    type: String,
    default: 'fun bold exciting'
  },
  fakeApiResponse: {
    type: String,
    default: `{
    "color1": {
        "hex": "#FF0000",
        "name": "Red"
    },
    "color2": {
        "hex": "#FFFF00",
        "name": "Yellow"
    },
    "color3": {
        "hex": "#00FF00",
        "name": "Green"
    },
    "color4": {
        "hex": "#0000FF",
        "name": "Blue"
    },
    "color5": {
        "hex": "#000000",
        "name": "Black"
    }
}`
  },
  apiResponse: {
    type: String,
    default: `{
    "color1": {
        "hex": "#FF0000",
        "name": "Red"
    },
    "color2": {
        "hex": "#FFFF00",
        "name": "Yellow"
    },
    "color3": {
        "hex": "#00FF00",
        "name": "Green"
    },
    "color4": {
        "hex": "#0000FF",
        "name": "Blue"
    },
    "color5": {
        "hex": "#000000",
        "name": "Black"
    }
}`
  }
})

const response = ref(JSON.parse(props.apiResponse))

watch(
  () => props.apiResponse,
  (newVal) => {
    response.value = JSON.parse(newVal)
  },
  { immediate: true }
)

// console.log(r);
</script>

<style scoped lang="scss" src="./color-grid.scss"></style>
