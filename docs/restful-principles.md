# RESTful services principles#
Following principles are based on the references such as [Github API](https://developer.github.com/v3), [Stripe API](https://stripe.com/docs/api#authentication) and [Twitter's API](https://dev.twitter.com/rest/public) in addition to different blogs describing the best practices. See references at bottom of this list.

## Principles
- [1. Use nouns but not verbs](#1-use-nouns-but-not-verbs) :white_check_mark:
- [2. Use plural nouns](#2-use-plural-nouns) :white_check_mark:
- [3. GET method and query parameters should not alter the :white_check_mark: state](#3-get-method-and-query-parameters-should-not-alter-the-state)
- [4. Relations](#4-relations) 
- [5. Versioning](#5-versioning)
- [6. Documentation](#6-documentation)
- [7. Provide filtering, sorting, field selection and paging for collections](#7-provide-filtering-sorting-field-selection-and-paging-for-collections)
	- [Filtering](#filtering)
	- [Sorting](#sorting)
	- [Field selection](#field-selection)
	- [Paging](#paging)
		- [Paging parameters](#paging-parameters)
		- [HTTP Header link](#http-header-link)
		- [Total number of entries](#total-number-of-entries)
- [8. Return a resource representation in PATCH and POST](8-return-a-resource-representation-in-patch-and-post)
- [9. Use HATEOAS](#9-use-hateoas)
- [10. Handle Errors with HTTP status codes](#10-handle-errors-with-http-status-codes)
	- [Use HTTP status codes](#use-http-status-codes)
	- [Use error payloads](#use-error-payloads)
- [11. Use HTTP headers for serialization formats](#11-use-http-headers-for-serialization-formats)
- [12. Use camelCase for field names](#12-use-camelcase-for-field-names)
- [13. Ensure gzip is supported](#13-ensure-gzip-is-supported)
- [14. Rate limiting](#14-rate-limiting)
- [15. Authentication](#15-authentication)
- [16. Caching](#16-caching)
- [17. Idempotent requests](#17-idempotent-requests)

## 1. Use nouns but not verbs
* GET '/api/notes' to `query` function
* GET '/api/notes/:id' to `detail` function
* POST '/api/notes' to `insert` function
* DELETE '/api/notes/:id' to `remove` function
* PATCH '/api/notes/:id' to `update` function

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
**H**ypermedia **a**s **t**he **E**ngine **o**f **A**pplication **S**tate is a principle that hypertext links should be used to create a better 
navigation through the API.
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

3 authentication mechanisms can be considered:

1. Use `HTTP Basic Auth` and SSL to pass randomly generated access token delivered in the user name field of the HTTP Basic Auth. However, this token-over-basic-auth method of authentication is only acceptable in cases where it's practical to have the user copy a token from an administration interface to the API consumer environment. In cases where this isn't possible, OAuth 2 should be used to provide secure token transfer to a third party. See example on [Strip API](https://stripe.com/docs/api#authentication) and [Github API](https://developer.github.com/v3/#authentication).
2. Use [OAuth 2](http://oauth.net/2/) to pass the bearer tokens by sending token in the header
3. Send the OAuth 2 token in the parameter

For what it's worth, all three methods above are just ways to transport the token across the API boundary. The actual underlying token itself could be identical.

Note, we are talking about authenticating the system/client of the API, not the user itself. 

## 16. Caching

## 17. Idempotent requests
To safely retry an API request without accidentally performing the same operation twice, include unique key to the `POST` requests by using HTTP header, such as `Idempotency-Key: <key>` like in [Stripe API] (https://stripe.com/docs/api#idempotent_requests). For example, if a request to create a article fails due to a network connection error, you can make a second request with the same key to guarantee that only a single article is created.

## 18. SSL everywhere - all the time

## References
* [10 Best Practices for Better RESTful API](http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)
* [Best Practices for Designing a Pragmatic RESTful API](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
* [Github API v3](https://developer.github.com/v3/)
* [Stripe API](https://stripe.com/docs/api#authentication)
* [Twitter's API](https://dev.twitter.com/rest/public)
