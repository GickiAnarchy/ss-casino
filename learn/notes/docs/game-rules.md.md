# docs/game-rules.md

[Exact copy](../../original/docs/game-rules.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# Virtual-credit game rules
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 2

```text

```

Blank line separates documentation topics.

### Line 3

```text
All balances, stakes, prizes, banking, and jackpots remain browser-local demo chips. There are no payments or cashouts.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: All balances, stakes, prizes, banking, and jackpots remain browser-local demo chips. There are no payments or cashouts.

### Line 4

```text

```

Blank line separates documentation topics.

### Line 5

```text
## Clear Bet and Max
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 6

```text

```

Blank line separates documentation topics.

### Line 7

```text
Slots, both coin games, blackjack, and horse/car racing have separate **Clear bet** and **Max** controls. Clearing sets only the unplaced stake to zero; it never refunds, cancels, or modifies an active hand, bonus, or race ticket. A zero stake cannot start a paid round. Controls lock while their round is active.
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: Slots, both coin games, blackjack, and horse/car racing have separate **Clear bet** and **Max** controls. Clearing sets only the unplaced stake to zero; it never refunds, cancels, or modifies an active hand, bonus, or race ticket. A zero st

### Line 8

```text

```

Blank line separates documentation topics.

### Line 9

```text
Max selects the greatest legal wager at or below the wallet balance and the cabinet/profile limit. Coin and card tables support a cent-valued all-in amount above their $5 minimum. Slots retain their existing denominations and minimums: for example, a $43.27 balance allows $40 on a $5-step table, $5 on the capped penny table, and $25 on the capped quarter table. A balance below a table minimum has no legal paid wager. The permanent profile limit is not reduced when the wallet balance falls.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Max selects the greatest legal wager at or below the wallet balance and the cabinet/profile limit. Coin and card tables support a cent-valued all-in amount above their $5 minimum. Slots retain their existing denominations and minimums: for 

### Line 10

```text

```

Blank line separates documentation topics.

### Line 11

```text
## Three Coin Toss
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 12

```text

```

Blank line separates documentation topics.

### Line 13

```text
Players choose Heads or Tails separately for all three coins before flipping. All outcomes settle together. Zero or one correct prediction returns nothing; two correct returns **1.5×** the stake; three correct returns **3×** the stake. These are total returns, including the original stake—not profit multipliers. The paying tiers double exponentially: `1.5 × 2^(correct − 2)`.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Players choose Heads or Tails separately for all three coins before flipping. All outcomes settle together. Zero or one correct prediction returns nothing; two correct returns **1.5×** the stake; three correct returns **3×** the stake. Thes

### Line 14

```text

```

Blank line separates documentation topics.

### Line 15

```text
With independent fair flips, the unrounded expected gross return is 93.75% of the stake. Cent rounding applies to the final return. This is a deliberate starting balance choice; no existing game's multipliers were increased to fund achievements or cosmetics.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: With independent fair flips, the unrounded expected gross return is 93.75% of the stake. Cent rounding applies to the final return. This is a deliberate starting balance choice; no existing game's multipliers were increased to fund achievem

### Line 16

```text

```

Blank line separates documentation topics.

### Line 17

```text
## Slot balance review
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 18

```text

```

Blank line separates documentation topics.

### Line 19

```text
Existing symbol weights, line layouts, multipliers, scatter triggers, sticky-wild rules, reel sizes, and jackpot-replacement behavior are preserved. One displayed stake is deducted for the **entire spin**, but **each** winning line pays that full displayed stake times its multiplier. Line payouts are added together; the stake is not divided among the lines. Changing this convention would materially nerf existing returns, so this update explains it instead of silently rebalancing it.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Existing symbol weights, line layouts, multipliers, scatter triggers, sticky-wild rules, reel sizes, and jackpot-replacement behavior are preserved. One displayed stake is deducted for the **entire spin**, but **each** winning line pays tha

### Line 20

```text

```

Blank line separates documentation topics.

### Line 21

```text
For the original classic three-reel table, enumerating its six weighted symbols over one line gives an expected total return across all five lines of **77.1205%** of the displayed stake, before cent rounding and outside progression rewards. Five-reel bonuses, sticky wilds, and the changing demo jackpot make its complete long-run return state-dependent; no unsupported full-game return percentage is claimed.
```

This sentence teaches retained slot symbols in the casino and gives the reader context for why the design behaves this way: For the original classic three-reel table, enumerating its six weighted symbols over one line gives an expected total return across all five lines of **77.1205%** of the displayed stake, before cent rounding and outside progression rewards.

### Line 22

```text

```

Blank line separates documentation topics.

### Line 23

```text
Every slot table displays its paytable and exact line paths. The last result shows matching symbol IDs, match counts, per-line returns, special returns, total charged stake, total return, and net profit/loss. The five-reel jackpot replaces ordinary line/scatter returns, just as before.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Every slot table displays its paytable and exact line paths. The last result shows matching symbol IDs, match counts, per-line returns, special returns, total charged stake, total return, and net profit/loss. The five-reel jackpot replaces 

### Line 24

```text

```

Blank line separates documentation topics.

### Line 25

```text
## Bonus and payout recovery
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 26

```text

```

Blank line separates documentation topics.

### Line 27

```text
Slot settlement is saved as one encrypted profile snapshot containing the updated wallet, remaining free spins, triggering stake, sticky wild positions, cumulative bonus return, and settled result **before animation starts**. Animation completion never credits money. Refresh therefore restores an already-settled result rather than paying it again, and retains the remaining earned spins.
```

This sentence teaches bonus durability, retained slot symbols in the casino and gives the reader context for why the design behaves this way: Slot settlement is saved as one encrypted profile snapshot containing the updated wallet, remaining free spins, triggering stake, sticky wild positions, cumulative bonus return, and settled result **before animation starts**. Animation comp

### Line 28

```text

```

Blank line separates documentation topics.

### Line 29

```text
Free spins cost zero new stake and retain the triggering wager even if the balance or usual Max is lower. Press Spin to advance or resume a bonus; refresh never auto-spends chips. The final free-spin return is included in a persisted end-of-bonus summary. A failed encrypted write leaves the wallet and bonus unchanged and displays a retry warning.
```

This sentence teaches bonus durability in the casino and gives the reader context for why the design behaves this way: Free spins cost zero new stake and retain the triggering wager even if the balance or usual Max is lower. Press Spin to advance or resume a bonus; refresh never auto-spends chips. The final free-spin return is included in a persisted end-of

### Line 30

```text

```

Blank line separates documentation topics.

### Line 31

```text
## Achievements and history
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 32

```text

```

Blank line separates documentation topics.

### Line 33

```text
Local milestones unlock cabinet styling only. Achievements never change stakes, odds, wallet balances, or payout tables. Recent settled horse/car tickets and milestone counts stay with the encrypted profile and portable backups; history is bounded to 50 entries.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Local milestones unlock cabinet styling only. Achievements never change stakes, odds, wallet balances, or payout tables. Recent settled horse/car tickets and milestone counts stay with the encrypted profile and portable backups; history is 

### Line 34

```text

```

Blank line separates documentation topics.

### Line 35

```text
Run all deterministic arithmetic, recovery, storage-failure, and regression tests with `node --test tests/*.test.js`.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Run all deterministic arithmetic, recovery, storage-failure, and regression tests with `node --test tests/*.test.js`.
