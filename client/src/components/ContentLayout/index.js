import DashboardLayout from "components/DashboardLayout";
import Navbar from "components/Navbar";
import SuiBox from "components/sui-components/SuiBox";

/**
 * A wrapper around PageLayout that also includes the Navbar
 */
function ContentLayout({ children, background }) {
  return (
    <DashboardLayout background={background}>
      <Navbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {/*Page content goes in here*/}
          {children}
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

ContentLayout.propTypes = DashboardLayout.propTypes;

export default ContentLayout;
