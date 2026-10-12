/* ============================================
   LABOMATH – Curriculum & Question Bank
   Quebec PDA (Progression des apprentissages)
   ============================================ */

const CURRICULUM = {
  s1: {
    topics: ['fractions', 'integers', 'orderOfOps', 'algebraIntro'],
    questions: [
      // ── FRACTIONS ─────────────────────────
      {
        id: 'f01', topic: 'fractions', type: 'mc',
        q: { fr: 'Calcule : ½ + ¼', en: 'Calculate: ½ + ¼' },
        formula: '1/2 + 1/4',
        opts: {
          fr: ['1/6', '2/6', '3/4', '2/4'],
          en: ['1/6', '2/6', '3/4', '2/4']
        },
        correct: 2,
        hint: {
          fr: 'Trouve le dénominateur commun : 1/2 = 2/4',
          en: 'Find the common denominator: 1/2 = 2/4'
        },
        explain: {
          fr: '1/2 = 2/4, donc 2/4 + 1/4 = 3/4. On additionne les numérateurs quand le dénominateur est commun.',
          en: '1/2 = 2/4, so 2/4 + 1/4 = 3/4. Add the numerators once you have a common denominator.'
        }
      },
      {
        id: 'f02', topic: 'fractions', type: 'mc',
        q: { fr: 'Quelle fraction est équivalente à 2/3 ?', en: 'Which fraction is equivalent to 2/3?' },
        formula: '2/3 = ?',
        opts: {
          fr: ['3/4', '4/6', '3/9', '6/7'],
          en: ['3/4', '4/6', '3/9', '6/7']
        },
        correct: 1,
        hint: {
          fr: 'Multiplie le numérateur ET le dénominateur par le même nombre',
          en: 'Multiply BOTH numerator and denominator by the same number'
        },
        explain: {
          fr: '2/3 × (2/2) = 4/6. On multiplie numérateur et dénominateur par 2.',
          en: '2/3 × (2/2) = 4/6. Multiply numerator and denominator both by 2.'
        }
      },
      {
        id: 'f03', topic: 'fractions', type: 'mc',
        q: { fr: 'Simplifie la fraction 6/8', en: 'Simplify the fraction 6/8' },
        formula: '6/8 = ?',
        opts: {
          fr: ['2/3', '3/4', '4/5', '1/2'],
          en: ['2/3', '3/4', '4/5', '1/2']
        },
        correct: 1,
        hint: {
          fr: 'Divise le numérateur et le dénominateur par leur PGCD (ici, 2)',
          en: 'Divide numerator and denominator by their GCF (here, 2)'
        },
        explain: {
          fr: '6 ÷ 2 = 3 et 8 ÷ 2 = 4, donc 6/8 = 3/4.',
          en: '6 ÷ 2 = 3 and 8 ÷ 2 = 4, so 6/8 = 3/4.'
        }
      },
      {
        id: 'f04', topic: 'fractions', type: 'fill',
        q: { fr: 'Calcule 3/4 − 1/4. Écris la réponse en fraction simplifiée.', en: 'Calculate 3/4 − 1/4. Write the answer as a simplified fraction.' },
        formula: '3/4 − 1/4 = ?',
        answer: ['1/2', '2/4'],
        hint: {
          fr: 'Même dénominateur : soustrais les numérateurs, puis simplifie',
          en: 'Same denominator: subtract the numerators, then simplify'
        },
        explain: {
          fr: '3/4 − 1/4 = 2/4 = 1/2. On soustrait les numérateurs et on simplifie.',
          en: '3/4 − 1/4 = 2/4 = 1/2. Subtract the numerators, then simplify.'
        }
      },
      {
        id: 'f05', topic: 'fractions', type: 'mc',
        q: { fr: 'Calcule : 2/3 × 3/4', en: 'Calculate: 2/3 × 3/4' },
        formula: '2/3 × 3/4',
        opts: {
          fr: ['5/7', '1/2', '6/7', '5/12'],
          en: ['5/7', '1/2', '6/7', '5/12']
        },
        correct: 1,
        hint: {
          fr: 'Multiplie numérateur × numérateur, puis dénominateur × dénominateur',
          en: 'Multiply numerator × numerator, then denominator × denominator'
        },
        explain: {
          fr: '(2 × 3) / (3 × 4) = 6/12 = 1/2. On simplifie en divisant par 6.',
          en: '(2 × 3) / (3 × 4) = 6/12 = 1/2. Simplify by dividing by 6.'
        }
      },
      {
        id: 'f06', topic: 'fractions', type: 'mc',
        q: { fr: 'Quel nombre est entre 1/3 et 1/2 ?', en: 'Which number is between 1/3 and 1/2?' },
        formula: '1/3 < ? < 1/2',
        opts: {
          fr: ['1/4', '2/5', '3/5', '1/6'],
          en: ['1/4', '2/5', '3/5', '1/6']
        },
        correct: 1,
        hint: {
          fr: 'Convertis en décimaux : 1/3 ≈ 0.33 et 1/2 = 0.5',
          en: 'Convert to decimals: 1/3 ≈ 0.33 and 1/2 = 0.5'
        },
        explain: {
          fr: '2/5 = 0.4, et 0.33 < 0.4 < 0.5. C\'est 2/5 qui se trouve entre les deux.',
          en: '2/5 = 0.4, and 0.33 < 0.4 < 0.5. So 2/5 is between them.'
        }
      },
      {
        id: 'f07', topic: 'fractions', type: 'fill',
        q: { fr: 'Quelle fraction correspond à 0.75 ?', en: 'Which fraction equals 0.75?' },
        formula: '0.75 = ?',
        answer: ['3/4', '75/100'],
        hint: {
          fr: '0.75 = 75/100. Maintenant simplifie en divisant par 25.',
          en: '0.75 = 75/100. Now simplify by dividing by 25.'
        },
        explain: {
          fr: '0.75 = 75/100. On divise par 25 : 75 ÷ 25 = 3 et 100 ÷ 25 = 4. Donc 3/4.',
          en: '0.75 = 75/100. Divide by 25: 75 ÷ 25 = 3 and 100 ÷ 25 = 4. So 3/4.'
        }
      },

      // ── INTEGERS ─────────────────────────
      {
        id: 'i01', topic: 'integers', type: 'mc',
        q: { fr: 'Calcule : −3 + 7', en: 'Calculate: −3 + 7' },
        formula: '−3 + 7 = ?',
        opts: { fr: ['−10', '4', '−4', '10'], en: ['−10', '4', '−4', '10'] },
        correct: 1,
        hint: {
          fr: 'Sur la droite numérique, pars de −3 et avance de 7 vers la droite',
          en: 'On the number line, start at −3 and move 7 steps to the right'
        },
        explain: {
          fr: 'On part de −3 et on ajoute 7 : −3, −2, −1, 0, 1, 2, 3, 4. On arrive à 4.',
          en: 'Start at −3 and count 7 forward: −3, −2, −1, 0, 1, 2, 3, 4. You arrive at 4.'
        }
      },
      {
        id: 'i02', topic: 'integers', type: 'mc',
        q: { fr: 'Calcule : (−2) × (−5)', en: 'Calculate: (−2) × (−5)' },
        formula: '(−2) × (−5) = ?',
        opts: { fr: ['−10', '7', '10', '−7'], en: ['−10', '7', '10', '−7'] },
        correct: 2,
        hint: {
          fr: 'Règle des signes : négatif × négatif = positif',
          en: 'Sign rule: negative × negative = positive'
        },
        explain: {
          fr: '2 × 5 = 10. Deux négatifs se multiplient pour donner un positif. Résultat : +10.',
          en: '2 × 5 = 10. Two negatives multiplied give a positive. Result: +10.'
        }
      },
      {
        id: 'i03', topic: 'integers', type: 'fill',
        q: { fr: 'Calcule : −8 − (−3)', en: 'Calculate: −8 − (−3)' },
        formula: '−8 − (−3) = ?',
        answer: ['-5', '−5'],
        hint: {
          fr: 'Soustraire un négatif = additionner : −8 − (−3) = −8 + 3',
          en: 'Subtracting a negative = adding: −8 − (−3) = −8 + 3'
        },
        explain: {
          fr: '−8 − (−3) = −8 + 3 = −5. Soustraire un nombre négatif revient à l\'additionner.',
          en: '−8 − (−3) = −8 + 3 = −5. Subtracting a negative is the same as adding.'
        }
      },
      {
        id: 'i04', topic: 'integers', type: 'mc',
        q: { fr: 'Quel est le résultat de (−4)² ?', en: 'What is the result of (−4)²?' },
        formula: '(−4)² = ?',
        opts: { fr: ['−8', '−16', '16', '8'], en: ['−8', '−16', '16', '8'] },
        correct: 2,
        hint: {
          fr: '(−4)² = (−4) × (−4). Négatif × négatif = ?',
          en: '(−4)² = (−4) × (−4). Negative × negative = ?'
        },
        explain: {
          fr: '(−4) × (−4) = +16 car négatif × négatif = positif.',
          en: '(−4) × (−4) = +16 because negative × negative = positive.'
        }
      },
      {
        id: 'i05', topic: 'integers', type: 'mc',
        q: { fr: 'À quelle température est-il plus froid : −12 °C ou −5 °C ?', en: 'Which temperature is colder: −12 °C or −5 °C?' },
        formula: '−12 °C  vs  −5 °C',
        opts: {
          fr: ['−5 °C', '−12 °C', 'C\'est pareil', 'Impossible à savoir'],
          en: ['−5 °C', '−12 °C', 'They\'re the same', 'Impossible to know']
        },
        correct: 1,
        hint: {
          fr: 'Sur la droite numérique, les nombres à gauche sont plus petits (plus froids)',
          en: 'On the number line, numbers to the left are smaller (colder)'
        },
        explain: {
          fr: '−12 < −5, donc −12 °C est plus froid. Plus un nombre négatif est grand en valeur absolue, plus il est froid.',
          en: '−12 < −5, so −12 °C is colder. The larger the absolute value of a negative number, the colder it is.'
        }
      },

      // ── ORDER OF OPERATIONS ───────────────
      {
        id: 'o01', topic: 'orderOfOps', type: 'mc',
        q: { fr: 'Calcule en respectant l\'ordre des opérations :', en: 'Calculate following the order of operations:' },
        formula: '2 + 3 × 4',
        opts: { fr: ['20', '14', '24', '11'], en: ['20', '14', '24', '11'] },
        correct: 1,
        hint: {
          fr: 'La multiplication se fait AVANT l\'addition !',
          en: 'Multiplication comes BEFORE addition!'
        },
        explain: {
          fr: '3 × 4 = 12 en premier, puis 2 + 12 = 14. La multiplication passe avant l\'addition.',
          en: '3 × 4 = 12 first, then 2 + 12 = 14. Multiplication comes before addition.'
        }
      },
      {
        id: 'o02', topic: 'orderOfOps', type: 'fill',
        q: { fr: 'Calcule en respectant PEMDAS :', en: 'Calculate following BEDMAS:' },
        formula: '(3 + 2)² − 4',
        answer: ['21'],
        hint: {
          fr: 'Commence par les parenthèses (3+2), puis l\'exposant, puis la soustraction',
          en: 'Start with the brackets (3+2), then the exponent, then the subtraction'
        },
        explain: {
          fr: '(3+2) = 5, puis 5² = 25, puis 25 − 4 = 21.',
          en: '(3+2) = 5, then 5² = 25, then 25 − 4 = 21.'
        }
      },
      {
        id: 'o03', topic: 'orderOfOps', type: 'mc',
        q: { fr: 'Quel est le résultat ?', en: 'What is the result?' },
        formula: '12 ÷ 4 + 2 × 3',
        opts: { fr: ['7', '9', '27', '3'], en: ['7', '9', '27', '3'] },
        correct: 1,
        hint: {
          fr: 'D\'abord les × et ÷ (de gauche à droite), ensuite les + et −',
          en: 'First × and ÷ (left to right), then + and −'
        },
        explain: {
          fr: '12÷4 = 3 et 2×3 = 6, puis 3 + 6 = 9.',
          en: '12÷4 = 3 and 2×3 = 6, then 3 + 6 = 9.'
        }
      },
      {
        id: 'o04', topic: 'orderOfOps', type: 'mc',
        q: { fr: 'Calcule :', en: 'Calculate:' },
        formula: '3 × (2 + 4)² ÷ 9',
        opts: { fr: ['4', '8', '12', '36'], en: ['4', '8', '12', '36'] },
        correct: 2,
        hint: {
          fr: 'Étapes : parenthèses → exposant → multiplication → division',
          en: 'Steps: brackets → exponent → multiplication → division'
        },
        explain: {
          fr: '(2+4) = 6, puis 6² = 36, puis 3×36 = 108, puis 108÷9 = 12.',
          en: '(2+4) = 6, then 6² = 36, then 3×36 = 108, then 108÷9 = 12.'
        }
      },

      // ── ALGEBRA INTRO ─────────────────────
      {
        id: 'a01', topic: 'algebraIntro', type: 'fill',
        q: { fr: 'Résous l\'équation :', en: 'Solve the equation:' },
        formula: '2x = 10',
        answer: ['5', 'x=5', 'x = 5'],
        hint: {
          fr: 'Divise les deux membres par 2',
          en: 'Divide both sides by 2'
        },
        explain: {
          fr: '2x = 10. On divise les deux membres par 2 : x = 10 ÷ 2 = 5.',
          en: '2x = 10. Divide both sides by 2: x = 10 ÷ 2 = 5.'
        }
      },
      {
        id: 'a02', topic: 'algebraIntro', type: 'mc',
        q: { fr: 'Quelle est la valeur de x ?', en: 'What is the value of x?' },
        formula: 'x + 7 = 15',
        opts: { fr: ['6', '7', '8', '22'], en: ['6', '7', '8', '22'] },
        correct: 2,
        hint: {
          fr: 'Soustrait 7 des deux côtés de l\'équation',
          en: 'Subtract 7 from both sides of the equation'
        },
        explain: {
          fr: 'x + 7 = 15. On soustrait 7 des deux membres : x = 15 − 7 = 8.',
          en: 'x + 7 = 15. Subtract 7 from both sides: x = 15 − 7 = 8.'
        }
      },
      {
        id: 'a03', topic: 'algebraIntro', type: 'fill',
        q: { fr: 'Résous l\'équation :', en: 'Solve the equation:' },
        formula: '3x − 4 = 11',
        answer: ['5', 'x=5', 'x = 5'],
        hint: {
          fr: 'Étape 1 : ajoute 4 des deux côtés. Étape 2 : divise par 3.',
          en: 'Step 1: add 4 to both sides. Step 2: divide by 3.'
        },
        explain: {
          fr: '3x − 4 = 11. On ajoute 4 : 3x = 15. On divise par 3 : x = 5.',
          en: '3x − 4 = 11. Add 4: 3x = 15. Divide by 3: x = 5.'
        }
      },
      {
        id: 'a04', topic: 'algebraIntro', type: 'mc',
        q: { fr: 'Quelle expression représente "le double d\'un nombre, moins 3" ?', en: 'Which expression represents "twice a number, minus 3"?' },
        formula: '"le double d\'un nombre, moins 3"',
        opts: { fr: ['3 − 2n', '2n − 3', '2(n − 3)', 'n/2 − 3'], en: ['"3 − 2n"', '"2n − 3"', '"2(n − 3)"', '"n/2 − 3"'] },
        correct: 1,
        hint: {
          fr: '"Le double" = ×2. "Moins 3" = −3. Dans quel ordre ?',
          en: '"Twice" = ×2. "Minus 3" = −3. In what order?'
        },
        explain: {
          fr: 'Double d\'un nombre n = 2n. Moins 3 = 2n − 3.',
          en: 'Twice a number n = 2n. Minus 3 = 2n − 3.'
        }
      },
      {
        id: 'a05', topic: 'algebraIntro', type: 'mc',
        q: { fr: 'Résous :', en: 'Solve:' },
        formula: '4x + 2 = 2x + 10',
        opts: { fr: ['x = 2', 'x = 3', 'x = 4', 'x = 6'], en: ['x = 2', 'x = 3', 'x = 4', 'x = 6'] },
        correct: 2,
        hint: {
          fr: 'Regroupe les x d\'un côté : 4x − 2x = 10 − 2',
          en: 'Group the x\'s on one side: 4x − 2x = 10 − 2'
        },
        explain: {
          fr: '4x + 2 = 2x + 10. On soustrait 2x des deux côtés : 2x + 2 = 10. On soustrait 2 : 2x = 8. On divise : x = 4.',
          en: '4x + 2 = 2x + 10. Subtract 2x: 2x + 2 = 10. Subtract 2: 2x = 8. Divide: x = 4.'
        }
      }
    ]
  },

  s2: {
    topics: ['proportionality', 'pythagoras', 'linearEquations', 'linearFunctions', 'pourcentages'],
    questions: [
      // ── PROPORTIONALITY ───────────────────
      {
        id: 'p01', topic: 'proportionality', type: 'mc',
        q: { fr: 'Si 3 pommes coûtent 1,50 $, combien coûtent 7 pommes ?', en: 'If 3 apples cost $1.50, how much do 7 apples cost?' },
        formula: '3 pommes → 1,50 $   7 pommes → ?',
        opts: { fr: ['2,50 $', '3,00 $', '3,50 $', '4,00 $'], en: ['$2.50', '$3.00', '$3.50', '$4.00'] },
        correct: 2,
        hint: {
          fr: 'Trouve le prix d\'une pomme : 1,50 ÷ 3',
          en: 'Find the price of one apple: 1.50 ÷ 3'
        },
        explain: {
          fr: '1 pomme = 1,50 ÷ 3 = 0,50 $. Donc 7 pommes = 7 × 0,50 = 3,50 $.',
          en: '1 apple = 1.50 ÷ 3 = $0.50. So 7 apples = 7 × 0.50 = $3.50.'
        }
      },
      {
        id: 'p02', topic: 'proportionality', type: 'fill',
        q: { fr: 'Résous la proportion :', en: 'Solve the proportion:' },
        formula: '3/4 = x/12',
        answer: ['9', 'x=9', 'x = 9'],
        hint: {
          fr: 'Produit croisé : 3 × 12 = 4 × x',
          en: 'Cross-multiply: 3 × 12 = 4 × x'
        },
        explain: {
          fr: '3 × 12 = 4 × x → 36 = 4x → x = 9.',
          en: '3 × 12 = 4 × x → 36 = 4x → x = 9.'
        }
      },
      {
        id: 'p03', topic: 'proportionality', type: 'mc',
        q: { fr: 'Une voiture roule à 90 km/h. Quelle distance parcourt-elle en 2,5 heures ?', en: 'A car travels at 90 km/h. What distance does it cover in 2.5 hours?' },
        formula: 'd = v × t = 90 × 2.5',
        opts: { fr: ['180 km', '200 km', '225 km', '250 km'], en: ['180 km', '200 km', '225 km', '250 km'] },
        correct: 2,
        hint: {
          fr: 'Distance = vitesse × temps',
          en: 'Distance = speed × time'
        },
        explain: {
          fr: 'd = 90 × 2,5 = 225 km.',
          en: 'd = 90 × 2.5 = 225 km.'
        }
      },
      {
        id: 'p04', topic: 'proportionality', type: 'mc',
        q: { fr: 'Un article coûte 80 $. Il est en rabais de 25 %. Quel est le prix final ?', en: 'An item costs $80. It\'s on sale for 25% off. What is the final price?' },
        formula: '80 $ − 25%',
        opts: { fr: ['55 $', '60 $', '65 $', '70 $'], en: ['$55', '$60', '$65', '$70'] },
        correct: 1,
        hint: {
          fr: '25% de 80 = 80 × 0,25 = 20. Soustrais ce montant.',
          en: '25% of 80 = 80 × 0.25 = 20. Subtract that amount.'
        },
        explain: {
          fr: '25% de 80 = 20. Prix final = 80 − 20 = 60 $.',
          en: '25% of 80 = 20. Final price = 80 − 20 = $60.'
        }
      },
      {
        id: 'p05', topic: 'proportionality', type: 'fill',
        q: { fr: 'Sur une carte, 1 cm représente 50 km. Si deux villes sont à 3,5 cm sur la carte, quelle est la vraie distance ?', en: 'On a map, 1 cm represents 50 km. If two cities are 3.5 cm apart on the map, what is the real distance?' },
        formula: '1 cm : 50 km  →  3,5 cm : ? km',
        answer: ['175', '175 km'],
        hint: {
          fr: 'Multiplie 3,5 par 50',
          en: 'Multiply 3.5 by 50'
        },
        explain: {
          fr: '3,5 × 50 = 175 km.',
          en: '3.5 × 50 = 175 km.'
        }
      },

      // ── PYTHAGOREAN THEOREM ───────────────
      {
        id: 'py01', topic: 'pythagoras', type: 'fill',
        q: { fr: 'Dans un triangle rectangle avec a = 3 et b = 4, quelle est la valeur de c (hypoténuse) ?', en: 'In a right triangle with a = 3 and b = 4, what is the value of c (hypotenuse)?' },
        formula: 'a² + b² = c²   →   3² + 4² = c²',
        answer: ['5', 'c=5', 'c = 5'],
        hint: {
          fr: '9 + 16 = 25. Quelle est la racine carrée de 25 ?',
          en: '9 + 16 = 25. What is the square root of 25?'
        },
        explain: {
          fr: '3² + 4² = 9 + 16 = 25. √25 = 5. Donc c = 5.',
          en: '3² + 4² = 9 + 16 = 25. √25 = 5. So c = 5.'
        }
      },
      {
        id: 'py02', topic: 'pythagoras', type: 'mc',
        q: { fr: 'Dans un triangle rectangle, a = 5 et c = 13 (hypoténuse). Quelle est la valeur de b ?', en: 'In a right triangle, a = 5 and c = 13 (hypotenuse). What is the value of b?' },
        formula: 'a² + b² = c²   →   5² + b² = 13²',
        opts: { fr: ['8', '10', '12', '11'], en: ['8', '10', '12', '11'] },
        correct: 2,
        hint: {
          fr: 'b² = c² − a² = 169 − 25 = 144',
          en: 'b² = c² − a² = 169 − 25 = 144'
        },
        explain: {
          fr: 'b² = 13² − 5² = 169 − 25 = 144. b = √144 = 12.',
          en: 'b² = 13² − 5² = 169 − 25 = 144. b = √144 = 12.'
        }
      },
      {
        id: 'py03', topic: 'pythagoras', type: 'mc',
        q: { fr: 'Un triangle avec les côtés 6, 8, 10 est-il rectangle ?', en: 'Is a triangle with sides 6, 8, 10 a right triangle?' },
        formula: '6² + 8² ?= 10²',
        opts: {
          fr: ['Oui, car 6² + 8² = 10²', 'Non, les calculs ne concordent pas', 'Impossible à dire', 'Seulement si angle = 90°'],
          en: ['Yes, because 6² + 8² = 10²', 'No, the calculations don\'t match', 'Impossible to say', 'Only if angle = 90°']
        },
        correct: 0,
        hint: {
          fr: 'Vérifie : 36 + 64 = ?',
          en: 'Check: 36 + 64 = ?'
        },
        explain: {
          fr: '6² + 8² = 36 + 64 = 100 = 10². Oui, c\'est un triangle rectangle !',
          en: '6² + 8² = 36 + 64 = 100 = 10². Yes, it\'s a right triangle!'
        }
      },
      {
        id: 'py04', topic: 'pythagoras', type: 'fill',
        q: { fr: 'Une échelle de 10 m est appuyée contre un mur. Sa base est à 6 m du mur. À quelle hauteur l\'échelle touche-t-elle le mur ?', en: 'A 10 m ladder leans against a wall. Its base is 6 m from the wall. How high up the wall does the ladder reach?' },
        formula: '6² + h² = 10²',
        answer: ['8', '8 m'],
        hint: {
          fr: 'h² = 10² − 6² = 100 − 36 = 64',
          en: 'h² = 10² − 6² = 100 − 36 = 64'
        },
        explain: {
          fr: 'h² = 100 − 36 = 64. h = √64 = 8 m.',
          en: 'h² = 100 − 36 = 64. h = √64 = 8 m.'
        }
      },

      // ── LINEAR EQUATIONS ─────────────────
      {
        id: 'le01', topic: 'linearEquations', type: 'fill',
        q: { fr: 'Résous l\'équation :', en: 'Solve the equation:' },
        formula: '2x + 3 = 11',
        answer: ['4', 'x=4', 'x = 4'],
        hint: {
          fr: 'Soustrait 3 des deux côtés, puis divise par 2',
          en: 'Subtract 3 from both sides, then divide by 2'
        },
        explain: {
          fr: '2x + 3 = 11. Soustrait 3 : 2x = 8. Divise par 2 : x = 4.',
          en: '2x + 3 = 11. Subtract 3: 2x = 8. Divide by 2: x = 4.'
        }
      },
      {
        id: 'le02', topic: 'linearEquations', type: 'mc',
        q: { fr: 'Quelle est la solution ?', en: 'What is the solution?' },
        formula: '5x − 7 = 3x + 9',
        opts: { fr: ['x = 6', 'x = 7', 'x = 8', 'x = 5'], en: ['x = 6', 'x = 7', 'x = 8', 'x = 5'] },
        correct: 2,
        hint: {
          fr: 'Regroupe les x d\'un côté : 5x − 3x = 9 + 7',
          en: 'Group the x\'s: 5x − 3x = 9 + 7'
        },
        explain: {
          fr: '5x − 3x = 9 + 7 → 2x = 16 → x = 8.',
          en: '5x − 3x = 9 + 7 → 2x = 16 → x = 8.'
        }
      },
      {
        id: 'le03', topic: 'linearEquations', type: 'fill',
        q: { fr: 'Résous :', en: 'Solve:' },
        formula: '3(x − 2) = 9',
        answer: ['5', 'x=5', 'x = 5'],
        hint: {
          fr: 'Distribue : 3x − 6 = 9, puis résous',
          en: 'Distribute: 3x − 6 = 9, then solve'
        },
        explain: {
          fr: '3x − 6 = 9. Ajoute 6 : 3x = 15. Divise par 3 : x = 5.',
          en: '3x − 6 = 9. Add 6: 3x = 15. Divide by 3: x = 5.'
        }
      },
      {
        id: 'le04', topic: 'linearEquations', type: 'mc',
        q: { fr: 'Résous l\'équation :', en: 'Solve the equation:' },
        formula: '(x/2) + 4 = 10',
        opts: { fr: ['x = 7', 'x = 10', 'x = 12', 'x = 14'], en: ['x = 7', 'x = 10', 'x = 12', 'x = 14'] },
        correct: 2,
        hint: {
          fr: 'Soustrait 4 des deux côtés : x/2 = 6. Maintenant multiplie par 2.',
          en: 'Subtract 4 from both sides: x/2 = 6. Now multiply by 2.'
        },
        explain: {
          fr: 'x/2 + 4 = 10 → x/2 = 6 → x = 12.',
          en: 'x/2 + 4 = 10 → x/2 = 6 → x = 12.'
        }
      },

      // ── LINEAR FUNCTIONS ─────────────────
      {
        id: 'lf01', topic: 'linearFunctions', type: 'mc',
        q: { fr: 'Dans f(x) = 2x + 1, quelle est la valeur de f(3) ?', en: 'In f(x) = 2x + 1, what is the value of f(3)?' },
        formula: 'f(x) = 2x + 1,  f(3) = ?',
        opts: { fr: ['5', '6', '7', '8'], en: ['5', '6', '7', '8'] },
        correct: 2,
        hint: {
          fr: 'Remplace x par 3 dans la formule : f(3) = 2(3) + 1',
          en: 'Replace x with 3 in the formula: f(3) = 2(3) + 1'
        },
        explain: {
          fr: 'f(3) = 2(3) + 1 = 6 + 1 = 7.',
          en: 'f(3) = 2(3) + 1 = 6 + 1 = 7.'
        }
      },
      {
        id: 'lf02', topic: 'linearFunctions', type: 'mc',
        q: { fr: 'Quelle est la pente de la droite y = −3x + 5 ?', en: 'What is the slope of the line y = −3x + 5?' },
        formula: 'y = −3x + 5',
        opts: { fr: ['5', '−5', '3', '−3'], en: ['5', '−5', '3', '−3'] },
        correct: 3,
        hint: {
          fr: 'Dans y = mx + b, m est la pente',
          en: 'In y = mx + b, m is the slope'
        },
        explain: {
          fr: 'Dans y = mx + b, m = −3 est la pente. La droite descend de gauche à droite.',
          en: 'In y = mx + b, m = −3 is the slope. The line goes down from left to right.'
        }
      },
      {
        id: 'lf03', topic: 'linearFunctions', type: 'fill',
        q: { fr: 'Pour f(x) = 4x − 3, trouve x tel que f(x) = 9', en: 'For f(x) = 4x − 3, find x such that f(x) = 9' },
        formula: '4x − 3 = 9',
        answer: ['3', 'x=3', 'x = 3'],
        hint: {
          fr: 'Résous 4x − 3 = 9 : ajoute 3 des deux côtés, puis divise',
          en: 'Solve 4x − 3 = 9: add 3 to both sides, then divide'
        },
        explain: {
          fr: '4x − 3 = 9 → 4x = 12 → x = 3.',
          en: '4x − 3 = 9 → 4x = 12 → x = 3.'
        }
      },
      {
        id: 'lf04', topic: 'linearFunctions', type: 'mc',
        q: { fr: 'Quelle est l\'ordonnée à l\'origine de y = 2x − 7 ?', en: 'What is the y-intercept of y = 2x − 7?' },
        formula: 'y = 2x − 7',
        opts: { fr: ['2', '7', '−7', '−2'], en: ['2', '7', '−7', '−2'] },
        correct: 2,
        hint: {
          fr: 'L\'ordonnée à l\'origine est la valeur de y quand x = 0',
          en: 'The y-intercept is the value of y when x = 0'
        },
        explain: {
          fr: 'Quand x = 0 : y = 2(0) − 7 = −7. L\'ordonnée à l\'origine est −7 (c\'est le "b" dans y = mx + b).',
          en: 'When x = 0: y = 2(0) − 7 = −7. The y-intercept is −7 (it\'s the "b" in y = mx + b).'
        }
      },

      // ── POURCENTAGES ──────────────────────
      {
        id: 'pc01', topic: 'pourcentages', type: 'mc',
        q: { fr: 'Quel pourcentage représente 15 par rapport à 60 ?', en: 'What percentage is 15 out of 60?' },
        formula: '15 / 60 = ?%',
        opts: { fr: ['20%', '25%', '30%', '15%'], en: ['20%', '25%', '30%', '15%'] },
        correct: 1,
        hint: {
          fr: 'Divise la partie par le tout, puis multiplie par 100 : 15 ÷ 60 × 100',
          en: 'Divide the part by the whole, then multiply by 100: 15 ÷ 60 × 100'
        },
        explain: {
          fr: '15 ÷ 60 = 0,25. Puis 0,25 × 100 = 25%.',
          en: '15 ÷ 60 = 0.25. Then 0.25 × 100 = 25%.'
        }
      },
      {
        id: 'pc02', topic: 'pourcentages', type: 'fill',
        q: { fr: 'Calcule 30% de 90.', en: 'Calculate 30% of 90.' },
        formula: '30% × 90 = ?',
        answer: ['27'],
        hint: {
          fr: 'Multiplie 90 par 30, puis divise par 100',
          en: 'Multiply 90 by 30, then divide by 100'
        },
        explain: {
          fr: '90 × 30 ÷ 100 = 2700 ÷ 100 = 27.',
          en: '90 × 30 ÷ 100 = 2700 ÷ 100 = 27.'
        }
      },
      {
        id: 'pc03', topic: 'pourcentages', type: 'mc',
        q: { fr: '18 représente 25% de quel nombre ?', en: '18 represents 25% of what number?' },
        formula: '18 = 25% × ?',
        opts: { fr: ['54', '72', '63', '45'], en: ['54', '72', '63', '45'] },
        correct: 1,
        hint: {
          fr: 'Divise la partie par le pourcentage (en décimal) : 18 ÷ 0,25',
          en: 'Divide the part by the percentage (as a decimal): 18 ÷ 0.25'
        },
        explain: {
          fr: '18 ÷ (25 ÷ 100) = 18 ÷ 0,25 = 72.',
          en: '18 ÷ (25 ÷ 100) = 18 ÷ 0.25 = 72.'
        }
      },
      {
        id: 'pc04', topic: 'pourcentages', type: 'fill',
        q: { fr: 'Un élève a 36 bonnes réponses sur 40. Quel est son pourcentage de réussite ?', en: 'A student got 36 correct answers out of 40. What is their success percentage?' },
        formula: '36 / 40 = ?%',
        answer: ['90', '90%'],
        hint: {
          fr: '36 ÷ 40 × 100 = ?',
          en: '36 ÷ 40 × 100 = ?'
        },
        explain: {
          fr: '36 ÷ 40 = 0,9. Puis 0,9 × 100 = 90%.',
          en: '36 ÷ 40 = 0.9. Then 0.9 × 100 = 90%.'
        }
      },
      {
        id: 'pc05', topic: 'pourcentages', type: 'mc',
        q: { fr: 'Un chandail coûte 40 $. Il est en solde à 15% de rabais. Quel est le prix final ?', en: 'A sweater costs $40. It is on sale at 15% off. What is the final price?' },
        formula: '40 $ − 15%',
        opts: { fr: ['34 $', '36 $', '38 $', '32 $'], en: ['$34', '$36', '$38', '$32'] },
        correct: 0,
        hint: {
          fr: '15% de 40 = 6. Soustrais ce montant du prix original.',
          en: '15% of 40 = 6. Subtract that amount from the original price.'
        },
        explain: {
          fr: '40 × 15 ÷ 100 = 6. Prix final : 40 − 6 = 34 $.',
          en: '40 × 15 ÷ 100 = 6. Final price: 40 − 6 = $34.'
        }
      }
    ]
  },

  s3: { comingSoon: true },
  s4: { comingSoon: true },
  s5: { comingSoon: true }
};
