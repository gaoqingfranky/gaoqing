<template>
    <router-view></router-view>
</template>

<style>
  html,body{
    width:100%;
    height: 100%;
    margin:0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin:0;
    width:100%;
    height: 100%;
  }
  .header {
    width: 100%;
    margin-bottom: 15px;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    background-color: white;
  }
</style>
