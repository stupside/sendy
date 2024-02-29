import Ajv from 'ajv'

import addFormats from 'ajv-formats'

const formats = addFormats(
  new Ajv({
    useDefaults: true,
    coerceTypes: true,
    removeAdditional: 'all',
  }),
  ['duration', 'email', 'uri', 'ipv4'],
)

export { formats }
