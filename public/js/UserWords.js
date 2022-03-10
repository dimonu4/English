Vue.component('user-words', {
    data (){
        return{
            vocabulary: [],
            currentuser: [],
            wordsForLearning: [],
        }
    },
    template: `
      <div>
      <h2>Words for learning: {{currentuser.learning.length}}</h2>
      <p v-for='word in wordsForLearning' :key='word.id'>
      {{word.id}}
      </p>
      <h2>Words for repeating: {{currentuser.repeating.length}}</h2>
      <p>
      </p>
      <h2>Words has been learnt: {{currentuser.learnt.length}}</h2>
      <p>
      </p>
      </div>
    `,
    mounted(){
        this.$parent.getJson('/api/vocabulary')
        .then( result =>{
            this.vocabulary = result;
        }),

        this.$parent.getJson('api/userswords')
        .then( result => {
            this.currentuser = result[0];
        })

        for(let i = 0; i < this.currentuser.learning.length; i++){
            this.wordsForLearning[i] = this.vocabulary[this.currentuser.learning[i]];
        }
    }
})