import Presentations from '@app/components/apps/Presentations';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const PresentationsPage: React.FC = () => {
  return (
    <>
      <PageTitle>Báo cáo tham luận</PageTitle>
      <Presentations />
    </>
  );
};

export default PresentationsPage;
