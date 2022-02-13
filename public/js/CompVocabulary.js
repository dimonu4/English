Vue.component("vocabulary-adding", {
  data() {
    return {
      inputEnglishWord: "",
      inputTranslateWord: "",
      vocabulary:[],
      lastId:'',
      quantity:'',
      regExp:'',
      isExists: true,
      foundId:'',
      currentuser: []
    };
  },
  template: `
    <form action="#" v-on:submit.prevent="addNewWord(inputEnglishWord,inputTranslateWord)">
    <p>Words in vocabulary: {{quantity}}</p>
    <h1>Add new word in English</h1>
    <input type="text" v-model="inputEnglishWord" placeholder="In English">
    <input type="text" v-model="inputTranslateWord" placeholder="Translate"><br>
    <button >Add new world</button>
    </form>`,
  methods: {
    addNewWord: function (eng, trans) {
      this.regExp = new RegExp(eng,"i");
      this.found = this.checkWord(eng);
      if(this.isExists){
        console.log('this word exists');
        let dateNow = new Date(this.found.date)
      //  console.log(this.found)
        console.log('last edit: '+dateNow)
      } else {

      // add new world in vocabulary.json
      this.$parent.postJson("/api/vocabulary",{id:this.lastId+1, english: eng, translate:trans, date: Date.now()}
      ).then(data=>{
        if(data.result === 1){
          this.vocabulary.push({id:this.lastId+1,english:eng, translate:trans, date:Date.now()});
          this.quantity++;
          this.lastId++;
          this.clearFields();
          console.log('the word has been added')
        }else if(data.result===0){
          console.log('its an error')
        }
      })

      // push word id into users.json/learning
      this.$parent.putJson( '/api/userswords/learning', {id: this.lastId + 1, date: Date.now()})
      .then( data => {
        if ( data.result === 1) {
          this.currentuser[0].learning.push({id: this.lastId + 1, date: Date.now()})
        } else if( data.result === 0 ){
          console.log( 'error' );
        }
      })
      }
    },
    checkWord(eng){
      let found;
      let check= 0;
      this.vocabulary.forEach(el=>{
        if(this.regExp.test(el.english) || eng.length == el.length){
          check++;
          found= el;
        }
        })
        if(check>0){
          this.isExists=true;
        }else{
          this.isExists=false;
        }
        return found;
    },
    clearFields(){
      this.inputEnglishWord='';
      this.inputTranslateWord='';
    }
  },
  mounted(){
    this.$parent.getJson("/api/vocabulary")
    .then(result=>{
      this.vocabulary=result;
      this.lastId = +result[result.length-1].id;
      this.quantity = result.length;
    })

    this.$parent.getJson('api/userswords')
        .then( result => {
            this.currentuser = result[0];
        })
  }
});
