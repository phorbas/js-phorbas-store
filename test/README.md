## Running the Tests


We have tests both for the NodeJS backend as well as in the browser.
### Prerequisites

 - NodeJS v16 or greater
  - We typically use [NVM](https://github.com/nvm-sh/nvm) to manage our Node environments.
 - Docker w/ Swarm
    If you have docker installed a simple `docker swarm init` will do the trick. 
 - [direnv](https://direnv.net). We include `aws.envrc`, so in your `.envrc`,
    put `source ./aws.envrc`. 

### NodeJS tests

We currently have approximately 44 tests

Run: 
    ```bash 
    $ cd js-phorbas-store # The root folder of the repository
    $ npm i
    $ cd test
    $ npm run test
    ```

### Web Browser tests

We currently have approximately 126 tests


   ```bash
    $ cd js-phorbas-store # The root folder of the repository
    $ npm i
    $ cd test
    $ npm i
    $ npm run serve
   ```

Follow the instructions as to where you point your browser. Normally this will be http://127.0.0.1:8080

### Docker based integration tests

   ```bash
    $ cd js-phorbas-store # The root folder of the repository
    $ npm i
    $ cd test
    $ cd int--postgresql
    $ npm test
   ```
*Please note you may have to run the test command twice* due to downloading and
startup of docker images for the particular backend test. For example,
PostGreSQL tests CockroachDB and three versions of PostGreSQL.

For example:

    $ docker stack ps integ_phorbas_store
    z48zyzk4bgut   integ_phorbas_store_cockroach_v20.1   cockroachdb/cockroach:v20.1.0     nordheim   Running         Running 5 minutes ago             
    bb1k8cwi0ojf   integ_phorbas_store_minio.1           minio/minio:latest                nordheim   Running         Running 2 hours ago               
    n4w75wqc51jt   integ_phorbas_store_mitmproxy.1       mitmproxy/mitmproxy:5.1.1         nordheim   Running         Running 2 hours ago               
    kp87mlk2uegr   integ_phorbas_store_phorbas_core.1    integ_phorbas_store_core:latest   nordheim   Running         Running 2 hours ago               
    smu4fzvm1419   integ_phorbas_store_postgres_v10.1    postgres:10.13                    nordheim   Running         Running 5 minutes ago             
    kw41nzfmw8cx   integ_phorbas_store_postgres_v11.1    postgres:11.8                     nordheim   Running         Running 4 minutes ago             
    ml3xri43xc1r   integ_phorbas_store_postgres_v12.1    postgres:12.3                     nordheim   Running         Running 5 minutes ago             
    tiswlv2wuh3e   integ_phorbas_store_sql_adminer.1     adminer:latest                    nordheim   Running         Running 2 hours ago               

Here are currently all the integration test collections we have.

   - int--arangodb
   - int--dynamodb
   - int--fsp
   - int--level
   - int--memcache
   - int--mongodb
   - int--mysql
   - int--postgresql
   - int--redis
   - int--rethinkdb
   - int--s3api
   - int--sqlite3

**int--core** has it's own additional integration tests, and also has support
for running the NodeJS and Web tests.

#### Tearing down the integration tests

    $ docker stack rm integ_phorbas_store

