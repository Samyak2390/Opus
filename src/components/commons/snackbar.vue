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
      <v-btn dark text @click="_=>revert()">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: '',
      mode: '',
      snackbar: false,
      text: '',
      timeout: 3500,
      x: null,
      y: 'top'
    }
  },
  created() {
    this.$store.watch(_ => this.$store.getters['snackbarSettings'], value => {
      this.color = value.color
      this.text = value.text
      this.snackbar = value.show
    })
  },
  methods: {
    revert() {
      this.snackbar = false
      this.text = ''
      this.color = ''
    }
  }

}
</script>
