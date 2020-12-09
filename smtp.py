from mailjet_rest import Client
import os
api_key = '1fca83c777766837f1c83e91beb5a1f2'
api_secret = '79c3a4946a57bf3012304f9f0b29134a'
mailjet = Client(auth=(api_key, api_secret), version='v3.1')
data = {
  'Messages': [
    {
      "From": {
        "Email": "pamelen572@wncnw.com",
        "Name": "xDaf"
      },
      "To": [
        {
          "Email": "14e0c2a4-0624-4e5a-b8b0-6cc2dd893a85@mailslurp.com",
          "Name": "xDaf"
        }
      ],
      "Subject": "GiveMeasdPelase",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
}
result = mailjet.send.create(data=data)
print(result.status_code)
print (result.json())
