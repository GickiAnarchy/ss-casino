# S&S Casino Hub

A static, virtual-chip casino game with Classic Slots, Gem Quest 5-Reel Slots, Coin Toss, Blackjack 21, simulated horse and car races, a daily bonus wheel, player leveling, and a demo jackpot shared locally across profiles in the same browser.

## Local saves

Game data stays local in password-protected profiles encrypted in this browser; no Firebase project or online save service is used. Each profile keeps separate progress and preferences, while the demo jackpot is shared in browser-local storage. From the **LOCAL SAVE** button, download or import a JSON backup for the active profile. Supported desktop browsers can also link a JSON file and update it automatically as you play. Backups contain game data only and are not encrypted; profile passwords cannot be recovered.

See [`LOCAL_SAVES.md`](./LOCAL_SAVES.md) for backup, restore, and linked-file details.

This game uses virtual credits only. It does not support deposits, cashouts, or real-money gambling.

New profiles and an intentional casino-data reset start with **$100.00**. Existing saved profile balances are preserved. Classic 3-Reel and Gem Quest remain high-stakes rooms with a $5 minimum; the lobby also includes Citrus Garden Penny Slots ($0.05–$5.00), Neon Midway Quarter Slots ($0.25–$25.00), and Deep Sea Gem Quest ($0.25–$25.00). Wagers step in the table's displayed denomination and payouts retain cent precision.

## Reusable slot themes

The three-reel and Gem Quest layouts are reusable HTML templates in `index.html`. `slot-templates.js` supplies game configurations, stake limits, theme palettes, symbol overrides (emoji or image assets), and reel-stop/win sound presets. To add a themed game, add a catalog entry that selects `classic` or `five-reel`, points at the matching template, and references a theme; the shared engines handle wagers, spins, and payouts.

## Simulated horse and car racing

Horse and car races are generated in the browser every hour from 7 AM through 9 PM, alternating between the two circuits on the device's local clock. Horse races start at 7 AM and every two hours after that; car races start at 8 AM and every two hours after that. There are no scheduled races overnight; racing stays closed until previews and betting reopen 45 minutes before the next morning's 7 AM race. Upcoming race details remain hidden until that 45-minute window opens. Horse races field six entrants and car races field eight from their larger stables; bets close five minutes before a start. Every race receives a repeatable pseudo-random sprint duration between 110 and 200 seconds (1:50–3:20), so a refresh does not change its timing or result. Starts and wins are tracked for each horse and car, and experience/form feed into future ability, displayed win chances, and odds.

An unsettled ticket, runner experience, and unread result notice are saved with the active encrypted local profile and included in save backups. If a player leaves before the finish, missed races advance experience and the wager settles when they return. Only one ticket can be open across both circuits at a time. These local simulations do not use a live sports feed or server.
