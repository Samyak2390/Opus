<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      color: '', // dynamic
      mode: '',
      snackbar: false, // dynamic
      text: '', // dynamic
      timeout: 0,
      x: null,
      y: 'top'
    }
  },
  computed: {
    ...mapGetters({ snackbarSettings: 'snackbarSettings' })
  },
  mounted() {
    this.color = this.snackbarSettings.color
    this.snackbar = this.snackbarSettings.show
    this.text = this.snackbarSettings.text
  }

}
</script>
