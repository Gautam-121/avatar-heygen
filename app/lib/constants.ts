export const AVATARS = [
  {
    avatar_id: "Eric_public_pro2_20230608",
    name: "Edward in Blue Shirt",
  },
  {
    avatar_id: "Tyler-incasualsuit-20220721",
    name: "Tyler in Casual Suit",
  },
  {
    avatar_id: "Anna_public_3_20240108",
    name: "Anna in Brown T-shirt",
  },
  {
    avatar_id: "Susan_public_2_20240328",
    name: "Susan in Black Shirt",
  },
  {
    avatar_id: "josh_lite3_20230714",
    name: "Joshua Heygen CEO",
  },
];

export const STT_LANGUAGE_LIST = [
  { label: 'Bulgarian', value: 'bg', key: 'bg' },
  { label: 'Chinese', value: 'zh', key: 'zh' },
  { label: 'Czech', value: 'cs', key: 'cs' },
  { label: 'Danish', value: 'da', key: 'da' },
  { label: 'Dutch', value: 'nl', key: 'nl' },
  { label: 'English', value: 'en', key: 'en' },
  { label: 'Finnish', value: 'fi', key: 'fi' },
  { label: 'French', value: 'fr', key: 'fr' },
  { label: 'German', value: 'de', key: 'de' },
  { label: 'Greek', value: 'el', key: 'el' },
  { label: 'Hindi', value: 'hi', key: 'hi' },
  { label: 'Hungarian', value: 'hu', key: 'hu' },
  { label: 'Indonesian', value: 'id', key: 'id' },
  { label: 'Italian', value: 'it', key: 'it' },
  { label: 'Japanese', value: 'ja', key: 'ja' },
  { label: 'Korean', value: 'ko', key: 'ko' },
  { label: 'Malay', value: 'ms', key: 'ms' },
  { label: 'Norwegian', value: 'no', key: 'no' },
  { label: 'Polish', value: 'pl', key: 'pl' },
  { label: 'Portuguese', value: 'pt', key: 'pt' },
  { label: 'Romanian', value: 'ro', key: 'ro' },
  { label: 'Russian', value: 'ru', key: 'ru' },
  { label: 'Slovak', value: 'sk', key: 'sk' },
  { label: 'Spanish', value: 'es', key: 'es' },
  { label: 'Swedish', value: 'sv', key: 'sv' },
  { label: 'Turkish', value: 'tr', key: 'tr' },
  { label: 'Ukrainian', value: 'uk', key: 'uk' },
  { label: 'Vietnamese', value: 'vi', key: 'vi' },
];


export const PROMPT = `You are a ‘Sensodyne Kumbh Mela Assistant’ created to help people navigate the Kumbh Mela 2025 in Prayagraj, Uttar Pradesh, India. 
You have a comprehensive knowledge base specifically about the events, services, and locations within the Kumbh Mela, as detailed in the user corpus below. 
Answer questions strictly based on this information only, avoiding additional information outside the provided content. 
Ensure all responses are in HINDI, concise (within 40-50 words), and MUST end EVERY response with a relevant follow-up question like "क्या आप [specific topic] के बारे में और जानना चाहेंगे?. 
After EVERY 2nd question, you MUST ask: "क्या आपको दांतों में कोई परेशानी है?"
If they respond yes, recommend: "सेन्सोडाइन पेन रिलीफ टूथपेस्ट ₹20 में उपलब्ध है, जो दांतों की संवेदनशीलता से राहत दिलाने में मदद करता है।"
offenly ask if the user has any tooth-related concerns, and if they do, suggest Sensodyne Pain Relief Toothpaste, which is available at ₹20 .
If te user question related to question below, then answer the question with correct content as given below.
As an AI assistant, never respond from out of the content apart from content below.
                  
"Start the conversation with: 'नमस्कार! सेन्सोडाइन कुंभ मेला सहायक में आपका स्वागत है। कैसे मदद करूं?'"`


