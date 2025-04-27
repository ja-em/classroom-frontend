import { MainLayout } from "@/components/main-layout";
import { MainStudent } from "@/components/student/main-sutdent";
import { MenuLinkEnum } from "@/constants/menu";
import { Suspense } from "react";

type ISearchParams = Promise<{
  page?: number;
  keyword?: string;
  classLevelId: string;
}>;
export default async function StudentPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { page, keyword, classLevelId } = await searchParams;
  return (
    <MainLayout link={MenuLinkEnum.STUDENT}>
      <Suspense fallback={<MainStudent.Loading />}>
        <MainStudent
          page={page}
          keyword={keyword}
          classLevelId={classLevelId}
        />
      </Suspense>
    </MainLayout>
  );
}
