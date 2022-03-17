Vue.component('word-translation',{
    props:{
        word:{},
        randomThreeWords:[],
    },
    template:`
        <div>
            <p>Please translate: {{word.english}}</p>
            <ul v-for='translate in randomThreeWords' :key='translate.id'>
            <li>{{translate.translate}}</li>
            </ul>
        </div>
    `,
})