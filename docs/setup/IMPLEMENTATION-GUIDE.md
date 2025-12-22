# Meta App Legal Documents - Implementation Guide

## Overview
This guide provides instructions for implementing the three required legal documents on your bazztech.co.ke website to satisfy Meta/Facebook app review requirements.

## Documents Created
✅ **Privacy Policy** - `privacy-policy.md`
✅ **User Data Deletion Policy** - `user-data-deletion-policy.md`
✅ **Terms of Service** - `terms-of-service.md`

All documents include:
- Kenya Data Protection Act, 2019 compliance
- Office of the Data Protection Commissioner registration statements
- Meta platform integration details
- Professional legal language

---

## 🚨 Important: Update Required Information

Before publishing, you MUST update these placeholders in ALL three documents:

### Contact Information to Add:
- **Phone Number:** Replace `[Your Phone Number]` with your actual phone
- **Physical Address:** Replace `[Your Physical Address]` with your office address
- **Email Addresses:** Verify these work:
  - `privacy@bazztech.co.ke`
  - `legal@bazztech.co.ke`
  - `info@bazztech.co.ke`

> [!CAUTION]
> Meta will verify that these URLs are publicly accessible. Broken links will cause your app review to fail.

---

## Implementation Steps

### Step 1: Convert to HTML
Convert the markdown files to HTML for your website:

```bash
# If using a static site generator (recommended)
# The .md files can be rendered automatically

# If manual conversion needed
# Use a markdown-to-HTML converter or create HTML versions
```

### Step 2: Upload to Your Website

Upload the documents to your website so they're accessible at these URLs:
- `https://bazztech.co.ke/privacy-policy`
- `https://bazztech.co.ke/user-data-deletion-policy`
- `https://bazztech.co.ke/terms-of-service`

**Recommended structure:**
```
bazztech.co.ke/
  ├── privacy-policy.html
  ├── user-data-deletion-policy.html
  └── terms-of-service.html
```

### Step 3: Add to Website Footer

Add links to these documents in your website footer:

```html
<footer>
  <div class="legal-links">
    <a href="/privacy-policy">Privacy Policy</a>
    <a href="/user-data-deletion-policy">Data Deletion</a>
    <a href="/terms-of-service">Terms of Service</a>
  </div>
</footer>
```

### Step 4: Configure Meta App Settings

1. Go to [Meta Developers Console](https://developers.facebook.com/)
2. Select your app
3. Go to **App Settings** > **Basic**
4. Add the URLs:
   - **Privacy Policy URL:** `https://bazztech.co.ke/privacy-policy`
   - **Terms of Service URL:** `https://bazztech.co.ke/terms-of-service`
   - **User Data Deletion URL:** `https://bazztech.co.ke/user-data-deletion-policy`

### Step 5: Create Data Deletion Callback (Optional)

For automated data deletion requests from Meta, create an endpoint or form at:
`https://bazztech.co.ke/data-deletion`

This can be:
- A simple contact form
- An automated API endpoint that accepts deletion requests
- A link to email privacy@bazztech.co.ke

### Step 6: Verify Links

Before submitting for review:
1. ✅ All three documents are publicly accessible
2. ✅ No 404 errors
3. ✅ Documents load correctly on mobile and desktop
4. ✅ All contact information is updated
5. ✅ Links between documents work (they reference each other)

### Step 7: Submit Meta App for Review

1. In Meta Developers Console, go to **App Review**
2. Select the permissions you need (e.g., `email`, `public_profile`, `pages_read_engagement`)
3. Provide the required information
4. Submit for review

---

## Kenya Data Protection Compliance

### Registration Requirement
The documents state compliance with the Office of the Data Protection Commissioner. To be fully compliant:

1. **Register as a Data Controller:**
   - Visit: https://www.odpc.go.ke
   - Complete data controller registration
   - Pay required fees
   - Obtain registration certificate

2. **Update Documents:**
   - Add your registration number once obtained
   - Update compliance statements with specific registration details

### Recommended Text to Add (after registration):
```
Bazztech Networks Limited is a registered Data Controller with the 
Office of the Data Protection Commissioner of Kenya 
(Registration No: [YOUR-REG-NUMBER]).
```

---

## Quick Checklist for Meta App Review

- [ ] Privacy Policy uploaded and accessible
- [ ] User Data Deletion Policy uploaded and accessible
- [ ] Terms of Service uploaded and accessible
- [ ] All placeholder information updated (phone, address, emails)
- [ ] URLs added to Meta App Settings
- [ ] Documents linked in website footer
- [ ] All email addresses (privacy@, legal@, info@) are functional
- [ ] Tested all links on mobile and desktop
- [ ] Considered registering with Kenya Data Protection Commissioner

---

## Common Meta App Review Issues

### ❌ Rejected: Broken Links
**Solution:** Verify all URLs return 200 status codes before submitting

### ❌ Rejected: Generic/Template Content
**Solution:** Our documents are customized for Bazztech - just update contact info

### ❌ Rejected: Missing Data Deletion Instructions
**Solution:** Our User Data Deletion Policy includes 3 methods (email, written, online form)

### ❌ Rejected: Inaccessible on Mobile
**Solution:** Ensure responsive design for all legal pages

---

## Optional Enhancements

### Add a Legal Page
Create a central legal hub:
```
https://bazztech.co.ke/legal
```

That links to all three documents.

### Version Control
Keep dated versions of policies:
```
privacy-policy-2025-12-01.md
```

### Email Templates
Create auto-responders for:
- `privacy@bazztech.co.ke` - Privacy inquiries
- `legal@bazztech.co.ke` - Legal questions

---

## Support Resources

### Kenya Data Protection
- **ODPC Website:** https://www.odpc.go.ke
- **ODPC Email:** info@odpc.go.ke
- **ODPC Phone:** +254 (0) 20 2675 032

### Meta Resources
- **Developer Docs:** https://developers.facebook.com/docs
- **App Review:** https://developers.facebook.com/docs/app-review
- **Support:** https://developers.facebook.com/support

### Bazztech Resources
- **Documents Location:** `C:\Antigravity\`
  - `privacy-policy.md`
  - `user-data-deletion-policy.md`
  - `terms-of-service.md`

---

## Next Steps

1. **Immediate:** Update all placeholder information in the three documents
2. **Today:** Upload documents to bazztech.co.ke
3. **Today:** Add URLs to Meta App Settings
4. **This Week:** Submit Meta app for review
5. **This Month:** Register with Kenya Data Protection Commissioner

---

**Need Help?**
If you encounter issues during Meta app review or need assistance with Kenya data protection registration, please let me know!
