export const getDate = date => {
    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit',  timeZone: 'UTC'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long',  timeZone: 'UTC'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})
    // FORM para crear la cita, (UTC) -> (GMT) == 5:00
    // BASE DE DATOS: 31Mayo00:00 UTC
    // new Date(date) -> GMT
    // new Date().UTC <=
    return [dayFormatter.format(date), monthFormatter.format(date), hourFormatter.format(date)];
};