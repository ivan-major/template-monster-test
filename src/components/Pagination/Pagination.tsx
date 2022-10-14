import React from "react";
import classNames from "classnames";
import "./Pagination.scss";

type Props = {
    perPage: number;
    page: number;
    onPageChange: Function;
    toNextPage: Function;
    toPrevPage: Function;
};

export const Pagination: React.FC<Props> = ({
    perPage,
    page,
    onPageChange,
    toNextPage,
    toPrevPage,
}) => {
    const total = 993;
    const pages = [];
    const itemsFrom = (page - 1) * perPage + 1;
    const itemsTo = page * perPage;

    for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <div className="with-info text">
                Images {itemsFrom} - {itemsTo > total ? total : itemsTo} of{" "}
                {total}
            </div>

            <ul className="pagination__list">
                <li className="prev">
                    <button
                        type="button"
                        className="button prev text"
                        disabled={page === 1}
                        onClick={() => {
                            toPrevPage();
                        }}
                    >
                        Previos
                    </button>
                </li>

                {pages.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={
                            pageNumber === page ||
                            pageNumber === 1 ||
                            pageNumber === page - 1 ||
                            pageNumber === page + 1 ||
                            pageNumber === pages.length
                                ? "pagination__item--active"
                                : "pagination__item"
                        }
                    >
                        {pageNumber === page - 1 &&
                            pageNumber !== 1 &&
                            perPage !== 20 && <span className="text">...</span>}

                        <button
                            type="button"
                            className={classNames("button", {
                                button__active: pageNumber === page,
                            })}
                            onClick={() => {
                                onPageChange(pageNumber);
                            }}
                        >
                            {pageNumber}
                        </button>

                        {pageNumber === page + 1 &&
                            pageNumber !== 9 &&
                            perPage !== 20 && <span className="text">...</span>}
                    </li>
                ))}

                <li className="next">
                    <button
                        type="button"
                        className="button next text"
                        disabled={page === pages.length}
                        onClick={() => {
                            toNextPage();
                        }}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};
