import re

with open("src/pages/CouplePage.tsx", "r") as f:
    content = f.read()

# Replace massive paddings
content = content.replace('p-[clamp(1rem,4vw,3.5rem)] pt-2', 'p-2')
content = content.replace('mb-[clamp(2.5rem,4vw,4rem)]', 'mb-2')

# TwoPeopleStrengthsSection
content = content.replace('p-6 lg:p-8', 'p-3')
content = content.replace('mb-[1rem]', 'mb-1')
content = content.replace('mb-[1.5rem]', 'mb-2')
content = content.replace('mb-8', 'mb-2')

# ProvenModelSection
# LaunchKitAndFaqSection
content = content.replace('p-6 lg:p-8', 'p-3')

# FooterCTASection
content = content.replace('p-8 lg:p-10', 'p-4')
content = content.replace('gap-8 lg:gap-10', 'gap-4')
content = content.replace('pb-12 pt-1', 'py-1')
content = content.replace('mb-4 cursor-pointer', 'mb-1 cursor-pointer')

# HeroBanner adjustments
content = content.replace('min-h-[90svh] lg:min-h-[85svh]', 'min-h-[70svh]')
content = content.replace('pb-[clamp(2rem,3vw,3rem)]', 'pb-0')

# Write back
with open("src/pages/CouplePage.tsx", "w") as f:
    f.write(content)
