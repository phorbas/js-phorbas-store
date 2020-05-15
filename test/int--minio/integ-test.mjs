import validate_backend from '@phorbas/store/esm/node/validate_backend.mjs'
const Minio = require('minio')

import bkc_with_minio from '@phorbas/store/esm/node/minio.mjs'

const minio = new Minio.Client({
    endPoint: 'minio', port: 9000, useSSL: false,
    accessKey: 'AKIAIOSFODNN7EXAMPLE',
    secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
})

validate_backend('minio', ()=>
  bkc_with_minio({minio, bucket: 'phorbas-test'}) )

