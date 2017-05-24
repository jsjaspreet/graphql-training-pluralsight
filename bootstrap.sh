#!/bin/bash
docker exec -it pg sh -c "psql -U postgres -d contests < /seed/test-pg-data.sql"
node database/loadTestMongoData.js
