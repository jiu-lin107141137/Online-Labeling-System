<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Ref } from 'vue'

const code: Ref<string> = ref('')
const w: Ref<number> = ref(210),
  h: Ref<number> = ref(100)
const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const computedCanvase = computed(() => canvas.value)
const ctx: Ref<CanvasRenderingContext2D | null | undefined> = ref(null)

const emit = defineEmits<{
  (e: 'verificationCodeChange', value: string): void
}>()
defineExpose({ canvas })

watch(code, (newV: string) => {
  emit('verificationCodeChange', newV)
})

onMounted(() => {
  ctx.value = computedCanvase.value?.getContext('2d')
  generateCode()
})

const generateCode = () => {
  if (!ctx.value) return
  code.value = ''
  let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  // generate verification code
  for (let i = 0; i < 4; i++) code.value += chars.charAt(randomInt(0, chars.length))
  // draw background
  ctx.value.fillStyle =
    'rgb(' + randomInt(0, 127) + ', ' + randomInt(0, 127) + ', ' + randomInt(0, 127) + ')'
  ctx.value.fillRect(0, 0, w.value, h.value)
  // draw lines
  for (let i = 0; i < 10; i++) {
    ctx.value.strokeStyle =
      'rgb(' + randomInt(127, 255) + ', ' + randomInt(127, 255) + ', ' + randomInt(127, 255) + ')'
    ctx.value.beginPath()
    ctx.value.moveTo(randomInt(0, 200), randomInt(0, 100))
    ctx.value.lineTo(randomInt(0, 200), randomInt(0, 100))
    ctx.value.stroke()
  }
  // draw points
  for (let i = 0; i < 100; i++) {
    ctx.value.fillStyle =
      'rgb(' + randomInt(127, 255) + ', ' + randomInt(127, 255) + ', ' + randomInt(127, 255) + ')'
    ctx.value.beginPath()
    ctx.value.arc(randomInt(0, 200), randomInt(0, 100), 1, 0, 2 * Math.PI)
    ctx.value.fill()
  }
  // draw verification code
  for (let i = 0; i < 4; i++) {
    ctx.value.save()
    ctx.value.translate(i * 50 + 25, randomInt(50, 80))
    ctx.value.rotate((randomInt(-60, 60) * Math.PI) / 180.0)
    ctx.value.font = randomInt(38, 45) + 'px Arial'
    ctx.value.fillStyle =
      'rgb(' + randomInt(127, 255) + ', ' + randomInt(127, 255) + ', ' + randomInt(127, 255) + ')'
    ctx.value.fillText(code.value.charAt(i), 0, 0)
    ctx.value.restore()
    // setTimeout(() => {
    // }, 100);
  }
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
</script>

<template>
  <div class="canvas-container">
    <canvas
      id="graph-validation-canvas"
      width="210"
      height="100"
      ref="canvas"
      @click="generateCode()"
    >
    </canvas>
  </div>
</template>

<style lang="scss" scoped>
.canvas-container {
  margin-top: 1rem;
  padding: 0 1rem;
  width: 100%;
}
</style>
