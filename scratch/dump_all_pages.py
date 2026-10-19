import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
hdr = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

pages = [
    ("Home", "https://www.projectbattambang.com/"),
    ("Team", "https://www.projectbattambang.com/meet-the-team"),
    ("Support Services / Health Screening", "https://www.projectbattambang.com/support-services"),
    ("Education Outreach", "https://www.projectbattambang.com/education-outreach"),
    ("Development", "https://www.projectbattambang.com/copy-of-education"),
    ("Reports", "https://www.projectbattambang.com/post-trip-reports"),
    ("Get Involved", "https://www.projectbattambang.com/get-involved"),
    ("Donate", "https://www.projectbattambang.com/services-4")
]

for name, url in pages:
    print(f"\n========================================\nPAGE: {name} ({url})\n========================================")
    req = urllib.request.Request(url, headers=hdr)
    try:
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8', errors='ignore')
        
        imgs = re.findall(r'fd6b4f_[a-f0-9~_]+', html)
        unique_imgs = []
        for img in imgs:
            if img not in unique_imgs:
                unique_imgs.append(img)
        print("IMAGES:", unique_imgs)

        matches = re.findall(r'<(?:p|span|h[1-6]|a|div)[^>]*>(.*?)</(?:p|span|h[1-6]|a|div)>', html, re.DOTALL)
        clean_texts = []
        for text in matches:
            clean = re.sub(r'<[^>]+>', ' ', text).strip()
            clean = clean.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&quot;', '"').replace('&#x27;', "'")
            clean = ' '.join(clean.split())
            if len(clean) > 3 and not any(k in clean for k in ['{', '}', 'function', 'var ', 'wix', 'parastorage', 'window.', 'thunderbolt', 'editor-elements', 'CSS', 'return', 'class ']):
                if clean not in clean_texts:
                    clean_texts.append(clean)
                    
        print("TEXT CONTENT:")
        for t in clean_texts:
            print(" *", t)

    except Exception as e:
        print(f"ERROR: {e}")
