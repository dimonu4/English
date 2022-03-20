Vue.component('training',{
    data(){
        return{
            wordTranslateOn:false,
            currentWordTranslate:0,
            computedArray:[]
        }
    },
    props:{
        words:[],
        vocabulary:[],
        currentUser:[],
    },
    template:`
    <div>
    <p>computed array: </p>
    <ul v-for='element in computedArray' key:element.id>
    <li>{{element.id}}</li>
    </ul>
    <button v-on:click='testHandle()'>Test</button>
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
        // computedArray(){
        //     // let arrayId =[]
        //     return  this.currentUser.learning.filter(el => el.WT === undefined || el.WT === false )
        //     // for(let word of preciseWords){
        //     //     arrayId.push(word.id)
        //     // }
        //     // return this.words.filter(el => arrayId.includes(el.id))
            
        // }
    },
    methods:{
        // feedWordTranslate(){
        //     return 
        // },

        // computedArray(){
        //     console.log('computedArray was touched')
        //     return this.currentUser.learning.filter(el => el.WT === undefined || el.WT === false )      
        // },

        testHandle(){
            console.log('test started')
            this.currentUser.learning[3].WT=true
            console.log(this.currentUser.learning[3])
            this.computedArray = this.currentUser.learning.filter(el => el.WT === undefined || el.WT === false )
        },

        handleAnswer(id){
            if( id === this.words[this.currentWordTranslate].id){
                console.log('yes')
                console.log(id)
                this.$parent.$parent.putJson('/api/userswords/learning', {id:id})
                .then(data => {     
                    console.log('is it?', data)
                    if(data.result === 1){
                        this.currentWordTranslate++
                        console.log('it should')
                    } else if (data.result === 0){
                        console.log('something wrong')
                    }
                })
                
            } else {
                console.log('no')
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