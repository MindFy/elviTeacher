import * as dev from './api.dev'
import * as prod from './api.prod'

if (process.env.NODE_ENV === 'production') {
  module.exports = prod
} else {
  module.exports = prod
}
