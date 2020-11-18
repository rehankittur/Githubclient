const formatDate = date =>
  new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
}).format(Date.parse(date));

const formatDateShort = date =>
  new Intl.DateTimeFormat('en-GB').format(Date.parse(date));

export { formatDate as default, formatDateShort };