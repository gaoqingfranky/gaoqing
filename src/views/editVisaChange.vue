<template>
  <visaFrame :parentMsgObject="parentObj"></visaFrame>
</template>

<script>
  import visaFrame from '../components/visaFrame'

  export default {
    name: "editVisaChange",
    components: {visaFrame},
    data() {
      return {
        parentObj: {}
      }
    },
    created: function () {
      this.parentObj.type = this.$route.params.type;
      this.parentObj.visaChangeId = this.$route.params.visaChangeId;
    },
  }
</script>

<style scoped>

</style>
