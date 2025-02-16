# Dice Optimizer for KCD2

Tool for determining the best dice combination in the game Farkle.

## How to Use
1. Select dice from the dropdown list.
2. Click **"Add Die"** to add them to your pool.
3. Click **"Calculate Best Combination"** to start the simulation.
4. Wait for the results (the top **5** combinations will be displayed).

## Features
- Simulates **1,000 rolls** per combination (based on the internal simulation logic).
- Considers all official scoring rules.
- Optimized for performance using **Web Workers**.
- Supports up to **40** in each combination.
- Displays the **top 5** results.

## Implemented Scoring Rules (Updated)
- **Sequences**:
  - **1-2-3-4-5-6** = 1,500 points
  - **2-3-4-5-6** = 750 points
  - **1-2-3-4-5** = 500 points
- **Triples (or more)**:
  - Base scores for three-of-a-kind:
    - 1 = 1,000 points  
    - 2 = 200 points  
    - 3 = 300 points  
    - 4 = 400 points  
    - 5 = 500 points  
    - 6 = 600 points  
  - Each additional die (beyond the triple) **doubles** the base score.  
    - *Example*: four-of-a-kind is *base* × 2, five-of-a-kind is *base* × 4, etc.
- **Singles** (only if there is no sequence or triple scoring):
  - 1 = 100 points
  - 5 = 50 points
