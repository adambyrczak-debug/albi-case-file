# THE NEXT CASE: ALBI POLSKA — Content Editing Guide

This guide explains how to update **all text, statistics, team members, campaigns, contact details, and photographs** on the website **without touching any React or TypeScript code**.

---

## 1. Where All Website Text Is Stored
Every visible heading, paragraph, caption, button label, and contact detail lives in **one file**:

```text
src/content/content.json
```

You can open this file in any plain text editor (Notepad, TextEdit, VS Code, or directly in GitHub/GitLab).

> **Important JSON Rules:**
> - Keep all double quotes `"..."` intact.
> - Do not leave a trailing comma after the last item in a list `{ ... }`.
> - Save the file in **UTF-8** encoding (Polish characters like `ą, ć, ę, ł, ń, ó, ś, ź, ż` work out of the box).

---

## 2. How to Edit Headings and Paragraphs
1. Open `src/content/content.json`.
2. Search for the text you want to change (for example, `"Who is Albi Polska?"`).
3. Replace only the text inside the quotes on the right-hand side:

```json
"heading": "Who is Albi Polska?",
"description": "Your updated company description goes here."
```

4. Save the file.

---

## 3. How to Change Statistics (e.g., Marketing Section)
In `src/content/content.json`, find the `"marketing"` section and update `"highlights"`:

```json
"highlights": [
  {
    "label": "SOCIAL MEDIA & VIDEO",
    "value": "120,000+ monthly views",
    "detail": "Short-form reels, unboxings and gameplay teasers produced in-house."
  }
]
```

---

## 4. How to Replace Photographs (Zero Code Changes)
All photographs live inside:

```text
public/images/
├── team/
├── events/
├── marketing/
├── pr-packages/
├── products/
├── campaigns/
├── company/
└── backgrounds/
```

To replace a placeholder or an existing photo:
1. Find the expected filename shown on the placeholder box (for example: `/images/team/kama.jpg`).
2. Save your new photo into `public/images/team/` with the exact filename `kama.jpg`.
3. Refresh or redeploy the site — the placeholder disappears automatically and your photo appears.

---

## 5. How to Add New Photographs
1. Copy the new image into the matching subfolder (for example: `public/images/marketing/tiktok-campaign.jpg`).
2. Add a new entry in `src/content/content.json`:

```json
{
  "image": "/images/marketing/tiktok-campaign.jpg",
  "placeholder": "[INSERT MARKETING PHOTO]",
  "caption": "MicroMacro teaser reel campaign."
}
```

---

## 6. How to Add a New Team Member
Open `src/content/content.json`, find `"detectives"` -> `"members"`, add a comma after the last `}`, and paste a new block:

```json
{
  "id": "detective-04",
  "fileCode": "PERSONNEL FILE #A-04",
  "name": "Jan Kowalski",
  "position": "Sales Manager",
  "description": "Knows every bookstore in Poland by heart.",
  "image": "/images/team/jan.jpg",
  "placeholder": "[INSERT TEAM PORTRAIT: JAN]"
}
```

---

## 7. How to Add a Marketing Campaign / Brand Idea
Open `src/content/content.json`, find `"brandIdeas"` -> `"ideas"`, and add a new object to the list:

```json
{
  "number": "05",
  "code": "LEAD #05",
  "phase": "PARTNER ACTIVATION",
  "title": "Board Game Café Mystery Night",
  "description": "Simultaneous evening crime-solving sessions in 15 Polish board game cafés.",
  "objective": "Word-of-mouth buzz among core and family gamers.",
  "image": "/images/campaigns/idea-cafe-night.jpg",
  "placeholder": "[INSERT CAFÉ MYSTERY NIGHT VISUAL]"
}
```

---

## 8. How to Add a Case Study or PR Format
Under `"creativeExecution"` -> `"formats"`, copy an existing block, increment `"step"` (e.g. `"04 / RETAIL"`), update `"title"`, `"description"`, and `"image"`.

---

## 9. How to Update Contact Details
Scroll to the bottom of `src/content/content.json` and edit `"caseContinues"` -> `"contact"`:

```json
"contact": {
  "person": "Kama [Surname] — Product Manager",
  "email": "contact@albipolska.pl",
  "phone": "+48 000 000 000",
  "location": "Kraków, Poland"
}
```

---

## Deploying to Netlify
1. Push this project folder to a GitHub, GitLab, or Bitbucket repository (or drag-and-drop the `dist` folder after running `npm run build`).
2. In Netlify, click **Add new site -> Import an existing project**.
3. Netlify automatically detects `netlify.toml` (`npm run build`, publish directory `dist`).
4. Click **Deploy site**. Every time you edit `src/content/content.json` or add photos to `public/images/`, Netlify rebuilds the live site automatically.
