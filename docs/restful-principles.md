# RESTful services principles#
Following principles are based on the references such as [Github API](https://developer.github.com/v3), [Stripe API](https://stripe.com/docs/api#authentication) and [Twitter's API](https://dev.twitter.com/rest/public) in addition to different blogs describing the best practices. See references at bottom of this list.

## Principles
:white_circle: Implementation in progress / not verified yet

:white_check_mark: Implemented / Verified OK

| Principle   |      Implemented by      |  Status |
|----------|:-------------:|------:|
|[1. Use nouns but not verbs](#1-use-nouns-but-not-verbs)|[nodejs-microservice-poc]|:white_circle:|
|[2. Use plural nouns](#2-use-plural-nouns)|[nodejs-microservice-poc]|:white_circle:|
|[3. GET method and query parameters should not alter the  state](#3-get-method-and-query-parameters-should-not-alter-the-state)|[nodejs-microservice-poc]|:white_circle:|
|[4. Relations](#4-relations)|[nodejs-microservice-poc] and [restify-mongoose]|:white_circle:|
|[5. Versioning](#5-versioning)|[nodejs-microservice-poc]|:white_circle:|
|[6. Documentation](#6-documentation)|[nodejs-microservice-poc]|:white_circle:|
|[7. Provide filtering, sorting, field selection and paging for collections](#7-provide-filtering-sorting-field-selection-and-paging-for-collections)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;- [Filtering](#filtering)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;- [Sorting](#sorting)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;- [Field selection](#field-selection)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;- [Paging](#paging)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- [Paging parameters](#paging-parameters)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- [HTTP Header link](#http-header-link)|[restify-mongoose]|:white_check_mark:|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- [Total number of entries](#total-number-of-entries)|[restify-mongoose]|:white_check_mark:|
|[8. Return a resource representation in PATCH and POST](8-return-a-resource-representation-in-patch-and-post)|[restify-mongoose]|:white_check_mark:|
|[9. Use HATEOAS](#9-use-hateoas)|[restify-mongoose]|:white_circle:|
|[10. Handle Errors with HTTP status codes](#10-handle-errors-with-http-status-codes)|[nodejs-microservice-poc] and [restify-mongoose]|:white_circle:|
|&nbsp;&nbsp;&nbsp;-[Use HTTP status codes](#use-http-status-codes)|[nodejs-microservice-poc] and [restify-mongoose]|:white_circle:|
|&nbsp;&nbsp;&nbsp;-[Use error payloads](#use-error-payloads)|[nodejs-microservice-poc] and [restify-mongoose]|:white_circle:|
|[11. Use HTTP headers for serialization formats](#11-use-http-headers-for-serialization-formats)|[nodejs-microservice-poc]|:white_circle: Implement errors for formats that are not implemented|
|[12. Use camelCase for field names](#12-use-camelcase-for-field-names)|[nodejs-microservice-poc]|:white_circle:|
|[13. Ensure gzip is supported](#13-ensure-gzip-is-supported)|[nodejs-microservice-poc]|:white_circle:|
|[14. Rate limiting](#14-rate-limiting)|[nodejs-microservice-poc] or [restify-mongoose]|:white_circle: Not sure if the rate headers are supported OOB in restify|
|[15. Authentication](#15-authentication)|[nodejs-microservice-poc]|:white_circle: See [StackOwerflow thread](http://stackoverflow.com/questions/18411946/what-is-the-best-way-to-implement-a-token-based-authentication-for-restify-js)|
|[16. Caching](#16-caching)|[nodejs-microservice-poc]|:white_circle:|
|[17. Idempotent requests](#17-idempotent-requests)|[restify-mongoose]|:white_circle:|

## 1. Use nouns but not verbs
| HTTP verb |          Route         | Description                       | JS Function | [Idempotent](http://tools.ietf.org/html/rfc7231#section-4.2.2)                      |[Safe](http://tools.ietf.org/html/rfc7231#section-4.2.1) |
|-----------|:----------------------:|-----------------------------------|-------------|-----------------------------------| -----------|
| GET       |   `/api/v1/articles`   | Retrieves collection of resources | `query`     | YES                               | YES|
| GET       | `/api/v1/articles/:id` | Retrieves single resources        | `detail`    | YES                               | YES|
| POST      |   `/api/v1/articles`   | Creates new resource              | `insert`    | NO (sol.:use unique transaction key) | NO|
| DELETE    | `/api/v1/articles/:id` | Deletes existing resource         | `remove`    | YES                               | NO|
| PATCH     | `/api/v1/articles/:id` | Updates existing resource         | `update`    | NO (sol.:use conditional req handler)                               | NO|

## 2. Use plural nouns
Do not mix up singular and plural nouns. Keep it simple and use only plural nouns for all resources.
	
	/cars instead of /car
	/users instead of /user
	/products instead of /product
	/settings instead of /setting

## 3. GET method and query parameters should not alter the state
Use `PUT`, `POST`, `DELETE` HTTP verbs instead of the GET verb to alter the state.

Do not use GET for state changes:

	GET /users/711?activate or
	GET /users/711/activate

## 4. Relations
If a resource is related to another resource use subresources.

	GET /cars/711/drivers/ Returns a list of drivers for car 711
	GET /cars/711/drivers/4 Returns driver #4 for car 711
	
Include subset of the attributes for subresources when fetching a list of resources, to avoid performance issues. To obtain full list of attributes use the detailed representation.

Consider using expand attribute to tell which subresources should be returned with full list of attributes. See [Stripe API documentation](https://stripe.com/docs/api#expanding_objects) for more details.

## 5. Versioning
Always version your API. Versioning helps you iterate faster and prevents invalid requests from hitting updated endpoints. It also helps smooth over any major API version transitions as you can continue to offer old API versions for a period of time.

Version number can be specified in the URLs and HTTP headers.

Following the approach Stripe has taken in their [API versioning](https://stripe.com/docs/api#versioning) - the URL should have major version number (v1), but the API has full [semver versioning](http://semver.org/) which can be chosen using HTTP request header `accept-version`. In this case, the major version provides structural stability of the API as a whole while the sub-versions accounts for smaller changes (field deprecations, endpoint changes, etc).

Read also [How Are Rest APIs versioned](http://www.lexicalscope.com/blog/2012/03/12/how-are-rest-apis-versioned/)

## 6. Documentation

## 7. Provide filtering, sorting, field selection and paging for collections
### Filtering
Use a unique query parameter for all fields or a query language for filtering.

	GET /notes?q={"title":"Welcome to the first page"} #returns a list of notes with this string phrase

### Sorting
Allow ascending and descending sorting over multiple fields.

	GET /notes?sort=-title #sort a notes resource by title descending
	
### Field selection
Mobile clients display just a few attributes in a list. They don’t need all attributes of a resource. 
Give the API consumer the ability to choose returned fields. This will also reduce the network traffic 
and speed up the usage of the API.

	GET /notes?select=date #select only date the field of a notes resource
	
### Paging
#### Paging parameters
Use `pageSize` and `page` to restrict number of resources returned. Page size should have an default value
and should not be set to unlimited number because of performance issues. First page is page=0.

	GET /notes?pageSize=10&page=2 #returns notes 21-30

#### HTTP Header link
Links to the next or previous page should be provided in the 
[HTTP header link](http://tools.ietf.org/html/rfc5988) as well. 
It is important to follow this link header values instead of constructing your own URLs.

	link:
	<http://example.com/notes?p=0>; rel="first",
	<http://example.com/notes?p=1>; rel="prev",
	<http://example.com/notes/?p=3>; rel="next"
	<http://example.com/notes/?p=3>; rel="last"

#### Total number of entries
To send the total entries back to the user use the custom HTTP header: `X-Total-Count`.

## 8. Return a resource representation in PATCH and POST

## 9. Use HATEOAS
**H**ypermedia **a**s **t**he **E**ngine **o**f **A**pplication **S**tate is a principle that hypertext links should be used to create a better navigation through the API. Level 3 of [Richardson Maturity Model], the highest level, uses HATEOAS to deal with discovering the possibilities of your API towards the clients. 

***Construction***
```javascript
	"links": [
	 {
	 "rel": "<well-known linkrefs or URI>",
	 "href": "<absolute or relative path>",
	 "doc": "<human-readable description of the link>"
	 }
	]
```

***Example***
```javascript
{
  "id": 711,
  "manufacturer": "bmw",
  "model": "X5",
  "seats": 5,
  "drivers": [
   {
    "id": "23",
    "name": "Stefan Jauker",
    "links": [
     {
     "rel": "self",
     "href": "/api/v1/drivers/23"
     }
   ]
  }
 ]
}
```
There are specific relation types that are predefined. If you use one of these relation-types inside your own API, you MUST make sure they behave as expected, otherwise this might confuse your clients. See below for a link to these relation-types. -

- [IANA - Link relation](http://www.iana.org/assignments/link-relations/link-relations.xml)
- [HTML5 Specification - Links](http://www.w3.org/TR/html5/links.html)
- [RFC 5988: Web Linking](http://tools.ietf.org/html/rfc5988)

If you use non-standard relation types, they are required to be URIs. You can help clients understand what your custom link relation types do by making the URI de-referenceable, and place the documentation for that relation at that URI.

Note that there are no information in the links related to which HTTP verb to use (GET, POST, PATCH, DELETE, etc). This is something client needs to explore or something that should be documented in the API documentation. To provide real value, links should include which state changes are possible given current state, see the Example from [Richardson Maturity Model] below. However, this braks our principle #1 to use nouns and not verbs in the URLs.

```json
{
  "appointment": {
    "slot": {
      "id": "1234",
      "doctor": "mjones",
      "start": "1400",
      "end": "1450"
    },
    "patient": { "id": "jsmith" },
    "links": [
      {
        "rel": "/linkrels/appointment/cancel",
        "href": "/slots/1234/appointment"
      },
      {
        "rel": "/linkrels/appointment/addTest",
        "href": "/slots/1234/appointment/tests"
      },
      {
        "rel": "self",
        "href": "/slots/1234/appointment"
      },
      {
        "rel": "/linkrels/appointment/changeTime",
        "href": "/doctors/mjones/slots?date=20100104@status=open"
      },
      {
        "rel": "/linkrels/appointment/updateContactInfo",
        "href": "/patients/jsmith/contactInfo"
      },
      {
        "rel": "/linkrels/help",
        "href": "/help/appointment"
      }
    ]
  }
}
```

## 10. Handle Errors with HTTP status codes
### Use HTTP status codes
### Use error payloads

## 11. Use HTTP headers for serialization formats
Both, client and server, need to know which format is used for the communication. 
The format has to be specified in the HTTP-Header.

**Content-Type** defines the request format.

**Accept** defines a list of acceptable response formats.

## 12. Use camelCase for field names

## 13. Ensure gzip is supported

## 14. Rate limiting
To prevent abuse, it is standard practice to add some sort of rate limiting to an API. 
[RFC 6585](http://tools.ietf.org/html/rfc6585) introduced a HTTP status code 
[429 Too Many Requests](http://tools.ietf.org/html/rfc6585#section-4) to accommodate this.

At a minimum, include the following headers (using 
[Twitter's naming conventions](https://dev.twitter.com/rest/public/rate-limiting) and 
[Githup API](https://developer.github.com/v3/rate_limit/)as headers typically don't 
have mid-word capitalization):

* `X-Rate-Limit-Limit` - The number of allowed requests in the current period
* `X-Rate-Limit-Remaining` - The number of remaining requests in the current period
* `X-Rate-Limit-Reset` - The number of seconds left in the current period

## 15. Authentication
A RESTful API should be stateless. This means that request authentication should not depend on cookies or sessions. Instead, each request should come with some sort authentication credentials.

3 authentication mechanisms can be considered (see also [Basics about REST Authentication](http://restcookbook.com/Basics/loggingin/):

1. Use `HTTP Basic Auth` and SSL to pass randomly generated access token delivered in the user name field of the HTTP Basic Auth. However, this token-over-basic-auth method of authentication is only acceptable in cases where it's practical to have the user copy a token from an administration interface to the API consumer environment. In cases where this isn't possible, OAuth 2 should be used to provide secure token transfer to a third party. See example on [Strip API](https://stripe.com/docs/api#authentication) and [Github API](https://developer.github.com/v3/#authentication).
2. Use [OAuth 2](http://oauth.net/2/) to pass the bearer tokens by sending token in the header
3. Send the OAuth 2 token in the parameter

For what it's worth, all three methods above are just ways to transport the token across the API boundary. The actual underlying token itself could be identical.

Note, we are talking about authenticating the system/client of the API, not the user itself. 

## 16. Caching
HTTP provides a built-in caching framework! All you have to do is include some additional outbound response headers and do a little validation when you receive some inbound request headers.

There are 2 approaches: [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) and [Last-Modified](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.29)

***ETag***: When generating a request, include a HTTP header ETag containing a hash or checksum of the representation. This value should change whenever the output representation changes. Now, if an inbound HTTP requests contains a `If-None-Match` header with a matching ETag value, the API should return a `304 Not Modified` status code instead of the output representation of the resource.

***Last-Modified***: This basically works like to ETag, except that it uses timestamps. The response header `Last-Modified` contains a timestamp in [RFC 1123](http://www.ietf.org/rfc/rfc1123.txt) format which is validated against `If-Modified-Since`. Note that the HTTP spec has had [3 different acceptable date formats](http://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3) and the server should be prepared to accept any one of them.

## 17. Idempotent requests
***POST***
To safely retry an API request without accidentally performing the same operation twice, include unique key to the `POST` requests by using HTTP header, such as `Idempotency-Key: <key>` like in [Stripe API] (https://stripe.com/docs/api#idempotent_requests). For example, if a request to create a article fails due to a network connection error, you can make a second request with the same key to guarantee that only a single article is created.

***PATCH***
For `PATCH` requests use a conditional request such that the request will fail if the resource has been updated since the client last accessed the resource. For example, the client can use a strong `ETag` [RFC2616](http://tools.ietf.org/html/rfc2616) in an `If-Match` header on the PATCH request.

## 18. SSL everywhere - all the time

## References
* [10 Best Practices for Better RESTful API](http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)
* [Best Practices for Designing a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
* [Github API v3](https://developer.github.com/v3/)
* [Stripe API](https://stripe.com/docs/api#authentication)
* [Twitter's API](https://dev.twitter.com/rest/public)
* [Martin Fowler: Richardson Maturity Model][Richardson Maturity Model]

[nodejs-microservice-poc]: https://github.com/ismarslomic/nodejs-microservice-poc
[restify-mongoose]: https://github.com/ismarslomic/restify-mongoose
[Richardson Maturity Model]: http://martinfowler.com/articles/richardsonMaturityModel.html
