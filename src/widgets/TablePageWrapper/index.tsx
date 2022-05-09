import cx from 'classnames';
import React, {FC, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import BaseButton from '@components/BaseButton';
import MuiPagination from '@components/Pagination';
import SearchPage from '@components/SearchPage';
import TableTemplate from '@components/TableTemplate';
import {handleTotal} from '@shared/helpers/helpers';
import DataLoading from '@shared/hoc/DataLoading';
import useLocationPermission from '@shared/hooks/useLocationPermission';
import {useMainStore} from '@store/main';

import AddPrimaryIcon from '@images/svgs/AddPrimaryIcon';

interface Props {
    title: string;
    isLoading: boolean;
    searchTerm?: string;
    totalCount?: number;
    page?: number;
    setPage?: any;
    saveLabel?: string;
    comingData: any[];
    columns: any[];
    selected: any[];
    setSelected: (selected: any[]) => void;
    totalCountLoading?: boolean;
    setSearchTerm?: any;
    searchPlaceholder?: string;
    noSearch?: boolean;
    noPagination?: boolean;
    onAdd?: () => void;
    customStyles?: any;
    Filter?: FC;
}

const TablePageWrapper: FC<Props> = ({
    title,
    isLoading,
    searchTerm,
    totalCount,
    page,
    setPage,
    saveLabel,
    comingData,
    columns,
    selected,
    setSelected,
    searchPlaceholder,
    totalCountLoading,
    setSearchTerm,
    noSearch,
    noPagination,
    onAdd,
    children,
    customStyles,
    Filter,
}) => {
    const {t} = useTranslation();
    const handleTap = useMainStore((state) => state.handleTap);
    const {canEdit} = useLocationPermission();

    const totalPages = useMemo(
        () => (totalCount ? handleTotal(totalCount) : null),
        [totalCount],
    );

    return (
        <div className="main__container">
            <header className="header">
                <h3 className="headerText">{title}</h3>
                {canEdit && (
                    <BaseButton
                        onClick={onAdd ? onAdd : () => handleTap(true)}
                        disabled={isLoading}
                    >
                        <AddPrimaryIcon />
                        {saveLabel ? saveLabel : t('add')}
                    </BaseButton>
                )}
            </header>

            {children}

            {!noSearch && (
                <div className={cx('flex__start', 'headerSecond')}>
                    <SearchPage
                        handleTextChange={(e) =>
                            setSearchTerm(e.target.value)?.trim()
                        }
                        text={searchTerm}
                        placeholder={
                            searchPlaceholder ? searchPlaceholder : 'Поиск'
                        }
                    />

                    {Filter && <Filter />}
                </div>
            )}

            <DataLoading
                loading={isLoading || totalCountLoading}
                data={comingData}
            >
                <div className="file">
                    <TableTemplate
                        columns={columns}
                        comingData={comingData}
                        selected={selected}
                        setSelected={setSelected}
                        customStyles={customStyles}
                    />

                    {!noPagination && !searchTerm?.length && (
                        <div className="pageWrapper">
                            <MuiPagination
                                onChange={(value) => setPage(value)}
                                totalCount={totalPages as number}
                                currentPage={page as number}
                                disabled={totalPages == page}
                            />
                        </div>
                    )}
                </div>
            </DataLoading>
        </div>
    );
};

export default TablePageWrapper;
