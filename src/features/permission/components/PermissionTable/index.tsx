import Radio from '@mui/material/Radio';
import React from 'react';
import {useTranslation} from 'react-i18next';
import shallow from 'zustand/shallow';

import {usePermissionStore} from '@store/permission';

import styles from './index.module.scss';

const PermissionTable = () => {
    const {t} = useTranslation();
    const {state, setState, updateState} = usePermissionStore(
        (state) => ({...state}),
        shallow,
    );

    console.log(state, 'state roles');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <table className={styles.table}>
                    <tr>
                        <th className={styles.tableTh}></th>
                        <th className={styles.tableTh}>
                            {t('readOnly')}

                            <div className={styles.wrapRadio}>
                                <Radio
                                    // color="secondary"
                                    onChange={() =>
                                        setState({
                                            automobile: [1],
                                            transports: [1],
                                            vehicle_model: [1],
                                            routes: [1],
                                            checkpoints: [1],
                                            polygons: [1],
                                            order: [1],
                                            races_fuel: [1],
                                            main: [1],
                                            statistic: [1],
                                            logs: [1],
                                        })
                                    }
                                    checked={Object.keys(state).every(
                                        (el) => state[el].join('') == 1,
                                    )}
                                />
                            </div>
                        </th>
                        <th className={styles.tableTh}>
                            {t('edit')}

                            <div className={styles.wrapRadio}>
                                <Radio
                                    onChange={() =>
                                        setState({
                                            automobile: [2],
                                            transports: [2],
                                            vehicle_model: [2],
                                            routes: [2],
                                            checkpoints: [2],
                                            polygons: [2],
                                            order: [2],
                                            races_fuel: [2],
                                            main: [2],
                                            statistic: [2],
                                            logs: [2],
                                        })
                                    }
                                    checked={Object.keys(state).every(
                                        (el) => state[el].join('') == 2,
                                    )}
                                />
                            </div>
                        </th>
                        <th className={styles.tableTh}>
                            {t('delete')}
                            <div className={styles.wrapRadio}>
                                <Radio
                                    onChange={() =>
                                        setState({
                                            automobile: [3],
                                            transports: [3],
                                            vehicle_model: [3],
                                            routes: [3],
                                            checkpoints: [3],
                                            polygons: [3],
                                            order: [3],
                                            races_fuel: [3],
                                            main: [3],
                                            statistic: [3],
                                            logs: [3],
                                        })
                                    }
                                    checked={Object.keys(state).every(
                                        (el) => state[el].join('') == 2,
                                    )}
                                />
                            </div>
                        </th>
                        <th className={styles.tableTh}>{t('notAccess')}</th>
                    </tr>
                    <tbody>
                        {Object.keys(state).map((el) => (
                            <tr>
                                <td className={styles.tableTd}>{t(el)}</td>
                                <td className={styles.tableTd}>
                                    <Radio
                                        onChange={() => updateState(el, 1)}
                                        checked={state[el].join('') == 1}
                                    />
                                </td>
                                <td className={styles.tableTd}>
                                    <div className={styles.wrapRadio}>
                                        <Radio
                                            onChange={() => updateState(el, 2)}
                                            checked={state[el].join('') == 2}
                                        />
                                    </div>
                                </td>

                                <td className={styles.tableTd}>
                                    <Radio
                                        onChange={() => updateState(el, 3)}
                                        checked={state[el].join('') == 3}
                                    />
                                </td>

                                <td className={styles.tableTd}>
                                    <Radio
                                        onChange={() => updateState(el, '')}
                                        checked={state[el].join('') == ''}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PermissionTable;
