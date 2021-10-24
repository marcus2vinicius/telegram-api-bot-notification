# Telegram api bot notification

Send msg to channel, group or user by api rest

##depencency
- nodejs
## Installation
```bash
npm install
node index.js
```

## Usage

- Create bot on telegram for usage it, see:
    * https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-telegram?view=azure-bot-service-4.0
    * user on telegram @BotFather

- register your number sending '/start' to your bot

- test msg to number -> using http://localhost:3001/send-to-phonenumber

- For send message to group/channel is not necessary start conversation with bot, just put your bot in the group -> http://localhost:3001/send


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)