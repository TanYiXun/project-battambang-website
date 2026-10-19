import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Project Battambang Studio',

  projectId: 'zebgjkan',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: 'https://project-battambang-website.yixun.workers.dev',
      resolve: {
        mainDocuments: [
          {
            route: '/',
            filter: `_type == "page" && slug.current == "home"`,
          },
          {
            route: '/index.html',
            filter: `_type == "page" && slug.current == "home"`,
          },
          {
            route: '/meet-the-team.html',
            filter: `_type == "page" && slug.current == "team"`,
          },
          {
            route: '/support-services.html',
            filter: `_type == "page" && slug.current == "support"`,
          },
          {
            route: '/education-outreach.html',
            filter: `_type == "page" && slug.current == "education"`,
          },
          {
            route: '/development.html',
            filter: `_type == "page" && slug.current == "development"`,
          },
          {
            route: '/post-trip-reports.html',
            filter: `_type == "page" && slug.current == "reports"`,
          },
          {
            route: '/get-involved.html',
            filter: `_type == "page" && slug.current == "get-involved"`,
          },
          {
            route: '/services-4.html',
            filter: `_type == "page" && slug.current == "donation"`,
          },
        ]
      }
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
