
export const content = {
  en: {
    home: {
      nav: {
        about: 'About',
        signIn: 'Sign In',
        innovations: 'Innovations',
        howItWorks: 'How It Works',
        shop: 'Shop',
      },
      hero: {
        title: 'FloraChain, every herb tells its story',
        titleHighlight: 'from soil to shelf.',
        subtitle: "Experience unparalleled transparency in the herbal supply chain. Follow your product's complete journey from the farm to your hands, verified at every step.",
        trackButton: 'Track Your Product',
        shopButton: 'Shop Now',
        alt: 'Lush green landscape',
      },
      innovations: {
        title: 'Key Innovations',
        description: 'Discover the next-generation technology that makes FloraChain unique and sets a new standard for trust and sustainability in the supply chain.',
        p1: {
            title: 'Biodiversity Credit Marketplace',
            description: 'Tokenized green credits are awarded for verified sustainable and regenerative harvesting practices, creating a new revenue stream for ethical farmers.',
        },
        p2: {
            title: 'Impact NFTs for Consumers',
            description: 'Each purchase can mint a unique Impact NFT, visually representing the product\'s journey, the farmer\'s story, and the positive environmental impact.',
        },
        p3: {
            title: 'Zero-Knowledge Compliance Proofs',
            description: 'Verify authenticity and regulatory compliance on the blockchain without ever exposing sensitive farmer or proprietary company data, ensuring privacy.',
        },
        p4: {
            title: 'Digital Twin & Predictive Simulation',
            description: 'A real-time virtual model of the supply chain predicts disruptions, simulates demand spikes, and optimizes inventory, reducing waste.',
        },
        p5: {
            title: 'Climate-Adaptive Smart Contracts',
            description: 'Contracts automatically adjust harvest schedules and farmer payments based on live, localized weather data, building resilience against climate change.',
        },
        p6: {
            title: 'Dynamic Incentives',
            description: 'Reward farmers in real-time for meeting quality benchmarks, water conservation, and other sustainable goals, driving positive behavior.',
        }
      },
       coreTech: {
        title: 'Our Core Technology',
        description: 'Our platform is built on three core technological pillars that provide an immutable, end-to-end provenance ledger.',
        p1: {
          title: 'Geo-Tagging & Smart Contracts',
          description: 'Harvest events are geo-tagged at the source. Smart contracts automatically verify the location is within an approved zone, ensuring origin authenticity.',
        },
        p2: {
          title: 'Immutable Ledger',
          description: 'Every step, from harvest to processing to lab testing, is recorded on a permissioned blockchain, creating a tamper-proof, end-to-end provenance record.',
        },
        p3: {
          title: 'Consumer Smart Labels',
          description: 'A unique QR code on each product links consumers to an interactive dashboard showing the full journey, including maps, certificates, and farmer profiles.',
        }
      },
      shopSection: {
        title: 'Shop Our Verifiably Sourced Products',
        description: 'Each product is linked to its complete provenance record. Experience true transparency.',
      },
      snapshot: {
        batches: 'Batches Tracked',
        farmers: 'Farmers Registered',
        products: 'Products Delivered',
      },
      footer: {
        slogan: 'Traceability from soil to soul.',
        navigate: {
            title: 'Navigate',
            about: 'About',
            track: 'Track Product',
            signIn: 'Sign In',
        },
        partners: {
            title: 'Partners',
            joinFarmer: 'Join as a Farmer',
            brands: 'Brand Partnerships',
            distributors: 'Distributors',
        },
        legal: {
            title: 'Legal',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact Us',
        },
        rights: 'All rights reserved.',
      },
    },
    register: {
        form: {
            title: 'Farmer Registration & Verification',
            description: 'Complete the form below to apply to become a verified farmer on the FloraChain platform.',
            yourInfo: {
                title: 'Your Information',
                name: { label: 'Full Name', placeholder: 'Your full name' },
                email: { label: 'Email Address', placeholder: 'you@example.com' },
                phone: { label: 'Phone Number', placeholder: 'Your phone number' },
            },
            farmDetails: {
                title: 'Farm Details',
                farmName: { label: 'Farm Name', placeholder: 'e.g., Sunrise Organics' },
                farmLocation: { label: 'Farm Location (City, State)', placeholder: 'e.g., Erode, Tamil Nadu' },
                crops: { label: 'Primary Ayurvedic Crops Grown', placeholder: 'e.g., Ashwagandha, Turmeric, Tulsi' },
                certs: { label: 'Certifications (Optional)', placeholder: 'e.g., USDA Organic, India Organic' },
            },
            docs: {
                title: 'Document Upload',
                description: 'Please upload documents for KYC and farm ownership verification. Max file size: 5MB. Accepted formats: JPG, PNG, PDF.',
                kyc: { label: 'KYC Document', placeholder: 'Click to upload a document' },
                ownership: { label: 'Farm Ownership/Lease Document', placeholder: 'Click to upload a document' },
            },
            agreement: {
                label: 'I agree to the',
                link: 'terms and conditions'
            },
            submitButton: 'Submit Application',
            submitButtonLoading: 'Submitting...'
        },
        submitted: {
            title: 'Application Received!',
            description: 'Thank you for your interest in joining FloraChain. Our team will review your application and get back to you via email within 5-7 business days.',
            homeButton: 'Return to Home',
        },
        toast: {
            successTitle: 'Application Submitted!',
            successDescription: 'Thank you. Your application is under review.',
            failureTitle: 'Submission Failed',
            failureDescription: 'An unknown error occurred.',
        }
    },
    createBatch: {
      step1: { title: 'Harvest Photo', description: 'Take a real-time photo of the harvest for AI analysis.' },
      step2: { title: 'AI Health Diagnosis', description: 'Select a language and get a detailed analysis of the plant\'s health.', languageLabel: 'Report Language' },
      step3: { title: 'Batch Details', description: 'Fill out the form to register the new harvest.' },
      qr: {
          title: 'Batch Created & QR Code Ready',
          batchIdLabel: 'Batch ID',
          description: 'This QR code now contains the Batch ID and can be attached to the physical batch for scanning at the next stage of the supply chain.',
          viewJourneyButton: 'View Product Journey',
          createAnotherButton: 'Create Another Batch',
      },
      diagnosis: {
          analyzing: 'Analyzing...',
          awaitingPhoto: 'Awaiting Photo',
          noPlant: 'No Plant Detected',
          healthy: 'Plant is Healthy',
          moderate: 'Moderate Concern',
          unhealthy: 'Unhealthy Plant',
          available: 'Diagnosis Available',
          loadingText: 'AI is analyzing the photo...',
          placeholder: 'The AI diagnosis will appear here after a photo is taken.',
          recommendations: {
              title: 'Diagnosis & Recommendations',
              causesTitle: 'Potential Causes',
              recsTitle: 'Recommendations',
          },
          farmingGuide: {
              title: 'Farming Guide',
              fertilizersTitle: 'Suggested Fertilizers',
              noFertilizers: 'No specific fertilizers recommended at this time.',
              careGuideTitle: 'General Care Guide',
          },
          marketValue: {
              title: 'Market Value'
          }
      },
      form: {
        productName: { label: 'Product Name', placeholder: 'e.g., Organic Basil' },
        farmName: { label: 'Farm Name', placeholder: 'e.g., Verdant Valley Farms' },
        location: { label: 'Farm Location', placeholder: 'Click the button to get location' },
        harvestDate: { label: 'Harvest Date', placeholder: 'Pick a date' },
        notes: { label: 'Initial Notes & Details', placeholder: 'Describe the harvest conditions, batch quality, or any other relevant details.' },
        submitButton: 'Create Batch & Get QR Code',
        submitButtonLoading: 'Generating Batch...',
        submitError: 'Cannot create batch. Please ensure a photo is taken and the AI diagnosis is complete and not \'Unhealthy\'.'
      },
      toast: {
        unhealthyTitle: 'Unhealthy Plant Detected',
        unhealthyDescription: 'Batch creation is blocked because the plant quality is too low.',
        diagnosisFailedTitle: 'AI Diagnosis Failed',
        diagnosisFailedDescription: 'Could not analyze the plant health. Please try again or proceed manually.',
        locationCapturedTitle: 'Location Captured',
        locationCapturedDescription: 'Farm location set to',
        locationErrorTitle: 'Location Error',
        locationErrorDescription: 'Could not retrieve location.',
        locationPermissionError: 'Could not retrieve location. Please enable location services.',
        locationNotSupportedTitle: 'Location Not Supported',
        locationNotSupportedDescription: 'Geolocation is not supported by your browser.',
        photoRequiredTitle: 'Photo Required',
        photoRequiredDescription: 'Please take or upload a photo of the harvest.',
        diagnosisRequiredTitle: 'AI Diagnosis Required',
        diagnosisRequiredDescription: 'Please wait for the AI diagnosis to complete.',
        batchCreationBlockedTitle: 'Batch Creation Blocked',
        batchCreationBlockedDescription: 'Cannot create a batch for an unhealthy plant.',
        locationRequiredTitle: 'Location Required',
        locationRequiredDescription: 'Please use the auto-locate button to set the farm location.',
        batchCreatedSuccessTitle: 'Batch Created Successfully!',
        batchCreatedSuccessDescription: 'Batch ID',
        batchCreationFailureTitle: 'Failed to Create Batch',
        batchCreationFailureDescription: 'An unexpected error occurred.',
      }
    },
    sidebar: {
      dashboard: 'Dashboard',
      createBatch: 'Create Batch',
      pastBatches: 'Past Batches',
      assembleProduct: 'Assemble Product',
      pastProducts: 'Past Products',
      verify: 'Verify/Update',
    },
  },
  hi: {
    home: {
      nav: {
        about: 'हमारे बारे में',
        signIn: 'साइन इन करें',
        innovations: 'नवाचार',
        howItWorks: 'यह कैसे काम करता है',
        shop: 'दुकान',
      },
      hero: {
        title: 'फ्लोराचेन, हर जड़ी-बूटी अपनी कहानी कहती है',
        titleHighlight: 'खेत से दुकान तक।',
        subtitle: 'हर्बल आपूर्ति श्रृंखला में अद्वितीय पारदर्शिता का अनुभव करें। अपने उत्पाद की खेत से लेकर आपके हाथों तक की पूरी यात्रा को ट्रैक करें, हर कदम पर सत्यापित।',
        trackButton: 'अपने उत्पाद को ट्रैक करें',
        shopButton: 'अभी खरीदें',
        alt: 'हरी-भरी भूमि',
      },
      innovations: {
        title: 'मुख्य नवाचार',
        description: 'फ्लोराचेन को अद्वितीय बनाने वाली और विश्वास और स्थिरता के लिए एक नया मानक स्थापित करने वाली अगली पीढ़ी की तकनीक की खोज करें।',
        p1: {
            title: 'जैव विविधता क्रेडिट बाज़ार',
            description: 'सत्यापित टिकाऊ और पुनर्योजी कटाई प्रथाओं के लिए टोकनयुक्त ग्रीन क्रेडिट प्रदान किए जाते हैं, जिससे नैतिक किसानों के लिए एक नया राजस्व स्रोत बनता है।',
        },
        p2: {
            title: 'उपभोक्ताओं के लिए प्रभाव एनएफटी',
            description: 'प्रत्येक खरीद एक अद्वितीय प्रभाव एनएफटी बना सकती है, जो उत्पाद की यात्रा, किसान की कहानी और सकारात्मक पर्यावरणीय प्रभाव को दर्शाती है।',
        },
        p3: {
            title: 'शून्य-ज्ञान अनुपालन प्रमाण',
            description: 'संवेदनशील किसान या मालिकाना कंपनी डेटा को उजागर किए बिना ब्लॉकचेन पर प्रामाणिकता और नियामक अनुपालन को सत्यापित करें, गोपनीयता सुनिश्चित करें।',
        },
        p4: {
            title: 'डिजिटल ट्विन और पूर्वानुमानित सिमुलेशन',
            description: 'आपूर्ति श्रृंखला का एक वास्तविक समय का वर्चुअल मॉडल व्यवधानों की भविष्यवाणी करता है, मांग में वृद्धि का अनुकरण करता है, और इन्वेंट्री को अनुकूलित करता है, कचरे को कम करता है।',
        },
        p5: {
            title: 'जलवायु-अनुकूली स्मार्ट अनुबंध',
            description: 'अनुबंध स्वचालित रूप से कटाई कार्यक्रम और किसान भुगतान को लाइव, स्थानीय मौसम डेटा के आधार पर समायोजित करते हैं, जलवायु परिवर्तन के खिलाफ लचीलापन बनाते हैं।',
        },
        p6: {
            title: 'गतिशील प्रोत्साहन',
            description: 'किसानों को गुणवत्ता मानकों, जल संरक्षण और अन्य स्थायी लक्ष्यों को पूरा करने के लिए वास्तविक समय में पुरस्कृत करें, सकारात्मक व्यवहार को बढ़ावा दें।',
        }
      },
      coreTech: {
        title: 'हमारी मुख्य तकनीक',
        description: 'हमारा प्लेटफ़ॉर्म तीन मुख्य तकनीकी स्तंभों पर बनाया गया है जो एक अपरिवर्तनीय, अंत-से-अंत तक प्रोవెనेंस लेजर प्रदान करते हैं।',
        p1: {
          title: 'जियो-टैगिंग और स्मार्ट अनुबंध',
          description: 'फसल की घटनाओं को स्रोत पर जियो-टैग किया जाता है। स्मार्ट अनुबंध स्वचालित रूप से स्थान को एक अनुमोदित क्षेत्र के भीतर सत्यापित करते हैं, जिससे मूल प्रामाणिकता सुनिश्चित होती है।',
        },
        p2: {
          title: 'अपरिवर्तनीय लेजर',
          description: 'फसल से लेकर प्रसंस्करण और प्रयोगशाला परीक्षण तक हर कदम, एक अनुमति प्राप्त ब्लॉकचेन पर दर्ज किया जाता है, जिससे एक छेड़छाड़-प्रूफ, अंत-से-अंत तक प्रोవెనेंस रिकॉर्ड बनता है।',
        },
        p3: {
          title: 'उपभोक्ता स्मार्ट लेबल',
          description: 'प्रत्येक उत्पाद पर एक अद्वितीय क्यूआर कोड उपभोक्ताओं को एक इंटरैक्टिव डैशबोर्ड से जोड़ता है जो नक्शे, प्रमाण पत्र और किसान प्रोफाइल सहित पूरी यात्रा दिखाता है।',
        }
      },
      shopSection: {
        title: 'हमारे सत्यापित स्रोत वाले उत्पाद खरीदें',
        description: 'प्रत्येक उत्पाद अपने पूर्ण प्रोవెనेंस रिकॉर्ड से जुड़ा हुआ है। सच्ची पारदर्शिता का अनुभव करें।',
      },
      snapshot: {
        batches: 'ट्रैक किए गए बैच',
        farmers: 'पंजीकृत किसान',
        products: 'वितरित उत्पाद',
      },
      footer: {
        slogan: 'खेत से आत्मा तक की ट्रेसबिलिटी।',
        navigate: {
          title: 'नेविगेट करें',
          about: 'हमारे बारे में',
          track: 'उत्पाद ट्रैक करें',
          signIn: 'साइन इन करें',
        },
        partners: {
          title: 'भागीदार',
          joinFarmer: 'किसान के रूप में शामिल हों',
          brands: 'ब्रांड भागीदारी',
          distributors: 'वितरक',
        },
        legal: {
          title: 'कानूनी',
          privacy: 'गोपनीयता नीति',
          terms: 'सेवा की शर्तें',
          contact: 'हमसे संपर्क करें',
        },
        rights: 'सर्वाधिकार सुरक्षित।',
      },
    },
    register: {
        form: {
            title: 'किसान पंजीकरण और सत्यापन',
            description: 'फ्लोराचेन प्लेटफॉर्म पर एक सत्यापित किसान बनने के लिए आवेदन करने के लिए नीचे दिए गए फॉर्म को पूरा करें।',
            yourInfo: {
                title: 'आपकी जानकारी',
                name: { label: 'पूरा नाम', placeholder: 'आपका पूरा नाम' },
                email: { label: 'ईमेल पता', placeholder: 'you@example.com' },
                phone: { label: 'फोन नंबर', placeholder: 'आपका फोन नंबर' },
            },
            farmDetails: {
                title: 'खेत का विवरण',
                farmName: { label: 'खेत का नाम', placeholder: 'उदा., सनराइज ऑर्गेनिक्स' },
                farmLocation: { label: 'खेत का स्थान (शहर, राज्य)', placeholder: 'उदा., इरोड, तमिलनाडु' },
                crops: { label: 'उगाई जाने वाली मुख्य आयुर्वेदिक फसलें', placeholder: 'उदा., अश्वगंधा, हल्दी, तुलसी' },
                certs: { label: 'प्रमाणपत्र (वैकल्पिक)', placeholder: 'उदा., यूएसडीए ऑर्गेनिक, इंडिया ऑर्गेनिक' },
            },
            docs: {
                title: 'दस्तावेज़ अपलोड',
                description: 'केवाईसी और खेत के स्वामित्व के सत्यापन के लिए कृपया दस्तावेज़ अपलोड करें। अधिकतम फ़ाइल आकार: 5 एमबी। स्वीकृत प्रारूप: जेपीजी, पीएनजी, पीडीएफ।',
                kyc: { label: 'केवाईसी दस्तावेज़', placeholder: 'दस्तावेज़ अपलोड करने के लिए क्लिक करें' },
                ownership: { label: 'खेत का स्वामित्व/पट्टा दस्तावेज़', placeholder: 'दस्तावेज़ अपलोड करने के लिए क्लिक करें' },
            },
            agreement: {
                label: 'मैं',
                link: 'नियम और शर्तों'
            },
            submitButton: 'आवेदन जमा करें',
            submitButtonLoading: 'जमा हो रहा है...'
        },
        submitted: {
            title: 'आवेदन प्राप्त हुआ!',
            description: 'फ्लोराचेन में शामिल होने में आपकी रुचि के लिए धन्यवाद। हमारी टीम आपके आवेदन की समीक्षा करेगी और 5-7 व्यावसायिक दिनों के भीतर आपको ईमेल के माध्यम से वापस संपर्क करेगी।',
            homeButton: 'होम पर लौटें',
        },
        toast: {
            successTitle: 'आवेदन जमा किया गया!',
            successDescription: 'धन्यवाद। आपका आवेदन समीक्षाधीन है।',
            failureTitle: 'प्रस्तुत करने में विफल',
            failureDescription: 'एक अज्ञात त्रुटि हुई।',
        }
    },
    createBatch: {
      step1: { title: 'फसल की तस्वीर', description: 'एआई विश्लेषण के लिए फसल की रीयल-टाइम तस्वीर लें।' },
      step2: { title: 'एआई स्वास्थ्य निदान', description: 'एक भाषा चुनें और पौधे के स्वास्थ्य का विस्तृत विश्लेषण प्राप्त करें।', languageLabel: 'रिपोर्ट की भाषा' },
      step3: { title: 'बैच विवरण', description: 'नई फसल को पंजीकृत करने के लिए फॉर्म भरें।' },
      qr: {
          title: 'बैच बनाया गया और क्यूआर कोड तैयार',
          batchIdLabel: 'बैच आईडी',
          description: 'इस क्यूआर कोड में अब बैच आईडी है और इसे आपूर्ति श्रृंखला के अगले चरण में स्कैनिंग के लिए भौतिक बैच से जोड़ा जा सकता है।',
          viewJourneyButton: 'उत्पाद यात्रा देखें',
          createAnotherButton: 'दूसरा बैच बनाएं',
      },
      diagnosis: {
          analyzing: 'विश्लेषण हो रहा है...',
          awaitingPhoto: 'फोटो का इंतजार है',
          noPlant: 'कोई पौधा नहीं मिला',
          healthy: 'पौधा स्वस्थ है',
          moderate: 'मध्यम चिंता',
          unhealthy: 'अस्वस्थ पौधा',
          available: 'निदान उपलब्ध है',
          loadingText: 'एआई फोटो का विश्लेषण कर रहा है...',
          placeholder: 'फोटो लेने के बाद एआई निदान यहां दिखाई देगा।',
          recommendations: {
              title: 'निदान और सिफारिशें',
              causesTitle: 'संभावित कारण',
              recsTitle: 'सिफारिशें',
          },
          farmingGuide: {
              title: 'खेती गाइड',
              fertilizersTitle: 'सुझाए गए उर्वरक',
              noFertilizers: 'इस समय किसी विशिष्ट उर्वरक की सिफारिश नहीं की गई है।',
              careGuideTitle: 'सामान्य देखभाल गाइड',
          },
          marketValue: {
              title: 'बाजार मूल्य'
          }
      },
      form: {
        productName: { label: 'उत्पाद का नाम', placeholder: 'उदा., जैविक तुलसी' },
        farmName: { label: 'खेत का नाम', placeholder: 'उदा., वर्डेंट वैली फार्म' },
        location: { label: 'खेत का स्थान', placeholder: 'स्थान प्राप्त करने के लिए बटन पर क्लिक करें' },
        harvestDate: { label: 'कटाई की तारीख', placeholder: 'एक तारीख चुनें' },
        notes: { label: 'प्रारंभिक नोट्स और विवरण', placeholder: 'कटाई की स्थिति, बैच की गुणवत्ता, या किसी अन्य प्रासंगिक विवरण का वर्णन करें।' },
        submitButton: 'बैच बनाएं और क्यूआर कोड प्राप्त करें',
        submitButtonLoading: 'बैच बनाया जा रहा है...',
        submitError: 'बैच नहीं बना सकते। कृपया सुनिश्चित करें कि एक फोटो लिया गया है और एआई निदान पूरा हो गया है और \'अस्वस्थ\' नहीं है।'
      },
      toast: {
        unhealthyTitle: 'अस्वस्थ पौधा पाया गया',
        unhealthyDescription: 'बैच निर्माण अवरुद्ध है क्योंकि पौधे की गुणवत्ता बहुत कम है।',
        diagnosisFailedTitle: 'एआई निदान विफल',
        diagnosisFailedDescription: 'पौधे के स्वास्थ्य का विश्लेषण नहीं कर सका। कृपया पुनः प्रयास करें या मैन्युअल रूप से आगे बढ़ें।',
        locationCapturedTitle: 'स्थान पर कब्जा कर लिया',
        locationCapturedDescription: 'खेत का स्थान निर्धारित है',
        locationErrorTitle: 'स्थान त्रुटि',
        locationErrorDescription: 'स्थान पुनर्प्राप्त नहीं कर सका।',
        locationPermissionError: 'स्थान पुनर्प्राप्त नहीं कर सका। कृपया स्थान सेवाओं को सक्षम करें।',
        locationNotSupportedTitle: 'स्थान समर्थित नहीं है',
        locationNotSupportedDescription: 'जियोलोकेशन आपके ब्राउज़र द्वारा समर्थित नहीं है।',
        photoRequiredTitle: 'फोटो आवश्यक है',
        photoRequiredDescription: 'कृपया फसल की एक फोटो लें या अपलोड करें।',
        diagnosisRequiredTitle: 'एआई निदान आवश्यक',
        diagnosisRequiredDescription: 'कृपया एआई निदान पूरा होने की प्रतीक्षा करें।',
        batchCreationBlockedTitle: 'बैच निर्माण अवरुद्ध',
        batchCreationBlockedDescription: 'एक अस्वस्थ पौधे के लिए एक बैच नहीं बना सकते।',
        locationRequiredTitle: 'स्थान आवश्यक है',
        locationRequiredDescription: 'कृपया खेत का स्थान निर्धारित करने के लिए ऑटो-लोकेट बटन का उपयोग करें।',
        batchCreatedSuccessTitle: 'बैच सफलतापूर्वक बनाया गया!',
        batchCreatedSuccessDescription: 'बैच आईडी',
        batchCreationFailureTitle: 'बैच बनाने में विफल',
        batchCreationFailureDescription: 'एक अप्रत्याशित त्रुटि हुई।',
      }
    },
    sidebar: {
      dashboard: 'डैशबोर्ड',
      createBatch: 'बैच बनाएं',
      pastBatches: 'पिछले बैच',
      assembleProduct: 'उत्पाद इकट्ठा करें',
      pastProducts: 'पिछले उत्पाद',
      verify: 'सत्यापित/अपडेट करें',
    },
  },
  te: {
    home: {
      nav: {
        about: 'మా గురించి',
        signIn: 'సైన్ ఇన్ చేయండి',
        innovations: 'ఆవిష్కరణలు',
        howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
        shop: 'షాపింగ్',
      },
      hero: {
        title: 'ఫ్లోరాచెయిన్, ప్రతి మూలిక తన కథను చెబుతుంది',
        titleHighlight: 'నేల నుండి అర వరకు.',
        subtitle: 'హెర్బల్ సరఫరా గొలుసులో అసమానమైన పారదర్శకతను అనుభవించండి. మీ ఉత్పత్తి యొక్క పూర్తి ప్రయాణాన్ని పొలం నుండి మీ చేతులకు, ప్రతి దశలో ధృవీకరించబడింది.',
        trackButton: 'మీ ఉత్పత్తిని ట్రాక్ చేయండి',
        shopButton: 'ఇప్పుడే కొనండి',
        alt: 'పచ్చని ప్రకృతి దృశ్యం',
      },
      innovations: {
        title: 'కీలక ఆవిష్కరణలు',
        description: 'ఫ్లోరాచెయిన్‌ను ప్రత్యేకంగా నిలబెట్టే మరియు విశ్వాసం మరియు స్థిరత్వం కోసం కొత్త ప్రమాణాన్ని నెలకొల్పే తదుపరి తరం సాంకేతికతను కనుగొనండి.',
        p1: {
            title: 'జీవవైవిధ్య క్రెడిట్ మార్కెట్‌ప్లేస్',
            description: 'ధృవీకరించబడిన స్థిరమైన మరియు పునరుత్పత్తి కోత పద్ధతులకు టోకెనైజ్డ్ గ్రీన్ క్రెడిట్‌లు ఇవ్వబడతాయి, ఇది నైతిక రైతులకు కొత్త ఆదాయ మార్గాన్ని సృష్టిస్తుంది.',
        },
        p2: {
            title: 'వినియోగదారుల కోసం ఇంపాక్ట్ NFTలు',
            description: 'ప్రతి కొనుగోలు ఒక ప్రత్యేకమైన ఇంపాక్ట్ NFTని ముద్రించగలదు, ఇది ఉత్పత్తి ప్రయాణం, రైతు కథ మరియు సానుకూల పర్యావరణ ప్రభావాన్ని దృశ్యమానంగా సూచిస్తుంది.',
        },
        p3: {
            title: 'జీరో-నాలెడ్జ్ కంప్లయన్స్ ప్రూఫ్స్',
            description: 'సున్నితమైన రైతు లేదా యాజమాన్య కంపెనీ డేటాను బహిర్గతం చేయకుండానే బ్లాక్‌చెయిన్‌లో ప్రామాణికత మరియు నియంత్రణ సమ్మతిని ధృవీకరించండి, గోప్యతను నిర్ధారించండి.',
        },
        p4: {
            title: 'డిజిటల్ ట్విన్ & ప్రిడిక్టివ్ సిమ్యులేషన్',
            description: 'సరఫరా గొలుసు యొక్క నిజ-సమయ వర్చువల్ మోడల్ అంతరాయాలను అంచనా వేస్తుంది, డిమాండ్ స్పైక్‌లను అనుకరిస్తుంది మరియు इन्वेंटरीని ఆప్టిమైజ్ చేస్తుంది, వ్యర్థాలను తగ్గిస్తుంది.',
        },
        p5: {
            title: 'క్లైమేట్-అడాప్టివ్ స్మార్ట్ కాంట్రాక్టులు',
            description: 'కాంట్రాక్టులు ప్రత్యక్ష, స్థానికీకరించిన వాతావరణ డేటా ఆధారంగా పంట షెడ్యూಲ್‌లు మరియు రైతు చెల్లింపులను స్వయంచాలకంగా సర్దుబాటు చేస్తాయి, వాతావరణ మార్పులకు వ్యతిరేకంగా స్థితిస్థాపకతను పెంచుతాయి.',
        },
        p6: {
            title: 'డైనమిక్ ఇన్సెంటివ్‌లు',
            description: 'నాణ్యతా ప్రమాణాలు, నీటి సంరక్షణ మరియు ఇతర స్థిరమైన లక్ష్యాలను చేరుకున్నందుకు రైతులకు నిజ-సమయంలో రివార్డ్ చేయండి, సానుకూల ప్రవర్తనను ప్రోత్సహించండి.',
        }
      },
      coreTech: {
        title: 'మా కోర్ టెక్నాలజీ',
        description: 'మా ప్లాట్‌ఫారమ్ మూడు ప్రధాన సాంకేతిక స్తంభాలపై నిర్మించబడింది, ఇది మార్పులేని, ఎండ్-టు-ఎండ్ ప్రొవెనెన్స్ లెడ్జర్‌ను అందిస్తుంది.',
        p1: {
          title: 'జియో-ట్యాగింగ్ & స్మార్ట్ కాంట్రాక్టులు',
          description: 'పంట సంఘటనలు మూలం వద్ద జియో-ట్యాగ్ చేయబడతాయి. స్మార్ట్ కాంట్రాక్టులు స్వయంచాలకంగా ఆమోదించబడిన జోన్‌లో ఉన్నాయని ధృవీకరిస్తాయి, మూల ప్రామాణికతను నిర్ధారిస్తాయి.',
        },
        p2: {
          title: 'మార్పులేని లెడ్జర్',
          description: 'పంట నుండి ప్రాసెసింగ్ మరియు ప్రయోగశాల పరీక్షల వరకు ప్రతి దశ, అనుమతి పొందిన బ్లాక్‌చెయిన్‌లో రికార్డ్ చేయబడుతుంది, ఇది ట్యాంపర్-ప్రూఫ్, ఎండ్-టు-ఎండ్ ప్రొవెనెన్స్ రికార్డ్‌ను సృష్టిస్తుంది.',
        },
        p3: {
          title: 'వినియోగదారు స్మార్ట్ లేబుల్స్',
          description: 'ప్రతి ఉత్పత్తిపై ఒక ప్రత్యేకమైన QR కోడ్ వినియోగదారులను మ్యాప్‌లు, సర్టిఫికెట్లు మరియు రైతు ప్రొఫైల్‌లతో సహా పూర్తి ప్రయాణాన్ని చూపించే ఇంటరాక్టివ్ డాష్‌బోర్డ్‌కు లింక్ చేస్తుంది.',
        }
      },
      shopSection: {
        title: 'మా ధృవీకరించబడిన మూల ఉత్పత్తులను షాపింగ్ చేయండి',
        description: 'ప్రతి ఉత్పత్తి దాని పూర్తి ప్రొవెనెన్స్ రికార్డ్‌కు లింక్ చేయబడింది. నిజమైన పారదర్శకతను అనుభవించండి.',
      },
      snapshot: {
        batches: 'ట్రాక్ చేయబడిన బ్యాచ్‌లు',
        farmers: 'నమోదిత రైతులు',
        products: 'పంపిణీ చేయబడిన ఉత్పత్తులు',
      },
      footer: {
        slogan: 'నేల నుండి ఆత్మ వరకు ట్రేస్‌బిలిటీ.',
        navigate: {
          title: 'నావిగేట్ చేయండి',
          about: 'మా గురించి',
          track: 'ఉత్పత్తిని ట్రాక్ చేయండి',
          signIn: 'సైన్ ఇన్ చేయండి',
        },
        partners: {
          title: 'భాగస్వాములు',
          joinFarmer: 'రైతుగా చేరండి',
          brands: 'బ్రాండ్ భాగస్వామ్యాలు',
          distributors: 'పంపిణీదారులు',
        },
        legal: {
          title: 'చట్టపరమైన',
          privacy: 'గోప్యతా విధానం',
          terms: 'సేవా నిబంధనలు',
          contact: 'మమ్మల్ని సంప్రదించండి',
        },
        rights: 'అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.',
      },
    },
    register: {
        form: {
            title: 'రైతు నమోదు & ధృవీకరణ',
            description: 'ఫ్లోరాచెయిన్ ప్లాట్‌ఫారమ్‌లో ధృవీకరించబడిన రైతుగా మారడానికి దరఖాస్తు చేయడానికి దిగువ ఫారమ్‌ను పూర్తి చేయండి.',
            yourInfo: {
                title: 'మీ సమాచారం',
                name: { label: 'పూర్తి పేరు', placeholder: 'మీ పూర్తి పేరు' },
                email: { label: 'ఈమెయిలు చిరునామా', placeholder: 'you@example.com' },
                phone: { label: 'ఫోను నంబరు', placeholder: 'మీ ఫోను నంబరు' },
            },
            farmDetails: {
                title: 'పొలం వివరాలు',
                farmName: { label: 'పొలం పేరు', placeholder: 'ఉదా., సన్‌రైజ్ ఆర్గానిక్స్' },
                farmLocation: { label: 'పొలం స్థానం (నగరం, రాష్ట్రం)', placeholder: 'ఉదా., ఈరోడ్, తమిళనాడు' },
                crops: { label: 'పండించే ప్రాథమిక ఆయుర్వేద పంటలు', placeholder: 'ఉదా., అశ్వగంధ, పసుపు, తులసి' },
                certs: { label: 'ధృవపత్రాలు (ఐచ్ఛికం)', placeholder: 'ఉదా., USDA ఆర్గానిక్, ఇండియా ఆర్గానిక్' },
            },
            docs: {
                title: 'పత్రం అప్‌లోడ్',
                description: 'KYC మరియు పొలం యాజమాన్య ధృవీకరణ కోసం దయచేసి పత్రాలను అప్‌లోడ్ చేయండి. గరిష్ట ఫైల్ పరిమాణం: 5MB. ఆమోదించబడిన ఫార్మాట్‌లు: JPG, PNG, PDF.',
                kyc: { label: 'KYC పత్రం', placeholder: 'పత్రాన్ని అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి' },
                ownership: { label: 'పొలం యాజమాన్యం/లీజు పత్రం', placeholder: 'పత్రాన్ని అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి' },
            },
            agreement: {
                label: 'నేను',
                link: 'నిబంధనలు మరియు షరతులకు'
            },
            submitButton: 'దరఖాస్తును సమర్పించండి',
            submitButtonLoading: 'సమర్పిస్తోంది...'
        },
        submitted: {
            title: 'దరఖాస్తు స్వీకరించబడింది!',
            description: 'ఫ్లోరాచెయిన్‌లో చేరడానికి మీ ఆసక్తికి ధన్యవాదాలు. మా బృందం మీ దరఖాస్తును సమీక్షించి, 5-7 పనిదినాల్లో మీకు ఇమెయిల్ ద్వారా తిరిగి తెలియజేస్తుంది.',
            homeButton: 'హోమ్‌కి తిరిగి వెళ్ళు',
        },
        toast: {
            successTitle: 'దరఖాస్తు సమర్పించబడింది!',
            successDescription: 'ధన్యవాదాలు. మీ దరఖాస్తు సమీక్షలో ఉంది.',
            failureTitle: 'సమర్పణ విఫలమైంది',
            failureDescription: 'తెలియని లోపం సంభవించింది.',
        }
    },
    createBatch: {
      step1: { title: 'పంట ఫోటో', description: 'AI విశ్లేషణ కోసం పంట యొక్క నిజ-సమయ ఫోటో తీయండి.' },
      step2: { title: 'AI ఆరోగ్య నిర్ధారణ', description: 'భాషను ఎంచుకుని, మొక్క ఆరోగ్యంపై వివరణాత్మక విశ్లేషణ పొందండి.', languageLabel: 'నివేదిక భాష' },
      step3: { title: 'బ్యాచ్ వివరాలు', description: 'కొత్త పంటను నమోదు చేయడానికి ఫారమ్‌ను పూరించండి.' },
      qr: {
          title: 'బ్యాచ్ సృష్టించబడింది & QR కోడ్ సిద్ధంగా ఉంది',
          batchIdLabel: 'బ్యాచ్ ID',
          description: 'ఈ QR కోడ్‌లో ఇప్పుడు బ్యాచ్ ID ఉంది మరియు సరఫరా గొలుసు యొక్క తదుపరి దశలో స్కానింగ్ కోసం భౌతిక బ్యాచ్‌కు జోడించబడుతుంది.',
          viewJourneyButton: 'ఉత్పత్తి ప్రయాణాన్ని వీక్షించండి',
          createAnotherButton: 'మరొక బ్యాచ్‌ను సృష్టించండి',
      },
      diagnosis: {
          analyzing: 'విశ్లేషిస్తోంది...',
          awaitingPhoto: 'ఫోటో కోసం వేచి ఉంది',
          noPlant: 'మొక్క కనుగొనబడలేదు',
          healthy: 'మొక్క ఆరోగ్యంగా ఉంది',
          moderate: 'మితమైన ఆందోళన',
          unhealthy: 'అనారోగ్యకరమైన మొక్క',
          available: 'నిర్ధారణ అందుబాటులో ఉంది',
          loadingText: 'AI ఫోటోను విశ్లేషిస్తోంది...',
          placeholder: 'ఫోటో తీసిన తర్వాత AI నిర్ధారణ ఇక్కడ కనిపిస్తుంది.',
          recommendations: {
              title: 'నిర్ధారణ & సిఫార్సులు',
              causesTitle: 'సాధ్యమయ్యే కారణాలు',
              recsTitle: 'సిఫార్సులు',
          },
          farmingGuide: {
              title: 'వ్యవసాయ గైడ్',
              fertilizersTitle: 'సూచించిన ఎరువులు',
              noFertilizers: 'ప్రస్తుతానికి ప్రత్యేక ఎరువులు సిఫార్సు చేయబడలేదు.',
              careGuideTitle: 'సాధారణ సంరక్షణ గైడ్',
          },
          marketValue: {
              title: 'మార్కెట్ విలువ'
          }
      },
      form: {
        productName: { label: 'ఉత్పత్తి పేరు', placeholder: 'ఉదా., ఆర్గానిక్ తులసి' },
        farmName: { label: 'పొలం పేరు', placeholder: 'ఉదా., వర్డెంట్ వ్యాలీ ఫార్మ్స్' },
        location: { label: 'పొలం స్థానం', placeholder: 'స్థానం పొందడానికి బటన్‌ను క్లిక్ చేయండి' },
        harvestDate: { label: 'పంట తేదీ', placeholder: 'తేదీని ఎంచుకోండి' },
        notes: { label: 'ప్రారంభ గమనికలు & వివరాలు', placeholder: 'పంట పరిస్థితులు, బ్యాచ్ నాణ్యత లేదా ఇతర సంబంధిత వివరాలను వివరించండి.' },
        submitButton: 'బ్యాచ్‌ను సృష్టించి QR కోడ్ పొందండి',
        submitButtonLoading: 'బ్యాచ్‌ను సృష్టిస్తోంది...',
        submitError: 'బ్యాచ్‌ను సృష్టించడం సాధ్యం కాదు. దయచేసి ఫోటో తీయబడిందని మరియు AI నిర్ధారణ పూర్తయిందని మరియు \'అనారోగ్యకరమైనది\' కాదని నిర్ధారించుకోండి.'
      },
      toast: {
        unhealthyTitle: 'అనారోగ్యకరమైన మొక్క కనుగొనబడింది',
        unhealthyDescription: 'మొక్క నాణ్యత చాలా తక్కువగా ఉన్నందున బ్యాచ్ సృష్టి నిరోధించబడింది.',
        diagnosisFailedTitle: 'AI నిర్ధారణ విఫలమైంది',
        diagnosisFailedDescription: 'మొక్క ఆరోగ్యాన్ని విశ్లేషించడం సాధ్యం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి లేదా మాన్యువల్‌గా కొనసాగండి.',
        locationCapturedTitle: 'స్థానం సంగ్రహించబడింది',
        locationCapturedDescription: 'పొలం స్థానం దీనికి సెట్ చేయబడింది',
        locationErrorTitle: 'స్థాన దోషం',
        locationErrorDescription: 'స్థానాన్ని తిరిగి పొందడం సాధ్యం కాలేదు.',
        locationPermissionError: 'స్థానాన్ని తిరిగి పొందడం సాధ్యం కాలేదు. దయచేసి స్థాన సేవలను ప్రారంభించండి.',
        locationNotSupportedTitle: 'స్థానం మద్దతు లేదు',
        locationNotSupportedDescription: 'జియోలొకేషన్ మీ బ్రౌజర్ ద్వారా మద్దతు లేదు.',
        photoRequiredTitle: 'ఫోటో అవసరం',
        photoRequiredDescription: 'దయచేసి పంట యొక్క ఫోటోను తీయండి లేదా అప్‌లోడ్ చేయండి.',
        diagnosisRequiredTitle: 'AI నిర్ధారణ అవసరం',
        diagnosisRequiredDescription: 'దయచేసి AI నిర్ధారణ పూర్తయ్యే వరకు వేచి ఉండండి.',
        batchCreationBlockedTitle: 'బ్యాచ్ సృష్టి నిరోధించబడింది',
        batchCreationBlockedDescription: 'అనారోగ్యకరమైన మొక్క కోసం బ్యాచ్‌ను సృష్టించడం సాధ్యం కాదు.',
        locationRequiredTitle: 'స్థానం అవసరం',
        locationRequiredDescription: 'దయచేసి పొలం స్థానాన్ని సెట్ చేయడానికి ఆటో-లొకేట్ బటన్‌ను ఉపయోగించండి.',
        batchCreatedSuccessTitle: 'బ్యాచ్ విజయవంతంగా సృష్టించబడింది!',
        batchCreatedSuccessDescription: 'బ్యాచ్ ఐడి',
        batchCreationFailureTitle: 'బ్యాచ్‌ను సృష్టించడం విఫలమైంది',
        batchCreationFailureDescription: 'ఊహించని లోపం సంభవించింది.',
      }
    },
    sidebar: {
      dashboard: 'డాష్‌బోర్డ్',
      createBatch: 'బ్యాచ్‌ను సృష్టించండి',
      pastBatches: 'గత బ్యాచ్‌లు',
      assembleProduct: 'ఉత్పత్తిని సమీకరించండి',
      pastProducts: 'గత ఉత్పత్తులు',
      verify: 'ధృవీకరించు/నవీకరించు',
    },
  },
  ta: {
    home: {
      nav: {
        about: 'பற்றி',
        signIn: 'உள்நுழைக',
        innovations: 'புதுமைகள்',
        howItWorks: 'இது எப்படி வேலை செய்கிறது',
        shop: 'கடை',
      },
      hero: {
        title: 'ஃப்ளோராசெயின், ஒவ்வொரு மூலிகையும் அதன் கதையைச் சொல்கிறது',
        titleHighlight: 'மண்ணிலிருந்து அலமாரி வரை.',
        subtitle: 'மூலிகை விநியோகச் சங்கிலியில் இணையற்ற வெளிப்படைத்தன்மையை அனுபவியுங்கள். உங்கள் தயாரிப்பின் முழுமையான பயணத்தை பண்ணையிலிருந்து உங்கள் கைகளுக்கு, ஒவ்வொரு படியிலும் சரிபார்க்கப்பட்டது.',
        trackButton: 'உங்கள் தயாரிப்பைக் கண்காணிக்கவும்',
        shopButton: 'இப்போதே வாங்குங்கள்',
        alt: 'செழிப்பான பச்சை நிலப்பரப்பு',
      },
       innovations: {
        title: 'முக்கிய புதுமைகள்',
        description: 'ஃப்ளோராசெயினை தனித்துவமாக்கும் மற்றும் நம்பிக்கை மற்றும் நிலைத்தன்மைக்கு ஒரு புதிய தரத்தை அமைக்கும் அடுத்த தலைமுறை தொழில்நுட்பத்தைக் கண்டறியவும்.',
        p1: {
            title: 'பல்லுயிர் கடன் சந்தை',
            description: 'சரிபார்க்கப்பட்ட நிலையான மற்றும் மீளுருவாக்கம் செய்யும் அறுவடை நடைமுறைகளுக்கு டோக்கனைஸ் செய்யப்பட்ட பசுமைக் கடன்கள் வழங்கப்படுகின்றன, இது நெறிமுறை விவசாயிகளுக்கு ஒரு புதிய வருவாய் ஆதாரத்தை உருவாக்குகிறது.',
        },
        p2: {
            title: 'நுகர்வோருக்கான தாக்க NFTகள்',
            description: 'ஒவ்வொரு கொள்முதலும் ஒரு தனித்துவமான தாக்க NFT ஐ உருவாக்க முடியும், இது தயாரிப்பின் பயணம், விவசாயியின் கதை மற்றும் நேர்மறையான சுற்றுச்சூழல் தாக்கத்தை பார்வைக்கு பிரதிபலிக்கிறது.',
        },
        p3: {
            title: 'பூஜ்ஜிய-அறிவு இணக்கச் சான்றுகள்',
            description: 'உணர்திறன் வாய்ந்த விவசாயி அல்லது தனியுரிம நிறுவனத் தரவை வெளிப்படுத்தாமல் பிளாக்செயினில் நம்பகத்தன்மை மற்றும் ஒழுங்குமுறை இணக்கத்தைச் சரிபார்க்கவும், தனியுரிமையை உறுதிப்படுத்தவும்.',
        },
        p4: {
            title: 'டிஜிட்டல் இரட்டை மற்றும் முன்கணிப்பு உருவகப்படுத்துதல்',
            description: 'விநியோகச் சங்கிலியின் நிகழ்நேர மெய்நிகர் மாதிரி இடையூறுகளை முன்னறிவிக்கிறது, தேவை கூர்மையை உருவகப்படுத்துகிறது மற்றும் இருப்பை மேம்படுத்துகிறது, கழிவுகளைக் குறைக்கிறது.',
        },
        p5: {
            title: 'காலநிலை-தகவமைப்பு ஸ்மார்ட் ஒப்பந்தங்கள்',
            description: 'ஒப்பந்தங்கள் தானாகவே அறுவடை அட்டவணைகள் மற்றும் விவசாயி கொடுப்பனவுகளை நேரடி, உள்ளூர்மயமாக்கப்பட்ட வானிலை தரவுகளின் அடிப்படையில் சரிசெய்கின்றன, காலநிலை மாற்றத்திற்கு எதிராக பின்னடைவை உருவாக்குகின்றன.',
        },
        p6: {
            title: 'டைனமிக் ஊக்கத்தொகைகள்',
            description: 'தரமான வரையறைகள், நீர் பாதுகாப்பு மற்றும் பிற நிலையான குறிக்கோள்களை பூர்த்தி செய்வதற்காக விவசாயிகளுக்கு நிகழ்நேரத்தில் வெகுமதி அளிக்கவும், நேர்மறையான நடத்தையை இயக்கவும்.',
        }
      },
      coreTech: {
        title: 'எங்கள் முக்கிய தொழில்நுட்பம்',
        description: 'எங்கள் தளம் மூன்று முக்கிய தொழில்நுட்ப தூண்களில் கட்டமைக்கப்பட்டுள்ளது, இது ஒரு மாற்ற முடியாத, இறுதி முதல் இறுதி வரையிலான பிறப்புரிமை லெட்ஜரை வழங்குகிறது.',
        p1: {
          title: 'ஜியோ-டேக்கிங் & ஸ்மார்ட் ஒப்பந்தங்கள்',
          description: 'அறுவடை நிகழ்வுகள் மூலத்தில் ஜியோ-டேக் செய்யப்படுகின்றன. ஸ்மார்ட் ஒப்பந்தங்கள் தானாகவே இருப்பிடத்தை அங்கீகரிக்கப்பட்ட மண்டலத்திற்குள் சரிபார்க்கின்றன, மூல நம்பகத்தன்மையை உறுதி செய்கின்றன.',
        },
        p2: {
          title: 'மாற்ற முடியாத லெட்ஜர்',
          description: 'அறுவடை முதல் பதப்படுத்துதல் மற்றும் ஆய்வகப் பரிசோதனை வரையிலான ஒவ்வொரு அடியும், அனுமதிக்கப்பட்ட பிளாக்செயினில் பதிவு செய்யப்படுகிறது, இது ஒரு சேதப்படுத்த முடியாத, இறுதி முதல் இறுதி வரையிலான பிறப்புரிமை பதிவை உருவாக்குகிறது.',
        },
        p3: {
          title: 'நுகர்வோர் ஸ்மார்ட் லேபிள்கள்',
          description: 'ஒவ்வொரு தயாரிப்பிலும் உள்ள ஒரு தனித்துவமான QR குறியீடு, வரைபடங்கள், சான்றிதழ்கள் மற்றும் விவசாயி சுயவிவரங்கள் உட்பட முழுமையான பயணத்தைக் காட்டும் ஒரு ஊடாடும் டாஷ்போர்டுக்கு நுகர்வோரை இணைக்கிறது.',
        }
      },
      shopSection: {
        title: 'எங்கள் சரிபார்க்கப்பட்ட மூலப் தயாரிப்புகளை வாங்கவும்',
        description: 'ஒவ்வொரு தயாரிப்பும் அதன் முழுமையான பிறப்புரிமைப் பதிவுடன் இணைக்கப்பட்டுள்ளது. உண்மையான வெளிப்படைத்தன்மையை அனுபவிக்கவும்.',
      },
      snapshot: {
        batches: 'கண்காணிக்கப்பட்ட தொகுதிகள்',
        farmers: 'பதிவுசெய்யப்பட்ட விவசாயிகள்',
        products: 'வழங்கப்பட்ட தயாரிப்புகள்',
      },
      footer: {
        slogan: 'மண்ணிலிருந்து ஆன்மா வரை தடமறிதல்.',
        navigate: {
          title: 'செல்லவும்',
          about: 'பற்றி',
          track: 'தயாரிப்பைக் கண்காணிக்கவும்',
          signIn: 'உள்நுழைக',
        },
        partners: {
          title: 'பங்குதாரர்கள்',
          joinFarmer: 'விவசாயியாக சேரவும்',
          brands: 'பிராண்ட் கூட்டாண்மை',
          distributors: 'விநியோகஸ்தர்கள்',
        },
        legal: {
          title: 'சட்டரீதியான',
          privacy: 'தனியுரிமைக் கொள்கை',
          terms: 'சேவை விதிமுறைகள்',
          contact: 'எங்களை தொடர்பு கொள்ள',
        },
        rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      },
    },
    register: {
        form: {
            title: 'விவசாயி பதிவு மற்றும் சரிபார்ப்பு',
            description: 'ஃப்ளோராசெயின் மேடையில் சரிபார்க்கப்பட்ட விவசாயியாக விண்ணப்பிக்க கீழே உள்ள படிவத்தை பூர்த்தி செய்யவும்.',
            yourInfo: {
                title: 'உங்கள் தகவல்',
                name: { label: 'முழு பெயர்', placeholder: 'உங்கள் முழு பெயர்' },
                email: { label: 'மின்னஞ்சல் முகவரி', placeholder: 'you@example.com' },
                phone: { label: 'தொலைபேசி எண்', placeholder: 'உங்கள் தொலைபேசி எண்' },
            },
            farmDetails: {
                title: 'பண்ணை விவரங்கள்',
                farmName: { label: 'பண்ணை பெயர்', placeholder: 'எ.கா., சன்ரைஸ் ஆர்கானிக்ஸ்' },
                farmLocation: { label: 'பண்ணை இடம் (நகரம், மாநிலம்)', placeholder: 'எ.கா., ஈரோடு, தமிழ்நாடு' },
                crops: { label: 'வளர்க்கப்படும் முதன்மை ஆயுர்வேத பயிர்கள்', placeholder: 'எ.கா., அஸ்வகந்தா, மஞ்சள், துளசி' },
                certs: { label: 'சான்றிதழ்கள் (விருப்பத்தேர்வு)', placeholder: 'எ.கா., யுஎஸ்டிஏ ஆர்கானிக், இந்தியா ஆர்கானிக்' },
            },
            docs: {
                title: 'ஆவணப் பதிவேற்றம்',
                description: 'KYC மற்றும் பண்ணை உரிமை சரிபார்ப்புக்காக ஆவணங்களைப் பதிவேற்றவும். அதிகபட்ச கோப்பு அளவு: 5MB. ஏற்றுக்கொள்ளப்பட்ட வடிவங்கள்: JPG, PNG, PDF.',
                kyc: { label: 'KYC ஆவணம்', placeholder: 'ஆவணத்தைப் பதிவேற்ற கிளிக் செய்யவும்' },
                ownership: { label: 'பண்ணை உரிமை/குத்தகை ஆவணம்', placeholder: 'ஆவணத்தைப் பதிவேற்ற கிளிக் செய்யவும்' },
            },
            agreement: {
                label: 'நான்',
                link: 'விதிமுறைகள் மற்றும் நிபந்தனைகளை'
            },
            submitButton: 'விண்ணப்பத்தை சமர்ப்பிக்கவும்',
            submitButtonLoading: 'சமர்ப்பிக்கிறது...'
        },
        submitted: {
            title: 'விண்ணப்பம் பெறப்பட்டது!',
            description: 'ஃப்ளோராசெயினில் சேர உங்கள் ஆர்வத்திற்கு நன்றி. எங்கள் குழு உங்கள் விண்ணப்பத்தை மதிப்பாய்வு செய்து 5-7 வணிக நாட்களுக்குள் உங்களுக்கு மின்னஞ்சல் மூலம் பதிலளிக்கும்.',
            homeButton: 'முகப்புக்குத் திரும்பு',
        },
        toast: {
            successTitle: 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!',
            successDescription: 'நன்றி. உங்கள் விண்ணப்பம் மதிப்பாய்வில் உள்ளது.',
            failureTitle: 'சமர்ப்பிப்பு தோல்வியடைந்தது',
            failureDescription: 'அறியப்படாத பிழை ஏற்பட்டது.',
        }
    },
    createBatch: {
      step1: { title: 'அறுவடை புகைப்படம்', description: 'AI பகுப்பாய்வுக்காக அறுவடையின் நிகழ்நேர புகைப்படத்தை எடுக்கவும்.' },
      step2: { title: 'AI சுகாதார निदान', description: 'ஒரு மொழியைத் தேர்ந்தெடுத்து தாவரத்தின் ஆரோக்கியம் குறித்த விரிவான பகுப்பாய்வைப் பெறுங்கள்.', languageLabel: 'அறிக்கை மொழி' },
      step3: { title: 'தொகுதி விவரங்கள்', description: 'புதிய அறுவடையை பதிவு செய்ய படிவத்தை நிரப்பவும்.' },
      qr: {
          title: 'தொகுதி உருவாக்கப்பட்டது & QR குறியீடு தயார்',
          batchIdLabel: 'தொகுதி ஐடி',
          description: 'இந்த QR குறியீட்டில் இப்போது தொகுதி ஐடி உள்ளது மற்றும் விநியோகச் சங்கிலியின் அடுத்த கட்டத்தில் ஸ்கேன் செய்வதற்காக இயற்பியல் தொகுதியுடன் இணைக்கப்படலாம்.',
          viewJourneyButton: 'தயாரிப்பு பயணத்தைக் காண்க',
          createAnotherButton: 'மற்றொரு தொகுதியை உருவாக்கவும்',
      },
      diagnosis: {
          analyzing: 'பகுப்பாய்வு செய்கிறது...',
          awaitingPhoto: 'புகைப்படத்திற்காக காத்திருக்கிறது',
          noPlant: 'தாவரம் கண்டறியப்படவில்லை',
          healthy: 'தாவரம் ஆரோக்கியமானது',
          moderate: 'மிதமான கவலை',
          unhealthy: 'ஆரோக்கியமற்ற தாவரம்',
          available: 'நோய் கண்டறிதல் கிடைக்கிறது',
          loadingText: 'AI புகைப்படத்தை பகுப்பாய்வு செய்கிறது...',
          placeholder: 'புகைப்படம் எடுத்த பிறகு AI निदान இங்கே தோன்றும்.',
          recommendations: {
              title: 'நோய் கண்டறிதல் & பரிந்துரைகள்',
              causesTitle: 'சாத்தியமான காரணங்கள்',
              recsTitle: 'பரிந்துரைகள்',
          },
          farmingGuide: {
              title: 'விவசாய வழிகாட்டி',
              fertilizersTitle: 'பரிந்துரைக்கப்பட்ட உரங்கள்',
              noFertilizers: 'இந்த நேரத்தில் குறிப்பிட்ட உரங்கள் எதுவும் பரிந்துரைக்கப்படவில்லை.',
              careGuideTitle: 'பொதுவான பராமரிப்பு வழிகாட்டி',
          },
          marketValue: {
              title: 'சந்தை மதிப்பு'
          }
      },
      form: {
        productName: { label: 'பொருளின் பெயர்', placeholder: 'எ.கா., ஆர்கானிக் துளசி' },
        farmName: { label: 'பண்ணை பெயர்', placeholder: 'எ.கா., வெர்டன்ட் வேலி ஃபார்ம்ஸ்' },
        location: { label: 'பண்ணை இடம்', placeholder: 'இருப்பிடத்தைப் பெற பொத்தானைக் கிளிக் செய்யவும்' },
        harvestDate: { label: 'அறுவடை தேதி', placeholder: 'ஒரு தேதியைத் தேர்ந்தெடுக்கவும்' },
        notes: { label: 'ஆரம்ப குறிப்புகள் & விவரங்கள்', placeholder: 'அறுவடை நிலைமைகள், தொகுதி தரம் அல்லது வேறு ஏதேனும் தொடர்புடைய விவரங்களை விவரிக்கவும்.' },
        submitButton: 'தொகுதியை உருவாக்கி QR குறியீட்டைப் பெறுங்கள்',
        submitButtonLoading: 'தொகுதியை உருவாக்குகிறது...',
        submitError: 'தொகுதியை உருவாக்க முடியவில்லை. தயவுசெய்து ஒரு புகைப்படம் எடுக்கப்பட்டதா மற்றும் AI निदान പൂർത്തിയായിരിക്കുന്നു மற்றும் \'ஆரோக்கியமற்றது\' அல்ல என்பதை உறுதிப்படுத்தவும்.'
      },
      toast: {
        unhealthyTitle: 'ஆரோக்கியமற்ற தாவரம் கண்டறியப்பட்டது',
        unhealthyDescription: 'தாவரத்தின் தரம் மிகவும் குறைவாக இருப்பதால் தொகுதி உருவாக்கம் தடுக்கப்பட்டுள்ளது.',
        diagnosisFailedTitle: 'AI निदान தோல்வியடைந்தது',
        diagnosisFailedDescription: 'தாவரத்தின் ஆரோக்கியத்தை பகுப்பாய்வு செய்ய முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது கைமுறையாக தொடரவும்.',
        locationCapturedTitle: 'இடம் பிடிக்கப்பட்டது',
        locationCapturedDescription: 'பண்ணை இருப்பிடம் இதற்கு அமைக்கப்பட்டுள்ளது',
        locationErrorTitle: 'இருப்பிடப் பிழை',
        locationErrorDescription: 'இருப்பிடத்தை மீட்டெடுக்க முடியவில்லை.',
        locationPermissionError: 'இருப்பிடத்தை மீட்டெடுக்க முடியவில்லை. தயவுசெய்து இருப்பிட சேவைகளை இயக்கவும்.',
        locationNotSupportedTitle: 'இருப்பிடம் ஆதரிக்கப்படவில்லை',
        locationNotSupportedDescription: 'உங்கள் உலாவியில் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை.',
        photoRequiredTitle: 'புகைப்படம் தேவை',
        photoRequiredDescription: 'தயவுசெய்து அறுவடையின் புகைப்படத்தை எடுக்கவும் அல்லது பதிவேற்றவும்.',
        diagnosisRequiredTitle: 'AI निदान தேவை',
        diagnosisRequiredDescription: 'தயவுசெய்து AI निदान പൂർത്തിയാകുന്നതുവരെ കാത്തിരിക്കുക.',
        batchCreationBlockedTitle: 'தொகுதி உருவாக்கம் தடுக்கப்பட்டது',
        batchCreationBlockedDescription: 'ஆரோக்கியமற்ற தாவரத்திற்கு ஒரு தொகுதியை உருவாக்க முடியாது.',
        locationRequiredTitle: 'இடம் தேவை',
        locationRequiredDescription: 'பண்ணை இருப்பிடத்தை அமைக்க தயவுசெய்து தானாகக் கண்டறியும் பொத்தானைப் பயன்படுத்தவும்.',
        batchCreatedSuccessTitle: 'தொகுதி வெற்றிகரமாக உருவாக்கப்பட்டது!',
        batchCreatedSuccessDescription: 'தொகுதி ஐடி',
        batchCreationFailureTitle: 'தொகுதியை உருவாக்கத் தவறிவிட்டது',
        batchCreationFailureDescription: 'எதிர்பாராத பிழை ஏற்பட்டது.',
      }
    },
    sidebar: {
      dashboard: 'டாஷ்போர்டு',
      createBatch: 'தொகுதியை உருவாக்கவும்',
      pastBatches: 'கடந்த தொகுதிகள்',
      assembleProduct: 'தயாரிப்பை ஒன்றுகூட்டு',
      pastProducts: 'கடந்த தயாரிப்புகள்',
      verify: 'சரிபார்/புதுப்பி',
    },
  },
};

export type Translations = typeof content.en;
export type Language = keyof typeof content;