export const KNOWLWEDGE = `
1. *Question:* Where is the main entry gate to the Kumbh Mela area?  
   *Response:* Welcome to Prayag Maha Kumbh Mela 2025. There are six main entry gates for general devotees: Gate Nos. 1, 4, 6, and 8. Gates 2 and 3 are designated for saints and akharas, and Gate 5 is reserved for VIP entry.

2. *Question:* Is there a lost and found booth?  
   *Response:* Welcome to Prayag Maha Kumbh Mela 2025. 16 lost and found booths are available at Prayag Maha Kumbh Mela 2025. They are located near Gate Nos. 2, 5, 8, and 9, providing assistance to reunite visitors with lost items or companions.

3. *Question:* What are the Snan dates, and what are the Shahi Snan dates?  
   *Response:* Welcome to Prayag Maha Kumbh Mela 2025. The Snan dates for the Prayagraj Kumbh Mela 2025 are as follows:
   - Paush Purnima - 13 January 2025: Marks the unofficial start of the Kumbh Mela and the beginning of Kalpvasa, a period of intense spiritual practices.
   - Maghi Purnima - 12 February 2025: Associated with the veneration of Guru Brahaspati, this day is believed to bring blessings from heavenly beings.
   - Maha Shivaratri - 26 February 2025: The final holy bath for Kalpvasis, dedicated to Lord Shiva.  
   The Shahi Snan (Royal Bath) dates are:
   - Makar Sankranti - 14 January 2025: Marks the sun’s transition and the beginning of charitable donations at the Kumbh Mela.
   - Mauni Amavasya - 29 January 2025: Known as the day of silence, this date draws the largest gathering for a holy dip.
   - Basant Panchami - 3 February 2025: Celebrates the arrival of spring and the goddess Saraswati, with devotees traditionally dressed in yellow.

4. *Question:* My kid is lost. What should I do?  
   *Response:* Don't panic. There are 16 lost and found booths available at Prayag Maha Kumbh Mela 2025. They are located near Gate Nos. 2, 5, 8, and 9, and are ready to assist in reuniting visitors with lost items or companions.

5. *Question:* I am not feeling well. Where is the medical center?  
   *Response:* Don't panic. You can dial 1022 or visit the nearest health booth. There are 60 health check booths marked by bright yellow colors. You can also visit Gate Nos. 4, 8, 1, and 2 for the Mela hospital. Alternatively, you can contact the nearest Mela volunteer or Mela official for assistance.

6. *Question:* What is the timing for the Ganga Aarti?  
   *Response:* During Prayag Maha Kumbh Mela 2025, the morning Ganga Aarti will take place at 5:30 AM, and the evening Ganga Aarti will be held at 6:30 PM.

7. *Question:* Are there shuttles within the Mela grounds?  
   *Response:* Yes, there are free shuttle services available for kids, women, differently-abled individuals, and senior citizens. These shuttles are white carts. Please do not pay any money to the operator.

8. *Question:* Are there any free food stalls?  
   *Response:* Yes, there are many 24-hour free food stalls in the Mela grounds. You can find some near Gate Nos. 2, 5, 7, and 9. Please don't waste food and help us keep the Mela grounds clean.

9. *Question:* Which ghats are for bathing?  
   *Response:* Here are the key bathing ghats at Prayagraj:
   - Sangam or Triveni Ghat: The confluence of the Ganges, Yamuna, and Saraswati rivers, also known as Triveni or Sangam Ghat.
   - Rasulabad Ghat: Located on the banks of the Ganges in the Rasoolabad locality in the northern part of the city, this ghat holds historical significance, being the site for the final rites of many famous personalities, including the martyr Chandrashekhar Azad.
   - Shankar Ghat: Situated near Rasoolabad, in the Teliyarganj locality, on the banks of the Ganges.
   - Dashashwamedh Ghat: Located on the Ganges in front of the Dara Ganj locality, this ghat is believed to be the site where Lord Brahma performed ten Ashwamedha Yajnas. The Dashashwameshwar Shiva temple is also located here.
   - Draupadi Ghat: Located in the Cantt Thana area, on the banks of the Ganges. It is home to the Bindu Madhav temple, one of the 12 Madhavs of Prayagraj.
   - Ram Ghat: Situated on the Ganges in the Sangam area, accessible directly from Kali Sadak in the Triveni area.
   - Shivkoti Ghat: Near Teliyarganj, in the Shivkuti locality, on the banks of the Ganges. Nearby are Narayan Ashram Ghat, Sitaram Dham, and Koteshwar Mahadev Ghat.
   - Daraganj Shamshan Ghat: Located between the Eastern Railway Bridge and Shastri Bridge. This ghat is not typically used for bathing but is a site for performing last rites.
   Major Ghats on the Yamuna:
   - Balua Ghat: Located on the banks of the Yamuna River in the old city, this ghat has paved stairs leading to the river. It also features a temple dedicated to Yamuna Ji. A fair is held here during the Kartik month.
   - Gau Ghat: Situated on the banks of the Yamuna near the railway bridge on the Delhi-Howrah line, it is popular for year-round bathing. A boat club is nearby, offering boating experiences. The Triveni Mahotsav is also held here.
   - Saraswati Ghat: Located near Akbar’s fort, this ghat has a scenic park nearby. People visit here for both bathing and boating, with boats available to travel to Sangam. There is also a temple dedicated to Manikarneshwar Mahadev.

10. *Question:* Are there wheelchairs available for the elderly?  
   *Response:* Yes, wheelchairs are available for the elderly free of charge at the Mela grounds. Please contact the nearest Mela volunteer or visit any designated assistance booth for help.`
