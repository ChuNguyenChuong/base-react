import { PlusOutlined } from '@ant-design/icons';
import { deletePresentaion, getAllPresentations, updatePresentaion } from '@app/api/v1/presentations';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { getColumnReportPresentation } from '@app/constants/tableColumns';
import { AnyElement, IDataSearchPresentations, IReportPresentation } from '@app/types/generalTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormInstance, TablePaginationConfig } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DelegateHeader, DelegatePageWrapper } from '../Delegate/style';
import Fillter, { OptionsFilter, SubmitValueFilter } from '../Fillter';
import UpdatePresentation from './UpdatePresentation';
import DeleteModal from './DeleteModal';

const Presentations: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [refData, setRefData] = useState<IReportPresentation>({} as IReportPresentation);
  const [pagination, setPagination] = useState<AnyElement>({
    current: 1,
    pageSize: 5,
  });

  const [dataSearch, setDataSearch] = useState<IDataSearchPresentations>({
    status: null,
    createdAt: null,
    name: null,
    title: null,
  });

  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      'presentations',
      pagination.current,
      pagination.pageSize,
      dataSearch.name,
      dataSearch.status,
      dataSearch.title,
      dataSearch.createdAt,
    ],
    queryFn: () =>
      getAllPresentations({
        current: pagination.current,
        pageSize: pagination.pageSize,
        status: dataSearch.status,
        name: dataSearch.name,
        createdAt: dataSearch.createdAt,
        title: dataSearch.title,
      }),
  });

  // Mutations
  const mutationDelete = useMutation({
    mutationFn: deletePresentaion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      setIsDeleteModalOpen(false);
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: updatePresentaion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      setIsModalUpdateOpen(false);
    },
  });

  const handleEdit = useCallback((record: IReportPresentation) => {
    setRefData(record);
    setIsModalUpdateOpen(true);
  }, []);
  const handleDelete = useCallback((record: IReportPresentation) => {
    setRefData(record);
    setIsDeleteModalOpen(true);
  }, []);

  const columns = useMemo(() => {
    return getColumnReportPresentation(t, { onEdit: handleEdit, onDelete: handleDelete });
  }, [handleDelete, handleEdit, t]);

  const handleTableChange = (config: TablePaginationConfig) => {
    setPagination(() => {
      return {
        pageSize: config.pageSize as number,
        current: config.current as number,
      };
    });
  };

  const handleOke = (form: FormInstance<AnyElement>) => {
    const value = form.getFieldsValue();
    const dataUpdate = {
      ...refData,
      ...value,
    };
    mutationUpdate.mutate(dataUpdate);
  };
  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    setIsDeleteModalOpen(false);
    setRefData({} as IReportPresentation);
  };

  const handleDeleteOke = useCallback(() => {
    mutationDelete.mutate(refData.id);
  }, [mutationDelete, refData.id]);

  const FilterOption: OptionsFilter[] = useMemo(() => {
    return [
      {
        label: 'Tiêu đề',
        value: 'title',
      },
      {
        label: 'Tên đại biểu',
        value: 'name',
      },
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
        <Fillter onClose={() => setIsShowSearch(false)} options={FilterOption} onSubmit={handleFilterAplly} />
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
                title: null,
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
        dataSource={data?.abstracts ?? []}
        rowKey="id"
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          current: pagination.current,
          total: data?.abstracts?.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      {isDeleteModalOpen && (
        <DeleteModal open={isDeleteModalOpen} onOk={handleDeleteOke} onCancel={handleCancel} refData={refData} />
      )}
      {isModalUpdateOpen && (
        <UpdatePresentation
          isModalOpen={isModalUpdateOpen}
          refData={refData}
          handleCancel={handleCancel}
          handleOke={handleOke}
        />
      )}
    </DelegatePageWrapper>
  );
};
export default Presentations;
