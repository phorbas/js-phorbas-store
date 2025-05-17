const is_dkr = 'docker' === process.env.CICD_ENV

const integ_minio_auth = [ 'minioadmin', 'minioadmin' ]
export const s3_integ_hosts = [
  [ new URL(`http://${is_dkr ? 's3minio2025:9000' : '127.0.0.1:9000'}/phorbas-aws4fetch/`), ... integ_minio_auth ],
]
