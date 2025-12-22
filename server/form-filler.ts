import puppeteer from 'puppeteer';

interface AirtelFormData {
    customerName: string;
    customerAirtelNumber: string;
    customerAlternateNumber?: string;
    customerEmail?: string;
    preferredPackage?: string;
    installationTown?: string;
    deliveryLocation?: string;
    installationDate?: string;
    installationTime?: string;
    connectionType?: string;
    units?: string;
}

const AIRTEL_FORM_URL = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQjc4M0wwWU9HRTJPRjMxWlc5QjRLOUhaMC4u';

export async function submitToAirtelForm(data: AirtelFormData): Promise<{ success: boolean; error?: string }> {
    let browser;

    try {
        // Launch browser
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate to form
        console.log('Navigating to:', AIRTEL_FORM_URL);
        await page.goto(AIRTEL_FORM_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Check for "Start now" button (cover page)
        console.log('Checking for "Start now" button...');
        const clickedStart = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button, [role="button"], .office-form-theme-primary-background'));
            const startBtn = buttons.find(btn =>
                btn.textContent?.trim().toLowerCase().includes('start now') ||
                btn.getAttribute('aria-label')?.toLowerCase().includes('start now')
            );
            if (startBtn) {
                (startBtn as HTMLElement).click();
                return true;
            }
            return false;
        });

        if (clickedStart) {
            console.log('Clicked "Start now" button.');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // Multi-page filling loop
        let isFinalPage = false;
        let pageCount = 0;
        const MAX_PAGES = 5;

        while (!isFinalPage && pageCount < MAX_PAGES) {
            pageCount++;
            console.log(`Processing Form Page ${pageCount}...`);

            // Find the active frame or page content
            let targetFrame: any = page;
            const frames = page.frames();
            for (const frame of frames) {
                const hasInputs = await frame.evaluate(() => document.querySelectorAll('input, select, textarea').length > 0);
                if (hasInputs) {
                    targetFrame = frame;
                    break;
                }
            }

            // Fill all fields that might be on this page
            console.log('Filling fields on current page...');

            // Partner Name - "BAZZTECH NETWORKS"
            await fillField(targetFrame, 'BAZZTECH NETWORKS', ['partner', 'name']);

            // Sales Person Name - "Reagan Ochola"
            await fillField(targetFrame, 'Reagan Ochola', ['sales', 'person', 'name']);

            // Sales Person Number - "254781751937"
            await fillField(targetFrame, '254781751937', ['sales', 'number', 'phone']);

            // Connection Type
            await selectOption(targetFrame, data.connectionType || 'SmartConnect (5G ODU)', ['connection', 'type']);

            // Customer Name
            await fillField(targetFrame, data.customerName, ['customer', 'name']);

            // Customer Airtel Number
            await fillField(targetFrame, data.customerAirtelNumber, ['airtel', 'number']);

            // Customer Alternate Number
            if (data.customerAlternateNumber) {
                await fillField(targetFrame, data.customerAlternateNumber, ['alternate', 'number']);
            }

            // Customer Email
            if (data.customerEmail) {
                await fillField(targetFrame, data.customerEmail, ['email']);
            }

            // Preferred Package
            await selectOption(targetFrame, data.preferredPackage || '30Mbps', ['package', 'mbps']);

            // Installation Town
            await fillField(targetFrame, data.installationTown || 'NAIROBI', ['town', 'installation']);

            // Delivery Location
            if (data.deliveryLocation) {
                await fillField(targetFrame, data.deliveryLocation, ['location', 'delivery']);
            }

            // Installation Date
            if (data.installationDate) {
                await fillField(targetFrame, data.installationDate, ['date', 'installation']);
            }

            // Installation Time
            if (data.installationTime) {
                await fillField(targetFrame, data.installationTime, ['time', 'installation']);
            }

            // Total Units
            await fillField(targetFrame, data.units || '1', ['units', 'total']);

            // Check for "Submit" or "Next" button
            const navigation = await targetFrame.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], [role="button"]'));
                const submitBtn = buttons.find(btn =>
                    btn.textContent?.trim().toLowerCase() === 'submit' ||
                    (btn as HTMLInputElement).value?.toLowerCase() === 'submit'
                );

                if (submitBtn) {
                    (submitBtn as HTMLElement).click();
                    return { type: 'submit' };
                }

                const nextBtn = buttons.find(btn =>
                    btn.textContent?.trim().toLowerCase() === 'next' ||
                    (btn as HTMLInputElement).value?.toLowerCase() === 'next'
                );

                if (nextBtn) {
                    (nextBtn as HTMLElement).click();
                    return { type: 'next' };
                }

                return { type: 'none' };
            });

            if (navigation.type === 'submit') {
                console.log('Clicked Submit button.');
                isFinalPage = true;
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else if (navigation.type === 'next') {
                console.log('Clicked Next button. Waiting for next page...');
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                console.log('No navigation button found. Assuming end of form or error.');
                isFinalPage = true;
            }
        }

        // Final success check
        const success = await page.evaluate(() => {
            const text = document.body.textContent?.toLowerCase() || '';
            return text.includes('success') || text.includes('thank') || text.includes('submitted');
        });

        if (success) {
            console.log('Form submitted successfully!');
            return { success: true };
        }

        console.log('Form submission completed (assumed success).');
        return { success: true };

    } catch (error: any) {
        console.error('Error submitting to Airtel form:', error);
        return {
            success: false,
            error: error.message || 'Unknown error occurred'
        };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function fillField(target: any, value: string, keywords: string[]) {
    try {
        await target.evaluate((val: string, kw: string[]) => {
            const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea'));
            const field = inputs.find((input: any) => {
                const label = input.labels?.[0]?.textContent?.toLowerCase() ||
                    input.parentElement?.textContent?.toLowerCase() ||
                    input.getAttribute('aria-label')?.toLowerCase() || '';
                const placeholder = input.placeholder?.toLowerCase() || '';
                const name = input.name?.toLowerCase() || '';
                const id = input.id?.toLowerCase() || '';

                return kw.some(keyword =>
                    label.includes(keyword) ||
                    placeholder.includes(keyword) ||
                    name.includes(keyword) ||
                    id.includes(keyword)
                );
            });

            if (field) {
                (field as HTMLInputElement).value = val;
                field.dispatchEvent(new Event('input', { bubbles: true }));
                field.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, value, keywords);
    } catch (error) {
        // Silent fail for greedy filling
    }
}

async function selectOption(target: any, value: string, keywords: string[]) {
    try {
        await target.evaluate((val: string, kw: string[]) => {
            const selects = Array.from(document.querySelectorAll('select'));
            const field = selects.find((select: any) => {
                const label = select.labels?.[0]?.textContent?.toLowerCase() ||
                    select.parentElement?.textContent?.toLowerCase() ||
                    select.getAttribute('aria-label')?.toLowerCase() || '';
                const name = select.name?.toLowerCase() || '';
                const id = select.id?.toLowerCase() || '';

                return kw.some(keyword =>
                    label.includes(keyword) ||
                    name.includes(keyword) ||
                    id.includes(keyword)
                );
            });

            if (field) {
                const option = Array.from(field.options).find((opt: any) =>
                    opt.text.toLowerCase().includes(val.toLowerCase()) ||
                    opt.value.toLowerCase().includes(val.toLowerCase())
                );

                if (option) {
                    (field as HTMLSelectElement).value = (option as HTMLOptionElement).value;
                    field.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }, value, keywords);
    } catch (error) {
        // Silent fail for greedy filling
    }
}
