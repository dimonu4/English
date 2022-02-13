const app = new Vue({
  el: "#app",
  data: {},
  methods: {
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(result => result.json())
        .catch(err => {
          console.log(err);
        });
    },
    getJson(url){
      return fetch(url)
      .then(result => result.json())
      .catch(err=>{
        console.log(err);
      })
    },
    putJson( url, data ){
      return fetch( url, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    }
  },

});
