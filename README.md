Employee Gaming Hub - Full System (Backend + Frontend + Migration + Nodemailer)

Instructions:
1. Rename .env.example to .env and set:
   - MONGO_URI (use your MongoDB Atlas connection string or local URI)
   - PORT (default 5000)
   - EMAIL_USER (Gmail address)
   - EMAIL_PASS (App password for Gmail)

2. Install dependencies:
   npm install

3. Start backend:
   npm run start

4. Open frontend/index.html in browser (use Live Server recommended).
5. To migrate LocalStorage data, place localstorage_backup.json in project root and run:
   npm run migrate

Notes:
- This setup uses Gmail SMTP via nodemailer. Ensure App Passwords are configured for your Google account.
- Replace placeholder frontend game files with your complete game HTML/JS files if needed.
