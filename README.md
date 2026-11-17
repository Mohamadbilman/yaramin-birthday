# For Yaramin ♡ — Birthday surprise website

A responsive, romantic birthday microsite. It works as a static website and can be hosted free on GitHub Pages or Vercel.

## Preview locally
Open `index.html` in a browser. For the best experience, use a small local web server (for example VS Code Live Server).

## Add your photos later
1. Open the `photos` folder.
2. Add your pictures and name them exactly:
   - `photo-1.jpg`
   - `photo-2.jpg`
   - `photo-3.jpg`
3. JPG is recommended. If your pictures are PNG, either convert them to JPG or update the matching filenames in `index.html`.

The cards already have pretty placeholders until you add the photos.

## Add your song later
1. Put an MP3 file in the `assets` folder.
2. Rename it to `song.mp3`.
3. The music button at the top will play/pause it. On phones, the visitor must tap Play because browsers block autoplay.

Use music you have permission to share.

## Personalize the letter
Open `script.js` and edit the `letterText` text near the top. The final message and the captions on each photo can also be edited:
- Final note: in `index.html`, find `final-copy`, `final-emphasis`, and `final-sign`.
- Photo captions: edit the `data-caption` attributes on `.memory-card` in `index.html`.

## Free publishing with GitHub Pages
1. Create/sign in to a GitHub account: https://github.com
2. Create a new **public** repository, for example `yaramin-birthday`.
3. Upload the contents of this folder (not the ZIP file itself): `index.html`, `style.css`, `script.js`, `README.md`, `assets/`, and `photos/`.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch **main** and folder **/(root)**, then Save.
7. Wait a minute or two. GitHub will show your website URL, usually:
   `https://YOUR-USERNAME.github.io/yaramin-birthday/`

## Free publishing with Vercel
1. Create/sign in at https://vercel.com
2. Import the GitHub repository.
3. Keep the framework preset as **Other** and leave build settings empty.
4. Deploy. Vercel will provide a public HTTPS link.

## Before sharing
- Test the link on your phone.
- Add photos and song first.
- Remember that a public GitHub Pages site can be visited by anyone who has the link (and may be indexed). Avoid uploading private or sensitive photos.
