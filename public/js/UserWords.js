Vue.component('user-words', {
    data (){
        return{
            vocabulary: [],
            currentuser: []
        }
    },
    template: `
      <div>
      <h2>Words for learning: {{currentuser.learning.length}}</h2>
      <p>
      
      </p>
      <h2>Words for repeating: {{currentuser.repeating.length}}</h2>
      <p>
      </p>
      <h2>Words has been learnt: {{currentuser.learnt.length}}</h2>
      <p>
      </p>
      </div>
    `,
    mounted(){
        this.$parent.getJson('/api/vocabulary')
        .then( result =>{
            this.vocabulary = result;
        }),

        this.$parent.getJson('api/userswords')
        .then( result => {
            this.currentuser = result[0];
        })
    }
})