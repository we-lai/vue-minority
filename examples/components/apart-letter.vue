<template>
  <div class="apartLetterInput">
    <mino-apart-letter :maxlength="4" :autofocus="true"></mino-apart-letter>
  </div>
</template>

<script>
import ApartLetter from '../../src/apart-letter/src/apart-letter.vue'
export default {
  components: {
    [ApartLetter.name]: ApartLetter
  }
}
</script>

<style lang="scss">
.apartLetterInput {
  
}
</style>
