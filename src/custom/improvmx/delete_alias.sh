# delete_alias.sh
curl \
  -s \
  -X DELETE \
  -H "Authorization: Basic api:$API_KEY" \
  https://api.improvmx.com/v3/domains/$DOMAIN/aliases/$ALIAS