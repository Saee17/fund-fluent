// Build your portfolio, unit 2.

export const PLAN_PRO = { id:'p2', title:'Planning like a pro', glyph:'⚖', levels:[
 { name:'Know your risk', ideas:[
  { title:'Risk capacity vs risk tolerance',
    body:['**Risk capacity** is how much loss your life can absorb: stable income, emergency fund, few dependants, goal far away. **Risk tolerance** is how much loss you can stomach without panicking.',
          'Your plan should respect the **lower** of the two. Someone with high capacity who panics in every fall should still take less risk.'],
    ex:[['Stable job, 25-year goal','High capacity'],['Sells everything when markets drop 10%','Low tolerance'],['Plan for','The lower one']],
    qs:[
     {t:'mcq', q:'Your capacity for risk is high but you panic in every market fall. How much risk should your plan take?', opts:['Less, matching your lower tolerance','The maximum, matching your capacity','None at all','Whatever a friend takes'], a:0, why:'A plan you abandon in a crash is worse than a calmer plan you stick with.'}
    ]},
  { title:'Asset allocation does most of the work',
    body:['How you split money between **equity, debt and gold** affects your results and your bumps far more than which exact fund you pick.',
          'A rough starting point some people use: **100 minus your age** in equity, then adjust for your goals and nerves. It\'s a rule of thumb, not a rule.'],
    ex:[['Age 30','≈ 70% equity, 30% debt and gold'],['Age 50','≈ 50% equity, 50% debt and gold']],
    qs:[
     {t:'num', q:'Using "100 minus age" as a starting point, what % in equity for a 35-year-old?', a:65, tol:0, suffix:'%', why:'100 − 35 = 65.', work:['100 − age','100 − 35 = 65']},
     {t:'mcq', q:'Which decision usually affects your results most?', opts:['How you split money across equity, debt and gold','Which exact large cap fund you pick','The SIP date','The app you use'], a:0, why:'Allocation drives most of the outcome.'}
    ]}
 ]},
 { name:'Inflation and real goals', ideas:[
  { title:'Inflation shrinks money quietly',
    body:['**Inflation** is prices rising over time. In India it has often run around **5–6%** a year.',
          'So a goal that costs ₹10 lakh today will cost more later. At 6% a year, it\'s about **₹18 lakh in 10 years**. Always plan goals in future rupees.'],
    ex:[['Costs today','₹10,00,000'],['6% inflation, 10 years','≈ ₹17,90,000'],['6% inflation, 20 years','≈ ₹32,07,000']],
    qs:[
     {t:'mcq', q:'A course costs ₹10 lakh today. With 6% inflation, roughly what will it cost in 10 years?', opts:['About ₹18 lakh','₹10 lakh','About ₹11 lakh','About ₹60 lakh'], a:0, why:'Prices compound too: 1.06 ten times ≈ 1.79.'}
    ]},
  { title:'Real return: what you actually gain',
    body:['**Real return** ≈ your return − inflation. It\'s what your money gains in buying power.',
          'An FD at 7% with 6% inflation earns about **1%** real, and less after tax. That\'s why long goals usually need some equity.'],
    ex:[['FD return','7%'],['Inflation','6%'],['Real return','≈ 1%'],['Equity fund over the long run (not guaranteed)','e.g. 12% → ≈ 6% real']],
    qs:[
     {t:'num', q:'Your investment returns 9% and inflation is 6%. Roughly what is the real return?', a:3, tol:0, suffix:'%', why:'9 − 6 = 3.', work:['Real return ≈ return − inflation','9 − 6 = 3%']}
    ]}
 ]},
 { name:'SIP, lumpsum and pauses', ideas:[
  { title:'SIP vs lumpsum',
    body:['If you already have a big amount and markets rise over the long run, investing it **all at once** usually ends up ahead, because more money is invested for longer.',
          'But a SIP or STP spreads the risk of a bad entry day and feels easier to stick with. For salary money, a SIP is the natural choice.'],
    ex:[['Monthly salary','SIP'],['₹10 lakh bonus, nervous','STP over 6–12 months'],['₹10 lakh, long horizon, calm','Lumpsum is fine']],
    qs:[
     {t:'mcq', q:'Money comes in every month from your salary. What fits best?', opts:['A SIP','Waiting for a crash','One lumpsum a year','Nothing until you have ₹10 lakh'], a:0, why:'A SIP matches how the money arrives.'}
    ]},
  { title:'Pause, don\'t stop',
    body:['Short on cash for a few months? Most platforms let you **pause** a SIP for 1–6 months instead of cancelling it.',
          'Pausing keeps the habit and the mandate alive. Cancelling often means you never restart.'],
    ex:['Job change, two tight months → pause for 2 months → SIP restarts on its own.'],
    qs:[
     {t:'tf', q:'If money is tight for a couple of months, pausing a SIP is usually better than cancelling it.', a:true, why:'It restarts automatically.'}
    ]}
 ]}
]};

export const PLAN_CARDS = [
 {lv:'p2-0',term:'Risk capacity',simple:'How much loss your life can absorb.',like:'How strong the bridge is.'},
 {lv:'p2-0',term:'Risk tolerance',simple:'How much loss you can stomach without panicking.',like:'How calm you stay while crossing the bridge.'},
 {lv:'p2-0',term:'Asset allocation',simple:'How you split money between equity, debt and gold.',like:'The recipe matters more than the brand of flour.'},
 {lv:'p2-1',term:'Inflation',simple:'Prices rising over time.',like:'A slow leak in a tyre.',ex:'₹10 lakh today ≈ ₹18 lakh in 10 years at 6%.'},
 {lv:'p2-1',term:'Real return',simple:'Return minus inflation.',like:'Running on a treadmill that\'s moving backwards.'},
 {lv:'p2-2',term:'SIP pause',simple:'Skipping SIPs for a few months without cancelling.',like:'Freezing a gym membership.'}
];
