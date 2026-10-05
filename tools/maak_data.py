"""Haalt pony-namen, foto's en beschrijvingen 1-op-1 van manegehooidonk.nl/manege/fotos-ponys/ en schrijft data.js."""
import json, re, urllib.request, html
from html.parser import HTMLParser
URL = "https://www.manegehooidonk.nl/manege/fotos-ponys/"
h = urllib.request.urlopen(urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})).read().decode()
h = h.split("<h1", 1)[1] if "<h1" in h else h
class P(HTMLParser):
    def __init__(s): super().__init__(); s.items = []; s.skip = 0
    def handle_starttag(s, t, a):
        a = dict(a)
        if t in ("script", "style"): s.skip += 1
        if t == "img":
            src = a.get("src", "")
            if "/uploads/" in src: s.items.append(("img", re.sub(r"-\d+x\d+(\.\w+)$", r"\1", src)))
        if t in ("p", "br", "div", "h2", "h3", "h4", "li"): s.items.append(("txt", "\n"))
    def handle_endtag(s, t):
        if t in ("script", "style"): s.skip -= 1
        if t in ("p", "h2", "h3", "h4"): s.items.append(("txt", "\n"))
    def handle_data(s, d):
        if not s.skip: s.items.append(("txt", d))
p = P(); p.feed(h)
# bouw lijnen met afbeeldingen ertussen
lines = []; buf = ""
for k, v in p.items:
    if k == "img": lines.append(buf); buf = ""; lines.append(("IMG", v))
    else: buf += v
lines.append(buf)
flat = []
for x in lines:
    if isinstance(x, tuple): flat.append(x)
    else: flat += [l.strip().replace("\xa0", " ") for l in x.split("\n") if l.strip().replace("\xa0", "")]
ponys = []; cur = None
for x in flat:
    if isinstance(x, tuple):
        if cur: cur["fotos"].append(x[1])
    elif len(x) < 25 and not x.endswith(".") and not x.startswith("Maart"):
        cur = {"naam": x.strip(), "fotos": [], "tekst": []}; ponys.append(cur)
    elif cur: cur["tekst"].append(x)
ponys = [dict(naam=q["naam"], fotos=q["fotos"], tekst=re.sub(r"\s+", " ", " ".join(q["tekst"])).strip()) for q in ponys if q["fotos"] and q["tekst"]]
open("data.js", "w").write("// Bron: " + URL + " (1-op-1 overgenomen)\nconst PONYS = " + json.dumps(ponys, ensure_ascii=False, indent=1) + ";\n")
print(len(ponys)); [print(q["naam"], len(q["fotos"]), q["tekst"][:50]) for q in ponys]
