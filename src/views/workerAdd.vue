<template>
  <workerFrame :frameType="fType"></workerFrame>
</template>
<script>
  import workerFrame from '../components/workerFrame'
    export default {
        name: "workerAdd",
      components:{workerFrame},
      data(){
        return{
          fType:{
            type:'0',
            rowForm:[]
          }
        }
      }
    }
</script>

<style scoped>

</style>
