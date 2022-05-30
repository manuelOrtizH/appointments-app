export const businesLinesOptions = () => {
    const businesLines = ['Entretenimiento', 'Salud', 'Comida', 'Derecho', 'Educación', 'Estética', 'Música']
    let index=0;
    const listOptions = [];
    for(const bL of businesLines){
        index+=1;
        listOptions.push(
            <option key={index} value={bL}>{bL}</option>
        );
    }

    return listOptions;
};