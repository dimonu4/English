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
    v-bind:randomThreeWords='createRandomThreeWords(word.id, word)'
    ></word-translation>
    {{word.id}}</p>
    </div>
    `,
    methods:{
        createRandomThreeWords(exceptionId, translate){
           
            let array = [];
            let readyArray = [];
            while( array.length < 3 ){
                let word = this.giveMeTheWord(exceptionId);
                if( array.includes(word)) continue
               array.push( word );
            }
            array.push(translate);
            console.log(array)
            for(let i = 0; i<4; i++){
            readyArray = this.mixArray(array);
            }
            return readyArray
        },

        mixArray(array){
            let number1 = this.randomNumber(0,3);
            let number2 = this.randomNumber(0,3);
            let temp1 = array[number1];
            let temp2 = array[number2];
            array[number1] = temp2;
            array[number2] = temp1;
            return array
        },

        giveMeTheWord(exceptionId){
            let number;
            do { number = this.randomNumber(0, this.vocabulary.length - 1);}
            while(number + 1 === exceptionId)
            console.log(number)
            let findWord = this.vocabulary[number];
            return findWord
        },

        randomNumber(from, to) {
            return Math.floor( Math.random() * ( to - from + 1 ) + from );
        }
    }
})