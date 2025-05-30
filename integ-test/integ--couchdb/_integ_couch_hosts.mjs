const is_dkr = 'docker' === process.env.CICD_ENV

export const couch_docker_hosts = [
  'http://admin:please@some_couchdb_v2:5984',
  'http://admin:please@some_couchdb_v3:5984',
]

export const couch_local_hosts = [
  'http://admin:please@127.0.0.1:5983',
  'http://admin:please@127.0.0.1:5984',
]

export const couch_hosts = is_dkr 
  ? couch_docker_hosts
  : couch_local_hosts
