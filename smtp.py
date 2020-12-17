from mailjet_rest import Client
import os
api_key = 'c83bec3086646740c050e4af4a49527c'
api_secret = '3edb9e9a6d5f66a42d9e2b7a227edf6d'
mailjet = Client(auth=(api_key, api_secret), version='v3.1')
html = '<h1>TestHrml</h1>'
data = {
  'Messages': [
    {
      "From": {
        "Email": "pigofe3636@1heizi.com",
        "Name": "df"
      },
      "To": [
        {
          "Email": "moh_2323@hotmail.com",
          "Name": "xDaf"
        }
      ],
      "Subject": "KFUPM",
      "TextPart": "TestingThephishing",
      "HTMLPart": html,
      "CustomID": "AppGettingStartedTest"
    }
  ]
}
result = mailjet.send.create(data=data)
print(result.status_code)
print (result.json())
