// Ported from the v0 prototype. Edited in place from here on.
export const UNITS = [
{ id:'u1', label:'Week 1', title:'What a mutual fund is', glyph:'NAV', levels:[
 { name:'The shared basket', ideas:[
  { title:'A fund is a shared basket',
    body:['Imagine 1,000 friends who each have a little money. Alone, none of them can buy shares of 50 big companies. Together they can.',
          'A **mutual fund** is that shared basket. Everyone puts money in, and an expert called a fund manager buys shares of companies (or lends money) with it. When the things in the basket go up in value, everyone\'s part goes up by the same %.'],
    ex:[['1,000 people put in ₹10,000 each','₹1 crore'],['Manager buys shares of 50 companies',''],['Those shares rise 10%','₹1.1 crore'],['So each ₹10,000 becomes','₹11,000']],
    app:'The "Current value" on a holdings screen is your part of the basket today.',
    qs:[
     {t:'mcq', q:'What does a mutual fund do with your money?', opts:['Keeps it in a bank account','Pools it with others\' money and an expert invests the pool','Lends it only back to you','Spends it on running costs'], a:1, why:'Pooling is the whole idea: one big basket, one manager, many owners.'},
     {t:'num', q:'The basket rises 10%. What is your ₹10,000 in it worth now?', a:11000, tol:0, prefix:'₹', why:'Everyone\'s part grows by the same %. ₹10,000 + 10% = ₹11,000.', work:['10% of ₹10,000 = knock off one zero = ₹1,000','It grew, so add: ₹10,000 + ₹1,000','= ₹11,000']}
    ]},
  { title:'You own units, not the shares',
    body:['Think of the basket as a big pizza cut into slices. You don\'t own the shares inside directly. You own **units**, which are your slices.',
          'Put in more money, get more slices. Two people investing on the same day get slices in proportion to their money.'],
    ex:[['Riya invests (same day)','₹20,000'],['Arjun invests (same day)','₹10,000'],['Riya\'s units compared with Arjun\'s','2 times']],
    app:'"Units held" on a holdings screen is your number of slices.',
    qs:[
     {t:'tf', q:'When you invest in a mutual fund, you directly own shares of each company it holds.', a:false, why:'You own units of the fund. The fund owns the shares.'},
     {t:'mcq', q:'Meera invests ₹30,000 and Kabir ₹10,000 in the same fund on the same day. Who has more units?', opts:['Kabir, 3 times as many','Both the same','Meera, 3 times as many','It depends on the manager'], a:2, why:'Same day = same price per slice. 3 times the money buys 3 times the slices.'}
    ]},
  { title:'NAV is the price of one unit',
    body:['**NAV** (Net Asset Value) is the price of one slice. It is the whole basket\'s value divided by the number of slices.',
          'It is worked out **once every business day**, after the market closes. To find how many units you get: **money ÷ NAV**.'],
    ex:[['Basket value','₹1,00,00,000'],['Number of units','10,00,000'],['NAV = value ÷ units','₹10'],'You invest ₹5,000 at NAV ₹10 → 5,000 ÷ 10 = 500 units.'],
    app:'Fund pages show "NAV as on <date>" because it changes once a day, not every second like a share price.',
    qs:[
     {t:'num', q:'A basket is worth ₹50,00,000 and has 2,00,000 units. What is the NAV?', a:25, tol:0, prefix:'₹', why:'₹50,00,000 ÷ 2,00,000 = ₹25 per unit.', work:['NAV = basket value ÷ units','50,00,000 ÷ 2,00,000','Knock five zeros off each: 50 ÷ 2 = 25']},
     {t:'num', q:'You invest ₹10,000 when the NAV is ₹20. How many units do you get?', a:500, tol:0, suffix:'units', why:'₹10,000 ÷ ₹20 = 500 units.', work:['Units = money ÷ NAV','10,000 ÷ 20','Knock one zero off each: 1,000 ÷ 2 = 500']},
     {t:'mcq', q:'How often is a fund\'s NAV calculated?', opts:['Every second, like a share price','Once every business day, after market close','Once a month','Only when you sell'], a:1, why:'One price per business day. Every order that day uses it.'}
    ]}
 ]},
 { name:'Fees and plans', ideas:[
  { title:'A low NAV is not "cheap"',
    body:['A ₹15 slice and a ₹150 slice are not cheap and expensive. They are just different slice sizes.',
          'What matters is how much the basket grows in **%**. Two funds that both rise 10% give you the same gain on the same money.'],
    ex:[['Fund A: NAV ₹15, rises 10%','₹16.50'],['Fund B: NAV ₹150, rises 10%','₹165'],['₹10,000 in either becomes','₹11,000']],
    qs:[
     {t:'tf', q:'A fund with a NAV of ₹12 is better value than a fund with a NAV of ₹480.', a:false, why:'NAV is just the price of a slice. Growth in % is what counts.'},
     {t:'mcq', q:'You put ₹10,000 in Fund A (NAV ₹15) and ₹10,000 in Fund B (NAV ₹150). Both rise 10%. What happens?', opts:['A gives more because it was cheaper','B gives more because it is bigger','Both become ₹11,000','Cannot tell'], a:2, why:'Same %, same money, same result.'}
    ]},
  { title:'The expense ratio is the yearly fee',
    body:['Running a fund costs money: the manager, research, records. So every fund keeps a small yearly fee called the **expense ratio**, written as a % of your money. Usually between 0.1% and 2%.',
          'You never get a bill. It\'s taken out of the NAV a tiny bit every day, so the returns you see are already after fees.'],
    ex:[['Your money in the fund','₹1,00,000'],['Expense ratio','1%'],['1% = knock off two zeros','≈ ₹1,000 a year']],
    app:'Fund pages show this as "Expense ratio" near the fund details.',
    qs:[
     {t:'mcq', q:'How is the expense ratio charged to you?', opts:['A bill every quarter','Taken out of the NAV a tiny bit each day','Only when you sell','Paid upfront when you invest'], a:1, why:'It\'s silent and daily, which is why low fees matter over many years.'},
     {t:'num', q:'You have ₹2,00,000 in a fund with a 0.5% expense ratio. Roughly what is the fee for a year?', a:1000, tol:0, prefix:'₹', why:'1% is ₹2,000, so 0.5% (half) is ₹1,000.', work:['1% of ₹2,00,000 = knock off two zeros = ₹2,000','0.5% is half of 1%','Half of ₹2,000 = ₹1,000']}
    ]},
  { title:'Direct vs Regular: same fund, two prices',
    body:['Every fund comes in two versions. Like buying mangoes straight from the farm vs from a shop that adds its margin.',
          'A **Regular** plan is sold through a distributor who earns a commission from a higher fee. A **Direct** plan has no commission. Same fund, same manager; Regular simply costs about 0.5% to 1% more each year, and that gap compounds.'],
    ex:[['₹10,000 a month for 20 years',''],['Direct, growing 12% a year','≈ ₹99 lakh'],['Regular, growing 11% a year','≈ ₹87 lakh']],
    app:'The fund name itself says it, e.g. "XYZ Flexi Cap Fund – Direct – Growth".',
    qs:[
     {t:'mcq', q:'What is the difference between the Direct and Regular plan of one fund?', opts:['They hold different stocks','Direct has no distributor commission, so a lower fee','Regular has guaranteed returns','Direct is only for big investors'], a:1, why:'Identical fund. Only the fee differs.'},
     {t:'mcq', q:'How can you tell which plan you hold?', opts:['Direct always has a lower NAV','The fund name says "Direct" or "Regular"','Only your bank knows','Regular funds have a star'], a:1, why:'It\'s part of the official name.'}
    ]}
 ]},
 { name:'Who runs and guards it', ideas:[
  { title:'AMC, fund manager and AUM',
    body:['Think of a restaurant. The **AMC** (Asset Management Company) is the restaurant company, like HDFC AMC or Parag Parikh. The **fund manager** is the chef who decides what goes in.',
          '**AUM** (Assets Under Management) is how big the whole pot is: the total money in the fund.'],
    ex:[['AMC','The company'],['Fund manager','The person choosing'],['AUM','Total money in the fund'],['Units','Your slices']],
    qs:[
     {t:'match', q:'Match each word to its meaning', pairs:[['AMC','The company running the fund'],['Fund manager','The person choosing investments'],['AUM','Total money in the fund'],['Units','Your slices of the basket']], why:'These four appear on almost every fund page.'}
    ]},
  { title:'SEBI and AMFI',
    body:['**SEBI** is the government referee. It writes the rules every fund must follow.',
          '**AMFI** is the club all fund companies belong to. It runs the "Mutual Funds Sahi Hai" ads and registers distributors, who get an ARN code.'],
    ex:['SEBI = the referee who makes the rules.','AMFI = the club all the teams belong to.'],
    qs:[
     {t:'mcq', q:'Who regulates mutual funds in India?', opts:['RBI','AMFI','SEBI','IRDAI'], a:2, why:'SEBI is the referee. RBI handles banks, IRDAI insurance.'},
     {t:'mcq', q:'What is AMFI?', opts:['The stock exchange','The club of fund companies, which also registers distributors','A bank','The tax department'], a:1, why:'AMFI is the industry body, not the referee.'}
    ]},
  { title:'Your money is kept separately',
    body:['The fund\'s investments are kept with a **custodian**, usually a bank, like a locker outside the restaurant. They belong to the investors, not to the AMC.',
          'Your **folio number** is your account number with one AMC, like a membership number at one shop. One folio can hold several funds of that AMC.'],
    ex:['If an AMC shut down, the investments would still sit in the custodian\'s locker and belong to unit holders.'],
    app:'Statements list your holdings by folio number.',
    qs:[
     {t:'tf', q:'If an AMC shuts down, investors lose the money in its funds.', a:false, why:'The investments sit with the custodian and belong to investors.'},
     {t:'mcq', q:'What is a folio number?', opts:['The fund\'s NAV','Your account number with one AMC','Your PAN','The manager\'s ID'], a:1, why:'One folio per AMC; it can hold several of its funds.'}
    ]}
 ]}
]},
{ id:'u2', label:'Week 2', title:'The fund types', glyph:'EQ·D', levels:[
 { name:'Equity, debt and liquid', ideas:[
  { title:'Equity funds own businesses',
    body:['An **equity fund** buys shares, which are small pieces of companies. It\'s like owning a bit of a shop: when the shop does well, you gain; on bad days, your piece is worth less.',
          'Equity can drop sharply for a while, so it suits money you won\'t need for **5 years or more**.'],
    ex:['March 2020: the Nifty 50 fell nearly 40% in about two months.','It recovered within about a year. People who sold during the fall locked in the loss.'],
    qs:[
     {t:'mcq', q:'An equity fund mainly invests in…', opts:['Shares of companies','Government bonds','Gold','Bank FDs'], a:0, why:'Equity = owning pieces of companies.'},
     {t:'tf', q:'Equity funds can fall a lot over a few months.', a:true, why:'Like 2020. That\'s why equity needs time.'}
    ]},
  { title:'Debt funds lend money',
    body:['A **debt fund** lends money to the government and companies, like lending to a neighbour who pays you back with a little extra (interest).',
          'It\'s steadier than equity but not risk-free. When interest rates rise, older loans become less valuable. And a borrower might not pay back.'],
    ex:['In 2020 Franklin Templeton shut six debt funds because the loans they held couldn\'t be sold. A debt fund is not a bank FD.'],
    qs:[
     {t:'mcq', q:'A debt fund earns mainly by…', opts:['Owning companies','Lending money and earning interest','Trading gold','Charging fees'], a:1, why:'It buys bonds, which are loans that pay interest.'},
     {t:'tf', q:'Debt funds are risk-free, just like a bank FD.', a:false, why:'Rate changes and defaults can both cause losses.'}
    ]},
  { title:'Liquid and overnight funds park cash',
    body:['These debt funds lend for a very short time: **overnight** funds for 1 day, **liquid** funds for up to 91 days. Like lending a friend money till next week: very little can go wrong.',
          'They barely move, so they\'re the usual home for an emergency fund or money needed soon.'],
    ex:[['Overnight fund','Lends for 1 day'],['Liquid fund','Up to 91 days'],['Good for','Cash needed within months']],
    qs:[
     {t:'mcq', q:'You need this money in 2 months. Which fund fits?', opts:['Equity fund','Liquid fund','Long-term debt fund','Small company fund'], a:1, why:'Very short lending, very small swings.'},
     {t:'order', q:'Arrange from calmest to most bumpy', items:['Overnight fund','Liquid fund','Debt fund','Equity fund'], why:'Shorter lending is calmer. Owning businesses swings the most.'}
    ]}
 ]},
 { name:'Equity by company size', ideas:[
  { title:'Large, mid and small cap',
    body:['All listed companies are lined up by size, from biggest to smallest. Size here means **market cap**: what the whole company is worth on the stock market.',
          'Numbers **1–100** are **large cap**, **101–250** are **mid cap**, **251 onwards** are **small cap**. AMFI updates this list every six months.'],
    ex:[['Ranks 1–100','Large cap'],['Ranks 101–250','Mid cap'],['Ranks 251 onwards','Small cap']],
    qs:[
     {t:'mcq', q:'Mid cap companies are the ones ranked…', opts:['1 to 100','101 to 250','251 to 500','Above 500'], a:1, why:'1–100 large, 101–250 mid, 251+ small.'},
     {t:'mcq', q:'A large cap fund invests mainly in…', opts:['The 100 biggest companies by market value','Companies with the most staff','The newest companies','Government bonds'], a:0, why:'At least 80% in the top 100.'}
    ]},
  { title:'Smaller companies swing harder',
    body:['Think of boats. Large caps are big ships: steady. Small caps are speedboats: they can go fast, but every wave hits harder.',
          'Rough time you should stay invested: large cap **5+ years**, mid and small cap **7+ years**.'],
    ex:['In a market fall, a small cap fund usually drops noticeably more than a large cap fund.'],
    qs:[
     {t:'order', q:'Arrange from calmest to most bumpy', items:['Large cap','Mid cap','Small cap'], why:'Smaller boats, bigger bumps.'},
     {t:'mcq', q:'You need this money in 3 years. Which is least suitable?', opts:['Liquid fund','Small cap fund','Debt fund','Overnight fund'], a:1, why:'Small caps could be deep in a fall right when you need the money.'}
    ]},
  { title:'Flexi cap vs Multi cap',
    body:['A **flexi cap** fund is like a chef free to pick any ingredients: at least 65% in equity, and the manager chooses big, mid or small companies.',
          'A **multi cap** fund is like a thali with a fixed portion of each dish: at least 25% each in large, mid and small caps.'],
    ex:[['Flexi cap','Manager chooses the sizes'],['Multi cap','At least 25% each of large, mid, small']],
    qs:[
     {t:'mcq', q:'What makes a multi cap fund different from a flexi cap fund?', opts:['Multi cap must hold at least 25% each in large, mid and small','Multi cap holds only foreign stocks','Flexi cap must be all large caps','Nothing'], a:0, why:'Multi cap has a fixed minimum for each size. Flexi cap doesn\'t.'},
     {t:'tf', q:'A flexi cap fund must keep at least 25% in small caps.', a:false, why:'That rule belongs to multi cap.'}
    ]}
 ]},
 { name:'Mixes, index and special funds', ideas:[
  { title:'Hybrid funds mix both',
    body:['A **hybrid** fund holds shares and loans together, sometimes gold too. A **balanced advantage** fund changes its mix as markets move.',
          'Its bumps sit between equity and debt. A fit for goals **3 to 5 years** away.'],
    ex:['A hybrid with 65% equity and 35% debt falls less than pure equity in a crash, and also rises less in a boom.'],
    qs:[
     {t:'mcq', q:'Your goal is 4 years away. Which type fits best?', opts:['Hybrid','Small cap','Overnight','One-sector fund'], a:0, why:'3–5 years suits a mix.'}
    ]},
  { title:'Index funds and ETFs copy the market',
    body:['An **index** is a fixed list of companies, like the Nifty 50. An **index fund** simply buys that list, like following a recipe exactly. No chef choosing, so the fee is tiny: often 0.1–0.3%.',
          'An **ETF** is the same idea, but you buy and sell it on the stock exchange like a share.'],
    ex:[['Nifty 50 index fund','Holds the 50 Nifty companies'],['Active large cap fund','Manager picks the companies'],['ETF','Index fund bought on the exchange']],
    qs:[
     {t:'mcq', q:'What is an index fund?', opts:['A fund that copies a list like the Nifty 50, at low cost','A fund that only buys new IPOs','A fund guaranteed to beat the market','A debt fund'], a:0, why:'Copying instead of choosing is why it\'s cheap.'},
     {t:'mcq', q:'How is an ETF different from a regular index fund?', opts:['You buy and sell it on the stock exchange like a share','It has a 3-year lock-in','It holds only bonds','RBI runs it'], a:0, why:'Same idea, different counter.'}
    ]},
  { title:'Four special categories',
    body:['**ELSS Tax Saver**: equity that saves tax, locked for 3 years like a piggy bank. **Sectoral**: only one industry, like banking only. Risky.',
          '**Arbitrage**: earns from tiny price gaps between two markets; very low risk. **Life Cycle Fund**: new in 2026; gets safer as your goal year gets closer.'],
    ex:[['ELSS Tax Saver','3-year lock-in'],['Sectoral','One industry only'],['Arbitrage','Low-risk parking'],['Life Cycle (2026)','Safer as goal nears']],
    qs:[
     {t:'match', q:'Match the fund to its feature', pairs:[['ELSS Tax Saver','3-year lock-in'],['Sectoral','Only one industry'],['Arbitrage','Earns from price gaps'],['Life Cycle Fund','Safer as the goal year nears']], why:'You\'ll see these called out in fund apps.'},
     {t:'tf', q:'A one-industry (sectoral) fund is a good main holding for a beginner.', a:false, why:'All eggs in one basket. Keep it small, if at all.'}
    ]}
 ]}
]},
{ id:'u3', label:'Week 3', title:'Money in and money out', glyph:'SIP', levels:[
 { name:'Ways to invest', ideas:[
  { title:'Lumpsum or SIP',
    body:['A **lumpsum** is putting in one amount, once. A **SIP** (Systematic Investment Plan) puts in a fixed amount automatically on the same date every month, like a gym membership for saving.',
          'A SIP is a way of investing, not a type of fund. Almost any fund can take one.'],
    ex:[['Lumpsum','₹1,00,000 once'],['SIP','₹5,000 on the 5th of every month']],
    qs:[
     {t:'mcq', q:'What is a SIP?', opts:['A fixed amount invested automatically every month','A one-time investment','A tax-saving fund','A type of bond'], a:0, why:'Same amount, same date, every month.'},
     {t:'tf', q:'A SIP is a type of mutual fund.', a:false, why:'It\'s a way of putting money into a fund.'}
    ]},
  { title:'Why SIPs work: more units when prices drop',
    body:['Same money, different prices. In mango season mangoes are cheap, so your ₹100 buys more. A SIP works the same way: **when NAV is low, your fixed amount buys more units**.',
          'Over time this pulls your average price down, and it stops you from trying to guess the "right" day to invest.'],
    ex:[['Month 1: ₹1,000 ÷ NAV ₹10','100 units'],['Month 2: ₹1,000 ÷ NAV ₹8','125 units'],['Month 3: ₹1,000 ÷ NAV ₹12.50','80 units'],['Total for ₹3,000','305 units']],
    qs:[
     {t:'num', q:'₹1,000 a month for 2 months. The NAV is ₹20, then ₹10. How many units in total?', a:150, tol:0, suffix:'units', why:'50 + 100 = 150.', work:['Month 1: 1,000 ÷ 20 → knock a zero: 100 ÷ 2 = 50 units','Month 2: 1,000 ÷ 10 = 100 units','Total: 50 + 100 = 150 units']},
     {t:'mcq', q:'When does a SIP buy the most units?', opts:['When NAV is high','When NAV is low','On the 1st of the month','Always the same'], a:1, why:'Same rupees ÷ lower price = more units.'}
    ]},
  { title:'STP: easing a big amount in',
    body:['An **STP** (Systematic Transfer Plan) is like getting into a cold pool step by step. You park a big amount in a liquid fund, then a fixed chunk moves into an equity fund every month.',
          'Useful when you have a lumpsum but don\'t want to put it all into equity on one day.'],
    ex:['₹6 lakh bonus → liquid fund → ₹50,000 moves to equity every month for 12 months.'],
    qs:[
     {t:'mcq', q:'You get a ₹5 lakh bonus and worry the market might fall soon. Best move?', opts:['All into a small cap fund today','STP: park in a liquid fund, move into equity monthly','Keep it in savings for 3 years','Buy a one-industry fund'], a:1, why:'You spread your entry, and the waiting money still earns.'}
    ]}
 ]},
 { name:'Ways to take money out', ideas:[
  { title:'Redeeming, and the exit load',
    body:['To **redeem** is to sell your units. The money reaches your bank in about 1 to 3 working days.',
          'Some funds charge an **exit load** if you leave early, like a cancellation fee. Often 1% if you sell an equity fund within a year.'],
    ex:[['Redeem from an equity fund','₹50,000'],['Within a year, exit load 1%','₹500 fee']],
    qs:[
     {t:'mcq', q:'What is an exit load?', opts:['A fee for selling before a set time','A fee for buying','The yearly fee','A government tax'], a:0, why:'It discourages quick in-and-out trading.'},
     {t:'num', q:'You redeem ₹80,000 from an equity fund after 5 months. Exit load is 1%. What is the fee?', a:800, tol:0, prefix:'₹', why:'1% of ₹80,000 = ₹800.', work:['1% = knock off two zeros','₹80,000 → ₹800']}
    ]},
  { title:'SWP and Switch',
    body:['An **SWP** (Systematic Withdrawal Plan) pays you a fixed amount from your fund every month, like giving yourself a salary in retirement.',
          'A **switch** moves money from one fund to another in the same AMC, like exchanging a dish at the same restaurant. It still counts as selling one and buying another.'],
    ex:[['SIP','Money in, every month'],['STP','Liquid → equity, every month'],['SWP','Money out, every month'],['Switch','Fund A → Fund B, same AMC']],
    qs:[
     {t:'match', q:'Match the plan to what it does', pairs:[['SIP','Fixed investment every month'],['STP','Liquid to equity, bit by bit'],['SWP','Fixed withdrawal every month'],['Switch','Move between funds of one AMC']], why:'These sit behind most invest and redeem buttons.'},
     {t:'tf', q:'A switch counts as selling one fund and buying another.', a:true, why:'That matters for tax, as you\'ll see in the Tax section.'}
    ]},
  { title:'Growth or IDCW',
    body:['Every fund has two options. **Growth** keeps all the profit inside, like replanting the seeds from your harvest. It keeps compounding.',
          '**IDCW** (the old "dividend" option) pays out some money now and then. That money comes **out of the NAV**, like cutting a slice off your own cake. It isn\'t extra, and it\'s taxed at your income slab.'],
    ex:[['NAV before payout','₹50'],['Paid out per unit','₹2'],['NAV after','₹48']],
    qs:[
     {t:'mcq', q:'To build long-term wealth, which option should you pick?', opts:['Growth','IDCW'], a:0, why:'Growth lets returns compound untouched.'},
     {t:'tf', q:'An IDCW payout is extra money on top of the fund\'s returns.', a:false, why:'It comes from the NAV, which drops by the same amount.'}
    ]}
 ]},
 { name:'The plumbing', ideas:[
  { title:'KYC and the mandate',
    body:['**KYC** is a one-time ID check (PAN, Aadhaar, a photo or video check), like showing your ID once at a building gate. It then works for every fund house.',
          'A **mandate** (NACH or UPI Autopay) is your permission for the bank to auto-pay your SIP, like auto-pay for an electricity bill. It can take a few days to set up.'],
    ex:[['KYC','Once, for all funds'],['Mandate','Lets SIPs pay automatically']],
    qs:[
     {t:'mcq', q:'What lets a SIP take money from your bank automatically?', opts:['KYC','A mandate (NACH or UPI Autopay)','The folio number','The NAV'], a:1, why:'The mandate is the standing bank permission.'},
     {t:'tf', q:'You need a fresh KYC for every new fund house.', a:false, why:'KYC is done once and shared.'}
    ]},
  { title:'Cut-off time decides your NAV',
    body:['Like a restaurant\'s last-order time. Money that reaches the fund **before 3 pm** on a business day gets that day\'s NAV. After 3 pm, it gets the next business day\'s.',
          'For liquid and overnight funds the cut-off is earlier: **1:30 pm**.'],
    ex:[['Equity, Monday 2:30 pm','Monday\'s NAV'],['Equity, Monday 4:15 pm','Tuesday\'s NAV']],
    qs:[
     {t:'mcq', q:'Your money reaches an equity fund at 4:15 pm on Monday. Which NAV do you get?', opts:['Monday\'s','Tuesday\'s','Last Friday\'s','The week\'s average'], a:1, why:'After 3 pm, it rolls to the next business day.'},
     {t:'mcq', q:'What is the cut-off time for liquid funds?', opts:['10 am','1:30 pm','3 pm','6 pm'], a:1, why:'Liquid and overnight funds close earlier.'}
    ]},
  { title:'RTAs and your CAS',
    body:['**CAMS** and **KFintech** are registrars (RTAs): the school office that keeps every student\'s records, for the fund companies.',
          'Your **CAS** (Consolidated Account Statement) is one report card listing every mutual fund you own, across all AMCs and apps.'],
    ex:['Bought funds on 3 different apps? One CAS shows all of them.'],
    app:'Portfolio import features pull from the CAS through CAMS, KFintech or MF Central.',
    qs:[
     {t:'mcq', q:'What are CAMS and KFintech?', opts:['Stock exchanges','Registrars that keep records for fund companies','Brokers','Rating agencies'], a:1, why:'They\'re the industry\'s back office.'},
     {t:'mcq', q:'What does your CAS show?', opts:['Only funds from one app','Every fund you hold, across companies and apps','Your credit score','Your bank balance'], a:1, why:'One statement for everything.'}
    ]}
 ]}
]},
{ id:'u4', label:'Week 4', title:'Reading a fund page', glyph:'XIRR', levels:[
 { name:'How much did it earn', ideas:[
  { title:'Absolute return ignores time',
    body:['**Absolute return** is your total % gain, no matter how long it took. Like saying "I grew 10 cm" without saying in how many years.',
          '50% in 2 years is great. 50% in 10 years is poor. Absolute return alone can\'t tell them apart.'],
    ex:[['Invested','₹1,00,000'],['Now','₹1,50,000'],['Gain ₹50,000 out of ₹1,00,000','50%']],
    qs:[
     {t:'mcq', q:'A fund shows "50% absolute return". What key detail is missing?', opts:['How long it took','The NAV','The AMC','Nothing'], a:0, why:'Without time, you can\'t judge it.'},
     {t:'num', q:'₹40,000 grew to ₹50,000. What is the absolute return?', a:25, tol:0, suffix:'%', why:'Gain ₹10,000 out of ₹40,000 = a quarter = 25%.', work:['Gain = ₹50,000 − ₹40,000 = ₹10,000','₹10,000 out of ₹40,000 = 1 out of 4','1 out of 4 = a quarter = 25%']}
    ]},
  { title:'CAGR and the rule of 72',
    body:['**CAGR** is the steady yearly growth rate, like the average speed of a road trip, even if you sped up and slowed down along the way.',
          'A handy trick, the **rule of 72**: years to double your money ≈ 72 ÷ yearly %. It works both ways.'],
    ex:[['₹1 lakh → ₹2 lakh in 6 years','CAGR ≈ 12%'],['72 ÷ 12%','≈ 6 years to double'],['Doubled in 8 years: 72 ÷ 8','≈ 9% a year']],
    qs:[
     {t:'num', q:'Your money doubled in 8 years. Roughly what yearly % (CAGR) is that?', a:9, tol:0.5, suffix:'%', why:'72 ÷ 8 = 9.', work:['Rule of 72: yearly % ≈ 72 ÷ years','72 ÷ 8','8 × 9 = 72, so ≈ 9%']},
     {t:'num', q:'At 12% a year, roughly how many years to double your money?', a:6, tol:0.5, suffix:'years', why:'72 ÷ 12 = 6.', work:['Years ≈ 72 ÷ yearly %','72 ÷ 12','12 × 6 = 72, so ≈ 6 years']}
    ]},
  { title:'XIRR for SIPs',
    body:['CAGR assumes you put money in once. A SIP puts money in on many dates.',
          '**XIRR** is the yearly return that accounts for every one of those dates, like the average speed when friends joined the trip at different stops. It\'s the right number for a SIP or a whole portfolio.'],
    ex:['24 SIP instalments over 2 years → use XIRR, not CAGR or absolute return.'],
    app:'A portfolio dashboard\'s "returns %" should say whether it\'s XIRR or absolute.',
    qs:[
     {t:'mcq', q:'Which return figure is right for a SIP?', opts:['Absolute return','CAGR','XIRR','1-day change'], a:2, why:'XIRR handles each instalment\'s date.'}
    ]}
 ]},
 { name:'Comparing fairly', ideas:[
  { title:'Trailing vs rolling returns',
    body:['A "5Y return" is a **trailing** return: one start date, ending today. It\'s like judging a batsman on one innings.',
          '**Rolling returns** check every possible 5-year window and show how often the fund did well. Like judging the batsman on every match.'],
    ex:['A fund looks great on its 5Y trailing return because it happened to start at a market low.','Rolling returns show it beat its index only 40% of the time.'],
    qs:[
     {t:'mcq', q:'Why are rolling returns better than one trailing 5Y return?', opts:['They check every window, not one start date','They are always higher','SEBI forbids trailing returns','They ignore fees'], a:0, why:'They show consistency, not luck.'}
    ]},
  { title:'The benchmark',
    body:['Every fund names a **benchmark**: the index it compares itself with, like comparing your marks with the class average. Fund pages use the **TRI** version, which counts dividends too, to keep it fair.',
          'A fund that does worse than its benchmark after fees isn\'t earning its fee.'],
    ex:[['Fund\'s 5-year return','13% a year'],['Benchmark TRI','14% a year'],['Verdict','Behind its benchmark']],
    qs:[
     {t:'tf', q:'A fund returned 13% a year and its benchmark TRI returned 14%. The fund beat its benchmark.', a:false, why:'It trailed by 1% a year.'},
     {t:'mcq', q:'What does TRI add to a benchmark?', opts:['Dividends reinvested','Fees','Taxes','Nothing'], a:0, why:'Funds keep their dividends, so the index should too.'}
    ]},
  { title:'The Riskometer',
    body:['SEBI makes every fund show a **Riskometer**, like a spice meter from mild to very hot. It has 6 levels: Low, Low to Moderate, Moderate, Moderately High, High, Very High.',
          'Most equity funds sit at Very High. Liquid funds sit near Low to Moderate.'],
    ex:[['Liquid fund','Low to Moderate'],['Small cap fund','Very High']],
    qs:[
     {t:'mcq', q:'How many levels does SEBI\'s Riskometer have?', opts:['3','4','6','10'], a:2, why:'Low through Very High, six steps.'}
    ]}
 ]},
 { name:'Risk numbers and debt numbers', ideas:[
  { title:'Measuring the bumps',
    body:['**Standard deviation** tells you how bumpy the road is. **Max drawdown** is the deepest dip on the rollercoaster: the biggest fall from a high to a low.',
          '**Beta** compares the fund\'s rocking with the market\'s waves. Beta 1 rocks the same as the market; beta 0.8 rocks about 80% as much.'],
    ex:[['Market falls','10%'],['Beta 0.8 fund falls about','0.8 × 10% = 8%']],
    qs:[
     {t:'mcq', q:'A fund has a beta of 0.8. The market falls 10%. Roughly how much does the fund fall?', opts:['8%','10%','0.8%','18%'], a:0, why:'0.8 × 10% = 8%.'}
    ]},
  { title:'Sharpe and Alpha',
    body:['**Sharpe ratio** is reward per bump, like marks scored per hour studied. Higher is better.',
          '**Alpha** is extra return the manager added beyond what the risk explains, like marks above what was expected. Always compare these within the same category.'],
    ex:['Two flexi cap funds both returned 13%. The one with the higher Sharpe had a smoother ride getting there.'],
    qs:[
     {t:'match', q:'Match each measure to its meaning', pairs:[['Std deviation','How bumpy returns are'],['Beta','Rocking compared with the market'],['Sharpe ratio','Reward per unit of bumpiness'],['Max drawdown','Deepest fall from a high']], why:'Compare these with similar funds only.'}
    ]},
  { title:'Three debt fund numbers',
    body:['**YTM** (yield to maturity): roughly the return a debt fund expects if nothing changes. A guide, not a promise. **Credit quality**: Sovereign (government) and AAA are safest.',
          '**Modified duration** is how far the seesaw tips: how many % the NAV falls if interest rates rise by 1%.'],
    ex:[['Modified duration','3'],['Interest rates rise by','1%'],['NAV falls about','3%']],
    qs:[
     {t:'num', q:'A debt fund has a modified duration of 4. Rates rise by 1%. Roughly how many % does the NAV fall?', a:4, tol:0.2, suffix:'%', why:'Duration ≈ % fall per 1% rate rise.', work:['Duration 4 means about 4% fall for every 1% rate rise','Rates rose 1%','1 × 4 = 4%']},
     {t:'mcq', q:'Which credit rating is safest?', opts:['Sovereign / AAA','A','BBB','Unrated'], a:0, why:'Government and top-rated borrowers.'},
     {t:'mcq', q:'What is YTM?', opts:['A guaranteed return','Roughly the return if nothing changes','Last year\'s return','The fee'], a:1, why:'It\'s an estimate, not a promise.'}
    ]}
 ]}
]},
{ id:'u5', label:'Week 5', title:'Tax', glyph:'TAX', levels:[
 { name:'Equity tax', ideas:[
  { title:'Tax only when you sell',
    body:['You pay tax on a mutual fund only when you **sell** (or switch). Profit sitting inside the fund isn\'t taxed.',
          'Your **gain** = what you sold for − what you paid. Like selling a cycle for more than you bought it.'],
    ex:[['Bought for','₹60,000'],['Sold for','₹75,000'],['Gain: ₹75,000 − ₹60,000','₹15,000']],
    qs:[
     {t:'tf', q:'You pay tax on mutual fund gains every year, even if you don\'t sell.', a:false, why:'Only selling or switching triggers tax.'},
     {t:'num', q:'You bought units for ₹60,000 and sold them for ₹75,000. What is the gain?', a:15000, tol:0, prefix:'₹', why:'₹75,000 − ₹60,000 = ₹15,000.', work:['Gain = sold − bought','₹75,000 − ₹60,000','= ₹15,000']}
    ]},
  { title:'Short term vs long term for equity',
    body:['For tax, a fund counts as **equity** if it holds 65% or more in Indian shares.',
          'Sold within 12 months → **short-term**, taxed **20%**. Held longer than 12 months → **long-term**, taxed **12.5%**, and only on gains above **₹1.25 lakh** in a year. Patience is rewarded. (Plus 4% cess; rules unchanged in Budget 2026.)'],
    ex:[['Held 12 months or less','20% on all the gain'],['Held more than 12 months','12.5% on gain above ₹1.25 lakh']],
    qs:[
     {t:'mcq', q:'You sell an equity fund after 8 months. What is the tax rate on the gain?', opts:['12.5%','20%','Your slab rate','Nil'], a:1, why:'12 months or less = short term = 20%.'},
     {t:'mcq', q:'You sell an equity fund after 14 months. How is the gain taxed?', opts:['12.5% on gains above ₹1.25 lakh in the year','20% on all of it','Your slab rate','Tax-free'], a:0, why:'Over 12 months = long term.'}
    ]},
  { title:'Working out long-term tax',
    body:['Step 1: take away the ₹1.25 lakh that is tax-free each year. Step 2: find 12.5% of what\'s left, by splitting it into 10% + 2.5% (the Percent tab shows how).',
          'The ₹1.25 lakh is one free allowance per person per year, shared across all your equity funds and shares.'],
    ex:[['Long-term gain','₹2,00,000'],['Minus tax-free ₹1,25,000','₹75,000'],['10% of ₹75,000','₹7,500'],['2.5% (a quarter of 10%)','₹1,875'],['Tax = ₹7,500 + ₹1,875','₹9,375']],
    qs:[
     {t:'num', q:'Long-term equity gain of ₹3,00,000 this year. What is the tax (before cess)?', a:21875, tol:1, prefix:'₹', why:'(₹3,00,000 − ₹1,25,000) × 12.5% = ₹21,875.', work:['Taxable = ₹3,00,000 − ₹1,25,000 = ₹1,75,000','10% of ₹1,75,000 = ₹17,500','2.5% = a quarter of ₹17,500 = ₹4,375','12.5% = ₹17,500 + ₹4,375 = ₹21,875']},
     {t:'mcq', q:'The ₹1.25 lakh tax-free amount applies…', opts:['Separately to each fund','Once a year, across all your equity gains','Every time you sell','Only to ELSS'], a:1, why:'One shared allowance per year.'}
    ]}
 ]},
 { name:'Debt and hybrid tax', ideas:[
  { title:'Debt funds are taxed like salary',
    body:['Debt funds (65% or more in loans, including liquid funds) bought on or after **1 April 2023** are taxed at your **slab rate**: the same rate as your salary income, however long you hold them.'],
    ex:[['Debt fund gain','₹50,000'],['Your slab','30%'],['10% is ₹5,000, so 30% is','₹15,000']],
    qs:[
     {t:'mcq', q:'Debt fund bought in 2025, sold in 2029. How is the gain taxed?', opts:['12.5%','20%','At your slab rate','Tax-free after 3 years'], a:2, why:'Debt fund units bought after April 2023 are always slab rate.'},
     {t:'num', q:'₹40,000 gain on a debt fund, and you are in the 20% slab. What is the tax (before cess)?', a:8000, tol:0, prefix:'₹', why:'20% of ₹40,000 = ₹8,000.', work:['10% of ₹40,000 = ₹4,000','20% = two of those','₹4,000 + ₹4,000 = ₹8,000']}
    ]},
  { title:'In-between funds',
    body:['Funds with **35–65%** in shares sit in between: slab rate if sold within 24 months, 12.5% after.',
          '**Arbitrage funds** count as equity for tax, which is why people use them to park money for a few months.'],
    ex:[['65% or more in shares','Equity rules'],['35–65% in shares','12.5% after 24 months'],['Under 35% in shares','Slab rate']],
    qs:[
     {t:'mcq', q:'How is an arbitrage fund taxed?', opts:['Like equity','Like debt (slab rate)','Tax-free','Like gold'], a:0, why:'It counts as equity.'},
     {t:'mcq', q:'For tax, a fund counts as equity when shares make up at least…', opts:['35%','50%','65%','80%'], a:2, why:'65% is the line.'}
    ]}
 ]},
 { name:'Smart tax moves', ideas:[
  { title:'Each SIP instalment has its own clock',
    body:['Every SIP instalment is a separate purchase with its own 12-month clock.',
          'When you sell, the **oldest units go first**, like a queue: first in, first out.'],
    ex:['SIP started 14 months ago → only the first 2 instalments are older than 12 months. The other 12 are still short-term.'],
    qs:[
     {t:'mcq', q:'Your SIP started 14 months ago. How many instalments count as long-term today?', opts:['0','2','12','14'], a:1, why:'Only instalments older than 12 months count.'}
    ]},
  { title:'Switching and harvesting',
    body:['A **switch** is a sale, so it can trigger tax even inside the same AMC.',
          '**Tax-gain harvesting** is using a yearly free coupon before it expires. Each year, sell enough to book up to ₹1.25 lakh of long-term gain (tax-free), and buy back the same day. Your buying price resets higher, so future tax is lower.'],
    ex:['Book ₹1.2 lakh long-term gain in March → pay ₹0 tax → reinvest → future gains are counted from the new, higher price.'],
    qs:[
     {t:'tf', q:'Switching between two funds of the same AMC is not taxed.', a:false, why:'A switch is a sale plus a purchase.'},
     {t:'mcq', q:'What is tax-gain harvesting?', opts:['Booking up to ₹1.25 lakh long-term gain tax-free each year and reinvesting','Never selling','Moving everything to ELSS','Claiming a gain twice'], a:0, why:'It uses the yearly free allowance so it isn\'t wasted.'}
    ]},
  { title:'ELSS only saves tax in the old regime',
    body:['ELSS lets you claim up to **₹1.5 lakh** under Section 80C, but only in the **old tax regime**.',
          'The **new regime** is now the default, and it has no 80C. There, ELSS is just an equity fund locked for 3 years.'],
    ex:[['Old regime','80C deduction available'],['New regime (default)','No 80C deduction']],
    qs:[
     {t:'tf', q:'ELSS gives an 80C deduction under the new tax regime.', a:false, why:'80C exists only in the old regime.'}
    ]}
 ]}
]},
{ id:'u6', label:'Week 6', title:'DIY investing', glyph:'DIY', levels:[
 { name:'Before you invest', ideas:[
  { title:'Build the base first',
    body:['Before any equity, keep a spare tyre: an **emergency fund** of about **6 months of expenses** in a liquid or arbitrage fund. Also get health and term insurance.',
          'Clear expensive debt first. Credit card interest often runs above 36% a year, far more than funds reliably earn.'],
    ex:[['Monthly expenses','₹40,000'],['6 months: ₹40,000 × 6','₹2,40,000']],
    qs:[
     {t:'mcq', q:'How big should an emergency fund be, as a rule of thumb?', opts:['1 week of expenses','6 months of expenses','5 years of salary','₹10,000'], a:1, why:'Enough for a job loss or medical surprise.'},
     {t:'num', q:'Your monthly expenses are ₹35,000. How big should your emergency fund be?', a:210000, tol:0, prefix:'₹', why:'6 × ₹35,000 = ₹2,10,000.', work:['Emergency fund = 6 × monthly expenses','35 × 6 = 210','Add back the three zeros: ₹2,10,000']},
     {t:'tf', q:'It\'s smart to start equity SIPs before clearing a credit card balance.', a:false, why:'Card interest beats any likely fund return.'}
    ]},
  { title:'Goals decide the bucket',
    body:['Write each goal with a **year** and an **amount**. Then match it to a bucket by time, like packing for a trip: short trip, small bag; long trip, big suitcase.',
          'Under 3 years → liquid, short-term debt or arbitrage. 3–5 years → hybrid. 5+ years → equity.'],
    ex:[['Trip, ₹2 lakh, 2028','Short-term bucket'],['House down payment, 2031','Hybrid'],['Retirement, 2055','Equity']],
    qs:[
     {t:'match', q:'Match each need to its bucket', pairs:[['Emergency fund','Liquid or arbitrage'],['Goal in 2 years','Short-term debt'],['Goal in 4 years','Hybrid'],['Goal in 15 years','Equity']], why:'Time decides the bucket.'},
     {t:'mcq', q:'A goal 18 months away. Which bucket?', opts:['Small cap','Liquid, short-term debt or arbitrage','Flexi cap','One-industry fund'], a:1, why:'Under 3 years, avoid equity.'}
    ]}
 ]},
 { name:'Choosing funds', ideas:[
  { title:'Few funds, not many',
    body:['A simple core many DIY investors use: a **Nifty 50 index fund** + one **flexi cap** fund, and maybe a mid or small cap fund for 10–20%.',
          'More funds usually means owning the same companies twice, like ordering two thalis with the same dishes.'],
    ex:['Five flexi cap funds often share most of their top 10 companies.'],
    qs:[
     {t:'tf', q:'More funds always means better diversification.', a:false, why:'Overlap means you just own the same companies again.'}
    ]},
  { title:'A five-point fund checklist',
    body:['1. Direct plan, Growth option. 2. At least 5 years old. 3. Rolling returns at or above its benchmark.',
          '4. Low expense ratio for its type. 5. Fell no worse than similar funds in the 2020 crash.'],
    ex:['Not on the list: last year\'s return, star ratings, or a "cheap" ₹10 new fund.'],
    qs:[
     {t:'mcq', q:'Which of these is NOT a good way to pick a fund?', opts:['Direct plan, Growth option','5+ years of history','Highest return last year','Low expense ratio'], a:2, why:'Last year\'s winner is often next year\'s average.'},
     {t:'mcq', q:'A new fund launches (an NFO) at ₹10 NAV. Is it a bargain?', opts:['Yes, ₹10 is cheap','No, the NAV says nothing about value'], a:1, why:'A low NAV isn\'t cheap, and a new fund has no track record yet.'}
    ]},
  { title:'Where to buy',
    body:['Use a platform that offers **Direct** plans, e.g. Kuvera, Zerodha Coin, Groww, Paytm Money, MF Central or the AMC\'s own site.',
          'Before paying, check the fund name says "Direct".'],
    ex:['"ABC Nifty 50 Index Fund – Direct – Growth" ✓','"ABC Nifty 50 Index Fund – Regular – IDCW" ✗'],
    qs:[
     {t:'mcq', q:'How do you confirm you\'re buying the Direct plan?', opts:['The NAV is lower','The fund name says "Direct"','The app is free','The fund is new'], a:1, why:'It\'s in the official name.'}
    ]}
 ]},
 { name:'Staying the course', ideas:[
  { title:'SIP habits',
    body:['Set your SIP date 2–3 days after salary day. Raise it about 10% every year (a **step-up**), like moving up a shoe size as you grow.',
          'Keep it running in crashes. Falls are when a SIP buys the most units.'],
    ex:[['Year 1 SIP','₹10,000'],['Year 2: + 10% (₹1,000)','₹11,000']],
    qs:[
     {t:'mcq', q:'The market crashes 25%. What should you do with your SIP?', opts:['Stop until things recover','Keep it running; it now buys more units','Sell everything','Switch to a one-industry fund'], a:1, why:'Stopping means missing the cheapest units.'}
    ]},
  { title:'Rebalance once a year',
    body:['Markets push your mix away from plan, like a plant growing out of shape. Once a year, if equity has drifted **5–10 points** from plan, trim it back.',
          'You sell a bit of what grew and add to what lagged, so your risk stays where you planned it.'],
    ex:[['Plan','60% equity, 40% debt'],['After a rally, on ₹10 lakh','₹7 lakh equity (70%)'],['60% of ₹10 lakh','₹6 lakh'],['Move from equity to debt','₹1 lakh']],
    qs:[
     {t:'mcq', q:'When should you rebalance?', opts:['Every week','When equity drifts about 5–10 points from plan, checked yearly','Never','After bad news'], a:1, why:'Once a year avoids overreacting.'},
     {t:'num', q:'Your plan is 50% equity. Your ₹8 lakh portfolio now has ₹5 lakh in equity. How much should move out of equity?', a:100000, tol:0, prefix:'₹', why:'Target is ₹4 lakh, so move ₹1 lakh.', work:['Target equity = 50% (half) of ₹8 lakh = ₹4 lakh','You have ₹5 lakh in equity','₹5 lakh − ₹4 lakh = ₹1 lakh = ₹1,00,000']}
    ]},
  { title:'When to replace a fund',
    body:['One bad quarter is noise. Replace a fund only after **2–3 years** of doing worse than both its benchmark and similar funds.',
          'That completes the loop: base, goals, buckets, funds, SIPs, yearly review.'],
    ex:['Base → Goals → Buckets → Funds → SIPs → Yearly review'],
    qs:[
     {t:'mcq', q:'When should you replace a fund?', opts:['After one bad quarter','After 2–3 years behind its benchmark and similar funds','When a friend suggests another','When the NAV falls'], a:1, why:'Steady underperformance is the signal.'},
     {t:'order', q:'Put the DIY steps in order', items:['Emergency fund and insurance','List goals with year and amount','Match goals to buckets','Pick 3–4 funds','Start SIPs','Review once a year'], why:'Foundation first; review is the step you repeat.'}
    ]}
 ]}
]}
];

