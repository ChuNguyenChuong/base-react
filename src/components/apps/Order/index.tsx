import { PlusOutlined } from '@ant-design/icons';
import { deleteOrder, getAllOrder, updateOrder } from '@app/api/v1/order';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { getColumnOrder } from '@app/constants/tableColumns';
import { AnyElement, IOrder, IDataSearchOrder } from '@app/types/generalTypes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormInstance, TablePaginationConfig } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { DelegateHeader, DelegatePageWrapper } from '../Delegate/style';
import Filter, { OptionsFilter, SubmitValueFilter } from '../Fillter';
import DeleteModal from './DeleteModal';
import UpdateOrder from './UpdateOrder';

const Order: React.FC = () => {
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [refData, setRefData] = useState<IOrder>({} as IOrder);
  const [pagination, setPagination] = useState<AnyElement>({
    current: 1,
    pageSize: 5,
  });

  const [dataSearch, setDataSearch] = useState<IDataSearchOrder>({
    status: null,
    createdAt: null,
    name: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      'Order',
      pagination.current,
      pagination.pageSize,
      isLoadPage,
      dataSearch.name,
      dataSearch.status,
      dataSearch.createdAt,
    ],
    queryFn: () => {
      return getAllOrder({
        current: pagination.current,
        pageSize: pagination.pageSize,
        status: dataSearch.status,
        name: dataSearch.name,
        createdAt: dataSearch.createdAt,
      });
    },
  });

  // Mutations
  const mutationDelete = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      setIsLoadPage(!isLoadPage);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      setIsLoadPage(!isLoadPage);
    },
  });

  const handleEdit = useCallback((record: IOrder) => {
    setRefData(record);
    setIsModalUpdateOpen(true);
  }, []);
  const handleDelete = useCallback((record: IOrder) => {
    setRefData(record);
    setIsModalDeleteOpen(true);
  }, []);

  const columns = useMemo(() => {
    return getColumnOrder({ onEdit: handleEdit, onDelete: handleDelete });
  }, [handleDelete, handleEdit]);

  const handleTableChange = (config: TablePaginationConfig) => {
    setPagination(() => {
      return {
        pageSize: config.pageSize as number,
        current: config.current as number,
      };
    });
  };

  const handleOke = useCallback(
    (form: FormInstance<AnyElement>) => {
      const value = form.getFieldsValue();

      const dataUpdate = {
        ...refData,
        ...value,
      };
      mutationUpdate.mutate(dataUpdate);
      setIsModalUpdateOpen(false);
    },
    [mutationUpdate, refData],
  );

  const handleCancel = useCallback(() => {
    setIsModalDeleteOpen(false);
    setIsModalUpdateOpen(false);
  }, []);

  const handleDeleteOke = useCallback(() => {
    mutationDelete.mutate(refData.id);
    setIsModalDeleteOpen(false);
    setRefData({} as IOrder);
  }, [mutationDelete, refData.id]);

  const FilterOption: OptionsFilter[] = useMemo(() => {
    return [
      {
        label: 'Tên đại biểu',
        value: 'name',
      },
      // {
      //   label: 'Ngày tạo',
      //   value: 'createdAt',
      // },
      {
        label: 'Trạng thái',
        value: 'status',
      },
    ];
  }, []);

  const handleFilterAplly = useCallback((value: SubmitValueFilter) => {
    const temp = value.field.reduce((result: AnyElement, item: AnyElement) => {
      const newItem = { ...item };
      if (newItem.field === 'created') {
        const a = encodeURIComponent(newItem.value.toISOString());
        newItem.value = a;
      }
      if (result[newItem.field]) {
        result[newItem.field].push(newItem.value);
      } else {
        result[newItem.field] = [newItem.value];
      }

      return result;
    }, {});

    setDataSearch(temp);
  }, []);

  return (
    <DelegatePageWrapper>
      {isShowSearch && (
        <Filter onClose={() => setIsShowSearch(false)} options={FilterOption} onSubmit={handleFilterAplly} />
      )}
      <DelegateHeader>
        <BaseButton
          size="small"
          style={{
            fontSize: '12px',
          }}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            if (isShowSearch) {
              setDataSearch({
                createdAt: null,
                name: null,
                status: null,
              });
            }
            setIsShowSearch(!isShowSearch);
          }}
        >
          {isShowSearch ? 'Thu hồi bộ lọc' : 'Thêm bộ lọc'}
        </BaseButton>
      </DelegateHeader>

      <BaseTable
        columns={columns}
        dataSource={data?.order ?? []}
        rowKey="id"
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          current: pagination.current,
          // total: data?.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      {isModalDeleteOpen && (
        <DeleteModal open={isModalDeleteOpen} onOk={handleDeleteOke} onCancel={handleCancel} refData={refData} />
      )}
      {isModalUpdateOpen && (
        <UpdateOrder
          refData={refData}
          handleOke={handleOke}
          handleCancel={handleCancel}
          isModalOpen={isModalUpdateOpen}
        />
      )}
    </DelegatePageWrapper>
  );
};
export default Order;
