#! /bin/bash

if [[ -z "${PGPASSWORD}" ]]; then
  echo "!!! WARNING !!! PGPASSWORD is not set"
fi

# pg_restore -h infocenter-db-do-user-8430063-0.b.db.ondigitalocean.com -p 25060 -U infocenter -d infocenter --data-only latest.tar
# pg_restore -U postgres -d infocenter --data-only latest.tar
pg_restore -U postgres -d tracking --data-only local.tar
