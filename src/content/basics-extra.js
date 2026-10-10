// New Fund basics units. Same shape as the prototype content:
// unit → levels → ideas (taught first) → qs (asked only on what was taught).

export const MORE_TYPES = { id:'b5', title:'More fund types', glyph:'MIX', levels:[
 { name:'Debt funds up close', ideas:[
  { title:'Debt funds are sorted by how long they lend',
    body:['SEBI groups debt funds by **how long** the bonds inside them last, measured as **duration**. Short lending barely moves; long lending swings more when interest rates change.',
          'From shortest to longest: **overnight**, **liquid**, **ultra short**, **low duration**, **money market**, **short duration**, **medium**, **medium to long**, **long duration**. A **dynamic bond** fund can move anywhere in that range.'],
    ex:[['Overnight','1 day'],['Liquid','Up to 91 days'],['Ultra short','About 3–6 months'],['Short duration','About 1–3 years'],['Long duration','More than 7 years']],
    qs:[
     {t:'order', q:'Arrange these debt funds from shortest lending to longest', items:['Overnight','Liquid','Short duration','Long duration'], why:'Longer lending means bigger swings when rates move.'},
     {t:'mcq', q:'Which debt fund can change how long it lends, depending on the manager\'s view of rates?', opts:['Dynamic bond fund','Overnight fund','Liquid fund','Gilt fund'], a:0, why:'Dynamic bond funds move their duration up and down.'}
    ]},
  { title:'…and by who they lend to',
    body:['A **gilt** fund lends only to the government, so the borrower almost never fails to pay. A **corporate bond** fund lends to top-rated companies. A **banking & PSU** fund lends to banks and government-owned companies.',
          'A **credit risk** fund deliberately lends to lower-rated companies to earn more interest. Higher interest comes with a higher chance a borrower doesn\'t pay back.'],
    ex:[['Gilt','At least 80% government bonds'],['Corporate bond','At least 80% in AA+ and above'],['Banking & PSU','At least 80% banks and PSUs'],['Credit risk','At least 65% in lower-rated bonds']],
    qs:[
     {t:'match', q:'Match the debt fund to who it lends to', pairs:[['Gilt','The government'],['Corporate bond','Top-rated companies'],['Banking & PSU','Banks and public sector companies'],['Credit risk','Lower-rated companies']], why:'Who borrows decides how safe the interest is.'},
     {t:'tf', q:'A credit risk fund is safer than a gilt fund because it pays more interest.', a:false, why:'It pays more precisely because the borrowers are riskier.'}
    ]},
  { title:'Target maturity funds and the rate cycle',
    body:['A **target maturity fund** buys bonds that all end on one date, say April 2030, and holds them. If you also hold till then, your return is roughly the **YTM** you saw when you bought, a bit like an FD you can sell anytime.',
          'Rates move in cycles. When RBI is expected to **cut** rates, existing bonds paying higher interest become more valuable, so **long-duration** funds gain the most. When rates **rise**, they fall the most.'],
    ex:[['Target maturity fund YTM when you buy','7.2%'],['Hold till its end date','Roughly 7.2% a year, before costs'],['RBI cuts rates','Long-duration funds tend to rise most']],
    qs:[
     {t:'mcq', q:'Interest rates are expected to fall. Which fund is likely to gain the most?', opts:['Long duration fund','Overnight fund','Liquid fund','Arbitrage fund'], a:0, why:'Long bonds lock in the old, higher interest for longer, so their prices rise most.'},
     {t:'mcq', q:'What makes a target maturity fund feel like an FD?', opts:['It holds bonds till a fixed end date, so the return is fairly predictable if you stay till then','It is guaranteed by the government','It never changes in value','It pays fixed monthly interest'], a:0, why:'Predictable if held to maturity, but its value can still move before that.'}
    ]}
 ]},
 { name:'Beyond Indian shares', ideas:[
  { title:'Fund of funds and international funds',
    body:['A **fund of funds (FoF)** doesn\'t buy shares itself. It buys units of other funds. Many **international funds** in India work this way, investing in a US or global fund for you.',
          'With international funds you also ride the **rupee**. If the rupee weakens against the dollar, your US investment is worth more in rupees, even if US shares didn\'t move.'],
    ex:[['US shares rise','10%'],['Rupee weakens against dollar','3%'],['Your gain in rupees, roughly','About 13%']],
    app:'International funds sometimes pause new SIPs when the industry hits its overseas investment limit.',
    qs:[
     {t:'mcq', q:'What does a fund of funds invest in?', opts:['Units of other mutual funds','Only gold','Only government bonds','Shares picked one by one'], a:0, why:'It is a fund that holds other funds.'},
     {t:'tf', q:'If the rupee weakens against the dollar, an Indian investor\'s US fund gains in rupee terms.', a:true, why:'Each dollar is now worth more rupees.'}
    ]},
  { title:'Gold and silver funds',
    body:['**Gold ETFs** and **silver ETFs** hold the real metal in vaults and trade on the stock exchange. **Gold funds** are FoFs that invest in gold ETFs, so you can run a SIP without a trading account.',
          'Gold often holds up when shares fall or the rupee weakens, so investors keep a small slice, often **5–10%**, as a cushion. It pays no interest or dividend; it only grows if its price rises.'],
    ex:[['Gold ETF','Bought on the exchange'],['Gold fund (FoF)','Bought like any mutual fund, SIP allowed'],['Typical slice','5–10% of a portfolio']],
    qs:[
     {t:'mcq', q:'You want a monthly SIP in gold but have no trading account. What fits?', opts:['Gold fund (fund of funds)','Gold ETF','Silver ETF','Gilt fund'], a:0, why:'Gold FoFs are bought like normal mutual funds.'},
     {t:'tf', q:'Gold pays regular interest like a bond.', a:false, why:'Gold earns only through price changes.'}
    ]},
  { title:'Multi-asset funds',
    body:['A **multi-asset allocation** fund must hold at least three asset types, such as equity, debt and gold, with at least 10% in each.',
          'It\'s a one-fund way to spread money around. You give up control over the mix in exchange for simplicity.'],
    ex:[['Equity','e.g. 50%'],['Debt','e.g. 30%'],['Gold and silver','e.g. 20%']],
    qs:[
     {t:'mcq', q:'What must a multi-asset allocation fund hold?', opts:['At least three asset types, at least 10% in each','Only equity','Only gold and silver','Only foreign shares'], a:0, why:'Three or more assets, each at least 10%.'}
    ]}
 ]},
 { name:'How funds are built', ideas:[
  { title:'Open-ended, closed-ended and interval funds',
    body:['Most funds are **open-ended**: you can buy or sell any business day. A **closed-ended** fund takes money only during its launch (NFO) and returns it on a fixed end date. Its units are listed on the exchange if you need to exit early, often at a discount.',
          'An **interval fund** opens for buying and selling only during set windows, for example a few days every quarter. **Fixed maturity plans (FMPs)** are closed-ended debt funds that hold bonds till a set date.'],
    ex:[['Open-ended','Buy or sell any business day'],['Closed-ended','Money locked till the end date'],['Interval fund','Open only in set windows'],['FMP','Closed-ended debt, fixed end date']],
    qs:[
     {t:'match', q:'Match the fund structure to how you get your money out', pairs:[['Open-ended','Any business day'],['Closed-ended','At the end date, or sell on the exchange'],['Interval fund','Only during set windows'],['FMP','When its bonds mature']], why:'Structure decides how easily you can exit.'}
    ]},
  { title:'Style funds: value, contra, focused, dividend yield',
    body:['Some equity funds follow a **style**. **Value** funds buy companies that look cheap compared to what they\'re worth. **Contra** funds buy what\'s currently out of favour. **Focused** funds hold at most **30** stocks. **Dividend yield** funds favour companies that pay steady dividends.',
          'Since 2026, these must keep at least **80%** in equity, and a fund house may run both a value and a contra fund only if they overlap no more than 50%.'],
    ex:[['Value','Cheap compared to worth'],['Contra','Against the crowd'],['Focused','30 stocks or fewer'],['Dividend yield','Steady dividend payers']],
    qs:[
     {t:'mcq', q:'A focused fund can hold at most…', opts:['30 stocks','50 stocks','100 stocks','10 stocks'], a:0, why:'Fewer stocks, so each one matters more.'},
     {t:'mcq', q:'Which fund deliberately buys what most investors are avoiding right now?', opts:['Contra fund','Index fund','Liquid fund','Focused fund'], a:0, why:'Contra = contrarian.'}
    ]},
  { title:'SIFs and PMS: above mutual funds',
    body:['A **Specialised Investment Fund (SIF)** is a newer SEBI category, launched in 2025. It needs at least **₹10 lakh** and allows bolder strategies than a mutual fund, such as some short selling.',
          'A **Portfolio Management Service (PMS)** needs at least **₹50 lakh** and holds shares directly in your name. Both cost more and are meant for experienced investors, not beginners.'],
    ex:[['Mutual fund','From ₹100–₹500'],['SIF','From ₹10 lakh'],['PMS','From ₹50 lakh']],
    qs:[
     {t:'order', q:'Arrange by minimum investment, smallest first', items:['Mutual fund','Specialised Investment Fund','Portfolio Management Service'], why:'₹100s → ₹10 lakh → ₹50 lakh.'}
    ]}
 ]}
]};

