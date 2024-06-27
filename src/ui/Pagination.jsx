import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { ITEM_PER_PAGE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / ITEM_PER_PAGE);

  const nextPage = () => {
    if (pageCount === currentPage) return;
    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  };
  const prevPage = () => {
    if (currentPage === 1) return;
    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  };

  if (count <= ITEM_PER_PAGE)
    return (
      <StyledPagination>
        <P>
          Showing <span>{(currentPage - 1) * ITEM_PER_PAGE + 1}</span> to{" "}
          <span>
            {currentPage === pageCount ? count : currentPage * ITEM_PER_PAGE}
          </span>{" "}
          of <span>{count}</span> results
        </P>
      </StyledPagination>
    );

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * ITEM_PER_PAGE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * ITEM_PER_PAGE}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
