# InfluxDB
InfluxDB is a high-performance time-series database designed for handling real-time data and analytics. It is optimized for fast writes and queries, making it ideal for IoT, monitoring, and analytics applications.

## Installation
### Using docker
```sh
docker run -p 8086:8086 -v $PWD:/var/lib/influxdb2 \
  -e DOCKER_INFLUXDB_INIT_MODE=setup \
  -e DOCKER_INFLUXDB_INIT_USERNAME=admin \
  -e DOCKER_INFLUXDB_INIT_PASSWORD=admin123 \
  -e DOCKER_INFLUXDB_INIT_ORG=my-org \
  -e DOCKER_INFLUXDB_INIT_BUCKET=my-bucket \
  influxdb:latest
```

### Manual installation
Visit [InfluxDB Downloads](https://portal.influxdata.com/downloads/) and follow the instructions for your platform.

## Connecting to InfluxDB
### Using CLI
```sh
influx setup \
  --username admin \
  --password admin123 \
  --org my-org \
  --bucket my-bucket
```

### Using JavaScript client
```typescript
import { InfluxDB } from '@influxdata/influxdb-client'

const url = "http://localhost:8086"
const token = "your-token"
const org = "my-org"
const bucket = "my-bucket"

const influxDB = new InfluxDB({ url, token })
```

## Writing data
### Using line protocol
```sh
echo "temperature,sensor=1 value=25.3" | influx write --bucket my-bucket --org my-org --token your-token
```

### Using JavaScript
```typescript
import { Point, WriteApi } from '@influxdata/influxdb-client'

const writeApi = influxDB.getWriteApi(org, bucket)
const point = new Point("temperature")
  .tag("sensor", "1")
  .floatField("value", 25.3)

writeApi.writePoint(point)
writeApi.close()
```

## Querying data
### Using flux query
```sh
influx query --org my-org 'from(bucket:"my-bucket") |> range(start: -1h)'
```

### Using JavaScript
```typescript
import { QueryApi } from '@influxdata/influxdb-client'

const queryApi = influxDB.getQueryApi(org)
const query = `from(bucket:"my-bucket") |> range(start: -1h)`

queryApi.queryRows(query, {
  next(row, tableMeta) {
    const data = tableMeta.toObject(row)
    console.log(data)
  },
  error(error) {
    console.error(error)
  },
  complete() {
    console.log("Query completed")
  },
})
```

## Retention policies
To configure data retention :
```sh
influx bucket update --name my-bucket --retention 30d --org my-org
```

## Alerts and monitoring
InfluxDB can be integrated with **Kapacitor** for real-time monitoring and alerting :
```sh
docker run -p 9092:9092 --network=influxdb_network \
  -e KAPACITOR_HOSTNAME=kapacitor \
  -e INFLUXDB_URL=http://influxdb:8086 \
  kapacitor
```

## Authentication and security
### Creating a new user
```sh
influx user create --name user1 --password secret123 --org my-org
```

### Assigning permissions
```sh
influx auth create --org my-org --user user1 --write-buckets my-bucket
```

## Backup
```sh
influx backup /path/to/backup --org my-org --bucket my-bucket
```

## Restore
```sh
influx restore /path/to/backup --org my-org --bucket my-bucket
```

## Sources
- [DevOps Journey - "InfluxDB Tutorial - Complete Guide to getting started with InfluxDB"](https://www.youtube.com/watch?v=Vq4cDIdz_M8)
- [Dreams of Code - "Solving one of PostgreSQL's biggest weaknesses."](https://www.youtube.com/watch?v=ruUlK6zRwS8)
