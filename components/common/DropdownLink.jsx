import React from "react";
import Link from "next/link";

function DropdownLink(props) {
    const { href, children, ...rest } = props;

    return (
        <Link href={href} passHref>
            <a {...rest}>{children}</a>
        </Link>
    );
}

export default DropdownLink;
