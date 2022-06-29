Vue.component('word-type-translate',{
  data(){
    return{
      input:'',
      text:'Please enter translation',
    }
  },
    props:{
        wordWTP:{},
    },
    template:`
    <div>
    <div v-if='wordWTP'>
    <form action='#' v-on:submit.prevent='handleAnswer()'>
    <p>{{text}}</p>
    <a>{{wordWTP.translate}}</a>
    <input v-model='input'></input> </br>
    <button>answer</button>
    </form>
    <button v-on:click='handleNext()'>Next</button>
    </div>
    <p v-else> There are no words</p>
    </div>
    `,
    methods:{
      handleNext(){
        this.$emit('NextWTP')
        this.input = '';
      },
      handleAnswer(){
        if (this.input.toLowerCase().trim() === this.wordWTP.english.trim()){
          this.text = "great! :)"
          this.$emit('answerWTP', this.wordWTP.id)
          this.input = '';
        } else {
          this.text = 'oops :(';
          this.$emit('answerNegativeWTP', this.wordWTP.id);
          this.input = '';
        }
      }
    }
})
