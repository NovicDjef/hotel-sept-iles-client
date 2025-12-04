/**
 * Simple in-memory cache for API responses
 * Provides instant response for repeated requests
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class ApiCache {
  private cache: Map<string, CacheEntry<any>> = new Map()

  /**
   * Get cached data or execute fetch function
   * @param key Unique cache key
   * @param fetchFn Function to fetch data if cache miss
   * @param ttl Time to live in milliseconds (default: 5 minutes)
   */
  async get<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 5 * 60 * 1000
  ): Promise<T> {
    const now = Date.now()
    const cached = this.cache.get(key)

    // Return cached data if valid
    if (cached && (now - cached.timestamp) < cached.ttl) {
      console.log(`✅ Cache HIT: ${key}`)
      return cached.data
    }

    // Fetch fresh data
    console.log(`⚠️ Cache MISS: ${key}`)
    try {
      const data = await fetchFn()

      // Store in cache
      this.cache.set(key, {
        data,
        timestamp: now,
        ttl
      })

      return data
    } catch (error) {
      // If fetch fails and we have stale cache, return it
      if (cached) {
        console.log(`⚠️ Using stale cache for: ${key}`)
        return cached.data
      }
      throw error
    }
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string): void {
    this.cache.delete(key)
    console.log(`🗑️ Cache invalidated: ${key}`)
  }

  /**
   * Invalidate all cache entries matching a pattern
   */
  invalidatePattern(pattern: string): void {
    const keys = Array.from(this.cache.keys())
    keys.forEach(key => {
      if (key.includes(pattern)) {
        this.cache.delete(key)
        console.log(`🗑️ Cache invalidated: ${key}`)
      }
    })
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear()
    console.log('🗑️ Cache cleared')
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now()
    const keys = Array.from(this.cache.keys())

    keys.forEach(key => {
      const entry = this.cache.get(key)
      if (entry && (now - entry.timestamp) >= entry.ttl) {
        this.cache.delete(key)
      }
    })
  }
}

// Singleton instance
export const apiCache = new ApiCache()

// Auto cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    apiCache.cleanup()
  }, 10 * 60 * 1000)
}
