<template>
    <div id="brewery">
            <div class="container">
             <div class="card" v-for="(brewery, index) in breweries" :key="index">
             <div>
                <h1 class="card-title">
                    {{ brewery.bre_name }}
                </h1>
                <p class="card-text">Adresa: {{ brewery.bre_lokacija }}</p>
                <p class="card-text">Kontakt: {{ brewery.bre_contact }}</p>
                <p class="card-text">Email: {{ brewery.bre_email }}</p>
                <p class="card-text">Web: <a v-bind:href="brewery.bre_web">{{ brewery.bre_name }}</a></p>
            </div>
            </div>
            </div>
    </div>
</template>
<script>
export default {
    name: 'Pivnice',
    data() {
        return {
            breweries: {}
        }
    },
     created(){
      axios
          .get('http://localhost:3000/brewery')
		  .then(response => (this.breweries = response.data.data))
  }
}
</script>
<style scoped>
    
    li {
        list-style: none;
    }

    .divPivnice {
        width: 100%;
        height: 300px;
        background-color: #7395AE;
        border: 1px solid gray;
    }
   
</style>