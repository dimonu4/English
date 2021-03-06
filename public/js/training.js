Vue.component('training',{
    data(){
        return{
            wordTranslateOn:false,
            wordTypeOn:false,
            currentWordTranslate:0,
            currentWordType:0,
            isRight: false,
            isFalse: false,
        }
    },
    props:{
        words:[],
        vocabulary:[],
        currentUser:[],
        wordsWTP:[],
    },
    template:`
    <div>
    <p>Training words there: </p>
    <button v-on:click='wordTranslateOn=!wordTranslateOn'>word-translation: {{wordsForWT}}</button>
    <word-translation 
     v-if='wordTranslateOn'
     v-bind:word='words[0]'
     v-bind:wordsTranslate='getWordsTranslate(words[0]?.id, words[0])'
     v-bind:isRight='isRight'
     v-bind:isFalse='isFalse'
     v-on:answerWord-translate='(id) => handleAnswer(id)'
     v-on:Cancel-from-word-translate='wordTranslateOn = false'
     v-on:NextWT='handleNextWT()'
     ></word-translation>
     <button v-on:click='wordTypeOn=!wordTypeOn'>Type translation: {{wordsWTP.length}}</button>
     <word-type-translate
     v-if='wordTypeOn'
     v-bind:wordWTP='wordsWTP[0]'
     v-on:answerWTP='(id)=>handleAnswerWTP(id)'
     v-on:answerNegativeWTP='(id)=>handleAnswerNegative(id)'
     v-on:NextWTP='handleNextWTP()'
     ></word-type-translate>
    </div>
    `,
    computed:{
     wordsForWT(){
         return this.words.length;
     },
     wordsForWTP(){
         return this.wordsWTP.length;
     }
    },
    methods:{
        handleNextWT(){
            let firstWord = this.words.shift();
            this.words.push(firstWord)
        },
        handleNextWTP(){
            let firstWord = this.wordsWTP.shift();
            this.wordsWTP.push(firstWord);
        },

        handleAnswerWTP(id){
            this.$parent.$parent.putJson('/api/userswords/learning/WTP', {id:id})
            .then(data =>{
                if(data.result === 1){
                    this.wordsWTP.shift()
                } else if(data.result === 0){
                    console.log('somethig wrong')
                }
            })
        },
        handleAnswerNegative(id){
            this.$parent.$parent.putJson('/api/userswords/learning/WTP/no', {id:id})
            .then(data =>{
                if(data.result === 1){
                    console.log('the word has been added to WT again');
                    this.wordsWTP.shift()
                } else if(data.result === 0){
                    console.log('an Error')
                }
            })
        },
        handleAnswer(id){
            if( id === this.words[this.currentWordTranslate].id){
                console.log('yes')
                this.isRight = true
                setTimeout(()=>this.isRight = false, 250)
                this.$parent.$parent.putJson('/api/userswords/learning/yes', {id:id})
                .then(data => {     
                    if(data.result === 1){
                        
                        this.words.shift()
                        this.isRight = true;
                    } else if (data.result === 0){
                        console.log('something wrong')
                    }
                })
                
            } else {
                console.log('no')
                this.isFalse = true
                setTimeout(()=>this.isFalse = false, 250)
                this.$parent.$parent.postJson('/api/userswords/learning/no', {id:id})
                .then(data => {
                    if(data.result === 1){
                        console.log('The word has been added for repeating')
                    } else if( data.result === 0){
                        console.log('something wrong')
                    }
                })
            }
        },
        getWordsTranslate(exceptionId, translate){
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
    },
})