<template>
  <div class="apartLetterInput">
    <mino-apart-letter :maxlength="4" :autofocus="true"></mino-apart-letter>
  </div>
</template>

<script>
import ApartLetter from '../../src/apart-letter/src/apart-letter.vue'
console.log(ApartLetter.name)
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
