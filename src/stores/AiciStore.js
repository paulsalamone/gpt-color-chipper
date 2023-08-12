import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { Configuration, OpenAIApi } from 'openai'

export const useAiciStore = defineStore('AiciStore', () => {

    // MOUNT AND GET LOCAL STORAGE

    onMounted(() => {
        console.log("aici store mounted")
    })


    // PROMPT
    const prompt = ref("")

    const setPrompt = (text) => {
        console.log("store set prompt")
        prompt.value = text;
        getNameIdeas()

    }

    // NAMES
    const nameIdeas = ref([])

    const getNameIdeas = () => {
        // FIRST API CALL

        async function generateResponse() {

            nameIdeas.value = []
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_API_KEY
            })

            const openai = new OpenAIApi(configuration)

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `Please return a JSON object with a single key value pair:
                "names": [ --- Here a list of 6 new brand names for a new company, service, or product related to the prompt: "${prompt.value}".  ---]
                `,
                temperature: 0.1,
                max_tokens: 250
            })

            // console.log(response.data.choices[0].text)

            const names = JSON.parse(response.data.choices[0].text).names

            names.forEach(e => {
                nameIdeas.value.push(e)
            })
            console.log(nameIdeas.value)

            // {0: 'Pawfection', 1: 'Pup-A-Razzi', 2: 'Doggy Delights', 3: 'Pawsome Pals', 4: 'Canine Cravings', 5: 'Puppy Paradise'}

        }
        generateResponse()

    }

    // CLAIMS
    const favoriteName = ref("")
    const claimIdeas = ref([])

    const getClaims = (item) => {
        favoriteName.value = item
        // SECOND API CALL

        async function generateResponse() {

            claimIdeas.value = []
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_API_KEY
            })

            const openai = new OpenAIApi(configuration)

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `Please return a JSON object with a single key value pair:
                "claims": [ (A list of 5 new brand claims for a new company, service, or product related to the prompt: "${prompt.value} and the name ${item}". Do not repeat the name, just return the claim.) ]
                `,
                temperature: 0.1,
                max_tokens: 250
            })

            // console.log(response.data.choices[0].text)

            const claims = JSON.parse(response.data.choices[0].text).claims

            claims.forEach(e => {
                claimIdeas.value.push(e)
            })
            console.log(claimIdeas.value)

            // {0: 'Treat your pup to the best with Canine Cravings!', 1: 'Canine Cravings: The perfect snack for your furry friend!', 2: 'Canine Cravings: The ultimate indulgence for your pup!', 3: 'Canine Cravings: The delicious way to show your pup you care!', 4: 'Canine Cravings: The delicious way to spoil your pup!'}

        }
        generateResponse()
    }

    // COLORS
    const favoriteClaim = ref("")
    const colorIdeas = ref([])
    const getColors = (item) => {
        favoriteClaim.value = item;

        async function generateResponse() {

            colorIdeas.value = []
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_API_KEY
            })

            const openai = new OpenAIApi(configuration)

            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `Please return a JSON object with a single key-value pair: {
                "colors": [ 
                    [Here an array of three hex colors you associate with the prompt: ${prompt.value}, the brand name ${favoriteName.value}, and the claim ${favoriteClaim.value}. These should work as balanced trio as you would see in a web design or logo.], 
                    [and now a second, different array with 3 more colors. if the first array was bright and bold, this one should be more subtle and muted], 
                    [and now a third array with three more colors. use a totally different approach to relevant colors] ],
                } `,
                temperature: 0.1,
                max_tokens: 250
            })

            // `Please return a JSON object with a single key-value pair:
            // "colors": [ "color1": [--- Here an array of three hex colors you associate with the prompt: ${prompt.value}, the brand name ${favoriteName.value}, and the claim ${favoriteClaim.value}. These should work as balanced trio as you would see in a web design or logo. ---],
            //   "color2": [--- Here another array of three hex colors you associate with the prompt: ${prompt.value}, the brand name ${favoriteName.value}, and the claim ${favoriteClaim.value}. Please use completely different colors from "color1". This time use more sublte hues and shades. ---],
            // `
            // prompt: `Please return a JSON object with a single key value pair:
            //     "colors": [ --- Here an array of three arrays. Each one has three hex colors you associate with the prompt: ${prompt.value}, the brand name ${favoriteName.value}, and the claim ${favoriteClaim.value}  ---]
            //     `,


            // const colorGroup = []

            colorIdeas.value.push(JSON.parse(response.data.choices[0].text))

            console.log(colorIdeas.value)

            //  <!-- [ [ "#FFCE54", "#F07818", "#F8E71C" ], [ "#F9D423", "#F5A623", "#F4D03F" ], [ "#F5AB35", "#F39C12", "#F9E79F" ] ] -->


            //             :
            //             Array(3)
            //             0
            // :
            // Array(3)
            // 0
            // :
            // "#00AEEF"
            // 1
            // :
            // "#FFCF00"
            // 2
            // :
            // "#00A550"
            // length
            // :
            // 3
            // [[Prototype]]
            // :
            // Array(0)
            // 1
            // :
            // Array(3)
            // 0
            // :
            // "#A2A2A2"
            // 1
            // :
            // "#F2F2F2"
            // 2
            // :
            // "#D8D8D8"
            // length
            // :
            // 3
            // [[Prototype]]
            // :
            // Array(0)
            // 2
            // :
            // Array(3)
            // 0
            // :
            // "#FFCF00"
            // 1
            // :
            // "#00A550"
            // 2
            // :
            // "#00AEEF"

        }


        generateResponse()

    }


    return { prompt, setPrompt, nameIdeas, claimIdeas, colorIdeas, favoriteName, getClaims, favoriteClaim, getColors }
})