export const INDEX_METRICS = { id:'b6', title:'Index funds and deeper numbers', glyph:'β', levels:[
 { name:'Choosing an index fund', ideas:[
  { title:'Tracking difference: the gap you actually get',
    body:['An index fund should return what its index returns. In reality it falls a little short, mainly because of its fee. That shortfall over a year is the **tracking difference**.',
          'Two Nifty 50 index funds hold the same 50 companies, so the one with the **smaller tracking difference** usually wins. It\'s often close to the expense ratio.'],
    ex:[['Nifty 50 TRI, one year','12.0%'],['Index fund A','11.8% → gap 0.2%'],['Index fund B','11.4% → gap 0.6%']],
    qs:[
     {t:'num', q:'The index returned 14.0%. An index fund returned 13.7%. What is the tracking difference?', a:0.3, tol:0.01, suffix:'%', why:'14.0 − 13.7 = 0.3 percentage points.', work:['Tracking difference = index return − fund return','14.0 − 13.7 = 0.3']},
     {t:'mcq', q:'Two Nifty 50 index funds. Which is usually the better pick?', opts:['The one with the smaller tracking difference','The one with the higher NAV','The newer one','The one with more stocks'], a:0, why:'Same holdings, so the smaller gap to the index wins.'}
    ]},
  { title:'Tracking error: how steady the gap is',
    body:['**Tracking error** measures how much the daily gap between fund and index jumps around. A low tracking error means the fund follows its index closely and smoothly.',
          'When comparing index funds: check tracking difference first, then tracking error, then the expense ratio and fund size.'],
    ex:['A fund that\'s 0.2% behind every day has low tracking error. One that\'s sometimes 1% ahead and sometimes 1% behind has high tracking error.'],
    qs:[
     {t:'mcq', q:'What does a low tracking error tell you?', opts:['The fund follows its index closely and steadily','The fund beats its index','The fund has no fees','The fund is new'], a:0, why:'Low error = small, steady gap.'}
    ]},
  { title:'Smart-beta indices',
    body:['Not every index is ranked by size. **Smart-beta** or **factor** indices pick stocks by a rule: **momentum** (recent winners), **low volatility** (steady movers), **quality** (strong balance sheets), or **equal weight** (every company gets the same share).',
          'They\'re still passive and rule-based, but they behave differently from the Nifty 50 and can lag it for years.'],
    ex:[['Nifty 50','Biggest companies, weighted by size'],['Nifty 50 Equal Weight','Each company 2%'],['Momentum 30','Recent strongest performers']],
    qs:[
     {t:'mcq', q:'In an equal-weight Nifty 50 index, how much does each company get?', opts:['The same share, about 2% each','More for bigger companies','Only the top 10 get any','It changes randomly'], a:0, why:'100% ÷ 50 companies = 2% each.'}
    ]}
 ]},
 { name:'Deeper fund numbers', ideas:[
  { title:'Sortino and capture ratios',
    body:['The **Sortino ratio** is like Sharpe, but it only counts the **bad** bumps (falls), not the good ones. Higher is better.',
          '**Upside capture** shows how much of the market\'s rises a fund catches; **downside capture** shows how much of its falls. A fund with 95% upside and 75% downside captures most gains but only three-quarters of the falls.'],
    ex:[['Market rises 10%, upside capture 95%','Fund rises ≈ 9.5%'],['Market falls 10%, downside capture 75%','Fund falls ≈ 7.5%']],
    qs:[
     {t:'num', q:'A fund\'s downside capture is 80%. The market falls 10%. Roughly how much does the fund fall?', a:8, tol:0.1, suffix:'%', why:'80% of 10% = 8%.', work:['Downside capture 80% = it catches 80% of falls','80% of 10%','10% of 10 is 1, so 80% is 8 → 8%']},
     {t:'mcq', q:'Which pair would most investors prefer?', opts:['Upside 100%, downside 70%','Upside 70%, downside 100%','Upside 80%, downside 120%','Upside 50%, downside 50%'], a:0, why:'Catch all the rises, only 70% of the falls.'}
    ]},
  { title:'Turnover and the fund\'s P/E',
    body:['**Portfolio turnover** shows how much of the fund the manager buys and sells in a year. 100% turnover means the whole portfolio was swapped once. High turnover means more trading costs.',
          'A fund page may show the **P/E** of the whole portfolio: on average, how many years of profit you\'re paying for its companies. Higher P/E means more expensive holdings.'],
    ex:[['Turnover 20%','Patient, low trading'],['Turnover 150%','Swaps everything 1.5 times a year']],
    qs:[
     {t:'tf', q:'A fund with 150% turnover trades more, and so pays more trading costs, than one with 20% turnover.', a:true, why:'More buying and selling, more costs.'}
    ]},
  { title:'Does fund size matter?',
    body:['For large cap and index funds, a big **AUM** is fine and even helps keep costs low.',
          'For **small cap** funds, a very large AUM can be a problem. Small companies have few shares to trade, so a huge fund struggles to buy or sell without moving the price. Some small cap funds pause lumpsum investments for this reason.'],
    ex:['A ₹50,000 crore small cap fund wanting to put 1% (₹500 crore) into a ₹3,000 crore company would need about a sixth of the whole company.'],
    qs:[
     {t:'mcq', q:'For which fund type is a very large AUM most likely to be a problem?', opts:['Small cap','Nifty 50 index','Large cap','Liquid'], a:0, why:'Small companies are hard to buy and sell in big amounts.'}
    ]}
 ]}
]};

