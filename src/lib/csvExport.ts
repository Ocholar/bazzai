/**
 * CSV Export Utility
 * Provides functions to export data to CSV format
 */

export interface ExportOptions {
  filename: string;
  headers: string[];
  rows: (string | number | boolean | null | undefined)[][];
}

/**
 * Convert array of objects to CSV format
 */
export function convertToCSV(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  // Create header row
  const headerRow = headers.map(escapeCSVField).join(',');
  
  // Create data rows
  const dataRows = rows.map(row =>
    row.map(field => escapeCSVField(String(field ?? ''))).join(',')
  );
  
  // Combine header and data rows
  return [headerRow, ...dataRows].join('\n');
}

/**
 * Escape CSV field values (handle commas, quotes, newlines)
 */
export function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

/**
 * Download CSV file
 */
export function downloadCSV(options: ExportOptions): void {
  const csv = convertToCSV(options.headers, options.rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${options.filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export leads data to CSV
 */
export function exportLeadsToCSV(leads: any[]): void {
  const headers = [
    'ID',
    'Customer Name',
    'Phone',
    'Email',
    'Source',
    'Tag',
    'Status',
    'Preferred Package',
    'Created At',
  ];
  
  const rows = leads.map((lead) => [
    lead.id,
    lead.customerName || '',
    lead.phone,
    lead.email || '',
    lead.source,
    lead.tag === 'high_value' ? 'High-Value' : 'High-Volume',
    lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
    lead.preferredPackage ? lead.preferredPackage.toUpperCase() : 'Unspecified',
    new Date(lead.createdAt).toLocaleDateString(),
  ]);
  
  downloadCSV({
    filename: 'leads',
    headers,
    rows,
  });
}

/**
 * Export submissions data to CSV
 */
export function exportSubmissionsToCSV(submissions: any[], leads: any[]): void {
  const headers = [
    'ID',
    'Lead ID',
    'Lead Name',
    'Status',
    'Response Code',
    'Retry Count',
    'Created At',
    'Error Message',
  ];
  
  const rows = submissions.map((submission) => {
    const lead = leads.find((l: any) => l.id === submission.leadId);
    return [
      submission.id,
      submission.leadId,
      lead?.customerName || `Lead #${submission.leadId}`,
      submission.status.charAt(0).toUpperCase() + submission.status.slice(1),
      submission.responseCode || '',
      submission.retryCount || 0,
      new Date(submission.createdAt).toLocaleDateString(),
      submission.errorMessage || '',
    ];
  });
  
  downloadCSV({
    filename: 'submissions',
    headers,
    rows,
  });
}
