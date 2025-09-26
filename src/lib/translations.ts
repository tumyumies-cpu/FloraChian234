
export const content = {
  en: {
    home: {
      nav: {
        about: 'About',
        signIn: 'Sign In',
      },
      hero: {
        title: 'FloraChain, every herb tells its story',
        titleHighlight: 'from soil to shelf.',
        subtitle: "Experience unparalleled transparency in the herbal supply chain. Follow your product's complete journey from the farm to your hands, verified at every step.",
        trackButton: 'Track Your Product',
        alt: 'Lush green landscape',
      },
       about: {
        title: 'About FloraChain',
        p1: 'FloraChain is a pioneering platform dedicated to bringing radical transparency to the herbal and Ayurvedic supply chain. We believe that every consumer has the right to know the origin and journey of the products they use.',
        p2: 'By leveraging cutting-edge technology, we empower farmers with fair practices, enable brands to build undeniable trust, and provide consumers with the peace of mind that comes from a fully traceable, authentic product.',
        alt: 'Person holding fresh herbs in their hands'
      },
      howItWorks: {
        title: 'How It Works',
        subtitle: 'A simple, verifiable journey for every product.',
        step1: 'Farmer harvests & uploads details',
        step2: 'Processor verifies & records data',
        step3: 'Distributor logs transport conditions',
        step4: 'Consumer scans to view history',
      },
      keyFeatures: {
        title: 'Complete Trust, End-to-End',
        feature1: '100% Traceability & Transparency',
        feature2: 'Blockchain-based Authenticity',
        feature3: 'Fair Payments for Farmers',
        feature4: 'Quality & Lab-Test Certificates',
        feature5: 'Sustainable & Ethical Sourcing',
      },
      stakeholders: {
        title: 'For Every Link in the Chain',
        farmerTitle: 'For Farmers',
        farmerDesc: 'Get fair pricing and transparent payments for your high-quality Ayurvedic herbs.',
        brandTitle: 'For Brands',
        brandDesc: 'Prove product authenticity, meet compliance standards, and build consumer trust with blockchain.',
        consumerTitle: 'For Consumers',
        consumerDesc: 'Scan QR codes to see the verified journey of your product and ensure its quality.',
        learnMore: 'Learn More',
      },
      snapshot: {
        batches: 'Batches Tracked',
        farmers: 'Farmers Registered',
        products: 'Products Delivered',
      },
      testimonials: {
        title: 'From Our Partners',
        quote: 'I can now sell my herbs with guaranteed trust thanks to blockchain transparency.',
        author: 'A Farmer from Rajasthan',
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
      },
      hero: {
        title: 'फ्लोराचेन, हर जड़ी-बूटी अपनी कहानी कहती है',
        titleHighlight: 'खेत से दुकान तक।',
        subtitle: 'हर्बल आपूर्ति श्रृंखला में अद्वितीय पारदर्शिता का अनुभव करें। अपने उत्पाद की खेत से लेकर आपके हाथों तक की पूरी यात्रा को ट्रैक करें, हर कदम पर सत्यापित।',
        trackButton: 'अपने उत्पाद को ट्रैक करें',
        alt: 'हरी-भरी भूमि',
      },
      about: {
        title: 'फ्लोराचेन के बारे में',
        p1: 'फ्लोराचेन हर्बल और आयुर्वेदिक आपूर्ति श्रृंखला में मौलिक पारदर्शिता लाने के लिए समर्पित एक अग्रणी मंच है। हमारा मानना ​​है कि प्रत्येक उपभोक्ता को अपने द्वारा उपयोग किए जाने वाले उत्पादों की उत्पत्ति और यात्रा जानने का अधिकार है।',
        p2: 'अत्याधुनिक तकनीक का लाभ उठाकर, हम किसानों को उचित प्रथाओं के साथ सशक्त बनाते हैं, ब्रांडों को निर्विवाद विश्वास बनाने में सक्षम बनाते हैं, और उपभोक्ताओं को पूरी तरह से पता लगाने योग्य, प्रामाणिक उत्पाद से आने वाली मन की शांति प्रदान करते हैं।',
        alt: 'कोई व्यक्ति अपने हाथों में ताजी जड़ी-बूटियाँ पकड़े हुए है'
      },
      howItWorks: {
        title: 'यह कैसे काम करता है',
        subtitle: 'हर उत्पाद के लिए एक सरल, सत्यापन योग्य यात्रा।',
        step1: 'किसान फसल काटता है और विवरण अपलोड करता है',
        step2: 'प्रोसेसर डेटा सत्यापित और रिकॉर्ड करता है',
        step3: 'वितरक परिवहन स्थितियों को लॉग करता है',
        step4: 'उपभोक्ता इतिहास देखने के लिए स्कैन करता है',
      },
      keyFeatures: {
        title: 'पूर्ण विश्वास, अंत-से-अंत तक',
        feature1: '100% ट्रेसबिलिटी और पारदर्शिता',
        feature2: 'ब्लॉकचेन-आधारित प्रामाणिकता',
        feature3: 'किसानों के लिए उचित भुगतान',
        feature4: 'गुणवत्ता और लैब-टेस्ट प्रमाण पत्र',
        feature5: 'टिकाऊ और नैतिक सोर्सिंग',
      },
      stakeholders: {
        title: 'श्रृंखला में हर कड़ी के लिए',
        farmerTitle: 'किसानों के लिए',
        farmerDesc: 'अपनी उच्च-गुणवत्ता वाली आयुर्वेदिक जड़ी-बूटियों के लिए उचित मूल्य निर्धारण और पारदर्शी भुगतान प्राप्त करें।',
        brandTitle: 'ब्रांडों के लिए',
        brandDesc: 'उत्पाद की प्रामाणिकता साबित करें, अनुपालन मानकों को पूरा करें, और ब्लॉकचेन के साथ उपभोक्ता विश्वास का निर्माण करें।',
        consumerTitle: 'उपभोक्ताओं के लिए',
        consumerDesc: 'अपने उत्पाद की सत्यापित यात्रा देखने और उसकी गुणवत्ता सुनिश्चित करने के लिए QR कोड स्कैन करें।',
        learnMore: 'और जानें',
      },
      snapshot: {
        batches: 'ट्रैक किए गए बैच',
        farmers: 'पंजीकृत किसान',
        products: 'वितरित उत्पाद',
      },
      testimonials: {
        title: 'हमारे भागीदारों से',
        quote: 'ब्लॉकचेन पारदर्शिता की बदौलत मैं अब अपनी जड़ी-बूटियों को गारंटीशुदा भरोसे के साथ बेच सकता हूँ।',
        author: 'राजस्थान का एक किसान',
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
      },
      hero: {
        title: 'ఫ్లోరాచెయిన్, ప్రతి మూలిక తన కథను చెబుతుంది',
        titleHighlight: 'నేల నుండి అర వరకు.',
        subtitle: 'హెర్బల్ సరఫరా గొలుసులో అసమానమైన పారదర్శకతను అనుభవించండి. మీ ఉత్పత్తి యొక్క పూర్తి ప్రయాణాన్ని పొలం నుండి మీ చేతులకు, ప్రతి దశలో ధృవీకరించబడింది.',
        trackButton: 'మీ ఉత్పత్తిని ట్రాక్ చేయండి',
        alt: 'పచ్చని ప్రకృతి దృశ్యం',
      },
      about: {
        title: 'ఫ్లోరాచెయిన్ గురించి',
        p1: 'ఫ్లోరాచెయిన్ హెర్బల్ మరియు ఆయుర్వేద సరఫరా గొలుసుకు తీవ్ర పారదర్శకతను తీసుకురావడానికి అంకితమైన ఒక మార్గదర్శక వేదిక. తాము ఉపయోగించే ఉత్పత్తుల మూలం మరియు ప్రయాణాన్ని తెలుసుకునే హక్కు ప్రతి వినియోగదారునికి ఉందని మేము నమ్ముతున్నాము.',
        p2: 'అత్యాధునిక సాంకేతిక పరిజ్ఞానాన్ని ఉపయోగించడం ద్వారా, మేము రైతులకు న్యాయమైన పద్ధతులతో సాధికారత కల్పిస్తాము, బ్రాండ్‌లు కాదనలేని నమ్మకాన్ని పెంచుకోవడానికి వీలు కల్పిస్తాము మరియు వినియోగదారులకు పూర్తిగా గుర్తించదగిన, ప్రామాణికమైన ఉత్పత్తి నుండి వచ్చే மனశ్శాంతిని అందిస్తాము.',
        alt: 'ఒక వ్యక్తి చేతిలో తాజా మూలికలు పట్టుకుని ఉన్నారు'
      },
      howItWorks: {
        title: 'ఇది ఎలా పని చేస్తుంది',
        subtitle: 'ప్రతి ఉత్పత్తికి ఒక సులభమైన, ధృవీకరించదగిన ప్రయాణం.',
        step1: 'రైతు పంట కోసి వివరాలను అప్‌లోడ్ చేస్తాడు',
        step2: 'ప్రాసెసర్ డేటాను ధృవీకరించి రికార్డ్ చేస్తుంది',
        step3: 'పంపిణీదారు రవాణా పరిస్థితులను లాగ్ చేస్తాడు',
        step4: 'వినియోగదారు చరిత్రను వీక్షించడానికి స్కాన్ చేస్తాడు',
      },
      keyFeatures: {
        title: 'పూర్తి నమ్మకం, ఎండ్-టు-ఎండ్',
        feature1: '100% ట్రేస్‌బిలిటీ & పారదర్శకత',
        feature2: 'బ్లాక్‌చెయిన్-ఆధారిత ప్రామాణికత',
        feature3: 'రైతులకు న్యాయమైన చెల్లింపులు',
        feature4: 'నాణ్యత & ల్యాబ్-పరీక్ష సర్టిఫికెట్లు',
        feature5: 'స్థిరమైన & నైతిక సోర్సింగ్',
      },
      stakeholders: {
        title: 'గొలుసులోని ప్రతి లింక్ కోసం',
        farmerTitle: 'రైతుల కోసం',
        farmerDesc: 'మీ అధిక-నాణ్యత ఆయుర్వేద మూలికలకు న్యాయమైన ధర మరియు పారదర్శక చెల్లింపులను పొందండి.',
        brandTitle: 'బ్రాండ్‌ల కోసం',
        brandDesc: 'ఉత్పత్తి ప్రామాణికతను నిరూపించండి, వర్తింపు ప్రమాణాలను పాటించండి మరియు బ్లాక్‌చెయిన్‌తో వినియోగదారు నమ్మకాన్ని పెంచుకోండి.',
        consumerTitle: 'వినియోగదారుల కోసం',
        consumerDesc: 'మీ ఉత్పత్తి యొక్క ధృవీకరించబడిన ప్రయాణాన్ని చూడటానికి మరియు దాని నాణ్యతను నిర్ధారించడానికి QR కోడ్‌లను స్కాన్ చేయండి.',
        learnMore: 'మరింత తెలుసుకోండి',
      },
      snapshot: {
        batches: 'ట్రాక్ చేయబడిన బ్యాచ్‌లు',
        farmers: 'నమోదిత రైతులు',
        products: 'పంపిణీ చేయబడిన ఉత్పత్తులు',
      },
      testimonials: {
        title: 'మా భాగస్వాముల నుండి',
        quote: 'బ్లాక్‌చెయిన్ పారదర్శకతకు ధన్యవాదాలు, నేను ఇప్పుడు నా మూలికలను గ్యారెంటీ నమ్మకంతో అమ్మగలను.',
        author: 'రాజస్థాన్ నుండి ఒక రైతు',
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
      },
      hero: {
        title: 'ஃப்ளோராசெயின், ஒவ்வொரு மூலிகையும் அதன் கதையைச் சொல்கிறது',
        titleHighlight: 'மண்ணிலிருந்து அலமாரி வரை.',
        subtitle: 'மூலிகை விநியோகச் சங்கிலியில் இணையற்ற வெளிப்படைத்தன்மையை அனுபவியுங்கள். உங்கள் தயாரிப்பின் முழுமையான பயணத்தை பண்ணையிலிருந்து உங்கள் கைகளுக்கு, ஒவ்வொரு படியிலும் சரிபார்க்கப்பட்டது.',
        trackButton: 'உங்கள் தயாரிப்பைக் கண்காணிக்கவும்',
        alt: 'செழிப்பான பச்சை நிலப்பரப்பு',
      },
      about: {
        title: 'ஃப்ளோராசெயின் பற்றி',
        p1: 'ஃப்ளோராசெயின் என்பது மூலிகை மற்றும் ஆயுர்வேத விநியோகச் சங்கிலியில் தீவிர வெளிப்படைத்தன்மையைக் கொண்டுவருவதற்கு அர்ப்பணிக்கப்பட்ட ஒரு முன்னோடி தளமாகும். ஒவ்வொரு நுகர்வோருக்கும் தாங்கள் பயன்படுத்தும் பொருட்களின் தோற்றம் மற்றும் பயணத்தை அறியும் உரிமை உள்ளது என்று நாங்கள் நம்புகிறோம்.',
        p2: 'அதிநவீன தொழில்நுட்பத்தைப் பயன்படுத்துவதன் மூலம், நாங்கள் விவசாயிகளுக்கு நியாயமான நடைமுறைகளுடன் அதிகாரம் அளிக்கிறோம், பிராண்டுகள் மறுக்க முடியாத நம்பிக்கையை உருவாக்க உதவுகிறோம், மேலும் நுகர்வோருக்கு முழுமையாகக் கண்டறியக்கூடிய, உண்மையான தயாரிப்பிலிருந்து வரும் மன அமைதியை வழங்குகிறோம்.',
        alt: 'ஒருவர் கையில் புதிய மூலிகைகளை வைத்திருக்கிறார்'
      },
      howItWorks: {
        title: 'இது எப்படி வேலை செய்கிறது',
        subtitle: 'ஒவ்வொரு தயாரிப்புக்கும் ஒரு எளிய, சரிபார்க்கக்கூடிய பயணம்.',
        step1: 'விவசாயி அறுவடை செய்து விவரங்களைப் பதிவேற்றுகிறார்',
        step2: 'செயலி தரவைச் சரிபார்த்து பதிவு செய்கிறது',
        step3: 'விநியோகஸ்தர் போக்குவரத்து நிலைமைகளைப் பதிவு செய்கிறார்',
        step4: 'நுகர்வோர் வரலாற்றைக் காண ஸ்கேன் செய்கிறார்',
      },
      keyFeatures: {
        title: 'முழுமையான நம்பிக்கை, இறுதி முதல் இறுதி வரை',
        feature1: '100% தடமறிதல் மற்றும் வெளிப்படைத்தன்மை',
        feature2: 'பிளாக்செயின் அடிப்படையிலான நம்பகத்தன்மை',
        feature3: 'விவசாயிகளுக்கு நியாயமான கொடுப்பனவுகள்',
        feature4: 'தரம் மற்றும் ஆய்வக-சோதனை சான்றிதழ்கள்',
        feature5: 'நிலையான மற்றும் நெறிமுறை ஆதாரம்',
      },
      stakeholders: {
        title: 'சங்கிலியின் ஒவ்வொரு இணைப்புக்கும்',
        farmerTitle: 'விவசாயிகளுக்கு',
        farmerDesc: 'உங்கள் உயர்தர ஆயுர்வேத மூலிகைகளுக்கு நியாயமான விலை மற்றும் வெளிப்படையான கொடுப்பனவுகளைப் பெறுங்கள்.',
        brandTitle: 'பிராண்டுகளுக்கு',
        brandDesc: 'தயாரிப்பு நம்பகத்தன்மையை நிரூபிக்கவும், இணக்கத் தரங்களை பூர்த்தி செய்யவும், மற்றும் பிளாக்செயினுடன் நுகர்வோர் நம்பிக்கையை உருவாக்கவும்.',
        consumerTitle: 'நுகர்வோருக்கு',
        consumerDesc: 'உங்கள் தயாரிப்பின் சரிபார்க்கப்பட்ட பயணத்தைக் காணவும் மற்றும் அதன் தரத்தை உறுதிப்படுத்தவும் QR குறியீடுகளை ஸ்கேன் செய்யவும்.',
        learnMore: 'மேலும் அறிக',
      },
      snapshot: {
        batches: 'கண்காணிக்கப்பட்ட தொகுதிகள்',
        farmers: 'பதிவுசெய்யப்பட்ட விவசாயிகள்',
        products: 'வழங்கப்பட்ட தயாரிப்புகள்',
      },
      testimonials: {
        title: 'எங்கள் கூட்டாளர்களிடமிருந்து',
        quote: 'பிளாக்செயின் வெளிப்படைத்தன்மைக்கு நன்றி, நான் இப்போது என் மூலிகைகளை உத்தரவாத நம்பிக்கையுடன் விற்க முடியும்.',
        author: 'ராஜஸ்தானைச் சேர்ந்த ஒரு விவசாயி',
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
