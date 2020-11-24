<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<script>
import navs from '../nav'
export default {
 name : "", 
 data(){
  return {
  }
 },
 components : {
     navs
 },
}
</script>


<style scoped>
    .main{
        padding : 10px;
    }
    
</style>