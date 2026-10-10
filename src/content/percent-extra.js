// Extra Percent lessons: the trickier percentage ideas that show up in finance.

export const PCT_EXTRA_LEVELS = [
 { name:'Points, basis points and going backwards', ideas:[
  { title:'Percent vs percentage points',
    body:['When a rate itself changes, there are two ways to describe it. If an FD rate goes from **6% to 7%**, it rose by **1 percentage point**, but by about **16.7 percent**, because 1 is a sixth of 6.',
          'News and apps mix these up all the time. "Points" means simple subtraction of the two rates.'],
    ex:[['FD rate 6% → 7%','+1 percentage point'],['As a % of the old rate','1 ÷ 6 ≈ 16.7%'],['Expense ratio 1% → 0.5%','−0.5 points, a 50% cut']],
    qs:[
     {t:'num', q:'A fund\'s expense ratio drops from 1.2% to 0.9%. By how many percentage points did it fall?', a:0.3, tol:0.001, suffix:'points', why:'1.2 − 0.9 = 0.3 points.', work:['Points = simple subtraction','1.2 − 0.9 = 0.3']},
     {t:'num', q:'An expense ratio drops from 1% to 0.5%. By what percent was the fee cut?', a:50, tol:0, suffix:'%', why:'0.5 is half of 1, so a 50% cut.', work:['Drop = 1 − 0.5 = 0.5','0.5 out of 1 = half','Half = 50%']}
    ]},
  { title:'Basis points',
    body:['A **basis point (bp)** is one-hundredth of a percentage point: **100 bps = 1%**. Bankers use it for small rate moves.',
          'When RBI "cuts the repo rate by 25 bps", it cuts it by **0.25 points**, say from 6.50% to 6.25%.'],
    ex:[['25 bps','0.25%'],['50 bps','0.50%'],['100 bps','1%']],
    qs:[
     {t:'num', q:'RBI raises the repo rate by 50 basis points from 6.00%. What is the new rate?', a:6.5, tol:0.001, suffix:'%', why:'50 bps = 0.5 points. 6.00 + 0.5 = 6.50%.', work:['100 bps = 1%, so 50 bps = 0.5%','6.00 + 0.50 = 6.50%']}
    ]},
  { title:'Going backwards from a % rise',
    body:['Your holding is ₹600 after rising 20%. What was it before? **Not** ₹600 − 20% of ₹600. The 20% was worked out on the **old**, smaller amount.',
          'Think of it this way: ₹600 is **120%** of the old amount. So 1% of the old amount is ₹600 ÷ 120 = ₹5, and 100% is ₹500.'],
    ex:[['Now (after +20%)','₹600'],['₹600 is 120% of the original',''],['1% = 600 ÷ 120','₹5'],['Original = 100 × ₹5','₹500']],
    qs:[
     {t:'num', q:'After a 25% rise, your fund is worth ₹1,000. What was it worth before?', a:800, tol:0, prefix:'₹', why:'₹1,000 is 125% of the original. 1% = ₹8, so 100% = ₹800.', work:['₹1,000 is 125% of the original','1% = 1,000 ÷ 125 = ₹8','Original = 100 × ₹8 = ₹800']},
     {t:'tf', q:'If something rose 20% to ₹600, it was ₹480 before (₹600 minus 20% of ₹600).', a:false, why:'It was ₹500. The 20% was of the old amount.'}
    ]}
 ]},
 { name:'% of a % and fee drag', ideas:[
  { title:'Taking a % of a %',
    body:['Sometimes you need a percentage of something that\'s already a percentage. Example: your fund gained **10%** this year, and tax takes **20%** of that gain.',
          'Tax is 20% of 10% = **2%** of your money. So you keep 8%. Multiply the two as decimals: 0.2 × 10% = 2%.'],
    ex:[['Gain','10% of ₹1,00,000 = ₹10,000'],['Tax at 20% of the gain','₹2,000'],['As a % of your money','2%'],['You keep','8%']],
    qs:[
     {t:'num', q:'Your fund gained 15%. Tax takes 20% of the gain. What % of your money goes to tax?', a:3, tol:0, suffix:'%', why:'20% of 15% = 3%.', work:['20% is a fifth','A fifth of 15% = 3%']}
    ]},
  { title:'Small fees, big gaps',
    body:['A fee difference that looks tiny compounds every year. Say a fund earns **12%** before fees.',
          'With a 0.2% fee you keep 11.8% a year; with a 1% fee you keep 11%. On ₹10 lakh left for 20 years, that\'s roughly **₹93 lakh vs ₹81 lakh**: a gap of about ₹12 lakh from 0.8 points.'],
    ex:[['₹10 lakh, 20 years, 11.8% a year','≈ ₹93 lakh'],['₹10 lakh, 20 years, 11% a year','≈ ₹81 lakh'],['Gap','≈ ₹12 lakh']],
    qs:[
     {t:'mcq', q:'Why does a 0.8-point fee difference matter so much over 20 years?', opts:['It is lost every year, and the lost money would have compounded too','The fee is charged only once','It doesn\'t matter','Fees grow by 0.8% each year'], a:0, why:'The gap compounds like returns do.'}
    ]}
 ]},
 { name:'Inflation and mixed returns', ideas:[
  { title:'Real return',
    body:['**Real return ≈ return − inflation**. It\'s how much more you can actually buy.',
          'If your savings earn 7% and prices rise 6%, you\'re only about **1%** better off.'],
    ex:[['Return','7%'],['Inflation','6%'],['Real return','≈ 1%']],
    qs:[
     {t:'num', q:'Your fund returns 11% and inflation is 5%. Roughly what is the real return?', a:6, tol:0, suffix:'%', why:'11 − 5 = 6.', work:['Real return ≈ return − inflation','11 − 5 = 6%']}
    ]},
  { title:'Portfolio return: a weighted average',
    body:['When your money is split, your overall return is a **weighted average**: each part\'s return × its share, added up.',
          '60% in equity earning 12%, 40% in debt earning 7%: 0.6 × 12 = 7.2, 0.4 × 7 = 2.8, total **10%**.'],
    ex:[['Equity: 60% × 12%','7.2%'],['Debt: 40% × 7%','2.8%'],['Portfolio','10%']],
    qs:[
     {t:'num', q:'50% in equity earning 14%, 50% in debt earning 6%. What is the portfolio return?', a:10, tol:0, suffix:'%', why:'Half of 14 is 7, half of 6 is 3. Total 10%.', work:['50% × 14% = 7%','50% × 6% = 3%','7 + 3 = 10%']},
     {t:'num', q:'80% in equity earning 10%, 20% in gold earning 5%. What is the portfolio return?', a:9, tol:0, suffix:'%', why:'8% + 1% = 9%.', work:['80% × 10% = 8%','20% × 5% = 1%','8 + 1 = 9%']}
    ]},
  { title:'Total return vs yearly return',
    body:['"50% in 5 years" is **not** 10% a year. Because of compounding, it\'s about **8.4%** a year.',
          'To compare fairly, always convert total returns to a yearly (annualised) figure, which is exactly what CAGR does.'],
    ex:[['8.4% a year for 5 years','≈ +50% total'],['10% a year for 5 years','≈ +61% total']],
    qs:[
     {t:'tf', q:'A total return of 50% over 5 years means 10% a year.', a:false, why:'Compounding means it\'s about 8.4% a year.'}
    ]}
 ]}
];
