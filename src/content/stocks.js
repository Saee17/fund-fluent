// Stock market section. Indian market rules as generally known up to mid-2026.

export const STOCK_UNITS = [
{ id:'s1', title:'Getting started', glyph:'D', levels:[
 { name:'Demat and trading accounts', ideas:[
  { title:'Two accounts you need',
    body:['To buy shares you need a **trading account** and a **demat account**. The trading account is where you **place orders**. The demat account is where the shares are **kept**, electronically.',
          'Think of the trading account as the shop counter and the demat account as your locker. Most brokers open both together, linked to your bank account.'],
    ex:[['Trading account','Places buy and sell orders'],['Demat account','Holds your shares'],['Bank account','Money goes in and out']],
    qs:[
     {t:'match', q:'Match each account to its job', pairs:[['Trading account','Places your orders'],['Demat account','Holds your shares'],['Bank account','Sends and receives money']], why:'All three work together.'},
     {t:'tf', q:'Your shares are kept in your trading account.', a:false, why:'They sit in your demat account.'}
    ]},
  { title:'Depositories and DPs',
    body:['India has two **depositories** that actually hold everyone\'s shares: **NSDL** and **CDSL**. Your broker acts as a **depository participant (DP)**, a branch that connects you to one of them.',
          'Because your shares are recorded with the depository, they stay yours even if your broker shuts down.'],
    ex:[['Depositories','NSDL, CDSL'],['Depository participant','Usually your broker'],['If the broker shuts','Shares stay in your demat; move them to a new DP']],
    qs:[
     {t:'mcq', q:'Which two organisations hold shares for investors in India?', opts:['NSDL and CDSL','NSE and BSE','SEBI and RBI','CAMS and KFintech'], a:0, why:'NSE and BSE are exchanges; NSDL and CDSL are depositories.'}
    ]},
  { title:'Opening one, and what it costs',
    body:['You need **PAN**, **Aadhaar** (for e-KYC), a **bank account**, and a signature. Most brokers do it online in a day or two.',
          'Watch the charges: account opening (often free), a yearly **annual maintenance charge (AMC)** on the demat account, and a **DP charge** each time you sell a stock.'],
    ex:[['Account opening','Often ₹0'],['Annual maintenance','₹0 to a few hundred a year'],['DP charge when you sell','Around ₹13–₹20 per stock per day']],
    qs:[
     {t:'mcq', q:'When do you usually pay a DP charge?', opts:['When you sell a stock from your demat','Every time you log in','When you buy a mutual fund','Every month'], a:0, why:'It\'s charged when shares leave your demat.'}
    ]}
 ]},
 { name:'Exchanges and indices', ideas:[
  { title:'NSE, BSE and market hours',
    body:['Shares are bought and sold on **stock exchanges**. India\'s two main ones are the **NSE** and the **BSE**. Most large companies are listed on both.',
          'Normal trading runs **9:15 am to 3:30 pm**, Monday to Friday, with a short **pre-open** session from 9:00 to 9:15 am. Markets are shut on weekends and listed holidays.'],
    ex:[['Pre-open','9:00–9:15 am'],['Normal trading','9:15 am–3:30 pm'],['Weekends','Closed']],
    qs:[
     {t:'mcq', q:'When does normal trading on NSE and BSE run?', opts:['9:15 am to 3:30 pm, weekdays','24 hours','10 am to 5 pm','Only on weekends'], a:0, why:'Weekdays 9:15 to 3:30.'}
    ]},
  { title:'Indices: the market\'s thermometer',
    body:['An **index** tracks a basket of companies to show how the market is doing. The **Nifty 50** follows 50 large companies on the NSE. The **Sensex** follows 30 on the BSE.',
          'Other common ones: **Nifty Bank** (banks), **Nifty Next 50** (the next 50 by size), and **Nifty Midcap 150**. "The market fell 1% today" usually means the Nifty or Sensex did.'],
    ex:[['Nifty 50','50 companies, NSE'],['Sensex','30 companies, BSE'],['Nifty Bank','Banking stocks']],
    qs:[
     {t:'match', q:'Match the index to what it tracks', pairs:[['Nifty 50','50 large NSE companies'],['Sensex','30 large BSE companies'],['Nifty Bank','Banking stocks'],['Nifty Next 50','The next 50 by size']], why:'These are the ones in the news every day.'}
    ]}
 ]},
 { name:'Your first investment', ideas:[
  { title:'Funds or direct stocks?',
    body:['Buying stocks yourself means researching companies, tracking results, and deciding when to sell. A mutual fund does that for you for a fee.',
          'A sensible start: keep your core in index or flexi cap funds, and use only a **small slice**, say 10–20%, for stocks you want to learn with.'],
    ex:[['Core','Index or flexi cap funds'],['Learning slice','10–20% in stocks you research'],['Never','Your emergency fund']],
    qs:[
     {t:'mcq', q:'What\'s a sensible way to begin with direct stocks?', opts:['A small slice alongside a fund-based core','All savings into one hot stock','Your emergency fund','Borrowed money'], a:0, why:'Learn with money you can afford to get wrong.'}
    ]},
  { title:'ETFs: an index in your demat',
    body:['An **ETF** (exchange-traded fund) is an index fund that trades like a share. Buy a Nifty 50 ETF and you own a tiny slice of all 50 companies, in your demat account.',
          'Its price moves through the day, and you pay normal trading charges. It\'s a simple first purchase on a new trading account.'],
    ex:['Buy 10 units of a Nifty 50 ETF at ₹250 → ₹2,500 spread across 50 companies.'],
    qs:[
     {t:'num', q:'You buy 20 units of an ETF at ₹250 each. How much do you pay, before charges?', a:5000, tol:0, prefix:'₹', why:'20 × ₹250 = ₹5,000.', work:['Units × price','20 × ₹250','2 × 250 = 500, so 20 × 250 = 5,000']}
    ]}
 ]}
]},
{ id:'s2', title:'Placing orders', glyph:'⇅', levels:[
 { name:'Order types', ideas:[
  { title:'Market order vs limit order',
    body:['A **market order** buys or sells **right now** at the best price available. Fast, but the price may be a little different from what you saw.',
          'A **limit order** says "only at **this price or better**". It may not fill if the price never reaches your limit, but you never pay more than you set.'],
    ex:[['Market order to buy','Fills now at ≈ ₹502'],['Limit order to buy at ₹498','Fills only if price drops to ₹498 or lower']],
    qs:[
     {t:'mcq', q:'You want to buy only if the price is ₹480 or lower. Which order?', opts:['Limit order at ₹480','Market order','Stop-loss sell order','No order needed'], a:0, why:'A limit order sets your maximum buy price.'},
     {t:'tf', q:'A market order guarantees the exact price you saw on screen.', a:false, why:'It guarantees speed, not price.'}
    ]},
  { title:'Stop-loss orders',
    body:['A **stop-loss** sells automatically if the price falls to a **trigger** you set, to limit your loss.',
          '**SL** (stop-loss limit) places a limit order once triggered, so it may not fill in a fast fall. **SL-M** (stop-loss market) places a market order, so it fills but maybe at a worse price.'],
    ex:[['You bought at','₹500'],['Stop-loss trigger','₹460'],['Price falls to ₹460','Your sell order fires']],
    qs:[
     {t:'num', q:'You bought at ₹600 and want to cap your loss at 10%. Where should the stop-loss trigger be?', a:540, tol:0, prefix:'₹', why:'10% of ₹600 is ₹60, so ₹540.', work:['10% of ₹600 = ₹60','₹600 − ₹60 = ₹540']}
    ]},
  { title:'GTT and AMO',
    body:['A **GTT** (good till triggered) order waits, often up to a year, until your price is hit, then places the order. Handy for "buy if it ever falls to ₹X".',
          'An **AMO** (after market order) is placed when the market is closed and sent when it opens.'],
    ex:[['GTT','Waits for your price, for days or months'],['AMO','Placed at night, sent at market open']],
    qs:[
     {t:'mcq', q:'You want to buy a stock if it ever drops to ₹900, maybe months from now. Which order?', opts:['GTT','AMO','Market order','Intraday order'], a:0, why:'GTT waits until the trigger is hit.'}
    ]}
 ]},
 { name:'Delivery, intraday and settlement', ideas:[
  { title:'Delivery vs intraday',
    body:['**Delivery** (often called CNC) means you buy and keep the shares in your demat for as long as you like.',
          '**Intraday** (MIS) means you must close the trade the **same day**. Brokers offer leverage for it, which magnifies gains and losses. Most beginners lose money trading intraday.'],
    ex:[['Delivery','Hold for days or years'],['Intraday','Must close before the market shuts']],
    qs:[
     {t:'mcq', q:'Which kind of trade must be closed the same day?', opts:['Intraday','Delivery','SIP','GTT'], a:0, why:'Intraday positions are squared off by close.'}
    ]},
  { title:'Bid, ask and the spread',
    body:['The **bid** is the highest price buyers are offering right now. The **ask** is the lowest price sellers will accept. The gap is the **spread**.',
          'Busy, well-known stocks have a tiny spread. Thinly traded small stocks can have a wide one, so you lose a bit just by buying and selling.'],
    ex:[['Bid','₹249.90'],['Ask','₹250.10'],['Spread','₹0.20']],
    qs:[
     {t:'num', q:'Bid ₹99.50, ask ₹100.00. What is the spread?', a:0.5, tol:0.001, prefix:'₹', why:'₹100.00 − ₹99.50 = ₹0.50.', work:['Spread = ask − bid','₹100.00 − ₹99.50 = ₹0.50']}
    ]},
  { title:'T+1 settlement',
    body:['When you buy on a trading day (T), the shares reach your demat on the **next working day**: **T+1**.',
          'When you sell, the money is credited to your trading account on T+1 too.'],
    ex:[['Buy on Monday','Shares in demat on Tuesday'],['Buy on Friday','Shares on Monday']],
    qs:[
     {t:'mcq', q:'You buy shares on a Friday. When do they reach your demat?', opts:['Monday, the next working day','The same Friday','Saturday','A week later'], a:0, why:'T+1 counts working days.'}
    ]}
 ]},
 { name:'Costs of trading', ideas:[
  { title:'Brokerage and taxes on each trade',
    body:['Each trade carries small costs: **brokerage** (₹0 on delivery at many discount brokers, often ₹20 per intraday order), **STT** (Securities Transaction Tax, 0.1% on both buying and selling for delivery), exchange charges, **GST** (18% on brokerage and exchange charges), and **stamp duty** when you buy.',
          'They look tiny, but they add up if you trade often.'],
    ex:[['Buy ₹1,00,000 of shares for delivery',''],['STT at 0.1%','₹100'],['Sell them later for ₹1,00,000','Another ₹100 STT'],['Plus small charges and the DP charge on sale','']],
    qs:[
     {t:'num', q:'You buy shares worth ₹50,000 for delivery. STT is 0.1%. How much STT on the purchase?', a:50, tol:0, prefix:'₹', why:'0.1% of ₹50,000 = ₹50.', work:['1% of ₹50,000 = ₹500','0.1% is a tenth of that','₹500 ÷ 10 = ₹50']},
     {t:'tf', q:'Frequent trading can eat into returns even with ₹0 brokerage.', a:true, why:'STT, exchange charges, GST and the spread still apply.'}
    ]}
 ]}
]},
{ id:'s3', title:'Reading a stock', glyph:'P/E', levels:[
 { name:'Price, size and value', ideas:[
  { title:'Share price alone means little',
    body:['Like NAV, a share price on its own tells you nothing about cheap or expensive. A ₹50 share isn\'t "cheaper" than a ₹5,000 one.',
          '**Market cap** = share price × number of shares. It tells you how big the company is in the market\'s eyes.'],
    ex:[['Share price','₹500'],['Shares issued','10 crore'],['Market cap','₹5,000 crore']],
    qs:[
     {t:'num', q:'A company has 2 crore shares at ₹750 each. What is its market cap, in crore?', a:1500, tol:0, prefix:'₹', suffix:'crore', why:'2 crore × ₹750 = ₹1,500 crore.', work:['Market cap = price × shares','₹750 × 2 crore','750 × 2 = 1,500 → ₹1,500 crore']}
    ]},
  { title:'EPS and P/E',
    body:['**EPS** (earnings per share) is the company\'s yearly profit divided by its number of shares.',
          '**P/E** = price ÷ EPS. It\'s how many rupees you pay for each rupee of yearly profit. A P/E of 20 means paying 20 years of current profit. Compare it with similar companies and the company\'s own history, not across industries.'],
    ex:[['Share price','₹600'],['EPS','₹30'],['P/E = 600 ÷ 30','20']],
    qs:[
     {t:'num', q:'Share price ₹900, EPS ₹45. What is the P/E?', a:20, tol:0, why:'900 ÷ 45 = 20.', work:['P/E = price ÷ EPS','900 ÷ 45','45 × 20 = 900, so 20']},
     {t:'mcq', q:'What\'s the fairest way to judge a P/E of 35?', opts:['Compare it with similar companies and the stock\'s own history','Lower is always better','Above 30 is always a bubble','Compare it with a bank FD rate'], a:0, why:'Fast-growing sectors normally carry higher P/Es.'}
    ]},
  { title:'P/B, ROE and debt',
    body:['**P/B** (price to book) compares the price with the company\'s net worth per share. It\'s most useful for banks.',
          '**ROE** (return on equity) shows how much profit the company makes on its owners\' money; 15%+ is generally healthy. **Debt to equity** shows how much it has borrowed; high debt adds risk.'],
    ex:[['ROE 18%','Strong use of owners\' money'],['Debt to equity 2','Borrowed twice its net worth']],
    qs:[
     {t:'match', q:'Match the ratio to what it shows', pairs:[['ROE','Profit made on owners\' money'],['P/B','Price vs net worth per share'],['Debt to equity','How much it has borrowed']], why:'Three quick health checks.'}
    ]}
 ]},
 { name:'Dividends and corporate actions', ideas:[
  { title:'Dividends',
    body:['A **dividend** is a share of profit paid out per share. To get it you must own the share before the **record date**; the share price usually drops by about the dividend amount on the **ex-date**.',
          'Dividends are taxed at your **slab rate**, with 10% TDS if they exceed ₹10,000 from one company in a year.'],
    ex:[['Dividend per share','₹8'],['You own','250 shares'],['Dividend received','₹2,000']],
    qs:[
     {t:'num', q:'A company pays ₹5 per share. You own 300 shares. How much dividend do you get?', a:1500, tol:0, prefix:'₹', why:'300 × ₹5 = ₹1,500.', work:['Dividend × shares','₹5 × 300 = ₹1,500']},
     {t:'tf', q:'A dividend is extra money on top of the share\'s value, with no effect on the price.', a:false, why:'The price usually drops by about the dividend on the ex-date.'}
    ]},
  { title:'Bonus issues and splits',
    body:['In a **bonus issue**, you get extra free shares, say 1 for every 1 you hold. In a **stock split**, each share is cut into smaller ones, say ₹10 face value into five ₹2 shares.',
          'Either way you have more shares at a lower price each. The **total value doesn\'t change**: it\'s the same pizza in more slices.'],
    ex:[['Before a 1:1 bonus','100 shares × ₹800 = ₹80,000'],['After','200 shares × ₹400 = ₹80,000']],
    qs:[
     {t:'num', q:'You own 50 shares at ₹1,000. The company splits each share into 5. How many shares do you have now?', a:250, tol:0, suffix:'shares', why:'50 × 5 = 250 shares, each around ₹200. Value unchanged.', work:['Each share becomes 5','50 × 5 = 250']},
     {t:'mcq', q:'After a 1:1 bonus, what happens to your total holding\'s value?', opts:['It stays the same','It doubles','It halves','It drops to zero'], a:0, why:'Twice the shares at half the price.'}
    ]},
  { title:'Buybacks and rights issues',
    body:['In a **buyback**, the company buys its own shares back, often at a premium to the market price. You can choose to tender your shares.',
          'In a **rights issue**, the company offers existing shareholders new shares, usually at a discount, to raise money.'],
    ex:[['Buyback','Company buys shares from you'],['Rights issue','Company sells new shares to you']],
    qs:[
     {t:'mcq', q:'A company offers its existing shareholders new shares at a discount to raise money. What is this?', opts:['Rights issue','Buyback','Stock split','Dividend'], a:0, why:'Rights = the right to buy new shares.'}
    ]}
 ]},
 { name:'How prices move', ideas:[
  { title:'Demand, supply and news',
    body:['A share\'s price moves with **demand and supply**: more buyers than sellers pushes it up. News, quarterly **results**, interest rates and the overall mood all shift that balance.',
          '**Volume** shows how many shares changed hands. A big move on high volume carries more weight than one on very little trading.'],
    ex:['Results beat expectations → more buyers → price rises on high volume.'],
    qs:[
     {t:'tf', q:'A share\'s price is set by the company each morning.', a:false, why:'Buyers and sellers set it, all day long.'}
    ]},
  { title:'Circuit limits and the 52-week range',
    body:['Many stocks have **price bands** (2%, 5%, 10% or 20%) that cap how far they can move in a day. Hitting the top is an **upper circuit**; the bottom, a **lower circuit**. The whole market also pauses if the index falls 10%, 15% or 20% in a day.',
          'The **52-week high and low** show the range a stock has traded in over the past year: useful context, not a buy or sell signal.'],
    ex:[['Stock at ₹200 with a 5% band','Can trade between ₹190 and ₹210 today']],
    qs:[
     {t:'num', q:'A ₹400 stock has a 10% price band. What\'s the highest it can trade today?', a:440, tol:0, prefix:'₹', why:'10% of ₹400 is ₹40, so ₹440.', work:['10% of ₹400 = ₹40','₹400 + ₹40 = ₹440']}
    ]}
 ]}
]},
{ id:'s4', title:'IPOs', glyph:'IPO', levels:[
 { name:'What an IPO is', ideas:[
  { title:'A company lists for the first time',
    body:['An **IPO** (initial public offering) is when a company first sells shares to the public and lists on the exchange.',
          'Money from a **fresh issue** goes to the company. In an **offer for sale (OFS)**, existing owners sell their shares and the money goes to them, not the company. Many IPOs are a mix.'],
    ex:[['Fresh issue','Company raises money to grow'],['Offer for sale','Early investors cash out']],
    qs:[
     {t:'mcq', q:'In an offer for sale, who gets the money?', opts:['The existing shareholders who are selling','The company','SEBI','The stock exchange'], a:0, why:'The company raises nothing from the OFS part.'}
    ]},
  { title:'Price band, lot size and categories',
    body:['The company sets a **price band**, say ₹270–₹285, and a **lot size**, the minimum number of shares per application, say 52.',
          'Shares are reserved for categories: **QIBs** (big institutions), **NIIs** (wealthier individuals) and **retail investors**, who apply for up to **₹2 lakh**.'],
    ex:[['Price band','₹270–₹285'],['Lot size','52 shares'],['One lot at the top price','52 × ₹285 = ₹14,820']],
    qs:[
     {t:'num', q:'Lot size 40 shares, upper price ₹350. How much is one lot at the upper price?', a:14000, tol:0, prefix:'₹', why:'40 × ₹350 = ₹14,000.', work:['Lot size × price','40 × 350','4 × 350 = 1,400 → add a zero: 14,000']},
     {t:'mcq', q:'Up to how much can a retail investor apply for in an IPO?', opts:['₹2 lakh','₹50,000','₹10 lakh','No limit'], a:0, why:'Above ₹2 lakh you fall in the NII category.'}
    ]}
 ]},
 { name:'Applying and allotment', ideas:[
  { title:'Apply with UPI, money only blocked',
    body:['You apply through your broker or bank using **UPI** (the ASBA system). Your money is **blocked**, not taken, while the IPO is open, usually for 3 working days.',
          'If you get shares, only that amount is debited. If not, the block is released.'],
    ex:['Apply for 1 lot of ₹14,820 → ₹14,820 blocked → not allotted → block released.'],
    qs:[
     {t:'tf', q:'When you apply for an IPO with UPI, the money leaves your account immediately.', a:false, why:'It\'s only blocked until allotment.'}
    ]},
  { title:'Oversubscription and the retail lottery',
    body:['If an IPO gets more applications than shares, it\'s **oversubscribed**. In the retail category, allotment is then a **lottery**: lucky applicants get **one lot**, everyone else gets none.',
          'That\'s why applying for many lots in a hugely oversubscribed IPO rarely improves your chances much.'],
    ex:[['Retail portion oversubscribed','50 times'],['Chance of getting a lot','Roughly 1 in 50 applicants']],
    qs:[
     {t:'mcq', q:'The retail portion is oversubscribed 40 times. What usually happens?', opts:['A lottery: some applicants get one lot, most get none','Everyone gets a smaller share of their lots','Only the first applicants get shares','The IPO is cancelled'], a:0, why:'Retail allotment becomes a lottery for one lot each.'}
    ]},
  { title:'Listing day',
    body:['Shares are credited to winners\' demat accounts and the stock **lists** on the exchange about **3 working days** after the IPO closes (T+3).',
          'The opening price can be above or below the issue price. A listing gain isn\'t guaranteed.'],
    ex:[['IPO closes','Tuesday'],['Listing','About Friday']],
    qs:[
     {t:'tf', q:'Every IPO lists above its issue price.', a:false, why:'Many list flat or below.'}
    ]}
 ]},
 { name:'GMP and hype', ideas:[
  { title:'Grey market premium is unofficial',
    body:['**GMP** (grey market premium) is an unofficial number for what people think a share will list at. It comes from an **unregulated** market with no protection.',
          'GMP can swing wildly and vanish before listing. Treat it as gossip, not data.'],
    ex:['GMP ₹80 on Monday → ₹10 on Thursday → lists below the issue price.'],
    qs:[
     {t:'mcq', q:'How reliable is GMP?', opts:['Unofficial and unregulated; it can change or vanish','Guaranteed by SEBI','Set by the stock exchange','The official listing price'], a:0, why:'It\'s grey-market chatter.'}
    ]},
  { title:'Read the prospectus, not the hype',
    body:['The **RHP** (red herring prospectus) explains what the company does, its finances, the **risks**, and what it will do with the money ("objects of the issue").',
          'Check: is it profitable or improving? Is most of the issue an OFS (owners exiting)? Is the valuation high compared to listed peers?'],
    ex:['If 90% of an IPO is an offer for sale, early owners are cashing out. Ask why.'],
    qs:[
     {t:'mcq', q:'Where can you find an IPO\'s risks and how it will use the money?', opts:['The red herring prospectus (RHP)','A WhatsApp group','The GMP','The listing-day price'], a:0, why:'The RHP is the official document.'}
    ]}
 ]}
]},
{ id:'s5', title:'F&O basics', glyph:'F&O', levels:[
 { name:'Futures', ideas:[
  { title:'What a derivative is',
    body:['A **derivative** is a contract whose value comes from something else, like a stock or an index. **F&O** means **futures and options**, the two main kinds.',
          'You don\'t own the share itself. You own a bet on where its price will go, with an expiry date.'],
    ex:['A Nifty future gains when the Nifty rises, loses when it falls.'],
    qs:[
     {t:'mcq', q:'What is a derivative?', opts:['A contract whose value comes from something else, like an index','A type of mutual fund','A share in a company','A bank deposit'], a:0, why:'Its value is derived from another asset.'}
    ]},
  { title:'Futures and leverage',
    body:['A **future** is an agreement to buy or sell at a fixed price on a future date. You put down only a **margin**, a fraction of the full value, so you control a big position with little money. That\'s **leverage**.',
          'Leverage magnifies both ways. Profits and losses are settled every day ("mark to market"), and you can lose more than your margin.'],
    ex:[['Contract value','₹15,00,000'],['Margin put down','₹2,00,000'],['Price falls 5%','Loss ₹75,000 = 37.5% of your margin']],
    qs:[
     {t:'num', q:'You control a ₹10 lakh futures position with ₹1 lakh margin. The price falls 4%. What do you lose, in rupees?', a:40000, tol:0, prefix:'₹', why:'4% of ₹10 lakh = ₹40,000: 40% of your margin.', work:['The loss is on the full contract value','1% of ₹10,00,000 = ₹10,000','4% = ₹40,000']}
    ]}
 ]},
 { name:'Options', ideas:[
  { title:'Calls and puts',
    body:['An **option** gives the buyer a **right, not an obligation**. A **call** is the right to buy at a set price (the **strike**). A **put** is the right to sell at the strike.',
          'The buyer pays a **premium** for that right. Calls gain when prices rise; puts gain when prices fall.'],
    ex:[['Call option','Gains if price rises'],['Put option','Gains if price falls'],['Premium','The price of the option']],
    qs:[
     {t:'match', q:'Match the option to what it does', pairs:[['Call','Right to buy at the strike'],['Put','Right to sell at the strike'],['Premium','Price paid for the right']], why:'The basics of every options screen.'}
    ]},
  { title:'Buyers and sellers',
    body:['An option **buyer** can lose at most the premium paid. But most options **expire worthless**, so buyers often lose that premium.',
          'An option **seller** (writer) collects the premium but takes on the obligation. A big move against them can cause losses far larger than the premium.'],
    ex:[['Buy a call, premium','₹5,000'],['Market doesn\'t move by expiry','Lose the ₹5,000'],['Seller of that call','Keeps ₹5,000, but could lose much more on a big rise']],
    qs:[
     {t:'tf', q:'An option buyer\'s maximum loss is the premium paid.', a:true, why:'The buyer can simply let it expire.'},
     {t:'mcq', q:'Who takes on potentially large losses in an option trade?', opts:['The option seller','The option buyer','The exchange','SEBI'], a:0, why:'Sellers carry the obligation.'}
    ]},
  { title:'Time decay and expiry',
    body:['Options have an **expiry date**. As it gets closer, an option loses value each day if the price doesn\'t move in its favour. This is **time decay**.',
          'Near expiry, prices can swing wildly. That\'s when many beginners lose money.'],
    ex:['Premium ₹100 two weeks before expiry → ₹40 a few days before → ₹0 at expiry if it never moves your way.'],
    qs:[
     {t:'mcq', q:'What happens to an option\'s value as expiry nears, if the price doesn\'t move?', opts:['It shrinks (time decay)','It grows','It stays exactly the same','It doubles'], a:0, why:'Time works against the option buyer.'}
    ]}
 ]},
 { name:'Risks and rules', ideas:[
  { title:'Most individual traders lose',
    body:['SEBI\'s studies found that about **9 in 10** individual F&O traders **lost money**, and many also paid large amounts in costs.',
          'In late 2024 SEBI made F&O harder to gamble with: bigger minimum contract sizes and fewer weekly expiries.'],
    ex:['Out of 10 individual F&O traders, about 9 ended up with a net loss.'],
    qs:[
     {t:'mcq', q:'Roughly how many individual F&O traders lost money, according to SEBI?', opts:['About 9 in 10','About 1 in 10','About half','None'], a:0, why:'That\'s why F&O isn\'t a beginner\'s tool.'}
    ]},
  { title:'What F&O is really for',
    body:['Professionals use F&O mainly to **hedge**: for example, buying puts to protect a large portfolio against a fall.',
          'F&O profits are taxed as **business income** at your slab rate, and frequent trading can require an audit. Learn it, but don\'t start investing with it.'],
    ex:['A fund manager buys Nifty puts before a risky event to cushion a possible fall.'],
    qs:[
     {t:'mcq', q:'How are F&O profits taxed for individuals?', opts:['As business income at the slab rate','At 12.5% like long-term equity','Tax-free','At 20% like short-term equity'], a:0, why:'F&O counts as business income.'}
    ]}
 ]}
]},
{ id:'s6', title:'Stocks and tax', glyph:'₹', levels:[
 { name:'How stock gains are taxed', ideas:[
  { title:'Same rates as equity funds',
    body:['Listed shares follow the same rules as equity mutual funds: sold within **12 months**, **20%** short-term. Held longer, **12.5%** on long-term gains above **₹1.25 lakh** a year.',
          'That ₹1.25 lakh allowance is **shared** between your stocks and equity funds, not separate.'],
    ex:[['Stock held 8 months, gain ₹30,000','20% = ₹6,000'],['Stock held 2 years, gain ₹1,00,000','Within ₹1.25 lakh = ₹0']],
    qs:[
     {t:'num', q:'You sell a stock after 6 months with a ₹50,000 gain. What is the tax (before cess)?', a:10000, tol:0, prefix:'₹', why:'Short-term: 20% of ₹50,000 = ₹10,000.', work:['Held under 12 months → 20%','10% of ₹50,000 = ₹5,000','20% = ₹10,000']},
     {t:'tf', q:'Stocks and equity funds each get their own separate ₹1.25 lakh tax-free allowance.', a:false, why:'It\'s one shared allowance.'}
    ]},
  { title:'Intraday, F&O and dividends',
    body:['**Intraday** profits are treated as **speculative business income**. **F&O** profits are non-speculative business income. Both are taxed at your **slab rate**.',
          '**Dividends** are also taxed at your slab. STT you paid can\'t be deducted from capital gains.'],
    ex:[['Delivery, long term','12.5% above ₹1.25 lakh'],['Intraday','Slab rate'],['F&O','Slab rate'],['Dividends','Slab rate']],
    qs:[
     {t:'match', q:'Match the income to how it\'s taxed', pairs:[['Long-term delivery gain','12.5% above ₹1.25 lakh'],['Short-term delivery gain','20%'],['Intraday profit','Slab rate, speculative'],['Dividends','Slab rate']], why:'Four common cases.'}
    ]}
 ]}
]}
];

