import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object ({
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
      })
    }),
    contentJson: defineCollection({
      type: 'page',
      source: '**/*.json',
      schema: z.object ({
        name: z.string(),
        description: z.string(),
        url: z.string().url(),
        avatar: z.string(),
        subtitle: z.string(),
      })
    })
  }
})
