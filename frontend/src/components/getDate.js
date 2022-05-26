export const getDate = date => {
    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit'})

    return [dayFormatter.format(date), monthFormatter.format(date), hourFormatter.format(date)];
};