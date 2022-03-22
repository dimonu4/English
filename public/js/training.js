Vue.component('training',{
    data(){
        return{
            wordTranslateOn:false,
            currentWordTranslate:0,
            
        }
    },
    props:{
        words:[],
        vocabulary:[],
        currentUser:[],
    },
    template:`
    <div>
    <p>Training words there</p>
    <button v-on:click='wordTranslateOn=!wordTranslateOn'>word-translation</button>
    <word-translation 
     v-if='wordTranslateOn'
     v-bind:word='words[currentWordTranslate]'
     v-bind:wordsTranslate='getWordsTranslate(words[currentWordTranslate].id, words[currentWordTranslate])'
     v-on:answerWord-translate='(id) => handleAnswer(id)'
     ></word-translation>
    </div>
    `,
    computed:{
     
    },
    methods:{

        testHandle(){
            console.log('test started')
            this.currentUser.learning[3].WT=true
            console.log(this.currentUser.learning[3])
            this.computedArray = this.currentUser.learning.filter(el => el.WT === undefined || el.WT === false )
        },

        handleAnswer(id){
            if( id === this.words[this.currentWordTranslate].id){
                console.log('yes')
                this.$parent.$parent.putJson('/api/userswords/learning/yes', {id:id})
                .then(data => {     
                    if(data.result === 1){
                        this.currentWordTranslate++
                    } else if (data.result === 0){
                        console.log('something wrong')
                    }
                })
                
            } else {
                console.log('no')
                this.$parent.$parent.putJson('/api/userswords/learning/no', {id:id})
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
    
    updated(){
        // this.computedArray = this.currentUser.learning.filter(el => el.WT === undefined || el.WT === false )
        //  console.log('updated hook worked')      
    }, 
    mounted(){
        console.log('mounted hook')
        
        this.computedArray = this.currentUser.learning.filter(el => el.WT === undefined || el.WT === false ) 
        console.log('computedArray was touched')
    }
})