const fetch = require('node-fetch');

    const projectId = 'newagent-5d02d'; 
    const sessionId = '123456';
    const languageCode = 'en-US';

    const dialogflow = require('dialogflow');

    const config = {
      credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvTevW7AwIbtCQ\ny/94dMmnCMDDQW3T2cCxPw1ntTtEjEo5w887/cIIBmc1I7Kf4XoBa8+EN+Q4a4qQ\nx+u/M/aMkSVrBv8tyah4eb2D4EPegwDkYw9EUAnbSm3sjI1DFzyelz6/dPmOzpcq\nL+YbNiMQNStWgqWXqw51LP1lev2qqK1Eucy18wwJvrTimKGeGo1Alfh4/jbR9Z2o\niFJ/bUvgV0ulZFaYBbzznAkv381yLw6adcHjjFQswzrO+VcvFfJB+EMw/VZTJaYx\nx5/o2+gE4Qj4laJxpjn8h46GXlH/HgsUz62cn8vbO9noerDTZSqvVJRbYFfyiTYw\no93pvGg9AgMBAAECggEANXpPVj6nAxGPFYTt17jE5WxBpa75ipWUd121QKxkOqqT\nYCDQQMxOGzWc2XSc4rIdjn5tjTehquZ/nGAolikLbuE+aXJ2eOjaOHpm6mqJOcF8\nDa/8ccn638dKVk2gMFXP289myHAuSzbRnYCEMUvoEWMu59KuImD/5ZYGbSVCagNN\ncH9OYbKGdAajjdDOy3Wylh8mEHVyH6MkGS4Q1LvXU5RbilO43NYi8YRerv83Tox4\nhEdeM8a+wKRa2OFrjk1SQYFiJSwrrs9xZOuA0MmR6tldgQMGauKOXMkFIwQCbuhS\n247RACCx2VKST7JURDkxQMT73suLK4dqCk2qYlkT7wKBgQDzMCRmMpX94mSFT7SC\nk173X0zkHNfyJBRtQ0CqdnvYYU2GXlBb0Gf3ZMSwzcNqwCpGnbTdqeTC+7HhH77o\nlwV8k9azKrlJisIJL1YmCZAvGE80jZEhLEWhhOi8p1owtBDRO5Diu58kthyiM9W6\nXN8mh7PfI+FQjtaV9iWgPglZRwKBgQC4ijzEZDkxigS9BcpUuqHmAIHIgMB7WsrU\nLyOcWMJ7fMnfhMs4ZU0Q3G2JXqYB9Udb4s/7ceM0hLNyStQq0l26wgcp35qk7f7F\n285b7Kv/wUD4JR9JgDc5+5AEuZecKadIlqUxFmpP4UvB5EHaozGOWeIyPUJsl10y\noSCcGx70WwKBgQCODY8Vi3MGLJpfLOHabE9K3IZDsX2K2fx8no5FhJRvHtd0J990\n4lX4swoZ5PfDgaCwQysFWFpiczfCsxKHNsBjts/xNIGrLbyONPJzoZ5xhBewMQmX\ngQ7jfImeuXr7fBNexRaq+sHJZf9v2Ct+gwVuslIlhAX3UpiSXIg6BELdvQKBgQCi\nymeiw9rkRaG6caI0LlNlh2r1ygaCiuxEU7UxVedycfnPcOCoxkw+pIUIWnNNZOdn\nOmVIpgXNLYbzOumBQQQoHMOe/7724XAPcMDQvK5aNkuu22iHOVD+mFlKocIJo4EL\nesEM1X5BKzjeORKS4cV0kvwEX5/6FWjEofkXXKFo4wKBgGhvMfRyle6+NA3wsCKL\njYqbdcc4RlO+m7SZNpVH9ICg8Ew80yhvb3+TDtinMdTsWEVCQ0ZUWhUlQrNgwTb3\nwnfYnspQqaciv2+tK56XhGvMkC0d+JJT53PFErPtS7gOpkZX6HeeaSLL6qNYIjIt\npueg4amjEbOcNozWNQ2EJ78Z\n-----END PRIVATE KEY-----\n",
        client_email: "bukitvista-clienta-access@newagent-5d02d.iam.gserviceaccount.com"
      }
    };
    console.log(config);

    const sessionClient = new dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Remember the Page Access Token you got from Facebook earlier?
    // Don't forget to add it to your `variables.env` file.
    const  FACEBOOK_ACCESS_TOKEN  = "EAACRcPHAjG8BAA9bX799FocQfItQ3x7hmusI9wuIrmfclwLFF97DTI8v5ZCibPswkAS1AxFkpYwaVIZAaV43QjqOvdoxRxBWSiSYLZBjPZAbZBJqJzn322DBt412uNbhsEUpitXPoirHOQqIfaOjqQZC2Le2ab4Kvy9Iy04uw1OAZDZD";
    console.log(FACEBOOK_ACCESS_TOKEN);

    const sendTextMessage = (userId, text) => {
       
      return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text,
            },
          }),
        }
      );
    }

    module.exports = (event) => {
      const userId = event.sender.id;
      const message = event.message.text;

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: languageCode,
          },
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          return sendTextMessage(userId, result.fulfillmentText);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }