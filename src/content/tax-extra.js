// Tax section, unit 2 and 3. Rules as of FY 2026-27 (Budget 2026 left capital-gains rates unchanged).

export const TAX_REAL = { id:'t2', title:'Tax in real life', glyph:'₹', levels:[
 { name:'Losses can save tax', ideas:[
  { title:'Losses cancel out gains',
    body:['If you sell something at a **loss**, that loss can reduce the gains you\'re taxed on. This is called **set-off**.',
          'A **short-term loss** can cancel both short-term and long-term gains. A **long-term loss** can cancel only long-term gains.'],
    ex:[['Short-term gain on Fund A','₹40,000'],['Short-term loss on Fund B','− ₹15,000'],['Taxable short-term gain','₹25,000']],
    qs:[
     {t:'num', q:'Short-term gain ₹60,000 on one fund, short-term loss ₹20,000 on another. What short-term gain is taxed?', a:40000, tol:0, prefix:'₹', why:'₹60,000 − ₹20,000 = ₹40,000.', work:['Losses cancel gains of the same year','₹60,000 − ₹20,000 = ₹40,000']},
     {t:'mcq', q:'A long-term loss can be set off against…', opts:['Long-term gains only','Short-term gains only','Both short and long-term gains','Your salary'], a:0, why:'Long-term losses only cancel long-term gains.'}
    ]},
  { title:'Carry losses forward',
    body:['If you have more loss than gain this year, the extra can be **carried forward for up to 8 years** and used against future gains.',
          'The catch: you must **file your income tax return on time** and report the loss. Miss the deadline and you lose the carry-forward.'],
    ex:[['This year: loss ₹50,000, gain ₹20,000','₹30,000 left over'],['Next year: gain ₹40,000','Taxed on only ₹10,000']],
    qs:[
     {t:'num', q:'Up to how many years can capital losses be carried forward?', a:8, tol:0, suffix:'years', why:'Eight years, if you file your return on time.', work:['The rule is 8 years','Only if the return is filed by the due date']},
     {t:'tf', q:'You can carry losses forward even if you file your tax return late.', a:false, why:'On-time filing is a condition.'}
    ]}
 ]},
 { name:'Withdrawals, switches and payouts', ideas:[
  { title:'SWP: only the gain part is taxed',
    body:['Each SWP withdrawal is a small sale. Part of it is your **original money** (not taxed) and part is **gain** (taxed).',
          'Early on, most of each withdrawal is your own money, so the tax is small. That\'s why SWPs are often more tax-efficient than IDCW payouts.'],
    ex:[['Monthly SWP','₹10,000'],['Units sold had gained 20%',''],['Original money in it','≈ ₹8,333'],['Taxable gain','≈ ₹1,667']],
    qs:[
     {t:'mcq', q:'In an SWP withdrawal, what is taxed?', opts:['Only the gain part of the units sold','The whole withdrawal','Nothing','Only the first withdrawal'], a:0, why:'Your own original money isn\'t taxed again.'}
    ]},
  { title:'STP and switches are sales',
    body:['Every STP transfer and every switch sells units from one fund. If those units had gained, that gain is taxed by the usual rules for the fund you sold.',
          'Money parked in a liquid fund for an STP is taxed at your slab on its small gains.'],
    ex:['STP ₹50,000 a month from a liquid fund → each transfer may create a small slab-rate gain.'],
    qs:[
     {t:'tf', q:'An STP transfer from a liquid fund to an equity fund can create a taxable gain.', a:true, why:'Each transfer sells liquid fund units.'}
    ]},
  { title:'IDCW payouts and TDS',
    body:['IDCW payouts are added to your income and taxed at your **slab rate**, even if you\'re in the 30% slab.',
          'The fund deducts **TDS of 10%** if your IDCW from one fund house exceeds **₹10,000** in a year. You adjust it when you file your return. Growth option avoids all of this.'],
    ex:[['IDCW received from one AMC','₹25,000'],['TDS deducted (10%)','₹2,500'],['Taxed at your slab when filing','Yes']],
    qs:[
     {t:'num', q:'You received ₹30,000 IDCW from one fund house this year. How much TDS was deducted?', a:3000, tol:0, prefix:'₹', why:'10% of ₹30,000 = ₹3,000.', work:['Above ₹10,000, so TDS applies','10% = knock off one zero','₹30,000 → ₹3,000']},
     {t:'mcq', q:'How is IDCW taxed?', opts:['At your income-tax slab rate','At 12.5%','At 20%','Tax-free'], a:0, why:'It\'s added to your income.'}
    ]}
 ]},
 { name:'Special cases', ideas:[
  { title:'Gold, international and other funds',
    body:['Funds that are neither equity-oriented nor debt-oriented, such as **international funds of funds** and **gold funds**, are taxed in between.',
          'Sold within **24 months**: slab rate. After 24 months: **12.5%**. **Gold and silver ETFs** listed on the exchange qualify for 12.5% after just **12 months**.'],
    ex:[['International FoF, held 30 months','12.5%'],['Gold fund (FoF), held 18 months','Slab rate'],['Gold ETF, held 14 months','12.5%']],
    qs:[
     {t:'mcq', q:'You sell an international fund of funds after 30 months. How is the gain taxed?', opts:['12.5%','Slab rate','20%','Tax-free'], a:0, why:'More than 24 months → 12.5%.'},
     {t:'mcq', q:'A gold ETF sold after 14 months is taxed at…', opts:['12.5%','Slab rate','20%','Nil'], a:0, why:'Listed gold ETFs turn long-term after 12 months.'}
    ]},
  { title:'Grandfathering: old equity gains',
    body:['Long-term equity gains became taxable from **1 April 2018**. Gains made before that were protected, or "grandfathered".',
          'For equity bought before **1 February 2018**, your cost is taken as the **higher** of what you actually paid and the price on **31 January 2018**.'],
    ex:[['Bought in 2015 at','₹100'],['Price on 31 Jan 2018','₹160'],['Sold in 2026 at','₹250'],['Taxable gain counted from ₹160','₹90 per unit']],
    qs:[
     {t:'num', q:'Bought at ₹200 in 2016, ₹300 on 31 Jan 2018, sold at ₹450 now. Taxable gain per unit?', a:150, tol:0, prefix:'₹', why:'Cost is the higher of ₹200 and ₹300, so ₹300. Gain = ₹450 − ₹300 = ₹150.', work:['Cost = higher of ₹200 and ₹300 = ₹300','Gain = ₹450 − ₹300','= ₹150']}
    ]},
  { title:'Gifts, family and NRIs',
    body:['Gifting fund units to a **relative** is tax-free for them. But income earned on money you give your **spouse** or **minor child** is added back to **your** income. That\'s called **clubbing**.',
          'For **NRIs**, the fund deducts tax (TDS) at the time of redemption, at the capital-gains rates.'],
    ex:[['Gift ₹5 lakh of units to your mother','No tax for her on receiving'],['Gift to your spouse, it earns ₹40,000','Taxed in your hands']],
    qs:[
     {t:'tf', q:'Gains on investments you gift to your spouse are taxed as your income.', a:true, why:'That\'s clubbing.'}
    ]}
 ]},
 { name:'Filing it right', ideas:[
  { title:'Your capital gains statement',
    body:['Each year, download a **capital gains statement** from CAMS, KFintech or your app. It lists every sale with its short-term and long-term gains.',
          'You copy these totals into your **income tax return**. Most people with capital gains file **ITR-2**. ITR-1 now allows small long-term equity gains of up to ₹1.25 lakh.'],
    ex:[['From CAMS / KFintech / app','Capital gains statement'],['It shows','STCG and LTCG per fund'],['You use it for','Filing your return']],
    qs:[
     {t:'mcq', q:'Where do you get the numbers to report mutual fund gains in your return?', opts:['A capital gains statement from CAMS, KFintech or your app','Your bank passbook','The fund\'s factsheet','Your salary slip'], a:0, why:'It lists every sale and its gain.'}
    ]},
  { title:'Old regime vs new regime',
    body:['The **new tax regime** is the default. It has lower slab rates and a rebate that makes regular income up to ₹12 lakh tax-free, but almost no deductions like 80C.',
          'Capital gains taxed at special rates (20% short-term, 12.5% long-term) **don\'t** get that rebate. And ELSS only saves tax under the **old** regime.'],
    ex:[['New regime','Default, lower rates, few deductions'],['Old regime','Higher rates, deductions like 80C'],['Equity gains at 12.5%','Same in both']],
    qs:[
     {t:'tf', q:'The ₹12 lakh rebate under the new regime also makes long-term equity gains tax-free.', a:false, why:'Special-rate gains don\'t get the rebate.'},
     {t:'mcq', q:'Which regime is the default now?', opts:['New regime','Old regime','Neither','Whichever pays less automatically'], a:0, why:'You must opt for the old regime if you want it.'}
    ]}
 ]}
]};

export const TAX_CARDS = [
 {lv:'t2-0',term:'Set-off',simple:'Using a loss to cancel out a gain.',like:'Returning one item to pay for another.'},
 {lv:'t2-0',term:'Carry forward',simple:'Saving unused losses for up to 8 years.',like:'Unused leave that rolls over, if you apply on time.'},
 {lv:'t2-1',term:'TDS on IDCW',simple:'10% deducted if IDCW from one AMC exceeds ₹10,000 a year.',like:'Tax taken at the source, adjusted when you file.'},
 {lv:'t2-2',term:'Grandfathering',simple:'Old equity gains before 31 Jan 2018 are protected.',like:'Old rules apply to old purchases.'},
 {lv:'t2-2',term:'Clubbing',simple:'Income on money gifted to your spouse or minor child counts as yours.',like:'Moving money between pockets of the same shirt.'},
 {lv:'t2-3',term:'Capital gains statement',simple:'A yearly list of every sale and its gain.',like:'A report card you copy into your tax return.'},
 {lv:'t2-3',term:'New tax regime',simple:'The default: lower rates, few deductions.',like:'A fixed-price menu with no coupons.'}
];
