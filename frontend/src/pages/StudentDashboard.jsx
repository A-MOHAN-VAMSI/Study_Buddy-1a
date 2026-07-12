import DashboardLayout from "../components/layout/DashboardLayout";
import PageContainer from "../components/layout/PageContainer";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsGrid from "../components/dashboard/StatsGrid";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import UpcomingExams from "../components/dashboard/UpcomingExams";
import RecentActivity from "../components/dashboard/RecentActivity";
import AnimatedPage from "../components/common/AnimatedPage";
import StudentSettings from "./StudentSettings";
export default function StudentDashboard() {

    return (
        <AnimatedPage>

        <DashboardLayout>

            <PageContainer>

                <WelcomeBanner/>

                <StatsGrid/>
                <PerformanceChart />
                <UpcomingExams />
                <RecentActivity />

            </PageContainer>

        </DashboardLayout>
        </AnimatedPage>

    );

}