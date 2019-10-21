<template>
    <div class="container">
    
    <div class="card" v-for="(comment, com_id) in comments" :key="com_id">
             <div class="card-header"><h5>{{ comment.com_header }}</h5></div>
            <div class="card-body">{{ comment.com_body }}</div>
    </div>  

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" v-show="addComBtn">Dodaj novi komentar</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Postavi komentar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Naslov:</label>
            <input type="text" class="form-control" id="recipient-name" v-model="newComment.header">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Komentar:</label>
            <textarea class="form-control" id="message-text" v-model="newComment.body"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Izadji</button>
        <button type="button" class="btn btn-primary" @click="sendComment">Posalji komentar</button>
      </div>
    </div>
  </div>
</div>

    </div>
</template>

<script>
    import { EventBus } from '../main.js';
    export default {
        data() {
            name: 'Comments';
            return {
                comments: null,
                newComment: {
                    header: "",
                    body: ""
                },
                addComBtn: false,
                userData: null,
                userDataStorage: null,
            }
        },
       
            created(){
                axios.get('http://localhost:3000/comments')
                .then(response => (this.comments = response.data.data))
                .then(response => console.log(response))
        },
            mounted(){
                // EventBus.$on('send-data', data =>{
                // this.userData = data
                // })
                this.checkUser()
            },
        methods:{
            sendComment(){
                axios.post('http://localhost:3000/newComment',{
                header: this.newComment.header,
                body: this.newComment.body
            }).then(response => {
                this.newComment.header = ""
                this.newComment.body = ""
                alert('Uspesno ste postavili komentar')
            })
        },

            checkUser(){
                this.userDataStorage = JSON.parse(localStorage.getItem('user'))
                if(this.userDataStorage.us_level == 2 || this.userDataStorage.us_level == 1){
                this.addComBtn = true
                } 
            }
        },
    //      watch: {
    //     userData(){
    //       if(this.userDataStorage.us_level == 2 || this.userDataStorage.us_level == 1){
    //          this.addComBtn = true
    //       }
    //     }
    //   }
    }
    
</script>

<style scoped>
    #exampleModal{
        margin-top: 50px;
    }
    .card-header{
        background-color: #EDDEA4;
    }

</style>