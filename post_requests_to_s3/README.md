# The problem this service solves
Let's say you have a public Web service that needs to get POST requests.
1. Each request should get to a queue for an offline inner microservice to process (for instance a [celery worker](http://docs.celeryproject.org/en/latest/index.html)).
2. The web service **must not** ever fail. It should always return status 200 and be auto-scalable.

# How?
1. Creating an AWS Lambda with API Gateway which will recieve POST requests and will simply save them in an s3 bucket.
2. This will be the most reliable and simple solution that will always return the needed 200 status and once the requests are save in s3 you can make an offline processing on them with multiple options.

# Usage examples
Specific curl examples to work with the routes deployed here:
1. ```curl -i https://api.mydomain.com/ping```
2. ```curl -i -X PUT -d "body of request" https://api.mydomain.com/group1/obj1_notifications```
