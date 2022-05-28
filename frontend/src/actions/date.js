export const getDate = date => {

    const dayFormatter = new Intl.DateTimeFormat('es', {day: '2-digit',  timeZone: 'UTC'});
    const monthFormatter = new Intl.DateTimeFormat('es', {month: 'long',  timeZone: 'UTC'});
    const hourFormatter = new Intl.DateTimeFormat('es', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})

    return [dayFormatter.format(date), monthFormatter.format(date), hourFormatter.format(date)];
};

export const isDateOccupied = (appointmentDate, notCompletedAppts) => {
    for (let i = 0; i < notCompletedAppts.length; i++) {
        const date = new Date(notCompletedAppts[i].date);
        const correctedDate = new Date(date.toISOString().slice(0, -1));
        if (appointmentDate.getTime()===correctedDate.getTime()){
            return true;
        };
    };
    return false;
    
};

