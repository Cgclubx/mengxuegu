<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body,#app{ 
  height: 100%;

}

/*alert 成功弹出框样式*/
.el-message--success {
  top: 80px !important;
}
 
.el-message .el-icon-success {
  font-size: 18px;
}
 
.el-message--success .el-message__content {
  font-size: 18px;
  // font-weight: 700;
}

</style>
