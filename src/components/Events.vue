<template>
    <div class="container">
    
    <div class="card" v-for="(event, new_id) in events" :key="new_id">
             <div class="card-header">{{ event.new_header }}</div>
            <div class="card-body">{{ event.new_content }}</div>
    </div>  


    </div>
</template>

<script>
    export default {
        data() {
            name: 'Event';
            return {
                events: null
            }
        },
       
            created(){
                axios.get('http://localhost:3000/events')
                .then(response => (this.events = response.data.data))
                .then(response => console.log(response))
        }
    }
    
</script>

<style scoped>


</style>