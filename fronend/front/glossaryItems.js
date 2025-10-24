const glossaryItems = [
    {
        "term": "Cannabis",
        "termUr": "بھنگ",
        "definition": "A plant that produces marijuana, charas, and hashish; illegal to grow without license",
        "definitionUr": "ایک پودا جو ماری جوانا، چرس اور حشیش پیدا کرتا ہے؛ بغیر لائسنس کے اگانا غیر قانونی ہے",
        "category": "narcotics-laws"
    },
    {
        "term": "Charas",
        "termUr": "چرس",
        "definition": "Cannabis resin product; illegal narcotic drug in Pakistan",
        "definitionUr": "بھنگ کی رال سے بنی مصنوعات؛ پاکستان میں غیر قانونی منشیات",
        "category": "narcotics-laws"
    },
    {
        "term": "Coca Plant",
        "termUr": "کوکا پلانٹ",
        "definition": "Plant used to produce cocaine; illegal to cultivate",
        "definitionUr": "کوکین بنانے کے لیے استعمال ہونے والا پودا؛ کاشت کرنا غیر قانونی ہے",
        "category": "narcotics-laws"
    },
    {
        "term": "Controlled Substance",
        "termUr": "کنٹرولڈ مادہ",
        "definition": "Any drug or chemical regulated by law due to potential for abuse",
        "definitionUr": "کوئی بھی دوا یا کیمیکل جو غلط استعمال کی صلاحیت کی وجہ سے قانون کے تحت ریگولیٹ ہو",
        "category": "narcotics-laws"
    },
    {
        "term": "Cultivation",
        "termUr": "کاشت کاری",
        "definition": "Growing, planting, or farming drug-producing plants",
        "definitionUr": "منشیات پیدا کرنے والے پودوں کو اگانا، لگانا یا کاشت کرنا",
        "category": "narcotics-laws"
    },
    {
        "term": "Drug Lab",
        "termUr": "منشیات لیبارٹری",
        "definition": "Illegal facility where drugs are manufactured or processed",
        "definitionUr": "غیر قانونی سہولت جہاں منشیات تیار یا پروسیس کی جاتی ہیں",
        "category": "narcotics-laws"
    },
    {
        "term": "Drug Trafficking",
        "termUr": "منشیات کی سمگلنگ",
        "definition": "Buying, selling, transporting, or distributing illegal drugs",
        "definitionUr": "غیر قانونی منشیات کی خرید و فروخت، نقل و حمل یا تقسیم",
        "category": "narcotics-laws"
    },
    {
        "term": "Hashish",
        "termUr": "حشیش",
        "definition": "Drug made from cannabis plant resin",
        "definitionUr": "بھنگ کے پودے کی رال سے بنی منشیات",
        "category": "narcotics-laws"
    },
    {
        "term": "Heroin",
        "termUr": "ہیروئن",
        "definition": "Highly addictive narcotic drug derived from opium; strictly illegal",
        "definitionUr": "افیم سے حاصل ہونے والی انتہائی لت لگانے والی منشیات؛ سختی سے غیر قانونی",
        "category": "narcotics-laws"
    },
    {
        "term": "ICE (Methamphetamine)",
        "termUr": "آئس (میٹھیمفیٹامائن)",
        "definition": "Powerful synthetic stimulant drug; illegal psychotropic substance",
        "definitionUr": "طاقتور مصنوعی محرک منشیات؛ غیر قانونی نفسیاتی مادہ",
        "category": "narcotics-laws"
    },
    {
        "term": "Manufacturing",
        "termUr": "تیاری",
        "definition": "Making, producing, or processing illegal drugs",
        "definitionUr": "غیر قانونی منشیات بنانا، تیار کرنا یا پروسیس کرنا",
        "category": "narcotics-laws"
    },
    {
        "term": "MDMA (Ecstasy)",
        "termUr": "ایم ڈی ایم اے (ایکسٹیسی)",
        "definition": "Synthetic party drug; illegal psychotropic substance",
        "definitionUr": "سنتھیٹک پارٹی ڈرگ؛ غیر قانونی نفسیاتی مادہ",
        "category": "narcotics-laws"
    },
    {
        "term": "Money Laundering",
        "termUr": "منی لانڈرنگ",
        "definition": "Hiding the source of illegally obtained money, often from drug sales",
        "definitionUr": "غیر قانونی طور پر حاصل کیے گئے پیسوں کا ماخذ چھپانا، اکثر منشیات کی فروخت سے",
        "category": "narcotics-laws"
    },
    {
        "term": "Narcotics",
        "termUr": "نشہ آور ادویات",
        "definition": "Drugs that dull senses and can cause addiction; regulated by law",
        "definitionUr": "ایسی دوائیں جو حواس کو مدھم کرتی ہیں اور لت کا سبب بن سکتی ہیں؛ قانون کے تحت ریگولیٹ ہوتی ہیں",
        "category": "narcotics-laws"
    },
    {
        "term": "Opium",
        "termUr": "افیم",
        "definition": "Narcotic drug derived from poppy plant; illegal without authorization",
        "definitionUr": "خشخاش کے پودے سے حاصل ہونے والی نشہ آور دوا؛ بغیر اجازت کے غیر قانونی",
        "category": "narcotics-laws"
    },
    {
        "term": "Poppy Plant",
        "termUr": "خشخاش کا پودا",
        "definition": "Plant that produces opium; illegal to grow without license",
        "definitionUr": "وہ پودا جو افیم پیدا کرتا ہے؛ بغیر لائسنس کے اگانا غیر قانونی ہے",
        "category": "narcotics-laws"
    },
    {
        "term": "Precursor Chemicals",
        "termUr": "پریکرسر کیمیکلز",
        "definition": "Legal chemicals that can be used to manufacture illegal drugs",
        "definitionUr": "قانونی کیمیکلز جو غیر قانونی منشیات بنانے کے لیے استعمال ہو سکتے ہیں",
        "category": "narcotics-laws"
    },
    {
        "term": "Psychotropic Substances",
        "termUr": "نفسیاتی مادے",
        "definition": "Mind-altering drugs that affect brain function and mood",
        "definitionUr": "ذہن تبدیل کرنے والی دوائیں جو دماغی کام اور موڈ کو متاثر کرتی ہیں",
        "category": "narcotics-laws"
    },
    {
        "term": "Synthetic Drugs",
        "termUr": "سنتھیٹک منشیات",
        "definition": "Artificially created drugs made in laboratories",
        "definitionUr": "لیبارٹریز میں مصنوعی طور پر بنائی گئی منشیات",
        "category": "narcotics-laws"
    },
    {
        "term": "Beneficial Owner",
        "termUr": "حقیقی مالک",
        "definition": "The real person who ultimately owns or controls property or money",
        "definitionUr": "حقیقی شخص جو بالآخر جائیداد یا پیسے کا مالک یا کنٹرولر ہے",
        "category": "narcotics-laws"
    },
    {
        "term": "Financial Institution",
        "termUr": "مالیاتی ادارہ",
        "definition": "Banks and other organizations that handle money transactions",
        "definitionUr": "بینک اور دیگر تنظیمیں جو مالی لین دین کو ہینڈل کرتی ہیں",
        "category": "narcotics-laws"
    },
    {
        "term": "Suspicious Transaction",
        "termUr": "مشکوک لین دین",
        "definition": "Unusual financial activity that may indicate criminal activity",
        "definitionUr": "غیر معمولی مالی سرگرمی جو مجرمانہ سرگرمی کی نشاندہی کر سکتی ہے",
        "category": "narcotics-laws"
    },
    {
        "term": "Transaction Monitoring",
        "termUr": "لین دین کی نگرانی",
        "definition": "Watching financial activities to detect illegal operations",
        "definitionUr": "غیر قانونی آپریشنز کا پتہ لگانے کے لیے مالی سرگرمیوں پر نظر رکھنا",
        "category": "narcotics-laws"
    },
    {
        "term": "Abetment",
        "termUr": "اعانت",
        "definition": "Helping, encouraging, or assisting someone to commit a crime",
        "definitionUr": "کسی کو جرم کرنے میں مدد، حوصلہ افزائی یا معاونت فراہم کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Accused",
        "termUr": "ملزم",
        "definition": "Person charged with committing a crime",
        "definitionUr": "وہ شخص جس پر جرم کا ارتکاب کرنے کا الزام لگایا گیا ہو",
        "category": "criminal-laws"
    },
    {
        "term": "Acquittal",
        "termUr": "بریت",
        "definition": "Court decision declaring someone not guilty",
        "definitionUr": "عدالت کا فیصلہ جس میں کسی کو بے قصور قرار دیا جاتا ہے",
        "category": "criminal-laws"
    },
    {
        "term": "Assault",
        "termUr": "حملہ",
        "definition": "Intentionally causing physical harm or threatening harm to someone",
        "definitionUr": "جان بوجھ کر کسی کو جسمانی نقصان پہنچانا یا نقصان کی دھمکی دینا",
        "category": "criminal-laws"
    },
    {
        "term": "Bail",
        "termUr": "ضمانت",
        "definition": "Temporary release from custody while awaiting trial",
        "definitionUr": "مقدمے کا انتظار کرتے ہوئے حراست سے عارضی رہائی",
        "category": "criminal-laws"
    },
    {
        "term": "Conviction",
        "termUr": "سزا",
        "definition": "Formal court declaration that someone is guilty",
        "definitionUr": "عدالت کی رسمی قرارداد کہ کوئی شخص قصوروار ہے",
        "category": "criminal-laws"
    },
    {
        "term": "Culpable Homicide",
        "termUr": "قابل مواخذہ قتل",
        "definition": "Causing death with some criminal intent, less severe than murder",
        "definitionUr": "کچھ مجرمانہ ارادے کے ساتھ موت کا سبب بننا، قتل سے کم شدید",
        "category": "criminal-laws"
    },
    {
        "term": "Defendant",
        "termUr": "مدعا علیہ",
        "definition": "Person accused of crime who must defend themselves in court",
        "definitionUr": "وہ شخص جس پر جرم کا الزام ہے اور جسے عدالت میں اپنا دفاع کرنا ہوگا",
        "category": "criminal-laws"
    },
    {
        "term": "Detention",
        "termUr": "نظر بندی",
        "definition": "Holding someone in custody by police or authorities",
        "definitionUr": "پولیس یا حکام کی طرف سے کسی کو حراست میں رکھنا",
        "category": "criminal-laws"
    },
    {
        "term": "Fine",
        "termUr": "جرمانہ",
        "definition": "Money paid as punishment for breaking a law",
        "definitionUr": "قانون توڑنے کی سزا کے طور پر ادا کی جانے والی رقم",
        "category": "criminal-laws"
    },
    {
        "term": "Arsh",
        "termUr": "ارش",
        "definition": "Fixed compensation amounts for specific injuries under Islamic law",
        "definitionUr": "اسلامی قانون کے تحت مخصوص چوٹوں کے لیے مقررہ معاوضہ کی رقم",
        "category": "criminal-laws"
    },
    {
        "term": "Diyat",
        "termUr": "دیت",
        "definition": "Blood money; compensation paid to victim's family in murder or injury cases",
        "definitionUr": "خون بہا؛ قتل یا چوٹ کے معاملات میں متاثرہ کے خاندان کو ادا کیا جانے والا معاوضہ",
        "category": "criminal-laws"
    },
    {
        "term": "Qatl-i-And",
        "termUr": "قتل عمد",
        "definition": "Intentional murder under Islamic law",
        "definitionUr": "اسلامی قانون کے تحت جان بوجھ کر قتل",
        "category": "criminal-laws"
    },
    {
        "term": "Qatl-i-Khata",
        "termUr": "قتل خطا",
        "definition": "Accidental killing or killing by mistake",
        "definitionUr": "حادثاتی قتل یا غلطی سے قتل",
        "category": "criminal-laws"
    },
    {
        "term": "Qisas",
        "termUr": "قصاص",
        "definition": "Islamic law concept of equal retaliation; 'eye for an eye' punishment",
        "definitionUr": "اسلامی قانون کا تصور برابری کے بدلے کا؛ 'آنکھ کے بدلے آنکھ' کی سزا",
        "category": "criminal-laws"
    },
    {
        "term": "Wali",
        "termUr": "ولی",
        "definition": "Legal heir of murder victim who can demand qisas or accept diyat",
        "definitionUr": "قتل کے متاثرہ کا قانونی وارث جو قصاص کا مطالبہ کر سکتا ہے یا دیت قبول کر سکتا ہے",
        "category": "criminal-laws"
    },
    {
        "term": "Acid Attack",
        "termUr": "تیزاب گردی",
        "definition": "Throwing corrosive chemicals on someone to injure or disfigure",
        "definitionUr": "کسی کو زخمی یا بدصورت بنانے کے لیے کوروسیو کیمیکلز پھینکنا",
        "category": "criminal-laws"
    },
    {
        "term": "Domestic Violence",
        "termUr": "گھریلو تشدد",
        "definition": "Physical, sexual, mental, or economic abuse at home",
        "definitionUr": "گھر پر جسمانی، جنسی، ذہنی یا معاشی زیادتی",
        "category": "criminal-laws"
    },
    {
        "term": "Honor Killing",
        "termUr": "غیرت کے نام پر قتل",
        "definition": "Murdering family member, especially women, for perceived dishonor",
        "definitionUr": "خاندان کے رکن، خاص طور پر خواتین کو، غیرت کے نام پر قتل کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Workplace Harassment",
        "termUr": "کام کی جگہ پر ہراسانی",
        "definition": "Unwanted sexual behavior or conduct at work",
        "definitionUr": "کام کی جگہ پر ناگوار جنسی رویہ یا سلوک",
        "category": "criminal-laws"
    },
    {
        "term": "Bonded Labor",
        "termUr": "قرض کی غلامی",
        "definition": "Forced labor where people work to repay debts across generations",
        "definitionUr": "جبری مشقت جہاں لوگ نسلوں میں قرضے چکانے کے لیے کام کرتے ہیں",
        "category": "criminal-laws"
    },
    {
        "term": "Child Labor",
        "termUr": "بچہ مزدوری",
        "definition": "Employing children under legal age or in dangerous work",
        "definitionUr": "قانونی عمر سے کم بچوں کو ملازمت دینا یا خطرناک کام میں لگانا",
        "category": "criminal-laws"
    },
    {
        "term": "Human Trafficking",
        "termUr": "انسانی سمگلنگ",
        "definition": "Moving people by force or deception to exploit them",
        "definitionUr": "لوگوں کو زبردستی یا دھوکے سے منتقل کر کے ان کا استحصال کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Kidnapping for Ransom",
        "termUr": "فدیے کے لیے اغوا",
        "definition": "Abducting someone and demanding money for release",
        "definitionUr": "کسی کو اغوا کرنا اور رہائی کے لیے پیسے کا مطالبہ کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Procuration",
        "termUr": "حصول",
        "definition": "Obtaining or taking someone for sexual exploitation",
        "definitionUr": "جنسی استحصال کے لیے کسی کو حاصل کرنا یا لے جانا",
        "category": "criminal-laws"
    },
    {
        "term": "Slavery",
        "termUr": "غلامی",
        "definition": "Treating humans as property that can be bought or sold",
        "definitionUr": "انسانوں کو جائیداد کے طور پر علاج کرنا جسے خریدا یا بیچا جا سکتا ہے",
        "category": "criminal-laws"
    },
    {
        "term": "Cheating",
        "termUr": "دھوکہ دہی",
        "definition": "Deceiving someone to make them give property or do something harmful",
        "definitionUr": "کسی کو دھوکہ دے کر جائیداد دینے یا کچھ نقصان دہ کام کرنے پر مجبور کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Cheating by Personation",
        "termUr": "جعلسازی کے ذریعے دھوکہ دہی",
        "definition": "Pretending to be someone else to commit fraud",
        "definitionUr": "دھوکہ دہی کے ارتکاب کے لیے کسی اور ہونے کا ڈرامہ کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Criminal Breach of Trust",
        "termUr": "امانت میں خیانت",
        "definition": "Dishonestly misusing property entrusted to your care",
        "definitionUr": "بے ایمانی سے آپ کی دیکھ بھال میں دی گئی جائیداد کا غلط استعمال",
        "category": "criminal-laws"
    },
    {
        "term": "Embezzlement",
        "termUr": "خرد برد",
        "definition": "Stealing money or property entrusted to you",
        "definitionUr": "آپ کے حوالے کیے گئے پیسے یا جائیداد کی چوری",
        "category": "criminal-laws"
    },
    {
        "term": "Extortion",
        "termUr": "بھتہ خوری",
        "definition": "Obtaining money or property by threatening harm",
        "definitionUr": "نقصان کی دھمکی دے کر پیسے یا جائیداد حاصل کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "False Evidence",
        "termUr": "جھوٹی گواہی",
        "definition": "Deliberately lying in court or legal proceedings",
        "definitionUr": "عدالت یا قانونی کارروائیوں میں جان بوجھ کر جھوٹ بولنا",
        "category": "criminal-laws"
    },
    {
        "term": "Forgery",
        "termUr": "جعلسازی",
        "definition": "Creating fake documents or altering real ones to deceive",
        "definitionUr": "دھوکہ دینے کے لیے جعلی دستاویزات بنانا یا اصلی میں تبدیلی کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Fraud",
        "termUr": "فراڈ",
        "definition": "Deliberately deceiving someone for money or unfair advantage",
        "definitionUr": "پیسے یا ناجائز فائدے کے لیے جان بوجھ کر کسی کو دھوکہ دینا",
        "category": "criminal-laws"
    },
    {
        "term": "Impersonation",
        "termUr": "جعلسازی",
        "definition": "Pretending to be another person to deceive",
        "definitionUr": "دھوکہ دینے کے لیے کسی دوسرے شخص ہونے کا ڈرامہ کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Blasphemy",
        "termUr": "توہین مذہب",
        "definition": "Speaking or acting disrespectfully toward God, religion, or sacred things",
        "definitionUr": "خدا، مذہب یا مقدس چیزوں کے بارے میں بے احترامی سے بولنا یا عمل کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Defiling",
        "termUr": "بے حرمتی",
        "definition": "Damaging or showing disrespect to holy objects",
        "definitionUr": "مقدس اشیاء کو نقصان پہنچانا یا بے احترامی کرنا",
        "category": "criminal-laws"
    },
    {
        "term": "Derogatory Remarks",
        "termUr": "توہین آمیز تبصرے",
        "definition": "Insulting or disrespectful statements",
        "definitionUr": "توہین آمیز یا بے احترامی کے بیانات",
        "category": "criminal-laws"
    },
    {
        "term": "Holy Quran",
        "termUr": "قرآن پاک",
        "definition": "Sacred book of Islam that must be respected",
        "definitionUr": "اسلام کی مقدس کتاب جس کا احترام ضروری ہے",
        "category": "criminal-laws"
    },
    {
        "term": "Prophet Muhammad (PBUH)",
        "termUr": "حضرت محمد ﷺ",
        "definition": "Final prophet in Islam whose honor is protected by law",
        "definitionUr": "اسلام کے آخری نبی جن کی عزت قانون کے ذریعے محفوظ ہے",
        "category": "criminal-laws"
    },
    {
        "term": "Conveyance",
        "termUr": "منتقلی",
        "definition": "Legal transfer of property ownership from one person to another",
        "definitionUr": "جائیداد کی ملکیت کا ایک شخص سے دوسرے شخص میں قانونی انتقال",
        "category": "property-laws"
    },
    {
        "term": "Deed",
        "termUr": "دستاویز",
        "definition": "Official legal document recording property transfer or agreement",
        "definitionUr": "سرکاری قانونی دستاویز جو جائیداد کی منتقلی یا معاہدے کو ریکارڈ کرتی ہے",
        "category": "property-laws"
    },
    {
        "term": "Immovable Property",
        "termUr": "غیر منقولہ جائیداد",
        "definition": "Land, buildings, and things permanently attached to land",
        "definitionUr": "زمین، عمارتیں اور زمین سے مستقل طور پر منسلک چیزیں",
        "category": "property-laws"
    },
    {
        "term": "Movable Property",
        "termUr": "منقولہ جائیداد",
        "definition": "Property that can be moved like vehicles, jewelry, furniture",
        "definitionUr": "جائیداد جو منتقل کی جا سکتی ہے جیسے گاڑیاں، زیورات، فرنیچر",
        "category": "property-laws"
    },
    {
        "term": "Title",
        "termUr": "ٹائٹل",
        "definition": "Legal ownership rights to property",
        "definitionUr": "جائیداد کے قانونی مالکانہ حقوق",
        "category": "property-laws"
    },
    {
        "term": "Transfer",
        "termUr": "منتقلی",
        "definition": "Moving ownership of property from one person to another",
        "definitionUr": "جائیداد کی ملکیت ایک شخص سے دوسرے شخص میں منتقل کرنا",
        "category": "property-laws"
    },
    {
        "term": "Consideration",
        "termUr": "عوض",
        "definition": "Payment or value given in exchange for property",
        "definitionUr": "جائیداد کے بدلے میں دی گئی ادائیگی یا قیمت",
        "category": "property-laws"
    },
    {
        "term": "Contingent Interest",
        "termUr": "شرطی مفاد",
        "definition": "Ownership right that only activates if certain conditions are met",
        "definitionUr": "مالکانہ حق جو صرف اس صورت میں فعال ہوتا ہے جب مخصوص شرائط پوری ہوں",
        "category": "property-laws"
    },
    {
        "term": "Easement",
        "termUr": "حق راستہ",
        "definition": "Legal right to use someone else's property for specific purpose",
        "definitionUr": "مخصوص مقصد کے لیے کسی دوسرے کی جائیداد استعمال کرنے کا قانونی حق",
        "category": "property-laws"
    },
    {
        "term": "Part Performance",
        "termUr": "جزوی کارکردگی",
        "definition": "Acting on contract by taking possession even without full registration",
        "definitionUr": "مکمل رجسٹریشن کے بغیر بھی قبضہ لے کر معاہدے پر عمل کرنا",
        "category": "property-laws"
    },
    {
        "term": "Registration",
        "termUr": "رجسٹریشن",
        "definition": "Official recording of property transfer with government",
        "definitionUr": "حکومت کے ساتھ جائیداد کی منتقلی کا سرکاری ریکارڈ",
        "category": "property-laws"
    },
    {
        "term": "Stamp Paper",
        "termUr": "سٹیمپ پیپر",
        "definition": "Special government paper with tax paid, required for legal documents",
        "definitionUr": "ٹیکس ادا شدہ خصوصی سرکاری کاغذ، قانونی دستاویزات کے لیے ضروری",
        "category": "property-laws"
    },
    {
        "term": "Vested Interest",
        "termUr": "مستقل مفاد",
        "definition": "Immediate existing ownership right that cannot be taken away",
        "definitionUr": "فوری موجودہ مالکانہ حق جو چھینا نہیں جا سکتا",
        "category": "property-laws"
    },
    {
        "term": "Charge",
        "termUr": "چارج",
        "definition": "Using property as security for debt, simpler than mortgage",
        "definitionUr": "قرض کے تحفظ کے لیے جائیداد کا استعمال، رہن سے آسان",
        "category": "property-laws"
    },
    {
        "term": "English Mortgage",
        "termUr": "انگریزی رہن",
        "definition": "Mortgage where lender gets complete ownership until loan is repaid",
        "definitionUr": "رہن جہاں قرض دہندہ کو قرض کی واپسی تک مکمل ملکیت مل جاتی ہے",
        "category": "property-laws"
    },
    {
        "term": "Foreclosure",
        "termUr": "فورکلوژر",
        "definition": "Legal process where lender takes property when borrower fails to pay",
        "definitionUr": "قانونی عمل جہاں قرض دہندہ جائیداد لے لیتا ہے جب قرض لینے والا ادائیگی میں ناکام ہو جاتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Lien",
        "termUr": "لیں",
        "definition": "Legal claim on property until debt is paid",
        "definitionUr": "قرض کی ادائیگی تک جائیداد پر قانونی دعویٰ",
        "category": "property-laws"
    },
    {
        "term": "Mortgage",
        "termUr": "رہن",
        "definition": "Using property as security for a loan",
        "definitionUr": "قرض کے تحفظ کے لیے جائیداد کا استعمال",
        "category": "property-laws"
    },
    {
        "term": "Mortgage by Conditional Sale",
        "termUr": "شرطی فروخت کے ذریعے رہن",
        "definition": "Arrangement that looks like sale but can be reversed by repaying loan",
        "definitionUr": "ایسی ترتیب جو فروخت جیسی لگتی ہے لیکن قرض واپس کر کے ختم کی جا سکتی ہے",
        "category": "property-laws"
    },
    {
        "term": "Mortgage by Deposit of Title",
        "termUr": "ٹائٹل جمع کروانے کے ذریعے رہن",
        "definition": "Securing loan by giving property documents to lender",
        "definitionUr": "قرض دہندہ کو جائیداد کی دستاویزات دے کر قرض کو محفوظ بنانا",
        "category": "property-laws"
    },
    {
        "term": "Mortgagee",
        "termUr": "رہن لینے والا",
        "definition": "Person or bank that lends money secured by mortgage",
        "definitionUr": "وہ شخص یا بینک جو رہن کے ذریعے محفوظ قرض دیتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Mortgagor",
        "termUr": "رہن رکھنے والا",
        "definition": "Person who borrows money using property as security",
        "definitionUr": "وہ شخص جو جائیداد کو تحفظ کے طور پر استعمال کرتے ہوئے قرض لیتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Redemption",
        "termUr": "واپسی",
        "definition": "Borrower's right to get property back by paying off loan",
        "definitionUr": "قرض لینے والے کا قرض ادا کر کے جائیداد واپس لینے کا حق",
        "category": "property-laws"
    },
    {
        "term": "Simple Mortgage",
        "termUr": "سادہ رہن",
        "definition": "Basic mortgage where borrower keeps possession while repaying",
        "definitionUr": "بنیادی رہن جہاں قرض لینے والا ادائیگی کرتے ہوئے قبضہ رکھتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Subrogation",
        "termUr": "جانشینی",
        "definition": "When someone pays another's debt and gets their legal rights",
        "definitionUr": "جب کوئی دوسرے کا قرض ادا کرتا ہے اور اس کے قانونی حقوق حاصل کر لیتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Exchange",
        "termUr": "تبادلہ",
        "definition": "Two people trading their properties with each other",
        "definitionUr": "دو افراد کا ایک دوسرے کے ساتھ اپنی جائیدادوں کا تبادلہ",
        "category": "property-laws"
    },
    {
        "term": "Gift",
        "termUr": "تحفہ",
        "definition": "Voluntarily giving property to someone without payment",
        "definitionUr": "ادائیگی کے بغیر رضاکارانہ طور پر کسی کو جائیداد دینا",
        "category": "property-laws"
    },
    {
        "term": "Lease",
        "termUr": "لیز",
        "definition": "Agreement allowing someone to use property for specific time for rent",
        "definitionUr": "معاہدہ جو کسی کو مخصوص وقت کے لیے کرایہ پر جائیداد استعمال کرنے کی اجازت دیتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Lessee/Tenant",
        "termUr": "کرایہ دار",
        "definition": "Person who rents and uses property",
        "definitionUr": "وہ شخص جو جائیداد کرائے پر لیتا ہے اور استعمال کرتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Lessor/Landlord",
        "termUr": "مالک مکان",
        "definition": "Property owner who rents to others",
        "definitionUr": "جائیداد کا مالک جو دوسروں کو کرائے پر دیتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Sale",
        "termUr": "فروخت",
        "definition": "Transferring property ownership in exchange for money",
        "definitionUr": "پیسے کے بدلے جائیداد کی ملکیت منتقل کرنا",
        "category": "property-laws"
    },
    {
        "term": "Seller/Vendor",
        "termUr": "فروخت کنندہ",
        "definition": "Person selling property",
        "definitionUr": "جائیداد فروخت کرنے والا شخص",
        "category": "property-laws"
    },
    {
        "term": "Buyer/Vendee",
        "termUr": "خریدار",
        "definition": "Person buying property",
        "definitionUr": "جائیداد خریدنے والا شخص",
        "category": "property-laws"
    },
    {
        "term": "Holding Over",
        "termUr": "قبضہ برقرار رکھنا",
        "definition": "Tenant staying after lease ends while landlord accepts rent",
        "definitionUr": "لیز ختم ہونے کے بعد کرایہ دار کا رہنا جبکہ مالک کرایہ قبول کرتا ہے",
        "category": "property-laws"
    },
    {
        "term": "Iddat",
        "termUr": "عدت",
        "definition": "Islamic waiting period woman must observe after divorce before remarriage",
        "definitionUr": "طلاق کے بعد اسلامی انتظار کی مدت جو عورت کو دوسری شادی سے پہلے گزارنی ہوتی ہے",
        "category": "property-laws"
    },
    {
        "term": "Rent",
        "termUr": "کرایہ",
        "definition": "Regular payment for using someone else's property",
        "definitionUr": "کسی دوسرے کی جائیداد استعمال کرنے کے لیے باقاعدہ ادائیگی",
        "category": "property-laws"
    },
    {
        "term": "Sublease",
        "termUr": "ذیلی لیز",
        "definition": "Tenant renting property to another person",
        "definitionUr": "کرایہ دار کا جائیداد کسی دوسرے شخص کو کرائے پر دینا",
        "category": "property-laws"
    },
    {
        "term": "Tenancy",
        "termUr": "کرایہ داری",
        "definition": "Legal relationship between landlord and tenant",
        "definitionUr": "مالک اور کرایہ دار کے درمیان قانونی تعلق",
        "category": "property-laws"
    },
    {
        "term": "Term",
        "termUr": "مدت",
        "definition": "Duration or length of lease agreement",
        "definitionUr": "لیز معاہدے کی مدت یا لمبائی",
        "category": "property-laws"
    },
    {
        "term": "Challan",
        "termUr": "چالان",
        "definition": "Traffic ticket issued for violations",
        "definitionUr": "خلاف ورزیوں کے لیے جاری کردہ ٹریفک ٹکٹ",
        "category": "traffic-laws"
    },
    {
        "term": "Driving License",
        "termUr": "ڈرائیونگ لائسنس",
        "definition": "Official permit to operate motor vehicles on public roads",
        "definitionUr": "عوامی سڑکوں پر موٹر گاڑیاں چلانے کا سرکاری اجازت نامہ",
        "category": "traffic-laws"
    },
    {
        "term": "Fitness Certificate",
        "termUr": "فٹنس سرٹیفکیٹ",
        "definition": "Document certifying vehicle meets safety standards",
        "definitionUr": "دستاویز جو تصدیق کرتی ہے کہ گاڑی حفاظتی معیارات پر پوری اترتی ہے",
        "category": "traffic-laws"
    },
    {
        "term": "Impounding",
        "termUr": "ضبطی",
        "definition": "Authorities taking and holding vehicle for violations",
        "definitionUr": "خلاف ورزیوں پر حکام کا گاڑی لے کر رکھنا",
        "category": "traffic-laws"
    },
    {
        "term": "License Suspension",
        "termUr": "لائسنس معطلی",
        "definition": "Temporary removal of driving privileges",
        "definitionUr": "ڈرائیونگ کی مراعات کی عارضی معطلی",
        "category": "traffic-laws"
    },
    {
        "term": "Motor Vehicle",
        "termUr": "موٹر گاڑی",
        "definition": "Any mechanically powered vehicle used on roads",
        "definitionUr": "سڑکوں پر استعمال ہونے والی کوئی بھی میکانیکی طور پر چلنے والی گاڑی",
        "category": "traffic-laws"
    },
    {
        "term": "Registration",
        "termUr": "رجسٹریشن",
        "definition": "Official recording of vehicle with authorities",
        "definitionUr": "حکام کے ساتھ گاڑی کا سرکاری ریکارڈ",
        "category": "traffic-laws"
    },
    {
        "term": "Route Permit",
        "termUr": "روٹ پرمٹ",
        "definition": "Authorization for commercial vehicles to operate on specific routes",
        "definitionUr": "کمرشل گاڑیوں کے لیے مخصوص روٹس پر کام کرنے کی اجازت",
        "category": "traffic-laws"
    },
    {
        "term": "Traffic Signal",
        "termUr": "ٹریفک سگنل",
        "definition": "Lights or signs controlling traffic flow",
        "definitionUr": "لائٹس یا نشانات جو ٹریفک کے بہاؤ کو کنٹرول کرتے ہیں",
        "category": "traffic-laws"
    },
    {
        "term": "DUI (Driving Under Influence)",
        "termUr": "نشے میں ڈرائیونگ",
        "definition": "Operating vehicle while impaired by alcohol or drugs",
        "definitionUr": "الکحل یا منشیات کے زیر اثر گاڑی چلانا",
        "category": "traffic-laws"
    },
    {
        "term": "Hit and Run",
        "termUr": "حادثہ کر کے بھاگنا",
        "definition": "Causing accident and leaving without stopping or helping",
        "definitionUr": "حادثہ کرنا اور بغیر رکے یا مدد کیے چلے جانا",
        "category": "traffic-laws"
    },
    {
        "term": "Negligent Driving",
        "termUr": "لاپرواہ ڈرائیونگ",
        "definition": "Operating vehicle carelessly without proper attention",
        "definitionUr": "مناسب توجہ کے بغیر لاپرواہی سے گاڑی چلانا",
        "category": "traffic-laws"
    },
    {
        "term": "Overspeeding",
        "termUr": "زیادہ سپیڈ",
        "definition": "Driving faster than legal speed limits",
        "definitionUr": "قانونی سپیڈ حد سے تیز ڈرائیونگ",
        "category": "traffic-laws"
    },
    {
        "term": "Rash Driving",
        "termUr": "بے احتیاط ڈرائیونگ",
        "definition": "Driving dangerously without regard for safety",
        "definitionUr": "حفاظت کو نظر انداز کرتے ہوئے خطرناک طریقے سے ڈرائیونگ",
        "category": "traffic-laws"
    },
    {
        "term": "Reckless Driving",
        "termUr": "لاپرواہ ڈرائیونگ",
        "definition": "Willfully dangerous driving showing disregard for safety",
        "definitionUr": "جان بوجھ کر خطرناک ڈرائیونگ جو حفاظت کی بے احترامی ظاہر کرتی ہے",
        "category": "traffic-laws"
    },
    {
        "term": "Signal Jumping",
        "termUr": "سگنل توڑنا",
        "definition": "Running through red traffic lights",
        "definitionUr": "ریڈ ٹریفک لائٹس کو توڑ کر گزرنا",
        "category": "traffic-laws"
    },
    {
        "term": "Wrong-way Driving",
        "termUr": "غلط سمت میں ڈرائیونگ",
        "definition": "Driving against normal traffic flow direction",
        "definitionUr": "عام ٹریفک کے بہاؤ کی مخالف سمت میں ڈرائیونگ",
        "category": "traffic-laws"
    },
    {
        "term": "Emergency Lane",
        "termUr": "ایمرجنسی لین",
        "definition": "Road lane reserved for emergency vehicles",
        "definitionUr": "سڑک کی لین جو ایمرجنسی گاڑیوں کے لیے مخصوص ہے",
        "category": "traffic-laws"
    },
    {
        "term": "Helmet",
        "termUr": "ہیلمٹ",
        "definition": "Protective headgear for motorcycle riders",
        "definitionUr": "موٹر سائیکل سواروں کے لیے حفاظتی ہیڈ گیئر",
        "category": "traffic-laws"
    },
    {
        "term": "Motorway",
        "termUr": "موٹروے",
        "definition": "High-speed limited-access highway",
        "definitionUr": "ہائی سپیڈ محدود رسائی والی ہائی وے",
        "category": "traffic-laws"
    },
    {
        "term": "Overloading",
        "termUr": "اوورلوڈنگ",
        "definition": "Carrying more passengers or cargo than vehicle capacity",
        "definitionUr": "گاڑی کی گنجائش سے زیادہ مسافر یا کارگو لے جانا",
        "category": "traffic-laws"
    },
    {
        "term": "Safety Equipment",
        "termUr": "حفاظتی سامان",
        "definition": "Required items like seat belts, helmets, lights",
        "definitionUr": "ضروری اشیاء جیسے سیٹ بیلٹ، ہیلمٹ، لائٹس",
        "category": "traffic-laws"
    },
    {
        "term": "Seat Belt",
        "termUr": "سیٹ بیلٹ",
        "definition": "Safety restraint that must be worn in vehicles",
        "definitionUr": "حفاظتی پابند جو گاڑیوں میں پہنی جانی چاہیے",
        "category": "traffic-laws"
    },
    {
        "term": "Tinted Glass",
        "termUr": "ٹنٹڈ گلاس",
        "definition": "Darkened vehicle windows beyond legal limits",
        "definitionUr": "گاڑی کی تاریک کیا ہوا شیشے جو قانونی حد سے زیادہ ہوں",
        "category": "traffic-laws"
    },
    {
        "term": "Arbitration Council",
        "termUr": "ثالثی کونسل",
        "definition": "Local body that attempts reconciliation in divorce cases",
        "definitionUr": "مقامی ادارہ جو طلاق کے معاملات میں مصالحت کی کوشش کرتا ہے",
        "category": "family-laws"
    },
    {
        "term": "Dower (Haq Mehr)",
        "termUr": "حق مہر",
        "definition": "Money or property husband must give wife in marriage",
        "definitionUr": "وہ رقم یا جائیداد جو شوہر کو شادی میں بیوی کو دینی ہوتی ہے",
        "category": "family-laws"
    },
    {
        "term": "Khula",
        "termUr": "خلع",
        "definition": "Divorce initiated by wife by returning dower",
        "definitionUr": "طلاق جو بیوی کی طرف سے حق مہر واپس کر کے شروع کی جاتی ہے",
        "category": "family-laws"
    },
    {
        "term": "Maintenance",
        "termUr": "نان نفقہ",
        "definition": "Financial support husband must provide to wife and children",
        "definitionUr": "مالی معاونت جو شوہر کو بیوی اور بچوں کو فراہم کرنی ہوتی ہے",
        "category": "family-laws"
    },
    {
        "term": "Nikah",
        "termUr": "نکاح",
        "definition": "Islamic marriage contract",
        "definitionUr": "اسلامی شادی کا معاہدہ",
        "category": "family-laws"
    },
    {
        "term": "Nikah Nama",
        "termUr": "نکاح نامہ",
        "definition": "Written marriage contract document",
        "definitionUr": "تحریری شادی کا معاہدہ دستاویز",
        "category": "family-laws"
    },
    {
        "term": "Polygamy",
        "termUr": "کثرت ازدواج",
        "definition": "Practice of having multiple wives simultaneously",
        "definitionUr": "ایک ساتھ کئی بیویاں رکھنے کا عمل",
        "category": "family-laws"
    },
    {
        "term": "Talaq",
        "termUr": "طلاق",
        "definition": "Islamic divorce pronounced by husband",
        "definitionUr": "اسلامی طلاق جو شوہر کی طرف سے جاری کی جاتی ہے",
        "category": "family-laws"
    },
    {
        "term": "Union Council",
        "termUr": "یونین کونسل",
        "definition": "Local government body that registers marriages and divorces",
        "definitionUr": "مقامی حکومتی ادارہ جو شادیوں اور طلاقوں کو رجسٹر کرتا ہے",
        "category": "family-laws"
    },
    {
        "term": "Bigamy",
        "termUr": "دو شادیاں",
        "definition": "Marrying while already legally married to someone else",
        "definitionUr": "پہلے سے قانونی طور پر کسی سے شادی شدہ ہونے کے باوجود دوسری شادی کرنا",
        "category": "family-laws"
    },
    {
        "term": "Child Marriage",
        "termUr": "بچپن کی شادی",
        "definition": "Marriage involving person under legal minimum age",
        "definitionUr": "شادی جس میں قانونی کم از کم عمر سے کم شخص شامل ہو",
        "category": "family-laws"
    },
    {
        "term": "Cohabitation",
        "termUr": "رہائش",
        "definition": "Living together as if married",
        "definitionUr": "شادی شدہ ہونے کی طرح اکٹھے رہنا",
        "category": "family-laws"
    },
    {
        "term": "Forced Marriage",
        "termUr": "جبری شادی",
        "definition": "Compelling someone to marry against their will",
        "definitionUr": "کسی کی مرضی کے خلاف شادی پر مجبور کرنا",
        "category": "family-laws"
    },
    {
        "term": "Fraudulent Marriage",
        "termUr": "جعلی شادی",
        "definition": "Going through fake marriage ceremony to deceive",
        "definitionUr": "دھوکہ دینے کے لیے جعلی شادی کی تقریب سے گزرنا",
        "category": "family-laws"
    },
    {
        "term": "Marriage to Quran",
        "termUr": "قرآن سے شادی",
        "definition": "Fake ceremony to prevent woman from inheriting property",
        "definitionUr": "عورت کو جائیداد وراثت میں لینے سے روکنے کے لیے جعلی تقریب",
        "category": "family-laws"
    },
    {
        "term": "Dissolution of Marriage",
        "termUr": "شادی کی تحلیل",
        "definition": "Legal process of ending marriage through court",
        "definitionUr": "عدالت کے ذریعے شادی ختم کرنے کا قانونی عمل",
        "category": "family-laws"
    },
    {
        "term": "Divorce Notice",
        "termUr": "طلاق نوٹس",
        "definition": "Required notification to Union Council when divorcing",
        "definitionUr": "طلاق دیتے وقت یونین کونسل کو مطلوبہ اطلاع",
        "category": "family-laws"
    },
    {
        "term": "Irrevocable Divorce",
        "termUr": "ناقابل تنسیخ طلاق",
        "definition": "Divorce that cannot be undone",
        "definitionUr": "طلاق جو واپس نہیں لی جا سکتی",
        "category": "family-laws"
    },
    {
        "term": "Reconciliation",
        "termUr": "مصالحت",
        "definition": "Attempt to save marriage and bring spouses back together",
        "definitionUr": "شادی بچانے اور میاں بیوی کو دوبارہ اکٹھا کرنے کی کوشش",
        "category": "family-laws"
    },
    {
        "term": "Revocable Divorce",
        "termUr": "قابل تنسیخ طلاق",
        "definition": "Divorce that can be withdrawn during iddat period",
        "definitionUr": "طلاق جو عدت کے دوران واپس لی جا سکتی ہے",
        "category": "family-laws"
    },
    {
        "term": "Separation",
        "termUr": "علیحدگی",
        "definition": "Living apart while still legally married",
        "definitionUr": "قانونی طور پر شادی شدہ رہتے ہوئے الگ رہنا",
        "category": "family-laws"
    },
    {
        "term": "Child Custody",
        "termUr": "بچے کی تحویل",
        "definition": "Legal right to care for and make decisions for child",
        "definitionUr": "بچے کی دیکھ بھال اور اس کے لیے فیصلے کرنے کا قانونی حق",
        "category": "family-laws"
    },
    {
        "term": "Child Sexual Abuse",
        "termUr": "بچوں کا جنسی استحصال",
        "definition": "Sexual crimes against children under 18",
        "definitionUr": "18 سال سے کم عمر بچوں کے خلاف جنسی جرائم",
        "category": "family-laws"
    },
    {
        "term": "Guardian",
        "termUr": "سرپرست",
        "definition": "Person legally responsible for caring for child",
        "definitionUr": "وہ شخص جو قانونی طور پر بچے کی دیکھ بھال کا ذمہ دار ہے",
        "category": "family-laws"
    },
    {
        "term": "Guardianship",
        "termUr": "سرپرستی",
        "definition": "Legal authority to care for someone unable to care for themselves",
        "definitionUr": "کسی ایسے شخص کی دیکھ بھال کرنے کا قانونی اختیار جو اپنی دیکھ بھال نہیں کر سکتا",
        "category": "family-laws"
    },
    {
        "term": "Inheritance",
        "termUr": "وراثت",
        "definition": "Property and assets received from deceased family member",
        "definitionUr": "مرنے والے خاندان کے رکن سے ملنے والی جائیداد اور اثاثے",
        "category": "family-laws"
    },
    {
        "term": "Legitimate Child",
        "termUr": "جائز بچہ",
        "definition": "Child born to legally married parents",
        "definitionUr": "قانونی طور پر شادی شدہ والدین سے پیدا ہونے والا بچہ",
        "category": "family-laws"
    },
    {
        "term": "Minor",
        "termUr": "نابالغ",
        "definition": "Person under age of 18 (or 16 for certain purposes)",
        "definitionUr": "18 سال سے کم عمر شخص (یا کچھ مقاصد کے لیے 16)",
        "category": "family-laws"
    },
    {
        "term": "Ward",
        "termUr": "وارڈ",
        "definition": "Person under guardianship, usually a child",
        "definitionUr": "سرپرستی میں رہنے والا شخص، عام طور پر بچہ",
        "category": "family-laws"
    },
    {
        "term": "Computer System",
        "termUr": "کمپیوٹر سسٹم",
        "definition": "Electronic device or network for processing information",
        "definitionUr": "معلومات کو پروسیس کرنے کے لیے الیکٹرانک ڈیوائس یا نیٹ ورک",
        "category": "cyber-laws"
    },
    {
        "term": "Cyber Crime",
        "termUr": "سائبر کرائم",
        "definition": "Crimes committed using computers or internet",
        "definitionUr": "کمپیوٹر یا انٹرنیٹ کا استعمال کرتے ہوئے کیے جانے والے جرائم",
        "category": "cyber-laws"
    },
    {
        "term": "Cyber Terrorism",
        "termUr": "سائبر دہشت گردی",
        "definition": "Using electronic means to attack critical infrastructure",
        "definitionUr": "اہم انفراسٹرکچر پر حملہ کرنے کے لیے الیکٹرانک ذرائع کا استعمال",
        "category": "cyber-laws"
    },
    {
        "term": "Data",
        "termUr": "ڈیٹا",
        "definition": "Information stored or processed electronically",
        "definitionUr": "الیکٹرانک طریقے سے محفوظ یا پروسیس کی گئی معلومات",
        "category": "cyber-laws"
    },
    {
        "term": "Electronic",
        "termUr": "الیکٹرانک",
        "definition": "Related to technology using electricity or digital signals",
        "definitionUr": "بجلی یا ڈیجیٹل سگنلز استعمال کرنے والی ٹیکنالوجی سے متعلق",
        "category": "cyber-laws"
    },
    {
        "term": "Information System",
        "termUr": "انفارمیشن سسٹم",
        "definition": "Computer systems and networks that process data",
        "definitionUr": "کمپیوٹر سسٹمز اور نیٹ ورک جو ڈیٹا پروسیس کرتے ہیں",
        "category": "cyber-laws"
    },
    {
        "term": "Internet",
        "termUr": "انٹرنیٹ",
        "definition": "Global network connecting computers worldwide",
        "definitionUr": "دنیا بھر میں کمپیوٹرز کو جوڑنے والا عالمی نیٹ ورک",
        "category": "cyber-laws"
    },
    {
        "term": "Unauthorized Access",
        "termUr": "غیر مجاز رسائی",
        "definition": "Entering computer systems without permission",
        "definitionUr": "اجازت کے بغیر کمپیوٹر سسٹمز میں داخل ہونا",
        "category": "cyber-laws"
    },
    {
        "term": "Dark Web",
        "termUr": "ڈارک ویب",
        "definition": "Hidden internet requiring special software, often used for illegal activities",
        "definitionUr": "پوشیدہ انٹرنیٹ جس کے لیے خصوصی سافٹ ویئر کی ضرورت ہوتی ہے، اکثر غیر قانونی سرگرمیوں کے لیے استعمال ہوتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Firewall",
        "termUr": "فائر وال",
        "definition": "Security system protecting networks from unauthorized access",
        "definitionUr": "سیکیورٹی سسٹم جو نیٹ ورکس کو غیر مجاز رسائی سے بچاتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Hacking",
        "termUr": "ہیکنگ",
        "definition": "Gaining unauthorized access to computer systems",
        "definitionUr": "کمپیوٹر سسٹمز تک غیر مجاز رسائی حاصل کرنا",
        "category": "cyber-laws"
    },
    {
        "term": "Malicious Code",
        "termUr": "مالیشس کوڈ",
        "definition": "Software designed to harm computers or steal data",
        "definitionUr": "سافٹ ویئر جو کمپیوٹرز کو نقصان پہنچانے یا ڈیٹا چرانے کے لیے ڈیزائن کیا گیا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Malware",
        "termUr": "مالویئر",
        "definition": "Harmful software like viruses, trojans, ransomware",
        "definitionUr": "نقصان دہ سافٹ ویئر جیسے وائرس، ٹروجن، رینسم ویئر",
        "category": "cyber-laws"
    },
    {
        "term": "Password",
        "termUr": "پاس ورڈ",
        "definition": "Secret code used to access accounts or systems",
        "definitionUr": "خفیہ کوڈ جو اکاؤنٹس یا سسٹمز تک رسائی کے لیے استعمال ہوتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Phishing",
        "termUr": "فشنگ",
        "definition": "Tricking people to reveal passwords or personal information",
        "definitionUr": "لوگوں کو پاس ورڈز یا ذاتی معلومات ظاہر کرنے کے لیے دھوکہ دینا",
        "category": "cyber-laws"
    },
    {
        "term": "Ransomware",
        "termUr": "رینسم ویئر",
        "definition": "Malware that locks data and demands payment for release",
        "definitionUr": "مالویئر جو ڈیٹا کو لاک کرتا ہے اور رہائی کے لیے ادائیگی کا مطالبہ کرتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Security Breach",
        "termUr": "سیکورٹی بریچ",
        "definition": "Unauthorized access to protected systems or data",
        "definitionUr": "محفوظ سسٹمز یا ڈیٹا تک غیر مجاز رسائی",
        "category": "cyber-laws"
    },
    {
        "term": "Source Code",
        "termUr": "سورس کوڈ",
        "definition": "Programming instructions that make software work",
        "definitionUr": "پروگرامنگ کی ہدایات جو سافٹ ویئر کو کام کرتی ہیں",
        "category": "cyber-laws"
    },
    {
        "term": "Spyware",
        "termUr": "سپائی ویئر",
        "definition": "Software that secretly monitors user activities",
        "definitionUr": "سافٹ ویئر جو خفیہ طور پر صارف کی سرگرمیوں کی نگرانی کرتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Trojan",
        "termUr": "ٹروجن",
        "definition": "Malware disguised as legitimate software",
        "definitionUr": "مالویئر جو جائز سافٹ ویئر کے بھیس میں ہوتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Two-Factor Authentication",
        "termUr": "دو فیکٹر تصدیق",
        "definition": "Extra security requiring two types of verification",
        "definitionUr": "اضافی سیکورٹی جس کے لیے دو قسم کی تصدیق کی ضرورت ہوتی ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Virus",
        "termUr": "وائرس",
        "definition": "Malicious program that spreads and damages systems",
        "definitionUr": "نقصان دہ پروگرام جو پھیلتا ہے اور سسٹمز کو نقصان پہنچاتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Vulnerability",
        "termUr": "خامی",
        "definition": "Weakness in system that can be exploited",
        "definitionUr": "سسٹم میں کمزوری جس کا فائدہ اٹھایا جا سکتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Worm",
        "termUr": "ورم",
        "definition": "Self-replicating malware that spreads across networks",
        "definitionUr": "خود کو نقل کرنے والا مالویئر جو نیٹ ورکس میں پھیلتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Catfishing",
        "termUr": "کیٹ فشنگ",
        "definition": "Creating fake online identity to deceive others",
        "definitionUr": "دوسروں کو دھوکہ دینے کے لیے جعلی آن لائن شناخت بنانا",
        "category": "cyber-laws"
    },
    {
        "term": "Cryptocurrency",
        "termUr": "کرپٹو کرنسی",
        "definition": "Digital currency like Bitcoin used for online transactions",
        "definitionUr": "ڈیجیٹل کرنسی جیسے بٹ کوائن جو آن لائن لین دین کے لیے استعمال ہوتی ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Cyberbullying",
        "termUr": "سائبر بلنگ",
        "definition": "Using electronic communication to harass or intimidate",
        "definitionUr": "ہراساں کرنے یا ڈرانے کے لیے الیکٹرانک مواصلات کا استعمال",
        "category": "cyber-laws"
    },
    {
        "term": "Deepfake",
        "termUr": "ڈیپ فیک",
        "definition": "Artificial media that appears real using AI technology",
        "definitionUr": "مصنوعی میڈیا جو AI ٹیکنالوجی کا استعمال کرتے ہوئے حقیقی نظر آتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Defamation",
        "termUr": "بدنامی",
        "definition": "Damaging someone's reputation through false statements",
        "definitionUr": "جھوٹے بیانات کے ذریعے کسی کی ساکھ کو نقصان پہنچانا",
        "category": "cyber-laws"
    },
    {
        "term": "Digital Piracy",
        "termUr": "ڈیجیٹل سمندری ڈاکو",
        "definition": "Illegally copying or distributing copyrighted content",
        "definitionUr": "کاپی رائٹڈ مواد کی غیر قانونی کاپی یا تقسیم",
        "category": "cyber-laws"
    },
    {
        "term": "Hate Speech",
        "termUr": "نفرت انگیز تقریر",
        "definition": "Content promoting hatred against groups based on religion, race, etc.",
        "definitionUr": "مذہب، نسل وغیرہ کی بنیاد پر گروہوں کے خلاف نفرت کو فروغ دینے والا مواد",
        "category": "cyber-laws"
    },
    {
        "term": "Identity Theft",
        "termUr": "شناخت کی چوری",
        "definition": "Stealing someone's personal information to impersonate them",
        "definitionUr": "کسی کی ذاتی معلومات چوری کر کے اس کی شناخت اختیار کرنا",
        "category": "cyber-laws"
    },
    {
        "term": "Revenge Porn",
        "termUr": "انتقامی فحش",
        "definition": "Sharing intimate images without consent to harm someone",
        "definitionUr": "کسی کو نقصان پہنچانے کے لیے بغیر رضامندی کے ذاتی تصاویر شیئر کرنا",
        "category": "cyber-laws"
    },
    {
        "term": "Sextortion",
        "termUr": "سیکسٹارشن",
        "definition": "Blackmailing someone using their intimate images or videos",
        "definitionUr": "کسی کی ذاتی تصاویر یا ویڈیوز کا استعمال کرتے ہوئے بلیک میل کرنا",
        "category": "cyber-laws"
    },
    {
        "term": "Spam",
        "termUr": "اسپام",
        "definition": "Unsolicited bulk electronic messages, usually commercial",
        "definitionUr": "ناگوار بلک الیکٹرانک پیغامات، عام طور پر تجارتی",
        "category": "cyber-laws"
    },
    {
        "term": "Spoofing",
        "termUr": "سپوفنگ",
        "definition": "Disguising electronic communication to appear from different source",
        "definitionUr": "الیکٹرانک مواصلات کو مختلف ماخذ سے ظاہر ہونے کے لیے بھیس بدلنا",
        "category": "cyber-laws"
    },
    {
        "term": "Antivirus",
        "termUr": "اینٹی وائرس",
        "definition": "Software protecting computers from malware",
        "definitionUr": "سافٹ ویئر جو کمپیوٹرز کو مالویئر سے بچاتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Backup",
        "termUr": "بیک اپ",
        "definition": "Copies of data stored separately for protection",
        "definitionUr": "ڈیٹا کی کاپیاں جو حفاظت کے لیے الگ سے محفوظ کی جاتی ہیں",
        "category": "cyber-laws"
    },
    {
        "term": "Cloud Storage",
        "termUr": "کلاؤڈ اسٹوریج",
        "definition": "Storing data on internet servers rather than local devices",
        "definitionUr": "ڈیٹا کو مقامی ڈیوائسز کے بجائے انٹرنیٹ سرورز پر اسٹور کرنا",
        "category": "cyber-laws"
    },
    {
        "term": "Data Breach",
        "termUr": "ڈیٹا بریچ",
        "definition": "Unauthorized access to confidential information",
        "definitionUr": "خفیہ معلومات تک غیر مجاز رسائی",
        "category": "cyber-laws"
    },
    {
        "term": "Digital Signature",
        "termUr": "ڈیجیٹل دستخط",
        "definition": "Electronic signature verifying identity and document authenticity",
        "definitionUr": "الیکٹرانک دستخط جو شناخت اور دستاویز کی صحت کی تصدیق کرتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Encryption",
        "termUr": "خفیہ کاری",
        "definition": "Converting data into coded form to protect privacy",
        "definitionUr": "پرائیویسی کو تحفظ دینے کے لیے ڈیٹا کو کوڈڈ شکل میں تبدیل کرنا",
        "category": "cyber-laws"
    },
    {
        "term": "IP Address",
        "termUr": "آئی پی ایڈریس",
        "definition": "Unique number identifying devices on internet",
        "definitionUr": "انٹرنیٹ پر ڈیوائسز کی شناخت کرنے والا منفرد نمبر",
        "category": "cyber-laws"
    },
    {
        "term": "Privacy Settings",
        "termUr": "پرائیویسی سیٹنگز",
        "definition": "Controls determining who can see your online information",
        "definitionUr": "کنٹرولز جو طے کرتی ہیں کہ آپ کی آن لائن معلومات کون دیکھ سکتا ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Social Media",
        "termUr": "سوشل میڈیا",
        "definition": "Online platforms for sharing content and connecting with others",
        "definitionUr": "مواد شیئر کرنے اور دوسروں سے جڑنے کے لیے آن لائن پلیٹ فارمز",
        "category": "cyber-laws"
    },
    {
        "term": "VPN (Virtual Private Network)",
        "termUr": "وی پی این (ورچوئل پرائیویٹ نیٹ ورک)",
        "definition": "Service protecting online privacy and security",
        "definitionUr": "سروس جو آن لائن پرائیویسی اور سیکورٹی کو تحفظ دیتی ہے",
        "category": "cyber-laws"
    },
    {
        "term": "Wi-Fi",
        "termUr": "وائی فائی",
        "definition": "Wireless internet connection",
        "definitionUr": "وائرلیس انٹرنیٹ کنکشن",
        "category": "cyber-laws"
    },
    {
        "term": "Deduction",
        "termUr": "کٹوتی",
        "definition": "Money taken out of wages before payment",
        "definitionUr": "ادائیگی سے پہلے اجرت سے نکالی گئی رقم",
        "category": "labor-laws"
    },
    {
        "term": "Due Date",
        "termUr": "واجب الادا تاریخ",
        "definition": "Scheduled day when wages must be paid",
        "definitionUr": "مقررہ دن جب اجرت ادا کی جانی چاہیے",
        "category": "labor-laws"
    },
    {
        "term": "Overtime",
        "termUr": "اوور ٹائم",
        "definition": "Work done beyond normal working hours",
        "definitionUr": "عام کام کے اوقات سے زیادہ کیا گیا کام",
        "category": "labor-laws"
    },
    {
        "term": "Wage",
        "termUr": "اجرت",
        "definition": "Payment for work done, usually money",
        "definitionUr": "کیے گئے کام کی ادائیگی، عام طور پر پیسے",
        "category": "labor-laws"
    },
    {
        "term": "Wage Period",
        "termUr": "اجرت کی مدت",
        "definition": "Time period for which wages are calculated (weekly, monthly)",
        "definitionUr": "وقت کی مدت جس کے لیے اجرت کا حساب لگایا جاتا ہے (ہفتہ واری، ماہانہ)",
        "category": "labor-laws"
    },
    {
        "term": "Wage Register",
        "termUr": "اجرت رجسٹر",
        "definition": "Official record of wage payments to all workers",
        "definitionUr": "تمام کارکنوں کو اجرت کی ادائیگیوں کا سرکاری ریکارڈ",
        "category": "labor-laws"
    },
    {
        "term": "Wage Slip",
        "termUr": "اجرت سلپ",
        "definition": "Document showing wage details and deductions",
        "definitionUr": "دستاویز جو اجرت کی تفصیلات اور کٹوتیاں دکھاتی ہے",
        "category": "labor-laws"
    },
    {
        "term": "Factory",
        "termUr": "فیکٹری",
        "definition": "Workplace where manufacturing or industrial work occurs",
        "definitionUr": "کام کی جگہ جہاں مینوفیکچرنگ یا صنعتی کام ہوتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Factory Inspector",
        "termUr": "فیکٹری انسپکٹر",
        "definition": "Government official who checks factory compliance",
        "definitionUr": "سرکاری اہلکار جو فیکٹری کی تعمیل کی جانچ کرتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Fitness",
        "termUr": "فٹنس",
        "definition": "Meeting required safety and operational standards",
        "definitionUr": "مطلوبہ حفاظتی اور آپریشنل معیارات پر پورا اترنا",
        "category": "labor-laws"
    },
    {
        "term": "Hazardous Work",
        "termUr": "خطرناک کام",
        "definition": "Dangerous work that can cause injury or illness",
        "definitionUr": "خطرناک کام جو چوٹ یا بیماری کا سبب بن سکتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Occupier",
        "termUr": "قابض",
        "definition": "Person in control of factory operations",
        "definitionUr": "فیکٹری کے آپریشنز کا کنٹرول رکھنے والا شخص",
        "category": "labor-laws"
    },
    {
        "term": "Safety Equipment",
        "termUr": "حفاظتی سامان",
        "definition": "Protective gear and devices for worker safety",
        "definitionUr": "کارکن کی حفاظت کے لیے حفاظتی گیئر اور آلات",
        "category": "labor-laws"
    },
    {
        "term": "Welfare Facilities",
        "termUr": "بہبود کی سہولیات",
        "definition": "Amenities like rest rooms, canteens, first aid for workers",
        "definitionUr": "سہولیات جیسے آرام کے کمرے، کینٹین، کارکنوں کے لیے فرسٹ ایڈ",
        "category": "labor-laws"
    },
    {
        "term": "Working Hours",
        "termUr": "کام کے اوقات",
        "definition": "Time workers are required to be at work",
        "definitionUr": "وقت جب کارکنوں کو کام پر موجود ہونا ضروری ہوتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Collective Bargaining",
        "termUr": "اجتماعی سودا بازی",
        "definition": "Negotiations between employer and union about work terms",
        "definitionUr": "کام کی شرائط کے بارے میں آجر اور یونین کے درمیان مذاکرات",
        "category": "labor-laws"
    },
    {
        "term": "Conciliation",
        "termUr": "مصالحت",
        "definition": "Process of helping parties reach agreement in disputes",
        "definitionUr": "تنازعات میں فریقین کو معاہدے تک پہنچنے میں مدد کرنے کا عمل",
        "category": "labor-laws"
    },
    {
        "term": "Industrial Dispute",
        "termUr": "صنعتی تنازعہ",
        "definition": "Conflict between employers and workers about employment",
        "definitionUr": "ملازمت کے بارے میں آجروں اور کارکنوں کے درمیان تنازعہ",
        "category": "labor-laws"
    },
    {
        "term": "Labor Court",
        "termUr": "لیبر کورٹ",
        "definition": "Special court handling employment and labor disputes",
        "definitionUr": "خصوصی عدالت جو ملازمت اور لیبر کے تنازعات کو ہینڈل کرتی ہے",
        "category": "labor-laws"
    },
    {
        "term": "Lock-out",
        "termUr": "لاک آؤٹ",
        "definition": "Employer closing workplace to pressure workers during dispute",
        "definitionUr": "تنازعہ کے دوران کارکنوں پر دباؤ ڈالنے کے لیے آجر کا کام کی جگہ بند کرنا",
        "category": "labor-laws"
    },
    {
        "term": "Strike",
        "termUr": "ہڑتال",
        "definition": "Workers refusing to work to demand better conditions",
        "definitionUr": "بہتر حالات کا مطالبہ کرنے کے لیے کارکنوں کا کام کرنے سے انکار",
        "category": "labor-laws"
    },
    {
        "term": "Trade Union",
        "termUr": "ٹریڈ یونین",
        "definition": "Organization of workers formed to protect their interests",
        "definitionUr": "کارکنوں کی تنظیم جو ان کے مفادات کے تحفظ کے لیے بنائی گئی ہے",
        "category": "labor-laws"
    },
    {
        "term": "Tribunal",
        "termUr": "ٹریبونل",
        "definition": "Authority that resolves industrial disputes through adjudication",
        "definitionUr": "وہ اتھارٹی جو صنعتی تنازعات کو فیصلہ سازی کے ذریعے حل کرتی ہے",
        "category": "labor-laws"
    },
    {
        "term": "Unfair Labor Practice",
        "termUr": "غیر منصفانہ لیبر پریکٹس",
        "definition": "Employer actions that interfere with worker rights",
        "definitionUr": "آجر کے اقدامات جو کارکنوں کے حقوق میں مداخلت کرتے ہیں",
        "category": "labor-laws"
    },
    {
        "term": "Union Member",
        "termUr": "یونین رکن",
        "definition": "Worker who belongs to a trade union",
        "definitionUr": "کارکن جو کسی ٹریڈ یونین کا رکن ہو",
        "category": "labor-laws"
    },
    {
        "term": "Worker Representative",
        "termUr": "کارکن نمائندہ",
        "definition": "Person chosen by workers to speak for them",
        "definitionUr": "وہ شخص جسے کارکنوں نے ان کی نمائندگی کے لیے چنا ہو",
        "category": "labor-laws"
    },
    {
        "term": "Child Worker",
        "termUr": "بچہ مزدور",
        "definition": "Person under 14 working in any capacity",
        "definitionUr": "14 سال سے کم عمر شخص جو کسی بھی حیثیت سے کام کر رہا ہو",
        "category": "labor-laws"
    },
    {
        "term": "Forced Labor",
        "termUr": "جبری مشقت",
        "definition": "Work done under threat or against one's will",
        "definitionUr": "دھمکی کے تحت یا کسی کی مرضی کے خلاف کیا گیا کام",
        "category": "labor-laws"
    },
    {
        "term": "Hazardous Occupation",
        "termUr": "خطرناک پیشہ",
        "definition": "Dangerous work that children are prohibited from doing",
        "definitionUr": "خطرناک کام جس سے بچوں کو روکا گیا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Adolescent",
        "termUr": "نوجوان",
        "definition": "Person between 14 and 18 years old",
        "definitionUr": "14 اور 18 سال کی عمر کے درمیان شخص",
        "category": "labor-laws"
    },
    {
        "term": "Adult",
        "termUr": "بالغ",
        "definition": "Person 18 years or older",
        "definitionUr": "18 سال یا اس سے زیادہ عمر کا شخص",
        "category": "labor-laws"
    },
    {
        "term": "Apprentice",
        "termUr": "شاگرد",
        "definition": "Person learning trade through on-the-job training",
        "definitionUr": "وہ شخص جو کام کی جگہ کی تربیت کے ذریعے تجارت سیکھ رہا ہو",
        "category": "labor-laws"
    },
    {
        "term": "Casual Worker",
        "termUr": "عارضی کارکن",
        "definition": "Worker employed irregularly for temporary work",
        "definitionUr": "عارضی کام کے لیے بے قاعدگی سے ملازم کارکن",
        "category": "labor-laws"
    },
    {
        "term": "Contract Worker",
        "termUr": "معاہدہ کارکن",
        "definition": "Worker employed for specific period or project",
        "definitionUr": "مخصوص مدت یا منصوبے کے لیے ملازم کارکن",
        "category": "labor-laws"
    },
    {
        "term": "Employee",
        "termUr": "ملازم",
        "definition": "Person working for employer in exchange for wages",
        "definitionUr": "وہ شخص جو اجرت کے بدلے آجر کے لیے کام کر رہا ہو",
        "category": "labor-laws"
    },
    {
        "term": "Employer",
        "termUr": "آجر",
        "definition": "Person or organization that hires workers",
        "definitionUr": "وہ شخص یا تنظیم جو کارکنوں کو ملازمت دیتی ہے",
        "category": "labor-laws"
    },
    {
        "term": "Permanent Worker",
        "termUr": "مستقل کارکن",
        "definition": "Worker with ongoing employment without fixed end date",
        "definitionUr": "مستقل ملازمت والا کارکن جس کی کوئی مقررہ اختتامی تاریخ نہ ہو",
        "category": "labor-laws"
    },
    {
        "term": "Probation",
        "termUr": "آزمائشی مدت",
        "definition": "Trial period for new employees before permanent hiring",
        "definitionUr": "مستقل ملازمت سے پہلے نئے ملازمین کے لیے آزمائشی مدت",
        "category": "labor-laws"
    },
    {
        "term": "Seasonal Worker",
        "termUr": "سیزنل کارکن",
        "definition": "Worker employed during specific seasons or periods",
        "definitionUr": "مخصوص موسموں یا ادوار کے دوران ملازم کارکن",
        "category": "labor-laws"
    },
    {
        "term": "Temporary Worker",
        "termUr": "عارضی کارکن",
        "definition": "Worker employed for limited time period",
        "definitionUr": "محدود وقت کی مدت کے لیے ملازم کارکن",
        "category": "labor-laws"
    },
    {
        "term": "Worker",
        "termUr": "کارکن",
        "definition": "Any person employed in work for wages",
        "definitionUr": "اجرت کے لیے کام میں ملازم کوئی بھی شخص",
        "category": "labor-laws"
    },
    {
        "term": "Annual Leave",
        "termUr": "سالانہ چھٹی",
        "definition": "Paid vacation time workers earn each year",
        "definitionUr": "ادا شدہ چھٹی کا وقت جو کارکن ہر سال کماتے ہیں",
        "category": "labor-laws"
    },
    {
        "term": "Casual Leave",
        "termUr": "عارضی چھٹی",
        "definition": "Short-term paid leave for personal needs",
        "definitionUr": "ذاتی ضروریات کے لیے مختصر مدتی ادا شدہ چھٹی",
        "category": "labor-laws"
    },
    {
        "term": "Earned Leave",
        "termUr": "کمائی ہوئی چھٹی",
        "definition": "Paid time off that workers accumulate based on work",
        "definitionUr": "ادا شدہ وقت کی چھٹی جو کارکن کام کی بنیاد پر جمع کرتے ہیں",
        "category": "labor-laws"
    },
    {
        "term": "Holiday",
        "termUr": "چھٹی",
        "definition": "Official day off with pay",
        "definitionUr": "ادائیگی کے ساتھ سرکاری دن کی چھٹی",
        "category": "labor-laws"
    },
    {
        "term": "Leave",
        "termUr": "چھٹی",
        "definition": "Authorized absence from work",
        "definitionUr": "کام سے منظور شدہ غیر حاضری",
        "category": "labor-laws"
    },
    {
        "term": "Maternity Leave",
        "termUr": "زچگی کی چھٹی",
        "definition": "Paid time off for pregnancy and childbirth",
        "definitionUr": "حمل اور بچے کی پیدائش کے لیے ادا شدہ وقت کی چھٹی",
        "category": "labor-laws"
    },
    {
        "term": "Sick Leave",
        "termUr": "بیماری کی چھٹی",
        "definition": "Paid time off for illness or medical treatment",
        "definitionUr": "بیماری یا طبی علاج کے لیے ادا شدہ وقت کی چھٹی",
        "category": "labor-laws"
    },
    {
        "term": "Absence",
        "termUr": "غیر حاضری",
        "definition": "When worker fails to report for scheduled work",
        "definitionUr": "جب کارکن مقررہ کام کے لیے رپورٹ کرنے میں ناکام ہو جاتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Dismissal",
        "termUr": "برطرفی",
        "definition": "Employer ending worker's employment",
        "definitionUr": "آجر کا کارکن کی ملازمت ختم کرنا",
        "category": "labor-laws"
    },
    {
        "term": "Misconduct",
        "termUr": "بدتمیزی",
        "definition": "Improper behavior by worker violating workplace rules",
        "definitionUr": "کارکن کا نا مناسب رویہ جو کام کی جگہ کے اصولوں کی خلاف ورزی کرتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Notice Period",
        "termUr": "نوٹس مدت",
        "definition": "Advance warning required before ending employment",
        "definitionUr": "ملازمت ختم کرنے سے پہلے مطلوبہ پیشگی انتباہ",
        "category": "labor-laws"
    },
    {
        "term": "Retrenchment",
        "termUr": "کم کرنے کا عمل",
        "definition": "Laying off workers due to business needs",
        "definitionUr": "کاروباری ضروریات کی وجہ سے کارکنوں کو برطرف کرنا",
        "category": "labor-laws"
    },
    {
        "term": "Termination",
        "termUr": "اختتام",
        "definition": "Ending worker's employment",
        "definitionUr": "کارکن کی ملازمت ختم کرنا",
        "category": "labor-laws"
    },
    {
        "term": "Abandonment",
        "termUr": "ترک",
        "definition": "Worker leaving job without notice or permission",
        "definitionUr": "کارکن کا نوٹس یا اجازت کے بغیر نوکری چھوڑنا",
        "category": "labor-laws"
    },
    {
        "term": "Resignation",
        "termUr": "استعفیٰ",
        "definition": "Worker voluntarily quitting job",
        "definitionUr": "کارکن کا رضاکارانہ طور پر نوکری چھوڑنا",
        "category": "labor-laws"
    },
    {
        "term": "Retirement",
        "termUr": "ریٹائرمنٹ",
        "definition": "Leaving workforce after reaching certain age or service",
        "definitionUr": "مخصوص عمر یا سروس تک پہنچنے کے بعد لیبر فورس چھوڑنا",
        "category": "labor-laws"
    },
    {
        "term": "Severance Pay",
        "termUr": "سیویرنس پے",
        "definition": "Compensation paid when employment ends",
        "definitionUr": "ملازمت ختم ہونے پر ادا کیا جانے والا معاوضہ",
        "category": "labor-laws"
    },
    {
        "term": "Gratuity",
        "termUr": "گریچوئٹی",
        "definition": "Lump sum payment to workers after long service",
        "definitionUr": "طویل خدمت کے بعد کارکنوں کو ایک ہی قسط میں ادائیگی",
        "category": "labor-laws"
    },
    {
        "term": "Provident Fund",
        "termUr": "پروویڈنٹ فنڈ",
        "definition": "Savings scheme for workers' retirement",
        "definitionUr": "کارکنوں کی ریٹائرمنٹ کے لیے بچت اسکیم",
        "category": "labor-laws"
    },
    {
        "term": "Social Security",
        "termUr": "سوشل سیکورٹی",
        "definition": "Government system providing benefits for workers",
        "definitionUr": "حکومتی نظام جو کارکنوں کے لیے فوائد فراہم کرتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Workers' Compensation",
        "termUr": "کارکنوں کا معاوضہ",
        "definition": "Benefits for workers injured on the job",
        "definitionUr": "کام پر زخمی ہونے والے کارکنوں کے لیے فوائد",
        "category": "labor-laws"
    },
    {
        "term": "Workers' Welfare Fund",
        "termUr": "کارکنوں کی بہبود فنڈ",
        "definition": "Money set aside for worker benefits and facilities",
        "definitionUr": "کارکنوں کے فوائد اور سہولیات کے لیے الگ سے رکھی گئی رقم",
        "category": "labor-laws"
    },
    {
        "term": "Accident",
        "termUr": "حادثہ",
        "definition": "Unexpected event causing injury at workplace",
        "definitionUr": "غیر متوقع واقعہ جو کام کی جگہ پر چوٹ کا سبب بنتا ہے",
        "category": "labor-laws"
    },
    {
        "term": "Compensation",
        "termUr": "معاوضہ",
        "definition": "Money paid for work-related injury or death",
        "definitionUr": "کام سے متعلقہ چوٹ یا موت کے لیے ادا کی جانے والی رقم",
        "category": "labor-laws"
    },
    {
        "term": "Disability",
        "termUr": "معذوری",
        "definition": "Permanent physical or mental impairment from work injury",
        "definitionUr": "کام کی چوٹ سے مستقل جسمانی یا ذہنی خرابی",
        "category": "labor-laws"
    },
    {
        "term": "Occupational Disease",
        "termUr": "پیشہ ورانہ بیماری",
        "definition": "Illness caused by work conditions or exposures",
        "definitionUr": "کام کے حالات یا نمائش سے ہونے والی بیماری",
        "category": "labor-laws"
    },
    {
        "term": "Partial Disability",
        "termUr": "جزوی معذوری",
        "definition": "Injury that reduces but doesn't eliminate work ability",
        "definitionUr": "چوٹ جو کام کی صلاحیت کو کم کرتی ہے لیکن ختم نہیں کرتی",
        "category": "labor-laws"
    },
    {
        "term": "Total Disability",
        "termUr": "مکمل معذوری",
        "definition": "Injury that completely prevents working",
        "definitionUr": "چوٹ جو مکمل طور پر کام کرنے سے روکتی ہے",
        "category": "labor-laws"
    },
    {
        "term": "Act",
        "termUr": "ایکٹ",
        "definition": "Formal law passed by Parliament",
        "definitionUr": "پارلیمنٹ کے ذریعے منظور کردہ رسمی قانون",
        "category": "general"
    },
    {
        "term": "Amendment",
        "termUr": "ترمیم",
        "definition": "Official change or addition to existing law",
        "definitionUr": "موجودہ قانون میں سرکاری تبدیلی یا اضافہ",
        "category": "general"
    },
    {
        "term": "Bill",
        "termUr": "بل",
        "definition": "Proposed law presented to Parliament for approval",
        "definitionUr": "منظوری کے لیے پارلیمنٹ میں پیش کردہ تجویز کردہ قانون",
        "category": "general"
    },
    {
        "term": "Code",
        "termUr": "کوڈ",
        "definition": "Systematic collection of laws on specific subject",
        "definitionUr": "مخصوص موضوع پر قوانین کا منظم مجموعہ",
        "category": "general"
    },
    {
        "term": "Law",
        "termUr": "قانون",
        "definition": "Rule established by authority that must be obeyed",
        "definitionUr": "حکامت کے ذریعے قائم کردہ اصول جس کی پابندی ضروری ہے",
        "category": "general"
    },
    {
        "term": "Ordinance",
        "termUr": "آرڈیننس",
        "definition": "Temporary law issued when Parliament not in session",
        "definitionUr": "عارضی قانون جو پارلیمنٹ کے اجلاس نہ ہونے پر جاری کیا جاتا ہے",
        "category": "general"
    },
    {
        "term": "Regulation",
        "termUr": "ریگولیشن",
        "definition": "Detailed rules created under authority of law",
        "definitionUr": "قانون کے اختیار کے تحت بنائے گئے تفصیلی قواعد",
        "category": "general"
    },
    {
        "term": "Rule",
        "termUr": "قاعدہ",
        "definition": "Specific requirement created under law",
        "definitionUr": "قانون کے تحت بنائی گئی مخصوص شرط",
        "category": "general"
    },
    {
        "term": "Statute",
        "termUr": "قانون",
        "definition": "Written law passed by legislative body",
        "definitionUr": "قانون ساز ادارے کے ذریعے منظور کردہ تحریری قانون",
        "category": "general"
    },
    {
        "term": "Appeal",
        "termUr": "اپیل",
        "definition": "Request to higher court to review lower court decision",
        "definitionUr": "اعلیٰ عدالت سے درخواست کہ وہ زیریں عدالت کے فیصلے کا جائزہ لے",
        "category": "court"
    },
    {
        "term": "Bail",
        "termUr": "ضمانت",
        "definition": "Temporary release from custody while case continues",
        "definitionUr": "مقدمہ جاری رہنے کے دوران حراست سے عارضی رہائی",
        "category": "court"
    },
    {
        "term": "Case",
        "termUr": "مقدمہ",
        "definition": "Legal dispute brought to court for resolution",
        "definitionUr": "قانونی تنازعہ جو حل کے لیے عدالت میں لایا گیا ہو",
        "category": "court"
    },
    {
        "term": "Complaint",
        "termUr": "شکایت",
        "definition": "Formal legal document starting lawsuit",
        "definitionUr": "رسمی قانونی دستاویز جو مقدمہ شروع کرتی ہے",
        "category": "court"
    },
    {
        "term": "Court",
        "termUr": "عدالت",
        "definition": "Government institution that resolves legal disputes",
        "definitionUr": "حکومتی ادارہ جو قانونی تنازعات کو حل کرتا ہے",
        "category": "court"
    },
    {
        "term": "Defendant",
        "termUr": "مدعا علیہ",
        "definition": "Person accused in criminal case or sued in civil case",
        "definitionUr": "وہ شخص جس پر فوجداری مقدمے میں الزام لگایا گیا ہو یا سول مقدمے میں مقدمہ کیا گیا ہو",
        "category": "court"
    },
    {
        "term": "Evidence",
        "termUr": "ثبوت",
        "definition": "Information presented in court to prove facts",
        "definitionUr": "عدالت میں پیش کی گئی معلومات جو حقائق ثابت کرتی ہیں",
        "category": "court"
    },
    {
        "term": "Hearing",
        "termUr": "سماعت",
        "definition": "Court proceeding where evidence and arguments presented",
        "definitionUr": "عدالتی کارروائی جہاں ثبوت اور دلائل پیش کیے جاتے ہیں",
        "category": "court"
    },
    {
        "term": "Judge",
        "termUr": "جج",
        "definition": "Court official who decides cases",
        "definitionUr": "عدالتی اہلکار جو مقدمات کا فیصلہ کرتا ہے",
        "category": "court"
    },
    {
        "term": "Judgment",
        "termUr": "فیصلہ",
        "definition": "Final court decision resolving case",
        "definitionUr": "عدالت کا حتمی فیصلہ جو مقدمہ حل کرتا ہے",
        "category": "court"
    },
    {
        "term": "Jurisdiction",
        "termUr": "دائرہ اختیار",
        "definition": "Court's authority to hear and decide specific cases",
        "definitionUr": "عدالت کا اختیار کہ وہ مخصوص مقدمات سنے اور فیصلہ کرے",
        "category": "court"
    },
    {
        "term": "Jury",
        "termUr": "جیوری",
        "definition": "Group of citizens who decide facts in some cases",
        "definitionUr": "شہریوں کا گروپ جو کچھ مقدمات میں حقائق کا فیصلہ کرتا ہے",
        "category": "court"
    },
    {
        "term": "Litigation",
        "termUr": "مقدمہ بازی",
        "definition": "Process of taking legal action through courts",
        "definitionUr": "عدالتوں کے ذریعے قانونی کارروائی کرنے کا عمل",
        "category": "court"
    },
    {
        "term": "Oath",
        "termUr": "حلف",
        "definition": "Solemn promise to tell truth in legal proceedings",
        "definitionUr": "قانونی کارروائیوں میں سچ بولنے کا سنجیدہ وعدہ",
        "category": "court"
    },
    {
        "term": "Petition",
        "termUr": "درخواست",
        "definition": "Formal written request to court for specific action",
        "definitionUr": "عدالت سے مخصوص کارروائی کے لیے رسمی تحریری درخواست",
        "category": "court"
    },
    {
        "term": "Plaintiff",
        "termUr": "مدعی",
        "definition": "Person who brings civil lawsuit",
        "definitionUr": "وہ شخص جو سول مقدمہ دائر کرتا ہے",
        "category": "court"
    },
    {
        "term": "Plea",
        "termUr": "درخواست",
        "definition": "Defendant's formal answer to criminal charges",
        "definitionUr": "مدعا علیہ کا فوجداری الزامات کا رسمی جواب",
        "category": "court"
    },
    {
        "term": "Prosecution",
        "termUr": "استغاثہ",
        "definition": "Government lawyers who bring criminal cases",
        "definitionUr": "سرکاری وکیل جو فوجداری مقدمات لاتے ہیں",
        "category": "court"
    },
    {
        "term": "Remand",
        "termUr": "رمانڈ",
        "definition": "Order to keep accused in custody during investigation",
        "definitionUr": "تفتیش کے دوران ملزم کو حراست میں رکھنے کا حکم",
        "category": "court"
    },
    {
        "term": "Sentence",
        "termUr": "سزا",
        "definition": "Punishment ordered by court after conviction",
        "definitionUr": "سزا کے بعد عدالت کا سزا کا حکم",
        "category": "court"
    },
    {
        "term": "Summons",
        "termUr": "سمن",
        "definition": "Court order requiring person to appear",
        "definitionUr": "عدالت کا حکم جس کے تحت کسی شخص کو حاضر ہونا ضروری ہوتا ہے",
        "category": "court"
    },
    {
        "term": "Testimony",
        "termUr": "شہادت",
        "definition": "Spoken evidence given under oath in court",
        "definitionUr": "عدالت میں حلف کے تحت دی گئی زبانی شہادت",
        "category": "court"
    },
    {
        "term": "Trial",
        "termUr": "ٹرائل",
        "definition": "Court proceeding where evidence examined and decision made",
        "definitionUr": "عدالتی کارروائی جہاں ثبوت کی جانچ پڑتال ہوتی ہے اور فیصلہ کیا جاتا ہے",
        "category": "court"
    },
    {
        "term": "Verdict",
        "termUr": "فیصلہ",
        "definition": "Jury or judge's decision on guilt or innocence",
        "definitionUr": "جیوری یا جج کا قصور یا بے قصور ہونے کا فیصلہ",
        "category": "court"
    },
    {
        "term": "Witness",
        "termUr": "گواہ",
        "definition": "Person who gives evidence in court",
        "definitionUr": "وہ شخص جو عدالت میں شہادت دیتا ہے",
        "category": "court"
    },
    {
        "term": "Affidavit",
        "termUr": "حلف نامہ",
        "definition": "Written statement sworn under oath",
        "definitionUr": "تحریری بیان جو حلف کے تحت حلفیہ ہو",
        "category": "documents"
    },
    {
        "term": "Agreement",
        "termUr": "معاہدہ",
        "definition": "Understanding between parties creating legal obligations",
        "definitionUr": "فریقین کے درمیان تفہیم جو قانونی ذمہ داریاں پیدا کرتی ہے",
        "category": "documents"
    },
    {
        "term": "Clause",
        "termUr": "شق",
        "definition": "Specific section or provision in legal document",
        "definitionUr": "قانونی دستاویز میں مخصوص سیکشن یا شق",
        "category": "documents"
    },
    {
        "term": "Contract",
        "termUr": "معاہدہ",
        "definition": "Legally binding agreement between parties",
        "definitionUr": "فریقین کے درمیان قانونی طور پر پابند معاہدہ",
        "category": "documents"
    },
    {
        "term": "Deed",
        "termUr": "دستاویز",
        "definition": "Legal document transferring property or creating rights",
        "definitionUr": "قانونی دستاویز جو جائیداد منتقل کرتی ہے یا حقوق پیدا کرتی ہے",
        "category": "documents"
    },
    {
        "term": "Document",
        "termUr": "دستاویز",
        "definition": "Written or electronic record containing information",
        "definitionUr": "تحریری یا الیکٹرانک ریکارڈ جس میں معلومات ہوں",
        "category": "documents"
    },
    {
        "term": "Execution",
        "termUr": "عملدرآمد",
        "definition": "Formal signing of legal document",
        "definitionUr": "قانونی دستاویز کا رسمی دستخط",
        "category": "documents"
    },
    {
        "term": "Instrument",
        "termUr": "آلہ",
        "definition": "Formal legal document creating rights or obligations",
        "definitionUr": "رسمی قانونی دستاویز جو حقوق یا ذمہ داریاں پیدا کرتی ہے",
        "category": "documents"
    },
    {
        "term": "License",
        "termUr": "لائسنس",
        "definition": "Official permission to do something that would otherwise be illegal",
        "definitionUr": "سرکاری اجازت کچھ کرنے کی جو بصورت دیگر غیر قانونی ہوگا",
        "category": "documents"
    },
    {
        "term": "Notice",
        "termUr": "نوٹس",
        "definition": "Formal communication of information",
        "definitionUr": "معلومات کی رسمی مواصلت",
        "category": "documents"
    },
    {
        "term": "Permit",
        "termUr": "پرمٹ",
        "definition": "Official document granting permission",
        "definitionUr": "سرکاری دستاویز جو اجازت دیتی ہے",
        "category": "documents"
    },
    {
        "term": "Will",
        "termUr": "وصیت نامہ",
        "definition": "Legal document specifying how property should be distributed after death",
        "definitionUr": "قانونی دستاویز جو بتاتی ہے کہ موت کے بعد جائیداد کیسے تقسیم ہونی چاہیے",
        "category": "documents"
    },
    {
        "term": "Writ",
        "termUr": "رٹ",
        "definition": "Court order requiring specific action",
        "definitionUr": "عدالت کا حکم جس کے تحت مخصوص کارروائی ضروری ہوتی ہے",
        "category": "documents"
    },
    {
        "term": "Arbitration",
        "termUr": "ثالثی",
        "definition": "Resolving disputes outside court using neutral third party",
        "definitionUr": "غیر جانبدار تیسرے فریق کا استعمال کرتے ہوئے عدالت سے باہر تنازعات حل کرنا",
        "category": "adr"
    },
    {
        "term": "Award",
        "termUr": "ایوارڈ",
        "definition": "Decision made by arbitrator in dispute resolution",
        "definitionUr": "تنازعہ کے حل میں ثالث کے ذریعے کیا گیا فیصلہ",
        "category": "adr"
    },
    {
        "term": "Conciliation",
        "termUr": "مصالحت",
        "definition": "Process where neutral person helps parties reach agreement",
        "definitionUr": "عمل جہاں غیر جانبدار شخص فریقین کو معاہدے تک پہنچنے میں مدد کرتا ہے",
        "category": "adr"
    },
    {
        "term": "Mediation",
        "termUr": "ثالثی",
        "definition": "Assisted negotiation with neutral facilitator",
        "definitionUr": "غیر جانبدار فیسلیٹیٹر کے ساتھ معاونت شدہ مذاکرات",
        "category": "adr"
    },
    {
        "term": "Negotiation",
        "termUr": "مذاکرات",
        "definition": "Discussion between parties to reach agreement",
        "definitionUr": "معاہدے تک پہنچنے کے لیے فریقین کے درمیان بحث",
        "category": "adr"
    },
    {
        "term": "Settlement",
        "termUr": "تصفیہ",
        "definition": "Agreement resolving dispute without trial",
        "definitionUr": "ٹرائل کے بغیر تنازعہ حل کرنے والا معاہدہ",
        "category": "adr"
    },
    {
        "term": "Arbitrator",
        "termUr": "ثالث",
        "definition": "Neutral person who decides dispute in arbitration",
        "definitionUr": "غیر جانبدار شخص جو ثالثی میں تنازعہ کا فیصلہ کرتا ہے",
        "category": "adr"
    },
    {
        "term": "Conciliator",
        "termUr": "مصالحت کار",
        "definition": "Neutral person who helps parties reach agreement",
        "definitionUr": "غیر جانبدار شخص جو فریقین کو معاہدے تک پہنچنے میں مدد کرتا ہے",
        "category": "adr"
    },
    {
        "term": "Mediator",
        "termUr": "ثالث",
        "definition": "Neutral facilitator who assists parties in reaching agreement",
        "definitionUr": "غیر جانبدار فیسلیٹیٹر جو فریقین کو معاہدے تک پہنچنے میں مدد کرتا ہے",
        "category": "adr"
    },
    {
        "term": "Party",
        "termUr": "فریق",
        "definition": "Person or organization involved in legal dispute",
        "definitionUr": "قانونی تنازعہ میں شامل شخص یا تنظیم",
        "category": "adr"
    },
    {
        "term": "Adjournment",
        "termUr": "التوا",
        "definition": "Postponement of court hearing to later date",
        "definitionUr": "عدالتی سماعت کا بعد کی تاریخ کے لیے ملتوی کرنا",
        "category": "court"
    },
    {
        "term": "Advocate",
        "termUr": "ایڈووکیٹ",
        "definition": "Lawyer licensed to practice in courts",
        "definitionUr": "وکیل جو عدالتوں میں پریکٹس کرنے کا لائسنس رکھتا ہو",
        "category": "court"
    },
    {
        "term": "Allegation",
        "termUr": "الزام",
        "definition": "Claim made without proof yet to be established",
        "definitionUr": "دعویٰ جو ثبوت کے بغیر کیا گیا ہو ابھی قائم ہونا باقی ہو",
        "category": "court"
    },
    {
        "term": "Appellant",
        "termUr": "اپیل کنندہ",
        "definition": "Person who files appeal",
        "definitionUr": "وہ شخص جو اپیل دائر کرتا ہے",
        "category": "court"
    },
    {
        "term": "Applicant",
        "termUr": "درخواست گزار",
        "definition": "Person who applies to court for relief",
        "definitionUr": "وہ شخص جو عدالت سے راحت کے لیے درخواست دیتا ہے",
        "category": "court"
    },
    {
        "term": "Bailable Offense",
        "termUr": "ضمانتی جرم",
        "definition": "Crime for which bail can be granted",
        "definitionUr": "وہ جرم جس کے لیے ضمانت دی جا سکتی ہے",
        "category": "court"
    },
    {
        "term": "Bar",
        "termUr": "بار",
        "definition": "Legal profession; community of lawyers",
        "definitionUr": "قانونی پیشہ؛ وکلا کی کمیونٹی",
        "category": "court"
    },
    {
        "term": "Bench",
        "termUr": "بینچ",
        "definition": "Judges collectively; place where judges sit",
        "definitionUr": "اجتماعی طور پر ججز؛ وہ جگہ جہاں جج بیٹھتے ہیں",
        "category": "court"
    },
    {
        "term": "Cause List",
        "termUr": "کیس لسٹ",
        "definition": "Schedule of cases to be heard by court",
        "definitionUr": "ان مقدمات کا شیڈول جو عدالت کو سننے ہیں",
        "category": "court"
    },
    {
        "term": "Caveat",
        "termUr": "کیویٹ",
        "definition": "Warning not to take certain action without notice",
        "definitionUr": "انتباہ کہ نوٹس کے بغیر کوئی خاص کارروائی نہ کی جائے",
        "category": "court"
    },
    {
        "term": "Certified Copy",
        "termUr": "سرٹیفائیڈ کاپی",
        "definition": "Official copy verified as true by court",
        "definitionUr": "سرکاری کاپی جس کی عدالت نے سچائی کی تصدیق کی ہو",
        "category": "court"
    },
    {
        "term": "Cognizable Offense",
        "termUr": "قابل گرفت جرم",
        "definition": "Serious crime where police can arrest without warrant",
        "definitionUr": "سنگین جرم جہاں پولیس وارنٹ کے بغیر گرفتاری کر سکتی ہے",
        "category": "court"
    },
    {
        "term": "Commission",
        "termUr": "کمیشن",
        "definition": "Authority to take evidence outside court",
        "definitionUr": "عدالت سے باہر ثبوت لینے کا اختیار",
        "category": "court"
    },
    {
        "term": "Compromise",
        "termUr": "مصالحت",
        "definition": "Settlement where parties agree to resolve dispute",
        "definitionUr": "تصفیہ جہاں فریقین تنازعہ حل کرنے پر راضی ہوتے ہیں",
        "category": "court"
    },
    {
        "term": "Consent Order",
        "termUr": "رضامندی آرڈر",
        "definition": "Court order made with parties' agreement",
        "definitionUr": "عدالت کا حکم جو فریقین کی رضامندی سے بنایا گیا ہو",
        "category": "court"
    },
    {
        "term": "Contempt of Court",
        "termUr": "توہین عدالت",
        "definition": "Disobeying court order or showing disrespect to court",
        "definitionUr": "عدالت کے حکم کی نافرمانی یا عدالت کی بے احترامی کرنا",
        "category": "court"
    },
    {
        "term": "Cross-examination",
        "termUr": "جرح",
        "definition": "Questioning of witness by opposing party",
        "definitionUr": "مخالف فریق کی طرف سے گواہ سے سوالات",
        "category": "court"
    },
    {
        "term": "Decree",
        "termUr":  "ڈگری",
        "definition": "Final judgment of court in civil case",
        "definitionUr": "سول مقدمے میں عدالت کا حتمی فیصلہ",
        "category": "court"
    },
    {
        "term": "Deposition",
        "termUr": "بیان",
        "definition": "Written testimony given under oath outside court",
        "definitionUr": "عدالت سے باہر حلف کے تحت دی گئی تحریری شہادت",
        "category": "court"
    },
    {
        "term": "Detention",
        "termUr": "نظر بندی",
        "definition": "Holding person in custody",
        "definitionUr": "کسی شخص کو حراست میں رکھنا",
        "category": "court"
    },
    {
        "term": "Discovery",
        "termUr": "ڈسکوری",
        "definition": "Process of obtaining evidence from other party",
        "definitionUr": "دوسرے فریق سے ثبوت حاصل کرنے کا عمل",
        "category": "court"
    },
    {
        "term": "Dismissal",
        "termUr": "مسترد کرنا",
        "definition": "Court order ending case without full trial",
        "definitionUr": "عدالت کا حکم جو مکمل ٹرائل کے بغیر مقدمہ ختم کرتا ہے",
        "category": "court"
    },
    {
        "term": "Ex parte",
        "termUr": "ایکس پارٹی",
        "definition": "Proceeding where only one party present",
        "definitionUr": "کارروائی جہاں صرف ایک فریق موجود ہو",
        "category": "court"
    },
    {
        "term": "Exhibit",
        "termUr": "ایگزیبٹ",
        "definition": "Document or object presented as evidence",
        "definitionUr": "دستاویز یا چیز جو ثبوت کے طور پر پیش کی گئی ہو",
        "category": "court"
    },
    {
        "term": "Expert Witness",
        "termUr": "ماہر گواہ",
        "definition": "Person with specialized knowledge who gives opinion evidence",
        "definitionUr": "ماہر شخص جو رائے کا ثبوت دیتا ہے",
        "category": "court"
    },
    {
        "term": "Finding",
        "termUr": "تلاش",
        "definition": "Court's determination of facts in case",
        "definitionUr": "عدالت کا مقدمے میں حقائق کا تعین",
        "category": "court"
    },
    {
        "term": "Garnishee",
        "termUr": "گارنیشی",
        "definition": "Third party who holds money for judgment debtor",
        "definitionUr": "تیسرا فریق جو فیصلہ قرض دار کے لیے پیسے رکھتا ہے",
        "category": "court"
    },
    {
        "term": "Guardian ad litem",
        "termUr": "عارضی سرپرست",
        "definition": "Person appointed to represent minor or incompetent in lawsuit",
        "definitionUr": "وہ شخص جو مقدمے میں نابالغ یا نااہل کی نمائندگی کے لیے مقرر کیا گیا ہو",
        "category": "court"
    },
    {
        "term": "Habeas Corpus",
        "termUr": "ہیبیس کارپس",
        "definition": "Court order requiring person detained to be brought before court",
        "definitionUr": "عدالت کا حکم جس کے تحت حراست میں لیے گئے شخص کو عدالت میں لایا جائے",
        "category": "court"
    },
    {
        "term": "In camera",
        "termUr": "ان کیمرا",
        "definition": "Hearing held in private, not open to public",
        "definitionUr": "سماعت جو پرائیویٹ میں ہو، عوام کے لیے کھلی نہ ہو",
        "category": "court"
    },
    {
        "term": "Injunction",
        "termUr": "انجکشن",
        "definition": "Court order requiring party to do or not do something",
        "definitionUr": "عدالت کا حکم جس کے تحت فریق کو کچھ کرنا یا نہ کرنا ضروری ہوتا ہے",
        "category": "court"
    },
    {
        "term": "Interim Order",
        "termUr": "عارضی حکم",
        "definition": "Temporary order during pendency of case",
        "definitionUr": "مقدمے کے دوران عارضی حکم",
        "category": "court"
    },
    {
        "term": "Interrogatory",
        "termUr": "سوالنامہ",
        "definition": "Written question to other party that must be answered under oath",
        "definitionUr": "دوسرے فریق کو تحریری سوال جو حلف کے تحت جواب دینا ضروری ہو",
        "category": "court"
    },
    {
        "term": "Judicial Review",
        "termUr": "عدالتی جائزہ",
        "definition": "Court's power to review government actions",
        "definitionUr": "عدالت کا اختیار کہ وہ حکومتی اقدامات کا جائزہ لے",
        "category": "court"
    },
    {
        "term": "Jurisprudence",
        "termUr": "فقہ",
        "definition": "Philosophy or science of law",
        "definitionUr": "قانون کا فلسفہ یا سائنس",
        "category": "court"
    },
    {
        "term": "Leading Question",
        "termUr": "اہم سوال",
        "definition": "Question suggesting desired answer",
        "definitionUr": "سوال جو مطلوبہ جواب کی تجویز کرتا ہے",
        "category": "court"
    },
    {
        "term": "Legal Aid",
        "termUr": "قانونی امداد",
        "definition": "Free legal assistance for those who cannot afford",
        "definitionUr": "مفت قانونی مدد ان کے لیے جو برداشت نہیں کر سکتے",
        "category": "court"
    },
    {
        "term": "Locus Standi",
        "termUr": "لوکس سٹینڈی",
        "definition": "Right to bring legal action",
        "definitionUr": "قانونی کارروائی لانے کا حق",
        "category": "court"
    },
    {
        "term": "Mandamus",
        "termUr": "مانڈیمس",
        "definition": "Court order requiring public official to perform duty",
        "definitionUr": "عدالت کا حکم جس کے تحت سرکاری اہلکار کو ڈیوٹی انجام دینی ہوتی ہے",
        "category": "court"
    },
    {
        "term": "Mens Rea",
        "termUr": "مینس ریا",
        "definition": "Criminal intent or mental state",
        "definitionUr": "مجرمانہ ارادہ یا ذہنی حالت",
        "category": "court"
    },
    {
        "term": "Motion",
        "termUr": "موشن",
        "definition": "Application to court for order or ruling",
        "definitionUr": "عدالت سے حکم یا فیصلے کے لیے درخواست",
        "category": "court"
    },
    {
        "term": "Non-bailable Offense",
        "termUr": "غیر ضمانتی جرم",
        "definition": "Serious crime where bail not granted as right",
        "definitionUr": "سنگین جرم جہاں ضمانت حق کے طور پر نہیں دی جاتی",
        "category": "court"
    },
    {
        "term": "Non-cognizable Offense",
        "termUr": "غیر قابل گرفت جرم",
        "definition": "Less serious crime where police need warrant to arrest",
        "definitionUr": "کم سنگین جرم جہاں پولیس کو گرفتاری کے لیے وارنٹ کی ضرورت ہوتی ہے",
        "category": "court"
    },
    {
        "term": "Notice",
        "termUr": "نوٹس",
        "definition": "Formal information or warning",
        "definitionUr": "رسمی معلومات یا انتباہ",
        "category": "court"
    },
    {
        "term": "Oath",
        "termUr": "حلف",
        "definition": "Solemn promise to tell truth",
        "definitionUr": "سچ بولنے کا سنجیدہ وعدہ",
        "category": "court"
    },
    {
        "term": "Objection",
        "termUr": "اعتراض",
        "definition": "Formal protest against evidence or procedure",
        "definitionUr": "ثبوت یا طریقہ کار کے خلاف رسمی احتجاج",
        "category": "court"
    },
    {
        "term": "Order",
        "termUr": "حکم",
        "definition": "Court's direction on specific matter in case",
        "definitionUr": "مقدمے میں مخصوص معاملے پر عدالت کی ہدایت",
        "category": "court"
    },
    {
        "term": "Perjury",
        "termUr": "جھوٹی گواہی",
        "definition": "Lying under oath",
        "definitionUr": "حلف کے تحت جھوٹ بولنا",
        "category": "court"
    },
    {
        "term": "Petitioner",
        "termUr": "درخواست گزار",
        "definition": "Person who files petition in court",
        "definitionUr": "وہ شخص جو عدالت میں درخواست دائر کرتا ہے",
        "category": "court"
    },
    {
        "term": "Pleading",
        "termUr": "درخواست",
        "definition": "Formal written statement of party's claims or defenses",
        "definitionUr": "فریق کے دعووں یا دفاع کا رسمی تحریری بیان",
        "category": "court"
    },
    {
        "term": "Precedent",
        "termUr": "پریسیڈنٹ",
        "definition": "Previous court decision guiding similar cases",
        "definitionUr": "پچھلا عدالتی فیصلہ جو اسی طرح کے مقدمات کی رہنمائی کرتا ہے",
        "category": "court"
    },
    {
        "term": "Pro bono",
        "termUr": "پرو بونو",
        "definition": "Legal work done without charge",
        "definitionUr": "مفت کیا گیا قانونی کام",
        "category": "court"
    },
    {
        "term": "Procedural Law",
        "termUr": "طریقہ کار کا قانون",
        "definition": "Rules governing court process and procedure",
        "definitionUr": "قواعد جو عدالتی عمل اور طریقہ کار کو کنٹرول کرتے ہیں",
        "category": "court"
    },
    {
        "term": "Quash",
        "termUr": "کوارش",
        "definition": "To annul or make void",
        "definitionUr": "منسوخ کرنا یا باطل کرنا",
        "category": "court"
    },
    {
        "term": "Recusal",
        "termUr": "دستبرداری",
        "definition": "Judge stepping down from case due to conflict",
        "definitionUr": "جج کا تنازعہ کی وجہ سے مقدمے سے دستبردار ہونا",
        "category": "court"
    },
    {
        "term": "Respondent",
        "termUr": "جواب دہندہ",
        "definition": "Person against whom appeal or petition filed",
        "definitionUr": "وہ شخص جس کے خلاف اپیل یا درخواست دائر کی گئی ہو",
        "category": "court"
    },
    {
        "term": "Review",
        "termUr": "جائزہ",
        "definition": "Reconsideration of court decision by same court",
        "definitionUr": "اسی عدالت کے ذریعے عدالتی فیصلے کا دوبارہ غور",
        "category": "court"
    },
    {
        "term": "Revision",
        "termUr": " نظر ثانی",
        "definition": "Re-examination of case by higher court",
        "definitionUr": "اعلیٰ عدالت کے ذریعے مقدمے کا دوبارہ جائزہ",
        "category": "court"
    },
    {
        "term": "Ruling",
        "termUr": "فیصلہ",
        "definition": "Court's decision on specific point",
        "definitionUr": "مخصوص نقطے پر عدالت کا فیصلہ",
        "category": "court"
    },
    {
        "term": "Show Cause",
        "termUr": "شو کاز",
        "definition": "Order requiring party to explain why something shouldn't be done",
        "definitionUr": "حکم جس کے تحت فریق کو وضاحت کرنی ہوتی ہے کہ کچھ کیوں نہیں کیا جانا چاہیے",
        "category": "court"
    },
    {
        "term": "Stay Order",
        "termUr": "سٹے آرڈر",
        "definition": "Court order suspending legal proceedings",
        "definitionUr": "عدالت کا حکم جو قانونی کارروائیوں کو معطل کرتا ہے",
        "category": "court"
    },
    {
        "term": "Sub judice",
        "termUr": "سب جیوڈیس",
        "definition": "Matter currently under court consideration",
        "definitionUr": "معاملہ جو فی الحال عدالت کے غور میں ہے",
        "category": "court"
    },
    {
        "term": "Subpoena",
        "termUr": "سپینا",
        "definition": "Court order requiring person to appear as witness",
        "definitionUr": "عدالت کا حکم جس کے تحت کسی شخص کو گواہ کے طور پر حاضر ہونا ہوتا ہے",
        "category": "court"
    },
    {
        "term": "Substantive Law",
        "termUr": "اساسی قانون",
        "definition": "Law defining rights and duties",
        "definitionUr": "قانون جو حقوق اور فرائض کی وضاحت کرتا ہے",
        "category": "court"
    },
    {
        "term": "Suo motu",
        "termUr": "سوو موٹو",
        "definition": "Court acting on its own initiative",
        "definitionUr": "عدالت کا اپنی مرضی سے کام کرنا",
        "category": "court"
    },
    {
        "term": "Surety",
        "termUr": "ضامن",
        "definition": "Person who guarantees accused will appear in court",
        "definitionUr": "وہ شخص جو ضمانت دیتا ہے کہ ملزم عدالت میں حاضر ہوگا",
        "category": "court"
    },
    {
        "term": "Suspension",
        "termUr": "معطلی",
        "definition": "Temporary stopping of something",
        "definitionUr": "کسی چیز کی عارضی طور پر روک",
        "category": "court"
    },
    {
        "term": "Transit Bail",
        "termUr": "ٹرانزٹ بیل",
        "definition": "Bail granted to travel to where case is filed",
        "definitionUr": "ضمانت جو اس جگہ سفر کرنے کے لیے دی جاتی ہے جہاں مقدمہ دائر ہے",
        "category": "court"
    },
    {
        "term": "Warrant",
        "termUr": "وارنٹ",
        "definition": "Court order authorizing arrest or search",
        "definitionUr": "عدالت کا حکم جو گرفتاری یا تلاشی کی اجازت دیتا ہے",
        "category": "court"
    },
    {
        "term": "Without Prejudice",
        "termUr": "بدون تعصب",
        "definition": "Communication that cannot be used as evidence",
        "definitionUr": "مواصلت جو ثبوت کے طور پر استعمال نہیں ہو سکتی",
        "category": "court"
    },
    {
        "term": "CrPC",
        "termUr": "سی آر پی سی",
        "definition": "Code of Criminal Procedure - The main legislation that outlines the procedure for administration of criminal law in Pakistan.",
        "definitionUr": "فوجداری کارروائی کا کوڈ - اہم قانون جو پاکستان میں فوجداری قانون کے انتظام کے طریقہ کار کی خاکہ پیش کرتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "CNS Act",
        "termUr": "سی این ایس ایکٹ",
        "definition": "Control of Narcotics Substances Act - Pakistani law that regulates and controls narcotic drugs, psychotropic substances, and precursor chemicals.",
        "definitionUr": "نشہ آور مادوں کے کنٹرول کا ایکٹ - پاکستانی قانون جو نشہ آور ادویات، نفسیاتی مادوں اور پریکرسر کیمیکلز کو ریگولیٹ اور کنٹرول کرتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "EOBI",
        "termUr": "ای او بی آئی",
        "definition": "Employees Old-Age Benefits Institution - Organization providing pensions and old-age benefits to employees in Pakistan.",
        "definitionUr": "ملازمین کی بڑھاپے کی فوائد کی انسٹی ٹیوشن - تنظیم جو پاکستان میں ملازمین کو پنشن اور بڑھاپے کے فوائد فراہم کرتی ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "FA",
        "termUr": "ایف اے",
        "definition": "Factories Act - Law regulating working conditions, safety, and welfare in factories.",
        "definitionUr": "فیکٹریز ایکٹ - قانون جو فیکٹریوں میں کام کے حالات، حفاظت اور بہبود کو ریگولیٹ کرتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "FIA",
        "termUr": "ایف آئی اے",
        "definition": "Federal Investigation Agency - Pakistan's federal law enforcement agency with jurisdiction over federal crimes.",
        "definitionUr": "وفاقی تحقیقاتی ایجنسی - پاکستان کی وفاقی قانون نافذ کرنے والی ایجنسی جس کا دائرہ اختیار وفاقی جرائم پر ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "GWA",
        "termUr": "جی ڈبلیو اے",
        "definition": "Guardians and Wards Act - Law governing the appointment and responsibilities of guardians for minors.",
        "definitionUr": "گارڈینز اینڈ وارڈز ایکٹ - قانون جو نابالغوں کے لیے سرپرستوں کی تقرری اور ذمہ داریوں کو کنٹرول کرتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "IRA",
        "termUr": "آئی آر اے",
        "definition": "Industrial Relations Act - Law governing relationships between employers, workers, and unions.",
        "definitionUr": "انڈسٹریل ریلیشنز ایکٹ - قانون جو آجروں، کارکنوں اور یونینوں کے درمیان تعلقات کو کنٹرول کرتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "MFLO",
        "termUr": "ایم ایف ایل او",
        "definition": "Muslim Family Laws Ordinance - Laws regulating Muslim marriages, divorces, and family matters in Pakistan.",
        "definitionUr": "مسلم فیملی لاز آرڈیننس - قوانین جو پاکستان میں مسلم شادیوں، طلاقوں اور خاندانی معاملات کو ریگولیٹ کرتے ہیں۔",
        "category": "abbreviations"
    },
    {
        "term": "MLO",
        "termUr": "ایم ایل او",
        "definition": "Maternity Leave Ordinance - Legislation providing maternity leave benefits to working women.",
        "definitionUr": "میتھرنٹی لیو آرڈیننس - قانون سازی جو کام کرنے والی خواتین کو زچگی کی چھٹی کے فوائد فراہم کرتی ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "PBUH",
        "termUr": "ﷺ",
        "definition": "Peace Be Upon Him - Honorific used after Prophet Muhammad's name in Islamic tradition.",
        "definitionUr": "صلی اللہ علیہ وسلم - عزت کا لقب جو اسلامی روایت میں حضرت محمد کے نام کے بعد استعمال ہوتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "PPC",
        "termUr": "پی پی سی",
        "definition": "Pakistan Penal Code - Defines crimes and punishments for criminal offenses in Pakistan.",
        "definitionUr": "پاکستان پینل کوڈ - پاکستان میں مجرمانہ جرائم اور ان کی سزائیں بیان کرتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "PECA",
        "termUr": "پی ای سی اے",
        "definition": "Prevention of Electronic Crimes Act - Pakistani law addressing crimes committed using computers, internet, and electronic devices.",
        "definitionUr": "الیکٹرانک جرائم کی روک تھام کا ایکٹ - پاکستانی قانون جو کمپیوٹر، انٹرنیٹ اور الیکٹرانک ڈیوائسز کا استعمال کرتے ہوئے کیے جانے والے جرائم سے نمٹتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "PMVO",
        "termUr": "پی ایم وی او",
        "definition": "Pakistan Motor Vehicle Ordinance - Legislation governing motor vehicles and traffic regulations.",
        "definitionUr": "پاکستان موٹر وہیکل آرڈیننس - قانون سازی جو موٹر گاڑیوں اور ٹریفک کے ضوابط کو کنٹرول کرتی ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "PTA",
        "termUr": "پی ٹی اے",
        "definition": "Pakistan Telecommunication Authority - Regulatory body for telecommunications in Pakistan.",
        "definitionUr": "پاکستان ٹیلی کمیونیکیشن اتھارٹی - پاکستان میں ٹیلی کمیونیکیشنز کے لیے ریگولیٹری باڈی۔",
        "category": "abbreviations"
    },
    {
        "term": "PWA",
        "termUr": "پی ڈبلیو اے",
        "definition": "Payment of Wages Act - Law ensuring timely payment of wages to workers.",
        "definitionUr": "ادائیگی اجرت کا ایکٹ - قانون جو کارکنوں کو بروقت اجرت کی ادائیگی کو یقینی بناتا ہے۔",
        "category": "abbreviations"
    },
    {
        "term": "Rs.",
        "termUr": "روپے",
        "definition": "Pakistani Rupees - Official currency of Pakistan.",
        "definitionUr": "پاکستانی روپے - پاکستان کی سرکاری کرنسی۔",
        "category": "abbreviations"
    },
    {
        "term": "SESSI",
        "termUr": "سیسسی",
        "definition": "Social Security Institution - Provincial social security institutions providing benefits for health, disability, and retirement.",
        "definitionUr": "سوشل سیکورٹی انسٹی ٹیوشن - صوبائی سوشل سیکورٹی ادارے جو صحت، معذوری اور ریٹائرمنٹ کے فوائد فراہم کرتے ہیں۔",
        "category": "abbreviations"
    },
    {
        "term": "WCA",
        "termUr": "ڈبلیو سی اے",
        "definition": "Workmen's Compensation Act - Legislation providing compensation for work-related injuries or illnesses.",
        "definitionUr": "ورکرز کمپنسیشن ایکٹ - قانون سازی جو کام سے متعلقہ چوٹوں یا بیماریوں کے لیے معاوضہ فراہم کرتی ہے۔",
        "category": "abbreviations"
    }
];

export default glossaryItems;