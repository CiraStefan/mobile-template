export const ACTIVITY_SCHEMA = {
  title: 'activity schema',
  version: 0,
  primaryKey: 'activityId',
  type: 'object',
  properties: {
      activityId : {
          type: 'string',
      },
      name: {
          type: 'string'
      },
      description: {
          type: 'string'
      },
      category: {
          type: 'string'
      },
      date: {
          type: 'string'
      },
      time: {
          type: 'integer'
      },
      intensity: {
          type: 'string'
      }
  },
  required: [],
}
