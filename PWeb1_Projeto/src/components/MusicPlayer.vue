<script setup>
import { ref, computed, watch } from 'vue'

const tracks = [
  {
    title: 'SoundHelix Song 1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    title: 'SoundHelix Song 2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    title: 'SoundHelix Song 3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    title: 'SoundHelix Song 4',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    title: 'SoundHelix Song 5',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  }
]


const currentTrackIndex = ref(0)
const audio = ref(null)
const isPlaying = ref(false)
const ready = ref(false)

const currentTrack = computed(() => tracks[currentTrackIndex.value])

// 🔎 Log sempre que muda de música
watch(currentTrackIndex, (i) => {
  console.log('🔁 Mudou de track:', tracks[i].title)
  ready.value = false
})

const onLoadedMetadata = () => {
  console.log('✅ loadedmetadata')
  console.log('⏱️ duração:', audio.value.duration)
  ready.value = true
}

const onCanPlay = () => {
  console.log('▶️ canplay')
}

const onError = () => {
  console.error('❌ erro no audio element')
  console.log(audio.value.error)
}

const play = async () => {
  console.log('🟢 clique em PLAY')

  if (!audio.value) {
    console.warn('⚠️ audio ref é null')
    return
  }

  console.log('📦 ready:', ready.value)
  console.log('📡 networkState:', audio.value.networkState)
  console.log('📡 readyState:', audio.value.readyState)

  try {
    await audio.value.play()
    console.log('🎶 play() executado')
    isPlaying.value = true
  } catch (e) {
    console.error('🚫 play bloqueado:', e)
  }
}

const pause = () => {
  console.log('⏸️ pause')
  audio.value.pause()
  isPlaying.value = false
}

const togglePlay = () => {
  isPlaying.value ? pause() : play()
}

const nextTrack = () => {
  console.log('⏭️ next track')
  pause()
  currentTrackIndex.value =
    (currentTrackIndex.value + 1) % tracks.length
}
</script>



<template>
  <div class="player">
    <p>{{ currentTrack.title }}</p>

    <button @click="togglePlay">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>

    <button @click="nextTrack">Next</button>

    <audio
      ref="audio"
      :src="currentTrack.url"
      preload="metadata"
      @loadedmetadata="onLoadedMetadata"
      @canplay="onCanPlay"
      @error="onError"
      @play="console.log('▶️ evento play')"
      @pause="console.log('⏸️ evento pause')"
      @ended="nextTrack"
      controls
    />
  </div>
</template>





<style scoped>
.player {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #1e1e1e;
  color: white;
}

button {
  background: #1db954;
  border: none;
  color: black;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
