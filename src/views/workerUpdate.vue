<template>
  <workerFrame :frameType="fType"></workerFrame>
</template>

<script>
  import workerFrame from '../components/workerFrame'
    export default {
        name: "workerUpdate",
      components:{workerFrame},
      data(){
        return{
          fType:{
            type:'1',
            rowForm:[]
          },
        }
      },
      created:function () {
        this.fType.rowForm=JSON.parse(this.$route.params.row);
      }
    }
</script>

<style scoped>

</style>
