
### How do I disable Chrome's two-finger back/forward navigation?

_by Oleg Sidorkin_

Google Chrome on Mac supports two-finger swipe guesture to navigate across pages.
Sometimes is leads to unconditional page reload and potential data loss which is
frustraing when you are working on something essential.

**There is a quick fix:** Open Terminal, run the command below, and restart browser.
It will disable two-finger back/forward navigation for Google Chrome only.
Change parameter to TRUE to revert changes if needed.

```
defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool FALSE
```
