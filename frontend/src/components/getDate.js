export const getDate = date => {
    const dayFormatter = new Intl.DateTimeFormat('es-MX', {day: '2-digit'});
    const monthFormatter = new Intl.DateTimeFormat('es-MX', {month: 'long'});
    const hourFormatter = new Intl.DateTimeFormat('es-MX', {hour: '2-digit', minute: '2-digit'})

    return [dayFormatter.format(date), monthFormatter.format(date), hourFormatter.format(date)];
};