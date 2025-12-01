import React from "react";
import LegalLayout from "./LegalLayout";
import { MetaTags } from "@/components/MetaTags";

const UserDataDeletion = () => {
    return (
        <>
            <MetaTags
                title="User Data Deletion Policy | Bazztech Networks"
                description="Learn how to request deletion of your personal data from Bazztech Networks. We respect your data privacy rights under Kenya's Data Protection Act, 2019."
                ogUrl="https://bazztech.co.ke/user-data-deletion-policy"
                ogType="website"
                ogTitle="User Data Deletion Policy | Bazztech Networks"
                ogDescription="Learn how to request deletion of your personal data from Bazztech Networks. We respect your data privacy rights under Kenya's Data Protection Act, 2019."
                ogImage="https://bazztech.co.ke/logo.png"
                ogImageAlt="Bazztech Networks Logo"
                twitterCard="summary_large_image"
                twitterTitle="User Data Deletion Policy | Bazztech Networks"
                twitterDescription="Learn how to request deletion of your personal data from Bazztech Networks. We respect your data privacy rights under Kenya's Data Protection Act, 2019."
                twitterImage="https://bazztech.co.ke/logo.png"
            />
            <LegalLayout title="User Data Deletion Policy">
                <p className="text-sm text-slate-500 mb-6">Last Updated: December 1, 2025</p>

                <h2>Introduction</h2>
                <p>
                    Bazztech Networks Limited ("we," "our," or "us") respects your right to control your personal data. This User Data Deletion Policy explains how you can request the deletion of your personal information collected through our website (bazztech.co.ke) and our use of Meta (Facebook) platforms.
                </p>

                <h2>Data Protection Compliance</h2>
                <p>
                    This policy is implemented in compliance with the <strong>Data Protection Act, 2019</strong> of Kenya and the regulations of the <strong>Office of the Data Protection Commissioner of Kenya</strong>. Bazztech Networks Limited is registered with the Office of the Data Protection Commissioner and adheres to all applicable data protection requirements.
                </p>

                <h2>Your Right to Deletion</h2>
                <p>
                    Under the Data Protection Act, 2019, you have the right to request the erasure of your personal data. We will honor such requests unless we have a legitimate reason to retain the information.
                </p>

                <h2>What Data Can Be Deleted</h2>
                <p>You may request deletion of:</p>
                <ul>
                    <li>Personal information provided through contact forms</li>
                    <li>Email addresses used for newsletter subscriptions</li>
                    <li>Account information (if applicable)</li>
                    <li>Communication records</li>
                    <li>Any other personal data we have collected about you</li>
                </ul>

                <h2>How to Request Data Deletion</h2>

                <h3>Method 1: Email Request</h3>
                <p>Send an email to <strong>privacy@bazztech.co.ke</strong> with:</p>
                <ul>
                    <li>Subject line: "Data Deletion Request"</li>
                    <li>Your full name</li>
                    <li>Email address associated with your data</li>
                    <li>Phone number (if provided to us)</li>
                    <li>Description of specific data you want deleted (optional - you can request all data)</li>
                </ul>

                <h3>Method 2: Written Request</h3>
                <p>Send a written request to:</p>
                <pre className="bg-slate-100 p-4 rounded-lg">
                    Bazztech Networks Limited
                    Data Protection Officer
                    Nairobi, Kenya
                </pre>

                <h3>Method 3: Online Form</h3>
                <p>
                    Visit our website contact form and select "Data Privacy" as the subject, or use the specific data deletion request form if available.
                </p>

                <h2>Verification Process</h2>
                <p>
                    To protect your privacy and prevent unauthorized deletion requests, we may need to verify your identity before processing your request. We may ask for:
                </p>
                <ul>
                    <li>Email confirmation</li>
                    <li>Additional identifying information</li>
                    <li>Proof of identity (in certain cases)</li>
                </ul>

                <h2>Processing Timeline</h2>
                <ul>
                    <li><strong>Acknowledgment:</strong> We will acknowledge your request within <strong>3 business days</strong></li>
                    <li><strong>Processing:</strong> We will process your deletion request within <strong>30 days</strong> from the date of acknowledgment</li>
                    <li><strong>Confirmation:</strong> You will receive confirmation once your data has been deleted</li>
                </ul>

                <h2>Data Deletion from Meta Platforms</h2>
                <p>If you have interacted with our Facebook page or used Facebook Login features:</p>

                <h3>To Delete Data from Bazztech Systems:</h3>
                <p>Follow the deletion request process outlined above.</p>

                <h3>To Delete Data from Meta (Facebook):</h3>
                <ol>
                    <li>Go to your Facebook Settings</li>
                    <li>Click on "Apps and Websites"</li>
                    <li>Find "Bazztech Networks" (or our app name)</li>
                    <li>Click "Remove" to revoke access</li>
                    <li>Check "Delete posts, photos, and other activity" to delete all data</li>
                </ol>
                <p>Alternatively, you can visit: <a href="https://www.facebook.com/settings?tab=applications" target="_blank" rel="noopener noreferrer">https://www.facebook.com/settings?tab=applications</a></p>

                <h3>Data We Receive from Meta</h3>
                <p>When you use Facebook Login or interact with our Facebook presence, we may receive:</p>
                <ul>
                    <li>Public profile information (name, profile picture)</li>
                    <li>Email address</li>
                    <li>Any permissions you've granted</li>
                </ul>
                <p>
                    We will delete this information from our systems upon your request. However, to delete data stored by Meta, you must use Meta's own deletion tools.
                </p>

                <h2>Exceptions to Deletion</h2>
                <p>We may retain certain information if:</p>
                <ul>
                    <li>Required by law or legal process</li>
                    <li>Necessary to comply with regulatory obligations</li>
                    <li>Needed to resolve disputes or enforce our agreements</li>
                    <li>Required for legitimate business purposes (e.g., fraud prevention)</li>
                    <li>Anonymized for statistical purposes</li>
                </ul>
                <p>If we cannot delete certain data, we will inform you of the reason and the retention period.</p>

                <h2>Contact Us</h2>
                <p>For data deletion requests or questions about this policy:</p>
                <p>
                    <strong>Bazztech Networks Limited</strong><br />
                    Email: privacy@bazztech.co.ke<br />
                    Phone: +254 103 339197<br />
                    Address: Nairobi, Kenya
                </p>
            </LegalLayout>
        </>
    );
};

export default UserDataDeletion;
