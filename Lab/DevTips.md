
=== Disabling

_by Oleg Sidorkin_

Google Chrome on Mac supports two-fingers swipe guesture to navigate across pages.
Sometimes is leads to unconditional page reload and potential data loss which is
frustraing when you are working on something. Open Terminal and run the command
below. It will disable swipe guesture for scrollable areas where probability of such behavior is high.

```
defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool FALSE
```
