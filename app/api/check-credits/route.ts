import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


// Define the type of the API response
interface ApiResponse {
  message: string;
  quota: number | string;
}


// POST method handler
export async function GET(req: Request) {
  try {
    // Step 1: Fetch remaining quota from Heygen API
    const response = await fetch("https://api.heygen.com/v2/user/remaining_quota", {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.HEYGEN_API_KEY as string, // Ensure you get the API key from environment variables
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Heygen quota.");
    }

    console.log("response" , response)

    const heyegenData = await response.json();
    const remainingQuota = heyegenData?.data?.remaining_quota || "Unknown";

    // Step 2: Set up Nodemailer to send email
    const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port:  Number(process.env.EMAIL_PORT),
    service: process.env.SMPT_SERVICE,
    secure: true,
    logger: false,
    debug: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized: true
    }
    });

    // Step 3: Compose the email with remaining quota
    const mailOptions = {
      from: `"Quota Checker" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "Heygen Remaining Quota",
      text: `The remaining quota for your Heygen account is: ${Math.floor(remainingQuota/60)}`,
      html: `<p><strong>Heygen Remaining Credit limit is :</strong> ${Math.floor(remainingQuota/60)}</p>`,
    };

    // Step 4: Send the email
    await transporter.sendMail(mailOptions);

    // Return the JWT token in the response
    return NextResponse.json({ message: "Quota checked and email sent successfully", quota: remainingQuota })
  } catch (error: unknown) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

