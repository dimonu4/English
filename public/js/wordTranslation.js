Vue.component('word-translation',{
    props:{
        word:{},
        wordsTranslate:[],
        isRight:Boolean,
        isFalse:Boolean,
    },
    template:`
        <div>
        <div v-if='word'>
            <p>Please translate: <b>{{word.english}}</b></p>
            <ul v-for='translate in wordsTranslate' :key='translate.id'>
            <li 
                v-bind:class='{ rightAnswer: isRight, wrongAnswer: isFalse }'
                v-on:click='handleAnswer(translate.id)'
                >{{translate.translate}}</li>
            </ul>
            <button v-on:click='handleCancel()'>Cancel</button>
            <button v-on:click='handleNext()'>Next</button>        
        </div>
        <p v-else>There are no words</p>
        </div>
    `,
    methods:{
        handleAnswer(id){
            this.$emit('answerWord-translate', id);
        },
        handleCancel(){
            this.$emit('Cancel-from-word-translate');
        },
        handleNext(){
            this.$emit('NextWT')
        }
    }
})