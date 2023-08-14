# Contacts api

REST API that serves contact information for contact manager.

The communication with the application must be done through a REST(http) API with GET, POST, PATCH and DELETE requests and the data will persist for continuous use.

The objective of this application is to make a REST API that serves contact information for frontend applications.

## Definition Entities

- Contact: Contact created in the application, all fields are mandatory.
  - Name: length must be between 4 and 30 characters.
  - Email: Must comply with [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt).
  - Phone: Must be unique and have the prefix +51 with 9 numbers.
  - Status(isAvailable): Would be 'Available' and 'Unavailable'.
  - Role:  Would be 'Supplier', 'Customer' and 'Sponsor'. could be 'other' otherwise.

## functional requirements

- The user will be able to get all contacts in a JSON format.
- The user will be able to retrieve information from a specific contact using its identifier.
- The user may update some or all of the contact information using their identifier.
- The user will be able to delete a contact using their identifier

## Non-functional requirements

-La aplicación deberá poderse ejecutar con la versión LTS de Node.JS(18+).
