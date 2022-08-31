import os
import sys
files = os.listdir('/Users/ai/Downloads/Code/Github/beinecke.github.io/static/image/svg')
index = 0
for name in files:
    print(f'{index}: "{name}",')
    index += 1

