const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


//https://cloud.google.com/translate/docs/advanced/detecting-language-v3
exports.detectLanguage = functions.https.onCall((data, context) => {


  const { text } = data;

  const projectId = 'chat-app-new-8caac';
  const location = 'global';

  // Imports the Google Cloud Translation library
  const {TranslationServiceClient} = require('@google-cloud/translate');

  // Instantiates a client
  const translationClient = new TranslationServiceClient();

  async function detectLanguage() {
    // Construct request
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      content: text,
    };

    try {
      // Run request
      const [response] = await translationClient.detectLanguage(request);

      console.log('Detected Languages:');
      for (const language of response.languages) {
        console.log(`Language Code: ${language.languageCode}`);
        console.log(`Confidence: ${language.confidence}`);
      }
    } catch (error) {
      console.log(error.details);
    }
  }

  result = detectLanguage();

  return {
    language: 'test'
  };
})

//https://cloud.google.com/translate/docs/advanced/quickstart#translate_v3_translate_text-nodejs
exports.translateText = functions.https.onCall((data, context) => {

  const { text, origin, target } = data;

  const projectId = 'chat-app-new-8caac';
  const location = 'global';

  // Imports the Google Cloud Translation library
  const {TranslationServiceClient} = require('@google-cloud/translate');

  // Instantiates a client
  const translationClient = new TranslationServiceClient();
  async function translateText() {
    // Construct request
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: origin,
      targetLanguageCode: target,
    };

    try {
      // Run request
      const [response] = await translationClient.translateText(request);

      for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
      }
    } catch (error) {
      console.error(error.details);
    }
  }

  translateText();

  return {
    language: 'test'
  };

})

