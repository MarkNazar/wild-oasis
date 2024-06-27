import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CabinRow from "./CabinRow";
import useFetchCabins from "./useFetchCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const { cabins, isLoading, error } = useFetchCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  //Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredData = cabins.filter((cabin) => {
    if (filterValue === "with-discount") {
      return cabin.discount > 0;
    } else if (filterValue === "no-discount") {
      return cabin.discount === 0;
    } else {
      return true;
    }
  });

  //Sort
  const sortValue = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    field === "name"
      ? filteredData.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : filteredData.sort((a, b) => {
          return (+a[field] - +b[field]) * modifier;
        });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => {
            return <CabinRow key={cabin.id} cabin={cabin} />;
          }}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
