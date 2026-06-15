import os
import random
import json

FOLDER = "dice_history"
FILE = os.path.join(FOLDER, "stats.json")

os.makedirs(FOLDER, exist_ok=True)

if os.path.exists(FILE):
    with open(FILE, "r", encoding="utf-8") as f:
        stats = json.load(f)
else:
    stats = {}

d1 = random.randint(1, 6)
d2 = random.randint(1, 6)

combo = f"{d1} {d2}"

stats[combo] = stats.get(combo, 0) + 1

with open(FILE, "w", encoding="utf-8") as f:
    json.dump(stats, f, ensure_ascii=False, indent=4)

print(f"Ynkav: {combo}")
print(f"Ays kombinacyan ynkel e {stats[combo]} angam(а)")
