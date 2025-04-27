import { MainLayout } from "@/components/main-layout";
import { MainStudent } from "@/components/student/main-sutdent";
import { MenuLinkEnum } from "@/constants/menu";
import { Suspense } from "react";

type ISearchParams = Promise<{ page?: number }>;
export default async function StudentPage({
  searchParams,
}: {
  searchParams: ISearchParams;
}) {
  const { page } = await searchParams;
  return (
    <MainLayout link={MenuLinkEnum.STUDENT}>
      <Suspense fallback={<MainStudent.Loading />}>
        <MainStudent page={page} />
      </Suspense>
    </MainLayout>
  );
}
