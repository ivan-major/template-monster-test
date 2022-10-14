import classNames from "classnames";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Header.scss";

type Props = {
    count: number;
    limitPerPage: Function;
};

export const Header: React.FC<Props> = ({ count, limitPerPage }) => {
    const [selectLimit, setSelectLimit] = useState(30);
    const [location, setLocation] = useState("/");

    return (
        <>
            <div className="header">
                <div className="header__container">
                    <Link
                        to="/"
                        className="header__home"
                        onClick={() => setLocation("/")}
                    >
                        Home
                    </Link>
                    <label
                        htmlFor="limit"
                        className={classNames(
                            window.location.pathname === "/favorite"
                                ? "limit_disable"
                                : "limit"
                        )}
                    >
                        <div className="limit__text">Per Page</div>
                        <select
                            name="limit"
                            id="limit"
                            value={selectLimit}
                            onChange={(e) => {
                                setSelectLimit(+e.target.value);
                                limitPerPage(+e.target.value);
                            }}
                        >
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </select>
                    </label>

                    <Link
                        to={"favorite"}
                        className="favorite"
                        onClick={() => setLocation("/favorite")}
                    >
                        <div className="favorite__icon">
                            <svg
                                id="icon-heart"
                                viewBox="0 0 32 32"
                                fill="#fff"
                            >
                                <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
                            </svg>
                            <div className="favorite__count">{count}</div>
                        </div>
                        <div className="favorite__text">Favorite</div>
                    </Link>
                </div>
            </div>

            <Outlet />
        </>
    );
};
