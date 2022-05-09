import React from 'react';

import styles from './index.module.scss';

const EditableCell = ({
    value: initialValue,
    row: {index},
    column: {id},
    setData,
    updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: any) => {
        if (e.target.value[0] === '0') {
            setValue(e.target.value.substring(1));
        } else {
            setValue(e.target.value);
            // updateMyData(index, id, e.target.value);
        }
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <input
            className={styles.inputData}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type="number"
            min="0"
        />
    );
};

export default EditableCell;

// const first = data.filter((item: any) => ({firstColumn: item.firstColumn}));

// const EditableCell: React.FC<ProtocolEditCell> = ({
//                               value: initialValue,
//                               row: { index },
//                               column: { id }
//                           }) => {
//         const [value, setValue] = React.useState(initialValue)

//         const sumValues = (index: number, id: string, value: number) => {

//             if(first[index+1].firstColumn && first[index+1].secondColumn && id === "firstColumn"){
//                 first[index].firstColumn = value;
//                 for(let i = index; i < first.length; i++){
//                     if(first[i].firstColumn && first[i].secondColumn){
//                         first[i].secondColumn = +first[i].firstColumn + +first[i-1].secondColumn;
//                     } else {
//                         break;
//                     }
//                 }

//             } else if(first[index+1].firstColumn && first[index+1].secondColumn && id === "secondColumn") {
//                 first[index].secondColumn = value;
//                 for(let i = index; i < first.length; i++){
//                     if(first[i].firstColumn && first[i].secondColumn){
//                         first[i].firstColumn = +first[i].secondColumn - +first[i-1].secondColumn;
//                     } else {
//                         break;
//                     }
//                 }
//             }
//             setData([...first]);
//         }

//         const onChange = (e: any, index: number, id: string) => {

//             if(id === "firstColumn" && first[index+1].firstColumn === "" && first[index+1].secondColumn === "") {
//                 first[index].firstColumn = +e.target.value;
//                 first[index].secondColumn = +first[index].firstColumn + +first[index !== 0 ? index - 1 : index].secondColumn;
//             } else {
//                 sumValues(index, id, +e.target.value);
//             }

//             if(id === "secondColumn" && first[index+1].secondColumn === "" && first[index+1].secondColumn === "") {
//                 first[index].secondColumn = +e.target.value;
//                 first[index].firstColumn = +first[index].secondColumn - +first[index !== 0 ? index - 1 : index].secondColumn;
//             } else {
//                 sumValues(index, id, +e.target.value);
//             }
//             setData([...first]);
//             setValue(e.target.value)
//         }

//         React.useEffect(() => {
//             setValue(initialValue)
//         }, [initialValue])

//         return <input value={index === 0 ? 0 : value} disabled={index === 0} className={"tableInput"} onChange={e => onChange(e, index, id)} />
// }
