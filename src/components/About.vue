<template>
    <div>
 <div class="card card-cascade wider reverse container">

  <!-- Card image -->
  <div class="view view-cascade overlay">
    <img class="card-img-top" src="../assets/pictures/about.png" alt="Card image cap">
    <a href="#!">
      <div class="mask rgba-white-slight"></div>
    </a>
  </div>

  <!-- Card content -->
  <div class="card-body card-body-cascade text-center">

    <!-- Title -->
    <h4 class="card-title"><strong>Moje pivo</strong></h4>
    <!-- Subtitle -->
    <h6 class="font-weight-bold indigo-text py-2">Saznajte vise o nama</h6>
    <!-- Text -->
    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem perspiciatis voluptatum a, quo nobis, non commodi quia repellendus sequi nulla voluptatem dicta reprehenderit, placeat laborum ut beatae ullam suscipit veniam.
    </p>

    <p>Adresa: "Pere Perica 14"</p>
    <p>Broj telefona: 060/660-4759</p>
    <p>Email: mojepivo@gmail.com</p>

   

  </div>

    </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data(){
        return {

        }
    }
}
</script>

<style scoped>
    .container{
        height: 800px;
        width: 70%;
    }
</style>