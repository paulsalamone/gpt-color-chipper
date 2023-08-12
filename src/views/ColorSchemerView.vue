<template>
  <div>
    <h2>COLOR SCHEMER</h2>
    <p>
      This is a tool to help you generate color schemes based on words. It uses the OpenAI API to
      generate color schemes based on words you enter. It returns a JSON object with six colors,
      each with a hex code and a word associated with that color. You can use the hex codes to
      generate a color scheme, and the words to help you name the colors.
    </p>

    <form action="" @submit.prevent="handleSubmit()">
      <input type="text" v-model="promptText" placeholder="enter three words" />
      <button>submit</button>
      <button @click.prevent="handleClear">clear</button>
    </form>

    <div>
      <h3 v-if="loading || apiResponseProp">Response:</h3>
      <div v-if="loading">
        <span class="loader"></span>
      </div>
      <div v-else>
        <color-grid
          v-if="apiResponseProp"
          :prompt-text="promptProp"
          :api-response="apiResponseProp"
        ></color-grid>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Configuration, OpenAIApi } from 'openai'
import ColorGrid from '../components/ColorSchemer/ColorGrid.vue'

const apiResponse = ref(null)
const apiResponseProp = ref(null)
const promptText = ref('')
const promptProp = ref('')
const loading = ref(false)
const handleClear = () => {
  promptText.value = ''
  apiResponse.value = ''
  apiResponseProp.value = ''
  promptProp.value = ''
}
const handleSubmit = () => {
  loading.value = true

  async function generateResponse() {
    console.log(import.meta.env.VITE_API_KEY)
    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_API_KEY
    })

    console.log(configuration)
    const openai = new OpenAIApi(configuration)

    // These can be abstract concepts you associate with it, or colors related to objects, people, places, or things, connected with the prompt. It may be a color you see in photos of the prompt as well. (Remember this for all of the colors.)

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Please return a JSON object with the following items (and please be sure that all keys and values are in double quotes):

color1: an object containing two items: 
1. hex: a hex color you associate with the term "${promptText.value}". 
2. word: a word you associate with that hex color.

color2: an object containing two items: 
1. hex: a hex color you associate with the term "${promptText.value}"
2. word: a word you associate with that hex color. 

color3 an object containing two items: 
1. hex: a hex color you associate with the term "${promptText.value}"
2. word: a word you associate with that hex color. 

color4: an object containing two items: 
1. hex: a hex color you associate with the term "${promptText.value}"
2. word: one word you associate with that hex color

color5 an object containing two items: 
1. hex: a hex color you associate with the term "${promptText.value}"
2. word: a word you associate with that hex color

color6 an object containing two items: 
1. hex: a hex color you associate with the term "${promptText.value}"
2. word: a word you associate with that hex color

NOTE: feel free to use non-standard colors, such as pastels, or colors that are not in the standard 6-color palette. Also, the last three colors can adjacent colors, or brighter, darker, more saturated, or less saturated variations of the first colors. Just please don't repeat anything. And DO NOT use the name of a color as the word. For example, if you choose the color red, please don't use the word "red" as the word. Instead, use a word that you associate with the color red.
`,

      temperature: 0.1,
      max_tokens: 250
    })

    apiResponse.value = response.data.choices[0].text.trim()

    apiResponseProp.value = response.data.choices[0].text.trim()

    console.log(apiResponse.value)

    promptProp.value = promptText.value

    promptText.value = ''
    apiResponse.value = ''

    console.log(apiResponseProp.value)
    loading.value = false
  }

  generateResponse() // call the function to execute it
}

onMounted(() => {})
</script>

<style lang="css" scoped>
input,
button {
  padding: 1rem;
  font-size: 1.4rem;
  border-radius: 0.5rem;
}
input {
  border: 1px solid grey;
}
button {
  margin-left: 0.5rem;
  border: 1px solid grey;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #ccc;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
