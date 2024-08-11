import React from 'react';
import { CssBaseline, Box } from "@mui/material";

export default function PrivacyPolicyPage() {
    return (
        <>
        <CssBaseline />
        <Box
           sx={{
           display: 'flex',
           flexDirection: 'column',
           minHeight: '100vh',
           }}
        >
            <h1>Privacy Policy</h1>
            <p>Welcome to our Privacy Policy. Your privacy is critically important to us.</p>

            <h2>Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you use our services. This may include your name, email address, and any other details you provide.</p>

            <h2>How We Use Your Information</h2>
            <p>We use your information to improve our services, respond to your inquiries, and send you updates about our products and services. We do not sell or rent your personal information to third parties.</p>

            <h2>Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience on our site. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our site.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

            <h2>Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also object to or restrict the processing of your information under certain circumstances. To exercise these rights, please contact us using the information provided below.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Email: privacy@example.com</p>
        </Box>
        </>
    );
}
