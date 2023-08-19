<template>
  <div>
    <form action="" @submit.prevent="handleSubmit()">
      <input type="text" v-model="promptText" placeholder="enter suggestion" />
      <button>submit</button>
    </form>

    <div class="response-block">
      <div v-if="loading">
        <h3>Thinking...</h3>
        <span class="loader"></span>
      </div>

      <div v-else>
        <div v-if="responseParsed">
          <h2 class="suggestion">
            Your prompt: <span class="prompt">"{{ promptProp }}"</span>
          </h2>
          <div class="colorgrid">
            <div class="cell" v-for="(cell, index) in responseParsed" :key="index">
              <div class="cell-color" :style="{ backgroundColor: cell.hex }"></div>
              <p class="cell-name">{{ cell.name }}</p>
              <p class="cell-hex">{{ cell.hex }}</p>
            </div>
          </div>
        </div>
        <br /><br />
        <!-- 3/2 COLUMN -->
        <div v-if="responseParsed">
          <h2 class="suggestion2">
            Your prompt: <span class="prompt">"{{ promptProp }}"</span>
          </h2>
          <div class="colorgrid2">
            <div class="cell" v-for="(cell, index) in responseParsed" :key="index">
              <div class="cell-color" :style="{ backgroundColor: cell.hex }"></div>
              <p class="cell-name">{{ cell.name }}</p>
              <p class="cell-hex">{{ cell.hex }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Configuration, OpenAIApi } from 'openai'

const apiResponse = ref(null)
const responseParsed = ref(null)

const promptText = ref('')
const promptProp = ref('')
const loading = ref(false)
function cleanBrokenJSON(jsonStr) {
  // Use regular expression to replace instances of comma followed by spaces (if any) and then a closing bracket or brace
  return jsonStr.replace(/,\s*([\]}])/g, '$1')
}

const handleSubmit = () => {
  loading.value = true

  async function generateResponse() {
    const configuration = new Configuration({
      organization: 'org-fWYQwgBDSZLxrUyC3ERZrfWh',
      apiKey: import.meta.env.VITE_API_KEY
    })

    const openai = new OpenAIApi(configuration)

    // "explanation": "An one-sentence explanation for why you chose that color and name.

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Hello there, how may I assist you today?' },
        {
          role: 'user',
          content: `Without commentary before or after, please provide a RFC8259 compliant JSON object with five objects, each with the following properties:
          [{
            "hex": "a hex color you associate with the term '${promptText.value}'.",
            "name": "a two-word color name you associate with that hex color. Please use weirder, more unusual color names that have something to do with the term '${promptText.value}', i.e. 'seafoam sage' instead of 'green', or 'torrid magenta' instead of 'hot pink'. Do not repeat a name used in any of the other objects.",

          }]
          
          Example of how your response should be formmatted:
         [
{
"hex": "",
"name": "",
},
{
{
"hex": "",
"name": "",
},
{
"hex": "",
"name": "",

},
{
"hex": "",
"name": "",
},
{
"hex": "",
"name": "",
}
]
... Be sure to only return a RFC8259 compliant JSON object.
          `
        }
      ],
      temperature: 0.1,
      max_tokens: 250
    })

    // parse values and set to reactive states
    apiResponse.value = cleanBrokenJSON(response.data.choices[0].message.content)
    responseParsed.value = JSON.parse(apiResponse.value)
    // apiResponse.value = ''
    console.log('RESPONSE:', responseParsed.value)

    promptProp.value = promptText.value
    promptText.value = ''

    loading.value = false
  }

  generateResponse()
}

const fakeResponse = JSON.parse(
  `[ { "hex": "#FFD700", "name": "luminous gold", "explanation": "I chose this color and name because it reminds me of the radiant glow of the sun at its peak." }, { "hex": "#FF4500", "name": "blazing tangerine", "explanation": "This color and name represents the intense and fiery energy emitted by the sun during sunset." }, { "hex": "#FFA500", "name": "solar flare", "explanation": "I associate this color and name with the sun's powerful bursts of energy and vibrant warmth." }, { "hex": "#FF7F50", "name": "coral ember", "explanation": "This color and name captures the essence of the sun's gentle and captivating evening glow." }, { "hex": "#FF8C00", "name": "radiant saffron", "explanation": "I chose this color and name because it reflects the sun's vibrant and captivating presence in the sky." } ]`
)
</script>

<style lang="css" scoped>
input,
button {
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid grey;
  border-radius: 0.5rem;
}

button {
  margin-left: 0.5rem;
}

.response-block {
  margin-top: 3rem;
  /* width: 800px; */
}

.loader {
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 5px solid #ccc;
  border-bottom-color: transparent;
  border-radius: 50%;
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

.suggestion {
  margin-top: 2rem;
  width: 100%;
  padding: 5px 0 4px;
  font-size: 2rem;
  font-weight: 300;
  text-transform: capitalize;
  border-bottom: 2px solid black;
  width: 970px;
}

.suggestion2 {
  margin-top: 2rem;
  width: 100%;
  padding: 5px 0 4px;
  font-size: 2rem;
  font-weight: 300;
  text-transform: capitalize;
  border-bottom: 2px solid black;
  width: 730px;
}

.suggestion .prompt {
  font-weight: bold;
}

.colorgrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-template-rows: repeat(2, 1fr); */
  max-width: 100%;
  /* height: 300px; */
  margin-top: 1rem;
  padding: 1rem;
  grid-gap: 1rem;
  width: 750px;
}

.colorgrid2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 100%;
  /* height: 300px; */
  margin-top: 1rem;
  padding: 1rem;
  grid-gap: 1rem;
  width: 750px;
}

.cell {
  display: flex;
  flex-direction: column;
}

.cell-color {
  height: 170px;
  width: 170px;
  margin-bottom: 0.5rem;
  border: 2px solid black;
}

.cell-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.3rem 0 0.4rem 0;
  color: black;
  text-transform: capitalize;
}

.cell-hex {
  font-size: 1rem;
  margin: 0;
  color: #999;
}
</style>
