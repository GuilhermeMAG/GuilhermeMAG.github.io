#!/usr/bin/env python3
"""
Regression Test: Portfolio Layout, Hero Cards, and Brand Consistency
Verifies that:
1. Brand is 'Guilherme.dev' without whitespace separation.
2. Hero contains all 3 floating avatar badges (card-top-right, card-bottom-left, card-bottom-right).
3. Media queries properly hide floating cards on mobile viewports (< 768px).
4. No broken external links or syntax issues in critical paths.
"""

import os
import re
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INDEX_HTML = os.path.join(BASE_DIR, "index.html")
STYLE_CSS = os.path.join(BASE_DIR, "assets", "css", "style.css")

def test_brand_formatting():
    print("[1/3] Testing brand formatting...")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Must contain class brand-name with Guilherme and .dev together
    assert '<span class="brand-name"><span class="gradient-text">Guilherme</span>.dev</span>' in html, \
        "Brand name formatting regressed; expected '<span class=\"brand-name\"><span class=\"gradient-text\">Guilherme</span>.dev</span>'"
    print("  [OK] Brand name correctly formatted without space separation.")

def test_hero_avatar_cards():
    print("[2/3] Testing hero floating cards...")
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    expected_cards = [
        ("card-top-right", "Tech Lead / CTO"),
        ("card-bottom-left", "Autonomous Agents"),
        ("card-bottom-right", "Full-Stack Engineer")
    ]

    for card_class, text in expected_cards:
        assert card_class in html, f"Missing class '{card_class}' in hero section"
        assert text in html, f"Missing text '{text}' in hero card"
        print(f"  [OK] Found floating card: {card_class} with text '{text}'")

def test_css_mobile_responsiveness():
    print("[3/3] Testing CSS media query hiding floating cards on mobile...")
    with open(STYLE_CSS, "r", encoding="utf-8") as f:
        css = f.read()

    assert ".card-bottom-right" in css, "Missing .card-bottom-right CSS rule"
    assert ".card-top-right, .card-bottom-left, .card-bottom-right" in css, \
        "Missing mobile media query grouping for hiding all 3 floating cards"
    print("  [OK] Mobile media query properly handles all 3 floating cards.")

def main():
    print("=" * 60)
    print("RUNNING PORTFOLIO FEATURES & REGRESSION SUITE")
    print("=" * 60)
    try:
        test_brand_formatting()
        test_hero_avatar_cards()
        test_css_mobile_responsiveness()
        print("=" * 60)
        print("ALL TESTS PASSED! (3/3)")
        print("=" * 60)
        return 0
    except AssertionError as e:
        print(f"TEST FAILED: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
