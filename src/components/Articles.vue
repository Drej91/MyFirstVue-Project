<template>
  <div id="beers">
      <div class="container">
            <div class="row container" style="margin-left:0; margin-right:0;">
            <div class="card col-md-4" v-for="(article, art_id) in articles" :key="art_id">
            <img class="card-img-bottom" style="width: 18rem;" :src="article.art_picture" alt="Slika piva">
            <div class="card-body"> 
              <ul>
              <li><h5 class="card-title">{{ article.art_name }}</h5></li>
              <li><p class="percent">Procenat alkohola: {{ article.art_percent  }}</p></li>
              <li><h6 class="card-subtitle mb-2 text-muted">Vrsta: {{ article.art_sort }}</h6></li>
              </ul>
              <p class="card-text text">{{ article.art_about }}</p>
              <p class="price text-center" v-show="seePrice">{{ article.art_price }} rsd</p>
              </div>
            </div>
        </div> 

        <div class="form-horizontal" v-show="showAdminForm">
<fieldset>

<!-- Form Name -->
<legend>Dodavanje piva</legend>

<!-- Text input-->
<div class="control-group">
  <label class="control-label" for="textinput">Ime piva</label>
  <div class="controls">
    <input id="textinput" name="textinput" type="text" placeholder="Ime" class="input-xlarge" v-model="newBeer.name">
  </div>
</div>

<div class="control-group">
  <label class="control-label" for="selectbasic">Izabrati proizvodjaca</label>
  <div class="controls">
    <select id="selectbasic" name="selectbasic" class="input-xlarge" v-model="newBeer.proName">
      <option v-for="(producer, pro_id) in producers" :key="pro_id">{{ producer.pro_name }}</option>
      </select>
  </div>
</div>

<!-- Text input-->
<div class="control-group">
  <label class="control-label" for="textinput">Procenat alkohola</label>
  <div class="controls">
    <input id="textinput" name="textinput" type="text" placeholder="Primer 5,0%" class="input-xlarge" v-model="newBeer.percent">
    
  </div>
</div>

<!-- Select Basic -->
<div class="control-group">
  <label class="control-label" for="selectbasic">Izaberi vrstu</label>
  <div class="controls">
    <select id="selectbasic" name="selectbasic" class="input-xlarge" v-model="newBeer.sort">
      <option>Lager</option>
      <option>Ale</option>
      <option>American Pale Ale</option>
      <option>Belgian Ale</option>
      <option>Ipa</option>
      <option>American White Ale</option>
      <option>Pale Ale</option>
    </select>
  </div>
</div>

<!-- Text input-->
<div class="control-group">
  <label class="control-label" for="textinput">Unesi cenu</label>
  <div class="controls">
    <input id="textinput" name="textinput" type="text" placeholder="Cena" class="input-xlarge" v-model="newBeer.price">
    
  </div>
</div>

<!-- Textarea -->
<div class="control-group">
  <label class="control-label" for="textarea">Opis piva</label>
  <div class="controls">                     
    <textarea id="textarea" name="textarea" v-model="newBeer.about">...</textarea>
  </div>
</div>

<!-- Button (Double) -->
<div class="control-group">
  <label class="control-label" for="button1id">Potvrdi</label>
  <div class="controls">
    <button id="button1id" name="button1id" class="btn btn-success" @click="sendNewBeer">Postavi</button>
    <button id="button2id" name="button2id" class="btn btn-danger" @click="quit">Izbrisi</button>
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
name: 'Articles',
    data(){
        return {
            articles: [],
            newBeer: {
              name: "",
              proName: "",
              percent: "",
              sort: "",
              price: 0,
              about: ""
            },
            userData: null,
            userStorageData: null,
            showAdminForm: false,
            seePrice: false,
            producers: []
        }
    },

     created(){
         axios.get('http://localhost:3000/articles')
         .then(response => {
         this.articles = response.data.data
         console.log(this.articles)
         })

         axios.get('http://localhost:3000/producers')
         .then(response => {
         this.producers = response.data.data
         console.log(this.producers)
         })
    },
    mounted(){
      this.checkUser()
    },

    methods: {
      sendNewBeer(){
        axios.post('http://localhost:3000/addBeer',{
          name: this.newBeer.name,
          proName: this.newBeer.proName,
          sort: this.newBeer.sort,
          percent: this.newBeer.percent,
          price: this.newBeer.price,
          about: this.newBeer.about
        }).then(response => {
          console.log("Uspesno ste dodali novo pivo")
        })
      },
      
      quit(){
          
          this.newBeer.name = ""
          this.newBeer.proName = ""
          this.newBeer.percent = ""
          this.newBeer.sort = ""
          this.newBeer.price = 0
          this.newBeer.about = ""
        
    },
      checkUser(){
        this.userStorageData = JSON.parse(localStorage.getItem('user'))
        console.log(this.userStorageData)
          if(this.userStorageData.us_level == 1){
            this.showAdminForm = true
            this.seePrice = true
          }else if(this.userStorageData.us_level == 2){
            this.seePrice = true
          }
          
      },
      },
      // watch: {
      //   userData(){
      //     if(this.userData.us_level == 1){
      //       this.showAdminForm = true
      //       this.seePrice = true
      //     }
      //     if(this.userData.us_level == 2){
      //       this.seePrice = true
      //     }
      //   }
      // }
       
}
</script>

<style scoped>
 
    .beer {
        border: 1px solid gray;
    }

    p.price {
        color: blue;
        font-size: 26px;
    }

    .text {
        background-color: #5D5C61;
        border-radius: 8px;
        padding: 3px;
    }

    p.text {
        color: white;
        text-align: justify;
    }
    ul{
      list-style-type:none;
    }

</style>