Vue.component('word-type-translate',{
    props:{
        wordsWTP:[],
    },
    template:`
    <div>
    <div v-if='wordsWTP.length !== 0'>
      <ul v-for='el in wordsWTP' :key='el.id' >
      <li>{{el.id}}</li>
      </ul>
    </div>
    <div v-else='words'>Array is empty</div>
    </div>
    `,
})