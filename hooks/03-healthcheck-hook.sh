#!/bin/bash

if [ -z $HEALTHCHECK_SCRIPT ]; then
  HEALTHCHECK_SCRIPT='./healthcheck.sh';
fi

# Write healthcheck script for Docker
cat <<-EO_HEALTHCHECK > ${HEALTHCHECK_SCRIPT}
#!/bin/bash

status=\$(curl \
  -s -o /dev/null \
  -w "%{http_code}" \
  http://localhost:8080/${BASE_HREF}/metadata.json \
);


if [ \$status -eq 200 ]; then
  exit 0;
else
  exit 1;
fi
EO_HEALTHCHECK

chmod +x ${HEALTHCHECK_SCRIPT};