Vue.component('training',{
    data(){
        return{
            wordTranslateOn:false,
        }
    },
    props:{
        words:[],
        vocabulary:[],
    },
    template:`
    <div>
    <p>Training words there</p>
    <button v-on:click='wordTranslateOn=!wordTranslateOn'>word-translation</button>
    
    <p v-for='word in words' v-bind:key='word.id'>
    <word-translation v-if='wordTranslateOn' v-bind:word='word' v-bind:vocabulary='vocabulary'
    v-bind:randomThreeWords='createRandomThreeWords(word.id)'
    ></word-translation>
    {{word.id}}</p>
    </div>
    `,
    methods:{
        createRandomThreeWords(exceptionId){
            let array = [];
            for( let i = 0; i<3; i++){
               array.push( this.giveMeTheWord(exceptionId) );
            }
            return array
        },

        giveMeTheWord(exceptionId){
            let number = this.randomNumber(1, this.vocabulary.length);
            let findWord = this.vocabulary[number];
            if(findWord.id !== exceptionId) {
                return findWord
            } else this.giveMeTheWord(exceptionId)
        },

        randomNumber(from, to) {
            return Math.floor( Math.random() * ( to - from + 1 ) + from );
        }
    }
})