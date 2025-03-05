import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object ({
        title: z.string(),
        description: z.string(),
        //body: z.string(),
        mino: z.string(),
      })
    }),
    contentJson: defineCollection({
      type: 'page',
      source: '**/*.json',
      schema: z.object ({
        name: z.string()
      })
    })
  }
})
