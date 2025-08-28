const axios = require("axios");
const selectionData = {};

module.exports = {
    config: {
      name: "bot",
      aliases: ["sim"],
      permission: 0,
      prefix: "both",
      categorie: "AI Chat",
      cooldowns: 6,
      credit: "Developed by Mohammad Nayan",
      usages: [
        `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
        `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
      ],
      description: "Engage in conversations with an AI-powered bot!",
    },

  event: async ({ event, api, body }) => {
    const { threadId, senderId, replyMessage, message} = event;

  
    if (!selectionData[threadId]) return;
    const { n, userId } = selectionData[threadId];

    
    if (userId !== senderId || !n) return;

    

    const quotedMessage =
      n.message?.extendedTextMessage?.text || null;

    if (!quotedMessage || replyMessage !== quotedMessage) return;
    

    try {

        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },

  start: async ({ event, api, args }) => {
    const usermsg = args.join(" ");
    const { threadId, senderId, message} = event;

    
    if (!usermsg) {
      const greetings = [
        "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ আমি তোমার জামাই লিমন সোনা আমার😇😘",
        "কি গো সোনা আমাকে ডাকছ কেনো আমি তোমার GF লিমন ভুলে গেছো নাকি😚",
        "বার বার আমাকে ডাকস কেন😡 আয় তোরে একটু cdi😁💋",
        "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
        "হুম জান তোমার অইখানে উম্মাহ😘🥵",
        "আসসালামু আলাইকুম বস বলেন কিভাবে আপনার পোদ মারতে পারি",
        "আমাকে এতো না ডেকে বস লিমনকে একটা মেসেজ দে 🙄",
        "jan hanga korba",
        "jan bal falaba🙂",
      ];"jan chipay jaiba👄",

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const userToMention = senderId;

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${userToMention.split('@')[0]}, ${randomGreeting}`,
        mentions: [userToMention],
      }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: greetingMessage,
      };
      return;
    }

    try {
        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },
};
