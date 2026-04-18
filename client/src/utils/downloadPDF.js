export const downloadPDF = async (elementId, filename = 'resume') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const html2pdf = (await import('html2pdf.js')).default;

    const options = {
      margin: [10, 10, 10, 10],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    return await html2pdf().set(options).from(element).save();
  } catch (err) {
    console.error('PDF Download failed:', err);
    throw err;
  }
};
