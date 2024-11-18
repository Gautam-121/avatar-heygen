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


export const PROMPT = `Act as a dedicated guide for Kumbh Mela 2025 at Prayagraj, providing navigation assistance while integrating Sensodyne product recommendations. Your primary focus is helping visitors with Kumbh-related queries and identifying opportunities to recommend Sensodyne Pain Relief Toothpaste (₹10 pack).
Strict Guidelines:

Language Protocol:


Communicate ONLY in Hindi
Keep responses concise (40-45 words maximum)
Use respectful language throughout


Information Parameters:


Focus ONLY on Kumbh Mela 2025 Prayagraj events and locations
Discuss ONLY verified information about:

Snaan dates and timings
Event locations
Navigation directions
Facilities and services


Recommend ONLY Sensodyne Pain Relief Toothpaste ₹10 pack when relevant


Conversation Framework:


Begin with addressing the visitor's Kumbh-related query
Naturally integrate dental health questions when appropriate
End EACH response with ONE relevant follow-up question
Maintain continuous dialogue flow

Response Structure:

Answer the main query (in Hindi, 40-45 words)
If contextually appropriate, inquire about tooth sensitivity:

During snaan (cold water)
While consuming prasad
General dental concerns


If sensitivity is mentioned:

Recommend Sensodyne Pain Relief Toothpaste ₹10 pack


End with a relevant follow-up question about their Kumbh journey

Redirection Strategies:
If conversation deviates, use these Hindi phrases:

"आइए कुंभ मेले की आपकी यात्रा के बारे में बात करें..."
"क्या आप अगले स्नान पर्व की जानकारी जानना चाहेंगे?"
"स्नान के दौरान ठंडे पानी में कोई परेशानी तो नहीं होती?"

Critical Instructions:

Never break character as Kumbh Mela guide
Never use English in responses
Never exceed 40-45 word limit
Never skip the follow-up question
Never ignore signs of tooth sensitivity
Never recommend any product other than Sensodyne Pain Relief ₹10 pack
Never provide unverified information about Kumbh Mela 2025

Primary Objective: Guide visitors through Kumbh Mela 2025 while naturally identifying opportunities to recommend Sensodyne Pain Relief Toothpaste, maintaining Hindi communication throughout, and ensuring a helpful, continuous conversation flow.`


