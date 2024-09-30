import { Client, GatewayIntentBits } from 'discord.js';
import shortid from 'shortid';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// // This will create a new client jiske through hum server se interact karenge
// // Intents means ki tum usko kya permission de rhe ho 
// // GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages this means that the client have permission to access and control guilds and messgaes
// Create a new client to interact with the server
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Function to validate a URL using regex
function isValidURL(url) {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // Protocol (optional)
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Port and path (optional)
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string (optional)
        '(\\#[-a-zA-Z\\d_]*)?$','i'); // Fragment locator (optional)
    return !!urlPattern.test(url);
}

// Listen for slash command interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

// Listen for message creations
client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Ignore bot messages

    if (message.content.startsWith('create')) {
        const url = message.content.split('create')[1]?.trim();

        // Check if the user provided any text after 'create'
        if (!url) {
            return message.reply({
                content: 'Please provide a URL after the "create" command.',
            });
        }

        // Validate the provided text to check if it's a valid URL
        if (!isValidURL(url)) {
            return message.reply({
                content: 'The provided text is not a valid URL. Please provide a proper URL.',
            });
        }

        // Generate a short ID for the valid URL
        const ShortId = shortid.generate();
        return message.reply({
            content: `Generating ShortId for ${url}\nThis is your ShortId: ${ShortId}`
        });
    }

    // Default reply if the message doesn't match the "create" command
    message.reply({
        content: "Hello\n Provide url after create for the shortid of the url",
    });
});

// Log in to Discord with your bot token
client.login(process.env.BOT_TOKEN); 
