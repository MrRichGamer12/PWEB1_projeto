<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

// ⚠️ Substitui pela tua própria API key do Freesound
const FREESOUND_API_KEY = import.meta.env.VITE_FREESOUND_API_KEY
console.log(import.meta.env.VITE_FREESOUND_API_KEY)

const tracks = ref([])
const currentTrackIndex = ref(0)
const audio = ref(null)
const isPlaying = ref(false)
const ready = ref(false)
const loading = ref(false)

// track atual
const currentTrack = computed(() => tracks.value[currentTrackIndex.value] || {})

// 🔎 log sempre que muda de música
watch(currentTrackIndex, (i) => {
  ready.value = false
})

// carregar metadados
const onLoadedMetadata = () => {
  ready.value = true
}

const onCanPlay = () => {
  console.log('▶️ canplay')
}

const onError = () => {
  console.error('❌ erro no audio element')
  console.log(audio.value.error)
}

// funções de reprodução
const play = async () => {
  if (!audio.value) return
  try {
    await audio.value.play()
    isPlaying.value = true
  } catch (e) {
    console.error('🚫 play bloqueado:', e)
  }
}

const pause = () => {
  if (!audio.value) return
  audio.value.pause()
  isPlaying.value = false
}

const togglePlay = () => {
  isPlaying.value ? pause() : play()
}

const nextTrack = () => {
  pause()
  currentTrackIndex.value =
    (currentTrackIndex.value + 1) % tracks.value.length
}

// 🔎 buscar tracks do Freesound
const fetchTracks = async (query = 'nature') => {
  loading.value = true
  try {
    const response = await axios.get('https://freesound.org/apiv2/search/text/', {
      params: {
        query,
        fields: 'id,name,previews,download',
        token: FREESOUND_API_KEY,
        page_size: 10
      }
    })

    // a API retorna 'results' com info das tracks
    tracks.value = response.data.results.map(track => ({
      id: track.id,
      title: track.name,
      url: track.previews['preview-hq-mp3'] // usamos preview para tocar diretamente
      // se quiseres usar download real, precisas de autenticar com token OAuth
    }))

    currentTrackIndex.value = 0
  } catch (e) {
    console.error('Erro ao buscar tracks do Freesound:', e)
  } finally {
    loading.value = false
  }
}

// carregar tracks ao iniciar
onMounted(() => {
  fetchTracks()
})
</script>

<template>
  <div class="player">
    <p v-if="currentTrack.title">{{ currentTrack.title }}</p>
    <p v-else>Carregando tracks...</p>

    <button @click="togglePlay" :disabled="!currentTrack.url || loading">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>

    <button @click="nextTrack" :disabled="!currentTrack.url || loading">
      Next
    </button>

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
  width: 97.9%;
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