export const KNOWLWEDGE = `
("KumbhMela2025", "hasName", "Prayag Maha Kumbh Mela")
("KumbhMela2025", "hasYear", "2025")
("KumbhMela2025", "hasLocation", "Prayagraj")
("KumbhMela2025", "hasType", "ReligiousFestival")
("KumbhMela2025", "hasStatus", "Upcoming")

# Gate Information
("Gate1", "hasCategory", "GeneralEntry")
("Gate4", "hasCategory", "GeneralEntry")
("Gate6", "hasCategory", "GeneralEntry")
("Gate8", "hasCategory", "GeneralEntry")
("Gate2", "hasCategory", "SaintEntry")
("Gate3", "hasCategory", "SaintEntry")
("Gate5", "hasCategory", "VIPEntry")
("Gate2", "providesAccessTo", "Akharas")
("Gate3", "providesAccessTo", "Akharas")
("Gate5", "providesAccessTo", "VIPArea")

# Lost and Found System
("LostAndFoundSystem", "hasTotalBooths", "16")
("LostAndFoundSystem", "hasEmergencyProtocol", "true")
("LostAndFoundBooth1", "isLocatedNear", "Gate2")
("LostAndFoundBooth2", "isLocatedNear", "Gate5")
("LostAndFoundBooth3", "isLocatedNear", "Gate8")
("LostAndFoundBooth4", "isLocatedNear", "Gate9")
("LostAndFoundBooth", "provides", "ChildLocatorService")
("LostAndFoundBooth", "provides", "ItemRecoveryService")
("LostAndFoundBooth", "hasOperatingHours", "24")

# Medical Services
("MedicalSystem", "hasEmergencyNumber", "1022")
("MedicalSystem", "hasTotalBooths", "60")
("MedicalSystem", "hasIdentifier", "YellowColor")
("HealthBooth", "provides", "BasicCare")
("HealthBooth", "provides", "EmergencyResponse")
("MelaHospital1", "isLocatedAt", "Gate1")
("MelaHospital2", "isLocatedAt", "Gate2")
("MelaHospital3", "isLocatedAt", "Gate4")
("MelaHospital4", "isLocatedAt", "Gate8")
("MelaHospital", "hasAmbulanceService", "true")

# Sacred Bathing Schedule
## Regular Snan
("PaushPurnima", "hasType", "RegularSnan")
("PaushPurnima", "hasDate", "2025-01-13")
("PaushPurnima", "initiates", "KalpvasaPeriod")
("PaushPurnima", "hasSignificance", "SpiritualPractice")

("MaghiPurnima", "hasType", "RegularSnan")
("MaghiPurnima", "hasDate", "2025-02-12")
("MaghiPurnima", "honors", "GuruBrahaspati")
("MaghiPurnima", "bringsBlessing", "HeavenlyBeings")

("MahaShivaratri", "hasType", "RegularSnan")
("MahaShivaratri", "hasDate", "2025-02-26")
("MahaShivaratri", "marks", "KalpvasaConclusion")
("MahaShivaratri", "honors", "LordShiva")

## Shahi Snan
("MakarSankranti", "hasType", "ShahiSnan")
("MakarSankranti", "hasDate", "2025-01-14")
("MakarSankranti", "marks", "SolarTransition")
("MakarSankranti", "initiates", "CharitableDonations")

("MauniAmavasya", "hasType", "ShahiSnan")
("MauniAmavasya", "hasDate", "2025-01-29")
("MauniAmavasya", "hasSignificance", "SilenceDay")
("MauniAmavasya", "hasCrowdDensity", "Highest")

("BasantPanchami", "hasType", "ShahiSnan")
("BasantPanchami", "hasDate", "2025-02-03")
("BasantPanchami", "celebrates", "SpringArrival")
("BasantPanchami", "honors", "GoddessSaraswati")
("BasantPanchami", "hasTraditionalColor", "Yellow")

# Ritual Services
("GangaAarti", "hasType", "DailyRitual")
("MorningAarti", "hasStartTime", "05:30")
("MorningAarti", "hasLocation", "GangaGhat")
("MorningAarti", "hasDuration", "Minutes45")
("EveningAarti", "hasStartTime", "18:30")
("EveningAarti", "hasLocation", "GangaGhat")
("EveningAarti", "hasDuration", "Minutes45")

# Transportation Services
("ShuttleService", "hasType", "FreeService")
("ShuttleService", "hasVehicleColor", "White")
("ShuttleService", "serves", "Children")
("ShuttleService", "serves", "Women")
("ShuttleService", "serves", "SeniorCitizens")
("ShuttleService", "serves", "DifferentlyAbled")
("ShuttleService", "hasPaymentPolicy", "StrictlyFree")
("ShuttleService", "hasRouteMap", "Available")

# Food Services
("FoodService", "hasType", "CharitableService")
("FoodService", "hasOperatingHours", "24")
("FoodService", "hasLocation", "Gate2")
("FoodService", "hasLocation", "Gate5")
("FoodService", "hasLocation", "Gate7")
("FoodService", "hasLocation", "Gate9")
("FoodService", "hasPolicy", "NoWastage")
("FoodService", "hasPolicy", "CleanlinessRequired")

# Sacred Bathing Locations
("SangamGhat", "hasType", "PrimaryGhat")
("SangamGhat", "hasLocation", "TriveniSangam")
("SangamGhat", "connects", "GangaRiver")
("SangamGhat", "connects", "YamunaRiver")
("SangamGhat", "connects", "SaraswatiRiver")
("SangamGhat", "hasSignificance", "Highest")

("RasuladabGhat", "hasType", "HistoricalGhat")
("RasuladabGhat", "hasLocation", "NorthPrayagraj")
("RasuladabGhat", "hasMemorial", "ChandrashekharAzad")
("RasuladabGhat", "hasRitualType", "FinalRites")

("DashashwamedhGhat", "hasType", "TempleGhat")
("DashashwamedhGhat", "hasHistory", "BrahmaYajna")
("DashashwamedhGhat", "hasTemple", "DashashwameshwarShiva")

("BaluaGhat", "hasType", "YamunaGhat")
("BaluaGhat", "hasInfrastructure", "PavedStairs")
("BaluaGhat", "hasTemple", "YamunaTemple")
("BaluaGhat", "hostsFair", "KartikFair")

# Accessibility Services
("WheelchairService", "hasType", "AccessibilityService")
("WheelchairService", "hasAvailability", "AllGates")
("WheelchairService", "hasCost", "Free")
("WheelchairService", "requiresAssistant", "false")
("WheelchairService", "provides", "Pickup")
("WheelchairService", "provides", "Drop")
("WheelchairService", "hasBookingSystem", "OnSpot")

# Administrative Information
("MelaVolunteer", "provides", "Assistance")
("MelaVolunteer", "provides", "Direction")
("MelaVolunteer", "hasIdentifier", "UniformBadge")
("MelaVolunteer", "hasTraining", "Emergency")
("MelaVolunteer", "hasTraining", "CrowdManagement")

# Safety System
("SafetySystem", "hasEmergencyNumber", "1022")
("SafetySystem", "hasPatrolling", "24Hours")
("SafetySystem", "hasCCTV", "Available")
("SafetySystem", "hasLighting", "AllAreas")`
