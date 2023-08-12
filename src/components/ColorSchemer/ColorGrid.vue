<template>
  <!-- <div>{{ apiResponse1 }}</div> -->
  <div>
    <h2>{{ promptText }}</h2>
    <div class="b-colorgrid" v-if="r">
      <div class="b-colorgrid__left">
        <div
          class="b-colorgrid__left-main b-colorgrid__cell"
          :style="{ backgroundColor: r.color1.hex }"
        >
          <p>{{ r.color1.word }}</p>
        </div>
      </div>
      <div class="b-colorgrid__right">
        <div class="b-colorgrid__right-secondaries">
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color2.hex }">
            <p>{{ r.color2.word }}</p>
          </div>
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color3.hex }">
            <p>{{ r.color3.word }}</p>
          </div>
        </div>
        <div class="b-colorgrid__right-tertiaries">
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color4.hex }">
            <p>{{ r.color4.word }}</p>
          </div>
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color5.hex }">
            <p>{{ r.color5.word }}</p>
          </div>
          <div class="b-colorgrid__cell" :style="{ backgroundColor: r.color6.hex }">
            <p>{{ r.color6.word }}</p>
          </div>
        </div>
      </div>
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
        "word": "Red"
    },
    "color2": {
        "hex": "#FFFF00",
        "word": "Yellow"
    },
    "color3": {
        "hex": "#00FF00",
        "word": "Green"
    },
    "color4": {
        "hex": "#0000FF",
        "word": "Blue"
    },
    "color5": {
        "hex": "#000000",
        "word": "Black"
    },
    "color6": {
        "hex": "#003300",
        "word": "Black"
    }
}`
  },
  apiResponse: {
    type: String,
    default: `{
    "color1": {
        "hex": "#FF0000",
        "word": "Red"
    },
    "color2": {
        "hex": "#FFFF00",
        "word": "Yellow"
    },
    "color3": {
        "hex": "#00FF00",
        "word": "Green"
    },
    "color4": {
        "hex": "#0000FF",
        "word": "Blue"
    },
    "color5": {
        "hex": "#000000",
        "word": "Black"
    },
    "color6": {
        "hex": "#003300",
        "word": "Black"
    }
}`
  }
})

const r = ref(JSON.parse(props.apiResponse))

watch(
  () => props.apiResponse,
  (newVal) => {
    r.value = JSON.parse(newVal)
  },
  { immediate: true }
)

// console.log(r);
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 0;
  color: white;
  background-color: black;
  padding: 5px 0 1px 15px;
}
.b-colorgrid {
  border: 5px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  //   border: 1px dotted grey;
  padding: 1rem;
  height: 300px;
  grid-gap: 1rem;
  &__left {
    display: grid;
    grid-template-columns: 1fr;
  }

  &__right {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 2fr;
    grid-gap: 1rem;

    &-secondaries {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      grid-gap: 1rem;
    }

    &-tertiaries {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      grid-gap: 1rem;

      div {
        border: 15px solid white;
      }
    }
  }

  &__cell {
    // color: red;
    // border: 2px solid red;
    display: flex;
    align-items: flex-end;
  }

  p {
    background-color: black;
    color: white;
    margin: 0;
    padding: 2px 5px;
  }

  span {
    color: red;
  }
}
</style>