<template>
  <div>
    <!-- <h2>COLOR SCHEMER!</h2> -->
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
      organization: 'org-fWYQwgBDSZLxrUyC3ERZrfWh',
      apiKey: import.meta.env.VITE_API_KEY
    })

    console.log(configuration)
    const openai = new OpenAIApi(configuration)

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Hello there, how may I assist you today?' },
        {
          role: 'user',
          content: `Please provide a JSON object with five objects, each with the following properties:
          [{
            "hex": "a hex color you associate with the term '${promptText.value}'.",
            "name": "a two-word color name you associate with that hex color. Please use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.",
            "explanation": "An one-sentence explanation for why you chose that color and name.
          }]
          
          Example of how your response should be formmatted:
         [
{
"hex": "#FFD700",
"name": "luminous gold",
"explanation": "I chose this color and name because it reminds me of the radiant glow of the sun at its peak."
},
{
"hex": "#FF4500",
"name": "blazing tangerine",
"explanation": "This color and name represents the intense and fiery energy emitted by the sun during sunset."
},
{
"hex": "#FFA500",
"name": "solar flare",
"explanation": "I associate this color and name with the sun's powerful bursts of energy and vibrant warmth."
},
{
"hex": "#FF7F50",
"name": "coral ember",
"explanation": "This color and name captures the essence of the sun's gentle and captivating evening glow."
},
{
"hex": "#FF8C00",
"name": "radiant saffron",
"explanation": "I chose this color and name because it reflects the sun's vibrant and captivating presence in the sky."
}
]

          `
          //           content: `Please return a JSON object with the following items (and please be sure that all keys and values are in double quotes):

          // an object containing three items:
          // 1. hex: a hex color you associate with the term "${promptText.value}".
          // 2. name: a word you associate with that hex color. Please use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.
          // 3. explanation: An one-sentence explanation for why you chose that color and name.

          // an object containing three items:
          // 1. hex: a hex color you associate with the term "${promptText.value}"
          // 2. name: a word you associate with that hex color. Please use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.
          // 3. explanation: An one-sentence explanation for why you chose that color and name.

          // an object containing three items:
          // 1. hex: a hex color you associate with the term "${promptText.value}"
          // 2. name: a word you associate with that hex color. Please use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.
          // 3. explanation: An one-sentence explanation for why you chose that color and name.

          // an object containing three items:
          // 1. hex: a hex color you associate with the term "${promptText.value}"
          // 2. name: one word you associate with that hex colorPlease use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.
          // 3. explanation: An one-sentence explanation for why you chose that color and name.

          // an object containing three items:
          // 1. hex: a hex color you associate with the term "${promptText.value}"
          // 2. name: a word you associate with that hex colorPlease use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.
          // 3. explanation: An one-sentence explanation for why you chose that color and name.
          // .
          // `
          //           content: `Without additional commentary or explanation, please create only a RFC8259 compliant JSON object with five objects, each with the following properties:
          // [{
          //   "hex": "a hex color you associate with the term '${promptText.value}'.",
          //   "name": "a two-word color name you associate with that hex color. Please use weirder, more unusual color names, i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.",
          //   "explanation": "An one-sentence explanation for why you chose that color and name.
          // }]`
        }
      ],
      temperature: 0.1,
      max_tokens: 250
    })

    apiResponse.value = response.data.choices[0].message.content
    console.log('API RESPONSE:', apiResponse.value)

    apiResponseProp.value = apiResponse.value

    promptProp.value = promptText.value

    promptText.value = ''
    apiResponse.value = ''

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
