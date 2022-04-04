Vue.component('translator',{
    data(){
        return{
            vocabulary:[],
            input:'',
            output:'',
            reg:'',
            engreg:/[a-zA-Z]/,
            rusreg:/[а-яёА-ЯЁ]/,
        }
    },
    template:`
    <div>
    <h1>Translate</h1>
    <input type='text' v-model='input' v-on:change=findTranslate>
    <input type='text' v-model='output'><br>
    <button>Translate</button>
    </div>
    `,
    methods:{
        findTranslate(){
            this.reg=new RegExp(this.input,'i');
            if(this.engreg.test(this.input)){
            const find = this.vocabulary.find(el => this.reg.test( el.english ) && el.english.length==this.input.length);
            if(find){
                this.$parent.putJson('/api/translator/repeat', {id:find.id})
                .then(data=>{
                    if(data.result === 0){
                        console.log('an erron')
                    } else if(data.result === 1){
                        console.log('the word has been added for learning')
                    }
                })
                this.output=find.translate;
            }else{           
            this.output='Слово отсутствует в словаре'
            }
          }else if(this.rusreg.test(this.input)){
            const find= this.vocabulary.find(el=>this.reg.test(el.translate)&&el.translate.length==this.input.length);
            if(find){
                this.output=find.english;
            }else{
                this.output='Слово отсутствует в словаре'
            }
          }else{
              this.output='Вы ввели недопустимые символы'
          }
        }
    },
    mounted(){
        this.$parent.getJson('/api/vocabulary')
        .then(result=>{
            this.vocabulary = result;
        })
    }
})