Vue.component('word-translation',{
    props:{
        word:{},
        wordsTranslate:[],
    },
    template:`
        <div>
            <p>Please translate: {{word.english}}</p>
            <ul v-for='translate in wordsTranslate' :key='translate.id'>
            <li v-on:click='handleAnswer(translate.id)'>{{translate.translate}}</li>
            </ul>
            <button v-on:click='handleCancel()'>Cancel</button>
            <button>Delay</button>        
        </div>
    `,
    methods:{
        handleAnswer(id){
            this.$emit('answerWord-translate', id);
        },
        handleCancel(){
            this.$emit('Cancel-from-word-translate');
        }
    }
})