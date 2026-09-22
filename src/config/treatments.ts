import { Treatment } from '../types';

export const treatmentsData: Treatment[] = [
  {
    id: 'root-canal-treatment',
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    shortDescription: 'Save damaged or severely infected teeth by removing inflamed pulp, cleansing root canals, and sealing them hermetically.',
    iconName: 'Activity',
    durationEstimate: '1 to 2 visits (approx. 45–60 mins each)',
    anesthesiaType: 'Local anesthesia for complete comfort',
    imagePlaceholderAlt: 'Root Canal Endodontic Dental Care Visual',
    overview: 'Root canal treatment (endodontic therapy) is a proven procedure designed to relieve pain, eliminate bacterial infection deep within the tooth, and preserve your natural tooth rather than extracting it.',
    recommendedWhen: [
      'Deep dental decay that has reached the nerve and pulp chamber',
      'Cracked, chipped, or fractured tooth compromising inner pulp tissue',
      'Persistent toothache triggered by hot or cold temperatures',
      'Swelling, tenderness in adjacent gums, or localized abscess formation',
      'Trauma to the mouth that damaged the tooth nerve supply'
    ],
    commonSigns: [
      'Spontaneous throbbing pain that worsens when lying down',
      'Prolonged sensitivity to temperature even after heat/cold is removed',
      'Pain when chewing, biting, or applying pressure to the tooth',
      'Darkening or discoloration of the injured tooth',
      'A small pimple-like bump on the gum line draining fluid'
    ],
    howItWorks: 'During the procedure, your dentist gently accesses the inner pulp space under local anesthesia, cleans and disinfects microscopic root canals using specialized rotary instruments, and seals the space with a biocompatible material called gutta-percha to prevent future re-infection.',
    procedureSteps: [
      {
        title: 'Step 1: Clinical Examination & Digital Radiograph',
        description: 'High-resolution digital X-rays assess the root anatomy, depth of decay, and bone condition surrounding the apex.'
      },
      {
        title: 'Step 2: Gentle Local Anesthesia & Isolation',
        description: 'The area is completely numbed and isolated with a rubber dam to keep the working field sterile and comfortable.'
      },
      {
        title: 'Step 3: Canals Cleansing & Disinfection',
        description: 'Infected nerve tissue is gently removed and root canals are shaped and irrigated with antimicrobial solutions.'
      },
      {
        title: 'Step 4: Biocompatible 3D Obturation & Sealing',
        description: 'Canals are filled and sealed hermetically with gutta-percha and antibacterial sealers.'
      },
      {
        title: 'Step 5: Core Buildup & Protective Crown',
        description: 'A structural filling is placed, followed by a custom dental crown to restore full chewing strength and prevent tooth fracture.'
      }
    ],
    aftercare: [
      'Avoid chewing hard foods on the treated side until the permanent restoration/crown is placed.',
      'Mild tenderness around the gum or tooth ligament is normal for 24–48 hours and is typically managed with prescribed mild analgesics.',
      'Maintain normal gentle brushing and flossing around the temporary filling.',
      'Contact the clinic promptly if you experience uneven bite pressure or unexpected swelling.'
    ],
    faqs: [
      {
        question: 'Is a root canal treatment painful?',
        answer: 'Modern root canal treatments are performed with effective local anesthesia and advanced rotary instruments. Most patients report that the procedure feels no different than getting a routine dental filling, and its primary purpose is to relieve pre-existing pain.'
      },
      {
        question: 'How many appointments are required?',
        answer: 'Many uncomplicated cases can be completed in a single 60-minute visit. If there is extensive infection or complex anatomy, the doctor may place an antibacterial medication inside the tooth and complete the sealing at a second visit.'
      },
      {
        question: 'Why is a dental crown recommended after a root canal?',
        answer: 'Once a tooth loses its pulp and blood supply, the enamel structure becomes more brittle over time. A custom porcelain or zirconia crown protects the tooth against fractures under heavy chewing forces.'
      }
    ]
  },
  {
    id: 'dental-implants',
    slug: 'dental-implants',
    name: 'Dental Implants',
    shortDescription: 'Permanent, titanium or ceramic tooth replacements that look, feel, and function just like your natural teeth.',
    iconName: 'ShieldCheck',
    durationEstimate: 'Staged procedure across 3 to 6 months for complete osseointegration',
    anesthesiaType: 'Local anesthesia with optional conscious relaxation',
    imagePlaceholderAlt: 'Dental Implant Restoration Visual',
    overview: 'A dental implant is a biocompatible medical-grade post surgically placed into your jawbone to replace missing tooth roots. It serves as a sturdy foundation for fixed permanent crowns, bridges, or implant-supported dentures.',
    recommendedWhen: [
      'Missing one or more teeth due to trauma, decay, or gum disease',
      'Seeking a permanent, non-removable alternative to conventional dentures',
      'Desiring to preserve adjacent healthy teeth without grinding them down for bridges',
      'Experiencing bone loss and facial contour sagging from long-term missing teeth'
    ],
    commonSigns: [
      'Difficulty chewing certain foods due to gaps in your smile',
      'Shifting or tilting of surrounding teeth toward empty spaces',
      'Loose, ill-fitting, or clicking removable dentures',
      'Self-consciousness when smiling or speaking in public'
    ],
    howItWorks: 'The biocompatible titanium post naturally fuses with your living jawbone through a biological process called osseointegration. Once healed, a precision-milled abutment and natural-looking ceramic crown are securely anchored.',
    procedureSteps: [
      {
        title: 'Step 1: 3D CBCT Scan & Digital Treatment Planning',
        description: 'We evaluate bone density, volume, and vital anatomical structures to determine the optimal implant position.'
      },
      {
        title: 'Step 2: Gentle Implant Placement',
        description: 'Under local anesthesia, the implant fixture is placed precisely into the prepared bone site.'
      },
      {
        title: 'Step 3: Healing & Osseointegration',
        description: 'Over 8 to 16 weeks, bone cells integrate around the micro-textured implant surface to create permanent stability.'
      },
      {
        title: 'Step 4: Digital Impression & Custom Crown Fabrication',
        description: 'An intraoral optical scan captures your bite with sub-millimeter precision for CAD/CAM crown manufacturing.'
      },
      {
        title: 'Step 5: Final Delivery & Occlusal Verification',
        description: 'Your permanent ceramic crown is secured, polished, and checked for harmonious bite alignment.'
      }
    ],
    aftercare: [
      'Apply a cold ice pack intermittently over the outer cheek during the first 24 hours to minimize swelling.',
      'Stick to soft, lukewarm nutrition for the first few days following surgery.',
      'Rinse gently with warm salt water or recommended antibacterial mouthwash after 24 hours.',
      'Maintain diligent flossing with implant-specific floss once the crown is placed.'
    ],
    faqs: [
      {
        question: 'Who is an ideal candidate for dental implants?',
        answer: 'Most adults with good general health, adequate jawbone density, and healthy gums are candidates. For patients with reduced bone height, bone augmentation or sinus lift procedures may be discussed.'
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper oral hygiene, regular dental checkups, and routine cleanings, dental implants are designed to be a lifelong tooth replacement solution.'
      },
      {
        question: 'Is the implant placement painful?',
        answer: 'Most patients are pleasantly surprised by how comfortable the procedure is. Because the bone itself has very few nerve endings, post-operative discomfort is usually milder than that of a routine tooth extraction.'
      }
    ]
  },
  {
    id: 'teeth-whitening',
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    shortDescription: 'Professional, enamel-safe in-office and take-home whitening treatments to safely lift stains and brighten your smile.',
    iconName: 'Sparkles',
    durationEstimate: 'In-office: 60 minutes | Take-home: 7 to 14 days',
    anesthesiaType: 'Not required (non-invasive procedure)',
    imagePlaceholderAlt: 'Professional Teeth Whitening Visual',
    overview: 'Professional teeth whitening uses clinically tested, pH-balanced hydrogen or carbamide peroxide formulations to gently break down deep chromogen stains within the enamel and dentin without damaging your tooth structure.',
    recommendedWhen: [
      'Extrinsic staining from coffee, tea, red wine, or tobacco',
      'Age-related enamel thinning revealing underlying yellowish dentin',
      'Preparing your smile for special milestones like weddings, interviews, or celebrations',
      'Mild fluorosis or superficial enamel discolorations'
    ],
    commonSigns: [
      'Yellowish, dull, or stained tooth surfaces despite regular brushing',
      'Uneven shade across natural teeth',
      'Desire for a rejuvenated, radiant smile aesthetic'
    ],
    howItWorks: 'Oxygen molecules from the whitening gel penetrate the porous enamel prisms, breaking molecular bonds that hold stubborn dark pigments, resulting in a lighter and more luminous natural shade.',
    procedureSteps: [
      {
        title: 'Step 1: Shade Assessment & Oral Exam',
        description: 'We record your baseline shade with a clinical shade guide and check that gums and enamel are healthy.'
      },
      {
        title: 'Step 2: Gingival Barrier Application',
        description: 'A protective resin barrier is applied over your gums to protect soft tissues from the active whitening agent.'
      },
      {
        title: 'Step 3: Professional Whitening Gel Application',
        description: 'The formulation is carefully applied to the front surfaces of your teeth in 15-minute controlled intervals.'
      },
      {
        title: 'Step 4: Rinse, Desensitizing Agent & Final Polish',
        description: 'The gel is thoroughly removed, and a remineralizing desensitizing treatment is applied to maintain comfort.'
      }
    ],
    aftercare: [
      'Follow the "White Diet" for the first 48 hours: avoid dark coffee, tea, soy sauce, curries, and smoking.',
      'Use a sensitivity-protecting toothpaste if mild transient sensitivity occurs.',
      'Maintain regular brushing and flossing twice daily to prevent new stain accumulation.'
    ],
    faqs: [
      {
        question: 'Does professional whitening damage tooth enamel?',
        answer: 'No. When administered by a trained dental professional, clinical whitening products are pH-balanced and formulated to preserve enamel integrity and mineral content.'
      },
      {
        question: 'Will whitening work on fillings, crowns, or veneers?',
        answer: 'Whitening agents only work on natural tooth structure. If you have existing composite fillings or ceramic crowns on front teeth, your doctor will discuss cosmetic options to maintain shade harmony.'
      }
    ]
  },
  {
    id: 'braces',
    slug: 'braces',
    name: 'Braces & Clear Aligners',
    shortDescription: 'Modern orthodontic treatments including discreet clear aligners and ceramic braces to align teeth and correct bites.',
    iconName: 'Layers',
    durationEstimate: '6 to 24 months depending on individual malocclusion',
    anesthesiaType: 'Not required (non-invasive procedure)',
    imagePlaceholderAlt: 'Orthodontic Braces and Aligners Visual',
    overview: 'Orthodontic therapy corrects crooked, crowded, spaced, or misaligned teeth and jaw discrepancies. A balanced bite not only enhances aesthetic confidence but also improves chewing mechanics, prevents uneven enamel wear, and makes hygiene significantly easier.',
    recommendedWhen: [
      'Crowded or overlapping teeth that are difficult to floss and clean',
      'Noticeable gaps or spacing between adjacent teeth',
      'Overbite, underbite, crossbite, or open bite discrepancies',
      'Jaw joint (TMJ) discomfort caused by uneven chewing distribution'
    ],
    commonSigns: [
      'Difficulty chewing certain foods effectively',
      'Frequent accidental cheek or tongue biting',
      'Teeth grinding (bruxism) related to occlusal interference',
      'Reluctance to smile openly due to tooth misalignment'
    ],
    howItWorks: 'Gentle, continuous, biologically controlled forces guide teeth gradually through the alveolar bone into their ideal functional and aesthetic positions using brackets or removable clear aligners.',
    procedureSteps: [
      {
        title: 'Step 1: Orthodontic Consultation & Digital Scan',
        description: 'We perform high-definition 3D intraoral scans, facial photographs, and lateral cephalometric radiographs.'
      },
      {
        title: 'Step 2: 3D Treatment Simulation',
        description: 'A customized digital treatment plan maps each incremental movement from current alignment to final result.'
      },
      {
        title: 'Step 3: Appliance Delivery or Bonding',
        description: 'For aligners, series of custom trays are delivered; for braces, aesthetic ceramic or metallic brackets are placed.'
      },
      {
        title: 'Step 4: Periodic Progress Evaluations',
        description: 'Short follow-up visits every 4–8 weeks ensure movement is tracking smoothly according to schedule.'
      },
      {
        title: 'Step 5: Retention Phase',
        description: 'Custom clear retainers are provided to stabilize and protect your new smile long-term.'
      }
    ],
    aftercare: [
      'Wear clear aligners 20–22 hours daily, removing only to eat, drink warm beverages, and brush.',
      'Use orthodontic interdental brushes to thoroughly clean around brackets and wires.',
      'Always wear retainers as directed after active alignment is complete.'
    ],
    faqs: [
      {
        question: 'Am I too old for orthodontic treatment or aligners?',
        answer: 'Healthy teeth can be moved at almost any age. Many of our orthodontic patients are adults choosing discreet clear aligners for professional and social convenience.'
      },
      {
        question: 'What is the difference between braces and clear aligners?',
        answer: 'Braces are fixed onto teeth and work continuously, ideal for complex rotations and bite corrections. Clear aligners are virtually invisible, removable for meals, and allow normal brushing and flossing.'
      }
    ]
  },
  {
    id: 'crowns-and-bridges',
    slug: 'crowns-and-bridges',
    name: 'Crowns & Bridges',
    shortDescription: 'High-strength ceramic and zirconia restorations to protect damaged teeth and replace missing tooth units.',
    iconName: 'Award',
    durationEstimate: 'Usually 2 appointments spaced 3 to 7 days apart',
    anesthesiaType: 'Local anesthesia for tooth preparation',
    imagePlaceholderAlt: 'Dental Ceramic Crown and Bridge Visual',
    overview: 'Dental crowns ("caps") enclose and reinforce a weakened, fractured, or root-canal-treated tooth. Fixed dental bridges span the space created by one or more missing teeth, using healthy adjacent teeth or implants as secure anchors.',
    recommendedWhen: [
      'Protecting a brittle tooth following root canal therapy',
      'Restoring a tooth with extensive decay where a simple filling is insufficient',
      'Repairing fractured, chipped, or severely worn down teeth',
      'Replacing missing teeth with a fixed, non-removable prosthetic bridge'
    ],
    commonSigns: [
      'Sharp pain when biting down indicating a cracked tooth cusp',
      'Large old metallic fillings that have compromised the surrounding tooth walls',
      'Missing teeth causing neighboring teeth to drift and tip into empty space'
    ],
    howItWorks: 'The tooth is gently reshaped to create room for the restoration. An optical 3D scan is taken and transmitted to a precision dental laboratory to fabricate a custom crown engineered for exact margins and natural translucency.',
    procedureSteps: [
      {
        title: 'Step 1: Tooth Preparation & Decay Removal',
        description: 'The tooth is shaped under comfortable local anesthesia to create a smooth, retentive contour.'
      },
      {
        title: 'Step 2: High-Precision 3D Digital Scan',
        description: 'Mess-free optical scanning replaces uncomfortable traditional putty impressions.'
      },
      {
        title: 'Step 3: Aesthetic Temporary Crown',
        description: 'A temporary crown protects your tooth and maintains function while your permanent crown is fabricated.'
      },
      {
        title: 'Step 4: Permanent Bonding & Shade Match',
        description: 'The final zirconia or porcelain restoration is evaluated for color, fit, and contacts, then permanently bonded.'
      }
    ],
    aftercare: [
      'Avoid sticky or very hard foods while wearing the temporary crown.',
      'Floss gently around the crown margins by sliding floss out sideways rather than snapping upward.',
      'Maintain regular 6-month checkups and cleanings to protect the underlying tooth margins.'
    ],
    faqs: [
      {
        question: 'What materials are used for dental crowns?',
        answer: 'We prioritize metal-free biocompatible materials such as monolithic Zirconia and E-max (lithium disilicate) ceramic, which provide exceptional fracture resistance and lifelike light translucency.'
      },
      {
        question: 'How long do dental crowns last?',
        answer: 'With proper oral hygiene and regular professional cleanings, high-quality ceramic crowns typically last 10 to 15 years or longer.'
      }
    ]
  },
  {
    id: 'pediatric-dentistry',
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    shortDescription: 'Gentle, compassionate dental care, pit & fissure sealants, and preventative guidance for infants, children, and teens.',
    iconName: 'Smile',
    durationEstimate: '30 to 45 minutes per visit',
    anesthesiaType: 'Non-invasive / topical gel or local numbing when indicated',
    imagePlaceholderAlt: 'Pediatric Children Dental Care Visual',
    overview: 'Pediatric dentistry focuses on fostering positive dental experiences from an early age, monitoring dental jaw development, preventing childhood cavities with fluorides and sealants, and educating parents on wholesome oral hygiene habits.',
    recommendedWhen: [
      'First dental visit by age one or when the first tooth erupts',
      'Routine 6-month checkups and gentle cleanings for growing children',
      'Preventative pit and fissure sealants on newly erupted permanent molars',
      'Early habit correction (thumb sucking, mouth breathing, tongue thrusting)'
    ],
    commonSigns: [
      'White spot lesions or brown spots on baby teeth',
      'Child complaining of discomfort while chewing or eating sweet foods',
      'Visible plaque accumulation along the gumline'
    ],
    howItWorks: 'We employ a "Tell-Show-Do" communication approach that desensitizes dental instruments and ensures children feel safe, heard, and praised throughout their visit.',
    procedureSteps: [
      {
        title: 'Step 1: Friendly Welcome & Acclimatization',
        description: 'Introducing your child to the dental chair and instruments through playful, non-threatening demonstrations.'
      },
      {
        title: 'Step 2: Gentle Examination & Plaque Removal',
        description: 'Checking teeth, bite development, and soft tissues, followed by a gentle polish with child-friendly flavors.'
      },
      {
        title: 'Step 3: Protective Sealants & Fluoride Varnish',
        description: 'Applying protective barrier sealants in deep molar grooves to prevent food and bacteria buildup.'
      },
      {
        title: 'Step 4: Oral Hygiene Coaching for Parents & Child',
        description: 'Demonstrating age-appropriate brushing techniques and dietary advice for cavity prevention.'
      }
    ],
    aftercare: [
      'Assist or supervise your child with tooth brushing twice daily until age 7 or 8.',
      'Encourage water as the primary beverage between meals rather than fruit juices or sodas.',
      'Schedule regular 6-month visits to celebrate clean teeth and catch small issues early.'
    ],
    faqs: [
      {
        question: 'Why treat baby teeth if they will eventually fall out?',
        answer: 'Baby (primary) teeth are vital for proper chewing, clear speech development, and holding space in the jaw for permanent teeth. An untreated infected baby tooth can cause pain and damage the developing permanent tooth underneath.'
      },
      {
        question: 'What are dental sealants?',
        answer: 'Sealants are thin, protective coatings painted onto the chewing surfaces of back teeth (molars) to seal deep microscopic grooves where toothbrush bristles cannot reach.'
      }
    ]
  },
  {
    id: 'wisdom-tooth-removal',
    slug: 'wisdom-tooth-removal',
    name: 'Wisdom Tooth Removal',
    shortDescription: 'Gentle and surgical extraction of impacted, painful, or overcrowded third molars to prevent infections and cyst formation.',
    iconName: 'FileText',
    durationEstimate: '30 to 60 minutes depending on degree of impaction',
    anesthesiaType: 'Profuse local anesthesia for complete numbness',
    imagePlaceholderAlt: 'Wisdom Tooth Extraction Visual',
    overview: 'Wisdom teeth (third molars) usually erupt between ages 17 and 25. Often, the modern human jaw lacks adequate space for them to emerge properly, leading to painful partial impaction, gum inflammation (pericoronitis), or damage to neighboring second molars.',
    recommendedWhen: [
      'Impacted wisdom teeth lodged horizontally or diagonally against adjacent teeth',
      'Recurrent pain, swelling, and bad taste around partially erupted back gums',
      'Food impaction causing cavity development on adjacent healthy molars',
      'Cyst formation or orthodontic space requirement'
    ],
    commonSigns: [
      'Throbbing pain in the back of the jaw radiating to the ear or neck',
      'Difficulty opening the mouth fully (trismus)',
      'Swollen, tender, or bleeding gum flap behind the last molar',
      'Bad breath or unpleasant taste from trapped food debris'
    ],
    howItWorks: 'After thorough digital panoramic evaluation, the area is gently numbed. The tooth is sectioned into smaller segments if necessary to remove it conservatively with minimal pressure and preserve surrounding bone tissue.',
    procedureSteps: [
      {
        title: 'Step 1: OPG Panoramic / CBCT Radiographic Assessment',
        description: 'Mapping the exact position of tooth roots relative to the inferior alveolar nerve canal.'
      },
      {
        title: 'Step 2: Profound Local Anesthesia',
        description: 'Ensuring the entire jaw quadrant is completely numb and pain-free before touching the tooth.'
      },
      {
        title: 'Step 3: Atraumatic Sectioning & Removal',
        description: 'The tooth is gently mobilized and removed with gentle, calibrated instruments.'
      },
      {
        title: 'Step 4: Irrigation & Resorbable Sutures',
        description: 'The extraction socket is cleansed with sterile saline and closed with dissolvable sutures when indicated.'
      }
    ],
    aftercare: [
      'Keep the sterile gauze pad in place with gentle bite pressure for 45–60 minutes after the procedure.',
      'Do NOT spit vigorously, use straws, or smoke for at least 72 hours to prevent dislodging the protective blood clot (dry socket).',
      'Apply an ice pack to your cheek during the first 24 hours to reduce swelling.',
      'Eat soft, cool foods like yogurt, smoothies (with spoon), and broth.'
    ],
    faqs: [
      {
        question: 'Do all wisdom teeth have to be removed?',
        answer: 'Not necessarily. If wisdom teeth are fully erupted, functional, free of decay, easily cleanable, and surrounded by healthy gum tissue, they can be maintained with regular dental observation.'
      },
      {
        question: 'What is a dry socket and how is it prevented?',
        answer: 'A dry socket occurs if the blood clot that forms in the extraction site is prematurely dislodged. It is easily prevented by avoiding spitting, straws, smoking, and strenuous physical exertion for the first 3 to 4 days.'
      }
    ]
  },
  {
    id: 'gum-treatment',
    slug: 'gum-treatment',
    name: 'Gum (Periodontal) Treatment',
    shortDescription: 'Deep cleaning (scaling & root planing), laser decontamination, and therapies to arrest gum bleeding and bone loss.',
    iconName: 'HeartPulse',
    durationEstimate: '1 to 2 visits for comprehensive quadrant therapy',
    anesthesiaType: 'Topical gel or mild local numbing for deep pockets',
    imagePlaceholderAlt: 'Periodontal Gum Treatment Visual',
    overview: 'Periodontal disease is a progressive bacterial infection that damages the gum tissue and underlying alveolar bone supporting your teeth. Early gingivitis is fully reversible, while advanced periodontitis requires professional therapeutic intervention to prevent loose teeth.',
    recommendedWhen: [
      'Bleeding gums during toothbrushing or flossing',
      'Persistent bad breath (halitosis) that does not resolve with mouthwash',
      'Receding gums exposing sensitive tooth root surfaces',
      'Pockets forming between teeth and gums with bone recession on X-rays'
    ],
    commonSigns: [
      'Gums that appear red, swollen, or puffy rather than firm and pale pink',
      'A metallic or sour taste in the mouth',
      'Teeth that feel slightly loose or appear longer due to receding gums'
    ],
    howItWorks: 'Ultrasonic scalers emit gentle acoustic vibrations and a warm water spray to shatter hardened calculus (tartar) and bacterial biofilms above and beneath the gumline, allowing healthy gums to reattach to smooth root surfaces.',
    procedureSteps: [
      {
        title: 'Step 1: Periodontal Charting & Pocket Measurement',
        description: 'A gentle probe measures the depth of gum pockets around every tooth to map inflammation severity.'
      },
      {
        title: 'Step 2: Ultrasonic Scaling & Debridement',
        description: 'Vibrating tips remove calcified deposits and bacterial toxins from tooth surfaces.'
      },
      {
        title: 'Step 3: Root Planing & Smoothing',
        description: 'Micro-curettes smooth rough root cementum to eliminate bacterial retention niches.'
      },
      {
        title: 'Step 4: Antimicrobial Irrigation & Maintenance Plan',
        description: 'Subgingival irrigation cleanses deep pockets, followed by a personalized homecare demonstration.'
      }
    ],
    aftercare: [
      'Gums may feel mildly tender for 24 hours; warm salt water rinses provide soothing relief.',
      'Use an ultra-soft toothbrush and interdental brushes as demonstrated by your clinician.',
      'Attend periodic 3 to 4-month periodontal maintenance visits to maintain healthy bone levels.'
    ],
    faqs: [
      {
        question: 'Will scaling make my teeth loose or create gaps?',
        answer: 'No. This is a common misconception. Scaling removes hardened tartar that was artificially holding plaque against the tooth. As swollen gums heal and inflammation subsides, the true healthy baseline is revealed.'
      },
      {
        question: 'How often should I have my teeth professionally cleaned?',
        answer: 'For patients with healthy gums, a routine preventive cleaning every 6 months is recommended. For patients with a history of gum disease, maintenance cleanings every 3 to 4 months are best.'
      }
    ]
  },
  {
    id: 'general-dentistry',
    slug: 'general-dentistry',
    name: 'General & Preventive Dentistry',
    shortDescription: 'Comprehensive checkups, digital diagnostics, tooth-colored composite fillings, and customized preventative protocols.',
    iconName: 'CheckCircle2',
    durationEstimate: '30 to 45 minutes for routine checkup & cleaning',
    anesthesiaType: 'Not required for routine exams; local for fillings',
    imagePlaceholderAlt: 'General Preventive Dental Care Visual',
    overview: 'General dentistry is the cornerstone of lifelong oral health. Routine comprehensive examinations detect subclinical cavities, early enamel demineralization, cracked fillings, and oral mucosal changes before they can escalate into painful and costly dental emergencies.',
    recommendedWhen: [
      'Routine 6-month preventive oral health evaluation',
      'New or returning patient establishing an oral wellness baseline',
      'Tooth-colored composite fillings to replace dark amalgam or treat new decay',
      'Custom nightguards for clenching/bruxism or sports mouthguards'
    ],
    commonSigns: [
      'Food constantly packing between specific teeth',
      'Sharp edge or roughness felt with your tongue on a tooth',
      'Morning jaw tightness or headache indicative of nocturnal grinding',
      'More than 6 months since your last dental professional visit'
    ],
    howItWorks: 'We combine high-magnification loupes, intraoral cameras, and low-dose digital sensors to conduct an exhaustive 360-degree review of your teeth, gums, occlusion, and soft tissues.',
    procedureSteps: [
      {
        title: 'Step 1: Medical History & Lifestyle Review',
        description: 'Discussing your medical conditions, medications, dietary habits, and dental goals.'
      },
      {
        title: 'Step 2: Low-Dose Digital Radiographs & Intraoral Photos',
        description: 'Capturing clear images so you can see exactly what the doctor sees on the operatory screen.'
      },
      {
        title: 'Step 3: Tooth-by-Tooth Examination & Cancer Screening',
        description: 'Checking each tooth surface, existing restorations, and oral mucosal tissues.'
      },
      {
        title: 'Step 4: Collaborative Treatment Discussion',
        description: 'Prioritizing necessary care and discussing preventive options with upfront clarity.'
      }
    ],
    aftercare: [
      'Brush thoroughly twice daily for 2 minutes with fluoridated toothpaste.',
      'Floss daily before bedtime to clean interproximal surfaces where 40% of plaque resides.',
      'Maintain your scheduled 6-month preventive recall appointment.'
    ],
    faqs: [
      {
        question: 'Why do I need a dental checkup if my teeth do not hurt?',
        answer: 'Most dental conditions—including early cavities, cracked teeth, and gum disease—develop silently without pain until they reach advanced stages. Regular checkups identify and resolve problems when they are smallest, simplest, and least invasive.'
      },
      {
        question: 'What are tooth-colored composite fillings made of?',
        answer: 'Composite resin is a durable mixture of plastic resin and microscopic glass particles that can be precisely color-matched to your natural tooth shade and bonded directly to enamel.'
      }
    ]
  }
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatmentsData.find(t => t.slug === slug);
}
