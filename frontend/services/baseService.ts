import axios from 'axios'
import type { AxiosInstance } from 'axios'

export abstract class BaseService {
  protected api: AxiosInstance
  protected controller: AbortController | null = null
  protected cache: Map<string, { data: any; timestamp: number }>
  protected readonly cacheDuration = 5 * 60 * 1000 // 5 minutes
  protected readonly maxCacheSize = 100 // Limite de taille du cache
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor(baseURL: string = 'http://localhost:3001/api') {
    this.api = axios.create({
      baseURL,
      timeout: 10000
    })
    this.cache = new Map()
    
    if (typeof window !== 'undefined') {
      this.startCacheCleanup()
    }
  }

  protected abortPreviousRequest() {
    if (this.controller) {
      this.controller.abort()
    }
    this.controller = new AbortController()
  }

  public cleanupOnUnmount() {
    this.abortPreviousRequest()
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.cache.clear()
  }

  private startCacheCleanup() {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now()
      Array.from(this.cache).forEach(([key, value]) => {
        if (now - value.timestamp > this.cacheDuration) {
          this.cache.delete(key)
        }
      })
    }, this.cacheDuration)
  }

  protected setCacheItem(key: string, data: any) {
    if (this.cache.size >= this.maxCacheSize) {
      const oldestKey = Array.from(this.cache.keys())[0]
      this.cache.delete(oldestKey)
    }
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  protected getCacheItem(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() - item.timestamp > this.cacheDuration) {
      this.cache.delete(key)
      return null
    }
    return item.data
  }
}