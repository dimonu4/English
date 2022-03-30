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
    <form action='#' v-on:submit.prevent='handleAnswer()'>
    <p>{{text}}</p>
    <a>{{wordWTP.translate}}</a>
    <input v-model='input'></input> </br>
    <button>answer</button>
    </form>
    `,
    methods:{
      handleAnswer(){
        if (this.input === this.wordWTP.english){
          this.text = "great! :)"
          this.$emit('answerWTP', this.wordWTP.id)
          this.input = '';
        } else {
          this.text = 'oops :('
        }
      }
    }
})