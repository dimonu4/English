Vue.component('user-words', {
    data (){
        return{
            showTraining: false,
            vocabulary: [],
            currentUser: [],
            wordsForLearning: [],
            quantityLearnWords:'',
        }
    },
    template: `
      <div>
      <h2>Words for learning: {{quantityLearnWords}}</h2>
      <button v-on:click="showTraining = !showTraining">Train</button>
      <training v-if="showTraining"
       v-bind:words='wordsForLearning'
       v-bind:vocabulary='vocabulary'
       v-bind:currentUser='currentUser'
       ></training>
      <p v-for='word in wordsForLearning' :key='word.id'>
      {{word.english}}
      </p>
      <h2>Words for repeating: {{currentUser.repeating.length}}</h2>
      <p>
      </p>
      <h2>Words has been learnt: {{currentUser.learnt.length}}</h2>
      <p>
      </p>
      </div>
    `,
    methods:{
       
    },
    mounted(){
        
    },
    beforeCreate(){
        this.$parent.getJson('/api/vocabulary')
        .then( result =>{
            this.vocabulary = result;
        }),

        this.$parent.getJson('api/userswords')
        .then( result => {
            this.currentUser = result[0];
            for(let i = 0; i < this.currentUser.learning.length; i++){
                this.wordsForLearning[i] = this.vocabulary.find(el => el.id === this.currentUser.learning[i].id)
            }
            this.quantityLearnWords = this.wordsForLearning.length;
        })
    }
})