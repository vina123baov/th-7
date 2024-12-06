# Thành viên nhóm
Phạm Phước Minh Hiếu - 2201700085
Võ Huỳnh Thái Bảo - 2201700186
Phạm Minh Khoa - 2201700189

# Mock API
## Mock server
### Get all customer
GET: https://private-ee9b36-midtern.apiary-mock.com/customer
### Create customer
POST: https://private-ee9b36-midtern.apiary-mock.com/customer
## Production
GET: https://super-engine-94qv6j97rjxhxjr5-8080.app.github.dev/customer



FORMAT: 1A
HOST: https://super-engine-94qv6j97rjxhxjr5-8080.app.github.dev/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyMzM0Mjc5LCJleHAiOjE3MzIzMzc4Nzl9.DE2l72HW22RpgUcBmcd1CF_cWjfpFurZQIlcr5n9Qwc

# Customer API

## Customer Collection [/customer]

### Get All Customers [GET]
+ Authentication: `Bearer <token>`
+ Response 200 (application/json)
    [
        {
            "username": "user1",
            "fullname": "Vo Huynh Thai Bao",
            "email": "user1e@example.com",
            "tel": "123456789"
        },
        {
            "username": "user2",
            "fullname": "Pham Phuoc Minh Hieu",
            "email": "user2@example.com",
            "tel": "987654321"
        },
        {
            "username": "user3",
            "fullname": "Pham Minh Khoa",
            "email": "user3@example.com",
            "tel": "555555555"
        }
    ]

### Create Customer [POST]
+ Authentication: `Bearer <token>`
+ Request (application/json)
    {
        "username": "example_user",
        "password": "example_password"
    }

+ Response 201
    {
        "message": "Customer created successfully"
    }

## Single Customer [/customer/{username}]

### Get a Customer by Username [GET]
+ Authentication: `Bearer <token>`
+ Parameters
    + username: user1 (string) - The username of the customer to fetch.
+ Response 200 (application/json)
    {
        "username": "user1",
        "fullname": "Vo Huynh Thai Bao",
        "email": "user1e@example.com",
        "tel": "123456789"
    }

### Update Customer Information [PATCH]
+ Authentication: `Bearer <token>`
+ Parameters
    + username: user1 (string) - The username of the customer to update.
+ Request (application/json)
    {
        "fullname": "Updated Name",
        "email": "updated_email@example.com",
        "tel": "987654321"
    }
+ Response 200 (application/json)
    {
        "message": "Customer updated successfully"
    }

### Delete Customer [DELETE]
+ Authentication: `Bearer <token>`
+ Parameters
    + username: user1 (string) - The username of the customer to delete.
+ Response 204 (application/json)
    {
        "message": "Customer deleted successfully"
    }
