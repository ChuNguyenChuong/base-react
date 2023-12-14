import { ExportOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { getDelegate, deleteDelegate } from '@app/api/v1/delegate';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { DefaultDelegate, getColumnDelegate } from '@app/constants/tableColumns';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { setDataFocus } from '@app/store/slices/delegateSlide';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Filter, { OptionsFilter, SubmitValueFilter } from '../Fillter';
import DeleteModal from './DeleteModal';
import SendMailModal from './SendMailModal';
import { ActionsWrapper, DelegateHeader, DelegatePageWrapper, SearchWrapper } from './style';
import { IDataSearchDelegate, AnyElement, IDelegate } from '@app/types/generalTypes';

const Delegate: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isShowModalSendMail, setIsShowModalSendMail] = useState<boolean>(false);
  const [refData, setRefData] = useState<IDelegate>({} as IDelegate);
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);

  const [dataSelected, setDataSelected] = useState<IDataSearchDelegate>({
    createdAt: null,
    name: null,
    country: null,
  });

  const [pagination, setPagination] = useState<AnyElement>({
    current: 1,
    pageSize: 5,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      'Delegate',
      pagination.current,
      pagination.pageSize,
      isLoadPage,
      dataSelected.name,
      dataSelected.createdAt,
      dataSelected.country,
    ],
    queryFn: () =>
      getDelegate({
        current: pagination.current,
        pageSize: pagination.pageSize,
        name: dataSelected.name,
        createdAt: dataSelected.createdAt,
        country: dataSelected.country,
      }),
  });

  const handleTableChange = useCallback((config: TablePaginationConfig) => {
    setPagination({
      pageSize: config.pageSize as number,
      current: config.current as number,
    });
  }, []);

  const handleCancel = useCallback(() => {
    setIsShowSearch(false);
    setIsDeleteModalOpen(false);
    setIsShowModalSendMail(false);
    setRefData({} as IDelegate);
  }, []);

  const handleGoAddNewDelegate = useCallback(() => {
    dispatch(setDataFocus(DefaultDelegate));
    history('/delegate/create-update');
  }, [dispatch, history]);

  const handleEditDelegate = useCallback(
    (record: IDelegate) => {
      dispatch(setDataFocus(record));
      history('/delegate/create-update');
    },
    [dispatch, history],
  );

  const handleDeleteModelShow = useCallback((record: IDelegate) => {
    setRefData(record);
    setIsDeleteModalOpen(true);
  }, []);

  const mutationDelete = useMutation({
    mutationFn: deleteDelegate,
    onSuccess: () => {
      setIsLoadPage(!isLoadPage);
    },
  });
  const handleDeleteOke = useCallback(() => {
    mutationDelete.mutate(refData.id);
    setRefData({} as IDelegate);
    handleCancel();
  }, [mutationDelete, refData.id]);

  const handleSendMailOke = () => {
    handleCancel();
  };

  const columns = useMemo(() => {
    return getColumnDelegate(t, { onEdit: handleEditDelegate, onDelete: handleDeleteModelShow });
  }, [handleDeleteModelShow, handleEditDelegate, t]);

  const handleFilterAplly = useCallback((value: SubmitValueFilter) => {
    const temp = value.field.reduce((result: AnyElement, item: AnyElement) => {
      const newItem = { ...item };
      if (result[newItem.field]) {
        result[newItem.field].push(newItem.value);
      } else {
        result[newItem.field] = [newItem.value];
      }

      return result;
    }, {});

    setDataSelected(temp);
  }, []);

  // const rowSelection: TableRowSelection<DelegateType> = useMemo(() => {
  //   return {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       setDataSelected(selectedRows);
  //     },
  //     onSelect: (record, selected, selectedRows) => {
  //       setDataSelected(selectedRows);
  //     },
  //     onSelectAll: (selected, selectedRows) => {
  //       setDataSelected(selectedRows);
  //     },
  //   };
  // }, []);

  const FilterOption: OptionsFilter[] = [
    {
      label: 'Tên',
      value: 'name',
    },
    {
      label: 'Quốc Gia',
      value: 'country',
    },
    // {
    //   label: 'Ngày tạo',
    //   value: 'createdAt',
    // },
  ];

  return (
    <DelegatePageWrapper>
      {isShowSearch && (
        <Filter onClose={() => setIsShowSearch(false)} options={FilterOption} onSubmit={handleFilterAplly} />
      )}

      <DelegateHeader>
        <SearchWrapper>
          <BaseButton
            size="small"
            style={{
              fontSize: '12px',
            }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              if (isShowSearch) {
                setDataSelected({
                  createdAt: null,
                  name: null,
                  country: null,
                });
              }
              setIsShowSearch(!isShowSearch);
            }}
          >
            {isShowSearch ? 'Thu hồi bộ lọc' : 'Thêm bộ lọc'}
          </BaseButton>
        </SearchWrapper>
        <ActionsWrapper>
          <BaseButton
            size="small"
            style={{
              fontSize: '12px',
            }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleGoAddNewDelegate}
          >
            {t('buttons.add')}
          </BaseButton>
          <BaseButton
            size="small"
            style={{
              fontSize: '12px',
            }}
            type="primary"
            icon={<SendOutlined />}
            onClick={() => setIsShowModalSendMail(true)}
          >
            {t('buttons.sendMail')}
          </BaseButton>
          <BaseButton
            size="small"
            style={{
              fontSize: '12px',
            }}
            type="primary"
            icon={<ExportOutlined />}
          >
            {t('buttons.export')}
          </BaseButton>
        </ActionsWrapper>
      </DelegateHeader>

      <BaseTable
        columns={columns}
        dataSource={data?.delegate ?? []}
        rowKey="id"
        loading={isLoading}
        // rowSelection={rowSelection}
        onChange={handleTableChange}
        pagination={{
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          current: pagination.current,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      {isDeleteModalOpen && (
        <DeleteModal open={isDeleteModalOpen} onOk={handleDeleteOke} onCancel={handleCancel} refData={refData} />
      )}
      {isShowModalSendMail && (
        <SendMailModal
          open={isShowModalSendMail}
          onOk={handleSendMailOke}
          onCancel={handleCancel}
          refData={dataSelected}
        />
      )}
    </DelegatePageWrapper>
  );
};
export default Delegate;
