نُسخة سريعة لنشر الموقع المبنّى في `dist/`.

1. توليد الأرشيف (مؤكد تم):
   - الملف: `website.zip` يحتوي على محتويات `dist/`.

2. نشر سريع (خدمات مُدارة):
   - Netlify: اسحب وأفلت مجلد `dist` أو اربط الريبو واختر `build command` فارغ و`publish directory` = `dist`.
   - Vercel: ربط المستودع ثم ضبط `Framework` إلى `Other`، و`Output Directory` = `dist`، أو رفع الأرشيف يدوياً.
   - GitHub Pages: إذا ترغب بالنشر عبر Pages، قم بدفع `dist` إلى فرع `gh-pages` ثم إعداد Pages من هذا الفرع. يمكنك استخدام أداة `gh-pages` أو GitHub Actions.

3. نشر عبر FTP / استضافة تقليدية:
   - فك `website.zip` ورفع الملفات داخل `dist/` إلى مجلد public على السيرفر.

4. تشغيل محلي لفحص النسخة المصدّرة:
   - استخدم أي سيرفر ثابت، مثال باستخدام `npx serve`:
     ```powershell
     npx serve dist
     ```

5. ملاحظات:
   - كان هناك تحذير أثناء البناء: `index.css doesn't exist at build time`، إن واجهت أي نقص بالستايل بعد النشر، أضف ملف `index.css` أو تحقق من مسار الاستيراد في `index.html`/`index.tsx`.
   - إذا تريد، أستطيع إعداد GitHub Action لنشر تلقائي إلى GitHub Pages أو ملف تهيئة للنشر إلى Netlify/Vercel.

6. نشر تلقائي عبر GitHub (GitHub Pages)
   - أضفت ملف GitHub Action في ` .github/workflows/deploy.yml` يقوم بما يلي عند كل دفع إلى `main` أو `master`:
     - يثبت الحزم عبر `npm ci`.
     - يبني المشروع عبر `npm run build`.
     - ينشر محتويات `dist/` إلى فرع `gh-pages` باستخدام `peaceiris/actions-gh-pages`.

   - خطوات ما بعد التعديل (دفع إلى GitHub):
     1. اربط المستودع محلياً بGitHub (مرة واحدة):

        ```powershell
        git remote add origin git@github.com:<USERNAME>/<REPO>.git
        git branch -M main
        git add .
        git commit -m "Add GitHub Pages deploy workflow"
        git push -u origin main
        ```

     2. بعد دفع `main` سيبدأ الـ Action تلقائياً. يمكنك متابعة حالة النشر من تبويب `Actions` في الريبو.

     3. بعد نجاح الـ Action سيتولد فرع `gh-pages` ويحتوي على الملفات المنشورة. اذهب إلى إعدادات المستودع → Pages واختر مصدر النشر `gh-pages` branch إن احتاج الأمر، ثم انتظر نشر الموقع (قد يستغرق دقائق).

   - ملاحظات أمان:
     - لا حاجة لإضافة توكن خاص: Action يستخدم `GITHUB_TOKEN` التلقائي. إن أردت ميزات إضافية (مثلاً نشر إلى نطاق مخصص أو استخدام token خارجي)، أخبرني لأرشح التعديلات.

إذا تريد، أجهز أيضاً ملف `CNAME` أو أعمل GitHub Action ثاني لنشر إلى Netlify/Vercel. أي خيار تفضّل الآن؟
