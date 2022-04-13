Vue.component('user-words', {
    data (){
        return{
            showTraining: false,
            vocabulary: [],
            currentUser: [],
            wordsForLearning: [],
            quantityLearnWords:'',
            wordsWTP:[],
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
       v-bind:wordsWTP='wordsWTP'
       ></training>
      <h2>Words for repeating: </h2>
      <h2>Words has been learnt: </h2>
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
            this.filteredResult = this.currentUser.learning.filter(el => el.WT !== true)
            this.filteredWordType = this.currentUser.learning.filter(el => el.WTP !== true && el.WT ===true);
            // For word translate
            for(let i = 0; i < this.filteredResult.length; i++){
                this.wordsForLearning[i] = this.vocabulary.find(el => el.id === this.filteredResult[i].id)
            }
            // For word type translate(WTP)
            for(let i = 0; i < this.filteredWordType.length; i++){
                this.wordsWTP[i] = this.vocabulary.find(el => el.id === this.filteredWordType[i].id)
            }
            this.quantityLearnWords = this.wordsForLearning.length + this.wordsWTP.length;
        })
    }
})