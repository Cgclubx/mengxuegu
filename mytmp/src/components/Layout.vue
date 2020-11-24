<template>
 <div>
     <!-- 头部 -->
    <Header></Header>
     <!-- 侧边栏 -->
    <Navbar></Navbar>
     <!-- 右侧主体内容 -->
     <Main></Main>
 </div>
</template>

<script>
import Header from "./Header"
import Navbar from "./Navbar"
import Main from "./Main"
export default {
 name : "", 
 data(){
  return {
  }
 },
 components : {
   Header,
Navbar,
Main
 },
}
</script>


<style scoped>
    .header{
        height: 50px;
        line-height: 50px;
        background-color: #2d3a4b;
        position : absolute;
        left: 0;
        right: 0;
    }
    .navBar{
        width : 230px;
        background-color: #545c64;
        position : absolute;
        top : 50px;
        bottom : 0;
        left: 0;
    }
    .main{
        position : absolute;
        left: 230px;
        top : 50px;
        bottom : 0;
        right : 0;
        background-color: #fff;
        overflow-y: auto;
    }
</style>
