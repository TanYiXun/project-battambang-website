// Sanity Studio Modular Page Builder Schema for Project Battambang
export default {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL identifier e.g. home, team, support)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'introText',
      title: 'Page Intro Text',
      type: 'text',
    },
    {
      name: 'sections',
      title: 'Page Sections (Drag and drop to reorder sections)',
      type: 'array',
      of: [
        // Hero Section Block
        {
          type: 'object',
          name: 'heroBlock',
          title: 'Hero Banner Section',
          fields: [
            { name: 'title', title: 'Main Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle / Tagline', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'buttonText', title: 'Button Text', type: 'string' },
            { name: 'heroImage', title: 'Background / Hero Image', type: 'image' },
          ],
        },

        // Roots Story Block
        {
          type: 'object',
          name: 'rootsBlock',
          title: 'Our Roots Story Section',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'story', title: 'Story Content', type: 'text' },
          ],
        },

        // Vision & Mission Block
        {
          type: 'object',
          name: 'visionMissionBlock',
          title: 'Vision & Mission Section',
          fields: [
            { name: 'vision', title: 'Vision Statement', type: 'text' },
            { name: 'mission', title: 'Mission Statement', type: 'text' },
          ],
        },

        // Core Values Block
        {
          type: 'object',
          name: 'valuesBlock',
          title: 'Core Values Section',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            {
              name: 'items',
              title: 'Values List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Value Name', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },

        // Screening Statistics Banner Block
        {
          type: 'object',
          name: 'statsBannerBlock',
          title: 'Screening Statistics Banner',
          fields: [
            { name: 'title', title: 'Banner Title (e.g. SCREENING STATISTICS 2024)', type: 'string' },
            {
              name: 'stats',
              title: 'Statistics List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Stat Label (e.g. DAYS, LOCATIONS)', type: 'string' },
                    { name: 'value', title: 'Stat Value (e.g. 4, 1068)', type: 'string' },
                    {
                      name: 'icon',
                      title: 'Icon Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Calendar (Days)', value: 'calendar' },
                          { title: 'Location Pin (Locations)', value: 'location' },
                          { title: 'People Group (Villagers)', value: 'people' },
                          { title: 'Medical Cross/Bandage (Referrals)', value: 'bandage' },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // Generic Cards Grid Block (Initiatives, Areas, Programmes, Projects, Opportunities)
        {
          type: 'object',
          name: 'cardsGridBlock',
          title: 'Grid of Cards (Initiatives / Programmes / Projects)',
          fields: [
            { name: 'title', title: 'Grid Title', type: 'string' },
            {
              name: 'cards',
              title: 'Cards List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Card Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text' },
                    { name: 'image', title: 'Card Image', type: 'image' },
                    { name: 'link', title: 'Link URL / Button Text', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },

        // Team Members Grid Block
        {
          type: 'object',
          name: 'teamGridBlock',
          title: 'Team Committees & Members Grid',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'heroImage', title: 'Group Photo', type: 'image' },
            {
              name: 'members',
              title: 'Members / Sub-Committees List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Member / Committee Name', type: 'string' },
                    { name: 'role', title: 'Role / Subtitle', type: 'string' },
                    { name: 'bio', title: 'Bio / Description', type: 'text' },
                    { name: 'image', title: 'Photo', type: 'image' },
                  ],
                },
              ],
            },
          ],
        },

        // Post-Trip Reports Grid Block
        {
          type: 'object',
          name: 'reportsGridBlock',
          title: 'Post-Trip Reports Grid',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            {
              name: 'reports',
              title: 'Trip Reports List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Report Title', type: 'string' },
                    { name: 'summary', title: 'Summary Text', type: 'text' },
                    { name: 'image', title: 'Cover Photo', type: 'image' },
                    { name: 'pdfLink', title: 'PDF / File URL', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },

        // PayNow & Donation Block
        {
          type: 'object',
          name: 'donationBlock',
          title: 'PayNow & Donation Details Block',
          fields: [
            { name: 'paynowTitle', title: 'PayNow Section Title', type: 'string' },
            { name: 'paynowInstructions', title: 'PayNow Instructions', type: 'text' },
            { name: 'qrCodeImage', title: 'PayNow QR Code Image', type: 'image' },
            { name: 'chequeTitle', title: 'Cheque Section Title', type: 'string' },
            { name: 'chequeInstructions', title: 'Cheque Instructions', type: 'text' },
            { name: 'contactEmail', title: 'Contact Email', type: 'string' },
          ],
        },
      ],
    },
  ],
}
