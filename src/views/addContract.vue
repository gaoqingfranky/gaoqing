<template>
  <contract-frame :parentMsgObject="parentObj"></contract-frame>
</template>
<script>
  import contractFrame from '../components/contractFrame'
  export default {
    name: "addContract",
    components: {contractFrame},
    data() {
      return {
        parentObj: {
          type: 3,
          contractId: ''
        }
      }
    },
  }
</script>

<style scoped>

</style>
