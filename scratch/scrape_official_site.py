import urllib.request
import ssl
import re

urls = [
    ("Home", "https://www.projectbattambang.com/"),
    ("Team", "https://www.projectbattambang.com/meet-the-team"),
    ("Support Services / Health Screening", "https://www.projectbattambang.com/support-services"),
    ("Education Outreach", "https://www.projectbattambang.com/education-outreach"),
    ("Development", "https://www.projectbattambang.com/development"),
    ("Reports", "https://www.projectbattambang.com/post-trip-reports"),
    ("Get Involved", "https://www.projectbattambang.com/get-involved"),
    ("Donate", "https://www.projectbattambang.com/services-4")
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

hdr = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

for name, url in urls:
    print(f"\n========================================\nPAGE: {name} ({url})\n========================================")
    req = urllib.request.Request(url, headers=hdr)
    try:
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8', errors='ignore')
        
        # Extract images
        imgs = re.findall(r'fd6b4f_[a-f0-9~_]+(?:\.jpg|\.png|\.jpeg)?', html)
        unique_imgs = []
        for img in imgs:
            if img not in unique_imgs:
                unique_imgs.append(img)
        print("IMAGES:", unique_imgs)

        # Extract text inside tags
        texts = re.findall(r'<(?:p|span|h[1-6]|a|div)[^>]*>(.*?)</(?:p|span|h[1-6]|a|div)>', html, re.DOTALL)
        clean_texts = []
        for t in texts:
            clean_t = re.sub(r'<[^>]+>', ' ', t).strip()
            clean_t = clean_t.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&quot;', '"').replace('&#x27;', "'")
            clean_t = ' '.join(clean_t.split())
            if len(clean_t) > 3 and not any(k in clean_t for k in ['{', '}', 'function', 'var ', 'wix', 'parastorage', 'window.', 'thunderbolt', 'editor-elements']):
                if clean_t not in clean_texts:
                    clean_texts.append(clean_t)
                    
        print("\nTEXT CONTENT:")
        for t in clean_texts:
            print(" *", t)

    except Exception as e:
        print(f"ERROR: {e}")