export const PCT = { id:'pct', label:'Percent', title:'Percentages for investors', glyph:'%', levels:[
 { name:'What % means', ideas:[
  { title:'Percent means "out of every ₹100"',
    body:['**%** is short for "out of every 100". When a fund says its fee is **1%**, it means ₹1 out of every ₹100 you have in it.',
          'Picture 100 boxes. 10% is 10 boxes coloured in, 50% is half, 100% is all of them.'],
    viz:{type:'grid',n:10,cap:'10% = 10 boxes out of 100'},
    ex:[['Expense ratio 1%','₹1 per ₹100'],['A stock rises 10%','₹10 more per ₹100'],['Market falls 25%','₹25 less per ₹100'],['50% in equity','Half your money']],
    qs:[
     {t:'mcq', q:'Your portfolio is 25% in debt funds. What does that mean?', opts:['₹25 out of every ₹100 is in debt','₹25 in total is in debt','A quarter of ₹1,000 is in debt','25 debt funds'], a:0, why:'% is always "out of every 100", whatever the total.'},
     {t:'num', q:'A fund charges a 2% yearly fee. How much is that for every ₹100 you hold?', a:2, tol:0, prefix:'₹', why:'2% = ₹2 out of every ₹100.', work:['2% means 2 out of every 100','So ₹2 for every ₹100']}
    ]}
 ]},
 { name:'Four shortcuts', ideas:[
  { title:'10%, 1%, 50% and 5% in your head',
    body:['**10%** → knock off one zero. **1%** → knock off two zeros. **50%** → half. **5%** → half of 10%.',
          'With these four you can do almost every fund calculation without a calculator.'],
    viz:{type:'blocks',base:200000,items:[['100%',200000],['50%',100000],['10%',20000],['5%',10000],['1%',2000]]},
    ex:[['Portfolio','₹2,00,000'],['10% (one zero off)','₹20,000'],['1% (two zeros off)','₹2,000'],['50% (half)','₹1,00,000'],['5% (half of 10%)','₹10,000']],
    qs:[
     {t:'num', q:'Your ₹50,000 portfolio falls 10%. How many rupees did you lose?', a:5000, tol:0, prefix:'₹', why:'10% = knock off one zero = ₹5,000.', work:['10% = knock off one zero','₹50,000 → ₹5,000']},
     {t:'num', q:'You redeem ₹1,20,000 with a 1% exit load. What is the fee?', a:1200, tol:0, prefix:'₹', why:'1% = knock off two zeros = ₹1,200.', work:['1% = knock off two zeros','₹1,20,000 → ₹1,200']},
     {t:'num', q:'A share worth ₹4,000 rises 5%. By how many rupees did it rise?', a:200, tol:0, prefix:'₹', why:'10% is ₹400; 5% is half: ₹200.', work:['10% of ₹4,000 = ₹400','5% is half of 10%','Half of ₹400 = ₹200']}
    ]}
 ]},
 { name:'Building any %', ideas:[
  { title:'Build odd percentages from blocks',
    body:['For any other %, add up the shortcuts like blocks. **20%** = 10% twice. **15%** = 10% + 5%. **12.5%** = 10% + 2.5% (2.5% is a quarter of 10%). **0.5%** = half of 1%.',
          'These are exactly the rates you meet in funds: 20% short-term tax, 12.5% long-term tax, 0.5% fees.'],
    ex:[['12.5% tax on a ₹80,000 gain',''],['10%','₹8,000'],['2.5% (quarter of ₹8,000)','₹2,000'],['Total 12.5%','₹10,000']],
    qs:[
     {t:'num', q:'Short-term equity tax is 20%. Your short-term gain is ₹30,000. What is the tax?', a:6000, tol:0, prefix:'₹', why:'10% is ₹3,000, so 20% is ₹6,000.', work:['10% of ₹30,000 = ₹3,000','20% = 10% twice','₹3,000 + ₹3,000 = ₹6,000']},
     {t:'num', q:'Long-term tax is 12.5%. Your taxable gain is ₹40,000. What is the tax?', a:5000, tol:0, prefix:'₹', why:'10% is ₹4,000, 2.5% is ₹1,000, total ₹5,000.', work:['10% of ₹40,000 = ₹4,000','2.5% = a quarter of ₹4,000 = ₹1,000','12.5% = ₹4,000 + ₹1,000 = ₹5,000']},
     {t:'num', q:'A fund\'s expense ratio is 0.5%. You hold ₹3,00,000. Roughly what is the yearly fee?', a:1500, tol:0, prefix:'₹', why:'1% is ₹3,000, so 0.5% is ₹1,500.', work:['1% of ₹3,00,000 = knock off two zeros = ₹3,000','0.5% is half of 1%','Half of ₹3,000 = ₹1,500']}
    ]}
 ]},
 { name:'Rises, falls and % change', ideas:[
  { title:'Adding and taking away a %',
    body:['If your investment **rises** by a %, find that % and **add** it. If it **falls**, find it and **take it away**.'],
    ex:[['₹5,00,000 portfolio falls 20%',''],['20% of ₹5,00,000','₹1,00,000'],['Now worth','₹4,00,000']],
    qs:[
     {t:'num', q:'Your ₹2,00,000 portfolio rises 15%. What is it worth now?', a:230000, tol:0, prefix:'₹', why:'15% is ₹30,000, so ₹2,30,000.', work:['10% of ₹2,00,000 = ₹20,000','5% = half of that = ₹10,000','15% = ₹30,000','₹2,00,000 + ₹30,000 = ₹2,30,000']}
    ]},
  { title:'Working out the % change',
    body:['Apps show "+25%" on a holding. To work it out: **change ÷ starting value**, then turn it into a %.',
          'Easy way: find 10% of the starting value, then see how many of those 10%s fit into the change.'],
    ex:[['NAV moved ₹40 → ₹50',''],['Change','₹10'],['10% of ₹40','₹4'],['₹10 is 2.5 lots of ₹4','2.5 × 10% = 25%']],
    qs:[
     {t:'num', q:'A fund\'s NAV went from ₹200 to ₹250. What % did it rise?', a:25, tol:0, suffix:'%', why:'Change ₹50; 10% of ₹200 is ₹20; ₹50 is 2.5 of those = 25%.', work:['Change = ₹250 − ₹200 = ₹50','10% of ₹200 = ₹20','₹50 ÷ ₹20 = 2.5','2.5 × 10% = 25%']},
     {t:'num', q:'Your ₹80,000 holding is now worth ₹72,000. What % did it fall?', a:10, tol:0, suffix:'%', why:'Fall ₹8,000 is exactly 10% of ₹80,000.', work:['Fall = ₹80,000 − ₹72,000 = ₹8,000','10% of ₹80,000 = ₹8,000','So the fall is 10%']}
    ]},
  { title:'Falls hurt more than rises help',
    body:['Each % is worked out on **the amount at that moment**. After a fall you start from a smaller amount, so the same % rise brings back fewer rupees.',
          'That\'s why a 20% fall followed by a 20% rise leaves you below where you began, and a 50% fall needs a **100%** rise to recover.'],
    ex:[['Start','₹1,00,000'],['Falls 20% (−₹20,000)','₹80,000'],['Rises 20% of ₹80,000 (+₹16,000)','₹96,000'],['Falls 50%, then needs to double','₹50,000 → ₹1,00,000']],
    qs:[
     {t:'tf', q:'If your fund falls 20% and then rises 20%, you are back where you started.', a:false, why:'₹100 → ₹80 → ₹96. The rise is on a smaller amount.'},
     {t:'num', q:'Your fund falls 50%. What % rise does it need to get back to where it started?', a:100, tol:0, suffix:'%', why:'₹100 → ₹50. Getting back to ₹100 means gaining ₹50 on ₹50 = 100%.', work:['Start ₹100, fall 50% → ₹50','To get back to ₹100 it must gain ₹50','₹50 gain on ₹50 = the whole amount again = 100%']}
    ]},
  { title:'Compounding: growth on growth',
    body:['The flip side works for you. When returns stay invested, next year\'s % is worked out on a **bigger** amount, so growth speeds up. That\'s **compounding**.',
          'Two years of 10% is 21%, not 20%. Over 20 years, the gap becomes huge.'],
    ex:[['Start','₹1,00,000'],['Year 1: +10%','₹1,10,000'],['Year 2: +10% of ₹1,10,000 (₹11,000)','₹1,21,000']],
    qs:[
     {t:'num', q:'₹1,00,000 grows 10% a year for 2 years. What is it worth at the end?', a:121000, tol:0, prefix:'₹', why:'₹1,00,000 → ₹1,10,000 → ₹1,21,000.', work:['Year 1: 10% of ₹1,00,000 = ₹10,000 → ₹1,10,000','Year 2: 10% of ₹1,10,000 = ₹11,000','₹1,10,000 + ₹11,000 = ₹1,21,000']}
    ]}
 ]}
]};

