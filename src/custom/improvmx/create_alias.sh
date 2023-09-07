# create_alias.sh# create_alias.sh
curl \
  -s \
  -X POST \
  -H "Authorization: Basic api:$API_KEY" \
  -H "Content-Type: application/json" \
  "https://api.improvmx.com/v3/domains/$DOMAIN/aliases/" \
  -d "{\"alias\": \"$ALIAS\", \"forward\": \"$FORWARD\"}"