#!/usr/bin/env python3
"""
Regression Test: Mobile Navigation Drawer & Hamburger Menu
Verifies that all required DOM elements, CSS styles, and JS event bindings exist
to prevent regression of the mobile hamburger menu in GuilhermeMAG.github.io.
"""

import os
import re
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INDEX_HTML = os.path.join(BASE_DIR, "index.html")
STYLE_CSS = os.path.join(BASE_DIR, "assets", "css", "style.css")
MAIN_JS = os.path.join(BASE_DIR, "assets", "js", "main.js")

def test_html_elements():
    print("[1/3] Testing index.html for Mobile Menu DOM elements...")
    assert os.path.isfile(INDEX_HTML), f"index.html not found at {INDEX_HTML}"
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    required_ids = ["mobile-toggle", "mobile-drawer", "mobile-close", "mobile-backdrop"]
    for rid in required_ids:
        assert f'id="{rid}"' in html, f"Missing required ID '{rid}' in index.html"
        print(f"  [OK] Found ID '{rid}'")

    mobile_links = re.findall(r'class="[^"]*mobile-link[^"]*"', html)
    assert len(mobile_links) >= 6, f"Expected at least 6 mobile links, found {len(mobile_links)}"
    print(f"  [OK] Found {len(mobile_links)} mobile-link elements")

def test_css_rules():
    print("[2/3] Testing style.css for Mobile Menu CSS rules...")
    assert os.path.isfile(STYLE_CSS), f"style.css not found at {STYLE_CSS}"
    with open(STYLE_CSS, "r", encoding="utf-8") as f:
        css = f.read()

    required_selectors = [
        ".mobile-drawer",
        ".mobile-drawer.open",
        ".mobile-backdrop",
        ".mobile-backdrop.active",
        ".mobile-close",
        ".mobile-link"
    ]
    for sel in required_selectors:
        assert sel in css, f"Missing required CSS selector '{sel}' in style.css"
        print(f"  [OK] Found selector '{sel}'")

def test_js_logic():
    print("[3/3] Testing main.js for Mobile Menu Event Listeners...")
    assert os.path.isfile(MAIN_JS), f"main.js not found at {MAIN_JS}"
    with open(MAIN_JS, "r", encoding="utf-8") as f:
        js = f.read()

    required_tokens = [
        "mobile-toggle",
        "mobile-drawer",
        "mobile-close",
        "mobile-backdrop",
        "openMobileMenu",
        "closeMobileMenu",
        "mobile-link"
    ]
    for token in required_tokens:
        assert token in js, f"Missing required JS token '{token}' in main.js"
        print(f"  [OK] Found JS handler for '{token}'")

def main():
    print("=" * 60)
    print("RUNNING MOBILE MENU REGRESSION TEST SUITE")
    print("=" * 60)
    try:
        test_html_elements()
        test_css_rules()
        test_js_logic()
        print("=" * 60)
        print("ALL REGRESSION TESTS PASSED! (3/3)")
        print("=" * 60)
        return 0
    except AssertionError as e:
        print(f"REGRESSION TEST FAILED: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
