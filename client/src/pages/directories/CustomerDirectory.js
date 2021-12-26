import React from "react";
import Table from "components/Table";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import { useHistory } from "react-router-dom";

function CustomerDirectory() {
  const history = useHistory();

  const columns = [
    { name: "Name", key: "name", align: "left" },
    { name: "Email Address", key: "address", align: "left" },
    { name: "Phone Number", key: "number", align: "left" },
    { name: "Date Joined", key: "dateJoined", align: "left" },
    { name: "Bags Rented", key: "rented", align: "left" },
  ];

  const rows = [
    {
      name: "Cynthia Song",
      address: "cynthiasong@gmail.com",
      number: 647123987,
      dateJoined: "10/05/2021",
      rented: 0,
      $onClick: () => history.push("/customers/cynthia-song"),
    },
    {
      name: "Jedwin Mok",
      address: "jedwinmok@gmail.com",
      number: 6471054358,
      dateJoined: "07/29/2021",
      rented: 5,
      $onClick: () => alert("In progress"),
    },
  ];

  return (
    <ContentLayout>
      <BasicCard title={"Customers directory"} padding={false}>
        <Table columns={columns} rows={rows} />
      </BasicCard>
    </ContentLayout>
  );
}

export default CustomerDirectory;
