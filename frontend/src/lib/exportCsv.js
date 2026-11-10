export function downloadCsv(filename, headers, rows) {
  const contents = [headers, ...rows]
    .map((row) => row.map((field) => `"${String(field ?? '').replaceAll('"', '""')}"`).join(','))
    .join('\r\n')
  const url = URL.createObjectURL(new Blob([contents], { type: 'text/csv;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
