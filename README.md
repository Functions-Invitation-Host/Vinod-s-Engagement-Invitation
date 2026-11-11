# Vinod & Nethra | Engagement Invitation

Plain HTML, CSS and JavaScript (same structure as the Pradeep & Shilpa project). No install, no build step, free on GitHub Pages.
Preview on your computer: double-click `index.html` (music and fonts need internet / a server only for fonts).

## Event details (already set)
Engagement: **16 November 2026**. Ceremony **7:30 PM - 8:30 PM**, food **9:00 PM onwards**. Venue: **Sri Panduranga Temple, Gangavathi, Karnataka**. Countdown target: 16 Nov 2026, 7:30 PM IST. Directions: https://maps.app.goo.gl/ArDd1MQsYUTK3GKY9

## Files
- `index.html` page and text. `css/style.css` colours (top of file) and layout. `js/main.js` music, countdown, animations.
- `assets/couple.jpg` the couple's illustrated portrait (replace any time) keeping the name `couple.jpg`. Portrait works best. It is shown uncropped.
- `assets/og-image.jpg` WhatsApp share picture (1200x630). Replace it with a photo-based version later, same name.
- `assets/background-music.mp3` **not included.** Add your licensed instrumental with exactly this name. Until then the player shows dimmed and stays silent. Music starts only after the guest taps "Open Invitation", with a smooth fade in and out.

## Theme
Taken from the couple's illustration: soft watercolor blush pink `#f4aaa9`, coral rose `#e98590`, peach `#f7cdb4`, cream `#fff7ef`, champagne gold `#b98d3f`, deep rosewood text `#5a2536`. Each section has its own mood (cream, coral, peach, blush) joined by wavy edges. Change colours in the `:root` block at the top of `css/style.css`.

## Interactive features
Curtains part when the invitation opens; falling petals; tap or click anywhere for hearts and petals; the couple photo tilts when touched or hovered; flip-style countdown; tap the big 16; temple line-drawing animates; WhatsApp share button. Nothing depends on hovering.

## Publish for free (about 10 minutes)
1. Sign up or log in at https://github.com.
2. Click **+** (top right) > **New repository**. Name it `vinod-nethra-engagement`, choose **Public**, click **Create repository**.
3. Click **uploading an existing file**. Unzip this folder, select **everything inside it** (including the hidden `.github` folder and `.nojekyll`) and drag it in. Click **Commit changes**.
   - Mac: Cmd+Shift+. shows hidden files. Windows: View > Show > Hidden items.
   - Check `.github/workflows/deploy.yml` appears in the repository. If not: **Add file > Create new file**, type `.github/workflows/deploy.yml`, paste the file contents, commit.
   - Easier: GitHub Desktop > **File > Add local repository** > Commit to main > Publish repository (untick "Keep this code private").
4. **Settings > Pages > Build and deployment > Source: GitHub Actions**.
5. Open the **Actions** tab. A green tick (1-2 minutes) means it is live. If it failed because Pages was not yet on, open the run and click **Re-run all jobs**.
6. Your link: `https://YOUR-USERNAME.github.io/vinod-nethra-engagement/`. Open it on your phone, then share on WhatsApp. If the preview picture is old, add `?v=2` to the link.

## Change the photo or music later
On GitHub open `assets`, click **Add file > Upload files**, upload `couple.jpg` / `background-music.mp3` with the same names, **Commit changes**. It redeploys in about a minute.

## Checklist
Photo shows; countdown runs; Get Directions opens Google Maps; no sideways scrolling on a phone; music plays after tapping Open Invitation.
