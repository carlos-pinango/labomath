/* ============================================
   LABOMATH – Bilingual Translations (FR / EN)
   ============================================ */

const T = {
  fr: {
    appTitle: 'LaboMath',
    tagline: 'Ton laboratoire de mathématiques',
    chooseLevel: 'Choisis ton niveau',
    chooseSubtitle: 'Du Secondaire 1 au Secondaire 5 — commence là où tu en es !',
    back: 'Retour',
    explore: 'Explorer',
    practice: 'Pratiquer',
    comingSoon: 'Bientôt disponible',
    comingSoonMsg: 'Ce niveau sera bientôt disponible. Reste à l\'affût — encore un peu de patience ! 🚀',
    comingSoonSub: 'En attendant, perfectionne tes bases en Secondaire 1 et 2.',
    levelLabel: 'Niveau',
    allTopics: 'Tous les thèmes',

    levelNames: ['', 'Secondaire 1', 'Secondaire 2', 'Secondaire 3', 'Secondaire 4', 'Secondaire 5'],
    levelSubtitles: [
      '',
      'Nombres · Opérations · Algèbre débutant · Fractions',
      'Proportionnalité · Pythagore · Équations · Fonctions',
      'Fonctions · Algèbre avancée · Statistiques',
      'Trigonométrie · Statistiques · Probabilités',
      'Fonctions avancées · Calcul différentiel'
    ],
    levelDecorations: ['', '🔢', '📐', '📊', '📡', '🚀'],

    topics: {
      fractions:       { title: 'Les fractions',              desc: 'Numérateur, dénominateur, fractions équivalentes et opérations' },
      integers:        { title: 'Les nombres entiers',        desc: 'Entiers positifs et négatifs sur la droite numérique' },
      orderOfOps:      { title: "L'ordre des opérations",     desc: 'PEMDAS : parenthèses, exposants, ×÷, +−' },
      algebraIntro:    { title: "Introduction à l'algèbre",   desc: 'Variables, expressions algébriques et équations simples' },
      proportionality: { title: 'La proportionnalité',        desc: 'Rapports, taux, pourcentages et règle de trois' },
      pythagoras:      { title: 'Le théorème de Pythagore',   desc: 'Relations dans les triangles rectangles : a² + b² = c²' },
      linearEquations: { title: 'Équations du 1er degré',     desc: 'Résoudre des équations avec une inconnue, étape par étape' },
      linearFunctions: { title: 'Fonctions du 1er degré',     desc: 'Pente, ordonnée à l\'origine et représentation graphique' },
      pourcentages:    { title: 'Les pourcentages',           desc: 'Trouver le %, la partie ou le tout avec une grille interactive de 100 cases' },
    },

    topicIcons: {
      fractions: '🍕', integers: '🔢', orderOfOps: '⚙️',
      algebraIntro: '⚖️', proportionality: '📏', pythagoras: '📐',
      linearEquations: '🧩', linearFunctions: '📈', pourcentages: '💯'
    },

    exploreBtn: 'Visualiser',
    practiceBtn: 'S\'exercer',
    closeExplore: '✕ Fermer',

    // Practice UI
    questionOf: (n, total) => `Question ${n} sur ${total}`,
    checkAnswer: 'Vérifier',
    nextQuestion: 'Suivant →',
    showHint: '💡 Indice',
    hideHint: 'Cacher l\'indice',
    correct: '✓ Excellent !',
    incorrect: '✗ Pas tout à fait…',
    yourAnswer: 'Ta réponse :',
    correctAnswer: 'Bonne réponse :',
    explanation: 'Explication :',
    quizComplete: 'Quiz terminé !',
    tryAgain: '🔄 Recommencer',
    backToTopics: '← Retour aux thèmes',
    scoreMsg: (n, total) => {
      const pct = (n / total) * 100;
      if (pct === 100) return 'Parfait ! Tu maîtrises vraiment ce sujet ! 🌟';
      if (pct >= 80)  return 'Super travail ! Tu es presque expert(e) ! 💪';
      if (pct >= 60)  return 'Bon effort ! Continue à pratiquer ! 🔥';
      if (pct >= 40)  return 'Tu progresses ! Revois les concepts et réessaie ! 📚';
      return 'N\'abandonne pas ! Chaque tentative t\'aide à apprendre ! 🌱';
    },
    scoreLabel: 'sur',

    encourageCorrect: [
      'Excellent ! Continue comme ça ! 🌟',
      'Parfait ! Tu maîtrises ça ! 💪',
      'Super ! Tu es en feu ! 🔥',
      'Bien joué ! Quelle précision ! ⚡',
      'Magnifique ! Tu es brillant(e) ! ✨',
      'Wow ! Tu gères complètement ! 🎯',
    ],

    // Explore: Fraction labels
    numerator: 'Numérateur',
    denominator: 'Dénominateur',
    fractionValue: 'Valeur de la fraction',
    equivalentFractions: 'Fractions équivalentes',
    decimalVal: 'Décimal',
    percentVal: 'Pourcentage',

    // Explore: Number line
    startValue: 'Valeur de départ',
    addAmount: 'Ajouter',
    subtractAmount: 'Soustraire',
    currentValue: 'Valeur actuelle',
    reset: 'Réinitialiser',

    // Explore: BEDMAS
    selectExample: 'Choisis un exemple :',
    stepsTitle: 'Étapes de résolution',
    bedmasTitle: 'PEMDAS — Ordre des opérations',
    bedmasInfo: 'Toujours résoudre dans cet ordre : <strong>P</strong>arenthèses → <strong>E</strong>xposants → <strong>M</strong>ultiplication/<strong>D</strong>ivision → <strong>A</strong>ddition/<strong>S</strong>oustraction',

    // Explore: Algebra balance
    balanceTitle: 'La balance algébrique',
    balanceInfo: 'Ce que tu fais d\'un côté, tu dois le faire de l\'autre !',
    addX: '+x',
    removeX: '−x',
    addNum: '+nombre',
    removeNum: '−nombre',
    solved: '🎉 Résolu !',
    solvedMsg: (x) => `x = ${x}`,
    resetBalance: 'Recommencer',

    // Explore: Proportionality
    ratio1: 'Rapport 1',
    ratio2: 'Rapport 2',
    proportional: '✓ Proportionnel',
    notProportional: '✗ Pas proportionnel',
    crossMultiply: 'Produits croisés :',

    // Explore: Pythagoras
    sideA: 'Côté a',
    sideB: 'Côté b',
    hypotenuse: 'Hypoténuse c',
    pythagorasFormula: 'a² + b² = c²',

    // Explore: Linear functions
    slope: 'Pente (m)',
    yIntercept: 'Ordonnée à l\'origine (b)',
    functionLabel: 'Fonction',
    tableOfValues: 'Table de valeurs',

    footerText: 'Curriculum québécois · Progression des apprentissages · Secondaire 1–5'
  },

  en: {
    appTitle: 'MathLab',
    tagline: 'Your mathematics laboratory',
    chooseLevel: 'Choose your level',
    chooseSubtitle: 'From Secondary 1 to Secondary 5 — start where you are!',
    back: 'Back',
    explore: 'Explore',
    practice: 'Practice',
    comingSoon: 'Coming soon',
    comingSoonMsg: 'This level will be available soon. Stay tuned — just a bit more patience! 🚀',
    comingSoonSub: 'In the meantime, strengthen your foundations in Secondary 1 and 2.',
    levelLabel: 'Level',
    allTopics: 'All topics',

    levelNames: ['', 'Secondary 1', 'Secondary 2', 'Secondary 3', 'Secondary 4', 'Secondary 5'],
    levelSubtitles: [
      '',
      'Numbers · Operations · Beginner Algebra · Fractions',
      'Proportionality · Pythagoras · Equations · Functions',
      'Functions · Advanced Algebra · Statistics',
      'Trigonometry · Statistics · Probability',
      'Advanced Functions · Differential Calculus'
    ],
    levelDecorations: ['', '🔢', '📐', '📊', '📡', '🚀'],

    topics: {
      fractions:       { title: 'Fractions',                  desc: 'Numerator, denominator, equivalent fractions and operations' },
      integers:        { title: 'Integers',                   desc: 'Positive and negative integers on the number line' },
      orderOfOps:      { title: 'Order of Operations',        desc: 'BEDMAS: brackets, exponents, ×÷, +−' },
      algebraIntro:    { title: 'Introduction to Algebra',    desc: 'Variables, algebraic expressions and simple equations' },
      proportionality: { title: 'Proportionality',            desc: 'Ratios, rates, percentages and cross-multiplication' },
      pythagoras:      { title: 'Pythagorean Theorem',        desc: 'Relationships in right triangles: a² + b² = c²' },
      linearEquations: { title: '1st Degree Equations',       desc: 'Solve equations with one unknown, step by step' },
      linearFunctions: { title: '1st Degree Functions',       desc: 'Slope, y-intercept and graphing' },
      pourcentages:    { title: 'Percentages',                desc: 'Find the %, the part, or the whole using an interactive 100-cell grid' },
    },

    topicIcons: {
      fractions: '🍕', integers: '🔢', orderOfOps: '⚙️',
      algebraIntro: '⚖️', proportionality: '📏', pythagoras: '📐',
      linearEquations: '🧩', linearFunctions: '📈', pourcentages: '💯'
    },

    exploreBtn: 'Visualize',
    practiceBtn: 'Practice',
    closeExplore: '✕ Close',

    questionOf: (n, total) => `Question ${n} of ${total}`,
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next →',
    showHint: '💡 Hint',
    hideHint: 'Hide hint',
    correct: '✓ Excellent!',
    incorrect: '✗ Not quite…',
    yourAnswer: 'Your answer:',
    correctAnswer: 'Correct answer:',
    explanation: 'Explanation:',
    quizComplete: 'Quiz complete!',
    tryAgain: '🔄 Try again',
    backToTopics: '← Back to topics',
    scoreMsg: (n, total) => {
      const pct = (n / total) * 100;
      if (pct === 100) return 'Perfect! You\'ve truly mastered this topic! 🌟';
      if (pct >= 80)  return 'Great work! You\'re almost an expert! 💪';
      if (pct >= 60)  return 'Good effort! Keep practising! 🔥';
      if (pct >= 40)  return 'You\'re improving! Review the concepts and try again! 📚';
      return 'Don\'t give up! Every attempt helps you learn! 🌱';
    },
    scoreLabel: 'out of',

    encourageCorrect: [
      'Excellent! Keep it up! 🌟',
      'Perfect! You\'ve got this! 💪',
      'Great! You\'re on fire! 🔥',
      'Well done! Great accuracy! ⚡',
      'Amazing! You\'re brilliant! ✨',
      'Wow! You totally nailed it! 🎯',
    ],

    numerator: 'Numerator',
    denominator: 'Denominator',
    fractionValue: 'Fraction value',
    equivalentFractions: 'Equivalent fractions',
    decimalVal: 'Decimal',
    percentVal: 'Percentage',

    startValue: 'Starting value',
    addAmount: 'Add',
    subtractAmount: 'Subtract',
    currentValue: 'Current value',
    reset: 'Reset',

    selectExample: 'Choose an example:',
    stepsTitle: 'Solution steps',
    bedmasTitle: 'BEDMAS — Order of Operations',
    bedmasInfo: 'Always solve in this order: <strong>B</strong>rackets → <strong>E</strong>xponents → <strong>M</strong>ultiplication/<strong>D</strong>ivision → <strong>A</strong>ddition/<strong>S</strong>ubtraction',

    balanceTitle: 'The algebra balance',
    balanceInfo: 'Whatever you do to one side, you must do to the other!',
    addX: '+x',
    removeX: '−x',
    addNum: '+number',
    removeNum: '−number',
    solved: '🎉 Solved!',
    solvedMsg: (x) => `x = ${x}`,
    resetBalance: 'Reset',

    ratio1: 'Ratio 1',
    ratio2: 'Ratio 2',
    proportional: '✓ Proportional',
    notProportional: '✗ Not proportional',
    crossMultiply: 'Cross products:',

    sideA: 'Side a',
    sideB: 'Side b',
    hypotenuse: 'Hypotenuse c',
    pythagorasFormula: 'a² + b² = c²',

    slope: 'Slope (m)',
    yIntercept: 'Y-intercept (b)',
    functionLabel: 'Function',
    tableOfValues: 'Table of values',

    footerText: 'Quebec Curriculum · Learning Progression · Secondary 1–5'
  }
};
