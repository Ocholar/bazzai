import React from "react";
import LegalLayout from "./LegalLayout";
import { MetaTags } from "@/components/MetaTags";

const TermsOfService = () => {
    return (
        <>
            <MetaTags
                title="Terms of Service | Bazztech Networks"
                description="Read the Terms of Service for Bazztech Networks. By using our website and services, you agree to these terms governing telecommunications and internet connectivity solutions."
                ogUrl="https://bazztech.co.ke/terms-of-service"
                ogType="website"
                ogTitle="Terms of Service | Bazztech Networks"
                ogDescription="Read the Terms of Service for Bazztech Networks. By using our website and services, you agree to these terms governing telecommunications and internet connectivity solutions."
                ogImage="https://bazztech.co.ke/logo.png"
                ogImageAlt="Bazztech Networks Logo"
                twitterCard="summary_large_image"
                twitterTitle="Terms of Service | Bazztech Networks"
                twitterDescription="Read the Terms of Service for Bazztech Networks. By using our website and services, you agree to these terms governing telecommunications and internet connectivity solutions."
                twitterImage="https://bazztech.co.ke/logo.png"
            />
            <LegalLayout title="Terms of Service">
                <p className="text-sm text-slate-500 mb-6">Last Updated: December 1, 2025</p>

                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing or using the website bazztech.co.ke ("Website") and services provided by Bazztech Networks Limited ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Website or services.
                </p>

                <h2>2. Data Protection Compliance</h2>
                <p>
                    Bazztech Networks Limited is registered and compliant with the <strong>Office of the Data Protection Commissioner of Kenya</strong> in accordance with the Data Protection Act, 2019. We are committed to protecting your personal data and privacy rights as outlined in our <a href="/privacy-policy">Privacy Policy</a>.
                </p>

                <h2>3. About Bazztech Networks Limited</h2>
                <p>
                    Bazztech Networks Limited is a Kenyan company providing telecommunications and internet connectivity solutions, including:
                </p>
                <ul>
                    <li>Airtel 5G Home Broadband services</li>
                    <li>Business internet solutions</li>
                    <li>Network consultation and setup</li>
                    <li>Technology solutions for businesses</li>
                </ul>

                <h2>4. Use of Services</h2>
                <h3>4.1 Eligibility</h3>
                <p>
                    You must be at least 18 years old to use our services. By using our services, you represent that you meet this requirement.
                </p>

                <h3>4.2 Account Registration</h3>
                <p>When you register for our services, you agree to:</p>
                <ul>
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Promptly update any changes to your information</li>
                    <li>Accept responsibility for all activities under your account</li>
                </ul>

                <h3>4.3 Permitted Use</h3>
                <p>
                    You agree to use our Website and services only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Transmit harmful or malicious code</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use our services for fraudulent purposes</li>
                    <li>Harass, abuse, or harm others</li>
                    <li>Impersonate any person or entity</li>
                </ul>

                <h2>5. Services and Products</h2>
                <h3>5.1 Service Description</h3>
                <p>
                    We provide information about and facilitate access to telecommunications services, primarily Airtel 5G Home Broadband and related connectivity solutions.
                </p>

                <h3>5.2 Service Availability</h3>
                <ul>
                    <li>Services are subject to availability in your area</li>
                    <li>We reserve the right to modify or discontinue services at any time</li>
                    <li>Service specifications and pricing may change with notice</li>
                </ul>

                <h3>5.3 Third-Party Services</h3>
                <p>
                    Some services we offer are provided by third parties (e.g., Airtel Kenya). Your use of such services may be subject to additional terms and conditions from those providers.
                </p>

                <h2>6. Orders and Payments</h2>
                <h3>6.1 Service Requests</h3>
                <p>When you submit a service request or order:</p>
                <ul>
                    <li>All information provided must be accurate</li>
                    <li>Requests are subject to acceptance and approval</li>
                    <li>We reserve the right to refuse service for any lawful reason</li>
                </ul>

                <h3>6.2 Pricing</h3>
                <ul>
                    <li>All prices are in Kenyan Shillings (KES) unless otherwise stated</li>
                    <li>Prices are subject to change with notice</li>
                    <li>Any applicable taxes will be added to the final price</li>
                </ul>

                <h2>7. Intellectual Property</h2>
                <p>
                    All content on our Website, including text, graphics, logos, images, and software, is the property of Bazztech Networks Limited or our licensors and is protected by Kenyan and international intellectual property laws.
                </p>

                <h2>8. User Content</h2>
                <p>If you submit content to our Website (e.g., reviews, comments, inquiries):</p>
                <ul>
                    <li>You retain ownership of your content</li>
                    <li>You grant us a license to use, display, and distribute your content</li>
                    <li>You represent that you have the right to share such content</li>
                </ul>

                <h2>9. Privacy and Data Protection</h2>
                <p>
                    Our collection and use of personal information is governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.
                </p>

                <h2>10. Disclaimers</h2>
                <p>
                    Our Website and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.
                </p>

                <h2>11. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by Kenyan law, we shall not be liable for indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount you paid for our services.
                </p>

                <h2>12. Governing Law</h2>
                <p>
                    These Terms are governed by the laws of the Republic of Kenya. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>

                <h2>13. Contact Information</h2>
                <p>For questions about these Terms of Service, please contact us:</p>
                <p>
                    <strong>Bazztech Networks Limited</strong><br />
                    Email: legal@bazztech.co.ke<br />
                    Phone: +254 103 339197<br />
                    Address: Nairobi, Kenya
                </p>
            </LegalLayout>
        </>
    );
};

export default TermsOfService;
