<template>
  <visaFrame :parentMsgObject="parentObj"></visaFrame>
</template>

<script>
  import visaFrame from '../components/visaFrame'
  export default {
    name: "addVisaChange",
    components: {visaFrame},
    data() {
      return {
        parentObj: {
          type: 3,
          visaChangeId: ''
        },
      }
    },
  }
</script>

<style scoped>

</style>
