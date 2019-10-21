<template>
    <div class="home">
        <div class="container">
            <div class="row mb-2">
            <div class="col-md-6" v-for="(article, new_id) in news" :key="new_id">
            <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary">Vesti</strong>
              <h3 class="mb-0">
                <a class="text-dark" href="#">{{ article.new_header }}</a>
              </h3>
              <div class="mb-1 text-muted">{{ article.new_date }}</div>
              <p class="card-text mb-auto">{{ article.new_content }}</p>
              <a href="#">Continue reading</a>
            </div>
                 <!-- <img class="card-img-right d-none d-lg-block" data-src="holder.js/200x250?theme=thumb" alt="Nedostupna slika" style="width: 200px; height: 250px;" :src="article.new_picture" data-holder-rendered="true"> -->
                 <img class="card-img-right" :src="article.new_picture" alt="Slika trenutno nije dostupna" style="max-width: 230px; max-height: 250px;">
            </div>
            </div>
        </div>
        <div class="form-horizontal" v-show="adminFormIsDisplayed">
            <fieldset>

            <!-- Form Name -->
            <legend>Dodavanje vesti</legend>

            <!-- Text input-->
            <div class="control-group">
            <label class="control-label" for="textinput">Naslov vesti</label>
            <div class="controls">
                <input id="textinput" name="textinput" type="text" placeholder="Naslov" class="input-xlarge" v-model="newNews.header">
                <p class="help-block">Ovde upisati naslov vesti</p>
            </div>
            </div>

            <!-- Textarea -->
            <div class="control-group">
            <label class="control-label" for="textarea">Teks vesti</label>
            <div class="controls">                     
                <textarea id="textarea" name="textarea" v-model="newNews.content">Dodati tekst za vest</textarea>
            </div>
            </div>

            <!-- Multiple Radios -->
            <div class="control-group">
            <label class="control-label" for="radios">Tip vesti</label>
            <div class="controls">
                <label class="radio" for="radios-0">
                <input type="radio" name="radios" id="radios-0" value="story" checked="checked" v-model="newNews.type">
                Vest
                </label>
                <label class="radio" for="radios-1">
                <input type="radio" name="radios" id="radios-1" value="event" v-model="newNews.type">
                Desavanje
                </label>
            </div>
            </div>

            <!-- Button (Double) -->
            <div class="control-group">
            <label class="control-label" for="button1id">Posalji vest</label>
            <div class="controls">
                <button id="button1id" name="button1id" class="btn btn-success" @click="sendValue">Postavi</button>
            </div>
            </div>

            </fieldset>
        </div>
    </div>
    
</div>
</template>
<script>
import { EventBus } from '../main.js';
export default {
    name: 'News',
    data() {
        return {
            newNews: {
                header: "",
                content: "",
                type: null
            },
            news: null,
            userDataStorage: null,
            userData: null,
            adminFormIsDisplayed: false

            
        }
    },

    created(){
        axios.get('http://localhost:3000/news')
        .then(response => (this.news = response.data.data))
        .then(response => console.log(response))
        
    },
    mounted(){
        this.checkUser()
       
    },
    methods: {
        sendValue(){
            axios.post('http://localhost:3000/addNews',{
                header: this.newNews.header,
                content: this.newNews.content,
                type: this.newNews.type
            }).then(response => {
                console.log("Uspesno ste dodali vest")
                console.log(this.newNews);
            })
        },
        checkUser(){
            EventBus.$on('send-data', data =>{
            this.userData = data
            })
            this.userDataStorage = JSON.parse(localStorage.getItem('user'))
            if(this.userDataStorage.us_level == 1){
               this.adminFormIsDisplayed = true
           }
        }
    },
}
</script>
<style scoped>
</style>
