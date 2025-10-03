Step 1: Download file and extract or Clone
Step 2: 
Move to client folder: cd client
Download node: npm install
  <img width="530" height="94" alt="image" src="https://github.com/user-attachments/assets/d5783d25-d11e-472c-a11b-8e7fc323d12a" />
Step 3: Create .env in server folder
  <img width="271" height="465" alt="image" src="https://github.com/user-attachments/assets/0a5d2fc9-3396-4cb5-9318-654862b0266a" />
Config your environment variable:
DATABASE_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_USER=
EMAIL_PASS=
save .env
Step 4:
Move to server folder: cd ../server
Download node: npm install  
  <img width="493" height="87" alt="image" src="https://github.com/user-attachments/assets/186f16a3-d158-413c-9ab1-100a60447582" />
Step 5: Connect to database
npx prisma generate
  <img width="520" height="40" alt="image" src="https://github.com/user-attachments/assets/be7611f4-babf-4e70-a927-62930fb8312d" />
Step 6: Run
In server folder: npm run dev
Change to new cmd: in client folder: npm run dev
<img width="662" height="336" alt="image" src="https://github.com/user-attachments/assets/c33c3c8e-21fe-4baf-b32f-e74252890267" />
<img width="658" height="292" alt="image" src="https://github.com/user-attachments/assets/c2ee8c03-28b0-4c20-a6cc-74e80a685046" />