export const CARDS = [
 {lv:'u1-0',term:'Mutual fund',simple:'A big shared basket of money that one expert invests for everyone.',like:'Friends chipping in for a giant pizza no one could buy alone.',ex:'1,000 people × ₹10,000 = a ₹1 crore basket.'},
 {lv:'u1-0',term:'Units',simple:'Your slices of the basket.',like:'Pizza slices: put in more money, get more slices.',ex:'Invest twice as much on the same day → twice the units.'},
 {lv:'u1-0',term:'NAV',simple:'The price of one slice, set once every evening.',like:'A price tag that is updated once a day.',ex:'₹1 crore basket ÷ 10 lakh units = ₹10 per unit.'},
 {lv:'u1-1',term:'Expense ratio',simple:'The yearly fee the fund keeps for running things.',like:'A small service charge taken quietly every day.',ex:'1% on ₹1 lakh ≈ ₹1,000 a year.'},
 {lv:'u1-1',term:'Direct plan',simple:'Buying straight from the fund company, no middleman.',like:'Buying mangoes from the farm instead of the shop.',ex:'Same fund as Regular, lower fee.'},
 {lv:'u1-1',term:'Regular plan',simple:'Buying through a middleman who earns a cut.',like:'The shop adds its margin to the farm price.',ex:'About 0.5–1% a year more in fees.'},
 {lv:'u1-2',term:'AMC',simple:'The company that runs the fund.',like:'The restaurant company.',ex:'HDFC AMC, Parag Parikh AMC.'},
 {lv:'u1-2',term:'Fund manager',simple:'The expert who decides what to buy.',like:'The chef choosing the ingredients.'},
 {lv:'u1-2',term:'AUM',simple:'All the money inside a fund.',like:'How big the whole pot of food is.',ex:'A fund with ₹10,000 crore AUM.'},
 {lv:'u1-2',term:'SEBI',simple:'The government referee for funds.',like:'The referee who makes sure every team plays by the rules.'},
 {lv:'u1-2',term:'AMFI',simple:'The club of all fund companies.',like:'A residents\' association that also registers the salespeople (distributors).'},
 {lv:'u1-2',term:'Custodian',simple:'The bank that safely holds the fund\'s investments.',like:'A locker kept outside the restaurant, so the food is safe even if the restaurant closes.'},
 {lv:'u1-2',term:'Folio number',simple:'Your account number with one fund company.',like:'Your membership number at one shop.'},
 {lv:'u2-0',term:'Equity fund',simple:'Owns small pieces of companies.',like:'Owning part of a shop: its good and bad days are partly yours.',ex:'Can fall 30–40% in a bad year. Give it 5+ years.'},
 {lv:'u2-0',term:'Debt fund',simple:'Lends money and earns interest.',like:'Lending to a neighbour who pays you back with a little extra.',ex:'Steadier than equity, but not risk-free.'},
 {lv:'u2-0',term:'Liquid fund',simple:'Lends for a very short time, up to 91 days.',like:'Lending a friend money till next week: very little can go wrong.',ex:'A good home for your emergency fund.'},
 {lv:'u2-1',term:'Large cap',simple:'The 100 biggest companies.',like:'Big ships: steady in rough water.'},
 {lv:'u2-1',term:'Mid cap',simple:'Companies ranked 101 to 250 by size.',like:'Medium boats: faster, but rockier.'},
 {lv:'u2-1',term:'Small cap',simple:'Companies ranked 251 onwards.',like:'Speedboats: fast, and every wave hits hard.',ex:'Give it 7+ years.'},
 {lv:'u2-1',term:'Flexi cap',simple:'The manager may choose companies of any size.',like:'A chef free to pick any ingredients.'},
 {lv:'u2-1',term:'Multi cap',simple:'At least 25% each in big, medium and small companies.',like:'A thali with a fixed portion of every dish.'},
 {lv:'u2-2',term:'Hybrid fund',simple:'A mix of shares and loans.',like:'A meal that is half sweet, half savoury.',ex:'Fits goals 3–5 years away.'},
 {lv:'u2-2',term:'Index fund',simple:'Copies a fixed list of companies, like the Nifty 50.',like:'Following a recipe exactly: no chef needed, so it\'s cheap.',ex:'Fees often 0.1–0.3% a year.'},
 {lv:'u2-2',term:'ETF',simple:'An index fund you buy on the stock exchange.',like:'The same recipe, sold at a different counter.'},
 {lv:'u2-2',term:'ELSS Tax Saver',simple:'A tax-saving equity fund locked for 3 years.',like:'A piggy bank you can\'t open for 3 years.'},
 {lv:'u2-2',term:'Arbitrage fund',simple:'Earns from tiny price gaps between two markets.',like:'Buying a mango for ₹10 at one stall and selling it for ₹10.20 at the next, at the same moment.'},
 {lv:'u2-2',term:'Life Cycle Fund',simple:'Gets safer as your goal year gets closer. New in 2026.',like:'A car slowing down as it nears its stop.'},
 {lv:'u3-0',term:'SIP',simple:'Investing the same amount every month, automatically.',like:'A gym membership, but for saving.',ex:'₹5,000 on the 5th of every month.'},
 {lv:'u3-0',term:'Rupee cost averaging',simple:'The same money buys more units when prices are low.',like:'Your ₹100 buys more mangoes in mango season.'},
 {lv:'u3-0',term:'STP',simple:'Moving a big amount into equity bit by bit.',like:'Getting into a cold pool one step at a time.'},
 {lv:'u3-1',term:'Exit load',simple:'A fee for leaving too early.',like:'A cancellation fee.',ex:'Often 1% if you sell equity within a year.'},
 {lv:'u3-1',term:'SWP',simple:'Taking out a fixed amount every month.',like:'Paying yourself a salary from your savings.'},
 {lv:'u3-1',term:'Switch',simple:'Moving money between two funds of the same company.',like:'Exchanging a dish at the same restaurant. It still counts as a sale.'},
 {lv:'u3-1',term:'Growth option',simple:'Profits stay inside and keep growing.',like:'Replanting the seeds from your harvest.'},
 {lv:'u3-1',term:'IDCW',simple:'The fund pays some money out now and then.',like:'Cutting a slice off your own cake: the cake gets smaller.'},
 {lv:'u3-2',term:'KYC',simple:'A one-time identity check.',like:'Showing your ID once at the building gate.'},
 {lv:'u3-2',term:'Mandate',simple:'Permission for your bank to auto-pay your SIP.',like:'Auto-pay for your electricity bill.'},
 {lv:'u3-2',term:'Cut-off time',simple:'The deadline for getting today\'s NAV.',like:'A restaurant\'s last-order time.',ex:'3 pm, or 1:30 pm for liquid funds.'},
 {lv:'u3-2',term:'RTA (CAMS, KFintech)',simple:'The back office that keeps everyone\'s fund records.',like:'The school office that keeps every student\'s file.'},
 {lv:'u3-2',term:'CAS',simple:'One statement showing all your funds.',like:'One report card with every subject.'},
 {lv:'u4-0',term:'Absolute return',simple:'Total % gain, ignoring how long it took.',like:'Saying "I grew 10 cm" without saying over how many years.'},
 {lv:'u4-0',term:'CAGR',simple:'The steady yearly growth rate.',like:'The average speed of a road trip.',ex:'₹1 lakh → ₹2 lakh in 6 years ≈ 12% a year.'},
 {lv:'u4-0',term:'Compounding',simple:'Growth that also grows, because returns stay invested.',like:'A snowball that picks up more snow because it is already big.',ex:'₹1 lakh at 10% → ₹1.1 lakh → ₹1.21 lakh.'},
 {lv:'u4-0',term:'Rule of 72',simple:'72 ÷ yearly % ≈ years to double your money.',like:'A quick mental shortcut, no calculator needed.',ex:'At 12%: 72 ÷ 12 = 6 years.'},
 {lv:'u4-0',term:'XIRR',simple:'The yearly return when money goes in on many dates.',like:'Average speed when friends joined the trip at different stops.'},
 {lv:'u4-1',term:'Rolling returns',simple:'Checking every period, not just one lucky one.',like:'Judging a batsman on every match, not one century.'},
 {lv:'u4-1',term:'Benchmark',simple:'The index a fund compares itself with.',like:'The class average you compare your marks with.'},
 {lv:'u4-1',term:'Riskometer',simple:'SEBI\'s 6-step risk label.',like:'A spice meter, from mild to very hot.'},
 {lv:'u4-2',term:'Standard deviation',simple:'How bumpy the returns are.',like:'How bumpy the road is.'},
 {lv:'u4-2',term:'Beta',simple:'How much the fund moves compared with the market.',like:'A boat that rocks less (under 1) or more (over 1) than the waves.'},
 {lv:'u4-2',term:'Max drawdown',simple:'The biggest fall from a high to a low.',like:'The deepest dip on a rollercoaster.'},
 {lv:'u4-2',term:'Sharpe ratio',simple:'Reward earned for each unit of bumpiness.',like:'Marks scored per hour studied.'},
 {lv:'u4-2',term:'Alpha',simple:'Extra return the manager added.',like:'Marks above what was expected of you.'},
 {lv:'u4-2',term:'YTM',simple:'Roughly what a debt fund expects to earn if nothing changes.',like:'The interest rate printed on a loan.'},
 {lv:'u4-2',term:'Modified duration',simple:'How much a debt fund falls when interest rates rise by 1%.',like:'How far a seesaw tips.',ex:'Duration 3 → about 3% fall.'},
 {lv:'u5-0',term:'Capital gain',simple:'Your profit when you sell.',like:'Selling your cycle for more than you paid.'},
 {lv:'u5-0',term:'STCG (equity)',simple:'Equity sold within 12 months: 20% tax.',like:'The "in a hurry" rate.'},
 {lv:'u5-0',term:'LTCG (equity)',simple:'Equity held over 12 months: 12.5% on gains above ₹1.25 lakh a year.',like:'A reward for being patient.'},
 {lv:'u5-1',term:'Slab rate',simple:'Your normal income-tax rate, the same as on salary.',like:'No special treatment.',ex:'Applies to debt fund gains (units bought after April 2023).'},
 {lv:'u5-2',term:'First in, first out',simple:'When you sell, your oldest units go first.',like:'A queue: whoever came first leaves first.'},
 {lv:'u5-2',term:'Tax-gain harvesting',simple:'Booking up to ₹1.25 lakh of tax-free gain each year, then reinvesting.',like:'Using a yearly free coupon before it expires.'},
 {lv:'u6-0',term:'Emergency fund',simple:'About 6 months of expenses kept safe and easy to reach.',like:'A spare tyre.'},
 {lv:'u6-0',term:'Goal bucket',simple:'Choosing a fund type by when you need the money.',like:'Short trip, small bag; long trip, big suitcase.'},
 {lv:'u6-1',term:'Overlap',simple:'Two funds owning the same companies.',like:'Ordering two thalis with the same dishes.'},
 {lv:'u6-1',term:'NFO',simple:'A brand-new fund being launched.',like:'A new restaurant with no reviews yet.'},
 {lv:'u6-2',term:'Step-up SIP',simple:'Raising your SIP a little every year.',like:'Moving up a shoe size as you grow.'},
 {lv:'u6-2',term:'Rebalancing',simple:'Bringing your mix back to plan once a year.',like:'Trimming a plant back into shape.'}
];
