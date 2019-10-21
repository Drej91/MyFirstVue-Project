<template>
  <div id="app">
    <Navbar/>
      <router-view>
    </router-view>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import News from './components/News'
import About from './components/About'
import Breweries from './components/Pivnice'
import Articles from './components/Articles'
import Home from './components/Home'
import Events from './components/Events'
import Comments from './components/Comments'
import { EventBus } from './main.js';

export default {
 components: {
     Navbar,
     News, 
     About,
     Breweries,
     Articles,
     Home,
     Events,
     Footer

 },
 data(){
   return {
      userData: {}
    }
 
   
   },
   mounted(){
     EventBus.$on('send-data', data =>{
       this.userData = data
       console.log(this.userData)
     })
   }

   
     
   }
   
   
 
  

</script>

<style>
  body{
    font-family: 'Roboto', sans-serif;
  }
</style>
