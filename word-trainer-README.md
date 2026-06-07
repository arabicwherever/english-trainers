# Word Trainer + Admin Dashboard

لعبة تعلّم الكلمات (`word-do.html`) + لوحة تحكم للأدمن (`admin.html`) بتعرض نتايج
الطلاب **لحظياً** عن طريق Firebase.

## الملفات
| الملف | الوظيفة |
|------|---------|
| `word-do.html` | اللعبة اللي بيلعبها الطالب (بتسأل عن اسمه أول حاجة) |
| `admin.html` | لوحة تحكم الأدمن (محمية بكلمة سر) |
| `firebase-config.js` | إعدادات Firebase + كلمة سر الأدمن (مشترك بين الملفين) |

## التشغيل لأول مرة (مرة واحدة بس)

### 1) اعمل مشروع Firebase
1. ادخل https://console.firebase.google.com واضغط **Add project**.
2. جوّه المشروع اضغط أيقونة الويب **`</>`** عشان تضيف Web App.
3. هيظهرلك كود فيه `firebaseConfig = { ... }` — انسخ القيم دي.
4. من القائمة الجنب: **Build → Firestore Database → Create database**
   (ابدأ في *test mode* دلوقتي).

### 2) حطّ القيم في `firebase-config.js`
افتح `firebase-config.js` واملا `apiKey` و `projectId` … إلخ بالقيم اللي نسختها.
وغيّر `ADMIN_PASSWORD` لكلمة سر من عندك.

> طول ما القيم لسه `PASTE_...` اللعبة بتشتغل **offline** (النتايج مبتتبعتش)،
> ولوحة الأدمن بتعرض بيانات تجريبية بس.

### 3) قواعد الأمان في Firestore (مهمة قبل النشر)
في Firestore → **Rules** حط ده: الطلاب يقدروا **يكتبوا** بس، والقراءة من
لوحة الأدمن فقط (اللوحة محمية بباسورد على مستوى الواجهة):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{id} {
      allow create, update: if true;   // الطالب يكتب نتيجته
      allow read: if true;             // اللوحة تقرأ (محمية بباسورد بالواجهة)
    }
  }
}
```

> ملاحظة أمان: الحماية بالباسورد في `admin.html` على مستوى الواجهة (client-side)
> ومناسبة للاستخدام الداخلي. لو محتاج أمان حقيقي لازم Firebase Authentication
> + قواعد تتحقق من المستخدم — أقدر أضيفها لو حبيت.

## التشغيل محلياً
لأن الملفات بتستخدم JavaScript modules، لازم سيرفر محلي (مش `file://`):

```bash
cd "English project"
python3 -m http.server 8000
```
بعدين افتح:
- اللعبة: http://localhost:8000/word-do.html
- الأدمن: http://localhost:8000/admin.html

## النشر على GitHub Pages
ارفع الملفات التلاتة على نفس الريبو زي ما `word-do.html` متنشورة دلوقتي،
وكله هيشتغل زي ما هو على الدومين بتاعك.

## البيانات اللي بتتسجل لكل طالب
الاسم • الكود (اختياري) • الحالة (بيلعب/نجح/خسر) • النتيجة % • عدد الصح والغلط •
المدة • وقت البداية • **وكل إجابة بالتفصيل** (الكلمة المختارة، صح/غلط، زمن الرد).
