Vue.component('training',{
    props:{
        words:[]
    },
    template:`
    <div>
    <p>Training words there</p>
    <p v-for='word in words' v-bind:key='word.id'>{{word.id}}</p>
    </div>
    `
})