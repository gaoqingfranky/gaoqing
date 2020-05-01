<template>
  <contractFrame :parentMsgObject="parentObj"></contractFrame>
</template>

<script>
  import contractFrame from '../components/contractFrame'
    export default {
        name: "editContract",
      components: { contractFrame },
      data(){
        return{
          parentObj:{}
        }
      },
      created: function () {

        this.parentObj.type=this.$route.params.type;
        this.parentObj.contractId=this.$route.params.contractId;

      },
    }
</script>

<style scoped>

</style>
