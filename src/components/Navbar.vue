<template>
    <div class="container" id="nav_container">
      <nav class="navbar navbar-expand-md">
			<router-link class="navbar-brand" :to="{ name: 'Home' }">Moje pivo</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
	<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<router-link :to="{ name: 'News' }" class="nav-link">Vesti</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{ name: 'Articles' }" class="nav-link">Pivo</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{ name: 'Breweries' }" class="nav-link">Pivnice</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{ name: 'Events' }" class="nav-link">Dogadjaji</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{ name: 'Comments' }" class="nav-link">Komentari</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{ name: 'About'}" class="nav-link">O nama</router-link>
						</li>
					</ul>			
	</div>
		
					<ul class="navbar-nav topnav-right">
						<li class="nav-item">
							<a class="nav-link" href="#" v-show="regBtn" @click="showReg">Registracija</a>
						</li>
						<li class="nav-item" topnav-right>
							<a class="nav-link" href="#" v-show="loginBtn" @click="showLog">Uloguj se</a>
						</li>
						<li class="nav-item" topnav-right>
							<a class="nav-link" href="#" v-show="logOutBtn" @click="logOut">Izloguj se</a>
						</li>
					</ul>
					
        </nav>
	<div class="text-center border border-light p-5" action="#!" v-if="isRegFormDisplayed">
            	<p class="h4 mb-4">Registracija</p>
				<small id="emailHelp" class="form-text text-muted" v-if="this.username.length < 4">Ime korisnika mora imati najmanje 4 karaktera</small>
				<input class="form-control mb-4" :style="setStyleName" v-model="username" type="text" placeholder="Username...">
				<small id="emailHelp" class="form-text text-muted" v-if="this.password.length < 4">Sifra mora imati najmanje 4 karaktera</small>
            	<input class="form-control mb-4" :style="setStylePassword" v-model="password" type="password" placeholder="Password...">
    
				<button class="btn btn-light" @click="registration" :disabled="!isFormValid">Registruj se</button>
            	<button class="izadji btn btn-light" @click="isRegFormDisplayed=false">Izadji</button>
	</div>
    <div class="text-center border border-light p-5" v-if="isLoginFormDisplayed">
			<p class="h4 mb-4">Uloguj se</p>
            <input class="form-control mb-4" :style="setStyleName" v-model="username" type="text" placeholder="Username...">
            <input class="form-control mb-4" :style="setStylePassword" v-model="password" type="password" placeholder="Password...">
            <button class="btn btn-light" @click="logIn">Uloguj se</button>
            <button class="btn btn-light" @click="isLoginFormDisplayed=false">Izadji</button>
    </div>
    </div>
    
</template>


<script>
import Vue from '../App';
import { EventBus } from '../main.js';
export default {
	name: 'Navbar',
	props: [],
    data() {
     return { 
            isRegFormDisplayed: false,
		    isLoginFormDisplayed: false,
			username: "", 
			password: "",
			logedIn: false,
			loginBtn: true,
			regBtn:true,
			logOutBtn: false,
			data: null,
			userData: null
	 }
	 
	},
	mounted(){
		 this.checkUser()
	 },
    methods: {
        showLog(){
            this.isLoginFormDisplayed = !this.isLoginFormDisplayed
            this.isRegFormDisplayed = false
        },
        showReg(){
            this.isRegFormDisplayed = !this.isRegFormDisplayed
            this.isLoginFormDisplayed = false
		},
		logIn(){
			 axios.post('http://localhost:3000/login',{
			 
			 username: this.username,
			 password: this.password
			 }
			)
			.then(response => {
				if(response.data.us_level == 1){
					localStorage.setItem('user', JSON.stringify(response.data))
					this.data = JSON.parse(localStorage.getItem('user'))
					if(this.data === Object)
					this.logedIn = true
					this.loginBtn = false
					this.regBtn = false
					this.logOutBtn = true
					this.isLoginFormDisplayed = false
					this.$router.replace("/#")
					EventBus.$emit('send-data', this.data)
					alert("Dobrodosao admine")
					
					
					
				} else if (response.data.us_level == 2){
					localStorage.setItem('user', JSON.stringify(response.data))
					this.data = JSON.parse(localStorage.getItem('user'))
					if(this.data === Object)
					this.logedIn = true
					this.loginBtn = false
					this.regBtn = false
					this.logOutBtn = true
					this.isLoginFormDisplayed = false
					this.$router.replace("/#")
					EventBus.$emit('send-data', this.data)
				
				} else {
					alert("Pogresno uneti podaci")
				}
			})
			 
			 
 },

 

 registration(){
		axios.post('http://localhost:3000/register',{
		 username: this.username,
		 password: this.password 
	 }).then(response => {
		alert("Cestitamo, uspesno ste se registrovali")
	 })
	
		},


	logOut(){
	 localStorage.removeItem('user')
	 localStorage.clear()
	  this.loginBtn = true
	  this.regBtn = true
	  this.logOutBtn = false
	  this.$router.replace("/#")
 },
	checkUser(){
		this.userData = JSON.parse(localStorage.getItem('user'))
		console.log(this.userData);
		if(this.userData.hasOwnProperty('us_id')){
			this.loginBtn = false
			this.regBtn = false
			this.logOutBtn = true
		}
	}

 	
	},
	computed: {
		isFormValid(){
			return this.username.length >= 4 
			&& this.password.length >= 4
		},
		
			setStyleName() {
				return this.username.length < 4 ? '' : 'background-color: #c5d5cb;'
	  },
	  		setStylePassword(){
		  		return this.password.length < 4 ? '' : 'background-color: #c5d5cb;'
	  },
	  

	},
}
</script>

<style scoped>
li {
    margin-left: 5px;
}


.regBtn {
	margin: 70px 0 0 0px;
	display: grid;
	
}

input {
	border: 1px solid black;
	border-radius: 1px;
}

nav {
	background-color: #5D5C61;
	
}
a { color: #ffffff; }

#nav_container {
	opacity: 0.9;
	position: sticky;
	top: 0;
	z-index: 9999;
}
</style>