export const PROTECT = { id:'b7', title:'Staying safe', glyph:'🛡', levels:[
 { name:'Your account, your people', ideas:[
  { title:'Always add a nominee',
    body:['A **nominee** is the person who receives your units if something happens to you. Without one, your family may face months of paperwork and legal documents.',
          'You can add several nominees (up to 10) and split the share between them. Do it once per folio or demat account, and update it after big life events like marriage.'],
    ex:[['With a nominee','Claim with a death certificate and KYC'],['Without one','Legal heir documents, much longer']],
    qs:[
     {t:'mcq', q:'Why add a nominee?', opts:['So your units pass to your chosen person without long paperwork','To get higher returns','To lower your expense ratio','It\'s needed for SIPs to work'], a:0, why:'It makes the transfer simple for your family.'},
     {t:'tf', q:'You can split your holdings between more than one nominee.', a:true, why:'Several nominees are allowed, each with a percentage.'}
    ]},
  { title:'Joint holders and minors',
    body:['A folio can have up to **3 joint holders**. "Either or survivor" lets any one of them transact; "jointly" needs all of them.',
          'A **minor** can hold units, with a parent or guardian managing the folio. Money must come from and go to the child\'s bank account. At 18, the child completes their own KYC to take over.'],
    ex:[['Either or survivor','Any one holder can act'],['Jointly','All holders must sign'],['Minor\'s folio','Guardian manages till 18']],
    qs:[
     {t:'mcq', q:'Under "either or survivor", who can redeem units?', opts:['Any one of the holders','Only the first holder','All holders together','Only a nominee'], a:0, why:'Any one holder can act.'}
    ]}
 ]},
 { name:'When a fund changes', ideas:[
  { title:'The fund manager leaves',
    body:['A new manager doesn\'t automatically make a fund worse. Many fund houses follow a team process.',
          'Watch the next 1–2 years: does the style or performance change? Don\'t sell in a panic just because of the news.'],
    ex:['Manager leaves in March → keep the SIP → check in a year whether the fund still matches its benchmark and peers.'],
    qs:[
     {t:'mcq', q:'Your fund\'s manager leaves. What\'s a sensible first step?', opts:['Keep watching for a year or so before deciding','Sell everything the same day','Stop all your SIPs everywhere','Switch to a sectoral fund'], a:0, why:'Judge on results, not news.'}
    ]},
  { title:'Mergers and category changes',
    body:['Sometimes a fund house merges two funds or changes a fund\'s category or core strategy. That\'s a big change, so SEBI requires the AMC to inform you.',
          'You get an **exit window**, usually about 30 days, to leave without paying any exit load if you don\'t like the change.'],
    ex:['Letter: "Fund A will merge into Fund B". You can exit within the window with no exit load (tax may still apply).'],
    qs:[
     {t:'tf', q:'When a fund changes its core strategy, you can exit during the notice window without an exit load.', a:true, why:'That\'s the protection SEBI gives you.'}
    ]},
  { title:'Side pockets',
    body:['If a company a debt fund lent to gets into trouble, the fund can move that bad bond into a separate **side pocket**.',
          'Your units are split in two: the healthy main fund, which you can buy and sell normally, and the side-pocket units, which pay out only if the company later repays. It stops new investors from benefiting at your expense, or exiting investors from dumping the loss on you.'],
    ex:[['Before','100 units of the fund'],['After side pocketing','100 units of the main fund + 100 units of the side pocket']],
    qs:[
     {t:'mcq', q:'What does side pocketing separate out?', opts:['A troubled bond the fund holds','The fund manager\'s fees','Your profits','New investors'], a:0, why:'The bad bond is ring-fenced.'}
    ]}
 ]},
 { name:'Spotting bad advice', ideas:[
  { title:'Red flags of mis-selling',
    body:['Watch out for "**guaranteed returns**" on market-linked products, an insurance policy sold as an investment, pressure to switch funds often, or being put in **Regular** plans without being told.',
          'Tips in WhatsApp or Telegram groups promising sure-shot gains are a common scam route.'],
    ex:['"This fund guarantees 18% a year" → no mutual fund can guarantee returns.'],
    qs:[
     {t:'mcq', q:'Which is a red flag?', opts:['"This equity fund guarantees 18% a year"','"Past returns don\'t guarantee future returns"','"Check the riskometer"','"Here\'s the scheme document"'], a:0, why:'Market-linked returns can\'t be guaranteed.'}
    ]},
  { title:'Check who you\'re dealing with',
    body:['A mutual fund **distributor** must have an **ARN** from AMFI. Someone who charges you a fee for advice must be a **SEBI-registered investment adviser (RIA)**. Both can be looked up online.',
          'If something goes wrong: complain to the AMC or broker first. If not solved, use SEBI\'s **SCORES** portal, then the **SMART ODR** platform for online dispute resolution.'],
    ex:[['Distributor','ARN from AMFI'],['Paid adviser','SEBI RIA registration'],['Complaint not solved','SEBI SCORES, then SMART ODR']],
    qs:[
     {t:'order', q:'Put the complaint steps in order', items:['Complain to the AMC or broker','Escalate on SEBI SCORES','Use SMART ODR for dispute resolution'], why:'Start with the company, then the regulator, then dispute resolution.'},
     {t:'mcq', q:'Someone charges you a fee for investment advice. What registration should they have?', opts:['SEBI-registered investment adviser (RIA)','A driving licence','An ARN only','None needed'], a:0, why:'Paid advice needs SEBI RIA registration.'}
    ]}
 ]}
]};

