file=/Users/gmilano/Documents/DesignSketchs/SketchSampleBrasil.sketch
fileName=SketchSampleBrasil.sketch
bucket=gx-designops
resource="/${bucket}/${fileName}"
contentType="application/x-compressed-tar"
dateValue="date -R"
stringToSign="PUT\n\n${contentType}\n${dateValue}\n${resource}"
s3Key=
s3Secret=
signature=`echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`
echo $signature 
echo $stringToSign
curl -X PUT -T "${file}" \
  -H "Host: ${bucket}.s3.amazonaws.com" \
  -H "Date: ${dateValue}" \
  -H "Content-Type: ${contentType}" \
  -H "Authorization: AWS ${s3Key}:${signature}" \
  https://${bucket}.s3.amazonaws.com/${fileName}