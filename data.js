// Bron: https://www.manegehooidonk.nl/manege/fotos-ponys/ (1-op-1 overgenomen)
const PONYS = [
 {
  "naam": "Abria B",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/Screenshot_20260118_222146_OneDrive.jpg"
  ],
  "tekst": "Abria is een lieve jonge pony, die blij in het leven staat. Ze werkt graag voor je. Rijden in de rijbanen vindt ze leuk en ook met een buitenrit maak je haar blij. Rust en aandacht voor haar vindt ze fijn als je bij haar in de stal bent. Maart-April 2026 gaat zij een veulen krijgen"
 },
 {
  "naam": "Aduria",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0006.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0008.jpg"
  ],
  "tekst": "Aduria is een lieve merrie, die allround inzetbaar is. Haar basis is M dressuur. Ook springen doet ze erg goed. Aduria is een fijn leerpaard voor alle ruiters. Ze is braaf voor de beginnende ruiters en op de buitenritten en alle oefeningen in de dressuur en springen doet ze makkelijk als deze op de juiste manier gevraagd worden. Aduria loopt met haar lease ruiter ook mee in het L-viertal kür op muziek."
 },
 {
  "naam": "Al Pacino",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0063.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0084.jpg"
  ],
  "tekst": "Al Pacino is een lief, nieuwsgierig groot paard voor onze grotere ruiters. Hij heeft iedere les weer zin om voor je te werken. Hij houdt van mensen, aandacht en een poetsbeurt. Al Pacino is een leuke uitdaging om mee te rijden in de rijbak, is braaf op de buitenritten en is voor de ervaren springruiter een leuk paard om een sprong mee te maken."
 },
 {
  "naam": "Annemarie",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0029.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG_7584.jpg"
  ],
  "tekst": "Annemarie is een erg fijne pony. Voor de ruiters is zij rustig en braaf. Ook voor de kleinere volwassen ruiters is zij een paard met dat vertrouwen geeft. Ook een echte lieverd op buitenritten en gaat ze ook graan met de instructeurs mee voorop. In stal wil zij graag duidelijk en rustig benaderd worden en houdt ze niet van drukte, houd je hier goed rekening mee is ze een echte knuffel."
 },
 {
  "naam": "Banner Man S",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20230918-WA0088.jpg"
  ],
  "tekst": "Banner Man S is een ervaren dressuur topper. Hij heeft in Prix st George gelopen. Een geweldige leermeester voor onze ruiters. Altijd bereid tot werken en erg lief in de stal."
 },
 {
  "naam": "BB-One",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2025/07/IMG-20250429-WA0008.jpg"
  ],
  "tekst": "BB-One is een lief damespaard. Hij is nog jong maar super betrouwbaar ook voor onze meer beginnende ruiters. Onze ervaren ruiters kunnen veel van hem leren. Naast het rijden in de rijbaan gaat BB-One graag mee op een buitenrit."
 },
 {
  "naam": "Beertje Balou",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0010.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0011.jpg"
  ],
  "tekst": "Beertje Balou is een echte merrie. Een diva op stal, met de verwachting dat je haar met rust en respect behandeld. Doe je dit niet, kan ze mopperen. Zij geniet van onze buitenritten en is zowel voor beginner als meer gevorderde ruiters een fijn paard. Met het springen kan ze erg enthousiast worden. Haar veulen Yalou is ook nog op onze manege en nu bijna 3 jaar oud."
 },
 {
  "naam": "Betty Boop",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0008.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0026.jpg"
  ],
  "tekst": "Betty Boop heeft de rust en eigenzinnigheid van een tinker, die ze is. Kinderen krijgen veel vertrouwen van haar en zitten fijn op haar. Als er eten in de buurt is, doet ze alles voor je. Het liefst gaat Betty mee op een fijne buitenrit."
 },
 {
  "naam": "Bikkel",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20250309-WA0000.jpeg"
  ],
  "tekst": "Bikkel een een lieve zachtaardige grote pony die heerlijk zit. Hij is een echte allrounder. Dressuur, springen, buitenritten, hij doet het allemaal met plezier."
 },
 {
  "naam": "Biolga",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0004.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0012.jpg"
  ],
  "tekst": "Biolga is een lieve merrie. Ze is de beste vriendin van Daffia. Biolga werkt graag en is in het rijden dan ook actief maar super betrouwbaar. Ze zit makkelijk en is als damespaardje fijn voor onze grotere jeugdruiters maar ook voor de volwassenen. Biolga is heel fijn in de dressuurlessen, op buitenritten en de zitlessen aan de longeerlijn."
 },
 {
  "naam": "Blue",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0044.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0048.jpg"
  ],
  "tekst": "Blue is knappe grote pony en een echte topper. Leuk voor alle ruiters. Dressuur, springen, buitenrijden, spelen, poetsen. Hij doet het allemaal graag. Iedereen is dan ook dol op hem. Een echte lieverd in de stal die graag wat extra aandacht krijgt."
 },
 {
  "naam": "Bontje",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0012.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0023.jpg"
  ],
  "tekst": "Bontje is een lieve, knappe dame, die geniet van mooie vlechten in haar manen. In rijden kan ze alles en zit ze heel stabiel voor de ruiters. Een fijne pony dan ook om op te leren. Bontje is dat ook geliefd bij zowel de beginnende als ervaren ruiters."
 },
 {
  "naam": "Browny",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0003.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0010.jpg"
  ],
  "tekst": "Browny is een echte vriendelijke grote jongen. Hij houdt van aandacht, uitgebreide poetsbeurten en lekker kriebelen bij zijn oren. In het rijden is het een echte topper voor iedereen. Hij zal altijd doen wat de ruiter van hem vraagt. De dressuur oefeningen kent hij tot Z niveau, hij zal in het springen nooit weigeren en hij gaat graag mee op een buitenrit. Met de beginnende ruiters heeft hij veel geduld en zet hij altijd zijn beste hoefje voor."
 },
 {
  "naam": "Cassandra",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20240326-WA0008.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20240326-WA0013.jpg"
  ],
  "tekst": "Cassandra is een lieve haflinger merrie. Ze kan, zoals het hoort bij haflingers, een beetje lomp zijn maar altijd uit een goed hart. Ze is rustig en stabiel in het rijden en gaat graag mee op buitenrit. Voor eten doet Cassandra alles. Ook in de springlessen is ze heerlijk enthousiast."
 },
 {
  "naam": "Castor",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0032.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0033.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0034.jpg"
  ],
  "tekst": "Castor is een grote, vriendelijke reus maar kan ook wel een echt mannetje zijn. Hij staat open in het leven, vindt alles interessant en wil erbij zijn. Hij vraagt zowel op stal als in het rijden een ruiter die de leiding neemt en hem lekker bezig houdt anders is hij snel afgeleid. Castor kent de oefeningen tot en met het M dressuur, een fijn paard dus voor de meer ervaren ruiter."
 },
 {
  "naam": "Chanone",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0015.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0021.jpg"
  ],
  "tekst": "Chanone is een erg mooie actieve pony. Een lieverd, die graag voor je werkt. Van springen wordt hij soms wat te enthousiast. Hij vindt het fijn dat je hem poetst en rustig bij hem in de stal komt knuffelen. Chanone houdt van lekker galopperen door de bossen."
 },
 {
  "naam": "China Doll",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0035.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0055.jpg"
  ],
  "tekst": "China Doll doet haar naam eer aan. Een echt poppetje. Ze verwacht dat je lief en met rust met haar omgaat. Het liefst heeft China Doll de kleinste kinderen bij haar in de stal. Actief in het rijden en lief voor onze kabouterruiters ."
 },
 {
  "naam": "Collin",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/2025041612475309.png"
  ],
  "tekst": "Collin is een erg ervaren paard. Hij is graag bezig en wordt blij van een buitenrit. Voor de beginnende ruiters is hij rustig en lief en de ervaren ruiters kunne hem fijn in aanleuning rijden en goed mee oefenen, Soms een `grumpy old man` op stal, maar met rust ben je snel met hem aan het knuffelen."
 },
 {
  "naam": "Conner Z",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20241209-WA0001.jpg"
  ],
  "tekst": "Conner Z is een fijn springpaard. In een parcours zal hij alles springen en de fouten van zijn ruiter oplossen. Daarom een fijn leerpaard voor het springen. Ook in dressuur heeft hij een goede basis. Altijd rustig en stabiel."
 },
 {
  "naam": "Cupido Z",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0072.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0091.jpg"
  ],
  "tekst": "Cupido is een groot lief paard, een echte blije gup. Cupido houdt ervan om met zijn vrienden te ravotten in de paddocks. Hij wordt op stal graag gekriebeld in zijn manen en uitgebreid gepoetst. Cupido weet dat hij groot is, met het omdoen van het hoofdstel maakt hij hier graag gebruik van als hij nog lekker aan het eten is. Met het rijden is hij rustig en betrouwbaar. Hij maakt met zijn lange benen grote bewegingen, dit maakt hem een goed paard om je balans op te oefenen. Cupido kent de basis van de dressuur op L-niveau, hij gaat graag mee op een buitenrit zowel voorop als in de groep en hij maakt graag een sprongetje. Cupido is met zijn grote lijf soms een beetje lomp, maar hij bedoelt het allemaal goed."
 },
 {
  "naam": "Daffia",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0026.jpg"
  ],
  "tekst": "Daffia is een lieve grote merrie. Ze is een fijn paard ook voor onze grotere ruiters. Daffia is lief en rustig op stal en is altijd blij met aandacht. Met rijden is zij stabiel en betrouwbaar voor onze beginnende ruiters. De ervaren ruiters laat Daffia graag eerst even hard werken, daarna doet ze alles voor je. Met buitenritten is ze een echte topper."
 },
 {
  "naam": "Daisybell",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0077.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0089.jpg"
  ],
  "tekst": "Daisybell is een lieve pony in de stal die graag uitgebreid gepoetst wordt door haar ruiters. Voor de beginnende ruiters is zij een super fijne, brave pony die ook nog eens erg lekker en stabiel zit. Bij de meer ervaren ruiters kan Daisybell nog wel eens een grapje proberen uit te halen door iets te versnellen of de andere kant op te gaan dan de bedoeling is. Met de buitenritten is Daisybell een van de stabielste en rustigste pony´s. Zij heeft dan ook veel fans bij ons op de manege."
 },
 {
  "naam": "Denoah",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/69440485-29e5-4f9b-8cdb-e6591a3d1cfd.jpeg"
  ],
  "tekst": "Lieve knappe Denoah maakt alle ruiters op de manege blij. Denoah is een echte alleskunner. Hij heeft een goede basis in de dressuur, springt goed en gaat graag mee op de buitenritten. Hij is lief en rustig in de stal en met rijden. Denoah is een goede pony om de balans en je zit op te oefenen, hij maakt mooie grote bewegingen. Denoah is de beste vriend van Noeska, waar hij altijd mee buiten speelt."
 },
 {
  "naam": "Desperado",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20230921-WA0013.jpg"
  ],
  "tekst": "Desperado is een echte dressuurkanjer. Opgeleid tot Z niveau kan hij onze ruiters veel leren. Hij zit iets minder vlak, waardoor ruiters echt hun balans en souplesse moeten aanspreken. Buitenritten vindt hij fantastisch. Altijd de oortjes vooruit."
 },
 {
  "naam": "Dino",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0102.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0101.jpg"
  ],
  "tekst": "Dino is een super lieve pony. Op de manege van iedereen een favoriet. Hij is altijd vrolijk en heeft er altijd zin in. Of het nou rijden in de bak is, buitenrijden of een parcours springen is, Dino geeft altijd 110% aan zijn ruiters en zal altijd goed luisteren. Hij wordt ook graag vertroeteld en gepoetst. Naast het rijden wordt Dino ook erg gelukkig van spelen en stoeien in de paddock met zijn beste vrienden Jack en Vulcan."
 },
 {
  "naam": "Elton",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0054.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0071.jpg"
  ],
  "tekst": "Elton heeft in zijn leven al veel meegemaakt. Hij heeft dan ook echt moeten wennen aan tussen andere paarden zijn en bij mensen zijn. Dat doet hij nu supergoed. Hij heeft al echt een maatje aan Boris als hij buitenstaat. In stal moet je de tijd nemen en hem rustig benaderen. hij wordt graag op de poetsplaats gepoetst en gezadeld, mensen in zijn stal vindt hij minder prettig. In het rijden is hij rustig, hij vindt het wel fijn als zijn ruiter de handen rustig houdt. Elton is in de dressuur tot L-niveau opgeleid, maakt graag een buitenrit en wordt enthousiast als hij mee mag doen in de springlessen."
 },
 {
  "naam": "Estherette",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/2025041612403688.jpg"
  ],
  "tekst": "Estherette is een ervaren merrie die allround is. Springen vindt ze geweldig en wordt daarvan enthousiast. Op buitenritten is ze super betrouwbaar. Met rijden in de rijbaan wil ze je wel eens uitproberen met hoeken afsnijden en langzaam gaan."
 },
 {
  "naam": "First Impression",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20230918-WA0068.jpg"
  ],
  "tekst": "First Impression is een paard dat op Z niveau opgeleid is. Hij loopt mee in ons Z viertal Kür op muziek. Ook een parcours springen is voor First Impression geen enkel probleem, en vindt hij fantastisch om te doen. In de lessen is hij voor de ervaren ruiters erg leuk. Je kunt veel leren van hem. In de stal is First een echt knuffel paard, dat graag lang gepoetst en gekriebeld wordt, hij doet in de paddock dan ook graag extra moeite om zich lekker vies te maken."
 },
 {
  "naam": "Foramé",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0014.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0019.jpg"
  ],
  "tekst": "Forame is lieve ruin. Hij staat altijd klaar om ruiters te leren paardrijden. Hij is opgeleid op dressuurniveau L2. Stabiel en rustig wat rust geeft in het paardrijden. Op stal ook een lief paard. Hij vind het grappig zijn hoofd hoog te houden als je het hoofdstel aandoet. Hij kijkt je dan met twinkelende ogen aan."
 },
 {
  "naam": "Freckles",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0033.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0032.jpg"
  ],
  "tekst": "Freckles vind het heerlijk als je hem poetst en knuffelt. Hij maakt zich dan ook graag extra vies, zodat hij extra lang gepoetst kan worden. Hij is een echte goedzak. Hij geeft zijn ruiters vertrouwen door zijn rust. Rijden in de bak, buitenrijden, springen, hij doet alles voor zijn ruiters. Zowel de beginnende als de meer ervaren ruiters kunnen fijn met hem rijden."
 },
 {
  "naam": "Glennfeddich",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/20241210_115124.png"
  ],
  "tekst": "Glennfeddich is een ervaren sportruin, die hoog opgeleid is in de dressuur. Hij is erg leuk voor onze meer ervaren ruiters. Hij is een goede spiegel voor de ruiter. Hij loopt geweldig als de ruiter het goed doet en laat bij spiegelt de ruiter bij rijfouten. Op buitenrit is hij enthousiast en voorwaarts. Een echte turbo onder de paarden."
 },
 {
  "naam": "Gooley",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/Gooley.jpeg"
  ],
  "tekst": "Gooley is een erg lieve pony, die iedereen altijd vriendelijk in haar stal begroet . Wel houdt ze ervan als haar ruiters rustig met haar omgaan. In het rijden vraagt Gooley een ervaren ruiter die haar rustige en duidelijke hulpen kan geven. Gooley kan leuk dressuren en maakt graag een sprongetje."
 },
 {
  "naam": "Gotawhisper",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/2025041614324385.jpg"
  ],
  "tekst": "Gotawhisper is een rustige ierse ruin. Hij is getraind op L niveau. Een fijn allround paard, die rustig en stabiel is in zijn rijden en op stal."
 },
 {
  "naam": "Gruhling",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0020.jpg"
  ],
  "tekst": "Gruhling is een lieve, sensibele merrie. Ze is een zacht en vriendelijk paard dat graag lekker gepoetst wordt en aandacht krijgt. In het rijden vraagt ze een ruiter die haar goed begeleid en haar zelfvertrouwen geeft. Kan je dit als ruiter, dan doet ze alles voor je, en ze zit ook nog eens heerlijk. Springen kan ze als de beste, ze zal dan ook nooit een hindernis weigeren. Buitenritten doet Gruhling graag, maar wel in de groep veilig achter een ander paard aan. Een super fijn paard om veel op te leren voor de ervaren ruiters."
 },
 {
  "naam": "Harley",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0073.jpg"
  ],
  "tekst": "Harley is een lief en rustig paard waar iedere ruiter blij van wordt. In de stal kan hij soms een beetje grumpie kijken, maar hier bedoelt hij eigenlijk niets mee. Hij houdt van rust in zijn stal en niet teveel gedoe om hem heen. In het rijden super betrouwbaar. Hij is tot M niveau dressuur opgeleid en gaat graag mee op buitenritten waar hij stabiel en rustig is. Een lieve, knappe grote jongen."
 },
 {
  "naam": "Haut Brion",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/20251109230609001.jpg"
  ],
  "tekst": "Haut Brion is een actieve ruin, die fijn aan de hulpen is en dressuurmatig goed opgeleid is. Hij is aanwezig en nieuwsgierig en heeft energie genoeg. Rijden maakt hem altijd blij. Onze instructeur Kyra rijdt ook met hem in het viertal Kür op Muziek."
 },
 {
  "naam": "Henk",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2025/07/2025041614565817.jpg"
  ],
  "tekst": "Henk is een jonge grotere pony. Vanwege zijn leeftijd loopt hij vooral mee in de ervaren ponylessen. Hij is lief en betrouwbaar. Onze ruiters kunnen veel van hem leren, en Henk ook van onze ruiters. Henk kan leuk dressuren, kan goed springen en gaat graag mee op buitenritten. Naast het rijden is Henk graag aan het spelen en stoeien met Jack en Dino in de paddock."
 },
 {
  "naam": "Holbe",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/Schermafbeelding-2020-12-09-152236.jpg"
  ],
  "tekst": "Holbe is een super mooie Friese hengst. Een echte knuffelkont die houdt van uren poetsen, vlechten en knuffelen. Hij is lief en betrouwbaar in de lessen, maar doet het wel graag rustig aan op zijn eigen tempo. Van buitentritten wordt hij het gelukkigst."
 },
 {
  "naam": "Houdini",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2025/07/IMG-20250304-WA0012.jpg"
  ],
  "tekst": "Houdini is een mooie actieve Welsh pony. Hij is graag voor onze ruiters aan het werk en doet altijd goed zijn best. Hij is zit fijn stabiel en is dan ook een top pony voor onze kleinste ruiters. Springen kan hij goed en doet hij graag. Dressuurmatig is hij tot L niveau opgeleid. Voor onze kleinere ervaren ruiters een goede leerpony. Van een buitenrit maken wordt hij enthousiast."
 },
 {
  "naam": "Ini",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0019.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0020.jpg"
  ],
  "tekst": "Ini heeft het karakter wat bij kleine, welsh a pony’s hoort. Superlief in de stal. Stabiel om op te zitten met een gezonde eigenwijsheid erbij. Als je haar kent, is het een echt lieve pony."
 },
 {
  "naam": "Jack",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0034.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0056.jpg"
  ],
  "tekst": "Jack is wolf in schaapskleren. Superlief en braaf voor de beginnende ruiters. Ondeugend voor de ervaren ruiters. Een echte alleskunner. Hij leert kinderen goed rijden en springt als de beste. Met een buitenrit maak je hem blij."
 },
 {
  "naam": "Laila",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0062.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0076.jpg"
  ],
  "tekst": "Laila is een mooi damespaard die zowel voor de oudere jeugd als de kleinere volwassenen een erg fijn paardje is om mee te rijden. In de stal kan zij een echte diva zijn en vraagt zij om rust en duidelijkheid. Laila houdt ervan om te weten waar ze aan toe is. Laila doet in het rijden altijd goed haar best en is een echte alleskunner, dressuur, buitenrijden, springen kan ze allemaal even goed. Ze is rustig en stabiel en geeft je de tijd om alles te leren."
 },
 {
  "naam": "Legend",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0079.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0064.jpg"
  ],
  "tekst": "Legend is een grote lieve reus, het grootste paard van de manege. Legend zit erg vlak en stabiel, waardoor je tijdens het rijden eigenlijk niet merkt dat hij zo groot is. Legend is een echt dressuur paard, met hindernissen hoef je bij hem niet aan te komen, daar snapt hij niets van. Wel gaat hij graag mee op een buitenrit, stoer is hij niet, hij loopt graag achter de andere paarden aan. Hij is een echte lieverd in het rijden en kent alle dressuur oefeningen tot M niveau. Hij vraagt wel een ruiter die rustig is in de handen om deze oefeningen ook te kunnen rijden."
 },
 {
  "naam": "Llinos",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20230918-WA0044.jpg"
  ],
  "tekst": "Llinos is een leuke Welsh a pony. Wil graag voor je werken met een lichte eigenwijsheid daarbij. Op buitenrit is ze een blije gup die onderweg ook wel graag van het gras en de boompjes snoept. In de kabouterlessen hebben we haar er graag bij."
 },
 {
  "naam": "Maddox",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0052.jpg"
  ],
  "tekst": "Maddox is fijne pony voor de grotere kinderen in de ponylessen. Hij wil altijd voor je werken. In stal een lieve rustige pony, die graag aandacht krijgt en gepoetst wordt. Spelletjes in de lessen maken hem blij. Van springen wordt hij enthousiast, dit doet hij graag. Op een buitenrit is Maddox een van de allerfijnste om op de rijden."
 },
 {
  "naam": "Misty",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/82907482-65c0-4bd3-a340-c0b7f72dbdf6.jpeg"
  ],
  "tekst": "Misty is nog een jongere pony, maar doet het al super goed in de lessen. Op dit moment wordt zij nog door de meer ervaren pony ruiters gereden. Zo kan Misty rustig alles van het ponyrijden in de manege lessen leren. Misty is heel open en nieuwsgierig in de stal en is blij als ze aandacht krijgt. In het rijden is de rustig en doet ze goed haar best."
 },
 {
  "naam": "O’Lilly",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/VID-20250501-WA0000.jpg"
  ],
  "tekst": "O’Lilly is een jonge merrie met veel talent voor dressuur. In onze manege heeft ze ook kennis mogen maken met springen en dit gaat ze steeds leuker vinden en ook steeds beter doen. Ze is opgeleid als top dressuurmerrie en daardoor kun je als ruiter veel van haar leren als je wilt."
 },
 {
  "naam": "Paddy",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0002.jpg"
  ],
  "tekst": "Paddy is een lieve connemara ruin. Super lief in de stal, hij vindt het altijd fijn als je even met hem komt knuffelen of poetsen. Hij zorgt er in de paddock dan ook graag voor dat hij extra vies wordt, zodat ruiters lekker lang met hem bezig zijn. Met rijden doet hij altijd zijn uiterste best. Hij geeft alle ruiters veel vertrouwen. Paddy is een echte alleskunner die ook alles even leuk vindt. Van buitenrijden, dressuur rijden, working equitation hindernissen of springen. Hij wordt overal even enthousiast van. Paddy is voor onze grotere pony ruiters of kleinere volwassenen dan ook een echte topper."
 },
 {
  "naam": "Paraguay",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20230921-WA0025.jpg"
  ],
  "tekst": "Paraguay is ons oudste paard. Zij is van 12-02-1988. Als je haar ziet geef je haar deze leeftijd niet. Ook in het rijden is ze nog steeds een bommetje energie. Met bewegen maak ja haar blij, zowel in dressuur, springen als in een buitenrit."
 },
 {
  "naam": "Peanut",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/2025042322142181.jpg"
  ],
  "tekst": "Peanut is een nog jonge pony, die de nodige energie heeft. Voor de ervaren ruiters een leuke uitdaging. Peanut wil haar grenzen namelijk nog wel eens opzoeken."
 },
 {
  "naam": "Penny’s Gem",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0042.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0049.jpg"
  ],
  "tekst": "Penny’s Gem is een mooie stevige Wesh Cob. Een lieve eigenwijze dame waar onze ruiters graag op rijden. Ze vraagt onze ruiters duidelijk en rustig met haar om te gaan, dan doet ze alles voor je. Ook Penny maak je met een buitenrit erg blij."
 },
 {
  "naam": "Pippie",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/03/IMG-20260329-WA0030.png"
  ],
  "tekst": "Pippie is een lieve jonge arabische merrie. Een echte knapzak. Ze zal altijd voor je werken en voor onze ervaren ruiters is het erg leuk om met haar te groeien. Voor onze minder ervaren ruiters is ze erg lief. Van haar ruiter vraagt ze een duidelijke kalme begeleiding."
 },
 {
  "naam": "Popcorn Hidalgo",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2025/07/2025042322171341.jpg"
  ],
  "tekst": "Popcorn is een lieve jonge Tinker ruin. Hij is fijn actief in het rijden en natuurlijk zoals dat bij een Tinker hoort af en toe een tikkeltje eigenwijs. Hij is stoer en niet snel van dingen onder de indruk. Voor onze kleinste ruiters heel betrouwbaar en een leuke uitdaging voor de meer ervaren ruiters. Met zijn mooie zilvere kleur met stippen is hij een leuke pony om te zien."
 },
 {
  "naam": "Quintin",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230921-WA0016.jpg"
  ],
  "tekst": "Quintin is een lief en rustig paard die iedere ruiter vertrouwen geeft. Hij is tot M niveau in de dressuur opgeleid, maakt graag een sprongetje en is super betrouwbaar op een buitenrit. Kortom een paard waar iedereen blij van wordt om mee te rijden. In de stal is hij altijd vriendelijk en geduldig, hij kan genieten van een lange poetsbeurt."
 },
 {
  "naam": "Roxanne du Rosier",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/20240925_210704.jpg"
  ],
  "tekst": "Roxanne is een lief en zacht paard op stal en betrouwbaar en actief in het rijden. Van springen krijg je haar erg enthousiast en op buitenrit is ze betrouwbaar voor iedere ruiter."
 },
 {
  "naam": "Shetlanders",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0045.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0057.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0050.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200824-WA0051.jpg"
  ],
  "tekst": "Op onze manege hebben we ook een shetlandergroep. De shetlanders zetten we in voor kinderfeestjes, ponydagen, ponykampen. Er zijn Erica, Laurey, Brammetje, Ushi, Tutti en Twinkel. Zij wonen samen in een paddock met 2 grote loopstallen."
 },
 {
  "naam": "Sky",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/Screenshot_20220409-181020_Marktplaats.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/Screenshot_20220409-181031_Marktplaats.jpg"
  ],
  "tekst": "Sky staat graag buiten met zijn vrienden in de buitenstal. Freckles is daar zijn beste vriend. Een goede poetsbeurt maakt hem blij. In het rijden een eigenwijze jongen, die als er meer van hem gevraagd wordt verwacht dat zijn ruiter de juiste hulpen geeft. Sky maakt het liefst een lekker lange bos rit, maar ook een parcours springen vindt hij leuk om te doen. Met zijn mooie kleur valt hij erg op tussen alle andere pony’s."
 },
 {
  "naam": "Slechtweervandaag",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0075.jpg"
  ],
  "tekst": "Slechtweervandaag is een erg lieve merrie. Ze kan onze ervaren ruiters veel leren in het springen en dressuur, voor onze beginnende ruiters is zij erg rustig en zit ze ook heel stabiel. Slechtweervandaag wordt erg blij als zij mee voorop mag op een buitenrit."
 },
 {
  "naam": "Stardust",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0085.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/IMG-20230918-WA0059.jpg"
  ],
  "tekst": "Stardust is een echte schat en doet altijd haar uiterste best voor haar ruiter. Zij is erg fijn in dressuurlessen en gaat ook graag mee op een buitenrit. Op buitenrit gaat zij het liefst mee zwemmen in het water. Zeker de beginnende ruiters zitten graag op Stardust omdat ze altijd zo fijn luistert en makkelijk zit in stap, draf en galop. De beste vriendin van Stardust is Tilly, zij zijn met het buitenspelen dan ook onafscheidelijk, en lijken in uiterlijk ook nog eens best veel op elkaar."
 },
 {
  "naam": "Suus",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/20241124_143150.jpg"
  ],
  "tekst": "Suus is een stevige robuuste merrie, die betrouwbaar is in het rijden. Ze kan wat divagedrag hebben, maar als je rustig blijft en contact zoekt is het een lieve dame. Ze is heel allround inzetbaar. Een echte alleskunner."
 },
 {
  "naam": "Tilly",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0011.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0024.jpg"
  ],
  "tekst": "Onze Tilly weet waar ze wil lopen en gaat daarvoor. Degenen uit de ervaren lessen die haar weten te overtuigen hebben een top pony aan haar. Voor onze kabouters en beginners is ze superfijn en loopt ze graag. Tilly zit heel stabiel in de draf en galop. Op een buitenrit kan je geen fijnere pony wensen."
 },
 {
  "naam": "Tony’s Pet",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2012/05/IMG_2998.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2012/05/IMG_3012.jpg"
  ],
  "tekst": "Tony’s Pet is een fijne pony voor alle ruiters. Ze wil altijd voor je werken. Op stal is het een lieve knuffel. Altijd goedgehumeurd. Van een buitenrit kan ze echt genieten en ook een sprongetje maken doet ze graag."
 },
 {
  "naam": "Twix",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/IMG-20250429-WA0012.jpg"
  ],
  "tekst": "Twix is een hele knappe Welsh merrie. Zoals bij Welsh pony’s hoort, wil zij altijd hard werken voor je. Twix vindt springen heel leuk, maar heeft daar wel een ruiter met rustige zit en stille hand bij nodig. Op buitenrit is zij vrolijk en lief."
 },
 {
  "naam": "Vulcan",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0046.jpg",
   "https://www.manegehooidonk.nl/wp-content/uploads/2020/08/IMG-20200823-WA0047.jpg"
  ],
  "tekst": "Onze Vulcan is een echte schat en ook nog supermooi. Altijd goedgemutst en iedereen kan er mee overweg. Een knuffel in de stal en een topper in het rijden. Voor de kabouters en beginnende ruiters is hij super betrouwbaar en doet hij altijd goed zijn best. Als er door de ervaren ruiters meer van hem gevraagd wordt, wil hij nog wel eens zijn pit laten zien en extra laten zien wat hij kan. Vulcan is bij de F-proeven wedstrijden dan ook de grote favoriet van alle ruiters."
 },
 {
  "naam": "Wish",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2026/01/20241210_115323.png"
  ],
  "tekst": "Wish is een open, vrolijk paard. Hij geniet van aandacht. Wish is opgeleid als dressuurpaard op Z niveau. Hij is een goed leerpaard met geduld om de ruiters de kans te geven dat zij leren. Met het buitenstaan speelt hij graag met de andere paarden,"
 },
 {
  "naam": "Wonderboy",
  "fotos": [
   "https://www.manegehooidonk.nl/wp-content/uploads/2024/04/7d20a066-ff80-462a-b31f-fda7a85d1bdc.jpeg"
  ],
  "tekst": "Wonderboy is een energieke, vrolijke en lieve jongen. Hij kent de dressuur oefeningen op M niveau en maakt graag een buitenrit. Vanwege de energie van Wonderboy is hij een paard voor de meer ervaren ruiters. Hij is met lichte hulpen fijn te rijden. Wonderboy is een echte knuffel op stal en is overal graag bij. Een eerlijk en fijn paard die onze ervaren ruiters veel kan leren."
 }
];
