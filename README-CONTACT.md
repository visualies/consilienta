# Contact Page

This project now includes a comprehensive contact page with a fully functional contact form that integrates with Payload CMS.

## Features

- **Responsive Design**: Matches the current site styling with glassmorphism effects
- **Form Validation**: Client-side and server-side validation
- **Contact Information**: Displays company contact details
- **Service Selection**: Dropdown for selecting service of interest
- **Success Feedback**: User-friendly success message after submission
- **Payload CMS Integration**: Fully manageable through the Payload admin panel

## Files Created/Modified

### New Files
- `app/(frontend)/contact/page.tsx` - Contact page route
- `components/blocks/ContactFormBlock.tsx` - Contact form component
- `app/(frontend)/api/contact/route.ts` - API endpoint for form submissions
- `scripts/seed-contact-page.ts` - Script to create the contact page in Payload
- `README-CONTACT.md` - This documentation

### Modified Files
- `components/blocks/BlockRenderer.tsx` - Added contactForm block support
- `collections/Pages.ts` - Added contactForm block configuration
- `package.json` - Added seed:contact script

## Setup Instructions

1. **Run the seed script** to create the contact page in Payload:
   ```bash
   npm run seed:contact
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the contact page** at `/contact`

## Payload CMS Configuration

The contact page is fully configurable through the Payload admin panel:

### Contact Form Block Fields
- **Title**: Main heading for the contact section
- **Subtitle**: Secondary heading
- **Description**: Explanatory text
- **Contact Info**: Email, phone, and address
- **Form Fields**: Customizable form fields with various types (text, email, select, textarea)
- **Submit Text**: Custom submit button text
- **Success Message**: Custom success message

### Form Field Types Supported
- Text input
- Email input
- Phone input
- Textarea
- Select dropdown

## API Endpoint

The contact form submits to `/api/contact` which:
- Validates required fields
- Validates email format
- Logs submissions (currently to console)
- Returns success/error responses

## Customization

### Adding New Form Fields
1. Edit the contact page in Payload admin
2. Add new fields to the `formFields` array
3. Configure field type, label, and validation

### Styling
The contact form uses the existing design system:
- Glassmorphism effects with `bg-white/5 backdrop-blur-sm`
- Consistent typography with `font-serif`
- Brand colors and gradients
- Responsive grid layout

### Form Submission
To customize form submission behavior:
1. Modify `app/(frontend)/api/contact/route.ts`
2. Add database storage
3. Integrate with email services
4. Add CRM integration

## Usage

1. Navigate to `/contact` in your browser
2. Fill out the contact form
3. Submit the form
4. See success confirmation
5. Form data is logged to console (in development)

## Next Steps

For production use, consider:
- Adding email notifications
- Database storage for submissions
- CRM integration (Salesforce, HubSpot, etc.)
- Spam protection (reCAPTCHA)
- Rate limiting
- Email templates