export const BASICS_EXTRA_CARDS = [
 {lv:'b5-0',term:'Duration',simple:'How long a debt fund\'s bonds last, on average.',like:'A long seesaw tips further than a short one.',ex:'Long duration funds swing most when rates move.'},
 {lv:'b5-0',term:'Gilt fund',simple:'A debt fund that lends only to the government.',like:'Lending to the most reliable borrower in the country.'},
 {lv:'b5-0',term:'Credit risk fund',simple:'Lends to lower-rated companies for higher interest.',like:'Lending to a friend who pays more interest because they sometimes forget to repay.'},
 {lv:'b5-0',term:'Target maturity fund',simple:'Holds bonds till a fixed end date.',like:'An FD you can sell before it matures.'},
 {lv:'b5-1',term:'Fund of funds',simple:'A fund that invests in other funds.',like:'A thali made of dishes from other restaurants.'},
 {lv:'b5-1',term:'Gold ETF',simple:'Holds real gold, traded on the exchange.',like:'Gold in a vault, with a receipt you can sell.'},
 {lv:'b5-2',term:'Closed-ended fund',simple:'Takes money only at launch; returns it at a fixed date.',like:'A train you can only board at the first station.'},
 {lv:'b5-2',term:'Interval fund',simple:'Lets you buy or sell only in set windows.',like:'A shop that opens only a few days each quarter.'},
 {lv:'b5-2',term:'SIF',simple:'Specialised Investment Fund: from ₹10 lakh, bolder strategies.',like:'The advanced course after the basic one.'},
 {lv:'b6-0',term:'Tracking difference',simple:'How far an index fund trails its index in a year.',like:'Arriving 2 minutes after the train you were following.'},
 {lv:'b6-0',term:'Tracking error',simple:'How jumpy that gap is from day to day.',like:'Following a car closely vs swerving behind it.'},
 {lv:'b6-0',term:'Smart beta',simple:'An index that picks stocks by a rule other than size.',like:'Picking a team by fitness scores instead of height.'},
 {lv:'b6-1',term:'Sortino ratio',simple:'Reward per unit of downside bumps only.',like:'Counting only the potholes, not the speed bumps you enjoy.'},
 {lv:'b6-1',term:'Downside capture',simple:'How much of the market\'s falls the fund suffers.',like:'An umbrella that blocks some of the rain.'},
 {lv:'b6-1',term:'Portfolio turnover',simple:'How much of the fund is traded in a year.',like:'How often a shop changes all its stock.'},
 {lv:'b7-0',term:'Nominee',simple:'The person who receives your investments after you.',like:'Naming who gets your locker key.'},
 {lv:'b7-1',term:'Side pocket',simple:'A separate pot for a troubled bond.',like:'Moving one bad apple into its own bag.'},
 {lv:'b7-2',term:'ARN',simple:'The AMFI registration number every distributor must have.',like:'A licence plate for fund sellers.'},
 {lv:'b7-2',term:'SCORES',simple:'SEBI\'s online complaints portal.',like:'The regulator\'s help desk.'}
];
