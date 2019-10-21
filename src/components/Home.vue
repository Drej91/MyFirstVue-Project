<template>
  <div class="home">
      <div class="container">
          <div class="jumbotron jumbotron-fluid" style="margin-bottom: 0px;">
          <h1 class="text-center display-4">{{ title }}</h1>
          <br>
          <blockquote class="blockquote text-center">
             <p class="mb-0" style="padding: 10px 70px;">{{ quote }}</p>
             <br>
              <footer class="blockquote-footer">Duško Radović</footer>
            </blockquote>
          </div>
           
          <div class="slika">
          <img src="../assets/pictures/mainPageBeer.jpg" class="img-fluid rounded" alt="Responsive image">
          </div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
          <h1 class="display-4 text-center">Pivo</h1>
        <p class="lead text-center">Pivo se, kao što već dobro znamo, u osnovi sastoji od 4 sastojka, a to su: slad, voda, kvasac i hmelj. Hmelj je svoje zasluženo bitno mesto dobio tek krajem 16. veka, kada je zamenio Gruit (biljne mešavine) kao primarni konzervans piva, odnosno, sličnih fermentisanih pića.
                        Ali osim toga što je pomagao pivu da duže traje, ulja koja sadrži hmelj pivu su davala aromatičnost i gorčinu koje su brzo prisvojene i prihvaćene kao kvalitativni pivski standard. Od tada do danas, stigli smo do neverovatnog broja od preko 140 novih sorti hmelja, od kojih svaka ima specifične karakteristike na poljima arome i ukusa. I što je najbolje, svake godine se razvijaju nove. Danas je upravo pivarstvo, posebno zanatsko, u značajnoj meri oslonjeno na ova istraživanja. Zahvaljujući otvorenosti krafta, nove sorte se brzo “infiltriraju” u nove recepture.
                        Ali, da ne bismo previše komplikovali stvari, podelu ćemo grupisati po regionima, u najširem mogućem smislu.</p>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
name: "Home",
    data(){
        return{
            title: "Stranica posvećena svim ljubiteljima piva",
            quote: '"Nije teško biti toliko nesrećan da bi čovek počeo da pije. Ljude treba odvikavati od nesreće, a ne od alkohola. Nesreća je veći porok."'
        }
    }
}
</script>

<style scoped>
  img {
      margin-top: 0px;
      opacity: 0.8;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
  }
</style>