import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'

// MOCK DO ROUTER
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('App', () => {
  it('mounts renders properly', async () => {
    const pinia = createPinia()

    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router],
      },
    })

    await router.isReady()

    expect(wrapper.exists()).toBe(true)
  })
})