export const STOCK_CARDS = [
 {lv:'s1-0',term:'Demat account',simple:'Where your shares are kept electronically.',like:'A locker for shares.'},
 {lv:'s1-0',term:'Trading account',simple:'Where you place buy and sell orders.',like:'The shop counter.'},
 {lv:'s1-0',term:'Depository (NSDL, CDSL)',simple:'The two organisations that hold everyone\'s shares.',like:'The bank vault behind all the lockers.'},
 {lv:'s1-1',term:'Nifty 50',simple:'An index of 50 large NSE companies.',like:'The market\'s thermometer.'},
 {lv:'s1-1',term:'Sensex',simple:'An index of 30 large BSE companies.',like:'The other thermometer.'},
 {lv:'s2-0',term:'Limit order',simple:'Buy or sell only at your price or better.',like:'"I\'ll pay ₹40 for mangoes, not more."'},
 {lv:'s2-0',term:'Stop-loss',simple:'Sells automatically if the price falls to your trigger.',like:'An emergency brake.'},
 {lv:'s2-0',term:'GTT',simple:'An order that waits until your price is hit.',like:'A price alert that also places the order.'},
 {lv:'s2-1',term:'Intraday',simple:'A trade opened and closed the same day.',like:'A same-day return policy.'},
 {lv:'s2-1',term:'Bid–ask spread',simple:'The gap between the best buy and sell prices.',like:'The money-changer\'s margin.'},
 {lv:'s2-1',term:'T+1',simple:'Trades settle on the next working day.',like:'Next-day delivery.'},
 {lv:'s2-2',term:'STT',simple:'Securities Transaction Tax on every trade.',like:'A toll on each trip.',ex:'0.1% on delivery buys and sells.'},
 {lv:'s3-0',term:'Market cap',simple:'Share price × number of shares.',like:'The price tag for the whole company.'},
 {lv:'s3-0',term:'P/E ratio',simple:'Price ÷ earnings per share.',like:'How many years of profit you\'re paying for.',ex:'₹600 ÷ ₹30 = 20.'},
 {lv:'s3-0',term:'ROE',simple:'Profit made on the owners\' money.',like:'Marks per hour of study, for a company.'},
 {lv:'s3-1',term:'Ex-date',simple:'Buy before this date to get the dividend.',like:'The cut-off for the guest list.'},
 {lv:'s3-1',term:'Stock split',simple:'Each share cut into smaller ones; value unchanged.',like:'Cutting a pizza into more slices.'},
 {lv:'s3-1',term:'Bonus issue',simple:'Free extra shares; price adjusts down.',like:'Same cake, more pieces.'},
 {lv:'s3-2',term:'Circuit limit',simple:'The most a stock can move in a day.',like:'A speed limit for prices.'},
 {lv:'s4-0',term:'IPO',simple:'A company selling shares to the public for the first time.',like:'A shop\'s grand opening.'},
 {lv:'s4-0',term:'Offer for sale',simple:'Existing owners selling shares in an IPO.',like:'Early partners cashing out at the opening.'},
 {lv:'s4-1',term:'ASBA / UPI block',simple:'IPO money is blocked, not taken, until allotment.',like:'A hotel holding your card without charging it.'},
 {lv:'s4-2',term:'GMP',simple:'Unofficial grey-market guess at the listing price.',like:'Gossip about a film before it releases.'},
 {lv:'s4-2',term:'RHP',simple:'The IPO\'s official prospectus.',like:'The full menu with ingredients and allergy warnings.'},
 {lv:'s5-0',term:'Derivative',simple:'A contract whose value comes from something else.',like:'A ticket whose price depends on the match.'},
 {lv:'s5-0',term:'Leverage',simple:'Controlling a big position with a small margin.',like:'A seesaw: a small push, a big swing either way.'},
 {lv:'s5-1',term:'Call option',simple:'The right to buy at a set price.',like:'A booking deposit to buy a flat at today\'s price.'},
 {lv:'s5-1',term:'Put option',simple:'The right to sell at a set price.',like:'Insurance against a price fall.'},
 {lv:'s5-1',term:'Time decay',simple:'Options lose value as expiry nears.',like:'Ice cream melting in your hand.'},
 {lv:'s6-0',term:'Speculative income',simple:'Intraday profits, taxed at your slab.',like:'Treated like a side business, not investing.'}
];
