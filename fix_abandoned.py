import re

with open("src/components/pwa/AbandonedCheckoutPrompt.tsx", "r") as f:
    content = f.read()

# Fix missing imports
if "readMarketingOverlayState" not in content and "import {" in content:
    content = content.replace(
        'import { resolveBusinessHost } from "../../lib/businessHost";',
        'import { resolveBusinessHost } from "../../lib/businessHost";\nimport { readMarketingOverlayState, setMarketingOverlayState, subscribeMarketingOverlayState } from "../../lib/marketingOverlay";'
    )

content = re.sub(r'<<<<<<< HEAD\n.*?\n=======\n(.*?)\n>>>>>>> [a-f0-9]+', r'\1', content, flags=re.DOTALL)

with open("src/components/pwa/AbandonedCheckoutPrompt.tsx", "w") as f:
    f.write(content)
