import React from "react";
import { Card } from "react-bootstrap";

export default function CardWrap({ children, title, subHeader, customCard, customCardHeader, customCardBody }) {
    return (
        <Card
            className={customCard ? customCard?.className : "border-0 shadow-sm"}
            style={customCard ? customCard?.style : {}}
        >
            {
                title || subHeader ? (
                    <Card.Header
                        className={customCardHeader ? customCardHeader?.className : "align-items-center"}
                        style={customCardHeader ? customCardHeader?.style : {}}
                    >
                        <div className={"row"}>
                            <div className={"col"}>
                                <div className={"font-weight-medium py-1"}>{title}</div>
                            </div>
                            <div className={"col-auto"}>{subHeader}</div>
                        </div>
                    </Card.Header>
                ) : ''
            }
            <Card.Body
                className={customCardBody ? customCardBody?.className : "w-auto overflow-auto"}
                style={customCardBody ? customCardBody?.style : {}}
            >{children}</Card.Body>
        </Card>
    );
}
