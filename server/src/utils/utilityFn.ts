import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const sendMail = async (userEmail: string) => {
   const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
         user: process.env.EMAIL_ID,
         pass: process.env.EMAIL_PASS,
      },
   });
   const verificationToken = jwt.sign({ email: userEmail }, process.env.SESSION_SECRET!, {
      expiresIn: '12h',
   });

   const verificationLink = `${process.env.DEPLOYMENT_LINK}/auth/verify/${verificationToken}`;

   const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Email Verification for Planify',
      html: `<p>Please verify your email by clicking the link below:</p><p><a href="${verificationLink}">Verify Email</a></p>`,
   };

   try {
      await transporter.sendMail(mailOptions);
      return true;
   } catch (error) {
      return false;
   }
}

// Checks if item position is too close to its neighbouring items
const isTooClose = (position: number): boolean => {
   // Checks if number is decimal and if its remainder is less than 0.01
   if (!Number.isInteger(position) && position % 1 < 0.01) {
      return true;
   }

   return false;
};



// Resets items position if the new position of the item is too close (< 0.01) to neighbouring items
const recalcItemsPos = async (parentId: any, Model: any) => {
   try {
      // Get items by parent item id
      const items = await Model.find(parentId).sort({ position: 1 });
      let pos = 16384;
      // Give new position incrementing each by 16384
      for (const item of items) {
         await Model.findByIdAndUpdate(item._id, { position: pos }, { new: true });
         pos += 16384;
      }
      return;
   } catch (error) {
      return error;
   }
};

export default { recalcItemsPos, isTooClose, sendMail };
