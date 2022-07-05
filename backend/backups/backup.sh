#! /bin/bash
cd "$(dirname "$0")"

name=$(date '+%Y-%m-%d')

echo "Saving to ${name}.tar..."

if [[ -z "${PGPASSWORD}" ]]; then
  echo "!!! WARNING !!! PGPASSWORD is not set"
fi

pg_dump -h infocenter-db-do-user-8430063-0.b.db.ondigitalocean.com -p 25060 -U doadmin -d tracking --clean -Ft > "./${name}.tar"

rm ./latest.tar
cp ./${name}.tar ./latest.tar

echo "Backup saved"
